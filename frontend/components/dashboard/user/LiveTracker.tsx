"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, CheckCircle2, Clock, Navigation, User, Video, Phone, Star } from "lucide-react";
import { useRouter } from "next/navigation";

const STEPS = [
  { id: "searching",          label: "Mencari JBI...",              sub: "Sistem sedang mencocokkan Anda dengan JBI terdekat.",          icon: <Clock className="w-6 h-6" /> },
  { id: "heading_to_location", label: "JBI Sedang Menuju Lokasi",  sub: "Budi Santoso telah menerima permintaan dan sedang dalam perjalanan.", icon: <Navigation className="w-6 h-6" /> },
  { id: "arrived",            label: "JBI Sudah Tiba!",             sub: "Budi Santoso sudah berada di RS dr. Soetomo. Segera temui di lobby.", icon: <MapPin className="w-6 h-6" /> },
  { id: "in_progress",        label: "Sesi Berlangsung",            sub: "Sesi pendampingan sedang berjalan. Semoga lancar!",            icon: <User className="w-6 h-6" /> },
  { id: "completed",          label: "Sesi Selesai!",              sub: "Terima kasih telah menggunakan IsyaratHUB.",                  icon: <CheckCircle2 className="w-6 h-6" /> },
];

const stepColors: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  searching:           { bg: "bg-amber-500/15",  text: "text-amber-400",   border: "border-amber-500/30",  glow: "shadow-amber-500/20"  },
  heading_to_location: { bg: "bg-blue-500/15",   text: "text-blue-400",    border: "border-blue-500/30",   glow: "shadow-blue-500/20"   },
  arrived:             { bg: "bg-purple-500/15", text: "text-purple-400",  border: "border-purple-500/30", glow: "shadow-purple-500/20" },
  in_progress:         { bg: "bg-emerald-500/15",text: "text-emerald-400", border: "border-emerald-500/30",glow: "shadow-emerald-500/20"},
  completed:           { bg: "bg-emerald-500/15",text: "text-emerald-400", border: "border-emerald-500/30",glow: "shadow-emerald-500/20"},
};

interface LiveTrackerProps {
  jbiName: string;
  jbiAvatar: string;
  location: string;
  onClose: () => void;
}

