# NEXTSPEC — Intelligent PC Rig Builder & Compatibility Checker System

> เว็บแอปพลิเคชันจำลองการจัดสเปกคอมพิวเตอร์และตรวจสอบความเข้ากันได้ของฮาร์ดแวร์แบบ Real-time ขับเคลื่อนด้วยสถาปัตยกรรม Next.js App Router

- **Live Demo (Vercel):** [https://webtech-groupproject.vercel.app/](https://webtech-groupproject.vercel.app/)
- **GitHub Repository:** [https://github.com/zooi141414-hash/WEBTECH_GROUPPROJECT](https://github.com/zooi141414-hash/WEBTECH_GROUPPROJECT)

---

## 👥 รายชื่อสมาชิกกลุ่มและหน้าที่ความรับผิดชอบ (Group Members & Roles)

1. **นายธนโชติ รักชาติ** (รหัสนักศึกษา: 6804101337)
   * **บทบาท:** Project Lead & Next.js Architecture
   * **หน้าที่รับผิดชอบ:** วางโครงสร้างสถาปัตยกรรมระบบด้วย Next.js App Router แยก Routing หน้า Landing Page (`/`) และ Builder (`/builder`), ควบคุมระบบ Global Layout (`layout.tsx`), และดูแลการ Deploy บน Vercel

2. **นายธรรมรักษ์ เดชสง** (รหัสนักศึกษา: 6804101403)
   * **บทบาท:** Core Logic & Compatibility Engine Specialist
   * **หน้าที่รับผิดชอบ:** พัฒนาระบบตรวจสอบความเข้ากันได้ (`src/utils/checker.ts`), วางเงื่อนไขกฎการทำงาน (Socket Matching, RAM DDR4/DDR5, GPU Clearance), และคำนวณอัตรากินไฟรวม

3. **นายทินภัทร รักใหม่** (รหัสนักศึกษา: 6804101331)
   * **บทบาท:** State Management & Feature Integrator
   * **หน้าที่รับผิดชอบ:** พัฒนาระบบแชร์สเปกด้วย URL Query Parameters (`useSearchParams`), ระบบเปรียบเทียบสเปกข้างกันผ่าน `localStorage` (Compare Mode), และผสานระบบ Pop-up แจ้งเตือน SweetAlert2 Custom Theme

4. **นายศิวพงษ์ บุญมา** (รหัสนักศึกษา: 6804101388)
   * **บทบาท:** UI/UX, Quotation & Print Engine Developer
   * **หน้าที่รับผิดชอบ:** ออกแบบประสบการณ์ผู้ใช้ (UI/UX), พัฒนาระบบใบเสนอราคามาตรฐานทางการด้วย CSS `@media print` ให้ออกมาคมชัดขนาด 1 หน้า A4, และจัดทำเอกสารรายงาน

5. **นายวรัญญู กล้าวินิจฉัย** (รหัสนักศึกษา: 6804101379)
   * **บทบาท:** Presentation Slides & Poster Designer
   * **หน้าที่รับผิดชอบ:** ออกแบบและจัดทำสไลด์นำเสนอโครงงาน 15 นาที, ออกแบบโปสเตอร์ประชาสัมพันธ์โครงงาน, และร่วมทดสอบการใช้งานส่วนติดต่อผู้ใช้ (UI Testing)

---

## 🚀 ฟีเจอร์หลักของระบบ (Key Features)

- **Real-time Compatibility Engine:** ตรวจสอบคู่ขนาน Socket (AM4, AM5, LGA1700), มาตรฐานแรม (DDR4 / DDR5) และความยาวการ์ดจอกับเคสแบบทันทีทันใด
- **Dynamic TDP & PSU Load Balancer:** คำนวณการใช้พลังงานรวมเรียลไทม์ พร้อมหลอดเกจวัดเปอร์เซ็นต์โหลดเพื่อความปลอดภัยของ Power Supply
- **Shareable Build via Query URL:** ระบบแชร์สเปกด้วย URL Query Params เปิดใช้งานได้ทันทีโดยไม่ต้องพึ่งพา Database ภายนอก
- **Smart Budget Presets:** ระบบจัดสเปกอัตโนมัติ 1 คลิกตามระดับงบประมาณ (15K, 30K, 60K)
- **Side-by-Side Build Comparison:** โหมดเปรียบเทียบสเปกข้างกันระหว่าง Slot A และ Slot B ผ่าน `localStorage`
- **Official Print PDF Quotation:** เอกสารใบเสนอราคามาตรฐานทางการ ปรับแต่งด้วย CSS `@media print` ให้ออกมา 1 หน้า A4 คมชัด 100%
- **Google OAuth Login:** ต้องเข้าสู่ระบบด้วย Google ก่อนเข้าใช้งาน PC Builder และเครื่องมือจัดสเปกทั้งหมด
- **Enterprise UI/UX:** รองรับ Dark/Light Mode, ปรับขนาดฟอนต์ 3 ระดับ, สลับได้ 3 ภาษา (ไทย, อังกฤษ, จีน พร้อมรูปธงชาติ) และแจ้งเตือนด้วย SweetAlert2

---

## 🔐 การเข้าสู่ระบบ (Google OAuth)

- หน้าแรก (`/`) เปิดให้เข้าชมได้โดยไม่ต้องเข้าสู่ระบบ
- ต้องเข้าสู่ระบบด้วย Google ก่อนใช้งานหน้า Builder (`/builder`) และเครื่องมือจัดสเปกทั้งหมด
- ระบบใช้ NextAuth.js และไม่เก็บข้อมูลผู้ใช้ลงฐานข้อมูล

### ตั้งค่าสำหรับเครื่องพัฒนา

สร้างไฟล์ `.env.local` ที่ root ของโปรเจกต์ แล้วกำหนดค่าเหล่านี้:

```env
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXTAUTH_SECRET=your-random-secret
NEXTAUTH_URL=http://localhost:3000
```

สร้าง `NEXTAUTH_SECRET` ได้ด้วยคำสั่ง `openssl rand -base64 32` และอย่า commit `.env.local` หรือเปิดเผย `GOOGLE_CLIENT_SECRET` ในโค้ดฝั่ง client

### ตั้งค่า Google OAuth Client

ใน Google Auth Platform ให้คงค่าของ localhost และเพิ่ม production URL ดังนี้:

- Authorized JavaScript origin: `http://localhost:3000`
- Authorized JavaScript origin: `https://webtech-groupproject.vercel.app`
- Authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
- Authorized redirect URI: `https://webtech-groupproject.vercel.app/api/auth/callback/google`

### ตั้งค่าบน Vercel

เพิ่ม Environment Variables ใน Project Settings สำหรับ Production:

- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `NEXTAUTH_SECRET` (ใช้ secret แบบสุ่มที่ยาวและเก็บเป็นความลับ)
- `NEXTAUTH_URL=https://webtech-groupproject.vercel.app`

หลังบันทึก Environment Variables ให้ redeploy โปรเจกต์ หาก OAuth consent screen อยู่ในสถานะ Testing ให้เพิ่ม Google accounts ที่ต้องการทดสอบไว้ใน Test users

---
## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)

- **Framework:** Next.js 16 (App Router, Client Components, Suspense)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Modern Glassmorphism & Print Optimization)
- **UI Components & Icons:** Lucide React, SweetAlert2
- **Deployment Platform:** Vercel

---

## 📂 โครงสร้างโฟลเดอร์ของโปรเจกต์ (Project Structure)

```text
pc-builder/
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root Layout & Global Metadata
│   │   ├── providers.tsx        # NextAuth Session Provider
│   │   ├── api/auth/[...nextauth]/route.ts # Google OAuth callback
│   │   ├── globals.css          # Global CSS & Print Rules (@media print)
│   │   ├── page.tsx             # Route: / (Landing Page)
│   │   └── builder/
│   │       └── page.tsx         # Route: /builder (PC Builder Page)
│   ├── components/
│   │   ├── Navbar.tsx           # Header, Theme Switcher, Flag Dropdown
│   │   ├── Footer.tsx           # Credit & System Links
│   │   ├── BuilderInterface.tsx # Main Builder Component & Cart Drawer
│   │   ├── SpecAdvisorModal.tsx # Spec Analysis & A4 Quotation Print
│   │   └── ComparisonModal.tsx  # Side-by-Side Compare Modal (Slot A vs B)
│   ├── context/
│   │   └── SettingsContext.tsx  # Context API (Theme, Language, Font Size)
│   ├── data/
│   │   └── parts.ts             # Hardware Database & Specifications
│   └── utils/
│       ├── checker.ts           # Hardware Compatibility Validation Engine
│       └── swal.ts              # Themed SweetAlert2 Helper
├── public/                      # Static Assets & Icons
├── package.json
└── README.md