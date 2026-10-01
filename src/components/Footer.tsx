'use client';

import React from 'react';
import { useSettings } from '@/context/SettingsContext';
import { ShieldCheck, Cpu, Headphones, Truck, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useSettings();

  return (
    <footer className="no-print bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors">
      {/* Service Highlights Bar */}
      <div className="border-b border-slate-100 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200">ประกันศูนย์ไทยแท้ 100%</h5>
              <p className="text-[11px] text-slate-400">Onsite Service เคลมถึงบ้าน</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center shrink-0">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200">ทดสอบเสถียรภาพทุกเซ็ต</h5>
              <p className="text-[11px] text-slate-400">Stress Test ก่อนส่งมอบ</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200">จัดส่งด่วนนิรภัยทั่วประเทศ</h5>
              <p className="text-[11px] text-slate-400">หุ้มโฟมและกันกระแทกอย่างดี</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200">ผู้เชี่ยวชาญดูแลตลอดชีพ</h5>
              <p className="text-[11px] text-slate-400">ให้คำปรึกษาฮาร์ดแวร์ 24/7</p>
            </div>
          </div>
        </div>
      </div>

      {/* Corporate Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-xs">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-black text-lg text-slate-900 dark:text-white">
                NEXT<span className="text-blue-600">SPEC</span>
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-bold border border-blue-200 dark:border-blue-800">
                PRO SYSTEM
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              แพลตฟอร์มจำลองจัดสเปกคอมพิวเตอร์และตรวจสอบความเข้ากันได้ของชิ้นส่วนฮาร์ดแวร์แบบ Real-time ขับเคลื่อนด้วยฐานข้อมูลสเปกมาตรฐานระดับสากล
            </p>
          </div>

          <div>
            <h6 className="font-bold text-slate-900 dark:text-white mb-3 uppercase tracking-wider">บริการระบบ</h6>
            <ul className="space-y-2 text-slate-500 dark:text-slate-400">
              <li className="hover:text-blue-600 cursor-pointer transition">ระบบตรวจสอบ Socket & TDP</li>
              <li className="hover:text-blue-600 cursor-pointer transition">ประเมินเฟรมเรตเกมมิ่ง Real-time</li>
              <li className="hover:text-blue-600 cursor-pointer transition">เปรียบเทียบสเปก Side-by-Side</li>
              <li className="hover:text-blue-600 cursor-pointer transition">ระบบออกใบเสนอราคาอิเล็กทรอนิกส์</li>
            </ul>
          </div>

          <div>
            <h6 className="font-bold text-slate-900 dark:text-white mb-3 uppercase tracking-wider">แบรนด์พันธมิตร</h6>
            <ul className="space-y-2 text-slate-500 dark:text-slate-400">
              <li>Intel Authorized Retail Partner</li>
              <li>AMD Strategic Platform Ecosystem</li>
              <li>NVIDIA GeForce Certified Systems</li>
              <li>ASUS, MSI, GIGABYTE, Corsair Official</li>
            </ul>
          </div>

          <div>
            <h6 className="font-bold text-slate-900 dark:text-white mb-3 uppercase tracking-wider">ความปลอดภัยและการรับประกัน</h6>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
              ระบบตรวจสอบความเข้ากันได้อิงตามค่า TDP และสถาปัตยกรรมชิปเซ็ตของผู้ผลิตโดยตรง มั่นใจได้ว่าทุกเซ็ตใช้งานได้จริง 100%
            </p>
            <div className="flex items-center gap-1.5 text-emerald-600 font-bold">
              <Award className="w-4 h-4" /> 3-Year Hardware Warranty Coverage
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 dark:border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} NEXTSPEC CORPORATION. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer">นโยบายความเป็นส่วนตัว (Privacy Policy)</span>
            <span>•</span>
            <span className="hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer">ข้อกำหนดการให้บริการ (Terms of Service)</span>
            <span>•</span>
            <span className="hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer">ระบบรักษาความปลอดภัย SSL 256-bit</span>
          </div>
        </div>
      </div>
    </footer>
  );
};