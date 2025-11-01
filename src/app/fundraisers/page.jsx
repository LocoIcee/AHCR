'use client';
import { useState, useEffect } from 'react';
import FundraiserCard from '@/components/FundraiserCard';
import PawPrint from '@/assets/PawPrint';
import ImageCarousel from '@/components/ImageCarousel';
import { supabase } from '@/lib/supabaseClient';

const formatDate = (value) => {
  if (!value) return 'TBD';
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return 'TBD';
  return parsed.toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: 'numeric' });
};

const FundraisersPage = () => {
  const [filter, setFilter] = useState('all');
  const [allFundraisers, setAllFundraisers] = useState([]);
  const [fundraisers, setFundraisers] = useState([]);
  const [selectedFundraiser, setSelectedFundraiser] = useState(null);

  const handleLearnMore = (fundraiser) => {
    setSelectedFundraiser(fundraiser);
  };

  const closeModal = () => {
    setSelectedFundraiser(null);
  };

  useEffect(() => {
    const fetchFundraisers = async () => {
      const { data, error } = await supabase
        .from('Fundraisers')
        .select('*')
        .order('startDate', { ascending: true });

      if (error) {
        console.error('Error fetching dogs:', error);
      } else {
        setAllFundraisers(data);
        setFundraisers(data);
      }
    };

    fetchFundraisers();
  }, []);

  useEffect(() => {
    const today = new Date();

    if (filter === 'all') {
      setFundraisers(allFundraisers);
    } else if (filter === 'active') {
      setFundraisers(
        allFundraisers.filter(f => {
          const start = new Date(f.startDate);
          const end = new Date(f.endDate);
          return today >= start && today <= end;
        })
      );
    } else if (filter === 'upcoming') {
      setFundraisers(
        allFundraisers.filter(f => {
          const start = new Date(f.startDate);
          return today < start;
        })
      );
    } else if (filter === 'past') {
      setFundraisers(
        allFundraisers.filter(f => {
          const end = new Date(f.endDate);
          return today > end;
        })
      );
    }
  }, [filter, allFundraisers]);

  return (
    <main className="pt-24 pb-16 min-h-screen bg-gray-50">
      <section>
        <div className="relative mb-10 sm:mb-12 bg-gradient-to-r from-[#f8f4f1] to-[#e2d2c5] py-10 sm:py-12 shadow-lg overflow-hidden w-full">
          {/* Decorative paw prints */}
          <div className="absolute -top-8 left-1/4 transform -translate-x-1/2 opacity-20 animate-bounce">
            <PawPrint className="h-28 w-28 text-[#9c7459]" />
          </div>
          <div className="absolute -bottom-8 right-1/4 transform translate-x-1/2 opacity-20 animate-bounce delay-200">
            <PawPrint className="h-24 w-24 text-[#9c7459]" />
          </div>
          <div className="relative z-10 flex justify-center px-4">
            <div className="bg-[#7d5c46]/85 text-white rounded-2xl px-6 py-6 shadow-lg max-w-2xl w-full">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3">
                Fundraisers
              </h1>
              <p className="text-base sm:text-lg">
                Support our mission to rescue and rehome dogs in need by contributing to one of our fundraising campaigns.
              </p>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-8 px-2">
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2 sm:gap-3 bg-white rounded-lg p-3 shadow-sm w-full sm:w-auto overflow-x-auto">
              <button
                onClick={() => setFilter('all')}
                className={`w-full sm:w-auto px-4 py-2 rounded-md text-sm sm:text-base font-medium transition-colors whitespace-nowrap ${
                  filter === 'all' ? 'bg-[#9c7459] text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                All Fundraisers
              </button>
              <button
                onClick={() => setFilter('active')}
                className={`w-full sm:w-auto px-4 py-2 rounded-md text-sm sm:text-base font-medium transition-colors whitespace-nowrap ${
                  filter === 'active' ? 'bg-[#9c7459] text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setFilter('upcoming')}
                className={`w-full sm:w-auto px-4 py-2 rounded-md text-sm sm:text-base font-medium transition-colors whitespace-nowrap ${
                  filter === 'upcoming' ? 'bg-[#9c7459] text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setFilter('past')}
                className={`w-full sm:w-auto px-4 py-2 rounded-md text-sm sm:text-base font-medium transition-colors whitespace-nowrap ${
                  filter === 'past' ? 'bg-[#9c7459] text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Past
              </button>
            </div>
          </div>
          
          {fundraisers.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 max-w-3xl mx-auto">
              {fundraisers.map(fundraiser => (
                <FundraiserCard
                  key={fundraiser.id}
                  {...fundraiser}
                  onLearnMore={() => handleLearnMore(fundraiser)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500 mb-4">No fundraisers found in this category.</p>
              <a
                href="/contact"
                className="inline-block bg-[#9c7459] hover:bg-[#86644c] text-white py-3 px-6 rounded-md font-medium text-base transition-colors"
              >
                Start a Fundraiser
              </a>
            </div>
          )}

          <div className="mt-16 bg-[#f0e6de] rounded-lg p-8 shadow-md">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#9c7459] mb-3 sm:mb-4">Start Your Own Fundraiser</h2>
              <p className="text-gray-700 text-sm sm:text-base mb-6">
                Help support Almost Home Canine Rescue by starting your own fundraiser to provide food, medical care, and safe shelter for dogs in need. Every contribution gives them a better chance at finding a forever home.
              </p>
              <a
                href="/contact"
                className="inline-block bg-[#9c7459] hover:bg-[#86644c] text-white py-3 px-6 rounded-md font-medium text-base sm:text-lg transition-colors"
              >
                Contact Us to Get Started
              </a>
            </div>
          </div>
        </div>
      </section>

      {selectedFundraiser && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm overflow-y-auto py-8 sm:py-12 px-4">
          <div className="relative mx-auto max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[calc(100vh-4rem)] sm:max-h-[calc(100vh-6rem)]">
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition"
              aria-label="Close details"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div
              className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-6 lg:gap-0 overflow-y-auto lg:overflow-hidden max-h-[calc(100vh-8rem)] sm:max-h-[calc(100vh-8rem)]"
              style={{ scrollPaddingTop: '3rem' }}
            >
              <div className="p-6 lg:p-10 bg-[#f8f4f1]">
                <h2 className="text-3xl font-semibold text-[#7d5c46] mb-2">{selectedFundraiser.title}</h2>
                <p className="text-sm uppercase tracking-wide text-gray-600 mb-4">
                  {formatDate(selectedFundraiser.startDate)} &mdash; {formatDate(selectedFundraiser.endDate)}
                </p>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {selectedFundraiser.description ?? ''}
                </p>
                <div className="mt-6 flex flex-wrap gap-3 text-sm text-gray-600">
                  {typeof selectedFundraiser.raised === 'number' && typeof selectedFundraiser.goal === 'number' && selectedFundraiser.goal > 0 ? (
                    <>
                      <span className="font-semibold text-[#7d5c46]">
                        ${selectedFundraiser.raised.toLocaleString()} raised
                      </span>
                      <span>&bull;</span>
                      <span>${selectedFundraiser.goal.toLocaleString()} goal</span>
                    </>
                  ) : (
                    <span className="text-[#7d5c46] font-medium">Fundraising goal coming soon</span>
                  )}
                </div>
              </div>
              <div className="p-6 lg:pl-4 lg:pr-10 lg:py-10 lg:border-l lg:border-[#e8ded5] flex">
                <div className="w-full h-full min-h-[360px] lg:min-h-[480px]">
                  <ImageCarousel images={selectedFundraiser.images || []} onClose={closeModal} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default FundraisersPage;
