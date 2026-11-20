import { useState } from "react";

export type LatLng = { lat: number; lng: number };

/** Approximate centre of each wilaya used when a space has no exact pin. */
export const wilayaCoords: Record<string, LatLng> = {
  "الجزائر العاصمة": { lat: 36.7538, lng: 3.0588 }, "وهران": { lat: 35.6971, lng: -0.6308 },
  "قسنطينة": { lat: 36.365, lng: 6.6147 }, "باتنة": { lat: 35.5559, lng: 6.1741 },
  "الجلفة": { lat: 34.6728, lng: 3.263 }, "سطيف": { lat: 36.1911, lng: 5.4137 },
  "عنابة": { lat: 36.9, lng: 7.7667 }, "البليدة": { lat: 36.47, lng: 2.8277 },
  "تلمسان": { lat: 34.8783, lng: -1.315 }, "ورقلة": { lat: 31.9493, lng: 5.325 },
  "بسكرة": { lat: 34.8504, lng: 5.7281 }, "بجاية": { lat: 36.7509, lng: 5.0567 },
};

export function distanceKm(a: LatLng, b: LatLng): number {
  const R = 6371, rad = Math.PI / 180;
  const dLat = (b.lat - a.lat) * rad, dLng = (b.lng - a.lng) * rad;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export function nearestWilaya(p: LatLng): string {
  return Object.entries(wilayaCoords).sort((x, y) => distanceKm(p, x[1]) - distanceKm(p, y[1]))[0]![0];
}

export function directionsUrl(p: LatLng) {
  return `https://www.google.com/maps/dir/?api=1&destination=${p.lat},${p.lng}`;
}

/** Ask the browser for the device's GPS position. */
export function useUserLocation() {
  const [pos, setPos] = useState<LatLng | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "denied" | "ok">("idle");
  const locate = () => new Promise<LatLng | null>((resolve) => {
    if (!navigator.geolocation) { setStatus("denied"); return resolve(null); }
    setStatus("loading");
    navigator.geolocation.getCurrentPosition(
      (g) => { const p = { lat: g.coords.latitude, lng: g.coords.longitude }; setPos(p); setStatus("ok"); resolve(p); },
      () => { setStatus("denied"); resolve(null); },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  });
  return { pos, status, locate };
}
