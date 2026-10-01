import type { Metadata } from 'next';
import { Prompt } from 'next/font/google';
import './globals.css';
import { SettingsProvider } from '@/context/SettingsContext';

const prompt = Prompt({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['thai', 'latin'],
  display: 'swap',
  variable: '--font-prompt',
});

export const metadata: Metadata = {
  title: 'NEXTSPEC PRO - ระบบจัดสเปกคอมพิวเตอร์อัจฉริยะ',
  description: 'Smart PC Builder with Real-time Compatibility & Performance Simulator',
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body className={`${prompt.className} antialiased selection:bg-blue-600 selection:text-white`}>
        <SettingsProvider>
          {children}
        </SettingsProvider>
      </body>
    </html>
  );
}