import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { MapPin, Ruler, Star, Check, ShieldCheck, CreditCard, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { spaces, computeBooking } from "@/lib/spaces";
import { addNotification } from "@/lib/notifications";

export const Route = createFileRoute("/spaces/$id")({
  loader: ({ params }) => {
    const space = spaces.find((s) => s.id === params.id);
    if (!space) throw notFound();
    return { space };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.space.title} - ${loaderData.space.wilaya} | Spaceify` },
          { name: "description", content: loaderData.space.description },
          { property: "og:title", content: `${loaderData.space.title} | Spaceify` },
          { property: "og:description", content: loaderData.space.description },
        ]
      : [{ title: "مساحة غير متوفرة | Spaceify" }, { name: "robots", content: "noindex" }],
  }),
  component: SpaceDetail,
  notFoundComponent: () => (
    <div className="p-20 text-center">
      <p className="mb-4">هذه المساحة غير متوفرة.</p>
      <Link to="/spaces" className="font-bold text-accent">العودة للمساحات</Link>
    </div>
  ),
});

const fmt = (n: number) => n.toLocaleString("fr-DZ");

function SpaceDetail() {
  const { space } = Route.useLoaderData();
  const [img, setImg] = useState(0);
  const [mode, setMode] = useState<"day" | "month">("day");
  const [qty, setQty] = useState(1);
  const [payOpen, setPayOpen] = useState(false);
  const [method, setMethod] = useState<"edahabia" | "cib">("edahabia");
  const [paying, setPaying] = useState(false);
  const [paid, setPaid] = useState(false);
  const { rent, fee, total } = computeBooking(space, mode, qty);

  const pay = (e: React.FormEvent) => {
    e.preventDefault();
    setPaying(true);
    setTimeout(() => {
      setPaying(false);
      setPaid(true);
      setPayOpen(false);
      addNotification("spaces", "تم تأكيد الحجز ✅", `${space.title} - ${space.wilaya}. تم دفع رسوم الخدمة ${fmt(fee)} دج.`);
      toast.success("تم دفع رسوم الخدمة وتأكيد الحجز!");
    }, 1200);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <Link to="/spaces" className="mb-4 inline-flex items-center gap-1 text-sm font-bold text-primary"><ArrowRight className="size-4" />كل المساحات</Link>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="min-w-0">
          <div className="overflow-hidden rounded-3xl">
            <img src={space.images[img]} alt={space.title} width={1024} height={768} className="aspect-[4/3] w-full object-cover" />
          </div>
          <div className="mt-3 flex gap-3 overflow-x-auto">
            {space.images.map((src, i) => (
              <button key={i} onClick={() => setImg(i)}
                className={`shrink-0 overflow-hidden rounded-xl border-2 ${i === img ? "border-accent" : "border-transparent opacity-70"}`}>
                <img src={src} alt="" loading="lazy" className="h-16 w-24 object-cover" />
              </button>
            ))}
          </div>
          <h1 className="mt-6 text-2xl font-black text-primary sm:text-3xl">{space.title}</h1>
          <div className="mt-2 flex flex-wrap gap-4 text-muted-foreground">
            <span className="flex items-center gap-1"><MapPin className="size-4 text-accent" />{space.wilaya}</span>
            <span className="flex items-center gap-1"><Ruler className="size-4 text-accent" />{space.area}م²</span>
            <span className="flex items-center gap-1"><Star className="size-4 text-accent" />{space.rating}</span>
            <span>المؤجر: {space.owner}</span>
          </div>
          <p className="mt-5 leading-8">{space.description}</p>
          <h2 className="mt-6 font-black text-primary">المميزات</h2>
          <ul className="mt-3 grid grid-cols-2 gap-2">
            {space.features.map((f) => (
              <li key={f} className="flex items-center gap-2 rounded-xl bg-secondary px-3 py-2 text-sm"><Check className="size-4 text-eco" />{f}</li>
            ))}
          </ul>
        </div>

        <aside className="glass h-fit rounded-3xl p-6 lg:sticky lg:top-24">
          <p className="text-2xl font-black text-primary">{fmt(space.pricePerDay)} دج <span className="text-sm text-muted-foreground">/ اليوم</span></p>
          <p className="text-sm text-muted-foreground">أو {fmt(space.pricePerMonth)} دج / الشهر</p>
          <div className="mt-5 grid grid-cols-2 gap-1 rounded-xl bg-muted p-1">
            {(["day", "month"] as const).map((m) => (
              <button key={m} onClick={() => { setMode(m); setQty(1); }}
                className={`rounded-lg py-2 text-sm font-bold ${mode === m ? "bg-card text-primary shadow" : "text-muted-foreground"}`}>
                {m === "day" ? "يومي" : "شهري"}
              </button>
            ))}
          </div>
          <label className="mt-4 block text-sm font-semibold">
            عدد {mode === "day" ? "الأيام" : "الأشهر"}
            <input type="number" min={1} max={mode === "day" ? 60 : 24} value={qty}
              onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
              className="mt-1 h-11 w-full rounded-xl border bg-card px-3" />
          </label>
          <div className="mt-5 space-y-2 border-t pt-4 text-sm">
            <div className="flex justify-between"><span>الإيجار</span><span>{fmt(rent)} دج</span></div>
            <div className="flex justify-between"><span>رسوم خدمة Spaceify (10%)</span><span>{fmt(fee)} دج</span></div>
            <div className="flex justify-between border-t pt-2 font-black text-primary"><span>المجموع</span><span>{fmt(total)} دج</span></div>
          </div>
          {paid ? (
            <div className="mt-5 rounded-xl bg-eco/10 p-4 text-center font-bold text-eco">✅ تم الدفع وتأكيد الحجز</div>
          ) : (
            <Button variant="brand" className="mt-5 h-12 w-full" onClick={() => setPayOpen(true)}>
              <Lock />ادفع رسوم الخدمة واحجز
            </Button>
          )}
          <p className="mt-3 flex items-start gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="size-4 shrink-0 text-accent" />
            لا يتم تأكيد التأجير إلا بعد دفع رسوم الخدمة ({fmt(fee)} دج). يُدفع الإيجار للمؤجر عند استلام المساحة.
          </p>
        </aside>
      </div>

      <Dialog open={payOpen} onOpenChange={setPayOpen}>
        <DialogContent dir="rtl" className="text-start">
          <DialogHeader><DialogTitle className="text-start">دفع رسوم الخدمة — {fmt(fee)} دج</DialogTitle></DialogHeader>
          <form onSubmit={pay} className="grid gap-3">
            <div className="grid grid-cols-2 gap-2">
              {([["edahabia", "الذهبية Edahabia"], ["cib", "بطاقة CIB"]] as const).map(([k, l]) => (
                <button type="button" key={k} onClick={() => setMethod(k)}
                  className={`rounded-xl border-2 p-3 text-sm font-bold ${method === k ? "border-accent bg-accent/10 text-primary" : ""}`}>
                  <CreditCard className="mx-auto mb-1" />{l}
                </button>
              ))}
            </div>
            <input required inputMode="numeric" placeholder="رقم البطاقة" className="h-11 rounded-xl border bg-card px-3" dir="ltr" />
            <div className="grid grid-cols-2 gap-2">
              <input required placeholder="MM/YY" className="h-11 rounded-xl border bg-card px-3" dir="ltr" />
              <input required placeholder="CVV2" className="h-11 rounded-xl border bg-card px-3" dir="ltr" />
            </div>
            <Button type="submit" variant="brand" className="h-12" disabled={paying}>
              {paying ? "جاري المعالجة..." : `ادفع ${fmt(fee)} دج`}
            </Button>
            <p className="text-center text-xs text-muted-foreground">وضع تجريبي — لن يتم خصم أي مبلغ حقيقي</p>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
