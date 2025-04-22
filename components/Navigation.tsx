'use client';

import { useState } from 'react';
import Link from 'next/link';
import localFont from 'next/font/local';
import { usePathname } from 'next/navigation';

const anthonio = localFont({ src: '../app/fonts/AnthonioScript.ttf' });

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed w-full p-6 z-50 bg-[#0a0a0a] bg-opacity-90 backdrop-blur-sm">
      <div className="container mx-auto flex justify-between items-center">
        <div className={`text-4xl ${anthonio.className} text-white`}>
          <Link href="/" className="hover:text-gray-300 transition-colors">
            esteban magnon
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8">
          <Link 
            href="/" 
            className={`text-white hover:text-[#8B4FFF] transition-colors ${isActive('/') ? 'text-[#8B4FFF]' : ''}`}
          >
            Home
          </Link>
          <Link 
            href="/about" 
            className={`text-white hover:text-[#8B4FFF] transition-colors ${isActive('/about') ? 'text-[#8B4FFF]' : ''}`}
          >
            About
          </Link>
          <Link 
            href="/experiences" 
            className={`text-white hover:text-[#8B4FFF] transition-colors ${isActive('/experiences') ? 'text-[#8B4FFF]' : ''}`}
          >
            Experiences
          </Link>
          <Link 
            href="/projets" 
            className={`text-white hover:text-[#8B4FFF] transition-colors ${isActive('/projets') ? 'text-[#8B4FFF]' : ''}`}
          >
            Projects
          </Link>
          <Link 
            href="/contact" 
            className={`text-white hover:text-[#8B4FFF] transition-colors ${isActive('/contact') ? 'text-[#8B4FFF]' : ''}`}
          >
            Contact
          </Link>
        </div>

        {/* Mobile Navigation Button */}
        <button
          className="md:hidden text-white p-2 hover:text-[#8B4FFF] transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed top-[5.5rem] left-0 right-0 bottom-0 bg-[#0a0a0a]/95 backdrop-blur-md p-6 transform transition-transform duration-300 ease-in-out">
          <div className="flex flex-col gap-6">
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className={`relative overflow-hidden group py-4 px-6 rounded-xl bg-[#13111C] border border-[#2D1B4E]/30 hover:border-[#8B4FFF]/50 transition-all duration-300 ${
                isActive('/') ? 'border-[#8B4FFF] bg-[#1A1625]' : ''
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#4B2CA0] to-[#2D1B69] opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <span className={`text-xl font-medium ${isActive('/') ? 'text-[#8B4FFF]' : 'text-white'} group-hover:text-[#8B4FFF] transition-colors`}>
                Home
              </span>
            </Link>
            <Link
              href="/about"
              onClick={() => setIsMenuOpen(false)}
              className={`relative overflow-hidden group py-4 px-6 rounded-xl bg-[#13111C] border border-[#2D1B4E]/30 hover:border-[#8B4FFF]/50 transition-all duration-300 ${
                isActive('/about') ? 'border-[#8B4FFF] bg-[#1A1625]' : ''
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#4B2CA0] to-[#2D1B69] opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <span className={`text-xl font-medium ${isActive('/about') ? 'text-[#8B4FFF]' : 'text-white'} group-hover:text-[#8B4FFF] transition-colors`}>
                About
              </span>
            </Link>
            <Link
              href="/experiences"
              onClick={() => setIsMenuOpen(false)}
              className={`relative overflow-hidden group py-4 px-6 rounded-xl bg-[#13111C] border border-[#2D1B4E]/30 hover:border-[#8B4FFF]/50 transition-all duration-300 ${
                isActive('/experiences') ? 'border-[#8B4FFF] bg-[#1A1625]' : ''
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#4B2CA0] to-[#2D1B69] opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <span className={`text-xl font-medium ${isActive('/experiences') ? 'text-[#8B4FFF]' : 'text-white'} group-hover:text-[#8B4FFF] transition-colors`}>
                Experiences
              </span>
            </Link>
            <Link
              href="/projets"
              onClick={() => setIsMenuOpen(false)}
              className={`relative overflow-hidden group py-4 px-6 rounded-xl bg-[#13111C] border border-[#2D1B4E]/30 hover:border-[#8B4FFF]/50 transition-all duration-300 ${
                isActive('/projets') ? 'border-[#8B4FFF] bg-[#1A1625]' : ''
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#4B2CA0] to-[#2D1B69] opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <span className={`text-xl font-medium ${isActive('/projets') ? 'text-[#8B4FFF]' : 'text-white'} group-hover:text-[#8B4FFF] transition-colors`}>
                Projects
              </span>
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
              className={`relative overflow-hidden group py-4 px-6 rounded-xl bg-[#13111C] border border-[#2D1B4E]/30 hover:border-[#8B4FFF]/50 transition-all duration-300 ${
                isActive('/contact') ? 'border-[#8B4FFF] bg-[#1A1625]' : ''
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#4B2CA0] to-[#2D1B69] opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <span className={`text-xl font-medium ${isActive('/contact') ? 'text-[#8B4FFF]' : 'text-white'} group-hover:text-[#8B4FFF] transition-colors`}>
                Contact
              </span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
} 