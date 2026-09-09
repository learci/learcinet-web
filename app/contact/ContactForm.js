"use client";

import { useMemo, useState } from "react";
import { siteData } from "@/data/siteData";
import styles from "./ContactForm.module.css";

const requestTypes = [
  "Cotización",
  "Consulta",
  "Soporte",
  "Nuevo proyecto",
];

const services = [
  "Diseño y desarrollo web",
  "Smart Mail",
  "Smart Mail Enterprise",
  "Smart WhatsApp",
  "Automatización de procesos",
  "Dashboards y análisis de datos",
  "Reparación / mantenimiento de equipos",
  "Otro",
];

const budgets = [
  "Aún no lo he definido",
  "Menos de $5,000 MXN",
  "$5,000 – $10,000 MXN",
  "$10,000 – $25,000 MXN",
  "$25,000 – $50,000 MXN",
  "Más de $50,000 MXN",
];

const timelines = [
  "Sin fecha definida",
  "Lo antes posible",
  "1 – 2 semanas",
  "Este mes",
  "1 – 3 meses",
  "Más adelante",
];

const initialForm = {
  name: "",
  company: "",
  email: "",
  phone: "",
  requestType: "Cotización",
  service: "Diseño y desarrollo web",
  budget: "Aún no lo he definido",
  timeline: "Sin fecha definida",
  message: "",
  preferredContact: "WhatsApp",
  privacy: false,
  website: "",
};

