'use client'
import React from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const ContactPage = () => {
  const position = { lat: 54.7682, lng: -111.9648 }; // Lac La Biche, Alberta, T0A 2C0
  const containerStyle = { width: '100%', height: '100%' };
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
  });

  return (
    <div className="container pt-32 mx-auto px-4 pb-16">
      <section className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="bg-gray-700 text-white rounded-2xl shadow-lg p-6 sm:p-8 space-y-6 transition-transform duration-700 hover:scale-[1.01]">
            <h1 className="text-3xl font-bold text-[#f3d6c1] mb-4">Contact Us</h1>
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-[#f3d6c1] mb-2">Main Office</h2>
                <p>Box 2737</p>
                <p>Lac La Biche, Alberta T2A 2C0</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-[#f3d6c1] mb-2">Hours of Operation</h2>
                <p>Tuesday - Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday & Monday: Closed</p>
              </div>
              <div className="grid gap-4">
                <div className="rounded-lg bg-[#f8f4f1] text-gray-800 p-4">
                  <p className="font-semibold text-[#9c7459]">Email</p>
                  <a href="mailto:almosthomecaninerescue@gmail.com" className="underline break-all">almosthomecaninerescue@gmail.com</a>
                </div>
                <div className="rounded-lg bg-[#f8f4f1] text-gray-800 p-4">
                  <p className="font-semibold text-[#9c7459]">Phone</p>
                  <p>(587) 574-4939</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform duration-700 hover:scale-[1.01]">
            <div className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-[#9c7459] mb-4">Visit Us</h2>
            </div>
            <div className="h-[320px] sm:h-[380px]">
              {isLoaded ? (
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={position}
                  zoom={13}
                >
                  <Marker position={position} />
                </GoogleMap>
              ) : (
                <div className="flex h-full items-center justify-center bg-[#f8f4f1] text-gray-500">Loading map...</div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
