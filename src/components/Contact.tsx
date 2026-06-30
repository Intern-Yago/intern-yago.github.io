import React, { useState, useRef, useEffect } from 'react';
import { Mail, Github, Linkedin, MapPin, Send, AlertCircle } from 'lucide-react';

interface TerminalLine {
  text: string;
  type: 'system' | 'prompt' | 'input' | 'error' | 'success';
}

const Contact: React.FC = () => {
  const [step, setStep] = useState<'idle' | 'name' | 'email' | 'message' | 'sending' | 'done'>('idle');
  const [inputVal, setInputVal] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msgLines, setMsgLines] = useState<string[]>([]);
  const [terminalHistory, setTerminalLines] = useState<TerminalLine[]>([
    { text: 'SYSTEM: PORT_OPEN // SECURE_SHELL_v2.0_ESTABLISHED', type: 'system' },
    { text: 'Para enviar uma mensagem direta, inicialize o script de contato.', type: 'system' },
    { text: 'Digite "iniciar" ou clique no botão abaixo para começar.', type: 'system' },
  ]);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to terminal bottom
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalHistory]);

  const addLine = (text: string, type: TerminalLine['type']) => {
    setTerminalLines((prev) => [...prev, { text, type }]);
  };

  const startTerminal = () => {
    setStep('name');
    setInputVal('');
    setTerminalLines([
      { text: 'SYSTEM: PORT_OPEN // SECURE_SHELL_v2.0_ESTABLISHED', type: 'system' },
      { text: '$ sh init_contact_form.sh', type: 'prompt' },
      { text: 'INIT: Carregando módulo de contato...', type: 'system' },
      { text: '>> Como posso chamar você? (Digite seu nome):', type: 'system' },
    ]);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const currentInput = inputVal.trim();
    addLine(`> ${currentInput}`, 'input');
    setInputVal('');

    if (step === 'idle') {
      if (currentInput.toLowerCase() === 'iniciar' || currentInput.toLowerCase() === 'init') {
        startTerminal();
      } else {
        addLine(`sh: comando não reconhecido: "${currentInput}". Tente digitar "iniciar".`, 'error');
      }
      return;
    }

    if (step === 'name') {
      setName(currentInput);
      addLine(`SYSTEM: Nome salvo como "${currentInput}".`, 'system');
      addLine('>> Qual é o seu e-mail para contato?:', 'system');
      setStep('email');
    } else if (step === 'email') {
      // Basic email validation regex
      if (!/\S+@\S+\.\S+/.test(currentInput)) {
        addLine('ERROR: Endereço de e-mail inválido. Por favor, tente novamente.', 'error');
        addLine('>> Qual é o seu e-mail para contato?:', 'system');
        return;
      }
      setEmail(currentInput);
      addLine(`SYSTEM: E-mail definido como "${currentInput}".`, 'system');
      addLine('>> Digite a sua mensagem (pressione Enter para finalizar):', 'system');
      setStep('message');
    } else if (step === 'message') {
      const messageText = currentInput;
      addLine('SYSTEM: Mensagem capturada. Preparando pacote de dados...', 'system');
      setStep('sending');

      // Simulate sending animation
      setTimeout(() => {
        addLine('CONECTANDO: api.yago.dev/v1/contact... OK', 'system');
      }, 500);

      setTimeout(() => {
        addLine('ENVIANDO: [Header: encrypted_payload]... OK', 'system');
      }, 1200);

      setTimeout(() => {
        addLine('SUCCESS: Mensagem enviada com sucesso! Obrigado pelo contato.', 'success');
        addLine(`LOG: [Para: Yago] - [De: ${name} <${email}>]`, 'system');
        addLine(`MSG_PREVIEW: "${messageText}"`, 'system');
        setStep('done');
      }, 2500);
    }
  };

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  return (
    <section 
      id="contact" 
      className="min-h-screen py-24 bg-cyber-bg relative flex items-center"
    >
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Side: Traditional Details */}
        <div className="lg:col-span-5 flex flex-col space-y-8">
          <div className="flex items-center space-x-2">
            <span className="text-cyber-cyan font-mono text-xs tracking-widest">// 03. CONTATO</span>
            <span className="h-[1px] w-12 bg-cyber-cyan/30" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white uppercase leading-none">
            VAMOS CONSTRUIR <br />ALGO <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-cyber-magenta glow-text-cyan">INCRÍVEL JUNTOS</span>
          </h2>
          
          <p className="text-gray-400 font-light leading-relaxed">
            Seja para discutir uma oportunidade de contratação Full Stack, integrar inteligência artificial ativa no seu negócio, ou simplesmente trocar ideias sobre arquitetura de dados e APIs: minha caixa de entrada está sempre aberta para novas conexões tecnológicas.
          </p>

          <div className="space-y-4 pt-4">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/5 border border-white/5 rounded-lg text-cyber-cyan">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">E-MAIL DIRETO</p>
                <a href="mailto:yagodev.com@gmail.com" className="text-sm font-medium text-white hover:text-cyber-cyan transition-colors duration-300">
                  yagodev.com@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/5 border border-white/5 rounded-lg text-cyber-magenta">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">LOCALIZAÇÃO</p>
                <p className="text-sm font-medium text-white">Brasil // Disponível para atuação Global (Remoto)</p>
              </div>
            </div>
          </div>

          {/* Social icons */}
          <div className="flex items-center space-x-4 pt-6 border-t border-white/5">
            <a 
              href="https://github.com/Intern-Yago" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:text-cyber-cyan hover:border-cyber-cyan hover:shadow-neon-cyan transition-all duration-300"
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:text-cyber-cyan hover:border-cyber-cyan hover:shadow-neon-cyan transition-all duration-300"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Right Side: Interactive Sci-Fi Bash Terminal */}
        <div className="lg:col-span-7">
          <div 
            onClick={handleTerminalClick}
            className="w-full h-96 sm:h-[400px] bg-[#050508] border border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col cursor-text group hover:border-cyber-cyan/30 transition-all duration-300 relative"
          >
            {/* Terminal Header */}
            <div className="bg-[#0b0b10] border-b border-white/5 px-4 py-3 flex items-center justify-between select-none">
              <div className="flex items-center space-x-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
              </div>
              <span className="text-[10px] font-mono text-gray-500 tracking-wider">guest@yago.dev: ~/contact_agent</span>
              <div className="w-8" />
            </div>

            {/* Terminal Body Screen */}
            <div className="flex-1 p-6 font-mono text-xs overflow-y-auto space-y-3 flex flex-col">
              
              {/* Render History lines */}
              {terminalHistory.map((line, idx) => (
                <div 
                  key={idx} 
                  className={`leading-relaxed whitespace-pre-wrap ${
                    line.type === 'system' ? 'text-gray-400' :
                    line.type === 'prompt' ? 'text-cyber-yellow' :
                    line.type === 'input' ? 'text-cyber-cyan' :
                    line.type === 'error' ? 'text-red-500 flex items-center' :
                    'text-green-500 font-bold glow-text-cyan'
                  }`}
                >
                  {line.type === 'error' && <AlertCircle className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" />}
                  {line.text}
                </div>
              ))}

              {/* Loader during sending */}
              {step === 'sending' && (
                <div className="flex items-center space-x-2 text-cyber-cyan">
                  <span className="animate-spin h-3.5 w-3.5 border-2 border-t-transparent border-cyber-cyan rounded-full" />
                  <span>TRANSMITINDO DADOS...</span>
                </div>
              )}

              {/* Anchor for Auto Scroll */}
              <div ref={terminalEndRef} />
            </div>

            {/* Live Input Field (Footer of terminal) */}
            <form 
              onSubmit={handleInputSubmit}
              className="bg-[#030305] border-t border-white/5 px-6 py-4 flex items-center space-x-2"
            >
              <span className="text-cyber-yellow font-mono text-xs select-none">
                {step === 'idle' ? 'guest@yago.dev:~$ ' : '>> '}
              </span>
              
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                disabled={step === 'sending' || step === 'done'}
                placeholder={
                  step === 'idle' ? 'Digite "iniciar" para começar...' :
                  step === 'name' ? 'Digite seu nome...' :
                  step === 'email' ? 'Digite seu e-mail...' :
                  step === 'message' ? 'Digite sua mensagem e pressione Enter...' :
                  'Conexão finalizada.'
                }
                className="flex-1 bg-transparent border-none outline-none text-white font-mono text-xs focus:ring-0 placeholder-gray-600 disabled:opacity-50"
              />
              
              {(step !== 'sending' && step !== 'done') && (
                <button 
                  type="submit"
                  className="text-gray-500 hover:text-cyber-cyan transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              )}
            </form>

            {/* Idle Init trigger button */}
            {step === 'idle' && (
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center pointer-events-auto">
                <button
                  onClick={startTerminal}
                  className="px-6 py-3 bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan hover:shadow-neon-cyan font-mono text-xs font-bold tracking-widest rounded-lg transition-all duration-300 flex items-center space-x-2 group"
                >
                  <span>SH RUN_CONTACT_AGENT</span>
                  <Send className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;