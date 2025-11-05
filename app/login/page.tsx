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

const highlights = [
  "Plantillas IA co-creadas con terapeutas en tiempo real.",
  "Seguimiento compartido con la familia y el equipo clínico.",
  "Metaverso seguro con juegos que estimulan cada sentido.",
];

const characters = [
  {
    id: "dragon-left-top",
    src: "/images/dragon-pj.svg",
    alt: "Dragón Pupilo",
    className: "left-top",
    width: 460,
    height: 460,
  },
  {
    id: "mushroom-left-mid",
    src: "/images/hongo-pj.svg",
    alt: "Guardián Hongo",
    className: "left-mid",
    width: 420,
    height: 420,
  },
  {
    id: "perro-left-bottom",
    src: "/images/perro-pj.svg",
    alt: "Perro Pupilo",
    className: "left-bottom",
    width: 400,
    height: 400,
  },
  {
    id: "sirena-right-top",
    src: "/images/sirena-pj.svg",
    alt: "Sirena Pupilo",
    className: "right-top",
    width: 440,
    height: 440,
  },
  {
    id: "pinguino-right-mid",
    src: "/images/pinguino-pj.svg",
    alt: "Pingüino Pupilo",
    className: "right-mid",
    width: 420,
    height: 420,
  },
  {
    id: "milly-right-bottom",
    src: "/images/milly-pj.svg",
    alt: "Milly Pupilo",
    className: "right-bottom",
    width: 380,
    height: 380,
  },
];

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.set(".login-page", { perspective: 1200 });

      gsap.fromTo(
        ".login-character",
        { y: 80, opacity: 0, scale: 0.92 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.1,
          ease: "back.out(1.4)",
          stagger: 0.18,
        }
      );

      gsap.to(".login-character", {
        y: 14,
        repeat: -1,
        yoyo: true,
        duration: 3.6,
        ease: "sine.inOut",
        stagger: 0.18,
      });

      if (cardRef.current) {
        gsap.from(cardRef.current, {
          autoAlpha: 0,
          y: 60,
          duration: 0.6,
          ease: "power2.out",
        });
      }

      gsap.from(".login-card__header > *", {
        y: 24,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.1,
        delay: 0.15,
      });

      gsap.from(".login-tabs button", {
        y: 16,
        opacity: 0,
        duration: 0.45,
        ease: "power2.out",
        stagger: 0.08,
        delay: 0.25,
      });

      gsap.from(".login-benefits li", {
        y: 18,
        opacity: 0,
        duration: 0.45,
        ease: "power2.out",
        stagger: 0.08,
        delay: 0.35,
      });

      gsap.to(".login-bg", {
        backgroundPosition: "120% 50%",
        duration: 18,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sceneRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".login-form-wrapper",
        { autoAlpha: 0, y: 28 },
        { autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out" }
      );

      gsap.from(".login-form .form-group, .login-form .form-actions, .login-form .login-help, .login-form .form-agreement", {
        y: 18,
        opacity: 0,
        duration: 0.4,
        ease: "power2.out",
        stagger: 0.06,
        delay: 0.1,
      });
    }, sceneRef);

    return () => ctx.revert();
  }, [activeTab]);

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
        <div className="login-card__halo" aria-hidden="true" />

        <div className="login-card__header">
          <span className="login-pill">Explora Pupilo</span>
          <h2>Pensado para acompañar cada progreso</h2>
          <p>
            Personaliza misiones, comparte avances con tu equipo terapéutico y mantén la magia del juego en cada sesión.
          </p>
        </div>

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

        <div className="login-panel">
          <div className="login-form-wrapper">
            {activeTab === "login" ? (
              <form className="login-form" aria-label="Formulario de inicio de sesión">
                <div className="form-group">
                  <label htmlFor="login-email">
                    Correo electrónico
                    <span>Ingresa el correo asociado a tu cuenta</span>
                  </label>
                  <div className="input-shell">
                    <input
                      id="login-email"
                      type="email"
                      placeholder="nombre@familia.com"
                      autoComplete="email"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="login-password">
                    Contraseña
                    <span>Cuidamos tu acceso con cifrado y monitoreo seguro</span>
                  </label>
                  <div className="input-shell">
                    <input
                      id="login-password"
                      type="password"
                      placeholder="********"
                      autoComplete="current-password"
                      required
                    />
                  </div>
                </div>

                <div className="form-actions">
                  <button type="submit" className="login-submit">
                    Iniciar sesión
                  </button>
                  <button type="button" className="login-ghost">
                    Ver demo guiada
                  </button>
                </div>

                <p className="login-help">
                  ¿Olvidaste tu contraseña?{' '}
                  <a href="#" className="login-link">
                    Recuperar acceso
                  </a>
                </p>
              </form>
            ) : (
              <form className="login-form" aria-label="Formulario de registro">
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="register-name">
                      Nombre del niño/a
                      <span>Así personalizamos misiones y recompensas</span>
                    </label>
                    <div className="input-shell">
                      <input
                        id="register-name"
                        type="text"
                        placeholder="Ej. Valentina"
                        autoComplete="name"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="register-guardian">
                      Contacto familiar
                      <span>Persona encargada de recibir avances y alertas</span>
                    </label>
                    <div className="input-shell">
                      <input
                        id="register-guardian"
                        type="text"
                        placeholder="Nombre del adulto responsable"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="register-email">
                    Correo electrónico
                    <span>Usaremos este correo para compartir reportes y novedades</span>
                  </label>
                  <div className="input-shell">
                    <input
                      id="register-email"
                      type="email"
                      placeholder="familia@correo.com"
                      autoComplete="email"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="register-password">
                    Contraseña
                    <span>Crea una clave segura de mínimo 8 caracteres</span>
                  </label>
                  <div className="input-shell">
                    <input
                      id="register-password"
                      type="password"
                      placeholder="Mínimo 8 caracteres"
                      autoComplete="new-password"
                      required
                    />
                  </div>
                </div>

                <p className="form-agreement">
                  Al crear tu cuenta aceptas nuestras{' '}
                  <a href="#">Políticas de privacidad</a> y{' '}
                  <a href="#">Términos de servicio</a>.
                </p>

                <div className="form-actions">
                  <button type="submit" className="login-submit">
                    Crear cuenta Pupilo
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        <ul className="login-benefits">
          {highlights.map((item) => (
            <li key={item}>
              <span>✨</span>
              <p>{item}</p>
            </li>
          ))}
        </ul>
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
