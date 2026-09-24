import { Bell, Star } from "lucide-react";

export default function NotificationTab() {
  return (
    <div className="flex-1 w-full h-full pt-28 px-8 overflow-y-auto z-0 text-slate-300">
      <h2 className="text-3xl font-bold text-white mb-6">Notifikasi</h2>
      <div className="space-y-4">
        <div className="p-5 bg-purple-600/10 border border-purple-500/20 rounded-2xl flex items-start gap-4 shadow-lg">
          <div className="p-2 bg-purple-500/20 rounded-full text-purple-400">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-white font-semibold">Pesanan Diterima!</h3>
            <p className="text-sm text-slate-400">Budi Santoso telah menerima permintaan JBI Anda. Ia akan segera menuju lokasi.</p>
            <p className="text-xs text-purple-400 mt-2">2 menit yang lalu</p>
          </div>
        </div>
        <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-2xl flex items-start gap-4">
          <div className="p-2 bg-slate-800 rounded-full text-slate-400">
            <Star className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-white font-semibold">Beri Ulasan</h3>
            <p className="text-sm text-slate-400">Bagaimana sesi Anda dengan Siti Rahma? Berikan ulasan sekarang.</p>
            <p className="text-xs text-slate-500 mt-2">1 hari yang lalu</p>
          </div>
        </div>
      </div>
    </div>
  );
}
