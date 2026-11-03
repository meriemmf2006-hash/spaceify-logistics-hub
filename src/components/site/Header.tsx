import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/spaceify-logo.png.asset.json";

export const navLinks = [
  { to: "/", label: "الرئيسية" },
  { to: "/spaces", label: "المساحات والتخزين" },
  { to: "/trucks", label: "الرحلات الفارغة" },
  { to: "/local", label: "النقل المحلي والرحول" },
  { to: "/partners", label: "المحلات والشركاء" },
] as const;

export function Logo() {
  return (
    <Link to="/" className="flex shrink-0 items-center gap-2">
      <img src={logo.url} alt="شعار Spaceify" className="h-11 w-11 rounded-xl bg-card object-contain" />
      <span className="leading-tight">
        <span className="block font-display text-lg font-extrabold text-primary" dir="ltr">
          Space<span className="text-accent">ify</span>
        </span>
        <span className="block text-xs text-muted-foreground">سبيسفاي</span>
      </span>
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
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
          <Button variant="brandOutline" size="sm"><Plus />إضافة عرض (مساحة / مركبة)</Button>
          <Button variant="accent" size="sm">تسجيل الدخول</Button>
        </div>
        <button className="rounded-lg p-2 text-primary lg:hidden" onClick={() => setOpen(!open)} aria-label="القائمة">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="border-t px-4 pb-4 lg:hidden">
          <nav className="flex flex-col py-2">
            {navLinks.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 font-medium hover:bg-secondary">
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="grid gap-2">
            <Button variant="brandOutline"><Plus />إضافة عرض (مساحة / مركبة)</Button>
            <Button variant="accent">تسجيل الدخول</Button>
          </div>
        </div>
      )}
    </header>
  );
}
