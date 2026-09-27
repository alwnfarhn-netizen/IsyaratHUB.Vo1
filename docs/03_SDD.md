# 03. System Design Document (SDD)
> **Versi:** 1.2 | **Terakhir Diperbarui:** 2026-09-27 | **Status:** Active

---

## 1. Pendahuluan & Tujuan
Dokumen ini menerjemahkan setiap kebutuhan di PRD menjadi spesifikasi teknis yang konkret — mencakup alur data, skema API, logika bisnis sistem, dan perilaku antarmuka (UI behavior) yang harus diimplementasikan oleh tim pengembang.

---

## 2. Alur Sistem Utama (System Flows)

### SF-01: Alur Pendaftaran & Verifikasi JBI

```
[JBI] → Isi form (nama, email, password, sertifikat JPG/PDF)
    → Klik "Daftar"
    → [Supabase Auth] Buat user baru
    → [DB] INSERT ke tabel `users` (role: 'jbi')
    → [Supabase Storage] Upload sertifikat ke bucket `jbi-certificates/{user_id}/`
    → [DB] INSERT ke `jbi_profiles` (verification_status: 'pending', certificate_url: <url>)
    → [UI] Tampilkan halaman "Menunggu Verifikasi Admin"

[Admin] → Buka dashboard admin `/admin/verifikasi`
    → Lihat daftar JBI dengan status 'pending'
    → Klik "Lihat Sertifikat" (buka URL dari Supabase Storage)
    → Klik "Setujui" atau "Tolak"
    → [DB] UPDATE `jbi_profiles` SET verification_status = 'verified'/'rejected'
    → [Notifikasi] Kirim email/notifikasi ke JBI

[JBI - Setelah Verified] → Login
    → [UI] Tampilkan modal ToS wajib jika `tos_accepted_at IS NULL`
    → JBI baca dan centang → Klik "Saya Setuju"
    → [DB] UPDATE `jbi_profiles` SET tos_accepted_at = NOW()
    → [Redirect] Ke dashboard JBI aktif
```

### SF-02: Alur Pencarian & Pemesanan JBI (Matchmaking)

```
[Pengguna] → Buka halaman `/dashboard/user`
    → Peta Leaflet memuat & Geolocation API mengambil koordinat saat ini
    → Geser marker ke titik pertemuan yang diinginkan
    → Isi kolom "Patokan Alamat Rinci"
    → UI menampilkan estimasi biaya: "Tarif Rp25.000/jam"
    → Klik "Cari JBI"

[Backend - Supabase Function/API]
    → Panggil Stored Procedure: `find_nearest_jbi(lat, lng, radius_meters: 10000)`
    → PostGIS menghitung jarak semua JBI dengan `offline_available = true`
    → Kembalikan JBI terdekat (maks. 1 JBI per request untuk MVP)
    → INSERT ke `offline_bookings` (status: 'searching', user_id, meeting_point, jbi_id)

[JBI] → Menerima notifikasi pop-up (via Supabase Realtime Channel)
    → Notifikasi berisi: estimasi jarak, patokan alamat, estimasi biaya
    → JBI klik "Terima" → UPDATE `offline_bookings` SET status = 'heading_to_location', jbi_id = <id>
    → JBI klik "Tolak"  → Sistem mencari JBI terdekat berikutnya (iterasi ulang)

[Pengguna] → UI Live Tracker memperbarui otomatis via Supabase Realtime
    → Status berubah dari "Mencari JBI..." → "JBI Sedang Menuju Lokasi"
```

### SF-03: Siklus Hidup Sesi Pendampingan

Status pesanan (`offline_bookings.status`) bergerak satu arah:

```
searching → heading_to_location → arrived → in_progress → completed
                                                              ↑
                                                           (trigger billing)
         ↘ cancelled (jika pengguna batalkan saat masih 'searching')
```

