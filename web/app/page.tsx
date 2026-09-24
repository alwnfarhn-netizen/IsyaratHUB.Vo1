import { redirect } from 'next/navigation';

export default function Home() {
  // Langsung arahkan (redirect) pengguna ke halaman login IsyaratHUB yang sudah Anda buat
  redirect('/login');
}
