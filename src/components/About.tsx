import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Cpu, Database, Server, Smartphone, Terminal, ShieldAlert } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageFrameRef = useRef<HTMLDivElement>(null);

  // States for the cinematic photo decrypting animation
  const [loadProgress, setLoadProgress] = useState(0);
  const [isDecrypted, setIsDecrypted] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);

  useGSAP(() => {
    // Text blocks revealing sequentially
    gsap.fromTo(
      textRef.current?.children || [],
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    // Glowing Image Frame sliding in and lighting up
    gsap.fromTo(
      imageFrameRef.current,
      { scale: 0.9, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: imageFrameRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
          onEnter: () => {
            // Trigger decryption countdown only once
            if (animationStarted) return;
            setAnimationStarted(true);

            const interval = setInterval(() => {
              setLoadProgress((prev) => {
                const increment = Math.floor(Math.random() * 6) + 4; // Ticks up randomly
                if (prev + increment >= 100) {
                  clearInterval(interval);
                  setTimeout(() => {
                    setIsDecrypted(true);
                  }, 800); // 800ms cyberpunk glitch freeze at 100% before fade in
                  return 100;
                }
                return prev + increment;
              });
            }, 100);
          }
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="min-h-screen py-24 bg-cyber-bg relative flex items-center"
    >
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Side: Biography */}
        <div ref={textRef} className="lg:col-span-7 flex flex-col space-y-6">
          <div className="flex items-center space-x-2">
            <span className="text-cyber-cyan font-mono text-xs tracking-widest">// 01. SOBRE_MIM</span>
            <span className="h-[1px] w-12 bg-cyber-cyan/30" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white uppercase leading-none">
            TRANSFORMANDO LÓGICA <br />EM <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-cyber-magenta glow-text-cyan">SISTEMAS INTELIGENTES</span>
          </h2>
          
          <p className="text-gray-400 font-light leading-relaxed">
            Olá, eu sou o <strong className="text-white font-semibold">Yago</strong>. Desenvolvedor Full Stack apaixonado por arquiteturas complexas, automação e Inteligência Artificial. Minha abordagem de engenharia foca em projetar e escalar sistemas que não apenas resolvem problemas, mas antecipam necessidades.
          </p>

          <p className="text-gray-400 font-light leading-relaxed">
            Com sólida experiência em stacks modernas baseadas em <strong className="text-cyber-cyan">TypeScript/JavaScript</strong> e <strong className="text-cyber-magenta">Python</strong>, atuo no ciclo completo de software: do design de interfaces responsivas e aplicações móveis de alta fidelidade (<strong className="text-white font-medium">React Native</strong>) ao provisionamento de servidores backend robustos, bancos de dados relacionais e tecnologias emergentes de IA como bancos vetoriais (<strong className="text-cyber-cyan">PgVector</strong>) e integração de Large Language Models (LLMs) com infraestrutura RAG.
          </p>

          {/* Quick Specialties Bullet Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="flex items-center space-x-3 bg-white/5 border border-white/5 p-3 rounded-lg hover:border-cyber-cyan/30 transition-all duration-300">
              <Server className="w-5 h-5 text-cyber-cyan" />
              <span className="text-xs font-mono text-gray-300 tracking-wider">APIs & Backend (FastAPI/Node)</span>
            </div>
            <div className="flex items-center space-x-3 bg-white/5 border border-white/5 p-3 rounded-lg hover:border-cyber-magenta/30 transition-all duration-300">
              <Database className="w-5 h-5 text-cyber-magenta" />
              <span className="text-xs font-mono text-gray-300 tracking-wider">Data Silos & Vector DBs (RAG)</span>
            </div>
            <div className="flex items-center space-x-3 bg-white/5 border border-white/5 p-3 rounded-lg hover:border-cyber-cyan/30 transition-all duration-300">
              <Cpu className="w-5 h-5 text-cyber-cyan" />
              <span className="text-xs font-mono text-gray-300 tracking-wider">IA Ativa & Copilotos Autónomos</span>
            </div>
            <div className="flex items-center space-x-3 bg-white/5 border border-white/5 p-3 rounded-lg hover:border-cyber-magenta/30 transition-all duration-300">
              <Smartphone className="w-5 h-5 text-cyber-magenta" />
              <span className="text-xs font-mono text-gray-300 tracking-wider">Mobile Experience (PWA/Native)</span>
            </div>
          </div>
        </div>

        {/* Right Side: High-Tech ENLARGED Scanning Image Frame */}
        <div className="lg:col-span-5 flex justify-center">
          <div 
            ref={imageFrameRef}
            className="relative w-80 h-[480px] sm:w-[350px] sm:h-[500px] md:w-[400px] md:h-[540px] bg-cyber-card border border-white/10 rounded-3xl overflow-hidden shadow-2xl group transition-all duration-500 hover:border-cyber-cyan/20"
          >
            {/* 1. Actual User Photo (Renders after Decryption completes) */}
            <div className={`absolute inset-0 z-0 transition-all duration-700 ease-out ${
              isDecrypted ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-95 blur-md'
            }`}>
              <img 
                src="/perfil.png" 
                alt="Yago" 
                className="absolute inset-1.5 w-[calc(100%-12px)] h-[calc(100%-12px)] object-cover rounded-2xl opacity-75 group-hover:opacity-95 transition-opacity duration-300"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              
              {/* Corner Decorative Tech Bracket Borders */}
              <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-cyber-cyan z-20" />
              <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-cyber-cyan z-20" />
              <div className="absolute bottom-4 left-4 w-5 h-5 border-b-2 border-l-2 border-cyber-magenta z-20" />
              <div className="absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 border-cyber-magenta z-20" />

              {/* Glowing HUD Scanline Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-cyan/25 to-transparent w-full h-1/2 -translate-y-full group-hover:animate-[scan_3.5s_infinite] pointer-events-none z-10" />

              {/* Simulated Grid / Target Reticle Overlay */}
              <div className="absolute inset-0 bg-center bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none z-10" />

              {/* Active HUD Stats Overlay */}
              <div className="absolute bottom-6 left-6 right-6 z-20 bg-black/85 backdrop-blur-md border border-white/5 p-4 rounded-xl font-mono text-[9px] text-gray-400 space-y-1 select-none pointer-events-none">
                <div className="flex justify-between text-cyber-cyan font-bold">
                  <span>// DETECTED_USER_ENG:</span>
                  <span className="animate-pulse">ONLINE</span>
                </div>
                <p>ID: INTERN_YAGO_STABLE</p>
                <p>LOC: LATAM_BR_REMOTE</p>
                <p>SYS: FULL_STACK_AI_V2</p>
              </div>
            </div>

            {/* 2. Cyberpunk Decrypting Loader Terminal (Visible before/during decryption) */}
            <div className={`absolute inset-4 bg-black/60 rounded-2xl flex flex-col items-center justify-center p-6 text-center select-none border border-white/5 transition-all duration-700 ${
              isDecrypted ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100 z-10'
            }`}>
              {/* Spinning Loader Background Icon */}
              <Cpu className={`w-14 h-16 text-cyber-cyan/30 mb-4 ${isDecrypted ? '' : 'animate-spin-slow'}`} />
              
              {/* Floating tech readouts */}
              <div className="font-mono text-[9px] text-gray-500 w-full space-y-1 mb-4">
                <p className="text-cyber-cyan/60">// DECRYPT_AVATAR_PAYLOAD.SH</p>
                <p>SYS_VER: 2.0.26_STABLE</p>
                <p>SYS_DECRYPT: AES_256_GCM</p>
                <p>HASH_MD5: 5b7d90f2_YAGO</p>
              </div>

              {/* Progress Tracking Loading Bar */}
              <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden border border-white/5 mb-3 relative">
                <div 
                  className="bg-gradient-to-r from-cyber-cyan to-cyber-magenta h-full transition-all duration-200 ease-out" 
                  style={{ width: `${loadProgress}%` }}
                />
              </div>

              {/* Loader readout */}
              <div className="font-mono text-xs text-cyber-cyan glow-text-cyan flex items-center justify-center space-x-1.5 animate-pulse">
                <Terminal className="w-3.5 h-3.5" />
                <span>PROGRESSO: {loadProgress}%</span>
              </div>
              
              {loadProgress === 100 && (
                <span className="text-[8px] font-mono text-cyber-magenta animate-pulse block mt-2">
                  // FINALIZANDO_TRANSCODER...
                </span>
              )}
            </div>

            {/* Glow boundary effect on hover */}
            <div className="absolute inset-0 border border-cyber-cyan/0 rounded-3xl group-hover:border-cyber-cyan/30 group-hover:shadow-neon-cyan transition-all duration-300 pointer-events-none z-30" />
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;