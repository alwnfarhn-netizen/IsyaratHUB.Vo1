"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit3, Phone, Mail, MapPin, Shield, Star, Award, Wallet, ChevronRight, X, Building, CheckCircle2 } from "lucide-react";
import { MOCK_JBI_PROFILE } from "@/lib/mockData";

export default function ProfileTab() {
  const [isEditing, setIsEditing] = useState(false);
  const [specialty, setSpecialty] = useState(MOCK_JBI_PROFILE.specialty);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [withdrawStatus, setWithdrawStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleWithdraw = () => {
    setWithdrawStatus("loading");
    setTimeout(() => setWithdrawStatus("success"), 1500);
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(amount);

  return (
    <div className="flex-1 p-6 md:p-8 overflow-y-auto">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Profil JBI Saya</h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              isEditing
                ? "bg-emerald-600 text-white hover:bg-emerald-700"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <Edit3 className="w-4 h-4" />
            {isEditing ? "Simpan" : "Edit Profil"}
          </button>
        </div>

        {/* Profile Hero */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm mb-5"
        >
          <div className="flex items-start gap-5">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center text-2xl font-bold border border-emerald-200 shrink-0">
              {MOCK_JBI_PROFILE.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold text-slate-800">{MOCK_JBI_PROFILE.name}</h3>
              <p className="text-sm text-slate-500 mt-0.5">Juru Bahasa Isyarat Profesional</p>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200">
                  <Shield className="w-3 h-3" /> Terverifikasi
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-50 text-yellow-700 text-xs font-bold rounded-full border border-yellow-200">
                  <Star className="w-3 h-3 fill-current" /> {MOCK_JBI_PROFILE.rating} Rating
                </span>
                <span className="text-xs text-slate-400">Sejak {MOCK_JBI_PROFILE.verifiedSince}</span>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-5 border-t border-slate-100 space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="text-slate-700">{MOCK_JBI_PROFILE.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="text-slate-700">{MOCK_JBI_PROFILE.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="text-slate-700">{MOCK_JBI_PROFILE.location}</span>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <Award className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="text-slate-500 text-xs">Spesialisasi</span>
                {isEditing ? (
                  <input
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    className="mt-1 w-full border border-emerald-400 rounded-lg px-3 py-1.5 text-sm outline-none text-slate-800"
                  />
                ) : (
                  <p className="text-slate-700 font-medium">{specialty}</p>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Sertifikat */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm mb-5"
        >
          <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-600" /> Sertifikat & Verifikasi
          </h4>
          <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
            <div>
              <p className="text-sm font-semibold text-slate-800">{MOCK_JBI_PROFILE.certName}</p>
              <p className="text-xs text-slate-500 mt-0.5">No. {MOCK_JBI_PROFILE.certNumber}</p>
            </div>
            <span className="px-2.5 py-1 bg-emerald-600 text-white text-xs font-bold rounded-lg">✓ Verified</span>
          </div>
        </motion.div>

        {/* Stats & Wallet */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="grid grid-cols-2 gap-4 mb-5"
        >
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm text-center">
            <p className="text-3xl font-bold text-slate-800">{MOCK_JBI_PROFILE.totalSessions}</p>
            <p className="text-xs text-slate-500 mt-1">Total Sesi Selesai</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm text-center">
            <p className="text-xl font-bold text-emerald-600">{MOCK_JBI_PROFILE.ratePerHour}</p>
            <p className="text-xs text-slate-500 mt-1">Tarif per Jam</p>
          </div>
        </motion.div>

        {/* Wallet Preview */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16 }}
          className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-5 shadow-md text-white mb-5"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-100 text-sm">Saldo Wallet</p>
              <p className="text-3xl font-bold mt-1">{formatCurrency(MOCK_JBI_PROFILE.walletBalance)}</p>
            </div>
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
              <Wallet className="w-7 h-7 text-white" />
            </div>
          </div>
          <button onClick={() => setShowWithdraw(true)} className="mt-4 w-full bg-white/20 hover:bg-white/30 transition-colors rounded-xl py-2.5 text-sm font-semibold flex items-center justify-center gap-2">
            Tarik Saldo <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>

        {/* Reviews */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm"
        >
          <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-500 fill-current" /> Ulasan Pengguna
          </h4>
          <div className="space-y-3">
            {MOCK_JBI_PROFILE.reviews.map((review, i) => (
              <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-semibold text-slate-800">{review.from}</p>
                  <div className="flex">
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">"{review.comment}"</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Withdraw Modal */}
      <AnimatePresence>
        {showWithdraw && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => withdrawStatus === 'idle' && setShowWithdraw(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-md bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
              <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h2 className="text-lg font-bold text-slate-800">Tarik Saldo</h2>
                <button onClick={() => setShowWithdraw(false)} disabled={withdrawStatus !== 'idle'} className="p-2 text-slate-400 hover:bg-slate-200 rounded-full transition-colors disabled:opacity-50">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6">
                {withdrawStatus === "success" ? (
                  <div className="text-center py-6">
                    <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Penarikan Berhasil Diproses!</h3>
                    <p className="text-sm text-slate-500 mb-6">Dana sebesar {formatCurrency(MOCK_JBI_PROFILE.walletBalance)} sedang ditransfer ke rekening BCA Anda. Biasanya masuk dalam 1x24 jam kerja.</p>
                    <button onClick={() => { setShowWithdraw(false); setWithdrawStatus("idle"); }} className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition-colors">Tutup</button>
                  </div>
                ) : (
                  <>
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6 text-center">
                      <p className="text-xs text-emerald-700 font-semibold mb-1">Saldo Tersedia</p>
                      <p className="text-3xl font-bold text-emerald-600">{formatCurrency(MOCK_JBI_PROFILE.walletBalance)}</p>
                    </div>
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center gap-4 p-4 border border-slate-200 rounded-xl">
                        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center"><Building className="w-5 h-5" /></div>
                        <div>
                          <p className="text-sm font-bold text-slate-800">Bank BCA</p>
                          <p className="text-xs text-slate-500">**** **** 1234 • A.n Budi Santoso</p>
                        </div>
                      </div>
                    </div>
                    <button onClick={handleWithdraw} disabled={withdrawStatus === 'loading'} className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center justify-center transition-colors">
                      {withdrawStatus === 'loading' ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : "Tarik Semua Saldo"}
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
