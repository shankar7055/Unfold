import { useEffect, useState, type ReactNode } from "react"

import { FileRouterBrand } from "@/components/file-router-brand"

export function AppNavbar({
  children,
  navigation,
}: {
  children: ReactNode
  navigation?: ReactNode
}) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-10 transition-all duration-200 ${
        scrolled
          ? "border-b border-white/[0.08] bg-[#0B0B0B]/70 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="relative mx-auto flex h-[72px] w-full max-w-[1280px] items-center gap-6 px-6 sm:px-8">
        <FileRouterBrand />
        {navigation ? (
          <div className="pointer-events-none absolute inset-x-48 hidden justify-center lg:flex">
            <div className="pointer-events-auto">{navigation}</div>
          </div>
        ) : null}
        <div className="ml-auto flex items-center gap-3 font-body text-sm sm:gap-4">
          {children}
        </div>
      </nav>
    </header>
  )
}
