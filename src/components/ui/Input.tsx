"use client";

import { useId, type ComponentPropsWithRef } from "react";

import { cn } from "@/lib/utils";

/**
 * Input com label e mensagem de erro.
 *
 * O id é gerado automaticamente quando não vem por prop, para ligar
 * label/input/erro sem o chamador precisar inventar identificadores.
 */

type InputProps = {
  label: string;
  name: string;
  error?: string;
  className?: string;
} & Omit<ComponentPropsWithRef<"input">, "name" | "className">;

export function Input({ label, name, error, className, id, required, ...rest }: InputProps) {
  const generatedId = useId();
  const inputId = id ?? `${name}-${generatedId}`;
  const errorId = `${inputId}-erro`;
  const hasError = Boolean(error);

  return (
    <div className={cn("flex flex-col", className)}>
      <label htmlFor={inputId} className="text-primary-950 text-sm font-medium">
        {label}
        {required && (
          <span className="text-error-600 ml-0.5" aria-hidden="true">
            *
          </span>
        )}
      </label>

      <input
        id={inputId}
        name={name}
        required={required}
        aria-invalid={hasError || undefined}
        aria-describedby={hasError ? errorId : undefined}
        className={cn(
          "mt-1.5 min-h-11 w-full rounded-lg border px-3 py-2.5 text-base",
          "placeholder:text-neutral-400",
          "transition-colors duration-150",
          "focus:ring-2 focus:outline-none",
          hasError
            ? "border-error-500 focus:border-error-500 focus:ring-error-500/30"
            : "focus:border-accent-600 focus:ring-accent-600/30 border-neutral-300",
          "disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:opacity-50"
        )}
        {...rest}
      />

      {hasError && (
        <p id={errorId} className="text-error-600 mt-1.5 text-sm">
          {error}
        </p>
      )}
    </div>
  );
}
