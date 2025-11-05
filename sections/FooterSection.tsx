'use client';

import { useMediaQuery } from "react-responsive";

const FooterSection = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <section className="footer-section">
      {/* Ola superior */}
      <img src="/images/footer-dip.png" alt="" className="w-full object-cover -translate-y-1" />

      {/* Contenido (más compacto) */}
      <div className="relative md:pt-[12vh] pt-[8vh] md:pb-16 pb-14">
        {/* Título */}
        <div className="overflow-hidden relative z-20">
          <h1 className="general-title text-center text-milk py-6">#Juntos Es Más Fácil</h1>
        </div>

        {/* GRID: (L) tarjeta de contacto | (R) personaje + redes */}
        <div className="relative z-10 mx-auto max-w-7xl md:grid md:grid-cols-[1.05fr_0.95fr] gap-8 md:px-10 px-5 md:items-start">
          {/* Columna izquierda */}
          <div className="space-y-6">
            {/* Tarjeta de contacto */}
            <div className="wave-contact">
              <h2>¿Quieres más información?</h2>
              <p>
                Compártenos tus datos para adaptar una demo y enviarte recursos según tus necesidades.
              </p>

              <form className="wave-contact-form" onSubmit={(e) => e.preventDefault()}>
                <div className="wave-form-grid">
                  <label className="wave-field">
                    <span>Nombre completo</span>
                    <input type="text" placeholder="Carolina Mejía" required />
                  </label>

                  <label className="wave-field">
                    <span>Correo electrónico</span>
                    <input type="email" placeholder="carolina@fundacion.org" required />
                  </label>

                  <label className="wave-field">
                    <span>Rol principal</span>
                    <select defaultValue="">
                      <option value="" disabled>
                        Selecciona una opción
                      </option>
                      <option>Dirección / Coordinación</option>
                      <option>Terapeuta / Docente</option>
                      <option>Padre / Madre de familia</option>
                      <option>Aliado tecnológico</option>
                    </select>
                  </label>

                  <label className="wave-field">
                    <span>Interés principal</span>
                    <select defaultValue="">
                      <option value="" disabled>
                        ¿Qué te gustaría explorar?
                      </option>
                      <option>Implementación en mi institución</option>
                      <option>Actividades personalizadas para mi hijo/a</option>
                      <option>Alianzas y contenidos terapéuticos</option>
                      <option>Prensa / Difusión</option>
                    </select>
                  </label>
                </div>

                <label className="wave-field wave-field--textarea">
                  <span>Cuéntanos brevemente qué buscas</span>
                  <textarea
                    placeholder="Ej. Buscamos ejercicios que apoyen sesiones grupales de niños 6-9 años..."
                    rows={3}
                  />
                </label>

                <div className="wave-form-actions">
                  <button type="submit">Quiero hablar con Pupilo</button>
                  <small>Te contactaremos en máximo 24 horas hábiles.</small>
                </div>
              </form>
            </div>
          </div>

          {/* Columna derecha: personaje + redes */}
          <div className="relative">
            <div className="relative md:h-[70vh] h-[42vh] w-full">
              {/* Personaje grande */}
              <div className="absolute inset-0 z-0 flex md:items-end items-center md:justify-center justify-center pointer-events-none select-none">
                {isMobile ? (
                  <img
                    src="/images/hongo-pj.png"
                    alt="Pupilo personaje"
                    className="max-h-full object-contain md:-translate-y-8 md:scale-[1.45] scale-[1.12]"
                  />
                ) : (
                  <img
                    src="/videos/hongo-2.gif"
                    alt="Pupilo ambient animation"
                    className="max-h-full object-contain md:-translate-y-10 md:scale-[1.5] scale-[1.15]"
                  />
                )}
              </div>
            </div>

            {/* Redes debajo del personaje */}
            <div className="relative z-10 mt-4 flex justify-center gap-4 pointer-events-auto">
              <a className="social-btn" href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
                <img src="/images/yt.svg" alt="" />
              </a>
              <a className="social-btn" href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                <img src="/images/insta.svg" alt="" />
              </a>
              <a className="social-btn" href="https://tiktok.com" target="_blank" rel="noreferrer" aria-label="TikTok">
                <img src="/images/tiktok.svg" alt="" />
              </a>
            </div>
          </div>
        </div>

        {/* Enlaces inferiores (más pegados) */}
        <div className="mt-10 md:px-10 px-5 flex gap-10 md:flex-row flex-col justify-between text-milk font-paragraph md:text-lg font-medium relative z-20">
          <div className="flex items-start md:gap-16 gap-8">
            <div>
              <p className="opacity-70">Mundos Pupilo</p>
            </div>
            <div className="space-y-1">
              <p>Explorar mundos</p>
              <p>Juegos en vivo</p>
              <p>Academia familiar</p>
            </div>
            <div className="space-y-1">
              <p>Equipo</p>
              <p>Soporte</p>
              <p>Blog</p>
            </div>
          </div>
        </div>

        {/* Fila final */}
        <div className="copyright-box relative z-20">
          <p>Copyright © 2025 Pupilo - Todos los derechos reservados</p>
          <div className="flex items-center gap-7">
            <p>Política de privacidad</p>
            <p>Términos de servicio</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FooterSection;
