"use client";

import { Bell } from "lucide-react";
import { MOCK_NOTIFICATIONS } from "@/lib/mockData";

export default function NotificationTab() {
  return (
    <div className="flex-1 w-full max-w-3xl mx-auto pb-24">
      <h2 className="text-3xl font-bold text-slate-800 mb-8">Notifikasi</h2>
      
      <div className="space-y-4">
        {MOCK_NOTIFICATIONS.map((notif) => (
          <div key={notif.id} className={`p-5 rounded-3xl border shadow-sm flex gap-4 items-start ${notif.read ? 'bg-white border-slate-100' : 'bg-purple-50 border-purple-100'}`}>
            <div className="w-12 h-12 bg-white rounded-full shadow-sm border border-slate-100 flex items-center justify-center shrink-0">
              <Bell className={`w-5 h-5 ${notif.read ? 'text-slate-400' : 'text-purple-600'}`} />
            </div>
            <div>
              <h3 className={`text-lg font-bold ${notif.read ? 'text-slate-700' : 'text-purple-900'}`}>{notif.title}</h3>
              <p className={`text-sm mt-1 ${notif.read ? 'text-slate-500' : 'text-purple-700'}`}>{notif.message}</p>
              <span className="text-xs font-bold text-slate-400 mt-2 block">{notif.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
