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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-16 text-center bg-gradient-to-r from-[#4B2CA0] to-[#2D1B69] bg-clip-text text-transparent animate-gradient opacity-0 animate-slide-up">
            Expériences
          </h1>

          <div className="max-w-4xl mx-auto space-y-8 md:space-y-12">
            {experiences.map((exp, index) => (
              <div 
                key={index} 
                className="bg-gray-900/50 backdrop-blur-sm p-4 md:p-8 rounded-2xl border border-[#2D1B69]/20 hover:border-[#4B2CA0]/40 hover:shadow-lg hover:shadow-[#2D1B69]/20 transition-all duration-300 transform hover:-translate-y-1 opacity-0 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                  <div className="w-16 h-16 md:w-20 md:h-20 relative flex-shrink-0">
                    <Image
                      src={exp.logo}
                      alt={`${exp.company} logo`}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <h2 className="text-xl md:text-2xl font-bold text-white">{exp.company}</h2>
                      <span className="text-[#4B2CA0] font-medium text-sm md:text-base">{exp.year}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 md:gap-4 text-gray-400 text-sm md:text-base mb-4">
                      <span>{exp.location}</span>
                      <span className="hidden md:inline">•</span>
                      <span>{exp.duration}</span>
                    </div>
                    <h3 className="text-lg md:text-xl text-[#4B2CA0] font-medium mb-4">{exp.role}</h3>
                    <ul className="space-y-2">
                      {exp.tasks.map((task, taskIndex) => (
                        <li key={taskIndex} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-[#2D1B69] rounded-full mt-2"></div>
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