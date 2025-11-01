'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FacebookIcon, InstagramIcon } from '../assets/icons';
import { Logo } from '../assets/logo';
import PawPrint from '../assets/PawPrint';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [showPayments, setShowPayments] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < lastScrollY.current || window.scrollY < 10) {
        setShowHeader(true);
      } else {
        setShowHeader(false);
      }
      lastScrollY.current = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`bg-gradient-to-t from-[#9c7459]/95 to-[#cdb7a3] text-white transition-transform duration-300 fixed w-full z-50 ${showHeader ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-3 relative">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Logo className="h-24 w-24 sm:h-20 sm:w-20" />
        </Link>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden text-white"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
          aria-expanded={isMenuOpen}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
          </svg>
        </button>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center justify-center space-x-8 flex-1">
          <div className="relative flex items-center space-x-4 xl:space-x-6">
            {/* Paw prints decoration */}
            <div className="absolute -left-12 hidden lg:block opacity-70">
              <PawPrint className="h-12 w-12 text-white" />
            </div>

            <Link href="/" className="text-lg font-medium hover:text-gray-200 transition-colors">Home</Link>
            <Link href="/adopt" className="text-lg font-medium hover:text-gray-200 transition-colors">Adopt</Link>
            <Link href="/foster" className="text-lg font-medium hover:text-gray-200 transition-colors">Foster</Link>
            <Link href="/getinvolved" className="text-lg font-medium hover:text-gray-200 transition-colors">Get Involved</Link>
            <Link href="/fundraisers" className="text-lg font-medium hover:text-gray-200 transition-colors">Fundraisers</Link>
            <Link href="/contact" className="text-lg font-medium hover:text-gray-200 transition-colors">Contact Us</Link> 
            <Link href="/happytails" className="text-lg font-medium hover:text-gray-200 transition-colors">Happy Tails</Link>
          </div>
        </nav>

        {/* Right side - Donate button and social */}
        <div className="hidden md:flex items-center space-x-4">
          <div>
            <Link
              href="https://www.canadahelps.org/en/dn/135877"
              className="border border-white px-5 py-2 rounded-lg text-center text-white font-medium hover:bg-white hover:text-[#9c7459] transition-colors w-full"
            >
              DONATE
            </Link>
          </div>
          <div className="flex items-center space-x-3">
            <a href="https://facebook.com/AHCRYYC" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FacebookIcon className="h-6 w-6 text-white hover:text-gray-200 transition-colors" />
            </a>
            <a href="https://instagram.com/ahcr.society" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <InstagramIcon className="h-6 w-6 text-white hover:text-gray-200 transition-colors" />
            </a>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {isMenuOpen && (
          <div className="md:hidden absolute inset-x-0 top-full bg-gradient-to-t from-[#9c7459] to-[#b19070] shadow-lg rounded-b-lg z-20">
            <div className="px-4 py-3 space-y-3 flex flex-col">
              <Link href="/" className="py-2 text-white hover:text-gray-200 transition-colors" onClick={toggleMenu}>Home</Link>
              <Link href="/adopt" className="py-2 text-white hover:text-gray-200 transition-colors" onClick={toggleMenu}>Adopt</Link>
              <Link href="/foster" className="py-2 text-white hover:text-gray-200 transition-colors" onClick={toggleMenu}>Foster</Link>
              <Link href="/getinvolved" className="py-2 text-white hover:text-gray-200 transition-colors" onClick={toggleMenu}>Get Involved</Link> 
              <Link href="/fundraisers" className="py-2 text-white hover:text-gray-200 transition-colors" onClick={toggleMenu}>Fundraisers</Link>
              <Link href="/contact" className="py-2 text-white hover:text-gray-200 transition-colors" onClick={toggleMenu}>Contact Us</Link>
              <Link href="/happytails" className="py-2 text-white hover:text-gray-200 transition-colors" onClick={toggleMenu}>Happy Tails</Link>

              <div className="pt-2 pb-3 flex flex-col space-y-3">
                <div>
                  <Link
                    href="https://www.canadahelps.org/en/dn/135877"
                    className="border border-white px-5 py-2 rounded-lg text-center text-white font-medium hover:bg-white hover:text-[#9c7459] transition-colors w-full"
                  >
                    DONATE
                  </Link>
                </div>
                <div className="flex justify-center space-x-4 pt-2">
                  <a href="https://facebook.com/AHCRYYC" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <FacebookIcon className="h-6 w-6 text-white hover:text-gray-200 transition-colors" />
                  </a>
                  <a href="https://instagram.com/ahcr.society" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <InstagramIcon className="h-6 w-6 text-white hover:text-gray-200 transition-colors" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;