import { GooeyText } from "@/components/ui/gooey-text-morphing";
import TextType from "@/components/ui/TextType";

export function Hero() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full gap-16 md:gap-24">
      <div className="text-xl md:text-2xl font-bold tracking-tight z-10 mb-4 md:mb-8 mt-32 lg:mt-0">
        <TextType
          text={['Who am I?', 'What do I do?', 'What is my passion?', 'What is my focus?']}
          typingSpeed={50}
          deletingSpeed={30}
          pauseDuration={2000}
          className="px-4 py-1.5 bg-[#FFE862] text-[#0e0f0f] rounded-xl inline-block"
          cursorClassName="text-[#0e0f0f]"
        />
      </div>
      <div className="h-[100px] md:h-[150px] w-full flex items-center justify-center relative">
        <GooeyText
          texts={["Syed Thufel Syed Wahid", "ML Engineer", "Data Scientist", "AI/ML Student"]}
          morphTime={1}
          cooldownTime={2}
          className="font-black tracking-tighter uppercase"
        />
      </div>
    </div>
  );
}
