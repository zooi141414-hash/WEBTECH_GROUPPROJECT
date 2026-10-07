'use client';

import React, { Suspense } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { Navbar } from '@/components/Navbar';
import { BuilderInterface } from '@/components/BuilderInterface';
import { Footer } from '@/components/Footer';

export default function BuilderPage() {
  const { status } = useSession();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 dark:bg-slate-950">
      <div>
        <Navbar />
        <main className="flex-1">
          {status === 'loading' ? (
            <div className="py-20 text-center text-sm font-bold text-slate-400 animate-pulse">
              กำลังตรวจสอบสถานะการเข้าสู่ระบบ...
            </div>
          ) : status === 'unauthenticated' ? (
            <section className="max-w-xl mx-auto px-4 py-24 text-center">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
                <h1 className="text-2xl font-black text-slate-900 dark:text-white">
                  กรุณาเข้าสู่ระบบก่อนใช้งาน
                </h1>
                <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                  เข้าสู่ระบบด้วย Google เพื่อใช้งานระบบจัดสเปกและเครื่องมือทั้งหมด
                </p>
                <button
                  onClick={() => signIn('google', { callbackUrl: `${window.location.pathname}${window.location.search}` })}
                  className="mt-6 inline-flex items-center justify-center rounded-xl bg-blue-600 hover:bg-blue-700 px-5 py-3 text-sm font-bold text-white transition cursor-pointer"
                >
                  เข้าสู่ระบบด้วย Google
                </button>
              </div>
            </section>
          ) : (
            <Suspense fallback={
              <div className="py-20 text-center text-sm font-bold text-slate-400 animate-pulse">
                กำลังโหลดระบบจำลองสเปกคอมพิวเตอร์...
              </div>
            }>
              <BuilderInterface />
            </Suspense>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}