import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Listings } from "@/components/site/Sections";

export const Route = createFileRoute("/local")({
  head: () => ({
    meta: [
      { title: "النقل المحلي ونقل البضائع | Spaceify" },
      {
        name: "description",
        content:
          "مركبات نفعية للنقل المحلي وتوصيل مختلف أنواع السلع والبضائع، مواد البناء، والسلع الخاصة بأسعار شفافة.",
      },
      { property: "og:title", content: "النقل المحلي ونقل البضائع | Spaceify" },
      {
        property: "og:description",
        content: "اطلب مركبة نقل محلية فوراً في ولايتك حسب نوع السلعة.",
      },
    ],
  }),
  component: () => (
    <>
      <PageHero
        title="🛻 النقل المحلي ونقل البضائع"
        desc="خدمة نقل وتوصيل محلية مرنة لمختلف أنواع السلع، مواد البناء، السلع الخاصة، وتوصيل المحلات بأسعار واضحة."
      />
      <Listings only="local" />
    </>
  ),
});