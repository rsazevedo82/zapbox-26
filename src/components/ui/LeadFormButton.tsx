"use client";

import { Button, type ButtonSize, type ButtonVariant } from "@/components/ui/Button";
import { useLeadForm } from "@/components/layout/LeadFormProvider";
import type { PlanId } from "@/lib/constants";

/**
 * Botão que abre o formulário de lead.
 *
 * Existe para que seções server (Hero, Pricing) mantenham o CTA sem precisar
 * virar client components inteiras — só esta ilha é interativa.
 */

type LeadFormButtonProps = {
  children: React.ReactNode;
  sourceCta: string;
  planInterest?: PlanId;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

export function LeadFormButton({
  children,
  sourceCta,
  planInterest,
  variant = "primary",
  size = "md",
  className,
}: LeadFormButtonProps) {
  const { openForm } = useLeadForm();

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={() => openForm({ planInterest, sourceCta })}
    >
      {children}
    </Button>
  );
}
