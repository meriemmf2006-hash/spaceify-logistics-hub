import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Listings } from "@/components/site/Sections";

export const Route = createFileRoute("/trucks")({
  head: () => ({
    meta: [
      { title: "الرحلات الفارغة بين الولايات | Spaceify" },
      { name: "description", content: "رجعة عامرة: انقل بضائعك في رحلات عودة الشاحنات بأقل تكلفة." },
      { property: "og:title", content: "الرحلات الفارغة | Spaceify" },
      { property: "og:description", content: "شاحنات عائدة بين الولايات بتخفيضات تصل إلى 50%." },
    ],
  }),
  component: () => (<><PageHero title="🚛 رجعة عامرة" desc="استغل رحلات العودة للشاحنات الكبرى لنقل بضائعك بأقل تكلفة وتقليل انبعاثات الكربون." /><Listings only="truck" /></>),
});
