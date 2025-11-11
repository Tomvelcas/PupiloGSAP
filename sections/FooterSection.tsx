'use client';

import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(3, "Cuéntanos tu nombre"),
  email: z.string().email("Correo inválido"),
  role: z.string().min(1, "Selecciona tu rol"),
  interest: z.string().min(1, "Selecciona un interés"),
  message: z
    .string()
    .min(10, "Comparte al menos 10 caracteres")
    .max(600, "Mantén el mensaje breve (600 caracteres)"),
});

type ContactFormState = z.infer<typeof contactSchema>;

const defaultValues: ContactFormState = {
  name: "",
  email: "",
  role: "",
  interest: "",
  message: "",
};

const FooterSection = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [formValues, setFormValues] = useState<ContactFormState>(defaultValues);
  const [formErrors, setFormErrors] = useState<Record<keyof ContactFormState, string>>({
    name: "",
    email: "",
    role: "",
    interest: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof ContactFormState) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
    setFormErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const result = contactSchema.safeParse(formValues);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setFormErrors({
        name: fieldErrors.name?.[0] ?? "",
        email: fieldErrors.email?.[0] ?? "",
        role: fieldErrors.role?.[0] ?? "",
        interest: fieldErrors.interest?.[0] ?? "",
        message: fieldErrors.message?.[0] ?? "",
      });
      setIsSubmitting(false);
      return;
    }

    const { name, email, role, interest, message } = result.data;
    const subject = `Quiero hablar con Pupilo - ${name}`;
    const body = [
      `Nombre completo: ${name}`,
      `Correo: ${email}`,
      `Rol principal: ${role}`,
      `Interés principal: ${interest}`,
      "",
      "Mensaje:",
      message,
    ].join("\n");

    window.location.href = `mailto:pupiloaprendeyjuega@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setIsSubmitting(false);
  };

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

              <form className="wave-contact-form" onSubmit={handleSubmit} noValidate>
                <div className="wave-form-grid">
                  <label className="wave-field">
                    <span>Nombre completo</span>
                    <input
                      type="text"
                      placeholder="Carolina Mejía"
                      value={formValues.name}
                      onChange={handleChange("name")}
                      required
                    />
                    {formErrors.name && <small className="wave-error">{formErrors.name}</small>}
                  </label>

                  <label className="wave-field">
                    <span>Correo electrónico</span>
                    <input
                      type="email"
                      placeholder="carolina@fundacion.org"
                      value={formValues.email}
                      onChange={handleChange("email")}
                      required
                    />
                    {formErrors.email && <small className="wave-error">{formErrors.email}</small>}
                  </label>

                  <label className="wave-field">
                    <span>Rol principal</span>
                    <select value={formValues.role} onChange={handleChange("role")} required>
                      <option value="" disabled>
                        Selecciona una opción
                      </option>
                      <option>Dirección / Coordinación</option>
                      <option>Terapeuta / Docente</option>
                      <option>Padre / Madre de familia</option>
                      <option>Aliado tecnológico</option>
                      <option>Investigación / Academia</option>
                      <option>Sector público / ONG</option>
                      <option>Inversionista / Partners</option>
                    </select>
                    {formErrors.role && <small className="wave-error">{formErrors.role}</small>}
                  </label>

                  <label className="wave-field">
                    <span>Interés principal</span>
                    <select value={formValues.interest} onChange={handleChange("interest")} required>
                      <option value="" disabled>
                        ¿Qué te gustaría explorar?
                      </option>
                      <option>Implementación en mi institución</option>
                      <option>Actividades personalizadas para mi hijo/a</option>
                      <option>Alianzas y contenidos terapéuticos</option>
                      <option>Prensa / Difusión</option>
                      <option>Capacitaciones y talleres para equipos</option>
                      <option>Integraciones tecnológicas</option>
                      <option>Simplemente me encantó el proyecto</option>
                    </select>
                    {formErrors.interest && <small className="wave-error">{formErrors.interest}</small>}
                  </label>
                </div>

                <label className="wave-field wave-field--textarea">
                  <span>Cuéntanos brevemente qué buscas</span>
                  <textarea
                    placeholder="Ej. Buscamos ejercicios que apoyen sesiones grupales de niños 6-9 años..."
                    rows={3}
                    value={formValues.message}
                    onChange={handleChange("message")}
                    />
                  {formErrors.message && <small className="wave-error">{formErrors.message}</small>}
                </label>

                <div className="wave-form-actions">
                  <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Enviando..." : "Quiero hablar con Pupilo"}
                  </button>
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
              <a className="social-btn" href="https://www.instagram.com/pupilo_juegayaprende/?utm_source=ig_web_button_share_sheet" target="_blank" rel="noreferrer" aria-label="Instagram">
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
