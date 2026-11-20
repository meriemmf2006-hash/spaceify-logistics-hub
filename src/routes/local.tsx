import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Listings } from "@/components/site/Sections";

export const Route = createFileRoute("/local")({
  head: () => ({
    meta: [
      { title: "النقل المحلي ونقل الأثاث | Spaceify" },
      { name: "description", content: "مركبات نفعية لتوصيل الأثاث والتجهيزات ونقل أثاث المنازل بأسعار شفافة." },
      { property: "og:title", content: "النقل المحلي ونقل الأثاث | Spaceify" },
      { property: "og:description", content: "اطلب مركبة نقل محلية فوراً في ولايتك." },
    ],
  }),
  component: () => (<><PageHero title="🛻 النقل والتوصيل" desc="خدمة التوصيل الفوري لأصحاب محلات الأثاث والتجهيزات ونقل أثاث المنازل بأسعار واضحة." /><Listings only="local" /></>),
});
