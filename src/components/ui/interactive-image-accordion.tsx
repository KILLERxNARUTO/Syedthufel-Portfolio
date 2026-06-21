"use client";

import React, { useState } from 'react';

type AccordionItemType = {
  id: number;
  title: string;
  description: string;
  githubUrl?: string;
};

const accordionItems: AccordionItemType[] = [
  {
    id: 1,
    title: 'EcoDeploy AI',
    description: 'A carbon-aware deployment pipeline that optimizes cloud resource allocation by actively analyzing local grid carbon intensity.',
    githubUrl: 'https://github.com/KILLERxNARUTO/Eco-Deploy-AI',
  },
  {
    id: 2,
    title: 'Deal Go!',
    description: 'A hyper-local e-commerce application designed to solve the "wasted trip" problem by seamlessly connecting consumers with micro-retailers within a 1km radius.',
    githubUrl: 'https://github.com/KILLERxNARUTO/DealGo',
  },
  {
    id: 3,
    title: 'AI Content Generator',
    description: 'A practical content creation tool designed to streamline social media and marketing workflows by automatically generating highly relevant captions and tags.',
    githubUrl: 'https://github.com/KILLERxNARUTO/AI-Powered-Hashtags-Captions',
  },
  {
    id: 4,
    title: 'TrueSight',
    description: 'An AI-powered secure banking verification system that utilizes Siamese Neural Networks and MFCC features to authenticate users based on their unique vocal patterns.',
    githubUrl: 'https://github.com/KILLERxNARUTO/truesight',
  },
  {
    id: 5,
    title: 'Edge-AI PCB Inspection',
    description: 'An Edge-AI computer vision system built to identify and classify Surface-Mount Technology (SMT) defects on printed circuit boards using YOLO and NXP eIQ.',
    githubUrl: 'https://github.com/KILLERxNARUTO/solder-defect-detection',
  },
];

type AccordionItemProps = {
  item: AccordionItemType;
  isActive: boolean;
  onMouseEnter: () => void;
};

const AccordionItem = ({ item, isActive, onMouseEnter }: AccordionItemProps) => {
  return (
    <div
      className={`
        relative h-[450px] rounded-2xl overflow-hidden cursor-pointer
        transition-all duration-700 ease-in-out bg-[#0e0f0f] border border-white/10
        ${isActive ? 'w-[400px]' : 'w-[60px]'}
      `}
      onMouseEnter={onMouseEnter}
    >
      {/* Dark overlay for base card styling */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Description displayed when active */}
      <div
        className={`absolute inset-0 flex flex-col justify-center px-8 pt-12 pb-24 transition-opacity duration-700 ease-in-out delay-100 ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
      >
        <p className="text-white/80 text-base md:text-lg leading-relaxed text-center font-medium">
          {item.description}
        </p>
      </div>

      {/* GitHub Link Slot */}
      {isActive && item.githubUrl && (
        <a
          href={item.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-4 right-4 z-20 bg-white/10 backdrop-blur-md hover:bg-white/30 p-2.5 rounded-full transition-all duration-300"
          title="View on GitHub"
        >
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
          </svg>
        </a>
      )}

      {/* Caption Text */}
      <span
        className={`
          absolute text-white text-lg font-semibold whitespace-nowrap
          transition-all duration-300 ease-in-out z-10
          ${isActive
            ? 'bottom-6 left-1/2 -translate-x-1/2 rotate-0' // Active state: horizontal, bottom-center
            // Inactive state: vertical, positioned at the bottom, for all screen sizes
            : 'w-auto text-left bottom-24 left-1/2 -translate-x-1/2 rotate-90'
          }
        `}
      >
        {item.title}
      </span>
    </div>
  );
};

export function LandingAccordionItem() {
  const [activeIndex, setActiveIndex] = useState(4);

  const handleItemHover = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="font-sans w-full bg-transparent flex flex-col justify-center flex-1">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12 max-w-7xl mx-auto w-full">

        {/* Left Side: Text Content */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tighter uppercase">
            Selected<br />Works
          </h1>
          <p className="mt-6 text-lg max-w-xl mx-auto md:mx-0 opacity-70">
            A showcase of intelligent systems built to solve real-world problems through Applied AI, Edge Computing, and Full-Stack Engineering.
          </p>
          <div className="mt-8">
            <a
              href="#contact"
              className="inline-block bg-[#0e0f0f] text-white font-semibold px-8 py-3 rounded-lg shadow-xl hover:scale-105 transition-transform duration-300"
            >
              Contact Me
            </a>
          </div>
        </div>

        {/* Right Side: Image Accordion */}
        <div className="w-full md:w-1/2">
          <div className="flex flex-row items-center justify-center gap-4 overflow-x-auto p-4">
            {accordionItems.map((item, index) => (
              <AccordionItem
                key={item.id}
                item={item}
                isActive={index === activeIndex}
                onMouseEnter={() => handleItemHover(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
