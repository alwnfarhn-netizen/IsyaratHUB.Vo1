# 01. Product Requirements Document (PRD)
> **Versi:** 1.2 | **Terakhir Diperbarui:** 2026-09-27 | **Status:** Active

---

## 1. Project Overview & Context

| Field | Detail |
|---|---|
| **Nama Produk** | IsyaratHUB |
| **Program** | Proyek Sosial PFmuda 2026 — Pertamina Foundation |
| **Kategori** | Inklusi Sosial (Ideation) |
| **Tim Pengusul** | Lina Nur Laili (Ketua), M. Alwan Farhan, Lovany Marchelia Safirarossa, Siti Nurfadilah, Annisa Desca Rachmadilla |
| **Mentor** | Khofidatur Rofiah, M.Pd., Ph.D. |
| **Lokasi Pilot** | SLB Karya Mulya, Kelurahan Wonokromo, Kota Surabaya |
| **Timeline** | 5 Bulan (2026) |
| **Anggaran** | Rp 15.000.000 |
| **Fase** | MVP (Minimum Viable Product) |

**Visi Produk:** Menjadi platform penghubung utama bagi Teman Tuli dan Juru Bahasa Isyarat (JBI) untuk komunikasi yang inklusif, transparan, dan tanpa batas — baik secara tatap muka (*offline*) maupun jarak jauh (*online*).

---

## 2. Problem Statement

### Permasalahan Inti
Indonesia memiliki ±22,97 juta penyandang disabilitas (BPS 2023). Di Surabaya, diperkirakan ±650 Teman Tuli tercatat secara resmi — dan realitanya lebih besar dari angka tersebut. Teman Tuli menghadapi hambatan komunikasi struktural di ruang publik (rumah sakit, bank, kantor pemerintahan) akibat tiga masalah utama:

1. **Kelangkaan JBI On-Demand:** Pemesanan JBI konvensional memerlukan 3–7 hari sebelumnya via grup WhatsApp, tidak tersedia secara instan.
2. **Ketidaktransparanan Harga:** Tidak ada standar tarif yang jelas, rentan terhadap eksploitasi harga dan negosiasi yang menyulitkan.
3. **Tidak Ada Sistem Pelacakan:** Teman Tuli tidak bisa memantau status atau lokasi JBI yang sedang dalam perjalanan.

### Dampak Masalah
- Teman Tuli bergantung pada keluarga/kenalan sebagai perantara komunikasi, mengurangi kemandirian.
- JBI tidak memiliki platform terpusat untuk memanage ketersediaan dan penghasilan mereka.
- Implementasi UU No. 8 Tahun 2016 tentang Aksesibilitas Layanan Publik belum efektif.

---

## 3. Solusi & Proposisi Nilai

IsyaratHUB adalah **Progressive Web App (PWA)** berbasis geolokasi yang menjalankan model **Online-to-Offline (O2O)**, menghubungkan Teman Tuli dengan JBI terdekat secara *real-time*.

### Keunggulan vs. Cara Konvensional

| Aspek | Konvensional | IsyaratHUB |
|---|---|---|
| Pemesanan | 3–7 hari sebelumnya | Dalam hitungan menit |
| Keterlacakan | Tidak ada | Live Tracking GPS |
| Transparansi Harga | Negosiasi manual | Tarif flat-rate, tampil sebelum pesan |
| Instalasi App | — | *Zero-install* via browser (PWA) |
| Penghasilan JBI | Tidak terstruktur | Sistem wallet + pencairan otomatis |

---

## 4. Target Pengguna (User Personas)

### Persona 1 — Teman Tuli (Pengguna / Pemohon)
- **Siapa:** Individu penyandang disabilitas rungu yang aktif di ruang publik di Kota Surabaya.
- **Kebutuhan:** Mendapatkan JBI dengan cepat dan transparan ketika berkomunikasi di rumah sakit, kantor, atau ruang publik lainnya.
- **Pain Point:** Sulit menghubungi JBI mendadak, tidak tahu harga wajar, dan tidak ada konfirmasi apakah JBI sudah dalam perjalanan atau belum.

### Persona 2 — Juru Bahasa Isyarat / JBI (Mitra / Penyedia Layanan)
- **Siapa:** Profesional bersertifikat atau relawan terlatih bahasa isyarat yang bersedia menerima penugasan *on-demand*.
- **Kebutuhan:** Platform terpercaya untuk menawarkan keahlian mereka, mendapatkan penghasilan, dan membangun reputasi.
- **Pain Point:** Tidak ada saluran formal yang terpusat untuk mendapatkan klien secara instan.
- **Syarat:** Wajib mengunggah Sertifikat JBI saat pendaftaran untuk proses verifikasi oleh Admin.

