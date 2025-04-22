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

const InteractiveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
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
      connectionDistance: number;
    }[] = [];

    const particleCount = 150;
    const colors = ['#4B2CA0', '#6B3DDF', '#8B4FFF'];
    const baseRadius = Math.min(width, height) * 0.4;

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = baseRadius * (0.5 + Math.random() * 0.5);
      particles.push({
        x: width * 0.5 + Math.cos(angle) * radius,
        y: height * 0.5 + Math.sin(angle) * radius,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.5 + 0.2,
        angle: angle,
        radius: radius,
        connectionDistance: Math.random() * 100 + 50
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    };

    window.addEventListener('mousemove', handleMouseMove);

    const drawBackground = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // Fond principal avec gradient
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#050208');
      gradient.addColorStop(1, '#0A0514');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Dessiner les particules et leurs connexions
      particles.forEach((particle, i) => {
        // Mise à jour de la position
        particle.angle += 0.001;
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Effet de rebond sur les bords
        if (particle.x < 0 || particle.x > width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > height) particle.speedY *= -1;

        // Interaction avec la souris
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 100) {
          particle.x -= dx * 0.02;
          particle.y -= dy * 0.02;
        }

        // Dessiner les connexions
        particles.forEach((otherParticle, j) => {
          if (i < j) {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < particle.connectionDistance) {
              const opacity = (1 - distance / particle.connectionDistance) * 0.2;
              ctx.beginPath();
              ctx.strokeStyle = `rgba(139, 79, 255, ${opacity})`;
              ctx.lineWidth = 1;
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.stroke();
            }
          }
        });

        // Dessiner la particule
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        // Effet de lueur
        ctx.shadowColor = particle.color;
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Effet de lueur centrale pulsante
      const centerGlow = ctx.createRadialGradient(
        width * 0.5, height * 0.5, 0,
        width * 0.5, height * 0.5, Math.max(width, height) * 0.5
      );
      const pulse = Math.sin(time * 0.001) * 0.1 + 0.2;
      centerGlow.addColorStop(0, `rgba(107, 61, 223, ${pulse})`);
      centerGlow.addColorStop(1, 'rgba(107, 61, 223, 0)');
      ctx.fillStyle = centerGlow;
      ctx.fillRect(0, 0, width, height);
    };

    const animate = (time: number) => {
      timeRef.current = time;
      drawBackground(time);
      requestAnimationFrame(animate);
    };

    animate(0);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />;
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
      <InteractiveBackground />
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