"use client";
import {
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/chat/tooltip";
import { OrangeButton } from "@/components/OrangeButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tooltip } from "@/components/ui/tooltip";
import { cn } from "@/utils/cn";
import {
  Check,
  ChevronDown,
  ChevronUp,
  ClipboardList,
  Lock,
  OctagonAlert,
  X,
} from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { rawRows, Row } from "./components/rows";
import Stepper from "./components/steper";

/*
 -----------------------------------------------------------------
 |           🚀  PurchaseApproval – tudo em um único arquivo     |
 | Este componente integra:                                      |
 |  • Stepper (filtro por etapa)                                 |
 |  • Botões de filtro (Ver todos, Financeiro, Mecânica)         |
 |  • Abas (Aprovação Pendente, Agendado...)                     |
 |  • Ordenação clicável no cabeçalho (Nome, Preço, Data)        |
 |  • Seleção por checkbox (linha + select‑all)                  |
 |  • Modal flutuante com o total selecionado                    |
 -----------------------------------------------------------------
*/

const monthsPt: Record<string, number> = {
  Janeiro: 0,
  Fevereiro: 1,
  Março: 2,
  Abril: 3,
  Maio: 4,
  Junho: 5,
  Julho: 6,
  Agosto: 7,
  Setembro: 8,
  Outubro: 9,
  Novembro: 10,
  Dezembro: 11,
};

function parsePriceToNumber(str: string) {
  // Ex.: "R$ 1.234,56  x 2 unidades"
  const match = str.match(/R\$\s*([\d\.]+,\d{2})[\s\S]*?x\s*(\d+)/i);

  if (!match) return 0;
  const unit = parseFloat(match[1].replace(/\./g, "").replace(/,/, "."));
  const qty = parseInt(match[2], 10);
  return unit * qty;
}

function parseDatePt(str: string) {
  // "24/Junho" -> Date
  const [day, monthName] = str.split("/");
  const month = monthsPt[monthName as keyof typeof monthsPt] ?? 0;
  return new Date(new Date().getFullYear(), month, parseInt(day, 10));
}

export default function PurchaseApproval() {
  /* -------------------------------- State -------------------------------- */
  //   const router = useRouter();
  //   const pathname = usePathname();

  // Stepper
  const steps = [
    { label: "Solicitação de Compras", value: "solicitacao" },
    { label: "Aprovação de Gestor", value: "gestor" },
    { label: "Aprovação de Financeiro", value: "financeiro" },
    { label: "Confirmação da Compra", value: "confirmacao" },
    { label: "Pagamento Efetuado", value: "pagamento" },
    { label: "Todos", value: "all" }, // ⬅️ adicionado
  ];
  const [currentStep, setCurrentStep] = useState<number>(5);

  // Filtros adicionais
  const [departmentFilter, setDepartmentFilter] = useState<
    "all" | "finance" | "mechanic"
  >("all");
  const [statusFilter, setStatusFilter] = useState<
    "pendente" | "agendado" | "historico"
  >("pendente");

  // Ordenação
  const [sortConfig, setSortConfig] = useState<{
    key: "name" | "price" | "sendDate";
    direction: "asc" | "desc";
  } | null>(null);

  // Seleção
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  /* ------------------------------ Callbacks ------------------------------ */
  function toggleSort(key: "name" | "price" | "sendDate") {
    setSortConfig((prev) => {
      if (prev?.key === key) {
        // alterna asc -> desc -> none
        if (prev.direction === "asc") return { key, direction: "desc" };
        if (prev.direction === "desc") return null;
      }
      return { key, direction: "asc" };
    });
  }

  function toggleAll() {
    if (allSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(displayedRows.map((r) => r.id)));
    }
  }

  function toggleRow(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  /* ----------------------------- Derived data ---------------------------- */
  const filteredRows = useMemo(() => {
    return rawRows.filter((row) => {
      const matchesDept =
        departmentFilter === "all" || row.department === departmentFilter;
      const matchesStatus = row.status === statusFilter;
      const currentStepValue = steps[currentStep].value as Row["step"] | "all";
      const matchesStep =
        currentStepValue === "all" || row.step === currentStepValue;
      return matchesDept && matchesStatus && matchesStep;
    });
  }, [departmentFilter, statusFilter, currentStep]);

  const displayedRows = useMemo(() => {
    if (!sortConfig) return filteredRows;
    return [...filteredRows].sort((a, b) => {
      if (sortConfig.key === "name") {
        return sortConfig.direction === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      if (sortConfig.key === "price") {
        const diff = parsePriceToNumber(a.price) - parsePriceToNumber(b.price);
        return sortConfig.direction === "asc" ? diff : -diff;
      }
      if (sortConfig.key === "sendDate") {
        const diff =
          parseDatePt(a.sendDate).getTime() - parseDatePt(b.sendDate).getTime();
        return sortConfig.direction === "asc" ? diff : -diff;
      }
      return 0;
    });
  }, [filteredRows, sortConfig]);

  const allSelected =
    selectedIds.size > 0 && displayedRows.every((r) => selectedIds.has(r.id));

  const totalSelectedValue = useMemo(() => {
    let sum = 0;
    displayedRows.forEach((row) => {
      if (selectedIds.has(row.id)) sum += parsePriceToNumber(row.price);
    });
    return sum;
  }, [selectedIds, displayedRows]);

  /* ----------------------------- Abas (routes) --------------------------- */
  const tabs = [
    { id: "pendente", name: "Aprovação Pendente" },
    { id: "agendado", name: "Agendado" },
    { id: "historico", name: "Histórico de Aprovações" },
  ];

  const avatarList = [
    "avatar-1.jpg",
    "avatar-2.jpg",
    "avatar-3.jpg",
    "avatar-4.jpg",
    "avatar-5.jpg",
    "avatar-6.jpg",
    "avatar-7.jpg",
    "avatar-8.jpg",
    "avatar-9.jpg",
    "avatar-10.jpg",
    "avatar-11.jpg",
    "avatar-12.jpg",
    "avatar-13.jpg",
  ];

  /**
   * Devolve um avatar “aleatório” mas estável para cada id.
   * Ex.: id "7" → 7 % 5 = 2 → "03.jpg"
   */
  function getAvatar(id: string) {
    const index =
      Number(id) >= avatarList.length
        ? Math.floor(Math.random() * avatarList.length)
        : Number(id) % avatarList.length;
    return `/avatar/${avatarList[index]}`;
  }
  return (
    <div className="flex h-full w-full flex-col gap-4 lg:gap-6">
      <span className="text-lg font-semibold lg:text-xl">
        Aprovação de Compras
      </span>

      {/* Stepper */}
      <Stepper
        steps={steps}
        current={currentStep}
        onStepClick={(i) => setCurrentStep(i)}
        className="mb-4"
      />

      {/* Botões de filtro */}
      <div className="flex items-center gap-4">
        <OrangeButton
          onClick={() => setDepartmentFilter("all")}
          unselected={departmentFilter !== "all"}
          icon={<ClipboardList />}
        >
          Ver Todos
        </OrangeButton>
        <OrangeButton
          onClick={() => setDepartmentFilter("finance")}
          unselected={departmentFilter !== "finance"}
          icon={<ClipboardList />}
        >
          Financeiro
        </OrangeButton>
        <OrangeButton
          onClick={() => setDepartmentFilter("mechanic")}
          unselected={departmentFilter !== "mechanic"}
          icon={<ClipboardList />}
        >
          Mecânica
        </OrangeButton>
      </div>

      {/* Abas */}
      <div className="flex w-full items-center justify-between gap-8 border-b border-b-zinc-200">
        <div className="flex gap-8 py-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() =>
                setStatusFilter(tab.id as "pendente" | "agendado" | "historico")
              }
              className={cn(
                "hover:text-primary flex h-12 cursor-pointer items-center justify-center border-b px-2 transition-all duration-300",
                statusFilter === tab.id
                  ? "border-b-primary text-primary"
                  : "border-b-transparent text-zinc-500",
              )}
            >
              {tab.name}
            </button>
          ))}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div>
              <OrangeButton icon={<OctagonAlert />} iconPosition="right">
                Ações
              </OrangeButton>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="left">
            <DropdownMenuItem className="hover:bg-primary/20 cursor-pointer transition duration-300">
              Lorem
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-primary/20 cursor-pointer transition duration-300">
              Lorem
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-primary/20 cursor-pointer transition duration-300">
              Lorem
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Tabela */}
      <div className="flex max-h-[80vh] flex-1 py-4">
        <ScrollArea className="w-full">
          <Table className="border-collapse">
            <TableHeader>
              <TableRow>
                {/* Enviado em + select all */}
                <TableHead className="h-12 w-32 min-w-32 text-sm font-semibold text-[#808897] uppercase">
                  <div className="flex w-32 min-w-32 items-center gap-3">
                    <button
                      onClick={toggleAll}
                      className={cn(
                        "flex h-6 w-6 items-center justify-center rounded-md border",
                        allSelected
                          ? "bg-primary border-primary text-white"
                          : "border-zinc-200 text-zinc-400",
                      )}
                    />
                    <button
                      onClick={() => toggleSort("sendDate")}
                      className="flex items-center gap-1"
                    >
                      <span className="font-bold text-[#6C7386]">
                        Enviado em
                      </span>
                      {sortConfig?.key === "sendDate" &&
                        (sortConfig.direction === "asc" ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        ))}
                    </button>
                  </div>
                </TableHead>

                {/* Objeto */}
                <TableHead
                  className="h-12 cursor-pointer text-sm font-semibold text-[#808897] uppercase"
                  onClick={() => toggleSort("name")}
                >
                  <div className="flex flex-row items-center gap-2">
                    Objeto Solicitado
                    {sortConfig?.key === "name" &&
                      (sortConfig.direction === "asc" ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      ))}
                  </div>
                </TableHead>

                {/* Preço */}
                <TableHead
                  className="h-12 cursor-pointer text-center text-sm font-semibold text-[#808897] uppercase"
                  onClick={() => toggleSort("price")}
                >
                  Preço{" "}
                  {sortConfig?.key === "price" &&
                    (sortConfig.direction === "asc" ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    ))}
                </TableHead>

                <TableHead className="h-12 text-center text-sm font-semibold text-[#808897] uppercase">
                  Aprovação
                </TableHead>
                <TableHead className="h-12 text-center text-sm font-semibold text-[#808897] uppercase">
                  Requerido por
                </TableHead>
                <TableHead className="h-12 text-center text-sm font-semibold text-[#808897] uppercase">
                  Ações
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {displayedRows.map((row) => {
                const isSelected = selectedIds.has(row.id);
                return (
                  <TableRow
                    key={row.id}
                    className="hover:bg-primary/20 h-14 transition duration-300"
                  >
                    {/* Data + checkbox */}
                    <TableCell className="w-32 min-w-32 text-center text-sm font-medium">
                      <div className="flex w-32 min-w-32 items-center gap-3">
                        <button
                          onClick={() => toggleRow(row.id)}
                          disabled={row.step === "confirmacao"}
                          className={cn(
                            "flex h-6 w-6 items-center justify-center rounded-md border",
                            isSelected
                              ? "border-primary text-white"
                              : "border-zinc-200 text-zinc-400",
                          )}
                        >
                          {row.step === "confirmacao" ? (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Lock size={16} color="#d96927" />
                                </TooltipTrigger>
                                <TooltipContent
                                  side="top"
                                  align="start"
                                  className="border-primary border bg-white p-3"
                                >
                                  <p className="border-b border-b-red-600 font-bold text-[#6C7386]">
                                    Voce não tem permissão para aprovar essa
                                    solicitação
                                  </p>
                                  <TooltipArrow className="fill-primary" />
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          ) : (
                            isSelected && <Check size={16} color="#d96927" />
                          )}
                        </button>
                        <span className="rounded-lg px-3 py-1 font-bold text-[#6C7386]">
                          {row.sendDate}
                        </span>
                      </div>
                    </TableCell>

                    {/* Objeto */}
                    <TableCell className="text-sm font-medium whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <span className="bg-primary h-7 w-7 rounded-full" />
                        {row.name}
                        {row.priority && (
                          <span className="rounded-lg bg-[#EEEFF2] p-2 font-bold text-[#6C7386]">
                            Alta Prioridade
                          </span>
                        )}
                      </div>
                    </TableCell>

                    {/* Preço */}
                    <TableCell className="text-sm font-medium whitespace-nowrap">
                      {row.price.split("\n").map((line, i) => (
                        <div key={i}>{line}</div>
                      ))}
                    </TableCell>

                    <TableCell className="text-sm font-medium whitespace-nowrap">
                      {row.approvalStep}
                    </TableCell>
                    <TableCell className="text-center text-sm font-medium whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <Image
                          src={getAvatar(row.id)}
                          alt=""
                          width={30}
                          height={30}
                          className="bg-primary h-5 w-5 rounded-full"
                        />
                        {row.requirent}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <div className="hover:bg-primary mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-zinc-200 text-zinc-400 transition duration-300 hover:text-white">
                            •••
                          </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side="left">
                          <DropdownMenuItem className="hover:bg-primary/20 cursor-pointer transition duration-300">
                            Lorem Ipsum
                          </DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-primary/20 cursor-pointer transition duration-300">
                            Lorem Ipsum
                          </DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-primary/20 cursor-pointer transition duration-300">
                            Lorem Ipsum
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>

      {selectedIds.size > 0 && (
        <div className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center justify-between gap-4 rounded-xl border border-zinc-400 bg-white/80 px-6 py-3 shadow-lg backdrop-blur-sm">
          <div className="flex flex-row items-center gap-4">
            {/* texto: qtd + total */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <span className="font-semibold">
                {selectedIds.size} Compra{selectedIds.size > 1 ? "s" : ""}{" "}
                selecionada
                {selectedIds.size > 1 ? "s" : ""}
              </span>
              <span className="text-sm text-zinc-500">
                {totalSelectedValue.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}{" "}
                total
              </span>
            </div>

            {/* botões */}
            <div className="flex items-center gap-3">
              {/* cancelar seleção */}
              <button
                onClick={() => setSelectedIds(new Set())}
                className="flex h-8 w-8 items-center justify-center rounded-md border border-zinc-300 hover:bg-zinc-100"
              >
                <X size={16} className="text-red-600" />
              </button>

              {/* autorizar */}
              <button
                //   onClick={handleAuthorize /* crie sua função */}
                className="to-primary-dark relative flex items-center rounded-md bg-gradient-to-r from-orange-600 px-4 py-2 font-semibold text-white"
              >
                Autorizar Operação
                <span className="ml-2 flex h-6 w-6 items-center justify-center rounded-md bg-white">
                  <Check size={14} className="text-green-600" />
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
