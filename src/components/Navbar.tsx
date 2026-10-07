'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSettings, Language } from '@/context/SettingsContext';
import { Sun, Moon, Monitor, ChevronDown, Check, LogIn, LogOut } from 'lucide-react';
import { signIn, signOut, useSession } from 'next-auth/react';

interface LanguageOption {
  code: Language;
  label: string;
  flagUrl: string;
  alt: string;
}

const LANGUAGE_OPTIONS: LanguageOption[] = [
  {
    code: 'th',
    label: 'ไทย (TH)',
    flagUrl: 'https://flagcdn.com/w40/th.png',
    alt: 'ธงชาติไทย',
  },
  {
    code: 'en',
    label: 'English (EN)',
    flagUrl: 'https://flagcdn.com/w40/us.png',
    alt: 'ธงชาติสหรัฐอเมริกา',
  },
  {
    code: 'zh',
    label: '中文 (ZH)',
    flagUrl: 'https://flagcdn.com/w40/cn.png',
    alt: 'ธงชาติจีน',
  },
];

export const Navbar: React.FC = () => {
  const { language, setLanguage, theme, toggleTheme, fontSize, setFontSize, t } = useSettings();
  const pathname = usePathname();
  const { data: session } = useSession();
  
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLang = LANGUAGE_OPTIONS.find((item) => item.code === language) || LANGUAGE_OPTIONS[0];

  return (
    <header className="no-print sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* LOGO */}
        <Link 
          href="/" 
          className="flex items-center gap-3 group select-none"
          title="หน้าหลัก NEXTSPEC"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-black text-white text-lg shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform">
            NS
          </div>
          <div>
            <span className="font-black text-xl tracking-tight text-slate-900 dark:text-white flex items-center">
              NEXT<span className="text-blue-600 dark:text-blue-400">SPEC</span>
              <span className="ml-2 text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-bold border border-blue-200 dark:border-blue-800">
                ENTERPRISE
              </span>
            </span>
          </div>
        </Link>

        {/* Navigation Tabs */}
        <div className="hidden md:flex items-center gap-6 text-sm font-semibold">
          <Link 
            href="/" 
            className={`transition ${pathname === '/' ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-600 dark:text-slate-400 hover:text-blue-600'}`}
          >
            {t('home')}
          </Link>
          <Link 
            href="/builder" 
            className={`transition flex items-center gap-1.5 ${pathname === '/builder' ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-600 dark:text-slate-400 hover:text-blue-600'}`}
          >
            <Monitor className="w-4 h-4" />
            {t('diyBuild')}
          </Link>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* ปรับขนาดฟอนต์ */}
          <div className="hidden sm:flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl p-1 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setFontSize('sm')}
              className={`px-2 py-0.5 rounded-lg text-xs font-bold transition cursor-pointer ${fontSize === 'sm' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
            >
              A-
            </button>
            <button
              onClick={() => setFontSize('base')}
              className={`px-2 py-0.5 rounded-lg text-xs font-bold transition cursor-pointer ${fontSize === 'base' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
            >
              A
            </button>
            <button
              onClick={() => setFontSize('lg')}
              className={`px-2 py-0.5 rounded-lg text-xs font-bold transition cursor-pointer ${fontSize === 'lg' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
            >
              A+
            </button>
          </div>

          {/* LANGUAGE SELECTOR */}
          <div className="relative" ref={langDropdownRef}>
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800 dark:hover:bg-slate-700/80 rounded-xl px-2.5 py-1.5 border border-slate-200 dark:border-slate-700 transition cursor-pointer shadow-sm active:scale-95"
              aria-label="เปลี่ยนภาษา"
            >
              <img
                src={currentLang.flagUrl}
                alt={currentLang.alt}
                className="w-5 h-3.5 object-cover rounded-sm shadow-xs border border-slate-300 dark:border-slate-600"
              />
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {currentLang.code.toUpperCase()}
              </span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden py-1 z-50 animate-in fade-in zoom-in-95 duration-150">
                {LANGUAGE_OPTIONS.map((item) => {
                  const isSelected = language === item.code;
                  return (
                    <button
                      key={item.code}
                      onClick={() => {
                        setLanguage(item.code);
                        setIsLangOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-bold text-left transition cursor-pointer ${
                        isSelected
                          ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/80'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <img
                          src={item.flagUrl}
                          alt={item.alt}
                          className="w-5 h-3.5 object-cover rounded-sm shadow-xs border border-slate-200 dark:border-slate-700"
                        />
                        <span>{item.label}</span>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 stroke-[3]" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* สลับ Dark / Light Theme */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer"
            title="สลับโหมด สว่าง / มืด"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
          </button>

          {/* AUTHENTICATION BUTTON / USER PROFILE */}
          {session ? (
            <div className="flex items-center gap-2 pl-1">
              {session.user?.image ? (
                <img
                  src={session.user.image}
                  alt={session.user.name || 'User'}
                  className="w-8 h-8 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shadow-sm"
                />
              ) : (
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
                  {session.user?.name?.charAt(0) || 'U'}
                </div>
              )}
              <span className="hidden lg:inline text-xs font-bold text-slate-700 dark:text-slate-200 max-w-[100px] truncate">
                {session.user?.name}
              </span>
              <button
                onClick={() => signOut()}
                className="p-2 rounded-xl bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-900/60 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 transition cursor-pointer"
                title="ออกจากระบบ"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => signIn('google')}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-2 rounded-xl shadow-md shadow-blue-500/20 transition cursor-pointer active:scale-95"
            >
              <LogIn className="w-4 h-4" />
              <span className="hidden sm:inline">เข้าสู่ระบบด้วย Google</span>
            </button>
          )}

        </div>

      </div>
    </header>
  );
};