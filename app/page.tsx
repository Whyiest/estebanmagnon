'use client';

import { Montserrat, Inter } from 'next/font/google';
import localFont from 'next/font/local';
import { useEffect, useRef } from 'react';
import Navigation from './components/Navigation';

const montserrat = Montserrat({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });
const anthonio = localFont({ src: './fonts/AnthonioScript.ttf' });

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

      // Fond principal
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#050208');
      gradient.addColorStop(1, '#0A0514');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Dessiner les particules
      particles.forEach(particle => {
        // Mettre à jour la position
        particle.angle += 0.001;
        particle.x = width * 0.5 + Math.cos(particle.angle) * particle.radius;
        particle.y = height * 0.5 + Math.sin(particle.angle) * particle.radius;

        // Ajouter un mouvement aléatoire
        particle.x += Math.sin(time * 0.001 + particle.angle) * 2;
        particle.y += Math.cos(time * 0.001 + particle.angle) * 2;

        // Créer le gradient radial
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size
        );
        gradient.addColorStop(0, `${particle.color}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(1, `${particle.color}00`);

        // Dessiner la particule
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Ajouter un effet de lueur
        ctx.shadowColor = particle.color;
        ctx.shadowBlur = 20;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Effet de lueur centrale
      const centerGlow = ctx.createRadialGradient(
        width * 0.5, height * 0.5, 0,
        width * 0.5, height * 0.5, Math.max(width, height) * 0.5
      );
      const pulse = Math.sin(time * 0.001) * 0.05 + 0.1;
      centerGlow.addColorStop(0, `rgba(20, 8, 40, ${pulse})`);
      centerGlow.addColorStop(1, 'rgba(20, 8, 40, 0)');
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
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />;
};

const GalaxyAnimation = () => {
  useEffect(() => {
    const canvas = document.getElementById('galaxyCanvas') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    let mouseX = width / 2;
    let mouseY = height / 2;
    let isMouseMoving = false;
    let mouseTimeout: NodeJS.Timeout;

    const particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      opacity: number;
    }[] = [];

    const colors = ['#8B5CF6', '#6366F1', '#4F46E5', '#4338CA'];
    const particleCount = 150;

    // Création des particules
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.5 + 0.2
      });
    }

    const drawParticle = (particle: typeof particles[0]) => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = `${particle.color}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`;
      ctx.fill();
    };

    const connectParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.2 * (1 - distance / 100)})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(particle => {
        // Mise à jour de la position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Effet de rebond sur les bords
        if (particle.x < 0 || particle.x > width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > height) particle.speedY *= -1;

        // Effet d'attraction vers la souris
        if (isMouseMoving) {
          const dx = mouseX - particle.x;
          const dy = mouseY - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 200) {
            particle.x += dx * 0.02;
            particle.y += dy * 0.02;
          }
        }

        drawParticle(particle);
      });

      connectParticles();
      requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      isMouseMoving = true;

      clearTimeout(mouseTimeout);
      mouseTimeout = setTimeout(() => {
        isMouseMoving = false;
      }, 100);
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    animate();

    const handleResize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return null;
};

export default function Home() {
  return (
    <div className={`min-h-screen ${montserrat.className}`}>
      <FloatingBackground />
      <Navigation />
      <GalaxyAnimation />
      
      {/* Main Content */}
      <main className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="container mx-auto px-4 z-10">
          <div className="max-w-6xl mx-auto flex flex-col items-center">
            <div className="text-center mb-2">
              <span className={`text-2xl ${inter.className} text-gray-400 opacity-0 animate-slide-up`}>Hi, I'm</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold tracking-wider mb-8 text-center">
              <span className="block opacity-0 animate-slide-up text-white">
                ESTEBAN
              </span>
              <span className="block opacity-0 animate-slide-up text-gray-600 text-4xl md:text-6xl mt-2">
                MAGNON
              </span>
            </h1>

            {/* Minimal Floating Animation */}
            <div className="opacity-0 animate-slide-up-delayed w-full max-w-xl relative">
              <div className="relative h-24 rounded-xl bg-gradient-to-br from-purple-900/20 to-indigo-900/20 backdrop-blur-sm border border-purple-500/10 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center z-10">
                    <p className="text-purple-300 text-lg font-light tracking-wide mb-2">
                      Ingénieur en cybersécurité
                    </p>
                    <div className="flex items-center justify-center gap-4">
                      <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-sm">
                        23 ans
                      </span>
                      <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-sm">
                        Disponible
                      </span>
                    </div>
                  </div>
                </div>
                <FloatingParticles />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const FloatingParticles = () => {
  useEffect(() => {
    const container = document.querySelector('.particles-container') as HTMLDivElement;
    if (!container) return;

    const particleCount = 15;
    const particles: HTMLDivElement[] = [];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute w-1 h-1 rounded-full bg-purple-400/20';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      container.appendChild(particle);
      particles.push(particle);

      // Animation aléatoire pour chaque particule
      const duration = 3 + Math.random() * 4;
      const delay = Math.random() * 2;
      
      particle.animate(
        [
          { transform: 'translate(0, 0)', opacity: 0.2 },
          { transform: `translate(${Math.random() * 30 - 15}px, ${Math.random() * 30 - 15}px)`, opacity: 0.8 },
          { transform: 'translate(0, 0)', opacity: 0.2 }
        ],
        {
          duration: duration * 1000,
          delay: delay * 1000,
          iterations: Infinity,
          easing: 'ease-in-out'
        }
      );
    }

    return () => {
      particles.forEach(particle => particle.remove());
    };
  }, []);

  return <div className="particles-container absolute inset-0" />;
};
