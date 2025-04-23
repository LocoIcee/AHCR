import React from 'react';

const MorePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-[#9c7459] mb-4">More Information</h1>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
          Learn more about Almost Home Canine Rescue and ways we can help each other.
        </p>
      </section>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <section>
          <h2 className="text-3xl font-bold text-[#9c7459] mb-6">About Us</h2>
          <div className="bg-white shadow-md rounded-lg p-6">
            <p className="text-gray-700 mb-4">
              Almost Home Canine Rescue was founded in 2015 with a simple mission: to save dogs in need and find them loving forever homes. What began as a small group of passionate volunteers has grown into a dedicated rescue organization that has saved hundreds of dogs from high-kill shelters, abandonment, and neglect.
            </p>
            <p className="text-gray-700 mb-4">
              Our network of foster homes provides safe, temporary care for dogs until they find their forever families. We believe every dog deserves a chance at a happy life, regardless of age, breed, or medical condition.
            </p>
            <p className="text-gray-700">
              As a registered 501(c)(3) nonprofit organization, we rely entirely on donations, adoption fees, and the dedication of our volunteers to continue our life-saving work.
            </p>
          </div>
        </section>
        
        <section>
          <h2 className="text-3xl font-bold text-[#9c7459] mb-6">Contact Us</h2>
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-3 text-[#9c7459]">Main Office</h3>
              <p className="text-gray-700">123 Rescue Lane</p>
              <p className="text-gray-700">Anytown, USA 12345</p>
              <p className="text-gray-700 mt-2">Phone: (555) 123-4567</p>
              <p className="text-gray-700">Email: info@almosthomecaninerescue.org</p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-3 text-[#9c7459]">Hours of Operation</h3>
              <p className="text-gray-700">Monday - Friday: 10:00 AM - 6:00 PM</p>
              <p className="text-gray-700">Saturday: 10:00 AM - 4:00 PM</p>
              <p className="text-gray-700">Sunday: Closed (By appointment only)</p>
            </div>
            
            <div>
              <p className="text-gray-700">
                For urgent matters after hours, please email emergency@almosthomecaninerescue.org
              </p>
            </div>
          </div>
        </section>
      </div>
      
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-[#9c7459] mb-6">Frequently Asked Questions</h2>
        <div className="bg-gray-100 p-8 rounded-lg">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-2">How do I adopt a dog from your rescue?</h3>
              <p className="text-gray-700">
                Visit our Adopt page to see available dogs and learn about our adoption process. You'll need to fill out an application, have a home check, and meet your potential new family member before finalizing the adoption.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-2">What is your adoption fee?</h3>
              <p className="text-gray-700">
                Our adoption fees range from $150-$350 depending on the dog's age, breed, and medical needs. This fee helps cover vaccinations, microchipping, spay/neuter, and other veterinary care.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-2">Do you have a physical shelter location?</h3>
              <p className="text-gray-700">
                We are primarily a foster-based rescue, meaning our dogs live in volunteer foster homes until adoption. We do have a main office where we conduct meet-and-greets by appointment and host occasional adoption events.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-2">How can I help if I can't adopt or foster?</h3>
              <p className="text-gray-700">
                There are many ways to help! You can volunteer your time, donate supplies or funds, sponsor a dog's medical expenses, or help spread awareness about our rescue efforts on social media.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-2">What happens if an adoption doesn't work out?</h3>
              <p className="text-gray-700">
                We are committed to the lifelong wellbeing of our dogs. If for any reason an adoption doesn't work out, we will take the dog back into our program. We ask that you contact us immediately rather than rehoming the dog on your own.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-2">Do you accept owner surrenders?</h3>
              <p className="text-gray-700">
                We consider owner surrenders on a case-by-case basis, depending on our current capacity and resources. Please email us with details about your situation and the dog needing placement.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-[#9c7459] mb-6">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* These would be replaced with actual team member data later */}
          {[...Array(4)].map((_, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden text-center">
              <div className="h-48 bg-gray-300"></div>
              <div className="p-4">
                <h3 className="font-bold text-xl mb-1">Team Member Name</h3>
                <p className="text-[#9c7459] font-medium mb-3">Position Title</p>
                <p className="text-gray-700 text-sm">
                  A brief bio about the team member and their role with the rescue.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section className="text-center bg-gray-100 p-8 rounded-lg">
        <h2 className="text-3xl font-bold text-[#9c7459] mb-4">Newsletter Signup</h2>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-6">
          Stay updated on our latest rescues, upcoming events, and success stories.
        </p>
        <div className="max-w-md mx-auto">
          <div className="flex flex-col md:flex-row gap-3">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#9c7459]"
            />
            <button className="bg-[#9c7459] hover:bg-[#7d5c46] text-white px-6 py-3 rounded-lg">
              Subscribe
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-3">
            We respect your privacy and will never share your information.
          </p>
        </div>
      </section>
    </div>
  );
};

export default MorePage;