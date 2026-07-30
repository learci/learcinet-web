import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "Política de Privacidad",
  description: "Política de privacidad de LearciNet Workspace y servicios digitales LearciNet.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="legal-page">
        <header className="legal-hero section">
          <p className="eyebrow">Información legal</p>
          <h1>Política de Privacidad</h1>
          <p className="legal-updated">Última actualización: julio de 2026</p>
        </header>
        <article className="legal-content section">
          <section><h2>Responsable</h2><p>LearciNet es responsable del tratamiento de la información recopilada a través de LearciNet Workspace y de sus canales digitales.</p></section>
          <section><h2>Información recopilada</h2><p>Cuando un usuario inicia sesión mediante Google, podemos recopilar:</p><ul><li>Nombre.</li><li>Dirección de correo electrónico.</li><li>Identificador único de la cuenta de Google.</li><li>Imagen de perfil, cuando Google la proporciona.</li></ul></section>
          <section><h2>Uso de la información</h2><p>La información se utiliza únicamente para:</p><ul><li>Autenticar al usuario.</li><li>Crear y administrar su cuenta.</li><li>Asignar y administrar Workspaces.</li><li>Administrar usuarios y permisos.</li><li>Mantener la seguridad del sistema.</li><li>Brindar soporte técnico.</li></ul></section>
          <section><h2>Información que no utilizamos</h2><p>LearciNet no vende información personal, no comparte datos con terceros para publicidad y no accede al contenido del correo electrónico del usuario. Tampoco accede a Google Drive, Google Calendar o Gmail, salvo autorización expresa del usuario para funcionalidades específicas.</p></section>
          <section><h2>Servicios de Google</h2><p>LearciNet Workspace utiliza Google Sign-In para autenticar usuarios y proteger el acceso a cada Workspace. El uso y transferencia de información obtenida mediante las APIs de Google se limita a proporcionar o mejorar las funciones visibles para el usuario y se realiza conforme a las políticas aplicables de Google.</p></section>
          <section><h2>Seguridad</h2><p>Implementamos medidas técnicas y organizativas razonables para proteger la información contra accesos no autorizados, alteración, pérdida o divulgación.</p></section>
          <section><h2>Conservación</h2><p>Los datos permanecen mientras la cuenta esté activa o durante el tiempo necesario para prestar el servicio, cumplir obligaciones legales o atender una solicitud de eliminación.</p></section>
          <section><h2>Derechos</h2><p>El usuario puede solicitar acceso, rectificación, actualización o eliminación de sus datos personales.</p></section>
          <section><h2>Contacto</h2><p>Para ejercer derechos o realizar consultas sobre privacidad, escribe a <a href="mailto:contacto@learcinet.com">contacto@learcinet.com</a>.</p></section>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
