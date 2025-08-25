"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Building2 } from "lucide-react";
import { DataType } from "../page";

interface CostCentersListProps {
  data: DataType;
  setData: (value: DataType) => void;
}
export function CostCentersList({ data, setData }: CostCentersListProps) {
  const distributeValueEvenly = () => {
    if (data.costCenters.length === 0) return;

    const lockedCenters = data.costCenters.filter((center) => center.locked);
    const unlockedCenters = data.costCenters.filter((center) => !center.locked);

    const lockedTotal = lockedCenters.reduce(
      (sum, center) => sum + (parseFloat(center.value) || 0),
      0,
    );

    const remainingValue = data.totalValue - lockedTotal;

    if (unlockedCenters.length > 0 && remainingValue >= 0) {
      const remainingCents = Math.round(remainingValue * 100);
      const baseValueCents = Math.floor(
        remainingCents / unlockedCenters.length,
      );
      const remainder = remainingCents % unlockedCenters.length;

      const updatedCostCenters = data.costCenters.map((center, index) => {
        if (center.locked) {
          return center;
        }

        const unlockedIndex = unlockedCenters.findIndex(
          (uc) => data.costCenters.findIndex((dc) => dc === uc) === index,
        );

        const extraCent = unlockedIndex < remainder ? 1 : 0;
        const finalValueCents = baseValueCents + extraCent;
        const finalValue = (finalValueCents / 100).toFixed(2);

        return {
          ...center,
          value: finalValue,
        };
      });

      setData({ ...data, costCenters: updatedCostCenters });
    }
  };

  const handleCostCenterValueChange = (
    index: number,
    newValue: string,
  ): void => {
    const updatedCostCenters = [...data.costCenters];

    updatedCostCenters[index] = {
      ...updatedCostCenters[index],
      value: newValue,
    };

    const unlockedCenters = updatedCostCenters.filter(
      (center, i) => i !== index && !center.locked,
    );

    const lockedTotal = updatedCostCenters.reduce((sum, center, i) => {
      if (center.locked || i === index) {
        return sum + (parseFloat(center.value) || 0);
      }
      return sum;
    }, 0);

    const remainingValue = data.totalValue - lockedTotal;

    if (unlockedCenters.length > 0 && remainingValue >= 0) {
      const remainingCents = Math.round(remainingValue * 100);
      const baseValueCents = Math.floor(
        remainingCents / unlockedCenters.length,
      );
      const remainder = remainingCents % unlockedCenters.length;

      let distributedCount = 0;
      updatedCostCenters.forEach((center, i) => {
        if (i !== index && !center.locked) {
          const extraCent = distributedCount < remainder ? 1 : 0;
          const finalValueCents = baseValueCents + extraCent;
          const finalValue = (finalValueCents / 100).toFixed(2);

          updatedCostCenters[i] = {
            ...center,
            value: finalValue,
          };
          distributedCount++;
        }
      });
    }

    setData({ ...data, costCenters: updatedCostCenters });
  };

  const toggleCostCenterLock = (index: number): void => {
    const updatedCostCenters = [...data.costCenters];
    updatedCostCenters[index] = {
      ...updatedCostCenters[index],
      locked: !updatedCostCenters[index].locked,
    };

    setData({ ...data, costCenters: updatedCostCenters });
  };

  const calculateRemainingValue = () => {
    const totalAssigned = data.costCenters.reduce((sum, center) => {
      return sum + (parseFloat(center.value) || 0);
    }, 0);
    return data.totalValue - totalAssigned;
  };

  return (
    <>
      <div className="my-4 h-px w-full bg-zinc-200" />
      <div className="flex items-center justify-between">
        <span className="text-zinc-600">Centro de Custos</span>
        <div className="flex items-center gap-4">
          {data.costCenters.some((center) => center.locked) && (
            <span className="text-primary text-xs">
              {data.costCenters.filter((center) => center.locked).length}{" "}
              bloqueado(s)
            </span>
          )}
          <button
            onClick={distributeValueEvenly}
            className="text-primary hover:text-primary text-sm"
          >
            Distribuir igualmente
          </button>
        </div>
      </div>

      <div className="mb-2 flex justify-between text-sm text-zinc-500">
        <span>
          Total: R${" "}
          {data.totalValue.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
          })}
        </span>
        <span
          className={`${calculateRemainingValue() !== 0 ? "text-red-500" : "text-green-500"}`}
        >
          Restante: R${" "}
          {calculateRemainingValue().toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
          })}
        </span>
      </div>

      <ScrollArea className="h-40 w-full">
        <div className="grid w-full grid-cols-2 gap-4">
          {data.costCenters.map((item, index) => (
            <div
              key={index}
              className={`flex h-16 items-center justify-between gap-2 rounded-2xl border px-3 py-2 ${
                item.locked
                  ? "border-primary bg-primary/20 text-primary"
                  : "border-zinc-200"
              }`}
            >
              <div className="flex h-full flex-1 gap-2">
                <Building2 size={16} className="text-primary mt-2" />
                <span className="my-auto text-sm">{item.name}</span>
                {item.locked && (
                  <span className="text-primary my-auto text-xs font-medium">
                    (Bloqueado)
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleCostCenterLock(index)}
                  className={`rounded p-1 transition-colors ${
                    item.locked
                      ? "text-primary hover:text-primary"
                      : "text-zinc-400 hover:text-zinc-600"
                  }`}
                  title={item.locked ? "Desbloquear" : "Bloquear"}
                >
                  {item.locked ? (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M6 10h2V8c0-2.21 1.79-4 4-4s4 1.79 4 4v2h2c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2v-8c0-1.1.9-2 2-2zm6-6c-1.1 0-2 .9-2 2v2h4V6c0-1.1-.9-2-2-2z" />
                    </svg>
                  ) : (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M18 10h-1.26A2 2 0 0 0 15 9H9c-.53 0-1.04.21-1.41.59-.38.37-.59.88-.59 1.41v8c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2zM10 6c0-1.1.9-2 2-2s2 .9 2 2v3h2V6c0-2.21-1.79-4-4-4S8 3.79 8 6v3h2V6z" />
                    </svg>
                  )}
                </button>

                <span className="text-sm text-zinc-500">R$</span>
                <input
                  type="number"
                  value={item.value}
                  onChange={(e) =>
                    handleCostCenterValueChange(index, e.target.value)
                  }
                  disabled={item.locked}
                  className={`w-40 rounded border px-2 py-1 text-right focus:outline-none ${
                    item.locked
                      ? "border-primary bg-primary/20 text-primary cursor-not-allowed font-semibold"
                      : "focus:border-primary border-zinc-300"
                  }`}
                  placeholder="0,00"
                  step="0.01"
                  min="0"
                />
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {calculateRemainingValue() !== 0 && (
        <div className="mt-2 rounded border border-yellow-200 bg-yellow-50 p-2 text-sm text-yellow-700">
          ⚠️ A soma dos valores dos centros de custo não corresponde ao valor
          total.
        </div>
      )}
    </>
  );
}
