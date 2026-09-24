export default function ProfileTab() {
  return (
    <div className="flex-1 w-full h-full pt-28 px-8 overflow-y-auto z-0 text-slate-300">
      <h2 className="text-3xl font-bold text-white mb-6">Profil Pengguna</h2>
      <div className="max-w-2xl bg-slate-900/80 border border-slate-800 rounded-3xl p-8 shadow-xl">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-3xl font-bold text-white shadow-lg border-4 border-slate-800">
            TU
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">Teman Tuli</h3>
            <p className="text-slate-400">user@isyarathub.com</p>
            <span className="inline-block mt-2 px-3 py-1 bg-purple-500/20 text-purple-400 text-xs font-bold rounded-full border border-purple-500/20">Member Aktif</span>
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="text-sm text-slate-400">Nama Lengkap</label>
            <div className="mt-1 p-3 bg-slate-950 border border-slate-800 rounded-xl text-white font-medium">Teman Tuli</div>
          </div>
          <div>
            <label className="text-sm text-slate-400">Nomor Telepon Darurat</label>
            <div className="mt-1 p-3 bg-slate-950 border border-slate-800 rounded-xl text-white font-medium">+62 812 3456 7890</div>
          </div>
          <button className="w-full py-3 mt-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold transition-colors shadow-lg shadow-purple-900/50">
            Edit Profil
          </button>
        </div>
      </div>
    </div>
  );
}
