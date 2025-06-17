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
        <img 
          src={images[images.length - 1]} 
          alt={`${name} - ${breed}`} 
          className="w-full h-64 object-cover"
        />
        {/* Availability Badge */}
        <div className={`absolute top-4 right-4 py-1 px-3 rounded-full text-sm font-semibold
          ${availability === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
          {availability === 'pending' ? 'Application Pending' : 'Available'}
        </div>
      </div>
      <div className="p-4 flex flex-col justify-between h-full">
        <div>
          <h3 className="font-bold text-xl mb-1">{name}</h3>
          <p className="text-gray-600 mb-3">{age} • {sex} • {breed}</p>
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
  age: PropTypes.number.isRequired,
  sex: PropTypes.string.isRequired,
  breed: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  availability: PropTypes.oneOf(['available', 'pending']),
  onLearnMore: PropTypes.func,
};

export default DogCard;