import { ogCard, ogSize } from "@/lib/og";
import { landings } from "@/data/landings";
export const size = ogSize;
export const contentType = "image/png";
export const alt = landings.es.title;
export default function Image() {const c=landings.es; return ogCard({eyebrow:"Ostap Kovalisko",title:c.title,subline:c.description,footer:"ostapkvl.com",titleSize:66});}
