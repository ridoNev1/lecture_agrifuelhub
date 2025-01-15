import { addDays, format } from "date-fns";

export enum Status {
  WAITING_FOR_PICKUP = 1,
  READY_FOR_PRODUCTION = 2,
  MANUFACTURING_PROCESS = 7,
  READY_FOR_SELLING = 3,
  READY_FOR_BILLING = 6,
  DONE = 4,
}

export enum UkuranKarung {
  KECIL = "Kecil",
  SEDANG = "Sedang",
  BESAR = "Besar",
}

interface StatusBadgeItem {
  label: string;
  color: string;
}

const StatusBadge: Record<number, StatusBadgeItem> = {
  [Status.WAITING_FOR_PICKUP]: {
    label: "Waiting For Pickup",
    color: "bg-yellow-500 text-white",
  },
  [Status.READY_FOR_PRODUCTION]: {
    label: "Ready For Production",
    color: "bg-orange-500 text-white",
  },
  [Status.MANUFACTURING_PROCESS]: {
    label: "Manufacturing Process",
    color: "bg-purple-500 text-white",
  },
  [Status.READY_FOR_SELLING]: {
    label: "Ready For Selling",
    color: "bg-blue-500 text-white",
  },
  [Status.READY_FOR_BILLING]: {
    label: "Done",
    color: "bg-green-500 text-white",
  },
  [Status.DONE]: {
    label: "Done",
    color: "bg-green-500 text-white",
  },
};

export interface AgriculturalWaste {
  order_id: string;
  item: Item;
  jumlah_karung?: number;
  ukuran_karung: UkuranKarung;
  berat_per_karung_kg?: number;
  status: Status;
  alamat: string;
  tanggal_pengangkutan?: string;
  tanggal_manufacturing?: string;
  tanggal_penjualan?: string;
  userId: number;
  user_name: string;
  hargaJual?: number;
  margin?: number;
  pembayaranPetani?: number;
  hargaItem?: number;
  biayaPemrosesan?: number;
  biayaPengiriman?: number;
  biayaPenyimpanan?: number;
  jarakPengangkutan?: number;
  jarakPengiriman?: number;
  totalCost?: number;
  resultProduction?: string;
}

export enum Item {
  TONGKOL_JAGUNG = "Tongkol Jagung",
  SEKAM_PADI = "Sekam Padi",
  SERBUK_GERGAJI = "Serbuk Gergaji",
  JERAMI_PADI = "Jerami Padi",
  KULIT_KOPI = "Kulit Kopi",
  LIMBAH_TEBU = "Limbah Tebu",
  CANGKANG_KELAPA_SAWIT = "Cangkang Kelapa Sawit",
  BATANG_JAGUNG = "Batang Jagung",
  SABUT_KELAPA = "Sabut Kelapa",
}

const baseDate = new Date("2025-01-10");

export const formatDate = (date?: Date) => date && format(date, "dd MMMM yyyy");

const agriculturalWastes: AgriculturalWaste[] = [
  {
    user_name: "Petani Jamal",
    userId: 1,
    order_id: "ORD001",
    item: Item.TONGKOL_JAGUNG,
    jumlah_karung: 5,
    ukuran_karung: UkuranKarung.BESAR,
    berat_per_karung_kg: 50,
    status: Status.WAITING_FOR_PICKUP,
    alamat: "Desa Sukamaju, Kec. Cugenang, Kabupaten Cianjur, Jawa Barat 43291",
    tanggal_pengangkutan: formatDate(addDays(baseDate, 0)),
  },
  {
    user_name: "Petani Jamal",
    userId: 1,
    order_id: "ORD002",
    item: Item.SEKAM_PADI,
    jumlah_karung: 6,
    ukuran_karung: UkuranKarung.SEDANG,
    berat_per_karung_kg: 50,
    status: Status.WAITING_FOR_PICKUP,
    alamat:
      "Desa Bojong, Kec. Karangtengah, Kabupaten Cianjur, Jawa Barat 43292",
    tanggal_manufacturing: formatDate(addDays(baseDate, 1)),
  },
  {
    user_name: "Petani Jamal",
    userId: 1,
    order_id: "ORD003",
    item: Item.SERBUK_GERGAJI,
    jumlah_karung: 4,
    ukuran_karung: UkuranKarung.KECIL,
    berat_per_karung_kg: 45,
    status: Status.WAITING_FOR_PICKUP,
    alamat: "Desa Nagrak, Kec. Cianjur, Kabupaten Cianjur, Jawa Barat 43293",
    tanggal_penjualan: formatDate(addDays(baseDate, 2)),
  },
  {
    user_name: "Petani Jamal",
    userId: 1,
    order_id: "ORD004",
    item: Item.JERAMI_PADI,
    jumlah_karung: 5,
    ukuran_karung: UkuranKarung.SEDANG,
    berat_per_karung_kg: 55,
    status: Status.WAITING_FOR_PICKUP,
    alamat:
      "Desa Sindanglaya, Kec. Cipanas, Kabupaten Cianjur, Jawa Barat 43294",
    tanggal_penjualan: formatDate(addDays(baseDate, 3)),
  },
  {
    user_name: "Petani Jamal",
    userId: 1,
    order_id: "ORD005",
    item: Item.KULIT_KOPI,
    jumlah_karung: 4,
    ukuran_karung: UkuranKarung.KECIL,
    berat_per_karung_kg: 55,
    status: Status.WAITING_FOR_PICKUP,
    alamat: "Desa Cibodas, Kec. Pacet, Kabupaten Cianjur, Jawa Barat 43295",
    tanggal_pengangkutan: formatDate(addDays(baseDate, 4)),
  },
  {
    user_name: "Petani Jamal",
    userId: 1,
    order_id: "ORD006",
    item: Item.TONGKOL_JAGUNG,
    jumlah_karung: 4,
    ukuran_karung: UkuranKarung.SEDANG,
    berat_per_karung_kg: 47.5,
    status: Status.WAITING_FOR_PICKUP,
    alamat:
      "Desa Haurwangi, Kec. Haurwangi, Kabupaten Cianjur, Jawa Barat 43296",
    tanggal_manufacturing: formatDate(addDays(baseDate, 5)),
  },
  {
    user_name: "Petani Jamal",
    userId: 1,
    order_id: "ORD007",
    item: Item.LIMBAH_TEBU,
    jumlah_karung: 7,
    ukuran_karung: UkuranKarung.BESAR,
    berat_per_karung_kg: 45.7,
    status: Status.WAITING_FOR_PICKUP,
    alamat: "Desa Ciputri, Kec. Pacet, Kabupaten Cianjur, Jawa Barat 43297",
    tanggal_penjualan: formatDate(addDays(baseDate, 6)),
  },
];

