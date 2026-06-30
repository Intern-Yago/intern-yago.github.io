import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechTicker from './components/TechTicker';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-cyber-bg text-gray-300 antialiased overflow-x-hidden">
      {/* HUD Scanner lines/background noise (Cinematic details) */}
      <div className="fixed inset-0 z-[100] pointer-events-none border-[12px] border-cyber-bg" />
      
      {/* Navigation */}
      <Navbar />

      {/* Main Content Modules */}
      <main>
        {/* Section HOME */}
        <section id="home">
          <Hero />
        </section>

        {/* Infinite Tech Marquee Line */}
        <TechTicker />

        {/* Section ABOUT */}
        <section id="about">
          <About />
        </section>

        {/* Section PROJECTS (includes pin and horizontal scroll) */}
        <section id="projects">
          <Projects />
        </section>

        {/* Section SKILLS */}
        <section id="skills">
          <Skills />
        </section>

        {/* Section CONTACT */}
        <section id="contact">
          <Contact />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black/80 border-t border-white/5 py-12 px-6 font-mono text-xs text-center select-none relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-gray-500">
            <span>© {new Date().getFullYear()} // YAGO.DEV // TODOS OS DIREITOS RESERVADOS</span>
          </div>
          <div className="flex items-center space-x-2 text-cyber-cyan">
            <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-ping" />
            <span className="text-[10px] tracking-widest uppercase">LATENCY: 14MS // ALL_SYSTEMS_OPERATIONAL</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;