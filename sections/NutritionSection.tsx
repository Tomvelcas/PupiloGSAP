'use client';

import { useMediaQuery } from "react-responsive";
import { useEffect, useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { nutrientLists, type NutrientInfo } from "@/constants";

gsap.registerPlugin(ScrollTrigger, SplitText);

const TROPHY_IMAGES = [
  "/trofeos/trofeo1.png",
  "/trofeos/trofeo2.png",
  "/trofeos/trofeo3.png",
  "/trofeos/trofeo4.png",
  "/trofeos/trofeo5.png",
  "/trofeos/trofeo6.png",
];

const TROPHY_BACKDROPS = [
  "/images/fondo1.webp",
  "/images/fondo2.webp",
  "/images/fondo3.webp",
  "/images/fondo4.webp",
  "/images/fondo5.webp",
  "/images/fondo6.webp",
];

const NutritionSection = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [lists, setLists] = useState<NutrientInfo[]>(nutrientLists);

  // Refs base
  const sectionRef = useRef<HTMLElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const speedLayerRef = useRef<HTMLDivElement | null>(null);
  const breathImgRef = useRef<HTMLImageElement | null>(null);
  const kpisRef = useRef<HTMLDivElement | null>(null);

  // Derecha: card + pill + carrusel
  const copyCardRef = useRef<HTMLDivElement | null>(null);
  const pillRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const openTlRef = useRef<gsap.core.Timeline | null>(null);
  const loopTlRef = useRef<gsap.core.Timeline | null>(null);
  const glowTlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    setLists(isMobile ? nutrientLists.slice(0, 3) : nutrientLists);
  }, [isMobile]);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // ===== TITULARES =====
      const titleSplit = SplitText.create(".nutrition-title", { type: "chars" });
      gsap.from(titleSplit.chars, {
        yPercent: 60,
        opacity: 0,
        stagger: 0.018,
        ease: "power2.out",
        duration: 0.5,
        scrollTrigger: { trigger: sectionRef.current, start: "top center" },
      });

      gsap.to(".nutrition-text-scroll", {
        duration: 0.75,
        opacity: 1,
        clipPath: "polygon(100% 0, 0 0, 0 100%, 100% 100%)",
        ease: "power1.inOut",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      // ===== ISLA (parallax + respiro) =====
      if (wrapperRef.current) {
        gsap.to(wrapperRef.current, {
          y: 50,
          ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      }
      if (speedLayerRef.current) {
        gsap.to(speedLayerRef.current, {
          y: 120,
          ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      }
      if (breathImgRef.current) {
        gsap.from(breathImgRef.current, {
          y: 56, scale: 0.965, rotateZ: -0.6, opacity: 0, duration: 0.9, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
        });
        gsap.to(breathImgRef.current, {
          y: 4, rotateZ: 0.45, scale: 1.01, duration: 2.6, ease: "sine.inOut", yoyo: true, repeat: -1,
        });
      }

      // ===== COPY DERECHA: fade-in suave =====
      if (copyCardRef.current) {
        gsap.from(copyCardRef.current, {
          opacity: 0,
          y: 12,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: { trigger: copyCardRef.current, start: "top 92%" },
        });
      }

      // ===== KPIs =====
      if (kpisRef.current) {
        gsap.from(kpisRef.current.querySelectorAll(".kpi-item"), {
          y: 14, opacity: 0, duration: 0.45, stagger: 0.07, ease: "power3.out",
          scrollTrigger: { trigger: kpisRef.current, start: "top 90%" },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Hover/tap pill → panel carrusel de trofeos
  useEffect(() => {
    const pill = pillRef.current;
    const panel = panelRef.current;
    const track = trackRef.current;
    if (!pill || !panel || !track) return;

    gsap.set(panel, { opacity: 0, y: 10, pointerEvents: "none", display: "none" });

    const openTl = gsap
      .timeline({ paused: true })
      .set(panel, { display: "block" })
      .to(panel, { opacity: 1, y: 0, pointerEvents: "auto", duration: 0.28, ease: "power2.out" });
    openTlRef.current = openTl;

    const cardW = 160;
    const gap = 20;
    const totalW = (cardW + gap) * TROPHY_IMAGES.length;

    const parent = track.parentElement;
    const cloned = track.cloneNode(true) as HTMLDivElement;
    parent?.appendChild(cloned);

    const duration = matchMedia('(max-width: 768px)').matches ? 12 : 18;
    const loopTl = gsap.timeline({ repeat: -1, defaults: { ease: "none" }, paused: true });
    loopTl.to([track, cloned], { x: -totalW, duration }).set([track, cloned], { x: 0 });
    loopTlRef.current = loopTl;

    const glowItems = panel.querySelectorAll<HTMLElement>(".trophy-glow");
    if (glowItems.length) {
      const glowTl = gsap
        .timeline({ repeat: -1, yoyo: true, paused: true })
        .to(glowItems, {
          opacity: 0.55,
          scale: 1.04,
          duration: 1.6,
          stagger: 0.1,
          ease: "sine.inOut",
        })
        .to(
          glowItems,
          {
            opacity: 0.12,
            scale: 1,
            duration: 1.6,
            ease: "sine.inOut",
          },
          0.5
        );
      glowTlRef.current = glowTl;
    }

    // Tilt 3D leve (desktop)
    const handleTilt = (e: MouseEvent) => {
      const cards = panel.querySelectorAll<HTMLElement>(".trophy-card");
      cards.forEach((card) => {
        const r = card.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = (e.clientX - cx) / r.width;
        const dy = (e.clientY - cy) / r.height;
        gsap.to(card, {
          rotateX: dy * -5,
          rotateY: dx * 5,
          transformPerspective: 600,
          duration: 0.28,
          ease: "power2.out",
        });
      });
    };
    const resetTilt = () => {
      gsap.to(panel.querySelectorAll(".trophy-card"), { rotateX: 0, rotateY: 0, duration: 0.3, ease: "power2.out" });
    };

    const enter = () => {
      openTl.play();
      loopTl.play();
      glowTlRef.current?.play();
    };
    const leave = () => {
      openTl.reverse();
      loopTl.pause();
      glowTlRef.current?.pause();
      resetTilt();
    };

    const cleanupBase = () => {
      openTl.kill();
      loopTl.kill();
      glowTlRef.current?.kill();
      cloned.remove();
    };

    const isTouch = matchMedia('(pointer: coarse)').matches;
    if (isTouch) {
      const toggle = () => {
        const visible = Number(gsap.getProperty(panel, "opacity")) > 0.5;
        if (visible) {
          openTl.reverse();
          loopTl.pause();
          glowTlRef.current?.pause();
        } else {
          openTl.play();
          loopTl.play();
          glowTlRef.current?.play();
        }
      };
      pill.addEventListener("click", toggle);
      return () => {
        pill.removeEventListener("click", toggle);
        cleanupBase();
      };
    } else {
      pill.addEventListener("mouseenter", enter);
      pill.addEventListener("mouseleave", leave);
      panel.addEventListener("mouseenter", enter);
      panel.addEventListener("mouseleave", leave);
      panel.addEventListener("mousemove", handleTilt);
      return () => {
        pill.removeEventListener("mouseenter", enter);
        pill.removeEventListener("mouseleave", leave);
        panel.removeEventListener("mouseenter", enter);
        panel.removeEventListener("mouseleave", leave);
        panel.removeEventListener("mousemove", handleTilt);
        cleanupBase();
      };
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="nutrition-section relative overflow-visible"
      style={{ minHeight: "145dvh" }}
    >
      {/* decor superior */}
      <img
        src="/images/slider-dip.png"
        alt="slider decoration"
        className="w-full object-cover select-none pointer-events-none"
      />

      {/* ===== TITULARES ===== */}
      <div className="relative z-10 md:px-10 px-5 mt-10 md:mt-16">
        <div className="general-title relative flex flex-col justify-center items-start gap-24">
          <div className="overflow-hidden">
            <h1 className="nutrition-title [text-shadow:_0_1px_0_#27187E,_0_2px_0_#27187E,_0_6px_18px_rgba(39,24,126,0.35)]">
              Crecemos contigo</h1>
          </div>
          <div
            style={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
            className="nutrition-text-scroll [text-shadow:_0_1px_0_#758BFD,_0_2px_0_#758BFD,_0_6px_18px_rgba(117,139,253,0.35)]"
          >
            <div className="bg-yellow-brown pb-5 md:pt-0 pt-3 md:px-5 px-3 ">
              <h2 className="text-highlight">Amigos unidos</h2>
            </div>
          </div>
        </div>

        {/* ===== CARD ARRIBA-DERECHA (posicionado con absoluta solo en md+) ===== */}
        <div
          ref={copyCardRef}
          className="
            group
            md:absolute md:top-8 md:right-10  /* <-- fija el card en la esquina superior derecha */
            md:w-[min(36rem,38vw)] w-full
            mt-6 md:mt-0
            z-30 pointer-events-auto
            rounded-2xl p-[1px]
            bg-gradient-to-br from-[#dfe4ff] via-[#bfc9ff] to-[#e7ebff]
            shadow-[0_10px_30px_-10px_rgba(64,89,173,0.25)]
          "
        >
          <div
            className="
              relative rounded-2xl bg-white/85 backdrop-blur border border-white/60 p-5
              transition-shadow duration-300
              group-hover:shadow-[0_0_0_4px_rgba(197,209,255,0.55),0_20px_40px_-20px_rgba(64,89,173,0.35)]
            "
          >
            <p className="copy-plain font-paragraph text-[#4059ad] md:text-lg text-base leading-snug m-0">
            Imagina un lugar donde tu hijo se reconoce, se siente visto y encuentra amigos como él. En nuestro metaverso, personaliza su avatar y participa en actividades grupales hechas para acompañar, no apurar. Aquí celebramos lo pequeño, sostenemos lo difícil y convertimos cada sesión en una experiencia significativa, llena de juego, empatía y esperanza.
            </p>

            {/* Pill de trofeos */}
            <div className="relative mt-4">
              <div
                ref={pillRef}
                className="inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur
                           border border-[#e1e6ff] px-4 py-2 shadow-sm text-[#2f2fa2]
                           hover:shadow-md transition cursor-pointer select-none"
                title="Ver trofeos"
              >
                <span className="text-sm font-semibold">Trofeos</span>
                <span className="inline-flex items-center justify-center size-5 rounded-full bg-[#758bfd] text-white text-xs">6</span>
              </div>

              {/* Panel hover/tap con carrusel de trofeos */}
              <div
                ref={panelRef}
                className="
                  absolute md:right-0 md:left-auto left-0
                  mt-3 w-[min(92vw,620px)]
                  rounded-3xl bg-gradient-to-br from-white/95 via-[#eef1ff]/95 to-[#dfe4ff]/90
                  backdrop-blur border border-white/70 shadow-[0_25px_65px_-35px_rgba(39,24,126,0.55)]
                  p-5 md:p-6 z-30 origin-top-right
                "
              >
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#758bfd] via-[#aeb8fe] to-[#27187e] shadow-[0_18px_32px_-18px_rgba(39,24,126,0.6)]">
                      <img
                        src="/images/pupilo-icono.png"
                        alt="Icono Pupilo"
                        className="h-9 w-9 object-contain drop-shadow-[0_6px_10px_rgba(39,24,126,0.35)]"
                      />
                    </span>
                    <div>
                      <p className="text-[0.7rem] uppercase tracking-[0.28em] text-[#7180e9] font-semibold mb-1">
                        Logros destacados
                      </p>
                      <p className="text-sm md:text-base font-paragraph text-[#2f2fa2]">
                        Trofeos y sonrisas desbloqueadas
                      </p>
                    </div>
                  </div>
                  <span className="hidden md:inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/60 px-3 py-1 text-xs font-semibold text-[#4059ad] shadow-sm">
                    Colección activa
                    <span className="inline-flex size-5 items-center justify-center rounded-full bg-[#fec601] text-[#222123] text-[0.65rem]">
                      {TROPHY_IMAGES.length}
                    </span>
                  </span>
                </div>

                <div
                  className="relative overflow-hidden rounded-2xl border border-[#e1e6ff]/70 bg-white/75 p-3"
                  style={{
                    WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)",
                    maskImage: "linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)",
                  }}
                >
                  <div className="absolute inset-y-4 left-0 w-16 bg-gradient-to-r from-white to-transparent pointer-events-none" />
                  <div className="absolute inset-y-4 right-0 w-16 bg-gradient-to-l from-white to-transparent pointer-events-none" />

                  <div className="flex gap-7 will-change-transform">
                    <div ref={trackRef} className="flex gap-7">
                      {TROPHY_IMAGES.map((src, i) => {
                        const backdrop = TROPHY_BACKDROPS[i % TROPHY_BACKDROPS.length];
                        return (
                          <div
                            key={`t-${i}`}
                            className="trophy-card group/trophy relative w-[130px] h-[130px] md:w-[190px] md:h-[190px] flex-none"
                            style={{ transformStyle: "preserve-3d" }}
                          >
                            <div className="absolute inset-0 rounded-[28px] opacity-0 group-hover/trophy:opacity-100 transition-opacity duration-300 pointer-events-none bg-[radial-gradient(circle_at_top,_rgba(254,198,1,0.58)_0%,_rgba(39,24,126,0)_75%)] blur-[2px]" />
                            <div className="relative h-full w-full rounded-[28px] p-[3px] bg-gradient-to-br from-[#27187e] via-[#758bfd] to-[#fec601] shadow-[0_28px_50px_-28px_rgba(39,24,126,0.78)]">
                              <div className="relative h-full w-full overflow-hidden rounded-[24px] border border-white/80 bg-black/15 backdrop-blur-sm flex flex-col items-center justify-center">
                                <img
                                  src={backdrop}
                                  alt={`Escenario Pupilo ${i + 1}`}
                                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(.19,1,.22,1)] scale-[1.08] group-hover/trophy:scale-[1.24]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-br from-[#02010a]/75 via-[#27187e]/45 to-transparent mix-blend-multiply" />
                                <div className="absolute inset-0 opacity-0 group-hover/trophy:opacity-100 transition-opacity duration-300 bg-[linear-gradient(135deg,rgba(117,139,253,0.45)_0%,rgba(254,198,1,0.68)_40%,rgba(255,255,255,0)_85%)]" />

                                <span className="relative z-10 self-start mt-2 ml-2 rounded-full bg-white/90 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-[#27187e] shadow-[0_12px_24px_-18px_rgba(39,24,126,0.55)]">
                                  Logro {i + 1}
                                </span>

                                <div className="relative z-10 flex items-center justify-center pt-2">
                                  <span className="pointer-events-none absolute inset-[-28%] bg-[radial-gradient(circle,_rgba(254,198,1,0.38)_0%,_rgba(118,129,255,0)_70%)] blur-[36px]" />
                                  <img
                                    src={src}
                                    alt={`trofeo ${i + 1}`}
                                    className="relative w-[78%] h-[78%] object-contain drop-shadow-[0_34px_36px_rgba(39,24,126,0.32),0_20px_24px_rgba(254,198,1,0.22)] transition-transform duration-450 ease-[cubic-bezier(.22,1,.36,1)] group-hover/trophy:-translate-y-3 group-hover/trophy:scale-[1.16]"
                                  />
                                </div>

                                <span className="trophy-glow pointer-events-none absolute inset-[11%] rounded-[20px] border border-white/75 opacity-0 shadow-[0_28px_40px_-20px_rgba(254,198,1,0.78)]" />
                                <span className="pointer-events-none absolute bottom-3 right-3 text-xs text-white/90 font-semibold tracking-[0.2em] uppercase">
                                  Pupilo
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <p className="mt-5 text-xs md:text-sm leading-relaxed text-[#5a68d8] font-paragraph">
                  Cada trofeo celebra avances únicos: desde completar misiones sensoriales hasta liderar aventuras colaborativas con otros Pupilos.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* fin card derecha */}
      </div>

      {/* ===== ISLA ===== */}
      <div
        ref={wrapperRef}
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 md:bottom-[-110px] bottom-[-60px] z-0 will-change-transform"
      >
        <div ref={speedLayerRef}>
          <img
            ref={breathImgRef}
            src="/images/big-imagen.PNG"
            alt="product display"
            className="select-none md:w-[76vw] w-[128vw] md:max-w-[1180px] max-w-none h-auto object-contain"
            style={{ position: "static" }}
          />
        </div>
        {/* sombra + degradé de transición */}
        <div className="relative mt-[-16px]">
          <div className="mx-auto h-10 w-[72vw] max-w-[980px] blur-[24px] rounded-full bg-black/22 opacity-70" />
          <div className="pointer-events-none absolute inset-x-0 bottom-[-2px] h-16 bg-gradient-to-b from-transparent to-[var(--color-warm-base)]" />
        </div>
      </div>

      {/* ===== KPIs ===== */}
      <div className="absolute inset-x-0 md:bottom-6 bottom-4 md:px-10 px-5 z-10">
        <div
          ref={kpisRef}
          className="mx-auto bg-[#ecf0ff]/95 rounded-full border-[.5vw] border-[#d3dbff] max-w-7xl md:py-7 py-5 md:px-0 px-5 shadow-[0_20px_50px_-20px_rgba(30,41,59,0.35)] ring-1 ring-black/10 backdrop-blur"
        >
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-0">
            {lists.map((nutrient, index) => (
              <div key={index} className="kpi-item relative flex flex-col items-start md:items-center">
                <div className="md:px-3">
                  <p className="md:text-base text-sm font-paragraph text-[#4653c6]">{nutrient.label}</p>
                  <p className="font-paragraph text-xs mt-1 text-[#6b7ae0]">hasta</p>
                  <p className="text-2xl md:text-3xl tracking-tighter font-bold text-[#2f2fa2]">
                    {nutrient.amount}
                  </p>
                </div>
                {index !== lists.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 h-10 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-[#9aaeff] to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* degradé base de seguridad */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-[var(--color-warm-base)]" />
    </section>
  );
};

export default NutritionSection;