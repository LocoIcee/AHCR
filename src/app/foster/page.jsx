import React from 'react';

const FosterPage = () => {
  return (
    <div className="pt-28 bg-gradient-to-b from-beige via-[#d4b396] to-tealGrey min-h-screen">
      <div className="mx-auto px-6 py-8 rounded-lg shadow-lg h-full w-full flex flex-col lg:flex-row gap-6">
        {/* Left side - Image */}
        <div className="lg:w-1/2 h-full flex justify-center items-end">
          <img 
            src="images/siteDogs/foster.jpg" 
            alt="Dog available for foster" 
            className="w-full h-full object-contain rounded-lg shadow-lg border-2 border-darkbrown"
          />
        </div>
        
        {/* Right side - Text content */}
        <div className="lg:w-1/2">
          <h1 className="text-6xl font-bold text-gray-700 mb-12" data-aos="fade-right" data-aos-duration="1000">FOSTER</h1>
          
          <div className="space-y-10 text-gray-700 w-[70%]" >
            <p data-aos="fade-right" data-aos-duration="1000">
              The best way to adopt a dog is through our foster program.
              While fostering, we provide advice, training, and all items the
              dog needs. Sometimes a person may want to adopt, but is
              unsure of what dog will fit for them. We work with our fosters to
              match them with the best dog for every situation. Fosters
              receive first selection to adopt once the dog is ready to go to
              their forever home.
            </p>
            
            <p data-aos="fade-right" data-aos-duration="1000">
              Whether you are thinking of adopting, or just providing a
              temporary home (and some training) to a dog, fostering is an
              incredibly rewarding experience. If you have been thinking
              about it, or have experience in it, we invite you to take a look at
              our available animals who would love to temporarily join your
              family in a loving and caring environment. Not all available for
              foster dogs are always listed, but we update our page as much
              as we can. If you are thinking about adopting, or just want to
              help a dog, please consider putting in an application and our
              coordinator will contact you if you could be a fit for one of our
              dogs.
            </p>
            
            <p data-aos="fade-right" data-aos-duration="1000">
              Many of our fosters end up adopting from us, and many times it
              is the dog they are fostering!
            </p>
            
          </div>
            <div className="mt-12" data-aos="fade-right" data-aos-duration="1000">

              <p className="font-medium mb-12 text-gray-700" data-aos="fade-right" data-aos-duration="1000">
                If you would like to foster, please fill out an application. Thank
                you!
              </p>
              <a 
                href="https://docs.google.com/forms/d/1TQpf2BB9DqZPlAiTbcoBRBLZLIuleTdOPVeuA2KgpkQ/viewform?edit_requested=true" 
                className="inline-block border border-darkbrown hover:bg-darkbrown hover:text-white text-darkbrown font-medium py-2 px-5 transition-colors duration-300 uppercase text-sm tracking-wider"
              >
                CLICK HERE TO FILL OUT A FOSTER APPLICATION
              </a>
            </div>
          
        </div>
      </div>
    </div>
  );
};

export default FosterPage;