"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";

import { LeadFormModal } from "@/components/sections/LeadFormModal";
import type { PlanId } from "@/lib/constants";

/**
 * Estado global (client) do formulário de lead.
 *
 * O modal é montado UMA vez, aqui, e qualquer CTA do site o abre por
 * `openForm()`. Isso evita duplicar o formulário no DOM em cada seção e
 * mantém um único ponto de foco/acessibilidade.
 */

type LeadFormContextValue = {
  openForm: (options?: { planInterest?: PlanId; sourceCta?: string }) => void;
  closeForm: () => void;
};

const LeadFormContext = createContext<LeadFormContextValue | null>(null);

export function useLeadForm(): LeadFormContextValue {
  const context = useContext(LeadFormContext);
  if (!context) {
    throw new Error("useLeadForm precisa estar dentro de <LeadFormProvider>.");
  }
  return context;
}

export function LeadFormProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [planInterest, setPlanInterest] = useState<PlanId | undefined>();
  const [sourceCta, setSourceCta] = useState<string | undefined>();

  // Guarda quem abriu o modal para devolver o foco ao fechar.
  const triggerRef = useRef<HTMLElement | null>(null);

  const openForm = useCallback<LeadFormContextValue["openForm"]>((options) => {
    triggerRef.current = document.activeElement as HTMLElement | null;
    setPlanInterest(options?.planInterest);
    setSourceCta(options?.sourceCta);
    setIsOpen(true);
  }, []);

  const closeForm = useCallback(() => {
    setIsOpen(false);
    triggerRef.current?.focus();
    triggerRef.current = null;
  }, []);

  const value = useMemo(() => ({ openForm, closeForm }), [openForm, closeForm]);

  return (
    <LeadFormContext.Provider value={value}>
      {children}
      <LeadFormModal
        isOpen={isOpen}
        onClose={closeForm}
        planInterest={planInterest}
        sourceCta={sourceCta}
      />
    </LeadFormContext.Provider>
  );
}
