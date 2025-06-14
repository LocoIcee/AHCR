import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ImageCarousel = ({ images, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  // For touch swipe functionality
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left
      handleNext();
    }
    if (touchEnd - touchStart > 50) {
      // Swipe right
      handlePrev();
    }
  };

  // Calculate dot indices for pagination
  const getVisibleDots = () => {
    if (images.length <= 5) return images.map((_, i) => i);
    
    let dots = [currentIndex];
    let left = currentIndex;
    let right = currentIndex;
    
    // Add 2 dots on each side if possible
    for (let i = 0; i < 2; i++) {
      left = (left - 1 + images.length) % images.length;
      right = (right + 1) % images.length;
      dots.push(left, right);
    }
    
    return [...new Set(dots)].sort((a, b) => a - b);
  };

  return (
    <div className="w-full h-full relative">
      {/* Main image container */}
      <div 
        className="w-full relative overflow-hidden rounded-lg"
        style={{ 
          height: "100%",
          minHeight: "300px"
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="h-full w-full bg-gray-100">
          <img
            src={images[currentIndex]}
            alt={`Image ${currentIndex + 1}`}
            className="w-full h-full object-cover"
            style={{
              transition: "opacity 0.3s ease",
              opacity: isAnimating ? 0.7 : 1
            }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `${import.meta.env.BASE_URL}assets/images/placeholder.png`;
            }}
          />
        </div>

        {/* Navigation buttons */}
        <button
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full w-10 h-10 flex items-center justify-center shadow-md transition-all z-10"
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          aria-label="Previous image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full w-10 h-10 flex items-center justify-center shadow-md transition-all z-10"
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          aria-label="Next image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Pagination indicators */}
        <div className="absolute bottom-4 left-0 w-full flex justify-center items-center space-x-2 z-10">
          {images.length > 1 && images.map((_, index) => (
            <button
              key={index}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                index === currentIndex ? 'bg-[#5e3b1e] w-4' : 'bg-[#5e3b1e] opacity-50 hover:opacity-70'
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Image counter */}
      <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};

ImageCarousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClose: PropTypes.func.isRequired
};

export default ImageCarousel;