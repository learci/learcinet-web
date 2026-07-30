import { siteData } from "@/data/siteData";

export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <a href="/" className="logo footer-logo" aria-label="LearciNet, inicio">
          <span className="logo-mark">L</span>
          <span>LearciNet</span>
        </a>
        <p>Soluciones digitales, automatización e inteligencia aplicada para empresas y profesionales.</p>
        <div className="footer-links">
          <a href="/services">Servicios</a>
          <a href="/workspace">Workspace</a>
          <a href="/contact">Contacto</a>
          <a href="/privacy">Privacidad</a>
          <a href="/terms">Términos</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} LearciNet.</span>
        <span>{siteData.contact.location}</span>
      </div>
    </footer>
  );
}
