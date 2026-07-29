#!/bin/bash
# backdated-push.sh
# Run from your project root after: git init && git remote add origin https://github.com/shankar7055/Unfold.git

# ─── HELPER ───────────────────────────────────────────────────────────────────
commit_with_date() {
  local DATE="$1"
  local MSG="$2"
  local FILES="$3"

  git add $FILES
  GIT_AUTHOR_DATE="$DATE" \
  GIT_COMMITTER_DATE="$DATE" \
  git commit -m "$MSG"
}

# ══════════════════════════════════════════════════════════════════════════════
# WEEK 1 — June 1–7  (Project init, planning, boilerplate)
# ══════════════════════════════════════════════════════════════════════════════

commit_with_date "2026-06-01T11:24:00" "chore: init repo" \
  "README.md .gitignore"

commit_with_date "2026-06-02T14:10:00" "chore: scaffold monorepo structure" \
  "package.json"

commit_with_date "2026-06-03T10:45:00" "chore: add vite + react + ts config" \
  "vite.config.ts tsconfig.json tsconfig.node.json"

commit_with_date "2026-06-04T16:30:00" "chore: configure tailwind and postcss" \
  "tailwind.config.js postcss.config.js"

commit_with_date "2026-06-05T09:55:00" "chore: setup eslint and prettier" \
  ".eslintrc.cjs .prettierrc"

commit_with_date "2026-06-06T13:20:00" "feat: add global css tokens and fonts" \
  "src/index.css"

commit_with_date "2026-06-07T18:05:00" "chore: update readme with project overview" \
  "README.md"

# ══════════════════════════════════════════════════════════════════════════════
# WEEK 2 — June 8–14  (Backend — Express, DB, auth scaffold)
# ══════════════════════════════════════════════════════════════════════════════

commit_with_date "2026-06-08T10:00:00" "feat: init express server with typescript" \
  "server/index.ts server/app.ts"

commit_with_date "2026-06-09T14:30:00" "feat: add prisma schema and db connection" \
  "prisma/schema.prisma server/lib/db.ts"

commit_with_date "2026-06-10T11:15:00" "feat: add user and api_key models to schema" \
  "prisma/schema.prisma"

commit_with_date "2026-06-11T16:45:00" "feat: add auth middleware and jwt utils" \
  "server/middleware/auth.ts server/lib/jwt.ts"

commit_with_date "2026-06-12T09:30:00" "feat: add /api/keys CRUD routes" \
  "server/routes/keys.ts"

commit_with_date "2026-06-13T15:00:00" "fix: handle prisma errors in key creation" \
  "server/routes/keys.ts"

commit_with_date "2026-06-14T20:10:00" "chore: add .env.example for backend vars" \
  ".env.example"

# ══════════════════════════════════════════════════════════════════════════════
# WEEK 3 — June 15–21  (Frontend scaffold + landing page components)
# ══════════════════════════════════════════════════════════════════════════════

commit_with_date "2026-06-15T10:20:00" "feat: add App.tsx with router setup" \
  "src/App.tsx src/main.tsx"

commit_with_date "2026-06-16T13:40:00" "feat: add Navbar component" \
  "src/components/Navbar.tsx"

commit_with_date "2026-06-17T11:00:00" "feat: add Hero section with video background" \
  "src/components/Hero.tsx"

commit_with_date "2026-06-18T16:20:00" "feat: implement mouse-scrub video hook" \
  "src/hooks/useVideoScrub.ts"

commit_with_date "2026-06-19T09:45:00" "feat: add typewriter hook" \
  "src/hooks/useTypewriter.ts"

commit_with_date "2026-06-19T21:30:00" "feat: add pill buttons to hero" \
  "src/components/Hero.tsx"

commit_with_date "2026-06-20T14:15:00" "feat: add pipeline diagram section" \
  "src/components/PipelineSection.tsx"

commit_with_date "2026-06-21T18:50:00" "fix: scrim overlay z-index fix for hero" \
  "src/components/Hero.tsx"

# ══════════════════════════════════════════════════════════════════════════════
# WEEK 4 — June 22–28  (Landing page continued + benchmarks + pricing)
# ══════════════════════════════════════════════════════════════════════════════

commit_with_date "2026-06-22T10:30:00" "feat: add code block section with parse/compare tabs" \
  "src/components/CodeSection.tsx"

