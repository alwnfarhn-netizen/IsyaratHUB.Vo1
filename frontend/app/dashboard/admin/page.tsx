"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, Search, CheckCircle2, XCircle, FileText, UserCircle2, ExternalLink, Menu, 
  DollarSign, ArrowUpRight, ArrowDownRight, Wallet, Users, Settings, Activity, AlertCircle,
  MessageSquare, UserX, UserCheck
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// --- MOCK DATA ---
const PENDING_JBIS = [
  { id: "reg-001", name: "Siska Saraswati", email: "siska.s@gmail.com", date: "27 Sep 2026", status: "pending", certName: "Sertifikat JBI Level I.pdf" },
  { id: "reg-002", name: "Bima Arya", email: "bima.arya@yahoo.com", date: "26 Sep 2026", status: "pending", certName: "Sertifikat_JBI_Bima.jpg" },
  { id: "reg-003", name: "Rina Wijaya", email: "rina.w@gmail.com", date: "26 Sep 2026", status: "approved", certName: "Sertifikat JBI.pdf" },
];

const MOCK_TRANSACTIONS = [
  { id: "TRX-001", date: "30 Sep 2026", user: "Rudi H.", jbi: "Budi Santoso", total: 150000, commission: 15000, status: "success" },
  { id: "TRX-002", date: "30 Sep 2026", user: "Sari A.", jbi: "Siska S.", total: 75000, commission: 7500, status: "success" },
];

const MOCK_WITHDRAWALS = [
  { id: "WD-001", date: "30 Sep 2026", jbi: "Budi Santoso", bank: "BCA 123456789", amount: 500000, status: "pending" },
];

const MOCK_USERS = [
  { id: "usr-01", name: "Budi Santoso", role: "JBI", status: "active", rating: 4.9, sessions: 124 },
  { id: "usr-02", name: "Rudi Heryanto", role: "Teman Tuli", status: "active", rating: 0, sessions: 12 },
  { id: "usr-03", name: "Andi Permana", role: "JBI", status: "suspended", rating: 3.2, sessions: 5 },
];

const MOCK_TICKETS = [
  { id: "T-001", user: "Rudi Heryanto", subject: "JBI Terlambat Datang", status: "open", priority: "high", date: "Hari ini, 10:30" },
  { id: "T-002", user: "Budi Santoso", subject: "Masalah Penarikan Dana", status: "resolved", priority: "medium", date: "Kemarin, 14:15" },
];

