"use client";

import { useState } from "react";
import { LogOut, User, Settings, HelpCircle, Info } from "lucide-react";
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
            <Info className="w-5 h-5 text-purple-400" /> Fitur ini sedang dalam pengembangan
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-32 h-32 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-5xl font-black mx-auto mb-6 shadow-sm border-4 border-white">
        B
      </div>
      <h2 className="text-3xl font-bold text-slate-800 mb-1">Budi</h2>
      <p className="text-slate-500 font-medium mb-10">budi@gmail.com</p>

      <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden text-left mb-6">
        <button onClick={handleComingSoon} className="w-full p-5 flex items-center gap-4 hover:bg-slate-50 transition-colors border-b border-slate-50">
          <User className="w-6 h-6 text-slate-400" />
          <span className="font-bold text-slate-700 text-lg">Edit Profil</span>
        </button>
        <button onClick={handleComingSoon} className="w-full p-5 flex items-center gap-4 hover:bg-slate-50 transition-colors border-b border-slate-50">
          <Settings className="w-6 h-6 text-slate-400" />
          <span className="font-bold text-slate-700 text-lg">Pengaturan</span>
        </button>
        <button onClick={handleComingSoon} className="w-full p-5 flex items-center gap-4 hover:bg-slate-50 transition-colors">
          <HelpCircle className="w-6 h-6 text-slate-400" />
          <span className="font-bold text-slate-700 text-lg">Bantuan</span>
        </button>
      </div>

      <Link href="/login" className="w-full p-5 bg-red-50 text-red-600 font-bold text-lg rounded-3xl flex justify-center items-center gap-2 hover:bg-red-100 transition-colors">
        <LogOut className="w-6 h-6" /> Keluar
      </Link>
    </div>
  );
}
