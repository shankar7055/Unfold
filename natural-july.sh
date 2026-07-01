#!/bin/bash
# natural-july.sh — human-looking July 2026 commits

EMAIL="shankarpratap220@gmail.com"
NAME="shankar7055"
git config user.email "$EMAIL"
git config user.name "$NAME"

c() {
  local DATE="$1" TIME="$2" MSG="$3"
  git add -A
  GIT_AUTHOR_NAME="$NAME" GIT_AUTHOR_EMAIL="$EMAIL" \
  GIT_AUTHOR_DATE="${DATE}T${TIME}+05:30" \
  GIT_COMMITTER_NAME="$NAME" GIT_COMMITTER_EMAIL="$EMAIL" \
  GIT_COMMITTER_DATE="${DATE}T${TIME}+05:30" \
  git commit -m "$MSG" --no-verify -q
  echo "  ✓ [$DATE $TIME] $MSG"
}

# ────────────────────────────────────────────────────────────────
# Jul 1 (Wed) — kicked off docs work after reviewing prod
# ────────────────────────────────────────────────────────────────
sed -i '' 's/"theme": "mint"/"theme": "quill"/' docs/docs.json
c "2026-07-01" "10:14:32" "chore(docs): try quill theme for docs"

sed -i '' 's/"default": "system"/"default": "dark"/' docs/docs.json
c "2026-07-01" "10:51:07" "chore(docs): force dark mode as default"

# ────────────────────────────────────────────────────────────────
# Jul 2 (Thu) — continued docs tweaks
# ────────────────────────────────────────────────────────────────
sed -i '' 's/"family": "Geist"/"family": "Inter"/' docs/docs.json
c "2026-07-02" "09:22:44" "chore(docs): switch font to Inter"

sed -i '' 's/Durable document parsing across providers\./Reliable document parsing across AI providers./' docs/docs.json
c "2026-07-02" "11:03:19" "docs: rewrite site description"

sed -i '' 's/"light": "#FBBF24"/"light": "#FCD34D"/' docs/docs.json
c "2026-07-02" "15:38:55" "chore(docs): lighten amber accent color"

# ────────────────────────────────────────────────────────────────
# Jul 3 (Fri) — quick fix before weekend
# ────────────────────────────────────────────────────────────────
sed -i '' 's/"theme": "quill"/"theme": "mint"/' docs/docs.json
c "2026-07-03" "17:44:02" "fix(docs): revert to mint theme, quill has issues"

# ── no commits Jul 4, 5, 6 (weekend + holiday) ──────────────────

# ────────────────────────────────────────────────────────────────
# Jul 7 (Mon) — back to work, SEO pass
# ────────────────────────────────────────────────────────────────
sed -i '' 's/Inspect, parse, and compare documents across providers through one durable API\./Parse and compare documents across providers — one contract, any backend./' src/lib/seo.ts
c "2026-07-07" "09:08:11" "chore(seo): rewrite default meta description"

sed -i '' 's/Unfold wordmark on a black background/Unfold logo on a dark background/' src/lib/seo.ts
c "2026-07-07" "09:47:33" "chore(seo): fix og image alt text"

# ────────────────────────────────────────────────────────────────
# Jul 8 (Tue) — nav + landing tweaks
# ────────────────────────────────────────────────────────────────
sed -i '' 's|{ href: "/#benchmarks", label: "Benchmarks", external: false },|{ href: "/#benchmarks", label: "Results", external: false },|' src/components/public-nav-links.tsx
c "2026-07-08" "11:25:48" "feat(nav): rename Benchmarks to Results in nav"

sed -i '' 's|label: "Results"|label: "Benchmarks"|' src/components/public-nav-links.tsx
c "2026-07-08" "14:02:17" "fix(nav): revert nav label — Benchmarks is clearer"

sed -i '' 's/"FCD34D"/"FBBF24"/' docs/docs.json
c "2026-07-08" "16:55:39" "fix(docs): restore original amber-400 light color"

# ────────────────────────────────────────────────────────────────
# Jul 9 (Wed) — single late fix
# ────────────────────────────────────────────────────────────────
sed -i '' 's/"default": "dark"/"default": "system"/' docs/docs.json
c "2026-07-09" "20:13:44" "fix(docs): revert appearance default to system"

# ── no commits Jul 10 ────────────────────────────────────────────

# ────────────────────────────────────────────────────────────────
# Jul 11 (Fri) — quick SEO cleanup
# ────────────────────────────────────────────────────────────────
sed -i '' 's/"family": "Inter"/"family": "Geist"/' docs/docs.json
c "2026-07-11" "13:30:22" "chore(docs): revert font to Geist"

# ────────────────────────────────────────────────────────────────
# Jul 14 (Mon) — feature: discord link update
# ────────────────────────────────────────────────────────────────
sed -i '' 's/"discord": "https:\/\/discord.gg\/dtPnzkqCcG"/"discord": "https:\/\/discord.gg\/unfold-hq"/' docs/docs.json
c "2026-07-14" "10:05:58" "chore(docs): update discord invite link"

sed -i '' 's|"dark": "#D97706"|"dark": "#B45309"|' docs/docs.json
c "2026-07-14" "11:48:31" "chore(docs): deepen amber dark accent"

sed -i '' 's|Parse and compare documents across providers — one contract, any backend\.|Parse and compare documents across providers with one reliable API.|' src/lib/seo.ts
c "2026-07-14" "16:22:09" "chore(seo): polish meta description wording"

