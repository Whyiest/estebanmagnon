'use client';

import { Montserrat, Inter } from 'next/font/google';
import Link from 'next/link';
import localFont from 'next/font/local';

const montserrat = Montserrat({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });
const anthonio = localFont({ src: '../../public/fonts/AnthonioScript.ttf' });

export default function About() {
  return (
    <div className={`min-h-screen bg-[#0a0a0a] ${montserrat.className}`}>
      {/* Navigation */}
      <nav className="fixed w-full p-6 z-50 bg-opacity-90 backdrop-blur-sm">
        <div className="container mx-auto flex justify-between items-center">
          <div className={`text-3xl ${anthonio.className}`}>
            <Link href="/" className="hover:text-gray-300 transition-colors">
              esteban magnon
            </Link>
          </div>
          <div className="flex gap-8">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
            <Link href="/about" className="text-gray-300 hover:text-white transition-colors">About</Link>
            <Link href="/experiences" className="text-gray-300 hover:text-white transition-colors">Experiences</Link>
            <Link href="/projects" className="text-gray-300 hover:text-white transition-colors">Projects</Link>
            <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-32 pb-16 space-y-24">
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-8 text-center bg-gradient-to-r from-[#4B2CA0] to-[#2D1B69] bg-clip-text text-transparent animate-gradient">
            About Me
          </h1>
          <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-[#2D1B69]/20 hover:border-[#4B2CA0]/40 hover:shadow-lg hover:shadow-[#2D1B69]/20 transition-all duration-300">
            <p className="text-gray-300 leading-relaxed text-lg text-center">
              Passionné par la cybersécurité et le développement, je suis un ingénieur de 23 ans qui aime relever des défis techniques. 
              Mon approche combine créativité et rigueur pour développer des solutions innovantes et sécurisées.
            </p>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center bg-gradient-to-r from-[#4B2CA0] to-[#2D1B69] bg-clip-text text-transparent animate-gradient">
            Mon Parcours
          </h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b from-[#2D1B69] to-transparent"></div>
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
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#2D1B69] rounded-full border-4 border-gray-900 hover:scale-110 transition-transform duration-300"></div>
                <div className="w-1/2">
                  <div className="bg-gray-900/50 p-6 rounded-xl border border-[#2D1B69]/20 backdrop-blur-sm hover:border-[#4B2CA0]/40 hover:shadow-lg hover:shadow-[#2D1B69]/20 transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[#4B2CA0] font-bold text-lg">{item.year}</span>
                      <span className="text-gray-400 text-sm">{item.location}</span>
                    </div>
                    <h3 className="text-white font-bold text-xl mb-1">{item.title}</h3>
                    <p className="text-[#4B2CA0] font-medium mb-3">{item.subtitle}</p>
                    <ul className="space-y-2">
                      {item.points.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2 group">
                          <div className="w-1.5 h-1.5 bg-[#2D1B69] rounded-full mt-2 group-hover:bg-[#4B2CA0] transition-colors duration-300"></div>
                          <span className="text-gray-300 text-sm group-hover:text-white transition-colors duration-300">{point}</span>
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
        <section className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center bg-gradient-to-r from-[#4B2CA0] to-[#2D1B69] bg-clip-text text-transparent animate-gradient">
            Compétences
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Technical Skills */}
            <div className="bg-gray-900/50 p-8 rounded-2xl border border-[#2D1B69]/20 backdrop-blur-sm hover:border-[#4B2CA0]/40 hover:shadow-lg hover:shadow-[#2D1B69]/20 transition-all duration-300 transform hover:-translate-y-1">
              <h3 className="text-2xl font-bold text-white mb-6">Langages</h3>
              <div className="space-y-4">
                {["Python", "Java", "SQL"].map((lang, index) => (
                  <div key={index} className="flex items-center gap-3 group">
                    <div className="w-2 h-2 bg-[#2D1B69] rounded-full group-hover:bg-[#4B2CA0] transition-colors duration-300"></div>
                    <span className="text-gray-300 group-hover:text-white transition-colors duration-300">{lang}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cybersecurity */}
            <div className="bg-gray-900/50 p-8 rounded-2xl border border-[#2D1B69]/20 backdrop-blur-sm hover:border-[#4B2CA0]/40 hover:shadow-lg hover:shadow-[#2D1B69]/20 transition-all duration-300 transform hover:-translate-y-1">
              <h3 className="text-2xl font-bold text-white mb-6">Cybersécurité</h3>
              <div className="space-y-4">
                {["Pentesting", "IAM", "Firewall", "DevOps", "OSINT", "Cisco"].map((skill, index) => (
                  <div key={index} className="flex items-center gap-3 group">
                    <div className="w-2 h-2 bg-[#2D1B69] rounded-full group-hover:bg-[#4B2CA0] transition-colors duration-300"></div>
                    <span className="text-gray-300 group-hover:text-white transition-colors duration-300">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div className="bg-gray-900/50 p-8 rounded-2xl border border-[#2D1B69]/20 backdrop-blur-sm hover:border-[#4B2CA0]/40 hover:shadow-lg hover:shadow-[#2D1B69]/20 transition-all duration-300 transform hover:-translate-y-1">
              <h3 className="text-2xl font-bold text-white mb-6">Outils</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 group">
                  <div className="w-2 h-2 bg-[#2D1B69] rounded-full group-hover:bg-[#4B2CA0] transition-colors duration-300"></div>
                  <span className="text-gray-300 group-hover:text-white transition-colors duration-300">Nessus</span>
                </div>
                <div className="flex items-center gap-3 group">
                  <div className="w-2 h-2 bg-[#2D1B69] rounded-full group-hover:bg-[#4B2CA0] transition-colors duration-300"></div>
                  <span className="text-gray-300 group-hover:text-white transition-colors duration-300">Burp Suite</span>
                </div>
                <div className="flex items-center gap-3 group">
                  <div className="w-2 h-2 bg-[#2D1B69] rounded-full group-hover:bg-[#4B2CA0] transition-colors duration-300"></div>
                  <span className="text-gray-300 group-hover:text-white transition-colors duration-300">TryHackMe (top 8%)</span>
                </div>
              </div>
            </div>

            {/* Systems */}
            <div className="bg-gray-900/50 p-8 rounded-2xl border border-[#2D1B69]/20 backdrop-blur-sm hover:border-[#4B2CA0]/40 hover:shadow-lg hover:shadow-[#2D1B69]/20 transition-all duration-300 transform hover:-translate-y-1">
              <h3 className="text-2xl font-bold text-white mb-6">Systèmes</h3>
              <div className="space-y-4">
                {[
                  "Linux",
                  "Cloud (AWS, Azure)",
                  "Sécurité réseau",
                  "POO"
                ].map((sys, index) => (
                  <div key={index} className="flex items-center gap-3 group">
                    <div className="w-2 h-2 bg-[#2D1B69] rounded-full group-hover:bg-[#4B2CA0] transition-colors duration-300"></div>
                    <span className="text-gray-300 group-hover:text-white transition-colors duration-300">{sys}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="bg-gray-900/50 p-8 rounded-2xl border border-[#2D1B69]/20 backdrop-blur-sm hover:border-[#4B2CA0]/40 hover:shadow-lg hover:shadow-[#2D1B69]/20 transition-all duration-300 transform hover:-translate-y-1">
              <h3 className="text-2xl font-bold text-white mb-6">Langues</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 group">
                  <div className="w-2 h-2 bg-[#2D1B69] rounded-full group-hover:bg-[#4B2CA0] transition-colors duration-300"></div>
                  <span className="text-gray-300 group-hover:text-white transition-colors duration-300">Français : Courant</span>
                </div>
                <div className="flex items-center gap-3 group">
                  <div className="w-2 h-2 bg-[#2D1B69] rounded-full group-hover:bg-[#4B2CA0] transition-colors duration-300"></div>
                  <span className="text-gray-300 group-hover:text-white transition-colors duration-300">Anglais : C1 (TOEFL: 100)</span>
                </div>
                <div className="flex items-center gap-3 group">
                  <div className="w-2 h-2 bg-[#2D1B69] rounded-full group-hover:bg-[#4B2CA0] transition-colors duration-300"></div>
                  <span className="text-gray-300 group-hover:text-white transition-colors duration-300">Espagnol : B1</span>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-gray-900/50 p-8 rounded-2xl border border-[#2D1B69]/20 backdrop-blur-sm hover:border-[#4B2CA0]/40 hover:shadow-lg hover:shadow-[#2D1B69]/20 transition-all duration-300 transform hover:-translate-y-1">
              <h3 className="text-2xl font-bold text-white mb-6">Certifications</h3>
              <div className="space-y-6">
                <div className="group">
                  <h4 className="text-[#4B2CA0] font-bold mb-1 group-hover:text-[#2D1B69] transition-colors duration-300">AZ-900</h4>
                  <p className="text-gray-300 group-hover:text-white transition-colors duration-300">Microsoft Azure Fundamentals</p>
                </div>
                <div className="group">
                  <h4 className="text-[#4B2CA0] font-bold mb-1 group-hover:text-[#2D1B69] transition-colors duration-300">SC-900</h4>
                  <p className="text-gray-300 group-hover:text-white transition-colors duration-300">Microsoft Security Fundamentals</p>
                </div>
                <div className="group">
                  <h4 className="text-[#4B2CA0] font-bold mb-1 group-hover:text-[#2D1B69] transition-colors duration-300">TryHackMe</h4>
                  <p className="text-gray-300 group-hover:text-white transition-colors duration-300">Junior Pentester</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
} 