import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "Términos del Servicio",
  description: "Términos aplicables al uso de LearciNet Workspace y los servicios digitales de LearciNet.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main className="legal-page">
        <header className="legal-hero section">
          <p className="eyebrow">Información legal</p>
          <h1>Términos del Servicio</h1>
          <p className="legal-updated">Última actualización: julio de 2026</p>
        </header>
        <article className="legal-content section">
          <section><h2>Aceptación</h2><p>Al acceder o utilizar LearciNet Workspace, el usuario declara que conoce y acepta estos términos.</p></section>
          <section><h2>Uso permitido</h2><p>El usuario acepta utilizar la plataforma únicamente para actividades legales y conforme a las funciones habilitadas en su cuenta.</p><p>Queda prohibido enviar spam, distribuir malware, acceder a información de otros usuarios, suplantar identidades o intentar vulnerar la seguridad del sistema.</p></section>
          <section><h2>Cuentas y acceso</h2><p>Cada usuario es responsable de mantener la confidencialidad de su cuenta, proteger sus métodos de acceso y comunicar cualquier uso no autorizado.</p></section>
          <section><h2>Servicios de terceros</h2><p>Algunas funciones pueden depender de proveedores externos, incluido Google para autenticación. El uso de esos servicios también puede estar sujeto a sus propios términos y políticas.</p></section>
          <section><h2>Disponibilidad</h2><p>Nos esforzamos por mantener la plataforma disponible, aunque pueden existir mantenimientos programados, actualizaciones o interrupciones imprevistas.</p></section>
          <section><h2>Propiedad intelectual</h2><p>El software, diseño, identidad visual, logotipos, documentación y contenido original de LearciNet están protegidos por la legislación aplicable y no pueden reproducirse sin autorización.</p></section>
          <section><h2>Limitación de responsabilidad</h2><p>En la medida permitida por la ley, LearciNet no será responsable por daños indirectos, pérdida de oportunidades o interrupciones derivadas del uso o imposibilidad de uso de la plataforma.</p></section>
          <section><h2>Suspensión</h2><p>LearciNet podrá limitar o suspender el acceso cuando detecte incumplimientos, riesgos de seguridad, uso abusivo o actividades que afecten a otros usuarios.</p></section>
          <section><h2>Modificaciones</h2><p>Estos términos podrán actualizarse periódicamente. La versión vigente se publicará en esta página con su fecha de actualización.</p></section>
          <section><h2>Contacto</h2><p>Para consultas relacionadas con estos términos, escribe a <a href="mailto:contacto@learcinet.com">contacto@learcinet.com</a>.</p></section>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
