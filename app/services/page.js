"use client";

import { useEffect, useState } from "react";
import { siteData } from "@/data/siteData";
import SiteHeader from "@/components/SiteHeader";

function ArrowUpRight({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 17 17 7M8 7h9v9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowLeft({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="m15 18-6-6 6-6M9 12h11"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Plus({ open }) {
  return (
    <span className={`faq-plus ${open ? "open" : ""}`}>
      <span />
      <span />
    </span>
  );
}

function ServiceGlyph({ index }) {
  const paths = [
    <>
      <rect x="3" y="4" width="18" height="15" rx="2" />
      <path d="M7 8h10M7 12h6M9 22h6" />
    </>,
    <>
      <path d="M5 4h14a2 2 0 0 1 2 2v12H3V6a2 2 0 0 1 2-2Z" />
      <path d="M8 22h8M12 18v4M7 9h10" />
    </>,
    <>
      <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
      <path d="m3 7 5-3 5 5 7-6" />
    </>,
    <>
      <path d="m8 9-4 3 4 3M16 9l4 3-4 3M14 5l-4 14" />
    </>,
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12h8M12 8v8" />
    </>,
    <>
      <path d="M4 6h16v12H4z" />
      <path d="m7 15 3-3 2 2 5-5" />
    </>,
  ];

  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round">
        {paths[index % paths.length]}
      </g>
    </svg>
  );
}

const detailedServices = [
  {
    number: "01",
    title: "Diseño y desarrollo web",
    intro: "Sitios digitales que explican bien tu valor y facilitan que el visitante actúe.",
    features: ["Landing pages", "Sitios corporativos", "Portafolios", "Rediseño y optimización"],
    outcome: "Una presencia profesional, rápida y preparada para convertir.",
  },
  {
    number: "02",
    title: "Comercio electrónico",
    intro: "Tiendas estructuradas para que descubrir, comparar y comprar sea sencillo.",
    features: ["Catálogo de productos", "Experiencia de compra", "Integración de pagos", "Afiliados y dropshipping"],
    outcome: "Una plataforma comercial organizada y lista para crecer.",
  },
  {
    number: "03",
    title: "Dashboards y analítica",
    intro: "Información compleja convertida en indicadores claros para tomar decisiones.",
    features: ["KPIs ejecutivos", "Power BI y Excel", "Modelado de datos", "Reportes automatizados"],
    outcome: "Mayor visibilidad sobre resultados, riesgos y oportunidades.",
  },
  {
    number: "04",
    title: "Automatización de procesos",
    intro: "Flujos que sustituyen actividades repetitivas y reducen errores operativos.",
    features: ["Python y Excel", "Validaciones", "Integración de archivos", "Herramientas internas"],
    outcome: "Menos trabajo manual, mayor velocidad y mejor control.",
  },
  {
    number: "05",
    title: "SEO y estrategia de contenido",
    intro: "Arquitectura y contenido para captar búsquedas relevantes de forma sostenible.",
    features: ["SEO técnico", "Investigación de palabras", "Blog estratégico", "Optimización local"],
    outcome: "Más oportunidades de aparecer frente al público correcto.",
  },
  {
    number: "06",
    title: "Soporte y evolución digital",
    intro: "Acompañamiento para mantener, mejorar y ampliar tus activos tecnológicos.",
    features: ["Mantenimiento web", "Mejoras continuas", "Soporte técnico", "Consultoría"],
    outcome: "Soluciones estables que evolucionan con tu operación.",
  },
];

const advantages = [
  ["Diseño con intención", "Cada decisión visual responde a una necesidad del negocio y del usuario."],
  ["Tecnología adecuada", "Seleccionamos herramientas por utilidad, escalabilidad y mantenimiento."],
  ["Alcance transparente", "Definimos entregables, límites, tiempos y responsabilidades desde el inicio."],
  ["Medición y mejora", "Construimos pensando en datos, desempeño y evolución posterior."],
];

const faqs = [
  {
    q: "¿Cuánto tarda un proyecto?",
    a: "Una landing page puede requerir entre una y tres semanas. Un sitio corporativo, tienda o automatización puede necesitar de cuatro a ocho semanas, dependiendo del contenido, integraciones y validaciones.",
  },
  {
    q: "¿Necesito tener todo el contenido preparado?",
    a: "No. Podemos comenzar con una estructura preliminar y ayudarte a organizar mensajes, secciones, imágenes y llamadas a la acción.",
  },
  {
    q: "¿Trabajan con WordPress y Next.js?",
    a: "Sí. La tecnología se selecciona según la necesidad: facilidad de administración, rendimiento, integración, presupuesto y crecimiento esperado.",
  },
  {
    q: "¿Pueden mejorar un proyecto existente?",
    a: "Sí. Podemos revisar estructura, experiencia de usuario, velocidad, SEO, contenido y código para proponer mejoras priorizadas.",
  },
  {
    q: "¿Incluyen dominio y hosting?",
    a: "Podemos incluirlos en la propuesta o trabajar sobre la infraestructura que ya tengas. También apoyamos con configuración y publicación.",
  },
];

export default function ServicesPage() {
  const [activeFaq, setActiveFaq] = useState(0);

  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      }),
      { threshold: 0.12 }
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="services-page">
      <SiteHeader />

      <section className="services-hero">
        <div className="services-hero-top reveal">
          <p className="eyebrow">Servicios · LearciNet</p>
          <h1>
            Soluciones digitales para convertir retos en <span>resultados.</span>
          </h1>
        </div>

        <div className="services-hero-bottom reveal delay-1">
          <div className="services-hero-index">
            <span>01 — 06</span>
            <small>Capacidades conectadas</small>
          </div>

          <p>
            Diseñamos, construimos y mejoramos sistemas digitales que ayudan a
            comunicar, vender, analizar y operar con mayor claridad.
          </p>

          <a href="#catalogo" className="services-round-link">
            Explorar<br />servicios
            <ArrowUpRight size={22} />
          </a>
        </div>

        <div className="services-hero-canvas reveal delay-2" aria-hidden="true">
          <div className="services-canvas-grid" />
          <div className="services-canvas-title">BUILD</div>
          <div className="services-canvas-disc disc-one">WEB</div>
          <div className="services-canvas-disc disc-two">DATA</div>
          <div className="services-canvas-disc disc-three">AUTO</div>
          <div className="services-canvas-caption">
            Estrategia · Diseño · Tecnología
          </div>
        </div>
      </section>

      <section className="services-statement">
        <p className="eyebrow reveal">Una visión integral</p>
        <div className="services-statement-grid">
          <h2 className="reveal">
            No entregamos piezas aisladas. Construimos experiencias que trabajan juntas.
          </h2>
          <div className="reveal delay-1">
            <p>
              Una página debe comunicar, pero también cargar rápido, aparecer en
              búsquedas, generar confianza y facilitar el contacto.
            </p>
            <p>
              Una automatización debe ahorrar tiempo, pero también ofrecer trazabilidad,
              reglas claras y resultados confiables.
            </p>
          </div>
        </div>
      </section>

      <section className="services-catalog" id="catalogo">
        <div className="services-catalog-heading reveal">
          <p className="eyebrow light">Capacidades</p>
          <h2>Todo lo necesario para avanzar de la idea a la operación.</h2>
        </div>

        <div className="services-catalog-list">
          {detailedServices.map((service, index) => (
            <article className="service-detail-row reveal" key={service.title}>
              <div className="service-detail-number">{service.number}</div>

              <div className="service-detail-icon">
                <ServiceGlyph index={index} />
              </div>

              <div className="service-detail-main">
                <h3>{service.title}</h3>
                <p>{service.intro}</p>
              </div>

              <ul>
                {service.features.map((feature) => <li key={feature}>{feature}</li>)}
              </ul>

              <div className="service-detail-result">
                <small>Resultado</small>
                <p>{service.outcome}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="services-feature-section">
        <div className="services-feature-art reveal">
          <div className="feature-art-grid" />
          <span>LEARCINET / 2026</span>
          <div className="feature-art-window">
            <small>PROJECT SYSTEM</small>
            <strong>Think.<br />Build.<br />Improve.</strong>
          </div>
          <div className="feature-art-chip">→ 100%</div>
        </div>

        <div className="services-feature-copy reveal delay-1">
          <p className="eyebrow">Nuestra diferencia</p>
          <h2>Diseño profesional sin perder de vista la operación.</h2>
          <p>
            Combinamos comunicación visual, análisis de procesos y desarrollo técnico.
            Esto nos permite crear soluciones atractivas que también funcionan en el
            trabajo cotidiano.
          </p>
          <a href="/contact">
            Conversar sobre un proyecto <ArrowUpRight />
          </a>
        </div>
      </section>

      <section className="services-method" id="metodo">
        <div className="services-method-heading reveal">
          <p className="eyebrow light">Cómo trabajamos</p>
          <h2>Un método visible, ordenado y colaborativo.</h2>
        </div>

        <div className="services-method-grid">
          {siteData.process.map((step, index) => (
            <article className="method-card reveal" key={step.title}>
              <div>
                <span>0{index + 1}</span>
                <ArrowUpRight />
              </div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="services-advantages">
        <div className="advantages-heading reveal">
          <p className="eyebrow">Principios</p>
          <h2>Lo que puedes esperar en cada proyecto.</h2>
        </div>

        <div className="advantages-list">
          {advantages.map(([title, text], index) => (
            <article className="advantage-row reveal" key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="services-faq" id="preguntas">
        <div className="services-faq-intro reveal">
          <p className="eyebrow light">Preguntas frecuentes</p>
          <h2>Respuestas antes de comenzar.</h2>
          <p>
            Cada proyecto es distinto, pero estas son algunas de las preguntas más
            comunes durante la primera conversación.
          </p>
        </div>

        <div className="faq-list reveal delay-1">
          {faqs.map((item, index) => {
            const open = activeFaq === index;
            return (
              <article className={`faq-item ${open ? "active" : ""}`} key={item.q}>
                <button type="button" onClick={() => setActiveFaq(open ? -1 : index)}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{item.q}</strong>
                  <Plus open={open} />
                </button>
                <div className="faq-answer">
                  <p>{item.a}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="services-final-cta">
        <div className="services-final-orbit" aria-hidden="true" />
        <p className="eyebrow light">Tu siguiente proyecto</p>
        <h2>Construyamos una solución que tenga sentido para tu negocio.</h2>
        <a href="/contact" className="services-final-button">
          Solicitar propuesta <ArrowUpRight size={22} />
        </a>
      </section>

      <footer className="services-footer">
        <a href="/" className="logo footer-logo">
          <span className="logo-mark">L</span>
          <span>LearciNet</span>
        </a>
        <p>Diseño, tecnología y datos para convertir ideas en soluciones útiles.</p>
        <div>
          <a href="/"><ArrowLeft size={16} /> Inicio</a>
          <a href="/#proyectos">Proyectos</a>
          <a href="/contact">Contacto</a>
        </div>
      </footer>
    </main>
  );
}
