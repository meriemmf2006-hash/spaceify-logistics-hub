import { useEffect, useRef } from "react";
import { useNavigate } from "@tanstack/react-router";
import type { LatLng } from "@/lib/geo";

type Pin = { id: string; title: string; pos: LatLng; label: string };

declare global { interface Window { __spaceifyMapsReady?: () => void; google?: any } }

let loader: Promise<void> | null = null;
function loadMaps(): Promise<void> {
  if (window.google?.maps?.Map) return Promise.resolve();
  if (loader) return loader;
  loader = new Promise((resolve, reject) => {
    const env = import.meta.env;
    window.__spaceifyMapsReady = () => resolve();
    const s = document.createElement("script");
    s.src = `https://maps.googleapis.com/maps/api/js?key=${env["VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY"]}&loading=async&callback=__spaceifyMapsReady&language=ar&region=DZ&channel=${env["VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_TRACKING_ID"]}`;
    s.async = true; s.onerror = reject;
    document.head.appendChild(s);
  });
  return loader;
}

export default function SpacesMap({ pins, user }: { pins: Pin[]; user: LatLng | null }) {
  const el = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const markers = useRef<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    loadMaps().then(() => {
      if (cancelled || !el.current) return;
      const g = window.google.maps;
      map.current ??= new g.Map(el.current, { center: { lat: 34.5, lng: 3.5 }, zoom: 5, clickableIcons: false, mapTypeControl: false, streetViewControl: false });
      markers.current.forEach((m) => m.setMap(null));
      const bounds = new g.LatLngBounds();
      markers.current = pins.map((p) => {
        const m = new g.Marker({ position: p.pos, map: map.current, title: p.title, label: { text: p.label, color: "#fff", fontSize: "11px", fontWeight: "700" } });
        m.addListener("click", () => navigate({ to: "/spaces/$id", params: { id: p.id } }));
        bounds.extend(p.pos);
        return m;
      });
      if (user) {
        markers.current.push(new g.Marker({ position: user, map: map.current, title: "موقعك الحالي", icon: { path: g.SymbolPath.CIRCLE, scale: 9, fillColor: "#14b8a6", fillOpacity: 1, strokeColor: "#fff", strokeWeight: 3 } }));
        bounds.extend(user);
      }
      if (pins.length) map.current.fitBounds(bounds, 40);
    }).catch(() => { if (el.current) el.current.textContent = "تعذّر تحميل الخريطة."; });
    return () => { cancelled = true; };
  }, [pins, user, navigate]);

  return <div ref={el} className="h-80 w-full overflow-hidden rounded-3xl border bg-muted sm:h-96" aria-label="خريطة المساحات" />;
}
