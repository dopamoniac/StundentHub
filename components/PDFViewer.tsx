
import React, { useState } from 'react';

interface PDFViewerProps {
  url: string;
  onClose: () => void;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ url, onClose }) => {
  const [cyberLens, setCyberLens] = useState(false);
  const [visionBoost, setVisionBoost] = useState(false);
  const [notes, setNotes] = useState('');

  const handleDownload = () => {
    // Allows the user to download or view the document in a full browser tab
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[200] p-4 md:p-8 bg-black/95 backdrop-blur-3xl animate-in fade-in zoom-in-95 duration-300 flex items-center justify-center">
      {/* Structural Corner Brackets */}
      <div className="absolute top-8 left-8 w-20 h-20 border-t border-l border-cyber-primary/20 pointer-events-none"></div>
      <div className="absolute top-8 right-8 w-20 h-20 border-t border-r border-cyber-primary/20 pointer-events-none"></div>
      <div className="absolute bottom-8 left-8 w-20 h-20 border-b border-l border-cyber-primary/20 pointer-events-none"></div>
      <div className="absolute bottom-8 right-8 w-20 h-20 border-b border-r border-cyber-primary/20 pointer-events-none"></div>

      <div className="w-full h-full glass-heavy rounded-[2.5rem] border border-cyber-primary/20 flex flex-col overflow-hidden shadow-2xl relative">
        {/* Architect Branding Watermark */}
        <div className="absolute bottom-10 right-96 pointer-events-none z-50 text-[10px] font-orbitron font-black text-cyber-primary/10 tracking-[1em] rotate-90 origin-right uppercase">
          ISGS_3MGMT_@Dopaem
        </div>

        {/* Header Console */}
        <div className="px-10 py-6 border-b border-white/10 flex justify-between items-center bg-black/40">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4">
              <div className="w-2.5 h-2.5 rounded-full bg-cyber-primary animate-pulse shadow-[0_0_10px_#00f3ff]"></div>
              <span className="font-orbitron font-black text-[11px] tracking-[0.5em] text-white uppercase">Analysis_Active</span>
            </div>
            <div className="hidden md:flex gap-6 text-[10px] font-mono text-white/20 uppercase tracking-[0.2em]">
              <span>Packet_ID: {Math.random().toString(16).slice(2, 8).toUpperCase()}</span>
              <span>Promotion: ISGS_25-26</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={handleDownload}
              title="Download or Export Document"
              className="px-4 py-2.5 rounded-xl text-[9px] font-orbitron font-black tracking-widest transition-all border uppercase bg-white/5 text-white/30 border-white/10 hover:border-cyber-primary hover:text-cyber-primary hover:bg-cyber-primary/5"
            >
              Download_Packet
            </button>
            <div className="h-6 w-px bg-white/10 mx-1"></div>
            <button 
              onClick={() => setVisionBoost(!visionBoost)}
              title="Enhance Text Clarity & Contrast"
              className={`px-4 py-2.5 rounded-xl text-[9px] font-orbitron font-black tracking-widest transition-all border uppercase ${visionBoost ? 'bg-cyber-accent text-cyber-bg border-cyber-accent shadow-[0_0_15px_rgba(57,255,20,0.4)]' : 'bg-white/5 text-white/30 border-white/10 hover:border-white/30'}`}
            >
              Vision_Boost
            </button>
            <button 
              onClick={() => setCyberLens(!cyberLens)}
              title="Toggle Dark Eye-Protection Mode"
              className={`px-4 py-2.5 rounded-xl text-[9px] font-orbitron font-black tracking-widest transition-all border uppercase ${cyberLens ? 'bg-cyber-primary text-cyber-bg border-cyber-primary shadow-[0_0_15px_rgba(0,243,255,0.4)]' : 'bg-white/5 text-white/30 border-white/10 hover:border-white/30'}`}
            >
              Cyber_Lens
            </button>
            <div className="h-8 w-px bg-white/10 mx-2"></div>
            <button 
              onClick={onClose} 
              className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-cyber-danger text-white rounded-xl transition-all"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Main Visual Frame */}
          <div className="flex-1 h-full bg-white relative">
            <iframe 
              src={url} 
              className={`w-full h-full border-none transition-all duration-500 ${cyberLens ? 'invert brightness-90 contrast-125 hue-rotate-180' : ''} ${visionBoost ? 'contrast-[1.6] brightness-110 saturate-[1.2]' : ''}`}
              title="Course Material"
            />
            {(cyberLens || visionBoost) && <div className="absolute inset-0 pointer-events-none bg-cyber-primary/5 mix-blend-overlay"></div>}
          </div>

          {/* Side Synthesis Notebook */}
          <div className="w-80 lg:w-[400px] border-l border-white/10 flex flex-col bg-black/40 backdrop-blur-xl">
            <div className="p-8 border-b border-white/5 bg-white/5 flex items-center justify-between">
              <h3 className="font-orbitron text-[10px] font-black text-cyber-secondary tracking-[0.4em] uppercase">Tactical_Notes</h3>
              <span className="text-[9px] font-mono text-white/20">RW_ISGS_MGMT</span>
            </div>
            <div className="flex-1 p-8">
              <textarea 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="CAPTURE STRATEGIC INSIGHTS..."
                className="w-full h-full bg-transparent border-none focus:outline-none resize-none font-mono text-sm text-cyber-text leading-loose placeholder:text-white/5 uppercase tracking-tighter"
              />
            </div>
            <div className="p-8 border-t border-white/5 bg-black/30">
              <div className="flex justify-between items-center mb-4">
                <div className="text-[10px] font-mono text-white/20 uppercase tracking-widest">Buffer_Sync</div>
                <div className="text-[10px] font-mono text-cyber-primary">STABLE</div>
              </div>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <div className={`h-full bg-cyber-primary transition-all duration-1000 ${visionBoost ? 'shadow-[0_0_10px_#00f3ff]' : ''}`} style={{ width: '100%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;
