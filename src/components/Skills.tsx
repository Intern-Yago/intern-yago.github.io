import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Layout, Server, Cpu } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  level: string;
  percentage: number;
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: Skill[];
}

const Skills: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<HTMLDivElement[]>([]);

  const skillCategories: SkillCategory[] = [
    {
      title: "FRONTEND ENGINEERING",
      icon: <Layout className="w-5 h-5 text-cyber-cyan" />,
      skills: [
        { name: "React.js / Next.js", level: "EXPERT", percentage: 95 },
        { name: "TypeScript", level: "EXPERT", percentage: 90 },
        { name: "Tailwind CSS / SCSS", level: "EXPERT", percentage: 95 },
        { name: "JavaScript (ES6+)", level: "EXPERT", percentage: 95 },
      ]
    },
    {
      title: "BACKEND & DATABASES",
      icon: <Server className="w-5 h-5 text-cyber-magenta" />,
      skills: [
        { name: "Python / FastAPI", level: "EXPERT", percentage: 90 },
        { name: "PostgreSQL & MySQL", level: "ADVANCED", percentage: 85 },
        { name: "Redis (Pub/Sub, Caching)", level: "ADVANCED", percentage: 80 },
        { name: "PgVector & RAG Architecture", level: "COMPETENT", percentage: 75 },
      ]
    },
    {
      title: "MOBILE & AUTOMATION",
      icon: <Cpu className="w-5 h-5 text-cyber-yellow" />,
      skills: [
        { name: "React Native / Expo", level: "EXPERT", percentage: 88 },
        { name: "Node.js (Express)", level: "EXPERT", percentage: 90 },
        { name: "Custom CLI & Scaffolding", level: "ADVANCED", percentage: 85 },
        { name: "Git & CI/CD Workflows", level: "EXPERT", percentage: 90 },
      ]
    }
  ];

  useGSAP(() => {
    // Select all bars and animate their width when scrolled into view
    barsRef.current.forEach((bar) => {
      if (!bar) return;
      const targetWidth = bar.getAttribute('data-width');
      
      gsap.fromTo(bar, 
        { width: '0%' },
        { 
          width: `${targetWidth}%`, 
          duration: 1.5, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bar,
            start: 'top 90%',
            toggleActions: 'play none none none',
          }
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section 
      id="skills" 
      ref={containerRef}
      className="min-h-screen py-24 bg-cyber-bg relative flex items-center"
    >
      {/* Decorative Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-cyber-cyan/3 rounded-full blur-[165px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        
        {/* Title Block */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <div className="flex items-center space-x-2">
            <span className="text-cyber-cyan font-mono text-xs tracking-widest">// 02. STACK_TECNOLOGICA</span>
            <span className="h-[1px] w-12 bg-cyber-cyan/30" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white uppercase leading-none">
            MEU ARSENAL DE <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-cyber-yellow glow-text-cyan">TECNOLOGIAS</span>
          </h2>
          <p className="text-gray-400 text-sm max-w-lg font-light">
            Sólida proficiência em criar soluções integradas de ponta a ponta, unindo interfaces fluidas com lógica de backend e ecossistemas orientados a dados e IA.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, idx) => (
            <div 
              key={idx}
              className="bg-cyber-card/30 backdrop-blur-sm border border-white/5 p-6 md:p-8 rounded-2xl hover:border-white/10 transition-colors duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center space-x-3 mb-8 pb-4 border-b border-white/5">
                  <div className="p-2 bg-white/5 rounded-lg border border-white/5">
                    {category.icon}
                  </div>
                  <h3 className="font-mono text-xs font-semibold text-white tracking-widest">
                    {category.title}
                  </h3>
                </div>

                {/* Skills Bars List */}
                <div className="space-y-6">
                  {category.skills.map((skill, sIdx) => {
                    const barIndex = idx * 10 + sIdx; // Ensure unique indexes for refs
                    return (
                      <div key={sIdx} className="space-y-2">
                        <div className="flex justify-between items-center text-xs font-mono">
                          <span className="text-gray-300 font-light">{skill.name}</span>
                          <span className="text-cyber-cyan glow-text-cyan text-[10px] tracking-widest font-semibold">
                            {skill.level} // {skill.percentage}%
                          </span>
                        </div>
                        
                        {/* Static Track */}
                        <div className="h-[4px] w-full bg-white/5 rounded-full overflow-hidden">
                          {/* Animated Progress Bar */}
                          <div 
                            ref={(el) => { if (el) barsRef.current[barIndex] = el; }}
                            data-width={skill.percentage}
                            className={`h-full rounded-full ${
                              idx === 0 ? 'bg-cyber-cyan' : idx === 1 ? 'bg-cyber-magenta' : 'bg-cyber-yellow'
                            }`}
                            style={{ width: '0%' }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Category Footer Log */}
              <div className="mt-8 pt-4 border-t border-white/5 font-mono text-[9px] text-gray-500 flex justify-between items-center">
                <span>MODULE: {category.title.split(' ')[0]}</span>
                <span className="text-cyber-cyan animate-pulse">OK</span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;