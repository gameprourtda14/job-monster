import { ItemType, ShopItem, Mission } from './types';

// Helper to generate items easily
const createItem = (
  id: string,
  name: string,
  type: ItemType,
  baseCost: number,
  income: number,
  click: number,
  desc: string,
  unique: boolean = false,
  parentId?: string
): ShopItem => ({
  id,
  name,
  type,
  baseCost,
  incomePerSecond: income,
  clickBonus: click,
  description: desc,
  owned: 0,
  isUnique: unique,
  parentId: parentId
});

const ITEMS: ShopItem[] = [];

// ==========================================
// 1. ANA SEKTÖRLER (Licenses / Parent Businesses)
// ==========================================
ITEMS.push(createItem('sector_sports', 'Spor Kulübü', ItemType.SECTOR, 250, 0, 0, 'Takım kurmak için gerekli lisans.', true));
ITEMS.push(createItem('sector_auto', 'Oto Galeri', ItemType.SECTOR, 5000, 0, 0, 'Araç ticareti yetkisi.', true));
ITEMS.push(createItem('sector_realestate', 'Emlak Ofisi', ItemType.SECTOR, 25000, 0, 0, 'Mülk ve ada alım satımı.', true));
ITEMS.push(createItem('sector_tech', 'Teknoloji Holding', ItemType.SECTOR, 500000, 0, 0, 'İleri teknoloji yatırımları.', true));
ITEMS.push(createItem('sector_collection', 'Müzayede Salonu', ItemType.SECTOR, 2000000, 0, 0, 'Nadir eserler için erişim.', true));


// ==========================================
// 2. SPOR YATIRIMLARI (Requires sector_sports)
// ==========================================
const sportsData = [
  { n: "Mahalle Halı Sahası", c: 100, i: 5, d: "Gençler top koştursun." },
  { n: "Okçuluk Şubesi", c: 400, i: 15, d: "Hedefi 12'den vur." },
  { n: "Voleybol Takımı", c: 1200, i: 40, d: "Filenin sultanları." },
  { n: "Basketbol Takımı", c: 3500, i: 100, d: "Potanın perileri." },
  { n: "E-Spor Takımı", c: 8000, i: 250, d: "Dijital arenada zafer." },
  { n: "Futbol Kulübü", c: 20000, i: 600, d: "Taraftarların sevgilisi." },
  { n: "Formula 1 Takımı", c: 150000, i: 3000, d: "Hız tutkunları için." }
];
sportsData.forEach((b, i) => {
  ITEMS.push(createItem(`sport_${i}`, b.n, ItemType.SPORT, b.c, b.i, 0, b.d, false, 'sector_sports'));
});


// ==========================================
// 3. ARABALAR (Requires sector_auto)
// ==========================================
// Sadece bir kısmını ekleyelim, liste çok uzundu, en ikonikleri seçelim.
const galleryCars = [
  { n: "Tofaş Şahin", c: 10000, i: 50, d: "Kuş serisi efsanesi." },
  { n: "Fiat Egea", c: 25000, i: 120, d: "Ezber bozan sedan." },
  { n: "Renault Megane", c: 40000, i: 200, d: "Şık ve konforlu." },
  { n: "Honda Civic", c: 60000, i: 300, d: "Japon mühendisliği." },
  { n: "BMW 320i", c: 150000, i: 750, d: "Alman tankı." },
  { n: "Mercedes C200", c: 200000, i: 1000, d: "Yıldızın parlasın." },
  { n: "Porsche 911", c: 500000, i: 2500, d: "Klasik spor." },
  { n: "Lamborghini Aventador", c: 1200000, i: 6000, d: "İtalyan boğası." },
  { n: "Bugatti Chiron", c: 5000000, i: 25000, d: "Hız rekoru." }
];
galleryCars.forEach((c, i) => {
  ITEMS.push(createItem(`car_gal_${i}`, c.n, ItemType.CAR, c.c, c.i, 0, c.d, false, 'sector_auto'));
});


