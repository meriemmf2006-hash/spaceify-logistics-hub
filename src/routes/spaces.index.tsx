import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense, useMemo } from "react";
import { ClientOnly } from "@tanstack/react-router";
import { toast } from "sonner";
import { MapPin, Ruler, Star, Plus, LocateFixed, Navigation } from "lucide-react";
import { distanceKm, useUserLocation } from "@/lib/geo";
import { PageHero } from "@/components/site/Sections";
import { Button } from "@/components/ui/button";
import { useAllSpaces, statusLabels, spacePos } from "@/lib/spaces";

const SpacesMap = lazy(() => import("@/components/site/SpacesMap"));

export const Route = createFileRoute("/spaces/")({
  head: () => ({
    meta: [
      { title: "المساحات والتخزين | Spaceify" },
      { name: "description", content: "استأجر مستودعات ومرائب وغرف تخزين بالمدة اليومية أو الشهرية في مختلف الولايات." },
      { property: "og:title", content: "المساحات والتخزين | Spaceify" },
      { property: "og:description", content: "استعرض مساحات التخزين المتاحة في الجزائر أو أضف مساحتك." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SpacesPage,
});

function SpacesPage() {
  const { all: raw } = useAllSpaces();
  const { pos, status, locate } = useUserLocation();
  const all = useMemo(() => {
    const withD = raw.map((s) => ({ ...s, km: pos ? distanceKm(pos, spacePos(s)) : null }));
    return pos ? withD.sort((a, b) => a.km! - b.km!) : withD;
  }, [raw, pos]);
  const pins = useMemo(() => all.map((s) => ({ id: s.id, title: s.title, pos: spacePos(s), label: `${Math.round(s.pricePerMonth / 1000)}k` })), [all]);
  const findNearest = async () => {
    const p = await locate();
    if (p) toast.success("تم تحديد موقعك، رُتّبت المساحات من الأقرب إلى الأبعد");
    else toast.error("تعذّر تحديد موقعك. يرجى السماح للمتصفح بالوصول إلى الموقع الجغرافي.");
  };
  return (
    <>
      <PageHero title="🏢 خزّن بضائعك بأمان" desc="استأجر المستودعات والمرائب وغرف التخزين للمدة التي تناسبك، يومياً أو شهرياً." />
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 pt-10">
        <h2 className="text-xl font-black text-primary">المساحات المتاحة ({all.length})</h2>
        <div className="flex flex-wrap gap-2">
          <Button variant="brandOutline" onClick={findNearest} disabled={status === "loading"}>
            <LocateFixed />{status === "loading" ? "جارٍ تحديد موقعك..." : pos ? "تحديث موقعي" : "المساحات الأقرب إليّ"}
          </Button>
          <Button asChild variant="brand"><Link to="/spaces/new"><Plus />أضف مساحتك</Link></Button>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 pt-6">
        <ClientOnly fallback={<div className="h-80 rounded-3xl bg-muted sm:h-96" />}>
          <Suspense fallback={<div className="h-80 rounded-3xl bg-muted sm:h-96" />}><SpacesMap pins={pins} user={pos} /></Suspense>
        </ClientOnly>
      </div>
      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:grid-cols-2 lg:grid-cols-3">
        {all.map((s) => (
          <Link key={s.id} to="/spaces/$id" params={{ id: s.id }}
            className="glass group overflow-hidden rounded-3xl transition-transform hover:-translate-y-1">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img src={s.images[0]} alt={s.title} loading="lazy" width={1024} height={768}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <span className="absolute start-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">{s.type}</span>
              <span className={`absolute end-3 top-3 rounded-full px-3 py-1 text-xs font-bold ${s.status === "review" ? "bg-card text-primary" : "bg-eco text-primary-foreground"}`}>
                {s.status === "review" ? "⏳ " : "● "}{statusLabels[s.status]}
              </span>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-black text-primary">{s.title}</h3>
              <div className="mt-2 flex flex-wrap gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin className="size-4 text-accent" />{s.wilaya}{s.region ? ` - ${s.region}` : ""}</span>
                <span className="flex items-center gap-1"><Ruler className="size-4 text-accent" />{s.area} م²</span>
                {s.km != null && <span className="flex items-center gap-1 font-bold text-primary"><Navigation className="size-4 text-accent" />{s.km < 1 ? "أقل من 1" : Math.round(s.km)} كم</span>}
                {!s.userAdded && <span className="flex items-center gap-1"><Star className="size-4 text-accent" />{s.rating}</span>}
              </div>
              <p className="mt-3 font-black text-accent">{s.pricePerMonth.toLocaleString("fr-DZ")} دج / الشهر</p>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
