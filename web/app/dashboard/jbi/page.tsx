"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { MapPin, Clock, Bell, HandMetal, CheckCircle2, XCircle, LogOut, ChevronRight, UserCircle2, Video } from "lucide-react";
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
  const [mapCenter, setMapCenter] = useState<[number, number]>([-6.200000, 106.816666]);
  const [acceptedRequests, setAcceptedRequests] = useState<number[]>([]);

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
            <NavItem icon={<Bell />} label="Permintaan Masuk" active={activeTab === "Permintaan Masuk"} count={2} onClick={() => setActiveTab("Permintaan Masuk")} />
            <NavItem icon={<MapPin />} label="Peta Lokasi" active={activeTab === "Peta Lokasi"} onClick={() => setActiveTab("Peta Lokasi")} />
            <NavItem icon={<Clock />} label="Jadwal & Riwayat" active={activeTab === "Jadwal & Riwayat"} onClick={() => setActiveTab("Jadwal & Riwayat")} />
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
          <div className="p-4 md:p-8 flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto w-full">
            
            {/* Left Column: Requests List */}
            <div className="lg:col-span-1 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  Permintaan Masuk
                  <span className="bg-emerald-100 text-emerald-700 text-xs py-0.5 px-2 rounded-full">2 Baru</span>
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
        ) : activeTab === "Profil JBI" ? (
           <ProfileTab />
        ) : null}
      </main>

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
