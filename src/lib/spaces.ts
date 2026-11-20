import { useEffect, useState } from "react";
import warehouse from "@/assets/space-warehouse.jpg";
import garage from "@/assets/space-garage.jpg";
import room from "@/assets/space-room.jpg";
import shop from "@/assets/space-shop.jpg";

export type Space = {
  id: string;
  title: string;
  type: string;
  wilaya: string;
  area: number;
  pricePerDay: number;
  pricePerMonth: number;
  images: string[];
  description: string;
  features: string[];
  owner: string;
  rating: number;
  region?: string;
  phone?: string;
  status: "available" | "review";
  userAdded?: boolean;
};

export const statusLabels = { available: "متاحة", review: "قيد المراجعة" } as const;
export const spaceTypes = ["مستودع", "غرفة تخزين", "مرآب", "مساحة لوجستية"] as const;
export const defaultImageForType: Record<string, string> = {
  "مستودع": warehouse, "غرفة تخزين": room, "مرآب": garage, "مساحة لوجستية": shop,
};

/** Platform service fee charged before a rental is confirmed (percentage of rent). */
export const SERVICE_FEE_RATE = 0.1;
export const MIN_SERVICE_FEE = 500;

export function computeBooking(space: Space, mode: "day" | "month", qty: number) {
  const rent = (mode === "day" ? space.pricePerDay : space.pricePerMonth) * qty;
  const fee = Math.max(MIN_SERVICE_FEE, Math.round(rent * SERVICE_FEE_RATE));
  return { rent, fee, total: rent + fee };
}

export const spaces: Space[] = [
  {
    id: "djelfa-warehouse-120",
    title: "مستودع 120م² مغطى وآمن",
    type: "مستودع",
    wilaya: "الجلفة",
    area: 120,
    pricePerDay: 1500,
    pricePerMonth: 35000,
    images: [warehouse, shop, garage],
    description: "مستودع حديث مغطى بالكامل، أرضية خرسانية مصقولة، رفوف معدنية جاهزة، مدخل واسع لدخول الشاحنات، قريب من الطريق الوطني رقم 1.",
    features: ["حراسة 24/24", "كاميرات مراقبة", "مدخل شاحنات", "كهرباء", "رفوف معدنية"],
    owner: "عبد القادر ب.",
    status: "available",
    phone: "0667219255",
    rating: 4.8,
  },
  {
    id: "setif-garage-40",
    title: "مرآب 40م² للتخزين",
    type: "مرآب",
    wilaya: "سطيف",
    area: 40,
    pricePerDay: 700,
    pricePerMonth: 18000,
    images: [garage, room],
    description: "مرآب نظيف بباب حديدي أوتوماتيكي، أرضية مبلطة، مناسب لتخزين السلع الخفيفة والأثاث وسلع التجارة الإلكترونية.",
    features: ["باب حديدي", "إنارة", "أرضية مبلطة", "وسط المدينة"],
    owner: "سمير ل.",
    status: "available",
    phone: "0667219255",
    rating: 4.6,
  },
  {
    id: "algiers-room-15",
    title: "غرفة تخزين 15م²",
    type: "غرفة تخزين",
    wilaya: "الجزائر العاصمة",
    area: 15,
    pricePerDay: 400,
    pricePerMonth: 9000,
    images: [room, garage],
    description: "غرفة جافة وآمنة داخل عمارة، مثالية لتخزين الأمتعة الشخصية أو مخزون صغير لبائعي التجارة الإلكترونية.",
    features: ["جافة ومهواة", "قفل خاص", "مصعد"],
    owner: "نسرين ق.",
    status: "available",
    phone: "0667219255",
    rating: 4.9,
  },
  {
    id: "oran-shop-80",
    title: "محل تجاري 80م² بواجهة زجاجية",
    type: "مساحة لوجستية",
    wilaya: "وهران",
    area: 80,
    pricePerDay: 2500,
    pricePerMonth: 60000,
    images: [shop, warehouse],
    description: "محل تجاري فارغ في شارع حيوي، يصلح كمخزن مؤقت أو نقطة عرض وتسليم للطلبيات.",
    features: ["واجهة زجاجية", "ستار حديدي", "شارع تجاري", "مكيف"],
    owner: "شركة الأمل",
    status: "available",
    phone: "0667219255",
    rating: 4.5,
  },
];

const USER_KEY = "spaceify-user-spaces";

export function loadUserSpaces(): Space[] {
  try { return JSON.parse(localStorage.getItem(USER_KEY) || "[]"); } catch { return []; }
}

export function addUserSpace(space: Space) {
  localStorage.setItem(USER_KEY, JSON.stringify([space, ...loadUserSpaces()]));
  window.dispatchEvent(new Event(USER_KEY));
}

/** Seed spaces plus spaces added from this device (newest first). */
export function useAllSpaces() {
  const [user, setUser] = useState<Space[] | null>(null);
  useEffect(() => {
    const sync = () => setUser(loadUserSpaces());
    sync();
    window.addEventListener(USER_KEY, sync);
    return () => window.removeEventListener(USER_KEY, sync);
  }, []);
  return { all: [...(user ?? []), ...spaces], ready: user !== null };
}
