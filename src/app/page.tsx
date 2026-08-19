import { AdditionalModules } from "@/components/sections/AdditionalModules";
import { AdvancedSolutions } from "@/components/sections/AdvancedSolutions";
import { EvolutionJourney } from "@/components/sections/EvolutionJourney";
import { FAQ } from "@/components/sections/FAQ";
import { Features } from "@/components/sections/Features";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { NarrativeDivider } from "@/components/sections/NarrativeDivider";
import { Pricing } from "@/components/sections/Pricing";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { ProductDemo } from "@/components/sections/ProductDemo";
import { TheChange } from "@/components/sections/TheChange";
import { ThreePillars } from "@/components/sections/ThreePillars";

/**
 * Homepage.
 *
 * Primeira metade (produto): do problema até os planos.
 * Divisor narrativo.
 * Segunda metade (consultiva): soluções avançadas, jornada e módulos.
 *
 * Ritmo de fundo alternado — nenhuma seção adjacente repete:
 *   escuro, branco, muted, branco, muted, branco, escuro, muted,
 *   escuro, branco, muted, branco, muted, escuro
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

      <NarrativeDivider />
      <AdvancedSolutions />
      <EvolutionJourney />
      <AdditionalModules />

      {/* Seção: Prova Social — aguardando dados reais (logos, cases, depoimentos) */}
      {/* Seção: Para Quem É — copy documentada, mas o próprio documento registra
          que a lista de segmentos é mercado-alvo, não base de clientes confirmada */}

      <FAQ />
      <FinalCTA />
    </>
  );
}
