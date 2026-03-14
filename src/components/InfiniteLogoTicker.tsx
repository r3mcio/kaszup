"use client";

import { SiNetflix, SiHbomax, SiEpicgames, SiApple, SiSony, SiSteam } from "react-icons/si";
import { IconType } from "react-icons";

const LOGOS: { icon: IconType; name: string }[] = [
  { icon: SiNetflix, name: "Netflix" },
  { icon: SiHbomax, name: "HBO Max" },
  { icon: SiEpicgames, name: "Epic Games" },
  { icon: SiApple, name: "Apple" },
  { icon: SiSony, name: "Sony" },
  { icon: SiSteam, name: "Steam" }
];

function LogoRow() {
  return (
    <div className="flex shrink-0 items-center" aria-hidden="true">
      {LOGOS.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-center px-6 md:px-10 lg:px-14 transition-all duration-300"
        >
          <item.icon
            className="h-8 md:h-12 lg:h-14 w-auto fill-neutral-600 opacity-50 grayscale transition-all duration-300 hover:fill-white hover:text-white hover:opacity-100 hover:scale-110 hover:grayscale-0 hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] cursor-pointer"
          />
        </div>
      ))}
    </div>
  );
}

export default function InfiniteLogoTicker() {
  return (
    <div className="w-full overflow-hidden bg-transparent py-10 md:py-16">
      <div
        className="relative overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        {/*
          4 copies of LogoRow. Animation moves -25% (one row width).
          This guarantees coverage on ultra-wide (4K+) monitors.
          On desktop, lg:animate-ticker-desktop runs faster for a natural feel.
        */}
        <div className="flex w-max animate-ticker lg:animate-ticker-desktop hover:[animation-play-state:paused]">
          <LogoRow />
          <LogoRow />
          <LogoRow />
          <LogoRow />
        </div>
      </div>
    </div>
  );
}