function Arrow() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 18 18 6M6 6h12v12"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg
      width="23"
      height="23"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m3 11 18-8-8 18-2.4-7.6L3 11Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="m10.6 13.4 5.8-5.8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function StepLabel({ number, children }) {
  return (
    <div className={styles.stepLabel}>
      <span>{number}</span>
      <p>{children}</p>
    </div>
  );
}

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("ready");
  const [errors, setErrors] = useState({});

  const completedFields = useMemo(() => {
    const values = [
      form.name,
      form.email,
      form.requestType,
      form.service,
      form.message,
      form.preferredContact,
    ];

    return values.filter(Boolean).length;
  }, [form]);

  const progress = Math.round((completedFields / 6) * 100);

  function updateField(event) {
    const { name, value, type, checked } = event.target;

    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));

    setStatus("ready");
  }

  function validate() {
    const nextErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = "Escribe tu nombre.";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Escribe tu correo.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Escribe un correo válido.";
    }

    if (!form.message.trim()) {
      nextErrors.message = "Cuéntanos brevemente qué necesitas.";
    }

    if (!form.privacy) {
      nextErrors.privacy = "Debes aceptar la política de privacidad.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }

  function buildRequest() {
    return [
      "NUEVA SOLICITUD DESDE LEARCINET.COM",
      "",
      `Tipo de solicitud: ${form.requestType}`,
      `Servicio: ${form.service}`,
      "",
      "DATOS DE CONTACTO",
      `Nombre: ${form.name}`,
      `Empresa: ${form.company || "No indicada"}`,
      `Correo: ${form.email}`,
      `WhatsApp / teléfono: ${form.phone || "No indicado"}`,
      "",
      "PROYECTO",
      `Presupuesto estimado: ${form.budget}`,
      `Fecha objetivo: ${form.timeline}`,
      `Medio de contacto preferido: ${form.preferredContact}`,
      "",
      "DETALLE",
      form.message,
      "",
      "Solicitud generada desde LearciNet.",
    ].join("\n");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!validate()) {
      setStatus("error");
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          company: form.company,
          email: form.email,
          phone: form.phone,
          requestType: form.requestType,
          service: form.service,
          budget: form.budget,
          timeline: form.timeline,
          message: form.message,
          preferredContact: form.preferredContact,
          website: form.website,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        console.error("Contact form error:", data);
        setStatus("send-error");
        return;
      }

      setStatus("sent");
      setForm(initialForm);
      setErrors({});
    } catch (error) {
      console.error("Contact request failed:", error);
      setStatus("send-error");
    }
  }

  function openWhatsApp() {
    if (status === "sending") {
      return;
    }

    if (!validate()) {
      setStatus("error");
      return;
    }

    const message = encodeURIComponent(buildRequest());
    const separator = siteData.contact.whatsapp.includes("?") ? "&" : "?";

    window.open(
      `${siteData.contact.whatsapp}${separator}text=${message}`,
      "_blank",
      "noopener,noreferrer"
    );

    setStatus("whatsapp");
  }

  return (
    <section className={styles.section} id="solicitud">
      <div className={styles.backgroundGrid} aria-hidden="true" />
      <div className={styles.glowOne} aria-hidden="true" />
      <div className={styles.glowTwo} aria-hidden="true" />

      <div className={styles.container}>
        <header className={styles.heading}>
          <div>
            <p className={styles.eyebrow}>
              <span>02 /</span> Nueva solicitud
            </p>

            <h2>
              Cuéntanos qué necesitas.
              <br />
              <span>Construyamos el siguiente paso.</span>
            </h2>
          </div>

          <p className={styles.headingDescription}>
            Completa el brief con la información que ya tengas. No necesitas
            conocer todos los detalles técnicos para comenzar.
          </p>
        </header>

        <div className={styles.formShell}>
          <div className={styles.scanner} aria-hidden="true" />

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                left: "-9999px",
                width: "1px",
                height: "1px",
                overflow: "hidden",
              }}
            >
              <label>
                Sitio web
                <input
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={updateField}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </label>
            </div>

            <section className={styles.formBlock}>
              <StepLabel number="01">Datos de contacto</StepLabel>

              <div className={styles.fieldsTwo}>
                <label className={styles.field}>
                  <span>
                    Nombre <b>*</b>
                  </span>

                  <input
                    name="name"
                    value={form.name}
                    onChange={updateField}
                    placeholder="¿Cómo te llamas?"
                    autoComplete="name"
                  />

                  {errors.name && (
                    <small className={styles.error}>{errors.name}</small>
                  )}
                </label>

                <label className={styles.field}>
                  <span>Empresa / proyecto</span>

                  <input
                    name="company"
                    value={form.company}
                    onChange={updateField}
                    placeholder="Nombre de tu negocio"
                    autoComplete="organization"
                  />
                </label>

                <label className={styles.field}>
                  <span>
                    Correo <b>*</b>
                  </span>

                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={updateField}
                    placeholder="nombre@empresa.com"
                    autoComplete="email"
                  />

                  {errors.email && (
                    <small className={styles.error}>{errors.email}</small>
                  )}
                </label>

                <label className={styles.field}>
                  <span>WhatsApp / teléfono</span>

                  <input
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={updateField}
                    placeholder="+52 55..."
                    autoComplete="tel"
                  />
                </label>
              </div>
            </section>

            <section className={styles.formBlock}>
              <StepLabel number="02">¿Qué necesitas?</StepLabel>

              <div className={styles.requestType}>
                {requestTypes.map((type) => (
                  <label
                    className={`${styles.choice} ${
                      form.requestType === type ? styles.choiceActive : ""
                    }`}
                    key={type}
                  >
                    <input
                      type="radio"
                      name="requestType"
                      value={type}
                      checked={form.requestType === type}
                      onChange={updateField}
                    />

                    <span>{type}</span>
                  </label>
                ))}
              </div>

              <div className={styles.fieldsTwo}>
                <label className={styles.field}>
                  <span>Servicio de interés</span>

                  <select
                    name="service"
                    value={form.service}
                    onChange={updateField}
                  >
                    {services.map((service) => (
                      <option value={service} key={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </label>

                <label className={styles.field}>
                  <span>Presupuesto estimado</span>

                  <select
                    name="budget"
                    value={form.budget}
                    onChange={updateField}
                  >
                    {budgets.map((budget) => (
                      <option value={budget} key={budget}>
                        {budget}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </section>

            <section className={styles.formBlock}>
              <StepLabel number="03">Detalles del proyecto</StepLabel>

              <div className={styles.fieldsTwo}>
                <label className={styles.field}>
                  <span>Fecha objetivo</span>

                  <select
                    name="timeline"
                    value={form.timeline}
                    onChange={updateField}
                  >
                    {timelines.map((timeline) => (
                      <option value={timeline} key={timeline}>
                        {timeline}
                      </option>
                    ))}
                  </select>
                </label>

                <div className={styles.field}>
                  <span>Prefiero que me contacten por</span>

                  <div className={styles.contactPreference}>
                    {["WhatsApp", "Correo"].map((method) => (
                      <label
                        className={`${styles.smallChoice} ${
                          form.preferredContact === method
                            ? styles.smallChoiceActive
                            : ""
                        }`}
                        key={method}
                      >
                        <input
                          type="radio"
                          name="preferredContact"
                          value={method}
                          checked={form.preferredContact === method}
                          onChange={updateField}
                        />

                        {method}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <label className={`${styles.field} ${styles.messageField}`}>
                <span>
                  Cuéntanos sobre tu proyecto <b>*</b>
                </span>

                <textarea
                  name="message"
                  value={form.message}
                  onChange={updateField}
                  rows="7"
                  maxLength="2500"
                  placeholder="¿Qué quieres lograr? ¿Qué problema necesitas resolver? ¿Existe actualmente algún sistema, sitio o proceso que debamos considerar?"
                />

                <div className={styles.characterCount}>
                  <span>
                    {errors.message ? (
                      <small className={styles.error}>{errors.message}</small>
                    ) : (
                      "Entre más contexto compartas, mejor podremos orientarte."
                    )}
                  </span>

                  <span>{form.message.length} / 2500</span>
                </div>
              </label>
            </section>

            <section className={styles.formFooter}>
              <label className={styles.privacy}>
                <input
                  name="privacy"
                  type="checkbox"
                  checked={form.privacy}
                  onChange={updateField}
                />

                <span className={styles.checkBox} aria-hidden="true">
                  ✓
                </span>

                <span>
                  Acepto que LearciNet utilice estos datos únicamente para
                  responder mi solicitud y acepto la{" "}
                  <a href="/privacy">Política de Privacidad</a>.
                </span>
              </label>

              {errors.privacy && (
                <small className={styles.privacyError}>
                  {errors.privacy}
                </small>
              )}

              <div className={styles.formActions}>
                <button
                  type="button"
                  className={styles.whatsappButton}
                  onClick={openWhatsApp}
                  disabled={status === "sending"}
                >
                  Enviar por WhatsApp
                  <Arrow />
                </button>

                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={status === "sending"}
                >
                  <SendIcon />

                  {status === "sending"
                    ? "Enviando solicitud..."
                    : "Enviar solicitud"}

                  <Arrow />
                </button>
              </div>

              {status === "error" && (
                <p className={styles.formMessageError}>
                  Revisa los campos marcados antes de continuar.
                </p>
              )}

              {status === "sending" && (
                <p className={styles.formMessage}>
                  Enviando tu solicitud de forma segura...
                </p>
              )}

              {status === "sent" && (
                <p className={styles.formMessage}>
                  ✓ Solicitud enviada correctamente. Te contactaremos pronto.
                </p>
              )}

              {status === "send-error" && (
                <p className={styles.formMessageError}>
                  No pudimos enviar tu solicitud en este momento. Intenta
                  nuevamente o usa WhatsApp.
                </p>
              )}

              {status === "whatsapp" && (
                <p className={styles.formMessage}>
                  Abrimos WhatsApp con la información de tu solicitud.
                </p>
              )}
            </section>
          </form>

          <aside className={styles.brief}>
            <div className={styles.briefTop}>
              <span>LEARCINET / BRIEF</span>

              <span className={styles.liveStatus}>
                <i />
                LISTO
              </span>
            </div>

            <div className={styles.briefOrb} aria-hidden="true">
              <span />
              <i />
            </div>

            <div className={styles.briefContent}>
              <p className={styles.briefIndex}>SOLICITUD / 001</p>

              <h3>
                Tu idea,
                <br />
                <span>con contexto.</span>
              </h3>

              <p>
                Organizamos la información necesaria para entender tu necesidad
                desde el primer contacto.
              </p>
            </div>

            <dl className={styles.summary}>
              <div>
                <dt>Solicitud</dt>
                <dd>{form.requestType}</dd>
              </div>

              <div>
                <dt>Servicio</dt>
                <dd>{form.service}</dd>
              </div>

              <div>
                <dt>Plazo</dt>
                <dd>{form.timeline}</dd>
              </div>

              <div>
                <dt>Contacto</dt>
                <dd>{form.preferredContact}</dd>
              </div>
            </dl>

            <div className={styles.progress}>
              <div className={styles.progressTop}>
                <span>INFORMACIÓN DEL BRIEF</span>
                <strong>{progress}%</strong>
              </div>

              <div className={styles.progressTrack}>
                <span style={{ width: `${progress}%` }} />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}