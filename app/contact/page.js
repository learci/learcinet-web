"use client";

import { useMemo, useState } from "react";
import { siteData } from "@/data/siteData";
import SiteHeader from "@/components/SiteHeader";

function ArrowUpRight({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" stroke="currentColor" strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M8.4 3.8 10 7.4c.3.7.1 1.5-.5 2L8 10.6a15.7 15.7 0 0 0 5.4 5.4l1.2-1.5c.5-.6 1.3-.8 2-.5l3.6 1.6c.7.3 1.1 1 1 1.8l-.3 2.2c-.1.8-.8 1.4-1.6 1.4C10.3 21 3 13.7 3 4.7c0-.8.6-1.5 1.4-1.6l2.2-.3c.8-.1 1.5.3 1.8 1Z"
        stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"
        stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    budget: "",
    message: "",
  });

  const mailtoLink = useMemo(() => {
    const subject = encodeURIComponent(
      `Nueva solicitud de proyecto${form.company ? ` · ${form.company}` : ""}`
    );
    const body = encodeURIComponent([
      `Nombre: ${form.name}`,
      `Correo: ${form.email}`,
      `Empresa: ${form.company || "No indicada"}`,
      `Servicio: ${form.service || "No indicado"}`,
      `Presupuesto: ${form.budget || "No indicado"}`,
      "",
      "Descripción del proyecto:",
      form.message,
    ].join("\n"));

    return `mailto:${siteData.contact.email}?subject=${subject}&body=${body}`;
  }, [form]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    window.location.href = mailtoLink;
  }

  return (
    <main className="contact-page">
      <SiteHeader />

<section className="contact-hero">
        <div className="contact-hero-copy">
          <p className="eyebrow">Contacto · LearciNet</p>
          <h1>Hablemos de una idea que merezca <span>hacerse realidad.</span></h1>
        </div>

        <div className="contact-hero-aside">
          <p>
            Comparte tu objetivo, el reto que quieres resolver y el resultado que
            esperas. Prepararemos una ruta clara para convertirlo en una solución digital útil.
          </p>
          <a href="#formulario" className="contact-scroll-link">
            Iniciar conversación <span><ArrowUpRight /></span>
          </a>
        </div>

        <div className="contact-hero-art" aria-hidden="true">
          <div className="contact-art-grid" />
          <div className="contact-art-orbit orbit-one" />
          <div className="contact-art-orbit orbit-two" />
          <div className="contact-art-center">
            <span>LET’S</span><strong>TALK</strong>
          </div>
          <div className="contact-art-note note-one">Ideas → sistemas</div>
          <div className="contact-art-note note-two">Diseño + tecnología</div>
        </div>
      </section>

      <section className="contact-main-section" id="formulario">
        <div className="contact-intro-column">
          <p className="eyebrow light">Inicia un proyecto</p>
          <h2>Cuéntanos qué necesitas construir.</h2>
          <p className="contact-intro-text">
            No necesitas tener todo definido. Con una descripción inicial podemos ayudarte
            a precisar alcance, tecnología, tiempos y próximos pasos.
          </p>

          <div className="contact-direct-list">
            <a href={`mailto:${siteData.contact.email}`} className="contact-direct-item">
              <span className="contact-direct-icon"><MailIcon /></span>
              <span><small>Correo</small><strong>{siteData.contact.email}</strong></span>
              <ArrowUpRight />
            </a>

            <a href={siteData.contact.whatsapp} target="_blank" rel="noreferrer"
              className="contact-direct-item">
              <span className="contact-direct-icon"><PhoneIcon /></span>
              <span><small>WhatsApp</small><strong>{siteData.contact.phone}</strong></span>
              <ArrowUpRight />
            </a>
          </div>
        </div>

        <form className="contact-form-card" onSubmit={handleSubmit}>
          <div className="form-heading">
            <span>01</span>
            <div>
              <p>Información inicial</p>
              <h2>Platícanos sobre tu proyecto.</h2>
            </div>
          </div>

          <div className="contact-form-grid">
            <label>
              <span>Nombre completo *</span>
              <input type="text" name="name" placeholder="¿Cómo te llamas?"
                value={form.name} onChange={handleChange} required />
            </label>

            <label>
              <span>Correo electrónico *</span>
              <input type="email" name="email" placeholder="nombre@empresa.com"
                value={form.email} onChange={handleChange} required />
            </label>

            <label>
              <span>Empresa o marca</span>
              <input type="text" name="company" placeholder="Nombre de tu empresa"
                value={form.company} onChange={handleChange} />
            </label>

            <label>
              <span>Servicio de interés</span>
              <select name="service" value={form.service} onChange={handleChange}>
                <option value="">Selecciona una opción</option>
                <option>Diseño y desarrollo web</option>
                <option>Tienda en línea</option>
                <option>Dashboard y analítica</option>
                <option>Automatización de procesos</option>
                <option>SEO y contenido</option>
                <option>Soporte tecnológico</option>
                <option>Otro proyecto</option>
              </select>
            </label>

            <label className="form-full">
              <span>Presupuesto estimado</span>
              <select name="budget" value={form.budget} onChange={handleChange}>
                <option value="">Selecciona un rango</option>
                <option>$2,500 a $5,000 MXN</option>
                <option>$5,001 a $10,000 MXN</option>
                <option>$10,001 a $25,000 MXN</option>
                <option>Más de $25,000 MXN</option>
                <option>Necesito orientación</option>
              </select>
            </label>

            <label className="form-full">
              <span>¿Qué quieres lograr? *</span>
              <textarea name="message"
                placeholder="Describe el proyecto, el problema que quieres resolver y cualquier fecha importante."
                rows="7" value={form.message} onChange={handleChange} required />
            </label>
          </div>

          <div className="form-footer">
            <p>Al enviar se abrirá tu aplicación de correo con la información capturada.</p>
            <button type="submit" className="contact-submit-button">
              Enviar solicitud <span><ArrowUpRight /></span>
            </button>
          </div>
        </form>
      </section>

      <section className="contact-details-section">
        <article className="contact-detail-card detail-accent">
          <span className="contact-detail-icon"><PinIcon /></span>
          <p>Ubicación</p>
          <h3>{siteData.contact.location}</h3>
          <small>Atención remota para proyectos en todo México.</small>
        </article>

        <article className="contact-detail-card">
          <span className="contact-detail-icon"><ClockIcon /></span>
          <p>Horario</p>
          <h3>{siteData.contact.schedule}</h3>
          <small>Normalmente respondemos dentro de un día hábil.</small>
        </article>

        <article className="contact-detail-card detail-dark">
          <p>¿Prefieres algo más directo?</p>
          <h3>Escríbenos por WhatsApp.</h3>
          <a href={siteData.contact.whatsapp} target="_blank" rel="noreferrer">
            Abrir conversación <ArrowUpRight />
          </a>
        </article>
      </section>

      <section className="contact-closing">
        <div>
          <p className="eyebrow light">El siguiente paso</p>
          <h2>Una buena solución comienza con una conversación clara.</h2>
        </div>
        <a href="#formulario" className="contact-closing-button">
          Cuéntanos tu idea <ArrowUpRight size={22} />
        </a>
      </section>

      <footer className="contact-footer">
        <a href="/" className="logo footer-logo">
          <span className="logo-mark">L</span><span>LearciNet</span>
        </a>
        <p>Diseño, tecnología y datos para convertir ideas en soluciones útiles.</p>
        <div>
          <a href="/">Inicio</a>
          <a href="/services">Servicios</a>
          <a href="/#proyectos">Proyectos</a>
        </div>
      </footer>
    </main>
  );
}
