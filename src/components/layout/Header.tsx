"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/Button";
import { SpecialistButton } from "@/components/ui/SpecialistButton";
import { useLeadForm } from "@/components/layout/LeadFormProvider";
import { useActiveSection } from "@/components/layout/useActiveSection";
import { cn } from "@/lib/utils";

/**
 * Header fixo do site.
 *
 * É client component porque o fundo reage ao scroll e o menu mobile precisa de
 * estado, foco e bloqueio de scroll. Os links são âncoras reais (`<a href="#">`),
 * então a navegação funciona mesmo sem JS.
 *
 * NÃO existe botão "Entrar": o site não tem login nem contratação self-service.
 */

type NavItem = { label: string; href: string };

const NAV_ITEMS: NavItem[] = [
  { label: "Soluções", href: "#solucoes" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Planos", href: "#planos" },
  { label: "FAQ", href: "#faq" },
];

/** Páginas de solução, exibidas como submenu de "Soluções". */
const SOLUTION_PAGES = [
  { label: "Sales AI", href: "/sales-ai", description: "Atendimento com IA" },
  { label: "CRM & Vendas", href: "/crm-vendas", description: "Pipeline e oportunidades" },
  { label: "Automações", href: "/automacoes", description: "Menos tarefa manual" },
  { label: "Integrações", href: "/integracoes", description: "Sistemas conectados" },
];

/** Ids observados para marcar o link da seção em leitura. */
const NAV_IDS = NAV_ITEMS.map((item) => item.href.slice(1));

export function Header() {
  const { openForm } = useLeadForm();
  const pathname = usePathname();
  const naHome = pathname === "/";
  const activeSection = useActiveSection(naHome ? NAV_IDS : []);

  // Fora da home as âncoras precisam voltar para a página inicial primeiro.
  const anchorHref = (href: string) => (naHome ? href : `/${href}`);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // O submenu "Soluções" é aberto via CSS (group-hover/group-focus-within), mas
  // um clique em um link precisa fechá-lo de imediato mesmo com o mouse ainda
  // sobre a área — daí este estado que sobrepõe o CSS até o próximo hover/foco.
  const [submenuForceClosed, setSubmenuForceClosed] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Fundo do header muda ao sair do topo. rAF evita trabalho a cada evento.
  useEffect(() => {
    let frame = 0;

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 8);
        frame = 0;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  /*
    Qualquer troca de rota fecha o menu. Os links do painel já chamam
    closeMenu no clique, mas o logo do header continua clicável com o menu
    aberto — sem isto o painel sobrevive à navegação e o body fica preso em
    overflow:hidden, deixando a página seguinte sem rolagem.
  */
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Enquanto o menu está aberto: trava o scroll, Escape fecha e Tab fica preso no painel.
  useEffect(() => {
    if (!menuOpen) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
        toggleRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])"
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    // O painel é lg:hidden: ao alargar para desktop ele some da tela, mas o
    // bloqueio de scroll continuaria aplicado se o estado não fosse limpo.
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onBreakpoint = (event: MediaQueryListEvent) => {
      if (event.matches) closeMenu();
    };

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);
    panelRef.current?.querySelector<HTMLElement>("a[href], button")?.focus();

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [menuOpen, closeMenu]);

  return (
    <header
      className={cn(
        "bg-surface fixed inset-x-0 top-0 z-40 h-16 lg:h-20",
        "transition-shadow duration-200",
        scrolled
          ? "bg-surface/85 shadow-[0_1px_24px_-8px_rgb(0_33_54/0.25)] backdrop-blur-xl"
          : "shadow-none"
      )}
    >
      {/* Filete accent que acende quando a página sai do topo. */}
      <div
        aria-hidden="true"
        className={cn(
          "rule-gradient ease-fluid absolute inset-x-0 bottom-0 transition-opacity duration-300",
          scrolled ? "opacity-100" : "opacity-0"
        )}
      />
      <div className="container flex h-full items-center justify-between gap-6">
        <Link
          href="/"
          className="focus-visible:outline-accent-500 shrink-0 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4"
          aria-label="Zapbox — página inicial"
        >
          <Image
            src="/images/zapbox-logo-light.png"
            alt="Zapbox"
            width={600}
            height={200}
            priority
            className="h-8 w-auto lg:h-9"
          />
        </Link>

        {/* Navegação desktop */}
        <nav aria-label="Navegação principal" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              const temSubmenu = item.href === "#solucoes";

              return (
                <li
                  key={item.href}
                  className={cn(temSubmenu && "group relative")}
                  {...(temSubmenu && {
                    onMouseEnter: () => setSubmenuForceClosed(false),
                    onFocus: () => setSubmenuForceClosed(false),
                  })}
                >
                  <a
                    href={anchorHref(item.href)}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "hover:text-accent-700 ease-fluid relative text-base font-medium transition-colors duration-200",
                      // py-1.5 leva o alvo de clique de 20px para 32px (WCAG 2.5.8 AA).
                      "inline-block py-1.5",
                      isActive ? "text-accent-700" : "text-neutral-700",
                      // Sublinhado que cresce a partir do centro na seção em leitura.
                      "after:bg-accent-600 after:ease-fluid after:absolute after:inset-x-0 after:-bottom-0.5",
                      "after:mx-auto after:h-0.5 after:rounded-full after:transition-all after:duration-300",
                      isActive ? "after:w-full" : "after:w-0",
                      "focus-visible:outline-accent-500 rounded focus-visible:outline-2 focus-visible:outline-offset-4"
                    )}
                  >
                    {item.label}
                  </a>

                  {/*
                    Submenu CSS-only: abre no hover e também no foco por
                    teclado (group-focus-within), sem depender de JS.
                  */}
                  {temSubmenu && (
                    <div
                      className={cn(
                        "invisible absolute top-full left-1/2 z-10 w-60 -translate-x-1/2 pt-3 opacity-0",
                        "ease-fluid transition-[opacity,visibility] duration-200",
                        !submenuForceClosed && "group-hover:visible group-hover:opacity-100",
                        !submenuForceClosed && "group-focus-within:visible group-focus-within:opacity-100"
                      )}
                      // Sobrepõe o group-hover via CSS inline: um clique precisa
                      // fechar o menu de imediato, mesmo com o mouse ainda em cima.
                      style={submenuForceClosed ? { visibility: "hidden", opacity: 0 } : undefined}
                    >
                      <ul className="card-surface flex flex-col gap-1 rounded-xl p-2 shadow-lg">
                        {SOLUTION_PAGES.map((page) => (
                          <li key={page.href}>
                            <Link
                              href={page.href}
                              onClick={(event) => {
                                setSubmenuForceClosed(true);
                                event.currentTarget.blur();
                              }}
                              className={cn(
                                "hover:bg-accent-50 ease-fluid block rounded-lg px-3 py-2 transition-colors duration-150",
                                "focus-visible:outline-accent-500 focus-visible:outline-2 focus-visible:outline-offset-2"
                              )}
                            >
                              <span className="text-primary-950 block text-sm font-semibold">
                                {page.label}
                              </span>
                              <span className="block text-xs text-neutral-600">
                                {page.description}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* CTAs desktop */}
        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          <SpecialistButton sourceCta="header-specialist" variant="ghost" size="sm">
            Falar com especialista
          </SpecialistButton>
          <Button
            variant="primary"
            size="sm"
            onClick={() => openForm({ sourceCta: "header-desktop" })}
          >
            Começar agora
          </Button>
        </div>

        {/* Hamburger mobile */}
        <button
          ref={toggleRef}
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="menu-mobile"
          aria-label="Menu de navegação"
          className={cn(
            "text-primary-900 -mr-2 flex h-11 w-11 items-center justify-center rounded-lg lg:hidden",
            "hover:bg-primary-50 transition-colors",
            "focus-visible:outline-accent-500 focus-visible:outline-2 focus-visible:outline-offset-2"
          )}
        >
          <MenuIcon open={menuOpen} />
        </button>
      </div>

      {/* Overlay + painel do menu mobile */}
      {menuOpen && (
        <div className="lg:hidden">
          <div
            className="bg-primary-950/40 fixed inset-0 top-16"
            onClick={closeMenu}
            aria-hidden="true"
          />
          <div
            ref={panelRef}
            id="menu-mobile"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
            className={cn(
              "fixed inset-x-0 top-16 z-10 max-h-[calc(100dvh-4rem)] overflow-y-auto",
              "border-primary-800 bg-primary-950 border-t px-4 pt-2 pb-8",
              "motion-safe:animate-consent-in"
            )}
          >
            <nav aria-label="Navegação principal">
              <ul className="flex flex-col">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <a
                      href={anchorHref(item.href)}
                      onClick={closeMenu}
                      className={cn(
                        "flex min-h-[3rem] items-center border-b border-white/10 text-lg font-medium text-white",
                        "hover:text-accent-300 transition-colors",
                        "focus-visible:outline-accent-400 focus-visible:outline-2 focus-visible:outline-offset-2"
                      )}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}

                {/* Páginas de solução, indentadas sob a navegação principal. */}
                {SOLUTION_PAGES.map((page) => (
                  <li key={page.href}>
                    <Link
                      href={page.href}
                      onClick={closeMenu}
                      className={cn(
                        "flex min-h-[3rem] items-center gap-3 border-b border-white/10 pl-4 text-base",
                        "text-primary-200 hover:text-accent-300 transition-colors",
                        "focus-visible:outline-accent-400 focus-visible:outline-2 focus-visible:outline-offset-2"
                      )}
                    >
                      <span aria-hidden="true" className="bg-accent-400/60 h-px w-4" />
                      {page.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-6 flex flex-col gap-3">
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  closeMenu();
                  openForm({ sourceCta: "header-mobile" });
                }}
              >
                Começar agora
              </Button>
              <SpecialistButton
                sourceCta="header-mobile-specialist"
                variant="secondary"
                size="md"
                onClick={closeMenu}
              >
                Falar com especialista
              </SpecialistButton>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

/** Ícone hamburger que vira X quando o menu abre. */
function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      {open ? (
        <>
          <line x1="5" y1="5" x2="19" y2="19" />
          <line x1="19" y1="5" x2="5" y2="19" />
        </>
      ) : (
        <>
          <line x1="3" y1="7" x2="21" y2="7" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="17" x2="21" y2="17" />
        </>
      )}
    </svg>
  );
}
