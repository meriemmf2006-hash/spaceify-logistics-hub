import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { MapPin, ExternalLink } from "lucide-react";
import type { LatLng } from "@/lib/geo";

type Pin = { id: string; title: string; pos: LatLng; label: string };

declare global {
  interface Window {
    __spaceifyMapsReady?: () => void;
    google?: any;
  }
}

let loader: Promise<void> | null = null;
function loadMaps(): Promise<void> {
  if (window.google?.maps?.Map) return Promise.resolve();
  const env = import.meta.env;
  const apiKey = env["VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY"];
  if (!apiKey) return Promise.reject(new Error("Missing Google Maps API key"));
  if (loader) return loader;
  loader = new Promise((resolve, reject) => {
    window.__spaceifyMapsReady = () => resolve();
    const s = document.createElement("script");
    s.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&loading=async&callback=__spaceifyMapsReady&language=ar&region=DZ&channel=${env["VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_TRACKING_ID"] ?? ""}`;
    s.async = true;
    s.onerror = reject;
    document.head.appendChild(s);
  });
  return loader;
}

export default function SpacesMap({
  pins,
  user,
}: {
  pins: Pin[];
  user: LatLng | null;
}) {
  const el = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const markers = useRef<any[]>([]);
  const navigate = useNavigate();
  const [mapFailed, setMapFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    loadMaps()
      .then(() => {
        if (cancelled || !el.current) return;
        setMapFailed(false);
        const g = window.google.maps;
        map.current ??= new g.Map(el.current, {
          center: { lat: 34.5, lng: 3.5 },
          zoom: 5,
          clickableIcons: false,
          mapTypeControl: false,
          streetViewControl: false,
        });
        markers.current.forEach((m) => m.setMap(null));
        const bounds = new g.LatLngBounds();
        markers.current = pins.map((p) => {
          const m = new g.Marker({
            position: p.pos,
            map: map.current,
            title: p.title,
            label: {
              text: p.label,
              color: "#fff",
              fontSize: "11px",
              fontWeight: "700",
            },
          });
          m.addListener("click", () =>
            navigate({ to: "/spaces/$id", params: { id: p.id } })
          );
          bounds.extend(p.pos);
          return m;
        });
        if (user) {
          markers.current.push(
            new g.Marker({
              position: user,
              map: map.current,
              title: "موقعك الحالي",
              icon: {
                path: g.SymbolPath.CIRCLE,
                scale: 9,
                fillColor: "#14b8a6",
                fillOpacity: 1,
                strokeColor: "#fff",
                strokeWeight: 3,
              },
            })
          );
          bounds.extend(user);
        }
        if (pins.length) map.current.fitBounds(bounds, 40);
      })
      .catch(() => {
        if (!cancelled) setMapFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [pins, user, navigate]);

  if (mapFailed) {
    return (
      <div
        className="flex min-h-80 w-full flex-col justify-between rounded-3xl border bg-muted/60 p-5 sm:min-h-96"
        aria-label="قائمة مواقع المساحات"
      >
        <div className="flex items-center justify-between gap-2 border-b pb-3">
          <div className="flex items-center gap-2 font-bold text-primary">
            <MapPin className="size-5 text-accent" />
            <span>مواقع المساحات المتاحة ({pins.length})</span>
          </div>
          {user && (
            <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-medium text-primary">
              تم تحديد موقعك الحالي
            </span>
          )}
        </div>

        <div className="my-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {pins.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between gap-3 rounded-2xl border bg-card p-3 shadow-xs"
            >
              <button
                type="button"
                onClick={() =>
                  navigate({ to: "/spaces/$id", params: { id: p.id } })
                }
                className="text-start transition-colors hover:text-primary"
              >
                <span className="block text-sm font-bold">{p.title}</span>
                <span className="text-xs text-muted-foreground">{p.label}</span>
              </button>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${p.pos.lat},${p.pos.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`فتح موقع ${p.title} في خرائط جوجل`}
                className="rounded-full border p-2 text-primary transition-colors hover:bg-secondary"
              >
                <ExternalLink className="size-4" />
              </a>
            </div>
          ))}
        </div>

        <p className="text-xs text-muted-foreground">
          اضغط على أي مساحة لعرض تفاصيلها، أو افتح موقعها مباشرة في خرائط جوجل.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={el}
      className="h-80 w-full overflow-hidden rounded-3xl border bg-muted sm:h-96"
      aria-label="خريطة المساحات"
    />
  );
}