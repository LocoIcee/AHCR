'use client';

import PropTypes from 'prop-types';
import ImageCarousel from './ImageCarousel';

const formatDate = (dateString) => {
  if (!dateString) return 'TBD';
  const [year, month = 1, day = 1] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  if (Number.isNaN(date.getTime())) {
    return 'TBD';
  }
  return date.toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const FundraiserCard = ({
  title,
  description,
  startDate,
  endDate,
  images = [],
  raised,
  goal,
  onLearnMore
}) => {
  const today = new Date();
  const start = startDate ? new Date(startDate) : today;
  const end = endDate ? new Date(endDate) : today;
  const isUpcoming = today < start;
  const isCompleted = today > end;
  const isActive = !isUpcoming && !isCompleted;
  const hasImages = Array.isArray(images) && images.length > 0;
  const safeDescription = typeof description === 'string' ? description : '';

  const validRaised = typeof raised === 'number' && raised >= 0 ? raised : 0;
  const validGoal = typeof goal === 'number' && goal > 0 ? goal : null;
  const progressPercentage = validGoal ? Math.min(100, Math.round((validRaised / validGoal) * 100)) : 0;
  const goalMet = validGoal ? validRaised >= validGoal : false;
  const teaser = safeDescription.length > 220 ? `${safeDescription.slice(0, 220)}...` : safeDescription;
  const daysRemaining = Math.max(0, Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));

  let badgeLabel = 'Upcoming';
  let badgeClass = 'bg-blue-500';
  if (isActive) {
    badgeLabel = goalMet ? 'Goal Met!' : 'Active';
    badgeClass = goalMet ? 'bg-emerald-500' : 'bg-green-500';
  } else if (isCompleted) {
    badgeLabel = goalMet ? 'Completed - Goal Met' : 'Completed';
    badgeClass = goalMet ? 'bg-emerald-600' : 'bg-gray-600';
  }

  return (
    <div className="bg-white rounded-3xl shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl overflow-hidden">
      <div className="relative aspect-[16/9] bg-[#f8f4f1]">
        {hasImages ? (
          <ImageCarousel images={images} minHeight="auto" />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400 text-sm">
            Images coming soon
          </div>
        )}
        <div className={`absolute top-4 right-4 text-white px-3 py-1 rounded-full text-sm font-medium ${badgeClass}`}>
          {badgeLabel}
        </div>
      </div>

      <div className="p-6 sm:p-7 flex flex-col gap-4">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-[#7d5c46]">{title}</h3>
          <div className="flex flex-wrap items-center justify-between text-sm text-gray-600 gap-2">
            <span>{formatDate(startDate)} - {formatDate(endDate)}</span>
            {isActive && (
              <span className="font-medium text-[#7d5c46]">{daysRemaining} days left</span>
            )}
            {isUpcoming && (
              <span className="font-medium text-[#7d5c46]">Starts {formatDate(startDate)}</span>
            )}
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed">{teaser}</p>

        {validGoal ? (
          <div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className={`${goalMet ? 'bg-emerald-500' : 'bg-[#9c7459]'} h-2.5 rounded-full transition-all`}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-sm font-semibold text-gray-700">
              <span>${validRaised.toLocaleString()} raised</span>
              <span>${validGoal.toLocaleString()} goal</span>
            </div>
          </div>
        ) : (
          <p className="text-sm text-[#7d5c46] bg-[#f8f4f1] border border-[#9c7459]/20 rounded-lg px-3 py-2">
            Funding goal coming soon - check back for details.
          </p>
        )}

        <div>
          <button
            type="button"
            onClick={onLearnMore}
            className="inline-flex items-center gap-2 rounded-full bg-[#7d5c46] px-5 py-2 text-white text-sm font-medium transition hover:bg-[#5e3b1e] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#7d5c46]"
          >
            Learn more
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

FundraiserCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.string),
  raised: PropTypes.number,
  goal: PropTypes.number,
  onLearnMore: PropTypes.func
};

FundraiserCard.defaultProps = {
  images: [],
  raised: 0,
  goal: null,
  onLearnMore: () => {}
};

export default FundraiserCard;
