"use client";
import { Calendar } from "@/components/ui/calendar";
import { CustomPagination } from "@/components/ui/custom-pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useApiContext } from "@/context/ApiContext";
import { useBranch } from "@/context/BranchContext";
import { PayableTransactionProps } from "@/context/PayableContext";
import { useValueContext } from "@/context/ValueContext";
import { cn } from "@/utils/cn";
import { EllipsisVertical } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { DateRange, SelectRangeEventHandler } from "react-day-picker";

export function PayableFinancialLists() {
  const { viewAllValues } = useValueContext();
  const { selectedBranch } = useBranch();
  const { GetAPI } = useApiContext();

  const [dateRange, setDateRange] = useState({
    from: moment().subtract(1, "month").toDate(),
    to: moment().toDate(),
  });
  const [selectedClosedPage, setSelectedClosedPage] = useState(1);
  const [closedTransactionPages, setClosedTransactionPages] = useState(1);
  const [closedTransactionList, setClosedTransactionList] = useState<
    PayableTransactionProps[]
  >([]);
  const [selectedApprovedPage, setSelectedApprovedPage] = useState(1);
  const [approvedTransactionPages, setApprovedTransactionPages] = useState(1);
  const [approvedTransactionList, setApprovedTransactionList] = useState<
    PayableTransactionProps[]
  >([]);

  const handleSelect: SelectRangeEventHandler = (
    range: DateRange | undefined,
  ) => {
    if (range && range.from && range.to) {
      setDateRange({ from: range.from, to: range.to });
    } else {
      setDateRange({ from: new Date(), to: new Date() }); // or handle undefined case as needed
    }
  };

  async function GetClosedTransactions() {
    const transactions = await GetAPI(
      `/payable-transaction?companyId=${selectedBranch?.companyId}&page=${selectedClosedPage}&status=CLOSED`,
      true,
    );
    if (transactions.status === 200) {
      setClosedTransactionList(transactions.body.payableTransactions);
      setClosedTransactionPages(transactions.body.total);
    }
  }

  async function GetApprovedTransactions() {
    const transactions = await GetAPI(
      `/payable-transaction?companyId=${selectedBranch?.companyId}&page=${selectedApprovedPage}&status=APPROVED`,
      true,
    );
    if (transactions.status === 200) {
      setApprovedTransactionList(transactions.body.payableTransactions);
      setApprovedTransactionPages(transactions.body.total);
    }
  }

  useEffect(() => {
    GetClosedTransactions();
  }, [selectedClosedPage]);

  useEffect(() => {
    GetApprovedTransactions();
  }, [selectedApprovedPage]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-full items-center justify-between">
        <span className="font-semibold">Fluxo Consolidado</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="cursor-pointer rounded-md border border-zinc-200 px-2 py-1 text-zinc-400">
              {moment(dateRange.from).format("DD/MM/YYYY")} -{" "}
              {moment(dateRange.to).format("DD/MM/YYYY")}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="left" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              classNames={{
                day_range_middle: cn("bg-zinc-400", "hover:bg-zinc-500"),
              }}
              onSelect={handleSelect}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex w-full flex-col items-center justify-between gap-2 xl:flex-row xl:gap-8">
        <div className="flex w-full flex-col rounded-xl border border-zinc-200 shadow-sm xl:w-1/2">
          <div className="flex w-full items-center justify-between border-b border-b-zinc-200 p-2">
            <div className="flex flex-col">
              <span className="text-sm">Efetuado</span>
              <span className="text-primary font-semibold">
                {viewAllValues
                  ? closedTransactionList
                      .reduce((a, b) => a + b.value, 0)
                      .toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })
                  : "********"}
              </span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex cursor-pointer items-center justify-center rounded-md border border-zinc-200 bg-white p-1 text-zinc-400">
                  <EllipsisVertical />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="left"
                className="divide-zin-400 divide-y-1"
              >
                <DropdownMenuItem className="hover:bg-primary/20 cursor-pointer rounded-none transition duration-300">
                  Exportar Relatório
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-primary/20 cursor-pointer rounded-none transition duration-300">
                  Lorem Ipsum
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <ScrollArea className="h-60 w-full px-4">
            {closedTransactionList.map((inc) => (
              <div
                className="my-2 flex w-full items-center justify-between"
                key={inc.id}
              >
                <div className="flex items-center gap-2">
                  <div className="bg-primary h-6 w-6 rounded-full" />
                  <span>{moment(inc.dueDate).format("DD/MM/YYYY")}</span>
                </div>
                <span>
                  {viewAllValues
                    ? inc.value.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })
                    : "********"}
                </span>
              </div>
            ))}
          </ScrollArea>
          <div className="flex h-20 w-full items-center justify-center gap-2 overflow-hidden border-t border-t-zinc-200 p-2">
            <CustomPagination
              currentPage={selectedClosedPage}
              pages={closedTransactionPages}
              setCurrentPage={setSelectedClosedPage}
            />
          </div>
        </div>
        <div className="flex w-full flex-col rounded-xl border border-zinc-200 shadow-sm xl:w-1/2">
          <div className="flex w-full items-center justify-between border-b border-b-zinc-200 p-2">
            <div className="flex flex-col">
              <span className="text-sm">Á Pagar</span>
              <span className="font-semibold text-[#EF4444]">
                {viewAllValues
                  ? approvedTransactionList
                      .reduce((a, b) => a + b.value, 0)
                      .toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })
                  : "********"}
              </span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex cursor-pointer items-center justify-center rounded-md border border-zinc-200 bg-white p-1 text-zinc-400">
                  <EllipsisVertical />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="left"
                className="divide-zin-400 divide-y-1"
              >
                <DropdownMenuItem className="hover:bg-primary/20 cursor-pointer rounded-none transition duration-300">
                  Exportar Relatório
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-primary/20 cursor-pointer rounded-none transition duration-300">
                  Lorem Ipsum
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <ScrollArea className="h-60 w-full px-4">
            {approvedTransactionList.map((exp) => (
              <div
                className="my-2 flex w-full items-center justify-between"
                key={exp.id}
              >
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-[#EF4444]" />
                  <span>{moment(exp.dueDate).format("DD/MM/YYYY")}</span>
                </div>
                <span>
                  {viewAllValues
                    ? exp.value.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })
                    : "********"}
                </span>
              </div>
            ))}
          </ScrollArea>
          <div className="flex h-20 w-full items-center justify-center gap-2 overflow-hidden border-t border-t-zinc-200 p-2">
            <CustomPagination
              currentPage={selectedApprovedPage}
              pages={approvedTransactionPages}
              setCurrentPage={setSelectedApprovedPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
