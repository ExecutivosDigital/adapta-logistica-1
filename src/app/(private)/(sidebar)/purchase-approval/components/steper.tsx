"use client";
import { cn } from "@/utils/cn";
import { Check } from "lucide-react";
import React from "react";

interface Step {
  /** Rótulo exibido abaixo do círculo */
  label: string;
  /** Identificador único */
  value: string;
}

interface StepperProps {
  /** Lista de etapas */
  steps: Step[];
  /** Índice da última etapa concluída (base-0) */
  current: number;
  /** Callback ao clicar em uma etapa */
  onStepClick?: (index: number, step: Step) => void;
  /** Classe extra */
  className?: string;
}

/**
 * Stepper animado usando **apenas TailwindCSS** (sem Framer Motion).
 * A animação da linha é feita via transição da largura (`width`) de 0 → 100 %.
 * Necessário `overflow-hidden` no container da linha para esconder a parte que cresce.
 */
const Stepper: React.FC<StepperProps> = ({
  steps,
  current,
  onStepClick,
  className = "",
}) => {
  return (
    <div className={`flex w-full items-center ${className}`}>
      {steps.map((step, idx) => {
        const isCompleted = idx <= current;
        const segmentCompleted = idx < current;

        return (
          <React.Fragment key={step.value}>
            {/* Círculo com label abaixo */}
            <div className="relative flex flex-col items-center">
              <button
                type="button"
                onClick={() => onStepClick?.(idx, step)}
                disabled={onStepClick == null}
                className={`focus:ring-primary-dark/40 h-6 w-6 rounded-full border transition-colors duration-300 focus:ring-2 focus:outline-none disabled:cursor-default ${
                  isCompleted
                    ? "border-primary bg-primary flex items-center justify-center text-white"
                    : "hover:border-primary-dark border-gray-300 bg-white"
                }`}
              >
                {isCompleted && <Check size={16} />}
              </button>
              <span
                className={cn(
                  "absolute top-6 mt-2 text-center text-xs whitespace-nowrap select-none",
                  isCompleted ? "text-gray-800" : "text-gray-400",
                  idx === 0 ? "left-0" : idx === steps.length - 1 && "right-0",
                )}
              >
                {step.label}
              </span>
            </div>

            {/* Linha entre círculos */}
            {idx !== steps.length - 1 && (
              <div className="h-1 flex-1 overflow-hidden">
                <div className="relative top-1/2 h-full w-full -translate-y-1/2">
                  <div className="absolute inset-0 rounded-full bg-gray-200" />
                  <div
                    className="bg-primary absolute inset-0 rounded-full transition-[width] duration-500"
                    style={{ width: segmentCompleted ? "100%" : "0%" }}
                  />
                </div>
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Stepper;