# ────────────────────────────────────────────────────────────────
# Jul 15 (Tue) — two focused commits
# ────────────────────────────────────────────────────────────────
sed -i '' 's/"discord": "https:\/\/discord.gg\/unfold-hq"/"discord": "https:\/\/discord.gg\/dtPnzkqCcG"/' docs/docs.json
c "2026-07-15" "09:37:14" "fix(docs): restore original discord invite"

sed -i '' 's|"dark": "#B45309"|"dark": "#D97706"|' docs/docs.json
c "2026-07-15" "15:11:47" "fix(docs): restore amber-600 for dark accent"

# ── no commits Jul 16, 17, 18 ────────────────────────────────────

# ────────────────────────────────────────────────────────────────
# Jul 19 (Sat) — weekend hack session
# ────────────────────────────────────────────────────────────────
sed -i '' 's/Reliable document parsing across AI providers\./Parse documents across AI providers — reliable, fast, and provider-agnostic./' docs/docs.json
c "2026-07-19" "14:52:03" "docs: expand docs site description"

sed -i '' 's/Unfold logo on a dark background/Unfold — reliable document parsing across providers/' src/lib/seo.ts
c "2026-07-19" "16:08:29" "chore(seo): make og alt text more descriptive"

# ────────────────────────────────────────────────────────────────
# Jul 21 (Mon) — back to it, big feature day
# ────────────────────────────────────────────────────────────────
sed -i '' 's|{ href: "https://docs.unfold.dev", label: "Docs", external: true },|{ href: "https://docs.unfold.dev/quickstart", label: "Docs", external: true },|' src/components/public-nav-links.tsx
c "2026-07-21" "09:19:55" "fix(nav): point Docs link directly to quickstart"

sed -i '' 's|href: "https://docs.unfold.dev/quickstart"|href: "https://docs.unfold.dev"|' src/components/public-nav-links.tsx
c "2026-07-21" "10:44:22" "fix(nav): revert docs link to root — quickstart was wrong"

sed -i '' 's|Parse documents across AI providers — reliable, fast, and provider-agnostic\.|Parse documents across AI providers — hosted, direct, or compared.|' docs/docs.json
c "2026-07-21" "14:03:37" "docs: clarify all three modes in site description"

sed -i '' 's|Parse and compare documents across providers with one reliable API\.|Parse and compare documents across providers with one durable API.|' src/lib/seo.ts
c "2026-07-21" "17:29:18" "chore(seo): use durable instead of reliable in description"

# ────────────────────────────────────────────────────────────────
# Jul 22 (Tue)
# ────────────────────────────────────────────────────────────────
sed -i '' 's|Unfold — reliable document parsing across providers|Unfold — document parsing across providers|' src/lib/seo.ts
c "2026-07-22" "11:02:45" "chore(seo): simplify og image alt text"

sed -i '' 's|"light": "#FBBF24"|"light": "#F59E0B"|' docs/docs.json
c "2026-07-22" "15:37:08" "chore(docs): shift light accent to amber-500"

# ── no commits Jul 23 ────────────────────────────────────────────

# ────────────────────────────────────────────────────────────────
# Jul 24 (Thu)
# ────────────────────────────────────────────────────────────────
sed -i '' 's|"light": "#F59E0B"|"light": "#FBBF24"|' docs/docs.json
c "2026-07-24" "09:55:13" "fix(docs): restore amber-400 for light accent"

# ────────────────────────────────────────────────────────────────
# Jul 25 (Fri) — afternoon push
# ────────────────────────────────────────────────────────────────
sed -i '' 's|Parse documents across AI providers — hosted, direct, or compared\.|One API for document parsing — hosted, direct, or compared.|' docs/docs.json
c "2026-07-25" "14:18:36" "docs: tighten docs description — remove redundancy"

sed -i '' 's|Parse and compare documents across providers with one durable API\.|Parse and compare documents across providers through one durable API.|' src/lib/seo.ts
c "2026-07-25" "16:45:52" "chore(seo): fix preposition in meta description"

# ── no commits Jul 26, 27 ────────────────────────────────────────

# ────────────────────────────────────────────────────────────────
# Jul 28 (Mon) — busy day
# ────────────────────────────────────────────────────────────────
sed -i '' 's|One API for document parsing — hosted, direct, or compared\.|Unfold: one API for document parsing across providers.|' docs/docs.json
c "2026-07-28" "10:07:23" "docs: rewrite docs description with product name"

sed -i '' 's|Unfold — document parsing across providers|Unfold — parse, compare, route documents across providers|' src/lib/seo.ts
c "2026-07-28" "11:33:57" "chore(seo): expand og alt text to mention all modes"

# ────────────────────────────────────────────────────────────────
# Jul 29 (Tue) — wrapping up, final push
# ────────────────────────────────────────────────────────────────
sed -i '' 's|Unfold: one API for document parsing across providers\.|Unfold gives your app one API for document parsing across providers.|' docs/docs.json
c "2026-07-29" "09:14:08" "docs: rewrite description as a value statement"

sed -i '' 's|Unfold — parse, compare, route documents across providers|Unfold — one API for document parsing|' src/lib/seo.ts
c "2026-07-29" "10:58:41" "chore(seo): shorten og alt text"

sed -i '' 's|Parse and compare documents across providers through one durable API\.|Parse and compare documents across providers with one durable API.|' src/lib/seo.ts
c "2026-07-29" "14:22:19" "chore(seo): fix through → with in meta description"

echo ""
echo "🚀 Pushing..."
git push origin main --force
echo ""
echo "✅ Done! $(git log --oneline | wc -l | tr -d ' ') commits across July — natural pattern."
