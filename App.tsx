
import React, { useState, useMemo, useEffect } from 'react';
import { SUBJECTS, DOCUMENTS } from './constants';
import { Subject, Document } from './types';
import AICopilot from './components/AICopilot';
import PDFViewer from './components/PDFViewer';

const App: React.FC = () => {
  const [booting, setBooting] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [viewerUrl, setViewerUrl] = useState<string | null>(null);
  
  // Productivity Stats
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60);
  const [timerActive, setTimerActive] = useState(false);
  const [tasks, setTasks] = useState<{id: number, text: string, done: boolean}[]>([
    { id: 1, text: 'Review PM: Nefissa Ch 1-3', done: false },
    { id: 2, text: 'Analyze TO: KBHM Summary', done: true },
    { id: 3, text: 'Prepare RSE Case Study', done: false }
  ]);

  useEffect(() => {
    const timer = setTimeout(() => setBooting(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let interval: any;
    if (timerActive && pomodoroTime > 0) {
      interval = setInterval(() => setPomodoroTime(t => t - 1), 1000);
    } else if (pomodoroTime === 0) {
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, pomodoroTime]);

  const categories = useMemo(() => ['All', ...Array.from(new Set(SUBJECTS.map(s => s.category)))], []);

  const filteredSubjects = useMemo(() => 
    SUBJECTS.filter(s => {
      const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'All' || s.category === activeCategory;
      return matchesSearch && matchesCategory;
    }),
  [searchTerm, activeCategory]);

  const masteryProgress = useMemo(() => {
    const done = tasks.filter(t => t.done).length;
    return Math.round((done / tasks.length) * 100);
  }, [tasks]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleLogin = () => {
    if (password.toLowerCase() === 'dopaemin') {
      setIsAuthenticated(true);
    } else {
      setLoginError(true);
      setTimeout(() => setLoginError(false), 500);
    }
  };

  const renderBoot = () => (
    <div className="fixed inset-0 z-[250] bg-cyber-bg flex flex-col items-center justify-center font-mono overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-cyber-primary rounded-full animate-spin-slow"></div>
      </div>
      <div className="w-full max-w-sm space-y-6 relative z-10 p-10 glass-heavy rounded-2xl border-cyber-primary/40">
        <div className="flex justify-between items-end">
          <div className="text-cyber-primary text-[10px] font-orbitron tracking-[0.5em] uppercase">ISGS_MGMT_SYSTEM</div>
          <div className="text-[9px] text-white/30">V.2025.06</div>
        </div>
        <div className="w-full bg-white/5 h-[1px] relative overflow-hidden">
          <div className="absolute inset-0 bg-cyber-primary animate-[shimmer_2s_infinite]"></div>
        </div>
        <div className="space-y-2 text-[9px] font-mono text-cyber-text/60">
          <div className="flex justify-between uppercase"><span>Cohort...</span><span className="text-cyber-accent">3EME_ISGS</span></div>
          <div className="flex justify-between uppercase"><span>Session...</span><span className="text-cyber-accent">2025-2026</span></div>
          <div className="flex justify-between uppercase"><span>Architect...</span><span className="text-cyber-primary">@DOPAEM</span></div>
        </div>
      </div>
      <div className="mt-8 text-[8px] font-orbitron tracking-[0.8em] text-white/30 uppercase animate-pulse">Initializing Neural Link...</div>
    </div>
  );

  const renderLogin = () => (
    <div className="min-h-screen flex items-center justify-center p-6 relative bg-[#010103] overflow-hidden">
      <div className="absolute inset-0 matrix-dots opacity-40"></div>
      <div className={`w-full max-w-md glass-heavy p-12 rounded-[2.5rem] border-cyber-primary/20 relative z-10 transition-all ${loginError ? 'animate-shake' : ''}`}>
        <div className="text-center mb-12">
          <div className="relative inline-block mb-10">
            <div className="absolute inset-0 bg-cyber-primary/30 blur-2xl rounded-full"></div>
            <div className="w-28 h-28 glass-heavy rounded-full border border-cyber-primary/40 flex items-center justify-center relative animate-float shadow-[0_0_50px_rgba(0,243,255,0.1)]">
              <span className="text-5xl">🎓</span>
            </div>
          </div>
          <h1 className="font-orbitron text-4xl font-black text-white tracking-[0.2em] mb-3 uppercase">ISGS Hub</h1>
          <p className="text-cyber-primary text-[10px] font-orbitron font-bold tracking-[0.4em] uppercase opacity-50">3ème Management 2025-2026</p>
        </div>
        
        <div className="space-y-8">
          <input 
            autoFocus
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            placeholder="ACCESS_TOKEN"
            className="w-full bg-white/5 border border-white/10 px-6 py-5 rounded-xl text-center text-xl font-orbitron tracking-[0.5em] text-cyber-primary focus:outline-none focus:border-cyber-primary/50 transition-all placeholder:text-white/5"
          />
          <button 
            onClick={handleLogin}
            className="w-full bg-cyber-primary text-cyber-bg py-5 rounded-xl font-orbitron font-black tracking-[0.4em] hover:brightness-110 hover:shadow-[0_0_40px_rgba(0,243,255,0.3)] transition-all"
          >
            AUTHORIZE_ACCESS
          </button>
        </div>
        <div className="mt-12 text-center text-[8px] font-orbitron text-white/10 tracking-[1em] uppercase">Dev by @Dopaem</div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen flex flex-col bg-[#010103] text-white transition-all duration-1000 ${timerActive ? 'grayscale-[0.6] brightness-75' : ''}`}>
      {timerActive && <div className="animate-scanline-fast focus-scanline"></div>}
      
      {booting ? renderBoot() : !isAuthenticated ? renderLogin() : (
        <>
          <nav className={`glass-heavy sticky top-0 z-[100] border-b border-white/10 px-8 py-5 flex items-center justify-between transition-all duration-700 ${timerActive ? 'opacity-20 translate-y-[-10px]' : 'opacity-100'}`}>
            <div className="flex items-center gap-8 cursor-pointer group" onClick={() => setSelectedSubject(null)}>
              <div className="w-12 h-12 bg-gradient-to-br from-cyber-primary/80 to-cyber-secondary/80 text-cyber-bg rounded-xl flex items-center justify-center font-orbitron font-black text-2xl shadow-[0_0_30px_rgba(0,243,255,0.2)]">IS</div>
              <div className="flex flex-col">
                <span className="text-sm font-orbitron font-black tracking-[0.4em] text-white">ISGS_MGMT_HUB</span>
                <span className="text-[9px] font-mono text-cyber-primary/40 tracking-widest uppercase">Promotion 2025-2026</span>
              </div>
            </div>

            <div className="flex items-center gap-10">
              <div className="hidden lg:flex items-center gap-8 text-[10px] font-orbitron font-bold tracking-[0.3em] text-white/20">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${timerActive ? 'bg-cyber-danger animate-pulse' : 'bg-cyber-accent animate-pulse'}`}></div>
                  <span className={timerActive ? 'text-cyber-danger' : 'text-cyber-accent/50'}>
                    {timerActive ? 'LOCK_FOCUS_ON' : 'STUDY_CORE_NOMINAL'}
                  </span>
                </div>
              </div>
              <div className="h-6 w-px bg-white/10"></div>
              <div className="text-[10px] font-orbitron text-white/40 tracking-widest font-black uppercase">Arch: @Dopaem</div>
            </div>
          </nav>

          <div className="flex-1 flex overflow-hidden">
            {/* Sidebar with Absolute Zero Distraction Protocol */}
            <aside className={`w-80 hidden xl:flex flex-col border-r border-white/5 p-10 space-y-12 bg-black/40 transition-all duration-700 ${timerActive ? 'w-0 opacity-0 pointer-events-none -translate-x-full overflow-hidden' : 'opacity-100 translate-x-0'}`}>
              <div className="min-w-[240px]">
                <h3 className="text-[10px] font-orbitron font-black text-cyber-primary tracking-[0.4em] mb-8 flex justify-between border-b border-cyber-primary/10 pb-2 uppercase">
                  <span>ISGS_Progress</span>
                  <span className="text-cyber-accent">{masteryProgress}%</span>
                </h3>
                <div className="space-y-6">
                  {tasks.map(t => (
                    <div key={t.id} className="flex items-start gap-4 group cursor-pointer" onClick={() => {
                      setTasks(prev => prev.map(pt => pt.id === t.id ? {...pt, done: !pt.done} : pt))
                    }}>
                      <div className={`w-5 h-5 rounded-lg border flex-shrink-0 flex items-center justify-center transition-all ${t.done ? 'bg-cyber-accent/20 border-cyber-accent text-cyber-accent' : 'border-white/10 group-hover:border-cyber-primary'}`}>
                        {t.done && <span className="text-xs">✓</span>}
                      </div>
                      <span className={`text-[13px] font-medium leading-tight ${t.done ? 'text-white/10 line-through' : 'text-cyber-text group-hover:text-white'}`}>{t.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-heavy rounded-3xl p-8 border-white/5 relative overflow-hidden group border-b-0 border-r-0 min-w-[240px]">
                <h3 className="text-[10px] font-orbitron font-black text-cyber-secondary tracking-[0.4em] mb-6 uppercase">Focus_Timer</h3>
                <div className={`text-5xl font-orbitron font-light mb-8 text-center tracking-tighter ${timerActive ? 'text-cyber-primary drop-shadow-[0_0_15px_rgba(0,243,255,0.4)]' : 'text-white/40'}`}>
                  {formatTime(pomodoroTime)}
                </div>
                <button 
                  onClick={() => setTimerActive(!timerActive)}
                  className={`w-full py-4 rounded-xl text-[10px] font-orbitron font-black tracking-[0.4em] transition-all uppercase ${timerActive ? 'bg-cyber-danger text-white' : 'bg-white/5 text-cyber-primary border border-cyber-primary/20 hover:bg-cyber-primary hover:text-cyber-bg'}`}
                >
                  {timerActive ? 'STOP_SESSION' : 'START_SESSION'}
                </button>
              </div>
            </aside>
            
            <main className={`flex-1 overflow-y-auto no-scrollbar p-6 md:p-16 lg:p-24 max-w-[1700px] mx-auto w-full transition-all duration-700 ${timerActive ? 'max-w-none px-4 md:px-8 bg-black/40' : ''}`}>
              {selectedSubject ? (
                <div className="animate-in fade-in slide-in-from-right-10 duration-700 pb-32">
                  <button 
                    onClick={() => setSelectedSubject(null)}
                    className={`mb-12 group flex items-center gap-4 text-white/30 hover:text-cyber-primary transition-all font-orbitron text-[10px] font-black tracking-[0.5em] uppercase ${timerActive ? 'opacity-0 scale-50' : 'opacity-100'}`}
                  >
                    <span className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center group-hover:border-cyber-primary group-hover:scale-110 transition-all">←</span>
                    CURRICULUM_GRID
                  </button>

                  <div className="grid lg:grid-cols-12 gap-20">
                    <div className={`lg:col-span-4 space-y-12 transition-all duration-700 ${timerActive ? 'lg:col-span-3 opacity-30 blur-md scale-90' : ''}`}>
                      <div className="relative inline-block">
                        <div className="absolute inset-0 bg-cyber-primary/20 blur-[100px] rounded-full"></div>
                        <div className="w-40 h-40 glass-heavy rounded-[2.5rem] border border-cyber-primary/40 flex items-center justify-center text-8xl relative z-10">
                          {selectedSubject.icon}
                        </div>
                      </div>
                      
                      <div>
                        <h2 className="text-7xl font-black font-orbitron tracking-tight uppercase mb-8 leading-[0.85]">{selectedSubject.name}</h2>
                        <p className="text-cyber-text text-xl leading-relaxed font-medium opacity-80">{selectedSubject.description}</p>
                      </div>
                    </div>

                    <div className={`lg:col-span-8 space-y-10 transition-all duration-700 ${timerActive ? 'lg:col-span-9' : ''}`}>
                       <h3 className={`font-orbitron text-xs font-black tracking-[0.6em] text-white/20 uppercase border-b border-white/5 pb-4 transition-all ${timerActive ? 'opacity-0' : 'opacity-100'}`}>COHORT_RESOURCES</h3>
                       <div className="grid gap-6">
                          {DOCUMENTS.filter(d => d.subjectId === selectedSubject.id).map((doc, i) => (
                            <div key={doc.id} className="group glass-heavy p-8 rounded-[2rem] border-white/5 hover:border-cyber-primary/40 transition-all flex items-center justify-between animate-in slide-in-from-bottom-5" style={{animationDelay: `${i*100}ms`}}>
                               <div className="flex items-center gap-8">
                                  <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center font-orbitron font-black text-xl transition-colors ${doc.type === 'Course' ? 'border-cyber-primary/30 text-cyber-primary bg-cyber-primary/5' : doc.type === 'Exam' ? 'border-cyber-danger/30 text-cyber-danger bg-cyber-danger/5' : 'border-white/10 text-white/30 bg-white/5'}`}>
                                    {doc.type[0]}
                                  </div>
                                  <div>
                                    <div className="font-black text-2xl group-hover:text-cyber-primary transition-colors tracking-tight">{doc.title}</div>
                                    <div className="text-[11px] font-mono text-white/20 mt-2 uppercase tracking-widest">{doc.author} | ISGS_{doc.type}</div>
                                  </div>
                               </div>
                               <button 
                                 onClick={() => setViewerUrl(doc.url)}
                                 className="px-10 py-5 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-orbitron font-black tracking-[0.4em] hover:bg-cyber-primary hover:text-cyber-bg transition-all uppercase"
                               >
                                 VIEW_PACKET
                               </button>
                            </div>
                          ))}
                       </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={`space-y-20 pb-40 transition-all duration-700 ${timerActive ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100'}`}>
                  <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
                    <div className="relative">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-[10px] font-orbitron font-black text-cyber-primary tracking-[0.6em] animate-pulse uppercase">ISGS_NETWORK_ONLINE</span>
                      </div>
                      <h2 className="text-8xl font-black font-orbitron tracking-tighter uppercase leading-[0.8]">
                        Strategic <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-primary via-white to-cyber-secondary">ISGS Portal</span>
                      </h2>
                    </div>
                    
                    <div className="relative group w-full lg:w-96">
                      <input 
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="SCAN_ISGS_CURRICULUM"
                        className="bg-white/5 border border-white/10 rounded-2xl px-14 py-6 w-full focus:outline-none focus:border-cyber-primary/40 transition-all font-mono text-sm tracking-widest uppercase placeholder:text-white/10"
                      />
                      <span className="absolute left-6 top-1/2 -translate-y-1/2 text-cyber-primary opacity-40">⚡</span>
                    </div>
                  </header>

                  <div className="flex items-center gap-5 overflow-x-auto no-scrollbar pb-4">
                    {categories.map(cat => (
                      <button 
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`whitespace-nowrap px-10 py-4 rounded-2xl text-[10px] font-orbitron font-black tracking-[0.3em] transition-all border uppercase ${activeCategory === cat ? 'bg-cyber-primary text-cyber-bg border-cyber-primary shadow-[0_0_40px_rgba(0,243,255,0.3)] scale-105' : 'bg-white/5 text-cyber-text border-white/10 hover:border-white/20'}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {filteredSubjects.map((s) => (
                      <div 
                        key={s.id}
                        onClick={() => setSelectedSubject(s)}
                        className="group relative glass-heavy rounded-[2.5rem] p-10 border-white/5 hover:border-cyber-primary/40 cursor-pointer transition-all duration-700 hover:-translate-y-4 overflow-hidden"
                      >
                        <div className="absolute bottom-0 left-0 h-1.5 bg-gradient-to-r from-cyber-primary to-cyber-secondary w-0 group-hover:w-full transition-all duration-700"></div>
                        <div className="flex items-start justify-between mb-10">
                          <div className="text-7xl group-hover:scale-110 transition-transform duration-700">{s.icon}</div>
                          <div className="text-right">
                            <div className="text-[10px] font-orbitron font-black text-cyber-primary/30 uppercase tracking-widest">ISGS_ID</div>
                            <div className="text-2xl font-orbitron font-black tracking-tighter">{s.id.padStart(2, '0')}</div>
                          </div>
                        </div>
                        <h3 className="text-3xl font-black font-orbitron text-white mb-6 group-hover:text-cyber-primary transition-colors uppercase leading-tight">{s.name}</h3>
                        <p className="text-cyber-text text-sm leading-relaxed mb-10 line-clamp-2 opacity-60 font-medium">{s.description}</p>
                        <div className="flex justify-between items-center pt-8 border-t border-white/5">
                          <span className="text-[10px] font-orbitron font-black text-cyber-secondary tracking-[0.4em] uppercase">[{s.category}]</span>
                          <span className="text-[10px] font-orbitron font-black text-white/20 uppercase tracking-widest group-hover:text-cyber-primary transition-colors">INITIALIZE →</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </main>
          </div>

          <AICopilot activeSubject={selectedSubject} />

          {viewerUrl && <PDFViewer url={viewerUrl} onClose={() => setViewerUrl(null)} />}

          <footer className={`fixed bottom-0 left-0 right-0 glass-heavy border-t border-white/5 py-4 px-10 flex justify-between items-center z-[50] text-[9px] font-mono transition-all duration-700 ${timerActive ? 'opacity-20 translate-y-4' : 'opacity-100 translate-y-0'}`}>
            <div className="flex gap-10 uppercase tracking-widest text-white/20">
              <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-cyber-accent rounded-full animate-pulse"></span> ISGS_COHORT: 25-26</span>
              <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-cyber-primary rounded-full"></span> SECURE_LINK: ACTIVE</span>
            </div>
            <div className="tracking-[0.8em] font-orbitron uppercase text-cyber-primary/50 font-black">
              ISGS MGMT HUB | Dev by @Dopaem
            </div>
          </footer>
        </>
      )}
    </div>
  );
};

export default App;
