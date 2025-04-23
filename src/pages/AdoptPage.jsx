import React from 'react';

const AdoptPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-[#9c7459] mb-4">Adopt a Dog</h1>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
          Find your perfect furry companion and give them a forever home.
        </p>
      </section>
      
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-[#9c7459] mb-6">Our Adoption Process</h2>
        <div className="bg-gray-100 p-8 rounded-lg">
          <ol className="list-decimal pl-6 space-y-4">
            <li className="text-gray-800">
              <span className="font-semibold">Browse Available Dogs:</span> Look through our selection of dogs who are looking for their forever homes.
            </li>
            <li className="text-gray-800">
              <span className="font-semibold">Submit an Application:</span> Fill out our adoption application form to express your interest.
            </li>
            <li className="text-gray-800">
              <span className="font-semibold">Home Visit:</span> We'll schedule a visit to ensure your home is ready for a new dog.
            </li>
            <li className="text-gray-800">
              <span className="font-semibold">Meet & Greet:</span> Meet your potential new family member to ensure it's a good match.
            </li>
            <li className="text-gray-800">
              <span className="font-semibold">Adoption Fee:</span> Pay the adoption fee, which covers vaccinations, microchipping, and spay/neuter.
            </li>
            <li className="text-gray-800">
              <span className="font-semibold">Bring Your Dog Home:</span> Welcome your new furry friend into your family!
            </li>
          </ol>
        </div>
      </section>
      
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-[#9c7459] mb-6">Dogs Available for Adoption</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* These would be replaced with actual dog data later */}
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="h-64 bg-gray-300"></div>
              <div className="p-4">
                <h3 className="font-bold text-xl mb-2">Dog Name</h3>
                <p className="text-gray-600 mb-2">Age • Sex • Breed</p>
                <p className="text-gray-700 mb-4">
                  A brief description of the dog's personality, history, and needs.
                </p>
                <button className="bg-[#9c7459] hover:bg-[#7d5c46] text-white py-2 px-4 rounded w-full">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-[#9c7459] mb-6">Adoption FAQ</h2>
        <div className="bg-gray-100 p-8 rounded-lg">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-2">What are the adoption fees?</h3>
              <p className="text-gray-700">
                Our adoption fees vary based on the dog's age, breed, and medical needs, typically ranging from $150-$350. This fee helps cover the cost of rescue, veterinary care, and transportation.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-2">What is included in the adoption?</h3>
              <p className="text-gray-700">
                All our dogs are spayed/neutered, microchipped, and up-to-date on vaccinations. They also receive a full veterinary check-up before adoption.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-2">How long does the adoption process take?</h3>
              <p className="text-gray-700">
                Once you've submitted an application, the process typically takes 1-2 weeks, including reference checks, home visit, and meet-and-greet.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-2">What if the adoption doesn't work out?</h3>
              <p className="text-gray-700">
                We understand that sometimes, despite best intentions, an adoption may not work out. We always take our dogs back if needed and will work with you to find a solution.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="text-center">
        <h2 className="text-3xl font-bold text-[#9c7459] mb-4">Ready to Adopt?</h2>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-6">
          Take the first step towards bringing home your new best friend.
        </p>
        <button className="bg-[#9c7459] hover:bg-[#7d5c46] text-white py-3 px-8 rounded-lg text-xl">
          Start Adoption Process
        </button>
      </section>
    </div>
  );
};

export default AdoptPage;