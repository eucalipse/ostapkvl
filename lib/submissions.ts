// Forwards contact-form messages to Control Room's shared Submission table
// instead of emailing Ostap directly per message — see ../../../control-room
// app/api/public/submissions/route.ts. Control Room's weekly digest cron
// emails Ostap once instead of per-submission. Failures here must never
// block the visitor's form submission.
export async function forwardSubmission(input: {
  type: "waitlist" | "contact";
  email: string;
  name?: string | null;
  message?: string | null;
  source?: string | null;
}): Promise<void> {
  const url = process.env.CONTROL_ROOM_URL;
  const secret = process.env.CONTROL_ROOM_SUBMISSIONS_SECRET;
  if (!url || !secret) return;

  // control-room has Vercel Deployment Protection on (it edits every
  // site's content) — the automation bypass secret gets this server-to-
  // server call past that wall. Harmless to omit against a local/unprotected
  // control-room.
  const bypassSecret = process.env.CONTROL_ROOM_BYPASS_SECRET;

  try {
    await fetch(`${url}/api/public/submissions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${secret}`,
        ...(bypassSecret ? { "x-vercel-protection-bypass": bypassSecret } : {}),
      },
      body: JSON.stringify({ siteSlug: "ostapkvl", ...input }),
    });
  } catch (err) {
    console.error("[submissions] forward to Control Room failed:", err);
  }
}
