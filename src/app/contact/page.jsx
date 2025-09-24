'use client'
import React, { useRef, useState } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({ submitted: false, error: false, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [captchaToken, setCaptchaToken] = useState(null);
  const captchaRef = useRef(null);
  const hCaptchaSiteKey = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || '';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCaptchaVerify = (token) => {
    setCaptchaToken(token);
    setFormStatus((prev) => ({ ...prev, error: false, message: '' }));
  };

  const handleCaptchaExpire = () => {
    setCaptchaToken(null);
  };

  const handleCaptchaError = () => {
    setCaptchaToken(null);
    setFormStatus({ submitted: false, error: true, message: 'Captcha failed to load. Please refresh and try again.' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!hCaptchaSiteKey) {
      setFormStatus({ submitted: false, error: true, message: 'Contact form is temporarily unavailable. Please try again later.' });
      return;
    }

    if (!captchaToken) {
      setFormStatus({ submitted: false, error: true, message: 'Please complete the hCaptcha challenge.' });
      return;
    }

    setFormStatus({ submitted: false, error: false, message: '' });
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, hCaptchaToken: captchaToken }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error ?? 'Email submission failed');
      }

      setFormStatus({ submitted: true, error: false, message: '' });
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      setTimeout(() => setFormStatus({ submitted: false, error: false, message: '' }), 5000);
    } catch (err) {
      console.error(err);
      setFormStatus({ submitted: false, error: true, message: err.message || 'Email submission failed' });
    } finally {
      setIsSubmitting(false);
      setCaptchaToken(null);
      captchaRef.current?.resetCaptcha();
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 items-stretch items-start transition-all duration-700 ease-in-out">
        {/* Contact Info Section */}
        <section className="flex flex-col h-full transition-transform duration-700 hover:scale-[1.02]">
          <div className="bg-gray-700 shadow-md rounded-lg p-6 h-full">
            <h2 className="text-3xl font-bold text-[#9c7459] mb-6 flex items-center gap-2">
              <span>Contact Us</span>
              <span>🐾</span>
            </h2>
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
        <section className="pt-16 transition-transform duration-700 hover:scale-[1.02]">
          <div className="bg-white shadow-md rounded-lg p-8 md:p-10 lg:p-12 space-y-8 h-full">
          <h2 className="text-3xl font-bold text-[#9c7459] mb-6 text-center flex items-center justify-center gap-2">
            <span>Get In Touch</span>
            <span>🐾</span>
          </h2>  
            {formStatus.submitted ? (
              <div className="text-center py-8">
                <div className="text-green-600 text-5xl mb-4">✓</div>
                <h3 className="text-2xl font-bold text-[#9c7459] mb-2">Thank You!</h3>
                <p className="text-gray-700">Your message has been sent successfully. We'll get back to you shortly.</p>
              </div>
            ) : (
              <>
                {formStatus.error && (
                  <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {formStatus.message || "Something went wrong. Please try again."}
                  </div>
                )}
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
                  <div className="flex justify-center">
                    {hCaptchaSiteKey ? (
                      <HCaptcha
                        sitekey={hCaptchaSiteKey}
                        onVerify={handleCaptchaVerify}
                        onExpire={handleCaptchaExpire}
                        onError={handleCaptchaError}
                        ref={captchaRef}
                      />
                    ) : (
                      <p className="text-sm text-red-600">Captcha is not configured. Please contact the site administrator.</p>
                    )}
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting || (!!hCaptchaSiteKey && !captchaToken)}
                      className="bg-[#9c7459] hover:bg-[#7d5c46] text-white px-6 py-3 rounded-lg transition duration-300 shadow-md disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </section>
      </div>
      
    </div>
  );
};

export default ContactPage;
