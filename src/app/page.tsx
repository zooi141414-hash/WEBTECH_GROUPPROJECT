'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CookieConsent } from '@/components/CookieConsent';
import { useSettings } from '@/context/SettingsContext';
import { 
  ArrowRight, 
  Cpu, 
  ShieldCheck, 
  Zap, 
  Gauge, 
  Layers, 
  CheckCircle2 
} from 'lucide-react';

export default function Home() {
  const { t } = useSettings();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 dark:bg-slate-950">
      <div>
        <Navbar />

        {/* Hero Section */}
        <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
            
            {/* Enterprise Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs font-bold mb-6 animate-in fade-in duration-300">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              ระบบจัดสเปกคอมพิวเตอร์และตรวจสอบความเข้ากันได้ 2026
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight max-w-4xl mx-auto">
              สร้างคอมพิวเตอร์ในฝันของคุณ <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-rose-600 bg-clip-text text-transparent">
                ด้วยระบบจำลองและตรวจสเปกอัจฉริยะ
              </span>
            </h1>

            <p className="mt-5 text-sm sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              หมดปัญหาซื้อของมาแล้วใส่ไม่ได้ ค้นหาอุปกรณ์ เช็ค Socket AM4/AM5/LGA1700 ตรวจสอบกำลังไฟ PSU และประเมิน FPS เกมล่วงหน้าได้ทันที
            </p>

            {/* CTA Button ➔ ลิงก์ตรงเข้า /builder */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/builder"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-blue-500/25 transition transform active:scale-95 group cursor-pointer"
              >
                <span>เริ่มจัดสเปกคอมพิวเตอร์เลย</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-8 border-t border-slate-200/60 dark:border-slate-800/60 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> ตรวจสอบ Socket ครบ
              </div>
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> คำนวณวัตต์ไฟ Real-time
              </div>
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> ตรวจความยาวการ์ดจอ
              </div>
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> ออกใบเสนอราคามาตรฐาน
              </div>
            </div>

          </div>
        </section>

        {/* Feature Grid */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">มาตรฐานระบบที่เหนือกว่า</h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">ออกแบบเพื่อความแม่นยำ ปลอดภัย และความคุ้มค่าสูงสุดในทุกการจัดสเปก</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Smart Hardware Compatibility</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                ระบบคอยตรวจสอบคู่ขนานระหว่าง CPU, Motherboard และ RAM ป้องกันการสั่งซื้อผิดรุ่นอย่างแม่นยำ
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 flex items-center justify-center">
                <Gauge className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">TDP & PSU Load Balancer</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                คำนวณการใช้พลังงานแบบไดนามิก พร้อมหลอดเกจวัดเปอร์เซ็นต์โหลด เพื่อเลือก Power Supply ที่จ่ายไฟได้อย่างเสถียร
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 flex items-center justify-center">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Side-by-Side Comparison</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                บันทึกสเปก A และ B เพื่อเปิดตารางเทียบราคา สเปก และความคุ้มค่าแบบข้างกัน ช่วยในการตัดสินใจได้อย่างมืออาชีพ
              </p>
            </div>
          </div>
        </section>

      </div>

      <Footer />
      <CookieConsent />
    </div>
  );
}