// ==========================================
// 4. EMLAK (Requires sector_realestate)
// ==========================================
const estateData = [
  { n: "Öğrenci Evi", c: 30000, i: 150, d: "Kira getirisi düşük ama garanti." },
  { n: "Daire", c: 75000, i: 350, d: "Şehir merkezinde." },
  { n: "Villa", c: 250000, i: 1200, d: "Havuzlu lüks yaşam." },
  { n: "Plaza Katı", c: 1000000, i: 5000, d: "Ofis kiraları." },
  { n: "5 Yıldızlı Otel", c: 5000000, i: 25000, d: "Turizm cenneti." },
  // Adalar buraya dahil
  { n: "Issız Ada", c: 150000000, i: 50000, d: "Kafa dinlemek için." },
  { n: "Tatil Adası", c: 500000000, i: 150000, d: "Turist akını." },
  { n: "Volkanik Ada", c: 2000000000, i: 500000, d: "Jeotermal enerji." }
];
estateData.forEach((e, i) => {
  const type = e.n.includes('Ada') ? ItemType.ISLAND : ItemType.HOUSE;
  ITEMS.push(createItem(`estate_${i}`, e.n, type, e.c, e.i, 0, e.d, e.n.includes('Ada'), 'sector_realestate'));
});


// ==========================================
// 5. TEKNOLOJİ (Requires sector_tech)
// ==========================================
const techData = [
  { n: "Yazılım Ofisi", c: 600000, i: 3000, d: "Mobil uygulama geliştirme." },
  { n: "Server Çiftliği", c: 2000000, i: 10000, d: "Veri merkezi." },
  { n: "Yapay Zeka Lab", c: 10000000, i: 50000, d: "Geleceği kodla." },
  { n: "Kripto Borsası", c: 50000000, i: 250000, d: "Blokzincir teknolojisi." },
  { n: "Uzay Üssü", c: 500000000, i: 2500000, d: "Mars'a yolculuk." },
  { n: "Dyson Küresi", c: 100000000000, i: 100000000, d: "Güneş enerjisi." }
];
techData.forEach((t, i) => {
  ITEMS.push(createItem(`tech_${i}`, t.n, ItemType.BUSINESS, t.c, t.i, 0, t.d, false, 'sector_tech'));
});


// ==========================================
// 6. KOLEKSİYON (Requires sector_collection)
// ==========================================
const artifacts = [
  "Mona Lisa", "T-Rex İskeleti", "Umut Elması", "Tutankamon'un Maskesi", "Rosetta Taşı"
];
artifacts.forEach((name, i) => {
  ITEMS.push(createItem(`col_unique_${i}`, name, ItemType.COLLECTIBLE, 10000000 * (i + 1), 50000 * (i + 1), 0, "Eşsiz parça.", true, 'sector_collection'));
});

export const INITIAL_ITEMS = ITEMS;

// --- GÖREVLER (Güncellendi) ---
export const MISSIONS: Mission[] = [
  { level: 1, description: "İlk Sektörünü Kur (Spor Kulübü Önerilir)", reward: 500, type: 'OWNED_TOTAL', target: 1, isClaimed: false },
  { level: 2, description: "Halı Saha Satın Al", reward: 1000, type: 'MONEY', target: 1000, isClaimed: false }, // Money target dummy, logic checks specific items usually
  { level: 3, description: "Oto Galeri Lisansı Al", reward: 5000, type: 'MONEY', target: 5000, isClaimed: false },
  { level: 4, description: "3 Farklı Araba Modeli Stokla", reward: 10000, type: 'OWNED_TOTAL', target: 5, isClaimed: false },
  { level: 5, description: "Saniyede $1.000 Gelire Ulaş", reward: 20000, type: 'CLICK_POWER', target: 1000, isClaimed: false }, 
  { level: 6, description: "Emlak Sektörüne Gir", reward: 50000, type: 'OWNED_TOTAL', target: 10, isClaimed: false },
  { level: 7, description: "Servetini $1.000.000 yap", reward: 250000, type: 'MONEY', target: 1000000, isClaimed: false },
  { level: 8, description: "Teknoloji Devi Ol", reward: 1000000, type: 'OWNED_TOTAL', target: 20, isClaimed: false },
  { level: 10, description: "Milyarder Kulübü ($1 Mr)", reward: 100000000, type: 'MONEY', target: 1000000000, isClaimed: false },
];

export const BILLIONAIRES = [
  { rank: 1, name: "Elon Musk", worth: 251000000000 },
  { rank: 2, name: "Jeff Bezos", worth: 161000000000 },
  { rank: 3, name: "Bernard Arnault", worth: 150000000000 },
  { rank: 4, name: "Larry Ellison", worth: 135000000000 },
  { rank: 5, name: "Mark Zuckerberg", worth: 125000000000 },
];