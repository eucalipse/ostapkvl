import type { Metadata } from "next";
import { LocalizedLanding } from "../localized-landing";
import { landings } from "@/data/landings";
const c = landings.fr;
export const metadata: Metadata = {
 title: c.title, description: c.description,
 alternates: { canonical: "/fr", languages: { en: "/contact", es: "/es", fr: "/fr", "x-default": "/contact" } },
 openGraph: { title: c.title, description: c.description, url: "/fr", locale: "fr_FR", type: "website", images: [{url:"/fr/opengraph-image",width:1200,height:630}] },
 twitter: { card: "summary_large_image", title: c.title, description: c.description, images: ["/fr/opengraph-image"] },
};
export default function Page() { return <LocalizedLanding locale="fr" />; }
