export default function HistoryTab() {
  return (
    <div className="flex-1 w-full h-full pt-28 px-8 overflow-y-auto z-0 text-slate-300">
      <h2 className="text-3xl font-bold text-white mb-6">Riwayat Pemesanan</h2>
      <div className="space-y-4">
        {[1, 2, 3].map((item) => (
          <div key={item} className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl flex items-center justify-between shadow-xl">
            <div>
              <h3 className="text-lg font-bold text-white">Sesi dengan Budi Santoso</h3>
              <p className="text-sm text-slate-400">12 Juni 2026 • 14:00 WIB • RS Siloam</p>
            </div>
            <div className="text-right">
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-xs font-bold rounded-full border border-emerald-500/20">Selesai</span>
              <p className="mt-2 text-white font-medium">Rp 150.000</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
