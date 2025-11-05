'use client';

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const tabs = [
  { id: "login", label: "Ya tengo cuenta" },
  { id: "register", label: "Crear una cuenta" },
];

const characters = [
  {
    id: "dragon-left",
    src: "/images/dragon-pupilo.jpeg",
    alt: "Dragón Pupilo",
    className: "left dragon",
    width: 620,
    height: 620,
  },
  {
    id: "mushroom-left",
    src: "/images/hongo-pupilo.jpeg",
    alt: "Hongo Pupilo",
    className: "left mushroom",
    width: 620,
    height: 620,
  },
  {
    id: "mermaid-right",
    src: "/images/sirena-pupilo.jpeg",
    alt: "Sirena Pupilo",
    className: "right mermaid",
    width: 620,
    height: 620,
  },
  {
    id: "penguin-right",
    src: "/images/pinguino-pupilo.jpeg",
    alt: "Pingüino Pupilo",
    className: "right penguin",
    width: 620,
    height: 620,
  },
];

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".login-character",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          ease: "back.out(1.4)",
          duration: 1,
        }
      );

      gsap.to(".login-character", {
        y: 18,
        repeat: -1,
        yoyo: true,
        duration: 3,
        ease: "sine.inOut",
        stagger: 0.2,
      });

      if (cardRef.current) {
        gsap.from(cardRef.current, {
          autoAlpha: 0,
          y: 60,
          duration: 0.6,
          ease: "power2.out",
          delay: 0.25,
        });
      }
    }, sceneRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="login-page" ref={sceneRef}>
      <div className="login-bg" aria-hidden="true" />

      {characters.map((character) => (
        <div key={character.id} className={`login-character ${character.className}`}>
          <Image
            src={character.src}
            alt={character.alt}
            width={character.width}
            height={character.height}
            priority
          />
        </div>
      ))}

      <header className="login-header">
        <Link href="/">
          <img src="/images/logo-pupilo.svg" alt="Pupilo" />
        </Link>
      </header>

      <div className="login-card" ref={cardRef}>
        <nav className="login-tabs" aria-label="Opciones de acceso">
          {tabs.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id as "login" | "register")}
              className={activeTab === id ? "active" : ""}
            >
              {label}
            </button>
          ))}
        </nav>

        {activeTab === "login" ? (
          <form className="login-form" aria-label="Formulario de inicio de sesión">
            <div className="form-group">
              <label htmlFor="login-email">Correo electrónico</label>
              <input
                id="login-email"
                type="email"
                placeholder="nombre@correo.com"
                autoComplete="email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="login-password">Contraseña</label>
              <input
                id="login-password"
                type="password"
                placeholder="********"
                autoComplete="current-password"
                required
              />
            </div>
            <button type="submit" className="login-submit">
              Iniciar sesión
            </button>
            <p className="login-help">
              ¿Olvidaste tu contraseña?{' '}
              <a href="#" className="login-link">
                Recuperarla
              </a>
            </p>
          </form>
        ) : (
          <form className="login-form" aria-label="Formulario de registro">
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="register-name">Nombre del niño/a</label>
                <input
                  id="register-name"
                  type="text"
                  placeholder="Ej. Valentina"
                  autoComplete="name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="register-guardian">Contacto familiar</label>
                <input
                  id="register-guardian"
                  type="text"
                  placeholder="Nombre del adulto responsable"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="register-email">Correo electrónico</label>
              <input
                id="register-email"
                type="email"
                placeholder="familia@correo.com"
                autoComplete="email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="register-password">Contraseña</label>
              <input
                id="register-password"
                type="password"
                placeholder="Mínimo 8 caracteres"
                autoComplete="new-password"
                required
              />
            </div>
            <button type="submit" className="login-submit">
              Crear cuenta Pupilo
            </button>
            <p className="login-help">
              Registrarte te permitirá guardar misiones, progreso y recomendaciones
              personalizadas.
            </p>
          </form>
        )}
      </div>

      <footer className="login-footer">
        <p>
          ¿Necesitas ayuda? Escríbenos a{' '}
          <a href="mailto:hola@pupilo.app" className="login-link">
            hola@pupilo.app
          </a>
        </p>
      </footer>
    </section>
  );
};

export default LoginPage;