### Persona 3 — Admin IsyaratHUB
- **Siapa:** Tim internal yang mengelola kualitas platform.
- **Kebutuhan:** Dapat memvalidasi sertifikat JBI, memantau performa sesi, dan menangani laporan.

---

## 5. Fitur & Persyaratan Fungsional

### FR-01: Sistem Autentikasi (Semua Peran)
| ID | Kebutuhan | Prioritas |
|---|---|---|
| FR-01.1 | Pengguna dapat mendaftar dengan email, password, nama lengkap, dan memilih peran (Teman Tuli / JBI). | Must Have |
| FR-01.2 | Pengguna dapat login menggunakan email dan password. | Must Have |
| FR-01.3 | Sesi login persisten (tidak perlu login ulang). | Must Have |
| FR-01.4 | Sistem mengarahkan (`redirect`) ke halaman *dashboard* yang sesuai dengan peran setelah login. | Must Have |
| FR-01.5 | Pengguna dapat mereset password via email. | Should Have |

### FR-02: Onboarding & Verifikasi JBI
| ID | Kebutuhan | Prioritas |
|---|---|---|
| FR-02.1 | Saat mendaftar sebagai JBI, terdapat langkah tambahan untuk mengunggah foto/scan Sertifikat JBI ke sistem. | Must Have |
| FR-02.2 | Status akun JBI baru adalah `pending_verification`. JBI belum bisa menerima pesanan. | Must Have |
| FR-02.3 | Admin dapat melihat daftar JBI `pending` dan meninjau sertifikat yang diunggah. | Must Have |
| FR-02.4 | Admin dapat mengubah status JBI menjadi `verified` (aktif) atau `rejected` (ditolak). | Must Have |
| FR-02.5 | JBI yang telah `verified` wajib menyetujui **Term of Service (ToS)** sebelum dapat mengaktifkan status *online*. | Must Have |
| FR-02.6 | JBI mendapatkan notifikasi (in-app/email) ketika status verifikasinya berubah. | Should Have |

### FR-03: Fitur Sisi Teman Tuli (Pemesanan)
| ID | Kebutuhan | Prioritas |
|---|---|---|
| FR-03.1 | Pengguna dapat melihat peta interaktif yang menampilkan titik lokasinya saat ini (*current location*). | Must Have |
| FR-03.2 | Pengguna dapat menggeser *marker* di peta untuk menentukan titik pertemuan yang diinginkan. | Must Have |
| FR-03.3 | Pengguna dapat mengisi kolom teks untuk memberikan patokan alamat yang lebih rinci. | Must Have |
| FR-03.4 | Sistem menampilkan estimasi biaya (Tarif/Jam) secara transparan sebelum pengguna menekan "Cari JBI". | Must Have |
| FR-03.5 | Pengguna menekan tombol "Cari JBI" untuk memulai proses *matchmaking*. | Must Have |
| FR-03.6 | Pengguna dapat melihat layar *Live Tracker* yang menampilkan status pesanan secara *real-time*. | Must Have |
| FR-03.7 | Pengguna dapat membatalkan pesanan selama status masih `searching`. | Should Have |
| FR-03.8 | Pengguna mendapatkan tagihan (*invoice*) dan halaman pembayaran setelah sesi selesai. | Must Have |
| FR-03.9 | Pengguna dapat memberikan ulasan (*rating* bintang dan komentar) kepada JBI setelah sesi selesai. | Should Have |
| FR-03.10 | Pengguna dapat melihat riwayat pesanan sebelumnya di halaman Riwayat. | Should Have |

### FR-04: Fitur Sisi JBI (Manajemen Layanan)
| ID | Kebutuhan | Prioritas |
|---|---|---|
| FR-04.1 | JBI dapat mengaktifkan/menonaktifkan status ketersediaan (*toggle* Online/Offline). Saat Online, sistem mencatat koordinat GPS terkini JBI. | Must Have |
| FR-04.2 | JBI menerima notifikasi *pop-up* saat ada pesanan baru yang cocok dengan lokasinya. | Must Have |
| FR-04.3 | Notifikasi pesanan menampilkan: estimasi jarak ke titik pertemuan, patokan alamat, dan estimasi biaya sesi. | Must Have |
| FR-04.4 | JBI dapat menekan "Terima" atau "Tolak" pesanan. Jika ditolak, sistem mencari JBI lain terdekat. | Must Have |
| FR-04.5 | JBI dapat menekan tombol "Saya Sudah Tiba" untuk memperbarui status menjadi `arrived`. | Must Have |
| FR-04.6 | JBI dapat menekan tombol "Mulai Sesi" dan "Selesaikan Sesi" untuk mengelola durasi pendampingan. | Must Have |
| FR-04.7 | JBI dapat melihat saldo (Wallet) penghasilan mereka. | Must Have |
| FR-04.8 | JBI dapat mengajukan penarikan saldo (*withdrawal*) ke rekening bank atau e-wallet. | Must Have |
| FR-04.9 | JBI dapat melihat riwayat sesi dan mutasi saldo di halaman Profil. | Should Have |

