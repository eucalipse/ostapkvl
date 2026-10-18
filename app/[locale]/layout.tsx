import { landingLocales } from "@/data/landings";

export const dynamicParams = false;

export function generateStaticParams() {
  return landingLocales.map((locale) => ({ locale }));
}

export default function LocaleLayout({ children }: { children: React.ReactNode }) {
  return children;
}
