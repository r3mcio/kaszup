"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export default function AnimatedBackground() {
  const { scrollY } = useScroll();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Blobs move gently with scroll
  const blob1Y = useTransform(scrollY, [0, 3000], [0, -400]);
  const blob2Y = useTransform(scrollY, [0, 3000], [0, -250]);
  const blob3Y = useTransform(scrollY, [0, 3000], [0, -600]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
      {/* Subtle Grid Background */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_70%,transparent_100%)] opacity-30"
      />
      {/* Blob 1 — Top-left, deep emerald */}
      <motion.div
        style={{ y: blob1Y }}
        className="absolute -top-[20%] -left-[15%] w-[600px] h-[600px] md:w-[900px] md:h-[900px] rounded-full opacity-30"
        animate={{
          scale: [1, 1.15, 1],
          x: [0, 40, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="w-full h-full rounded-full bg-gradient-radial from-emerald-900/50 via-emerald-950/20 to-transparent blur-[80px]"
          style={{ background: "radial-gradient(circle, rgba(6,95,70,0.4) 0%, rgba(6,78,59,0.15) 40%, transparent 70%)" }}
        />
      </motion.div>

      {/* Blob 2 — Center-right, purple tint */}
      <motion.div
        style={{ y: blob2Y }}
        className="absolute top-[30%] -right-[10%] w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full opacity-25"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, -30, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
      >
        <div className="w-full h-full rounded-full"
          style={{ background: "radial-gradient(circle, rgba(88,28,135,0.35) 0%, rgba(88,28,135,0.1) 40%, transparent 70%)" }}
        />
      </motion.div>

      {/* Blob 3 — Bottom, deep green */}
      <motion.div
        style={{ y: blob3Y }}
        className="absolute top-[70%] left-[20%] w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full opacity-20"
        animate={{
          scale: [1, 1.1, 1],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 10,
        }}
      >
        <div className="w-full h-full rounded-full"
          style={{ background: "radial-gradient(circle, rgba(6,95,70,0.3) 0%, rgba(6,78,59,0.1) 40%, transparent 70%)" }}
        />
      </motion.div>

      {/* Scattered Dust Particles (using simple absolute divs) */}
      {isMounted && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/20 blur-[1px]"
              style={{
                width: Math.random() * 4 + 1 + "px",
                height: Math.random() * 4 + 1 + "px",
                top: Math.random() * 100 + "%",
                left: Math.random() * 100 + "%",
              }}
              animate={{
                y: [0, -Math.random() * 100 - 50],
                opacity: [0, Math.random() * 0.5 + 0.3, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 10,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
