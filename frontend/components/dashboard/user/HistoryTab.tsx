"use client";

import { useState } from "react";
import { Clock, MapPin, Star, Filter } from "lucide-react";
import { MOCK_USER_HISTORY } from "@/lib/mockData";

export default function HistoryTab() {
  const [filter, setFilter] = useState<"all" | "completed" | "cancelled">("all");
  const filtered = filter === "all" ? MOCK_USER_HISTORY : MOCK_USER_HISTORY.filter((h) => h.status === filter);

  return (
    <div className="flex-1 w-full max-w-3xl mx-auto pb-24">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-slate-800">Riwayat</h2>
        <div className="flex bg-slate-100 p-1 rounded-xl">
          {(["all", "completed"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${filter === f ? "bg-white shadow-sm text-purple-600" : "text-slate-500 hover:text-slate-800"}`}
            >
              {f === "all" ? "Semua" : "Selesai"}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filtered.length === 0 && <div className="text-center py-10 text-slate-400 font-medium">Kosong.</div>}
        {filtered.map((item) => (
          <div key={item.id} className="p-5 bg-white border border-slate-200 rounded-3xl shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center font-bold text-2xl text-slate-700 border border-slate-100">
                {item.jbiAvatar}
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-lg">{item.jbiName}</h3>
                <p className="text-slate-500 text-sm mt-0.5">{item.date} • {item.duration}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-black text-slate-800 text-lg">{item.total}</p>
              <p className={`text-xs font-bold mt-1 ${item.status === 'completed' ? 'text-emerald-500' : 'text-red-400'}`}>
                {item.status === 'completed' ? 'Selesai' : 'Batal'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
