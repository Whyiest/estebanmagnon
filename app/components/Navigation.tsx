'use client';

import Link from 'next/link';
import { useState } from 'react';
import localFont from 'next/font/local';

const anthonio = localFont({ src: '../fonts/AnthonioScript.ttf' });

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full p-6 z-50 bg-opacity-90 backdrop-blur-sm">
      <div className="container mx-auto flex justify-between items-center">
        <div className={`text-4xl ${anthonio.className} text-white`}>
          <Link href="/" className="hover:text-gray-300 transition-colors">
            esteban magnon
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8">
          <Link href="/" className="nav-link">Accueil</Link>
          <Link href="/about" className="nav-link">À Propos</Link>
          <Link href="/experiences" className="nav-link">Expériences</Link>
          <Link href="/projets" className="nav-link">Projets</Link>
          <Link href="/contact" className="nav-link">Contact</Link>
        </div>

        {/* Mobile Navigation Button */}
        <button
          className="md:hidden relative w-12 h-12 flex items-center justify-center rounded-xl bg-[#1A1625]/80 hover:bg-[#2D1B4E]/80 border border-[#2D1B4E]/30 hover:border-[#8B4FFF]/50 transition-all duration-300 group shadow-lg hover:shadow-[#8B4FFF]/10"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu"
        >
          <div className="relative w-7 h-7">
            <span className={`absolute top-0 left-0 w-full h-0.5 bg-white transform transition-all duration-300 ${
              isMenuOpen ? 'rotate-45 translate-y-3' : ''
            }`}></span>
            <span className={`absolute top-3 left-0 w-full h-0.5 bg-white transform transition-all duration-300 ${
              isMenuOpen ? 'opacity-0' : ''
            }`}></span>
            <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-white transform transition-all duration-300 ${
              isMenuOpen ? '-rotate-45 -translate-y-3' : ''
            }`}></span>
          </div>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-[#0a0a0a] bg-opacity-95 backdrop-blur-sm p-4">
          <div className="flex flex-col gap-4">
            <Link href="/" className="text-white hover:text-gray-300 transition-colors">Accueil</Link>
            <Link href="/about" className="text-white hover:text-gray-300 transition-colors">À Propos</Link>
            <Link href="/experiences" className="text-white hover:text-gray-300 transition-colors">Expériences</Link>
            <Link href="/projets" className="text-white hover:text-gray-300 transition-colors">Projets</Link>
            <Link href="/contact" className="text-white hover:text-gray-300 transition-colors">Contact</Link>
          </div>
        </div>
      )}
    </nav>
  );
} 