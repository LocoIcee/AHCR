'use client';
import { useState } from 'react';
import Image from 'next/image';
import ImageCarousel from './ImageCarousel';

const FundraiserCard = ({ id, title, description, startDate, endDate, images, raised, goal }) => {
  // Calculate days remaining
  const today = new Date();
  const end = new Date(endDate);
  const daysRemaining = Math.max(0, Math.ceil((end - today) / (1000 * 60 * 60 * 24)));
  
  // Calculate progress percentage
  const progressPercentage = Math.min(100, Math.round((raised / goal) * 100));

  // Format dates
  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'America/Edmonton' });
  };
  
  // Check if fundraiser is active (date-only comparison)
  const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const [startYear, startMonth, startDay] = startDate.split('-').map(Number);
  const [endYear, endMonth, endDay] = endDate.split('-').map(Number);
  const start = new Date(startYear, startMonth - 1, startDay);
  const endDateOnly = new Date(endYear, endMonth - 1, endDay);
  const isActive = todayDateOnly >= start && todayDateOnly <= endDateOnly;

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
        <div className="relative aspect-[16/9]">
          <ImageCarousel images={images} />
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
          <p className="text-gray-700">{description}</p>
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
      </div>
      </div>
    </>
  );
};

export default FundraiserCard;