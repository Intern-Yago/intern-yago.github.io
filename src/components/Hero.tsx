import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Background Canvas Particles (Lightweight & High Performance)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
    }> = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initParticles = () => {
      particles = [];
      const count = Math.min(Math.floor(window.innerWidth / 15), 80);
      for (let i = 0; i < count; i++) {
        const isCyan = Math.random() > 0.5;
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.4,
          speedY: (Math.random() - 0.5) * 0.4,
          color: isCyan ? 'rgba(0, 240, 255, 0.3)' : 'rgba(255, 0, 127, 0.2)',
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Update positions
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around boundaries
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });

      // Subtle lines connecting close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.strokeStyle = `rgba(0, 240, 255, ${0.05 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    initParticles();
    drawParticles();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // GSAP Entrance Animations
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.fromTo(titleRef.current, 
      { y: 100, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out' }
    );

    tl.fromTo(subtitleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      '-=0.8'
    );

    tl.fromTo(descRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1 },
      '-=0.4'
    );

    tl.fromTo(btnRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' },
      '-=0.6'
    );
  }, { scope: containerRef });

  return (
    <section 
      id="home" 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cyber-bg cyber-grid"
    >
      {/* Dynamic Background Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Floating Glowing Aura */}
      <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-cyber-cyan/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-cyber-magenta/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
        {/* Terminal Tag */}
        <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full mb-6">
          <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-pulse" />
          <span className="text-xs text-gray-400 font-mono tracking-widest uppercase">system.ready()</span>
        </div>

        {/* Main Name */}
        <h1 
          ref={titleRef}
          className="text-6xl md:text-9xl font-extrabold tracking-tighter text-white uppercase select-none leading-none mb-4"
        >
          YAGO<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-cyber-magenta glow-text-cyan font-light">_</span>
        </h1>

        {/* Full-Stack Subtitle */}
        <p 
          ref={subtitleRef}
          className="text-lg md:text-2xl tracking-[0.3em] font-semibold text-gray-300 uppercase mb-6"
        >
          Full Stack & <span className="text-cyber-cyan glow-text-cyan">AI Engineer</span>
        </p>

        {/* Tech Intro Description */}
        <p 
          ref={descRef}
          className="text-gray-400 text-sm md:text-base max-w-xl font-light leading-relaxed mb-10 text-center"
        >
          Desenvolvedor especializado em ecossistemas de alta performance, APIs escaláveis e soluções inteligentes integradas à Inteligência Artificial (RAG/LLMs).
        </p>

        {/* Call to Actions */}
        <div ref={btnRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href="#projects" 
            className="w-full sm:w-auto relative group overflow-hidden px-8 py-3.5 bg-transparent border border-cyber-cyan rounded-lg text-cyber-cyan font-bold tracking-widest text-xs uppercase hover:shadow-neon-cyan transition-all duration-300"
          >
            <span className="absolute inset-0 bg-cyber-cyan translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-[-1]" />
            <span className="group-hover:text-black transition-colors duration-300">EXPLORAR PROJETOS</span>
          </a>
          <a 
            href="#contact" 
            className="w-full sm:w-auto px-8 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white font-bold tracking-widest text-xs uppercase transition-all duration-300"
          >
            ENTRAR EM CONTATO
          </a>
        </div>
      </div>

      {/* Cinematic scroll down prompt */}
      <div className="absolute bottom-10 left-0 w-full z-10 flex flex-col items-center pointer-events-none opacity-50">
        <div className="flex flex-col items-center space-y-2 animate-bounce">
          <span className="text-[10px] tracking-[0.4em] font-mono text-gray-500 uppercase">SCROLL</span>
          <ArrowDown className="w-4 h-4 text-cyber-cyan" />
        </div>
      </div>
    </section>
  );
};

export default Hero;