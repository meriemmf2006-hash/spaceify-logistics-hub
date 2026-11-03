import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Ruler, Star } from "lucide-react";
import { PageHero } from "@/components/site/Sections";
import { spaces } from "@/lib/spaces";

export const Route = createFileRoute("/spaces/")({
  head: () => ({
    meta: [
      { title: "المساحات والتخزين | Spaceify" },
      { name: "description", content: "استأجر مستودعات وكراجات ومحلات للتخزين المؤقت باليوم أو الشهر في كل الولايات." },
      { property: "og:title", content: "المساحات والتخزين | Spaceify" },
      { property: "og:description", content: "خبي سلعتك: مستودعات وكراجات للتخزين في الجزائر." },
    ],
  }),
  component: SpacesPage,
});

function SpacesPage() {
  return (
    <>
      <PageHero title="🏢 خبي سلعتك" desc="كراء واستئجار المستودعات، الكراجات، والمحلات للتخزين المؤقت باليوم أو الشهر." />
      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-14 sm:grid-cols-2 lg:grid-cols-3">
        {spaces.map((s) => (
          <Link key={s.id} to="/spaces/$id" params={{ id: s.id }}
            className="glass group overflow-hidden rounded-3xl transition-transform hover:-translate-y-1">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img src={s.images[0]} alt={s.title} loading="lazy" width={1024} height={768}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <span className="absolute start-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">{s.type}</span>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-black text-primary">{s.title}</h3>
              <div className="mt-2 flex flex-wrap gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin className="size-4 text-accent" />{s.wilaya}</span>
                <span className="flex items-center gap-1"><Ruler className="size-4 text-accent" />{s.area}م²</span>
                <span className="flex items-center gap-1"><Star className="size-4 text-accent" />{s.rating}</span>
              </div>
              <p className="mt-3 font-black text-accent">{s.pricePerDay.toLocaleString("fr-DZ")} دج / اليوم</p>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