type AdminTab = "overview" | "verification" | "users" | "finance" | "support" | "settings";

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [jbis, setJbis] = useState(PENDING_JBIS);
  const [users, setUsers] = useState(MOCK_USERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Verifikasi JBI
  const handleVerify = (id: string, newStatus: string) => {
    setJbis(prev => prev.map(j => j.id === id ? { ...j, status: newStatus } : j));
  };

  // Manajemen Pengguna
  const handleToggleUserStatus = (id: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === id) {
        return { ...u, status: u.status === 'active' ? 'suspended' : 'active' };
      }
      return u;
    }));
  };

  const getPageHeader = () => {
    switch(activeTab) {
      case "overview": return { title: "Ringkasan Utama", desc: "Performa dan metrik platform secara real-time" };
      case "verification": return { title: "Verifikasi Mitra", desc: "Tinjau pendaftaran Juru Bahasa Isyarat baru" };
      case "users": return { title: "Manajemen Pengguna", desc: "Kelola akun JBI dan Teman Tuli" };
      case "finance": return { title: "Keuangan & Laporan", desc: "Pantau komisi platform dan penarikan dana" };
      case "support": return { title: "Pusat Bantuan", desc: "Kelola komplain dan tiket bantuan pengguna" };
      case "settings": return { title: "Pengaturan Platform", desc: "Konfigurasi tarif, kebijakan, dan sistem" };
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      
      {/* Sidebar Navigation (Desktop) */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 border-r border-slate-200 bg-white flex flex-col justify-between transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div>
          <div className="h-20 flex items-center px-6 border-b border-slate-100 justify-between">
            <div className="flex items-center">
              <ShieldCheck className="w-8 h-8 text-blue-600" />
              <span className="ml-3 font-bold text-xl tracking-tight text-slate-800">AdminPanel</span>
            </div>
            <button className="lg:hidden p-2 text-slate-500" onClick={() => setIsMobileMenuOpen(false)}>
              <XCircle className="w-6 h-6" />
            </button>
          </div>
          <nav className="p-4 space-y-1.5 overflow-y-auto">
            <NavItem icon={<Activity />} label="Ringkasan Utama" active={activeTab === 'overview'} onClick={() => {setActiveTab('overview'); setIsMobileMenuOpen(false);}} />
            <NavItem icon={<UserCircle2 />} label="Verifikasi JBI" active={activeTab === 'verification'} count={jbis.filter(j => j.status === 'pending').length} onClick={() => {setActiveTab('verification'); setIsMobileMenuOpen(false);}} />
            <NavItem icon={<Users />} label="Manajemen Pengguna" active={activeTab === 'users'} onClick={() => {setActiveTab('users'); setIsMobileMenuOpen(false);}} />
            <NavItem icon={<DollarSign />} label="Keuangan" active={activeTab === 'finance'} count={1} onClick={() => {setActiveTab('finance'); setIsMobileMenuOpen(false);}} />
            <NavItem icon={<MessageSquare />} label="Bantuan & Komplain" active={activeTab === 'support'} count={1} onClick={() => {setActiveTab('support'); setIsMobileMenuOpen(false);}} />
            <NavItem icon={<Settings />} label="Pengaturan" active={activeTab === 'settings'} onClick={() => {setActiveTab('settings'); setIsMobileMenuOpen(false);}} />
          </nav>
        </div>
        <div className="p-4 border-t border-slate-100">
          <Link href="/login" className="flex items-center gap-3 p-3 rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors font-medium">
            Keluar Administrator
          </Link>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-slate-900/50 z-30 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-20 shrink-0">
          <div className="flex items-center gap-3 lg:hidden">
            <button onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="w-6 h-6 text-slate-600" />
            </button>
            <span className="font-bold text-lg text-slate-800">AdminPanel</span>
          </div>

          <div className="hidden lg:block">
            <h1 className="text-xl font-bold text-slate-800">{getPageHeader().title}</h1>
            <p className="text-sm text-slate-500">{getPageHeader().desc}</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Cari..." 
                className="pl-9 pr-4 py-2.5 bg-slate-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none w-64 font-medium"
              />
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-700 border border-blue-200">
              A
            </div>
          </div>
        </header>

        {/* Content Scrollable Area */}
        <div className="flex-1 p-4 sm:p-8 overflow-y-auto custom-scrollbar">
          <div className="max-w-6xl mx-auto space-y-8">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                
                {/* 1. OVERVIEW (RINGKASAN) */}
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      <StatCard title="Total Pengguna" value="1,248" trend="+12%" icon={<Users className="w-6 h-6 text-blue-600" />} bg="bg-blue-50" />
                      <StatCard title="JBI Aktif" value="45" trend="+5%" icon={<ShieldCheck className="w-6 h-6 text-emerald-600" />} bg="bg-emerald-50" />
                      <StatCard title="Sesi Selesai (Bulan ini)" value="342" trend="+18%" icon={<CheckCircle2 className="w-6 h-6 text-purple-600" />} bg="bg-purple-50" />
                      <StatCard title="Komisi Platform" value="Rp 2.150k" trend="+22%" icon={<DollarSign className="w-6 h-6 text-orange-600" />} bg="bg-orange-50" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                        <h3 className="font-bold text-lg mb-4 text-slate-800">Aktivitas Terbaru</h3>
                        <div className="space-y-4">
                          {[1,2,3].map(i => (
                            <div key={i} className="flex items-center gap-4">
                              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                              <div>
                                <p className="text-sm font-bold text-slate-700">Sesi baru selesai oleh Budi Santoso</p>
                                <p className="text-xs text-slate-500">10 menit yang lalu</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-3xl shadow-lg text-white">
                        <h3 className="font-bold text-lg mb-2 text-blue-100">Status Server</h3>
                        <div className="flex items-end gap-2 mb-6">
                          <span className="text-5xl font-black">99.9%</span>
                          <span className="text-blue-200 mb-1 font-medium">Uptime</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm"><span className="text-blue-200">Database (Supabase)</span><span className="font-bold text-emerald-300">Sehat</span></div>
                          <div className="flex justify-between text-sm"><span className="text-blue-200">Payment Gateway</span><span className="font-bold text-emerald-300">Sehat</span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. VERIFIKASI JBI */}
                {activeTab === "verification" && (
                  <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                      <h3 className="font-bold text-lg text-slate-800">Antrean Verifikasi ({jbis.filter(j=>j.status==='pending').length})</h3>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse min-w-[600px]">
                        <thead>
                          <tr className="bg-white border-b border-slate-100 text-slate-500 text-sm">
                            <th className="p-4 font-medium pl-6">Nama JBI</th>
                            <th className="p-4 font-medium">Dokumen</th>
                            <th className="p-4 font-medium">Status</th>
                            <th className="p-4 font-medium text-right pr-6">Aksi</th>
                          </tr>
                        </thead>
                        <tbody>
                          {jbis.map((jbi) => (
                            <tr key={jbi.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 pl-6">
                                <p className="font-bold text-slate-800">{jbi.name}</p>
                                <p className="text-xs text-slate-500">{jbi.email}</p>
                              </td>
                              <td className="p-4">
                                <button className="flex items-center gap-2 text-sm text-blue-600 font-medium hover:underline">
                                  <FileText className="w-4 h-4" /> {jbi.certName}
                                </button>
                              </td>
                              <td className="p-4">
                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                                  jbi.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                                  jbi.status === 'approved' ? 'bg-emerald-100 text-emerald-700' :
                                  'bg-red-100 text-red-700'
                                }`}>
                                  {jbi.status.toUpperCase()}
                                </span>
                              </td>
                              <td className="p-4 pr-6 text-right">
                                {jbi.status === 'pending' ? (
                                  <div className="flex justify-end gap-2">
                                    <button onClick={() => handleVerify(jbi.id, 'approved')} className="p-2 text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors">
                                      <CheckCircle2 className="w-5 h-5" />
                                    </button>
                                    <button onClick={() => handleVerify(jbi.id, 'rejected')} className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors">
                                      <XCircle className="w-5 h-5" />
                                    </button>
                                  </div>
                                ) : (
                                  <span className="text-sm font-medium text-slate-400">Selesai</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* 3. MANAJEMEN PENGGUNA */}
                {activeTab === "users" && (
                  <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center">
                      <h3 className="font-bold text-lg text-slate-800">Daftar Pengguna</h3>
                      <div className="flex gap-2">
                        <span className="px-3 py-1.5 bg-slate-100 text-slate-600 text-sm font-bold rounded-lg border border-slate-200">Semua</span>
                        <span className="px-3 py-1.5 hover:bg-slate-50 text-slate-500 cursor-pointer text-sm font-bold rounded-lg transition-colors">JBI</span>
                        <span className="px-3 py-1.5 hover:bg-slate-50 text-slate-500 cursor-pointer text-sm font-bold rounded-lg transition-colors">Teman Tuli</span>
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="text-slate-500 text-sm border-b border-slate-100">
                            <th className="p-4 pl-6 font-medium">Pengguna</th>
                            <th className="p-4 font-medium">Peran</th>
                            <th className="p-4 font-medium">Sesi</th>
                            <th className="p-4 font-medium">Status</th>
                            <th className="p-4 font-medium text-right pr-6">Aksi (Suspend)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.map(user => (
                            <tr key={user.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                              <td className="p-4 pl-6 font-bold text-slate-800">{user.name}</td>
                              <td className="p-4 text-sm text-slate-600 font-medium">{user.role}</td>
                              <td className="p-4 text-sm text-slate-600 font-medium">{user.sessions}</td>
                              <td className="p-4">
                                <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold ${user.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                                  {user.status === 'active' ? 'Aktif' : 'Disuspend'}
                                </span>
                              </td>
                              <td className="p-4 pr-6 text-right">
                                <button 
                                  onClick={() => handleToggleUserStatus(user.id)}
                                  className={`p-2 rounded-xl transition-colors ${user.status === 'active' ? 'text-red-600 hover:bg-red-50' : 'text-emerald-600 hover:bg-emerald-50'}`}
                                  title={user.status === 'active' ? 'Suspend Akun' : 'Aktifkan Akun'}
                                >
                                  {user.status === 'active' ? <UserX className="w-5 h-5" /> : <UserCheck className="w-5 h-5" />}
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* 4. KEUANGAN & LAPORAN */}
                {activeTab === "finance" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-3xl shadow-lg text-white">
                        <p className="text-blue-100 font-medium mb-1">Saldo Operasional (Komisi 10%)</p>
                        <h3 className="text-4xl font-black mb-4">Rp 1.250.000</h3>
                        <button className="bg-white/20 hover:bg-white/30 text-white w-full py-3 rounded-xl font-bold transition-colors">Tarik Dana Platform</button>
                      </div>
                      
                      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-center">
                        <p className="text-slate-500 font-medium mb-1">Total Pendapatan JBI (90%)</p>
                        <h3 className="text-3xl font-black text-slate-800">Rp 11.250.000</h3>
                      </div>
                      
                      <div className="bg-orange-50 p-6 rounded-3xl border border-orange-100 flex flex-col justify-center">
                        <div className="flex justify-between items-start mb-2">
                          <p className="text-orange-700 font-bold">Menunggu Pencairan</p>
                          <AlertCircle className="w-6 h-6 text-orange-500" />
                        </div>
                        <h3 className="text-3xl font-black text-orange-900">Rp 500.000</h3>
                        <p className="text-sm text-orange-600 mt-2">1 Permintaan Withdrawal JBI</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-100"><h3 className="font-bold text-lg">Transaksi Terbaru</h3></div>
                        <div className="p-4 space-y-3">
                          {MOCK_TRANSACTIONS.map(trx => (
                            <div key={trx.id} className="flex justify-between items-center p-3 hover:bg-slate-50 rounded-xl transition-colors">
                              <div>
                                <p className="font-bold text-slate-800">{trx.user} <span className="text-slate-400 font-normal">→</span> {trx.jbi}</p>
                                <p className="text-xs text-slate-500">{trx.date}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-slate-800">Rp {trx.total.toLocaleString('id-ID')}</p>
                                <p className="text-xs font-bold text-emerald-600">+Rp {trx.commission.toLocaleString('id-ID')} Komisi</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-100"><h3 className="font-bold text-lg">Permintaan Tarik Dana</h3></div>
                        <div className="p-6">
                          {MOCK_WITHDRAWALS.map(wd => (
                            <div key={wd.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-4">
                              <div className="flex justify-between mb-4">
                                <div>
                                  <p className="font-bold text-slate-800 text-lg">{wd.jbi}</p>
                                  <p className="text-sm font-medium text-slate-500">{wd.bank}</p>
                                </div>
                                <p className="text-xl font-black text-slate-800">Rp {wd.amount.toLocaleString('id-ID')}</p>
                              </div>
                              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors shadow-sm">
                                Tandai Sudah Ditransfer
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. BANTUAN & KOMPLAIN */}
                {activeTab === "support" && (
                  <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                      <h3 className="font-bold text-lg text-slate-800">Tiket Bantuan</h3>
                    </div>
                    <div className="divide-y divide-slate-100">
                      {MOCK_TICKETS.map(ticket => (
                        <div key={ticket.id} className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-slate-50 transition-colors">
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <span className="font-bold text-slate-800 text-lg">{ticket.subject}</span>
                              {ticket.priority === 'high' && <span className="bg-red-100 text-red-700 text-[10px] px-2 py-0.5 rounded-full font-black uppercase">Penting</span>}
                            </div>
                            <p className="text-sm text-slate-600 font-medium">Dari: {ticket.user} • {ticket.date}</p>
                          </div>
                          <button className={`px-4 py-2 font-bold rounded-xl text-sm transition-colors border ${ticket.status === 'open' ? 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100' : 'bg-slate-50 text-slate-500 border-slate-200'}`}>
                            {ticket.status === 'open' ? 'Balas Tiket' : 'Terselesaikan'}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 6. PENGATURAN PLATFORM */}
                {activeTab === "settings" && (
                  <div className="max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-sm p-8 space-y-8">
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 mb-6">Konfigurasi Bisnis</h3>
                      <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row justify-between gap-4 py-3 border-b border-slate-100">
                          <div>
                            <p className="font-bold text-slate-800">Tarif Dasar JBI (Per Jam)</p>
                            <p className="text-sm text-slate-500">Berlaku untuk semua mitra standar.</p>
                          </div>
                          <div className="relative w-40">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-400">Rp</span>
                            <input type="text" defaultValue="50.000" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-9 pr-3 font-bold text-slate-800 outline-none focus:border-blue-500" />
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-between gap-4 py-3 border-b border-slate-100">
                          <div>
                            <p className="font-bold text-slate-800">Komisi Platform (%)</p>
                            <p className="text-sm text-slate-500">Potongan untuk kas operasional.</p>
                          </div>
                          <div className="relative w-40">
                            <input type="text" defaultValue="10" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 font-bold text-slate-800 outline-none focus:border-blue-500 text-right" />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition-colors">
                      Simpan Perubahan
                    </button>
                  </div>
                )}

              </motion.div>
            </AnimatePresence>
            
          </div>
        </div>
      </main>

    </div>
  );
}

// Komponen Pembantu
function StatCard({ title, value, trend, icon, bg }: { title: string, value: string, trend: string, icon: React.ReactNode, bg: string }) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${bg}`}>
          {icon}
        </div>
        <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2 py-1 rounded-full">{trend}</span>
      </div>
      <div>
        <p className="text-slate-500 font-medium mb-1 text-sm">{title}</p>
        <h3 className="text-2xl font-black text-slate-800">{value}</h3>
      </div>
    </div>
  );
}

function NavItem({ icon, label, active = false, count, onClick }: { icon: React.ReactNode, label: string, active?: boolean, count?: number, onClick?: () => void }) {
  return (
    <button onClick={onClick} className={`w-full flex items-center justify-between p-3.5 rounded-2xl transition-all ${
      active 
        ? "bg-blue-600 text-white font-bold shadow-lg shadow-blue-200" 
        : "text-slate-500 hover:bg-slate-50 hover:text-slate-800 font-medium"
    }`}>
      <div className="flex items-center gap-3">
        <div className={`[&>svg]:w-5 [&>svg]:h-5 ${active ? 'text-white' : 'text-slate-400'}`}>
          {icon}
        </div>
        <span>{label}</span>
      </div>
      {count !== undefined && count > 0 && (
        <span className={`text-xs py-1 px-2.5 rounded-full font-black ${active ? 'bg-white text-blue-700' : 'bg-blue-100 text-blue-700'}`}>
          {count}
        </span>
      )}
    </button>
  );
}
