import type { Metadata } from "next";
import { LocalizedLanding } from "../localized-landing";
import { landings } from "@/data/landings";
const c = landings.es;
export const metadata: Metadata = {
 title: c.title, description: c.description,
 alternates: { canonical: "/es", languages: { en: "/contact", es: "/es", fr: "/fr", "x-default": "/contact" } },
 openGraph: { title: c.title, description: c.description, url: "/es", locale: "es_ES", type: "website", images: [{url:"/es/opengraph-image",width:1200,height:630}] },
 twitter: { card: "summary_large_image", title: c.title, description: c.description, images: ["/es/opengraph-image"] },
};
export default function Page() { return <LocalizedLanding locale="es" />; }
