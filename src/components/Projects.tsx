import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Github, Cpu, Database, Layers, ArrowRight, ChevronDown, ChevronUp, Terminal, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  features: string[];
  github: string;
  liveUrl?: string;
  isFlagship?: boolean;
  isGitHubCTA?: boolean;
  bgImage: string;
  tintClass: string;
}

const Projects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollSectionRef = useRef<HTMLDivElement>(null);
  
  // State to manage mobile spec sheets toggling per project
  const [showSpecs, setShowSpecs] = useState<Record<string, boolean>>({});

  // Responsive desktop check
  const [isDesktop, setIsDesktop] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024;
    }
    return true;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
    };

    setIsDesktop(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleMediaChange);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  const toggleSpecs = (id: string) => {
    setShowSpecs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const projectsData: Project[] = [
    {
      id: "01",
      title: "FINORA",
      subtitle: "Silo de Inteligência Financeira e Co-Piloto Ativo IA",
      description: "Um ecossistema completo de gestão financeira nativo em IA, projetado com foco em privacidade total, proatividade e experiência omnichannel (Web, PWA e WhatsApp). Integra LLMs diretamente ao banco de dados para executar comandos e alertas inteligentes.",
      tech: ["FastAPI (Python)", "Next.js", "PgVector", "Redis", "SSE", "MinIO"],
      features: [
        "IA Omnichannel integrada via WhatsApp (Evolution API)",
        "Notificações push em tempo real e Pub/Sub via Redis",
        "Busca Semântica & Memória de IA com PgVector",
        "Módulo de Fechamento de Mês guiado com relatórios PDF auto-gerados"
      ],
      github: "https://github.com/Intern-Yago/Finora",
      isFlagship: true,
      bgImage: "/finora-bg.webp",
      tintClass: "bg-cyber-cyan"
    },
    {
      id: "02",
      title: "ATHENA AUTOMOTIVA",
      subtitle: "Plataforma E-commerce & Catálogo Digital Automotivo",
      description: "Plataforma web completa de cotação e catálogo de equipamentos automotivos de linha pesada e leve, com cruzamento inteligente de filtros dinâmicos, integração com Cloudinary CDN e painel admin com gerador de Alt Text para SEO via IA.",
      tech: ["Node.js", "PostgreSQL", "Tailwind CSS v4", "Cloudinary CDN", "Vercel", "Render"],
      features: [
        "Filtros dinâmicos estilo e-commerce com bloqueio inteligente de combinações",
        "Painel administrativo completo para controle de rascunhos e reordenação comercial",
        "Gerador de descrições acessíveis Alt Text para SEO acionado por IA",
        "Cotação automática preenchida via WhatsApp em tempo real"
      ],
      github: "https://github.com/Intern-Yago/athena",
      liveUrl: "https://www.athenaconsultoria.com.br",
      isFlagship: true,
      bgImage: "/caboclo-bg.webp",
      tintClass: "bg-cyber-magenta"
    },
    {
      id: "03",
      title: "POESIAS WEB",
      subtitle: "Rede Social Literária & Plataforma Full Stack",
      description: "Plataforma web para publicação literária e poesias autorais com sistema completo de autenticação de usuários, interações sociais em tempo real (curtidas, comentários e reposts), modelagem relacional Prisma ORM e painel administrativo.",
      tech: ["Next.js", "Prisma ORM", "NextAuth.js", "PostgreSQL", "Tailwind CSS", "Vercel"],
      features: [
        "Autenticação segura de usuários e controle de sessões via NextAuth",
        "Feed interativo com algoritmo de curtidas, comentários e reposts em tempo real",
        "Modelagem relacional e queries otimizadas com Prisma ORM e PostgreSQL",
        "Painel administrativo exclusivo para moderação e gestão de conteúdo"
      ],
      github: "https://github.com/Intern-Yago/poesias_web",
      isFlagship: true,
      bgImage: "/syri-bg.webp",
      tintClass: "bg-cyber-magenta"
    },
    {
      id: "04",
      title: "OBJECT STORAGE MANAGER",
      subtitle: "Plataforma de Gerenciamento & Otimização Multi-S3 / MinIO",
      description: "Plataforma robusta para gestão, monitoramento e otimização de múltiplos buckets S3 e MinIO. Integra backend Node.js, frontend React com Tailwind CSS, proxy reverso Nginx e orquestração completa em Docker Compose.",
      tech: ["Docker Compose", "Nginx", "MinIO / S3", "Node.js", "React"],
      features: [
        "Gerenciamento e sincronização multi-bucket S3 e MinIO local/cloud",
        "Otimização automatizada de assets e arquivos de armazenamento",
        "Arquitetura conteinerizada prontas para implantação rápida em Docker",
        "Scripts de setup automatizado e ambiente Nginx customizado"
      ],
      github: "https://github.com/Intern-Yago/object-storage-manager",
      bgImage: "/syri-bg.webp",
      tintClass: "bg-cyber-yellow"
    },
    {
      id: "05",
      title: "LANDING PAGES SUITE",
      subtitle: "Suíte Comercial de Landing Pages & Automações",
      description: "Suíte de Landing Pages de alta conversão responsivas desenvolvidas para clientes corporativos e comerciais, integradas a scripts Python de automação comercial e relatórios analíticos.",
      tech: ["React.js", "TypeScript", "Tailwind CSS", "Python Automation", "SEO / CRO"],
      features: [
        "Layouts responsivos de alta conversão (CRO) e máxima velocidade de carregamento",
        "Automação em Python para geração instantânea de propostas e relatórios em PDF",
        "Formulários dinâmicos integrados com captura direta e redirecionamento WhatsApp",
        "Arquitetura otimizada para buscadores (SEO) com Meta tags dinâmicas"
      ],
      github: "https://github.com/Intern-Yago/dentistas",
      bgImage: "/caboclo-bg.webp",
      tintClass: "bg-blue-500"
    },
    {
      id: "06",
      title: "SAVEPASSWORD",
      subtitle: "Cofre de Segurança Mobile",
      description: "Aplicativo móvel desenvolvido com foco em privacidade de ponta para armazenamento e gerenciamento de senhas locais criptografadas, focado em alta fidelidade de design (Figma UI).",
      tech: ["React Native", "TypeScript", "Expo", "Secure Store", "Figma UI"],
      features: [
        "Criptografia local robusta e armazenamento seguro em chave nativa",
        "Interface inspirada em designs modernos e responsivos do Figma",
        "Arquitetura focada em performance e consumo mínimo de bateria"
      ],
      github: "https://github.com/Intern-Yago/SAVEPASSWORD-REACTNATIVE",
      bgImage: "/savepass-bg.webp",
      tintClass: "bg-cyber-yellow"
    },
    {
      id: "CTA",
      title: "EXPLORAR MAIS",
      subtitle: "Acesso ao Repositório Completo do GitHub",
      description: "Atualmente gerencio mais de 30 repositórios públicos no meu perfil, cobrindo desde scripts utilitários de automação local a laboratórios avançados de IA e aplicações móveis robustas.",
      tech: ["Python", "TypeScript", "JavaScript", "SQL", "R Language", "Shell Script"],
      features: [],
      github: "https://github.com/Intern-Yago?tab=repositories",
      isGitHubCTA: true,
      bgImage: "/syri-bg.webp",
      tintClass: "bg-purple-500"
    }
  ];

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      const scrollSection = scrollSectionRef.current;
      if (!scrollSection) return;

      const cardsCount = projectsData.length;
      const xTranslation = -(100 * (cardsCount - 1)) / cardsCount;
      const verticalScrollLength = (cardsCount - 1) * 100;

      gsap.to(scrollSection, {
        xPercent: xTranslation,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: true,
          start: 'top top',
          end: `+=${verticalScrollLength}%`,
          invalidateOnRefresh: true,
        }
      });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-cyber-bg overflow-hidden relative">
      {/* Mobile-only Header */}
      <div className="lg:hidden max-w-7xl mx-auto px-6 pt-16 pb-4 text-center">
        <div className="flex items-center justify-center space-x-2 mb-3">
          <span className="text-cyber-cyan font-mono text-xs tracking-widest">// 02. PROJETOS</span>
          <span className="h-[1px] w-12 bg-cyber-cyan/30" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-white uppercase">
          PORTFÓLIO DE <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-cyber-magenta glow-text-cyan">PROJETOS</span>
        </h2>
        <p className="text-gray-400 text-xs font-mono mt-2">Principais trabalhos e aplicações desenvolvidas</p>
      </div>

      {/* Projects Track (Horizontal on desktop, Vertical Stack on mobile) */}
      <div 
        ref={scrollSectionRef} 
        className={isDesktop 
          ? "flex h-screen items-center will-change-transform transform-gpu" 
          : "flex flex-col space-y-12 py-8 px-4 sm:px-6 w-full h-auto"
        }
        style={isDesktop ? { width: `${projectsData.length * 100}vw` } : { width: '100%' }}
      >
        {projectsData.map((project) => (
          <section 
            key={project.id}
            className={isDesktop 
              ? "w-screen h-screen flex-shrink-0 flex items-center justify-center px-4 sm:px-6 md:px-24 relative select-none transform-gpu" 
              : "w-full h-auto flex flex-col items-center justify-center relative select-none"
            }
          >
            {/* --- GLOBAL DYNAMIC BACKGROUND --- */}
            <div 
              className="absolute inset-0 bg-cover bg-center z-0 rounded-3xl lg:rounded-none overflow-hidden"
              style={{ backgroundImage: `url(${project.bgImage})` }}
            >
              <div className="absolute inset-0 bg-cyber-bg/90" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,10,12,0.95)_100%)]" />
            </div>

            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-center bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />
            
            {/* Special Render for GitHub Call-to-Action slide */}
            {project.isGitHubCTA ? (
              <div className="relative z-10 max-w-4xl w-full bg-[#07070a]/95 border border-cyber-cyan/30 p-6 sm:p-8 md:p-12 rounded-3xl text-center shadow-neon-cyan flex flex-col items-center justify-center space-y-6 lg:max-h-[85vh]">
                <div className="p-4 bg-cyber-cyan/10 border border-cyber-cyan/20 rounded-full animate-pulse">
                  <Github className="w-10 h-10 md:w-12 md:h-12 text-cyber-cyan" />
                </div>
                
                <div>
                  <span className="text-cyber-magenta font-mono text-xs tracking-[0.25em] uppercase block mb-2">// CONEXÃO_EXTERNA</span>
                  <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-cyber-cyan font-mono text-xs md:text-sm tracking-wide mt-1">
                    {project.subtitle}
                  </p>
                </div>

                <p className="text-gray-400 font-light text-xs md:text-base max-w-2xl leading-relaxed">
                  {project.description} No meu GitHub, você encontrará projetos adicionais focados em engenharia de dados, algoritmos robustos, desafios de CSS e frameworks modernos.
                </p>

                <div className="font-mono text-[10px] text-gray-600 bg-black/40 border border-white/5 px-4 py-2 rounded-lg">
                  $ curl -s api.github.com/users/Intern-Yago/repos | grep name
                </div>

                <a 
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group overflow-hidden px-8 py-4 bg-cyber-cyan text-black font-bold tracking-widest text-xs uppercase rounded-xl hover:shadow-neon-cyan transition-all duration-300 flex items-center space-x-2"
                >
                  <Terminal className="w-4 h-4" />
                  <span>ACESSAR REPOSITÓRIOS</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ) : (
              /* Traditional Project Card Grid */
              <div className="relative z-10 max-w-6xl w-full bg-[#0b0b0e]/95 border border-white/10 p-5 sm:p-6 md:p-12 rounded-3xl grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 hover:border-white/20 transition-colors duration-300 lg:max-h-[85vh] shadow-2xl">
                
                {/* Left Column: Number, Title, Description, Tech */}
                <div className="lg:col-span-7 flex flex-col justify-between space-y-4 md:space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <span className="text-cyber-magenta font-mono text-[10px] md:text-xs tracking-widest">// PROJETO_{project.id}</span>
                        {project.isFlagship && (
                          <span className="bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan px-2 py-0.5 rounded text-[8px] md:text-[10px] font-mono tracking-widest flex items-center">
                            <Cpu className="w-3 h-3 mr-1 animate-pulse" /> FLAGSHIP_AI
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-cyber-cyan font-mono text-xs md:text-sm tracking-wide mt-1 drop-shadow-md">
                      {project.subtitle}
                    </p>
                    
                    <p className="text-gray-300 font-light text-xs md:text-base leading-relaxed mt-4 md:mt-6">
                      {project.description}
                    </p>
                  </div>

                  {/* Mobile SPEC Toggler */}
                  <button
                    onClick={() => toggleSpecs(project.id)}
                    className="lg:hidden flex items-center justify-between w-full mt-2 bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-xl text-[10px] font-mono text-cyber-cyan hover:bg-cyber-cyan/20 transition-all duration-300"
                  >
                    <span className="flex items-center space-x-2">
                      <Database className="w-3.5 h-3.5" />
                      <span>{showSpecs[project.id] ? 'OCULTAR ESPECIFICAÇÕES' : 'VER ESPECIFICAÇÕES'}</span>
                    </span>
                    {showSpecs[project.id] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 md:gap-2 pt-2">
                    {project.tech.map((t, idx) => (
                      <span 
                        key={idx} 
                        className="bg-[#121218]/90 border border-white/10 hover:border-cyber-cyan/50 text-gray-200 px-2.5 py-0.5 md:py-1 rounded text-[10px] md:text-xs font-mono transition-colors duration-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-4 border-t border-white/10">
                    <a 
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-white hover:text-cyber-cyan font-mono text-[10px] md:text-xs tracking-widest transition-colors duration-300 group/link"
                    >
                      <Github className="w-4 h-4 group-hover/link:scale-110 transition-transform duration-300" />
                      <span>GITHUB_REPO</span>
                    </a>
                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-cyber-cyan glow-text-cyan hover:text-white font-mono text-[10px] md:text-xs tracking-widest transition-colors duration-300 group/link"
                      >
                        <ExternalLink className="w-4 h-4 group-hover/link:scale-110 transition-transform duration-300" />
                        <span>VISITAR_SITE</span>
                      </a>
                    )}
                    {project.isFlagship && !project.liveUrl && (
                      <a 
                        href="#contact"
                        className="flex items-center space-x-2 text-cyber-cyan glow-text-cyan font-mono text-[10px] md:text-xs tracking-widest animate-pulse"
                      >
                        <Layers className="w-4 h-4" />
                        <span>SOLICITAR_DEMO</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Right Column: Key Features List */}
                <div className={`lg:col-span-5 flex flex-col justify-center bg-[#121218]/90 border border-white/5 p-5 md:p-8 rounded-2xl overflow-hidden transition-all duration-300 ${
                  showSpecs[project.id] ? 'block mt-4 lg:mt-0' : 'hidden lg:flex'
                }`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-magenta/10 rounded-full blur-2xl pointer-events-none" />
                  
                  <h4 className="text-[10px] md:text-xs font-mono text-cyber-cyan tracking-widest mb-4 md:mb-6 flex items-center">
                    <Database className="w-4 h-4 mr-2" /> SPEC_SHEET // FUNCIONALIDADES:
                  </h4>
                  
                  <ul className="space-y-3 md:space-y-4 relative z-10">
                    {project.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-2.5 md:space-x-3 text-xs md:text-sm text-gray-300 font-light leading-relaxed">
                        <span className="text-cyber-magenta mt-1 flex-shrink-0">
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {project.isFlagship && (
                    <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-white/10 font-mono text-[9px] md:text-[10px] text-gray-400 flex justify-between items-center relative z-10">
                      <span>ARCH: SILO-BASED RAG</span>
                      <span className="text-cyber-cyan glow-text-cyan">CONNECTED // ONLINE</span>
                    </div>
                  )}
                </div>

              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
};

export default Projects;