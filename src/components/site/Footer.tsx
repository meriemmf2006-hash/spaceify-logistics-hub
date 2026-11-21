import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { Logo, navLinks } from "./Header";

// رقم واتساب للتواصل المباشر بالصيغة الدولية بدون أصفار بادئة أو علامة +
const WHATSAPP_NUMBER = "213667219255";

function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function Footer() {
  const whatsappMessage =
    "مرحباً منصة Spaceify، أود التواصل معكم بخصوص التخزين أو الرحلات اللوجستية.";

  return (
    <footer className="bg-navy-deep text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <div className="inline-block rounded-2xl bg-card p-2 pe-4">
            <Logo />
          </div>
          <p className="text-sm leading-relaxed text-primary-foreground/75">
            نربط المستودعات الفارغة والرحلات المتاحة بالمتاجر والعملاء بسهولة ووضوح؛ من التخزين إلى التوصيل في خطوات بسيطة.
          </p>
        </div>

        <div>
          <h4 className="mb-4 font-bold">روابط سريعة</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/75">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-accent">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-bold">حسابي</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/75">
            <li>لوحة التحكم</li>
            <li>عروضي وإعلاناتي</li>
            <li>طلباتي ورحلاتي</li>
            <li>شروط الاستخدام</li>
            <li>سياسة الخصوصية</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-bold">تواصل معنا</h4>
          <ul className="space-y-3 text-sm text-primary-foreground/75">
            <li>
              <a
                href="tel:+213667219255"
                className="flex items-center gap-2 transition-colors hover:text-accent"
              >
                <Phone className="size-4 shrink-0 text-accent" />
                <span dir="ltr">+213 667 21 92 55</span>
              </a>
            </li>
            <li>
              <a
                href="mailto:contact@spaceify.dz"
                className="flex items-center gap-2 transition-colors hover:text-accent"
              >
                <Mail className="size-4 shrink-0 text-accent" />
                <span>contact@spaceify.dz</span>
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="size-4 shrink-0 text-accent" />
              <span>الجزائر العاصمة، الجزائر</span>
            </li>
            <li className="pt-1">
              <a
                href={buildWhatsAppUrl(whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-primary-foreground/20 px-3 py-1.5 text-xs font-bold text-primary-foreground transition-colors hover:border-accent hover:text-accent"
              >
                <MessageCircle className="size-4 text-accent" />
                تواصل عبر واتساب
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10 py-5 text-center text-sm text-primary-foreground/65">
        © Spaceify 2026 — جميع الحقوق محفوظة
      </div>
    </footer>
  );
}