import { Navbar } from "@/components/Navbar";
import HeroText from "@/components/ui/hero-shutter-text";
import { Hero } from "@/components/Hero";
import { Achievements } from "@/components/Achievements";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { CinematicFooter } from "@/components/ui/motion-footer";
import FlowArt, { FlowSection } from "@/components/ui/story-scroll";

export default function Home() {
  return (
    <>
      <HeroText />
      <Navbar />
      <FlowArt aria-label="Portfolio Sections">
        <FlowSection id="home" aria-label="Home" style={{ backgroundColor: '#0e0f0f', color: '#fef8f4' }}>
          <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-50">01 — Home</p>
          <hr className="my-[2vw] border-none border-t border-white/20" />
          <Hero />
        </FlowSection>

        <FlowSection id="achievements" aria-label="Achievements" style={{ backgroundColor: '#fef8f4', color: '#0e0f0f' }}>
          <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-50">02 — Achievements</p>
          <hr className="my-[2vw] border-none border-t border-black/20" />
          <Achievements />
        </FlowSection>

        <FlowSection id="works" aria-label="Works" style={{ backgroundColor: '#FFE862', color: '#0e0f0f' }}>
          <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-50">03 — Works</p>
          <hr className="my-[2vw] border-none border-t border-black/20" />
          <Projects />
        </FlowSection>

        <FlowSection id="experience" aria-label="Experience" style={{ backgroundColor: '#3852EC', color: '#ffffff' }}>
          <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-50">04 — Experience</p>
          <hr className="my-[2vw] border-none border-t border-white/20" />
          <Experience />
        </FlowSection>
      </FlowArt>
      <CinematicFooter />
    </>
  );
}
