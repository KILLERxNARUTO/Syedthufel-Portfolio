"use client";

import {
  HoverSlider,
  HoverSliderImage,
  HoverSliderImageWrap,
  TextStaggerHover,
  useHoverSliderContext
} from "@/components/blocks/animated-slideshow";
import { FadeIn } from "@/components/FadeIn";

const SLIDES = [
  {
    id: "slide-1",
    title: "IOB Cybernova",
    description: "IOB Cybernova Hackathon 2025: Winner.",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "slide-2",
    title: "Planet-X",
    description: "Planet-X Hackathon 2026: Secured 3rd Prize with EcoDeploy AI, a carbon-aware deployment pipeline optimizing cloud resource allocation based on local grid carbon intensity.",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
  },
  {
    id: "slide-3",
    title: "Smart India",
    description: "Smart India Hackathon: Competed in the national-level challenges for both the 2025 and 2026 editions.",
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "slide-4",
    title: "Creonix'25",
    description: "Creonix'25: Secured a Top 10 finish.",
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "slide-5",
    title: "Next Potential Idea",
    description: "Next Potential Idea: FinTech & Banking Hackathons 2025",
    imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop",
  },
];

function ActiveDescription() {
  const { activeSlide } = useHoverSliderContext();
  return (
    <p className="mt-6 text-lg md:text-xl font-medium max-w-lg transition-all duration-300 opacity-80 min-h-[100px]">
      {SLIDES[activeSlide].description}
    </p>
  );
}

export function Achievements() {
  return (
    <div className="flex-1 w-full max-w-7xl mx-auto flex flex-col justify-center">
      <HoverSlider className="flex flex-col md:flex-row items-center justify-between gap-12 w-full">
        {/* Left Side: Titles and Context */}
        <div className="flex flex-col space-y-4 md:w-1/2">
          <FadeIn>
            <h3 className="mb-8 text-sm font-bold tracking-widest uppercase text-[#3d3929]/50 border-b border-[#3d3929]/10 pb-4">
              Achievements
            </h3>
          </FadeIn>

          <div className="flex flex-col space-y-3 items-start">
            {SLIDES.map((slide, index) => (
              <TextStaggerHover
                key={slide.id}
                index={index}
                className="cursor-pointer text-3xl md:text-5xl font-bold uppercase tracking-tighter"
                text={slide.title}
              />
            ))}
          </div>

          <FadeIn delay={0.2}>
            <ActiveDescription />
          </FadeIn>
        </div>

        {/* Right Side: Images */}
        <div className="md:w-1/2 w-full flex justify-end relative">
          <HoverSliderImageWrap className="w-full max-w-md aspect-[4/5] rounded-2xl shadow-2xl">
            {SLIDES.map((slide, index) => (
              <HoverSliderImage
                key={slide.id}
                index={index}
                imageUrl={slide.imageUrl}
                src={slide.imageUrl}
                alt={slide.title}
                className="size-full object-cover rounded-2xl"
                loading="eager"
                decoding="async"
              />
            ))}
          </HoverSliderImageWrap>
        </div>
      </HoverSlider>
    </div>
  );
}
