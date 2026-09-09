import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import theme from "@/app/page.module.css";

export default function FuturisticShell({ children, className = "" }) {
  return (
    <div className={`${theme.shell} ${className}`}>
      <a className={theme.skipLink} href="#contenido">Saltar al contenido</a>
      <SiteHeader />
      <main id="contenido" tabIndex={-1}>{children}</main>
      <SiteFooter />
    </div>
  );
}
