"use client";

import { useState, useEffect } from "react";
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
      <div className="fixed inset-0 z-[100] bg-slate-50 flex flex-col items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md flex flex-col items-center">
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
  
  useEffect(() => {
    const timer = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full text-center">
      <div className="w-28 h-28 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center text-5xl font-black border-4 border-white shadow-md mx-auto mb-6">
        {jbiAvatar}
      </div>
      <h2 className="text-3xl font-bold text-slate-800 mb-2">Sesi Berlangsung</h2>
      <p className="text-slate-500 font-medium mb-10 text-lg">bersama {jbiName}</p>
      
      <div className="bg-white border border-slate-200 px-10 py-8 rounded-[2.5rem] shadow-sm mb-12">
        <p className="text-slate-400 font-bold mb-2 uppercase tracking-wider text-sm">Durasi</p>
        <div className="text-6xl font-mono font-black text-purple-600 tracking-tight">
          {formatTime(seconds)}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 w-full">
        <button className="py-5 rounded-2xl bg-red-50 text-red-600 font-bold border border-red-100 hover:bg-red-100 transition-colors flex flex-col items-center gap-2 text-lg">
           <Phone className="w-7 h-7" /> Darurat
        </button>
        <button onClick={onComplete} className="py-5 rounded-2xl bg-purple-600 text-white hover:bg-purple-700 font-bold shadow-lg shadow-purple-200 transition-colors flex flex-col items-center gap-2 text-lg">
           <CheckCircle2 className="w-7 h-7" /> Selesai
        </button>
      </div>
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
