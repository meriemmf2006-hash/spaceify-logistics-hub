import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  Search, Warehouse, Truck, Package, Bell, Smartphone, Award, Leaf, MapPin, ArrowLeft, Send, Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const wilayas = ["الجزائر العاصمة", "وهران", "قسنطينة", "باتنة", "الجلفة", "سطيف", "عنابة", "البليدة", "تلمسان", "ورقلة", "بسكرة", "بجاية"];

const field = "h-12 w-full rounded-xl border bg-card px-3 text-sm outline-none focus:ring-2 focus:ring-ring";

function Sel({ label, options }: { label: string; options: string[] }) {
  return (
    <label className="block text-xs font-semibold text-muted-foreground">
      {label}
      <select className={`${field} mt-1 text-foreground`}>{options.map((o) => <option key={o}>{o}</option>)}</select>
    </label>
  );
}

const tabs = [
  { id: "space", icon: "🏢", label: "تخزين ومساحات" },
  { id: "truck", icon: "🚛", label: "شحن بين الولايات" },
  { id: "local", icon: "🛻", label: "نقل محلي ورحول" },
] as const;

export function SearchBox() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("space");
  return (
    <div className="glass rounded-3xl p-3 text-foreground sm:p-5">
      <div className="mb-4 grid grid-cols-3 gap-1 rounded-2xl bg-muted p-1">
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`rounded-xl px-2 py-2.5 text-xs font-bold transition-all sm:text-sm ${tab === t.id ? "bg-brand text-primary-foreground shadow-glow" : "text-muted-foreground hover:text-primary"}`}>
            <span className="me-1">{t.icon}</span>{t.label}
          </button>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:items-end">
        {tab === "space" && (<>
          <Sel label="الولاية" options={wilayas} />
          <Sel label="نوع المساحة" options={["مستودع", "كراج", "غرفة", "محل"]} />
          <Sel label="مدة التأجير" options={["يومي", "شهري"]} />
        </>)}
        {tab === "truck" && (<>
          <Sel label="ولاية الانطلاق" options={wilayas} />
          <Sel label="⬅️ ولاية الوصول" options={[...wilayas].reverse()} />
          <Sel label="نوع البضاعة / الحجم" options={["طرود صغيرة", "منصات (باليت)", "أقل من 2 طن", "2 - 5 طن", "أكثر من 5 طن"]} />
        </>)}
        {tab === "local" && (<>
          <Sel label="نوع الخدمة" options={["توصيل أثاث / تجهيزات محلات", "رحول منازل", "توصيل سريع"]} />
          <label className="block text-xs font-semibold text-muted-foreground sm:col-span-2">
            الموقع
            <div className="relative mt-1">
              <MapPin className="absolute start-3 top-1/2 size-4 -translate-y-1/2 text-accent" />
              <input className={`${field} ps-9`} placeholder="الحي، البلدية، الولاية" />
            </div>
          </label>
        </>)}
        <Button variant="brand" className="h-12 w-full" onClick={() => toast.success("جاري البحث عن أفضل العروض القريبة منك...")}>
          <Search />ابحث الآن
        </Button>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="bg-hero relative overflow-hidden text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-12 sm:pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <span className="glass-dark inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold">
            <span className="size-2 animate-pulse rounded-full bg-accent" />
            كل ماهو فارغ رزق... و كل رحلة تمثل وفرة
          </span>
          <h1 className="mt-6 text-3xl font-black leading-tight sm:text-5xl lg:text-6xl">
            <span dir="ltr">Spaceify</span>: المنصة اللوجستية التشاركية <span className="text-accent">الأولى في الجزائر</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-primary-foreground/80 sm:text-lg">
            نوصل البضائع، نملأ الشاحنات الفارغة، ونستغل المساحات المغلقة لخدمة التجار، المحلات، والأفراد.
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-5xl"><SearchBox /></div>
        <div className="mx-auto mt-8 grid max-w-3xl grid-cols-3 gap-3 text-center">
          {[["+1,200", "مساحة متاحة"], ["+850", "شاحنة وسائق"], ["58", "ولاية مغطاة"]].map(([n, l]) => (
            <div key={l} className="glass-dark rounded-2xl p-3">
              <div className="text-xl font-black sm:text-2xl">{n}</div>
              <div className="text-xs text-primary-foreground/70">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const SectionTitle = ({ kicker, title, desc }: { kicker: string; title: string; desc?: string }) => (
  <div className="mx-auto mb-10 max-w-2xl text-center">
    <span className="text-sm font-bold text-accent">{kicker}</span>
    <h2 className="mt-2 text-2xl font-black text-primary sm:text-4xl">{title}</h2>
    {desc && <p className="mt-3 text-muted-foreground">{desc}</p>}
  </div>
);

export function Modules() {
  const items = [
    { icon: Warehouse, e: "🏢", t: "خبي سلعتك", s: "المساحات الثابتة", d: "كراء واستئجار المستودعات، الكراجات، والمحلات للتخزين المؤقت باليوم أو الشهر.", b: "تصفح المساحات", to: "/spaces" as const },
    { icon: Truck, e: "🚛", t: "رجعة عامرة", s: "الرحلات الفارغة بين الولايات", d: "استغل رحلات العودة للشاحنات الكبرى لنقل بضائعك بأقل تكلفة وتقليل انبعاثات الكربون.", b: "استكشف الشاحنات العائدة", to: "/trucks" as const },
    { icon: Package, e: "🛻", t: "نقل وتوصيل", s: "الهاربين & Master", d: "خدمة التوصيل الفوري لأصحاب محلات الأثاث والتجهيزات ورحول الأفراد بأسعار شفافة.", b: "اطلب مركب نقل", to: "/local" as const },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <SectionTitle kicker="الأقسام الرئيسية" title="ثلاث خدمات، منصة واحدة" />
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((i) => (
          <div key={i.t} className="glass group relative overflow-hidden rounded-3xl p-7 transition-transform hover:-translate-y-1">
            <div className="bg-brand absolute -end-10 -top-10 size-32 rounded-full opacity-10 transition-opacity group-hover:opacity-20" />
            <div className="bg-brand mb-5 grid size-14 place-items-center rounded-2xl text-primary-foreground shadow-glow"><i.icon className="size-7" /></div>
            <h3 className="text-xl font-black text-primary">{i.e} {i.t}</h3>
            <p className="text-sm font-bold text-accent">({i.s})</p>
            <p className="mt-3 min-h-16 text-muted-foreground">{i.d}</p>
            <Button asChild variant="brandOutline" className="mt-6 w-full">
              <Link to={i.to}>{i.b}<ArrowLeft /></Link>
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}

export function B2B() {
  const [loading, setLoading] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("🔔 إشعار Web Push: تم إرسال طلبك لأقرب 5 سائقين", { description: "سيتم الرد خلال دقائق" });
      setTimeout(() => toast("📩 SMS: سائق Master على بعد 2.3 كم قبل طلبك — الوصول خلال 15 دقيقة"), 1400);
    }, 900);
  };
  return (
    <section className="bg-hero py-20 text-primary-foreground">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 lg:grid-cols-2">
        <div>
          <span className="glass-dark rounded-full px-3 py-1 text-sm font-bold">بوابة محلات الأثاث والتجهيزات</span>
          <h2 className="mt-4 text-2xl font-black sm:text-4xl">خدمة التوصيل المباشر للمحلات التجارية <span dir="ltr" className="text-accent">(B2B2C)</span></h2>
          <p className="mt-4 text-primary-foreground/80">ربط فوري بين محلات الأثاث، الأجهزة الكهرومنزلية، ومواد البناء مع أسطول الهاربين وMaster لتوصيل مشتريات الزبائن فوراً.</p>
          <ul className="mt-6 space-y-2 text-sm">
            {["تتبع مباشر للسائق", "تسعيرة شفافة قبل التأكيد", "فاتورة شهرية للمحلات الشريكة"].map((x) => (
              <li key={x} className="flex items-center gap-2"><Star className="size-4 text-accent" />{x}</li>
            ))}
          </ul>
        </div>
        <form onSubmit={submit} className="glass rounded-3xl p-6 text-foreground">
          <h3 className="mb-4 text-lg font-black text-primary">طلب توصيل سريع</h3>
          <div className="grid gap-3">
            <input required className={field} placeholder="اسم المحل ورقم الزبون" />
            <input required className={field} placeholder="عنوان التوصيل" />
            <select className={field}>
              {["الهاربين DFSK", "N300", "Master", "Partner"].map((v) => <option key={v}>{v}</option>)}
            </select>
            <Button type="submit" variant="brand" className="h-12" disabled={loading}>
              <Send />{loading ? "جاري الإرسال..." : "طلب سائق توصيل فوري"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

const listings = {
  space: [
    { t: "مستودع 120م² مغطى وآمن - الجلفة", p: "1500 دج/اليوم", tag: "مساحة", icon: Warehouse },
    { t: "كراج 40م² للتخزين - سطيف", p: "18000 دج/الشهر", tag: "مساحة", icon: Warehouse },
  ],
  truck: [
    { t: "شاحنة 10 طن عائدة من باتنة ⬅️ وهران (متبقي 4 طن)", p: "تخفيض 40%", tag: "رحلة فارغة", icon: Truck },
    { t: "شاحنة 20 طن عائدة من ورقلة ⬅️ الجزائر (فارغة كلياً)", p: "تخفيض 50%", tag: "رحلة فارغة", icon: Truck },
  ],
  local: [
    { t: "سيارة Master جاهزة لنقل الأثاث والرحول - الجزائر العاصمة", p: "متاح الآن", tag: "نقل محلي", icon: Package },
    { t: "هاربين DFSK للتوصيل السريع - وهران", p: "من 1200 دج", tag: "نقل محلي", icon: Package },
  ],
};

export function Listings({ only }: { only?: keyof typeof listings }) {
  const [tab, setTab] = useState<keyof typeof listings>(only ?? "space");
  const labels = { space: "🏢 المساحات", truck: "🚛 الشاحنات", local: "🛻 النقل المحلي" };
  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <SectionTitle kicker="مباشر الآن" title="نماذج العروض المباشرة" />
      {!only && (
        <div className="mb-8 flex justify-center gap-2 overflow-x-auto">
          {(Object.keys(labels) as (keyof typeof listings)[]).map((k) => (
            <button key={k} onClick={() => setTab(k)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold ${tab === k ? "bg-primary text-primary-foreground" : "bg-secondary text-primary"}`}>
              {labels[k]}
            </button>
          ))}
        </div>
      )}
      <div className="grid gap-5 md:grid-cols-2">
        {listings[tab].map((l) => (
          <div key={l.t} className="glass flex items-center gap-4 rounded-2xl p-5">
            <div className="bg-brand grid size-14 shrink-0 place-items-center rounded-2xl text-primary-foreground"><l.icon /></div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 text-xs">
                <span className="rounded-full bg-secondary px-2 py-0.5 font-bold text-primary">{l.tag}</span>
                <span className="flex items-center gap-1 text-eco"><span className="size-1.5 animate-pulse rounded-full bg-eco" />مباشر</span>
              </div>
              <h3 className="mt-1 font-bold">{l.t}</h3>
              <p className="mt-1 font-black text-accent">{l.p}</p>
            </div>
            <Button variant="accent" size="sm" onClick={() => toast.success("تم إرسال طلب الحجز لصاحب العرض")}>احجز</Button>
          </div>
        ))}
      </div>
    </section>
  );
}

export function TechAndBadges() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-20">
      <SectionTitle kicker="التقنية والاستدامة" title="ذكية، خفيفة، وصديقة للبيئة" />
      <div className="grid gap-5 md:grid-cols-2">
        {[
          { i: Bell, t: "🔔 إشعارات فورية متقدمة", d: "إشعارات فورية متقدمة (Web Push & SMS & WhatsApp) لتنبيه السائقين والمؤجرين فور توفر طلب قريب." },
          { i: Smartphone, t: "📱 تطبيق ويب خفيف (PWA)", d: "تطبيق ويب خفيف (PWA) يعمل مباشرة على المتصفح دون الحاجة لتحميل تطبيقات ثقيلة. أضفه للشاشة الرئيسية بنقرة." },
        ].map((c) => (
          <div key={c.t} className="glass flex gap-4 rounded-3xl p-6">
            <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-secondary text-primary"><c.i /></div>
            <div><h3 className="font-black text-primary">{c.t}</h3><p className="mt-2 text-muted-foreground">{c.d}</p></div>
          </div>
        ))}
      </div>
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <div className="flex items-center gap-4 rounded-3xl border-2 border-primary/20 bg-card p-6">
          <Award className="size-10 shrink-0 text-primary" />
          <p className="font-bold">مشروع مبتكر (القرار الوزاري 1275 - <span dir="ltr">Label Projet Innovant</span>)</p>
        </div>
        <div className="flex items-center gap-4 rounded-3xl border-2 border-eco/30 bg-eco/10 p-6">
          <Leaf className="size-10 shrink-0 text-eco" />
          <p className="font-bold">نقل أخضر مستدام يقلل انبعاثات ثاني أكسيد الكربون عبر تعبئة الشاحنات الفارغة.</p>
        </div>
      </div>
    </section>
  );
}

export function PageHero({ title, desc }: { title: string; desc: string }) {
  return (
    <section className="bg-hero px-4 py-14 text-center text-primary-foreground">
      <h1 className="text-3xl font-black sm:text-5xl">{title}</h1>
      <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/80">{desc}</p>
      <div className="mx-auto mt-8 max-w-5xl text-start"><SearchBox /></div>
    </section>
  );
}
