'use client';

import { Montserrat, Inter } from 'next/font/google';
import Link from 'next/link';
import localFont from 'next/font/local';
import { useEffect, useRef } from 'react';

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

export default function Home() {
  return (
    <div className={`min-h-screen ${montserrat.className}`}>
      <FloatingBackground />
      
      {/* Navigation */}
      <nav className="fixed w-full p-6 z-50 bg-opacity-90 backdrop-blur-sm">
        <div className="container mx-auto flex justify-between items-center">
          <div className={`text-4xl ${anthonio.className} text-white`}>
            <Link href="/" className="hover:text-gray-300 transition-colors">
              esteban magnon
            </Link>
          </div>
          <div className="flex gap-8">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/about" className="nav-link">About</Link>
            <Link href="/experiences" className="nav-link">Experiences</Link>
            <Link href="/projets" className="nav-link">Projects</Link>
            <Link href="/contact" className="nav-link">Contact</Link>
          </div>
        </div>
      </nav>

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
            </h1>

            {/* Modern Terminal Card */}
            <div className="opacity-0 animate-slide-up-delayed">
              <div className="bg-black/60 backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl border border-gray-800">
                {/* Terminal Header */}
                <div className="flex items-center gap-2 px-4 py-2 bg-black/40 border-b border-gray-800">
                  <div className="w-3 h-3 rounded-full bg-red-500/70"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
                  <span className="text-gray-400 text-sm ml-2">terminal</span>
                </div>
                
                {/* Terminal Content */}
                <div className="p-4 font-mono text-sm space-y-1">
                  <div className="flex items-center">
                    <span className="text-purple-400 mr-2">{'>'}</span>
                    <span className="text-white">C:\</span>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="text-purple-400 mr-2">{'>'}</span>
                    <span className="text-white">C:\ cd <span className="text-purple-400">Ingénieur</span></span>
                  </div>

                  <div className="flex items-center">
                    <span className="text-purple-400 mr-2">{'>'}</span>
                    <span className="text-white">C:\Ingénieur{'>'} cd <span className="text-purple-400">23yo</span></span>
                  </div>

                  <div className="flex items-center">
                    <span className="text-purple-400 mr-2">{'>'}</span>
                    <span className="text-white">C:\Ingénieur\23yo{'>'} <span className="text-purple-400">Open_to_work</span></span>
                  </div>

                  <div className="flex items-center">
                    <span className="text-purple-400 mr-2">{'>'}</span>
                    <span className="typing-cursor text-white">_</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
