import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Terminal } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '// HOME', href: '#home' },
    { name: '// SOBRE', href: '#about' },
    { name: '// PROJETOS', href: '#projects' },
    { name: '// SKILLS', href: '#skills' },
    { name: '// CONTATO', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-cyber-bg/80 backdrop-blur-md border-b border-white/5 py-4' 
        : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo / Name */}
        <a href="#home" className="flex items-center space-x-2 text-white font-bold text-lg tracking-wider group">
          <Terminal className="w-5 h-5 text-cyber-cyan group-hover:rotate-12 transition-transform duration-300" />
          <span className="text-white">YAGO</span>
          <span className="text-cyber-cyan">.DEV</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-400 hover:text-cyber-cyan font-medium text-sm tracking-widest transition-colors duration-300 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-cyber-cyan hover:after:w-full after:transition-all after:duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4 border-l border-white/10 pl-6">
            <a
              href="https://github.com/Intern-Yago"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyber-cyan transition-colors duration-300"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/yago-guimaraes-dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyber-cyan transition-colors duration-300"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-400 hover:text-white focus:outline-none"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-cyber-bg/95 backdrop-blur-lg border-b border-white/5 transition-all duration-300 ${
        isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}>
        <div className="px-6 py-4 space-y-4 flex flex-col">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-cyber-cyan font-medium text-sm tracking-widest py-2 transition-colors duration-300"
            >
              {link.name}
            </a>
          ))}
          <div className="flex items-center space-x-4 pt-4 border-t border-white/5">
            <a
              href="https://github.com/Intern-Yago"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyber-cyan flex items-center space-x-2"
            >
              <Github className="w-5 h-5" />
              <span className="text-xs tracking-wider">GITHUB</span>
            </a>
            <a
              href="https://www.linkedin.com/in/yago-guimaraes-dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyber-cyan flex items-center space-x-2"
            >
              <Linkedin className="w-5 h-5" />
              <span className="text-xs tracking-wider">LINKEDIN</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;