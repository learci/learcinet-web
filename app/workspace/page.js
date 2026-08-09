import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "Workspace",
  description: "Plataforma empresarial en la nube para administrar usuarios, campañas, automatizaciones, indicadores e inteligencia artificial.",
  alternates: { canonical: "/workspace" },
};

const features = [
  "Gestión de Workspaces",
  "Administración de usuarios y permisos",
  "Campañas inteligentes de correo electrónico",
  "Smart Mail con plantillas dinámicas",
  "Automatización de procesos",
  "Paneles e indicadores",
  "Herramientas impulsadas por inteligencia artificial",
  "Autenticación segura con Google",
];

const systems = [
  {
    status: "Disponible ahora",
    name: "Smart Mail",
    description:
      "Diseña campañas, personaliza mensajes con datos de tus contactos y administra tus envíos desde un flujo guiado dentro de LearciNet Workspace.",
    highlights: ["Campañas personalizadas", "Plantillas dinámicas", "Seguimiento de resultados"],
    href: "https://workspace.learcinet.com/login",
    cta: "Explorar Smart Mail",
  },
];

export default function WorkspacePage() {
  return (
    <>
      <SiteHeader />
      <main className="workspace-page">
        <section className="workspace-hero section">
          <div>
            <p className="eyebrow">LearciNet Workspace</p>
            <h1>Procesos digitales administrados desde un solo lugar.</h1>
            <p>Una plataforma empresarial en la nube diseñada para reunir Smart Mail y los próximos sistemas de LearciNet en una experiencia conectada, segura y fácil de usar.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="https://workspace.learcinet.com/login">Entrar a LearciNet Workspace</a>
              <a className="button workspace-button-secondary" href="#sistemas">Conocer los sistemas</a>
            </div>
          </div>
          <div className="workspace-panel" aria-label="Vista conceptual de LearciNet Workspace"><span>WORKSPACE</span><strong>Control, productividad y seguridad.</strong><div className="workspace-bars"><i/><i/><i/></div></div>
        </section>
        <section className="section workspace-ecosystem" id="sistemas">
          <div className="section-heading workspace-systems-heading">
            <div>
              <p className="eyebrow">Ecosistema LearciNet</p>
              <h2>Un Workspace. Sistemas que crecen contigo.</h2>
            </div>
            <p>Conoce cada solución antes de entrar. LearciNet.com presenta las herramientas; LearciNet Workspace es el entorno donde las utilizas.</p>
          </div>
          <div className="workspace-systems-grid">
            {systems.map((system) => (
              <article className="workspace-system-card" key={system.name}>
                <div className="workspace-system-topline">
                  <span className="workspace-system-status">{system.status}</span>
                  <span className="workspace-system-number">01</span>
                </div>
                <div>
                  <p className="workspace-system-kicker">Comunicación inteligente</p>
                  <h3>{system.name}</h3>
                  <p>{system.description}</p>
                </div>
                <ul>
                  {system.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                </ul>
                <a className="button button-light workspace-system-button" href={system.href}>{system.cta} <span aria-hidden="true">↗</span></a>
              </article>
            ))}
            <article className="workspace-system-card workspace-system-card-future">
              <div className="workspace-system-topline">
                <span className="workspace-system-status workspace-system-status-future">En evolución</span>
                <span className="workspace-system-number">02+</span>
              </div>
              <div>
                <p className="workspace-system-kicker">Próximos sistemas</p>
                <h3>El ecosistema seguirá creciendo.</h3>
                <p>Nuevas soluciones podrán incorporarse aquí conforme estén listas, manteniendo un solo punto de acceso y una experiencia consistente para tus clientes.</p>
              </div>
              <a className="text-link workspace-contact-link" href="/contact">Solicitar información</a>
            </article>
          </div>
        </section>
        <section className="section workspace-video-section" aria-labelledby="smart-mail-video-title">
          <div className="workspace-video-copy">
            <p className="eyebrow light">Smart Mail en acción</p>
            <h2 id="smart-mail-video-title">Conoce Smart Mail en 40 segundos.</h2>
            <p>Descubre cómo convertir correos individuales en campañas profesionales, crear cada envío mediante un flujo guiado y consultar resultados útiles para mejorar tus comunicaciones.</p>
            <div className="workspace-video-points" aria-label="Beneficios mostrados en el video">
              <span>Creación guiada</span>
              <span>Control y trazabilidad</span>
              <span>Indicadores de campaña</span>
            </div>
            <a className="button button-light" href="https://workspace.learcinet.com/login">Crear cuenta y probar Smart Mail <span aria-hidden="true">↗</span></a>
          </div>
          <div className="workspace-video-device">
            <div className="workspace-video-device-top" aria-hidden="true"><i/><span>SMART MAIL</span><i/></div>
            <video
              className="workspace-video"
              controls
              playsInline
              preload="metadata"
              poster="/media/smart-mail-poster.webp"
              aria-label="Video promocional de LearciNet Smart Mail"
            >
              <source src="/media/smart-mail-demo.mp4" type="video/mp4" />
              Tu navegador no puede reproducir este video.
            </video>
          </div>
        </section>
        <section className="section workspace-features"><div className="section-heading"><div><p className="eyebrow">Funcionalidades</p><h2>Una base modular para operar y crecer.</h2></div><p>Centraliza herramientas empresariales y habilita nuevos módulos conforme evolucionan tus procesos.</p></div><div className="workspace-grid">{features.map((feature, index)=><article key={feature}><span>0{index+1}</span><h3>{feature}</h3></article>)}</div></section>
        <section className="section workspace-google"><div><p className="eyebrow light">Inicio de sesión con Google</p><h2>Acceso simple y protegido.</h2><p>LearciNet Workspace utiliza Google Sign-In exclusivamente para autenticar usuarios y proteger el acceso a cada Workspace. No publicamos información personal ni utilizamos cuentas de Google con fines publicitarios.</p></div><a className="button button-light" href="/privacy">Ver Política de Privacidad</a></section>
      </main>
      <SiteFooter />
    </>
  );
}
