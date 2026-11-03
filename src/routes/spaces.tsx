import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Listings } from "@/components/site/Sections";

export const Route = createFileRoute("/spaces")({
  head: () => ({
    meta: [
      { title: "المساحات والتخزين | Spaceify" },
      { name: "description", content: "استأجر مستودعات وكراجات ومحلات للتخزين المؤقت باليوم أو الشهر في كل الولايات." },
      { property: "og:title", content: "المساحات والتخزين | Spaceify" },
      { property: "og:description", content: "خبي سلعتك: مستودعات وكراجات للتخزين في الجزائر." },
    ],
  }),
  component: () => (<><PageHero title="🏢 خبي سلعتك" desc="كراء واستئجار المستودعات، الكراجات، والمحلات للتخزين المؤقت باليوم أو الشهر." /><Listings only="space" /></>),
});
