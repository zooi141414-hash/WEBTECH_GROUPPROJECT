'use client';

import React, { useState, useEffect } from 'react';
import { useSettings } from '@/context/SettingsContext';
import { ShieldCheck } from 'lucide-react';

export const CookieConsent: React.FC = () => {
  const { t } = useSettings();
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const isAccepted = localStorage.getItem('nextspec_cookie_accepted');
    if (!isAccepted) {
      setShowConsent(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('nextspec_cookie_accepted', 'true');
    setShowConsent(false);
  };

  const handleDecline = () => {
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-2xl p-5 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
          <ShieldCheck className="w-5 h-5 shrink-0" />
        </div>
        <div>
          <h4 className="font-bold text-sm text-slate-900 dark:text-white">{t('cookieTitle')}</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
            {t('cookieDesc')}
          </p>
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleAccept}
              className="text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
            >
              {t('cookieAccept')}
            </button>
            <button
              onClick={handleDecline}
              className="text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-lg transition"
            >
              {t('cookieDecline')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};