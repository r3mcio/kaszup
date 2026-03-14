"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "@/i18n/routing";
import Cookies from "js-cookie";

export default function LanguageModal() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check if the user has already selected a language
    const hasSelectedLanguage = Cookies.get("NEXT_LOCALE_PROMPT");
    
    if (!hasSelectedLanguage) {
      // Small delay to ensure smooth rendering after initial load
      const timer = setTimeout(() => setIsOpen(true), 150);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSelectLanguage = (locale: "en" | "pl" | "zh" | "ru" | "tr" | "ja" | "de") => {
    // Save preference for 1 year
    Cookies.set("NEXT_LOCALE_PROMPT", "true", { expires: 365 });
    
    // Close modal
    setIsOpen(false);

    // Route to new language
    // @ts-expect-error - params injected by next-intl Router
    router.replace({ pathname }, { locale });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            className="w-full max-w-md bg-white/[0.03] border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden group text-center"
          >
            {/* Subtle internal glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-purple-500/10 opacity-50 pointer-events-none" />
            
            <div className="relative z-10 flex flex-col items-center gap-8">
              
              <div className="space-y-3">
                <h2 className="text-3xl font-black tracking-tight text-white mb-2">
                  Welcome / Witaj
                </h2>
                <p className="text-zinc-400 text-sm md:text-base">
                  Please select your preferred language to continue interacting with Skryty's Portfolio.
                  <br className="hidden md:block" />
                  <span className="opacity-60 text-xs mt-2 block">
                    You can always change it later in the top navigation menu.
                  </span>
                </p>
              </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full mt-4">
                  <button
                    onClick={() => handleSelectLanguage("en")}
                    className="py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                  >
                    English
                  </button>
                  <button
                    onClick={() => handleSelectLanguage("pl")}
                    className="py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                  >
                    Polski
                  </button>
                  <button
                    onClick={() => handleSelectLanguage("de")}
                    className="py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                  >
                    Deutsch
                  </button>
                  <button
                    onClick={() => handleSelectLanguage("ru")}
                    className="py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                  >
                    Русский
                  </button>
                  <button
                    onClick={() => handleSelectLanguage("tr")}
                    className="py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                  >
                    Türkçe
                  </button>
                  <button
                    onClick={() => handleSelectLanguage("zh")}
                    className="py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                  >
                    中文
                  </button>
                  <button
                    onClick={() => handleSelectLanguage("ja")}
                    className="py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] md:col-start-2"
                  >
                    日本語
                  </button>
                </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
