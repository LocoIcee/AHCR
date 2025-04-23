import React from 'react';

const FosterPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-[#9c7459] mb-4">Become a Foster</h1>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
          Help save lives by providing a temporary loving home for dogs in need.
        </p>
      </section>
      
      <section className="mb-12">
        <div className="bg-gray-100 p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-[#9c7459] mb-4">Why Foster?</h2>
          <p className="text-gray-700 mb-4">
            Fostering is a rewarding way to help save dogs' lives without the long-term commitment of adoption. 
            By opening your heart and home to a dog in need, you're providing them with a safe and loving 
            environment while they wait for their forever family.
          </p>
          <p className="text-gray-700">
            Our rescue can only save as many dogs as we have foster homes for. By becoming a foster parent, 
            you're directly helping us save more lives and giving dogs a second chance at happiness.
          </p>
        </div>
      </section>
      
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-[#9c7459] mb-6">How Fostering Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl font-bold text-[#9c7459] mb-3">1</div>
            <h3 className="text-xl font-bold mb-3">Application</h3>
            <p className="text-gray-700">
              Fill out our foster application form. We'll review your information and contact you for a home check.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl font-bold text-[#9c7459] mb-3">2</div>
            <h3 className="text-xl font-bold mb-3">Matching</h3>
            <p className="text-gray-700">
              We'll match you with a dog that fits your home environment, lifestyle, and experience level.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl font-bold text-[#9c7459] mb-3">3</div>
            <h3 className="text-xl font-bold mb-3">Fostering Period</h3>
            <p className="text-gray-700">
              Provide care, love, and socialization for your foster dog until they find their forever home.
            </p>
          </div>
        </div>
      </section>
      
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-[#9c7459] mb-6">What We Provide</h2>
        <div className="bg-white shadow-md rounded-lg p-6">
          <ul className="space-y-4">
            <li className="flex items-start">
              <svg className="h-6 w-6 text-[#9c7459] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span className="text-gray-700">Food and essential supplies</span>
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-[#9c7459] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span className="text-gray-700">Medical care and veterinary support</span>
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-[#9c7459] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span className="text-gray-700">Behavioral support and training resources</span>
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-[#9c7459] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span className="text-gray-700">24/7 support from our experienced foster team</span>
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-[#9c7459] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span className="text-gray-700">Transportation to/from vet appointments and adoption events</span>
            </li>
          </ul>
        </div>
      </section>
      
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-[#9c7459] mb-6">Foster FAQ</h2>
        <div className="bg-gray-100 p-8 rounded-lg">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-2">How long will I foster a dog?</h3>
              <p className="text-gray-700">
                Foster periods vary depending on the dog's needs and adoption interest. It can range from a few weeks to a few months. We'll provide an estimated timeframe for each dog.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-2">Can I adopt my foster dog?</h3>
              <p className="text-gray-700">
                Yes! Many foster parents fall in love with their foster dogs. As a foster, you'll have the first option to adopt if you decide they're the perfect fit for your family.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-2">What if I have other pets?</h3>
              <p className="text-gray-700">
                We carefully match foster dogs with appropriate homes, including those with existing pets. We'll work with you to ensure a good match and provide guidance for introductions.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-2">What if I need to travel?</h3>
              <p className="text-gray-700">
                We understand life happens! If you need to travel, we can arrange temporary care for your foster dog with another foster family.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="text-center">
        <h2 className="text-3xl font-bold text-[#9c7459] mb-4">Ready to Make a Difference?</h2>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-6">
          Apply to become a foster parent today and help save a life.
        </p>
        <button className="bg-[#9c7459] hover:bg-[#7d5c46] text-white py-3 px-8 rounded-lg text-xl">
          Apply to Foster
        </button>
      </section>
    </div>
  );
};

export default FosterPage;