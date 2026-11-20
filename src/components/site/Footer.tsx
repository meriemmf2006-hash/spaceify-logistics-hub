import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";
import { Logo, navLinks } from "./Header";

export function Footer() {
  return (
    <footer className="bg-navy-deep text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <div className="inline-block rounded-2xl bg-card p-2 pe-4"><Logo /></div>
          <p className="text-sm text-primary-foreground/70">كل ماهو فارغ رزق... و كل رحلة تمثل وفرة. من المستودع للرحول، والرزق حاضر!</p>
        </div>
        <div>
          <h4 className="mb-4 font-bold">روابط سريعة</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            {navLinks.map((l) => (
              <li key={l.to}><Link to={l.to} className="hover:text-accent">{l.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-4 font-bold">حسابي</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            <li>لوحة التحكم</li><li>عروضي وإعلاناتي</li><li>طلباتي ورحلاتي</li><li>شروط الاستخدام</li><li>سياسة الخصوصية</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 font-bold">تواصل معنا</h4>
          <ul className="space-y-3 text-sm text-primary-foreground/70">
            <li className="flex items-center gap-2"><Phone className="size-4 text-accent" /><span dir="ltr">+213 667 21 92 55</span></li>
            <li className="flex items-center gap-2"><Mail className="size-4 text-accent" />contact@spaceify.dz</li>
            <li className="flex items-center gap-2"><MapPin className="size-4 text-accent" />الجزائر العاصمة، الجزائر</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 py-5 text-center text-sm text-primary-foreground/60">
        © Spaceify 2026 — جميع الحقوق محفوظة
      </div>
    </footer>
  );
}
