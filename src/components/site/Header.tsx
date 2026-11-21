import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Plus, Bell, MessageCircle } from "lucide-react";
import { useNotifications } from "@/lib/notifications";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo Spaceify.jpg";

// غيّري هذا الرقم إلى رقم واتساب الخاص بالمنصة بالصيغة الدولية بدون أصفار بادئة أو علامة + (مثال: 213550123456)
const WHATSAPP_NUMBER = "213550000000";

function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const navLinks = [
  { to: "/", label: "الرئيسية" },
  { to: "/spaces", label: "المساحات والتخزين" },
  { to: "/trucks", label: "الرحلات الفارغة" },
  { to: "/local", label: "النقل المحلي ونقل الأثاث" },
  { to: "/partners", label: "المحلات والشركاء" },
] as const;

export function Logo() {
  return (
    <Link to="/" className="flex shrink-0 items-center gap-2">
      <img
        src={logo}
        alt="شعار Spaceify"
        className="h-11 w-11 rounded-xl bg-card object-contain"
      />
      <span className="leading-tight">
        <span
          className="block font-display text-lg font-extrabold text-primary"
          dir="ltr"
        >
          Space<span className="text-accent">ify</span>
        </span>
        <span className="block text-xs text-muted-foreground">سبيسفاي</span>
      </span>
    </Link>
  );
}

function BellLink() {
  const { list } = useNotifications();
  const n = list.filter((x) => !x.read).length;
  return (
    <Link
      to="/notifications"
      aria-label="الإشعارات"
      className="relative rounded-full p-2 text-primary hover:bg-secondary"
    >
      <Bell className="size-5" />
      {n > 0 && (
        <span className="absolute -end-0.5 -top-0.5 grid size-5 place-items-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
          {n}
        </span>
      )}
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);

  const whatsappMessage =
    "مرحباً منصة Spaceify، أود الاستفسار عن الخدمات اللوجستية والمساحات المتاحة.";

  return (
    <header className="glass sticky top-0 z-50 border-b">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: true }}
              activeProps={{ className: "bg-secondary text-primary" }}
              className="rounded-full px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <BellLink />
          <a
            href={buildWhatsAppUrl(whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="تواصل عبر واتساب"
            className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold text-primary transition-colors hover:bg-secondary"
          >
            <MessageCircle className="size-4 text-accent" />
            واتساب
          </a>
          <Button asChild variant="brandOutline" size="sm">
            <Link to="/spaces/new">
              <Plus />
              أضف مساحتك
            </Link>
          </Button>
          <Button variant="accent" size="sm">
            تسجيل الدخول
          </Button>
        </div>
        <div className="flex items-center gap-1 lg:hidden">
          <BellLink />
          <button
            type="button"
            className="rounded-lg p-2 text-primary"
            onClick={() => setOpen(!open)}
            aria-label="القائمة"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t px-4 pb-4 lg:hidden">
          <nav className="flex flex-col py-2">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 font-medium hover:bg-secondary"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="grid gap-2">
            <a
              href={buildWhatsAppUrl(whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex h-10 items-center justify-center gap-2 rounded-md border text-sm font-bold text-primary transition-colors hover:bg-secondary"
            >
              <MessageCircle className="size-4 text-accent" />
              تواصل عبر واتساب
            </a>
            <Button asChild variant="brandOutline">
              <Link to="/spaces/new" onClick={() => setOpen(false)}>
                <Plus />
                أضف مساحتك
              </Link>
            </Button>
            <Button variant="accent">تسجيل الدخول</Button>
          </div>
        </div>
      )}
    </header>
  );
}