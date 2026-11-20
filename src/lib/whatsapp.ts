/** Platform WhatsApp number (international format, digits only). */
export const PLATFORM_WHATSAPP = "213667219255";

/** Normalise an Algerian phone (0555..., +213..., 00213...) to wa.me digits. */
export function toWaNumber(phone: string): string {
  const d = phone.replace(/\D/g, "");
  if (d.startsWith("00213")) return d.slice(2);
  if (d.startsWith("213")) return d;
  if (d.startsWith("0")) return "213" + d.slice(1);
  return d;
}

export function waLink(phone: string, message: string): string {
  return `https://wa.me/${toWaNumber(phone)}?text=${encodeURIComponent(message)}`;
}
