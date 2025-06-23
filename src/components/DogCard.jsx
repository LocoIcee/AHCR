'use client';
import React from 'react';
import PropTypes from 'prop-types';
import ImageCarousel from './ImageCarousel';

const DogCard = ({ 
  name, 
  images, 
  age, 
  sex, 
  breed, 
  description, 
  availability = 'available',  // can be 'available' or 'pending'
  onLearnMore
}) => {

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col h-full">
      <div className="relative">
        {/\.(mp4|webm|ogg)$/i.test(images[images.length - 1]) ? (
          <video 
            src={images[images.length - 1]} 
            className="w-full h-64 object-cover" 
            controls 
          />
        ) : (
          <img 
            src={images[images.length - 1]} 
            alt={`${name} - ${breed}`} 
            className="w-full h-64 object-cover"
          />
        )}
        {/* Availability Badge */}
        <div className={`absolute top-4 right-4 py-1 px-3 rounded-full text-sm font-semibold
          ${availability === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
          {availability === 'pending' ? 'Application Pending' : 'Available'}
        </div>
      </div>
      <div className="p-4 flex flex-col justify-between h-full">
        <div>
          <h3 className="font-bold text-xl mb-1">{name}</h3>
          <p className="text-gray-600 mb-3">
            {[
              age.years > 0 && `${age.years}y`,
              age.months > 0 && `${age.months}m`,
              age.weeks > 0 && `${age.weeks}w`
            ].filter(Boolean).join(' ')} • {sex} • {breed}
          </p>
          <p className="text-gray-700 mb-4 line-clamp-3">
            {description}
          </p>
        </div>
        <button
          onClick={() => {
            if(onLearnMore) onLearnMore();
          }}
          className="bg-[#9c7459] hover:bg-[#7d5c46] text-white py-2 px-4 rounded w-full transition mt-2"
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

DogCard.propTypes = {
  name: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  age: PropTypes.shape({
    weeks: PropTypes.number,
    months: PropTypes.number,
    years: PropTypes.number
  }).isRequired,
  sex: PropTypes.string.isRequired,
  breed: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  availability: PropTypes.oneOf(['available', 'pending']),
  onLearnMore: PropTypes.func,
};

export default DogCard;