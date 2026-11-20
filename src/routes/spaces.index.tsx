import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Ruler, Star, Plus } from "lucide-react";
import { PageHero } from "@/components/site/Sections";
import { Button } from "@/components/ui/button";
import { useAllSpaces, statusLabels } from "@/lib/spaces";

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
  const { all } = useAllSpaces();
  return (
    <>
      <PageHero title="🏢 خزّن بضائعك بأمان" desc="استأجر المستودعات والمرائب وغرف التخزين للمدة التي تناسبك، يومياً أو شهرياً." />
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 pt-10">
        <h2 className="text-xl font-black text-primary">المساحات المتاحة ({all.length})</h2>
        <Button asChild variant="brand"><Link to="/spaces/new"><Plus />أضف مساحتك</Link></Button>
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
