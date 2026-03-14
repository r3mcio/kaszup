"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useRouter, usePathname } from "@/i18n/routing";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiGlobe, FiChevronDown } from "react-icons/fi";

export default function Navigation() {
  const t = useTranslations("Navigation");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLangDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { href: "#home", label: t("home") },
    { href: "#about", label: t("about") },
    { href: "#portfolio", label: t("portfolio") },
    { href: "#contact", label: t("contact") },
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const languageNames: Record<string, string> = {
    en: "English",
    pl: "Polski",
    zh: "中文",
    ru: "Русский",
    tr: "Türkçe",
    ja: "日本語",
    de: "Deutsch"
  };

  const handleLanguageSwitch = (newLocale: string) => {
    // @ts-expect-error - dynamic params issue in type definition
    router.replace({ pathname, params }, { locale: newLocale });
    setIsLangDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-black/85 backdrop-blur-md border-b border-white/10 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center relative min-h-[44px]">

          {/* Desktop Navigation (Floating Pill) */}
          <div className="hidden md:flex items-center justify-center">
            <ul className="flex items-center gap-8 bg-white/5 backdrop-blur-md px-8 py-3 rounded-full border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                    className="text-xs lg:text-sm font-bold tracking-widest uppercase text-zinc-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Utilities - Absolute Right */}
          <div className="absolute right-4 sm:right-6 lg:right-8 flex items-center gap-4">
            {/* Desktop Language Dropdown */}
            <div className="hidden md:block relative" ref={dropdownRef}>
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 text-xs font-bold transition-all text-zinc-300 hover:text-white"
                aria-haspopup="listbox"
                aria-expanded={isLangDropdownOpen}
              >
                <FiGlobe className="w-4 h-4" />
                {t("changeLanguage")}
                <FiChevronDown className={`w-4 h-4 transition-transform duration-300 ${isLangDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              
              <AnimatePresence>
                {isLangDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-3 w-48 py-2 bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] z-50 overflow-hidden"
                    role="listbox"
                  >
                    {Object.entries(languageNames).map(([loc, name]) => (
                      <button
                        key={loc}
                        onClick={() => handleLanguageSwitch(loc)}
                        className={`w-full text-left px-5 py-2.5 text-sm font-medium transition-colors ${
                          params.locale === loc 
                            ? "text-emerald-400 bg-white/5 border-l-2 border-emerald-400" 
                            : "text-zinc-400 hover:text-white hover:bg-white/5 border-l-2 border-transparent"
                        }`}
                        role="option"
                        aria-selected={params.locale === loc}
                      >
                        {name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile: hamburger button */}
            <button
              className="md:hidden flex items-center justify-center w-11 h-11 rounded-xl text-white hover:bg-white/10 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Menu</span>
              {/* Animated hamburger bars */}
              <div className="relative w-6 h-5 flex flex-col justify-between">
                <span className={`block h-0.5 w-full bg-white rounded-full transition-all duration-300 origin-center ${isMobileMenuOpen ? "rotate-45 translate-y-[9px]" : ""}`} />
                <span className={`block h-0.5 bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? "w-0 opacity-0" : "w-full opacity-100"}`} />
                <span className={`block h-0.5 w-full bg-white rounded-full transition-all duration-300 origin-center ${isMobileMenuOpen ? "-rotate-45 -translate-y-[9px]" : ""}`} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* ─── Full-Screen Mobile Overlay ─── */}
      <div
        className={`fixed inset-0 z-40 md:hidden flex flex-col transition-all duration-300 ease-out ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Blurred backdrop */}
        <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" />

        {/* Content slides in from top */}
        <div
          className={`relative z-10 flex flex-col justify-center items-center h-full gap-10 transition-all duration-500 ease-out ${
            isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
          }`}
        >
          {/* Nav Links */}
          <ul className="flex flex-col items-center gap-2 w-full px-8">
            {navLinks.map((link, i) => (
              <li
                key={link.href}
                className="w-full"
                style={{ transitionDelay: isMobileMenuOpen ? `${i * 60}ms` : "0ms" }}
              >
                <a
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className="flex items-center justify-center w-full py-5 text-3xl font-bold text-white hover:text-emerald-400 transition-colors border-b border-white/10 tracking-tight"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Language Dropdown in mobile menu */}
          <div className="w-full px-8 max-w-sm flex flex-col items-center">
            <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center justify-center gap-2 w-full py-4 text-sm font-bold text-zinc-300 hover:text-white border border-white/10 bg-white/5 rounded-2xl transition-all"
              >
                <FiGlobe className="w-5 h-5 text-emerald-400" />
                {t("changeLanguage")}
                <FiChevronDown className={`w-5 h-5 transition-transform duration-300 ${isLangDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {isLangDropdownOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="w-full overflow-hidden flex flex-col items-center gap-2 mt-4"
                >
                  <div className="grid grid-cols-2 gap-3 w-full">
                    {Object.entries(languageNames).map(([loc, name]) => (
                      <button
                        key={loc}
                        onClick={() => handleLanguageSwitch(loc)}
                        className={`py-3 px-4 text-sm font-bold rounded-xl transition-all duration-200 border ${
                          params.locale === loc
                            ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
                            : "bg-white/5 border-white/10 text-zinc-300 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        {name}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
}
