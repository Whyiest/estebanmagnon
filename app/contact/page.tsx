'use client';

import { useState } from 'react';
import { FiMail, FiGithub, FiLinkedin } from 'react-icons/fi';
import { FaFileAlt } from 'react-icons/fa';
import { Montserrat, Inter } from 'next/font/google';
import Link from 'next/link';
import localFont from 'next/font/local';

const montserrat = Montserrat({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });
const anthonio = localFont({ src: '../fonts/AnthonioScript.ttf' });

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implémenter l'envoi du formulaire
    console.log(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className={`min-h-screen gradient-background ${montserrat.className}`}>
      {/* Navigation */}
      <nav className="fixed w-full p-6 z-50 bg-opacity-90 backdrop-blur-sm">
        <div className="container mx-auto flex justify-between items-center">
          <div className={`text-4xl ${anthonio.className}`}>
            <Link href="/" className="hover:text-gray-300 transition-colors">
              esteban magnon
            </Link>
          </div>
          <div className="flex gap-8">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
            <Link href="/about" className="text-gray-300 hover:text-white transition-colors">About</Link>
            <Link href="/experiences" className="text-gray-300 hover:text-white transition-colors">Experiences</Link>
            <Link href="/projets" className="text-gray-300 hover:text-white transition-colors">Projects</Link>
            <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-32 pb-16 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute w-[400px] h-[400px] bg-[radial-gradient(circle_at_center,_#6B3DDF_0%,_transparent_70%)] opacity-[0.1] blur-2xl animate-float-slow"></div>
          <div className="absolute w-[300px] h-[300px] bg-[radial-gradient(circle_at_center,_#4B2CA0_0%,_transparent_70%)] opacity-[0.1] blur-2xl animate-float-slow-reverse right-0 top-1/4" style={{ animationDelay: '2s' }}></div>
          <div className="absolute w-[350px] h-[350px] bg-[radial-gradient(circle_at_center,_#8B4FFF_0%,_transparent_70%)] opacity-[0.1] blur-2xl animate-float-slow left-1/3 bottom-0" style={{ animationDelay: '4s' }}></div>
          <div className="absolute w-[200px] h-[200px] bg-[radial-gradient(circle_at_center,_#6B3DDF_0%,_transparent_70%)] opacity-[0.08] blur-2xl animate-float-slow right-1/4 top-1/3" style={{ animationDelay: '1s' }}></div>
          <div className="absolute w-[250px] h-[250px] bg-[radial-gradient(circle_at_center,_#4B2CA0_0%,_transparent_70%)] opacity-[0.08] blur-2xl animate-float-slow-reverse left-1/4 bottom-1/3" style={{ animationDelay: '3s' }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-16 text-center bg-gradient-to-r from-[#4B2CA0] to-[#2D1B69] bg-clip-text text-transparent animate-gradient">
            Contact
          </h1>

          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <a 
                href="mailto:esteban.magnon@outlook.fr"
                className="flex items-center gap-4 p-6 bg-[#13111C] rounded-xl border border-[#1E1B2E] hover:border-[#2D1B4E] hover:shadow-lg hover:shadow-[#2D1B4E]/20 transition-all duration-300 transform hover:-translate-y-1"
              >
                <FiMail className="text-2xl text-[#4B2CA0]" />
                <div>
                  <p className="text-sm text-gray-400">Email <span className="text-[#4B2CA0]">Préféré</span></p>
                  <p className="text-white">esteban.magnon@outlook.fr</p>
                </div>
              </a>

              <a 
                href="https://github.com/Whyiest"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-6 bg-[#13111C] rounded-xl border border-[#1E1B2E] hover:border-[#2D1B4E] hover:shadow-lg hover:shadow-[#2D1B4E]/20 transition-all duration-300 transform hover:-translate-y-1"
              >
                <FiGithub className="text-2xl text-[#4B2CA0]" />
                <div>
                  <p className="text-sm text-gray-400">GitHub</p>
                  <p className="text-white">github.com/Whyiest</p>
                </div>
              </a>

              <a 
                href="https://www.linkedin.com/in/esteban-magnon/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-6 bg-[#13111C] rounded-xl border border-[#1E1B2E] hover:border-[#2D1B4E] hover:shadow-lg hover:shadow-[#2D1B4E]/20 transition-all duration-300 transform hover:-translate-y-1"
              >
                <FiLinkedin className="text-2xl text-[#4B2CA0]" />
                <div>
                  <p className="text-sm text-gray-400">LinkedIn</p>
                  <p className="text-white">linkedin.com/in/esteban-magnon</p>
                </div>
              </a>

              <div className="pt-6">
                <p className="text-xl mb-4 text-white">Resume</p>
                <div>
                  <a 
                    href="/cv-fr.pdf"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-white rounded-xl border-2 border-[#2D1B4E] hover:border-[#4B2CA0] hover:shadow-lg hover:shadow-[#2D1B4E]/20 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <FaFileAlt className="text-[#4B2CA0] text-xl" />
                    <span className="text-[#2D1B4E] font-medium text-lg">Télécharger mon CV</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-[#13111C] p-8 rounded-xl border border-[#1E1B2E]">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                    Nom
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 bg-[#0A0A0A] rounded-lg border border-[#1E1B2E] focus:border-[#4B2CA0] focus:ring-1 focus:ring-[#4B2CA0] text-white placeholder-gray-500"
                    placeholder="Votre nom"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 bg-[#0A0A0A] rounded-lg border border-[#1E1B2E] focus:border-[#4B2CA0] focus:ring-1 focus:ring-[#4B2CA0] text-white placeholder-gray-500"
                    placeholder="Votre email"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full p-3 bg-[#0A0A0A] rounded-lg border border-[#1E1B2E] focus:border-[#4B2CA0] focus:ring-1 focus:ring-[#4B2CA0] text-white placeholder-gray-500"
                    placeholder="Votre message"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#2D1B4E] text-white py-3 px-6 rounded-lg hover:bg-[#4B2CA0] transition-all duration-300 transform hover:-translate-y-1"
                >
                  Envoyer le message
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}