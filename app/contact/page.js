import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { siteData } from "@/data/siteData";
import styles from "./page.module.css";
import ContactForm from "./ContactForm";

function Arrow({ diagonal = true }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={
          diagonal
            ? "M6 18 18 6M6 6h12v12"
            : "M4 12h16m-6-6 6 6-6 6"
        }
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20.5 11.5a8.5 8.5 0 0 1-12.55 7.47L3 20.5l1.56-4.8A8.5 8.5 0 1 1 20.5 11.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.1 8.2c.2-.45.42-.46.62-.47h.52c.17 0 .35.05.45.3l.7 1.7c.08.2.04.38-.08.55l-.48.6c-.12.15-.1.3-.02.44.35.62.8 1.15 1.35 1.6.53.43 1.13.77 1.8 1 .18.06.31.02.42-.1l.7-.82c.14-.16.31-.2.5-.12l1.64.77c.2.1.32.2.34.35.03.15.03.87-.2 1.34-.22.47-1.27.9-1.75.94-.45.04-1.03.06-1.66-.14a10 10 0 0 1-3.77-2.22 9.12 9.12 0 0 1-2.57-3.2c-.42-.92-.45-1.61-.2-2.17Z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 5h18v14H3V5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="m3 6 9 7 9-7"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M12 7v5l3.5 2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle
        cx="12"
        cy="10"
        r="2.5"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}

const contactItems = [
  {
    number: "01",
    label: "WhatsApp",
    description:
      "La forma más rápida de contarnos tu idea, proyecto o necesidad.",
    icon: <WhatsAppIcon />,
    type: "link",
  },
  {
    number: "02",
    label: "Correo",
    description:
      "Ideal para compartir requerimientos, documentos o información detallada.",
    icon: <MailIcon />,
    type: "email",
  },
  {
    number: "03",
    label: "Horario",
    description:
      "Atención para proyectos, soporte y consultas comerciales.",
    icon: <ClockIcon />,
    type: "schedule",
  },
  {
    number: "04",
    label: "Ubicación",
    description:
      "Trabajamos desde Ciudad de México con atención remota.",
    icon: <LocationIcon />,
    type: "location",
  },
];

