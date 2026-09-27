"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, MapPin, Star, CheckCircle2, XCircle, ChevronRight, Filter } from "lucide-react";
import { MOCK_USER_HISTORY } from "@/lib/mockData";

const statusConfig = {
  completed: { label: "Selesai", classes: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" },
  cancelled: { label: "Dibatalkan", classes: "bg-red-500/10 text-red-400 border border-red-500/20" },
  in_progress: { label: "Berlangsung", classes: "bg-amber-500/10 text-amber-400 border border-amber-500/20" },
};

export default function HistoryTab() {
  const [filter, setFilter] = useState<"all" | "completed" | "cancelled">("all");

  const filtered = filter === "all" ? MOCK_USER_HISTORY : MOCK_USER_HISTORY.filter((h) => h.status === filter);

  return (
    <div className="flex-1 w-full h-full pt-24 pb-8 px-6 lg:px-10 overflow-y-auto z-0 text-slate-300">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Riwayat Pemesanan</h2>
            <p className="text-sm text-slate-400 mt-0.5">{MOCK_USER_HISTORY.length} sesi tercatat</p>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-500" />
            <div className="flex bg-slate-900 border border-slate-800 rounded-xl p-1 gap-1">
              {(["all", "completed", "cancelled"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    filter === f
                      ? "bg-purple-600 text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {f === "all" ? "Semua" : f === "completed" ? "Selesai" : "Dibatalkan"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 text-center">
            <p className="text-2xl font-bold text-white">{MOCK_USER_HISTORY.filter(h => h.status === 'completed').length}</p>
            <p className="text-xs text-slate-400 mt-1">Sesi Selesai</p>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 text-center">
            <p className="text-2xl font-bold text-white">4.8</p>
            <p className="text-xs text-slate-400 mt-1">Rating Rata-rata</p>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 text-center">
            <p className="text-2xl font-bold text-white">Rp 475rb</p>
            <p className="text-xs text-slate-400 mt-1">Total Dibayar</p>
          </div>
        </div>

        {/* History List */}
        <div className="space-y-4">
          {filtered.length === 0 && (
            <div className="text-center py-16 text-slate-500">Tidak ada riwayat untuk filter ini.</div>
          )}
          <AnimatePresence>
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ delay: i * 0.06 }}
                className="p-5 bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-2xl shadow-xl transition-colors group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center font-bold text-sm border border-purple-500/20 shrink-0">
                      {item.jbiAvatar}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-white truncate">Sesi dengan {item.jbiName}</h3>
                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${statusConfig[item.status as keyof typeof statusConfig]?.classes}`}>
                          {statusConfig[item.status as keyof typeof statusConfig]?.label}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-xs text-slate-400">
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{item.date} • {item.time}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{item.location}</span>
                      </div>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded-md">{item.type}</span>
                        <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded-md">{item.duration}</span>
                        {item.rating && (
                          <span className="flex items-center gap-0.5 text-xs text-yellow-400">
                            {Array.from({ length: item.rating }).map((_, j) => (
                              <Star key={j} className="w-3 h-3 fill-current" />
                            ))}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-white font-bold">{item.total}</p>
                    {item.status === "completed" && !item.rating && (
                      <button className="mt-2 text-xs text-purple-400 hover:text-purple-300 flex items-center gap-0.5 ml-auto">
                        Beri Ulasan <ChevronRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
