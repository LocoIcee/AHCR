import React, { useEffect, useState } from 'react';
import { supabase } from '../data/supabaseClient';

const HappyTailsPage = () => {
  const [happyTails, setHappyTails] = useState([]);

  useEffect(() => {
    const fetchHappyTails = async () => {
      const { data, error } = await supabase.from('Happy Tails').select('id, name, images');
      if (error) {
        console.error('Error fetching adopted dogs:', error.message);
      } else {
        setHappyTails(data);
      }
    };
    fetchHappyTails();
  }, []);
  return (
    <div className="mt-24">
      {/* Banner Section */}
      <section className="relative w-full bg-gradient-to-r from-tealGrey to-primary py-2 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-24">
          <div className="text-center md:text-left mb-8 md:mb-0">
            <h1 className="text-6xl font-extrabold drop-shadow-md uppercase tracking-widest mb-4">
              <span className="text-darkbrown">HAPPY</span>{' '}
              <span className="text-white">TAILS</span>
            </h1>
            <p className="text-white max-w-md text-lg">
              Thanks to wonderful individuals like you, these animals have found their furever homes! From the bottom of our hearts – <strong className="text-darkbrown">Thank you!</strong>
            </p>
          </div>
          <img
            src={`${import.meta.env.BASE_URL}assets/images/siteDogs/ThankYou.png`}
            alt="Thank You"
            className="h-[450px] w-auto object-contain relative -mb-24 z-10"
          />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
          {happyTails.map((dog) => (
            <div key={dog.id} className="bg-white shadow-md rounded-md overflow-hidden relative">
              <div className="relative">
                <img
                  src={dog.images}
                  alt={dog.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-2 left-2 bg-darkbrown text-beige text-xs font-bold px-4 py-2 rounded">
                  ADOPTED
                </div>
              </div>
              <div className="p-4 text-center bg-beige">
                <p className="text-xl font-semibold text-darkbrown">{dog.name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>

  );
};

export default HappyTailsPage;