export const metadata = {
  title: "Contacto | LearciNet",
  description:
    "Contacta a LearciNet para diseño web, automatización, aplicaciones, datos y soluciones digitales.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  function getValue(type) {
    if (type === "link") return siteData.contact.phone;
    if (type === "email") return siteData.contact.email;
    if (type === "schedule") return siteData.contact.schedule;
    return siteData.contact.location;
  }

  return (
    <div className={styles.shell}>
      <a className={styles.skipLink} href="#contenido">
        Saltar al contenido
      </a>

      <SiteHeader />

      <main id="contenido" tabIndex={-1}>
        {/* HERO */}
        <section className={styles.hero} aria-labelledby="contact-title">
          <div className={styles.heroGrid} aria-hidden="true" />

          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>
                <span className={styles.labelLine} />
                Contacto · LearciNet
              </p>

              <h1 id="contact-title">
                ¿Tienes una idea?
                <br />
                <span>Hagámosla realidad.</span>
              </h1>

              <p className={styles.heroDescription}>
                Cuéntanos qué quieres construir, mejorar o automatizar.
                Analizamos tu necesidad y te proponemos un camino claro para
                convertirla en una solución digital real.
              </p>

              <div className={styles.heroActions}>
                <a
                  className={styles.primaryButton}
                  href={siteData.contact.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                >
                  Escribir por WhatsApp
                  <Arrow />
                </a>

                <a
                  className={styles.secondaryLink}
                  href={`mailto:${siteData.contact.email}`}
                >
                  Enviar correo
                  <Arrow diagonal={false} />
                </a>
              </div>
            </div>

            <div className={styles.heroPanel}>
              <div className={styles.panelOrb} aria-hidden="true">
                <div className={styles.orbCore} />
                <div className={styles.orbitOne} />
                <div className={styles.orbitTwo} />
              </div>

              <div className={styles.panelContent}>
                <span className={styles.panelIndex}>01 — CONVERSEMOS</span>

                <h2>
                  El siguiente
                  <br />
                  proyecto puede
                  <br />
                  empezar aquí.
                </h2>

                <p>
                  Diseño web, automatización, aplicaciones y datos conectados a
                  objetivos reales.
                </p>

                <div className={styles.panelStatus}>
                  <span className={styles.statusDot} />
                  <span>Disponible para nuevos proyectos</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.heroFooter}>
            <span>DISEÑO</span>
            <i>✳</i>
            <span>TECNOLOGÍA</span>
            <i>✳</i>
            <span>AUTOMATIZACIÓN</span>
            <i>✳</i>
            <span>DATOS</span>
          </div>
        </section>

        {/* CANALES DE CONTACTO */}
        <section className={styles.channels}>
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <div>
                <p className={styles.sectionEyebrow}>
                  <span>01 /</span> Canales de contacto
                </p>

                <h2>
                  Elige cómo
                  <br />
                  <em>empezamos.</em>
                </h2>
              </div>

              <p className={styles.sectionDescription}>
                No necesitas tener todo definido. Cuéntanos dónde estás y qué
                quieres lograr; nosotros te ayudamos a estructurar el siguiente
                paso.
              </p>
            </div>

            <div className={styles.contactGrid}>
              {contactItems.map((item) => {
                const value = getValue(item.type);

                return (
                  <article className={styles.contactCard} key={item.number}>
                    <div className={styles.cardTop}>
                      <span className={styles.icon}>{item.icon}</span>
                      <span className={styles.number}>{item.number}</span>
                    </div>

                    <div className={styles.cardBody}>
                      <p className={styles.cardLabel}>{item.label}</p>
                      <h3>{value}</h3>
                      <p>{item.description}</p>
                    </div>

                    {item.type === "link" && (
                      <a
                        className={styles.cardLink}
                        href={siteData.contact.whatsapp}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Enviar mensaje
                        <Arrow />
                      </a>
                    )}

                    {item.type === "email" && (
                      <a
                        className={styles.cardLink}
                        href={`mailto:${siteData.contact.email}`}
                      >
                        Enviar correo
                        <Arrow />
                      </a>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </section>
        {/* FORMULARIO DE CONTACTO */}
        <ContactForm />
        {/* PROCESO */}
        <section className={styles.process}>
          <div className={styles.container}>
            <div className={styles.processIntro}>
              <p className={styles.sectionEyebrow}>
                <span>02 /</span> Qué sucede después
              </p>

              <h2>
                Una conversación.
                <br />
                <em>Un camino claro.</em>
              </h2>
            </div>

            <ol className={styles.steps}>
              <li>
                <span>01</span>
                <div>
                  <h3>Nos cuentas tu idea</h3>
                  <p>
                    Entendemos qué necesitas, qué problema quieres resolver y
                    cuáles son tus objetivos.
                  </p>
                </div>
              </li>

              <li>
                <span>02</span>
                <div>
                  <h3>Diseñamos la solución</h3>
                  <p>
                    Definimos alcance, tecnología, entregables y una ruta de
                    implementación adecuada.
                  </p>
                </div>
              </li>

              <li>
                <span>03</span>
                <div>
                  <h3>La hacemos realidad</h3>
                  <p>
                    Construimos, validamos y ponemos en marcha una solución
                    preparada para evolucionar contigo.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className={styles.finalCta}>
          <div className={styles.ctaGlow} aria-hidden="true" />

          <div className={styles.ctaContent}>
            <p className={styles.ctaEyebrow}>TU SIGUIENTE PASO</p>

            <h2>
              Construyamos algo
              <br />
              <span>que valga la pena.</span>
            </h2>

            <p>
              Una idea puede empezar con un mensaje.
              <br />
              Lo demás lo construimos juntos.
            </p>

            <div className={styles.ctaActions}>
              <a
                className={styles.primaryButton}
                href={siteData.contact.whatsapp}
                target="_blank"
                rel="noreferrer"
              >
                Comenzar conversación
                <Arrow />
              </a>

              <a
                className={styles.secondaryLink}
                href={`mailto:${siteData.contact.email}`}
              >
                {siteData.contact.email}
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}