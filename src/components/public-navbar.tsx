import { Link } from "@tanstack/react-router"

import { AppNavbar } from "@/components/app-navbar"
import { CalBookingButton } from "@/components/cal-booking-button"
import { GITHUB_URL, GitHubIcon } from "@/components/community-links"
import { PublicNavLinks } from "@/components/public-nav-links"

export function PublicNavbar() {
  return (
    <AppNavbar navigation={<PublicNavLinks />}>
      <a
        className="hidden items-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-white sm:inline-flex"
        href={GITHUB_URL}
        rel="noreferrer"
        target="_blank"
      >
        <GitHubIcon className="size-4 text-white" />
        <span>GitHub</span>
      </a>

      {/* Glass button for "Get in touch" */}
      <CalBookingButton className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-transparent px-4 py-2 text-xs font-medium text-white transition-colors duration-150 hover:border-white/30 hover:bg-white/[0.04] sm:text-sm">
        Get in touch
      </CalBookingButton>

      {/* Primary Dashboard button */}
      <Link
        className="inline-flex items-center justify-center rounded-lg bg-[#F59E0B] px-4 py-2 text-xs font-semibold text-black shadow-sm transition-colors duration-150 hover:bg-[#D97706] sm:text-sm"
        to="/dashboard"
      >
        Dashboard
      </Link>
    </AppNavbar>
  )
}
