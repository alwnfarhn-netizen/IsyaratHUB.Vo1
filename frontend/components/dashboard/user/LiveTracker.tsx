"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, CheckCircle2, Clock, Navigation, User, Phone, Star, MessageSquare } from "lucide-react";
import Link from "next/link";

const STEPS = [
  { id: "searching",          label: "Mencari JBI...",              sub: "Sistem mencocokkan JBI terdekat.",          icon: <Clock className="w-6 h-6" /> },
  { id: "heading_to_location", label: "JBI Menuju Lokasi",  sub: "JBI sedang dalam perjalanan.", icon: <Navigation className="w-6 h-6" /> },
  { id: "arrived",            label: "JBI Tiba!",             sub: "JBI sudah berada di lokasi Anda.", icon: <MapPin className="w-6 h-6" /> },
  { id: "in_progress",        label: "Sesi Berlangsung",            sub: "Sesi pendampingan dimulai.",            icon: <User className="w-6 h-6" /> },
  { id: "completed",          label: "Selesai!",              sub: "Terima kasih menggunakan IsyaratHUB.",                  icon: <CheckCircle2 className="w-6 h-6" /> },
];

export default function LiveTracker({ jbiName, jbiAvatar, location, onClose }: { jbiName: string, jbiAvatar: string, location: string, onClose: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState(0);

  // Auto-advance steps for demo
  useEffect(() => {
    if (currentStep >= 3) return;
    const delays = [3000, 4000, 3000];
    const timer = setTimeout(() => setCurrentStep((s) => s + 1), delays[currentStep] ?? 3000);
    return () => clearTimeout(timer);
  }, [currentStep]);

  useEffect(() => {
    if (STEPS[currentStep]?.id === "completed") {
      const t = setTimeout(() => setShowRating(true), 800);
      return () => clearTimeout(t);
    }
  }, [currentStep]);

  const step = STEPS[currentStep];

  // Layar Penuh (Sesi / Rating)
  if (currentStep >= 3) {
    return (
      <div className="fixed inset-0 z-[100] bg-slate-50 flex flex-col items-center justify-center p-0 sm:p-6">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className={`w-full max-w-md flex flex-col items-center ${step.id === "in_progress" ? 'h-full' : 'p-6'}`}>
          {step.id === "in_progress" ? (
            <InSessionView jbiName={jbiName} jbiAvatar={jbiAvatar} onComplete={() => setCurrentStep(4)} />
          ) : (
            <PostSessionRatingView jbiName={jbiName} onClose={onClose} showRating={showRating} rating={rating} setRating={setRating} />
          )}
        </motion.div>
      </div>
    );
  }

  // Modal Pelacakan (Over Map)
  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center sm:p-4 pointer-events-none">
      <motion.div
        initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 100 }}
        className="w-full sm:max-w-md bg-white border border-slate-200 sm:rounded-3xl rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] pointer-events-auto overflow-hidden"
      >
        {/* Progress Bar atas */}
        <div className="w-full h-1.5 bg-slate-100 flex">
          <div className="h-full bg-purple-600 transition-all duration-1000 ease-in-out" style={{ width: `${((currentStep + 1) / 3) * 100}%` }} />
        </div>

        <div className="p-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center text-3xl font-bold border-2 border-purple-100 shadow-inner">
              {jbiAvatar}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">{jbiName}</h2>
              <div className="flex items-center gap-1 text-slate-500 font-bold mt-0.5 text-sm">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> 4.9 • {location}
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="bg-slate-50 border border-slate-100 p-5 rounded-2xl flex items-center gap-4 mb-8 shadow-sm"
            >
              <div className={`p-3 rounded-xl shrink-0 ${currentStep === 0 ? "bg-amber-100 text-amber-600 animate-pulse" : currentStep === 1 ? "bg-blue-100 text-blue-600" : "bg-emerald-100 text-emerald-600"}`}>
                {step.icon}
              </div>
              <div>
                <p className="font-bold text-slate-800 text-lg">{step.label}</p>
                <p className="text-slate-500 font-medium text-sm mt-0.5">{step.sub}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex gap-3">
            <Link href="/chat" className="flex-1 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-2xl transition-all text-lg flex items-center justify-center gap-2 shadow-lg shadow-purple-200">
              <MessageSquare className="w-5 h-5" /> Chat
            </Link>
            <button onClick={onClose} className="flex-1 py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-2xl transition-all text-lg">
              Tutup
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function InSessionView({ jbiName, jbiAvatar, onComplete }: { jbiName: string, jbiAvatar: string, onComplete: () => void }) {
  const [seconds, setSeconds] = useState(0);
  const [msg, setMsg] = useState("");
  const [chats, setChats] = useState([
    { id: 1, text: "Halo, sesi kita sudah dimulai ya.", isMe: false, time: "10:15" }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const timer = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const sendMsg = (e: React.FormEvent) => {
    e.preventDefault();
    if(!msg.trim()) return;
    
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    setChats(prev => [...prev, { id: Date.now(), text: msg, isMe: true, time }]);
    setMsg("");
    setTimeout(() => {
      setChats(prev => [...prev, { id: Date.now(), text: "Baik, saya siap membantu.", isMe: false, time }]);
    }, 2000);
  };

  return (
    <div className="w-full h-full flex flex-col bg-white rounded-none sm:rounded-3xl overflow-hidden shadow-2xl">
      {/* HEADER: Timer & Info */}
      <div className="bg-purple-600 p-6 pb-8 text-white relative shrink-0 rounded-b-3xl sm:rounded-b-none">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center text-2xl border-2 border-white/30 backdrop-blur-sm shrink-0">
            {jbiAvatar}
          </div>
          <div>
            <h2 className="text-xl font-bold leading-tight">{jbiName}</h2>
            <p className="text-purple-200 text-sm font-medium">Sesi Berlangsung</p>
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex justify-between items-center border border-white/20">
          <div>
            <p className="text-purple-200 text-xs font-bold uppercase tracking-wider mb-1">Durasi</p>
            <div className="text-4xl font-mono font-black">{formatTime(seconds)}</div>
          </div>
          <div className="flex gap-2">
            <button className="w-12 h-12 rounded-xl bg-red-500 hover:bg-red-600 transition-colors flex items-center justify-center shadow-lg shrink-0">
              <Phone className="w-5 h-5 text-white" />
            </button>
            <button onClick={onComplete} className="h-12 px-5 rounded-xl bg-white text-purple-600 hover:bg-slate-50 transition-colors flex items-center justify-center font-bold shadow-lg">
              Selesai
            </button>
          </div>
        </div>
      </div>
      
      {/* CHAT AREA */}
      <div className="flex-1 bg-slate-50 p-4 overflow-y-auto space-y-4 custom-scrollbar">
        <div className="text-center"><span className="text-xs font-bold text-slate-400 bg-slate-200/50 px-3 py-1 rounded-full">Sesi Dimulai</span></div>
        {chats.map(c => (
          <div key={c.id} className={`flex ${c.isMe ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-[15px] ${c.isMe ? 'bg-purple-600 text-white rounded-br-sm' : 'bg-white text-slate-800 border border-slate-200 rounded-bl-sm shadow-sm'}`}>
              {c.text}
              <div className={`text-[10px] mt-1 text-right ${c.isMe ? 'text-purple-200' : 'text-slate-400'}`}>{c.time}</div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* CHAT INPUT */}
      <form onSubmit={sendMsg} className="p-3 bg-white border-t border-slate-200 flex gap-2">
        <input 
          type="text" 
          value={msg}
          onChange={e => setMsg(e.target.value)}
          placeholder="Tulis pesan..." 
          className="flex-1 bg-slate-100 rounded-full px-5 py-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-purple-500/50 font-medium text-slate-800"
        />
        <button type="submit" disabled={!msg.trim()} className="w-12 h-12 bg-purple-600 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-full flex items-center justify-center shrink-0 shadow-md transition-all active:scale-95">
          <MessageSquare className="w-5 h-5 -ml-0.5" />
        </button>
      </form>
    </div>
  );
}

function PostSessionRatingView({ jbiName, onClose, showRating, rating, setRating }: { jbiName: string, onClose: () => void, showRating: boolean, rating: number, setRating: (r: number) => void }) {
  return (
    <div className="bg-white border border-slate-200 p-10 rounded-[3rem] shadow-xl w-full text-center">
      <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-emerald-100">
        <CheckCircle2 className="w-12 h-12" />
      </div>
      <h2 className="text-3xl font-bold text-slate-800 mb-2">Sesi Selesai!</h2>
      <p className="text-slate-500 font-medium mb-10 text-lg">Terima kasih menggunakan IsyaratHUB.</p>
      
      <AnimatePresence>
        {showRating && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div>
              <p className="text-slate-600 font-bold text-lg mb-4">Beri nilai {jbiName}</p>
              <div className="flex justify-center gap-3">
                {[1, 2, 3, 4, 5].map((r) => (
                  <button key={r} onClick={() => setRating(r)}>
                    <Star className={`w-12 h-12 transition-colors ${r <= rating ? "text-yellow-400 fill-current" : "text-slate-200"}`} />
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={onClose}
              disabled={rating === 0}
              className="w-full py-5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xl transition-all shadow-xl shadow-purple-200 disabled:opacity-50 disabled:shadow-none"
            >
              Kirim Ulasan
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
