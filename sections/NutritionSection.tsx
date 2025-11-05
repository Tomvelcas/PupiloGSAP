'use client';

import { useMediaQuery } from "react-responsive";
import { useEffect, useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { nutrientLists, type NutrientInfo } from "@/constants";

gsap.registerPlugin(ScrollTrigger, SplitText);

const TROPHY_IMAGES = [
  "/images/trophies/trophy-1.png",
  "/images/trophies/trophy-2.png",
  "/images/trophies/trophy-3.png",
  "/images/trophies/trophy-4.png",
  "/images/trophies/trophy-5.png",
  "/images/trophies/trophy-6.png",
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

    const openTl = gsap.timeline({ paused: true })
      .set(panel, { display: "block" })
      .to(panel, { opacity: 1, y: 0, pointerEvents: "auto", duration: 0.28, ease: "power2.out" });
    openTlRef.current = openTl;

    const cardW = 160;
    const gap = 20;
    const totalW = (cardW + gap) * TROPHY_IMAGES.length;

    const cloned = track.cloneNode(true) as HTMLDivElement;
    track.parentElement?.appendChild(cloned);

    const duration = matchMedia('(max-width: 768px)').matches ? 12 : 18;
    const loopTl = gsap.timeline({ repeat: -1, defaults: { ease: "none" }, paused: true });
    loopTl.to([track, cloned], { x: -totalW, duration }).set([track, cloned], { x: 0 });
    loopTlRef.current = loopTl;

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

    const enter = () => { openTl.play(); loopTl.play(); };
    const leave = () => { openTl.reverse(); loopTl.pause(); resetTilt(); };

    const isTouch = matchMedia('(pointer: coarse)').matches;
    if (isTouch) {
      const toggle = () => {
        const visible = Number(gsap.getProperty(panel, "opacity")) > 0.5;
        if (visible) { openTl.reverse(); loopTl.pause(); }
        else { openTl.play(); loopTl.play(); }
      };
      pill.addEventListener("click", toggle);
      return () => pill.removeEventListener("click", toggle);
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
            <h1 className="nutrition-title [text-shadow:_0_1px_0_#27187E,_0_2px_0_#27187E,_0_6px_18px_rgba(39,24,126,0.35)]
">Crecemos contigo</h1>
          </div>
          <div
            style={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
            className="nutrition-text-scroll [text-shadow:_0_1px_0_#758BFD,_0_2px_0_#758BFD,_0_6px_18px_rgba(117,139,253,0.35)]
 "
          >
            <div className="bg-yellow-brown pb-5 md:pt-0 pt-3 md:px-5 px-3 ">
              <h2 className=" --color-highlight ">Amigos unidos</h2>
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
                  absolute md:right-0 md:left-auto left-0 /* en desktop se alinea al borde derecho del card */
                  mt-3 w-[min(92vw,600px)]
                  rounded-2xl bg-white/95 backdrop-blur border border-[#e1e6ff] shadow-2xl p-4 z-30
                  origin-top-right
                "
              >
                <div className="text-xs font-paragraph text-[#6b7ae0] mb-2">Trofeos y logros Pupilo</div>

                <div
                  className="relative overflow-hidden"
                  style={{
                    WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
                    maskImage: "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
                  }}
                >
                  <div className="flex gap-5 will-change-transform">
                    {/* Track principal */}
                    <div ref={trackRef} className="flex gap-5">
                      {TROPHY_IMAGES.map((src, i) => (
                        <div
                          key={`t-${i}`}
                          className="trophy-card w-[120px] h-[120px] md:w-[160px] md:h-[160px] flex-none rounded-2xl relative p-[1px]
                                     [background:conic-gradient(from_180deg_at_50%_50%,#c7d2ff,transparent_35%,transparent_65%,#aeb8fe)]"
                          style={{ transformStyle: "preserve-3d" }}
                        >
                          <div className="rounded-2xl h-full w-full bg-white/98 grid place-items-center border border-[#e1e6ff] transition-transform duration-300">
                            <img src={src} alt={`trofeo ${i + 1}`} className="w-[78%] h-[78%] object-contain transition-transform duration-300" />
                          </div>
                          <span className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.55),transparent)]" />
                        </div>
                      ))}
                    </div>
                    {/* El clon se crea en useEffect para el loop */}
                  </div>
                </div>
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
