# 05. Database Schema

Skema *database* menggunakan PostgreSQL (Supabase) + PostGIS. Pembaruan skema ini mencakup fitur sertifikasi, sistem *billing*, dan pelacakan transaksi keuangan.

## 1. Tabel-Tabel Tambahan dan Modifikasi

### Tabel: `users`
*   `id` (UUID, Primary Key)
*   `role` (Enum: `'deaf_user'`, `'jbi'`, `'admin'`)
*   `full_name` (Text)
*   `created_at` (Timestampz)

### Tabel: `jbi_profiles` (Modifikasi)
*   `user_id` (UUID, Primary Key)
*   `offline_available` (Boolean)
*   `current_location` (Geometry Point, 4326)
*   `certificate_url` (Text) - **BARU:** Link ke file sertifikat JBI yang diunggah ke Supabase Storage.
*   `verification_status` (Enum: `'pending'`, `'verified'`, `'rejected'`) - **BARU:** Status sertifikasi.
*   `tos_accepted_at` (Timestampz) - **BARU:** Waktu JBI menyetujui *Term of Service*.

### Tabel: `offline_bookings` (Modifikasi)
*   `id` (UUID, Primary Key)
*   `user_id`, `jbi_id` (UUID)
*   `status` (Enum: ..., `'payment_pending'`, `'completed'`)
*   `start_time` (Timestampz) - **BARU:** Waktu sesi dimulai.
*   `end_time` (Timestampz) - **BARU:** Waktu sesi selesai untuk kalkulasi Tarif/Jam.
*   `total_amount` (Decimal) - **BARU:** Total tagihan *billing*.

### Tabel: `wallets` (BARU - Payment System)
Menyimpan saldo JBI untuk penarikan dana.
*   `id` (UUID, Primary Key)
*   `user_id` (UUID, Foreign Key) - Pemilik dompet (JBI atau Platform/Admin).
*   `balance` (Decimal, Default: 0)
*   `updated_at` (Timestampz)

### Tabel: `transactions` (BARU - Alur Uang)
Mencatat riwayat mutasi dana (pembayaran dari pengguna, potongan komisi, penarikan JBI).
*   `id` (UUID, Primary Key)
*   `wallet_id` (UUID, FK)
*   `type` (Enum: `'payment_in'`, `'commission_deduction'`, `'withdrawal'`)
*   `amount` (Decimal)
*   `status` (Enum: `'pending'`, `'success'`, `'failed'`)
*   `created_at` (Timestampz)
