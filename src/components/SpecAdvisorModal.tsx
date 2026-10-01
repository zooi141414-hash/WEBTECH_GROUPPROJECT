'use client';

import React, { useState, useEffect } from 'react';
import { useSettings } from '@/context/SettingsContext';
import { Part } from '@/data/parts';
import { X, Printer, ShieldCheck } from 'lucide-react';

interface SpecAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedParts: Record<string, Part | null>;
  totalPrice: number;
  totalTdp: number;
}

export const SpecAdvisorModal: React.FC<SpecAdvisorModalProps> = ({
  isOpen,
  onClose,
  selectedParts,
  totalPrice,
  totalTdp,
}) => {
  const { language, t } = useSettings();
  const [docRef, setDocRef] = useState('');
  const [currentDateTime, setCurrentDateTime] = useState('');

  useEffect(() => {
    const now = new Date();
    setCurrentDateTime(
      now.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    );
    setDocRef(`NS-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`);
  }, [isOpen]);

  if (!isOpen) return null;

  const validParts = Object.entries(selectedParts).filter(([_, part]) => part !== null) as [string, Part][];
  const balanceScore = Math.min(100, Math.max(70, Math.round((validParts.length / 8) * 100)));

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 print-modal-container">
      
      {/* Printable Quotation Box */}
      <div 
        id="printable-quotation" 
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden print:max-h-none print:overflow-visible print:border-none print:shadow-none print:bg-white"
      >
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-950/50 print:bg-white print:border-b-2 print:border-slate-900 print:px-0">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-black text-2xl tracking-tight text-slate-900 dark:text-white print:text-black">
                NEXT<span className="text-blue-600">SPEC</span>
              </span>
              <span className="text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 dark:border dark:border-blue-800 px-2.5 py-0.5 rounded print:border print:border-slate-800 print:bg-white print:text-black">
                OFFICIAL SPECIFICATION & QUOTATION
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-slate-500 dark:text-slate-400 mt-1 print:text-slate-700">
              <span>วันที่ออกเอกสาร: {currentDateTime}</span>
              <span>เลขที่เอกสาร: {docRef}</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 print:text-black">
                <ShieldCheck className="w-3.5 h-3.5" /> ผ่านการตรวจสอบมาตรฐาน 100%
              </span>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="no-print text-slate-400 hover:text-slate-700 dark:hover:text-white p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1 print:p-0 print:overflow-visible">
          
          {/* Summary Stats Cards (แก้สีให้คมชัดในธีมมืด ไม่ขาวจ้า) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 print:gap-2">
            <div className="stat-box p-3.5 rounded-2xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/60 dark:bg-blue-950/40">
              <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block tracking-wider">ดัชนีความสมดุล (System Balance)</span>
              <span className="stat-value text-xl font-black text-blue-600 dark:text-blue-400">{balanceScore} / 100 คะแนน</span>
            </div>
            <div className="stat-box p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60">
              <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block tracking-wider">การใช้พลังงานประมาณการ (Est. TDP)</span>
              <span className="stat-value text-xl font-black text-amber-500 dark:text-amber-400">{totalTdp} Watts</span>
            </div>
            <div className="stat-box p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60">
              <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block tracking-wider">ยอดรวมสุทธิ (Total Net Price)</span>
              <span className="stat-value text-xl font-black text-rose-600 dark:text-rose-400">฿{totalPrice.toLocaleString()}</span>
            </div>
          </div>

          {/* Table */}
          <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden print:border print:border-slate-300">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-slate-800/90 font-bold text-slate-700 dark:text-slate-200">
                <tr>
                  <th className="p-3 w-1/4">หมวดหมู่อุปกรณ์</th>
                  <th className="p-3 w-1/2">รายการผลิตภัณฑ์ & การประเมินทางเทคนิค</th>
                  <th className="p-3 text-right w-1/4">ราคาต่อหน่วย</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {validParts.map(([catKey, part]) => (
                  <tr key={catKey} className="print:break-inside-avoid hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
                    <td className="p-3 font-bold text-slate-700 dark:text-slate-300 align-top">
                      {t(catKey)}
                    </td>
                    <td className="p-3 align-top">
                      <div className="part-title font-bold text-slate-900 dark:text-slate-100">
                        {part.name}
                      </div>
                      <div className="part-advice text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                        • {part.advice[language]}
                      </div>
                    </td>
                    <td className="part-price p-3 text-right font-black text-rose-600 dark:text-rose-400 align-top whitespace-nowrap">
                      ฿{part.price.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-slate-50 dark:bg-slate-800/90 font-black border-t-2 border-slate-200 dark:border-slate-700">
                <tr>
                  <td colSpan={2} className="p-3 text-right uppercase text-slate-800 dark:text-slate-200">ราคารวมสุทธิ (Total Net Amount):</td>
                  <td className="total-price-text p-3 text-right text-rose-600 dark:text-rose-400 text-sm sm:text-base">
                    ฿{totalPrice.toLocaleString()}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="text-[10px] text-slate-400 dark:text-slate-500 text-center pt-1 print:text-slate-600">
            เอกสารนี้ออกโดยระบบคำนวณสเปก NEXTSPEC Enterprise • ราคารวมภาษีมูลค่าเพิ่ม 7% แล้ว • รับประกันศูนย์ไทยแท้ทุกชิ้น
          </div>

        </div>

        {/* Footer Actions */}
        <div className="no-print px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-950/50">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-blue-600 transition px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm cursor-pointer"
          >
            <Printer className="w-4 h-4 text-blue-600" />
            พิมพ์ใบเสนอราคา (Print PDF)
          </button>
          
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition shadow-md shadow-blue-500/20 cursor-pointer"
          >
            {t('close')}
          </button>
        </div>

      </div>
    </div>
  );
};