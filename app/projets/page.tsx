'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Montserrat, Inter } from 'next/font/google';
import localFont from 'next/font/local';
import Navigation from '../components/Navigation';

const montserrat = Montserrat({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });
const anthonio = localFont({ src: '../fonts/AnthonioScript.ttf' });

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  date: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Pentesting-SambaAD",
    description: "Méthodologie de test d'intrusions dans un environnement Active Directory basé sur Samba AD",
    tags: ["Cybersécurité", "Python", "Pentest"],
    github: "https://github.com/Whyiest/Pentesting-SambaAD",
    date: "2025"
  },
  {
    id: 2,
    title: "Juice-Shop Write-up",
    description: "Non-official write up for the Juice-Shop CTF - Documentation complète des vulnérabilités et solutions",
    tags: ["Cybersécurité", "Python", "CTF", "OWASP"],
    github: "https://github.com/Whyiest/Juice-Shop-Write-up",
    date: "2025"
  },
  {
    id: 3,
    title: "xmlrpc-buldozer",
    description: "Outil de brute force pour les endpoints XML-RPC utilisant la méthode multicall",
    tags: ["Cybersécurité", "Python", "Pentest"],
    github: "https://github.com/Whyiest/xmlrpc-buldozer",
    date: "2025"
  },
  {
    id: 4,
    title: "PwnDoc Vuln",
    description: "Documentation des 100 vulnérabilités du guide OWASP Web avec leurs remédiations en français",
    tags: ["Cybersécurité", "OWASP", "Documentation"],
    github: "https://github.com/Whyiest/pwndoc-vuln",
    date: "2024"
  },
  {
    id: 5,
    title: "ARECE",
    description: "Première écurie automobile 100% autonome de France. Création d'une plateforme de parallélisation de tests de simulation pour le véhicule.",
    tags: ["Autonome", "Python", "Simulation", "Shell"],
    link: "https://www.arece.eu/",
    github: "https://github.com/Whyiest/arece-environment",
    date: "2024"
  },
  {
    id: 6,
    title: "SwiftChat",
    description: "Application de messagerie en temps réel",
    tags: ["Applications", "Java", "Réseau"],
    github: "https://github.com/Whyiest/SwiftChat",
    date: "2023"
  },
  {
    id: 7,
    title: "Cluedo Game",
    description: "Jeu de Cluedo basé sur le thème Among Us",
    tags: ["Jeux", "C++", "Among Us"],
    github: "https://github.com/Whyiest/CluedoGame",
    date: "2023"
  },
  {
    id: 8,
    title: "AirControlSimulator",
    description: "Simulateur de contrôle aérien développé en C++ qui visualise et gère des avions sur une carte virtuelle. Utilise l'algorithme de Dijkstra pour calculer les routes les plus courtes et intègre des événements météorologiques et des pannes potentielles.",
    tags: ["Applications", "C++", "SFML", "Simulation"],
    github: "https://github.com/Whyiest/AirControlSimulator",
    date: "2023"
  },
  {
    id: 9,
    title: "The Cocktail Bible",
    description: "Site web pour trouver des cocktails à l'aide d'une API",
    tags: ["Web", "JavaScript", "API"],
    github: "https://github.com/Whyiest/TheCocktailBible",
    date: "2023"
  }
];

const categories = ["Tous", "Cybersécurité", "Web", "Jeux", "Applications", "Autonome"];

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
    }[] = [];

    const colors = [
      '#4B2CA0', // Violet foncé
      '#6B3DDF', // Violet moyen
      '#8B4FFF', // Violet clair
      '#2D1B69', // Bleu-violet foncé
      '#1E1B2E'  // Bleu très foncé
    ];

    // Créer plusieurs halos avec des positions et tailles différentes
    for (let i = 0; i < 8; i++) {
      halos.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 300 + 200,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.15 + 0.05,
        speed: Math.random() * 0.2 + 0.1,
        angle: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.002 + 0.001,
        pulseAmount: Math.random() * 0.2 + 0.1
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
        // Mise à jour de la position
        halo.angle += halo.speed * 0.01;
        halo.x += Math.cos(halo.angle) * 0.5;
        halo.y += Math.sin(halo.angle) * 0.5;

        // Effet de rebond sur les bords
        if (halo.x < -halo.size) halo.x = width + halo.size;
        if (halo.x > width + halo.size) halo.x = -halo.size;
        if (halo.y < -halo.size) halo.y = height + halo.size;
        if (halo.y > height + halo.size) halo.y = -halo.size;

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
        ctx.shadowBlur = 30;
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
      updateCanvasSize();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full" />;
};

