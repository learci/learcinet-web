import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://learcinet.com"),
  title: { default: "LearciNet | Soluciones digitales", template: "%s" },
  description:
    "Diseño web, automatización, analítica y LearciNet Workspace para empresas y profesionales.",
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "https://learcinet.com",
    siteName: "LearciNet",
    title: "LearciNet | Soluciones digitales",
    description: "Diseño web, automatización, analítica y herramientas empresariales en la nube.",
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}

