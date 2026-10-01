'use client';

import React, { useState, useEffect } from 'react';
import { useSettings } from '@/context/SettingsContext';
import { PARTS_DATABASE, Part } from '@/data/parts';
import { validateBuild } from '@/utils/checker';
import { getThemeSwal } from '@/utils/swal';
import { SpecAdvisorModal } from '@/components/SpecAdvisorModal';
import { ComparisonModal } from '@/components/ComparisonModal';
import Swal from 'sweetalert2';
import { 
  Cpu, 
  CircuitBoard, 
  MonitorPlay, 
  MemoryStick, 
  HardDrive, 
  Zap, 
  Box, 
  Wind,
  Search, 
  Check, 
  AlertCircle, 
  CheckCircle2, 
  Trash2,
  Sparkles,
  Flame,
  Gauge,
  ChevronUp,
  ShoppingCart,
  X,
  Share2,
  Layers,
  ArrowRightLeft,
  Wand2
} from 'lucide-react';

const CATEGORY_ITEMS: { key: Part['category']; icon: any }[] = [
  { key: 'cpu', icon: Cpu },
  { key: 'motherboard', icon: CircuitBoard },
  { key: 'gpu', icon: MonitorPlay },
  { key: 'ram', icon: MemoryStick },
  { key: 'storage', icon: HardDrive },
  { key: 'psu', icon: Zap },
  { key: 'case', icon: Box },
  { key: 'cooler', icon: Wind },
];

