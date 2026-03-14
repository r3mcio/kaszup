"use client";

import { useTranslations } from "next-intl";
import { FiMic, FiSliders, FiMonitor, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { MdOutlineAirlineSeatReclineExtra } from "react-icons/md";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";

export default function StudioEquipment() {
  const t = useTranslations("Equipment");
  const sectionRef = useRef(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const [showHint, setShowHint] = useState(true);

  const equipmentList = [
    {
      id: "mic",
      icon: <FiMic className="w-8 h-8 md:w-10 md:h-10 text-white" />,
      title: t("mic"),
      desc: t("micDesc"),
    },
    {
      id: "interface",
      icon: <FiSliders className="w-8 h-8 md:w-10 md:h-10 text-white" />,
      title: t("interface"),
      desc: t("interfaceDesc"),
    },
    {
      id: "daw",
      icon: <FiMonitor className="w-8 h-8 md:w-10 md:h-10 text-white" />,
      title: t("daw"),
      desc: t("dawDesc"),
    },
    {
      id: "cabin",
      icon: <MdOutlineAirlineSeatReclineExtra className="w-8 h-8 md:w-10 md:h-10 text-white" />,
      title: t("cabin"),
      desc: t("cabinDesc"),
    }
  ];

  // Track scroll position for pagination dots
  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    const cardWidth = el.scrollWidth / equipmentList.length;
    const index = Math.round(el.scrollLeft / cardWidth);
    setActiveIndex(index);
    // Hide hint after first scroll
    if (el.scrollLeft > 10 && showHint) setShowHint(false);
  }, [equipmentList.length, showHint]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Desktop arrow navigation
  const scrollDesktop = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.scrollWidth / equipmentList.length;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <section id="about" ref={sectionRef} className="w-full py-16 md:py-24 px-4 sm:px-6 md:px-12 text-zinc-50 border-t border-white/[0.05]">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-12 md:mb-16 space-y-4"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", stiffness: 80, damping: 15 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            {t("title")}
          </h2>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* ─── Mobile / Tablet: Swipeable Carousel ─── */}
        <div className="lg:hidden">
          {/* Swipe hint — animated, fades after first scroll */}
          <motion.div
            className="flex items-center justify-center gap-2 mb-4 text-zinc-500 text-xs font-medium"
            initial={{ opacity: 0 }}
            animate={isInView && showHint ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.8, duration: 0.4 }}
          >
            {/* Animated swipe icon */}
            <motion.svg
              width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
              className="text-zinc-500"
              animate={{ x: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
            <span>{t("scrollHint")}</span>
          </motion.div>

          {/* Carousel with fade-out mask on right edge */}
          <div
            className="relative"
            style={{
              maskImage: "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
            }}
          >
            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory pt-4 pb-8 px-[50vw] -mx-[50vw] scrollbar-hide"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              <div className="w-[calc(50vw-140px)] shrink-0" aria-hidden="true" />
              {equipmentList.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ type: "spring", stiffness: 80, damping: 18, delay: i * 0.1 }}
                  className="snap-center shrink-0 w-[280px] group relative p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08]"
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="p-4 rounded-2xl bg-white/[0.05]">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-zinc-100 mb-1">{item.title}</h3>
                      <p className="text-sm text-zinc-400 font-medium">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
              <div className="w-[calc(50vw-140px)] shrink-0" aria-hidden="true" />
            </div>
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center gap-2 mt-4">
            {equipmentList.map((_, i) => (
              <motion.div
                key={i}
                className="rounded-full"
                animate={{
                  width: activeIndex === i ? 20 : 6,
                  backgroundColor: activeIndex === i ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.15)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                style={{ height: 6 }}
              />
            ))}
          </div>
        </div>

        {/* ─── Desktop: Grid with hover-visible arrows ─── */}
        <div className="hidden lg:block relative group/section">
          {/* Left arrow */}
          <button
            onClick={() => scrollDesktop("left")}
            className="absolute -left-12 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 opacity-0 group-hover/section:opacity-100 transition-all duration-300"
            aria-label="Previous equipment"
            data-cursor-hover
          >
            <FiChevronLeft className="w-5 h-5" />
          </button>

          {/* Grid */}
          <div className="grid grid-cols-4 gap-6 md:gap-8">
            {equipmentList.map((item, i) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ type: "spring", stiffness: 80, damping: 18, delay: i * 0.1 }}
                whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                className="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] hover:border-white/[0.15] transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-4 rounded-2xl bg-white/[0.05] group-hover:bg-emerald-500/20 transition-colors duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-zinc-100 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-zinc-400 font-medium">
                      {item.desc}
                    </p>
                  </div>
                </div>
                
                {/* Ambient glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-300 pointer-events-none" />
              </motion.div>
            ))}
          </div>

          {/* Right arrow */}
          <button
            onClick={() => scrollDesktop("right")}
            className="absolute -right-12 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 opacity-0 group-hover/section:opacity-100 transition-all duration-300"
            aria-label="Next equipment"
            data-cursor-hover
          >
            <FiChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
