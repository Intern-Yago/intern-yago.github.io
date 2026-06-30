import React from 'react';
import { Terminal } from 'lucide-react';

const TechTicker: React.FC = () => {
  const techs = [
    "JavaScript", "TypeScript", "Python", "Django", "MySQL", 
    "PostgreSQL", "React.js", "Next.js", "NestJS", "Vite", 
    "Vue.js", "Language R", "CSS3", "HTML5", "FastAPI", 
    "PgVector", "Redis", "Electron"
  ];

  // Duplicate list to make it a seamless infinite marquee
  const tickerItems = [...techs, ...techs, ...techs];

  return (
    <div className="relative w-full overflow-hidden bg-black/80 border-y border-white/10 py-6 select-none z-10 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
      {/* Subtle overlay gradients for fade edges */}
      <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-cyber-bg via-cyber-bg/50 to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-cyber-bg via-cyber-bg/50 to-transparent z-10 pointer-events-none" />

      {/* Marquee Track */}
      <div className="flex w-max items-center space-x-16 animate-marquee">
        {tickerItems.map((tech, idx) => (
          <div 
            key={idx} 
            className="flex items-center space-x-3 text-gray-300 hover:text-cyber-cyan glow-text-cyan transition-colors duration-300 font-mono text-xs md:text-sm tracking-[0.28em] uppercase font-semibold"
          >
            <Terminal className="w-4 h-4 text-cyber-cyan/60" />
            <span>{tech}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechTicker;