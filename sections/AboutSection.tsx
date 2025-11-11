'use client';

import Image from "next/image";
import { ReactNode, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

type AboutCard = {
  title: string;
  summary: ReactNode;
};

const Highlight = ({ children }: { children: ReactNode }) => (
  <span className="about-emphasis">{children}</span>
);

const aboutCards: AboutCard[] = [
  {
    title: "Quiénes somos",
    summary: (
      <>
        <p>
          Pupilo es un proyecto creado por{" "}
          <Highlight>estudiantes de la Universidad de los Andes</Highlight> que
          decidieron convertir un reto académico en compañía real para familias.
        </p>
        <p>
          Diseñamos experiencias que abrazan la{" "}
          <Highlight>diversidad intelectual</Highlight> y celebran cada avance
          con respeto,  ambición y juegos respladados por expertos.
        </p>
      </>
    ),
  },
  {
    title: "Apertura",
    summary: (
      <>
        <p>
          Pupilo nace para niñas y niños con{" "}
          <Highlight>discapacidad cognitiva —especialmente con síndrome de Down—</Highlight>{" "}
          que necesitan aprendizaje seguro, emocionante y a su ritmo.
        </p>
        <p>
          Familias y colegios buscan actividades que{" "}
          <Highlight>conecten con sus gustos</Highlight> y les permitan socializar
          con pares que los entienden; Pupilo responde a esa necesidad.
        </p>
      </>
    ),
  },
  {
    title: "Pilar 1 · Personalización",
    summary: (
      <>
        <p>
          Ajustamos <Highlight>objetivos, apoyos visuales y tiempos</Highlight>{" "}
          para que cada misión sea clara, breve y gratificante.
        </p>
        <p>
          Así logramos menos frustración, más{" "}
          <Highlight>atención sostenida</Highlight> y cadenas de pequeños logros
          que impulsan lo socioemocional y cognitivo.
        </p>
      </>
    ),
  },
  {
    title: "Pilar 2 · Conexión entre pares",
    summary: (
      <>
        <p>
          Creamos un <Highlight>metaverso moderado</Highlight> donde los niños
          entran a salas con actividades grupales y encuentran compañeros con
          gustos similares.
        </p>
        <p>
          Aquí no se compite: se{" "}
          <Highlight>colabora para resolver retos</Highlight>, celebrar logros y
          practicar habilidades sociales en mundos inmersivos.
        </p>
      </>
    ),
  },
  {
    title: "Pilar 3 · Seguridad y apoyo",
    summary: (
      <>
        <p>
          Cada sesión ocurre en un entorno{" "}
          <Highlight>moderado y con contenidos validados</Highlight>, acompañado
          de controles parentales claros.
        </p>
        <p>
          Las familias reciben <Highlight>apoyo experto</Highlight> con
          recomendaciones sencillas para trasladar lo vivido a casa y a la
          escuela.
        </p>
      </>
    ),
  },
  {
    title: "Diferencial y Cierre",
    summary: (
      <>
        <p>
          Unimos <Highlight>mundos inmersivos con propósito terapéutico</Highlight>{" "}
          y acompañamiento humano que respeta el ritmo de cada niño.
        </p>
        <p>
          Estamos listos para pilotos con instituciones y familias que{" "}
          <Highlight>quieran construir un nuevo estándar</Highlight> de inclusión;
          si te resuena, hablemos, jugar también es crecer.
        </p>
      </>
    ),
  },
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      gsap.from(".about-card", {
        opacity: 0,
        y: 60,
        scale: 0.94,
        stagger: 0.12,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      gsap.fromTo(
        ".about-transition-band",
        {
          scaleY: 0,
          transformOrigin: "50% 0%",
        },
        {
          scaleY: 1,
          ease: "power2.out",
          duration: 0.8,
          scrollTrigger: {
            trigger: ".message-content",
            start: "bottom bottom",
            end: "bottom+=200 bottom",
            scrub: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section className="about-section" ref={sectionRef}>
      <div className="about-transition-band" aria-hidden />
      <div className="container mx-auto px-5 lg:px-10 py-24 md:py-32 relative z-10">
        <div className="max-w-4xl">
          <p className="text-xs md:text-sm uppercase tracking-[0.45em] text-milk/70 font-paragraph">
            Conecta con nuestra historia
          </p>
          <h2 className="mt-4 text-4xl md:text-6xl font-semibold text-milk leading-tight tracking-tight">
            Pensado con mentalidad emprendedora, creado para acompañar a las
            familias con respeto y claridad.
          </h2>
          <p className="mt-6 text-lg text-milk/80 font-paragraph max-w-2xl">
            Imaginamos cada detalle para que puedas integrar futuras imágenes,
            personajes y relatos sin perder el enfoque profesional del proyecto.
          </p>
        </div>

        <div className="about-grid mt-14 md:mt-20">
          {aboutCards.map((card, index) => (
            <article key={card.title} className="about-card">
              <span aria-hidden className="about-card-index">
                {index + 1 < 10 ? `0${index + 1}` : index + 1}
              </span>
              {index === 1 && (
                <div className="about-card-character" aria-hidden="true">
                  <Image
                    src="/images/lobo-card.png"
                    alt="Personaje lobo asomandose sobre la tarjeta"
                    width={220}
                    height={180}
                    priority={false}
                  />
                </div>
              )}
              <div className="text-center">
                <p className="text-xs uppercase tracking-[0.25em] text-milk/60 font-paragraph">
                  Pilar estratégico
                </p>
                <h3 className="mt-3 text-3xl font-semibold text-milk tracking-tight">
                  {card.title}
                </h3>
              </div>
              <div className="about-summary text-xl md:text-2xl text-milk/90 font-paragraph">
                {card.summary}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
