"use client";

import { useEffect, useState } from "react";

export default function PageTransition({ children }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className={`page-transition ${ready ? "page-transition-ready" : ""}`}>
      {children}
    </div>
  );
}
