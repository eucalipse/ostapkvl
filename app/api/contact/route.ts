import { NextResponse } from "next/server";
import { forwardSubmission } from "@/lib/submissions";

// Forwards to Control Room's shared Submission table instead of emailing
// Ostap directly per message — see lib/submissions.ts. Control Room's
// weekly digest cron covers notification.
export async function POST(request: Request) {
  let body: { name?: string; email?: string; message?: string; company?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = (body.name ?? "").trim().slice(0, 200);
  const email = (body.email ?? "").trim().slice(0, 200);
  const message = (body.message ?? "").trim().slice(0, 5000);

  // Honeypot: real users never fill this hidden field.
  if (body.company) {
    return NextResponse.json({ ok: true });
  }
  if (!name || !message || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json(
      { error: "Please fill in name, a valid email, and a message." },
      { status: 400 }
    );
  }

  await forwardSubmission({ type: "contact", email, name, message, source: "contact-form" });

  return NextResponse.json({ ok: true });
}
