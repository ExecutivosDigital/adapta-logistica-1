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
import { useLoadingContext } from "@/context/LoadingContext";
import { PayableTransactionProps } from "@/context/PayableContext";
import { useValueContext } from "@/context/ValueContext";
import { cn } from "@/utils/cn";
import { EllipsisVertical } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { DateRange, SelectRangeEventHandler } from "react-day-picker";

export function PayableFinancialLists() {
  const { handleNavigation } = useLoadingContext();
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
  const [isGettingClosedTransactions, setIsGettingClosedTransactions] =
    useState(true);
  const [selectedApprovedPage, setSelectedApprovedPage] = useState(1);
  const [approvedTransactionPages, setApprovedTransactionPages] = useState(1);
  const [approvedTransactionList, setApprovedTransactionList] = useState<
    PayableTransactionProps[]
  >([]);
  const [isGettingApprovedTransactions, setIsGettingApprovedTransactions] =
    useState(true);
  const [accessLevel, setAccessLevel] = useState("common");

  const handleSelect: SelectRangeEventHandler = (
    range: DateRange | undefined,
  ) => {
    if (range && range.from && range.to) {
      setDateRange({ from: range.from, to: range.to });
    } else {
      setDateRange({ from: new Date(), to: new Date() });
    }
  };

  async function GetClosedTransactions() {
    setIsGettingClosedTransactions(true);
    const transactions = await GetAPI(
      `/payable-transaction?companyId=${selectedBranch?.companyId}&page=${selectedClosedPage}&status=CLOSED&startDate=${moment(
        dateRange.from,
      ).format(
        "YYYY-MM-DD",
      )}&endDate=${moment(dateRange.to).format("YYYY-MM-DD")}
      `,
      true,
    );
    if (transactions.status === 200) {
      setClosedTransactionList(transactions.body.payableTransactions);
      setClosedTransactionPages(transactions.body.total);
      return setIsGettingClosedTransactions(false);
    }
    return setIsGettingClosedTransactions(false);
  }

  async function GetApprovedTransactions() {
    setIsGettingApprovedTransactions(true);
    const transactions = await GetAPI(
      `/payable-transaction?companyId=${selectedBranch?.companyId}&page=${selectedApprovedPage}&status=APPROVED&startDate=${moment(
        dateRange.from,
      ).format(
        "YYYY-MM-DD",
      )}&endDate=${moment(dateRange.to).format("YYYY-MM-DD")}`,
      true,
    );
    if (transactions.status === 200) {
      setApprovedTransactionList(transactions.body.payableTransactions);
      setApprovedTransactionPages(transactions.body.total);
      return setIsGettingApprovedTransactions(false);
    }
    return setIsGettingApprovedTransactions(false);
  }

  const HandleRedirect = (transaction: PayableTransactionProps) => {
    if (transaction.status === "REJECTED") {
      return;
    } else if (transaction.status === "CLOSED") {
      return handleNavigation(`/payable/payed/${transaction.id}`);
    } else if (transaction.status !== "APPROVED") {
      if (accessLevel === "common") {
        return handleNavigation(`/payable/add-document/${transaction.id}`);
      } else if (accessLevel === "admin") {
        return handleNavigation(`/payable/approve/${transaction.id}`);
      }
    } else if (transaction.status === "APPROVED") {
      return handleNavigation(`/payable/pay/${transaction.id}`);
    }
  };

  useEffect(() => {
    GetClosedTransactions();
  }, [selectedClosedPage, dateRange]);

  useEffect(() => {
    GetApprovedTransactions();
  }, [selectedApprovedPage, dateRange]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-semibold">Fluxo Consolidado</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="rounded-md border border-zinc-200 px-4 py-2 font-semibold text-zinc-400">
                Acesso {accessLevel === "common" ? "Comum" : "Diretor"}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="border-zinc-200">
              <DropdownMenuItem
                onClick={() => setAccessLevel("common")}
                className={cn(
                  "hover:bg-primary/20 cursor-pointer transition duration-300",
                  accessLevel === "common" &&
                    "bg-primary/20 text-primary font-semibold",
                )}
              >
                Comum
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setAccessLevel("admin")}
                className={cn(
                  "hover:bg-primary/20 cursor-pointer transition duration-300",
                  accessLevel === "admin" &&
                    "bg-primary/20 text-primary font-semibold",
                )}
              >
                Diretor
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
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
          <ScrollArea className="relative h-80 w-full px-4">
            {isGettingClosedTransactions
              ? Array.from({ length: 10 }, (_, index) => (
                  <div
                    className="my-2 flex w-full animate-pulse items-center justify-between bg-gray-50"
                    key={index}
                  />
                ))
              : !isGettingClosedTransactions &&
                  closedTransactionList.length !== 0
                ? closedTransactionList.map((inc) => (
                    <div
                      className="hover:bg-primary/20 my-2 flex w-full cursor-pointer items-center justify-between transition duration-200"
                      onClick={() => HandleRedirect(inc)}
                      key={inc.id}
                    >
                      <div className="flex items-center gap-2">
                        <div className="bg-primary h-6 w-6 rounded-full" />
                        <span>{inc.payable.supplier.name}</span>
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
                  ))
                : !isGettingClosedTransactions &&
                  closedTransactionList.length === 0 && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <span>Não há transações</span>
                    </div>
                  )}
          </ScrollArea>
          <div
            className={cn(
              "flex h-20 w-full items-center justify-center gap-2 overflow-hidden border-t border-t-zinc-200 p-2",
              closedTransactionList.length === 0 && "hidden",
            )}
          >
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
          <ScrollArea className="relative h-80 w-full px-4">
            {isGettingApprovedTransactions
              ? Array.from({ length: 10 }, (_, index) => (
                  <div
                    className="my-2 flex w-full animate-pulse items-center justify-between bg-gray-50"
                    key={index}
                  />
                ))
              : !isGettingApprovedTransactions &&
                  approvedTransactionList.length !== 0
                ? approvedTransactionList.map((inc) => (
                    <div
                      className="hover:bg-primary/20 my-2 flex w-full cursor-pointer items-center justify-between transition duration-200"
                      onClick={() => HandleRedirect(inc)}
                      key={inc.id}
                    >
                      <div className="flex items-center gap-2">
                        <div className="bg-primary h-6 w-6 rounded-full" />
                        <span>{inc.payable.supplier.name}</span>
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
                  ))
                : !isGettingApprovedTransactions &&
                  approvedTransactionList.length === 0 && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <span>Não há transações</span>
                    </div>
                  )}
          </ScrollArea>
          <div
            className={cn(
              "flex h-20 w-full items-center justify-center gap-2 overflow-hidden border-t border-t-zinc-200 p-2",
              approvedTransactionList.length === 0 && "hidden",
            )}
          >
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
