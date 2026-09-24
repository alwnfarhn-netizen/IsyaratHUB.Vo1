export default function ProfileTab() {
  return (
    <div className="flex-1 p-8 h-full flex flex-col">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Pengaturan Profil</h2>
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm max-w-3xl">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl font-bold border border-emerald-200">
            BS
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-800">Budi Santoso</h3>
            <p className="text-slate-500">Juru Bahasa Isyarat Profesional</p>
            <button className="mt-3 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl transition-colors">
              Edit Profil
            </button>
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <label className="text-sm font-medium text-slate-500">Spesialisasi</label>
            <p className="text-slate-800 font-semibold mt-1">Medis, Hukum, dan Edukasi</p>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-500">Tarif Standar</label>
            <p className="text-slate-800 font-semibold mt-1">Rp 150.000 / Jam</p>
          </div>
        </div>
      </div>
    </div>
  );
}
