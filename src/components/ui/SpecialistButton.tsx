"use client";

import { useLeadForm } from "@/components/layout/LeadFormProvider";
import { Button, type ButtonSize, type ButtonVariant } from "@/components/ui/Button";
import { getWhatsAppUrl } from "@/lib/constants";

/**
 * CTA consultivo ("Falar com especialista", "Conhecer CRM & Vendas"...).
 *
 * Enquanto `SITE_CONFIG.whatsappNumber` estiver vazio, `getWhatsAppUrl()`
 * devolve "#" — um link morto que leva o visitante ao topo da página. Nesse
 * caso o botão abre o formulário de lead, que é o mesmo destino comercial.
 *
 * Assim que o número for preenchido, todos estes CTAs voltam a ser links
 * diretos de WhatsApp sem nenhuma alteração de código.
 *
 * Não recebe `planInterest`: são CTAs consultivos, não de contratação de plano.
 */

type SpecialistButtonProps = {
  children: React.ReactNode;
  sourceCta: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  /** Executado antes de abrir o formulário ou de seguir o link. */
  onClick?: () => void;
};

export function SpecialistButton({
  children,
  sourceCta,
  variant = "outline",
  size = "md",
  className,
  onClick,
}: SpecialistButtonProps) {
  const { openForm } = useLeadForm();
  const whatsappUrl = getWhatsAppUrl();

  if (whatsappUrl !== "#") {
    return (
      <Button
        href={whatsappUrl}
        variant={variant}
        size={size}
        className={className}
        onClick={onClick}
      >
        {children}
      </Button>
    );
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={() => {
        onClick?.();
        openForm({ sourceCta });
      }}
    >
      {children}
    </Button>
  );
}