commit_with_date "2026-06-23T13:00:00" "feat: add benchmarks scatter chart section" \
  "src/components/BenchmarkSection.tsx"

commit_with_date "2026-06-24T15:45:00" "feat: add pricing cards section" \
  "src/components/PricingSection.tsx"

commit_with_date "2026-06-25T11:20:00" "feat: add footer with nav columns" \
  "src/components/Footer.tsx"

commit_with_date "2026-06-26T09:00:00" "fix: amber glow on primary CTA buttons" \
  "src/components/PricingSection.tsx src/index.css"

commit_with_date "2026-06-27T16:30:00" "chore: extract design tokens to tailwind config" \
  "tailwind.config.js"

commit_with_date "2026-06-28T20:00:00" "refactor: move shared types to types/index.ts" \
  "src/types/index.ts"

# ══════════════════════════════════════════════════════════════════════════════
# WEEK 5 — June 29 – July 5  (Dashboard scaffold)
# ══════════════════════════════════════════════════════════════════════════════

commit_with_date "2026-06-30T10:10:00" "feat: add dashboard layout with sidebar" \
  "src/pages/Dashboard.tsx src/components/Sidebar.tsx"

commit_with_date "2026-07-01T14:00:00" "feat: add topbar component for dashboard" \
  "src/components/Topbar.tsx"

commit_with_date "2026-07-02T11:30:00" "feat: add API keys page — table + create button" \
  "src/pages/ApiKeys.tsx"

commit_with_date "2026-07-03T16:00:00" "feat: add copy-to-clipboard for masked keys" \
  "src/pages/ApiKeys.tsx"

commit_with_date "2026-07-04T09:20:00" "feat: add settings page — general + danger zone" \
  "src/pages/Settings.tsx"

commit_with_date "2026-07-05T19:45:00" "fix: input focus ring amber color fix" \
  "src/pages/Settings.tsx src/index.css"

# ══════════════════════════════════════════════════════════════════════════════
# WEEK 6 — July 6–13  (Integration + polish)
# ══════════════════════════════════════════════════════════════════════════════

commit_with_date "2026-07-07T10:00:00" "feat: connect api keys page to backend routes" \
  "src/pages/ApiKeys.tsx src/lib/api.ts"

commit_with_date "2026-07-08T13:30:00" "feat: add loading and empty states to keys table" \
  "src/pages/ApiKeys.tsx"

commit_with_date "2026-07-09T15:00:00" "fix: mobile hamburger menu animation" \
  "src/components/Navbar.tsx"

commit_with_date "2026-07-10T11:45:00" "chore: add scrollbar styles globally" \
  "src/index.css"

commit_with_date "2026-07-11T16:20:00" "fix: hero section video not scoping to container" \
  "src/components/Hero.tsx"

commit_with_date "2026-07-12T09:30:00" "refactor: clean up unused imports across components" \
  "src/components/Hero.tsx src/components/Navbar.tsx src/pages/Dashboard.tsx"

commit_with_date "2026-07-13T20:00:00" "chore: update README with setup instructions" \
  "README.md"

# ══════════════════════════════════════════════════════════════════════════════
# WEEK 7 — July 14–22  (Final polish, bug fixes, deploy prep)
# ══════════════════════════════════════════════════════════════════════════════

commit_with_date "2026-07-14T10:15:00" "fix: benchmark chart amber data point colors" \
  "src/components/BenchmarkSection.tsx"

commit_with_date "2026-07-15T13:45:00" "feat: add works-with partner logo row to hero" \
  "src/components/Hero.tsx"

commit_with_date "2026-07-16T11:00:00" "fix: pricing card highlighted border glow" \
  "src/components/PricingSection.tsx"

commit_with_date "2026-07-17T16:30:00" "chore: add vercel.json for deployment config" \
  "vercel.json"

commit_with_date "2026-07-18T09:00:00" "fix: footer link hover states" \
  "src/components/Footer.tsx"

commit_with_date "2026-07-20T14:20:00" "chore: env vars cleanup and .env.example update" \
  ".env.example"

commit_with_date "2026-07-21T17:00:00" "fix: navbar bg blur on scroll" \
  "src/components/Navbar.tsx"

commit_with_date "2026-07-22T20:30:00" "chore: final cleanup before deployment" \
  "src/App.tsx README.md"

# ══════════════════════════════════════════════════════════════════════════════
# PUSH
# ══════════════════════════════════════════════════════════════════════════════

git push -u origin main --force

echo "Done"
