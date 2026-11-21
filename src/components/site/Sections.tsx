import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  Search,
  Warehouse,
  Truck,
  Package,
  Bell,
  Smartphone,
  Award,
  Leaf,
  MapPin,
  ArrowLeft,
  Send,
  Star,
  Plus,
  X,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// غيّري هذا الرقم إلى رقم واتساب الخاص بالمنصة بالصيغة الدولية بدون أصفار بادئة أو علامة + (مثال: 213550123456)
const WHATSAPP_NUMBER = "213550000000";

function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

const wilayas = [
  "الجزائر العاصمة",
  "وهران",
  "قسنطينة",
  "باتنة",
  "الجلفة",
  "سطيف",
  "عنابة",
  "البليدة",
  "تلمسان",
  "ورقلة",
  "بسكرة",
  "بجاية",
];

const field =
  "h-12 w-full rounded-xl border bg-card px-3 text-sm outline-none focus:ring-2 focus:ring-ring";

function Sel({ label, options }: { label: string; options: string[] }) {
  return (
    <label className="block text-xs font-semibold text-muted-foreground">
      {label}
      <select className={`${field} mt-1 text-foreground`}>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

const tabs = [
  { id: "space", icon: "🏢", label: "التخزين والمساحات" },
  { id: "truck", icon: "🚛", label: "شحن بين الولايات" },
  { id: "local", icon: "🛻", label: "النقل المحلي" },
] as const;

export function SearchBox() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("space");
  return (
    <div className="glass rounded-3xl p-3 text-foreground sm:p-5">
      <div className="mb-4 grid grid-cols-3 gap-1 rounded-2xl bg-muted p-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`rounded-xl px-2 py-2.5 text-xs font-bold transition-all sm:text-sm ${
              tab === t.id
                ? "bg-brand text-primary-foreground shadow-glow"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            <span className="me-1">{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:items-end">
        {tab === "space" && (
          <>
            <Sel label="الولاية" options={wilayas} />
            <Sel
              label="نوع المساحة"
              options={["مستودع", "غرفة تخزين", "مرآب", "مساحة لوجستية"]}
            />
            <Sel label="مدة التأجير" options={["يومي", "شهري"]} />
          </>
        )}
        {tab === "truck" && (
          <>
            <Sel label="ولاية الانطلاق" options={wilayas} />
            <Sel label="ولاية الوصول" options={[...wilayas].reverse()} />
            <Sel
              label="نوع البضاعة أو الحجم"
              options={[
                "طرود صغيرة",
                "منصات (باليت)",
                "أقل من 2 طن",
                "2 - 5 طن",
                "أكثر من 5 طن",
              ]}
            />
          </>
        )}
        {tab === "local" && (
          <>
            <Sel
              label="نوع الخدمة"
              options={[
                "توصيل أثاث وتجهيزات محلات",
                "نقل أثاث المنازل",
                "توصيل سريع",
              ]}
            />
            <label className="block text-xs font-semibold text-muted-foreground sm:col-span-2">
              الموقع
              <div className="relative mt-1">
                <MapPin className="absolute start-3 top-1/2 size-4 -translate-y-1/2 text-accent" />
                <input
                  className={`${field} ps-9`}
                  placeholder="الحي، البلدية، الولاية"
                />
              </div>
            </label>
          </>
        )}
        <Button
          type="button"
          variant="brand"
          className="h-12 w-full"
          onClick={() =>
            toast.success("جارٍ البحث عن أفضل العروض المتاحة القريبة منك.")
          }
        >
          <Search />
          ابحث
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
            كل مساحة غير مستغلة فرصة... وكل رحلة توفر لك
          </span>
          <h1 className="mt-6 text-3xl font-black leading-tight sm:text-5xl lg:text-6xl">
            <span dir="ltr">Spaceify</span>: المنصة اللوجستية التشاركية{" "}
            <span className="text-accent">الأولى في الجزائر</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-primary-foreground/80 sm:text-lg">
            نربط أصحاب البضائع بالشاحنات العائدة فارغة وبالمساحات غير
            المستغلة، لتوفير نقل وتخزين أسرع وأكثر كفاءة للتجار والمحلات
            والأفراد.
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-5xl">
          <SearchBox />
        </div>
        <div className="mx-auto mt-8 grid max-w-3xl grid-cols-3 gap-3 text-center">
          {[
            ["+1,200", "مساحة متاحة"],
            ["+850", "شاحنة وسائق"],
            ["58", "ولاية مغطاة"],
          ].map(([n, l]) => (
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

const SectionTitle = ({
  kicker,
  title,
  desc,
}: {
  kicker: string;
  title: string;
  desc?: string;
}) => (
  <div className="mx-auto mb-10 max-w-2xl text-center">
    <span className="text-sm font-bold text-accent">{kicker}</span>
    <h2 className="mt-2 text-2xl font-black text-primary sm:text-4xl">
      {title}
    </h2>
    {desc && <p className="mt-3 text-muted-foreground">{desc}</p>}
  </div>
);

export function Modules() {
  const items = [
    {
      icon: Warehouse,
      e: "🏢",
      t: "خزّن بضائعك",
      s: "المساحات الثابتة",
      d: "استئجار المستودعات والمرائب وغرف التخزين للتخزين المؤقت، بشكل يومي أو شهري.",
      b: "استعرض المساحات المتاحة",
      to: "/spaces" as const,
    },
    {
      icon: Truck,
      e: "🚛",
      t: "رحلات العودة",
      s: "الرحلات الفارغة بين الولايات",
      d: "انقل بضائعك على متن الشاحنات العائدة بين الولايات بتكلفة أقل وأثر بيئي أفضل.",
      b: "استعرض الشاحنات العائدة",
      to: "/trucks" as const,
    },
    {
      icon: Package,
      e: "🛻",
      t: "نقل وتوصيل",
      s: "شاحنات خفيفة ومركبات نفعية",
      d: "توصيل مباشر لمحلات الأثاث والتجهيزات، ونقل أثاث المنازل للأفراد بأسعار واضحة.",
      b: "اطلب مركبة نقل",
      to: "/local" as const,
    },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <SectionTitle kicker="الأقسام الرئيسية" title="ثلاث خدمات، منصة واحدة" />
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((i) => (
          <div
            key={i.t}
            className="glass group relative overflow-hidden rounded-3xl p-7 transition-transform hover:-translate-y-1"
          >
            <div className="bg-brand absolute -end-10 -top-10 size-32 rounded-full opacity-10 transition-opacity group-hover:opacity-20" />
            <div className="bg-brand mb-5 grid size-14 place-items-center rounded-2xl text-primary-foreground shadow-glow">
              <i.icon className="size-7" />
            </div>
            <h3 className="text-xl font-black text-primary">
              {i.e} {i.t}
            </h3>
            <p className="text-sm font-bold text-accent">({i.s})</p>
            <p className="mt-3 min-h-16 text-muted-foreground">{i.d}</p>
            <Button asChild variant="brandOutline" className="mt-6 w-full">
              <Link to={i.to}>
                {i.b}
                <ArrowLeft />
              </Link>
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}

export function B2B() {
  const [loading, setLoading] = useState(false);
  const [shopInfo, setShopInfo] = useState("");
  const [address, setAddress] = useState("");
  const [vehicle, setVehicle] = useState("شاحنة خفيفة DFSK");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("تم إرسال طلبك بنجاح إلى أقرب خمسة سائقين", {
        description: "ستتلقى رداً خلال دقائق معدودة",
      });
      setTimeout(
        () =>
          toast(
            "قبل سائق طلبك وهو على بعد 2.3 كم، والوصول المتوقع خلال 15 دقيقة"
          ),
        1400
      );
    }, 900);
  };

  const sendViaWhatsApp = () => {
    const text = `مرحباً منصة Spaceify، أرغب في طلب توصيل سريع:\n- المحل والهاتف: ${
      shopInfo || "غير محدد"
    }\n- عنوان التوصيل: ${address || "غير محدد"}\n- نوع المركبة: ${vehicle}`;
    window.open(buildWhatsAppUrl(text), "_blank", "noopener,noreferrer");
  };

  return (
    <section className="bg-hero py-20 text-primary-foreground">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 lg:grid-cols-2">
        <div>
          <span className="glass-dark rounded-full px-3 py-1 text-sm font-bold">
            بوابة محلات الأثاث والتجهيزات
          </span>
          <h2 className="mt-4 text-2xl font-black sm:text-4xl">
            خدمة التوصيل المباشر للمحلات التجارية{" "}
            <span dir="ltr" className="text-accent">
              (B2B2C)
            </span>
          </h2>
          <p className="mt-4 text-primary-foreground/80">
            نربط محلات الأثاث والأجهزة الكهرومنزلية ومواد البناء بأسطول من
            المركبات النفعية لتوصيل مشتريات الزبائن بسرعة وموثوقية.
          </p>
          <ul className="mt-6 space-y-2 text-sm">
            {[
              "تتبع مباشر لحالة التوصيل",
              "تسعيرة واضحة قبل التأكيد",
              "فوترة شهرية منظمة للمحلات الشريكة",
            ].map((x) => (
              <li key={x} className="flex items-center gap-2">
                <Star className="size-4 text-accent" />
                {x}
              </li>
            ))}
          </ul>
        </div>
        <form
          onSubmit={submit}
          className="glass rounded-3xl p-6 text-foreground"
        >
          <h3 className="mb-4 text-lg font-black text-primary">
            طلب توصيل سريع
          </h3>
          <div className="grid gap-3">
            <input
              required
              value={shopInfo}
              onChange={(e) => setShopInfo(e.target.value)}
              className={field}
              placeholder="اسم المحل ورقم هاتف الزبون"
            />
            <input
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={field}
              placeholder="عنوان التوصيل"
            />
            <select
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
              className={field}
            >
              {["شاحنة خفيفة DFSK", "N300", "Master", "Partner"].map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
            <Button
              type="submit"
              variant="brand"
              className="h-12"
              disabled={loading}
            >
              <Send />
              {loading ? "جارٍ الإرسال..." : "اطلب سائق توصيل"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-11 gap-2"
              onClick={sendViaWhatsApp}
            >
              <MessageCircle className="size-4" />
              إرسال تفاصيل الطلب عبر واتساب
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

type ListingItem = {
  id: string;
  t: string;
  p: string;
  tag: string;
  icon: typeof Warehouse;
};

const initialListings: Record<"space" | "truck" | "local", ListingItem[]> = {
  space: [
    {
      id: "sp-1",
      t: "مستودع 120 م² مغطى ومؤمّن - الجلفة",
      p: "1500 دج / اليوم",
      tag: "مساحة",
      icon: Warehouse,
    },
    {
      id: "sp-2",
      t: "مرآب 40 م² للتخزين - سطيف",
      p: "18000 دج / الشهر",
      tag: "مساحة",
      icon: Warehouse,
    },
  ],
  truck: [
    {
      id: "tr-1",
      t: "شاحنة 10 أطنان عائدة من باتنة إلى وهران (متبقي 4 أطنان)",
      p: "تخفيض 40%",
      tag: "رحلة عودة",
      icon: Truck,
    },
    {
      id: "tr-2",
      t: "شاحنة 20 طناً عائدة من ورقلة إلى الجزائر (فارغة بالكامل)",
      p: "تخفيض 50%",
      tag: "رحلة عودة",
      icon: Truck,
    },
  ],
  local: [
    {
      id: "lc-1",
      t: "مركبة Master جاهزة لنقل الأثاث - الجزائر العاصمة",
      p: "متاح الآن",
      tag: "نقل محلي",
      icon: Package,
    },
    {
      id: "lc-2",
      t: "شاحنة خفيفة DFSK للتوصيل السريع - وهران",
      p: "ابتداءً من 1200 دج",
      tag: "نقل محلي",
      icon: Package,
    },
  ],
};

export function Listings({ only }: { only?: "space" | "truck" | "local" }) {
  const [tab, setTab] = useState<"space" | "truck" | "local">(only ?? "space");
  const [itemsByTab, setItemsByTab] = useState(initialListings);
  const [showAddModal, setShowAddModal] = useState(false);

  // حقول نموذج إضافة عرض أو مساحة جديدة
  const [title, setTitle] = useState("");
  const [wilaya, setWilaya] = useState(wilayas[0]);
  const [price, setPrice] = useState("");

  const labels = {
    space: "🏢 المساحات",
    truck: "🚛 الشاحنات",
    local: "🛻 النقل المحلي",
  };

  const defaultTag = {
    space: "مساحة",
    truck: "رحلة عودة",
    local: "نقل محلي",
  }[tab];

  const defaultIcon = {
    space: Warehouse,
    truck: Truck,
    local: Package,
  }[tab];

  const handleAddListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !price.trim()) return;

    const newItem: ListingItem = {
      id: `${tab}-${Date.now()}`,
      t: `${title.trim()} - ${wilaya}`,
      p: price.trim(),
      tag: defaultTag,
      icon: defaultIcon,
    };

    setItemsByTab((prev) => ({
      ...prev,
      [tab]: [newItem, ...prev[tab]],
    }));

    setTitle("");
    setPrice("");
    setShowAddModal(false);
    toast.success("تمت إضافة العرض بنجاح وظهوره في القائمة");
  };

  const handleBookViaWhatsApp = (listing: ListingItem) => {
    const msg = `مرحباً منصة Spaceify، أرغب في حجز هذا العرض:\n- العرض: ${listing.t}\n- السعر/العرض: ${listing.p}`;
    toast.info("جارٍ تحويلك إلى واتساب لإتمام الحجز.");
    window.open(buildWhatsAppUrl(msg), "_blank", "noopener,noreferrer");
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <SectionTitle
        kicker="مباشر الآن"
        title="أحدث العروض المتاحة"
        desc="تصفح العروض الحالية أو أضف مساحة/رحلة جديدة وتواصل مباشرة عبر واتساب."
      />

      <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
        {!only &&
          (Object.keys(labels) as ("space" | "truck" | "local")[]).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setTab(k)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                tab === k
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-primary"
              }`}
            >
              {labels[k]}
            </button>
          ))}

        <Button
          type="button"
          variant="brand"
          size="sm"
          className="rounded-full px-4 py-2"
          onClick={() => setShowAddModal(true)}
        >
          <Plus className="size-4" />
          أضف {defaultTag}
        </Button>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-3xl border bg-card p-6 text-foreground shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-black text-primary">
                إضافة {defaultTag} جديدة
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="rounded-lg p-1 text-muted-foreground hover:bg-muted"
                aria-label="إغلاق"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleAddListing} className="grid gap-3">
              <label className="block text-xs font-semibold text-muted-foreground">
                وصف العرض أو المساحة
                <input
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={`${field} mt-1 text-foreground`}
                  placeholder="مثال: مستودع 150 م² مخصص للتخزين"
                />
              </label>

              <Sel label="الولاية" options={wilayas} />
              <label className="block text-xs font-semibold text-muted-foreground">
                اختر الولاية للتأكيد
                <select
                  value={wilaya}
                  onChange={(e) => setWilaya(e.target.value)}
                  className={`${field} mt-1 text-foreground`}
                >
                  {wilayas.map((w) => (
                    <option key={w} value={w}>
                      {w}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block text-xs font-semibold text-muted-foreground">
                السعر أو نسبة التخفيض
                <input
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className={`${field} mt-1 text-foreground`}
                  placeholder="مثال: 2000 دج / اليوم أو تخفيض 35%"
                />
              </label>

              <div className="mt-2 flex gap-2">
                <Button type="submit" variant="brand" className="h-11 flex-1">
                  نشر العرض الآن
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="h-11"
                  onClick={() => setShowAddModal(false)}
                >
                  إلغاء
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2">
        {itemsByTab[tab].map((l) => (
          <div
            key={l.id}
            className="glass flex flex-col gap-4 rounded-2xl p-5 sm:flex-row sm:items-center"
          >
            <div className="bg-brand grid size-14 shrink-0 place-items-center rounded-2xl text-primary-foreground">
              <l.icon />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 text-xs">
                <span className="rounded-full bg-secondary px-2 py-0.5 font-bold text-primary">
                  {l.tag}
                </span>
                <span className="flex items-center gap-1 text-eco">
                  <span className="size-1.5 animate-pulse rounded-full bg-eco" />
                  مباشر
                </span>
              </div>
              <h3 className="mt-1 font-bold">{l.t}</h3>
              <p className="mt-1 font-black text-accent">{l.p}</p>
            </div>
            <Button
              type="button"
              variant="accent"
              size="sm"
              className="gap-1.5"
              onClick={() => handleBookViaWhatsApp(l)}
            >
              <MessageCircle className="size-4" />
              احجز عبر واتساب
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}

export function TechAndBadges() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-20">
      <SectionTitle
        kicker="التقنية والاستدامة"
        title="ذكية، خفيفة، وصديقة للبيئة"
      />
      <div className="grid gap-5 md:grid-cols-2">
        {[
          {
            i: Bell,
            t: "🔔 إشعارات فورية متقدمة",
            d: "تنبيهات فورية عبر المتصفح والرسائل النصية وواتساب، تُعلم السائقين والمؤجرين بكل طلب قريب منهم.",
          },
          {
            i: Smartphone,
            t: "📱 تطبيق ويب خفيف (PWA)",
            d: "يعمل مباشرة من المتصفح دون الحاجة إلى تنزيل تطبيق، ويمكنك إضافته إلى الشاشة الرئيسية بنقرة واحدة.",
          },
        ].map((c) => (
          <div key={c.t} className="glass flex gap-4 rounded-3xl p-6">
            <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-secondary text-primary">
              <c.i />
            </div>
            <div>
              <h3 className="font-black text-primary">{c.t}</h3>
              <p className="mt-2 text-muted-foreground">{c.d}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <div className="flex items-center gap-4 rounded-3xl border-2 border-primary/20 bg-card p-6">
          <Award className="size-10 shrink-0 text-primary" />
          <p className="font-bold">
            مشروع مبتكر (القرار الوزاري 1275 -{" "}
            <span dir="ltr">Label Projet Innovant</span>)
          </p>
        </div>
        <div className="flex items-center gap-4 rounded-3xl border-2 border-eco/30 bg-eco/10 p-6">
          <Leaf className="size-10 shrink-0 text-eco" />
          <p className="font-bold">
            نقل أخضر مستدام يقلل انبعاثات ثاني أكسيد الكربون عبر استغلال
            الشاحنات الفارغة.
          </p>
        </div>
      </div>
    </section>
  );
}

export function PageHero({ title, desc }: { title: string; desc: string }) {
  return (
    <section className="bg-hero px-4 py-14 text-center text-primary-foreground">
      <h1 className="text-3xl font-black sm:text-5xl">{title}</h1>
      <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/80">
        {desc}
      </p>
      <div className="mx-auto mt-8 max-w-5xl text-start">
        <SearchBox />
      </div>
    </section>
  );
}