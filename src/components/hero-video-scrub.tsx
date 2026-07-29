import { useState } from "react"
import { ArrowRight, Check, Copy } from "@phosphor-icons/react"
import { Link } from "@tanstack/react-router"
import { motion, type Variants } from "framer-motion"

import { CalBookingButton } from "@/components/cal-booking-button"
import { availableProviders } from "@/lib/provider-display"

const cliLoginCommand = "npx @unfold/cli@latest login"

type PartnerLogo = {
  label: string
  logo: string
  darkLogo?: string
}

const partnerLogos: ReadonlyArray<PartnerLogo> = [
  availableProviders[0],
  {
    darkLogo: "/providers/firecrawl-dark.svg",
    label: "Firecrawl",
    logo: "/providers/firecrawl.svg",
  },
  availableProviders[1],
  availableProviders[2],
]

export function HeroVideoScrub() {
  const [copied, setCopied] = useState(false)

  const copyCliCommand = () => {
    navigator.clipboard.writeText(cliLoginCommand)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.08,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <section className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden bg-transparent pt-20 pb-16">
      {/* Hero Content Wrapper */}
      <motion.div
        className="relative z-[2] mx-auto flex w-full max-w-[1200px] flex-col items-center px-5 text-center sm:px-8"
        initial="hidden"
        variants={containerVariants}
        animate="visible"
      >
        {/* HEADLINE */}
        <motion.h1
          className="max-w-[900px] font-heading text-[clamp(44px,6.5vw,84px)] leading-[1.04] font-extrabold tracking-[-0.025em] text-white"
          variants={itemVariants}
        >
          Better results for <br className="hidden sm:inline" />
          every document.
        </motion.h1>

        {/* SUBHEADLINE */}
        <motion.p
          className="mt-5 max-w-[620px] font-body text-[16px] leading-[1.6] text-[#A1A1AA] sm:text-[18px]"
          variants={itemVariants}
        >
          Optimize accuracy, reliability, latency, and cost across document
          providers through one durable API.
        </motion.p>

        {/* CTA BUTTONS ROW */}
        <motion.div
          className="mt-8 flex flex-row items-center justify-center gap-3.5"
          variants={itemVariants}
        >
          {/* Primary CTA */}
          <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
            <Link
              className="inline-flex items-center gap-2 rounded-md bg-[#F59E0B] px-6 py-2.5 font-body text-sm font-semibold text-black shadow-sm transition-colors hover:bg-[#D97706]"
              search={{ redirect: "/dashboard" }}
              to="/sign-in"
            >
              Start for free
              <ArrowRight className="size-4" weight="bold" />
            </Link>
          </motion.div>

          {/* Secondary CTA */}
          <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
            <CalBookingButton className="inline-flex items-center justify-center rounded-md border border-white/20 bg-transparent px-6 py-2.5 font-body text-sm font-medium text-white/90 transition-colors hover:border-white/40 hover:bg-white/[0.04]">
              Talk to the team
            </CalBookingButton>
          </motion.div>
        </motion.div>

        {/* COMMAND TERMINAL BOX */}
        <motion.div
          className="mt-7 w-full max-w-[460px]"
          variants={itemVariants}
        >
          <div className="flex items-center justify-between rounded-lg border border-l-2 border-white/10 border-l-[#F59E0B] bg-[#181818] px-4 py-2.5 shadow-sm transition-colors hover:border-white/20">
            <div className="flex items-center gap-3 font-mono text-sm text-[#E4E4E7]">
              <span>{cliLoginCommand}</span>
            </div>

            <button
              aria-label="Copy CLI command"
              className="inline-flex items-center gap-1.5 font-body text-xs text-[#A1A1AA] transition-colors hover:text-white"
              onClick={copyCliCommand}
              type="button"
            >
              {copied ? (
                <>
                  <Check className="size-4 text-[#F59E0B]" weight="bold" />
                  <span className="text-[#F59E0B]">Copied</span>
                </>
              ) : (
                <Copy className="size-4" weight="regular" />
              )}
            </button>
          </div>
        </motion.div>

        {/* WORKS WITH SECTION */}
        <motion.div
          className="mt-12 flex flex-col items-center"
          variants={itemVariants}
        >
          <span className="font-mono text-[11px] tracking-[0.2em] text-[#71717A] uppercase">
            WORKS WITH
          </span>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-8 sm:gap-10">
            {partnerLogos.map((provider) => (
              <div
                className="inline-flex items-center opacity-70 transition-opacity duration-200 hover:opacity-100"
                key={provider.label}
                style={{ filter: "brightness(0) invert(1)" }}
              >
                <img
                  alt={provider.label}
                  className="h-6 w-auto max-w-32 object-contain"
                  src={provider.darkLogo || provider.logo}
                />
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
