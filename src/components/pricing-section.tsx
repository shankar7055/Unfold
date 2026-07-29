import { Check } from "@phosphor-icons/react"
import { Link } from "@tanstack/react-router"

import { CalBookingButton } from "@/components/cal-booking-button"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const pricingPlans = [
  {
    cta: "Read the docs",
    description: "Call providers from your own runtime with your own keys.",
    emphasized: false,
    features: [
      "No Unfold credits",
      "Pay providers directly",
      "Typed SDK and CLI",
      "Parse and compare locally",
    ],
    id: "direct",
    name: "Direct (BYOK)",
    price: "$0",
  },
  {
    cta: "Start for free",
    description: "Send documents through Unfold for hosted processing.",
    emphasized: true,
    features: [
      "Unfold API key",
      "5,000 free credits each month",
      "Durable jobs and retries",
      "Uploads and cleanup included",
    ],
    id: "hosted",
    name: "Hosted",
    price: "Pay as you go",
  },
  {
    cta: "Talk to us",
    description: "Custom deployment, support, and controls for your team.",
    emphasized: false,
    features: [
      "Custom usage and volume",
      "Priority implementation support",
      "Security and compliance review",
      "Custom deployment options",
    ],
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
  },
] as const

export function PricingSection() {
  return (
    <section aria-labelledby="pricing-heading" id="pricing">
      <div className="mx-auto w-full max-w-6xl px-5 py-16 md:py-20">
        <h2
          className="max-w-3xl text-3xl font-medium md:text-4xl"
          id="pricing-heading"
        >
          Simple, flexible pricing
        </h2>
        <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
          Use your provider keys for free, or use Unfold credits for hosted
          processing.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {pricingPlans.map((plan) => (
            <article
              className={cn(
                "flex flex-col border border-[#1F1F1F] bg-[#141414] p-6 transition-all",
                plan.emphasized &&
                  "border-[#F59E0B] shadow-[0_0_40px_rgba(245,158,11,0.15)]"
              )}
              key={plan.id}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-medium text-white">
                    {plan.name}
                  </h3>
                  <p className="mt-2 max-w-sm text-sm leading-6 text-[#A1A1AA]">
                    {plan.description}
                  </p>
                </div>
                <p className="shrink-0 text-right text-lg font-medium text-white">
                  {plan.price}
                </p>
              </div>

              <ul className="mt-6 grid gap-3 text-sm text-[#A1A1AA]">
                {plan.features.map((feature) => (
                  <li className="flex items-center gap-2" key={feature}>
                    <Check
                      aria-hidden="true"
                      className="size-4 shrink-0 text-[#F59E0B]"
                      weight="bold"
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8">
                {plan.id === "enterprise" ? (
                  <CalBookingButton className="h-10 w-full text-sm">
                    {plan.cta}
                  </CalBookingButton>
                ) : (
                  <Button
                    asChild
                    className="h-10 w-full text-sm font-normal"
                    variant={plan.emphasized ? "default" : "outline"}
                  >
                    {plan.id === "hosted" ? (
                      <Link search={{ redirect: "/dashboard" }} to="/sign-in">
                        {plan.cta}
                      </Link>
                    ) : (
                      <a href="https://unfold-0a6049eb.mintlify.app">
                        {plan.cta}
                      </a>
                    )}
                  </Button>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
