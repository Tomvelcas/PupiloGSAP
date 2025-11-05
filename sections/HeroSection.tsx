'use client';

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import Link from "next/link";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

const HeroSection = () => {
  const ctaRef = useRef<HTMLAnchorElement | null>(null);
  const ctaAreaRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  const isTablet = useMediaQuery({
    query: "(max-width: 1024px)",
  });

  useGSAP(() => {
    const titleSplit = SplitText.create(".hero-title", {
      type: "chars",
    });

    const tl = gsap.timeline({
      delay: 1,
    });

    tl.to(".hero-content", {
      opacity: 1,
      y: 0,
      ease: "power1.inOut",
    })
      .to(
        ".hero-text-scroll",
        {
          duration: 1,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "circ.out",
        },
        "-=0.5"
      )
      .from(
        titleSplit.chars,
        {
          yPercent: 200,
          stagger: 0.02,
          ease: "power2.out",
        },
        "-=0.5"
      );

    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero-container",
        start: "1% top",
        end: "bottom top",
        scrub: true,
      },
    });
    heroTl.to(".hero-container", {
      rotate: 7,
      scale: 0.9,
      yPercent: 30,
      ease: "power1.inOut",
    });

    let cleanupMagnet: (() => void) | null = null;
    let cleanupLogo: (() => void) | null = null;

    if (ctaRef.current && ctaAreaRef.current) {
      const button = ctaRef.current;
      const area = ctaAreaRef.current;

      const handleMove = (event: PointerEvent) => {
        const rect = button.getBoundingClientRect();
        const relX = event.clientX - (rect.left + rect.width / 2);
        const relY = event.clientY - (rect.top + rect.height / 2);

        gsap.to(button, {
          x: relX * 0.25,
          y: relY * 0.25,
          rotate: relX * 0.03,
          duration: 0.35,
          ease: "power3.out",
        });
      };

      const reset = () => {
        gsap.to(button, {
          x: 0,
          y: 0,
          rotate: 0,
          duration: 0.6,
          ease: "power3.out",
        });
      };

      area.addEventListener("pointermove", handleMove);
      area.addEventListener("pointerleave", reset);

      cleanupMagnet = () => {
        area.removeEventListener("pointermove", handleMove);
        area.removeEventListener("pointerleave", reset);
        reset();
      };
    }

    if (logoRef.current) {
      const logo = logoRef.current;
      const mm = gsap.matchMedia();

      mm.add("(min-width: 0px)", () => {
        const tlLogo = gsap.timeline({
          scrollTrigger: {
            trigger: ".hero-container",
            start: "bottom top",
            end: "bottom+=400 top",
            scrub: true,
          },
        });

        tlLogo.to(logo, {
          xPercent: -120,
          yPercent: 120,
          scale: 0.85,
          ease: "power2.out",
        });

        cleanupLogo = () => {
          tlLogo.kill();
          mm.revert();
        };
      });
    }

    return () => {
      cleanupMagnet?.();
      cleanupLogo?.();
    };
  });

  return (
    <section className="bg-main-bg">
      <div className="hero-container">
        {isTablet ? (
          <>
            {isMobile && (
              <img
                src="/images/hero-pj.jpeg"
                className="absolute bottom-40 size-full object-cover"
              />
            )}
            <img
              src="/images/hero-pj.jpeg"
              className="absolute bottom-0 left-1/2 -translate-x-1/2 object-auto"
            />
          </>
        ) : (
          <div className="absolute inset-0 bg-[var(--color-warm-base)]">
  <video
    src="/videos/loop-pj2.mp4"
    autoPlay
    muted
    loop
    playsInline
    preload="auto"
    className="
      absolute inset-0 w-full h-full object-cover
      scale-[1.08]
      [mask-image:radial-gradient(circle_at_50%_50%,transparent_0%,transparent_28%,black_40%,black_100%)]
      [webkit-mask-image:radial-gradient(circle_at_50%_50%,transparent_0%,transparent_28%,black_40%,black_100%)]
      md:[mask-image:radial-gradient(circle_at_50%_52%,transparent_0%,transparent_24%,black_37%,black_100%)]
      md:[webkit-mask-image:radial-gradient(circle_at_50%_52%,transparent_0%,transparent_24%,black_37%,black_100%)]
      lg:[mask-image:radial-gradient(circle_at_50%_50%,transparent_0%,transparent_22%,black_34%,black_100%)]
      lg:[webkit-mask-image:radial-gradient(circle_at_50%_50%,transparent_0%,transparent_22%,black_34%,black_100%)]
    "
  />
</div>

        )}
        <div className="hero-content opacity-0">
          <div className="overflow-hidden">
            <h1 className="hero-title">Pupilo</h1>
          </div>
          <div
            style={{
              clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
            }}
            className="hero-text-scroll"
          >
            <div className="hero-subtitle">
              <h1>Juega + Aprende</h1>
            </div>
          </div>

          <h2>
            Vive grandes momentos con Pupilo: rompe la rutina y conecta con la
            curiosidad de tu hijo en cada reto guiado por nuestra IA y
            terapeutas.
          </h2>

          <div className="hero-cta-group" ref={ctaAreaRef}>
            <Link href="/login" className="hero-cta-button" ref={ctaRef}>
              <span className="hero-cta-label">Iniciar sesión</span>
              <span aria-hidden className="hero-cta-icon">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
