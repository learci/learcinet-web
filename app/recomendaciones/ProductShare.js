"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import { buildAffiliateShareTargets } from "@/lib/affiliate-share";

import styles from "./share.module.css";

function ShareIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="m8.6 10.5 6.8-4M8.6 13.5l6.8 4" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1" />
      <path d="M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 12 20l1.1-1.1" />
    </svg>
  );
}

async function copyText(value) {
  if (
    typeof navigator !== "undefined" &&
    navigator.clipboard?.writeText
  ) {
    try {
      await navigator.clipboard.writeText(value);
      return true;
    } catch {
      // Continúa con el respaldo para navegadores sin permiso de portapapeles.
    }
  }

  if (typeof document === "undefined") {
    return false;
  }

  const input = document.createElement("textarea");
  input.value = value;
  input.setAttribute("readonly", "");
  input.style.position = "fixed";
  input.style.opacity = "0";
  input.style.pointerEvents = "none";

  document.body.appendChild(input);
  input.select();

  let copied = false;

  try {
    copied = document.execCommand("copy");
  } catch {
    copied = false;
  }

  input.remove();
  return copied;
}

export default function ProductShare({
  name,
  price,
  url,
}) {
  const [open, setOpen] = useState(false);
  const [nativeShareAvailable, setNativeShareAvailable] =
    useState(false);
  const [status, setStatus] = useState("");
  const containerRef = useRef(null);
  const buttonRef = useRef(null);
  const statusTimerRef = useRef(null);
  const menuId = useId();

  const share = buildAffiliateShareTargets({
    name,
    price,
    url,
  });

  useEffect(() => {
    setNativeShareAvailable(
      typeof navigator !== "undefined" &&
        typeof navigator.share === "function"
    );
  }, []);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener(
      "pointerdown",
      handlePointerDown
    );
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener(
        "pointerdown",
        handlePointerDown
      );
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [open]);

  useEffect(
    () => () => {
      if (statusTimerRef.current) {
        window.clearTimeout(statusTimerRef.current);
      }
    },
    []
  );

  if (!share) {
    return null;
  }

  const showTemporaryStatus = (message) => {
    setStatus(message);

    if (statusTimerRef.current) {
      window.clearTimeout(statusTimerRef.current);
    }

    statusTimerRef.current = window.setTimeout(
      () => setStatus(""),
      2400
    );
  };

  const handleCopy = async () => {
    const copied = await copyText(share.url);

    showTemporaryStatus(
      copied
        ? "Enlace copiado"
        : "No se pudo copiar el enlace"
    );
  };

  const handleNativeShare = async () => {
    try {
      await navigator.share({
        title: share.title,
        text: share.text,
        url: share.url,
      });
      setOpen(false);
    } catch (error) {
      if (error?.name !== "AbortError") {
        showTemporaryStatus(
          "No se pudieron abrir las opciones"
        );
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={styles.share}
    >
      <button
        ref={buttonRef}
        className={styles.shareButton}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
      >
        <ShareIcon />
        Compartir
      </button>

      {open && (
        <div
          id={menuId}
          className={styles.sharePanel}
          aria-label={`Compartir ${name}`}
        >
          <div className={styles.shareGrid}>
            <a
              href={share.facebook}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
            >
              <span aria-hidden="true">f</span>
              Facebook
            </a>

            <a
              href={share.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
            >
              <span aria-hidden="true">WA</span>
              WhatsApp
            </a>

            <a
              href={share.x}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
            >
              <span aria-hidden="true">X</span>
              X / Twitter
            </a>

            <button type="button" onClick={handleCopy}>
              <span aria-hidden="true">
                <LinkIcon />
              </span>
              Copiar enlace
            </button>

            {nativeShareAvailable && (
              <button
                className={styles.nativeShare}
                type="button"
                onClick={handleNativeShare}
              >
                <span aria-hidden="true">
                  <ShareIcon />
                </span>
                Más opciones
              </button>
            )}
          </div>

          <p className={styles.instagramHint}>
            Instagram: usa “Más opciones” en un dispositivo
            compatible o copia el enlace para compartirlo.
          </p>
        </div>
      )}

      <span
        className={styles.shareStatus}
        role="status"
        aria-live="polite"
      >
        {status}
      </span>
    </div>
  );
}
