"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

function SplitText({ text, className = "" }: { text: string; className?: string }) {
  const words = text.split(" ");
  
  return (
    <span className={className} aria-label={text}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block overflow-hidden mr-[0.3em]">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", rotateX: -80 }}
            animate={{ y: "0%", rotateX: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,
              delay: 0.15 + wordIndex * 0.08,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const t = useTranslations("Hero");

  return (
    <section className="w-full flex flex-col items-center justify-center gap-6 text-center px-4 min-h-screen sm:min-h-[70vh] lg:min-h-[60vh] relative z-10 pt-20 pb-16">

      <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-white leading-[0.95]">
        <SplitText text={t("title")} />
      </h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.6 }}
        className="max-w-2xl mx-auto mt-4 text-lg md:text-xl text-zinc-400 font-medium"
      >
        {t("subtitle")}
      </motion.p>
      
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.8 }}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => {
          document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
        }}
        className="mt-6 px-8 py-4 bg-emerald-500 text-white font-bold rounded-full transition-shadow duration-300 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)]"
        data-cursor-hover
      >
        {t("cta")}
      </motion.button>
      
    </section>
  );
}
