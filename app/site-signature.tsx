"use client";
import { usePathname } from "next/navigation";
import { landings } from "@/data/landings";
export function SiteSignature() {
 const path=usePathname();
 const locale=path==="/es"?"es":path==="/fr"?"fr":"en";
 const hero=path==="/" || locale!=="en";
 return <div lang={locale} className={`site-signature no-print mx-auto max-w-wide px-6 ${hero?"signature-hero":"signature-strip"}`}>
  <div className="signature-frame relative overflow-hidden border-b border-line">
   {/* eslint-disable-next-line @next/next/no-img-element */}
   <img src="/images/agent-signature-light.svg" alt="" width={1584} height={396} className="banner-light signature-art" />
   {/* eslint-disable-next-line @next/next/no-img-element */}
   <img src="/images/agent-signature-dark.svg" alt="" width={1584} height={396} className="banner-dark signature-art" />
   {hero && <p className="signature-headline relative max-w-[24rem] font-serif text-3xl leading-tight sm:text-4xl">{locale==="en"?<>Building AI agents<br/>that get work <span className="text-accent">done.</span></>:landings[locale].hero}</p>}
  </div>
 </div>;
}
