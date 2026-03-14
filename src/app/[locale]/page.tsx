import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import BilingualPlayer from "@/components/BilingualPlayer";
import InfiniteLogoTicker from "@/components/InfiniteLogoTicker";
import PortfolioGrid from "@/components/PortfolioGrid";
import StudioEquipment from "@/components/StudioEquipment";
import DirectContact from "@/components/DirectContact";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import FilmGrain from "@/components/FilmGrain";
import CustomCursor from "@/components/CustomCursor";
import ScrollReveal from "@/components/ScrollReveal";
import AboutMe from "@/components/AboutMe";

export default function Home() {
  return (
    <div id="home" className="flex min-h-screen flex-col bg-black font-sans text-zinc-100 overflow-hidden relative">
      {/* Atmospheric layers */}
      <AnimatedBackground />
      <FilmGrain />
      <CustomCursor />

      {/* Content (z-10 to sit above background) */}
      <Navigation />
      <main className="flex w-full flex-col items-center justify-start pt-0 lg:pt-8 relative z-10">
        
        {/* Hero — full-screen on mobile */}
        <div className="w-full max-w-screen-2xl mx-auto">
          <Hero />
        </div>

        {/* Player — capped at max-w-4xl on desktop */}
        <ScrollReveal className="w-full max-w-screen-2xl mx-auto flex justify-center px-4 sm:px-6 lg:px-8 mb-8 sm:mb-16 relative z-20" delay={0.1}>
          <div className="w-full max-w-4xl">
            <BilingualPlayer 
              type="audio"
              sources={{
                pl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
                en: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
              }}
              title="Przewodnik / Voice Sample"
              subtitle="Posłuchaj próbki"
            />
          </div>
        </ScrollReveal>

        {/* Ticker — full-viewport-width */}
        <InfiniteLogoTicker />

        {/* Content sections */}
        <div className="w-full max-w-screen-2xl mx-auto">
          <ScrollReveal delay={0.05}>
            <AboutMe />
          </ScrollReveal>

          <PortfolioGrid />
          
          <ScrollReveal delay={0.05}>
            <StudioEquipment />
          </ScrollReveal>

          <ScrollReveal delay={0.05}>
            <DirectContact />
          </ScrollReveal>
        </div>
      </main>
      
      <ScrollReveal className="relative z-10">
        <Footer />
      </ScrollReveal>
    </div>
  );
}
