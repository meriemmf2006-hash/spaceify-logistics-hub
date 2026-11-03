import { useEffect, useState } from "react";

export type NotifCategory = "spaces" | "trucks" | "local" | "partners";
export type Notif = { id: string; category: NotifCategory; title: string; body: string; time: number; read: boolean };

export const categoryLabels: Record<NotifCategory, string> = {
  spaces: "🏢 المساحات والتخزين",
  trucks: "🚛 الرحلات الفارغة",
  local: "🛻 النقل المحلي",
  partners: "🏬 المحلات والشركاء",
};

const KEY = "spaceify-notifications";
const now = Date.now();
const seed: Notif[] = [
  { id: "s1", category: "spaces", title: "مساحة جديدة قريبة منك", body: "مستودع 120م² متاح الآن في الجلفة بـ 1500 دج/اليوم.", time: now - 6e5, read: false },
  { id: "s2", category: "spaces", title: "تذكير بانتهاء الكراء", body: "ينتهي كراء الكراج في سطيف بعد 3 أيام.", time: now - 864e5, read: true },
  { id: "t1", category: "trucks", title: "شاحنة عائدة على مسارك", body: "شاحنة 10 طن باتنة ⬅️ وهران، متبقي 4 طن بتخفيض 40%.", time: now - 18e5, read: false },
  { id: "t2", category: "trucks", title: "عرض سعر جديد", body: "السائق محمد أرسل لك عرضاً بـ 22000 دج.", time: now - 72e5, read: false },
  { id: "l1", category: "local", title: "سائق Master متاح", body: "سيارة Master على بعد 1.8 كم في الجزائر العاصمة.", time: now - 9e5, read: false },
  { id: "p1", category: "partners", title: "تم تسليم الطلبية", body: "تم توصيل طلبية الزبون رقم 0551 بنجاح.", time: now - 36e5, read: true },
];

function load(): Notif[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : seed;
  } catch {
    return seed;
  }
}
function save(list: Notif[]) {
  localStorage.setItem(KEY, JSON.stringify(list));
  window.dispatchEvent(new Event(KEY));
}

export function addNotification(category: NotifCategory, title: string, body: string) {
  save([{ id: crypto.randomUUID(), category, title, body, time: Date.now(), read: false }, ...load()]);
}

export function useNotifications() {
  const [list, setList] = useState<Notif[]>([]);
  useEffect(() => {
    const sync = () => setList(load());
    sync();
    window.addEventListener(KEY, sync);
    return () => window.removeEventListener(KEY, sync);
  }, []);
  return {
    list,
    markRead: (cat?: NotifCategory) => save(load().map((n) => (!cat || n.category === cat ? { ...n, read: true } : n))),
  };
}
