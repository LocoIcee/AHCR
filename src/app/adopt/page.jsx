'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import DogCard from '@/components/DogCard';
import AdoptionProcess from '@/components/AdoptionProcess';
import AvailabilityLabel from '@/components/AvailabilityLabel';
import { supabase } from '@/lib/supabaseClient';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ImageCarousel from '@/components/ImageCarousel';

const AdoptPage = () => {
  const [dogs, setDogs] = useState([]);
  const [filter, setFilter] = useState('all');
  const [selectedDog, setSelectedDog] = useState(null);

  const handleLearnMore = (dog) => {
    setSelectedDog(dog);
  };

  const closeModal = () => {
    setSelectedDog(null);
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

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

  return (
    <div className="overflow-hidden">
      {/* Banner Section */}
      <section className="relative h-[450px] w-full flex items-center justify-center animate-fadeIn animate-slideUp" data-aos="fade-up">
        <div
          className="absolute inset-0 bg-gradient-to-r from-tealGrey via-[#d4b396] to-primary"
        ></div>
        <img
          src="images/siteDogs/dogs.png"
          alt="Adoptable Dogs"
          className="absolute bottom-0 h-[380px] object-contain object-bottom z-10"
          data-aos="zoom-in"
        />
        <h1 className="relative z-20 text-6xl font-extrabold drop-shadow-md uppercase tracking-widest mb-32" data-aos="fade-up">
          <span className="text-darkbrown">Adopt</span> <span className="text-white">a Dog</span>
        </h1>
      </section>

      <div className="container mx-auto px-4">
      {/* Welcome Section */}
      <section className="mt-8 mb-12 text-center" data-aos="fade-up">
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
        <div className="bg-gray-50 p-6 rounded-lg" data-aos="fade-up">
          <h2 className="text-4xl font-secondary text-[#9c7459] mb-4" data-aos="fade-up">Meet & Greets</h2>
          <p className="mb-4">
            Please note meet and greets are by appointment only. Only those selected as potential adopters 
            will be contacted for a phone interview to arrange a meet within 48 hours of their phone interview.
          </p>
          <p className="mb-4">
            While waiting for their Furever Homes, the dogs stay at our rescue or with fosters in surrounding areas 
            like Edmonton and Calgary. Please <Link href="/contact" className="text-[#9c7459] underline">contact us</Link> to set up a meet & greet!
          </p>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg" data-aos="fade-up">
          <h2 className="text-4xl font-secondary text-[#9c7459] mb-4" data-aos="fade-up">Foster</h2>
          <p className="mb-4">
            Many of these dogs are available to foster while they wait for their Furever Home! If you are interested 
            in fostering, click <Link href="/foster" className="text-[#9c7459] underline">here</Link>.
          </p>
        </div>
      </section>

      {/* Availability Labels */}
      <section className="mb-12" data-aos="fade-up">
        <h2 className="text-5xl font-secondary text-[#9c7459] mb-6" data-aos="fade-up">Availability Labels</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" data-aos="fade-up">
          <AvailabilityLabel type="available" data-aos="zoom-in" />
          <AvailabilityLabel type="pending" data-aos="zoom-in" />
        </div>
      </section>

      {/* Dog Listings */}
      <section className="mb-12" id="dog-listings" data-aos="fade-up">
        <div className="flex justify-between items-center mb-6" data-aos="fade-up">
          <h2 className="text-6xl font-secondary text-[#9c7459]" data-aos="fade-up">Dogs Available for Adoption</h2>
          <div className="flex space-x-2">
            <button 
              className={`px-4 py-2 rounded-lg ${filter === 'all' ? 'bg-[#9c7459] text-white' : 'bg-gray-200 text-gray-800'} transition duration-200 ease-in-out transform hover:scale-105`}
              onClick={() => setFilter('all')}
            >
              All Dogs
            </button>
            <button 
              className={`px-4 py-2 rounded-lg ${filter === 'available' ? 'bg-[#9c7459] text-white' : 'bg-gray-200 text-gray-800'} transition duration-200 ease-in-out transform hover:scale-105`}
              onClick={() => setFilter('available')}
            >
              Available
            </button>
            <button 
              className={`px-4 py-2 rounded-lg ${filter === 'pending' ? 'bg-[#9c7459] text-white' : 'bg-gray-200 text-gray-800'} transition duration-200 ease-in-out transform hover:scale-105`}
              onClick={() => setFilter('pending')}
            >
              Application Pending
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-aos="fade-up">
          {filteredDogs.length > 0 ? (
            filteredDogs.map((dog, index) => (
              <div
                key={dog.id}
                className="transition-transform hover:scale-105 hover:shadow-lg"
                data-aos={index % 2 === 0 ? 'fade-left' : 'fade-right'}
              >
                <DogCard
                  name={dog.name}
                  images={dog.images}
                  age={dog.age}
                  sex={dog.sex}
                  breed={dog.breed}
                  description={dog.description}
                  availability={dog.availability}
                  onLearnMore={() => handleLearnMore(dog)}
                />
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-10" data-aos="fade-up">
              <p className="text-xl text-gray-600">No dogs currently match your filter. Please check back soon!</p>
            </div>
          )}
        </div>

        <div className="text-center mt-8" data-aos="fade-up">
          <p className="text-gray-600 mb-4">Check back soon for frequent updates!</p>
          <a href="#adoption-process" className="bg-[#9c7459] hover:bg-[#7d5c46] text-white py-2 px-6 rounded transition inline-block transition-transform hover:scale-105 shadow-md">
            Ready to Adopt? View Our Process
          </a>
        </div>
      </section>

      {selectedDog && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/30 p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg w-full max-w-4xl shadow-2xl relative flex flex-col md:flex-row max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-3 right-3 z-50 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-gray-100 transition-all text-gray-700"
              onClick={closeModal}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>

            <div className="md:w-1/2 w-full">
              <ImageCarousel 
                images={selectedDog.images} 
                onClose={closeModal}
              />
            </div>

            <div className="p-6 md:w-1/2 w-full overflow-y-auto">
              <div className="flex flex-col h-full">
                <div className="mb-6">
                  <h3 className="font-bold text-2xl md:text-3xl mb-2 text-[#9c7459]">{selectedDog.name}</h3>
                  <p className="text-gray-600 mb-2 flex items-center">
                    <span className="inline-block mr-2 w-2 h-2 rounded-full bg-gray-400"></span>
                    {selectedDog.age?.weeks || selectedDog.age?.months || selectedDog.age?.years ? (
                      <>
                        {selectedDog.age.weeks > 0 && `${selectedDog.age.weeks}w `}
                        {selectedDog.age.months > 0 && `${selectedDog.age.months}m `}
                        {selectedDog.age.years > 0 && `${selectedDog.age.years}y `}
                      </>
                    ) : 'Age unknown'} • {selectedDog.sex} • {selectedDog.breed}
                  </p>
                  <div className={`inline-block py-1 px-3 rounded-full text-sm font-semibold mb-4
                    ${selectedDog.availability === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                    {selectedDog.availability === 'pending' ? 'Application Pending' : 'Available for Adoption'}
                  </div>
                  <div className="prose prose-sm max-w-none">
                    <p className="text-gray-700">{selectedDog.description}</p>
                  </div>
                </div>
                <div className="mt-auto">
                  <a 
                    href="https://docs.google.com/forms/d/e/1FAIpQLScZHJt4o1tNLyqIlNY9WjbYo779Co2fE0K3TLQ4f_wUyaRJYg/viewform" 
                    className="bg-gray-700 hover:bg-[#4e7471] text-white py-3 px-4 rounded w-full block text-center font-medium transition-all"
                  >
                    Apply to Adopt {selectedDog.name}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Adoption Process Section */}
      <section className="mb-12" id="adoption-process" data-aos="fade-up">
        <h2 className="text-3xl font-bold text-[#9c7459] mb-6" data-aos="fade-up">Our Adoption Process</h2>
        <AdoptionProcess />
      </section>

      {/* Adoption FAQ */}
      <section className="mb-12" data-aos="fade-up">
        <h2 className="text-3xl font-bold text-[#9c7459] mb-6" data-aos="zoom-in">Adoption FAQ</h2>
        <div className="bg-gray-50 p-6 rounded-lg" data-aos="fade-up">
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
                We will take our dogs back dependant on space availability and work with you to find a solution
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form Link */}
      <section className="text-center mb-12" id="application-form" data-aos="fade-up">
        <h2 className="text-3xl font-bold text-[#9c7459] mb-4" data-aos="fade-up">Ready to Start the Adoption Process?</h2>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-6">
          Take the first step towards bringing home your new best friend.
        </p>
        <Link href="https://docs.google.com/forms/d/e/1FAIpQLScZHJt4o1tNLyqIlNY9WjbYo779Co2fE0K3TLQ4f_wUyaRJYg/viewform" className="bg-[#9c7459] hover:bg-[#7d5c46] text-white py-3 px-8 rounded-lg text-xl inline-block transition-transform hover:scale-105 shadow-md">
          Fill Out Adoption Application
        </Link>
      </section>
      </div>
    </div>
  );
};

export default AdoptPage;