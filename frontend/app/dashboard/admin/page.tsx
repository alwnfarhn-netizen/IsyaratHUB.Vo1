"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Search, Filter, CheckCircle2, XCircle, FileText, UserCircle2, ExternalLink, Menu } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Mock data for Admin
const PENDING_JBIS = [
  { id: "reg-001", name: "Siska Saraswati", email: "siska.s@gmail.com", date: "27 Sep 2026", status: "pending", certName: "Sertifikat JBI Level I.pdf" },
  { id: "reg-002", name: "Bima Arya", email: "bima.arya@yahoo.com", date: "26 Sep 2026", status: "pending", certName: "Sertifikat_JBI_Bima.jpg" },
  { id: "reg-003", name: "Rina Wijaya", email: "rina.w@gmail.com", date: "26 Sep 2026", status: "approved", certName: "Sertifikat JBI.pdf" },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [jbis, setJbis] = useState(PENDING_JBIS);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("pending");

  const handleAction = (id: string, newStatus: string) => {
    setJbis((prev) => prev.map(j => j.id === id ? { ...j, status: newStatus } : j));
  };

  const filteredJbis = jbis.filter(j => {
    const matchesSearch = j.name.toLowerCase().includes(searchQuery.toLowerCase()) || j.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" || j.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-slate-200 bg-white flex flex-col justify-between hidden lg:flex">
        <div>
          <div className="h-20 flex items-center px-6 border-b border-slate-100">
            <ShieldCheck className="w-8 h-8 text-blue-600" />
            <span className="ml-3 font-bold text-xl tracking-tight text-slate-800">AdminPanel</span>
          </div>
          <nav className="p-4 space-y-2">
            <NavItem icon={<UserCircle2 />} label="Verifikasi JBI" active={true} count={jbis.filter(j => j.status === 'pending').length} />
            <NavItem icon={<FileText />} label="Laporan Transaksi" />
          </nav>
        </div>
        <div className="p-4 border-t border-slate-100">
          <Link href="/login" className="flex items-center gap-3 p-3 rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors">
            <span className="font-medium">Keluar Administrator</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full">
        
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-20">
          <div className="flex items-center gap-3 lg:hidden">
            <Menu className="w-6 h-6 text-slate-600" />
            <span className="font-bold text-lg text-slate-800">AdminPanel</span>
          </div>

          <div className="hidden lg:block">
            <h1 className="text-xl font-bold text-slate-800">Verifikasi Mitra JBI</h1>
            <p className="text-sm text-slate-500">Tinjau dan setujui pendaftaran Juru Bahasa Isyarat baru</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Cari JBI..." 
                className="pl-9 pr-4 py-2 bg-slate-100 border-none rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-5xl mx-auto">
            
            {/* Filter Tabs */}
            <div className="flex border-b border-slate-200 mb-6">
              {(["pending", "approved", "rejected", "all"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                    filter === f 
                      ? "border-blue-600 text-blue-600" 
                      : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                  }`}
                >
                  {f === "all" ? "Semua" : f === "pending" ? "Menunggu Verifikasi" : f === "approved" ? "Disetujui" : "Ditolak"}
                </button>
              ))}
            </div>

            {/* Table */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm">
                    <th className="p-4 font-medium">Tanggal</th>
                    <th className="p-4 font-medium">Nama & Email</th>
                    <th className="p-4 font-medium">Dokumen Sertifikat</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {filteredJbis.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-slate-500">Tidak ada data ditemukan.</td>
                      </tr>
                    ) : (
                      filteredJbis.map((jbi) => (
                        <motion.tr 
                          key={jbi.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                        >
                          <td className="p-4 text-sm text-slate-600">{jbi.date}</td>
                          <td className="p-4">
                            <p className="font-semibold text-slate-800">{jbi.name}</p>
                            <p className="text-xs text-slate-500">{jbi.email}</p>
                          </td>
                          <td className="p-4">
                            <button className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100 transition-colors">
                              <FileText className="w-4 h-4" /> {jbi.certName} <ExternalLink className="w-3 h-3" />
                            </button>
                          </td>
                          <td className="p-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              jbi.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                              jbi.status === 'approved' ? 'bg-emerald-100 text-emerald-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {jbi.status === 'pending' ? 'Pending' : jbi.status === 'approved' ? 'Approved' : 'Rejected'}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            {jbi.status === 'pending' ? (
                              <div className="flex items-center justify-end gap-2">
                                <button onClick={() => handleAction(jbi.id, 'approved')} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Setujui">
                                  <CheckCircle2 className="w-5 h-5" />
                                </button>
                                <button onClick={() => handleAction(jbi.id, 'rejected')} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Tolak">
                                  <XCircle className="w-5 h-5" />
                                </button>
                              </div>
                            ) : (
                              <span className="text-sm text-slate-400">Telah diproses</span>
                            )}
                          </td>
                        </motion.tr>
                      ))
                    )}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </main>

    </div>
  );
}

function NavItem({ icon, label, active = false, count }: { icon: React.ReactNode, label: string, active?: boolean, count?: number }) {
  return (
    <button className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
      active 
        ? "bg-blue-50 text-blue-700 font-semibold" 
        : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
    }`}>
      <div className="flex items-center gap-3">
        <div className={`[&>svg]:w-5 [&>svg]:h-5 ${active ? 'text-blue-600' : 'text-slate-400'}`}>
          {icon}
        </div>
        <span>{label}</span>
      </div>
      {count !== undefined && count > 0 && (
        <span className="bg-blue-600 text-white text-xs py-0.5 px-2 rounded-full font-bold">
          {count}
        </span>
      )}
    </button>
  );
}
