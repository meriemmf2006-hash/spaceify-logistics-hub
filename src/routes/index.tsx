import { createFileRoute } from "@tanstack/react-router";
import { Hero, Modules, B2B, Listings, TechAndBadges } from "@/components/site/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Spaceify سبيسفاي | المنصة اللوجستية التشاركية الأولى في الجزائر" },
      { name: "description", content: "تخزين، رحلات فارغة بين الولايات، ونقل محلي — كل ماهو فارغ رزق." },
      { property: "og:title", content: "Spaceify سبيسفاي | المنصة اللوجستية التشاركية" },
      { property: "og:description", content: "نوصل البضائع، نملأ الشاحنات الفارغة، ونستغل المساحات المغلقة في الجزائر." },
    ],
  }),
  component: () => (<><Hero /><Modules /><B2B /><Listings /><TechAndBadges /></>),
});
