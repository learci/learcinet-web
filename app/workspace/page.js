import FuturisticShell from "@/components/FuturisticShell";
import theme from "../page.module.css";
import styles from "./page.module.css";

export const metadata = {
  title: "Workspace | LearciNet",
  description:
    "Plataforma empresarial en la nube para administrar usuarios, campañas, automatizaciones, indicadores e inteligencia artificial.",
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

const smartMailFeatures = [
  "Envíos masivos y automatizados",
  "Estadísticas en tiempo real",
  "Gestión de contactos y segmentos",
  "Seguridad y dominio propio",
  "Plantillas dinámicas",
  "Integración con tu ecosistema",
];

const enterpriseFeatures = [
  "Alto volumen de envíos",
  "Recuperación y reintentos",
  "Múltiples remitentes y dominios",
  "Seguridad con OAuth",
  "Multiusuario y permisos",
  "Control de capacidad",
  "Seguimiento y reportes avanzados",
  "Operación empresarial centralizada",
];

const whatsappFeatures = [
  "Campañas con plantillas",
  "Colas y reintentos automáticos",
  "Gestión de contactos",
  "Estados de entrega y lectura",
  "Importación desde Excel / CSV",
  "Integración con tu ecosistema",
  "Mensajes con variables",
  "Seguimiento de respuestas",
];

function Arrow() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 18 18 6M6 6h12v12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path
        d="m4 7 8 6 8-6"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EnterpriseIcon() {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m12 3 8 4-8 4-8-4 8-4Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="m4 12 8 4 8-4M4 17l8 4 8-4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20.5 11.6a8.3 8.3 0 0 1-12.3 7.3L4 20l1.1-4.1A8.3 8.3 0 1 1 20.5 11.6Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 8.2c.3-.7.6-.7.9-.7h.6c.2 0 .4 0 .6.5l.8 1.8c.1.3.1.5-.1.7l-.6.8c-.2.2-.3.4-.1.7.5.9 1.2 1.7 2.1 2.2.3.2.5.2.7 0l.9-1c.2-.3.5-.3.8-.2l1.8.9c.3.1.5.3.5.5 0 .3-.2 1.4-1 2-.7.7-1.7.9-2.7.6-1.1-.3-2.7-1-4.5-2.6-1.5-1.4-2.6-3.1-2.9-4.2-.3-1-.1-1.6.2-2.1Z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BenefitIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 3v18M3 12h18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FeatureIcon({ index }) {
  const paths = [
    "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
    "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M16 3a4 4 0 0 1 0 8m6 10v-2a4 4 0 0 0-3-3.87M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z",
    "M3 5h18v14H3zM3 6l9 7 9-7",
    "M3 4h18v16H3zM3 9h18M9 9v11M13 13h4m-4 3h4",
    "m13 2-9 12h7l-1 8 10-13h-7l1-7Z",
    "M3 3v18h18M7 17v-5m5 5V7m5 10V4",
    "m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z",
    "m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Zm-4 9 3 3 5-6",
  ];

  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={paths[index]}
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProductFeatures({ items }) {
  return (
    <ul className={styles.productFeatures}>
      {items.map((item) => (
        <li key={item}>
          <span className={styles.miniFeatureIcon}>
            <BenefitIcon />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function WorkspacePage() {
  return (
    <FuturisticShell className={styles.page}>
      <section
        className={`${theme.container} ${styles.hero}`}
        aria-labelledby="workspace-title"
      >
        <div className={styles.heroCopy}>
          <p className={theme.eyebrow}>
            <span>LEARCINET /</span> Workspace
          </p>

          <h1 id="workspace-title">
            Tus herramientas.
            <br />
            <span>Un solo lugar.</span>
          </h1>

          <p className={styles.heroDescription}>
            Administra tus comunicaciones, campañas, usuarios y procesos dentro
            de un ecosistema conectado. Smart Mail, Smart Mail Enterprise y
            nuevas soluciones evolucionan desde un mismo Workspace.
          </p>

          <div className={theme.actions}>
            <a
              className={theme.primaryButton}
              href="https://workspace.learcinet.com/login"
            >
              Entrar a Workspace <Arrow />
            </a>

            <a className={theme.secondaryLink} href="#sistemas">
              Conocer los sistemas <Arrow />
            </a>
          </div>

          <div className={styles.heroBenefits}>
            <span>Usuarios y permisos</span>
            <span>Comunicación multicanal</span>
            <span>Automatización</span>
          </div>

          <a className={styles.heroCaption} href="#funcionalidades">
            <span aria-hidden="true">↓</span>
            Explora lo que puedes hacer
          </a>
        </div>

        <div
          className={styles.demo}
          aria-labelledby="smart-mail-video-title"
        >
          <div className={styles.demoGlow} aria-hidden="true" />

          <div className={styles.videoFrame}>
            <div className={styles.videoTop}>
              <MailIcon />
              <span>
                SMART MAIL
                <small>BY LEARCINET</small>
              </span>
            </div>

            <video
              className={styles.video}
              controls
              playsInline
              preload="metadata"
              poster="/media/smart-mail-poster.webp"
              aria-label="Video promocional de LearciNet Smart Mail"
            >
              <source
                src="/media/smart-mail-demo.mp4"
                type="video/mp4"
              />
              Tu navegador no puede reproducir este video.{" "}
              <a href="/media/smart-mail-demo.mp4">
                Abrir video de Smart Mail
              </a>
              .
            </video>
          </div>

          <div className={styles.demoCaption}>
            <p className={styles.detailLabel}>
              SMART MAIL EN ACCIÓN
            </p>
            <h2 id="smart-mail-video-title">
              Conócelo en 40 segundos.
            </h2>
          </div>
        </div>
      </section>

      <section
        className={`${theme.container} ${styles.ecosystem}`}
        id="sistemas"
        aria-labelledby="systems-title"
      >
        <div className={styles.sectionHeading}>
          <div>
            <p className={theme.eyebrow}>
              <span>01 /</span> El ecosistema
            </p>

            <h2 id="systems-title">
              Un Workspace.
              <br />
              <em>Más posibilidades.</em>
            </h2>
          </div>

          <p>
            Tres soluciones con distintos niveles de capacidad y un mismo
            punto de acceso. Comunica, automatiza y escala tu operación desde
            LearciNet Workspace.
          </p>
        </div>

        <div className={styles.systemGrid}>
          {/* SMART MAIL */}
          <article
            className={`${styles.productSystem} ${styles.smartMail}`}
          >
            <div className={styles.cardGlow} aria-hidden="true" />
            <div className={styles.scanner} aria-hidden="true" />

            <div className={styles.systemTop}>
              <span className={styles.status}>
                <i />
                Disponible ahora
              </span>

              <span className={styles.systemIndex}>
                COMUNICACIÓN
              </span>
            </div>

            <div className={styles.productIdentity}>
              <span className={styles.mailMark}>
                <MailIcon />
              </span>

              <div>
                <h3>Smart Mail</h3>
                <p>Comunicación con propósito.</p>
              </div>
            </div>

            <p className={styles.systemDescription}>
              Diseña campañas, personaliza mensajes con los datos de tus
              contactos y administra tus envíos desde un flujo guiado dentro de
              LearciNet Workspace.
            </p>

            <ProductFeatures items={smartMailFeatures} />

            <a
              className={`${theme.primaryButton} ${styles.productAction}`}
              href="https://workspace.learcinet.com/login"
            >
              Explorar Smart Mail <Arrow />
            </a>

            <div className={styles.cardPhrase}>
              COMUNICA · CONECTA · CRECE
            </div>
          </article>

          {/* SMART MAIL ENTERPRISE */}
          <article
            className={`${styles.productSystem} ${styles.enterpriseSystem}`}
          >
            <div className={styles.cardGlow} aria-hidden="true" />
            <div className={styles.scanner} aria-hidden="true" />

            <div className={styles.systemTop}>
              <span className={styles.enterpriseStatus}>
                <i />
                Enterprise · En evolución
              </span>

              <span className={styles.systemIndex}>
                SOLUCIÓN EMPRESARIAL
              </span>
            </div>

            <div className={styles.productIdentity}>
              <span
                className={`${styles.mailMark} ${styles.enterpriseMark}`}
              >
                <EnterpriseIcon />
              </span>

              <div>
                <h3>
                  Smart Mail
                  <span>Enterprise</span>
                </h3>
                <p>Potencia tu comunicación.</p>
              </div>
            </div>

            <p className={styles.systemDescription}>
              La evolución empresarial de Smart Mail para equipos y operaciones
              de gran escala. Gestiona múltiples remitentes, dominios,
              capacidad, seguridad y campañas desde una operación centralizada.
            </p>

            <ProductFeatures items={enterpriseFeatures} />

            <a
              className={`${theme.primaryButton} ${styles.enterpriseButton}`}
              href="https://workspace.learcinet.com/smart-mail-enterprise"
            >
              Conocer Enterprise <Arrow />
            </a>

            <div className={styles.cardPhrase}>
              ESCALA · AUTOMATIZA · CONTROLA
            </div>
          </article>

          {/* SMART WHATSAPP */}
          <article
            className={`${styles.productSystem} ${styles.whatsappSystem}`}
          >
            <div className={styles.cardGlow} aria-hidden="true" />
            <div className={styles.scanner} aria-hidden="true" />

            <div className={styles.systemTop}>
              <span className={styles.whatsappStatus}>
                <i />
                Próximamente
              </span>

              <span className={styles.systemIndex}>
                COMUNICACIÓN DIRECTA
              </span>
            </div>

            <div className={styles.productIdentity}>
              <span
                className={`${styles.mailMark} ${styles.whatsappMark}`}
              >
                <WhatsAppIcon />
              </span>

              <div>
                <h3>Smart WhatsApp</h3>
                <p>Conecta. Automatiza. Haz crecer.</p>
              </div>
            </div>

            <p className={styles.systemDescription}>
              Gestiona campañas autorizadas, contactos y mensajes con variables
              desde tu Workspace. Automatización, control de entrega y
              seguimiento en una sola herramienta.
            </p>

            <ProductFeatures items={whatsappFeatures} />

            <a
              className={`${theme.primaryButton} ${styles.whatsappButton}`}
              href="/contact"
            >
              Quiero ser el primero <Arrow />
            </a>

            <div className={styles.cardPhrase}>
              CONVERSA · AUTOMATIZA · FIDELIZA
            </div>
          </article>
        </div>

        <div className={styles.ecosystemFoot}>
          <span />
          <p>TRES SOLUCIONES. UN SOLO ECOSISTEMA.</p>
          <span />
        </div>
      </section>

      <section
        className={styles.featureBand}
        id="funcionalidades"
        aria-labelledby="features-title"
      >
        <div className={`${theme.container} ${styles.section}`}>
          <div className={styles.sectionHeading}>
            <div>
              <p className={theme.eyebrow}>
                <span>02 /</span> Funcionalidades
              </p>

              <h2 id="features-title">
                Una base conectada.
                <br />
                <em>Para operar y crecer.</em>
              </h2>
            </div>

            <p>
              Centraliza herramientas empresariales y habilita nuevos módulos
              conforme evolucionan tus procesos.
            </p>
          </div>

          <div className={styles.features}>
            {features.map((feature, index) => (
              <article key={feature}>
                <FeatureIcon index={index} />
                <h3>{feature}</h3>
                <span className={styles.featureIndex}>
                  0{index + 1}
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className={`${theme.container} ${styles.access}`}
        aria-labelledby="access-title"
      >
        <div className={styles.accessIcon} aria-hidden="true">
          <FeatureIcon index={7} />
        </div>

        <div>
          <p className={theme.eyebrow}>
            Inicio de sesión con Google
          </p>

          <h2 id="access-title">
            Acceso simple.
            <br />
            <em>Tu espacio protegido.</em>
          </h2>

          <p>
            LearciNet Workspace utiliza Google Sign-In para autenticar usuarios
            y proteger el acceso a cada Workspace. No publicamos información
            personal ni utilizamos cuentas de Google con fines publicitarios.
          </p>
        </div>

        <a className={theme.outlineButton} href="/privacy">
          Política de Privacidad <Arrow />
        </a>
      </section>

      <section
        className={`${theme.container} ${styles.closing}`}
        aria-labelledby="workspace-cta-title"
      >
        <div>
          <p className={theme.eyebrow}>
            LearciNet Workspace
          </p>

          <h2 id="workspace-cta-title">
            Dale espacio
            <br />
            <span>a tu siguiente paso.</span>
          </h2>

          <p>
            Empieza con Smart Mail y descubre un ecosistema diseñado para
            crecer contigo.
          </p>
        </div>

        <div className={styles.closingActions}>
          <a
            className={theme.primaryButton}
            href="https://workspace.learcinet.com/login"
          >
            Crear cuenta y probar Smart Mail <Arrow />
          </a>

          <a className={theme.secondaryLink} href="/contact">
            ¿Tienes preguntas? Hablemos <Arrow />
          </a>
        </div>
      </section>
    </FuturisticShell>
  );
}