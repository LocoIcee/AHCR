'use client'
import React, { useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({ submitted: false, error: false });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: 'almosthomecaninerescue@gmail.com',
          subject: `New Contact Form Submission: ${formData.subject}`,
          text: `
        Name: ${formData.name}
        Email: ${formData.email}
        Phone: ${formData.phone}
        Subject: ${formData.subject}
        Message: ${formData.message}
      `
        }),
      });

      if (response.ok) {
        setFormStatus({ submitted: true, error: false });
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
        setTimeout(() => setFormStatus({ submitted: false, error: false }), 5000);
      } else {
        throw new Error('Email submission failed');
      }
    } catch (err) {
      console.error(err);
      setFormStatus({ submitted: false, error: true });
    }
  };

  // Office location coordinates
  const position = { lat: 54.7682, lng: -111.9648 }; // Lac La Biche, Alberta, T0A 2C0
  const containerStyle = { width: '100%', height: '400px' };
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
  });

  return (
    <div className="container pt-32 mx-auto px-4 py-8">      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 items-stretch items-start">
        {/* Contact Info Section */}
        <section className="flex flex-col h-full">
          <div className="bg-gray-700 shadow-md rounded-lg p-6 h-full">
            <h2 className="text-3xl font-bold text-[#9c7459] mb-6">Contact Us</h2>
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-3 text-[#9c7459]">Main Office</h3>
              <p className="text-beige">Box 2737</p>
              <p className="text-beige">Lac La Biche Alberta T2A 2C0</p>
              <p className="text-beige mt-2">Phone: (587) 574-4939</p>
              <p className="text-beige">Email: almosthomecaninerescue@gmail.com</p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-3 text-[#9c7459]">Hours of Operation</h3>
              <p className="text-beige">Tuesday - Saturday: 10:00 AM - 4:00 PM</p>
              <p className="text-beige">Sunday & Monday closed</p>
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-bold mb-3 text-[#9c7459]">Find Us</h3>
              <div className="bg-white rounded-lg overflow-hidden" style={{ height: '250px' }}>
                {isLoaded ? (
                  <GoogleMap mapContainerStyle={{ width: '100%', height: '100%' }} center={position} zoom={13}>
                    <Marker position={position} />
                  </GoogleMap>
                ) : (
                  <div className="flex items-center justify-center h-full">Loading map...</div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="pt-16">
          <div className="bg-white shadow-md rounded-lg p-8 md:p-10 lg:p-12 space-y-8 h-full">
          <h2 className="text-3xl font-bold text-[#9c7459] mb-6 text-center">Get In Touch</h2>  
            {formStatus.submitted ? (
              <div className="text-center py-8">
                <div className="text-green-600 text-5xl mb-4">✓</div>
                <h3 className="text-2xl font-bold text-[#9c7459] mb-2">Thank You!</h3>
                <p className="text-gray-700">Your message has been sent successfully. We'll get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9c7459]"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9c7459]"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9c7459]"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9c7459]"
                    >
                      <option value="">Select a subject</option>
                      <option value="adoption">Adoption Inquiry</option>
                      <option value="fostering">Fostering Inquiry</option>
                      <option value="volunteering">Volunteering</option>
                      <option value="donation">Donations & Sponsorships</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9c7459]"
                  ></textarea>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-[#9c7459] hover:bg-[#7d5c46] text-white px-6 py-3 rounded-lg transition duration-300"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>
      </div>
      
    </div>
  );
};

export default ContactPage;