export const BuilderInterface: React.FC = () => {
  const { t } = useSettings();
  const [activeCategory, setActiveCategory] = useState<Part['category']>('cpu');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [subFilter, setSubFilter] = useState<string>('all');
  const [onlyPopular, setOnlyPopular] = useState<boolean>(false);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  
  // Modals & Panels State
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);
  const [showBottomDrawer, setShowBottomDrawer] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  // Selected Rig Parts
  const [selectedParts, setSelectedParts] = useState<Record<string, Part | null>>({
    cpu: null,
    motherboard: null,
    gpu: null,
    ram: null,
    storage: null,
    psu: null,
    case: null,
    cooler: null,
  });

  // Saved Build Slot B (สำหรับ Side-by-Side Comparison)
  const [savedBuildSlotB, setSavedBuildSlotB] = useState<Record<string, Part | null>>({
    cpu: null,
    motherboard: null,
    gpu: null,
    ram: null,
    storage: null,
    psu: null,
    case: null,
    cooler: null,
  });

  // โหลดสเปกจาก URL Query Params และ LocalStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const initialParts: Record<string, Part | null> = { ...selectedParts };
      let hasParams = false;

      CATEGORY_ITEMS.forEach(({ key }) => {
        const partId = params.get(key);
        if (partId) {
          const found = PARTS_DATABASE.find((p) => p.id === partId);
          if (found) {
            initialParts[key] = found;
            hasParams = true;
          }
        }
      });

      if (hasParams) {
        setSelectedParts(initialParts);
      }

      const cachedB = localStorage.getItem('nextspec_slot_b');
      if (cachedB) {
        try {
          setSavedBuildSlotB(JSON.parse(cachedB));
        } catch (e) {}
      }
    }
  }, []);

  const issues = validateBuild(selectedParts);
  const totalPrice = Object.values(selectedParts).reduce((sum, p) => sum + (p?.price || 0), 0);
  const totalTdp = Object.values(selectedParts).reduce((sum, p) => sum + (p?.tdp || 0), 0);
  const selectedCount = Object.values(selectedParts).filter(Boolean).length;
  const psuWattage = selectedParts.psu?.wattage || 0;
  const psuLoadPercent = psuWattage > 0 ? Math.min(100, Math.round((totalTdp / psuWattage) * 100)) : 0;

  // ฟังก์ชันแชร์สเปกผ่าน URL + SweetAlert2
  const handleShareBuild = () => {
    const params = new URLSearchParams();
    Object.entries(selectedParts).forEach(([cat, part]) => {
      if (part) params.set(cat, part.id);
    });

    const shareUrl = `${window.location.origin}/builder?${params.toString()}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      getThemeSwal().fire({
        icon: 'success',
        title: 'คัดลอกลิงก์สำเร็จ!',
        text: 'ลิงก์สเปกของคุณถูกบันทึกลงใน Clipboard แล้ว ส่งต่อให้เพื่อนเปิดได้ทันที',
        timer: 2000,
        showConfirmButton: false,
      });
    });
  };

  // ฟังก์ชันจัดสเปกด่วนตามงบประมาณ (Smart Presets)
  const applyPreset = (budgetType: '15k' | '30k' | '50k') => {
    let presetIds: Record<string, string> = {};

    if (budgetType === '15k') {
      presetIds = {
        cpu: 'cpu-amd-1',
        motherboard: 'mb-amd-1',
        gpu: 'gpu-1',
        ram: 'ram-1',
        storage: 'ssd-1',
        psu: 'psu-1',
        case: 'case-1',
        cooler: 'cooler-1',
      };
    } else if (budgetType === '30k') {
      presetIds = {
        cpu: 'cpu-intel-3',
        motherboard: 'mb-intel-2',
        gpu: 'gpu-1',
        ram: 'ram-2',
        storage: 'ssd-1',
        psu: 'psu-1',
        case: 'case-1',
        cooler: 'cooler-1',
      };
    } else {
      presetIds = {
        cpu: 'cpu-amd-3',
        motherboard: 'mb-amd-2',
        gpu: 'gpu-2',
        ram: 'ram-2',
        storage: 'ssd-2',
        psu: 'psu-2',
        case: 'case-2',
        cooler: 'cooler-2',
      };
    }

    const newBuild: Record<string, Part | null> = {};
    Object.entries(presetIds).forEach(([cat, id]) => {
      newBuild[cat] = PARTS_DATABASE.find((p) => p.id === id) || null;
    });

    setSelectedParts(newBuild);

    getThemeSwal().fire({
      icon: 'success',
      title: 'ปรับใช้สเปกสำเร็จ!',
      text: `ระบบได้จัดอุปกรณ์ตามงบ ${budgetType.toUpperCase()} ที่เหมาะสมที่สุดให้เรียบร้อยแล้ว`,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  // บันทึกสเปกลง Slot B + SweetAlert2
  const handleSaveToSlotB = () => {
    setSavedBuildSlotB({ ...selectedParts });
    localStorage.setItem('nextspec_slot_b', JSON.stringify(selectedParts));

    getThemeSwal().fire({
      icon: 'success',
      title: 'บันทึกสำเร็จ!',
      text: 'บันทึกสเปกปัจจุบันลงใน "สเปก B" เรียบร้อยแล้ว สามารถกดปุ่มเปรียบเทียบสเปกเพื่อดูความคุ้มค่าได้ทันที',
      timer: 2200,
      showConfirmButton: false,
    });
  };

  // ยืนยันล้างข้อมูลทั้งหมด + SweetAlert2
  const handleClearAllConfirm = () => {
    getThemeSwal().fire({
      title: 'ต้องการล้างสเปกทั้งหมด?',
      text: 'อุปกรณ์ที่เลือกไว้ทั้งหมดจะถูกนำออกจากรายการทันที',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ใช่, ล้างทั้งหมด',
      cancelButtonText: 'ยกเลิก',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        setSelectedParts({
          cpu: null,
          motherboard: null,
          gpu: null,
          ram: null,
          storage: null,
          psu: null,
          case: null,
          cooler: null,
        });

        getThemeSwal().fire({
          icon: 'success',
          title: 'ล้างข้อมูลเรียบร้อย',
          timer: 1200,
          showConfirmButton: false,
        });
      }
    });
  };

  // ตัวกรองสินค้า
  const filteredParts = PARTS_DATABASE
    .filter((p) => p.category === activeCategory)
    .filter((p) => selectedBrand === 'all' || p.brand.toLowerCase() === selectedBrand.toLowerCase())
    .filter((p) => {
      if (subFilter === 'all') return true;
      if (activeCategory === 'cpu' || activeCategory === 'motherboard') return p.socket === subFilter;
      if (activeCategory === 'ram') return p.ramType === subFilter;
      if (activeCategory === 'case') return p.formFactor === subFilter;
      return true;
    })
    .filter((p) => !onlyPopular || p.isPopular)
    .filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => (sortOrder === 'asc' ? a.price - b.price : b.price - a.price));

  const availableBrands = Array.from(new Set(PARTS_DATABASE.filter((p) => p.category === activeCategory).map((p) => p.brand)));

  const handleCategoryChange = (key: Part['category']) => {
    setActiveCategory(key);
    setSelectedBrand('all');
    setSubFilter('all');
    setOnlyPopular(false);
  };

  const handleSelect = (part: Part) => {
    setSelectedParts((prev) => ({ ...prev, [part.category]: part }));
  };

  const handleRemove = (category: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedParts((prev) => ({ ...prev, [category]: null }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pb-32 print:p-0">
      
      {/* ส่วนหน้าเว็บที่จะถูกซ่อนอัตโนมัติตอนสั่งพิมพ์ใบเสนอราคา */}
      <div className="no-print">
        
        {/* Top Control Bar: Actions & Presets */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 mb-8 shadow-sm space-y-4">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  {t('diyBuild')}
                </h2>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                ระบบจำลองจัดสเปกคอมพิวเตอร์ ตรวจสอบความเข้ากันได้ และคำนวณพลังงานเรียลไทม์
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={handleShareBuild}
                disabled={selectedCount === 0}
                className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-blue-500 transition disabled:opacity-40 cursor-pointer"
                title="คัดลอกลิงก์แชร์สเปกนี้"
              >
                <Share2 className="w-4 h-4 text-blue-600" />
                <span>แชร์สเปก (URL)</span>
              </button>

              <button
                onClick={handleSaveToSlotB}
                disabled={selectedCount === 0}
                className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-purple-500 transition disabled:opacity-40 cursor-pointer"
                title="บันทึกสเปกนี้ไว้เปรียบเทียบ"
              >
                <Layers className="w-4 h-4 text-purple-600" />
                <span>บันทึกเป็นสเปก B</span>
              </button>

              <button
                onClick={() => setIsCompareOpen(true)}
                className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-2.5 rounded-xl border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 hover:bg-purple-100 transition cursor-pointer"
              >
                <ArrowRightLeft className="w-4 h-4" />
                <span>เปรียบเทียบ 2 สเปก</span>
              </button>

              <button
                onClick={() => setIsAdvisorOpen(true)}
                disabled={selectedCount === 0}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-40 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md shadow-blue-500/20 transition transform active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '4s' }} />
                <span>{t('advisorBtn')} ({selectedCount})</span>
              </button>
            </div>
          </div>

          {/* Quick Presets */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <Wand2 className="w-3.5 h-3.5 text-amber-500" />
              จัดสเปกด่วนตามงบ:
            </span>
            <button
              onClick={() => applyPreset('15k')}
              className="text-xs px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold transition border border-slate-200 dark:border-slate-700 cursor-pointer"
            >
              ⚡ งบประหยัด (~18,000.-)
            </button>
            <button
              onClick={() => applyPreset('30k')}
              className="text-xs px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/50 dark:hover:bg-blue-900/60 text-blue-600 dark:text-blue-400 font-semibold transition border border-blue-200 dark:border-blue-800 cursor-pointer"
            >
              🎮 งบเกมมิ่งยอดนิยม (~30,000.-)
            </button>
            <button
              onClick={() => applyPreset('50k')}
              className="text-xs px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/50 dark:hover:bg-rose-900/60 text-rose-600 dark:text-rose-400 font-semibold transition border border-rose-200 dark:border-rose-800 cursor-pointer"
            >
              🔥 งบเรือธง 4K & Workstation (~60,000.-)
            </button>
          </div>
        </div>

        {/* Wattage Load & Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Gauge className="w-4 h-4 text-amber-500" />
                {t('wattageUsage')}
              </span>
              <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
                {totalTdp}W / {psuWattage ? `${psuWattage}W` : 'ยังไม่เลือก PSU'}
              </span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden p-0.5 border border-slate-200 dark:border-slate-700">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  psuLoadPercent > 85 ? 'bg-gradient-to-r from-amber-500 to-rose-600' : 'bg-gradient-to-r from-blue-500 to-emerald-500'
                }`}
                style={{ width: `${psuWattage ? psuLoadPercent : Math.min(100, (totalTdp / 650) * 100)}%` }}
              />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 block font-medium">อุปกรณ์ที่เลือกแล้ว</span>
              <span className="text-xl font-black text-slate-800 dark:text-slate-100">{selectedCount} / 8 ชิ้น</span>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 block font-medium">งบประมาณรวม</span>
              <span className="text-xl font-black text-rose-600 dark:text-rose-500">฿{totalPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Compatibility Issues */}
        <div className="mb-6">
          {issues.length > 0 ? (
            <div className="space-y-2">
              {issues.map((issue, i) => (
                <div key={i} className="flex items-center gap-3 p-3.5 rounded-2xl border bg-rose-50 border-rose-200 dark:bg-rose-950/40 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs sm:text-sm shadow-sm">
                  <AlertCircle className="w-5 h-5 shrink-0 text-rose-500" />
                  <div>
                    <span className="font-bold">{issue.title}: </span>
                    {issue.message}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-3 p-3.5 rounded-2xl border bg-emerald-50 border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="font-medium">{t('compatibleOk')}</span>
            </div>
          )}
        </div>

        {/* 2-Column Builder */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Slots & Cart */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm">
              <div className="flex justify-between items-baseline border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">{t('totalPrice')}</span>
                  <span className="text-3xl font-black text-rose-600 dark:text-rose-500 tracking-tight">
                    ฿{totalPrice.toLocaleString()}
                  </span>
                </div>
                {selectedCount > 0 && (
                  <button
                    onClick={handleClearAllConfirm}
                    className="text-xs text-slate-400 hover:text-rose-500 transition flex items-center gap-1 font-semibold cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> {t('clearAll')}
                  </button>
                )}
              </div>

              <div className="space-y-2">
                {CATEGORY_ITEMS.map(({ key, icon: Icon }) => {
                  const current = selectedParts[key];
                  const isActive = activeCategory === key;

                  return (
                    <button
                      key={key}
                      onClick={() => handleCategoryChange(key)}
                      className={`w-full text-left p-3.5 rounded-2xl border flex items-center justify-between transition-all duration-200 ${
                        isActive 
                          ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/40 dark:border-blue-500 shadow-sm ring-2 ring-blue-500/10' 
                          : 'border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-900/40 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className={`p-2.5 rounded-xl shrink-0 transition-colors ${isActive ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="truncate">
                          <div className="text-xs font-bold text-slate-800 dark:text-slate-200">{t(key)}</div>
                          <div className="text-[11px] text-slate-500 truncate mt-0.5">
                            {current ? current.name : 'คลิกเพื่อเลือกชิ้นส่วน'}
                          </div>
                        </div>
                      </div>

                      {current && (
                        <div className="flex items-center gap-2 pl-2">
                          <span className="text-xs font-extrabold text-rose-600 dark:text-rose-400">
                            ฿{current.price.toLocaleString()}
                          </span>
                          <span 
                            onClick={(e) => handleRemove(key, e)}
                            className="text-slate-400 hover:text-rose-500 p-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Search, Filters & Products */}
          <div className="lg:col-span-8 space-y-5">
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white capitalize">
                  {t(activeCategory)}
                </h3>

                <button
                  onClick={() => setOnlyPopular(!onlyPopular)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition border cursor-pointer ${
                    onlyPopular 
                      ? 'bg-rose-600 text-white border-rose-600 shadow-sm shadow-rose-500/20' 
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                  }`}
                >
                  <Flame className={`w-3.5 h-3.5 ${onlyPopular ? 'text-amber-300 fill-amber-300' : 'text-rose-500'}`} />
                  สินค้ายอดฮิต / ขายดีที่สุด
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder={t('searchPlaceholder')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500 transition shadow-sm"
                  />
                </div>

                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as any)}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-2.5 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 outline-none cursor-pointer shadow-sm"
                >
                  <option value="asc">{t('priceLowHigh')}</option>
                  <option value="desc">{t('priceHighLow')}</option>
                </select>
              </div>

              {/* Sub-Filters */}
              {(activeCategory === 'cpu' || activeCategory === 'motherboard') && (
                <div className="flex items-center gap-2 pt-1 flex-wrap">
                  <span className="text-[11px] font-bold text-slate-400">เลือกแยกตาม Socket:</span>
                  {['all', 'AM4', 'AM5', 'LGA1700'].map((sock) => (
                    <button
                      key={sock}
                      onClick={() => setSubFilter(sock)}
                      className={`text-xs px-3 py-1 rounded-lg border font-semibold transition cursor-pointer ${
                        subFilter === sock
                          ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                      }`}
                    >
                      {sock === 'all' ? 'ทุก Socket' : sock}
                    </button>
                  ))}
                </div>
              )}

              {activeCategory === 'ram' && (
                <div className="flex items-center gap-2 pt-1 flex-wrap">
                  <span className="text-[11px] font-bold text-slate-400">เลือกแยกตามประเภทแรม:</span>
                  {['all', 'DDR4', 'DDR5'].map((rType) => (
                    <button
                      key={rType}
                      onClick={() => setSubFilter(rType)}
                      className={`text-xs px-3 py-1 rounded-lg border font-semibold transition cursor-pointer ${
                        subFilter === rType
                          ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                      }`}
                    >
                      {rType === 'all' ? 'ทุกประเภท' : rType}
                    </button>
                  ))}
                </div>
              )}

              {/* Brand Filter */}
              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  onClick={() => setSelectedBrand('all')}
                  className={`text-xs px-3.5 py-1.5 rounded-xl border font-bold transition cursor-pointer ${
                    selectedBrand === 'all'
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white shadow-sm'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                  }`}
                >
                  {t('allBrands')}
                </button>
                {availableBrands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => setSelectedBrand(brand)}
                    className={`text-xs px-3.5 py-1.5 rounded-xl border font-bold transition cursor-pointer ${
                      selectedBrand === brand
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white shadow-sm'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>

              {/* ใหม่: 2 คอลัมน์ การ์ดกว้างเต็มตา หรูหราแบบร้านค้าฮาร์ดแวร์ระดับโปร */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-6 pt-2">
              {filteredParts.map((part) => {
                const isSelected = selectedParts[activeCategory]?.id === part.id;

                return (
                  <div
                    key={part.id}
                    className={`bg-white dark:bg-slate-900 border rounded-3xl p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-xl relative ${
                      isSelected 
                        ? 'border-blue-600 ring-2 ring-blue-500/20 shadow-md' 
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    {part.isPopular && (
                      <div className="absolute top-6 left-6 z-10 bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md shadow-rose-600/30">
                        <Flame className="w-3 h-3 fill-white" /> ยอดฮิต
                      </div>
                    )}

                    <div>
                      {/* โค้ดใหม่: ขยายความสูงเป็น h-64 (หรือ h-60), ใช้ object-contain รูปไม่โดนตัด และใส่พื้นหลังสีขาวสะอาดยกระดับรูปสินค้า */}
<div className="w-full h-60 sm:h-64 bg-white dark:bg-slate-950/80 rounded-2xl overflow-hidden mb-4 border border-slate-100 dark:border-slate-800/80 flex items-center justify-center p-4 relative group/img">
  <img
    src={part.image}
    alt={part.name}
    loading="lazy"
    className="max-h-full max-w-full object-contain transform group-hover/img:scale-105 transition-transform duration-300 drop-shadow-sm"
    onError={(e) => {
      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=600&auto=format&fit=crop&q=80';
    }}
  />
</div>

                      <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-snug line-clamp-2">
                        {part.name}
                      </h4>

                      <div className="mt-3 border-t border-slate-100 dark:border-slate-800 pt-2 space-y-1">
                        {part.specs.map((sp, idx) => (
                          <div key={idx} className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400">
                            <span>{sp.label}</span>
                            <span className="font-bold text-slate-700 dark:text-slate-300">{sp.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-bold">ราคา</span>
                        <span className="text-base font-black text-rose-600 dark:text-rose-500">
                          ฿{part.price.toLocaleString()}
                        </span>
                      </div>

                      <button
                        onClick={() => handleSelect(part)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition flex items-center gap-1 cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-600 text-white'
                            : 'bg-rose-600 hover:bg-rose-700 text-white shadow-sm shadow-rose-600/20'
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <Check className="w-3.5 h-3.5" /> {t('selected')}
                          </>
                        ) : (
                          t('addToBuild')
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>

      {/* ========================================================
          STICKY BOTTOM FLOATING BAR (no-print)
          ======================================================== */}
      
      {/* 1. Modal รายละเอียดชิ้นส่วนที่เลือก (พร้อมปุ่มล้างทั้งหมดและแปลถูกต้อง) */}
      {showBottomDrawer && (
        <div 
          className="no-print fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200"
          onClick={() => setShowBottomDrawer(false)}
        >
          <div 
            className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-t-3xl sm:rounded-3xl shadow-2xl p-6 max-h-[85vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                  <ShoppingCart className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
                    รายละเอียดอุปกรณ์ที่คุณเลือก ({selectedCount} / 8 ชิ้น)
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    รายการอุปกรณ์ทั้งหมดในเซ็ตคอมพิวเตอร์ของคุณ
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {selectedCount > 0 && (
                  <button
                    onClick={handleClearAllConfirm}
                    className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200 dark:border-rose-900 transition cursor-pointer"
                    title="ล้างอุปกรณ์ทั้งหมด"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>ล้างทั้งหมด</span>
                  </button>
                )}

                <button 
                  onClick={() => setShowBottomDrawer(false)}
                  className="text-slate-400 hover:text-slate-700 dark:hover:text-white p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* รายการอุปกรณ์ที่เลือก (ไม่มีปัญหาภาษาจีนปน) */}
            <div className="overflow-y-auto space-y-3 flex-1 pr-1">
              {selectedCount === 0 ? (
                <div className="py-16 text-center text-slate-400 text-xs sm:text-sm">
                  ยังไม่ได้เลือกอุปกรณ์ใดๆ เลย คลิกเลือกชิ้นส่วนจากรายการหน้าเว็บได้เลย
                </div>
              ) : (
                CATEGORY_ITEMS.map(({ key }) => {
                  const item = selectedParts[key];
                  if (!item) return null;

                  return (
                    <div 
                      key={key}
                      className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 transition"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-1 flex items-center justify-center shrink-0">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=600&auto=format&fit=crop&q=80';
                            }}
                          />
                        </div>
                        <div className="truncate">
                          <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
                            {t(key)}
                          </span>
                          <span className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200 truncate block mt-0.5">
                            {item.name}
                          </span>
                          <span className="text-xs font-black text-rose-600 dark:text-rose-500 mt-0.5 block">
                            ฿{item.price.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={(e) => handleRemove(key, e)}
                        className="text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 p-2.5 transition rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/40 ml-2 cursor-pointer"
                        title="นำอุปกรณ์นี้ออก"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            {/* Drawer Footer Summary */}
            <div className="border-t border-slate-100 dark:border-slate-800 pt-4 mt-4 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block font-medium">ยอดรวมทั้งหมด</span>
                <span className="text-2xl font-black text-rose-600 dark:text-rose-500">
                  ฿{totalPrice.toLocaleString()}
                </span>
              </div>
              <button
                onClick={() => {
                  setShowBottomDrawer(false);
                  setIsAdvisorOpen(true);
                }}
                disabled={selectedCount === 0}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-2xl shadow-lg shadow-blue-500/25 transition flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-300" /> 
                <span>วิเคราะห์สเปกนี้</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. แถบลอยล่างจอ (Sticky Bottom Bar) */}
      <div className="no-print fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 shadow-[0_-8px_25px_-5px_rgba(0,0,0,0.12)] px-4 sm:px-6 py-3 transition-transform duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  เลือกแล้ว: <strong className="text-blue-600 dark:text-blue-400">{selectedCount}</strong> / 8 ชิ้น
                </span>
                <span className="text-slate-300 dark:text-slate-700">|</span>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  ไฟรวม: <strong className="text-amber-500">{totalTdp}W</strong>
                </span>
              </div>
              <span className="text-sm sm:text-base font-black text-rose-600 dark:text-rose-500 leading-none">
                ฿{totalPrice.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowBottomDrawer(true)}
              className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 transition cursor-pointer"
            >
              <span>ดูรายละเอียด</span>
              <ChevronUp className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setIsAdvisorOpen(true)}
              disabled={selectedCount === 0}
              className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md shadow-blue-500/20 transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden sm:inline">วิเคราะห์สเปก</span>
            </button>
          </div>
        </div>
      </div>

      {/* AI Advisor Modal */}
      <SpecAdvisorModal
        isOpen={isAdvisorOpen}
        onClose={() => setIsAdvisorOpen(false)}
        selectedParts={selectedParts}
        totalPrice={totalPrice}
        totalTdp={totalTdp}
      />

      {/* Side-by-Side Comparison Modal */}
      <ComparisonModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        buildA={selectedParts}
        buildB={savedBuildSlotB}
        onApplyBuild={(build) => setSelectedParts(build)}
      />

    </div>
  );
};

export default BuilderInterface;