"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Clock, MapPin, DollarSign, CheckCircle2, ChevronRight } from "lucide-react";
import { MOCK_JBI_HISTORY } from "@/lib/mockData";

const statusConfig = {
  completed: { label: "Selesai", classes: "bg-emerald-500/10 text-emerald-600 border border-emerald-200" },
  cancelled: { label: "Dibatalkan", classes: "bg-red-100 text-red-600 border border-red-200" },
};

export default function HistoryTab() {
  const totalEarnings = MOCK_JBI_HISTORY
    .filter((h) => h.status === "completed")
    .reduce((sum, h) => sum + parseInt(h.earnings.replace(/\D/g, "")), 0);

  return (
    <div className="flex-1 p-6 md:p-8 overflow-y-auto">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Jadwal & Riwayat Sesi</h2>
          <p className="text-sm text-slate-500 mt-0.5">{MOCK_JBI_HISTORY.length} sesi tercatat</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm text-center">
            <p className="text-2xl font-bold text-slate-800">{MOCK_JBI_HISTORY.filter(h => h.status === 'completed').length}</p>
            <p className="text-xs text-slate-500 mt-1">Sesi Selesai</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm text-center">
            <p className="text-2xl font-bold text-slate-800">7</p>
            <p className="text-xs text-slate-500 mt-1">Total Jam Kerja</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm text-center">
            <p className="text-lg font-bold text-emerald-600">
              Rp {(totalEarnings / 1000).toFixed(0)}rb
            </p>
            <p className="text-xs text-slate-500 mt-1">Total Penghasilan</p>
          </div>
        </div>

        {/* History List */}
        <div className="space-y-4">
          {MOCK_JBI_HISTORY.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm border border-emerald-200 shrink-0">
                    {item.clientAvatar}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-slate-800 truncate">Sesi dengan {item.clientName}</h3>
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${statusConfig[item.status as keyof typeof statusConfig]?.classes}`}>
                        {statusConfig[item.status as keyof typeof statusConfig]?.label}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-xs text-slate-400">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{item.date}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{item.location}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md">{item.type}</span>
                      <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md">{item.duration}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-bold text-emerald-600">{item.earnings}</p>
                  <p className="text-xs text-slate-400 mt-0.5">Penghasilan (90%)</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
