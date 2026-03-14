"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter, usePathname } from "@/i18n/routing";
import { useParams } from "next/navigation";

export default function Footer() {
  const t = useTranslations("Footer");
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const handleLanguageSwitch = (newLocale: string) => {
    // @ts-expect-error - dynamic params issue in type definition
    router.replace({ pathname, params }, { locale: newLocale });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="footer" className="w-full relative bg-neutral-950/80 backdrop-blur-xl border-t border-white/5 py-10 md:py-12 px-4 sm:px-6 md:px-12 z-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
        
        {/* Left: Logo & Copyright */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <Link href="/" className="text-2xl font-black text-white tracking-widest uppercase">
            LEKTOR
          </Link>
          <p className="text-zinc-500 text-sm font-medium">
            {t("copyright")}
          </p>
        </div>

        
        {/* Middle: Minimal Contact Info */}
        <div className="flex flex-col items-center gap-3 text-sm text-zinc-400">
          <a
            href="mailto:hello@skrytyva.com"
            className="hover:text-white transition-colors py-2 px-4 rounded-xl hover:bg-white/5 min-h-[44px] flex items-center"
          >
            hello@skrytyva.com
          </a>
          <a
            href="tel:+48123456789"
            className="hover:text-white transition-colors py-2 px-4 rounded-xl hover:bg-white/5 min-h-[44px] flex items-center"
          >
            +48 123 456 789
          </a>
        </div>

        {/* Right: Language Switcher & Back to Top */}
        <div className="flex flex-col items-center md:items-end gap-6">
          
          {/* Subtle Language Switcher */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-zinc-600 uppercase tracking-wider">{t("language")}</span>
            <div className="flex gap-1 p-1 bg-white/5 rounded-lg border border-white/10">
              <button
                onClick={() => handleLanguageSwitch("pl")}
                className={`min-w-[44px] min-h-[44px] px-3 text-xs font-bold rounded-md transition-all ${params.locale === "pl" ? "bg-white text-black" : "text-zinc-400 hover:text-white"}`}
              >
                PL
              </button>
              <button
                onClick={() => handleLanguageSwitch("en")}
                className={`min-w-[44px] min-h-[44px] px-3 text-xs font-bold rounded-md transition-all ${params.locale === "en" ? "bg-white text-black" : "text-zinc-400 hover:text-white"}`}
              >
                EN
              </button>
            </div>
          </div>

          <button 
            onClick={scrollToTop}
            className="text-xs font-semibold uppercase tracking-wider text-emerald-500 hover:text-emerald-400 transition-colors"
          >
            {t("backToTop")} ↑
          </button>
        </div>

      </div>
    </footer>
  );
}
