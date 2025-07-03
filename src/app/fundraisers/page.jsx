'use client';
import { useState, useEffect } from 'react';
import FundraiserCard from '@/components/FundraiserCard';
import PawPrint from '@/assets/PawPrint';
import { supabase } from '@/lib/supabaseClient';

// Sample fundraiser data - would be replaced with dynamic data in a production environment
const sampleFundraisers = [
  {
    id: 1,
    title: "Summer Adoption Drive",
    description: "Help us find forever homes for 50 rescue dogs this summer! This special fundraising event aims to support our summer adoption campaign by covering medical expenses, food, and care for our rescue dogs while they wait for their forever homes. Your donation will directly impact these animals' lives and help us continue our mission to rescue and rehome dogs in need. Join us in making this summer special for our furry friends!",
    startDate: "2025-06-01",
    endDate: "2025-08-31",
    imageSrc: "",
    raised: 12500,
    goal: 25000
  },
  {
    id: 2,
    title: "Emergency Medical Fund",
    description: "Our Emergency Medical Fund ensures we can provide urgent care to rescue dogs with critical medical needs. Recently, we took in several dogs requiring immediate surgeries and ongoing treatments. Your support will help us cover veterinary bills, medications, specialized care, and recovery support for these vulnerable animals. Every donation, no matter how small, makes a difference in giving these dogs a second chance at life.",
    startDate: "2025-05-15",
    endDate: "2025-07-15",
    imageSrc: "/images/fundraisers/medical-fund.jpg",
    raised: 18750,
    goal: 20000
  },
  {
    id: 3,
    title: "New Shelter Construction",
    description: "We're expanding our facilities to help more dogs in need! This fundraiser supports the construction of our new shelter space, which will include improved kennel facilities, a dedicated medical treatment area, and a training space for behavioral rehabilitation. The new shelter will allow us to rescue and care for 30% more dogs annually. Your contribution will help create a safe and comfortable environment for rescue dogs waiting for their forever homes.",
    startDate: "2025-08-01",
    endDate: "2025-12-31",
    imageSrc: "",
    raised: 45000,
    goal: 150000
  },
  {
    id: 4,
    title: "Winter Warmth Campaign",
    description: "As winter approaches, we're raising funds to ensure all our rescue dogs stay warm and comfortable. This fundraiser will help us purchase heated beds, insulation for outdoor kennels, winter coats for dogs in foster care, and increased heating costs for our shelter. Your donation will directly contribute to the comfort and well-being of our rescues during the cold months ahead.",
    startDate: "2025-10-01",
    endDate: "2025-12-15",
    imageSrc: "hfvn", 
    raised: 3200,
    goal: 10000
  }
];

const FundraisersPage = () => {
  const [filter, setFilter] = useState('all');
  const [fundraisers, setFundraisers] = useState([]);
  
  useEffect(() => {
    // Filter fundraisers based on selected filter
    const today = new Date();
    
    if (filter === 'all') {
      setFundraisers(sampleFundraisers);
    } else if (filter === 'active') {
      setFundraisers(sampleFundraisers.filter(fundraiser => {
        const start = new Date(fundraiser.startDate);
        const end = new Date(fundraiser.endDate);
        return today >= start && today <= end;
      }));
    } else if (filter === 'upcoming') {
      setFundraisers(sampleFundraisers.filter(fundraiser => {
        const start = new Date(fundraiser.startDate);
        return today < start;
      }));
    } else if (filter === 'past') {
      setFundraisers(sampleFundraisers.filter(fundraiser => {
        const end = new Date(fundraiser.endDate);
        return today > end;
      }));
    }
  }, [filter]);

  useEffect(() => {
    const fetchFundraisers = async () => {
      const { data, error } = await supabase
        .from('Fundraoisers')
        .select('*')
        .order('startDate', { ascending: true });

      if (error) {
        console.error('Error fetching dogs:', error);
      } else {
        setFundraisers(data);
      }
    };

    fetchFundraisers();
  }, []);

  return (
    <main className="pt-32 pb-16 min-h-screen bg-gray-50">
      <section className="container mx-auto px-4">
        <div className="text-center mb-12 relative">
          {/* Decorative paw prints */}
          <div className="absolute -top-10 left-1/4 transform -translate-x-1/2 opacity-20">
            <PawPrint className="h-16 w-16 text-[#9c7459]" />
          </div>
          <div className="absolute top-0 right-1/4 transform translate-x-1/2 opacity-20">
            <PawPrint className="h-12 w-12 text-[#9c7459]" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-[#9c7459] mb-4">
            Fundraisers
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Support our mission to rescue and rehome dogs in need by contributing to one of our fundraising campaigns.
          </p>
        </div>
        
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
              Want to organize a fundraiser for Almost Home Canine Rescue? We welcome community-driven fundraising initiatives! From birthday fundraisers to corporate matching campaigns, your support makes a tremendous difference.
            </p>
            <button className="bg-[#9c7459] hover:bg-[#86644c] text-white py-3 px-6 rounded-md font-medium text-lg transition-colors">
              Contact Us to Get Started
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default FundraisersPage;