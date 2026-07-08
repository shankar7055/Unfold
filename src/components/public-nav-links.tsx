import { Link } from "@tanstack/react-router"

const links = [
  { href: "https://docs.unfold.dev", label: "Docs", external: true },
  { href: "/#benchmarks", label: "Benchmarks", external: false },
  { href: "/#pricing", label: "Pricing", external: false },
  { href: "/blog", label: "Blog", isRouter: true },
]

export function PublicNavLinks() {
  return (
    <div className="flex items-center gap-7 font-body">
      {links.map((link) => {
        if (link.isRouter) {
          return (
            <Link
              className="group relative text-[15px] font-medium text-[#A1A1AA] transition-colors duration-150 hover:text-white"
              key={link.label}
              to={link.href}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 rounded-full bg-[#F59E0B] transition-all duration-200 ease-out group-hover:w-full" />
            </Link>
          )
        }

        return (
          <a
            className="group relative text-[15px] font-medium text-[#A1A1AA] transition-colors duration-150 hover:text-white"
            href={link.href}
            key={link.label}
            {...(link.external ? { rel: "noreferrer", target: "_blank" } : {})}
          >
            {link.label}
            <span className="absolute -bottom-1 left-0 h-[2px] w-0 rounded-full bg-[#F59E0B] transition-all duration-200 ease-out group-hover:w-full" />
          </a>
        )
      })}
    </div>
  )
}
