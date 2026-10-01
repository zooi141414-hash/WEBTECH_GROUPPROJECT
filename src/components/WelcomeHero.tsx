'use client';

import React from 'react';
import { useSettings } from '@/context/SettingsContext';
import { ArrowRight, CheckCircle2, Cpu, Sparkles } from 'lucide-react';

export const WelcomeHero: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  const { t } = useSettings();

  return (
    <section className="bg-gradient-to-b from-blue-50/50 to-white dark:from-slate-950 dark:to-slate-900 border-b border-slate-200 dark:border-slate-800 py-16 px-6 transition-colors">
      <div className="max-w-5xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 px-3.5 py-1.5 rounded-full text-xs font-semibold">
          <Sparkles className="w-4 h-4" /> Next-Gen PC Building Simulator
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          จัดสเปกคอมพิวเตอร์ <br />
          <span className="text-blue-600 dark:text-blue-400">เช็คความเข้ากันได้ทันที</span>
        </h1>

        <p className="max-w-2xl mx-auto text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
          {t('tagline')} ค้นหาอุปกรณ์ เปรียบเทียบสเปก และตรวจเช็ค Socket, RAM, และกำลังไฟอัตโนมัติ
        </p>

        <div className="pt-2 flex justify-center">
          <button
            onClick={onStart}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-blue-500/25 transition transform active:scale-95"
          >
            {t('startBuilding')}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="pt-8 flex flex-wrap justify-center gap-6 text-xs text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> ตรวจจับปัญหา Socket AM4/AM5/LGA1700</span>
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> ตรวจสอบความยาวการ์ดจอกับขนาดเคส</span>
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> คำนวณวัตต์ PSU แบบ Real-time</span>
        </div>
      </div>
    </section>
  );
};