# 04. Design & UI/UX Guidelines

## 1. Prinsip Desain
*   **Inklusif & Aksesibel (A11y):** Kontras warna yang baik, tipografi yang terbaca jelas.
*   **Modern & Sleek:** Mengadopsi tren antarmuka yang bersih (Framer Motion) dan Tailwind CSS.
*   **Mobile-First (PWA):** Antarmuka sangat responsif untuk pengguna seluler, karena ini adalah PWA tanpa perlu *install* melalui App Store/Play Store.

## 2. Tipografi & Warna
*   **Font:** Inter (didefinisikan di `tailwind.config.ts`).
*   **Map Status Colors:**
    *   `map-accessible` (`#0EA472` - Hijau): Aman / Tersedia.
    *   `map-needsCheck` (`#F59E0B` - Kuning/Oranye): Pending / Proses (misal pembayaran belum selesai).
    *   `map-inaccessible` (`#EF4444` - Merah): Tidak tersedia / Batal.

## 3. Tambahan Komponen UI Khusus
Berdasarkan kebutuhan proposal dan sistem bisnis:
*   **UI Pendaftaran JBI (Certificate Upload):** Terdapat komponen *File Upload* bagi JBI saat mendaftar untuk melampirkan foto/scan Sertifikat JBI. UI memberikan *feedback* "Menunggu Verifikasi Admin".
*   **UI Term of Service (ToS):** Modal atau halaman khusus yang mewajibkan pengguna dan JBI membaca dan mencentang persetujuan (*checkbox* "Saya setuju untuk tidak melakukan transaksi di luar aplikasi").
*   **Dashboard Wallet/Billing:** Halaman dompet digital tempat JBI melihat total saldo mereka. Dilengkapi riwayat transaksi (masuk dari komisi 90%, keluar dari penarikan uang), dan tombol "Tarik Saldo" (Withdraw).
*   **UI Checkout/Pembayaran:** Halaman tagihan di sisi pengguna Teman Tuli yang menunjukkan perhitungan (Durasi Jam × Tarif/Jam) sebelum memilih metode pembayaran.
