'use client';

import { Montserrat, Inter } from 'next/font/google';
import localFont from 'next/font/local';
import Navigation from '../components/Navigation';
import { useState, useEffect, useRef } from 'react';

const montserrat = Montserrat({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });
const anthonio = localFont({ src: '../fonts/AnthonioScript.ttf' });

const HaloBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateCanvasSize = () => {
      const container = canvas.parentElement;
      if (!container) return;
      
      width = container.offsetWidth;
      height = container.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    };

    let width = window.innerWidth;
    let height = window.innerHeight;
    updateCanvasSize();

    const halos: {
      x: number;
      y: number;
      size: number;
      color: string;
      opacity: number;
      speed: number;
      angle: number;
      pulseSpeed: number;
      pulseAmount: number;
      rotationRadius: number;
    }[] = [];

    const colors = [
      '#4B2CA0', // Violet foncé
      '#6B3DDF', // Violet moyen
      '#8B4FFF', // Violet clair
      '#2D1B69', // Bleu-violet foncé
      '#1E1B2E', // Bleu très foncé
      '#9B6DFF', // Violet brillant
      '#3D2B8C'  // Violet profond
    ];

    // Créer plusieurs halos avec des positions et tailles différentes
    for (let i = 0; i < 15; i++) {
      const angle = (Math.PI * 2 * i) / 15; // Distribution uniforme des angles initiaux
      const rotationRadius = Math.random() * (Math.min(width, height) * 0.4) + Math.min(width, height) * 0.2;
      
      halos.push({
        x: width * 0.5 + Math.cos(angle) * rotationRadius,
        y: height * 0.5 + Math.sin(angle) * rotationRadius,
        size: Math.random() * 400 + 200,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.15 + 0.05,
        speed: Math.random() * 0.15 + 0.05,
        angle: angle,
        pulseSpeed: Math.random() * 0.002 + 0.001,
        pulseAmount: Math.random() * 0.2 + 0.1,
        rotationRadius: rotationRadius
      });
    }

    const drawBackground = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // Fond principal avec gradient
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#050208');
      gradient.addColorStop(1, '#0A0514');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Dessiner les halos
      halos.forEach(halo => {
        // Mise à jour de la position avec mouvement orbital
        halo.angle += halo.speed * 0.01;
        halo.x = width * 0.5 + Math.cos(halo.angle) * halo.rotationRadius;
        halo.y = height * 0.5 + Math.sin(halo.angle) * halo.rotationRadius;

        // Ajout d'un mouvement sinusoïdal supplémentaire
        halo.x += Math.sin(time * 0.0005 + halo.angle) * 20;
        halo.y += Math.cos(time * 0.0005 + halo.angle) * 20;

        // Effet de pulsation
        const pulse = Math.sin(time * halo.pulseSpeed) * halo.pulseAmount;
        const currentSize = halo.size * (1 + pulse);

        // Créer le gradient radial pour le halo
        const gradient = ctx.createRadialGradient(
          halo.x, halo.y, 0,
          halo.x, halo.y, currentSize
        );
        gradient.addColorStop(0, `${halo.color}${Math.floor(halo.opacity * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(0.5, `${halo.color}${Math.floor(halo.opacity * 0.5 * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(1, `${halo.color}00`);

        // Dessiner le halo
        ctx.beginPath();
        ctx.arc(halo.x, halo.y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Ajouter un effet de lueur
        ctx.shadowColor = halo.color;
        ctx.shadowBlur = 40;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Effet de lueur centrale pulsante
      const centerGlow = ctx.createRadialGradient(
        width * 0.5, height * 0.5, 0,
        width * 0.5, height * 0.5, Math.max(width, height) * 0.5
      );
      const pulse = Math.sin(time * 0.001) * 0.08 + 0.15;
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
      updateCanvasSize();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full" />;
};

export default function About() {
  return (
    <div className={`relative min-h-screen ${montserrat.className}`}>
      <div className="fixed inset-0 bg-[#050208]">
        <HaloBackground />
      </div>
      <Navigation />
      
      <main className="relative z-10">
        <div className="container mx-auto px-4 pt-32 pb-24 space-y-24">
          {/* Hero Section */}
          <section className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-8 text-center bg-gradient-to-r from-[#4B2CA0] to-[#2D1B69] bg-clip-text text-transparent animate-gradient">
              À Propos
            </h1>
            <div className="bg-[#0a0a0a]/80 backdrop-blur-sm p-8 rounded-2xl border border-[#2D1B69]/20 hover:border-[#4B2CA0]/40 hover:shadow-lg hover:shadow-[#2D1B69]/20 transition-all duration-300">
              <p className="text-gray-300 leading-relaxed text-lg text-center">
                Passionné par la cybersécurité et le développement, je suis un ingénieur de 23 ans qui aime relever des défis techniques. 
                Mon approche combine créativité et rigueur pour développer des solutions innovantes et sécurisées.
              </p>
            </div>
          </section>

          {/* Timeline Section */}
          <section className="max-w-5xl mx-auto pt-8">
            <h2 className="text-4xl font-bold text-white mb-12 text-center bg-gradient-to-r from-[#4B2CA0] to-[#2D1B69] bg-clip-text text-transparent animate-gradient">
              Mon Parcours
            </h2>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#2D1B69] to-transparent border-l-2 border-r-2 border-white/20"></div>
              {[
                {
                  year: "2025",
                  title: "École Centrale d'Électronique (ECE)",
                  subtitle: "Diplôme d'ingénieur généraliste - Systèmes d'informations",
                  location: "Lyon / Paris, France",
                  points: [
                    "Labellisé SecNumedu (ANSSI) et CTI",
                    "Cycle international (English Track)",
                    "1er décile en informatique",
                    "Spécialisation en Cybersécurité"
                  ]
                },
                {
                  year: "2022",
                  title: "McGill University",
                  subtitle: "Programme d'échange international",
                  location: "Montréal, Canada",
                  points: [
                    "Programmation avancée",
                    "Géopolitique et engagement civique",
                    "Immersion en milieu anglophone"
                  ]
                },
                {
                  year: "2021",
                  title: "EF - UCLA Long Beach",
                  subtitle: "Stage linguistique intensif",
                  location: "Los Angeles, USA",
                  points: [
                    "Certification d'anglais niveau C1",
                    "Cours de culture américaine",
                    "Immersion totale"
                  ]
                },
                {
                  year: "2020",
                  title: "École Centrale d'Électronique (ECE)",
                  subtitle: "Début du cursus d'ingénieur",
                  location: "Lyon, France",
                  points: [
                    "Fondamentaux de l'ingénierie",
                    "Introduction aux systèmes d'information",
                    "Début du cycle international"
                  ]
                }
              ].map((item, index) => (
                <div key={index} className={`relative flex items-center gap-8 mb-12 ${
                  index % 2 === 0 ? 'flex-row-reverse' : ''
                }`}>
                  <div className="w-1/2"></div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-[#2D1B69] rounded-full border-4 border-white/20 hover:scale-110 transition-transform duration-300"></div>
                  <div className="w-1/2 group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1A1625] to-[#13111C] border border-[#2D1B4E]/30 hover:border-[#8B4FFF]/50 transition-all duration-300 p-6 hover:shadow-lg hover:shadow-[#8B4FFF]/10">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#8B4FFF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        <h3 className="text-xl font-bold text-white group-hover:text-[#8B4FFF] transition-colors duration-300">{item.title}</h3>
                      </div>
                      <p className="text-gray-300 mb-2">{item.subtitle}</p>
                      <p className="text-gray-400 text-sm mb-4">{item.location}</p>
                      <ul className="space-y-2">
                        {item.points.map((point, pointIndex) => (
                          <li key={pointIndex} className="text-gray-300 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-[#8B4FFF] rounded-full"></span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Skills Section */}
          <section className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-12 text-center bg-gradient-to-r from-[#4B2CA0] to-[#2D1B69] bg-clip-text text-transparent animate-gradient">
              Compétences
            </h2>
            
            {/* Main Grid */}
            <div className="flex flex-col gap-8">
              {/* Top Grid - 4 boxes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Technical Skills */}
                <div className="group relative overflow-hidden rounded-2xl bg-[#0a0a0a]/80 backdrop-blur-sm p-6 rounded-xl border border-[#2D1B69]/20 hover:border-[#4B2CA0]/40 hover:shadow-lg hover:shadow-[#2D1B69]/20 transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center gap-3 mb-4">
                    <svg className="w-5 h-5 text-[#4B2CA0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    <h3 className="text-xl font-bold text-white">Langages</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Python", "Java", "C++", "C", "SQL", 
                      "HTML/CSS/JS", "TypeScript", "NoSQL", "Shell"
                    ].map((lang, index) => (
                      <span key={index} className="px-3 py-1.5 bg-[#2D1B69]/20 rounded-full text-sm text-gray-300 group-hover:bg-[#4B2CA0]/40 group-hover:text-white transition-all duration-300">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Cybersecurity */}
                <div className="group relative overflow-hidden rounded-2xl bg-[#0a0a0a]/80 backdrop-blur-sm p-6 rounded-xl border border-[#2D1B69]/20 hover:border-[#4B2CA0]/40 hover:shadow-lg hover:shadow-[#2D1B69]/20 transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center gap-3 mb-4">
                    <svg className="w-5 h-5 text-[#4B2CA0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <h3 className="text-xl font-bold text-white">Cybersécurité</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Pentesting", "IAM", "Firewall", "DevOps", "OSINT", 
                      "Cisco", "CTF", "OWASP", "Sécurité réseau", 
                      "Tests d'intrusion", "Vulnérabilités web", "Active Directory"
                    ].map((skill, index) => (
                      <span key={index} className="px-3 py-1.5 bg-[#2D1B69]/20 rounded-full text-sm text-gray-300 group-hover:bg-[#4B2CA0]/40 group-hover:text-white transition-all duration-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tools */}
                <div className="group relative overflow-hidden rounded-2xl bg-[#0a0a0a]/80 backdrop-blur-sm p-6 rounded-xl border border-[#2D1B69]/20 hover:border-[#4B2CA0]/40 hover:shadow-lg hover:shadow-[#2D1B69]/20 transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center gap-3 mb-4">
                    <svg className="w-5 h-5 text-[#4B2CA0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    <h3 className="text-xl font-bold text-white">Outils</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Nessus", "Burp Suite", "Metasploit", "Wireshark", 
                      "Nmap", "Suite Office", "Git/GitHub", "Docker",
                      "Kali Linux", "VMware/VirtualBox"
                    ].map((tool, index) => (
                      <span key={index} className="px-3 py-1.5 bg-[#2D1B69]/20 rounded-full text-sm text-gray-300 group-hover:bg-[#4B2CA0]/40 group-hover:text-white transition-all duration-300">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Languages */}
                <div className="group relative overflow-hidden rounded-2xl bg-[#0a0a0a]/80 backdrop-blur-sm p-6 rounded-xl border border-[#2D1B69]/20 hover:border-[#4B2CA0]/40 hover:shadow-lg hover:shadow-[#2D1B69]/20 transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center gap-3 mb-4">
                    <svg className="w-5 h-5 text-[#4B2CA0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                    </svg>
                    <h3 className="text-xl font-bold text-white">Langues</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Français : Courant (Voltaire Expert)",
                      "Anglais : C1 (TOEFL: 100, TOEIC: 965)",
                      "Espagnol : B1"
                    ].map((lang, index) => (
                      <span key={index} className="px-3 py-1.5 bg-[#2D1B69]/20 rounded-full text-sm text-gray-300 group-hover:bg-[#4B2CA0]/40 group-hover:text-white transition-all duration-300">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Certifications - Centered below */}
              <div className="max-w-3xl mx-auto w-full">
                <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1A1625] to-[#13111C] border border-[#2D1B4E]/30 hover:border-[#8B4FFF]/50 transition-all duration-300 p-6 hover:shadow-lg hover:shadow-[#8B4FFF]/10">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#8B4FFF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <svg className="w-5 h-5 text-[#8B4FFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <h3 className="text-xl font-bold text-white group-hover:text-[#8B4FFF] transition-colors duration-300">Certifications</h3>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {[
                        {
                          name: "AWS Solutions Architect",
                          org: "Amazon Web Services",
                          date: "Déc. 2024 - Déc. 2034"
                        },
                        {
                          name: "Junior Penetration Tester",
                          org: "TryHackMe",
                          date: "Oct. 2023"
                        },
                        {
                          name: "AZ-900",
                          org: "Microsoft Azure Fundamentals",
                          date: "Janv. 2023"
                        },
                        {
                          name: "SC-900",
                          org: "Microsoft Security Fundamentals",
                          date: "Janv. 2023"
                        },
                        {
                          name: "BIA",
                          org: "Brevet d'Initiation Aéronautique",
                          date: "Oct. 2019"
                        },
                        {
                          name: "PSC1",
                          org: "Premiers Secours",
                          date: "Oct. 2018"
                        }
                      ].map((cert, index) => (
                        <div key={index} className="flex flex-col justify-between p-3 bg-[#2D1B4E]/30 rounded-xl text-sm group-hover:bg-[#8B4FFF]/20 transition-all duration-300">
                          <div>
                            <div className="text-[#8B4FFF] font-bold group-hover:text-white transition-colors duration-300 truncate">{cert.name}</div>
                            <div className="text-gray-300 text-xs group-hover:text-white/90 transition-colors duration-300 truncate">{cert.org}</div>
                          </div>
                          <div className="text-gray-400 text-xs mt-1 group-hover:text-white/70 transition-colors duration-300">{cert.date}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
} 