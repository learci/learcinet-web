"use client";

import { useEffect, useRef, useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { siteData } from "@/data/siteData";
import styles from "./page.module.css";

function Arrow({ diagonal = true }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h16m-6-6 6 6-6 6"} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function ServiceIcon({ index }) {
  const paths = [
    "M3 5h18v14H3zM3 9h18M7 7h.01M10 7h.01M8 12l-2 2 2 2m8-4 2 2-2 2",
    "M4 7h16l-1 14H5L4 7Zm4 0V5a4 4 0 0 1 8 0v2",
    "M4 3v17h17M8 15v-4m5 4V7m5 8V4",
    "m13 2-9 12h7l-1 8 10-13h-7l1-7Z",
    "M15 15l6 6M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z",
    "M4 4h16v12H4zM8 21h8m-4-5v5M8 8h8m-8 4h5",
  ];
  return <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={paths[index]} stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function SectionHeading({ number, label, title, description }) {
  return <div className={styles.sectionHeading} data-enter>
    <div><p className={styles.eyebrow}><span>{number} /</span> {label}</p><h2>{title}</h2></div>
    {description && <p className={styles.sectionDescription}>{description}</p>}
  </div>;
}

export default function Home() {
  const root = useRef(null);
  const artwork = useRef(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer;
    const animations = new Set();
    const configure = () => {
      observer?.disconnect();
      animations.forEach((animation) => animation.cancel());
      animations.clear();
      if (paused || preference.matches || !window.IntersectionObserver) return;
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          if (typeof entry.target.animate === "function") {
            const animation = entry.target.animate([
              { opacity: 0.3, transform: "translateY(22px)" },
              { opacity: 1, transform: "translateY(0)" },
            ], { duration: 650, easing: "cubic-bezier(.2,.7,.2,1)" });
            animations.add(animation);
            animation.onfinish = () => animations.delete(animation);
          }
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.08 });
      root.current?.querySelectorAll("[data-enter]").forEach((element) => observer.observe(element));
    };
    configure();
    preference.addEventListener("change", configure);
    return () => { observer?.disconnect(); animations.forEach((animation) => animation.cancel()); preference.removeEventListener("change", configure); };
  }, [paused]);

  function moveArtwork(event) {
    if (paused || !window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    artwork.current?.style.setProperty("--tilt-x", `${-y * 7}deg`);
    artwork.current?.style.setProperty("--tilt-y", `${x * 7}deg`);
  }

  function resetArtwork() {
    artwork.current?.style.setProperty("--tilt-x", "0deg");
    artwork.current?.style.setProperty("--tilt-y", "0deg");
  }

  return (
    <div ref={root} className={`${styles.shell} ${paused ? styles.paused : ""}`}>
      <a className={styles.skipLink} href="#contenido">Saltar al contenido</a>
      <SiteHeader />
      <main id="contenido" tabIndex={-1}>
        <section className={`${styles.container} ${styles.hero}`} id="inicio" aria-labelledby="hero-title">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}><span className={styles.labelLine} /> Estudio digital · Ciudad de México</p>
            <h1 id="hero-title">Tu siguiente<br />gran paso.<br /><span>En digital.</span></h1>
            <p className={styles.heroDescription}>Diseño web, automatización y datos para llevar tu negocio más lejos. Convertimos tus ideas en herramientas que trabajan contigo.</p>
            <div className={styles.actions}>
              <a className={styles.primaryButton} href="/contact">Hablemos de tu proyecto <Arrow /></a>
              <a className={styles.secondaryLink} href="#proyectos">Explorar proyectos <Arrow diagonal={false} /></a>
            </div>
            <div className={styles.heroNote}><span>Diseñamos con intención.</span><span>Construimos para crecer.</span></div>
          </div>
          <div className={styles.heroVisual} onPointerMove={moveArtwork} onPointerLeave={resetArtwork}>
            <div className={styles.visualGrid} aria-hidden="true" />
            <div ref={artwork} className={styles.artwork} aria-hidden="true">
              <img className={styles.heroImage} src="/images/learcinet-orbit.webp" alt="" width="1024" height="1024" fetchPriority="high" decoding="async" />
            </div>
            <div className={styles.orbitLabel}><span>IDEAS CONECTADAS.</span><strong>Posibilidades<br />en expansión.</strong></div>
            <div className={styles.visualFoot}><span>DISEÑO × TECNOLOGÍA</span><button type="button" aria-pressed={paused} onClick={() => { resetArtwork(); setPaused((value) => !value); }}>{paused ? "Activar efectos" : "Pausar efectos"}<span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span></button></div>
          </div>
          <div className={styles.disciplines} aria-label="Especialidades"><span>DISEÑO WEB</span><i aria-hidden="true">✳</i><span>AUTOMATIZACIÓN</span><i aria-hidden="true">✳</i><span>ANALÍTICA</span><i aria-hidden="true">✳</i><span>APLICACIONES</span></div>
        </section>

        <section className={`${styles.container} ${styles.section}`} id="servicios" aria-labelledby="services-title">
          <SectionHeading number="01" label="Lo que hacemos" title={<span id="services-title">Menos límites.<br /><em>Más posibilidades.</em></span>} description="Un sitio que presenta tu negocio. Un proceso que ahorra tiempo. Datos que aclaran el siguiente paso. Encuentra la solución que necesitas." />
          <div className={styles.servicesGrid}>
            {siteData.services.map((service, index) => <article className={styles.serviceCard} key={service.title} data-enter>
              <div className={styles.cardTop}><ServiceIcon index={index} /><span>0{index + 1}</span></div>
              <h3>{service.title}</h3><p>{service.description}</p>
              <a href="/services" aria-label={`Conocer más sobre ${service.title}`}>Conocer más <Arrow /></a>
            </article>)}
          </div>
        </section>

        <section className={styles.projectsBand} id="proyectos" aria-labelledby="projects-title">
          <div className={`${styles.container} ${styles.section}`}>
            <SectionHeading number="02" label="Trabajo seleccionado" title={<span id="projects-title">Ideas que ya<br /><em>tomaron forma.</em></span>} description="Diseño, datos y automatización aplicados a necesidades reales. Conoce algunas de las soluciones de LearciNet." />
            <div className={styles.projectList}>
              {siteData.projects.map((project, index) => <a className={styles.projectRow} key={project.title} href="/contact" aria-label={`Consultar sobre ${project.title}`} data-enter>
                <span className={styles.projectIndex}>0{index + 1}</span>
                <span className={`${styles.projectMonogram} ${styles[`projectTone${index}`]}`} aria-hidden="true">{project.short}</span>
                <div className={styles.projectName}><span>{project.category}</span><h3>{project.title}</h3></div>
                <span className={styles.projectType}>{project.type}<small>{project.year}</small></span>
                <span className={styles.projectArrow}><Arrow /></span>
              </a>)}
            </div>
          </div>
        </section>

        <section className={`${styles.container} ${styles.section} ${styles.process}`} id="proceso" aria-labelledby="process-title">
          <div data-enter><p className={styles.eyebrow}><span>03 /</span> Cómo trabajamos</p><h2 id="process-title">De la primera idea<br />al <em>siguiente nivel.</em></h2><p className={styles.sectionDescription}>Avanzamos contigo, con etapas claras y entregables que puedes revisar en cada paso.</p><a className={styles.secondaryLink} href="/contact">Cuéntanos tu idea <Arrow /></a></div>
          <ol className={styles.steps}>{siteData.process.map((step, index) => <li key={step.title} data-enter><span className={styles.stepNumber}>0{index + 1}</span><div><h3>{step.title}</h3><p>{step.description}</p></div></li>)}</ol>
        </section>

        <section className={`${styles.container} ${styles.section} ${styles.pricing}`} id="planes" aria-labelledby="plans-title">
          <SectionHeading number="04" label="Planes flexibles" title={<span id="plans-title">Empieza a tu ritmo.<br /><em>Crece a tu medida.</em></span>} description="Elige un punto de partida. Definimos el alcance contigo después de conocer los objetivos de tu proyecto." />
          <div className={styles.priceGrid}>{siteData.plans.map((plan, index) => <article key={plan.name} className={`${styles.priceCard} ${index === 1 ? styles.featured : ""}`} data-enter>
            <div className={styles.planTop}><p>{plan.name}</p>{index === 1 && <span>Más solicitado</span>}</div>
            <h3>{plan.price}</h3><p className={styles.planDescription}>{plan.description}</p>
            <ul>{plan.features.map((feature) => <li key={feature}><span aria-hidden="true">✓</span>{feature}</li>)}</ul>
            <a className={index === 1 ? styles.primaryButton : styles.outlineButton} href="/contact">Solicitar propuesta <Arrow /></a>
          </article>)}</div>
        </section>

        <section className={`${styles.container} ${styles.contact}`} id="contacto" aria-labelledby="contact-title" data-enter>
          <div className={styles.contactGlow} aria-hidden="true" />
          <p className={styles.eyebrow}>El siguiente paso es tuyo</p>
          <h2 id="contact-title">Hagamos que<br /><span>suceda.</span></h2>
          <p>Cuéntanos qué quieres construir.<br />Démosle forma, juntos.</p>
          <div className={styles.actions}><a className={styles.primaryButton} href={siteData.contact.whatsapp} target="_blank" rel="noreferrer">Escribir por WhatsApp <Arrow /></a><a className={styles.secondaryLink} href={`mailto:${siteData.contact.email}`}>{siteData.contact.email}</a></div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
