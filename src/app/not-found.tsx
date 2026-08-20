import type { Metadata } from "next";
import Image from "next/image";

import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Página não encontrada",
};

export default function NotFound() {
  return (
    <div className="bg-surface flex min-h-[70dvh] items-center py-24">
      <div className="container">
        <div className="mx-auto flex max-w-[32rem] flex-col items-center text-center">
          <Image
            src="/images/zapbox-icon.png"
            alt=""
            width={256}
            height={256}
            className="h-14 w-14"
            aria-hidden="true"
          />

          <p className="text-accent-700 mt-6 text-sm font-semibold tracking-widest uppercase">
            Erro 404
          </p>

          <h1 className="text-primary-950 mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Página não encontrada
          </h1>

          <p className="mt-4 text-base text-neutral-600">
            A página que você procura não existe ou foi movida.
          </p>

          <div className="mt-8">
            <Button href="/" variant="primary" size="lg">
              Voltar para o início
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
