"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, Bell, HandMetal, CheckCircle2, XCircle, LogOut, ChevronRight, UserCircle2, Video, Wallet, ArrowUpRight, ArrowDownLeft, Building2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Dinamis import untuk menghindari SSR pada Leaflet
const MapComponent = dynamic(() => import("../../../components/MapComponent"), { ssr: false, loading: () => <div className="w-full h-full min-h-[300px] flex items-center justify-center bg-slate-50 text-slate-400">Memuat Peta...</div> });

import { INCOMING_REQUESTS } from "@/lib/mockData";
import HistoryTab from "../../../components/dashboard/jbi/HistoryTab";
import ProfileTab from "../../../components/dashboard/jbi/ProfileTab";

export default function JBIDashboard() {
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);
  const [activeTab, setActiveTab] = useState("Permintaan Masuk");
  // Surabaya — Wonokromo
  const [mapCenter, setMapCenter] = useState<[number, number]>([-7.3153, 112.7359]);
  const [acceptedRequests, setAcceptedRequests] = useState<number[]>([]);

  // State for withdrawal mockup
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawStatus, setWithdrawStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    setWithdrawStatus("loading");
    setTimeout(() => {
      setWithdrawStatus("success");
      setTimeout(() => {
        setShowWithdraw(false);
        setWithdrawStatus("idle");
        setWithdrawAmount("");
      }, 2000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col md:flex-row">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 border-r border-slate-200 bg-white flex flex-col justify-between hidden md:flex h-screen sticky top-0">
        <div>
          <div className="h-20 flex items-center px-6 border-b border-slate-100">
            <HandMetal className="w-8 h-8 text-emerald-600" />
            <span className="ml-3 font-bold text-xl tracking-tight text-slate-800">IsyaratHUB</span>
          </div>
          <nav className="p-4 space-y-2">
            <NavItem icon={<Bell />} label="Permintaan Masuk" active={activeTab === "Permintaan Masuk"} count={3} onClick={() => setActiveTab("Permintaan Masuk")} />
            <NavItem icon={<MapPin />} label="Peta Lokasi" active={activeTab === "Peta Lokasi"} onClick={() => setActiveTab("Peta Lokasi")} />
            <NavItem icon={<Clock />} label="Jadwal & Riwayat" active={activeTab === "Jadwal & Riwayat"} onClick={() => setActiveTab("Jadwal & Riwayat")} />
            <NavItem icon={<Wallet />} label="Dompet JBI" active={activeTab === "Dompet JBI"} onClick={() => setActiveTab("Dompet JBI")} />
            <NavItem icon={<UserCircle2 />} label="Profil JBI" active={activeTab === "Profil JBI"} onClick={() => setActiveTab("Profil JBI")} />
          </nav>
        </div>
        <div className="p-4 border-t border-slate-100">
          <Link href="/login" className="flex items-center gap-3 p-3 rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Keluar</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-20 shadow-sm">
          <div className="flex items-center gap-3 md:hidden">
            <HandMetal className="w-6 h-6 text-emerald-600" />
            <span className="font-bold text-lg text-slate-800">IsyaratHUB</span>
          </div>

          <div className="hidden md:block">
            <h1 className="text-xl font-bold text-slate-800">Dashboard JBI</h1>
            <p className="text-sm text-slate-500">Kelola ketersediaan dan pesanan Anda</p>
          </div>
          
          <div className="flex items-center gap-6">
            {/* Status Toggle */}
            <div className="flex items-center gap-3 bg-slate-100 p-1.5 rounded-full border border-slate-200">
              <span className={`text-sm font-medium pl-3 transition-colors ${isActive ? 'text-emerald-600' : 'text-slate-500'}`}>
                {isActive ? 'Aktif' : 'Nonaktif'}
              </span>
              <button 
                onClick={() => setIsActive(!isActive)}
                className={`w-12 h-6 rounded-full relative transition-colors ${isActive ? 'bg-emerald-500' : 'bg-slate-300'}`}
              >
                <motion.div 
                  className="w-5 h-5 bg-white rounded-full absolute top-0.5 shadow-sm"
                  animate={{ left: isActive ? '26px' : '2px' }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </button>
            </div>

            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-sm font-bold text-emerald-700 border-2 border-emerald-200">
              BS
            </div>
          </div>
        </header>

        {/* Content Wrapper */}
        {activeTab === "Permintaan Masuk" ? (
          <div className="p-4 md:p-8 pb-24 md:pb-8 flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto w-full overflow-y-auto">
            
            {/* Left Column: Requests List */}
            <div className="lg:col-span-1 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  Permintaan Masuk
                  <span className="bg-emerald-100 text-emerald-700 text-xs py-0.5 px-2 rounded-full">3 Baru</span>
                </h2>
              </div>

              <div className="space-y-4">
                {INCOMING_REQUESTS.map((req, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={req.id} 
                    className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 hover:shadow-md transition-shadow relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
                    
                    <div className="flex gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 border border-slate-200">
                        {req.avatar}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800 flex items-center gap-2">
                          {req.name}
                          <span className={`text-[10px] uppercase font-bold py-0.5 px-2 rounded-md border ${req.mode === 'Online' ? 'bg-blue-50 text-blue-600 border-blue-200' : 'bg-orange-50 text-orange-600 border-orange-200'}`}>
                            {req.mode}
                          </span>
                        </h3>
                        <p className="text-xs text-emerald-600 font-medium">{req.type}</p>
                      </div>
                    </div>

                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Clock className="w-4 h-4 text-slate-400" />
                        {req.time}
                      </div>
                      <div className="flex items-start gap-2 text-sm text-slate-600">
                        <MapPin className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                        <span className="leading-tight">{req.location} <br/><span className="text-xs text-slate-400">({req.distance})</span></span>
                      </div>
                    </div>

                    {acceptedRequests.includes(req.id) ? (
                      <div className="flex flex-col gap-2">
                        <div className="bg-emerald-50 text-emerald-700 p-2.5 rounded-xl text-sm text-center font-medium border border-emerald-100">
                          Pesanan Diterima
                        </div>
                        {req.mode === 'Online' ? (
                          <button 
                            onClick={() => router.push('/call')}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-xl text-sm font-medium transition-colors flex justify-center items-center gap-2 shadow-sm"
                          >
                            <Video className="w-4 h-4" />
                            Mulai Video Call
                          </button>
                        ) : (
                          <button 
                            className="w-full bg-slate-800 hover:bg-slate-900 text-white py-2 rounded-xl text-sm font-medium transition-colors flex justify-center items-center gap-2 shadow-sm"
                          >
                            <MapPin className="w-4 h-4" />
                            Lihat Rute ke Lokasi
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setAcceptedRequests([...acceptedRequests, req.id])}
                          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-xl text-sm font-medium transition-colors flex justify-center items-center gap-2"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          Terima
                        </button>
                        <button className="flex-1 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 py-2 rounded-xl text-sm font-medium transition-colors flex justify-center items-center gap-2">
                          <XCircle className="w-4 h-4" />
                          Tolak
                        </button>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Column: Map & Active Stats */}
            <div className="lg:col-span-2 space-y-6 flex flex-col">
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard title="Total Selesai" value="124" />
                <StatCard title="Rating Rata-rata" value="4.9" icon={<span className="text-yellow-500">★</span>} />
                <StatCard title="Pendapatan (Bln)" value="Rp 3.2M" />
                <StatCard title="Tingkat Respons" value="98%" />
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex-1 flex flex-col min-h-[400px]">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                  <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-emerald-600" />
                    Peta Lokasi Penugasan
                  </h3>
                  <button className="text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
                    Buka di Maps <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex-1 relative z-0 p-2">
                  <MapComponent center={mapCenter} onLocationChange={(lat, lng) => setMapCenter([lat, lng])} readOnly={true} />
                </div>
              </div>

            </div>
          </div>
        ) : activeTab === "Peta Lokasi" ? (
          <div className="flex-1 p-8 h-full flex flex-col">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Peta Ketersediaan Anda</h2>
            <div className="flex-1 bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200">
               <MapComponent center={mapCenter} onLocationChange={(lat, lng) => setMapCenter([lat, lng])} readOnly={false} />
            </div>
          </div>
        ) : activeTab === "Jadwal & Riwayat" ? (
          <HistoryTab />
        ) : activeTab === "Dompet JBI" ? (
          <div className="flex-1 p-4 md:p-8 w-full max-w-5xl mx-auto animate-in fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-800">Dompet & Saldo</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-6 text-white shadow-xl shadow-emerald-900/20 md:col-span-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <p className="text-emerald-100 mb-2 font-medium">Total Saldo Aktif</p>
                <h3 className="text-4xl font-bold mb-6">Rp 1.250.000</h3>
                <div className="flex gap-4">
                  <button 
                    onClick={() => setShowWithdraw(true)}
                    className="px-6 py-3 bg-white text-emerald-700 font-bold rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-2"
                  >
                    <ArrowUpRight className="w-5 h-5" /> Tarik Dana
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-center">
                <p className="text-slate-500 font-medium mb-2">Total Pendapatan (Bulan Ini)</p>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Rp 3.200.000</h3>
                <p className="text-sm text-emerald-600 font-medium flex items-center gap-1"><ArrowUpRight className="w-4 h-4" /> +15% dari bulan lalu</p>
              </div>
            </div>

            <h3 className="text-lg font-bold text-slate-800 mb-4">Riwayat Transaksi</h3>
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="divide-y divide-slate-100">
                {[
                  { id: "TRX-001", type: "income", title: "Honor Sesi - Siska Saraswati (2 Jam)", amount: "+ Rp 135.000", date: "27 Sep 2026, 14:00" },
                  { id: "TRX-002", type: "withdraw", title: "Penarikan Dana ke BCA", amount: "- Rp 500.000", date: "25 Sep 2026, 09:30" },
                  { id: "TRX-003", type: "income", title: "Honor Sesi - Bima Arya (1 Jam)", amount: "+ Rp 67.500", date: "24 Sep 2026, 16:45" },
                  { id: "TRX-004", type: "income", title: "Honor Sesi - Rina Wijaya (3 Jam)", amount: "+ Rp 202.500", date: "22 Sep 2026, 10:00" }
                ].map((trx, idx) => (
                  <div key={idx} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${trx.type === 'income' ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-600'}`}>
                        {trx.type === 'income' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">{trx.title}</p>
                        <p className="text-xs text-slate-500">{trx.date}</p>
                      </div>
                    </div>
                    <span className={`font-bold ${trx.type === 'income' ? 'text-emerald-600' : 'text-slate-800'}`}>
                      {trx.amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : activeTab === "Profil JBI" ? (
           <ProfileTab />
        ) : null}

        {/* Mobile Bottom Navigation */}
        <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 z-50 flex justify-around items-center h-16 px-2 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
          <button onClick={() => setActiveTab("Permintaan Masuk")} className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${activeTab === 'Permintaan Masuk' ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}>
            <div className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </div>
            <span className="text-[10px] font-medium">Permintaan</span>
          </button>
          <button onClick={() => setActiveTab("Jadwal & Riwayat")} className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${activeTab === 'Jadwal & Riwayat' ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}>
            <Clock className="w-5 h-5" />
            <span className="text-[10px] font-medium">Jadwal</span>
          </button>
          <button onClick={() => setActiveTab("Dompet JBI")} className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${activeTab === 'Dompet JBI' ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}>
            <Wallet className="w-5 h-5" />
            <span className="text-[10px] font-medium">Dompet</span>
          </button>
          <button onClick={() => setActiveTab("Profil JBI")} className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${activeTab === 'Profil JBI' ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}>
            <UserCircle2 className="w-5 h-5" />
            <span className="text-[10px] font-medium">Profil</span>
          </button>
        </nav>
      </main>

      {/* Modal Penarikan Dana (Withdrawal) */}
      <AnimatePresence>
        {showWithdraw && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => withdrawStatus === 'idle' && setShowWithdraw(false)}
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden relative z-10"
            >
              {withdrawStatus === "success" ? (
                <div className="p-8 text-center flex flex-col items-center">
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">Penarikan Diproses!</h3>
                  <p className="text-slate-500 mb-6">Dana sebesar Rp {Number(withdrawAmount).toLocaleString('id-ID')} sedang ditransfer ke rekening BCA Anda.</p>
                </div>
              ) : (
                <>
                  <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="font-bold text-lg text-slate-800">Tarik Dana JBI</h3>
                    <button onClick={() => setShowWithdraw(false)} className="p-2 hover:bg-slate-100 rounded-full">
                      <XCircle className="w-5 h-5 text-slate-400" />
                    </button>
                  </div>
                  <form onSubmit={handleWithdraw} className="p-6 space-y-6">
                    <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex justify-between items-center">
                      <div>
                        <p className="text-xs text-slate-500 font-medium">Saldo Tersedia</p>
                        <p className="text-lg font-bold text-emerald-600">Rp 1.250.000</p>
                      </div>
                      <Wallet className="w-8 h-8 text-slate-300" />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Nominal Penarikan</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">Rp</span>
                        <input 
                          type="number" 
                          required
                          value={withdrawAmount}
                          onChange={(e) => setWithdrawAmount(e.target.value)}
                          max="1250000"
                          min="50000"
                          className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none font-semibold text-lg"
                          placeholder="0"
                        />
                      </div>
                      <p className="text-xs text-slate-500">Minimal penarikan Rp 50.000</p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Rekening Tujuan</label>
                      <div className="bg-white border border-slate-200 p-3 rounded-xl flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                          <Building2 className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 text-sm">BCA - 019283812</p>
                          <p className="text-xs text-slate-500">a/n Budi Santoso</p>
                        </div>
                      </div>
                    </div>

                    <button 
                      type="submit"
                      disabled={withdrawStatus === 'loading' || !withdrawAmount}
                      className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-200 disabled:opacity-50 flex justify-center items-center gap-2"
                    >
                      {withdrawStatus === 'loading' ? (
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      ) : (
                        "Tarik Dana Sekarang"
                      )}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

function NavItem({ icon, label, active = false, count, onClick }: { icon: React.ReactNode, label: string, active?: boolean, count?: number, onClick?: () => void }) {
  return (
    <button onClick={onClick} className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
      active 
        ? "bg-emerald-50 text-emerald-700 font-semibold" 
        : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
    }`}>
      <div className="flex items-center gap-3">
        <div className={`[&>svg]:w-5 [&>svg]:h-5 ${active ? 'text-emerald-600' : 'text-slate-400'}`}>
          {icon}
        </div>
        <span>{label}</span>
      </div>
      {count && (
        <span className="bg-emerald-600 text-white text-xs py-0.5 px-2 rounded-full font-bold">
          {count}
        </span>
      )}
    </button>
  );
}

function StatCard({ title, value, icon }: { title: string, value: string, icon?: React.ReactNode }) {
  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center">
      <p className="text-xs text-slate-500 mb-1 font-medium">{title}</p>
      <div className="text-xl font-bold text-slate-800 flex items-center gap-1">
        {value} {icon}
      </div>
    </div>
  );
}
