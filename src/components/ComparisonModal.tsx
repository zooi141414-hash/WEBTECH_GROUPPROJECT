'use client';

import React from 'react';
import { useSettings } from '@/context/SettingsContext';
import { Part } from '@/data/parts';
import { X, ArrowRightLeft, Zap, DollarSign, CheckCircle2 } from 'lucide-react';

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  buildA: Record<string, Part | null>;
  buildB: Record<string, Part | null>;
  onApplyBuild: (build: Record<string, Part | null>) => void;
}

const CATEGORY_KEYS: Part['category'][] = ['cpu', 'motherboard', 'gpu', 'ram', 'storage', 'psu', 'case', 'cooler'];

export const ComparisonModal: React.FC<ComparisonModalProps> = ({
  isOpen,
  onClose,
  buildA,
  buildB,
  onApplyBuild,
}) => {
  const { t } = useSettings();

  if (!isOpen) return null;

  const getStats = (b: Record<string, Part | null>) => {
    const price = Object.values(b).reduce((sum, item) => sum + (item?.price || 0), 0);
    const tdp = Object.values(b).reduce((sum, item) => sum + (item?.tdp || 0), 0);
    const count = Object.values(b).filter(Boolean).length;
    return { price, tdp, count };
  };

  const statsA = getStats(buildA);
  const statsB = getStats(buildB);

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-500/20">
              <ArrowRightLeft className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
                ตารางเปรียบเทียบสเปกคอมพิวเตอร์ (Side-by-Side Comparison)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                เปรียบเทียบความคุ้มค่าและกำลังไฟระหว่าง สเปก A และ สเปก B
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-white p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Top Comparison Card */}
          <div className="grid grid-cols-2 gap-4">
            {/* Build A Box */}
            <div className="bg-blue-50/60 dark:bg-blue-950/30 border-2 border-blue-500/40 rounded-2xl p-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-blue-600 text-white">สเปก A (หลัก)</span>
                <button
                  onClick={() => { onApplyBuild(buildA); onClose(); }}
                  className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  ใช้งานสเปกนี้
                </button>
              </div>
              <div className="text-2xl font-black text-rose-600 dark:text-rose-500">
                ฿{statsA.price.toLocaleString()}
              </div>
              <div className="flex gap-4 text-xs text-slate-600 dark:text-slate-300 font-medium">
                <span>⚡ ไฟรวม: {statsA.tdp}W</span>
                <span>📦 ชิ้นส่วน: {statsA.count}/8</span>
              </div>
            </div>

            {/* Build B Box */}
            <div className="bg-purple-50/60 dark:bg-purple-950/30 border-2 border-purple-500/40 rounded-2xl p-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-purple-600 text-white">สเปก B (สำรอง)</span>
                <button
                  onClick={() => { onApplyBuild(buildB); onClose(); }}
                  className="text-[11px] font-bold text-purple-600 dark:text-purple-400 hover:underline"
                >
                  ใช้งานสเปกนี้
                </button>
              </div>
              <div className="text-2xl font-black text-rose-600 dark:text-rose-500">
                ฿{statsB.price.toLocaleString()}
              </div>
              <div className="flex gap-4 text-xs text-slate-600 dark:text-slate-300 font-medium">
                <span>⚡ ไฟรวม: {statsB.tdp}W</span>
                <span>📦 ชิ้นส่วน: {statsB.count}/8</span>
              </div>
            </div>
          </div>

          {/* Side-by-Side Table */}
          <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold">
                <tr>
                  <th className="p-3 w-1/4">หมวดหมู่อุปกรณ์</th>
                  <th className="p-3 w-3/8 text-blue-600 dark:text-blue-400 border-l border-slate-200 dark:border-slate-700">สเปก A</th>
                  <th className="p-3 w-3/8 text-purple-600 dark:text-purple-400 border-l border-slate-200 dark:border-slate-700">สเปก B</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {CATEGORY_KEYS.map((catKey) => {
                  const partA = buildA[catKey];
                  const partB = buildB[catKey];

                  return (
                    <tr key={catKey} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                      <td className="p-3 font-bold text-slate-600 dark:text-slate-400">
                        {t(catKey)}
                      </td>
                      <td className="p-3 border-l border-slate-200 dark:border-slate-700">
                        {partA ? (
                          <div>
                            <span className="font-bold text-slate-800 dark:text-slate-200 block">{partA.name}</span>
                            <span className="text-rose-600 dark:text-rose-400 font-semibold text-[11px]">฿{partA.price.toLocaleString()}</span>
                          </div>
                        ) : (
                          <span className="text-slate-400 italic">ยังไม่เลือก</span>
                        )}
                      </td>
                      <td className="p-3 border-l border-slate-200 dark:border-slate-700">
                        {partB ? (
                          <div>
                            <span className="font-bold text-slate-800 dark:text-slate-200 block">{partB.name}</span>
                            <span className="text-rose-600 dark:text-rose-400 font-semibold text-[11px]">฿{partB.price.toLocaleString()}</span>
                          </div>
                        ) : (
                          <span className="text-slate-400 italic">ยังไม่เลือก</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex justify-end bg-slate-50 dark:bg-slate-900/60">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl text-xs font-bold bg-slate-900 dark:bg-white text-white dark:text-slate-900 transition"
          >
            ปิดหน้าต่างเปรียบเทียบ
          </button>
        </div>

      </div>
    </div>
  );
};