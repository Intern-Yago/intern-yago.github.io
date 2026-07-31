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
      bgImage: "/finora-bg.png",
      tintClass: "bg-cyber-cyan"
    },
    {
      id: "02",
      title: "SYRI_CLI",
      subtitle: "Gerenciador e Automatizador de Arquivos Customizado",
      description: "Uma CLI robusta desenvolvida para acelerar e automatizar a inicialização de projetos e a criação de boilerplate de arquivos, garantindo conformidade com os padrões arquiteturais estabelecidos.",
      tech: ["JavaScript", "EJS", "Node.js", "CLI Tools"],
      features: [
        "Scaffolding rápido de componentes e serviços",
        "Geração de código baseada em templates dinâmicos EJS",
        "Melhoria drástica na velocidade de desenvolvimento local"
      ],
      github: "https://github.com/Intern-Yago/SYRIUS_CLI",
      bgImage: "/syri-bg.png",
      tintClass: "bg-cyber-magenta"
    },
    {
      id: "03",
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
      bgImage: "/savepass-bg.png",
      tintClass: "bg-cyber-yellow"
    },
    {
      id: "04",
      title: "WHITE FEATHER ADMIN",
      subtitle: "Gerenciador e Painel de Triagem Administrativa",
      description: "Sistema web customizado para agendamentos e triagem, permitindo o gerenciamento e monitoramento ativo de fluxos administrativos internos com alta responsividade.",
      tech: ["JavaScript", "HTML5", "SCSS", "Dashboard Logic"],
      features: [
        "Painel administrativo em tempo real para controle de filas de atendimento",
        "Layout customizado em SCSS focado em usabilidade e design fluído",
        "Módulo de agendamentos rápidos e logs de histórico administrativo"
      ],
      github: "https://github.com/Intern-Yago/WHITE-FEATHER-ADMIN",
      bgImage: "/caboclo-bg.png",
      tintClass: "bg-blue-500"
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
      bgImage: "/syri-bg.png",
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
          scrub: 1,
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
          ? "flex h-screen items-center" 
          : "flex flex-col space-y-12 py-8 px-4 sm:px-6 w-full h-auto"
        }
        style={isDesktop ? { width: `${projectsData.length * 100}vw` } : { width: '100%' }}
      >
        {projectsData.map((project) => (
          <section 
            key={project.id}
            className={isDesktop 
              ? "w-screen h-screen flex-shrink-0 flex items-center justify-center px-4 sm:px-6 md:px-24 relative select-none" 
              : "w-full h-auto flex flex-col items-center justify-center relative select-none"
            }
          >
            {/* --- GLOBAL DYNAMIC BACKGROUND --- */}
            <div 
              className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-[20s] linear animate-[pulse_40s_infinite] rounded-3xl lg:rounded-none overflow-hidden"
              style={{ backgroundImage: `url(${project.bgImage})` }}
            >
              <div className="absolute inset-0 bg-cyber-bg/85 backdrop-blur-[2px]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,10,12,0.95)_100%)]" />
            </div>

            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-center bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />
            
            {/* Special Render for GitHub Call-to-Action slide */}
            {project.isGitHubCTA ? (
              <div className="relative z-10 max-w-4xl w-full bg-[#07070a]/90 backdrop-blur-2xl border border-cyber-cyan/30 p-6 sm:p-8 md:p-12 rounded-3xl text-center shadow-neon-cyan flex flex-col items-center justify-center space-y-6 lg:max-h-[85vh]">
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
              <div className="relative z-10 max-w-6xl w-full bg-[#0b0b0e]/90 backdrop-blur-2xl border border-white/10 p-5 sm:p-6 md:p-12 rounded-3xl grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 hover:border-white/20 transition-colors duration-300 lg:max-h-[85vh] shadow-2xl">
                
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
                        className="bg-black/50 backdrop-blur-md border border-white/10 hover:border-cyber-cyan/50 text-gray-200 px-2.5 py-0.5 md:py-1 rounded text-[10px] md:text-xs font-mono transition-colors duration-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center space-x-6 pt-4 border-t border-white/10">
                    <a 
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-white hover:text-cyber-cyan font-mono text-[10px] md:text-xs tracking-widest transition-colors duration-300 group/link"
                    >
                      <Github className="w-4 h-4 group-hover/link:scale-110 transition-transform duration-300" />
                      <span>GITHUB_REPO</span>
                    </a>
                    {project.isFlagship && (
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
                <div className={`lg:col-span-5 flex flex-col justify-center bg-black/60 backdrop-blur-md border border-white/5 p-5 md:p-8 rounded-2xl overflow-hidden transition-all duration-300 ${
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