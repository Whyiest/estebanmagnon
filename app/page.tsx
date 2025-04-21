'use client';

import { Montserrat, Inter } from 'next/font/google';
import Link from 'next/link';
import localFont from 'next/font/local';

const montserrat = Montserrat({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });
const cutePixel = localFont({ src: '../public/fonts/CutePixel.ttf' });

export default function Home() {
  return (
    <div className={`min-h-screen ${montserrat.className}`}>
      {/* Navigation */}
      <nav className="fixed w-full p-6 z-50 bg-opacity-90 backdrop-blur-sm">
        <div className="container mx-auto flex justify-between items-center">
          <div className={`text-xl ${cutePixel.className}`}>
            <Link href="/" className="hover:text-gray-300 transition-colors">
              esteban magnon
            </Link>
          </div>
          <div className="flex gap-8">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/about" className="nav-link">About</Link>
            <Link href="/experiences" className="nav-link">Experiences</Link>
            <Link href="/projects" className="nav-link">Projects</Link>
            <Link href="/contact" className="nav-link">Contact</Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="gradient-background min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--purple-dark)_0%,_transparent_50%)] opacity-30"></div>
        
        <div className="container mx-auto px-4">
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
