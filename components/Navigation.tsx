'use client';

import { useState } from 'react';
import Link from 'next/link';
import localFont from 'next/font/local';

const anthonio = localFont({ src: '../app/fonts/AnthonioScript.ttf' });

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          <Link href="/" className="text-white hover:text-gray-300 transition-colors">Home</Link>
          <Link href="/about" className="text-white hover:text-gray-300 transition-colors">About</Link>
          <Link href="/experiences" className="text-white hover:text-gray-300 transition-colors">Experiences</Link>
          <Link href="/projets" className="text-white hover:text-gray-300 transition-colors">Projects</Link>
          <Link href="/contact" className="text-white hover:text-gray-300 transition-colors">Contact</Link>
        </div>

        {/* Mobile Navigation Button */}
        <button
          className="md:hidden text-white p-2"
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
        <div className="md:hidden absolute top-16 left-0 right-0 bg-[#0a0a0a] bg-opacity-95 backdrop-blur-sm p-4">
          <div className="flex flex-col gap-4">
            <Link href="/" className="text-white hover:text-gray-300 transition-colors">Home</Link>
            <Link href="/about" className="text-white hover:text-gray-300 transition-colors">About</Link>
            <Link href="/experiences" className="text-white hover:text-gray-300 transition-colors">Experiences</Link>
            <Link href="/projets" className="text-white hover:text-gray-300 transition-colors">Projects</Link>
            <Link href="/contact" className="text-white hover:text-gray-300 transition-colors">Contact</Link>
          </div>
        </div>
      )}
    </nav>
  );
} 