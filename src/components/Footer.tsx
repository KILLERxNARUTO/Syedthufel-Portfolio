import { FadeIn } from "./FadeIn";

export function Footer() {
  return (
    <footer id="contact" className="bg-foreground text-background py-24 px-6 md:px-12 mt-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end">
        <FadeIn className="mb-16 md:mb-0">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter max-w-lg mb-8 leading-[1.1]">
            Let's build intelligent, scalable solutions.
          </h2>
          <div className="flex gap-6 font-medium text-lg">
            <a href="mailto:[EMAIL_ADDRESS]" className="hover:opacity-70 transition-opacity relative group">
              Email
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-background transition-all group-hover:w-full"></span>
            </a>
            <a href="https://github.com/KILLERxNARUTO" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity relative group">
              GitHub
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-background transition-all group-hover:w-full"></span>
            </a>
            <a href="https://linkedin.com/in/syedthufelsyedwahid" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity relative group">
              LinkedIn
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-background transition-all group-hover:w-full"></span>
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.2} className="text-background/60 text-sm flex flex-col gap-2 md:text-right">
          <p>Syed Thufel Syed Wahid (230171601189)</p>
          <p>Built with Google Antigravity.</p>
        </FadeIn>
      </div>
    </footer>
  );
}
