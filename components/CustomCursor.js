"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const target = useRef({ x: -100, y: -100 });
  const current = useRef({ x: -100, y: -100 });
  const frame = useRef(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return undefined;

    const animate = () => {
      current.current.x += (target.current.x - current.current.x) * 0.22;
      current.current.y += (target.current.y - current.current.y) * 0.22;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0)`;
      }

      frame.current = requestAnimationFrame(animate);
    };

    const handleMove = (event) => {
      target.current.x = event.clientX - 10;
      target.current.y = event.clientY - 10;
      setVisible(true);
    };

    const handleOver = (event) => {
      const interactive = event.target.closest(
        "a, button, input, select, textarea, .cursor-active"
      );
      setActive(Boolean(interactive));
    };

    const handleLeave = () => setVisible(false);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseleave", handleLeave);

    frame.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseleave", handleLeave);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${visible ? "visible" : ""} ${active ? "active" : ""}`}
      aria-hidden="true"
    />
  );
}
