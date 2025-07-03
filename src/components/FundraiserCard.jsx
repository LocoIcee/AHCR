'use client';
import { useState } from 'react';
import Image from 'next/image';

const FundraiserCard = ({ id, title, description, startDate, endDate, imageSrc, raised, goal }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Calculate days remaining
  const today = new Date();
  const end = new Date(endDate);
  const daysRemaining = Math.max(0, Math.ceil((end - today) / (1000 * 60 * 60 * 24)));
  
  // Calculate progress percentage
  const progressPercentage = Math.min(100, Math.round((raised / goal) * 100));

  // Format dates
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };
  
  // Check if fundraiser is active
  const isActive = today <= end && today >= new Date(startDate);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="relative h-56">
        <Image
          src={imageSrc}
          alt={title}
          fill
          style={{ objectFit: "cover" }}
          className="transition-transform duration-300 hover:scale-105"
        />
        {isActive ? (
          <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            Active
          </div>
        ) : today > end ? (
          <div className="absolute top-4 right-4 bg-gray-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            Completed
          </div>
        ) : (
          <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            Upcoming
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-2xl font-bold text-[#9c7459] mb-2">{title}</h3>
        
        <div className="flex justify-between text-sm text-gray-600 mb-3">
          <span>{formatDate(startDate)} - {formatDate(endDate)}</span>
          {isActive && <span>{daysRemaining} days left</span>}
        </div>
        
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-[#9c7459] h-2.5 rounded-full" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-1 text-sm font-medium">
            <span>${raised.toLocaleString()} raised</span>
            <span>${goal.toLocaleString()} goal</span>
          </div>
        </div>
        
        <div className={`transition-all duration-300 ${isExpanded ? 'max-h-[500px]' : 'max-h-24'} overflow-hidden`}>
          <p className="text-gray-700">{description}</p>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <button 
            onClick={toggleExpand}
            className="text-sm text-[#9c7459] font-medium hover:underline"
          >
            {isExpanded ? 'Show less' : 'Read more'}
          </button>
          
          <button 
            className="bg-[#9c7459] hover:bg-[#86644c] text-white py-2 px-4 rounded transition-colors"
          >
            Donate Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default FundraiserCard;