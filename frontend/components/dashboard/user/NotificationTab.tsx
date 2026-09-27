"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Bell, Star, CheckCircle2, Info, Tag } from "lucide-react";
import { MOCK_NOTIFICATIONS } from "@/lib/mockData";

const iconMap: Record<string, React.ReactNode> = {
  booking_accepted: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
  rating_reminder: <Star className="w-5 h-5 text-yellow-400" />,
  session_completed: <CheckCircle2 className="w-5 h-5 text-purple-400" />,
  promo: <Tag className="w-5 h-5 text-sky-400" />,
};

const bgMap: Record<string, string> = {
  booking_accepted: "bg-emerald-600/10 border-emerald-500/20",
  rating_reminder: "bg-yellow-500/10 border-yellow-500/20",
  session_completed: "bg-purple-600/10 border-purple-500/20",
  promo: "bg-sky-600/10 border-sky-500/20",
};

export default function NotificationTab() {
  const unreadCount = MOCK_NOTIFICATIONS.filter((n) => !n.isRead).length;

  return (
    <div className="flex-1 w-full h-full pt-24 pb-8 px-6 lg:px-10 overflow-y-auto z-0 text-slate-300">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Notifikasi</h2>
            <p className="text-sm text-slate-400 mt-0.5">
              {unreadCount > 0 ? `${unreadCount} notifikasi belum dibaca` : "Semua notifikasi sudah dibaca"}
            </p>
          </div>
          {unreadCount > 0 && (
            <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
              Tandai semua dibaca
            </button>
          )}
        </div>

        <div className="space-y-3">
          <AnimatePresence>
            {MOCK_NOTIFICATIONS.map((notif, i) => (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className={`p-5 border rounded-2xl flex items-start gap-4 transition-all relative ${
                  bgMap[notif.type] || "bg-slate-900/80 border-slate-800"
                } ${!notif.isRead ? "opacity-100" : "opacity-60"}`}
              >
                {!notif.isRead && (
                  <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-purple-500" />
                )}
                <div className="p-2.5 bg-slate-950/40 rounded-xl shrink-0">
                  {iconMap[notif.type] || <Bell className="w-5 h-5 text-slate-400" />}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white text-sm">{notif.title}</h3>
                  <p className="text-sm text-slate-400 mt-0.5 leading-relaxed">{notif.message}</p>
                  <p className="text-xs text-slate-600 mt-2">{notif.time}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
