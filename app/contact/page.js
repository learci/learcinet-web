import SiteHeader from "@/components/SiteHeader";
import { siteData } from "@/data/siteData";

function ContactCard({ title, value, description, href, children }) {
  return (
    <article className="contact-card">
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      {value && <strong>{value}</strong>}
      {href ? (
        <a className="contact-link" href={href} target="_blank" rel="noreferrer">
          {children || "Abrir"}
        </a>
      ) : (
        children && <div className="contact-meta">{children}</div>
      )}
    </article>
  );
}

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="contact-page contact-page-v2">
        <section className="contact-hero-v2 section" id="contacto">
          <div className="contact-hero-copy-v2">
            <p className="eyebrow light">Contacto</p>
            <h1>Listos para avanzar con tu proyecto</h1>
            <p>
              Cuéntanos qué necesitas y te responderemos con una propuesta clara,
              alcance recomendado y pasos siguientes para lanzar tu sitio o servicio.
            </p>
            <div className="contact-actions-v2">
              <a
                className="button button-light"
                href={siteData.contact.whatsapp}
                target="_blank"
                rel="noreferrer"
              >
                Escribir por WhatsApp
              </a>
              <a className="contact-email-v2" href={`mailto:${siteData.contact.email}`}>
                {siteData.contact.email}
              </a>
            </div>
          </div>

          <div className="contact-hero-card-v2">
            <div className="contact-hero-card-inner-v2">
              <span className="eyebrow light">Atención personalizada</span>
              <h2>Contacto directo y rápido en móvil y escritorio.</h2>
              <p>
                Nuestro equipo responde con una propuesta concreta y opciones de
                ejecución que se ajusten a tu negocio.
              </p>
              <ul className="contact-list-v2">
                <li>Mensaje directo por WhatsApp</li>
                <li>Correo de atención inmediata</li>
                <li>Horario: lunes a viernes, 9:00 a 18:00</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="contact-details-v2 section">
          <div className="contact-info-grid-v2">
            <ContactCard
              title="WhatsApp"
              value={siteData.contact.phone}
              description="Mensaje directo con tu idea, presupuesto o consulta."
              href={siteData.contact.whatsapp}
            >
              Enviar mensaje
            </ContactCard>

            <ContactCard
              title="Correo"
              value={siteData.contact.email}
              description="Escribe tus requerimientos y te enviamos el plan de trabajo."
              href={`mailto:${siteData.contact.email}`}
            >
              Enviar correo
            </ContactCard>

            <ContactCard
              title="Horario"
              value={siteData.contact.schedule}
              description="Atendemos de lunes a viernes con respuestas rápidas."
            />

            <ContactCard
              title="Ubicación"
              value={siteData.contact.location}
              description="Operamos desde Ciudad de México, con atención remota internacional."
            />
          </div>
        </section>
      </main>
    </>
  );
}
