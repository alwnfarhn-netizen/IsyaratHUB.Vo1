"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Star, Clock, Filter, Menu, LogOut, Bell, HandMetal, UserCircle2, X, Calendar, FileText, Video, Wallet, CreditCard, QrCode, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Dinamis import untuk menghindari SSR pada Leaflet
const MapComponent = dynamic(() => import("../../../components/MapComponent"), { ssr: false, loading: () => <div className="w-full h-full min-h-[400px] flex items-center justify-center bg-slate-900 text-slate-400">Memuat Peta...</div> });

import { MOCK_JBI, MOCK_NOTIFICATIONS } from "@/lib/mockData";
import HistoryTab from "../../../components/dashboard/user/HistoryTab";
import NotificationTab from "../../../components/dashboard/user/NotificationTab";
import ProfileTab from "../../../components/dashboard/user/ProfileTab";
import LiveTracker from "../../../components/dashboard/user/LiveTracker";

export default function DeafUserDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Cari JBI");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // Surabaya — Wonokromo (sesuai pilot project)
  const [mapCenter, setMapCenter] = useState<[number, number]>([-7.3153, 112.7359]);
  
  // State untuk modal booking & live tracker
  const [selectedJbi, setSelectedJbi] = useState<typeof MOCK_JBI[0] | null>(null);
  const [bookingStatus, setBookingStatus] = useState<"idle" | "loading" | "payment" | "success">("idle");
  const [showLiveTracker, setShowLiveTracker] = useState(false);
  const [serviceMode, setServiceMode] = useState<"offline" | "online">("offline");
  const [duration, setDuration] = useState(2);
  const [paymentMethod, setPaymentMethod] = useState("qris");
  const [customRequest, setCustomRequest] = useState("");

  const jbiRate = selectedJbi ? parseInt(selectedJbi.price.replace(/\D/g, "")) : 75000;
  const subtotal = jbiRate * duration;
  const adminFee = 2500;
  const totalPayment = subtotal + adminFee;

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingStatus("loading");
    setTimeout(() => {
      // Buka Mockup Payment Gateway
      setBookingStatus("payment");
    }, 1000);
  };

  const handlePaymentSuccess = () => {
    setBookingStatus("success");
    // Setelah 2 detik arahkan sesuai mode
    setTimeout(() => {
      setSelectedJbi(null);
      setBookingStatus("idle");
      if (serviceMode === "online") {
        router.push("/call");
      } else {
        setShowLiveTracker(true);
      }
    }, 2000);
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      
      {/* Sidebar Navigation */}
      <aside className="w-20 lg:w-64 border-r border-slate-800 bg-slate-950/50 flex flex-col justify-between hidden sm:flex">
        <div>
          <div className="h-20 flex items-center justify-center lg:justify-start lg:px-6 border-b border-slate-800">
            <HandMetal className="w-8 h-8 text-purple-500" />
            <span className="hidden lg:block ml-3 font-bold text-xl tracking-tight text-white">IsyaratHUB</span>
          </div>
          <nav className="p-4 space-y-2">
            <NavItem icon={<MapPin />} label="Cari JBI" active={activeTab === "Cari JBI"} onClick={() => setActiveTab("Cari JBI")} />
            <NavItem icon={<Clock />} label="Riwayat" active={activeTab === "Riwayat"} onClick={() => setActiveTab("Riwayat")} />
            <NavItem icon={<Bell />} label="Notifikasi" active={activeTab === "Notifikasi"} onClick={() => setActiveTab("Notifikasi")} />
            <NavItem icon={<UserCircle2 />} label="Profil" active={activeTab === "Profil"} onClick={() => setActiveTab("Profil")} />
          </nav>
        </div>
        <div className="p-4 border-t border-slate-800">
          <Link href="/login" className="flex items-center gap-3 p-3 rounded-xl text-slate-400 hover:bg-slate-900 hover:text-red-400 transition-colors">
            <LogOut className="w-5 h-5" />
            <span className="hidden lg:block font-medium">Keluar</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full relative">
        
        {/* Header (Mobile & Search) */}
        <header className="h-20 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md z-40 flex items-center justify-between px-6 absolute top-0 w-full">
          <div className="flex items-center gap-4 sm:hidden">
            <Menu className="w-6 h-6 text-slate-300" />
            <span className="font-bold text-lg text-white">IsyaratHUB</span>
          </div>
          
          <div className="hidden sm:flex items-center gap-4 w-full max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input 
                type="text" 
                placeholder="Cari lokasi atau nama JBI..." 
                className="w-full bg-slate-900 border border-slate-700 rounded-full py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-slate-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="p-2.5 bg-slate-900 border border-slate-700 rounded-full hover:bg-slate-800 transition-colors">
              <Filter className="w-5 h-5 text-slate-300" />
            </button>
          </div>
          
          <div className="flex items-center gap-3 relative">
             <button 
               onClick={() => setIsDropdownOpen(!isDropdownOpen)}
               className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-sm font-bold shadow-lg border-2 border-slate-800 hover:scale-105 transition-transform"
             >
               TU
             </button>

             {/* Dropdown Menu */}
             <AnimatePresence>
               {isDropdownOpen && (
                 <motion.div 
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: 10 }}
                   className="absolute right-0 top-14 w-48 bg-slate-900 border border-slate-700 rounded-2xl shadow-xl overflow-hidden z-50"
                 >
                   <div className="p-3 border-b border-slate-800">
                     <p className="text-sm font-bold text-white">Teman Tuli</p>
                     <p className="text-xs text-slate-400">user@isyarathub.com</p>
                   </div>
                   <div className="p-2">
                     <button onClick={() => { setActiveTab("Profil"); setIsDropdownOpen(false); }} className="w-full text-left px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white rounded-xl transition-colors">
                       Pengaturan Profil
                     </button>
                     <button className="w-full text-left px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white rounded-xl transition-colors">
                       Bantuan
                     </button>
                     <div className="h-px bg-slate-800 my-1"></div>
                     <Link href="/login" className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-slate-800 hover:text-red-300 rounded-xl transition-colors">
                       <LogOut className="w-4 h-4" /> Keluar
                     </Link>
                   </div>
                 </motion.div>
               )}
             </AnimatePresence>
          </div>
        </header>

        {/* Content Area Based on Tab */}
        {activeTab === "Cari JBI" ? (
          <div className="flex-1 w-full h-full pt-20 relative z-0">
            <div className="absolute inset-0 z-0 [&_.leaflet-control-zoom]:border-slate-800 [&_.leaflet-bar_a]:bg-slate-900 [&_.leaflet-bar_a]:text-slate-300 [&_.leaflet-container]:bg-slate-950">
              {/* Custom styling applied via parent classes for a darker map feel if possible, else standard OSM */}
               <MapComponent center={mapCenter} onLocationChange={(lat, lng) => setMapCenter([lat, lng])} readOnly={false} />
            </div>
          </div>
        ) : activeTab === "Riwayat" ? (
          <HistoryTab />
        ) : activeTab === "Notifikasi" ? (
          <NotificationTab />
        ) : activeTab === "Profil" ? (
          <ProfileTab />
        ) : null}
        
        {/* Mobile Bottom Navigation */}
        <nav className="sm:hidden fixed bottom-0 left-0 w-full bg-slate-950 border-t border-slate-800 z-50 flex justify-around items-center h-16 px-2 shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
          <button onClick={() => setActiveTab("Cari JBI")} className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${activeTab === 'Cari JBI' ? 'text-purple-400' : 'text-slate-500 hover:text-slate-300'}`}>
            <MapPin className="w-5 h-5" />
            <span className="text-[10px] font-medium">Cari</span>
          </button>
          <button onClick={() => setActiveTab("Riwayat")} className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${activeTab === 'Riwayat' ? 'text-purple-400' : 'text-slate-500 hover:text-slate-300'}`}>
            <Clock className="w-5 h-5" />
            <span className="text-[10px] font-medium">Riwayat</span>
          </button>
          <button onClick={() => setActiveTab("Notifikasi")} className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${activeTab === 'Notifikasi' ? 'text-purple-400' : 'text-slate-500 hover:text-slate-300'}`}>
            <Bell className="w-5 h-5" />
            <span className="text-[10px] font-medium">Notif</span>
          </button>
          <button onClick={() => setActiveTab("Profil")} className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${activeTab === 'Profil' ? 'text-purple-400' : 'text-slate-500 hover:text-slate-300'}`}>
            <UserCircle2 className="w-5 h-5" />
            <span className="text-[10px] font-medium">Profil</span>
          </button>
        </nav>
      </main>

      {/* Right Panel: Nearby JBI List (Only visible in Cari JBI) */}
      {activeTab === "Cari JBI" && (
      <aside className="w-full sm:w-[350px] lg:w-[400px] h-[55%] sm:h-auto absolute sm:right-0 sm:top-20 bottom-16 sm:bottom-0 bg-slate-950/95 sm:bg-slate-950/90 backdrop-blur-xl border-t sm:border-t-0 sm:border-l border-slate-800 flex flex-col z-30 transform transition-transform shadow-2xl rounded-t-3xl sm:rounded-none">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <h2 className="font-semibold text-lg flex items-center gap-2">
            <MapPin className="w-5 h-5 text-purple-500" />
            JBI Tersedia Terdekat
          </h2>
          <span className="px-2.5 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full font-medium">3 Ditemukan</span>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
          {MOCK_JBI.map((jbi, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={jbi.id} 
              className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/50 transition-all group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-lg font-bold text-slate-300">
                    {jbi.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white group-hover:text-purple-400 transition-colors">{jbi.name}</h3>
                    <p className="text-xs text-slate-400 mt-1">{jbi.location} - {jbi.distance} - {jbi.specialty}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-yellow-400 text-sm font-medium">
                  <Star className="w-4 h-4 fill-current" />
                  {jbi.rating}
                </div>
              </div>
              
              <button 
                disabled={!jbi.available}
                onClick={() => setSelectedJbi(jbi)}
                className={`w-full py-2.5 rounded-xl text-sm font-medium transition-all flex justify-center items-center gap-2 ${
                  jbi.available 
                    ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-900/50' 
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                {jbi.available ? 'Pesan Sekarang' : 'Sedang Bertugas'}
              </button>
            </motion.div>
          ))}
        </div>
      </aside>
      )}

      {/* Booking Modal Overlay */}
      <AnimatePresence>
        {selectedJbi && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => bookingStatus === 'idle' && setSelectedJbi(null)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-800/50">
                <h2 className="text-xl font-bold text-white">Detail Pesanan</h2>
                <button 
                  onClick={() => setSelectedJbi(null)}
                  disabled={bookingStatus !== 'idle'}
                  className="p-2 bg-slate-800 rounded-full hover:bg-slate-700 text-slate-400 hover:text-white transition-colors disabled:opacity-50"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto custom-scrollbar">
                
                {bookingStatus === "success" ? (
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <div className="w-20 h-20 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mb-6">
                      <CheckCircleIcon className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Pesanan Berhasil!</h3>
                    <p className="text-slate-400 mb-8">JBI {selectedJbi.name} telah menerima permintaan Anda dan akan segera menuju lokasi.</p>
                    
                    <button 
                      onClick={() => router.push('/call')}
                      className="w-full py-3.5 rounded-2xl text-white font-semibold flex items-center justify-center gap-2 transition-all bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-900/50 hover:-translate-y-0.5"
                    >
                      <Video className="w-5 h-5" />
                      Mulai Video Call
                    </button>
                  </div>
                ) : bookingStatus === "payment" ? (
                  <div className="flex flex-col animate-in fade-in zoom-in duration-300">
                    <div className="bg-white rounded-2xl p-6 text-slate-800 shadow-xl relative overflow-hidden">
                       <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
                       <div className="flex justify-between items-center mb-6 mt-2">
                         <span className="font-extrabold text-xl tracking-tight text-blue-900">Midtrans<span className="font-light">Mock</span></span>
                         <span className="text-xs font-semibold bg-blue-100 text-blue-700 py-1 px-2 rounded-lg">Sandbox Mode</span>
                       </div>
                       
                       <div className="text-center mb-6">
                         <p className="text-sm text-slate-500 mb-1">Total Pembayaran</p>
                         <h3 className="text-3xl font-black text-slate-900">Rp {(totalPayment).toLocaleString('id-ID')}</h3>
                         <p className="text-xs text-slate-400 mt-2">Order ID: ISY-{Math.floor(Math.random() * 100000)}</p>
                       </div>

                       {paymentMethod === "qris" && (
                         <div className="flex flex-col items-center bg-slate-50 p-6 rounded-xl border border-slate-200 text-center">
                           <QrCode className="w-32 h-32 text-slate-800 mb-3" />
                           <p className="text-sm font-medium text-slate-600">Scan QRIS menggunakan aplikasi M-Banking atau E-Wallet Anda.</p>
                         </div>
                       )}
                       {paymentMethod === "transfer" && (
                         <div className="flex flex-col bg-slate-50 p-5 rounded-xl border border-slate-200">
                           <p className="text-sm text-slate-500 mb-1">Bank Mandiri (Virtual Account)</p>
                           <p className="font-mono text-xl font-bold tracking-wider text-slate-800 mb-2">8920 1283 8812 0012</p>
                           <p className="text-xs text-slate-500">Batas Waktu: 23:59:59</p>
                         </div>
                       )}
                       {paymentMethod === "wallet" && (
                         <div className="flex flex-col items-center bg-slate-50 p-6 rounded-xl border border-slate-200 text-center">
                           <Wallet className="w-16 h-16 text-purple-600 mb-3" />
                           <p className="font-bold text-slate-800">IsyaratPay Balance: Rp 150.000</p>
                           <p className="text-sm text-slate-500 mt-1">Saldo cukup untuk transaksi ini.</p>
                         </div>
                       )}

                       <button 
                         onClick={handlePaymentSuccess}
                         className="w-full mt-6 py-3.5 rounded-xl text-white font-semibold flex items-center justify-center transition-all bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/30"
                       >
                         Simulasikan Pembayaran Berhasil
                       </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* JBI Info Card */}
                    <div className="flex gap-4 items-center p-4 bg-slate-800/50 rounded-2xl border border-slate-700 mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-purple-600/20 text-purple-400 flex items-center justify-center text-xl font-bold border border-purple-500/30">
                        {selectedJbi.avatar}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{selectedJbi.name}</h3>
                        <p className="text-sm text-slate-400 mb-1">{selectedJbi.specialty}</p>
                        <div className="flex gap-3 text-xs font-medium">
                          <span className="flex items-center gap-1 text-yellow-400"><Star className="w-3 h-3 fill-current" /> {selectedJbi.rating}</span>
                          <span className="text-emerald-400">{selectedJbi.price}</span>
                        </div>
                      </div>
                    </div>

                    {/* Form */}
                    <form id="booking-form" onSubmit={handleBook} className="space-y-5">
                      
                      {/* Service Mode Selector */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300 ml-1">Metode Layanan</label>
                        <div className="grid grid-cols-2 gap-3">
                          <button 
                            type="button" 
                            onClick={() => setServiceMode('offline')}
                            className={`p-4 rounded-xl border ${serviceMode === 'offline' ? 'border-purple-500 bg-purple-500/10 text-purple-400' : 'border-slate-700 bg-slate-800 text-slate-400'} flex flex-col items-center gap-2 transition-all`}
                          >
                            <MapPin className="w-6 h-6" />
                            <span className="font-semibold text-sm">Offline (Tatap Muka)</span>
                          </button>
                          <button 
                            type="button" 
                            onClick={() => setServiceMode('online')}
                            className={`p-4 rounded-xl border ${serviceMode === 'online' ? 'border-purple-500 bg-purple-500/10 text-purple-400' : 'border-slate-700 bg-slate-800 text-slate-400'} flex flex-col items-center gap-2 transition-all`}
                          >
                            <Video className="w-6 h-6" />
                            <span className="font-semibold text-sm">Online (Video Call)</span>
                          </button>
                        </div>
                      </div>
                      {serviceMode === 'offline' && (
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-300 ml-1">Lokasi Pertemuan</label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                            <textarea 
                              rows={2}
                              required
                              className="w-full bg-slate-950 border border-slate-700 rounded-2xl py-3 pl-10 pr-4 text-sm text-white focus:ring-2 focus:ring-purple-500 outline-none resize-none"
                              placeholder="Contoh: RS Siloam Kebon Jeruk, Lobby Utama..."
                            ></textarea>
                          </div>
                        </div>
                      )}

                      {/* Request Opsional */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300 ml-1">Request Tambahan (Opsional)</label>
                        
                        {/* Quick fill buttons */}
                        <div className="flex flex-wrap gap-2 mb-2">
                          {["SIBI", "Pro", "Bisindo", "Mix Language", "Bahasa Inggris"].map(req => (
                            <button
                              key={req}
                              type="button"
                              onClick={() => {
                                if (!customRequest.includes(req)) {
                                  setCustomRequest(prev => prev ? `${prev}, ${req}` : req);
                                }
                              }}
                              className="px-3 py-1.5 rounded-full text-xs font-semibold transition-colors border bg-slate-900 border-slate-700 text-slate-400 hover:border-purple-500 hover:text-purple-400"
                            >
                              + {req}
                            </button>
                          ))}
                        </div>

                        {/* Text input box */}
                        <div className="relative">
                          <textarea 
                            rows={2}
                            value={customRequest}
                            onChange={(e) => setCustomRequest(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-700 rounded-2xl py-3 px-4 text-sm text-white focus:ring-2 focus:ring-purple-500 outline-none resize-none"
                            placeholder="Tulis request spesifik Anda di sini..."
                          ></textarea>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-300 ml-1">Waktu Mulai</label>
                          <div className="relative">
                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                            <input type="time" required className="w-full bg-slate-950 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:ring-2 focus:ring-purple-500 outline-none [color-scheme:dark]" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-300 ml-1">Durasi Sesi</label>
                          <select 
                            value={duration}
                            onChange={(e) => setDuration(Number(e.target.value))}
                            className="w-full bg-slate-950 border border-slate-700 rounded-xl py-2.5 px-4 text-sm text-white focus:ring-2 focus:ring-purple-500 outline-none appearance-none"
                          >
                            <option value={1}>1 Jam</option>
                            <option value={2}>2 Jam</option>
                            <option value={3}>3 Jam</option>
                            <option value={4}>4 Jam</option>
                          </select>
                        </div>
                      </div>

                      {/* Payment Method */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300 ml-1">Metode Pembayaran</label>
                        <div className="grid grid-cols-3 gap-2">
                          <button type="button" onClick={() => setPaymentMethod("qris")} className={`py-2 px-3 rounded-xl border flex flex-col items-center gap-1 transition-all ${paymentMethod === 'qris' ? 'bg-purple-600/20 border-purple-500 text-purple-400' : 'bg-slate-950 border-slate-700 text-slate-400'}`}>
                            <QrCode className="w-5 h-5" />
                            <span className="text-[10px] font-bold">QRIS</span>
                          </button>
                          <button type="button" onClick={() => setPaymentMethod("transfer")} className={`py-2 px-3 rounded-xl border flex flex-col items-center gap-1 transition-all ${paymentMethod === 'transfer' ? 'bg-purple-600/20 border-purple-500 text-purple-400' : 'bg-slate-950 border-slate-700 text-slate-400'}`}>
                            <CreditCard className="w-5 h-5" />
                            <span className="text-[10px] font-bold">Transfer Bank</span>
                          </button>
                          <button type="button" onClick={() => setPaymentMethod("wallet")} className={`py-2 px-3 rounded-xl border flex flex-col items-center gap-1 transition-all ${paymentMethod === 'wallet' ? 'bg-purple-600/20 border-purple-500 text-purple-400' : 'bg-slate-950 border-slate-700 text-slate-400'}`}>
                            <Wallet className="w-5 h-5" />
                            <span className="text-[10px] font-bold">IsyaratPay</span>
                          </button>
                        </div>
                      </div>

                      {/* Billing Summary */}
                      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 text-sm">
                        <div className="flex justify-between text-slate-400 mb-2">
                          <span>Tarif JBI ({duration} Jam)</span>
                          <span>Rp {(subtotal).toLocaleString('id-ID')}</span>
                        </div>
                        <div className="flex justify-between text-slate-400 mb-3 pb-3 border-b border-slate-800">
                          <span>Biaya Layanan (Platform)</span>
                          <span>Rp {(adminFee).toLocaleString('id-ID')}</span>
                        </div>
                        <div className="flex justify-between text-white font-bold text-base">
                          <span>Total Pembayaran</span>
                          <span className="text-emerald-400">Rp {(totalPayment).toLocaleString('id-ID')}</span>
                        </div>
                        <div className="mt-3 bg-purple-500/10 text-purple-400 p-2 rounded-lg text-xs flex items-start gap-2">
                          <ShieldCheck className="w-4 h-4 shrink-0" />
                          <span>Dari tarif JBI, 90% (Rp {(subtotal * 0.9).toLocaleString('id-ID')}) akan diteruskan langsung ke JBI setelah sesi selesai.</span>
                        </div>
                      </div>
                    </form>
                  </>
                )}

              </div>

              {/* Modal Footer */}
              {(bookingStatus === "idle" || bookingStatus === "loading") && (
                <div className="p-6 border-t border-slate-800 bg-slate-800/30 flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setSelectedJbi(null)}
                    disabled={bookingStatus === 'loading'}
                    className="flex-1 py-3 rounded-xl font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors"
                  >
                    Batal
                  </button>
                  <button 
                    type="submit"
                    form="booking-form"
                    disabled={bookingStatus === 'loading'}
                    className="flex-[2] py-3 rounded-xl font-medium text-white bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-900/50 transition-all flex items-center justify-center gap-2"
                  >
                    {bookingStatus === 'loading' ? (
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    ) : (
                      "Konfirmasi Pesanan"
                    )}
                  </button>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Live Tracker Overlay */}
      <AnimatePresence>
        {showLiveTracker && selectedJbi === null && (
          <LiveTracker
            jbiName="Budi Santoso"
            jbiAvatar="BS"
            location="RS dr. Soetomo, Surabaya"
            onClose={() => setShowLiveTracker(false)}
          />
        )}
      </AnimatePresence>

    </div>
  );
}

// Temporary Check Icon for success state
function CheckCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function NavItem({ icon, label, active = false, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
      active 
        ? "bg-purple-600/10 text-purple-400 border border-purple-500/20" 
        : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
    }`}>
      <div className="[&>svg]:w-5 [&>svg]:h-5">{icon}</div>
      <span className="hidden lg:block font-medium">{label}</span>
    </button>
  );
}
