import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const DogCard = ({ 
  name, 
  image, 
  age, 
  sex, 
  breed, 
  description, 
  availability = 'available'  // can be 'available' or 'pending'
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="relative">
        <img 
          src={image} 
          alt={`${name} - ${breed}`} 
          className="w-full h-64 object-cover"
        />
        {/* Availability Badge */}
        <div className={`absolute top-4 right-4 py-1 px-3 rounded-full text-sm font-semibold
          ${availability === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
          {availability === 'pending' ? 'Application Pending' : 'Available'}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-xl mb-1">{name}</h3>
        <p className="text-gray-600 mb-3">{age} • {sex} • {breed}</p>
        <p className="text-gray-700 mb-4 line-clamp-3">
          {description}
        </p>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#9c7459] hover:bg-[#7d5c46] text-white py-2 px-4 rounded w-full transition"
        >
          Learn More
        </button>
      </div>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg w-[75%] max-w-[1200px] p-8 shadow-xl relative">
            <button 
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
            <div className="w-full aspect-video mb-6">
              <img 
                src={image} 
                alt={`${name} - ${breed}`} 
                className="w-full h-full object-contain rounded"
              />
            </div>
            <h3 className="font-bold text-2xl mb-2">{name}</h3>
            <p className="text-gray-600 mb-4">{age} • {sex} • {breed}</p>
            <p className="text-gray-700 mb-4">{description}</p>
            <button className="bg-[#5f8b88] hover:bg-[#4e7471] text-white py-2 px-4 rounded w-full">
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

DogCard.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  age: PropTypes.string.isRequired,
  sex: PropTypes.string.isRequired,
  breed: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  availability: PropTypes.oneOf(['available', 'pending'])
};

export default DogCard;