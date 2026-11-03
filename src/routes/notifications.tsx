import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Bell, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { categoryLabels, useNotifications, type NotifCategory } from "@/lib/notifications";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      { title: "الإشعارات | Spaceify" },
      { name: "description", content: "إشعاراتك مصنفة حسب كل قسم: المساحات، الرحلات الفارغة، النقل المحلي، والمحلات." },
      { property: "og:title", content: "الإشعارات | Spaceify" },
      { property: "og:description", content: "تابع كل جديد في كل قسم على حدا." },
    ],
  }),
  component: NotificationsPage,
});

function timeAgo(t: number) {
  const m = Math.round((Date.now() - t) / 6e4);
  if (m < 1) return "الآن";
  if (m < 60) return `منذ ${m} دقيقة`;
  const h = Math.round(m / 60);
  return h < 24 ? `منذ ${h} ساعة` : `منذ ${Math.round(h / 24)} يوم`;
}

function NotificationsPage() {
  const { list, markRead } = useNotifications();
  const [cat, setCat] = useState<NotifCategory | "all">("all");
  const cats = Object.keys(categoryLabels) as NotifCategory[];
  const shown = cat === "all" ? list : list.filter((n) => n.category === cat);
  const unread = (c?: NotifCategory) => list.filter((n) => !n.read && (!c || n.category === c)).length;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between gap-3">
        <h1 className="flex items-center gap-2 text-2xl font-black text-primary sm:text-3xl"><Bell className="text-accent" />الإشعارات</h1>
        <Button variant="brandOutline" size="sm" onClick={() => markRead(cat === "all" ? undefined : cat)}><CheckCheck />تعليم كمقروء</Button>
      </div>
      <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
        {(["all", ...cats] as const).map((c) => {
          const n = unread(c === "all" ? undefined : c);
          return (
            <button key={c} onClick={() => setCat(c)}
              className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-bold ${cat === c ? "bg-primary text-primary-foreground" : "bg-secondary text-primary"}`}>
              {c === "all" ? "الكل" : categoryLabels[c]}
              {n > 0 && <span className="rounded-full bg-accent px-2 text-xs text-accent-foreground">{n}</span>}
            </button>
          );
        })}
      </div>
      <div className="space-y-3">
        {shown.length === 0 && <p className="py-16 text-center text-muted-foreground">لا توجد إشعارات في هذا القسم.</p>}
        {shown.map((n) => (
          <div key={n.id} className={`glass flex gap-4 rounded-2xl p-4 ${n.read ? "opacity-70" : ""}`}>
            <span className={`mt-2 size-2.5 shrink-0 rounded-full ${n.read ? "bg-muted" : "bg-accent"}`} />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-bold">{n.title}</h3>
                <span className="text-xs text-muted-foreground">{timeAgo(n.time)}</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{n.body}</p>
              <span className="mt-2 inline-block rounded-full bg-secondary px-2 py-0.5 text-xs text-primary">{categoryLabels[n.category]}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
