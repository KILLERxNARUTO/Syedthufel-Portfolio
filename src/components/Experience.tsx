"use client";

import { FadeIn } from "@/components/FadeIn";
import { HeroSection } from "@/components/ui/hero-section-2";

export function Experience() {
  return (
    <div className="flex-1 w-full max-w-7xl mx-auto flex flex-col justify-center py-12 text-background">
      <FadeIn>
        <h3 className="mb-8 text-sm font-bold tracking-widest uppercase text-background/50 border-b border-background/10 pb-4">
          Experience
        </h3>
      </FadeIn>

      <FadeIn delay={0.1} className="h-full min-h-[600px] w-full">
        <HeroSection
          slogan="JUNE 2025 - JULY 2025"
          logo={{
            url: "",
            alt: "Wiates Technologies",
            text: "Wiates Technologies"
          }}
          title={
            <>
              Machine Learning <br />
              <span className="text-[#FFE862]">Engineer Intern</span>
            </>
          }
          subtitle="Contributed to mobile application development at Wiates Technologies, gaining hands-on experience in building scalable and user-friendly mobile solutions with Applied AI capabilities."
          callToAction={{
            text: "VIEW COMPANY",
            href: "https://www.wiates.com/",
          }}
          backgroundImage="https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1974&auto=format&fit=crop"
          contactInfo={{
            website: "wiates.com",
            address: "Chennai",
          }}
        />
      </FadeIn>
    </div>
  );
}
