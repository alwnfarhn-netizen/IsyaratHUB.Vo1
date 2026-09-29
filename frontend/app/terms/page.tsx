"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-6 sm:p-12 font-sans">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-200">
        <Link href="/register" className="inline-flex items-center gap-2 text-purple-600 font-bold hover:text-purple-700 transition-colors mb-8">
          <ArrowLeft className="w-5 h-5" /> Kembali
        </Link>
        
        <h1 className="text-4xl font-extrabold text-slate-900 mb-6">Syarat & Ketentuan</h1>
        <p className="text-slate-500 mb-8 font-medium">Terakhir diperbarui: 29 September 2026</p>

        <div className="space-y-6 text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">1. Pengantar</h2>
            <p>Selamat datang di IsyaratHUB. Dengan menggunakan platform ini, Anda menyetujui seluruh syarat dan ketentuan yang berlaku. Harap baca dengan saksama sebelum menggunakan layanan kami.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">2. Layanan Juru Bahasa Isyarat (JBI)</h2>
            <p>IsyaratHUB menghubungkan pengguna dengan Mitra JBI. Kami bertindak sebagai perantara dan memastikan bahwa seluruh Mitra JBI telah melalui proses verifikasi. Namun, interaksi dan hasil sesi adalah tanggung jawab antara pengguna dan JBI terkait.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">3. Kewajiban Pengguna</h2>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Memberikan informasi lokasi dan identitas yang akurat.</li>
              <li>Menjaga kesopanan dan profesionalisme saat berinteraksi dengan JBI.</li>
              <li>Melakukan pembayaran sesuai dengan tarif yang tertera sebelum sesi dimulai.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">4. Pembatalan dan Pengembalian Dana</h2>
            <p>Pembatalan yang dilakukan kurang dari 30 menit sebelum jadwal akan dikenakan potongan biaya. Pengembalian dana penuh hanya berlaku jika Mitra JBI membatalkan pesanan atau tidak hadir.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
