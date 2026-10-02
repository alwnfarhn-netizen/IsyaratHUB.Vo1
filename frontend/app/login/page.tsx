"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Mail, Lock, HandMetal, CheckCircle2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulasi login sementara tanpa backend
    // Jika email mengandung kata 'jbi' atau 'mitra', arahkan ke dashboard JBI
    if (email.toLowerCase().includes("jbi") || email.toLowerCase().includes("mitra")) {
      window.location.href = "/dashboard/jbi";
    } else {
      window.location.href = "/dashboard/user";
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Side: Branding / Visual (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-emerald-500">
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Abstract decorative circles */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />

        <div className="absolute top-8 left-8 z-20">
          <Link href="/" className="flex items-center gap-2 text-white/80 hover:text-white font-medium transition-colors">
            <ArrowLeft className="w-5 h-5" /> Kembali ke Beranda
          </Link>
        </div>

        <div className="relative z-10 w-full flex flex-col justify-center items-start px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 relative flex items-center justify-center drop-shadow-lg">
                <img src="/logo_transparan.webp" alt="IsyaratHUB" className="w-full h-full object-contain" />
              </div>
              <span className="text-3xl font-bold text-white tracking-tight">IsyaratHUB</span>
            </div>
            <h1 className="text-5xl font-extrabold text-white leading-tight mb-6">
              Jembatan Komunikasi <br /> Tanpa Batas
            </h1>
            <p className="text-lg text-indigo-100 max-w-md mb-6">
              Platform on-demand terdepan yang menghubungkan Teman Tuli dengan Juru Bahasa Isyarat secara real-time.
            </p>
            <div className="flex flex-col gap-3 text-sm text-indigo-100/80">
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Pencarian berbasis lokasi (GPS)</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> JBI tersertifikasi dan terverifikasi</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Transparansi biaya & rating</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 py-12 sm:px-12 xl:px-24 bg-background relative">
        {/* Mobile Header with Back Button */}
        <div className="lg:hidden absolute top-6 left-6 right-6 flex items-center justify-between">
          <Link href="/" className="p-2 -ml-2 text-slate-500 hover:text-slate-800 transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 relative flex items-center justify-center">
              <img src="/logo_transparan.webp" alt="IsyaratHUB" className="w-full h-full object-contain drop-shadow-sm" />
            </div>
            <span className="text-xl font-bold text-foreground">IsyaratHUB</span>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-full max-w-md mx-auto mt-12 lg:mt-0"
        >
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">Selamat Datang</h2>
            <p className="text-base text-slate-500 dark:text-slate-400">Masuk ke akun Anda untuk melanjutkan.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1 block">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-6 w-6 text-slate-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all text-base dark:text-white shadow-sm"
                  placeholder="nama@email.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block">Password</label>
                <Link href="#" className="text-sm font-medium text-purple-600 hover:text-purple-500">
                  Lupa password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-6 w-6 text-slate-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all text-base dark:text-white shadow-sm"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 mt-4 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-lg flex items-center justify-center gap-2 transition-all hover:shadow-xl hover:shadow-purple-600/20 active:scale-[0.98]"
            >
              Masuk
              <ArrowRight className="w-6 h-6" />
            </button>
          </form>

          <div className="mt-10 text-center text-base text-slate-500 dark:text-slate-400">
            Belum punya akun?{" "}
            <Link href="/register" className="font-bold text-purple-600 hover:text-purple-700 hover:underline transition-colors">
              Daftar sekarang
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
