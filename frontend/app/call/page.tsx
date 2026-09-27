"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Video, VideoOff, MessageSquare, PhoneOff, Settings, HandMetal, ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CallPage() {
  const router = useRouter();
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  return (
    <div className="h-screen w-full bg-slate-950 overflow-hidden flex font-sans relative">
      
      {/* Top Header overlay */}
      <div className="absolute top-0 w-full p-6 flex justify-between items-start z-20 bg-gradient-to-b from-black/60 to-transparent pointer-events-none">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-600/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-purple-500/30">
            <HandMetal className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h1 className="text-white font-bold text-lg drop-shadow-md">Budi Santoso</h1>
            <p className="text-purple-300 text-sm font-medium drop-shadow-md">Juru Bahasa Isyarat</p>
          </div>
        </div>
        <div className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-sm font-medium border border-white/10 pointer-events-auto tabular-nums">
          {formatTime(seconds)}
        </div>
      </div>

      {/* Main Video Area (Remote Peer) */}
      <div className="flex-1 h-full relative z-0 flex items-center justify-center bg-slate-900">
        {/* Placeholder for Remote Video */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex flex-col items-center justify-center text-slate-700">
           <UserPlaceholder size="w-48 h-48" text="BS" />
           <p className="mt-6 text-xl font-medium text-slate-500">Budi Santoso</p>
        </div>
      </div>

      {/* Local Video Area (Self-view Picture-in-Picture) */}
      <motion.div 
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.1}
        className="absolute bottom-32 right-6 w-48 h-72 md:w-64 md:h-96 bg-slate-800 rounded-2xl overflow-hidden shadow-2xl border-2 border-slate-700/50 z-20 cursor-grab active:cursor-grabbing"
      >
        {isVideoOn ? (
           <div className="w-full h-full bg-slate-700 relative">
             {/* Simulasi tampilan kamera sendiri */}
             <div className="absolute inset-0 flex items-center justify-center text-slate-500">
               <span className="text-sm">Kamera Anda Aktif</span>
             </div>
           </div>
        ) : (
           <div className="w-full h-full bg-slate-900 flex items-center justify-center">
             <UserPlaceholder size="w-20 h-20" text="TU" />
           </div>
        )}
        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-xs text-white font-medium">
          Anda (Teman Tuli)
        </div>
      </motion.div>

      {/* Bottom Control Bar */}
      <div className="absolute bottom-0 w-full p-6 flex justify-center items-end z-20 bg-gradient-to-t from-black/80 to-transparent pb-10">
        <div className="flex items-center gap-4 bg-slate-900/60 backdrop-blur-xl p-3 rounded-3xl border border-white/10 shadow-2xl">
          
          <ControlButton 
            icon={isMicOn ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />} 
            isActive={isMicOn} 
            onClick={() => setIsMicOn(!isMicOn)} 
            danger={!isMicOn}
          />
          
          <ControlButton 
            icon={isVideoOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />} 
            isActive={isVideoOn} 
            onClick={() => setIsVideoOn(!isVideoOn)} 
            danger={!isVideoOn}
          />
          
          <button 
            onClick={() => router.back()}
            className="w-16 h-12 bg-red-500 hover:bg-red-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-red-500/30 transition-all hover:scale-105 active:scale-95 px-8 mx-2"
          >
            <PhoneOff className="w-6 h-6" />
          </button>
          
          <ControlButton 
            icon={<MessageSquare className="w-6 h-6" />} 
            isActive={isChatOpen} 
            onClick={() => setIsChatOpen(!isChatOpen)} 
          />
          
          <ControlButton 
            icon={<Settings className="w-6 h-6" />} 
            isActive={true} 
            onClick={() => {}} 
          />

        </div>
      </div>

      {/* Side Chat Panel (Overlay) */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute right-0 top-0 bottom-0 w-full sm:w-96 bg-slate-900/95 backdrop-blur-3xl border-l border-white/10 z-30 flex flex-col shadow-2xl"
          >
            <div className="p-5 border-b border-white/10 flex justify-between items-center bg-slate-800/30">
              <h2 className="text-white font-bold text-lg flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-purple-400" />
                Live Chat
              </h2>
            </div>
            
            <div className="flex-1 p-5 overflow-y-auto space-y-4">
              
              {/* Back-channeling Warning Banner */}
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 flex items-start gap-3 mb-6">
                <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-200/90 leading-relaxed">
                  <strong className="text-amber-400 block mb-1">Peringatan Keamanan</strong>
                  Demi keamanan dan garansi layanan, <b>jangan</b> melakukan pembayaran langsung di luar sistem IsyaratHUB. Kami tidak bertanggung jawab atas kerugian dari transaksi di luar aplikasi.
                </p>
              </div>

              <div className="bg-purple-600/20 p-3 rounded-2xl rounded-tl-sm w-[85%] text-sm text-purple-100 border border-purple-500/20">
                Halo, saya sedang menuju ke lokasi pertemuan.
              </div>
              <div className="bg-slate-800 p-3 rounded-2xl rounded-tr-sm w-[85%] ml-auto text-sm text-slate-200 border border-slate-700">
                Baik, saya tunggu di lobby ya.
              </div>
            </div>
            
            <div className="p-4 border-t border-white/10 bg-slate-900">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Ketik pesan..." 
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                />
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 rounded-xl text-sm font-medium transition-colors">
                  Kirim
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

function ControlButton({ icon, isActive, danger = false, onClick }: { icon: React.ReactNode, isActive: boolean, danger?: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 ${
        danger 
          ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30 border border-red-500/30' 
          : isActive 
            ? 'bg-slate-800 text-white hover:bg-slate-700' 
            : 'bg-white/10 text-slate-300 hover:bg-white/20'
      }`}
    >
      {icon}
    </button>
  );
}

function UserPlaceholder({ size, text }: { size: string, text: string }) {
  return (
    <div className={`${size} bg-slate-800 rounded-full flex items-center justify-center text-slate-600 font-bold text-4xl shadow-inner border border-slate-700/50`}>
      {text}
    </div>
  );
}
