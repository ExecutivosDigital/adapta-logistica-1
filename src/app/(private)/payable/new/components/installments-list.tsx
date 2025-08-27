"use client";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/utils/cn";
import { CalendarIcon, ChevronDown } from "lucide-react";
import moment from "moment";
import { DataType } from "../page";

interface TransactionsListProps {
  data: DataType;
  setData: (value: DataType) => void;
}

export function TransactionsList({ data, setData }: TransactionsListProps) {
  const paymentType = [
    "PIX",
    "Boleto",
    "Cartão de Crédito",
    "Depósito",
    "Transferência Bancária",
    "Dinheiro em Mãos",
    "Fatura",
  ];

  const getTransactions = () => {
    const numTransactions = data.installmentCount || 1;

    if (!data.transactions || data.transactions.length !== numTransactions) {
      const totalCents = Math.round(data.value * 100);
      const baseValueCents = Math.floor(totalCents / numTransactions);
      const remainder = totalCents % numTransactions;

      const newTransactions = Array.from(
        { length: numTransactions },
        (_, index) => {
          const extraCent = index < remainder ? 1 : 0;
          const finalValueCents = baseValueCents + extraCent;
          const finalValue = finalValueCents / 100;

          return {
            dueDate: moment()
              .add(index * 30, "days")
              .format("YYYY-MM-DD"),
            position: index + 1,
            status: "PENDING" as const,
            value: parseFloat(finalValue.toFixed(2)),
            paymentType: "",
            locked: false,
          };
        },
      );

      setData({ ...data, transactions: newTransactions });
      return newTransactions;
    }

    return data.transactions.map((t) => ({ ...t, locked: t.locked || false }));
  };

  const transactions = getTransactions();

  const distributeValueEvenly = () => {
    if (transactions.length === 0) return;

    const lockedTransactions = transactions.filter(
      (transaction) => transaction.locked,
    );
    const unlockedTransactions = transactions.filter(
      (transaction) => !transaction.locked,
    );

    const lockedTotal = lockedTransactions.reduce(
      (sum, transaction) => sum + (transaction.value || 0),
      0,
    );

    const remainingValue = data.value - lockedTotal;

    if (unlockedTransactions.length > 0 && remainingValue >= 0) {
      const remainingCents = Math.round(remainingValue * 100);
      const baseValueCents = Math.floor(
        remainingCents / unlockedTransactions.length,
      );
      const remainder = remainingCents % unlockedTransactions.length;

      const updatedTransactions = transactions.map((transaction, index) => {
        if (transaction.locked) {
          return transaction;
        }

        const unlockedIndex = unlockedTransactions.findIndex(
          (ut) => transactions.findIndex((dt) => dt === ut) === index,
        );

        const extraCent = unlockedIndex < remainder ? 1 : 0;
        const finalValueCents = baseValueCents + extraCent;
        const finalValue = finalValueCents / 100;

        return {
          ...transaction,
          value: parseFloat(finalValue.toFixed(2)),
        };
      });

      setData({ ...data, transactions: updatedTransactions });
    }
  };

  const handleTransactionValueChange = (
    index: number,
    newValue: string,
  ): void => {
    const updatedTransactions = [...transactions];

    updatedTransactions[index] = {
      ...updatedTransactions[index],
      value: parseFloat(newValue) || 0,
    };

    const unlockedTransactions = updatedTransactions.filter(
      (transaction, i) => i !== index && !transaction.locked,
    );

    const lockedTotal = updatedTransactions.reduce((sum, transaction, i) => {
      if (transaction.locked || i === index) {
        return sum + (transaction.value || 0);
      }
      return sum;
    }, 0);

    const remainingValue = data.value - lockedTotal;

    if (unlockedTransactions.length > 0 && remainingValue >= 0) {
      const remainingCents = Math.round(remainingValue * 100);
      const baseValueCents = Math.floor(
        remainingCents / unlockedTransactions.length,
      );
      const remainder = remainingCents % unlockedTransactions.length;

      let distributedCount = 0;
      updatedTransactions.forEach((transaction, i) => {
        if (i !== index && !transaction.locked) {
          const extraCent = distributedCount < remainder ? 1 : 0;
          const finalValueCents = baseValueCents + extraCent;
          const finalValue = finalValueCents / 100;

          updatedTransactions[i] = {
            ...transaction,
            value: parseFloat(finalValue.toFixed(2)),
          };
          distributedCount++;
        }
      });
    }

    setData({ ...data, transactions: updatedTransactions });
  };

  const toggleTransactionLock = (index: number): void => {
    const updatedTransactions = [...transactions];
    updatedTransactions[index] = {
      ...updatedTransactions[index],
      locked: !updatedTransactions[index].locked,
    };

    setData({ ...data, transactions: updatedTransactions });
  };

  const handleTransactionPaymentTypeChange = (
    index: number,
    paymentType: string,
  ): void => {
    const updatedTransactions = [...transactions];
    updatedTransactions[index] = {
      ...updatedTransactions[index],
      paymentType,
    };

    setData({ ...data, transactions: updatedTransactions });
  };

  const handleTransactionDueDateChange = (
    index: number,
    date: Date | undefined,
  ): void => {
    const updatedTransactions = [...transactions];
    updatedTransactions[index] = {
      ...updatedTransactions[index],
      dueDate: date ? moment(date).format("YYYY-MM-DD") : "",
    };

    setData({ ...data, transactions: updatedTransactions });
  };

  const calculateRemainingValue = () => {
    const totalAssigned = transactions.reduce((sum, transaction) => {
      return sum + (transaction.value || 0);
    }, 0);

    const totalCents = Math.round(data.value * 100);
    const assignedCents = Math.round(totalAssigned * 100);
    const remainingCents = totalCents - assignedCents;

    return remainingCents / 100;
  };

  if (transactions.length === 0) {
    return null;
  }

  return (
    <>
      <div className="my-4 h-px w-full bg-zinc-200" />
      <div className="flex items-center justify-between">
        <span className="text-zinc-600">Transações</span>
        <div className="flex items-center gap-4">
          {transactions.some((transaction) => transaction.locked) && (
            <span className="text-primary text-xs">
              {transactions.filter((transaction) => transaction.locked).length}{" "}
              bloqueada(s)
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
          {data.value.toLocaleString("pt-BR", {
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
        <div className="flex w-full flex-col gap-2 xl:gap-4">
          {transactions.map((transaction, index) => (
            <div
              key={index}
              className={`flex w-full items-end justify-center gap-2 rounded-2xl border px-2 py-1 xl:px-3 xl:py-2 ${
                transaction.locked
                  ? "border-primary bg-primary/20 text-primary"
                  : "border-zinc-200"
              }`}
            >
              <div className="flex w-full flex-col">
                <div className="flex flex-1 gap-2">
                  <CalendarIcon size={16} className="text-primary mt-2" />
                  <span className="my-auto w-full text-sm">
                    {transaction.position} / {data.installmentCount}
                  </span>
                </div>
                <div className="flex w-full items-center gap-2">
                  <button
                    onClick={() => toggleTransactionLock(index)}
                    className={`rounded p-1 transition-colors ${
                      transaction.locked
                        ? "text-primary hover:text-primary"
                        : "text-zinc-400 hover:text-zinc-600"
                    }`}
                    title={transaction.locked ? "Desbloquear" : "Bloquear"}
                  >
                    {transaction.locked ? (
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
                    value={transaction.value}
                    onChange={(e) =>
                      handleTransactionValueChange(index, e.target.value)
                    }
                    disabled={transaction.locked}
                    className={cn(
                      "relative flex w-full items-center justify-between gap-2 rounded-md border px-2 py-1 text-sm transition focus:outline-none",

                      transaction.locked
                        ? "border-primary bg-primary/20 text-primary cursor-not-allowed font-semibold"
                        : "focus:border-primary border-zinc-300",
                    )}
                    placeholder="0,00"
                    step="0.01"
                    min="0"
                  />
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild disabled={transaction.locked}>
                  <button
                    type="button"
                    className={cn(
                      "relative flex w-full items-center justify-between gap-2 rounded-md border px-2 py-1 text-sm transition",
                      transaction.paymentType !== ""
                        ? "border-primary text-zinc-700"
                        : "border-zinc-200 text-zinc-500",
                      transaction.locked
                        ? "border-primary bg-primary/20 text-primary cursor-not-allowed font-semibold"
                        : "focus:border-primary border-zinc-300",
                    )}
                  >
                    {transaction.paymentType || "Tipo"}
                    <ChevronDown size={16} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="bottom"
                  sideOffset={0}
                  className="z-[999] w-[var(--radix-dropdown-menu-trigger-width)] border-zinc-200"
                >
                  {paymentType.map((item) => (
                    <DropdownMenuItem
                      key={item}
                      onSelect={(e) => {
                        e.preventDefault();
                        handleTransactionPaymentTypeChange(index, item);
                      }}
                      className="hover:bg-primary/20 cursor-pointer transition duration-300"
                    >
                      <div className="flex w-full flex-row items-center justify-between gap-2 border-b border-b-zinc-400 p-1 py-2">
                        {item}
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild disabled={transaction.locked}>
                  <div
                    className={cn(
                      "relative flex w-full items-center justify-between gap-2 rounded-md border px-2 py-1 text-sm transition",
                      transaction.dueDate !== ""
                        ? "border-primary text-zinc-700"
                        : "border-zinc-200 text-zinc-500",
                      transaction.locked
                        ? "border-primary bg-primary/20 text-primary cursor-not-allowed font-semibold"
                        : "focus:border-primary border-zinc-300",
                    )}
                  >
                    <span>
                      {moment(transaction.dueDate).format("DD/MM/YYYY")}
                    </span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <Calendar
                    mode="single"
                    selected={moment(transaction.dueDate).toDate()}
                    onSelect={(date) =>
                      handleTransactionDueDateChange(index, date)
                    }
                  />
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      </ScrollArea>

      {calculateRemainingValue() !== 0 && (
        <div className="mt-2 rounded border border-yellow-200 bg-yellow-50 p-2 text-sm text-yellow-700">
          ⚠️ A soma dos valores das transações não corresponde ao valor total.
        </div>
      )}
    </>
  );
}
