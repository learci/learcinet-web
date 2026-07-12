"use client";

import { useEffect, useState } from "react";
import { siteData } from "@/data/siteData";
import SiteHeader from "@/components/SiteHeader";
import ShapeGrid from "@/components/ShapeGrid";

function ArrowUpRight({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ServiceIcon({ index }) {
  const icons = [
    <><rect x="3" y="4" width="18" height="14" rx="2"/><path d="M8 21h8M12 18v3"/></>,
    <><path d="M4 19V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14"/><path d="M8 7h8M8 11h8M8 15h5"/></>,
    <><path d="M4 19V9M10 19V5M16 19v-7M22 19H2"/></>,
    <><path d="m8 9-4 3 4 3M16 9l4 3-4 3M14 5l-4 14"/></>,
    <><circle cx="12" cy="12" r="9"/><path d="M8 12h8M12 8v8"/></>,
    <><path d="M3 12h18M12 3v18"/><circle cx="12" cy="12" r="8"/></>,
  ];
  return (
    <svg className="service-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {icons[index % icons.length]}
      </g>
    </svg>
  );
}

function Hero() {
  return (
    <section className="hero section" id="inicio">
      <div className="hero-grid">
        <div className="hero-copy reveal">
          <p className="eyebrow">Estudio digital · México</p>
          <h1>
            Creamos experiencias digitales que <span>mueven negocios.</span>
          </h1>
          <p className="hero-text">
            Sitios web, automatización y analítica diseñados para transformar procesos,
            comunicar valor y convertir visitantes en clientes.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#proyectos">
              Explorar proyectos <ArrowUpRight />
            </a>
            <a className="text-link" href="/services">
              Ver servicios
            </a>
          </div>
        </div>

        <div className="hero-visual reveal delay-1" aria-label="Composición visual de proyectos digitales">
          <div className="orb orb-one" />
          <div className="orb orb-two" />
          <div className="project-window window-main">
            <div className="window-top">
              <span /><span /><span />
            </div>
            <div className="window-content">
              <p className="mini-label">DIGITAL EXPERIENCE</p>
              <strong>Diseño que comunica.</strong>
              <div className="mock-line long" />
              <div className="mock-line medium" />
              <div className="mock-button" />
            </div>
          </div>
          <div className="floating-card card-stats">
            <span>Conversión</span>
            <strong>+38%</strong>
            <small>Experiencias optimizadas</small>
          </div>
          <div className="floating-card card-code">
            <span className="code-dot" />
            <code>build → launch</code>
          </div>
        </div>
      </div>

      <div className="trust-row reveal delay-2">
        <span>ESTRATEGIA</span>
        <span>DISEÑO</span>
        <span>DESARROLLO</span>
        <span>AUTOMATIZACIÓN</span>
        <span>ANALÍTICA</span>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="section section-dark services-home-section" id="servicios">
      <div className="services-shapegrid-bg" aria-hidden="true">
        <ShapeGrid
          direction="diagonal"
          speed={0.25}
          squareSize={42}
          borderColor="rgba(255,255,255,0.09)"
          hoverFillColor="#D8FF44"
          shape="hexagon"
          hoverTrailAmount={8}
        />
      </div>
      <div className="services-home-overlay" aria-hidden="true" />
      <div className="services-home-content">
      <div className="section-heading reveal">
        <div>
          <p className="eyebrow light">Lo que hacemos</p>
          <h2>Soluciones claras para retos reales.</h2>
        </div>
        <p>
          Integramos estrategia, experiencia de usuario y tecnología para construir
          productos digitales útiles, rápidos y escalables.
        </p>
      </div>

      <div className="services-grid">
        {siteData.services.map((service, index) => (
          <article className="service-card reveal" key={service.title}>
            <div className="service-number">0{index + 1}</div>
            <ServiceIcon index={index} />
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <a href="/services" aria-label={`Conocer más sobre ${service.title}`}>
              Conocer más <ArrowUpRight size={16} />
            </a>
          </article>
        ))}
      </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section className="section projects-section" id="proyectos">
      <div className="section-heading reveal">
        <div>
          <p className="eyebrow">Trabajo seleccionado</p>
          <h2>Proyectos diseñados para generar impacto.</h2>
        </div>
        <p>
          Una muestra de cómo combinamos diseño, datos y automatización para resolver
          necesidades empresariales.
        </p>
      </div>

      <div className="projects-list">
        {siteData.projects.map((project, index) => (
          <article className={`project-card project-${index + 1} reveal`} key={project.title}>
            <div className="project-art">
              <div className="art-grid" />
              <span className="project-tag">{project.type}</span>
              <div className="art-title">{project.short}</div>
              <div className="art-chip">{project.year}</div>
            </div>
            <div className="project-info">
              <div>
                <p>{project.category}</p>
                <h3>{project.title}</h3>
              </div>
              <a href="/contact" className="round-link" aria-label={`Ver ${project.title}`}>
                <ArrowUpRight size={22} />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="section process-section" id="proceso">
      <div className="process-intro reveal">
        <p className="eyebrow">Nuestro proceso</p>
        <h2>De la idea a una solución lista para crecer.</h2>
        <p>
          Cada proyecto avanza mediante etapas claras, entregables visibles y decisiones
          respaldadas por objetivos de negocio.
        </p>
      </div>
      <div className="process-steps">
        {siteData.process.map((step, index) => (
          <article className="process-step reveal" key={step.title}>
            <span>0{index + 1}</span>
            <div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section className="section pricing-section" id="planes">
      <div className="section-heading reveal">
        <div>
          <p className="eyebrow">Planes flexibles</p>
          <h2>Una solución para cada etapa.</h2>
        </div>
        <p>
          Los alcances se ajustan después de una breve sesión de diagnóstico.
        </p>
      </div>

      <div className="pricing-grid">
        {siteData.plans.map((plan, index) => (
          <article className={`price-card ${index === 1 ? "featured" : ""} reveal`} key={plan.name}>
            {index === 1 && <span className="popular-label">Más solicitado</span>}
            <p className="plan-name">{plan.name}</p>
            <h3>{plan.price}</h3>
            <p className="plan-description">{plan.description}</p>
            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>
                  <span>✓</span>{feature}
                </li>
              ))}
            </ul>
            <a className={index === 1 ? "button button-light" : "button button-outline"} href="/contact">
              Solicitar propuesta <ArrowUpRight />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
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
            Escribir por WhatsApp <ArrowUpRight />
          </a>
          <a className="contact-email" href={`mailto:${siteData.contact.email}`}>
            {siteData.contact.email}
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <a href="#inicio" className="logo footer-logo">
          <span className="logo-mark">L</span>
          <span>LearciNet</span>
        </a>
        <p>Diseño, tecnología y datos para convertir ideas en soluciones útiles.</p>
        <div className="footer-links">
          {siteData.navigation.map((item) => (
            <a href={item.href} key={item.href}>{item.label}</a>
          ))}
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} LearciNet.</span>
        <span>Hecho en México.</span>
      </div>
    </footer>
  );
}

export default function Home() {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.12 }
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Services />
        <Projects />
        <Process />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
