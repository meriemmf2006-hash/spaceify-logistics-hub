import { createFileRoute } from "@tanstack/react-router";
import { B2B, TechAndBadges } from "@/components/site/Sections";

export const Route = createFileRoute("/partners")({
  head: () => ({
    meta: [
      { title: "المحلات والشركاء B2B | Spaceify" },
      { name: "description", content: "بوابة محلات الأثاث والأجهزة لطلب سائق توصيل فوري لزبائنهم." },
      { property: "og:title", content: "المحلات والشركاء | Spaceify" },
      { property: "og:description", content: "توصيل مباشر لمشتريات زبائن المحلات عبر أسطول المركبات النفعية." },
    ],
  }),
  component: () => (<><B2B /><div className="pt-20" /><TechAndBadges /></>),
});
