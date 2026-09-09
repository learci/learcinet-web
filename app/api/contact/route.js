import { NextResponse } from "next/server";

export const runtime = "nodejs";

const REQUEST_TYPES = new Set([
  "Cotización",
  "Consulta",
  "Soporte",
  "Nuevo proyecto",
]);

const SERVICES = new Set([
  "Diseño y desarrollo web",
  "Smart Mail",
  "Smart Mail Enterprise",
  "Smart WhatsApp",
  "Automatización de procesos",
  "Dashboards y análisis de datos",
  "Reparación / mantenimiento de equipos",
  "Otro",
]);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const rateLimitStore = new Map();

function clean(value, maxLength = 500) {
  if (typeof value !== "string") return "";

  return value
    .replace(/\0/g, "")
    .trim()
    .slice(0, maxLength);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getClientIp(request) {
  const forwarded = request.headers.get("x-forwarded-for");

  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  return request.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(ip) {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const maxRequests = 5;

  const previous = rateLimitStore.get(ip) || [];

  const recent = previous.filter(
    (timestamp) => now - timestamp < windowMs
  );

  if (recent.length >= maxRequests) {
    rateLimitStore.set(ip, recent);
    return true;
  }

  recent.push(now);
  rateLimitStore.set(ip, recent);

  return false;
}

export async function POST(request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured.");

      return NextResponse.json(
        {
          ok: false,
          message: "El servicio de correo no está configurado.",
        },
        { status: 500 }
      );
    }

    const ip = getClientIp(request);

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "Has realizado varias solicitudes. Intenta nuevamente en unos minutos.",
        },
        { status: 429 }
      );
    }

    const body = await request.json();

    /*
     * Honeypot anti-spam.
     * Un usuario real nunca debe llenar este campo.
     */
    if (body.website) {
      return NextResponse.json({
        ok: true,
        message: "Solicitud recibida.",
      });
    }

    const data = {
      name: clean(body.name, 120),
      company: clean(body.company, 150),
      email: clean(body.email, 180).toLowerCase(),
      phone: clean(body.phone, 50),
      requestType: clean(body.requestType, 80),
      service: clean(body.service, 120),
      budget: clean(body.budget, 100),
      timeline: clean(body.timeline, 100),
      message: clean(body.message, 2500),
      preferredContact: clean(body.preferredContact, 50),
    };

    const errors = {};

    if (data.name.length < 2) {
      errors.name = "Ingresa un nombre válido.";
    }

    if (!EMAIL_REGEX.test(data.email)) {
      errors.email = "Ingresa un correo válido.";
    }

    if (data.message.length < 10) {
      errors.message =
        "Describe tu solicitud con al menos 10 caracteres.";
    }

    if (!REQUEST_TYPES.has(data.requestType)) {
      errors.requestType = "Tipo de solicitud no válido.";
    }

    if (!SERVICES.has(data.service)) {
      errors.service = "Servicio no válido.";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          ok: false,
          message: "Revisa los datos del formulario.",
          errors,
        },
        { status: 400 }
      );
    }

    const subject =
      `${data.requestType} · ${data.service} · ${data.name}`;

    const safe = {
      name: escapeHtml(data.name),
      company: escapeHtml(data.company || "No proporcionado"),
      email: escapeHtml(data.email),
      phone: escapeHtml(data.phone || "No proporcionado"),
      requestType: escapeHtml(data.requestType),
      service: escapeHtml(data.service),
      budget: escapeHtml(data.budget || "No definido"),
      timeline: escapeHtml(data.timeline || "No definido"),
      preferredContact: escapeHtml(
        data.preferredContact || "No definido"
      ),
      message: escapeHtml(data.message).replaceAll("\n", "<br />"),
    };

    const html = `
      <!doctype html>
      <html lang="es">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>

        <body
          style="
            margin:0;
            padding:32px;
            background:#060a14;
            font-family:Arial,Helvetica,sans-serif;
            color:#f0f4ff;
          "
        >
          <div
            style="
              max-width:720px;
              margin:0 auto;
              background:#0c1221;
              border:1px solid rgba(121,233,255,.25);
              border-radius:24px;
              overflow:hidden;
            "
          >
            <div
              style="
                padding:28px 32px;
                border-bottom:1px solid rgba(165,190,230,.16);
              "
            >
              <div
                style="
                  color:#79e9ff;
                  font-size:12px;
                  letter-spacing:.18em;
                  font-weight:700;
                "
              >
                LEARCINET / NUEVA SOLICITUD
              </div>

              <h1
                style="
                  margin:12px 0 0;
                  font-size:28px;
                  line-height:1.2;
                "
              >
                ${safe.requestType}
              </h1>
            </div>

            <div style="padding:32px;">
              <table
                cellpadding="0"
                cellspacing="0"
                width="100%"
                style="
                  border-collapse:collapse;
                  color:#f0f4ff;
                  font-size:14px;
                "
              >
                <tr>
                  <td style="padding:10px 0;color:#9eabc1;width:180px;">
                    Nombre
                  </td>
                  <td style="padding:10px 0;">
                    ${safe.name}
                  </td>
                </tr>

                <tr>
                  <td style="padding:10px 0;color:#9eabc1;">
                    Empresa / proyecto
                  </td>
                  <td style="padding:10px 0;">
                    ${safe.company}
                  </td>
                </tr>

                <tr>
                  <td style="padding:10px 0;color:#9eabc1;">
                    Correo
                  </td>
                  <td style="padding:10px 0;">
                    ${safe.email}
                  </td>
                </tr>

                <tr>
                  <td style="padding:10px 0;color:#9eabc1;">
                    WhatsApp / teléfono
                  </td>
                  <td style="padding:10px 0;">
                    ${safe.phone}
                  </td>
                </tr>

                <tr>
                  <td style="padding:10px 0;color:#9eabc1;">
                    Servicio
                  </td>
                  <td style="padding:10px 0;">
                    ${safe.service}
                  </td>
                </tr>

                <tr>
                  <td style="padding:10px 0;color:#9eabc1;">
                    Presupuesto
                  </td>
                  <td style="padding:10px 0;">
                    ${safe.budget}
                  </td>
                </tr>

                <tr>
                  <td style="padding:10px 0;color:#9eabc1;">
                    Fecha objetivo
                  </td>
                  <td style="padding:10px 0;">
                    ${safe.timeline}
                  </td>
                </tr>

                <tr>
                  <td style="padding:10px 0;color:#9eabc1;">
                    Contacto preferido
                  </td>
                  <td style="padding:10px 0;">
                    ${safe.preferredContact}
                  </td>
                </tr>
              </table>

              <div
                style="
                  margin-top:28px;
                  padding-top:24px;
                  border-top:1px solid rgba(165,190,230,.16);
                "
              >
                <div
                  style="
                    margin-bottom:10px;
                    color:#79e9ff;
                    font-size:12px;
                    letter-spacing:.12em;
                    font-weight:700;
                  "
                >
                  DETALLE DE LA SOLICITUD
                </div>

                <div
                  style="
                    color:#dce5f5;
                    line-height:1.7;
                  "
                >
                  ${safe.message}
                </div>
              </div>
            </div>

            <div
              style="
                padding:20px 32px;
                background:#080e19;
                color:#78869d;
                font-size:12px;
              "
            >
              Solicitud enviada desde learcinet.com
            </div>
          </div>
        </body>
      </html>
    `;

    const text = [
      "LEARCINET / NUEVA SOLICITUD",
      "",
      `Tipo: ${data.requestType}`,
      `Servicio: ${data.service}`,
      `Nombre: ${data.name}`,
      `Empresa / proyecto: ${data.company || "No proporcionado"}`,
      `Correo: ${data.email}`,
      `WhatsApp / teléfono: ${data.phone || "No proporcionado"}`,
      `Presupuesto: ${data.budget || "No definido"}`,
      `Fecha objetivo: ${data.timeline || "No definido"}`,
      `Contacto preferido: ${data.preferredContact || "No definido"}`,
      "",
      "DETALLE",
      data.message,
      "",
      "Solicitud enviada desde learcinet.com",
    ].join("\n");

    const resendResponse = await fetch(
      "https://api.resend.com/emails",
      {
        method: "POST",

        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          from:
            process.env.CONTACT_FROM_EMAIL ||
            "LearciNet <contacto@learcinet.com>",

          to: [
            process.env.CONTACT_TO_EMAIL ||
              "contacto@learcinet.com",
          ],

          reply_to: data.email,

          subject,

          html,

          text,
        }),
      }
    );

    const resendData = await resendResponse.json();

    if (!resendResponse.ok) {
      console.error("Resend error:", resendData);

      return NextResponse.json(
        {
          ok: false,
          message:
            "No fue posible enviar la solicitud. Intenta nuevamente.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      ok: true,
      message:
        "Tu solicitud fue enviada correctamente. Te contactaremos pronto.",
      id: resendData.id,
    });
  } catch (error) {
    console.error("Contact API error:", error);

    return NextResponse.json(
      {
        ok: false,
        message:
          "Ocurrió un error al procesar la solicitud.",
      },
      { status: 500 }
    );
  }
}
