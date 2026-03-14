"use client";

import { useTranslations } from "next-intl";
import { FaInstagram, FaYoutube, FaMicrophone } from "react-icons/fa";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

function GlowCard({ 
  children, 
  className = "", 
  featured = false,
  delay = 0,
}: { children: React.ReactNode; className?: string; featured?: boolean; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ type: "spring", stiffness: 80, damping: 18, delay }}
      whileHover={{ y: -8, transition: { type: "spring", stiffness: 300, damping: 20 } }}
      className={`group relative p-6 md:p-8 rounded-2xl md:rounded-3xl backdrop-blur-md transition-all duration-500 overflow-hidden ${className}`}
      data-cursor-hover
    >
      {/* Animated border glow on viewport entry */}
      <motion.div
        className="absolute inset-0 rounded-2xl md:rounded-3xl pointer-events-none"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: delay + 0.3, duration: 0.8 }}
        style={{
          background: featured
            ? "linear-gradient(135deg, rgba(16,185,129,0.2) 0%, transparent 50%, rgba(168,85,247,0.15) 100%)"
            : "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%, rgba(255,255,255,0.03) 100%)",
          padding: "1px",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "xor",
          WebkitMaskComposite: "xor",
        }}
      />

      {/* Hover glow */}
      <div className={`absolute inset-0 rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
        featured 
          ? "bg-gradient-to-br from-emerald-500/10 via-transparent to-purple-500/10" 
          : "bg-gradient-to-br from-white/5 via-transparent to-white/3"
      }`} />

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

export default function PortfolioGrid() {
  const t = useTranslations("PortfolioGrid");

  const cards = [
    {
      id: "dubbingpedia",
      title: t("dubbingpediaTitle"),
      desc: t("dubbingpediaDesc"),
      icon: FaMicrophone,
      link: "#",
      featured: true,
    },
    {
      id: "instagram",
      title: t("instagramTitle"),
      desc: t("instagramDesc"),
      icon: FaInstagram,
      link: "#",
    },
    {
      id: "youtube",
      title: t("youtubeTitle"),
      desc: t("youtubeDesc"),
      icon: FaYoutube,
      link: "#",
    },
  ];

  return (
    <section id="portfolio" className="py-16 md:py-24 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto w-full">
      {/* Asymmetric Magazine Grid: 
           - Mobile: single column
           - Desktop: featured card spans 2 cols, others fill remaining spots
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 auto-rows-auto">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <a
              key={card.id}
              href={card.link}
              className={`block ${card.featured ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : ""}`}
            >
              <GlowCard
                featured={card.featured}
                delay={i * 0.1}
                className={`h-full border ${
                  card.featured
                    ? "bg-white/[0.06] border-emerald-500/20"
                    : "bg-white/[0.03] border-white/10"
                }`}
              >
                <div className={`flex flex-col justify-between h-full ${card.featured ? "min-h-[200px] lg:min-h-[320px]" : "min-h-[160px]"} gap-4`}>
                  <div>
                    <div
                      className={`inline-flex items-center justify-center p-3 rounded-xl mb-4 transition-colors ${
                        card.featured 
                          ? "bg-emerald-500 text-white" 
                          : "bg-white/10 text-white group-hover:bg-white group-hover:text-black"
                      }`}
                    >
                      <Icon className={`${card.featured ? "w-7 h-7" : "w-6 h-6"}`} />
                    </div>
                    <h3 className={`${card.featured ? "text-2xl lg:text-3xl" : "text-xl"} font-semibold text-white mb-2`}>{card.title}</h3>
                    <p className={`text-neutral-400 group-hover:text-neutral-300 transition-colors ${card.featured ? "text-base" : "text-sm"}`}>
                      {card.desc}
                    </p>
                  </div>

                  <div className="text-sm font-medium text-neutral-500 group-hover:text-white flex items-center gap-1 transition-colors">
                    View Profile
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </GlowCard>
            </a>
          );
        })}
      </div>
    </section>
  );
}
