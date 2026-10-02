"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Phone, MoreVertical, Send, MapPin, Camera, Check, CheckCheck, Paperclip } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function StandaloneChatPage() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const QUICK_REPLIES = [
    "Saya sudah sampai",
    "Mohon tunggu sebentar ya",
    "Bisa tolong lebih cepat?",
    "Saya pakai baju warna merah",
    "Titik jemput di lobi utama"
  ];
  
  const [messages, setMessages] = useState([
    { id: 1, sender: "Budi Santoso", text: "Halo, saya sedang menuju ke lokasi Anda.", time: "10:15", isMe: false, status: "read" },
    { id: 2, sender: "Anda", text: "Baik mas, saya tunggu di lobi utama ya.", time: "10:16", isMe: true, status: "read" },
    { id: 3, sender: "Budi Santoso", text: "Siap. Estimasi sekitar 5 menit lagi sampai.", time: "10:17", isMe: false, status: "read" },
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend: string = message) => {
    if (!textToSend.trim()) return;
    
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    setMessages(prev => [
      ...prev,
      { id: Date.now(), sender: "Anda", text: textToSend, time, isMe: true, status: "sent" }
    ]);
    if (textToSend === message) setMessage("");

    // Simulate JBI typing back
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev.map(m => m.status === "sent" ? { ...m, status: "read" } : m),
        { id: Date.now() + 1, sender: "Budi Santoso", text: "Baik, dimengerti. Segera meluncur!", time, isMe: false, status: "read" }
      ]);
    }, 3000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage();
  };

  return (
    <div className="h-screen w-full bg-slate-50 flex flex-col font-sans relative overflow-hidden sm:max-w-md sm:mx-auto sm:border-x sm:border-slate-200 sm:shadow-2xl">
      
      {/* Header */}
      <header className="bg-white px-4 pt-8 pb-4 flex items-center justify-between border-b border-slate-100 shadow-sm z-10 sticky top-0">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => router.back()}
            className="p-2 -ml-2 rounded-full hover:bg-slate-100 text-slate-700 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-xl shadow-inner border border-purple-200">
                👨‍💼
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>
            <div>
              <h2 className="font-bold text-slate-800 leading-tight">Budi Santoso</h2>
              <p className="text-xs text-purple-600 font-bold bg-purple-50 inline-block px-2 py-0.5 rounded-full mt-0.5">JBI dalam perjalanan</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <button className="p-2 rounded-full hover:bg-slate-100 text-slate-700 transition-colors">
            <Phone className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-full hover:bg-slate-100 text-slate-700 transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Booking Context Banner */}
      <div className="bg-purple-600 text-white p-3 px-4 flex items-center justify-between shadow-md z-0 relative">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm">
            <MapPin className="w-4 h-4" />
          </div>
          <div className="text-sm">
            <p className="font-medium text-purple-100 text-xs">Tujuan Bertemu</p>
            <p className="font-bold">RS dr. Soetomo</p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f8f9fa] custom-scrollbar">
        <div className="flex justify-center mb-6">
          <span className="text-xs font-bold text-slate-500 bg-slate-200/60 px-3 py-1 rounded-full">Hari ini</span>
        </div>
        
        {messages.map((msg, idx) => {
          const showAvatar = !msg.isMe && (idx === 0 || messages[idx - 1].isMe);
          
          return (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={msg.id} 
              className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'} max-w-[85%] ${msg.isMe ? 'ml-auto' : 'mr-auto'}`}
            >
              <div className="flex items-end gap-2">
                {!msg.isMe && showAvatar && (
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-xs shadow-sm mb-1 shrink-0">
                    👨‍💼
                  </div>
                )}
                {!msg.isMe && !showAvatar && <div className="w-6 shrink-0" />}
                
                <div 
                  className={`px-4 py-2.5 shadow-sm text-[15px] leading-relaxed relative
                    ${msg.isMe 
                      ? 'bg-purple-600 text-white rounded-2xl rounded-br-sm' 
                      : 'bg-white text-slate-800 rounded-2xl rounded-bl-sm border border-slate-100'
                    }`
                  }
                >
                  {msg.text}
                </div>
              </div>
              
              <div className={`flex items-center gap-1 mt-1 text-[11px] font-medium text-slate-400 ${msg.isMe ? 'mr-1' : 'ml-9'}`}>
                {msg.time}
                {msg.isMe && (
                  msg.status === "read" ? <CheckCheck className="w-3.5 h-3.5 text-blue-500" /> : <Check className="w-3.5 h-3.5" />
                )}
              </div>
            </motion.div>
          );
        })}
        
        <AnimatePresence>
          {isTyping && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex items-end gap-2 max-w-[85%] mr-auto"
            >
              <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-xs shadow-sm mb-1 shrink-0">
                👨‍💼
              </div>
              <div className="px-4 py-3 shadow-sm bg-white border border-slate-100 rounded-2xl rounded-bl-sm flex items-center gap-1">
                <motion.div className="w-1.5 h-1.5 bg-slate-400 rounded-full" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} />
                <motion.div className="w-1.5 h-1.5 bg-slate-400 rounded-full" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
                <motion.div className="w-1.5 h-1.5 bg-slate-400 rounded-full" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies & Input Area */}
      <div className="bg-white border-t border-slate-200 flex flex-col">
        {/* Quick Replies */}
        <div className="flex overflow-x-auto gap-2 px-4 py-3 custom-scrollbar no-scrollbar border-b border-slate-50">
          {QUICK_REPLIES.map((reply, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(reply)}
              className="whitespace-nowrap px-4 py-1.5 bg-slate-50 hover:bg-purple-50 text-slate-600 hover:text-purple-700 text-sm font-bold rounded-full border border-slate-200 hover:border-purple-200 transition-colors"
            >
              {reply}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="p-3 sm:p-4">
          <form onSubmit={handleFormSubmit} className="flex gap-2 items-center">
            <button type="button" className="p-3 text-slate-400 hover:text-purple-600 bg-slate-50 hover:bg-purple-50 rounded-full transition-colors shrink-0">
              <Paperclip className="w-5 h-5" />
            </button>
            <button type="button" className="p-3 -ml-1 text-slate-400 hover:text-purple-600 bg-slate-50 hover:bg-purple-50 rounded-full transition-colors shrink-0">
              <Camera className="w-5 h-5" />
            </button>
          
          <input 
            type="text" 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tulis pesan..." 
            className="flex-1 bg-slate-100 border-none rounded-full px-5 py-3.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-[15px] font-medium"
          />
          
          <button 
            type="submit"
            disabled={!message.trim()}
            className={`p-3.5 rounded-full transition-all shrink-0 flex items-center justify-center
              ${message.trim() 
                ? 'bg-purple-600 text-white shadow-md shadow-purple-200 hover:bg-purple-700 active:scale-95' 
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`
            }
          >
            <Send className="w-5 h-5 -ml-0.5" />
          </button>
        </form>
      </div>
    </div>
    </div>
  );
}
