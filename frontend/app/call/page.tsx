"use client";

import { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Video, VideoOff, PhoneOff, MessageSquare, MoreVertical, Maximize, X, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function VideoCallPage() {
  const router = useRouter();
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: "Budi Santoso (JBI)", text: "Halo! Ada yang bisa saya bantu terjemahkan hari ini?", time: "10:00" },
    { id: 2, sender: "Anda", text: "Iya, saya mau ke bank untuk membuka rekening.", time: "10:01" },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isChatOpen]);

  useEffect(() => {
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    router.back();
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    setChatMessages([
      ...chatMessages,
      { id: Date.now(), sender: "Anda", text: message, time }
    ]);
    setMessage("");
  };

  return (
    <div className="h-screen w-full bg-slate-950 flex flex-col font-sans relative overflow-hidden">
      {/* Background / Main Video Feed (Mock) */}
      <div className="absolute inset-0 z-0 bg-slate-900 flex items-center justify-center">
        {isVideoOff ? (
          <div className="w-32 h-32 bg-slate-800 rounded-full flex items-center justify-center text-4xl font-bold text-slate-500">
            JBI
          </div>
        ) : (
          <img 
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1000" 
            alt="JBI Feed" 
            className="w-full h-full object-cover opacity-80"
          />
        )}
      </div>

      {/* Header Overlay */}
      <div className="absolute top-0 left-0 w-full p-6 z-10 flex justify-between items-start bg-gradient-to-b from-black/60 to-transparent">
        <div>
          <h2 className="text-2xl font-bold text-white shadow-sm">Budi Santoso (Mitra JBI)</h2>
          <p className="text-emerald-400 font-bold flex items-center gap-2 mt-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            {formatTime(seconds)}
          </p>
        </div>
        <button className="p-3 bg-white/10 backdrop-blur-md rounded-2xl hover:bg-white/20 transition-colors text-white">
          <Maximize className="w-6 h-6" />
        </button>
      </div>

      {/* Self View (Picture in Picture) */}
      <motion.div 
        drag
        dragConstraints={{ top: 100, right: 20, bottom: 20, left: 20 }}
        className="absolute bottom-32 right-6 w-32 h-44 sm:w-48 sm:h-64 bg-slate-800 rounded-2xl border-2 border-white/20 shadow-2xl overflow-hidden z-20 cursor-move"
      >
        <img 
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=500" 
          alt="Self Feed" 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-2 left-2 bg-black/50 px-2 py-1 rounded text-[10px] font-bold text-white">
          Anda
        </div>
      </motion.div>

      {/* Control Bar */}
      <div className="absolute bottom-0 left-0 w-full p-6 z-30 bg-gradient-to-t from-black/80 to-transparent flex justify-center items-center gap-4 sm:gap-6">
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all ${isMuted ? 'bg-slate-700/80 text-white' : 'bg-white/20 backdrop-blur-md text-white hover:bg-white/30'}`}
        >
          {isMuted ? <MicOff className="w-6 h-6 sm:w-7 sm:h-7" /> : <Mic className="w-6 h-6 sm:w-7 sm:h-7" />}
        </button>

        <button 
          onClick={() => setIsVideoOff(!isVideoOff)}
          className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all ${isVideoOff ? 'bg-slate-700/80 text-white' : 'bg-white/20 backdrop-blur-md text-white hover:bg-white/30'}`}
        >
          {isVideoOff ? <VideoOff className="w-6 h-6 sm:w-7 sm:h-7" /> : <Video className="w-6 h-6 sm:w-7 sm:h-7" />}
        </button>

        <button 
          onClick={handleEndCall}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-[1.5rem] bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-lg shadow-red-600/30 transition-transform active:scale-90"
        >
          <PhoneOff className="w-8 h-8 sm:w-10 sm:h-10" />
        </button>

        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all relative ${isChatOpen ? 'bg-indigo-600 text-white' : 'bg-white/20 backdrop-blur-md text-white hover:bg-white/30'}`}
        >
          <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7" />
          {!isChatOpen && <span className="absolute top-3 right-3 w-3 h-3 bg-red-500 rounded-full border-2 border-slate-900" />}
        </button>

        <button className="hidden sm:flex w-16 h-16 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 items-center justify-center transition-all">
          <MoreVertical className="w-7 h-7" />
        </button>
      </div>

      {/* Chat Sidebar */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute top-0 right-0 h-full w-full sm:w-96 bg-white/10 backdrop-blur-xl border-l border-white/20 z-40 flex flex-col shadow-2xl"
          >
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/20">
              <h3 className="text-white font-semibold text-lg flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-indigo-400" />
                Obrolan
              </h3>
              <button 
                onClick={() => setIsChatOpen(false)}
                className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {chatMessages.map((msg) => {
                const isMe = msg.sender === "Anda";
                return (
                  <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                    <span className="text-xs text-white/50 mb-1 ml-1">{msg.sender} • {msg.time}</span>
                    <div className={`px-4 py-2.5 rounded-2xl max-w-[85%] text-sm ${isMe ? 'bg-indigo-600 text-white rounded-tr-sm' : 'bg-white/20 text-white rounded-tl-sm backdrop-blur-md'}`}>
                      {msg.text}
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-black/20 border-t border-white/10">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input 
                  type="text" 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ketik pesan..." 
                  className="flex-1 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                />
                <button 
                  type="submit"
                  disabled={!message.trim()}
                  className="p-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-full text-white transition-colors flex items-center justify-center shrink-0"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
