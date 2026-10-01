# NEXTSPEC — Intelligent PC Rig Builder & Compatibility Checker System

เว็บแอปพลิเคชันจำลองการจัดสเปกคอมพิวเตอร์และตรวจสอบความเข้ากันได้ของฮาร์ดแวร์แบบ Real-time ขับเคลื่อนด้วยสถาปัตยกรรม Next.js App Router 

- **Live Demo (Vercel):** [https://your-project.vercel.app](https://your-project.vercel.app)
- **GitHub Repository:** [https://github.com/your-username/your-repo](https://github.com/your-username/your-repo)

---

## 👥 รายชื่อสมาชิกกลุ่มและหน้าที่ความรับผิดชอบ
1. **[นาย ธนโชติ รักชาติ]** (รหัสนักศึกษา: [6804101337]) — Project Lead & Next.js Architecture
2. **[นาย ธรรมรักษ์ เดชสง]** (รหัสนักศึกษา: [6804101403]) — Core Logic & Compatibility Engine Specialist
3. **[นาย ทินภัทร รักใหม่]** (รหัสนักศึกษา: [6804101331]) — State Management & Feature Integrator
4. **[นาย ศิวพงษ์ บุญมา]** (รหัสนักศึกษา: [6804101388]) — UI/UX, Quotation & Print Engine Developer
---

## 🚀 ฟีเจอร์หลักของระบบ (Key Features)
- **Real-time Compatibility Engine:** ตรวจสอบคู่ขนาน Socket (AM4, AM5, LGA1700), มาตรฐานแรม (DDR4 / DDR5) และความยาวการ์ดจอกับเคส
- **Dynamic TDP & PSU Load Balancer:** คำนวณการใช้พลังงานรวมเรียลไทม์ พร้อมหลอดเกจวัดเปอร์เซ็นต์โหลดเพื่อความปลอดภัย
- **Shareable Build via Query URL:** ระบบแชร์สเปกด้วย URL Query Params เปิดใช้งานได้ทันทีโดยไม่ต้องพึ่งพา Database ภายนอก
- **Smart Budget Presets:** ระบบจัดสเปกอัตโนมัติ 1 คลิกตามระดับงบประมาณ (15K, 30K, 50K+)
- **Side-by-Side Build Comparison:** โหมดเปรียบเทียบสเปกข้างกันระหว่าง Slot A และ Slot B ผ่าน `localStorage`
- **Official Print PDF Quotation:** เอกสารใบเสนอราคามาตรฐานทางการ ปรับแต่งด้วย CSS `@media print` ให้ออกมา 1 หน้า A4 คมชัด 100%
- **Enterprise UI/UX:** รองรับ Dark/Light Mode, ปรับขนาดฟอนต์ 3 ระดับ, สลับได้ 3 ภาษา (ไทย, อังกฤษ, จีน พร้อมรูปธงชาติ) และแจ้งเตือนด้วย SweetAlert2

---

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)
- **Framework:** Next.js (App Router, Client Components, Suspense)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Modern Glassmorphism & Print Optimization)
- **UI Components & Icons:** Lucide React, SweetAlert2
- **Deployment Platform:** Vercel

---

## 💻 วิธีการติดตั้งและรันในเครื่อง (Local Setup)

1. Clone repository:
   ```bash
   git clone [https://github.com/your-username/your-repo.git](https://github.com/your-username/your-repo.git)
   cd pc-builder