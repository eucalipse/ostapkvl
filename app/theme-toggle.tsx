"use client";
import { useEffect, useState } from "react";
type Theme = "system" | "light" | "dark";
const key = "ostapkvl-theme";
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("system");
  useEffect(() => {
    let saved: Theme = "system";
    try { const value = localStorage.getItem(key); if (value === "light" || value === "dark") saved = value; } catch {}
    setTheme(saved);
    const media = matchMedia("(prefers-color-scheme: dark)");
    const apply = () => {
      let preference: string | null = null;
      try { preference = localStorage.getItem(key); } catch {}
      document.documentElement.dataset.theme = preference === "light" || preference === "dark" ? preference : media.matches ? "dark" : "light";
    };
    apply();
    const sync = () => { let value: string | null = null; try { value = localStorage.getItem(key); } catch {} setTheme(value === "light" || value === "dark" ? value : "system"); apply(); };
    media.addEventListener("change", apply);
    window.addEventListener("storage", sync);
    return () => { media.removeEventListener("change", apply); window.removeEventListener("storage", sync); };
  }, []);
  return <select aria-label="Color theme" value={theme} onChange={event => {
    const value = event.target.value as Theme;
    setTheme(value);
    try { localStorage.setItem(key, value); } catch {}
    document.documentElement.dataset.theme = value === "system" ? matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light" : value;
  }} className="rounded border border-line bg-paper px-2 py-1 text-xs text-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent">
    <option value="system">System</option><option value="light">Light</option><option value="dark">Dark</option>
  </select>;
}
