import { Features } from "@/components/sections/Features";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ProblemSection } from "@/components/sections/ProblemSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <HowItWorks />
      <Features />

      {/* Seção: Produto em ação */}
      {/* Seção: Planos */}
      {/* Seção: FAQ */}
      {/* Seção: CTA final */}
    </>
  );
}
