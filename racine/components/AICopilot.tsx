
import React, { useState, useRef, useEffect } from 'react';
import { getStreamingTutorResponse } from '../services/geminiService';
import { ChatMessage, AICopilotProps } from '../types';

const AICopilot: React.FC<AICopilotProps> = ({ activeSubject }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Neural Interface Verified. CyberTutor initialized. Architect @Dopaem credentials confirmed. Awaiting strategic management objective.' }
  ]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (forcedText?: string) => {
    const textToSend = forcedText || input;
    if (!textToSend.trim() || isStreaming) return;

    const userMsg: ChatMessage = { role: 'user', text: textToSend };
    setMessages(prev => [...prev, userMsg]);
    if (!forcedText) setInput('');
    setIsStreaming(true);

    setMessages(prev => [...prev, { role: 'model', text: '' }]);

    await getStreamingTutorResponse(
      [...messages, userMsg], 
      activeSubject || null,
      (text) => {
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: 'model', text };
          return updated;
        });
      }
    );
    
    setIsStreaming(false);
  };

  const strategyPresets = [
    { label: 'Summarize', text: 'Synthesize the key management principles of this node into a high-level summary.' },
    { label: 'Exam Prep', text: 'Analyze this subject and present 3 complex exam questions used in 3rd-year management.' },
    { label: 'Strategy Case', text: 'Draft a brief strategic case study based on this module for analysis.' }
  ];

  return (
    <div className="fixed bottom-16 right-12 z-[150]">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-20 h-20 glass-heavy border border-cyber-primary/40 rounded-3xl flex items-center justify-center text-cyber-primary shadow-[0_0_40px_rgba(0,243,255,0.2)] hover:scale-110 transition-all group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-cyber-primary/10 group-hover:bg-cyber-primary/20 transition-colors"></div>
          <svg className="w-10 h-10 animate-pulse relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </button>
      ) : (
        <div className="w-[450px] md:w-[500px] h-[700px] glass-heavy rounded-[2.5rem] border border-cyber-primary/30 flex flex-col shadow-[0_0_120px_rgba(0,0,0,1)] animate-in zoom-in-95 duration-500 overflow-hidden">
          <div className="p-8 border-b border-white/5 flex justify-between items-center bg-cyber-primary/5">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-cyber-accent animate-ping"></div>
              <div>
                <span className="font-orbitron text-[11px] tracking-[0.4em] text-cyber-primary font-black block uppercase">CyberTutor_Node</span>
                <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest">{activeSubject ? `Linked: ${activeSubject.name}` : 'Ready_for_Uplink'}</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="w-10 h-10 rounded-xl hover:bg-white/10 flex items-center justify-center transition-colors group">
               <svg className="w-5 h-5 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar bg-black/10">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[90%] px-6 py-4 rounded-2xl text-[14px] leading-relaxed transition-all ${
                  m.role === 'user' 
                    ? 'bg-cyber-secondary/20 border border-cyber-secondary/30 text-white font-medium shadow-[0_10px_30px_rgba(188,19,254,0.1)]' 
                    : 'bg-white/5 border border-white/10 text-cyber-primary/90 font-light'
                }`} style={{ borderRadius: m.role === 'user' ? '24px 24px 4px 24px' : '24px 24px 24px 4px' }}>
                  <p className="whitespace-pre-wrap">{m.text || 'Generating_Logic...'}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-8 bg-black/50 border-t border-white/5 space-y-6">
            {activeSubject && !isStreaming && messages.length < 4 && (
              <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                {strategyPresets.map((p, idx) => (
                  <button 
                    key={idx}
                    onClick={() => handleSend(p.text)}
                    className="whitespace-nowrap px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-[10px] font-orbitron font-black text-white/40 hover:text-cyber-primary hover:border-cyber-primary/40 hover:bg-cyber-primary/5 transition-all uppercase tracking-widest"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            )}

            <div className="relative">
              <input 
                autoFocus
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Query_Core_Intelligence..."
                className="w-full bg-white/5 border border-white/10 rounded-[1.25rem] pl-8 pr-16 py-5 text-[15px] focus:outline-none focus:border-cyber-primary/60 transition-all font-mono placeholder:text-white/5 uppercase tracking-tighter"
              />
              <button 
                onClick={() => handleSend()}
                disabled={isStreaming}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-cyber-primary text-cyber-bg rounded-[1rem] hover:brightness-110 disabled:opacity-50 transition-all active:scale-90 shadow-[0_0_20px_rgba(0,243,255,0.3)]"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AICopilot;
