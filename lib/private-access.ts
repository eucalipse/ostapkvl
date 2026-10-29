/** Shared by middleware and the stats endpoint. Never expose the secret to a client. */
export async function hasPrivateAccess(authorization: string | null, secret: string | undefined) {
  if (!secret || secret.length < 24 || !authorization?.startsWith("Basic ")) return false;
  let supplied: string;
  try { supplied = atob(authorization.slice(6)); } catch { return false; }
  const hash = async (value: string) => new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value)));
  const [actual, expected] = await Promise.all([hash(supplied), hash(`ostap:${secret}`)]);
  let difference = 0;
  for (let i = 0; i < expected.length; i++) difference |= actual[i] ^ expected[i];
  return difference === 0;
}
