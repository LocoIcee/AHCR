import React from 'react';

const GetInvolvedPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-[#9c7459] mb-4">Get Involved</h1>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
          There are many ways to help our rescue dogs find their forever homes.
        </p>
      </section>
      
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-[#9c7459] mb-6">Volunteer Opportunities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="h-48 bg-gray-300"></div>
            <div className="p-6">
              <h3 className="font-bold text-xl mb-2 text-[#9c7459]">Dog Handlers</h3>
              <p className="text-gray-700 mb-4">
                Help walk, socialize, and provide basic training for our rescue dogs. This is perfect for 
                dog lovers who want hands-on experience with our canine friends.
              </p>
              <p className="text-gray-600 mb-4">
                <span className="font-semibold">Time Commitment:</span> 2-4 hours weekly
              </p>
              <button className="bg-[#9c7459] hover:bg-[#7d5c46] text-white py-2 px-4 rounded">
                Apply Now
              </button>
            </div>
          </div>
          
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="h-48 bg-gray-300"></div>
            <div className="p-6">
              <h3 className="font-bold text-xl mb-2 text-[#9c7459]">Transport Volunteers</h3>
              <p className="text-gray-700 mb-4">
                Help transport dogs to/from vet appointments, adoption events, and new foster homes.
                Must have a valid driver's license and reliable vehicle.
              </p>
              <p className="text-gray-600 mb-4">
                <span className="font-semibold">Time Commitment:</span> As needed, flexible scheduling
              </p>
              <button className="bg-[#9c7459] hover:bg-[#7d5c46] text-white py-2 px-4 rounded">
                Apply Now
              </button>
            </div>
          </div>
          
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="h-48 bg-gray-300"></div>
            <div className="p-6">
              <h3 className="font-bold text-xl mb-2 text-[#9c7459]">Event Coordinators</h3>
              <p className="text-gray-700 mb-4">
                Help plan and execute adoption events, fundraisers, and community outreach initiatives.
                Great for those with organizational and people skills.
              </p>
              <p className="text-gray-600 mb-4">
                <span className="font-semibold">Time Commitment:</span> 5-10 hours monthly, more during events
              </p>
              <button className="bg-[#9c7459] hover:bg-[#7d5c46] text-white py-2 px-4 rounded">
                Apply Now
              </button>
            </div>
          </div>
          
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="h-48 bg-gray-300"></div>
            <div className="p-6">
              <h3 className="font-bold text-xl mb-2 text-[#9c7459]">Social Media & Marketing</h3>
              <p className="text-gray-700 mb-4">
                Help manage our social media accounts, create content, and spread awareness about our 
                rescue dogs and initiatives. Ideal for creative individuals with marketing experience.
              </p>
              <p className="text-gray-600 mb-4">
                <span className="font-semibold">Time Commitment:</span> 3-5 hours weekly, can be done remotely
              </p>
              <button className="bg-[#9c7459] hover:bg-[#7d5c46] text-white py-2 px-4 rounded">
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <section className="mb-12">
        <div className="bg-gray-100 p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-[#9c7459] mb-4">Donate Items</h2>
          <p className="text-gray-700 mb-4">
            We're always in need of supplies to help care for our rescue dogs. 
            Your donations make a direct impact on their quality of life while they await their forever homes.
          </p>
          
          <h3 className="text-xl font-bold mb-3">Our Wishlist:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ul className="text-gray-700 space-y-2">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-[#9c7459] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Dog food (dry and wet)</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-[#9c7459] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Treats and chews</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-[#9c7459] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Leashes and collars</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-[#9c7459] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Harnesses (all sizes)</span>
              </li>
            </ul>
            
            <ul className="text-gray-700 space-y-2">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-[#9c7459] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Dog beds and blankets</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-[#9c7459] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Toys (durable)</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-[#9c7459] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Crates and carriers</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-[#9c7459] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Puppy pads</span>
              </li>
            </ul>
            
            <ul className="text-gray-700 space-y-2">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-[#9c7459] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Cleaning supplies</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-[#9c7459] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Paper towels</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-[#9c7459] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Gift cards (pet stores, gas)</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-[#9c7459] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Office supplies</span>
              </li>
            </ul>
          </div>
          
          <div className="mt-6">
            <p className="text-gray-700 mb-4">
              Drop-off donations can be made at our main office during business hours, or contact us to arrange pickup for larger donations.
            </p>
            <button className="bg-[#9c7459] hover:bg-[#7d5c46] text-white py-2 px-4 rounded">
              Contact for Donation
            </button>
          </div>
        </div>
      </section>
      
      <section className="text-center">
        <h2 className="text-3xl font-bold text-[#9c7459] mb-4">Ready to Join Our Mission?</h2>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-6">
          Whether you have a little time or a lot, your support makes a tremendous difference in the lives of our rescue dogs.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <button className="bg-[#9c7459] hover:bg-[#7d5c46] text-white py-3 px-8 rounded-lg text-xl">
            Volunteer Application
          </button>
          <button className="border-2 border-[#9c7459] text-[#9c7459] hover:bg-[#9c7459] hover:text-white py-3 px-8 rounded-lg text-xl transition-colors">
            Make a Donation
          </button>
        </div>
      </section>
    </div>
  );
};

export default GetInvolvedPage;