export default function LiveTracker({ jbiName, jbiAvatar, location, onClose }: LiveTrackerProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState(0);

  // Auto-advance steps for demo purposes
  useEffect(() => {
    if (currentStep >= 3) return; // Stop auto-advance at "in_progress" (index 3)
    const delays = [3000, 4000, 3000]; // Searching, Heading, Arrived
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
  const colors = stepColors[step.id];

  // Fase 3 & 4 (Fullscreen View)
  if (currentStep >= 3) {
    return (
      <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md flex flex-col items-center"
        >
          {step.id === "in_progress" ? (
            <InSessionView 
              jbiName={jbiName} 
              jbiAvatar={jbiAvatar} 
              onComplete={() => setCurrentStep(4)} 
            />
          ) : (
            <PostSessionRatingView 
              jbiName={jbiName} 
              onClose={onClose} 
              showRating={showRating} 
              rating={rating} 
              setRating={setRating} 
            />
          )}
        </motion.div>
      </div>
    );
  }

  // Fase 1 & 2 (Modal over Map)
  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />

      {/* Tracker Card */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 60, scale: 0.97 }}
        className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Top Color Bar */}
        <div className={`h-1.5 w-full ${colors.bg.replace("/15", "").replace("bg-", "bg-")} transition-all duration-500`}
          style={{ background: step.id === "searching" ? "#f59e0b" : step.id === "heading_to_location" ? "#60a5fa" : step.id === "arrived" ? "#a78bfa" : "#34d399" }}
        />

        {/* JBI Info Header */}
        <div className="p-5 border-b border-slate-800 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-purple-600/20 text-purple-400 flex items-center justify-center text-xl font-bold border border-purple-500/30">
            {jbiAvatar}
          </div>
          <div>
            <h3 className="font-bold text-white">{jbiName}</h3>
            <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1"><MapPin className="w-3 h-3" />{location}</p>
          </div>
          <div className="ml-auto flex flex-col items-end gap-1">
            <div className="flex items-center gap-1 text-yellow-400 text-sm font-bold">
              <Star className="w-4 h-4 fill-current" /> 4.9
            </div>
            <span className="text-xs text-emerald-400">Rp 75.000/jam</span>
          </div>
        </div>

        {/* Current Status */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className={`flex items-start gap-4 p-4 rounded-2xl border ${colors.bg} ${colors.border} shadow-lg ${colors.glow} mb-5`}
            >
              <div className={`${colors.text} shrink-0 mt-0.5 ${step.id === "searching" ? "animate-pulse" : ""}`}>
                {step.icon}
              </div>
              <div>
                <p className={`font-bold text-base ${colors.text}`}>{step.label}</p>
                <p className="text-sm text-slate-400 mt-0.5 leading-relaxed">{step.sub}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-6 px-2">
            {STEPS.slice(0, -1).map((s, i) => (
              <div key={s.id} className="flex items-center flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
                  i < currentStep ? "bg-emerald-500 text-white" :
                  i === currentStep ? "bg-purple-600 text-white ring-2 ring-purple-400 ring-offset-2 ring-offset-slate-900" :
                  "bg-slate-800 text-slate-600"
                }`}>
                  {i < currentStep ? <CheckCircle2 className="w-4 h-4" /> : <span className="text-xs font-bold">{i + 1}</span>}
                </div>
                {i < STEPS.length - 2 && (
                  <div className={`flex-1 h-0.5 mx-1 transition-all duration-700 ${i < currentStep ? "bg-emerald-500" : "bg-slate-800"}`} />
                )}
              </div>
            ))}
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium transition-all"
          >
            Tutup & Lacak di Latar Belakang
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// Komponen Pembantu: Layar Sesi Berlangsung (Fase 3)
function InSessionView({ jbiName, jbiAvatar, onComplete }: { jbiName: string, jbiAvatar: string, onComplete: () => void }) {
  const [seconds, setSeconds] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${h > 0 ? h + ':' : ''}${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <div className="w-24 h-24 rounded-full bg-purple-600/20 text-purple-400 flex items-center justify-center text-3xl font-bold border-4 border-purple-500/30 mb-6 shadow-xl shadow-purple-900/20">
        {jbiAvatar}
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">Sesi Bersama {jbiName}</h2>
      <p className="text-slate-400 mb-10 text-center text-sm px-4">
        Peta telah disembunyikan. Fokus pada layanan pendampingan Anda.
      </p>
      
      <div className="bg-slate-900 border border-slate-800 px-10 py-6 rounded-3xl shadow-2xl mb-12">
        <p className="text-center text-slate-500 text-sm font-medium mb-2 uppercase tracking-wider">Durasi Berjalan</p>
        <div className="text-5xl font-mono font-bold text-emerald-400 tracking-wider">
          {formatTime(seconds)}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 w-full">
        <button className="py-4 rounded-2xl bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 font-bold border border-rose-500/20 transition-colors flex flex-col items-center gap-2">
           <Phone className="w-6 h-6 mb-1" /> Darurat
        </button>
        <button onClick={onComplete} className="py-4 rounded-2xl bg-purple-600 text-white hover:bg-purple-700 font-bold shadow-lg shadow-purple-900/50 transition-colors flex flex-col items-center gap-2">
           <CheckCircle2 className="w-6 h-6 mb-1" /> Selesai
        </button>
      </div>
    </>
  );
}

// Komponen Pembantu: Layar Rating (Fase 4)
function PostSessionRatingView({ jbiName, onClose, showRating, rating, setRating }: { jbiName: string, onClose: () => void, showRating: boolean, rating: number, setRating: (r: number) => void }) {
  return (
    <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl w-full text-center">
      <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 className="w-10 h-10" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">Sesi Selesai!</h2>
      <p className="text-slate-400 mb-8">Terima kasih telah menggunakan layanan IsyaratHUB.</p>
      
      <AnimatePresence>
        {showRating && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div>
              <p className="text-slate-300 font-medium mb-4">Bagaimana kinerja {jbiName}?</p>
              <div className="flex justify-center gap-3">
                {[1, 2, 3, 4, 5].map((r) => (
                  <button key={r} onClick={() => setRating(r)}>
                    <Star className={`w-10 h-10 transition-colors ${r <= rating ? "text-yellow-400 fill-current" : "text-slate-700"}`} />
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={onClose}
              disabled={rating === 0}
              className="w-full py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-all disabled:opacity-50"
            >
              Kirim Ulasan & Kembali
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
