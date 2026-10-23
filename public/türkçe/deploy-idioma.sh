#!/usr/bin/env bash
# Deploys the türkçe module to the standalone Idioma instance (idioma-six.vercel.app).
#
# The module is written for ostapkvl.com, where every asset lives under /turkce/…
# (see rewrites in next.config.mjs). The standalone instance serves the same files
# from the domain root, so this script builds a throwaway copy with relative paths,
# adds the two route rewrites, and deploys it to the Vercel project "idioma".
#
# Usage: ./deploy-idioma.sh   (from public/türkçe; needs vercel CLI auth)
set -euo pipefail

SRC="$(cd "$(dirname "$0")" && pwd)"
OUT="$(mktemp -d /tmp/idioma-deploy.XXXXXX)"
trap 'rm -rf "$OUT"' EXIT

cp -R "$SRC/." "$OUT/"
rm -f "$OUT/deploy-idioma.sh"

# /turkce/foo.js → foo.js in both HTML entry points
sed -i '' 's|src="/turkce/|src="|g; s|href="/turkce/|href="|g; s|window.IDIOMA_BASE=./turkce/.|window.IDIOMA_BASE=""|g' "$OUT/index.html" "$OUT/page.html"

cat > "$OUT/vercel.json" <<'JSON'
{
  "rewrites": [
    { "source": "/lessons", "destination": "/page.html?cat=lessons" },
    { "source": "/teacher", "destination": "/page.html?cat=lessons&view=teacher" }
  ]
}
JSON

cd "$OUT"
npx vercel link --yes --project idioma --scope eucalipses-projects > /dev/null
npx vercel deploy --prod --yes --scope eucalipses-projects

echo "Deployed. Check https://idioma-six.vercel.app/"
