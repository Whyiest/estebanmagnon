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

const ParticleBox = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateCanvasSize = () => {
      const container = canvas.parentElement;
      if (!container) return;
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      return { width: canvas.width, height: canvas.height };
    };

    const dimensions = updateCanvasSize();
    if (!dimensions) return;

    let width = dimensions.width;
    let height = dimensions.height;

    const particles: {
      x: number;
      y: number;
      speedX: number;
      speedY: number;
    }[] = [];

    const particleCount = 65;
    const connectionDistance = 180;
    const particleSpeed = 0.15;
    const verticalRadius = height * 0.6;
    const horizontalRadius = width * 0.6;

    // Création des particules avec distribution plus large
    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5;
      const distance = 0.2 + Math.random() * 0.8;
      const x = width/2 + Math.cos(angle) * (horizontalRadius * distance);
      const y = height/2 + Math.sin(angle) * (verticalRadius * distance);
      
      particles.push({
        x: x,
        y: y,
        speedX: (Math.random() - 0.5) * particleSpeed * (1 + Math.abs(Math.cos(angle))),
        speedY: (Math.random() - 0.5) * particleSpeed,
      });
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, width, height);

      // Créer un masque elliptique
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(width/2, height/2, horizontalRadius, verticalRadius, 0, 0, Math.PI * 2);
      ctx.clip();

      // Dessiner les connexions
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.15;
            ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Dessiner les particules
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(139, 92, 246, 0.4)';
        ctx.fill();

        // Mise à jour de la position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Rebond sur les bords de l'ellipse
        const dx = (particle.x - width/2) / horizontalRadius;
        const dy = (particle.y - height/2) / verticalRadius;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 1) {
          const angle = Math.atan2(dy * verticalRadius, dx * horizontalRadius);
          particle.x = width/2 + Math.cos(angle) * horizontalRadius;
          particle.y = height/2 + Math.sin(angle) * verticalRadius;
          particle.speedX *= -1;
          particle.speedY *= -1;
        }
      });

      ctx.restore();
      requestAnimationFrame(drawParticles);
    };

    const handleResize = () => {
      const newDimensions = updateCanvasSize();
      if (newDimensions) {
        width = newDimensions.width;
        height = newDimensions.height;
      }
    };

    window.addEventListener('resize', handleResize);
    drawParticles();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="w-full h-full relative">
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="space-y-6 text-center">
          <p className="text-purple-300 text-lg font-light tracking-wide animate-float-slow">
            Ingénieur en cybersécurité
          </p>
          <div className="flex items-center justify-center gap-6">
            <span className="px-3 py-1 text-purple-300 text-sm animate-float-slow-2">
              23 ans
            </span>
            <span className="px-3 py-1 text-purple-300 text-sm animate-float-slow-3">
              Disponible
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <div className={`min-h-screen ${montserrat.className}`}>
      <FloatingBackground />
      <Navigation />
      
      {/* Main Content */}
      <main className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="container mx-auto px-4 z-10">
          <div className="max-w-6xl mx-auto flex flex-col items-center">
            <div className="text-center mb-2">
              <span className={`text-2xl ${inter.className} text-gray-400 animate-slide-up`}>Hi, I'm</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold tracking-wider mb-8 text-center">
              <span className="block animate-slide-up text-white">
                ESTEBAN
              </span>
            </h1>

            {/* Particle Animation Box */}
            <div className="w-full max-w-4xl h-[200px] relative">
              <ParticleBox />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
