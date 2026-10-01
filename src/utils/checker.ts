import { Part } from '../data/parts';

export interface Issue {
  type: 'error' | 'warning';
  title: string;
  message: string;
}

export function validateBuild(selected: Record<string, Part | null>): Issue[] {
  const issues: Issue[] = [];
  const { cpu, motherboard, gpu, ram, psu, case: pcCase } = selected;

  // 1. เช็ค Socket CPU vs Mainboard
  if (cpu && motherboard && cpu.socket !== motherboard.socket) {
    issues.push({
      type: 'error',
      title: 'Socket ไม่ตรงกัน',
      message: `${cpu.name} (${cpu.socket}) ไม่สามารถใส่บนเมนบอร์ด ${motherboard.name} (${motherboard.socket}) ได้`
    });
  }

  // 2. เช็ค RAM Type กับ Mainboard
  if (ram && motherboard && ram.ramType && motherboard.ramType && ram.ramType !== motherboard.ramType) {
    issues.push({
      type: 'error',
      title: 'ชนิดของ RAM ไม่ถูกต้อง',
      message: `เมนบอร์ดรองรับ ${motherboard.ramType} แต่คุณเลือกแรมแบบ ${ram.ramType}`
    });
  }

  // 3. เช็คความยาวการ์ดจอกับเคส
  if (gpu && pcCase && gpu.length && pcCase.maxGpuLength && gpu.length > pcCase.maxGpuLength) {
    issues.push({
      type: 'error',
      title: 'การ์ดจอยาวเกินขนาดเคส',
      message: `การ์ดจอยาว ${gpu.length}mm แต่เคสรองรับได้สูงสุดเพียง ${pcCase.maxGpuLength}mm`
    });
  }

  // 4. เช็ค PSU Wattage
  const totalTdp = Object.values(selected).reduce((sum, item) => sum + (item?.tdp || 0), 0);
  const recommendedWattage = Math.round(totalTdp * 1.35) + 50;

  if (psu && psu.wattage && psu.wattage < recommendedWattage) {
    issues.push({
      type: 'warning',
      title: 'กำลังไฟพาวเวอร์ซัพพลายอาจไม่เพียงพอ',
      message: `ระบบนี้ต้องการไฟอย่างน้อย ${recommendedWattage}W แต่ ${psu.name} จ่ายได้ ${psu.wattage}W`
    });
  }

  return issues;
}