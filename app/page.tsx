"use client"
import Hero from "@/components/hero"
import Features from "@/components/features"
import UseCases from "@/components/use-cases"
import WhoUses from "@/components/who-uses"
import FAQ from "@/components/faq"
import CTA from "@/components/cta"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Hero />
      <UseCases />
      <WhoUses />
      <FAQ />
      <CTA />
    </div>
  )
}