export const getUkuranKarungOptions = () => {
  return Object.values(UkuranKarung).map((value) => ({
    label: value,
    value: value,
  }));
};

export const getItemOptions = () => {
  return Object.entries(Item).map(([, value]) => ({
    label: value,
    value: value,
  }));
};

interface User {
  userId: number;
  name: string;
  email: string;
  password: string;
  user_level: number; // 1 = User, 2 = Admin, 3 = Vendor
}

interface UserDetails {
  userId: number;
  name: string;
  email: string;
  user_level: number;
  role: string;
  isLoggedIn: boolean;
}

const getUserDetails = (): UserDetails | null => {
  const userData = localStorage.getItem("user-access");

  if (userData) {
    const user: User = JSON.parse(userData);

    const roleMap: Record<number, string> = {
      1: "User",
      2: "Admin",
      3: "Vendor",
    };

    return {
      userId: user.userId,
      name: user.name,
      email: user.email,
      user_level: user.user_level,
      role: roleMap[user.user_level] || "Unknown",
      isLoggedIn: true,
    };
  }

  return null;
};

const hargaPerKg: Record<Item, number> = {
  [Item.TONGKOL_JAGUNG]: 500,
  [Item.SEKAM_PADI]: 300,
  [Item.SERBUK_GERGAJI]: 400,
  [Item.JERAMI_PADI]: 350,
  [Item.KULIT_KOPI]: 600,
  [Item.LIMBAH_TEBU]: 450,
  [Item.CANGKANG_KELAPA_SAWIT]: 700,
  [Item.BATANG_JAGUNG]: 500,
  [Item.SABUT_KELAPA]: 550,
};

const tarifPengangkutanPerKm = 2000;
const tarifPemrosesanPerKg = 1000;
const tarifPenyimpananPerKg = 200;
const tarifPengirimanPerKm = 2500;
const marginKeuntungan = 0.2;

function hitungBiayaProduksi(
  order: AgriculturalWaste,
  jarakPengangkutan: number,
  jarakPengiriman: number
): {
  hargaJual: number;
  margin: number;
  pembayaranPetani: number;
  hargaItem: number;
  biayaPemrosesan: number;
  biayaPengiriman: number;
  biayaPenyimpanan: number;
  totalCost: number;
} {
  const totalBerat =
    (order.jumlah_karung ?? 0) * (order.berat_per_karung_kg ?? 0);
  const biayaBahanBaku = totalBerat * hargaPerKg[order.item];
  const biayaPengangkutan = jarakPengangkutan * tarifPengangkutanPerKm;
  const biayaPemrosesan = totalBerat * tarifPemrosesanPerKg;
  const biayaPenyimpanan = totalBerat * tarifPenyimpananPerKg;
  const biayaPengiriman = jarakPengiriman * tarifPengirimanPerKm;
  const totalCost =
    biayaBahanBaku +
    biayaPengangkutan +
    biayaPemrosesan +
    biayaPenyimpanan +
    biayaPengiriman;
  const hargaJual = totalCost + marginKeuntungan * totalCost;
  const margin = hargaJual - totalCost;
  const pembayaranPetani = biayaBahanBaku;

  return {
    hargaJual,
    margin,
    pembayaranPetani,
    hargaItem: hargaPerKg[order.item],
    biayaPemrosesan,
    biayaPengiriman,
    biayaPenyimpanan,
    totalCost,
  };
}

function formatRupiah(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}
export enum BiomassFuelProduct {
  BRIKET = "Briket Biomassa",
  PELET = "Pelet Biomassa",
  BIOCHAR = "Biochar",
  BIOETANOL = "Bioetanol",
  BOILER_FUEL = "Bahan Bakar Boiler",
}
export const BiomassFuelProductOptions = [
  { label: "Briket Biomassa", value: BiomassFuelProduct.BRIKET },
  { label: "Pelet Biomassa", value: BiomassFuelProduct.PELET },
  { label: "Biochar", value: BiomassFuelProduct.BIOCHAR },
  { label: "Bioetanol", value: BiomassFuelProduct.BIOETANOL },
  { label: "Bahan Bakar Boiler", value: BiomassFuelProduct.BOILER_FUEL },
];

export {
  agriculturalWastes,
  StatusBadge,
  getUserDetails,
  hitungBiayaProduksi,
  formatRupiah,
};
