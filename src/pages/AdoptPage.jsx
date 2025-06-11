import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DogCard from '../components/DogCard';
import AdoptionProcess from '../components/AdoptionProcess';
import AvailabilityLabel from '../components/AvailabilityLabel';
import { supabase } from '../data/supabaseClient';

const AdoptPage = () => {
  const [dogs, setDogs] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchDogs = async () => {
      const { data, error } = await supabase
        .from('Adoptable Dogs')
        .select('*')
        .order('created at', { ascending: true });

      if (error) {
        console.error('Error fetching dogs:', error);
      } else {
        setDogs(data);
      }
    };

    fetchDogs();
  }, []);
  
  const filteredDogs = filter === 'all' 
    ? dogs 
    : dogs.filter(dog => dog.availability === filter);
  console.log('Dogs:', dogs);
  console.log('Filtered:', filteredDogs);
  return (
    <>
      {/* Banner Section */}
      <section className="relative h-[450px] w-full flex items-center justify-center">
        <div
          className="absolute inset-0 bg-gradient-to-r from-tealGrey via-[#d4b396] to-primary"
        ></div>
        <img
          src={`${import.meta.env.BASE_URL}assets/images/siteDogs/dogs.png`}
          alt="Adoptable Dogs"
          className="absolute bottom-0 h-[380px] object-contain z-10"
        />
        <h1 className="relative z-20 text-6xl font-extrabold drop-shadow-md uppercase tracking-widest mb-32">
          <span className="text-darkbrown">Adopt</span> <span className="text-white">a Dog</span>
        </h1>
      </section>

      <div className="container mx-auto px-4">
      {/* Welcome Section */}
      <section className="mt-8 mb-12 text-center">
        <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-6">
          We're so happy that you're thinking of giving a dog their furever home!
          All dogs listed here are healthy and eager to meet their new families.
        </p>
        <p className="text-gray-600 mb-6 max-w-3xl mx-auto">
          If you've seen a dog at the rescue or on social media that isn't listed here, 
          don't worry, our team is hard at work getting each dog healthy, and preparing the little 
          ones for long, happy lives with their new humans. They'll be listed as soon as they're ready.
        </p>
        <p className="text-sm italic text-gray-500">
          *Please note that although we appreciate phone calls, emails and other forms of contact for our available dogs, 
          only those with applications will be considered as potential adopters*
        </p>
      </section>

      {/* Meet & Greets Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-4xl font-secondary text-[#9c7459] mb-4">Meet & Greets</h2>
          <p className="mb-4">
            Please note meet and greets are by appointment only. Only those selected as potential adopters 
            will be contacted for a phone interview to arrange a meet within 48 hours of their phone interview.
          </p>
          <p className="mb-4">
            While waiting for their Furever Homes, the dogs stay at our rescue or with fosters in surrounding areas 
            like Edmonton and Calgary. Please <Link to="/contact" className="text-[#9c7459] underline">contact us</Link> to set up a meet & greet!
          </p>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-4xl font-secondary text-[#9c7459] mb-4">Foster</h2>
          <p className="mb-4">
            Many of these dogs are available to foster while they wait for their Furever Home! If you are interested 
            in fostering, click <Link to="/foster" className="text-[#9c7459] underline">here</Link>.
          </p>
        </div>
      </section>

      {/* Availability Labels */}
      <section className="mb-12">
        <h2 className="text-5xl font-secondary text-[#9c7459] mb-6">Availability Labels</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AvailabilityLabel type="available" />
          <AvailabilityLabel type="pending" />
        </div>
      </section>

      {/* Dog Listings */}
      <section className="mb-12" id="dog-listings">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-6xl font-secondary text-[#9c7459]">Dogs Available for Adoption</h2>
          <div className="flex space-x-2">
            <button 
              className={`px-4 py-2 rounded-lg ${filter === 'all' ? 'bg-[#9c7459] text-white' : 'bg-gray-200 text-gray-800'}`}
              onClick={() => setFilter('all')}
            >
              All Dogs
            </button>
            <button 
              className={`px-4 py-2 rounded-lg ${filter === 'available' ? 'bg-[#9c7459] text-white' : 'bg-gray-200 text-gray-800'}`}
              onClick={() => setFilter('available')}
            >
              Available
            </button>
            <button 
              className={`px-4 py-2 rounded-lg ${filter === 'pending' ? 'bg-[#9c7459] text-white' : 'bg-gray-200 text-gray-800'}`}
              onClick={() => setFilter('pending')}
            >
              Application Pending
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDogs.length > 0 ? (
            filteredDogs.map(dog => (
              <DogCard
                key={dog.id}
                name={dog.name}
                image={dog.image}
                age={dog.age}
                sex={dog.sex}
                breed={dog.breed}
                description={dog.description}
                availability={dog.availability}
              />
            ))
          ) : (
            <div className="col-span-3 text-center py-10">
              <p className="text-xl text-gray-600">No dogs currently match your filter. Please check back soon!</p>
            </div>
          )}
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-600 mb-4">Check back soon for frequent updates!</p>
          <a href="#adoption-process" className="bg-[#9c7459] hover:bg-[#7d5c46] text-white py-2 px-6 rounded transition inline-block">
            Ready to Adopt? View Our Process
          </a>
        </div>
      </section>

      {/* Adoption Process Section */}
      <section className="mb-12" id="adoption-process">
        <h2 className="text-3xl font-bold text-[#9c7459] mb-6">Our Adoption Process</h2>
        <AdoptionProcess />
      </section>

      {/* Adoption FAQ */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-[#9c7459] mb-6">Adoption FAQ</h2>
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-2">What are the adoption fees?</h3>
              <p className="text-gray-700 mb-2">Our adoption fees vary based on the age of the dog:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Dogs over 7 months of age: $550.00</li>
                <li>Dogs 6 months & under: $250.00</li>
              </ul>
              <p className="text-gray-700 mt-2">
                This fee helps cover the cost of rescue, veterinary care, and transportation.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-2">What is included in the adoption?</h3>
              <p className="text-gray-700">
                The adoption fee covers their vaccinations to date, deworming, microchip
                and any other treatments and tests medically required prior to adoption. 
                Dogs 6 months and older will be spayed/neutered and the
                procedure will be covered by AHCR.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-2">How long does the adoption process take?</h3>
              <p className="text-gray-700">
                Once you've submitted an application, the process typically takes 1-2 weeks, 
                including reference checks, home visit, and meet-and-greet.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-2">What if the adoption doesn't work out?</h3>
              <p className="text-gray-700">
                We understand that sometimes, despite best intentions, an adoption may not work out. 
                We always take our dogs back if needed and will work with you to find a solution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form Link */}
      <section className="text-center mb-12" id="application-form">
        <h2 className="text-3xl font-bold text-[#9c7459] mb-4">Ready to Start the Adoption Process?</h2>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-6">
          Take the first step towards bringing home your new best friend.
        </p>
        <Link to="/application" className="bg-[#9c7459] hover:bg-[#7d5c46] text-white py-3 px-8 rounded-lg text-xl inline-block transition">
          Fill Out Adoption Application
        </Link>
      </section>
      </div>
    </>
  );
};

export default AdoptPage;