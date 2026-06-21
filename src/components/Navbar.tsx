"use client";

import Link from "next/link";
import StaggeredMenu from "./StaggeredMenu/StaggeredMenu";

export function Navbar() {
  const menuItems = [
    { label: 'Home', ariaLabel: 'Go to home page', link: '#home' },
    { label: 'Achievements', ariaLabel: 'View our achievements', link: '#achievements' },
    { label: 'Works', ariaLabel: 'View our works', link: '#works' },
    { label: 'Experience', ariaLabel: 'View our experience', link: '#experience' },
    { label: 'Contact', ariaLabel: 'Get in touch', link: '#contact' }
  ];

  const socialItems = [
    { label: 'Twitter', link: 'https://twitter.com' },
    { label: 'GitHub', link: 'github.com/KILLERxNARUTO' },
    { label: 'LinkedIn', link: 'https://linkedin.com/in/syedthufelsyedwahid' }
  ];

  return (
    <>
      <StaggeredMenu
        position="right"
        items={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={true}
        menuButtonColor="#0e0f0f"
        openMenuButtonColor="#0e0f0f"
        changeMenuColorOnOpen={true}
        colors={['#fef8f4', '#FFE862', '#3852EC']}
        logoUrl=""
        accentColor="#3852EC"
        isFixed={true}
      />
    </>
  );
}