| Status | Siapa yang Mengubah | Aksi UI |
|---|---|---|
| `searching` | Sistem (otomatis) | Pengguna melihat animasi loading "Mencari JBI..." |
| `heading_to_location` | JBI (klik Terima) | Pengguna melihat "JBI Sedang Menuju Lokasi" |
| `arrived` | JBI (klik "Saya Sudah Tiba") | Pengguna melihat "JBI Sudah Tiba, Sesi Siap Dimulai" |
| `in_progress` | JBI (klik "Mulai Sesi") | Sistem mencatat `start_time`. Timer berjalan di UI JBI. |
| `completed` | JBI (klik "Selesaikan Sesi") | Sistem mencatat `end_time`, menghitung biaya, memicu billing. |
| `cancelled` | Pengguna (saat `searching`) | Pesanan dihapus dari tampilan aktif. |

### SF-04: Alur Billing & Payment (Pembayaran)

```
[JBI] Klik "Selesaikan Sesi"
    → [DB] UPDATE `offline_bookings`: end_time = NOW(), status = 'completed'
    → [Backend] Hitung: durasi = (end_time - start_time) dalam jam
    → [Backend] Hitung: total_amount = CEIL(durasi) × tarif_per_jam (misal: Rp25.000)
    → [DB] UPDATE `offline_bookings` SET total_amount = <nilai>
    → [Notifikasi] Kirim notifikasi ke Pengguna: "Sesi selesai. Tagihan: Rp<total>"

[Pengguna] Membuka halaman tagihan `/invoice/{booking_id}`
    → UI menampilkan rincian: Durasi, Tarif/Jam, Total
    → Klik "Bayar Sekarang"
    → [Backend] Buat transaksi pembayaran di Payment Gateway (Midtrans/Xendit)
    → Pengguna diarahkan ke halaman pembayaran (QRIS/VA/Transfer)

[Payment Gateway] → Webhook POST ke backend setelah pembayaran berhasil
    → [Backend] Verifikasi webhook signature
    → [DB] UPDATE status transaksi = 'success'
    → [Backend] Distribusi dana:
        - INSERT ke `transactions`: type='earning', amount=total×90%, wallet=JBI
        - INSERT ke `transactions`: type='commission', amount=total×10%, wallet=Platform
        - UPDATE `wallets` SET balance = balance + amount (untuk JBI)
```

### SF-05: Alur Penarikan Saldo JBI (Withdrawal)

```
[JBI] Buka halaman Wallet di `/dashboard/jbi/wallet`
    → Melihat saldo tersedia (balance ≥ Rp50.000)
    → Klik "Tarik Saldo"
    → Isi form: Jumlah, Nomor Rekening Bank/E-wallet

[Backend]
    → Validasi: balance >= amount_requested dan amount >= minimum (Rp50.000)
    → [DB] Kurangi saldo: UPDATE `wallets` SET balance = balance - amount
    → [DB] INSERT ke `transactions`: type='withdrawal', status='pending'
    → Panggil Disbursement API (Xendit/Midtrans) untuk transfer ke rekening JBI
    → Pada webhook konfirmasi dari Payment Gateway:
        → UPDATE `transactions` SET status = 'success'/'failed'
    → Jika gagal: rollback saldo (UPDATE `wallets` SET balance = balance + amount)
```

---

## 3. Logika Bisnis Kritis (Business Logic)

### BL-01: Stored Procedure `find_nearest_jbi`
Fungsi SQL di PostgreSQL yang memanfaatkan PostGIS:
```sql
CREATE OR REPLACE FUNCTION find_nearest_jbi(
    input_lat DOUBLE PRECISION,
    input_lng DOUBLE PRECISION,
    radius_meters INTEGER DEFAULT 10000
)
RETURNS TABLE (
    user_id UUID,
    full_name TEXT,
    specialty TEXT,
    distance_meters DOUBLE PRECISION
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        jp.user_id,
        u.full_name,
        jp.specialty,
        ST_DistanceSphere(
            jp.current_location,
            ST_MakePoint(input_lng, input_lat)::geography
        ) AS distance_meters
    FROM jbi_profiles jp
    JOIN users u ON jp.user_id = u.id
    WHERE
        jp.offline_available = TRUE
        AND jp.verification_status = 'verified'
        AND ST_DistanceSphere(
            jp.current_location,
            ST_MakePoint(input_lng, input_lat)::geography
        ) <= radius_meters
    ORDER BY distance_meters ASC
    LIMIT 1;
END;
$$ LANGUAGE plpgsql;
```

