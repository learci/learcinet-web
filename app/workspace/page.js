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

export default function WorkspacePage() {
  return (
    <>
      <SiteHeader />
      <main className="workspace-page">
        <section className="workspace-hero section">
          <div>
            <p className="eyebrow">LearciNet Workspace</p>
            <h1>Procesos digitales administrados desde un solo lugar.</h1>
            <p>Una plataforma empresarial en la nube diseñada para ayudar a organizaciones y profesionales a organizar usuarios, comunicaciones, automatizaciones e indicadores.</p>
            <div className="hero-actions"><a className="button button-primary" href="/contact">Solicitar información</a><a className="text-link" href="/privacy">Consultar privacidad</a></div>
          </div>
          <div className="workspace-panel" aria-label="Vista conceptual de LearciNet Workspace"><span>WORKSPACE</span><strong>Control, productividad y seguridad.</strong><div className="workspace-bars"><i/><i/><i/></div></div>
        </section>
        <section className="section workspace-features"><div className="section-heading"><div><p className="eyebrow">Funcionalidades</p><h2>Una base modular para operar y crecer.</h2></div><p>Centraliza herramientas empresariales y habilita nuevos módulos conforme evolucionan tus procesos.</p></div><div className="workspace-grid">{features.map((feature, index)=><article key={feature}><span>0{index+1}</span><h3>{feature}</h3></article>)}</div></section>
        <section className="section workspace-google"><div><p className="eyebrow light">Inicio de sesión con Google</p><h2>Acceso simple y protegido.</h2><p>LearciNet Workspace utiliza Google Sign-In exclusivamente para autenticar usuarios y proteger el acceso a cada Workspace. No publicamos información personal ni utilizamos cuentas de Google con fines publicitarios.</p></div><a className="button button-light" href="/privacy">Ver Política de Privacidad</a></section>
      </main>
      <SiteFooter />
    </>
  );
}
