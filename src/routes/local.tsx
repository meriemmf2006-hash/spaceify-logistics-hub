import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Listings } from "@/components/site/Sections";

export const Route = createFileRoute("/local")({
  head: () => ({
    meta: [
      { title: "النقل المحلي والرحول | Spaceify" },
      { name: "description", content: "هاربين وMaster لتوصيل الأثاث والتجهيزات ورحول المنازل بأسعار شفافة." },
      { property: "og:title", content: "النقل المحلي والرحول | Spaceify" },
      { property: "og:description", content: "اطلب مركبة نقل محلية فوراً في ولايتك." },
    ],
  }),
  component: () => (<><PageHero title="🛻 نقل وتوصيل" desc="خدمة التوصيل الفوري لأصحاب محلات الأثاث والتجهيزات ورحول الأفراد بأسعار شفافة." /><Listings only="local" /></>),
});
