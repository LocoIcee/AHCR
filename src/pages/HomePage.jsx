import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <section className="mt-24 pb-12 mx-auto">
        <div className="container mx-auto px-4">
          <img 
            src={`${import.meta.env.BASE_URL}assets/images/ahcr.png`} 
            alt="Almost Home Canine Rescue Banner Image" 
            style={{ objectPosition: 'center', backgroundAttachment: 'fixed' }}
          />
          <h2 className="text-[18px] leading-[1.2em] flex justify-end text-[#523A28] font-sans tracking-[0.05em]">
            <div className="text-center">
              <strong>PLEASE NOTE:&nbsp;</strong>
              Meet &amp; greets are by appointment<br />only after initial phone interview.
            </div>
          </h2>
        </div>
      </section>

      <section className="pb-12 py-12 text-center bg-tealGrey" data-aos="fade" data-aos-duration="1000">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-extrabold text-darkbrown mb-10 font-secondary">Who We Are & What We Do</h1>
          <div className="flex flex-col items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center text-gray-700 text-lg py-6 w-full">
              <div className="space-y-6">
                <p>
                  Almost Home Canine Rescue is a non-kill, volunteer dog rescue organization operating out of Alberta, Canada, with the rescue on an acreage in Lac La Biche and fosters in Edmonton, Calgary, and surrounding areas.
                </p>
                <p>
                  We are dedicated to rescuing homeless dogs, surrendered dogs and those in danger of abuse or neglect.
                </p>
                <p>
                  We provide a spay/neuter and return program to struggling communities to help control the dog population.
                </p>
              </div>
              <div className="space-y-6">
                <p>
                  AHCR places dogs in loving, responsible, and committed permanent homes. We take considerable care in finding good matches and educating prospective adopters about the responsibilities and costs of bringing a dog into their homes and lives.
                </p>
                <p>
                  We are a non profit rescue that relies on the time and generosity of our donors. Contributions of all kinds are pivotal to keeping our operations going. All donations are gratefully accepted.
                </p>
                <p>
                  Learn more about how you can help a dog-in-need find their new forever home!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="bg-beige">
        <div className="flex flex-col md:flex-row items-stretch">
          {/* Left background image */}
          <div
            className="w-full md:w-1/3 bg-cover h-auto md:h-auto md:min-h-full"
            data-aos="zoom-in"
            data-aos-duration="1000"
            style={{
              backgroundImage: `url(${import.meta.env.BASE_URL}assets/images/siteDogs/whyAdopt.jpg)`,
              backgroundPosition: 'center 30%',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }}
          />
          {/* Right Content */}
          <div className="w-full md:w-2/3 p-8 md:py-16" data-aos="fade-up" data-aos-duration="1000">
            <h2 className="text-5xl font-extrabold font-secondary text-darkbrown mb-10">Why Adopt?</h2>
            <ul className="list-decimal pl-5 space-y-6 text-gray-800 text-lg font-medium">
              <li>
                <strong>You’re giving a dog a second chance.</strong><br />
                Our rescue dogs have experienced neglect, abuse, or abandonment. By adopting, you’re giving a dog that crucial second chance to live a life full of warmth, happiness and love.
              </li>
              <li>
                <strong>Rescue dogs make amazing pets and companions.</strong><br />
                Rescue dogs require a little more patience and training, but they’re just as loyal and loving as store-bought pups — and often already house-trained!
              </li>
              <li>
                <strong>They give so much more than they take.</strong><br />
                Dogs reduce stress, boost confidence and bring joy. They’re also great for kids, teaching empathy, responsibility and compassion.
              </li>
              <li>
                <strong>Adopting helps more than one dog.</strong><br />
                You’re making room in the shelter for another dog and freeing up resources to help others in need.
              </li>
              <li>
                <strong>A dog’s love is priceless.</strong><br />
                When you adopt, you give a homeless dog a family—and they give you their whole world in return.
              </li>
            </ul>
            <Link to="/adopt">
              <button className="mt-10 px-16 py-3 border-2 border-darkbrown text-white bg-darkbrown rounded hover:bg-transparent hover:text-darkbrown transition duration-300 transform hover:scale-105 hover:shadow-md block mx-auto">
                Adopt Today
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-offwhite py-16">
        <div className="flex flex-col md:flex-row items-center justify-center gap-x-2 gap-y-4 py-10">
          {/* Left images */}
          <div className="flex flex-col gap-2 items-end">
            <img src={`${import.meta.env.BASE_URL}assets/images/siteDogs/Alaska.jpg`} alt="Dog 1" className="w-48 h-48 rounded-full object-cover shadow-md" />
            <img src={`${import.meta.env.BASE_URL}assets/images/siteDogs/Chai.jpg`} alt="Dog 2" className="w-48 h-48 rounded-full object-cover shadow-md relative -left-10 -mt-10 -mb-10 z-10" />
            <img src={`${import.meta.env.BASE_URL}assets/images/siteDogs/Florence.jpg`} alt="Dog 3" className="w-48 h-48 rounded-full object-cover shadow-md relative z-20" />
          </div>

          {/* Center text */}
          <div className="text-center max-w-lg px-4" data-aos="fade-left" data-aos-duration="1000">
            <h2 className="text-5xl font-extrabold text-darkbrown mb-10 font-secondary">Our Foster Program</h2>
            <ul className="list-disc pl-6 text-gray-700 text-left space-y-4 text-lg font-medium" >
              <li>Our fosters can attend training sessions with our trainer to set them up for success.</li>
              <li>The easiest way to adopt is to foster. We give first selection to our fosters (once they undergo a vetting process).</li>
              <li>We provide all things needed (food, medication) for each dog while fostering.</li>
              <li>More details, as well as available dogs, can be found in our Foster Section.</li>
            </ul>
          </div>

          {/* Right images */}
          <div className="flex flex-col gap-2 items-start">
            <img src={`${import.meta.env.BASE_URL}assets/images/siteDogs/Felix.jpg`} alt="Dog 4" className="w-48 h-48 rounded-full object-cover shadow-md" />
            <img src={`${import.meta.env.BASE_URL}assets/images/siteDogs/Alpha.jpg`} alt="Dog 5" className="w-48 h-48 rounded-full object-cover shadow-md relative left-10 -mt-10 -mb-10 z-10" />
            <img src={`${import.meta.env.BASE_URL}assets/images/siteDogs/Freedom.jpg`} alt="Dog 6" className="w-48 h-48 rounded-full object-cover shadow-md relative z-20" />
          </div>
        </div>
      </section>
      
      <section className="pt-8 pb-16 bg-offwhite">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-extrabold text-darkbrown mb-10 font-secondary">Get Involved</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6" data-aos="fade-up" data-aos-duration="1000">
            {[
              { title: 'Foster', desc: 'Bring a dog into your home is a special, heartwarming, and highly rewarding experience. Our fosters temporarily take in rescue dogs and provide them with a warm, loving environment while we search for their new forever homes.' },
              { title: 'Donate', desc: 'AHCR depends on donations to give our dogs the best care possible. All donations are gratefully accepted through our online portal, or in person at the rescue.' },
              { title: 'Volunteer', desc: 'Volunteers are an integral part of our operation. Helping out is a great way to meet like-minded people while gaining new skills!' },
              { title: 'Wish List', desc: 'Our wish list is comprised of items we need to run the rescue and keep each pup happy and comfortable.' },
              { title: 'Dog For A Day', desc: 'Our Dog for a Day program lets you “adopt” one of our pups for an afternoon of fun. Great for outings like hikes or ice cream trips!' },
              { title: 'Fundraise', desc: 'AHCR hosts frequent fundraisers to raise money for the rescue. Your participation makes these both fun and successful!' },
            ].map((card, idx) => (
              <div
                key={idx}
                className="bg-beige p-6 rounded shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:border-darkbrown border border-transparent cursor-pointer"
                data-aos={idx % 2 === 0 ? 'fade-up' : 'fade-down'}
                data-aos-duration="1000"
              >
                <h3 className="text-xl font-extrabold text-darkbrown mb-2">{card.title}</h3>
                <p className="text-sm text-gray-700">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
