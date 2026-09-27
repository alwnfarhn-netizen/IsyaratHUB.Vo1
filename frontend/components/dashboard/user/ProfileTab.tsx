"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Edit3, Phone, Mail, MapPin, Shield, Star } from "lucide-react";

const MOCK_USER = {
  name: "Anita Rahman",
  avatar: "AR",
  email: "anita.rahman@gmail.com",
  phone: "+62 812-9988-7766",
  address: "Jl. Raya Wonokromo No. 45, Surabaya",
  memberSince: "September 2026",
  totalSessions: 4,
  favoriteJBI: "Budi Santoso",
};

export default function ProfileTab() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(MOCK_USER.name);
  const [phone, setPhone] = useState(MOCK_USER.phone);

  return (
    <div className="flex-1 w-full h-full pt-24 pb-8 px-6 lg:px-10 overflow-y-auto z-0 text-slate-300">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Profil Saya</h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              isEditing
                ? "bg-purple-600 text-white hover:bg-purple-700"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            <Edit3 className="w-4 h-4" />
            {isEditing ? "Simpan" : "Edit Profil"}
          </button>
        </div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl mb-5"
        >
          <div className="flex items-center gap-5 mb-6 pb-6 border-b border-slate-800">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg border-2 border-purple-500/30 shrink-0">
              {MOCK_USER.avatar}
            </div>
            <div>
              {isEditing ? (
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-slate-800 border border-purple-500 text-white text-xl font-bold rounded-xl px-3 py-1.5 outline-none w-full"
                />
              ) : (
                <h3 className="text-xl font-bold text-white">{name}</h3>
              )}
              <p className="text-sm text-slate-400 mt-0.5">Teman Tuli — Pengguna</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-500/15 text-purple-400 text-xs font-bold rounded-full border border-purple-500/20">
                  <Shield className="w-3 h-3" /> Member Aktif
                </span>
                <span className="text-xs text-slate-500">Sejak {MOCK_USER.memberSince}</span>
              </div>
            </div>
          </div>

          {/* Info Fields */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-slate-500 shrink-0" />
              <div className="flex-1">
                <label className="text-xs text-slate-500">Email</label>
                <p className="text-sm text-white font-medium mt-0.5">{MOCK_USER.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-slate-500 shrink-0" />
              <div className="flex-1">
                <label className="text-xs text-slate-500">Nomor Telepon</label>
                {isEditing ? (
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-0.5 w-full bg-slate-800 border border-purple-500/50 text-white text-sm font-medium rounded-lg px-3 py-1.5 outline-none"
                  />
                ) : (
                  <p className="text-sm text-white font-medium mt-0.5">{phone}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-slate-500 shrink-0" />
              <div className="flex-1">
                <label className="text-xs text-slate-500">Alamat / Domisili</label>
                <p className="text-sm text-white font-medium mt-0.5">{MOCK_USER.address}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 gap-4 mb-5"
        >
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 text-center">
            <p className="text-3xl font-bold text-white">{MOCK_USER.totalSessions}</p>
            <p className="text-xs text-slate-400 mt-1">Total Sesi</p>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 text-center">
            <div className="flex items-center justify-center gap-1 text-yellow-400 text-2xl font-bold">
              <Star className="w-5 h-5 fill-current" /> 4.8
            </div>
            <p className="text-xs text-slate-400 mt-1">Rata-rata Penilaian Anda ke JBI</p>
          </div>
        </motion.div>

        {/* Danger Zone */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-red-500/5 border border-red-500/20 rounded-2xl p-5"
        >
          <h4 className="text-sm font-semibold text-red-400 mb-1">Zona Berbahaya</h4>
          <p className="text-xs text-slate-500 mb-3">Menghapus akun Anda akan menghapus semua data riwayat secara permanen.</p>
          <button className="px-4 py-2 bg-red-500/10 text-red-400 text-sm font-medium rounded-xl border border-red-500/20 hover:bg-red-500/20 transition-colors">
            Hapus Akun
          </button>
        </motion.div>
      </div>
    </div>
  );
}
