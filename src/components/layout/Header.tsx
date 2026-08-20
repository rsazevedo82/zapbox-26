"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/Button";
import { SpecialistButton } from "@/components/ui/SpecialistButton";
import { useLeadForm } from "@/components/layout/LeadFormProvider";
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

export function Header() {
  const { openForm } = useLeadForm();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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

    document.addEventListener("keydown", onKeyDown);
    panelRef.current?.querySelector<HTMLElement>("a[href], button")?.focus();

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen, closeMenu]);

  return (
    <header
      className={cn(
        "bg-surface fixed inset-x-0 top-0 z-40 h-16 lg:h-20",
        "transition-shadow duration-200",
        scrolled ? "shadow-sm ring-1 ring-neutral-200/70 backdrop-blur" : "shadow-none"
      )}
    >
      <div className="container flex h-full items-center justify-between gap-6">
        <Link
          href="/"
          className="focus-visible:outline-accent-500 shrink-0 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4"
          aria-label="Zapbox — página inicial"
        >
          <Image
            src="/images/zapbox-logo.png"
            alt="Zapbox"
            width={480}
            height={160}
            priority
            className="h-8 w-auto lg:h-9"
          />
        </Link>

        {/* Navegação desktop */}
        <nav aria-label="Navegação principal" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={cn(
                    "hover:text-accent-700 text-base font-medium text-neutral-700 transition-colors",
                    "focus-visible:outline-accent-500 rounded focus-visible:outline-2 focus-visible:outline-offset-4"
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
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
                      href={item.href}
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
