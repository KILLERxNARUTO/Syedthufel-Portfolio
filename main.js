/**
 * SYED THUFEL PORTFOLIO — main.js
 * Core animation engine: canvas scroll-sequence, GSAP reveals,
 * page-load fade, canvas unpin/fade, marquee, navigation.
 *
 * 🚀 Front-end Animations & Designs: Gemini 3.1 Pro (High)
 * ⚙️ Backend, Connections & Working: Claude Opus 4.6
 */

(() => {
  'use strict';

  /* ────────────────────────────────────────────
     0. GSAP Setup
  ──────────────────────────────────────────── */
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });

  /* ────────────────────────────────────────────
     1. Image Sequence — Frame paths
  ──────────────────────────────────────────── */
  const FRAME_COUNT = 300;

  const framePaths = Array.from({ length: FRAME_COUNT }, (_, index) => {
    const frameNumber = String(index + 1).padStart(3, '0');
    return `./frames/ezgif-frame-${frameNumber}.jpg`;
  });

  /* ────────────────────────────────────────────
     2. DOM References
  ──────────────────────────────────────────── */
  const canvas         = document.getElementById('hero-canvas');
  const canvasSticky   = document.getElementById('canvas-sticky');
  const heroSection    = document.getElementById('hero');
  const loaderOverlay  = document.getElementById('loader-overlay');
  const loaderBar      = document.getElementById('loader-bar');
  const loaderPct      = document.getElementById('loader-pct');
  const marqueeTrack   = document.getElementById('marquee-track');
  const marqueeWrapper = document.getElementById('marquee-wrapper');
  const mobileMenu     = document.getElementById('mobile-menu');
  const hamburgerBtn   = document.getElementById('hamburger-btn');
  const navbar         = document.getElementById('navbar');

  if (!canvas || !canvasSticky || !heroSection) {
    console.warn('[ST Portfolio] Critical canvas elements missing.');
    return;
  }

  /* ────────────────────────────────────────────
     3. Canvas State
  ──────────────────────────────────────────── */
  const ctx    = canvas.getContext('2d', { alpha: false, willReadFrequently: false });
  const frames = new Array(FRAME_COUNT).fill(null);

  let loadedFrames = 0;
  let currentFrame = -1;
  let resizeRaf    = 0;
  let initialized  = false;
  let marqueeAnim  = null;

  /* ────────────────────────────────────────────
     4. Loader Progress
  ──────────────────────────────────────────── */
  const setLoaderProgress = (value) => {
    const pct = Math.max(0, Math.min(1, value));
    if (loaderBar) loaderBar.style.width = `${pct * 100}%`;
    if (loaderPct) loaderPct.textContent = `${Math.round(pct * 100)}%`;
  };

  /* ────────────────────────────────────────────
     5. Canvas Draw — cover-fit
  ──────────────────────────────────────────── */
  const drawFrame = (index) => {
    const safeIndex = Math.max(0, Math.min(FRAME_COUNT - 1, index));
    const image = frames[safeIndex] || frames.find(Boolean);
    if (!image || !ctx) return;

    const { width, height } = canvas;
    const iw = image.naturalWidth  || image.width;
    const ih = image.naturalHeight || image.height;
    if (!width || !height || !iw || !ih) return;

    const canvasRatio = width / height;
    const imageRatio  = iw / ih;

    let dw = width, dh = height, ox = 0, oy = 0;

    if (imageRatio > canvasRatio) {
      dh = height;
      dw = dh * imageRatio;
      ox = (width - dw) / 2;
    } else {
      dw = width;
      dh = dw / imageRatio;
      oy = (height - dh) / 2;
    }

    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(image, ox, oy, dw, dh);
    currentFrame = safeIndex;
  };

  /* ────────────────────────────────────────────
     6. Canvas Resize — DPR-aware
  ──────────────────────────────────────────── */
  const resizeCanvas = () => {
    const rect = canvasSticky.getBoundingClientRect();
    const dpr  = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width  = Math.max(1, Math.floor(rect.width  * dpr));
    canvas.height = Math.max(1, Math.floor(rect.height * dpr));
    canvas.style.width  = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    drawFrame(currentFrame < 0 ? 0 : currentFrame);
  };

  const scheduleResize = () => {
    if (resizeRaf) return;
    resizeRaf = window.requestAnimationFrame(() => {
      resizeRaf = 0;
      resizeCanvas();
      ScrollTrigger.refresh();
    });
  };

  /* ────────────────────────────────────────────
     7. Image Preload
  ──────────────────────────────────────────── */
  const preloadFrames = () => {
    const loaders = framePaths.map((src, index) =>
      new Promise((resolve) => {
        const img    = new Image();
        img.decoding = 'async';
        img.onload = () => {
          frames[index] = img;
          loadedFrames++;
          setLoaderProgress(loadedFrames / FRAME_COUNT);
          resolve(img);
        };
        img.onerror = () => {
          loadedFrames++;
          setLoaderProgress(loadedFrames / FRAME_COUNT);
          resolve(null);
        };
        img.src = src;
      })
    );
    return Promise.all(loaders);
  };

  /* ────────────────────────────────────────────
     8. Hero Scroll — pinned canvas + frame scrub
  ──────────────────────────────────────────── */
  const setupHeroScroll = () => {
    const isSmall   = window.matchMedia('(max-width: 720px)').matches;
    const endDist   = Math.max(
      window.innerHeight * (isSmall ? 3.8 : 4.8),
      FRAME_COUNT      * (isSmall ? 7   : 10)
    );

    /* Pin + scrub canvas sequence */
    ScrollTrigger.create({
      trigger: heroSection,
      start: 'top top',
      end: `+=${Math.round(endDist)}`,
      pin: canvasSticky,
      pinSpacing: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const nextFrame = Math.min(
          FRAME_COUNT - 1,
          Math.floor(self.progress * (FRAME_COUNT - 1))
        );
        if (nextFrame !== currentFrame) {
          drawFrame(nextFrame);
        }
      },
    });

    /* Hero text fades out as user scrolls into the animation */
    gsap.to('#hero-text-overlay', {
      opacity: 0,
      y: -36,
      ease: 'none',
      scrollTrigger: {
        trigger: heroSection,
        start: '18% top',
        end: '55% top',
        scrub: 1,
      },
    });

    /* Scroll indicator disappears early */
    gsap.to('#scroll-indicator', {
      opacity: 0,
      y: 16,
      ease: 'none',
      scrollTrigger: {
        trigger: heroSection,
        start: '5% top',
        end: '20% top',
        scrub: true,
      },
    });

    /* Canvas unpin + fade-out once sequence ends → dark portfolio sections take over */
    gsap.to(canvasSticky, {
      opacity: 0,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: heroSection,
        /* Start fade at 85% through the pinned sequence, complete at end */
        start: `${Math.round(endDist * 0.82)}px top`,
        end:   `${Math.round(endDist)}px top`,
        scrub: 1.2,
      },
    });
  };

  /* ────────────────────────────────────────────
     9. Scroll Reveal Animations (GSAP ScrollTrigger)
  ──────────────────────────────────────────── */
  const setupRevealAnimations = () => {
    /* Reveal-up: about text, section headings, contact copy */
    gsap.utils.toArray('.reveal-up').forEach((el) => {
      const delay = parseFloat(el.dataset.delay || 0);
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 50 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 84%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    /* Reveal-right: about visual card */
    gsap.utils.toArray('.reveal-right').forEach((el) => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, x: 48 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 84%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    /* Reveal-card: project cards — stagger by group */
    const cards = gsap.utils.toArray('.reveal-card');
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { autoAlpha: 0, y: 50, scale: 0.97 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.2,
          delay: (i % 2) * 0.12, /* stagger pairs */
          scrollTrigger: {
            trigger: card,
            start: 'top 86%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  };

  /* ────────────────────────────────────────────
     10. Marquee — infinite horizontal scroll with pause on hover
  ──────────────────────────────────────────── */
  const setupMarquee = () => {
    if (!marqueeTrack) return;

    /* GSAP infinite marquee: animate -50% = one full content block width */
    marqueeAnim = gsap.to(marqueeTrack, {
      xPercent: -50,
      duration: 28,
      ease: 'none',
      repeat: -1,
      modifiers: {
        xPercent: gsap.utils.wrap(-50, 0),
      },
    });

    /* Pause on hover, resume on leave */
    if (marqueeWrapper) {
      marqueeWrapper.addEventListener('mouseenter', () => {
        gsap.to(marqueeAnim, { timeScale: 0, duration: 0.5, ease: 'power2.out', overwrite: true });
      });
      marqueeWrapper.addEventListener('mouseleave', () => {
        gsap.to(marqueeAnim, { timeScale: 1, duration: 0.6, ease: 'power2.inOut', overwrite: true });
      });
    }
  };

  /* ────────────────────────────────────────────
     11. Navigation — hamburger, smooth scroll, navbar scroll state
  ──────────────────────────────────────────── */
  const setupNavigation = () => {
    /* Hamburger toggle */
    if (hamburgerBtn && mobileMenu) {
      hamburgerBtn.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.toggle('open');
        hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
        mobileMenu.setAttribute('aria-hidden', String(!isOpen));
        document.body.classList.toggle('menu-open', isOpen);
      });

      mobileMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          mobileMenu.classList.remove('open');
          hamburgerBtn.setAttribute('aria-expanded', 'false');
          mobileMenu.setAttribute('aria-hidden', 'true');
          document.body.classList.remove('menu-open');
        });
      });
    }

    /* Smooth scroll for all hash links */
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        if (!targetId || targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    /* Navbar scrolled class */
    if (navbar) {
      const onScroll = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
      };
      window.addEventListener('scroll', onScroll, { passive: true });
    }
  };

  /* ────────────────────────────────────────────
     12. Page Load Reveal — GSAP fade-in canvas from absolute black
  ──────────────────────────────────────────── */
  const playLoadReveal = () => {
    /* Hide loader */
    if (loaderOverlay) {
      gsap.to(loaderOverlay, {
        autoAlpha: 0,
        duration: 0.55,
        ease: 'power2.inOut',
        onComplete: () => {
          loaderOverlay.classList.add('hidden');
        },
      });
    }

    /* Fade the canvas in from black — opacity 0 → 1 */
    gsap.to(canvasSticky, {
      opacity: 1,
      duration: 1.5,
      ease: 'power2.inOut',
      delay: 0.15,
    });

    /* Stagger-reveal the hero text elements */
    const heroEls = [
      '#hero-tagline',
      '#hero-name',
      '#hero-sub',
      '#hero-cta-group',
      '#scroll-indicator',
    ];

    gsap.fromTo(
      heroEls,
      { autoAlpha: 0, y: 28 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        stagger: 0.14,
        ease: 'power3.out',
        delay: 0.8,
      }
    );
  };

  /* ────────────────────────────────────────────
     13. Initialize — runs after frames are loaded
  ──────────────────────────────────────────── */
  const initialize = () => {
    if (initialized) return;
    initialized = true;

    resizeCanvas();
    setupHeroScroll();
    setupRevealAnimations();
    setupMarquee();
    setupNavigation();
    ScrollTrigger.refresh();

    playLoadReveal();
  };

  /* ────────────────────────────────────────────
     14. Boot sequence
  ──────────────────────────────────────────── */
  const boot = async () => {
    setLoaderProgress(0);
    await preloadFrames();
    drawFrame(0);
    initialize();
  };

  /* Resize handler */
  window.addEventListener('resize',           scheduleResize, { passive: true });
  window.addEventListener('orientationchange', scheduleResize, { passive: true });

  /* Start */
  boot().catch((err) => {
    console.error('[ST Portfolio] Boot error:', err);
    /* Fail gracefully: still show site */
    if (loaderOverlay) loaderOverlay.classList.add('hidden');
    gsap.set(canvasSticky, { opacity: 1 });
    resizeCanvas();
    setupHeroScroll();
    setupRevealAnimations();
    setupMarquee();
    setupNavigation();
    ScrollTrigger.refresh();
  });

})();
