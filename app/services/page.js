import FuturisticShell from "@/components/FuturisticShell";
import { siteData } from "@/data/siteData";
import theme from "../page.module.css";
import styles from "./page.module.css";

export const metadata = {
  title: "Servicios | LearciNet",
  description: "Diseño web, comercio electrónico, dashboards, automatización, SEO y soporte tecnológico. Soluciones a la medida de tu negocio.",
  alternates: { canonical: "/services" },
};

function Arrow() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
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
  return (
    <FuturisticShell className={styles.page}>
      <section className={`${theme.container} ${styles.hero}`} aria-labelledby="services-title">
        <p className={theme.eyebrow}><span>LEARCINET /</span> Servicios digitales</p>
        <div className={styles.heroGrid}>
          <h1 id="services-title">Lo que imaginas.<br /><span>Lo que construimos.</span></h1>
          <div className={styles.heroAside}><p>Conectamos diseño, tecnología y datos para resolver lo que tu negocio necesita hoy y preparar su siguiente paso.</p><a className={theme.primaryButton} href="/contact">Cuéntanos tu proyecto <Arrow /></a></div>
        </div>
        <div className={styles.capabilityStrip}>
          <div className={styles.capabilityIntro}><span>01 — 06</span><p>Una visión integral.<br />Seis formas de avanzar.</p></div>
          <nav className={styles.capabilityNav} aria-label="Explorar servicios">
            {detailedServices.map((service, index) => <a key={service.number} href={`#servicio-${service.number}`}><span>{service.number}</span>{["Web", "Comercio", "Analítica", "Automatización", "SEO", "Soporte"][index]}<Arrow /></a>)}
          </nav>
        </div>
      </section>

      <section className={`${theme.container} ${styles.catalog}`} id="catalogo" aria-labelledby="catalog-title">
        <div className={styles.sectionIntro}><p className={theme.eyebrow}><span>01 /</span> Nuestras capacidades</p><h2 id="catalog-title">Cada reto tiene<br /><em>su punto de partida.</em></h2></div>
        <div className={styles.serviceList}>
          {detailedServices.map((service) => <article id={`servicio-${service.number}`} key={service.number} className={styles.service}>
            <div className={styles.serviceLead}><span className={styles.serviceNumber}>{service.number}</span><h3>{service.title}</h3><p>{service.intro}</p></div>
            <div className={styles.serviceDetails}><p className={styles.detailLabel}>EN QUÉ PODEMOS AYUDARTE</p><ul>{service.features.map((feature) => <li key={feature}><span aria-hidden="true">+</span>{feature}</li>)}</ul></div>
            <div className={styles.serviceOutcome}><p className={styles.detailLabel}>PARA TU NEGOCIO</p><p>{service.outcome}</p><a href="/contact" aria-label={`Consultar sobre ${service.title}`}>Hablemos <Arrow /></a></div>
          </article>)}
        </div>
      </section>

      <section className={`${theme.container} ${styles.statement}`} aria-labelledby="difference-title">
        <div className={styles.statementArt} aria-hidden="true"><img src="/images/learcinet-orbit.webp" alt="" width="1024" height="1024" loading="lazy" /></div>
        <div className={styles.statementCopy}><p className={theme.eyebrow}>Nuestra diferencia</p><h2 id="difference-title">Diseño que conecta.<br /><em>Tecnología que resuelve.</em></h2><p>Combinamos comunicación visual, análisis de procesos y desarrollo técnico. Creamos soluciones que se ven bien y funcionan en el trabajo cotidiano.</p><p>Desde una web hasta una automatización, cuidamos el desempeño, las reglas de operación y la facilidad de uso.</p><a className={theme.secondaryLink} href="/contact">Conversar sobre un proyecto <Arrow /></a></div>
      </section>

      <section className={styles.methodBand} id="metodo" aria-labelledby="method-title"><div className={`${theme.container} ${styles.section}`}>
        <div className={styles.twoColumnHeading}><div><p className={theme.eyebrow}><span>02 /</span> Cómo trabajamos</p><h2 id="method-title">Un camino claro.<br /><em>De principio a fin.</em></h2></div><p>Sabes qué estamos construyendo, en qué etapa estamos y qué sigue. Revisamos contigo cada entrega.</p></div>
        <ol className={styles.methodGrid}>{siteData.process.map((step, index) => <li key={step.title}><span className={styles.methodNumber}>0{index + 1}</span><h3>{step.title}</h3><p>{step.description}</p></li>)}</ol>
      </div></section>

      <section className={`${theme.container} ${styles.section} ${styles.principles}`} aria-labelledby="principles-title">
        <div><p className={theme.eyebrow}><span>03 /</span> Nuestros principios</p><h2 id="principles-title">Lo que puedes<br /><em>esperar de nosotros.</em></h2></div>
        <div className={styles.principleList}>{advantages.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
      </section>

      <section className={`${theme.container} ${styles.faqSection}`} id="preguntas" aria-labelledby="faq-title">
        <div><p className={theme.eyebrow}><span>04 /</span> Preguntas frecuentes</p><h2 id="faq-title">Antes de<br /><em>dar el primer paso.</em></h2><p className={styles.faqIntro}>Resolvamos algunas dudas. Si tu proyecto necesita algo distinto, conversemos.</p></div>
        <div className={styles.faqList}>{faqs.map((faq, index) => <details key={faq.q} name="services-faq" open={index === 0} className={styles.faq}><summary><span>{String(index + 1).padStart(2, "0")}</span><h3>{faq.q}</h3><span className={styles.faqToggle} aria-hidden="true" /></summary><p>{faq.a}</p></details>)}</div>
      </section>

      <section className={`${theme.container} ${styles.cta}`} aria-labelledby="services-cta-title"><div><p className={theme.eyebrow}>Tu siguiente proyecto</p><h2 id="services-cta-title">Démosle forma<br /><span>a tu idea.</span></h2></div><div><p>Cuéntanos dónde estás y a dónde quieres llegar. Construyamos una solución que tenga sentido para tu negocio.</p><a className={theme.primaryButton} href="/contact">Solicitar propuesta <Arrow /></a></div></section>
    </FuturisticShell>
  );
}
