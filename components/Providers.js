"use client";

import { useEffect } from "react";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";

export default function Providers({ children }) {
  useEffect(() => {
    document.documentElement.classList.add("enhanced-motion");
    return () => document.documentElement.classList.remove("enhanced-motion");
  }, []);

  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      {children}
    </>
  );
}
