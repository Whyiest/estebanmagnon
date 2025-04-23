'use client';

import { useState, useEffect, useRef } from 'react';
import { FiMail, FiGithub, FiLinkedin, FiMapPin } from 'react-icons/fi';
import { FaFileAlt } from 'react-icons/fa';
import { Montserrat, Inter } from 'next/font/google';
import localFont from 'next/font/local';
import Navigation from '../components/Navigation';

const montserrat = Montserrat({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });
const anthonio = localFont({ src: '../fonts/AnthonioScript.ttf' });

const FloatingBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      opacity: number;
      angle: number;
      radius: number;
    }[] = [];

    const particleCount = 100;
    const colors = ['#2D1B4E', '#1E1B2E', '#13111C'];
    const baseRadius = Math.min(width, height) * 0.4;

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = baseRadius * (0.5 + Math.random() * 0.5);
      particles.push({
        x: width * 0.5 + Math.cos(angle) * radius,
        y: height * 0.5 + Math.sin(angle) * radius,
        size: Math.random() * 100 + 50,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.1 + 0.05,
        angle: angle,
        radius: radius
      });
    }

    const drawBackground = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      
      particles.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Rebond sur les bords
        if (particle.x < 0 || particle.x > width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > height) particle.speedY *= -1;
        
        // Dessiner la particule
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();
      });
      
      ctx.globalAlpha = 1;
    };

    const animate = (time: number) => {
      timeRef.current = time;
      drawBackground(time);
      requestAnimationFrame(animate);
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);
    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ background: '#050208' }}
    />
  );
};

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
            <h1 className="text-4xl md:text-5xl font-medium text-white mb-20 text-center tracking-wide">
              Contact
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Info - Maintenant à gauche */}
              <div className="space-y-6 md:order-1">
                <div className="bg-gradient-to-br from-[#1A1625]/60 to-[#13111C]/60 backdrop-blur-md p-6 md:p-8 rounded-2xl border-2 border-white/20 hover:border-white/40 transition-all duration-500">
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-6">Contact direct</h2>
                  <div className="space-y-4">
                    <a 
                      href="mailto:esteban.magnon@outlook.fr"
                      className="flex items-center gap-4 p-4 bg-[#13111C]/90 rounded-xl border-2 border-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-[#8B4FFF]/5 transition-all duration-300 transform hover:-translate-y-1 ring-1 ring-[#2D1B4E]/10"
                    >
                      <FiMail className="text-2xl text-white" />
                      <div>
                        <p className="text-sm md:text-base text-gray-400">Email</p>
                        <p className="text-white">esteban.magnon@outlook.fr</p>
                      </div>
                    </a>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#1A1625]/60 to-[#13111C]/60 backdrop-blur-md p-6 md:p-8 rounded-2xl border-2 border-white/20 hover:border-white/40 transition-all duration-500">
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-6">Réseaux sociaux</h2>
                  <div className="space-y-4">
                    <a 
                      href="https://www.linkedin.com/in/esteban-magnon/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 bg-[#13111C]/90 rounded-xl border-2 border-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-[#8B4FFF]/5 transition-all duration-300 transform hover:-translate-y-1 ring-1 ring-[#2D1B4E]/10"
                    >
                      <FiLinkedin className="text-2xl text-white" />
                      <div>
                        <p className="text-sm md:text-base text-gray-400">LinkedIn</p>
                        <p className="text-white">linkedin.com/in/esteban-magnon</p>
                      </div>
                    </a>

                    <a 
                      href="https://github.com/Whyiest"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 bg-[#13111C]/90 rounded-xl border-2 border-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-[#8B4FFF]/5 transition-all duration-300 transform hover:-translate-y-1 ring-1 ring-[#2D1B4E]/10"
                    >
                      <FiGithub className="text-2xl text-white" />
                      <div>
                        <p className="text-sm md:text-base text-gray-400">GitHub</p>
                        <p className="text-white">github.com/Whyiest</p>
                      </div>
                    </a>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#1A1625]/60 to-[#13111C]/60 backdrop-blur-md p-6 md:p-8 rounded-2xl border-2 border-white/20 hover:border-white/40 transition-all duration-500">
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-6">CV</h2>
                  <a 
                    href="/cv-fr.pdf"
                    className="inline-flex items-center gap-3 px-6 py-4 bg-white rounded-xl border-2 border-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-white/5 transition-all duration-300 transform hover:-translate-y-1 group"
                  >
                    <FaFileAlt className="text-[#2D1B4E] text-xl group-hover:text-[#4B2CA0] transition-colors duration-300" />
                    <span className="text-[#2D1B4E] font-medium text-base md:text-lg group-hover:text-[#4B2CA0] transition-colors duration-300">Télécharger mon CV</span>
                  </a>
                </div>
              </div>

              {/* Contact Form - Maintenant à droite */}
              <div className="bg-[#13111C] p-6 md:p-8 rounded-2xl border-2 border-white/20 hover:border-white/40 md:order-2">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm md:text-base text-gray-300 mb-2">Nom</label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-[#1A1625] border-2 border-white/10 hover:border-white/20 rounded-lg text-white focus:outline-none focus:border-[#4B2CA0] transition-colors"
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
                      className="w-full px-4 py-3 bg-[#1A1625] border-2 border-white/10 hover:border-white/20 rounded-lg text-white focus:outline-none focus:border-[#4B2CA0] transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm md:text-base text-gray-300 mb-2">Message</label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 bg-[#1A1625] border-2 border-white/10 hover:border-white/20 rounded-lg text-white focus:outline-none focus:border-[#4B2CA0] transition-colors h-32"
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
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}