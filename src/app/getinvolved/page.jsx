'use client';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import Link from 'next/link';

export default function GetInvolvedPage() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className="pt-24">
      <section className="relative w-full h-[300px] bg-tealGrey mb-12">
        <div className="absolute inset-0 flex items-center justify-start pl-10 md:pl-20">
          <h1 className="text-6xl text-gray-700 font-bold z-10">DONATE</h1>
        </div>
        <img
          src="/images/siteDogs/donateBanner.png"
          alt="Dog looking up"
          className="absolute right-0 bottom-0 h-full object-contain"
        />
      </section>

      <section className="text-center space-y-6 pb-12">
        <h2 className="text-4xl font-secondary font-bold text-darkbrown">Every Bit Helps</h2>
        <p className="text-lg max-w-2xl mx-auto">
          At Almost Home Canine Rescue, saving dogs, nurturing them back to health, and placing them in loving forever homes is our passion. We ensure dogs get the veterinary care they need, place them with fosters, and do everything to make certain they are loved and ready for their new families.
        </p>
        <p className="text-md">
          Donations are crucial to letting us keep doing what we do, and we are thankful for every one of them.
        </p>
        <p className="text-md text-bold">
          To contribute, send an e-transfer to <a className="underline text-tealGrey" href="mailto:almosthomecaninerescue@gmail.com">almosthomecaninerescue@gmail.com</a>
        </p>
        <p className="text-md text-bold">
          Charity #767534902RR0001
        </p>
        <Link href="" className="inline-block bg-primary text-white py-3 px-6 rounded-md hover:bg-darkbrown transition">
          Wish List
        </Link>
      </section>

      <section className="text-center space-y-6 max-w-6xl mx-auto px-6"></section>
      <section className="relative w-full h-[300px] overflow-hidden mb-12">
        <div
          className="absolute inset-0 bg-cover bg-scroll"
          data-aos="zoom-out-up"
          data-aos-duration="1000"
          data-aos-offset="200"
          data-aos-easing="ease-in-sine"
          style={{ backgroundImage: "url('/images/siteDogs/volunteerBanner.jpg')", backgroundPosition: 'center 25%' }}
        ></div>
        <div className="relative z-10 flex items-center justify-end h-full pr-10 md:pr-20">
          <h1 className="text-6xl text-white font-bold">VOLUNTEER</h1>
        </div>
      </section>

      <section className="text-center space-y-6 mt-20 max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-secondary font-bold text-darkbrown">How can you help?</h2>
        <p className="max-w-3xl mx-auto">
          At Almost Home, there are many ways you can volunteer—from spending time with the dogs in their pens, to taking them out for a day, to even fostering them until they find their forever home!
        </p>
        <p className="max-w-3xl mx-auto">
          Our volunteer program has 3 levels and includes a mandatory 2-hour training session for safety and preparedness. We welcome all helpers willing to contribute with compassion and dedication.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 mb-24">
          {[
            { label: 'Cleaning, Laundry, Handy Work', href: 'https://docs.google.com/forms/d/1wfMStkaHW50UEkZgaCsb4IpZ2FrQD7Cgt21Dj_-9Do8/edit?usp=sharing' },
            { label: 'Events Application', href: 'https://docs.google.com/forms/d/1wU-sC6sDeJy12hIKldkf8qCRDgiw4iTklmu3hVYU3cE/edit?usp=sharing' },
            { label: 'Field Work Application', href: 'https://docs.google.com/forms/d/1r7TG0O9TfoeQhX93R4kEtemjLpioTVvjVi8gMM4pqOk/edit?usp=sharing' },
            { label: 'Dog Walking Application', href: 'https://docs.google.com/forms/d/1POi_dI0zdH_EEZIM5oEo74H4d7hqpCY3LRN2k6Wa3cU/edit?usp=sharing' },
            { label: 'Morning Feed Application', href: 'https://docs.google.com/forms/d/13rQNSAOIhBP7Dz91gOEHecZB2dMUDt1BV7g05b2h-gs/edit?usp=sharing' },
            { label: 'Evening Feed Application', href: 'https://docs.google.com/forms/d/1seeiZIjxbU7NjzrdQUljgrs3eOaRfLgnrH-B4DBSis4/edit?usp=sharing' },
            { label: 'Puppy Care Application', href: 'https://docs.google.com/forms/d/17trTwtdNPJarqRlToPlrdsdTh0PF99e12K2rFe0Cjew/edit?usp=sharing' },
            { label: 'Transporting Application', href: 'https://docs.google.com/forms/d/1E1h_7oldJ5qg63mIWnhQkrvEWNPOY5E0-ooAZO-Ay2k/edit?usp=sharing' },
            { label: 'Volunteer Coordinator', href: 'https://docs.google.com/forms/d/11WFMQN_fuH6FvN59DyQc14I9DjnnDhsaSokqUlnLjiU/edit?usp=sharing' },
          ].map(({ label, href }, idx) => (
            <Link
              key={idx}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-darkbrown text-darkbrown text-bold py-2 px-4 rounded hover:bg-darkbrown hover:text-beige transition text-center"
            >
              {label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}