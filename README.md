# IsyaratHUB

Proyek Sosial — PFmuda 2026 Pertamina Foundation

IsyaratHUB adalah platform *on-demand* (O2O) yang menghubungkan Teman Tuli dengan Juru Bahasa Isyarat (JBI) terdekat secara real-time. Platform ini dirancang untuk menyelesaikan tantangan aksesibilitas komunikasi di sektor layanan publik dan sosial, dengan *pilot project* di Surabaya.

## 📂 Struktur Repositori

Repositori ini disusun menjadi dua bagian utama untuk memisahkan *concern* antara sisi antarmuka pengguna dan logika bisnis tingkat lanjut:

*   `/frontend`
    *   **Deskripsi**: Aplikasi *Progressive Web App* (PWA) yang digunakan oleh Teman Tuli dan JBI.
    *   **Teknologi Utama**:
        *   **Next.js 14 (App Router)**: Framework React untuk SSR, routing, dan performa optimal.
        *   **TypeScript**: Untuk *type-safety* dan struktur kode yang kokoh.
        *   **Tailwind CSS**: Framework *utility-first* untuk *styling* yang responsif dan konsisten.
        *   **Framer Motion**: Untuk animasi UI mikro (seperti Live Tracker, transisi halaman) yang memberikan kesan aplikasi premium.
        *   **Lucide React**: Library ikon modern.
        *   **Leaflet.js** (via `react-leaflet`): Untuk fitur peta interaktif (*map integration*).
*   `/backend`
    *   **Deskripsi**: Direktori ini diperuntukkan untuk mengelola infrastruktur backend. Saat ini (di fase prototipe), IsyaratHUB mengandalkan **Supabase** sebagai *Backend-as-a-Service* (BaaS). Di masa depan, folder ini akan berisi skema *migration* database, skrip SQL PostGIS, *Edge Functions*, dan konfigurasi API khusus.
    *   **Teknologi Utama**:
        *   **PostgreSQL (via Supabase)**: Database relasional utama.
        *   **PostGIS**: Ekstensi PostgreSQL untuk kueri spasial (*geolocation* / *radius matchmaking*).
        *   **Supabase Auth**: Untuk autentikasi pengguna.
        *   **Supabase Realtime**: Untuk fitur Live Tracking dan Notifikasi.

*   `/docs`
    *   Berisi seluruh dokumentasi proyek, mulai dari PRD (*Product Requirements Document*), Arsitektur, Desain Database, dan lain-lain.

## 🏗️ Arsitektur Sistem

IsyaratHUB menggunakan arsitektur **Serverless** yang dimotori oleh Supabase dan Vercel (untuk *hosting* Next.js).
*   **Klien (Frontend)**: Next.js merender antarmuka dan berkomunikasi langsung dengan Supabase API (menggunakan *supabase-js*) untuk mengambil dan menyimpan data.
*   **Basis Data (Supabase)**: Menyimpan tabel `users`, `jbi_profiles`, `offline_bookings`, dan `wallets`. Logika inti seperti "mencari JBI terdekat" ditangani langsung di sisi database menggunakan fungsi RPC (*Stored Procedures*) dan indeks spasial PostGIS untuk efisiensi pencarian yang optimal.

## 🎯 Fokus Prototipe Saat Ini

Saat ini, aplikasi berjalan dalam mode **Prototipe Visual / Mockup Front-End** yang interaktif untuk keperluan demo dan presentasi *pitching*.
Fokus yang telah diselesaikan pada prototipe ini meliputi:
1.  **Landing Page Premium**: Pengalaman pengguna (UX) yang menarik dan profesional untuk audiens dan juri PFmuda.
2.  **Alur Pendaftaran Lengkap**: Menunjukkan mekanisme *upload* sertifikat untuk keamanan dan verifikasi JBI.
3.  **Simulasi Matchmaking & Live Tracker**: Animasi interaktif (5 tahap) yang menyimulasikan pengalaman memesan JBI, dari pencarian hingga selesai, beserta sistem pemberian *rating*.
4.  **Admin Dashboard**: Tampilan simulasi halaman admin untuk memverifikasi pendaftaran JBI yang tertunda.
5.  **Konteks Lokal**: Data sampel, nama JBI, dan peta yang difokuskan secara khusus pada kota Surabaya sebagai target percontohan (*pilot*).

## 🚀 Pengembangan Selanjutnya (Next Steps)

Setelah fase presentasi/prototipe selesai, pengembangan akan difokuskan untuk beralih dari sekadar tampilan *dummy* menuju sistem *production-ready*:
1.  **Migrasi Database (Supabase)**: Membangun skema nyata di PostgreSQL dan menerapkan *Row Level Security* (RLS).
2.  **Integrasi Autentikasi Nyata**: Menghubungkan form Login dan Register ke Supabase Auth.
3.  **Algoritma PostGIS**: Mengimplementasikan RPC `find_nearest_jbi` untuk perhitungan jarak sesungguhnya berdasarkan koordinat GPS `ST_DistanceSphere`.
4.  **Supabase Realtime**: Mengganti animasi waktu yang disimulasikan di Live Tracker dengan *subscription payload* nyata, memantau pergerakan *live* JBI di peta.
5.  **Payment Gateway (Misal: Midtrans/Xendit)**: Integrasi transaksi keuangan untuk memfasilitasi bagi hasil otomatis (90% JBI, 10% platform).

## 💻 Cara Menjalankan (Development)

Buka terminal dan jalankan perintah berikut untuk menjalankan prototipe:
```bash
cd frontend
npm install
npm run dev
```
Setelah *server* berjalan, buka `http://localhost:3000` di browser web Anda.
