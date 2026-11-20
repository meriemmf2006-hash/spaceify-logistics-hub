import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { ImagePlus, X, Send, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { addUserSpace, defaultImageForType, spaceTypes, type Space } from "@/lib/spaces";
import { addNotification } from "@/lib/notifications";
import { PLATFORM_WHATSAPP, waLink } from "@/lib/whatsapp";

export const Route = createFileRoute("/spaces/new")({
  head: () => ({
    meta: [
      { title: "أضف مساحتك | Spaceify" },
      { name: "description", content: "اعرض مستودعك أو مرآبك أو غرفة التخزين للإيجار على منصة Spaceify في جميع الولايات." },
      { property: "og:title", content: "أضف مساحتك | Spaceify" },
      { property: "og:description", content: "حوّل مساحتك الفارغة إلى مصدر دخل عبر Spaceify." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: NewSpacePage,
});

const wilayas = ["الجزائر العاصمة", "وهران", "قسنطينة", "باتنة", "الجلفة", "سطيف", "عنابة", "البليدة", "تلمسان", "ورقلة", "بسكرة", "بجاية"];
const featureOptions = ["مراقبة بالكاميرات", "حراسة 24/24", "تهوية جيدة", "سهولة وصول الشاحنات", "كهرباء", "رفوف تخزين", "نظام إطفاء الحريق", "مكيّف"];

const schema = z.object({
  title: z.string().trim().min(5, "يرجى إدخال عنوان من 5 أحرف على الأقل").max(100),
  type: z.enum(spaceTypes),
  wilaya: z.string().min(1),
  region: z.string().trim().min(2, "يرجى إدخال المنطقة أو البلدية").max(80),
  area: z.coerce.number().min(1, "يرجى إدخال مساحة صحيحة").max(100000),
  price: z.coerce.number().min(100, "يرجى إدخال سعر صحيح").max(100000000),
  priceUnit: z.enum(["day", "month"]),
  phone: z.string().trim().regex(/^(\+213|00213|0)[5-7]\d{8}$/, "يرجى إدخال رقم هاتف جزائري صحيح، مثال: 0555123456"),
  description: z.string().trim().min(20, "يرجى كتابة وصف من 20 حرفاً على الأقل").max(600),
});

/** Resize an uploaded image so it fits comfortably in device storage. */
function compress(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, 900 / img.width);
      const c = document.createElement("canvas");
      c.width = img.width * scale; c.height = img.height * scale;
      c.getContext("2d")!.drawImage(img, 0, 0, c.width, c.height);
      resolve(c.toDataURL("image/jpeg", 0.7));
      URL.revokeObjectURL(img.src);
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

const field = "mt-1 h-11 w-full rounded-xl border bg-card px-3 text-sm outline-none focus:ring-2 focus:ring-ring";
const lbl = "block text-sm font-semibold";

function NewSpacePage() {
  const navigate = useNavigate();
  const [images, setImages] = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState<Space | null>(null);

  const onFiles = async (files: FileList | null) => {
    if (!files) return;
    const list = Array.from(files).filter((f) => f.type.startsWith("image/")).slice(0, 5 - images.length);
    const out = await Promise.all(list.map(compress));
    setImages((p) => [...p, ...out].slice(0, 5));
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const r = schema.safeParse(Object.fromEntries(new FormData(e.currentTarget)));
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((i) => { errs[String(i.path[0])] ??= i.message; });
      setErrors(errs);
      toast.error("يرجى تصحيح الحقول المشار إليها");
      return;
    }
    setErrors({});
    const d = r.data;
    const space: Space = {
      id: `user-${Date.now()}`,
      title: d.title, type: d.type, wilaya: d.wilaya, region: d.region, area: d.area,
      pricePerDay: d.priceUnit === "day" ? d.price : Math.round(d.price / 30),
      pricePerMonth: d.priceUnit === "month" ? d.price : d.price * 30,
      images: images.length ? images : [defaultImageForType[d.type]!],
      description: d.description, features, owner: "أنت", rating: 5,
      phone: d.phone, status: "review", userAdded: true,
    };
    try { addUserSpace(space); } catch {
      toast.error("تعذّر حفظ الصور لكبر حجمها، يرجى رفع صور أقل");
      return;
    }
    addNotification("spaces", "تم استلام مساحتك", `«${space.title}» قيد المراجعة وستُنشر بعد التحقق منها.`);
    toast.success("تم إرسال طلبك بنجاح", { description: "أُضيفت مساحتك إلى القائمة بحالة «قيد المراجعة»." });
    setDone(space);
  };

  if (done) {
    const msg = `مرحباً فريق Spaceify 👋\nأودّ تأكيد إضافة مساحة جديدة:\n\n🏢 العنوان: ${done.title}\n📦 النوع: ${done.type}\n📍 الموقع: ${done.wilaya} - ${done.region}\n📐 المساحة: ${done.area} م²\n💰 السعر: ${done.pricePerDay.toLocaleString("fr-DZ")} دج/اليوم - ${done.pricePerMonth.toLocaleString("fr-DZ")} دج/الشهر\n🛡️ التجهيزات: ${done.features.join("، ") || "—"}\n📞 الهاتف: ${done.phone}\n\nالرقم المرجعي: ${done.id}`;
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <div className="glass rounded-3xl p-8">
          <div className="text-5xl">✅</div>
          <h1 className="mt-4 text-2xl font-black text-primary">تم إرسال طلبك بنجاح</h1>
          <p className="mt-3 text-muted-foreground">أُضيفت مساحتك «{done.title}» إلى قائمة المساحات بحالة <b className="text-accent">قيد المراجعة</b>. أكّد الإضافة عبر واتساب لتسريع مراجعتها.</p>
          <div className="mt-6 grid gap-2">
            <Button asChild variant="brand" className="h-12">
              <a href={waLink(PLATFORM_WHATSAPP, msg)} target="_blank" rel="noopener noreferrer">💬 أكّد الإضافة عبر واتساب</a>
            </Button>
            <Button variant="brandOutline" onClick={() => navigate({ to: "/spaces/$id", params: { id: done.id } })}>عرض بطاقة المساحة</Button>
            <Button variant="ghost" onClick={() => navigate({ to: "/spaces" })}>استعرض المساحات المتاحة</Button>
          </div>
        </div>
      </div>
    );
  }

  const err = (k: string) => errors[k] && <span className="mt-1 block text-xs text-destructive">{errors[k]}</span>;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link to="/spaces" className="mb-4 inline-flex items-center gap-1 text-sm font-bold text-primary"><ArrowRight className="size-4" />العودة إلى المساحات</Link>
      <h1 className="text-2xl font-black text-primary sm:text-3xl">أضف مساحتك</h1>
      <p className="mt-2 text-muted-foreground">املأ البيانات التالية لعرض مساحتك للإيجار. تُراجع كل مساحة قبل نشرها للتأكد من جودة العروض.</p>
      <form onSubmit={submit} noValidate className="glass mt-6 grid gap-4 rounded-3xl p-5 sm:grid-cols-2 sm:p-7">
        <label className={`${lbl} sm:col-span-2`}>عنوان المساحة<input name="title" className={field} placeholder="مثال: مستودع مغطى 200 م² قرب الطريق السريع" />{err("title")}</label>
        <label className={lbl}>نوع المساحة<select name="type" className={field}>{spaceTypes.map((t) => <option key={t}>{t}</option>)}</select></label>
        <label className={lbl}>الولاية<select name="wilaya" className={field}>{wilayas.map((w) => <option key={w}>{w}</option>)}</select></label>
        <label className={lbl}>المنطقة / البلدية<input name="region" className={field} placeholder="مثال: الرويبة" />{err("region")}</label>
        <label className={lbl}>المساحة (م²)<input name="area" type="number" min={1} className={field} placeholder="120" />{err("area")}</label>
        <label className={lbl}>السعر (دج)<input name="price" type="number" min={0} className={field} placeholder="35000" />{err("price")}</label>
        <label className={lbl}>وحدة السعر<select name="priceUnit" className={field}><option value="month">شهرياً</option><option value="day">يومياً</option></select></label>
        <fieldset className="sm:col-span-2">
          <legend className={lbl}>التجهيزات والأمان</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {featureOptions.map((f) => {
              const on = features.includes(f);
              return (
                <button type="button" key={f} aria-pressed={on} onClick={() => setFeatures((p) => on ? p.filter((x) => x !== f) : [...p, f])}
                  className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${on ? "border-accent bg-accent text-accent-foreground" : "bg-card hover:border-accent"}`}>
                  {on ? "✓ " : ""}{f}
                </button>
              );
            })}
          </div>
        </fieldset>
        <label className={`${lbl} sm:col-span-2`}>رقم الهاتف أو واتساب<input name="phone" type="tel" dir="ltr" className={`${field} text-end`} placeholder="0555 12 34 56" />{err("phone")}</label>
        <label className={`${lbl} sm:col-span-2`}>وصف مختصر<textarea name="description" rows={4} className={`${field} h-auto py-2`} placeholder="صف حالة المساحة، طريقة الوصول، وأي شروط خاصة..." />{err("description")}</label>
        <div className="sm:col-span-2">
          <span className={lbl}>صور المساحة <span className="font-normal text-muted-foreground">(حتى 5 صور — اختياري)</span></span>
          <div className="mt-2 flex flex-wrap gap-3">
            {images.map((src, i) => (
              <div key={i} className="relative">
                <img src={src} alt="" className="h-20 w-28 rounded-xl object-cover" />
                <button type="button" aria-label="حذف الصورة" onClick={() => setImages((p) => p.filter((_, j) => j !== i))}
                  className="absolute -end-2 -top-2 rounded-full bg-destructive p-1 text-destructive-foreground"><X className="size-3" /></button>
              </div>
            ))}
            {images.length < 5 && (
              <label className="grid h-20 w-28 cursor-pointer place-items-center rounded-xl border-2 border-dashed text-muted-foreground hover:border-accent">
                <ImagePlus /><input type="file" accept="image/*" multiple className="hidden" onChange={(e) => onFiles(e.target.files)} />
              </label>
            )}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">إذا لم ترفع صوراً، ستُرفق صورة توضيحية مناسبة لنوع المساحة تلقائياً.</p>
        </div>
        <Button type="submit" variant="brand" className="h-12 sm:col-span-2"><Send />أرسل المساحة للمراجعة</Button>
      </form>
    </div>
  );
}
