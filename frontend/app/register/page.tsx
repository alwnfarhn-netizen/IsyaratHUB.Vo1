"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Mail, Lock, UserCircle2, HandMetal, User, UploadCloud, FileText, X, AlertTriangle, Building2 } from "lucide-react";

export default function RegisterPage() {
  const [role, setRole] = useState<"deaf_user" | "umum" | "jbi">("deaf_user");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [certificate, setCertificate] = useState<File | null>(null);
  const [showTos, setShowTos] = useState(false);
  const [acceptedTos, setAcceptedTos] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate navigation for preview purposes
    if (role === "jbi") {
      window.location.href = "/dashboard/jbi";
    } else {
      window.location.href = "/dashboard/user";
    }
  };

  return (
    <div className="min-h-screen flex bg-background flex-row-reverse">
      {/* Right Side: Branding / Visual (Hidden on mobile) - Reversed for Register */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-bl from-emerald-500 via-teal-600 to-indigo-700">
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Abstract decorative circles */}
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
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 xl:p-24 bg-background">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-md relative"
        >
          {/* Mobile Back Button */}
          <div className="lg:hidden absolute -top-12 left-0">
            <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-medium transition-colors">
              <ArrowLeft className="w-4 h-4" /> Kembali
            </Link>
          </div>
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <UserCircle2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-foreground">IsyaratHUB</span>
          </div>

          <h2 className="text-3xl font-bold mb-2">Buat Akun</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6">Daftar secara gratis untuk mulai menggunakan IsyaratHUB.</p>

          {/* Role Toggle */}
          <div className="flex p-1 mb-6 bg-slate-100 dark:bg-slate-800 rounded-2xl">
            <button
              onClick={() => setRole("deaf_user")}
              className={`flex-1 flex flex-col items-center justify-center gap-1 py-2 px-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 ${
                role === "deaf_user" 
                  ? "bg-white dark:bg-slate-700 text-purple-700 dark:text-purple-300 shadow-sm" 
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
              }`}
            >
              <UserCircle2 className="w-5 h-5 mb-0.5" />
              Teman Tuli
            </button>
            <button
              onClick={() => setRole("umum")}
              className={`flex-1 flex flex-col items-center justify-center gap-1 py-2 px-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 ${
                role === "umum" 
                  ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm" 
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
              }`}
            >
              <Building2 className="w-5 h-5 mb-0.5" />
              Umum/Instansi
            </button>
            <button
              onClick={() => setRole("jbi")}
              className={`flex-1 flex flex-col items-center justify-center gap-1 py-2 px-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 ${
                role === "jbi" 
                  ? "bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm" 
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
              }`}
            >
              <HandMetal className="w-5 h-5 mb-0.5" />
              Mitra JBI
            </button>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">Nama Lengkap</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all dark:text-white"
                  placeholder="Nama Lengkap Anda"
                  required
                />
              </div>
            </div>

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
                  className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all dark:text-white"
                  placeholder="nama@email.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all dark:text-white"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {role === "jbi" && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: "auto" }} 
                className="space-y-1 overflow-hidden"
              >
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">Sertifikat JBI (Wajib)</label>
                <div className="relative border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-4 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors">
                  <input
                    type="file"
                    accept=".pdf,image/*"
                    onChange={(e) => setCertificate(e.target.files?.[0] || null)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    required
                  />
                  {certificate ? (
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                      <FileText className="w-6 h-6" />
                      <span className="text-sm font-medium truncate max-w-[200px]">{certificate.name}</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-slate-500">
                      <UploadCloud className="w-8 h-8 mb-2 text-slate-400" />
                      <span className="text-sm font-medium">Klik atau seret file ke sini</span>
                      <span className="text-xs text-slate-400 mt-1">PDF, JPG, atau PNG (Max 5MB)</span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            <div className="flex items-start gap-3 mt-4 mb-2">
              <input 
                type="checkbox" 
                id="tos" 
                checked={acceptedTos}
                onChange={(e) => setAcceptedTos(e.target.checked)}
                required 
                className={`mt-1 w-4 h-4 rounded border-slate-300 shrink-0 cursor-pointer focus:ring-2 ${role === 'deaf_user' ? 'text-purple-600 focus:ring-purple-600' : 'text-emerald-600 focus:ring-emerald-600'}`} 
              />
              <label htmlFor="tos" className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed cursor-pointer">
                Dengan mendaftar, Anda menyetujui <button type="button" onClick={() => setShowTos(true)} className={`font-semibold hover:underline ${role === 'deaf_user' ? 'text-purple-600' : 'text-emerald-600'}`}>Syarat & Ketentuan (Terms of Service)</button> dan Kebijakan Privasi platform IsyaratHUB.
              </label>
            </div>

            <button
              type="submit"
              className={`w-full py-3.5 mt-2 rounded-2xl text-white font-semibold flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:-translate-y-0.5 ${
                role === 'deaf_user' 
                  ? 'bg-purple-600 hover:bg-purple-700 shadow-purple-600/30' 
                  : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/30'
              }`}
            >
              Daftar Sekarang
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
            Sudah punya akun?{" "}
            <Link href="/login" className={`font-semibold ${role === 'deaf_user' ? 'text-purple-600' : 'text-emerald-600'} hover:underline`}>
              Masuk di sini
            </Link>
          </div>
        </motion.div>
      </div>
      
      {/* ToS Modal */}
      <AnimatePresence>
        {showTos && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden shadow-2xl"
            >
              <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900">
                <h3 className="text-xl font-bold">Syarat & Ketentuan (Terms of Service)</h3>
                <button onClick={() => setShowTos(false)} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto flex-1 space-y-6 text-sm text-slate-600 dark:text-slate-300">
                {role === "jbi" ? (
                  <>
                    <section>
                      <h4 className="font-bold text-slate-900 dark:text-white text-base mb-2">1. Komisi & Pembayaran (Bagi Hasil)</h4>
                      <p>
                        Sebagai platform wirausaha sosial, IsyaratHUB menerapkan sistem bagi hasil. Dari total tarif per jam, <strong>90%</strong> akan menjadi hak JBI dan <strong>10%</strong> untuk biaya operasional platform.
                      </p>
                    </section>
                    <section>
                      <h4 className="font-bold text-red-600 flex items-center gap-2 text-base mb-2">
                        <AlertTriangle className="w-5 h-5" /> 2. Larangan Transaksi di Luar (Back-Channeling)
                      </h4>
                      <p className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-4 rounded-xl border border-red-100 dark:border-red-900/50 leading-relaxed">
                        Anda <strong>DILARANG KERAS</strong> meminta klien membatalkan pesanan di aplikasi dengan tujuan untuk bertransaksi langsung di luar sistem IsyaratHUB. Pelanggaran akan berakibat pemblokiran akun permanen.
                      </p>
                    </section>
                    <section>
                      <h4 className="font-bold text-slate-900 dark:text-white text-base mb-2">3. Kerahasiaan Klien (Confidentiality)</h4>
                      <p>
                        JBI diwajibkan menjaga kerahasiaan informasi medis, hukum, atau data sensitif apapun yang didengar selama sesi pendampingan. Dilarang keras mempublikasikannya ke pihak lain atau media sosial.
                      </p>
                    </section>
                    <section>
                      <h4 className="font-bold text-red-600 flex items-center gap-2 text-base mb-2">
                        <AlertTriangle className="w-5 h-5" /> 4. Kebijakan Suspensi JBI
                      </h4>
                      <ul className="list-disc pl-5 space-y-2">
                        <li><strong>No-Show:</strong> Menerima pesanan namun tidak hadir di lokasi tanpa alasan <em>Force Majeure</em>.</li>
                        <li><strong>Pemalsuan Identitas:</strong> Menggunakan sertifikat atau profil palsu saat mendaftar.</li>
                        <li><strong>Kinerja Buruk:</strong> Mendapatkan rating 1-2 bintang lebih dari 5 kali berturut-turut.</li>
                        <li><strong>Pelecehan:</strong> Melakukan tindakan tidak profesional atau pelecehan kepada klien.</li>
                      </ul>
                    </section>
                  </>
                ) : role === "umum" ? (
                  <>
                    <section>
                      <h4 className="font-bold text-slate-900 dark:text-white text-base mb-2">1. Ketentuan Pemesanan & Pembayaran</h4>
                      <p>
                        Pengguna Umum / Instansi wajib melakukan pembayaran di muka sesuai estimasi durasi via Payment Gateway. Jika sesi melebihi batas waktu (<em>overtime</em>), tagihan tambahan akan dikirimkan setelah sesi selesai.
                      </p>
                    </section>
                    <section>
                      <h4 className="font-bold text-slate-900 dark:text-white text-base mb-2">2. Lingkup Kerja JBI</h4>
                      <p>
                        JBI <strong>hanya bertugas sebagai penerjemah bahasa isyarat</strong>. Instansi/Panitia dilarang mengeksploitasi atau meminta JBI melakukan tugas-tugas administratif maupun pekerjaan fisik di luar deskripsi kerjanya.
                      </p>
                    </section>
                    <section>
                      <h4 className="font-bold text-slate-900 dark:text-white text-base mb-2">3. Kebijakan Pembatalan</h4>
                      <p>
                        Pembatalan yang dilakukan setelah JBI menyetujui pesanan dan sedang dalam perjalanan ke lokasi, akan dikenakan biaya kompensasi pembatalan.
                      </p>
                    </section>
                    <section>
                      <h4 className="font-bold text-red-600 flex items-center gap-2 text-base mb-2">
                        <AlertTriangle className="w-5 h-5" /> 4. Kebijakan Suspensi Akun Instansi
                      </h4>
                      <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Gagal Bayar:</strong> Melakukan penipuan pembayaran, <em>chargeback</em> ilegal, atau menolak membayar biaya tambahan waktu (overtime).</li>
                        <li><strong>Order Fiktif:</strong> Membuat pesanan palsu (prank) yang merugikan JBI.</li>
                        <li><strong>Eksploitasi / Pelecehan:</strong> Melakukan eksploitasi, ancaman, atau pelecehan fisik/verbal terhadap JBI kami di lapangan.</li>
                      </ul>
                    </section>
                  </>
                ) : (
                  <>
                    <section>
                      <h4 className="font-bold text-slate-900 dark:text-white text-base mb-2">1. Layanan Aksesibilitas</h4>
                      <p>
                        IsyaratHUB dirancang untuk memudahkan Teman Tuli mendapatkan akses penerjemah JBI secara cepat. Platform kami menjamin keamanan dan kenyamanan Anda selama menggunakan jasa JBI.
                      </p>
                    </section>
                    <section>
                      <h4 className="font-bold text-slate-900 dark:text-white text-base mb-2">2. Etika & Perlindungan Bersama</h4>
                      <p>
                        Kami memprioritaskan keamanan Anda dan Mitra JBI kami. Harap selalu berkomunikasi dengan sopan. Jika Anda mengalami kendala atau pelecehan dari pihak JBI, segera laporkan melalui tombol "Bantuan & Laporan".
                      </p>
                    </section>
                    <section>
                      <h4 className="font-bold text-slate-900 dark:text-white text-base mb-2">3. Kebijakan Pembatalan & Refund</h4>
                      <p>
                        Jika Anda membatalkan pesanan saat JBI sudah tiba di lokasi, dana yang telah dibayarkan mungkin tidak dapat dikembalikan secara penuh. Namun, jika JBI yang gagal hadir (no-show), dana Anda akan dikembalikan 100%.
                      </p>
                    </section>
                    <section>
                      <h4 className="font-bold text-red-600 flex items-center gap-2 text-base mb-2">
                        <AlertTriangle className="w-5 h-5" /> 4. Kebijakan Penangguhan Akun
                      </h4>
                      <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Order Fiktif:</strong> Sengaja melakukan pesanan palsu yang membuang waktu dan biaya transport JBI.</li>
                        <li><strong>Tingkat Pembatalan Tinggi:</strong> Sering membatalkan pesanan secara sepihak untuk menghindari pembayaran via sistem (indikasi kolusi).</li>
                        <li><strong>Kekerasan:</strong> Melakukan ancaman atau pelecehan fisik/verbal kepada JBI.</li>
                      </ul>
                    </section>
                  </>
                )}
              </div>
              <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex justify-end gap-3">
                <button 
                  type="button"
                  onClick={() => setShowTos(false)}
                  className="px-6 py-2.5 rounded-xl text-slate-600 font-medium hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                >
                  Tutup
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    setAcceptedTos(true);
                    setShowTos(false);
                  }}
                  className={`px-6 py-2.5 rounded-xl text-white font-medium shadow-lg transition-colors ${role === 'deaf_user' ? 'bg-purple-600 hover:bg-purple-700 shadow-purple-600/30' : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/30'}`}
                >
                  Saya Setuju
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
