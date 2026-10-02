"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, Bell, HandMetal, CheckCircle2, XCircle, LogOut, ChevronRight, UserCircle2, Video, Wallet, ArrowUpRight, ArrowDownLeft, Building2, Navigation } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Dinamis import untuk menghindari SSR pada Leaflet
const MapComponent = dynamic(() => import("../../../components/MapComponent"), { ssr: false, loading: () => <div className="w-full h-full min-h-[300px] flex items-center justify-center bg-slate-100 text-slate-400">Memuat Peta...</div> });

import { INCOMING_REQUESTS } from "@/lib/mockData";
import HistoryTab from "../../../components/dashboard/jbi/HistoryTab";
import ProfileTab from "../../../components/dashboard/jbi/ProfileTab";

export default function JBIDashboard() {
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);
  const [activeTab, setActiveTab] = useState("Permintaan");
  const [mapCenter, setMapCenter] = useState<[number, number]>([-7.3153, 112.7359]);
  
  // State interaktif
  const [requests, setRequests] = useState(INCOMING_REQUESTS);
  const [acceptedRequests, setAcceptedRequests] = useState<number[]>([]);
  const [isMobileSheetOpen, setIsMobileSheetOpen] = useState(true);

  // States untuk fitur modal
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [withdrawStatus, setWithdrawStatus] = useState<"idle" | "loading" | "success">("idle");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [activeTracker, setActiveTracker] = useState<number | null>(null);

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

  const handleTolak = (id: number) => {
    setRequests(requests.filter(req => req.id !== id));
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden font-sans relative">
      
      {/* PETA FULLSCREEN (MODE TERANG) */}
      <div className="absolute inset-0 z-0 [&_.leaflet-control-zoom]:border-slate-200 [&_.leaflet-bar_a]:bg-white/80 [&_.leaflet-bar_a]:text-slate-600 [&_.leaflet-bar_a]:backdrop-blur-md [&_.leaflet-container]:bg-slate-100">
        <MapComponent center={mapCenter} onLocationChange={(lat, lng) => setMapCenter([lat, lng])} readOnly={true} />
      </div>

      {/* HEADER DESKTOP (BERSIH) */}
      <header className="hidden sm:flex absolute top-6 left-6 right-6 z-40 bg-white border border-slate-200 rounded-3xl px-6 py-4 items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 relative flex items-center justify-center">
            <img src="/logo_transparan.webp" alt="IsyaratHUB" className="w-full h-full object-contain drop-shadow-sm" />
          </div>
          <span className="font-bold text-xl text-slate-800">IsyaratHUB <span className="text-emerald-600 text-sm">Mitra</span></span>
        </div>
        
        <nav className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
          <NavItem icon={<Bell />} label="Permintaan" active={activeTab === "Permintaan"} count={requests.length} onClick={() => setActiveTab("Permintaan")} />
          <NavItem icon={<Clock />} label="Riwayat" active={activeTab === "Riwayat"} onClick={() => setActiveTab("Riwayat")} />
          <NavItem icon={<Wallet />} label="Pendapatan" active={activeTab === "Pendapatan"} onClick={() => setActiveTab("Pendapatan")} />
        </nav>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 bg-slate-50 p-1.5 rounded-full border border-slate-200">
            <span className={`text-sm font-bold pl-3 transition-colors ${isActive ? 'text-emerald-600' : 'text-slate-400'}`}>
              {isActive ? 'Sedang Aktif' : 'Nonaktif'}
            </span>
            <button 
              onClick={() => setIsActive(!isActive)}
              className={`w-14 h-8 rounded-full relative transition-colors shadow-inner ${isActive ? 'bg-emerald-500' : 'bg-slate-300'}`}
            >
              <motion.div className="w-6 h-6 bg-white rounded-full absolute top-1 shadow-sm" animate={{ left: isActive ? '30px' : '4px' }} />
            </button>
          </div>
          
          <button onClick={() => setActiveTab("Profil")} className="flex items-center gap-3 hover:bg-slate-50 p-2 rounded-2xl transition-colors">
            <div className="text-right hidden md:block">
              <p className="text-sm font-bold text-slate-800 leading-tight">Budi S.</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-emerald-700">
              BS
            </div>
          </button>
        </div>
      </header>

      {/* HEADER MOBILE */}
      <header className="sm:hidden absolute top-0 left-0 w-full z-40 pt-6 pb-12 px-6 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto">
          <div className="w-12 h-12 relative flex items-center justify-center drop-shadow-lg bg-white rounded-2xl p-2 border border-slate-100">
            <img src="/logo_transparan.webp" alt="IsyaratHUB" className="w-full h-full object-contain" />
          </div>
        </div>
        
        <div className="pointer-events-auto flex items-center gap-3 bg-white/95 backdrop-blur-md p-1.5 rounded-full border border-slate-200 shadow-sm">
          <span className={`text-sm font-bold pl-3 transition-colors ${isActive ? 'text-emerald-600' : 'text-slate-400'}`}>
            {isActive ? 'Aktif' : 'Nonaktif'}
          </span>
          <button 
            onClick={() => setIsActive(!isActive)}
            className={`w-12 h-7 rounded-full relative transition-colors ${isActive ? 'bg-emerald-500' : 'bg-slate-300'}`}
          >
            <motion.div className="w-5 h-5 bg-white rounded-full absolute top-1 shadow-sm" animate={{ left: isActive ? '26px' : '4px' }} />
          </button>
        </div>
      </header>

      {/* KONTEN UTAMA */}
      {activeTab === "Permintaan" && (
        <>
          {/* SIDEBAR DESKTOP */}
          <aside className="hidden sm:flex absolute top-32 left-6 bottom-6 w-[420px] bg-white border border-slate-200 rounded-3xl shadow-xl flex-col z-30 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-slate-800">Tugas Baru</h2>
              <span className="bg-emerald-100 text-emerald-700 text-sm font-bold py-1 px-3 rounded-xl">{requests.length} Masuk</span>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              <AnimatePresence>
                {requests.length === 0 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-10 text-slate-500 font-medium">
                    Tidak ada tugas baru saat ini.
                  </motion.div>
                )}
                {requests.map((req, i) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}
                    key={req.id} className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 hover:border-emerald-200 hover:shadow-md transition-all relative overflow-hidden"
                  >
                    <div className="flex gap-4 mb-5">
                      <div className="w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center font-bold text-2xl text-slate-700 border border-slate-100">
                        {req.avatar}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-800 text-xl">{req.name}</h3>
                        <p className="text-emerald-600 font-bold text-sm">{req.mode} • {req.distance}</p>
                      </div>
                    </div>

                    {acceptedRequests.includes(req.id) ? (
                      <div className="space-y-3">
                        <div className="bg-emerald-50 text-emerald-700 p-3 rounded-2xl font-bold text-center border border-emerald-100">Tugas Diterima</div>
                        <button 
                          onClick={() => req.mode === 'Online' ? router.push('/call') : setActiveTracker(req.id)}
                          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-bold flex justify-center items-center gap-2 text-lg shadow-lg shadow-emerald-200 transition-colors"
                        >
                          {req.mode === 'Online' ? <><Video className="w-6 h-6" /> Mulai Call</> : <><MapPin className="w-6 h-6" /> Menuju Lokasi</>}
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-3">
                        <button onClick={() => setAcceptedRequests([...acceptedRequests, req.id])} className="flex-[2] bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-bold shadow-lg shadow-emerald-200 text-lg transition-colors">Terima</button>
                        <button onClick={() => handleTolak(req.id)} className="flex-1 bg-slate-50 hover:bg-slate-100 text-slate-500 border border-slate-200 py-4 rounded-2xl font-bold text-lg transition-colors">Tolak</button>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </aside>

          {/* BOTTOM SHEET MOBILE */}
          <motion.aside 
            initial={{ y: "100%" }}
            animate={{ y: isMobileSheetOpen ? 0 : "75%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="sm:hidden absolute bottom-20 left-0 w-full h-[65%] bg-white border-t border-slate-200 rounded-t-[2.5rem] flex flex-col z-30 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]"
          >
            <div className="w-full flex justify-center pt-4 pb-2" onClick={() => setIsMobileSheetOpen(!isMobileSheetOpen)}>
              <div className="w-12 h-1.5 bg-slate-300 rounded-full cursor-pointer" />
            </div>
            
            <div className="px-6 pb-2 pt-2 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-slate-800">Tugas Baru</h2>
              <span className="bg-emerald-100 text-emerald-700 text-sm font-bold py-1 px-3 rounded-xl">{requests.length} Masuk</span>
            </div>

            <div className="flex-1 overflow-y-auto px-6 pb-6 pt-2 space-y-4 custom-scrollbar">
              <AnimatePresence>
                {requests.length === 0 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-10 text-slate-500 font-medium">
                    Tidak ada tugas baru saat ini.
                  </motion.div>
                )}
                {requests.map((req) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}
                    key={req.id} className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm relative overflow-hidden"
                  >
                    <div className="flex gap-4 mb-4">
                      <div className="w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center font-bold text-2xl text-slate-700 border border-slate-100">{req.avatar}</div>
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-800 text-xl">{req.name}</h3>
                        <p className="text-emerald-600 font-bold text-sm">{req.mode} • {req.distance}</p>
                      </div>
                    </div>

                    {acceptedRequests.includes(req.id) ? (
                      <button 
                        onClick={() => req.mode === 'Online' ? router.push('/call') : setActiveTracker(req.id)}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-emerald-200 transition-colors flex justify-center gap-2 items-center"
                      >
                        {req.mode === 'Online' ? <><Video className="w-6 h-6" /> Mulai Call</> : <><MapPin className="w-6 h-6" /> Menuju Lokasi</>}
                      </button>
                    ) : (
                      <div className="flex gap-3">
                        <button onClick={() => setAcceptedRequests([...acceptedRequests, req.id])} className="flex-[2] bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-emerald-200 transition-colors">Terima</button>
                        <button onClick={() => handleTolak(req.id)} className="flex-1 bg-slate-50 hover:bg-slate-100 text-slate-500 border border-slate-200 py-4 rounded-2xl font-bold text-lg transition-colors">Tolak</button>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.aside>
        </>
      )}

      {/* TABS LAINNYA */}
      {activeTab !== "Permintaan" && (
        <div className="absolute inset-0 z-20 bg-slate-50 pt-24 sm:pt-32 p-6 overflow-y-auto">
          {activeTab === "Profil" && <ProfileTab />}
          {activeTab === "Riwayat" && <HistoryTab />}
          
          {activeTab === "Pendapatan" && (
            <div className="w-full max-w-3xl mx-auto pb-24">
              <h2 className="text-3xl font-bold text-slate-800 mb-8">Pendapatan Saya</h2>
              
              <div className="bg-white rounded-[2rem] p-8 text-center shadow-sm border border-slate-200 mb-8">
                <p className="text-slate-500 font-bold mb-2">Saldo Bisa Ditarik</p>
                <h3 className="text-6xl font-black text-slate-800 mb-8">Rp 1.250.000</h3>
                <button 
                  onClick={() => setShowWithdraw(true)}
                  className="w-full sm:w-auto px-12 py-5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-xl shadow-xl shadow-emerald-200 transition-all"
                >
                  Tarik ke Rekening
                </button>
              </div>

              <h3 className="text-xl font-bold text-slate-800 mb-4">Riwayat Terbaru</h3>
              <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-800 text-lg">Mendampingi Siska (2 Jam)</p>
                    <p className="text-slate-500 text-sm">Hari ini, 14:00</p>
                  </div>
                  <span className="font-black text-xl text-emerald-600">+ Rp 135.000</span>
                </div>
                <div className="p-6 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-800 text-lg">Penarikan Dana</p>
                    <p className="text-slate-500 text-sm">Kemarin, 09:30</p>
                  </div>
                  <span className="font-black text-xl text-slate-800">- Rp 500.000</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* NAVIGASI BAWAH MOBILE */}
      <nav className="sm:hidden absolute bottom-0 left-0 w-full bg-white border-t border-slate-200 z-50 flex justify-around items-center pb-safe pt-2 h-20 px-2 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <MobileNavItem icon={<Bell />} label="Tugas" active={activeTab === "Permintaan"} onClick={() => setActiveTab("Permintaan")} count={requests.length} />
        <MobileNavItem icon={<Clock />} label="Riwayat" active={activeTab === "Riwayat"} onClick={() => setActiveTab("Riwayat")} />
        <MobileNavItem icon={<Wallet />} label="Uang" active={activeTab === "Pendapatan"} onClick={() => setActiveTab("Pendapatan")} />
        <MobileNavItem icon={<UserCircle2 />} label="Profil" active={activeTab === "Profil"} onClick={() => setActiveTab("Profil")} />
      </nav>

      {/* MODAL PENARIKAN DANA (WITHDRAW) */}
      <AnimatePresence>
        {showWithdraw && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => withdrawStatus === 'idle' && setShowWithdraw(false)}
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 100 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 100 }}
              className="bg-white border border-slate-200 rounded-3xl w-full max-w-md shadow-2xl relative z-10 overflow-hidden"
            >
              {withdrawStatus === "success" ? (
                <div className="p-10 text-center flex flex-col items-center">
                  <div className="w-24 h-24 bg-emerald-50 text-emerald-500 border-4 border-emerald-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-800 mb-3">Diproses!</h3>
                  <p className="text-slate-500 mb-6 text-lg">Dana Rp {Number(withdrawAmount).toLocaleString('id-ID')} sedang ditransfer ke BCA Anda.</p>
                </div>
              ) : (
                <>
                  <div className="p-6 flex justify-between items-center bg-slate-50 border-b border-slate-100">
                    <h3 className="font-bold text-xl text-slate-800">Tarik Dana JBI</h3>
                    <button onClick={() => setShowWithdraw(false)} className="p-2 bg-white rounded-full text-slate-400 hover:text-slate-600 transition-colors shadow-sm">
                      <XCircle className="w-6 h-6" />
                    </button>
                  </div>
                  <form onSubmit={handleWithdraw} className="p-6 space-y-6">
                    <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl flex justify-between items-center shadow-sm">
                      <div>
                        <p className="text-sm text-slate-500 font-bold mb-1">Saldo Tersedia</p>
                        <p className="text-2xl font-black text-emerald-600">Rp 1.250.000</p>
                      </div>
                      <Wallet className="w-10 h-10 text-slate-300" />
                    </div>
                    
                    <div className="space-y-3">
                      <label className="text-base font-bold text-slate-800">Nominal Penarikan</label>
                      <div className="relative">
                        <span className="absolute left-5 top-1/2 -translate-y-1/2 font-black text-slate-400 text-lg">Rp</span>
                        <input 
                          type="number" 
                          required
                          value={withdrawAmount}
                          onChange={(e) => setWithdrawAmount(e.target.value)}
                          max="1250000"
                          min="50000"
                          className="w-full pl-14 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-1 focus:ring-emerald-500 outline-none font-bold text-xl text-slate-800"
                          placeholder="0"
                        />
                      </div>
                      <p className="text-sm text-slate-500 font-medium">Minimal penarikan Rp 50.000</p>
                    </div>

                    <button 
                      type="submit"
                      disabled={withdrawStatus === 'loading' || !withdrawAmount}
                      className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition-all shadow-xl shadow-emerald-200 disabled:opacity-50 flex justify-center items-center gap-2 text-xl mt-4"
                    >
                      {withdrawStatus === 'loading' ? "Memproses..." : "Tarik Sekarang"}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* TRACKER MODAL JBI (MENUJU LOKASI) */}
      <AnimatePresence>
        {activeTracker !== null && (
          <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center sm:p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="w-full sm:max-w-md bg-white border border-slate-200 sm:rounded-3xl rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] pointer-events-auto overflow-hidden"
            >
              <div className="p-6 text-center relative">
                <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6 cursor-pointer" onClick={() => setActiveTracker(null)} />
                
                {(() => {
                  const req = requests.find(r => r.id === activeTracker);
                  return req ? (
                    <>
                      <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center text-4xl font-black text-emerald-600 mx-auto mb-4 border-4 border-emerald-100 shadow-inner">
                        {req.avatar}
                      </div>
                      <h2 className="text-2xl font-bold text-slate-800 mb-1">Menuju ke {req.name}</h2>
                      <p className="text-emerald-600 font-bold mb-6 flex items-center justify-center gap-1"><Navigation className="w-4 h-4" /> Ikuti Rute di Peta</p>
                      
                      <div className="bg-slate-50 rounded-2xl p-4 mb-8 border border-slate-100 text-left flex items-center gap-3 shadow-sm">
                         <MapPin className="w-6 h-6 text-slate-400" />
                         <div>
                           <p className="text-xs text-slate-500 font-bold">Lokasi Tujuan</p>
                           <p className="text-sm font-bold text-slate-800">{req.location}</p>
                         </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-2">
                        <button onClick={() => setActiveTracker(null)} className="w-full py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-2xl transition-all text-lg">
                          Tutup Peta
                        </button>
                        <button onClick={() => { 
                          handleTolak(req.id); // Remove from list since it's completed
                          setActiveTracker(null);
                        }} className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-emerald-200 text-lg">
                          Selesai Sesi
                        </button>
                      </div>
                    </>
                  ) : null;
                })()}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

// Komponen Pembantu
function NavItem({ icon, label, active = false, count, onClick }: { icon: React.ReactNode, label: string, active?: boolean, count?: number, onClick?: () => void }) {
  return (
    <button onClick={onClick} className={`px-5 py-2.5 rounded-xl transition-all font-bold text-sm flex items-center gap-2 ${active ? "bg-white shadow-sm text-slate-800" : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"}`}>
      <div className="[&>svg]:w-5 [&>svg]:h-5">{icon}</div>
      {label}
      {count !== undefined && count > 0 && (
        <span className={`ml-1 text-[10px] py-0.5 px-2.5 rounded-full font-black ${active ? 'bg-red-500 text-white' : 'bg-slate-200 text-slate-600'}`}>
          {count}
        </span>
      )}
    </button>
  );
}

function MobileNavItem({ icon, label, active = false, count, onClick }: { icon: React.ReactNode, label: string, active?: boolean, count?: number, onClick?: () => void }) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${active ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}>
      <div className="relative [&>svg]:w-6 [&>svg]:h-6">
        {icon}
        {count !== undefined && count > 0 && <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-red-500 text-white text-[9px] font-black flex items-center justify-center rounded-full border-2 border-white">{count}</span>}
      </div>
      <span className="text-xs font-bold">{label}</span>
    </button>
  );
}
