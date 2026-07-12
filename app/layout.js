import "./globals.css";

export const metadata = {
  title: "LearciNet | Estudio Digital",
  description:
    "Diseño web, automatización, dashboards, soporte tecnológico y soluciones digitales para empresas y emprendedores.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
