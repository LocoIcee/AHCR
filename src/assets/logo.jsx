import React from 'react';

export const Logo = ({ className }) => {
  return (
    <div className={`${className} overflow-hidden rounded-full bg-white shadow-md relative p-0`}>
      <img 
        src="/assets/images/logo-black.jpg" 
        alt="Almost Home Canine Rescue Logo" 
        className="absolute inset-0 w-[103%] h-[103%] object-cover transform-gpu"
        style={{ objectPosition: 'center 47%', left: '-1.5%', top: '-1.5%' }}
      />
    </div>
  );
};
