"use client";

import { useState } from "react";
import { LogOut, Settings, HelpCircle, Star, Award, Info } from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

export default function ProfileTab() {
  const [showComingSoon, setShowComingSoon] = useState(false);

  const handleComingSoon = () => {
    setShowComingSoon(true);
    setTimeout(() => setShowComingSoon(false), 2000);
  };

  return (
    <div className="flex-1 w-full max-w-2xl mx-auto pb-24 text-center relative">
      <AnimatePresence>
        {showComingSoon && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-6 py-3 rounded-full font-bold shadow-xl flex items-center gap-2 z-50"
          >
            <Info className="w-5 h-5 text-emerald-400" /> Fitur ini sedang dalam pengembangan
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-32 h-32 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-5xl font-black mx-auto mb-6 shadow-sm border-4 border-white relative">
        BS
        <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-yellow-900 w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-sm">
          <Award className="w-5 h-5" />
        </div>
      </div>
      <h2 className="text-3xl font-bold text-slate-800 mb-1">Budi Santoso</h2>
      <p className="text-slate-500 font-medium mb-4">Mitra JBI Level 3</p>
      
      <div className="flex justify-center items-center gap-6 mb-10">
        <div className="text-center">
          <p className="text-2xl font-black text-slate-800">4.9</p>
          <p className="text-sm text-slate-500 font-bold flex items-center gap-1"><Star className="w-4 h-4 text-yellow-400 fill-current" /> Rating</p>
        </div>
        <div className="w-px h-10 bg-slate-200"></div>
        <div className="text-center">
          <p className="text-2xl font-black text-slate-800">124</p>
          <p className="text-sm text-slate-500 font-bold">Sesi Selesai</p>
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden text-left mb-6">
        <button onClick={handleComingSoon} className="w-full p-5 flex items-center gap-4 hover:bg-slate-50 transition-colors border-b border-slate-50">
          <Settings className="w-6 h-6 text-slate-400" />
          <span className="font-bold text-slate-700 text-lg">Pengaturan Akun</span>
        </button>
        <button onClick={handleComingSoon} className="w-full p-5 flex items-center gap-4 hover:bg-slate-50 transition-colors">
          <HelpCircle className="w-6 h-6 text-slate-400" />
          <span className="font-bold text-slate-700 text-lg">Bantuan Mitra</span>
        </button>
      </div>

      <Link href="/login" className="w-full p-5 bg-red-50 text-red-600 font-bold text-lg rounded-3xl flex justify-center items-center gap-2 hover:bg-red-100 transition-colors">
        <LogOut className="w-6 h-6" /> Keluar
      </Link>
    </div>
  );
}
