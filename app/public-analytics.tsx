"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { AnalyticsTracker } from "./analytics-tracker";

/** Private workspaces never load third-party tracking scripts. */
export function PublicAnalytics() {
  const pathname = usePathname();
  if (pathname.startsWith("/private")) return null;
  return <>
    <Script src="https://plausible.io/js/pa-G9clyl_6s2S99aKdMfLDZ.js" strategy="afterInteractive" />
    <Script id="plausible-init" strategy="afterInteractive">{`window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init();`}</Script>
    <Script src="https://analytics.ahrefs.com/analytics.js" data-key="MPAh8sLkoeSklzzUygH+Qw" strategy="afterInteractive" />
    <AnalyticsTracker />
  </>;
}