export default function Projets() {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const filteredProjects = selectedCategory === "Tous" 
    ? projects 
    : projects.filter(project => project.tags.includes(selectedCategory));

  return (
    <div className={`relative min-h-screen ${montserrat.className}`}>
      <div className="fixed inset-0 bg-[#050208]">
        <HaloBackground />
      </div>
      <Navigation />
      
      <main className="relative z-10">
        <div className="container mx-auto px-4 pt-32 pb-16">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center text-white">Mes Projets</h1>
            <p className="text-lg md:text-xl text-gray-300 mb-12 text-center">
              Découvrez une sélection de mes réalisations les plus marquantes
            </p>

            <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 md:px-6 py-2 rounded-full transition-all duration-300 text-sm md:text-base ${
                    selectedCategory === category
                      ? "bg-[#1E1B2E] text-white border border-[#2D1B4E]"
                      : "bg-[#13111C] text-gray-300 hover:bg-[#1E1B2E] border border-[#1E1B2E]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="relative group overflow-hidden rounded-xl bg-gradient-to-br from-[#1A1625] to-[#13111C] border border-[#2D1B4E]/30 hover:border-[#8B4FFF]/50 transition-all duration-300 p-4 md:p-6 hover:shadow-lg hover:shadow-[#8B4FFF]/10 hover:scale-[1.02] transform-gpu flex flex-col justify-between"
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  {/* Header */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-[#8B4FFF] transition-colors duration-300">{project.title}</h3>
                    </div>
                    
                    <p className="text-sm md:text-base text-gray-300 mb-6 group-hover:text-gray-200 transition-colors duration-300 line-clamp-3">{project.description}</p>
                  </div>

                  {/* Footer */}
                  <div className="space-y-4">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 md:px-3 py-1 bg-[#2D1B4E]/30 rounded-full text-xs md:text-sm text-gray-300 group-hover:bg-[#8B4FFF]/20 group-hover:text-white transition-colors duration-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Metadata */}
                    <div className="flex items-center gap-4 text-xs md:text-sm text-gray-400 mb-4">
                      <div className="flex items-center gap-1">
                        <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                        </svg>
                        <span>GitHub</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{project.date}</span>
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3">
                      {project.github && (
                        <Link
                          href={project.github}
                          className="flex-1 group/button relative px-3 md:px-4 py-2 md:py-2.5 bg-gradient-to-br from-[#2D1B4E] to-[#13111C] border border-[#8B4FFF]/30 rounded-lg transition-all duration-300 overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-[#8B4FFF] to-[#2D1B4E] opacity-0 group-hover/button:opacity-100 transition-opacity duration-300"></div>
                          <span className="relative flex items-center justify-center gap-2 text-white text-sm md:text-base font-medium">
                            <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                            GitHub
                          </span>
                        </Link>
                      )}
                      {project.link && (
                        <Link
                          href={project.link}
                          className="flex-1 group/button relative px-3 md:px-4 py-2 md:py-2.5 bg-gradient-to-br from-[#2D1B4E] to-[#13111C] border border-[#8B4FFF]/30 rounded-lg transition-all duration-300 overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-[#8B4FFF] to-[#2D1B4E] opacity-0 group-hover/button:opacity-100 transition-opacity duration-300"></div>
                          <span className="relative flex items-center justify-center gap-2 text-white text-sm md:text-base font-medium">
                            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            Voir le projet
                          </span>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 