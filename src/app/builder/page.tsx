'use client';

import React, { Suspense } from 'react';
import { Navbar } from '@/components/Navbar';
import { BuilderInterface } from '@/components/BuilderInterface';
import { Footer } from '@/components/Footer';

export default function BuilderPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 dark:bg-slate-950">
      <div>
        <Navbar />
        <main className="flex-1">
          {/* ครอบด้วย Suspense ป้องกัน build error จาก useSearchParams() */}
          <Suspense fallback={
            <div className="py-20 text-center text-sm font-bold text-slate-400 animate-pulse">
              กำลังโหลดระบบจำลองสเปกคอมพิวเตอร์...
            </div>
          }>
            <BuilderInterface />
          </Suspense>
        </main>
      </div>
      <Footer />
    </div>
  );
}