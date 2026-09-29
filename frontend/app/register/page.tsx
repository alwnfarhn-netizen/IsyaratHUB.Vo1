"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Mail, Lock, UserCircle2, HandMetal, User, UploadCloud, FileText, Building2 } from "lucide-react";

type RoleType = "deaf_user" | "umum" | "jbi";

export default function RegisterPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [role, setRole] = useState<RoleType>("deaf_user"); // Default, only used in step 2
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [certificate, setCertificate] = useState<File | null>(null);
  const [acceptedTos, setAcceptedTos] = useState(false);

  const handleSelectRole = (selectedRole: RoleType) => {
    setRole(selectedRole);
    setStep(2);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === "jbi") {
      window.location.href = "/dashboard/jbi";
    } else {
      window.location.href = "/dashboard/user";
    }
  };

  const getThemeColor = () => {
    if (role === 'deaf_user') return 'purple';
    if (role === 'umum') return 'blue';
    return 'emerald';
  };
  
  const theme = getThemeColor();
  const themeClasses = {
    purple: "bg-purple-600 hover:bg-purple-700 text-purple-600 focus:ring-purple-500",
    blue: "bg-blue-600 hover:bg-blue-700 text-blue-600 focus:ring-blue-500",
    emerald: "bg-emerald-600 hover:bg-emerald-700 text-emerald-600 focus:ring-emerald-500",
  };

  return (
    <div className="min-h-screen flex bg-background flex-row-reverse">
      {/* Right Side: Branding / Visual (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-bl from-emerald-500 via-teal-600 to-indigo-700">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />

        <div className="absolute top-8 right-8 z-20">
          <Link href="/" className="flex items-center gap-2 text-white/80 hover:text-white font-medium transition-colors">
            Kembali ke Beranda <ArrowRight className="w-5 h-5 rotate-180" />
          </Link>
        </div>

        <div className="relative z-10 w-full flex flex-col justify-center items-start px-20 text-right">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="ml-auto flex flex-col items-end"
          >
            <div className="flex items-center gap-3 mb-8 flex-row-reverse">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-xl">
                <UserCircle2 className="w-6 h-6 text-teal-600" />
              </div>
              <span className="text-3xl font-bold text-white tracking-tight">IsyaratHUB</span>
            </div>
            <h1 className="text-5xl font-extrabold text-white leading-tight mb-6 text-right">
              Mulai Perjalanan <br /> Inklusif Anda
            </h1>
            <p className="text-lg text-teal-50 max-w-md text-right">
              Daftar sekarang dan jadilah bagian dari ekosistem yang menghubungkan dunia melalui bahasa isyarat.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Left Side: Register Form */}
      <div className="w-full lg:w-1/2 flex flex-col px-6 py-12 sm:px-12 xl:px-24 bg-background relative overflow-y-auto">
        {/* Mobile Header with Back Button */}
        <div className="lg:hidden absolute top-6 left-6 right-6 flex items-center justify-between z-10">
          <button 
            onClick={() => step === 2 ? setStep(1) : window.location.href = "/"}
            className="p-2 -ml-2 text-slate-500 hover:text-slate-800 transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
              <UserCircle2 className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">IsyaratHUB</span>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center max-w-md w-full mx-auto mt-12 lg:mt-0">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="w-full"
              >
                <div className="mb-10 text-center lg:text-left">
                  <h2 className="text-3xl sm:text-4xl font-bold mb-3">Pilih Peran Anda</h2>
                  <p className="text-base text-slate-500 dark:text-slate-400">Bagaimana Anda akan menggunakan IsyaratHUB?</p>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={() => handleSelectRole("deaf_user")}
                    className="w-full p-6 bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl flex items-center gap-5 hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all text-left active:scale-[0.98]"
                  >
                    <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/50 rounded-2xl flex items-center justify-center shrink-0">
                      <UserCircle2 className="w-7 h-7 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">Teman Tuli</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Saya butuh bantuan Juru Bahasa Isyarat.</p>
                    </div>
                  </button>

                  <button
                    onClick={() => handleSelectRole("umum")}
                    className="w-full p-6 bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl flex items-center gap-5 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all text-left active:scale-[0.98]"
                  >
                    <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/50 rounded-2xl flex items-center justify-center shrink-0">
                      <Building2 className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">Umum / Instansi</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Saya butuh JBI untuk acara/kegiatan.</p>
                    </div>
                  </button>

                  <button
                    onClick={() => handleSelectRole("jbi")}
                    className="w-full p-6 bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl flex items-center gap-5 hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all text-left active:scale-[0.98]"
                  >
                    <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/50 rounded-2xl flex items-center justify-center shrink-0">
                      <HandMetal className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">Mitra JBI</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Saya ingin menjadi Juru Bahasa Isyarat.</p>
                    </div>
                  </button>
                </div>

                <div className="mt-10 text-center text-base text-slate-500 dark:text-slate-400">
                  Sudah punya akun?{" "}
                  <Link href="/login" className="font-bold text-teal-600 hover:text-teal-700 hover:underline transition-colors">
                    Masuk di sini
                  </Link>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                className="w-full"
              >
                <div className="mb-10 text-center lg:text-left">
                  <h2 className="text-3xl sm:text-4xl font-bold mb-3">Lengkapi Data</h2>
                  <p className="text-base text-slate-500 dark:text-slate-400">
                    Mendaftar sebagai <span className={`font-bold text-${theme}-600`}>{role === 'deaf_user' ? 'Teman Tuli' : role === 'umum' ? 'Umum/Instansi' : 'Mitra JBI'}</span>.
                  </p>
                </div>

                <form onSubmit={handleRegister} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1 block">Nama Lengkap</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className="h-6 w-6 text-slate-400" />
                      </div>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={`w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-${theme}-500/20 focus:border-${theme}-500 outline-none transition-all text-base dark:text-white shadow-sm`}
                        placeholder="Nama Lengkap"
                        required
                      />
                    </div>
                  </div>

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
                        className={`w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-${theme}-500/20 focus:border-${theme}-500 outline-none transition-all text-base dark:text-white shadow-sm`}
                        placeholder="nama@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1 block">Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="h-6 w-6 text-slate-400" />
                      </div>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-${theme}-500/20 focus:border-${theme}-500 outline-none transition-all text-base dark:text-white shadow-sm`}
                        placeholder="••••••••"
                        required
                      />
                    </div>
                  </div>

                  {role === "jbi" && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }} 
                      animate={{ opacity: 1, height: "auto" }} 
                      className="space-y-2 pt-2"
                    >
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1 block">Unggah Sertifikat JBI</label>
                      <div className="relative border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-6 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors active:scale-[0.98]">
                        <input
                          type="file"
                          accept=".pdf,image/*"
                          onChange={(e) => setCertificate(e.target.files?.[0] || null)}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          required
                        />
                        {certificate ? (
                          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                            <FileText className="w-8 h-8" />
                            <span className="text-base font-medium truncate max-w-[200px]">{certificate.name}</span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center text-slate-500">
                            <UploadCloud className="w-10 h-10 mb-3 text-slate-400" />
                            <span className="text-base font-medium">Ketuk untuk unggah</span>
                            <span className="text-sm text-slate-400 mt-1">PDF, JPG (Max 5MB)</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}

                  <div className="flex items-start gap-3 mt-6 mb-2">
                    <input 
                      type="checkbox" 
                      id="tos" 
                      checked={acceptedTos}
                      onChange={(e) => setAcceptedTos(e.target.checked)}
                      required 
                      className={`mt-1.5 w-5 h-5 rounded border-slate-300 shrink-0 cursor-pointer focus:ring-2 text-${theme}-600 focus:ring-${theme}-600`} 
                    />
                    <label htmlFor="tos" className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed cursor-pointer select-none">
                      Saya menyetujui <Link href="/terms" target="_blank" className={`font-bold hover:underline text-${theme}-600`}>Syarat & Ketentuan</Link> dan <Link href="/privacy" target="_blank" className={`font-bold hover:underline text-${theme}-600`}>Kebijakan Privasi</Link>.
                    </label>
                  </div>

                  <button
                    type="submit"
                    className={`w-full py-4 mt-6 rounded-2xl text-white font-bold text-lg flex items-center justify-center gap-2 transition-all hover:shadow-xl active:scale-[0.98] ${
                      role === 'deaf_user' ? 'bg-purple-600 hover:bg-purple-700 hover:shadow-purple-600/20' : 
                      role === 'umum' ? 'bg-blue-600 hover:bg-blue-700 hover:shadow-blue-600/20' : 
                      'bg-emerald-600 hover:bg-emerald-700 hover:shadow-emerald-600/20'
                    }`}
                  >
                    Daftar Sekarang
                    <ArrowRight className="w-6 h-6" />
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
