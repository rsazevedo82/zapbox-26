import { Features } from "@/components/sections/Features";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Pricing } from "@/components/sections/Pricing";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { ProductDemo } from "@/components/sections/ProductDemo";
import { TheChange } from "@/components/sections/TheChange";
import { ThreePillars } from "@/components/sections/ThreePillars";

/**
 * Narrativa da homepage em cinco atos:
 *   1. Problema        → ProblemSection
 *   2. Mudança/Solução → TheChange + ThreePillars + Features
 *   3. É fácil começar → HowItWorks
 *   4. Produto real    → ProductDemo
 *   5. Planos          → Pricing
 *
 * Ritmo de fundo (alternado, sem duas seções adjacentes iguais):
 *   escuro → branco → muted → branco → muted → branco → escuro → muted
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <TheChange />
      <ThreePillars />
      <HowItWorks />
      <Features />
      <ProductDemo />
      <Pricing />

      {/* Seção: Divisor / Soluções avançadas */}
      {/* Seção: FAQ */}
      {/* Seção: CTA final */}
    </>
  );
}
