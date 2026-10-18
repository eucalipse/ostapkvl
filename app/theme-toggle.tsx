"use client";

import { useEffect, useRef, useState } from "react";
import type { SiteLocale } from "@/data/landings";

type Theme = "light" | "dark";
const key = "ostapkvl-theme";

const labels: Record<SiteLocale, { light: string; dark: string }> = {
  en: { light: "Switch to light mode", dark: "Switch to dark mode" },
  es: { light: "Activar modo claro", dark: "Activar modo oscuro" },
  fr: { light: "Activer le mode clair", dark: "Activer le mode sombre" },
  pt: { light: "Ativar modo claro", dark: "Ativar modo escuro" },
  de: { light: "Hellen Modus aktivieren", dark: "Dunklen Modus aktivieren" },
};

export function ThemeToggle({ locale = "en" }: { locale?: SiteLocale }) {
  const [theme, setTheme] = useState<Theme>("light");
  const preference = useRef<Theme | null>(null);

  useEffect(() => {
    const media = matchMedia("(prefers-color-scheme: dark)");
    const apply = () => {
      const resolved = preference.current ?? (media.matches ? "dark" : "light");
      document.documentElement.dataset.theme = resolved;
      setTheme(resolved);
    };
    const sync = () => {
      try {
        const saved = localStorage.getItem(key);
        preference.current = saved === "light" || saved === "dark" ? saved : null;
      } catch {}
      apply();
    };
    const onStorage = (event: StorageEvent) => {
      if (event.key === key || event.key === null) sync();
    };
    sync();
    media.addEventListener("change", apply);
    window.addEventListener("storage", onStorage);
    return () => {
      media.removeEventListener("change", apply);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const label = theme === "dark" ? labels[locale].light : labels[locale].dark;

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={() => {
        const next = theme === "dark" ? "light" : "dark";
        preference.current = next;
        setTheme(next);
        document.documentElement.dataset.theme = next;
        try { localStorage.setItem(key, next); } catch {}
      }}
      className="group relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-transparent text-muted transition-colors hover:border-accent/20 hover:bg-accent/10 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:transition-none"
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12 motion-reduce:transform-none motion-reduce:transition-none">
        {theme === "dark" ? (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
          </>
        ) : (
          <path d="M20.8 13.2A8.8 8.8 0 0 1 10.8 3.2a8.8 8.8 0 1 0 10 10Z" />
        )}
      </svg>
    </button>
  );
}
