'use client';

import { Montserrat, Inter } from 'next/font/google';
import localFont from 'next/font/local';
import Image from 'next/image';
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

    const isMobile = width < 768; // Détection mobile

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

    // Ajuster le nombre de halos et leurs paramètres en fonction de la taille de l'écran
    const haloCount = isMobile ? 3 : 10; // Réduit de 4 à 3 sur mobile, de 15 à 10 sur desktop
    const baseSize = isMobile ? 100 : 300; // Réduit de 120 à 100 sur mobile, de 400 à 300 sur desktop
    const baseOpacity = isMobile ? 0.03 : 0.1; // Réduit de 0.04 à 0.03 sur mobile, de 0.15 à 0.1 sur desktop
    const baseSpeed = isMobile ? 0.03 : 0.1; // Réduit de 0.04 à 0.03 sur mobile, de 0.15 à 0.1 sur desktop
    const basePulseAmount = isMobile ? 0.01 : 0.15; // Réduit de 0.02 à 0.01 sur mobile, de 0.2 à 0.15 sur desktop

    // Créer plusieurs halos avec des positions et tailles différentes
    for (let i = 0; i < haloCount; i++) {
      const angle = (Math.PI * 2 * i) / haloCount;
      const rotationRadius = Math.random() * (Math.min(width, height) * (isMobile ? 0.2 : 0.3)) + Math.min(width, height) * (isMobile ? 0.08 : 0.15);
      
      halos.push({
        x: width * 0.5 + Math.cos(angle) * rotationRadius,
        y: height * 0.5 + Math.sin(angle) * rotationRadius,
        size: Math.random() * baseSize + (isMobile ? 30 : 150), // Réduit de 40 à 30 sur mobile, de 200 à 150 sur desktop
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * baseOpacity + (isMobile ? 0.01 : 0.03), // Réduit de 0.02 à 0.01 sur mobile, de 0.05 à 0.03 sur desktop
        speed: Math.random() * baseSpeed + (isMobile ? 0.01 : 0.03), // Réduit de 0.02 à 0.01 sur mobile, de 0.05 à 0.03 sur desktop
        angle: angle,
        pulseSpeed: Math.random() * 0.001 + 0.0005, // Réduit de 0.002 à 0.001 et de 0.001 à 0.0005
        pulseAmount: Math.random() * basePulseAmount + (isMobile ? 0.01 : 0.05), // Réduit de 0.02 à 0.01 sur mobile, de 0.1 à 0.05 sur desktop
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

        // Ajout d'un mouvement sinusoïdal supplémentaire (réduit sur mobile)
        const movementAmount = isMobile ? 3 : 15; // Réduit de 4 à 3 sur mobile, de 20 à 15 sur desktop
        halo.x += Math.sin(time * 0.0003 + halo.angle) * movementAmount; // Réduit de 0.0005 à 0.0003
        halo.y += Math.cos(time * 0.0003 + halo.angle) * movementAmount; // Réduit de 0.0005 à 0.0003

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

        // Ajouter un effet de lueur (réduit sur mobile)
        ctx.shadowColor = halo.color;
        ctx.shadowBlur = isMobile ? 5 : 30; // Réduit de 8 à 5 sur mobile, de 40 à 30 sur desktop
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Effet de lueur centrale pulsante (réduit sur mobile)
      const centerGlow = ctx.createRadialGradient(
        width * 0.5, height * 0.5, 0,
        width * 0.5, height * 0.5, Math.max(width, height) * (isMobile ? 0.1 : 0.3) // Réduit de 0.15 à 0.1 sur mobile, de 0.5 à 0.3 sur desktop
      );
      const pulse = Math.sin(time * 0.0008) * (isMobile ? 0.01 : 0.05) + (isMobile ? 0.02 : 0.1); // Réduit de 0.001 à 0.0008, de 0.015 à 0.01, de 0.03 à 0.02 sur mobile, de 0.08 à 0.05, de 0.15 à 0.1 sur desktop
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

export default function Experiences() {
  const experiences = [
    {
      year: "2025",
      location: "Lyon",
      duration: "Stage - 6 mois",
      company: "Orange Cyberdéfense",
      role: "Ethical Hacker",
      logo: "/logos/orange.jpg",
      tasks: [
        "Tests d'intrusions externes",
        "Projet de recherche sur les vecteurs d'attaque liés à Samba Active Directory",
        "Rédaction de rapports d'audit"
      ]
    },
    {
      year: "2024",
      location: "Lyon",
      duration: "Stage - 4 mois",
      company: "Capgemini",
      role: "Ethical Hacker",
      logo: "/logos/capgemini.jpg",
      tasks: [
        "Tests d'intrusions internes et externes",
        "Scan de vulnérabilités avec Nessus",
        "Réalisation de CTF (OWASP Juice-Shop, GOAD)",
        "Rapports et restitutions – Méthodologie OWASP"
      ]
    },
    {
      year: "2023",
      location: "Paris",
      duration: "Stage - 2 mois",
      company: "Capgemini",
      role: "Consultant cybersécurité",
      logo: "/logos/capgemini.jpg",
      tasks: [
        "Sécurisation d'infrastructures Cloud (AWS & Azure)",
        "Certifications AZ-900 et SC-900",
        "Recherche sur le pentesting",
        "Audit client via Stratus RedTeam"
      ]
    },
    {
      year: "2023",
      location: "Lyon",
      duration: "CDD - 3 mois",
      company: "Anaveo",
      role: "Référent technique",
      logo: "/logos/anaveo.jpg",
      tasks: [
        "Contact client pour résolution de problèmes",
        "Paramétrage réseau pour vidéo-surveillance",
        "Diagnostic et dépannage à distance (OS, réseau, hardware)"
      ]
    },
    {
      year: "2021-2022",
      location: "Lyon",
      duration: "10 mois",
      company: "BDE Purple",
      role: "Responsable Digital & Communication",
      logo: "/logos/bde.png",
      tasks: [
        "Management des pôles digital et commercial (8 personnes)",
        "Gestion de budget",
        "Démarchage de sponsors pour les étudiants",
        "Création de visuels et gestion de l'image de la liste (+200 visuels créés)"
      ]
    },
    {
      year: "2022",
      location: "Lyon",
      duration: "Stage - 2 mois",
      company: "SPASH",
      role: "Technicien Supply Chain",
      logo: "/logos/spash.jpg",
      tasks: [
        "Optimisation d'images Windows",
        "Création de scripts d'automatisation en BASH",
        "Configuration de micro-ordinateurs",
        "Support client et démarchage commercial"
      ]
    },
    {
      year: "2018",
      location: "Villeurbanne",
      duration: "Stage - 1 mois",
      company: "INSA Lyon",
      role: "Stagiaire chercheur IoT",
      logo: "/logos/insa.jpg",
      tasks: [
        "Stage au laboratoire de recherche 'CITI'",
        "Création de stations météos avec Arduino",
        "Découverte des métiers de l'IoT et l'IA"
      ]
    },
    {
      year: "2016",
      location: "Paris",
      duration: "Stage - 1 mois",
      company: "SPIE ICS",
      role: "Stagiaire",
      logo: "/logos/spie.jpg",
      tasks: [
        "Découverte des services",
        "Architecture réseau",
        "Monitoring parc client"
      ]
    }
  ];

  return (
    <div className={`relative min-h-screen ${montserrat.className}`}>
      <div className="fixed inset-0 bg-[#050208]">
        <HaloBackground />
      </div>
      <Navigation />
      
      <main className="relative z-10">
        <div className="container mx-auto px-4 pt-32 pb-16">
          <h1 className="text-3xl md:text-4xl font-medium text-white mb-20 text-center tracking-wide">
            Expériences
          </h1>

          <div className="max-w-4xl mx-auto space-y-8 md:space-y-12">
            {experiences.map((exp, index) => (
              <div 
                key={index} 
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1A1625]/60 to-[#13111C]/60 backdrop-blur-md border border-[#2D1B4E]/20 hover:border-[#8B4FFF]/40 transition-all duration-500 p-6 md:p-8 hover:shadow-2xl hover:shadow-[#8B4FFF]/5 hover:scale-[1.01] transform-gpu"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Effet de brillance au hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#8B4FFF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-x-[-100%] group-hover:translate-x-[100%]"></div>
                
                <div className="flex flex-col md:flex-row gap-6 relative">
                  {/* Logo */}
                  <div className="w-16 h-16 md:w-20 md:h-20 relative flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                    <Image
                      src={exp.logo}
                      alt={`${exp.company} logo`}
                      fill
                      className="object-contain"
                    />
                  </div>

                  <div className="flex-1">
                    {/* En-tête avec style asymétrique */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 relative">
                      <div className="relative">
                        <h2 className="text-xl md:text-2xl font-bold text-white group-hover:text-[#8B4FFF] transition-colors duration-500">{exp.company}</h2>
                        <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#8B4FFF] hidden md:block group-hover:w-full transition-all duration-500"></div>
                      </div>
                      <span className="text-white font-medium text-sm md:text-base bg-[#13111C]/90 px-4 py-1.5 rounded-full border border-[#2D1B4E]/30 group-hover:border-[#8B4FFF]/30 group-hover:bg-[#2D1B4E]/50 transition-all duration-500">{exp.year}</span>
                    </div>

                    {/* Informations avec icônes stylisées */}
                    <div className="flex flex-wrap items-center gap-3 md:gap-4 text-gray-400 text-sm md:text-base mb-4">
                      <span className="flex items-center gap-2 bg-[#13111C]/90 px-3 py-1.5 rounded-lg border border-[#2D1B4E]/20 group-hover:border-[#8B4FFF]/20 transition-all duration-500">
                        <svg className="w-4 h-4 text-white group-hover:text-[#8B4FFF] transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {exp.location}
                      </span>
                      <span className="flex items-center gap-2 bg-[#13111C]/90 px-3 py-1.5 rounded-lg border border-[#2D1B4E]/20 group-hover:border-[#8B4FFF]/20 transition-all duration-500">
                        <svg className="w-4 h-4 text-white group-hover:text-[#8B4FFF] transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {exp.duration}
                      </span>
                    </div>

                    {/* Rôle avec effet de surbrillance */}
                    <div className="relative mb-4">
                      <h3 className="text-lg md:text-xl text-white font-medium group-hover:text-[#8B4FFF] transition-colors duration-500">{exp.role}</h3>
                      <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#8B4FFF] hidden md:block group-hover:w-full transition-all duration-500 delay-100"></div>
                    </div>

                    {/* Liste des tâches avec style amélioré */}
                    <ul className="space-y-3">
                      {exp.tasks.map((task, taskIndex) => (
                        <li key={taskIndex} className="flex items-start gap-3 group-hover:text-gray-200 transition-colors duration-500">
                          <div className="relative mt-1.5">
                            <div className="absolute inset-0 bg-white rounded-full blur-xl group-hover:bg-white transition-colors duration-500 animate-pulse"></div>
                            <div className="w-3 h-3 bg-white rounded-full relative group-hover:bg-white transition-colors duration-500 shadow-[0_0_20px_rgba(255,255,255,1)]"></div>
                          </div>
                          <span className="text-sm md:text-base text-gray-300">{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
} 