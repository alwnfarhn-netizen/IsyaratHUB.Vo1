"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  HandMetal, MapPin, Clock, Shield, Star, ChevronRight, CheckCircle2,
  Zap, Users, Award, ArrowRight
} from "lucide-react";

const features = [
  { icon: <MapPin className="w-6 h-6" />, title: "Berbasis Lokasi", desc: "Temukan JBI terdekat dari titik Anda saat ini menggunakan algoritma geolokasi PostGIS yang akurat." },
  { icon: <Zap className="w-6 h-6" />, title: "On-Demand Instan", desc: "Tidak perlu pesan 3–7 hari sebelumnya. JBI hadir dalam hitungan menit sesuai kebutuhan mendadak Anda." },
  { icon: <Shield className="w-6 h-6" />, title: "JBI Terverifikasi", desc: "Semua mitra JBI telah melalui proses verifikasi sertifikat oleh tim IsyaratHUB sebelum aktif." },
  { icon: <Clock className="w-6 h-6" />, title: "Live Tracking", desc: "Pantau status JBI secara real-time — dari Menuju Lokasi, Tiba, hingga Sesi Berlangsung." },
];

const stats = [
  { value: "20+", label: "Mitra JBI Aktif" },
  { value: "50+", label: "Sesi Berhasil" },
  { value: "4.9★", label: "Rating Rata-rata" },
  { value: "Surabaya", label: "Kota Pilot 2026" },
];

const howItWorks = [
  { step: "01", title: "Buka IsyaratHUB", desc: "Akses lewat browser tanpa perlu mengunduh aplikasi (PWA)." },
  { step: "02", title: "Tentukan Lokasi", desc: "Geser pin di peta ke titik pertemuan yang Anda inginkan." },
  { step: "03", title: "Klik Cari JBI", desc: "Sistem otomatis mencarikan JBI terdekat yang tersedia." },
  { step: "04", title: "Sesi Berlangsung", desc: "JBI tiba di lokasi Anda. Sesi pendampingan dimulai!" },
];

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } };

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans overflow-x-hidden">

      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-900/40">
              <HandMetal className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">IsyaratHUB</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-slate-400">
            <a href="#fitur" className="hover:text-white transition-colors">Fitur</a>
            <a href="#cara-kerja" className="hover:text-white transition-colors">Cara Kerja</a>
            <a href="#tentang" className="hover:text-white transition-colors">Tentang</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-slate-300 hover:text-white transition-colors px-4 py-2 rounded-xl hover:bg-white/5">
              Masuk
            </Link>
            <Link href="/register" className="text-sm font-semibold bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl transition-all hover:shadow-lg hover:shadow-purple-900/40">
              Daftar Gratis
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-24 px-6 text-center overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-700/20 rounded-full blur-3xl" />
          <div className="absolute top-40 left-1/4 w-64 h-64 bg-indigo-700/15 rounded-full blur-3xl" />
          <div className="absolute top-40 right-1/4 w-64 h-64 bg-emerald-700/10 rounded-full blur-3xl" />
        </div>

        <motion.div
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.12 } } }}
          initial="hidden"
          animate="show"
          className="relative max-w-4xl mx-auto"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold px-4 py-2 rounded-full mb-6">
            <Zap className="w-3.5 h-3.5" /> Proyek Sosial PFmuda 2026 — Pertamina Foundation
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 tracking-tight">
            JBI{" "}
            <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent">
              On-Demand
            </span>{" "}
            untuk
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Teman Tuli
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
            IsyaratHUB menghubungkan Teman Tuli dengan Juru Bahasa Isyarat terdekat secara <strong className="text-white">real-time berbasis geolokasi</strong> — layaknya aplikasi ojek online, tapi untuk komunikasi inklusif.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-4 rounded-2xl transition-all hover:shadow-2xl hover:shadow-purple-900/40 hover:-translate-y-0.5"
            >
              Mulai Sekarang — Gratis <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/login"
              className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold px-8 py-4 rounded-2xl transition-all"
            >
              Masuk ke Akun
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-6 mt-10 text-sm text-slate-500">
            {["Zero-install via browser", "Bersertifikat sebagai JBI", "Tarif Transparan"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {t}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── STATS ── */}
      <section className="border-y border-white/5 bg-white/2 py-10 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <p className="text-3xl font-extrabold text-white">{s.value}</p>
              <p className="text-sm text-slate-500 mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="fitur" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl font-extrabold mb-4">Platform Komunikasi Inklusif</h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">Dirancang khusus untuk memenuhi kebutuhan nyata Teman Tuli di Indonesia.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white/3 hover:bg-white/5 border border-white/8 rounded-3xl p-6 group transition-all hover:border-purple-500/30"
              >
                <div className="w-12 h-12 rounded-2xl bg-purple-600/15 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="cara-kerja" className="py-24 px-6 bg-white/2 border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl font-extrabold mb-4">Cara Kerja</h2>
            <p className="text-slate-400 text-lg">Dapatkan JBI dalam 4 langkah mudah.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {howItWorks.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center shadow-xl shadow-black/20"
              >
                <div className="w-16 h-16 mx-auto bg-purple-500/20 text-purple-400 font-black text-2xl flex items-center justify-center rounded-2xl mb-4 border border-purple-500/30">
                  {step.step}
                </div>
                <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOR JBI CTA ── */}
      <section id="tentang" className="py-24 px-6">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          {/* For Deaf User */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-purple-600/20 to-indigo-600/10 border border-purple-500/20 rounded-3xl p-8"
          >
            <Users className="w-10 h-10 text-purple-400 mb-4" />
            <h3 className="text-2xl font-bold mb-3">Saya Teman Tuli</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">Cari JBI kapanpun dan dimanapun Anda butuhkan di Surabaya. Transparan, cepat, dan aman.</p>
            <Link href="/register" className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-xl transition-all text-sm">
              Daftar sebagai Pengguna <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
          {/* For JBI */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-emerald-600/20 to-teal-600/10 border border-emerald-500/20 rounded-3xl p-8"
          >
            <Award className="w-10 h-10 text-emerald-400 mb-4" />
            <h3 className="text-2xl font-bold mb-3">Saya Juru Bahasa Isyarat</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">Bergabunglah sebagai mitra. Kelola ketersediaan Anda, terima penugasan, dan dapatkan penghasilan transparan (90% komisi untuk Anda).</p>
            <Link href="/register" className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-xl transition-all text-sm">
              Daftar sebagai JBI <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/5 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <HandMetal className="w-4 h-4 text-purple-500" />
            <span className="font-semibold text-slate-400">IsyaratHUB</span>
            <span>— Proyek Sosial PFmuda 2026</span>
          </div>
          <p>© 2026 Tim IsyaratHUB · Surabaya, Jawa Timur</p>
        </div>
      </footer>
    </div>
  );
}
