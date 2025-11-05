'use client';

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ClipPathTitle from "@/components/ClipPathTitle";
import VideoPinSection from "@/components/VideoPinSection";

const BenefitSection = () => {
  useGSAP(() => {
    const revealTl = gsap.timeline({
      delay: 1,
      scrollTrigger: {
        trigger: ".benefit-section",
        start: "top 60%",
        end: "top top",
        scrub: 1.5,
      },
    });

    revealTl
      .to(".benefit-section .first-title", {
        duration: 1,
        opacity: 1,
        clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)",
        ease: "circ.out",
      })
      .to(".benefit-section .second-title", {
        duration: 1,
        opacity: 1,
        clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)",
        ease: "circ.out",
      })
      .to(".benefit-section .third-title", {
        duration: 1,
        opacity: 1,
        clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)",
        ease: "circ.out",
      })
      .to(".benefit-section .fourth-title", {
        duration: 1,
        opacity: 1,
        clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)",
        ease: "circ.out",
      })
      // NUEVO: animación del quinto beneficio
      .to(".benefit-section .fifth-title", {
        duration: 1,
        opacity: 1,
        clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)",
        ease: "circ.out",
      });
  });

  return (
    <section className="benefit-section">
      <div className="container mx-auto pt-20">
        <div className="col-center">
          <p>
            Descubre los beneficios: <br />
            conoce por qué las familias confían en Pupilo
          </p>

          <div className="mt-20 col-center">
            <ClipPathTitle
              title={"Rutinas diarias"}
              color={"#f4f6ff"}
              bg={"#758BFD"}
              className={"first-title"}
              borderColor={"#222123"}
            />
            <ClipPathTitle
              title={"Misiones adaptadas"}
              color={"#222123"}
              bg={"#f4f6ff"}
              className={"second-title"}
              borderColor={"#222123"}
            />
            <ClipPathTitle
              title={"Metaverso seguro"}
              color={"#f4f6ff"}
              bg={"#27187E"}
              className={"third-title"}
              borderColor={"#222123"}
            />
            <ClipPathTitle
              title={"Progreso compartido"}
              color={"#1C1F4F"}
              bg={"#C7D2FF"}
              className={"fourth-title"}
              borderColor={"#222123"}
            />
            {/* NUEVO: Potenciado con IA */}
            <ClipPathTitle
              title={"Potenciado con IA"}
              color={"#222123"}
              bg={"#FEC601"}
              className={"fifth-title   @apply rotate-[1deg] md:-translate-y-12 relative z-10"}
              borderColor={"#222123"}
            />
          </div>

          <div className="md:mt-0 mt-10">
            <p>Y mucho más ...</p>
          </div>
        </div>
      </div>

      <div className="relative overlay-box">
        <VideoPinSection />
      </div>
    </section>
  );
};

export default BenefitSection;