### FR-05: Sistem Pembayaran & Billing
| ID | Kebutuhan | Prioritas |
|---|---|---|
| FR-05.1 | Sistem menghitung total biaya berdasarkan formula: `Tarif/Jam × Durasi Sesi (jam)`. | Must Have |
| FR-05.2 | Setelah JBI menekan "Selesaikan Sesi", sistem secara otomatis membuat *invoice* dan mengirimkan notifikasi ke Pengguna. | Must Have |
| FR-05.3 | Pengguna diarahkan ke halaman pembayaran via *Payment Gateway* (QR Code, Virtual Account). | Must Have |
| FR-05.4 | Setelah pembayaran dikonfirmasi, sistem secara otomatis mendistribusikan dana: **90% ke Wallet JBI**, **10% ke Wallet Operasional Platform**. | Must Have |
| FR-05.5 | JBI dapat mengajukan *withdrawal* minimum Rp50.000 ke rekening bank atau e-wallet. | Must Have |
| FR-05.6 | Sistem merekam semua mutasi keuangan di tabel `transactions`. | Must Have |

### FR-06: Pencegahan Back-Channeling
| ID | Kebutuhan | Prioritas |
|---|---|---|
| FR-06.1 | Saat pendaftaran, pengguna dan JBI wajib membaca dan mencentang persetujuan **Term of Service** yang melarang transaksi di luar aplikasi. | Must Have |
| FR-06.2 | Sistem memantau rasio pembatalan. Jika JBI sering membatalkan setelah menerima pesanan (threshold: >3 kali dalam 7 hari), akun JBI di-*flag* dan masuk antrian review Admin. | Should Have |
| FR-06.3 | Jika JBI terbukti melakukan *back-channeling*, Admin dapat menangguhkan (*suspend*) akun. | Should Have |

---

## 6. Persyaratan Non-Fungsional

| Aspek | Standar |
|---|---|
| **Performa** | Halaman utama dimuat < 3 detik. Pembaruan status *real-time* < 2 detik setelah terjadi perubahan. |
| **Keamanan** | Autentikasi via Supabase Auth (JWT). RLS (*Row Level Security*) aktif di semua tabel. Sertifikat JBI hanya dapat diakses oleh Admin. |
| **Aksesibilitas** | Kontrasvarna minimal WCAG AA. Ukuran font dan tombol yang cukup besar untuk penggunaan mobile. |
| **Kompatibilitas** | PWA berjalan di browser modern (Chrome, Safari, Firefox) di perangkat Android dan iOS. |
| **Skalabilitas** | Arsitektur *serverless* (Vercel + Supabase) mampu menangani pertumbuhan pengguna tanpa perubahan infrastruktur besar. |

---

## 7. Batasan (Constraints) & Asumsi

- **Batasan:** Proyek ini adalah MVP 5 bulan. Fitur *video call* jarak jauh adalah *roadmap* pasca-pilot, bukan bagian dari MVP ini.
- **Asumsi:** JBI yang bergabung memiliki akses smartphone dan koneksi internet. Pengguna mengizinkan akses lokasi di browser mereka.
- **Batasan Wilayah:** Pilot terbatas di Surabaya (koordinat *fallback*: Lat -7.2504, Lng 112.7688).

---

## 8. Metrik Keberhasilan (Success Metrics)

| Indikator | Target | Cara Pengukuran |
|---|---|---|
| Mitra JBI Terverifikasi | ≥ 20 JBI | *Dashboard* Admin |
| Sesi Pendampingan Selesai | ≥ 50 sesi | Log transaksi platform |
| Pengguna Teman Tuli Terdaftar | ≥ 100 pengguna | *Analytics* platform |
| Kepuasan Pengguna | ≥ 80% positif | Survei *in-app* pasca sesi |
| Waktu Respons JBI | ≤ 30 menit rata-rata | Log waktu konfirmasi |
| Tingkat Penyelesaian Sesi | ≥ 90% dari total | Sistem *rating* penyelesaian |
