"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  HandMetal, MapPin, Clock, Shield, Star, ChevronRight, CheckCircle2,
  Zap, Users, Award, ArrowRight
} from "lucide-react";

const features = [
  { icon: <MapPin className="w-6 h-6" />, title: "Berbasis Lokasi", desc: "Temukan JBI terdekat dari titik Anda saat ini menggunakan algoritma geolokasi yang akurat." },
  { icon: <Zap className="w-6 h-6" />, title: "On-Demand Instan", desc: "Tidak perlu pesan berhari-hari sebelumnya. JBI hadir dalam hitungan menit sesuai kebutuhan." },
  { icon: <Shield className="w-6 h-6" />, title: "JBI Terverifikasi", desc: "Semua mitra JBI telah melalui proses verifikasi sertifikat oleh tim IsyaratHUB." },
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
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans overflow-x-hidden relative">

      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 w-full z-50 border-b border-slate-200 bg-white/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-purple-100 rounded-xl flex items-center justify-center border border-purple-200">
              <HandMetal className="w-5 h-5 text-purple-600" />
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-800">IsyaratHUB</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500">
            <a href="#fitur" className="hover:text-purple-600 transition-colors">Fitur</a>
            <a href="#cara-kerja" className="hover:text-purple-600 transition-colors">Cara Kerja</a>
            <a href="#tentang" className="hover:text-purple-600 transition-colors">Tentang</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-bold text-slate-600 hover:text-purple-600 transition-colors px-4 py-2 rounded-xl hover:bg-slate-100">
              Masuk
            </Link>
            <Link href="/register" className="text-sm font-bold bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl transition-all shadow-md shadow-purple-200 hover:shadow-lg active:scale-95">
              Daftar Gratis
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-24 px-6 text-center overflow-hidden">
        {/* Background glow for light mode */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-purple-100/50 rounded-full blur-[100px]" />
          <div className="absolute top-40 -left-32 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[100px]" />
          <div className="absolute top-40 -right-32 w-[600px] h-[600px] bg-emerald-50/50 rounded-full blur-[100px]" />
        </div>

        <motion.div
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.12 } } }}
          initial="hidden"
          animate="show"
          className="relative max-w-4xl mx-auto"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-600 text-xs font-bold px-4 py-2 rounded-full mb-8 shadow-sm">
            <Zap className="w-3.5 h-3.5 text-purple-500" /> Proyek Sosial PFmuda 2026 — Pertamina Foundation
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 tracking-tight text-slate-900">
            JBI{" "}
            <span className="text-purple-600">
              On-Demand
            </span>{" "}
            untuk
            <br />
            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
              Teman Tuli
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed mb-10">
            IsyaratHUB menghubungkan Teman Tuli dengan Juru Bahasa Isyarat terdekat secara <strong className="text-slate-800">real-time berbasis geolokasi</strong> — layaknya aplikasi ojek online, tapi untuk komunikasi inklusif.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-lg px-8 py-4 rounded-2xl transition-all shadow-xl shadow-purple-200 hover:-translate-y-1 active:scale-95"
            >
              Mulai Sekarang — Gratis <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/login"
              className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 border-2 border-slate-200 text-slate-700 font-bold text-lg px-8 py-4 rounded-2xl transition-all active:scale-95"
            >
              Masuk ke Akun
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-6 mt-12 text-sm font-medium text-slate-500">
            {["Zero-install via browser", "Bersertifikat sebagai JBI", "Tarif Transparan"].map((t) => (
              <span key={t} className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-100 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {t}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── STATS ── */}
      <section className="bg-white border-y border-slate-200 py-12 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <p className="text-4xl font-extrabold text-slate-800">{s.value}</p>
              <p className="text-sm font-medium text-slate-500 mt-2">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="fitur" className="py-24 px-6 relative">
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Platform Komunikasi Inklusif</h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">Dirancang khusus untuk memenuhi kebutuhan nyata Teman Tuli di Indonesia dengan antarmuka yang ramah.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white border border-slate-200 rounded-3xl p-8 group transition-all hover:border-purple-300 hover:shadow-xl hover:shadow-purple-100/50"
              >
                <div className="w-14 h-14 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{f.title}</h3>
                <p className="text-base font-medium text-slate-500 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="cara-kerja" className="py-24 px-6 bg-slate-100 border-y border-slate-200">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Cara Kerja</h2>
            <p className="text-slate-500 text-lg">Dapatkan JBI dalam 4 langkah mudah.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-slate-200 rounded-3xl p-6 text-center shadow-sm"
              >
                <div className="w-16 h-16 mx-auto bg-slate-50 text-slate-800 font-black text-2xl flex items-center justify-center rounded-2xl mb-5 border border-slate-100">
                  {step.step}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm font-medium text-slate-500 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOR JBI CTA ── */}
      <section id="tentang" className="py-24 px-6">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* For Deaf User */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-purple-50 border border-purple-100 rounded-3xl p-8 lg:p-10"
          >
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-purple-100">
              <Users className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-3xl font-extrabold text-slate-900 mb-4">Saya Teman Tuli</h3>
            <p className="text-slate-600 text-base font-medium leading-relaxed mb-8">Cari JBI kapanpun dan dimanapun Anda butuhkan di Surabaya. Transparan, cepat, dan aman.</p>
            <Link href="/register" className="inline-flex items-center justify-center w-full sm:w-auto gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold px-8 py-4 rounded-2xl transition-all text-base shadow-lg shadow-purple-200 active:scale-95">
              Daftar sebagai Pengguna <ChevronRight className="w-5 h-5" />
            </Link>
          </motion.div>
          {/* For JBI */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-emerald-50 border border-emerald-100 rounded-3xl p-8 lg:p-10"
          >
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-emerald-100">
              <Award className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-3xl font-extrabold text-slate-900 mb-4">Saya Juru Bahasa</h3>
            <p className="text-slate-600 text-base font-medium leading-relaxed mb-8">Bergabunglah sebagai mitra. Kelola ketersediaan Anda, terima penugasan, dan dapatkan penghasilan transparan.</p>
            <Link href="/register" className="inline-flex items-center justify-center w-full sm:w-auto gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-4 rounded-2xl transition-all text-base shadow-lg shadow-emerald-200 active:scale-95">
              Daftar sebagai JBI <ChevronRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-slate-200 bg-white py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-500 font-medium">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center border border-purple-200">
              <HandMetal className="w-4 h-4 text-purple-600" />
            </div>
            <span className="font-bold text-slate-800">IsyaratHUB</span>
            <span className="hidden sm:inline">— Proyek Sosial PFmuda 2026</span>
          </div>
          <p>© 2026 Tim IsyaratHUB · Surabaya, Jawa Timur</p>
        </div>
      </footer>
    </div>
  );
}
