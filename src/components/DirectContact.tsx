"use client";

import { useTranslations } from "next-intl";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useState } from "react";
import { FiCopy, FiCheck, FiMessageCircle } from "react-icons/fi";

function MagneticButton({ 
  children, 
  className = "", 
  onClick,
  "aria-label": ariaLabel,
}: { children: React.ReactNode; className?: string; onClick?: () => void; "aria-label"?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15 });
  const springY = useSpring(y, { stiffness: 200, damping: 15 });

  return (
    <motion.button
      style={{ x: springX, y: springY }}
      onMouseMove={(e) => {
        const rect = (e.target as HTMLElement).getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set((e.clientX - centerX) * 0.3);
        y.set((e.clientY - centerY) * 0.3);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      whileTap={{ scale: 0.95 }}
      className={className}
      onClick={onClick}
      aria-label={ariaLabel}
      data-cursor-hover
    >
      {children}
    </motion.button>
  );
}

function MagneticAnchor({ 
  children, 
  className = "", 
  href,
  target,
  rel,
}: { children: React.ReactNode; className?: string; href?: string; target?: string; rel?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15 });
  const springY = useSpring(y, { stiffness: 200, damping: 15 });

  return (
    <motion.a
      href={href}
      target={target}
      rel={rel}
      style={{ x: springX, y: springY }}
      onMouseMove={(e) => {
        const rect = (e.target as HTMLElement).getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set((e.clientX - centerX) * 0.25);
        y.set((e.clientY - centerY) * 0.25);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      whileTap={{ scale: 0.95 }}
      className={className}
      data-cursor-hover
    >
      {children}
    </motion.a>
  );
}


export default function DirectContact() {
  const t = useTranslations("DirectContact");
  const [copied, setCopied] = useState(false);
  
  const email = "hello@skrytyva.com";
  const whatsappUrl = "https://wa.me/48123456789?text=Hello%20Skryty_VA!";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy email", err);
    }
  };

  return (
    <section id="contact" className="w-full py-20 md:py-32 px-4 sm:px-6 md:px-12 text-white relative overflow-hidden flex flex-col items-center justify-center min-h-[60vh]">
      {/* Background Subtle Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center gap-12 max-w-4xl mx-auto w-full">
        
        <div className="space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            {t("title")}
          </h2>
          <p className="text-lg text-zinc-400">
            {t("subtitle")}
          </p>
        </div>

        {/* Big Email Button — Magnetic */}
        <MagneticButton 
          onClick={handleCopy}
          aria-label={t("copyEmail")}
          className="group relative flex flex-col items-center gap-4 w-full p-6 md:p-12 rounded-2xl md:rounded-3xl bg-white/[0.02] border border-white/10 hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300 min-h-[44px]"
        >
          <span className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-light tracking-tighter text-white break-all group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all">
            {email}
          </span>
          
          <div className="flex items-center gap-2 text-sm font-medium text-zinc-500 group-hover:text-zinc-300 transition-colors bg-white/5 px-4 py-2 rounded-full backdrop-blur-md">
            {copied ? (
              <>
                <FiCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">{t("copied")}</span>
              </>
            ) : (
              <>
                <FiCopy className="w-4 h-4" />
                <span>{t("copyEmail")}</span>
              </>
            )}
          </div>
        </MagneticButton>

        {/* WhatsApp Link — Magnetic */}
        <MagneticAnchor 
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 px-8 py-4 min-h-[52px] rounded-full bg-emerald-500/10 text-emerald-400 font-semibold hover:bg-emerald-500 hover:text-white border border-emerald-500/20 hover:border-emerald-500 transition-all duration-300 shadow-[0_0_30px_rgba(16,185,129,0)] hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] w-full sm:w-auto"
        >
          <FiMessageCircle className="w-5 h-5" />
          {t("whatsapp")}
        </MagneticAnchor>

      </div>
    </section>
  );
}
