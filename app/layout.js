import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://learcinet.com"),
  title: "LearciNet | Estudio Digital ॐ NPM",
  description:
    "Diseño web, automatización, dashboards, soporte tecnológico y soluciones digitales para empresas y emprendedores.",
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

