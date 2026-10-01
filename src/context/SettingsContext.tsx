'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'th' | 'en' | 'zh';
export type Theme = 'light' | 'dark';
export type FontSize = 'sm' | 'base' | 'lg';

interface SettingsContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  toggleTheme: () => void;
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  th: {
    brand: 'NEXTSPEC',
    tagline: 'ระบบจัดสเปกคอมพิวเตอร์และจำลองความเข้ากันได้อัจฉริยะ',
    heroBadge: 'ระบบจำลองจัดสเปกคอมพิวเตอร์ 2026',
    heroTitle1: 'เลือกอุปกรณ์ที่ใช่',
    heroTitle2: 'คำนวณสเปกและตรวจความเข้ากันได้ทันที',
    heroDesc: 'ค้นหาฮาร์ดแวร์ เปรียบเทียบสเปก เช็ค Socket AM4/AM5/LGA1700 วัตต์ไฟ และรับคำแนะนำระดับโปร',
    startBuilding: 'เริ่มจัดสเปกคอมเลย',
    home: 'หน้าหลัก',
    diyBuild: 'จัดสเปก DIY',
    totalPrice: 'ยอดรวมทั้งสิ้น',
    searchPlaceholder: 'ค้นหาชื่อรุ่น, ยี่ห้อ, สเปก...',
    priceLowHigh: 'ราคา: ต่ำ - สูง',
    priceHighLow: 'ราคา: สูง - ต่ำ',
    addToBuild: 'เลือกใส่อุปกรณ์',
    selected: 'เลือกแล้ว',
    change: 'เปลี่ยน',
    remove: 'ลบ',
    specs: 'สเปกอุปกรณ์',
    allBrands: 'ทุกแบรนด์',
    allCategories: 'ทุกหมวดหมู่',
    clearAll: 'ล้างสเปกทั้งหมด',
    cookieTitle: 'เราใช้คุกกี้เพื่อประสบการณ์ที่ดีขึ้น',
    cookieDesc: 'เว็บไซต์นี้ใช้คุกกี้เพื่อบันทึกการจัดสเปกและจำการตั้งค่าธีม/ภาษาของคุณ',
    cookieAccept: 'ยอมรับทั้งหมด',
    cookieDecline: 'ปฏิเสธ',
    compatibleOk: 'อุปกรณ์ทุกชิ้นเข้ากันได้สมบูรณ์ ไม่พบปัญหา Socket หรือคอขวด',
    advisorBtn: 'วิเคราะห์สเปก & คำแนะนำอัจฉริยะ',
    advisorTitle: 'ผลการวิเคราะห์สเปกคอมพิวเตอร์ของคุณ',
    advisorSubtitle: 'บทวิเคราะห์ความสมดุล ความคุ้มค่า และคำแนะนำการใช้งานจริง',
    balanceScore: 'คะแนนความสมดุลของระบบ',
    recommendationLabel: 'คำแนะนำรายชิ้นส่วน',
    close: 'ปิดหน้าต่าง',
    readyToOrder: 'พิมพ์ใบเสนอราคา / บันทึกสเปก',
    // Categories
    cpu: 'ซีพียู (CPU)',
    motherboard: 'เมนบอร์ด (Mainboard)',
    gpu: 'การ์ดจอ (VGA Card)',
    ram: 'แรม (RAM Memory)',
    storage: 'ฮาร์ดดิสก์/SSD (Storage)',
    psu: 'พาวเวอร์ซัพพลาย (Power Supply)',
    case: 'เคสคอมพิวเตอร์ (Case)',
    cooler: 'ชุดระบายความร้อน (Cooler)',
  },
  en: {
    brand: 'NEXTSPEC',
    tagline: 'Intelligent PC Part Compatibility Checker & Custom Rig Builder',
    heroBadge: 'Next-Gen PC Building Simulator 2026',
    heroTitle1: 'Pick Your Ideal Gear',
    heroTitle2: 'Real-time Hardware Compatibility Checker',
    heroDesc: 'Explore hardware, compare specs, verify AM4/AM5/LGA1700 sockets, wattage, and get smart recommendations.',
    startBuilding: 'Start Building Now',
    home: 'Home',
    diyBuild: 'DIY Builder',
    totalPrice: 'Total Price',
    searchPlaceholder: 'Search model, brand, spec...',
    priceLowHigh: 'Price: Low to High',
    priceHighLow: 'Price: High to Low',
    addToBuild: 'Add to Build',
    selected: 'Selected',
    change: 'Change',
    remove: 'Remove',
    specs: 'Specifications',
    allBrands: 'All Brands',
    allCategories: 'All Categories',
    clearAll: 'Clear Build',
    cookieTitle: 'We use cookies for better experience',
    cookieDesc: 'This site uses cookies to save your custom build and personal preferences.',
    cookieAccept: 'Accept All',
    cookieDecline: 'Decline',
    compatibleOk: 'All components are fully compatible with no bottlenecks detected.',
    advisorBtn: 'Analyze Build & Smart Advice',
    advisorTitle: 'Build Performance & Synergy Analysis',
    advisorSubtitle: 'In-depth balance evaluation, efficiency score, and usage recommendations.',
    balanceScore: 'System Balance Score',
    recommendationLabel: 'Component Synergy Breakdown',
    close: 'Close',
    readyToOrder: 'Print Spec Sheet / Save Build',
    // Categories
    cpu: 'Processor (CPU)',
    motherboard: 'Motherboard',
    gpu: 'Graphics Card (GPU)',
    ram: 'Memory (RAM)',
    storage: 'Storage (M.2 NVMe)',
    psu: 'Power Supply (PSU)',
    case: 'PC Case',
    cooler: 'CPU Cooler',
  },
  zh: {
    brand: 'NEXTSPEC',
    tagline: '智能电脑硬件装机模拟与兼容性检测系统',
    heroBadge: '2026新一代智能装机模拟器',
    heroTitle1: '挑选理想硬件配置',
    heroTitle2: '实时硬件兼容性检测与功耗计算',
    heroDesc: '探索硬件，对比参数，检测 AM4/AM5/LGA1700 针脚及功耗，获取专业装机建议。',
    startBuilding: '立即开始装机',
    home: '首页',
    diyBuild: 'DIY配置单',
    totalPrice: '总计金额',
    searchPlaceholder: '搜索型号、品牌、参数...',
    priceLowHigh: '价格：从低到高',
    priceHighLow: '价格：从高到低',
    addToBuild: '选择此配件',
    selected: '已选择',
    change: '更换',
    remove: '移除',
    specs: '硬件规格',
    allBrands: '全部品牌',
    allCategories: '所有分类',
    clearAll: '清空配置单',
    cookieTitle: '我们使用 Cookies 提升您的体验',
    cookieDesc: '本网站使用 Cookies 来保存您的装机方案和语言偏好设置。',
    cookieAccept: '全部接受',
    cookieDecline: '拒绝',
    compatibleOk: '所有硬件完全兼容，未检测到任何冲突或瓶颈。',
    advisorBtn: '智能配置分析与建议',
    advisorTitle: '整机性能与协同分析报告',
    advisorSubtitle: '深入分析各硬件搭配均衡度、功耗表现与真实使用建议。',
    balanceScore: '整机均衡度评分',
    recommendationLabel: '逐项配件点评与建议',
    close: '关闭',
    readyToOrder: '导出配置单 / 打印',
    // Categories
    cpu: '中央处理器 (CPU)',
    motherboard: '主板 (Motherboard)',
    gpu: '独立显卡 (GPU)',
    ram: '内存 (RAM)',
    storage: '固态硬盘 (Storage)',
    psu: '电脑电源 (PSU)',
    case: '机箱 (Case)',
    cooler: '散热器 (Cooler)',
  }
};

const SettingsContext = createContext<SettingsContextType | null>(null);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('th');
  const [theme, setTheme] = useState<Theme>('light');
  const [fontSize, setFontSize] = useState<FontSize>('base');

  useEffect(() => {
    // โหลดค่า Theme เดิมที่บันทึกไว้
    const savedTheme = localStorage.getItem('nextspec_theme') as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    setTheme(prev => {
      const nextTheme = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('nextspec_theme', nextTheme);
      if (nextTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return nextTheme;
    });
  };

  const t = (key: string) => translations[language][key] || key;

  return (
    <SettingsContext.Provider value={{ language, setLanguage, theme, toggleTheme, fontSize, setFontSize, t }}>
      <div className={`${fontSize === 'sm' ? 'text-sm' : fontSize === 'lg' ? 'text-lg' : 'text-base'} min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200`}>
        {children}
      </div>
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings must be used within SettingsProvider');
  return context;
};