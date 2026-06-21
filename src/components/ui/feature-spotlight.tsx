"use client";

import * as React from 'react';

function cn(...parts: Array<string | undefined | false | null>): string {
  return parts.filter(Boolean).join(' ');
}

export interface AnimatedFeatureSpotlightProps extends React.HTMLAttributes<HTMLElement> {
  preheaderIcon?: React.ReactNode;
  preheaderText: string;
  heading: React.ReactNode;
  description: string;
  buttonText?: string;
  buttonLink?: string;
  imageUrl: string;
  imageAlt?: string;
  reverse?: boolean;
}

const AnimatedFeatureSpotlight = React.forwardRef<HTMLElement, AnimatedFeatureSpotlightProps>(
  (
    {
      className,
      preheaderIcon,
      preheaderText,
      heading,
      description,
      buttonText,
      buttonLink,
      imageUrl,
      imageAlt = 'Feature illustration',
      reverse = false,
      ...props
    },
    ref
  ) => {
    return (
      <section
        ref={ref}
        className={cn(
          'w-full max-w-6xl mx-auto p-8 md:p-12 rounded-3xl bg-background border border-foreground/10 overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-500 text-current',
          className
        )}
        {...props}
      >
        <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-12 items-center", reverse ? "[&>div:first-child]:md:order-2 [&>div:last-child]:md:order-1" : "")}>
          {/* Text Content */}
          <div className="flex flex-col space-y-6 text-center md:text-left items-center md:items-start z-10 text-inherit">
            <div
              className="flex items-center space-x-2 text-sm font-bold uppercase tracking-widest opacity-80"
            >
              {preheaderIcon}
              <span>{preheaderText}</span>
            </div>
            <h2
              className="text-4xl lg:text-5xl font-black tracking-tighter"
            >
              {heading}
            </h2>
            <p className="text-lg opacity-90 leading-relaxed font-medium">
              {description}
            </p>
            
            {buttonText && (
              <div className="pt-4">
                <a 
                  href={buttonLink || "#"} 
                  target={buttonLink?.startsWith("http") ? "_blank" : undefined}
                  rel={buttonLink?.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="px-8 py-4 bg-current text-background font-bold rounded-full hover:scale-105 transition-transform duration-300 inline-block shadow-xl"
                >
                  {buttonText}
                </a>
              </div>
            )}
          </div>

          {/* Visual */}
          <div className="relative w-full min-h-[300px] md:min-h-[400px] flex items-center justify-center rounded-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
            <img
              src={imageUrl}
              alt={imageAlt}
              className="w-full h-full object-cover absolute inset-0 group-hover:scale-110 transition-transform duration-1000 ease-out"
            />
          </div>
        </div>
      </section>
    );
  }
);
AnimatedFeatureSpotlight.displayName = 'AnimatedFeatureSpotlight';

export { AnimatedFeatureSpotlight };
