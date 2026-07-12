import SiteHeader from "@/components/SiteHeader";
import { siteData } from "@/data/siteData";

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="contact-page">
        <section className="contact-section section" id="contacto">
          <div className="contact-panel reveal">
            <p className="eyebrow light">Hablemos de tu proyecto</p>
            <h2>Construyamos algo que haga avanzar tu negocio.</h2>
            <p>
              Cuéntanos qué necesitas y te responderemos con una propuesta clara,
              alcance recomendado y siguientes pasos.
            </p>
            <div className="contact-actions">
              <a
                className="button button-light"
                href={siteData.contact.whatsapp}
                target="_blank"
                rel="noreferrer"
              >
                Escribir por WhatsApp
              </a>
              <a className="contact-email" href={`mailto:${siteData.contact.email}`}>
                {siteData.contact.email}
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
