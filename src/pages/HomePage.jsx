import React from 'react';

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 ">
      <section className="mb-12">
        <img 
          src="/assets/images/ahcr.png" 
          alt="Almost Home Canine Rescue Banner Image" 
          style={{ objectPosition: 'center' }}
        />
        <h2 class="font_2 wixui-rich-text__text" style="font-size:18px; line-height:1.2em; text-align:center;">
          <span style="color:#523A28;" class="wixui-rich-text__text">
            <span style="letter-spacing:0.05em;" class="wixui-rich-text__text">
              <span style="font-size:18px;" class="wixui-rich-text__text">
                <span style="font-family:open sans condensed,sans-serif;" class="wixui-rich-text__text">PLEASE NOTE:&nbsp;
                </span>
              </span>
            </span>
          </span>
          <span class="color_23 wixui-rich-text__text">
            <span style="letter-spacing:0.05em;" class="wixui-rich-text__text">
              <span style="font-size:18px;" class="wixui-rich-text__text">
                <span style="font-family:open sans condensed,sans-serif;" class="wixui-rich-text__text">Meet &amp; greets are by appointment only after initial phone interview.
                </span>
              </span>
            </span>
          </span>
        </h2>
      </section>
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-[#9c7459] mb-4">Welcome to Almost Home Canine Rescue</h1>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
          We are dedicated to rescuing, rehabilitating, and finding forever homes for dogs in need.
        </p>
      </section>
      
      <section className="mb-12">
        <div className="bg-gray-100 p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-[#9c7459] mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-4">
            Almost Home Canine Rescue is dedicated to saving the lives of dogs in need,
            providing them with necessary medical care, training, and love until they find their forever homes.
            We believe every dog deserves a chance at a happy life.
          </p>
          <p className="text-gray-700">
            Through rescue work, community education, and advocacy, we strive to create
            a world where no dog is left without a loving home.
          </p>
        </div>
      </section>
      
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-[#9c7459] mb-6">Featured Dogs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* These would be replaced with actual dog data later */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="h-64 bg-gray-300"></div>
            <div className="p-4">
              <h3 className="font-bold text-xl mb-2">Buddy</h3>
              <p className="text-gray-600 mb-2">2 years old • Male • Labrador Mix</p>
              <p className="text-gray-700">
                Buddy is a friendly, energetic dog who loves to play fetch and go for long walks.
              </p>
            </div>
          </div>
          
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="h-64 bg-gray-300"></div>
            <div className="p-4">
              <h3 className="font-bold text-xl mb-2">Bella</h3>
              <p className="text-gray-600 mb-2">4 years old • Female • Shepherd Mix</p>
              <p className="text-gray-700">
                Bella is a sweet, gentle dog who enjoys cuddling and short walks in the park.
              </p>
            </div>
          </div>
          
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="h-64 bg-gray-300"></div>
            <div className="p-4">
              <h3 className="font-bold text-xl mb-2">Max</h3>
              <p className="text-gray-600 mb-2">1 year old • Male • Terrier Mix</p>
              <p className="text-gray-700">
                Max is a playful pup who gets along well with other dogs and loves learning tricks.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="text-center">
        <h2 className="text-3xl font-bold text-[#9c7459] mb-4">How You Can Help</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-3 text-[#9c7459]">Adopt</h3>
            <p className="text-gray-700 mb-4">
              Give a deserving dog a forever home and change their life forever.
            </p>
            <button className="bg-[#9c7459] hover:bg-[#7d5c46] text-white py-2 px-4 rounded">
              View Dogs
            </button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-3 text-[#9c7459]">Foster</h3>
            <p className="text-gray-700 mb-4">
              Provide a temporary home for a dog while they wait for their forever family.
            </p>
            <button className="bg-[#9c7459] hover:bg-[#7d5c46] text-white py-2 px-4 rounded">
              Learn More
            </button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-3 text-[#9c7459]">Donate</h3>
            <p className="text-gray-700 mb-4">
              Support our mission with a one-time or recurring donation.
            </p>
            <button className="bg-[#9c7459] hover:bg-[#7d5c46] text-white py-2 px-4 rounded">
              Make a Difference
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
