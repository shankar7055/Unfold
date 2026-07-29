import { createFileRoute } from "@tanstack/react-router"

import { BenchmarkSection } from "@/components/benchmark-section"
import { LatestBlogSection } from "@/components/blog/latest-blog-section"
import { HeroVideoScrub } from "@/components/hero-video-scrub"
import { PricingSection } from "@/components/pricing-section"
import { PublicPageShell } from "@/components/public-page-shell"
import { RoutingCanvas } from "@/components/routing-canvas"
import { SdkExample } from "@/components/sdk-example"
import { buildSocialImageMeta } from "@/lib/seo"

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Unfold: Durable document parsing API" },
      {
        name: "description",
        content:
          "Hosted parsers and commercial engines behind one durable API. Compare engines for accuracy, cost, latency, and reliability.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Unfold" },
      { property: "og:locale", content: "en_US" },
      {
        property: "og:title",
        content: "Unfold: Durable document parsing API",
      },
      {
        property: "og:description",
        content:
          "Hosted parsers and commercial engines behind one durable API. Compare engines for accuracy, cost, latency, and reliability.",
      },
      {
        property: "og:url",
        content: "https://unfold.shankarpratap220.workers.dev/",
      },
      ...buildSocialImageMeta(),
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Unfold: Durable document parsing API",
      },
      {
        name: "twitter:description",
        content:
          "Hosted parsers and commercial engines behind one durable API. Compare engines for accuracy, cost, latency, and reliability.",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://unfold.shankarpratap220.workers.dev/",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(homeStructuredData),
      },
    ],
  }),
  component: App,
})

function App() {
  return (
    <PublicPageShell>
      {/* HERO SECTION WITH VIDEO MOUSE SCRUB */}
      <HeroVideoScrub />

      {/* SECTION 1: PROVIDERS / PIPELINE */}
      <section
        className="relative z-[1] bg-[#1F1F1F] text-white"
        id="providers"
      >
        <div className="mx-auto w-full max-w-6xl px-5 py-16 md:py-20">
          <span className="font-mono text-xs tracking-widest text-[#F59E0B] uppercase">
            PIPELINE ARCHITECTURE
          </span>
          <h2 className="mt-2 max-w-3xl font-heading text-3xl font-medium text-white md:text-4xl">
            Building blocks for the pipeline you want.
          </h2>
          <p className="mt-4 max-w-2xl font-body leading-7 text-white/75">
            Focused engines for cheap paths, hard docs, and durable jobs.
          </p>

          <RoutingCanvas />
        </div>
      </section>

      {/* SECTION 2: SDK / SAME INTERFACE */}
      <section
        className="relative z-[1] border-y border-white/10 bg-[#242424] text-white"
        id="sdk"
      >
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <span className="font-mono text-xs tracking-widest text-[#F59E0B] uppercase">
              UNIFIED SDK
            </span>
            <h2 className="mt-2 font-heading text-3xl font-medium text-white md:text-4xl">
              Same interface for every engine.
            </h2>
            <p className="mt-4 max-w-lg font-body leading-7 text-white/75">
              Point at <span className="font-mono text-white">liteparse</span>{" "}
              or <span className="font-mono text-white">pdf-inspector</span> for
              simple pages, a heavier engine when you need it. Same typed
              result.
            </p>
          </div>

          <SdkExample />
        </div>
      </section>

      {/* SECTION 3: BENCHMARKS */}
      <div className="relative z-[1] bg-[#1F1F1F]">
        <BenchmarkSection />
      </div>

      {/* SECTION 4: PRICING */}
      <div className="relative z-[1] bg-[#242424]">
        <PricingSection />
      </div>

      {/* SECTION 5: BLOG */}
      <div className="relative z-[1] bg-[#1F1F1F]">
        <LatestBlogSection />
      </div>

      {/* SECTION 6: BOTTOM CTA */}
      <section className="relative z-[1] border-t border-white/10 bg-[#242424] py-16 text-center sm:py-24">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-6">
          <h2 className="mx-auto max-w-3xl font-heading text-4xl font-medium tracking-tight text-balance text-white sm:text-6xl">
            Assemble the pipeline. We run the jobs.
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-base leading-7 text-white/75 sm:text-lg">
            Pick the engines that fit each document. Unfold handles durable
            execution, retries, results, and cleanup.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              className="inline-flex h-12 items-center justify-center rounded-md bg-[#F59E0B] px-6 font-body text-base font-semibold text-black shadow-sm transition-colors hover:bg-[#D97706]"
              href="/sign-in"
            >
              Start for free
            </a>
            <a
              className="inline-flex h-12 items-center justify-center rounded-md border border-white/20 bg-transparent px-6 font-body text-base font-medium text-white transition-colors hover:bg-white/[0.04]"
              href="https://unfold-0a6049eb.mintlify.app"
            >
              Read the docs
            </a>
          </div>
        </div>
      </section>
    </PublicPageShell>
  )
}

const homeStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@id": "https://unfold.shankarpratap220.workers.dev/#organization",
      "@type": "Organization",
      name: "Unfold",
      legalName: "Unfold Inc.",
      url: "https://unfold.shankarpratap220.workers.dev/",
      logo: {
        "@type": "ImageObject",
        contentUrl: "https://unfold.shankarpratap220.workers.dev/icon-512.png",
        width: 512,
        height: 512,
      },
      sameAs: ["https://github.com/shankar7055/Unfold.git"],
    },
    {
      "@id": "https://unfold.shankarpratap220.workers.dev/#website",
      "@type": "WebSite",
      name: "Unfold",
      url: "https://unfold.shankarpratap220.workers.dev/",
      description:
        "Hosted parsers and commercial engines behind one durable API. Compare engines for accuracy, cost, latency, and reliability.",
      publisher: {
        "@id": "https://unfold.shankarpratap220.workers.dev/#organization",
      },
    },
    {
      "@id": "https://unfold.shankarpratap220.workers.dev/#sdk",
      "@type": "SoftwareSourceCode",
      name: "@unfold/sdk",
      description:
        "A TypeScript SDK for parsing and comparing documents across engines through Unfold or directly with provider keys.",
      codeRepository: "https://github.com/shankar7055/Unfold.git",
      license: "https://opensource.org/license/mit",
      programmingLanguage: "TypeScript",
      runtimePlatform: "Node.js 22.14 or newer",
      url: "https://unfold.shankarpratap220.workers.dev/",
    },
  ],
} as const
