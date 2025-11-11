'use client';

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const TestimonialSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      gsap.set(section, {
        marginTop: "-140vh",
      });

      const titleTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "200% top",
          scrub: true,
        },
      });

      titleTimeline
        .to(".first-title", {
          xPercent: 70,
        })
        .to(
          ".sec-title",
          {
            xPercent: 25,
          },
          "<"
        )
        .to(
          ".third-title",
          {
            xPercent: -50,
          },
          "<"
        );

      const cardTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "10% top",
          end: "200% top",
          scrub: 1.5,
          pin: true,
        },
      });

      cardTimeline.from(".vd-card", {
        yPercent: 150,
        stagger: 0.2,
        ease: "power1.inOut",
      });
    },
    { scope: sectionRef }
  );

  return (
    <section className="testimonials-section" ref={sectionRef}>
      <div className="absolute size-full flex flex-col items-center pt-[5vw]">
        <h1 className="text-black first-title">LO QUE</h1>
        <h1 className="sec-title" style={{ color: "var(--color-highlight)" }}>
          NOS UNE
        </h1>
        <h1 className="text-black third-title">CADA DÍA</h1>
      </div>

      <div className="pin-box">
        <div className="vd-card translate-y-[-5%] rotate-z-[-6deg] review-card review-card--glow">
          <blockquote className="review-content">
            <div className="review-stars">
              ★★★★★
              <span className="sr-only">5 de 5 estrellas</span>
            </div>
            <p>
              “Desde que usamos Pupilo, mis consultas terminan con sonrisas. Ya
              no es solo terapia: es un viaje lleno de juegos y descubrimientos
              que puedo personalizar para cada niño en segundos.”
            </p>
            <footer>
              <strong>Paola Delgado</strong>
              <span>Terapeuta ocupacional infantil</span>
            </footer>
          </blockquote>
        </div>

        <div className="vd-card translate-y-[8%] rotate-z-[5deg] therapist-card therapist-card--glow">
          <img
            src="/images/terapeuta1.jpg"
            alt="Paola guiando una sesión con Pupilo"
            className="therapist-photo"
          />
          <figcaption>
            <strong>Pupilo en acción</strong>
            <span>Diseñando misiones sensoriales en vivo</span>
          </figcaption>
        </div>

        <div className="vd-card translate-y-[12%] rotate-z-[-4deg] review-card review-card--glow">
          <blockquote className="review-content">
            <div className="review-stars">
              ★★★★☆
              <span className="sr-only">4 de 5 estrellas</span>
            </div>
            <p>
              “Mis familias sienten compañía real. Pupilo combina la visión de los
              terapeutas con IA para adaptar cada misión y seguir el ritmo de
              cada niño, incluso cuando no podemos estar presentes.”
            </p>
            <footer>
              <strong>Rosario Angulo</strong>
              <span>Psicóloga del desarrollo</span>
            </footer>
          </blockquote>
        </div>

        <div className="vd-card translate-y-[-2%] rotate-z-[3deg] therapist-card therapist-card--glow">
          <img
            src="/images/terapeuta2.jpg"
            alt="Rosario revisando el progreso de Pupilo"
            className="therapist-photo"
          />
          <figcaption>
            <strong>Historias que inspiran</strong>
            <span>Analizando el progreso con familias</span>
          </figcaption>
        </div>

        <div className="vd-card translate-y-[10%] rotate-z-[-8deg] review-card review-card--glow">
          <blockquote className="review-content">
            <div className="review-stars">
              ★★★★★
              <span className="sr-only">5 de 5 estrellas</span>
            </div>
            <p>
              “Con Pupilo diseño sesiones grupales en minutos. Mis pacientes
              exploran, se conectan y celebran cada logro con su avatar, lo cual
              fortalece la confianza y la continuidad terapéutica.”
            </p>
            <footer>
              <strong>Gabriela Mena</strong>
              <span>Neuropsicóloga infantil</span>
            </footer>
          </blockquote>
        </div>

        <div className="vd-card translate-y-[4%] rotate-z-[6deg] therapist-card therapist-card--glow">
          <img
            src="/images/terapeuta3.jpg"
            alt="Gabriela guiando una experiencia interactiva"
            className="therapist-photo"
          />
          <figcaption>
            <strong>Metaverso terapéutico</strong>
            <span>Actividades colaborativas en Pupilo</span>
          </figcaption>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
