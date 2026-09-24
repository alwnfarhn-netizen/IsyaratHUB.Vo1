export default function HistoryTab() {
  return (
    <div className="flex-1 p-8 h-full flex flex-col">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Jadwal & Riwayat Penugasan</h2>
      <div className="space-y-4 max-w-4xl">
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg text-slate-800">Sesi Penerjemahan - Konferensi IT</h3>
              <p className="text-sm text-slate-500">10 Juni 2026 • 09:00 WIB • JCC Senayan</p>
            </div>
            <div className="text-right">
              <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full border border-slate-200">Selesai</span>
              <p className="mt-2 font-bold text-emerald-600">Rp 450.000</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
