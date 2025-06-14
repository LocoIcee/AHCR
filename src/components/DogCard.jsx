import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ImageCarousel from './ImageCarousel';

const DogCard = ({ 
  name, 
  images, 
  age, 
  sex, 
  breed, 
  description, 
  availability = 'available'  // can be 'available' or 'pending'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  // We only need isOpen state as the carousel component handles its own state

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
            setIsOpen(true);
          }}
          className="bg-[#9c7459] hover:bg-[#7d5c46] text-white py-2 px-4 rounded w-full transition mt-2"
        >
          Learn More
        </button>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white rounded-lg w-full max-w-4xl shadow-2xl relative flex flex-col md:flex-row max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-3 right-3 z-50 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-gray-100 transition-all text-gray-700"
              onClick={() => setIsOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            
            <div className="md:w-1/2 w-full">
              <ImageCarousel 
                images={images} 
                onClose={() => setIsOpen(false)} 
              />
            </div>
            
            <div className="p-6 md:w-1/2 w-full overflow-y-auto">
              <div className="flex flex-col h-full">
                <div className="mb-6">
                  <h3 className="font-bold text-2xl md:text-3xl mb-2 text-[#9c7459]">{name}</h3>
                  <p className="text-gray-600 mb-2 flex items-center">
                    <span className="inline-block mr-2 w-2 h-2 rounded-full bg-gray-400"></span>
                    {age} • {sex} • {breed}
                  </p>
                  
                  <div className={`inline-block py-1 px-3 rounded-full text-sm font-semibold mb-4
                    ${availability === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                    {availability === 'pending' ? 'Application Pending' : 'Available for Adoption'}
                  </div>
                  
                  <div className="prose prose-sm max-w-none">
                    <p className="text-gray-700">{description}</p>
                  </div>
                </div>
                <div className="mt-auto">
                  <a 
                    href="/application" 
                    className="bg-gray-700 hover:bg-[#4e7471] text-white py-3 px-4 rounded w-full block text-center font-medium transition-all"
                  >
                    Apply to Adopt {name}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
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
  availability: PropTypes.oneOf(['available', 'pending'])
};

export default DogCard;