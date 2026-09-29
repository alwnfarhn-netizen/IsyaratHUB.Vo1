"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-6 sm:p-12 font-sans">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-200">
        <Link href="/register" className="inline-flex items-center gap-2 text-purple-600 font-bold hover:text-purple-700 transition-colors mb-8">
          <ArrowLeft className="w-5 h-5" /> Kembali
        </Link>
        
        <h1 className="text-4xl font-extrabold text-slate-900 mb-6">Kebijakan Privasi</h1>
        <p className="text-slate-500 mb-8 font-medium">Terakhir diperbarui: 29 September 2026</p>

        <div className="space-y-6 text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">1. Pengumpulan Data</h2>
            <p>Kami mengumpulkan data pribadi Anda seperti nama, alamat email, dan lokasi GPS secara *real-time* saat aplikasi digunakan. Data ini sangat krusial untuk menghubungkan Anda dengan Mitra JBI terdekat.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">2. Penggunaan Data</h2>
            <p>Data Anda digunakan sepenuhnya untuk keperluan operasional layanan IsyaratHUB, termasuk pemrosesan pembayaran, peningkatan pengalaman pengguna, dan keamanan sesi Video Call.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">3. Keamanan Percakapan (Video Call)</h2>
            <p>Seluruh sesi komunikasi via fitur Video Call dienkripsi secara *end-to-end*. Kami tidak merekam apalagi menyimpan percakapan Anda dalam bentuk video maupun audio di server kami, kecuali atas permintaan langsung untuk tujuan investigasi.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">4. Berbagi Data dengan Pihak Ketiga</h2>
            <p>IsyaratHUB tidak pernah dan tidak akan pernah menjual data pribadi Anda kepada pihak ketiga. Kami hanya membagikan data Anda dengan layanan pembayaran (Payment Gateway) yang aman untuk memproses transaksi.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
