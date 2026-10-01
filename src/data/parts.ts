export interface Part {
  id: string;
  name: string;
  category: 'cpu' | 'motherboard' | 'gpu' | 'ram' | 'storage' | 'psu' | 'case' | 'cooler';
  brand: string;
  series?: string;
  price: number;
  tdp: number;
  image: string;
  isPopular?: boolean;
  specs: { label: string; value: string }[];
  advice: {
    th: string;
    en: string;
    zh: string;
  };
  socket?: 'AM4' | 'AM5' | 'LGA1700';
  ramType?: 'DDR4' | 'DDR5';
  formFactor?: 'ATX' | 'Micro-ATX';
  length?: number;
  maxGpuLength?: number;
  wattage?: number;
}

export const PARTS_DATABASE: Part[] = [
  // ==========================================
  // 1. CPU (PROCESSORS) - ครบทั้ง INTEL & AMD
  // ==========================================
  {
    id: 'cpu-intel-1',
    name: 'Intel Core i3-12100F 3.3GHz 4C/8T (LGA1700)',
    brand: 'Intel',
    series: 'Core i3 12th Gen',
    category: 'cpu',
    price: 2990,
    tdp: 58,
    socket: 'LGA1700',
    isPopular: false,
    image: 'https://media-cdn.bnn.in.th/164998/intel-core-i3-12100f-1.jpg',
    specs: [
      { label: 'Cores / Threads', value: '4 Cores / 8 Threads' },
      { label: 'Clock Speed', value: '3.3 GHz (Boost 4.3 GHz)' },
      { label: 'Socket', value: 'LGA1700' },
      { label: 'TDP', value: '58W' }
    ],
    advice: {
      th: 'ซีพียูคอร์เดี่ยวแรง เล่นเกมออนไลน์พวก VALORANT, Roblox, CS2 ได้ลื่นไหลในงบประหยัด',
      en: 'High single-core IPC for Esports titles like CS2, VALORANT, and daily tasks.',
      zh: '高性价比入门单核利器，轻快畅玩主流电竞网游及日常办公。'
    }
  },
  {
    id: 'cpu-intel-2',
    name: 'Intel Core i5-12400F 2.5GHz 6C/12T (LGA1700)',
    brand: 'Intel',
    series: 'Core i5 12th Gen',
    category: 'cpu',
    price: 4390,
    tdp: 65,
    socket: 'LGA1700',
    isPopular: true,
    image: 'https://www.jib.co.th/img_master/product/original/2022010509312850624_2.jpg',
    specs: [
      { label: 'Cores / Threads', value: '6 Cores / 12 Threads' },
      { label: 'Clock Speed', value: '2.5 GHz (Boost 4.4 GHz)' },
      { label: 'Socket', value: 'LGA1700' },
      { label: 'Memory', value: 'DDR4 & DDR5' }
    ],
    advice: {
      th: 'รุ่นยอดนิยมตลอดกาลของ Intel คอร์แท้ 6C/12T ไม่มีปัญหาความร้อน เข้ากับบอร์ด H610/B760 ได้ทุกรุ่น',
      en: 'All-time best-selling Intel 6-core chip with low temperatures and high reliability.',
      zh: '常年热销千元甜品U，全大核6C/12T设计，温控优秀兼容性极佳。'
    }
  },
  {
    id: 'cpu-intel-3',
    name: 'Intel Core i5-14400F 2.5GHz 10C/16T (LGA1700)',
    brand: 'Intel',
    series: 'Core i5 14th Gen',
    category: 'cpu',
    price: 7290,
    tdp: 65,
    socket: 'LGA1700',
    isPopular: true,
    image: 'https://www.jib.co.th/img_master/product/original/20230111142106_57299_66_1.jpg',
    specs: [
      { label: 'Cores / Threads', value: '10 Cores (6P + 4E) / 16T' },
      { label: 'Max Turbo', value: '4.7 GHz' },
      { label: 'Socket', value: 'LGA1700' },
      { label: 'Architecture', value: 'Raptor Lake Refresh' }
    ],
    advice: {
      th: 'มี 4 คอร์เล็กช่วยรันงานพื้นหลัง เช่น สตรีมเกมหรือเปิดหลายจอ เหมาะกับการเล่นเกมพร้อมทำงาน',
      en: 'Hybrid 10 cores handle modern AAA games and background apps smoothly.',
      zh: '新14代酷睿10核16线程，大核高频打游戏，小核稳健跑后台任务。'
    }
  },
  {
    id: 'cpu-intel-4',
    name: 'Intel Core i7-14700KF 3.4GHz 20C/28T (LGA1700)',
    brand: 'Intel',
    series: 'Core i7 14th Gen',
    category: 'cpu',
    price: 15400,
    tdp: 125,
    socket: 'LGA1700',
    isPopular: false,
    image: 'https://ihcupload-bkk.s3.ap-southeast-7.amazonaws.com/img/product/product735_800.jpg',
    specs: [
      { label: 'Cores / Threads', value: '20 Cores (8P + 12E) / 28T' },
      { label: 'Max Turbo', value: '5.6 GHz' },
      { label: 'Socket', value: 'LGA1700' },
      { label: 'Overclock', value: 'Unlocked (K-Series)' }
    ],
    advice: {
      th: 'ตัวท็อป 20 คอร์ สำหรับงานตัดต่อวิดีโอ 4K เรนเดอร์ 3D และเล่นเกมภาพสมจริงขั้นสุด แนะนำคู่กับชุดน้ำ 360mm',
      en: 'Heavyweight 20-core processor for 4K video editing, 3D workloads, and extreme gaming.',
      zh: '20核28线程高性能猛兽，专为4K重度剪辑渲染及顶级游戏玩家打造。'
    }
  },
  {
    id: 'cpu-amd-1',
    name: 'AMD Ryzen 5 5500 3.6GHz 6C/12T (AM4)',
    brand: 'AMD',
    series: 'Ryzen 5000',
    category: 'cpu',
    price: 3190,
    tdp: 65,
    socket: 'AM4',
    isPopular: true,
    image: 'https://ihcupload-bkk.s3.ap-southeast-7.amazonaws.com/img/product/product736_800.jpg',
    specs: [
      { label: 'Cores / Threads', value: '6 Cores / 12 Threads' },
      { label: 'Clock Speed', value: '3.6 GHz (Boost 4.2 GHz)' },
      { label: 'Socket', value: 'Socket AM4' },
      { label: 'TDP / Memory', value: '65W / DDR4' }
    ],
    advice: {
      th: 'คุ้มค่าที่สุดในงบประหยัด จับคู่กับ RAM DDR4 ช่วยประหยัดงบไปลงการ์ดจอได้เยอะ',
      en: 'Best budget 6-core chip. Pairs with DDR4 to maximize budget for GPU.',
      zh: '高性价比入门6核，搭配DDR4可腾出更多预算给显卡。'
    }
  },
  {
    id: 'cpu-amd-2',
    name: 'AMD Ryzen 5 7600 3.8GHz 6C/12T (AM5)',
    brand: 'AMD',
    series: 'Ryzen 7000',
    category: 'cpu',
    price: 7490,
    tdp: 65,
    socket: 'AM5',
    isPopular: true,
    image: 'https://www.jib.co.th/img_master/product/original/2023011114211557299_1.jpg',
    specs: [
      { label: 'Cores / Threads', value: '6 Cores / 12 Threads' },
      { label: 'Clock Speed', value: '3.8 GHz (Boost 5.1 GHz)' },
      { label: 'Socket', value: 'Socket AM5' },
      { label: 'TDP / Memory', value: '65W / DDR5 Only' }
    ],
    advice: {
      th: 'ซีพียูมาตรฐานยุคใหม่ Socket AM5 อัปเกรดต่อได้ยาวๆ สถาปัตยกรรม Zen 4 เล่นเกมแรงลื่น',
      en: 'Standard next-gen Zen 4 CPU on AM5 platform. Future-proof with fast IPC.',
      zh: '新一代AM5平台主流Zen 4架构，单核IPC高，后期升级空间巨大。'
    }
  },
  {
    id: 'cpu-amd-3',
    name: 'AMD Ryzen 7 7800X3D 4.2GHz 8C/16T (AM5)',
    brand: 'AMD',
    series: 'Ryzen 7000',
    category: 'cpu',
    price: 16900,
    tdp: 120,
    socket: 'AM5',
    isPopular: true,
    image: 'https://ihcupload-bkk.s3.ap-southeast-7.amazonaws.com/img/product/product16310_800.jpg',
    specs: [
      { label: 'Cores / Threads', value: '8 Cores / 16 Threads' },
      { label: 'L3 Cache', value: '96MB 3D V-Cache' },
      { label: 'Socket', value: 'Socket AM5' },
      { label: 'Tier', value: 'Ultimate Gaming King' }
    ],
    advice: {
      th: 'ราชาแห่งการเล่นเกมด้วย 3D V-Cache ขนาด 96MB ขับเฟรมเรตได้สูงที่สุดในตลาด',
      en: 'The undisputed gaming champion with 96MB 3D V-Cache pushing maximum FPS.',
      zh: '96MB超大三级缓存游戏神U，大幅降低帧延迟，电竞玩家终极选择。'
    }
  },

  // ==========================================
  // 2. MOTHERBOARD - ครบทั้ง LGA1700, AM4, AM5
  // ==========================================
  {
    id: 'mb-intel-1',
    name: 'MSI PRO H610M-E DDR4 (LGA1700)',
    brand: 'MSI',
    category: 'motherboard',
    price: 1990,
    tdp: 15,
    socket: 'LGA1700',
    ramType: 'DDR4',
    formFactor: 'Micro-ATX',
    isPopular: true,
    image: 'https://www.jib.co.th/img_master/product/original/2022092817083755454_1.jpg',
    specs: [
      { label: 'Socket', value: 'LGA1700 (Intel 12/13/14 Gen)' },
      { label: 'Form Factor', value: 'Micro-ATX' },
      { label: 'Memory', value: '2x DDR4 Slots' }
    ],
    advice: {
      th: 'คู่แท้ของ Intel Core i3-12100F และ i5-12400F ช่วยคุมงบไม่บานปลาย เสถียรสูง',
      en: 'Reliable entry-level Intel LGA1700 board with full DDR4 budget compatibility.',
      zh: 'Intel入门装机高频选择，搭配12/13代酷睿有效降低装机门槛。'
    }
  },
  {
    id: 'mb-intel-2',
    name: 'ASUS PRIME B760M-A WIFI (DDR5)',
    brand: 'ASUS',
    category: 'motherboard',
    price: 4890,
    tdp: 20,
    socket: 'LGA1700',
    ramType: 'DDR5',
    formFactor: 'Micro-ATX',
    isPopular: true,
    image: 'https://img.advice.co.th/images_nas/pic_product4/A0151106/A0151106OK_BIG_1.jpg',
    specs: [
      { label: 'Socket', value: 'LGA1700 (Intel 12/13/14 Gen)' },
      { label: 'Form Factor', value: 'Micro-ATX' },
      { label: 'Features', value: 'Wi-Fi 6 + DDR5 7200+(OC)' }
    ],
    advice: {
      th: 'รองรับแรม DDR5 ความเร็วสูง มีชิป Wi-Fi 6 ในตัว ภาคจ่ายไฟทนทานสำหรับ i5-14400F และ i7',
      en: 'Solid DDR5 board with built-in Wi-Fi 6 tailored for modern 13th & 14th Gen Intel CPUs.',
      zh: '板载Wi-Fi 6与DDR5高频插槽，供电用料扎实，支持Intel新一代主流处理器。'
    }
  },
  {
    id: 'mb-amd-1',
    name: 'GIGABYTE A520M K V2 (DDR4)',
    brand: 'GIGABYTE',
    category: 'motherboard',
    price: 1790,
    tdp: 15,
    socket: 'AM4',
    ramType: 'DDR4',
    formFactor: 'Micro-ATX',
    isPopular: true,
    image: 'https://img.advice.co.th/images_nas/pic_product4/A0156361/A0156361OK_BIG_1.jpg',
    specs: [
      { label: 'Socket', value: 'Socket AM4' },
      { label: 'Form Factor', value: 'Micro-ATX' },
      { label: 'Memory', value: '2x DDR4 Slots' }
    ],
    advice: {
      th: 'บอร์ดพื้นฐานราคาประหยัด สำหรับจับคู่กับ Ryzen 5 5500 โดยเฉพาะ ใช้งานทนทาน',
      en: 'Ultra-budget AM4 foundation tailored for non-overclocked Ryzen 5000 builds.',
      zh: '极简实用AM4入门主板，搭配锐龙5 5500极具性价比。'
    }
  },
  {
    id: 'mb-amd-2',
    name: 'ASUS PRIME B650M-A WIFI II (DDR5)',
    brand: 'ASUS',
    category: 'motherboard',
    price: 4990,
    tdp: 25,
    socket: 'AM5',
    ramType: 'DDR5',
    formFactor: 'Micro-ATX',
    isPopular: true,
    image: 'https://www.jib.co.th/img_master/product/original/2024122715304873234_1.jpg',
    specs: [
      { label: 'Socket', value: 'Socket AM5' },
      { label: 'Form Factor', value: 'Micro-ATX' },
      { label: 'Network', value: 'Wi-Fi 6 + 2.5GbE LAN' }
    ],
    advice: {
      th: 'บอร์ด AM5 ยอดนิยม ภาคจ่ายไฟนิ่ง รองรับแรม DDR5 บัสสูง เข้าคู่กับ Ryzen 5 7600 / 7800X3D',
      en: 'Solid VRM with onboard Wi-Fi 6 and DDR5 support, matching Ryzen 7000 CPUs.',
      zh: '板载Wi-Fi 6与DDR5插槽，供电用料扎实，完美适配AM5锐龙芯片。'
    }
  },

  // ==========================================
  // 3. GPU (GRAPHICS CARDS)
  // ==========================================
  {
    id: 'gpu-1',
    name: 'ASUS Dual GeForce RTX 4060 EVO OC 8GB',
    brand: 'ASUS',
    category: 'gpu',
    price: 11400,
    tdp: 115,
    length: 227,
    isPopular: true,
    image: 'https://www.jib.co.th/img_master/product/original/2024032313353466344_1.jpg',
    specs: [
      { label: 'Memory', value: '8GB GDDR6' },
      { label: 'Length', value: '227 mm' },
      { label: 'Feature', value: 'DLSS 3.5 & Frame Gen' }
    ],
    advice: {
      th: 'เล่นเกม 1080p ปรับภาพสุดลื่นทุกเกม กินไฟต่ำเพียง 115W การ์ดไม่ยาวใส่เคสเล็กได้ง่าย',
      en: 'Supreme 1080p gaming with DLSS 3 Frame Generation and ultra-efficient 115W TDP.',
      zh: '1080P特效全开利器，支持DLSS 3补帧黑科技，仅115W超低功耗。'
    }
  },
  {
    id: 'gpu-2',
    name: 'GIGABYTE GeForce RTX 4070 SUPER WINDFORCE 12GB',
    brand: 'GIGABYTE',
    category: 'gpu',
    price: 24500,
    tdp: 220,
    length: 261,
    isPopular: true,
    image: 'https://www.jib.co.th/img_master/product/original/2023041813104258918_1.jpg',
    specs: [
      { label: 'Memory', value: '12GB GDDR6X' },
      { label: 'Length', value: '261 mm' },
      { label: 'Target', value: '2K 144Hz & Ray Tracing' }
    ],
    advice: {
      th: 'ตัวจบสายจอ 2K (1440p) เฟรมเรตทะลุ 100+ ทุกเกมระดับ AAA ทำงาน 3D / AI ตัดต่อไวมาก',
      en: 'The sweet spot for 1440p high-refresh gaming and content creation.',
      zh: '2K高刷游戏甜品级首选，12GB高速显存，光追与AI生产力表现全面。'
    }
  },
  {
    id: 'gpu-3',
    name: 'Sapphire Pulse AMD Radeon RX 7700 XT 12GB',
    brand: 'SAPPHIRE',
    category: 'gpu',
    price: 16900,
    tdp: 245,
    length: 280,
    isPopular: false,
    image: 'https://www.jib.co.th/img_master/product/original/2025013013522874052_1.jpg',
    specs: [
      { label: 'Memory', value: '12GB GDDR6 192-bit' },
      { label: 'Length', value: '280 mm' },
      { label: 'Feature', value: 'AMD FSR 3.0 & HYPR-RX' }
    ],
    advice: {
      th: 'ความแรงดิบสูงมาก คุ้มราคาต่อเฟรม ให้ VRAM ถึง 12GB เล่นเกมภาพสวยไม่กระตุก',
      en: 'Supreme raw rasterization per dollar with massive 12GB VRAM.',
      zh: '纯栅格性能性价比极高，12GB大显存畅玩各大主流高画质3A单机。'
    }
  },

  // ==========================================
  // 4. RAM (MEMORY)
  // ==========================================
  {
    id: 'ram-1',
    name: 'Kingston FURY Beast 16GB (8GBx2) DDR4 3200MHz',
    brand: 'KINGSTON',
    category: 'ram',
    price: 1450,
    tdp: 5,
    ramType: 'DDR4',
    isPopular: true,
    image: 'https://ihcupload-bkk.s3.ap-southeast-7.amazonaws.com/img/product/products155319_800.jpg',
    specs: [
      { label: 'Capacity', value: '16GB (2 x 8GB)' },
      { label: 'Type / Speed', value: 'DDR4 3200 MT/s' }
    ],
    advice: {
      th: 'ชุดแรม 16GB Dual-Channel มาตรฐานที่เปิดบัส XMP ง่ายและเสถียรที่สุดบนบอร์ด DDR4',
      en: 'Standard dual-channel DDR4 kit with plug-and-play XMP profiles.',
      zh: '主流高性价比双通道16GB套装，XMP一键开启性能平稳。'
    }
  },
  {
    id: 'ram-2',
    name: 'Corsair Vengeance RGB 32GB (16GBx2) DDR5 6000MHz',
    brand: 'CORSAIR',
    category: 'ram',
    price: 4390,
    tdp: 10,
    ramType: 'DDR5',
    isPopular: true,
    image: 'https://www.jib.co.th/img_master/product/original/2023112114200563717_1.jpg',
    specs: [
      { label: 'Capacity', value: '32GB (2 x 16GB)' },
      { label: 'Speed', value: 'DDR5 6000 MT/s' },
      { label: 'Profile', value: 'AMD EXPO & Intel XMP 3.0' }
    ],
    advice: {
      th: 'บัส 6000MHz CL30 คือจุดสมดุลที่ดีที่สุดสำหรับ Ryzen 7000 และ Intel Gen 14 ไฟ RGB สวยหรู',
      en: 'Sweet spot 6000MHz with vibrant ten-zone RGB lighting for modern builds.',
      zh: '6000MHz黄金频率搭配酷炫RGB灯带，新一代装机高分必备。'
    }
  },

  // ==========================================
  // 5. STORAGE (NVME M.2 SSD)
  // ==========================================
  {
    id: 'ssd-1',
    name: 'WD Blue SN580 1TB NVMe M.2 PCIe 4.0',
    brand: 'WESTERN DIGITAL',
    category: 'storage',
    price: 2490,
    tdp: 5,
    isPopular: true,
    image: 'https://www.jib.co.th/img_master/product/original/2023081411151161311_1.jpg',
    specs: [
      { label: 'Capacity', value: '1 TB' },
      { label: 'Read Speed', value: 'Up to 4,150 MB/s' },
      { label: 'Interface', value: 'PCIe Gen4 x4 NVMe' }
    ],
    advice: {
      th: 'ความจุ 1TB ลง Windows และเกมใหญ่ๆ ได้ 5-10 เกม เปิดโปรแกรมไว โหลดฉากเกมพริบตาเดียว',
      en: 'High-reliability 1TB PCIe 4.0 drive providing snappy responsiveness and fast boots.',
      zh: '高性价比1TB Gen4高速盘，秒速进系统并畅快加载各款主流游戏。'
    }
  },
  {
    id: 'ssd-2',
    name: 'Samsung 990 PRO 2TB PCIe 4.0 NVMe',
    brand: 'SAMSUNG',
    category: 'storage',
    price: 6790,
    tdp: 8,
    isPopular: true,
    image: 'https://www.jib.co.th/img_master/product/original/2023082416295161614_3.jpg',
    specs: [
      { label: 'Capacity', value: '2 TB' },
      { label: 'Read / Write', value: '7,450 / 6,900 MB/s' },
      { label: 'Speed Tier', value: 'PCIe 4.0 Extreme' }
    ],
    advice: {
      th: 'ระดับท็อปของ PCIe 4.0 อ่านเขียนไวทะลุ 7,450 MB/s เหมาะกับงานตัดต่อ 4K และย้ายไฟล์ยักษ์',
      en: 'Flagship sustained speed for intensive 4K editing and direct storage.',
      zh: '高达7450MB/s巅峰读写，专业剪辑与大容量仓库标杆。'
    }
  },

  // ==========================================
  // 6. POWER SUPPLY (PSU)
  // ==========================================
  {
    id: 'psu-1',
    name: 'MSI MAG A650BN 650W 80 PLUS Bronze',
    brand: 'MSI',
    category: 'psu',
    price: 1890,
    tdp: 0,
    wattage: 650,
    isPopular: true,
    image: 'https://ihcupload-bkk.s3.ap-southeast-7.amazonaws.com/img/product/products160329_800.jpg',
    specs: [
      { label: 'Wattage', value: '650 Watts' },
      { label: 'Certification', value: '80 PLUS Bronze' }
    ],
    advice: {
      th: 'กำลังไฟ 650W พอดีกับการ์ดจอระดับ RTX 4060 / RX 7600 จ่ายไฟเสถียร มีระบบป้องกันไฟกระชาก',
      en: 'Solid 650W budget unit with Bronze certification, ideal for RTX 4060 series.',
      zh: '铜牌认证650W实瓦电源，为RTX 4060等主流显卡提供充足纯净电流。'
    }
  },
  {
    id: 'psu-2',
    name: 'Corsair RM850e 850W 80 PLUS Gold ATX 3.0',
    brand: 'CORSAIR',
    category: 'psu',
    price: 4490,
    tdp: 0,
    wattage: 850,
    isPopular: true,
    image: 'https://ihcupload-bkk.s3.ap-southeast-7.amazonaws.com/img/product/products80523_800.jpg',
    specs: [
      { label: 'Wattage', value: '850 Watts' },
      { label: 'Standard', value: 'ATX 3.0 (PCIe 5.0 12VHPWR)' }
    ],
    advice: {
      th: 'มาตรฐาน ATX 3.0 มีสาย 12VHPWR สำหรับการ์ดจอ RTX ซีรีส์ 40 โดยเฉพาะ ถอดสายได้หมดจัดสายง่าย',
      en: 'Native ATX 3.0 12VHPWR support for high-end RTX 4070 Ti / 4080 with zero cable mess.',
      zh: '原生配备12VHPWR接口金牌全模组850W电源，轻松应对高阶显卡瞬时功耗。'
    }
  },

  // ==========================================
  // 7. CASE (PC CHASSIS)
  // ==========================================
  {
    id: 'case-1',
    name: 'Montech AIR 100 ARGB Black (Micro-ATX)',
    brand: 'MONTECH',
    category: 'case',
    price: 1590,
    tdp: 0,
    maxGpuLength: 330,
    formFactor: 'Micro-ATX',
    isPopular: true,
    image: 'https://www.jib.co.th/img_master/uploads/Content/3901306516/product_d_202106151436532.png',
    specs: [
      { label: 'Motherboard', value: 'Micro-ATX / Mini-ITX' },
      { label: 'Max GPU Length', value: '330 mm' },
      { label: 'Pre-installed', value: '4x ARGB Fans included' }
    ],
    advice: {
      th: 'เคสคุ้มราคาแถมพัดลมไฟ ARGB มาให้ถึง 4 ตัว ระบายความร้อนดีเยี่ยมด้วยหน้ากากตาข่าย Mesh',
      en: 'Incredible value with 4 pre-installed ARGB fans and high airflow front mesh.',
      zh: '标配4把ARGB神光同步风扇，全铁网前面板散热风道出众。'
    }
  },
  {
    id: 'case-2',
    name: 'NZXT H9 Flow Dual-Chamber White (ATX)',
    brand: 'NZXT',
    category: 'case',
    price: 5490,
    tdp: 0,
    maxGpuLength: 435,
    formFactor: 'ATX',
    isPopular: true,
    image: 'https://www.jib.co.th/img_master/product/original/2025080516023779177_1.jpg',
    specs: [
      { label: 'Motherboard', value: 'ATX / Micro-ATX' },
      { label: 'Max GPU Length', value: '435 mm (No Limit)' },
      { label: 'Design', value: 'Seamless Panoramic Glass' }
    ],
    advice: {
      th: 'เคสตู้ปลาไร้เสากลาง กระจก 2 ด้าน มองเห็นอุปกรณ์ทุกมุม ใส่การ์ดจอได้ยาวที่สุดโดยไม่ติดอะไร',
      en: 'Iconic pillarless panoramic dual-chamber showcase with unlimited GPU clearance.',
      zh: '无立柱海景房全景透光机箱，双舱独立风道，展示内部高阶硬件的艺术品。'
    }
  },

  // ==========================================
  // 8. COOLER (AIR & AIO LIQUID)
  // ==========================================
  {
    id: 'cooler-1',
    name: 'Thermalright Peerless Assassin 120 SE Air Cooler',
    brand: 'THERMALRIGHT',
    category: 'cooler',
    price: 1290,
    tdp: 0,
    isPopular: true,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7bj8YoSoGmeXMCZcfhT8we3a-zYQ8rHb91voggeyBNF3FRjYIbCT5fONK&s=10',
    specs: [
      { label: 'Type', value: 'Dual-Tower 6 Heatpipes' },
      { label: 'Fans', value: '2x 120mm PWM Fans' }
    ],
    advice: {
      th: 'พัดลมคู่ 6 ท่อทองแดง เย็นเทียบเท่าชุดน้ำ 240mm ทนทาน ดูแลง่าย ไม่มีปัญหาน้ำรั่วซึม',
      en: 'Legendary dual-tower air cooler matching 240mm liquid performance at a fraction of the cost.',
      zh: '双塔双风扇6热管风冷性价比传奇，压制发热效果匹敌水冷且终身无漏水之忧。'
    }
  },
  {
    id: 'cooler-2',
    name: 'DeepCool LT720 360mm ARGB Liquid Cooler',
    brand: 'DEEPCOOL',
    category: 'cooler',
    price: 3990,
    tdp: 0,
    isPopular: false,
    image: 'https://www.jib.co.th/img_master/product/original/2023080709035561229_1.jpg',
    specs: [
      { label: 'Radiator', value: '360 mm Aluminum' },
      { label: 'Pump', value: 'Multidimensional Infinity Mirror' }
    ],
    advice: {
      th: 'ชุดน้ำปิด 3 ตอน หม้อน้ำ 360mm พร้อมไฟหัวปั๊มกระจกเงาสะท้อน เอาอยู่ทุกซีพียูระดับท็อป',
      en: 'High-performance 360mm AIO with distinctive infinity-mirror pump block for heavy loads.',
      zh: '360高规格水冷排，多维无限镜冷头，压制高端高发热处理器游刃有余。'
    }
  }
];