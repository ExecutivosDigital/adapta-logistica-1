"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Building2 } from "lucide-react";
import { useEffect } from "react";
import { DataType } from "../page";

interface ResultCentersListProps {
  data: DataType;
  setData: (value: DataType) => void;
  paymentType: string;
}
export function ResultCentersList({
  data,
  setData,
  paymentType,
}: ResultCentersListProps) {
  const distributeValueEvenly = () => {
    if (data.resultCenters.length === 0) return;

    const lockedCenters = data.resultCenters.filter((center) => center.locked);
    const unlockedCenters = data.resultCenters.filter(
      (center) => !center.locked,
    );

    const lockedTotal = lockedCenters.reduce(
      (sum, center) => sum + (Number(center.value) || 0),
      0,
    );

    // ✅ If FULL, every unlocked center gets the full data.value
    // ✅ If DIVIDED, we split remaining value evenly
    const totalValue =
      paymentType === "FULL" ? data.value : data.value * data.installmentCount;

    const remainingValue = totalValue - lockedTotal;

    if (unlockedCenters.length > 0 && remainingValue >= 0) {
      const remainingCents = Math.round(remainingValue * 100);

      const baseValueCents =
        paymentType === "FULL"
          ? remainingCents // ✅ FULL → full value per center
          : Math.floor(remainingCents / unlockedCenters.length);

      const remainder =
        paymentType === "FULL" ? 0 : remainingCents % unlockedCenters.length;

      const updatedResultCenters = data.resultCenters.map((center, index) => {
        if (center.locked) {
          return center;
        }

        const unlockedIndex = unlockedCenters.findIndex(
          (uc) => data.resultCenters.findIndex((dc) => dc === uc) === index,
        );

        const extraCent =
          paymentType === "FULL" ? 0 : unlockedIndex < remainder ? 1 : 0;

        const finalValueCents =
          paymentType === "FULL" ? baseValueCents : baseValueCents + extraCent;

        const finalValue = finalValueCents / 100;

        return {
          ...center,
          value: parseFloat(finalValue.toFixed(2)),
        };
      });

      setData({ ...data, resultCenters: updatedResultCenters });
    }
  };

  const handleResultCenterValueChange = (
    index: number,
    newValue: string,
  ): void => {
    const updatedResultCenters = [...data.resultCenters];

    updatedResultCenters[index] = {
      ...updatedResultCenters[index],
      value: parseFloat(newValue) || 0,
    };

    const unlockedCenters = updatedResultCenters.filter(
      (center, i) => i !== index && !center.locked,
    );

    const lockedTotal = updatedResultCenters.reduce((sum, center, i) => {
      if (center.locked || i === index) {
        return sum + (Number(center.value) || 0);
      }
      return sum;
    }, 0);

    const remainingValue = data.value - lockedTotal;

    if (unlockedCenters.length > 0 && remainingValue >= 0) {
      const remainingCents = Math.round(remainingValue * 100);
      const baseValueCents = Math.floor(
        remainingCents / unlockedCenters.length,
      );
      const remainder = remainingCents % unlockedCenters.length;

      let distributedCount = 0;
      updatedResultCenters.forEach((center, i) => {
        if (i !== index && !center.locked) {
          const extraCent = distributedCount < remainder ? 1 : 0;
          const finalValueCents = baseValueCents + extraCent;
          const finalValue = finalValueCents / 100;

          updatedResultCenters[i] = {
            ...center,
            value: parseFloat(finalValue.toFixed(2)),
          };
          distributedCount++;
        }
      });
    }

    setData({ ...data, resultCenters: updatedResultCenters });
  };

  const toggleResultCenterLock = (index: number): void => {
    const updatedResultCenters = [...data.resultCenters];
    updatedResultCenters[index] = {
      ...updatedResultCenters[index],
      locked: !updatedResultCenters[index].locked,
    };

    setData({ ...data, resultCenters: updatedResultCenters });
  };

  const calculateRemainingValue = () => {
    const totalAssigned = data.resultCenters.reduce((sum, center) => {
      return sum + (Number(center.value) || 0);
    }, 0);

    // ✅ FULL → total should be data.value * number of centers
    const expectedTotal =
      paymentType === "FULL"
        ? data.value * data.resultCenters.length
        : data.value * data.installmentCount;

    const totalCents = Math.round(expectedTotal * 100);
    const assignedCents = Math.round(totalAssigned * 100);
    const remainingCents = totalCents - assignedCents;

    return remainingCents / 100;
  };

  useEffect(() => {
    if (data.resultCenters.length === 1) {
      const totalValue =
        paymentType === "FULL"
          ? data.value
          : data.value * data.installmentCount;

      const updatedResultCenters = [
        {
          ...data.resultCenters[0],
          value: parseFloat(totalValue.toFixed(2)),
        },
      ];

      setData({ ...data, resultCenters: updatedResultCenters });
    }
  }, [
    data.value,
    data.installmentCount,
    paymentType,
    data.resultCenters.length,
  ]);

  return (
    <>
      <div className="my-4 h-px w-full bg-zinc-200" />
      <div className="flex items-center justify-between">
        <span className="text-zinc-600">Centro de Custos</span>
        <div className="flex items-center gap-4">
          {data.resultCenters.some((center) => center.locked) && (
            <span className="text-primary text-xs">
              {data.resultCenters.filter((center) => center.locked).length}{" "}
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
          {paymentType === "FULL"
            ? data.value.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })
            : Number(data.value * data.installmentCount).toLocaleString(
                "pt-BR",
                {
                  minimumFractionDigits: 2,
                },
              )}
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
        <div className="grid w-full grid-cols-2 gap-2 xl:gap-4">
          {data.resultCenters.map((item, index) => (
            <div
              key={index}
              className={`col-span-1 flex w-full flex-col items-center justify-center gap-2 rounded-2xl border px-2 py-1 xl:px-3 xl:py-2 ${
                item.locked
                  ? "border-primary bg-primary/20 text-primary"
                  : "border-zinc-200"
              }`}
            >
              <div className="flex flex-1 gap-2">
                <Building2 size={16} className="text-primary mt-2" />
                <span className="my-auto w-full text-sm">{item.name}</span>
                {item.locked && (
                  <span className="text-primary my-auto text-xs font-medium">
                    (Bloqueado)
                  </span>
                )}
              </div>
              <div className="flex w-full items-center gap-2">
                <button
                  onClick={() => toggleResultCenterLock(index)}
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
                    handleResultCenterValueChange(index, e.target.value)
                  }
                  disabled={item.locked}
                  className={`w-full rounded border px-2 py-1 text-right focus:outline-none ${
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
