'use client';

import { useState } from 'react';
import { FiMail, FiGithub, FiLinkedin, FiMapPin } from 'react-icons/fi';
import { FaFileAlt } from 'react-icons/fa';
import { Montserrat, Inter } from 'next/font/google';
import localFont from 'next/font/local';
import { FloatingBackground } from '@/components/FloatingBackground';
import Navigation from '../components/Navigation';

const montserrat = Montserrat({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });
const anthonio = localFont({ src: '../fonts/AnthonioScript.ttf' });

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className={`min-h-screen ${montserrat.className}`}>
      <FloatingBackground />
      <Navigation />
      
      {/* Main Content */}
      <main className="relative min-h-screen">
        <div className="container mx-auto px-4 relative z-10 pt-32 pb-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center bg-gradient-to-r from-[#4B2CA0] to-[#2D1B69] bg-clip-text text-transparent animate-gradient">
              Contact
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Form */}
              <div className="bg-[#13111C] p-6 md:p-8 rounded-2xl border border-[#2D1B4E]/30">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm md:text-base text-gray-300 mb-2">Nom</label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-[#1A1625] border border-[#2D1B4E]/30 rounded-lg text-white focus:outline-none focus:border-[#4B2CA0] transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm md:text-base text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-[#1A1625] border border-[#2D1B4E]/30 rounded-lg text-white focus:outline-none focus:border-[#4B2CA0] transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm md:text-base text-gray-300 mb-2">Message</label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 bg-[#1A1625] border border-[#2D1B4E]/30 rounded-lg text-white focus:outline-none focus:border-[#4B2CA0] transition-colors h-32"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-gradient-to-r from-[#4B2CA0] to-[#2D1B69] text-white rounded-lg hover:from-[#5B3CB0] hover:to-[#3B2B79] transition-all duration-300"
                  >
                    Envoyer
                  </button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="space-y-6">
                <div className="bg-[#13111C] p-6 md:p-8 rounded-2xl border border-[#2D1B4E]/30">
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-6">Informations de contact</h2>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <FiMail className="text-2xl text-[#4B2CA0]" />
                      <div>
                        <p className="text-sm md:text-base text-gray-400">Email</p>
                        <p className="text-white">esteban.magnon@proton.me</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <FiMapPin className="text-2xl text-[#4B2CA0]" />
                      <div>
                        <p className="text-sm md:text-base text-gray-400">Localisation</p>
                        <p className="text-white">Lyon, France</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#13111C] p-6 md:p-8 rounded-2xl border border-[#2D1B4E]/30">
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-6">Réseaux sociaux</h2>
                  <div className="space-y-4">
                    <a 
                      href="https://www.linkedin.com/in/esteban-magnon/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 bg-[#13111C] rounded-xl border border-[#1E1B2E] hover:border-[#2D1B4E] hover:shadow-lg hover:shadow-[#2D1B4E]/20 transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <FiLinkedin className="text-2xl text-[#4B2CA0]" />
                      <div>
                        <p className="text-sm md:text-base text-gray-400">LinkedIn</p>
                        <p className="text-white">linkedin.com/in/esteban-magnon</p>
                      </div>
                    </a>
                  </div>
                </div>

                <div className="bg-[#13111C] p-6 md:p-8 rounded-2xl border border-[#2D1B4E]/30">
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-6">CV</h2>
                  <a 
                    href="/cv-fr.pdf"
                    className="inline-flex items-center gap-3 px-6 py-4 bg-white rounded-xl border-2 border-[#2D1B4E] hover:border-[#4B2CA0] hover:shadow-lg hover:shadow-[#2D1B4E]/20 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <FaFileAlt className="text-[#4B2CA0] text-xl" />
                    <span className="text-[#2D1B4E] font-medium text-base md:text-lg">Télécharger mon CV</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}