'use client';

import { Montserrat, Inter } from 'next/font/google';
import localFont from 'next/font/local';
import Image from 'next/image';
import Navigation from '../components/Navigation';

const montserrat = Montserrat({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });
const anthonio = localFont({ src: '../fonts/AnthonioScript.ttf' });

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
    <div className={`min-h-screen gradient-background ${montserrat.className}`}>
      <Navigation />
      
      {/* Main Content */}
      <main className="relative bg-[#030303]">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,_#6B3DDF_0%,_transparent_70%)] opacity-[0.1] blur-2xl animate-float-slow"></div>
          <div className="absolute w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,_#4B2CA0_0%,_transparent_70%)] opacity-[0.1] blur-2xl animate-float-slow-reverse right-0 top-1/4" style={{ animationDelay: '2s' }}></div>
          <div className="absolute w-[700px] h-[700px] bg-[radial-gradient(circle_at_center,_#8B4FFF_0%,_transparent_70%)] opacity-[0.1] blur-2xl animate-float-slow left-1/3 bottom-0" style={{ animationDelay: '4s' }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 pt-32 pb-16">
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