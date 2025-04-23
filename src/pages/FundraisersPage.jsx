import React from 'react';

const FundraisersPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-[#9c7459] mb-4">Fundraisers & Events</h1>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
          Join us at our upcoming events or create your own fundraiser to help support our rescue mission.
        </p>
      </section>
      
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-[#9c7459] mb-6">Upcoming Events</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="h-64 bg-gray-300"></div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-3">
                <span className="bg-[#9c7459] text-white px-3 py-1 rounded-full text-sm font-semibold">
                  May 15, 2023 • 11:00 AM - 4:00 PM
                </span>
              </div>
              <h3 className="font-bold text-2xl mb-2 text-[#9c7459]">Spring Adoption Fair</h3>
              <p className="text-gray-700 mb-4">
                Meet our adorable adoptable dogs and find your perfect match at our biggest adoption event of the season. 
                Food trucks, raffles, and fun activities for the whole family!
              </p>
              <div className="mb-4">
                <p className="font-semibold text-gray-800">Location:</p>
                <p className="text-gray-700">Central Park, 123 Main Street, Anytown</p>
              </div>
              <button className="bg-[#9c7459] hover:bg-[#7d5c46] text-white py-2 px-4 rounded">
                More Details
              </button>
            </div>
          </div>
          
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="h-64 bg-gray-300"></div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-3">
                <span className="bg-[#9c7459] text-white px-3 py-1 rounded-full text-sm font-semibold">
                  June 10, 2023 • 6:00 PM - 9:00 PM
                </span>
              </div>
              <h3 className="font-bold text-2xl mb-2 text-[#9c7459]">Paws & Wine Gala</h3>
              <p className="text-gray-700 mb-4">
                Join us for an elegant evening of fine wine, gourmet food, and silent auction to raise funds 
                for our medical care program. Dress code: Semi-formal.
              </p>
              <div className="mb-4">
                <p className="font-semibold text-gray-800">Location:</p>
                <p className="text-gray-700">Grand Hotel Ballroom, 456 Vine Street, Anytown</p>
              </div>
              <button className="bg-[#9c7459] hover:bg-[#7d5c46] text-white py-2 px-4 rounded">
                Purchase Tickets
              </button>
            </div>
          </div>
          
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="h-64 bg-gray-300"></div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-3">
                <span className="bg-[#9c7459] text-white px-3 py-1 rounded-full text-sm font-semibold">
                  July 4, 2023 • 8:00 AM - 11:00 AM
                </span>
              </div>
              <h3 className="font-bold text-2xl mb-2 text-[#9c7459]">Paws for Freedom 5K</h3>
              <p className="text-gray-700 mb-4">
                Celebrate Independence Day with our annual dog-friendly 5K run/walk. 
                Bring your furry friends and show your support for our rescue mission!
              </p>
              <div className="mb-4">
                <p className="font-semibold text-gray-800">Location:</p>
                <p className="text-gray-700">Riverside Park, 789 River Road, Anytown</p>
              </div>
              <button className="bg-[#9c7459] hover:bg-[#7d5c46] text-white py-2 px-4 rounded">
                Register Now
              </button>
            </div>
          </div>
          
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="h-64 bg-gray-300"></div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-3">
                <span className="bg-[#9c7459] text-white px-3 py-1 rounded-full text-sm font-semibold">
                  August 20, 2023 • 12:00 PM - 5:00 PM
                </span>
              </div>
              <h3 className="font-bold text-2xl mb-2 text-[#9c7459]">Dog Days of Summer Festival</h3>
              <p className="text-gray-700 mb-4">
                Beat the heat with our summer festival featuring dog swimming pools, treats, contests, 
                and family activities. All proceeds benefit our shelter dogs.
              </p>
              <div className="mb-4">
                <p className="font-semibold text-gray-800">Location:</p>
                <p className="text-gray-700">Community Center, 321 Oak Avenue, Anytown</p>
              </div>
              <button className="bg-[#9c7459] hover:bg-[#7d5c46] text-white py-2 px-4 rounded">
                More Details
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-[#9c7459] mb-6">Create Your Own Fundraiser</h2>
        <div className="bg-gray-100 p-8 rounded-lg">
          <p className="text-gray-700 mb-6">
            Want to help but can't make it to an event? You can create your own fundraiser to support our rescue dogs!
            Here are some ideas to get you started:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3 text-[#9c7459]">Birthday Fundraiser</h3>
              <p className="text-gray-700 mb-4">
                Instead of gifts, ask friends and family to donate to our rescue in honor of your birthday.
              </p>
              <button className="bg-[#9c7459] hover:bg-[#7d5c46] text-white py-2 px-4 rounded">
                Start Fundraiser
              </button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3 text-[#9c7459]">Facebook Fundraiser</h3>
              <p className="text-gray-700 mb-4">
                Create a fundraiser on Facebook to share with your network and help spread awareness.
              </p>
              <button className="bg-[#9c7459] hover:bg-[#7d5c46] text-white py-2 px-4 rounded">
                Start Fundraiser
              </button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3 text-[#9c7459]">Community Event</h3>
              <p className="text-gray-700 mb-4">
                Organize a bake sale, car wash, or other community event to raise funds for our dogs.
              </p>
              <button className="bg-[#9c7459] hover:bg-[#7d5c46] text-white py-2 px-4 rounded">
                Get Resources
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-[#9c7459] mb-6">Corporate Sponsorships</h2>
        <div className="bg-white shadow-md rounded-lg p-8">
          <p className="text-gray-700 mb-6">
            We partner with businesses that share our commitment to animal welfare. Corporate sponsorships 
            help fund our rescue operations while providing your business with positive community exposure.
          </p>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-3 text-[#9c7459]">Sponsorship Levels</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-3 px-4 bg-gray-100 text-left">Level</th>
                    <th className="py-3 px-4 bg-gray-100 text-left">Amount</th>
                    <th className="py-3 px-4 bg-gray-100 text-left">Benefits</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="py-3 px-4 font-semibold">Bronze Paw</td>
                    <td className="py-3 px-4">$500</td>
                    <td className="py-3 px-4">Logo on website, social media mention</td>
                  </tr>
                  <tr className="border-t">
                    <td className="py-3 px-4 font-semibold">Silver Paw</td>
                    <td className="py-3 px-4">$1,000</td>
                    <td className="py-3 px-4">Bronze benefits + logo on event materials, newsletter feature</td>
                  </tr>
                  <tr className="border-t">
                    <td className="py-3 px-4 font-semibold">Gold Paw</td>
                    <td className="py-3 px-4">$2,500</td>
                    <td className="py-3 px-4">Silver benefits + featured sponsor at one event, plaque of appreciation</td>
                  </tr>
                  <tr className="border-t">
                    <td className="py-3 px-4 font-semibold">Platinum Paw</td>
                    <td className="py-3 px-4">$5,000+</td>
                    <td className="py-3 px-4">Gold benefits + naming opportunity for rescue program, VIP access to all events</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="text-center">
            <button className="bg-[#9c7459] hover:bg-[#7d5c46] text-white py-2 px-6 rounded">
              Download Sponsorship Packet
            </button>
            <p className="mt-4 text-gray-600">
              For more information, contact our Development Director at sponsorships@almosthomecaninerescue.org
            </p>
          </div>
        </div>
      </section>
      
      <section className="text-center">
        <h2 className="text-3xl font-bold text-[#9c7459] mb-4">Every Donation Makes a Difference</h2>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-6">
          Your support helps us provide food, shelter, medical care, and love to dogs in need.
        </p>
        <button className="bg-[#9c7459] hover:bg-[#7d5c46] text-white py-3 px-8 rounded-lg text-xl">
          Donate Now
        </button>
      </section>
    </div>
  );
};

export default FundraisersPage;