### BL-02: Kalkulasi Durasi & Biaya
- **Durasi:** `EXTRACT(EPOCH FROM (end_time - start_time)) / 3600` → Hasil dalam jam (desimal).
- **Pembulatan:** Sistem membulatkan ke atas (`CEIL`) per 30 menit. Contoh: 1 jam 10 menit → dihitung 1.5 jam.
- **Tarif:** Tarif per jam disimpan di tabel `platform_settings` (dapat diperbarui Admin tanpa deploy ulang).
- **Formula:** `total_amount = CEIL(duration_hours × 2) / 2 × rate_per_hour`

### BL-03: Logika Anti-Back-Channeling
- Setiap kali JBI menekan "Tolak" atau sesi berstatus `cancelled` (dari sisi JBI), sistem mencatat `cancellation_log`.
- Jika `COUNT(cancellation_log WHERE jbi_id = X AND created_at > NOW() - INTERVAL '7 days') > 3`, sistem otomatis men-*flag* akun JBI (`is_flagged = true`).
- Admin mendapatkan notifikasi di dashboard. JBI tetap bisa bekerja namun dalam *pengawasan*. Admin bisa langsung *suspend*.

---

## 4. Real-time Architecture (Supabase Realtime)

Setiap perubahan pada tabel `offline_bookings` disiarkan ke klien yang relevan:

```
[DB Change: offline_bookings] → Supabase Realtime Broadcast
    → Channel: `booking:{booking_id}`
    → Pendengar (Subscriber):
        - Pengguna: memperbarui tampilan LiveTracker di `/dashboard/user`
        - JBI:      memperbarui tampilan status pesanan di `/dashboard/jbi`
```

**Implementasi di Next.js (Client Component):**
```typescript
// Contoh subscribe di React Component
const channel = supabase
  .channel(`booking:${bookingId}`)
  .on('postgres_changes', {
    event: 'UPDATE',
    schema: 'public',
    table: 'offline_bookings',
    filter: `id=eq.${bookingId}`
  }, (payload) => {
    setBookingStatus(payload.new.status);
  })
  .subscribe();
```

---

## 5. Routing & Halaman Aplikasi

| Path | Role | Deskripsi |
|---|---|---|
| `/` | Public | Halaman landing page |
| `/login` | Public | Halaman Login |
| `/register` | Public | Halaman Registrasi (pilih role) |
| `/dashboard/user` | `deaf_user` | Peta pemesanan + Live Tracker |
| `/dashboard/user/history` | `deaf_user` | Riwayat pesanan |
| `/dashboard/jbi` | `jbi` | Panel status + notifikasi pesanan |
| `/dashboard/jbi/wallet` | `jbi` | Saldo, riwayat mutasi, withdrawal |
| `/dashboard/jbi/profile` | `jbi` | Edit profil dan lihat ulasan |
| `/admin` | `admin` | Dashboard verifikasi JBI |
| `/admin/verifikasi` | `admin` | Antrian verifikasi sertifikat JBI |
| `/invoice/[bookingId]` | `deaf_user` | Halaman tagihan dan pembayaran |

---

## 6. Penanganan Error & Edge Cases

| Skenario | Penanganan |
|---|---|
| Tidak ada JBI tersedia dalam radius 10 km | Tampilkan pesan: "Tidak ada JBI tersedia di sekitar lokasi Anda saat ini. Coba perluas area atau coba lagi nanti." |
| JBI menolak semua pesanan (tidak ada JBI lain) | Tampilkan pesan: "Tidak ada JBI yang menerima saat ini. Pesanan dibatalkan otomatis." Status → `cancelled`. |
| Pengguna tidak mengizinkan akses lokasi | Tampilkan peta default di pusat Surabaya (Lat: -7.2504, Lng: 112.7688) dengan pesan informasi. |
| Pembayaran gagal (timeout/cancelled) | Pesanan tetap `completed` di sistem. Pengguna dapat kembali ke halaman `/invoice` dan mencoba bayar ulang (status tagihan: `payment_pending`). |
| Webhook Payment Gateway gagal terkirim | Implementasi mekanisme retry otomatis (3x) menggunakan Supabase Edge Functions dengan exponential backoff. |
