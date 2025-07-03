'use client';
import { useState, useEffect } from 'react';
import FundraiserCard from '@/components/FundraiserCard';
import PawPrint from '@/assets/PawPrint';
import { supabase } from '@/lib/supabaseClient';

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
    <main className="pt-32 pb-16 min-h-screen bg-gray-50">
      <section>
        <div className="relative mb-12 bg-gradient-to-r from-[#f8f4f1] to-[#e2d2c5] py-12 shadow-lg overflow-hidden w-full">
          {/* Decorative paw prints */}
          <div className="absolute -top-8 left-1/4 transform -translate-x-1/2 opacity-20 animate-bounce">
            <PawPrint className="h-28 w-28 text-[#9c7459]" />
          </div>
          <div className="absolute -bottom-8 right-1/4 transform translate-x-1/2 opacity-20 animate-bounce delay-200">
            <PawPrint className="h-24 w-24 text-[#9c7459]" />
          </div>
          <div className="relative z-10 text-center px-4">
            <h1 className="text-5xl md:text-6xl font-extrabold text-[#7d5c46] mb-4 drop-shadow">
              Fundraisers
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Support our mission to rescue and rehome dogs in need by contributing to one of our fundraising campaigns.
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-white rounded-lg p-1 shadow-sm">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  filter === 'all' ? 'bg-[#9c7459] text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                All Fundraisers
              </button>
              <button
                onClick={() => setFilter('active')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  filter === 'active' ? 'bg-[#9c7459] text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setFilter('upcoming')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  filter === 'upcoming' ? 'bg-[#9c7459] text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setFilter('past')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  filter === 'past' ? 'bg-[#9c7459] text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Past
              </button>
            </div>
          </div>
          
          {fundraisers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
              {fundraisers.map(fundraiser => (
                <FundraiserCard
                  key={fundraiser.id}
                  {...fundraiser}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500">No fundraisers found in this category.</p>
            </div>
          )}

          <div className="mt-16 bg-[#f0e6de] rounded-lg p-8 shadow-md">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-[#9c7459] mb-4">Start Your Own Fundraiser</h2>
              <p className="text-gray-700 mb-6">
                Help support Almost Home Canine Rescue by starting your own fundraiser to provide food, medical care, and safe shelter for dogs in need. Every contribution gives them a better chance at finding a forever home.
              </p>
              <a
                href="/contact"
                className="inline-block bg-[#9c7459] hover:bg-[#86644c] text-white py-3 px-6 rounded-md font-medium text-lg transition-colors"
              >
                Contact Us to Get Started
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default FundraisersPage;