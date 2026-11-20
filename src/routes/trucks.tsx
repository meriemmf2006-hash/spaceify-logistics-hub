import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Listings } from "@/components/site/Sections";

export const Route = createFileRoute("/trucks")({
  head: () => ({
    meta: [
      { title: "الرحلات الفارغة بين الولايات | Spaceify" },
      { name: "description", content: "رحلات العودة: انقل بضائعك في رحلات عودة الشاحنات بأقل تكلفة." },
      { property: "og:title", content: "الرحلات الفارغة | Spaceify" },
      { property: "og:description", content: "شاحنات عائدة بين الولايات بتخفيضات تصل إلى 50%." },
    ],
  }),
  component: () => (<><PageHero title="🚛 رحلات العودة" desc="انقل بضائعك على متن الشاحنات العائدة بين الولايات بتكلفة أقل وانبعاثات كربونية أدنى." /><Listings only="truck" /></>),
});
