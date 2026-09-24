"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Lock, UserCircle2, HandMetal } from "lucide-react";

export default function LoginPage() {
  const [role, setRole] = useState<"deaf_user" | "jbi">("deaf_user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate navigation for preview purposes
    if (role === "deaf_user") {
      window.location.href = "/dashboard/user";
    } else {
      window.location.href = "/dashboard/jbi";
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

        <div className="relative z-10 w-full flex flex-col justify-center items-start px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-xl">
                <HandMetal className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-3xl font-bold text-white tracking-tight">IsyaratHUB</span>
            </div>
            <h1 className="text-5xl font-extrabold text-white leading-tight mb-6">
              Jembatan Komunikasi <br /> Tanpa Batas
            </h1>
            <p className="text-lg text-indigo-100 max-w-md">
              Temukan Juru Bahasa Isyarat profesional di sekitar Anda dengan cepat dan mudah, atau bergabunglah sebagai JBI untuk membantu komunitas.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 xl:p-24 bg-background">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <HandMetal className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-foreground">IsyaratHUB</span>
          </div>

          <h2 className="text-3xl font-bold mb-2">Selamat Datang</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8">Masuk ke akun Anda untuk melanjutkan.</p>

          {/* Role Toggle */}
          <div className="flex p-1 mb-8 bg-slate-100 dark:bg-slate-800 rounded-2xl">
            <button
              onClick={() => setRole("deaf_user")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 ${
                role === "deaf_user" 
                  ? "bg-white dark:bg-slate-700 text-purple-700 dark:text-purple-300 shadow-sm" 
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
              }`}
            >
              <UserCircle2 className="w-4 h-4" />
              Teman Tuli
            </button>
            <button
              onClick={() => setRole("jbi")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 ${
                role === "jbi" 
                  ? "bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm" 
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
              }`}
            >
              <HandMetal className="w-4 h-4" />
              JBI Profesional
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all dark:text-white"
                  placeholder="nama@email.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between ml-1">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
                <Link href="#" className="text-sm font-medium text-purple-600 hover:text-purple-500">
                  Lupa password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all dark:text-white"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className={`w-full py-3.5 rounded-2xl text-white font-semibold flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:-translate-y-0.5 ${
                role === 'deaf_user' 
                  ? 'bg-purple-600 hover:bg-purple-700 shadow-purple-600/30' 
                  : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/30'
              }`}
            >
              Masuk
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
            Belum punya akun?{" "}
            <Link href="/register" className={`font-semibold ${role === 'deaf_user' ? 'text-purple-600' : 'text-emerald-600'} hover:underline`}>
              Daftar sekarang
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
