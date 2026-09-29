"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Star, Clock, Bell, HandMetal, UserCircle2, X, Video, Wallet, ChevronRight, QrCode } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Dinamis import untuk menghindari SSR pada Leaflet
const MapComponent = dynamic(() => import("../../../components/MapComponent"), { ssr: false, loading: () => <div className="w-full h-full min-h-[400px] flex items-center justify-center bg-slate-100 text-slate-400">Memuat Peta...</div> });

import { MOCK_JBI } from "@/lib/mockData";
import HistoryTab from "../../../components/dashboard/user/HistoryTab";
import NotificationTab from "../../../components/dashboard/user/NotificationTab";
import ProfileTab from "../../../components/dashboard/user/ProfileTab";
import LiveTracker from "../../../components/dashboard/user/LiveTracker";

export default function DeafUserDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Cari JBI");
  const [searchQuery, setSearchQuery] = useState("");
  const [mapCenter, setMapCenter] = useState<[number, number]>([-7.3153, 112.7359]);
  
  const [selectedJbi, setSelectedJbi] = useState<typeof MOCK_JBI[0] | null>(null);
  const [bookingStatus, setBookingStatus] = useState<"idle" | "loading" | "payment" | "success">("idle");
  const [showLiveTracker, setShowLiveTracker] = useState(false);
  const [serviceMode, setServiceMode] = useState<"offline" | "online">("offline");
  const [duration, setDuration] = useState(1);
  const [isMobileSheetOpen, setIsMobileSheetOpen] = useState(true);
  const [optionalNotes, setOptionalNotes] = useState("");

  const jbiRate = selectedJbi ? parseInt(selectedJbi.price.replace(/\D/g, "")) : 75000;
  const totalPayment = jbiRate * duration;

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingStatus("loading");
    setTimeout(() => {
      setBookingStatus("payment");
    }, 1000);
  };

  const handlePaymentSuccess = () => {
    setBookingStatus("success");
    setTimeout(() => {
      setSelectedJbi(null);
      setBookingStatus("idle");
      setOptionalNotes("");
      if (serviceMode === "online") {
        router.push("/call");
      } else {
        setShowLiveTracker(true);
      }
    }, 2000);
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden font-sans relative">
      
      {/* PETA FULLSCREEN (MODE TERANG) */}
      <div className="absolute inset-0 z-0 [&_.leaflet-control-zoom]:border-slate-200 [&_.leaflet-bar_a]:bg-white/80 [&_.leaflet-bar_a]:text-slate-600 [&_.leaflet-bar_a]:backdrop-blur-md [&_.leaflet-container]:bg-slate-100">
        <MapComponent center={mapCenter} onLocationChange={(lat, lng) => setMapCenter([lat, lng])} readOnly={false} />
      </div>

      {/* HEADER DESKTOP (BERSIH & MINIMALIS) */}
      <header className="hidden sm:flex absolute top-6 left-6 right-6 z-40 bg-white/90 backdrop-blur-xl border border-slate-200 rounded-3xl px-6 py-4 items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-100 rounded-2xl flex items-center justify-center">
            <HandMetal className="w-6 h-6 text-purple-600" />
          </div>
          <span className="font-bold text-xl text-slate-800">IsyaratHUB</span>
        </div>
        
        <nav className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
          <NavItem icon={<MapPin />} label="Cari JBI" active={activeTab === "Cari JBI"} onClick={() => setActiveTab("Cari JBI")} />
          <NavItem icon={<Clock />} label="Riwayat" active={activeTab === "Riwayat"} onClick={() => setActiveTab("Riwayat")} />
          <NavItem icon={<Bell />} label="Notif" active={activeTab === "Notifikasi"} onClick={() => setActiveTab("Notifikasi")} />
        </nav>

        <button onClick={() => setActiveTab("Profil")} className="flex items-center gap-3 hover:bg-slate-50 p-2 rounded-2xl transition-colors">
          <div className="text-right hidden md:block">
            <p className="text-sm font-bold text-slate-800 leading-tight">Budi</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center font-bold text-purple-700">
            B
          </div>
        </button>
      </header>

      {/* HEADER MOBILE */}
      <header className="sm:hidden absolute top-0 left-0 w-full z-40 pt-6 pb-12 px-6 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg border border-slate-100">
            <HandMetal className="w-7 h-7 text-purple-600" />
          </div>
        </div>
      </header>

      {/* KONTEN UTAMA */}
      {activeTab === "Cari JBI" && (
        <>
          {/* SIDEBAR DESKTOP */}
          <aside className="hidden sm:flex absolute top-32 left-6 bottom-6 w-[400px] bg-white/95 backdrop-blur-2xl border border-slate-200 rounded-3xl shadow-2xl flex-col z-30 overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Butuh Bantuan JBI?</h2>
              <p className="text-sm text-slate-500 mb-6">Pilih JBI terdekat untuk membantu Anda.</p>
              
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Lokasi pertemuan..." 
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-slate-800 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all font-medium"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
              {MOCK_JBI.filter(jbi => 
                jbi.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                jbi.specialty.toLowerCase().includes(searchQuery.toLowerCase())
              ).map((jbi) => (
                <div 
                  key={jbi.id} 
                  className="p-5 rounded-2xl bg-white border border-slate-100 hover:border-purple-200 hover:shadow-md transition-all group"
                >
                  <div className="flex gap-4">
                    <div className="w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center text-2xl border border-slate-100">
                      {jbi.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-slate-800 text-lg leading-tight">{jbi.name}</h3>
                        <div className="flex items-center gap-1 text-slate-600 text-sm font-medium">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> {jbi.rating}
                        </div>
                      </div>
                      <p className="text-sm text-slate-500 mt-1">{jbi.distance} • {jbi.specialty}</p>
                      
                      {jbi.available ? (
                        <button 
                          onClick={() => setSelectedJbi(jbi)} 
                          className="mt-4 w-full bg-purple-50 hover:bg-purple-100 active:bg-purple-200 text-purple-700 font-bold text-sm flex justify-between items-center px-4 py-3 rounded-xl transition-colors cursor-pointer border border-purple-100"
                        >
                          Pesan ({jbi.price}/jam) <ChevronRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <div className="mt-4 text-slate-400 font-bold text-sm bg-slate-50 px-4 py-3 rounded-xl border border-slate-100 text-center">
                          Sedang Sibuk
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </aside>

          {/* BOTTOM SHEET MOBILE */}
          <motion.aside 
            initial={{ y: "100%" }}
            animate={{ y: isMobileSheetOpen ? 0 : "70%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="sm:hidden absolute bottom-20 left-0 w-full h-[65%] bg-white/95 backdrop-blur-3xl border-t border-slate-200 rounded-t-[2.5rem] flex flex-col z-30 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]"
          >
            <div className="w-full flex justify-center pt-4 pb-2" onClick={() => setIsMobileSheetOpen(!isMobileSheetOpen)}>
              <div className="w-12 h-1.5 bg-slate-300 rounded-full cursor-pointer" />
            </div>
            
            <div className="px-6 pb-4">
              <h2 className="text-xl font-bold text-slate-800 mb-4">Butuh Bantuan JBI?</h2>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Lokasi pertemuan..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 font-medium text-slate-800 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-4 custom-scrollbar">
              {MOCK_JBI.filter(jbi => 
                jbi.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                jbi.specialty.toLowerCase().includes(searchQuery.toLowerCase())
              ).map((jbi) => (
                <div 
                  key={jbi.id} 
                  className="p-4 rounded-3xl bg-white border border-slate-100 shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-3xl border border-slate-100 relative">
                      {jbi.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-slate-800 text-lg leading-tight">{jbi.name}</h4>
                          <p className="text-xs text-slate-500 mt-1">{jbi.distance}</p>
                        </div>
                        <div className="flex items-center gap-1 text-slate-700 font-bold text-sm">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> {jbi.rating}
                        </div>
                      </div>
                      
                      {jbi.available ? (
                        <button 
                          onClick={() => setSelectedJbi(jbi)}
                          className="mt-3 w-full bg-purple-50 hover:bg-purple-100 active:bg-purple-200 text-purple-700 px-4 py-2.5 rounded-xl text-sm font-bold text-center border border-purple-100 transition-colors cursor-pointer"
                        >
                          Pesan
                        </button>
                      ) : (
                        <div className="mt-3 w-full bg-slate-50 text-slate-400 px-4 py-2.5 rounded-xl text-sm font-bold text-center border border-slate-100">
                          Sibuk
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.aside>
        </>
      )}

      {/* TABS LAINNYA */}
      {activeTab !== "Cari JBI" && (
        <div className="absolute inset-0 z-20 bg-slate-50 pt-24 sm:pt-32 p-6 overflow-y-auto">
          {activeTab === "Riwayat" && <HistoryTab />}
          {activeTab === "Notifikasi" && <NotificationTab />}
          {activeTab === "Profil" && <ProfileTab />}
        </div>
      )}

      {/* NAVIGASI BAWAH MOBILE */}
      <nav className="sm:hidden absolute bottom-0 left-0 w-full bg-white/90 backdrop-blur-xl border-t border-slate-200 z-50 flex justify-around items-center pb-safe pt-2 h-20 px-2 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <MobileNavItem icon={<MapPin />} label="Peta" active={activeTab === "Cari JBI"} onClick={() => setActiveTab("Cari JBI")} />
        <MobileNavItem icon={<Clock />} label="Riwayat" active={activeTab === "Riwayat"} onClick={() => setActiveTab("Riwayat")} />
        <MobileNavItem icon={<Bell />} label="Notif" active={activeTab === "Notifikasi"} onClick={() => setActiveTab("Notifikasi")} />
        <MobileNavItem icon={<UserCircle2 />} label="Profil" active={activeTab === "Profil"} onClick={() => setActiveTab("Profil")} />
      </nav>

      {/* MODAL PEMESANAN */}
      <AnimatePresence>
        {selectedJbi && (
          <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => bookingStatus === 'idle' && setSelectedJbi(null)}
            />
            
            <motion.div 
              initial={{ opacity: 0, y: "100%" }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: "100%" }}
              className="relative w-full sm:max-w-md bg-white sm:rounded-3xl rounded-t-[2.5rem] shadow-2xl flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white rounded-t-[2.5rem]">
                <h2 className="text-xl font-bold text-slate-800">Detail Pesanan</h2>
                <button 
                  onClick={() => setSelectedJbi(null)}
                  disabled={bookingStatus !== 'idle'}
                  className="p-2 bg-slate-50 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {bookingStatus === "success" ? (
                  <div className="py-12 text-center">
                    <div className="w-24 h-24 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircleIcon className="w-12 h-12" />
                    </div>
                    <h3 className="text-3xl font-bold text-slate-800 mb-2">Selesai!</h3>
                    <p className="text-slate-500 mb-10 text-lg">JBI {selectedJbi.name} segera melayani Anda.</p>
                    
                    <button onClick={() => router.push('/call')} className="w-full py-4 rounded-2xl text-white font-bold text-lg bg-purple-600 hover:bg-purple-700 shadow-xl shadow-purple-200 transition-all">
                      Mulai Video Call
                    </button>
                  </div>
                ) : bookingStatus === "payment" ? (
                  <div className="py-10 text-center">
                    <h3 className="text-slate-500 font-bold mb-2">Total Biaya</h3>
                    <p className="text-5xl font-black text-slate-800 mb-10">Rp {(totalPayment).toLocaleString('id-ID')}</p>
                    
                    <div className="bg-slate-50 rounded-3xl p-8 mb-8 border border-slate-100 flex justify-center">
                      <QrCode className="w-40 h-40 text-slate-800" />
                    </div>
                    <p className="text-slate-500 mb-6">Scan untuk membayar</p>
                    <button onClick={handlePaymentSuccess} className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-2xl shadow-xl shadow-purple-200 text-lg transition-colors">
                      Sudah Bayar
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-5 p-5 bg-slate-50 rounded-3xl border border-slate-100">
                      <div className="w-20 h-20 rounded-full bg-white text-4xl flex items-center justify-center shadow-sm border border-slate-100">
                        {selectedJbi.avatar}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-slate-800">{selectedJbi.name}</h3>
                        <p className="text-slate-500 mb-2">{selectedJbi.specialty}</p>
                        <div className="inline-flex items-center gap-1 bg-white px-3 py-1 rounded-full text-slate-700 font-bold text-sm border border-slate-200 shadow-sm">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> {selectedJbi.rating}
                        </div>
                      </div>
                    </div>

                    <form id="booking-form" onSubmit={handleBook} className="space-y-6">
                      <div>
                        <label className="text-base font-bold text-slate-800 block mb-3">Layanan</label>
                        <div className="grid grid-cols-2 gap-4">
                          <button type="button" onClick={() => setServiceMode('offline')} className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${serviceMode === 'offline' ? 'border-purple-600 bg-purple-50 text-purple-700' : 'border-slate-100 bg-white text-slate-500 hover:bg-slate-50'}`}>
                            <MapPin className="w-7 h-7" />
                            <span className="font-bold">Ketemuan</span>
                          </button>
                          <button type="button" onClick={() => setServiceMode('online')} className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${serviceMode === 'online' ? 'border-purple-600 bg-purple-50 text-purple-700' : 'border-slate-100 bg-white text-slate-500 hover:bg-slate-50'}`}>
                            <Video className="w-7 h-7" />
                            <span className="font-bold">Video Call</span>
                          </button>
                        </div>
                      </div>

                      {serviceMode === 'offline' && (
                        <div>
                          <label className="text-base font-bold text-slate-800 block mb-3">Lokasi</label>
                          <input required type="text" className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-5 font-medium text-slate-800 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all" placeholder="Tulis nama tempat..." />
                        </div>
                      )}

                      <div>
                        <label className="text-base font-bold text-slate-800 block mb-3">Catatan Khusus (Opsional)</label>
                        <textarea 
                          rows={2} 
                          value={optionalNotes}
                          onChange={(e) => setOptionalNotes(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-5 font-medium text-slate-800 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-none" 
                          placeholder="Misal: Saya tunggu di lobby, atau bawa dokumen X..."
                        />
                        <div className="flex flex-wrap gap-2 mt-3">
                          {["+SIBI", "+BISINDO", "+PRO", "+Bahasa Inggris", "+Mix Bahasa"].map(tag => (
                            <button
                              key={tag}
                              type="button"
                              onClick={() => setOptionalNotes(prev => prev ? `${prev} ${tag}` : tag)}
                              className="px-3 py-1.5 bg-slate-100 hover:bg-purple-100 active:bg-purple-200 text-slate-600 hover:text-purple-700 text-xs font-bold rounded-lg transition-colors border border-slate-200 hover:border-purple-200"
                            >
                              {tag}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="text-base font-bold text-slate-800 block mb-3">Berapa Lama?</label>
                        <div className="flex gap-3">
                          {[1, 2, 3].map((jam) => (
                            <button key={jam} type="button" onClick={() => setDuration(jam)} className={`flex-1 py-4 rounded-2xl border-2 font-bold transition-all ${duration === jam ? 'border-purple-600 bg-purple-50 text-purple-700' : 'border-slate-100 bg-white text-slate-500 hover:bg-slate-50'}`}>
                              {jam} Jam
                            </button>
                          ))}
                        </div>
                      </div>
                    </form>
                  </>
                )}
              </div>

              {(bookingStatus === "idle" || bookingStatus === "loading") && (
                <div className="p-6 bg-white border-t border-slate-100">
                  <div className="flex justify-between items-center mb-4 px-2">
                    <span className="font-bold text-slate-500">Total Pembayaran</span>
                    <span className="text-2xl font-black text-slate-800">Rp {(totalPayment).toLocaleString('id-ID')}</span>
                  </div>
                  <button type="submit" form="booking-form" disabled={bookingStatus === 'loading'} className="w-full py-5 rounded-2xl font-bold text-white bg-purple-600 hover:bg-purple-700 shadow-xl shadow-purple-200 text-xl transition-all disabled:opacity-70 disabled:scale-100 active:scale-[0.98]">
                    {bookingStatus === 'loading' ? "Memproses..." : "Pesan JBI Sekarang"}
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* COMPONENT PELACAKAN (LIVE TRACKER) */}
      <AnimatePresence>
        {showLiveTracker && selectedJbi === null && (
          <LiveTracker 
            jbiName="Budi Santoso" 
            jbiAvatar="👨‍💼" 
            location="RS dr. Soetomo" 
            onClose={() => setShowLiveTracker(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Komponen Pembantu
function CheckCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function NavItem({ icon, label, active = false, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <button onClick={onClick} className={`px-5 py-2.5 rounded-xl transition-all font-bold text-sm flex items-center gap-2 ${active ? "bg-white shadow-sm text-slate-800" : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"}`}>
      <div className="[&>svg]:w-5 [&>svg]:h-5">{icon}</div>
      {label}
    </button>
  );
}

function MobileNavItem({ icon, label, active = false, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${active ? 'text-purple-600' : 'text-slate-400 hover:text-slate-600'}`}>
      <div className="[&>svg]:w-6 [&>svg]:h-6">{icon}</div>
      <span className="text-xs font-bold">{label}</span>
    </button>
  );
}
