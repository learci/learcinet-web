"use client";

import { useEffect, useState } from "react";
import { siteData } from "@/data/siteData";

function ArrowUpRight({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 17 17 7M8 7h9v9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MenuIcon({ open }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {open ? (
        <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      ) : (
        <>
          <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  return (
    <header className="site-header unified-header">
      <a href="/" className="logo header-logo" aria-label="LearciNet, inicio">
        <span className="logo-mark">L</span>
        <span>LearciNet</span>
      </a>

      <nav className={`main-nav ${open ? "is-open" : ""}`} aria-label="Navegación principal">
        <a href="/" onClick={() => setOpen(false)}>Inicio</a>
        {siteData.navigation.map((item) => (
          <a key={`${item.label}-${item.href}`} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </a>
        ))}
        <a className="nav-cta mobile-only" href="/contact" onClick={() => setOpen(false)}>
          Cotizar proyecto <ArrowUpRight />
        </a>
      </nav>

      <a className="nav-cta desktop-only" href="/contact">
        Cotizar proyecto <ArrowUpRight />
      </a>

      <button
        className="menu-button"
        type="button"
        aria-expanded={open}
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        onClick={() => setOpen(!open)}
      >
        <MenuIcon open={open} />
      </button>
    </header>
  );
}
