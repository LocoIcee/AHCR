import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

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
  const [currentImage, setCurrentImage] = useState(0);

  const handlePrevImage = () => {
    setCurrentImage((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNextImage = () => {
    setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
  };

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
            setCurrentImage(0);
            setIsOpen(true);
          }}
          className="bg-[#9c7459] hover:bg-[#7d5c46] text-white py-2 px-4 rounded w-full transition mt-2"
        >
          Learn More
        </button>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white rounded-lg w-[75%] max-w-[1200px] p-8 shadow-xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
            <div className="relative flex items-center justify-center mb-6">
              <button 
                className="absolute left-0 z-10 bg-white bg-opacity-75 p-2 rounded-full shadow hover:bg-opacity-100"
                onClick={handlePrevImage}
              >
                ◀
              </button>
              <div
                className="rounded w-full h-[400px] bg-center bg-cover"
                style={{ backgroundImage: `url(${images[currentImage]})` }}
              ></div>
              <button 
                className="absolute right-0 z-10 bg-white bg-opacity-75 p-2 rounded-full shadow hover:bg-opacity-100"
                onClick={handleNextImage}
              >
                ▶
              </button>
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
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  age: PropTypes.string.isRequired,
  sex: PropTypes.string.isRequired,
  breed: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  availability: PropTypes.oneOf(['available', 'pending'])
};

export default DogCard;