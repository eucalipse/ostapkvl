import { NextRequest, NextResponse } from "next/server";
import { hasPrivateAccess } from "./lib/private-access";

export async function middleware(request: NextRequest) {
  const authorized = await hasPrivateAccess(request.headers.get("authorization"), process.env.PRIVATE_ARTICLES_PASSWORD);
  const response = authorized ? NextResponse.next() : new NextResponse("Private article workspace. Sign in with your owner credentials.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Ostap private articles", charset="UTF-8"' },
  });
  response.headers.set("Cache-Control", "private, no-store, max-age=0");
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  response.headers.set("Referrer-Policy", "no-referrer");
  response.headers.set("X-Frame-Options", "DENY");
  return response;
}

export const config = { matcher: ["/private/:path*", "/api/private/:path*"] };
