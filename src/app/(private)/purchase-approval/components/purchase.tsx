"use client";
import { OrangeButton } from "@/components/OrangeButton";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/utils/cn";
import { ClipboardList, EllipsisVertical, OctagonAlert } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
export default function Purchase() {
  const router = useRouter();

  const routes = [
    { id: "1", name: "Aprovação Pendente", route: "/branch" },
    { id: "2", name: "Agendado", route: "/branch/branch-details" },
    {
      id: "3",
      name: "Histórico de Aprovações",
      route: "/branch/branch-users",
    },
  ];
  const pathname = usePathname();
  const [filter, setFilter] = useState("all");
  const columns = [
    { key: "sendDate", label: "Enviado em" },
    { key: "item", label: "Objeto Solicitado" },
    { key: "price", label: "Preço" },
    { key: "approvalStep", label: "Aprovação" },
    { key: "requirent", label: "Requerido por" },
    { key: "actions", label: "Ações" },
  ];
  const rows = [
    {
      id: "1",
      sendDate: "24/Junho",
      name: "Nome do Item",
      priority: true,
      price: "R$ 500,00 \n x 1 unidade",
      approvalStep: "1 de 2",
      requirent: "Nome do Colaborador",
    },
    {
      id: "2",
      sendDate: "23/Junho",
      name: "Nome do Item 2",
      priority: false,
      price: "R$ 1.000,00 \n x 2 unidades",
      approvalStep: "2 de 2",
      requirent: "Nome do Colaborador 2",
    },
    {
      id: "3",
      sendDate: "22/Junho",
      name: "Nome do Item 3",
      priority: false,
      price: "R$ 1.500,00 \n x 3 unidades",
      approvalStep: "1 de 2",
      requirent: "Nome do Colaborador 3",
    },
    {
      id: "4",
      sendDate: "21/Junho",
      name: "Nome do Item 4",
      priority: false,
      price: "R$ 2.000,00 \n x 4 unidades",
      approvalStep: "2 de 2",
      requirent: "Nome do Colaborador 4",
    },
    {
      id: "5",
      sendDate: "20/Junho",
      name: "Nome do Item 5",
      priority: false,
      price: "R$ 2.500,00 \n x 5 unidades",
      approvalStep: "1 de 2",
      requirent: "Nome do Colaborador 5",
    },
    {
      id: "6",
      sendDate: "19/Junho",
      name: "Nome do Item 6",
      priority: false,
      price: "R$ 3.000,00 \n x 6 unidades",
      approvalStep: "2 de 2",
      requirent: "Nome do Colaborador 6",
    },
    {
      id: "7",
      sendDate: "18/Junho",
      name: "Nome do Item 7",
      priority: false,
      price: "R$ 3.500,00 \n x 7 unidades",
      approvalStep: "1 de 2",
      requirent: "Nome do Colaborador 7",
    },
    {
      id: "8",
      sendDate: "17/Junho",
      name: "Nome do Item 8",
      priority: false,
      price: "R$ 4.000,00 \n x 8 unidades",
      approvalStep: "2 de 2",
      requirent: "Nome do Colaborador 8",
    },
    {
      id: "9",
      sendDate: "16/Junho",
      name: "Nome do Item 9",
      priority: false,
      price: "R$ 4.500,00 \n x 9 unidades",
      approvalStep: "1 de 2",
      requirent: "Nome do Colaborador 9",
    },
    {
      id: "10",
      sendDate: "15/Junho",
      name: "Nome do Item 10",
      priority: false,
      price: "R$ 5.000,00 \n x 10 unidades",
      approvalStep: "2 de 2",
      requirent: "Nome do Colaborador 10",
    },
    {
      id: "11",
      sendDate: "14/Junho",
      name: "Nome do Item 11",
      priority: false,
      price: "R$ 5.500,00 \n x 11 unidades",
      approvalStep: "1 de 2",
      requirent: "Nome do Colaborador 11",
    },
  ];
  return (
    // Contêiner principal que ocupa a tela inteira

    <div className="mt-16 flex flex-1 flex-col overflow-hidden">
      {/* Controles: Dropdown e Botão "Adicionar" */}
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-8">
          <OrangeButton
            onClick={() => setFilter("all")}
            unselected={filter !== "all"}
            icon={<ClipboardList />}
            iconPosition="left"
            className="gap-2"
          >
            Ver Todos
          </OrangeButton>
          <OrangeButton
            onClick={() => setFilter("finance")}
            unselected={filter !== "finance"}
            icon={<ClipboardList />}
            iconPosition="left"
            className="gap-2"
          >
            Financeiro
          </OrangeButton>
          <OrangeButton
            onClick={() => setFilter("mechanic")}
            unselected={filter !== "mechanic"}
            icon={<ClipboardList />}
            iconPosition="left"
            className="gap-2"
          >
            Mecânica
          </OrangeButton>
        </div>
      </div>

      {/* Abas de Navegação */}
      <div className="flex w-full items-center justify-between gap-8 border-b border-b-zinc-200">
        <div className="flex gap-8 py-2">
          {routes.map((tab, index) => (
            <button
              key={index}
              onClick={() => router.push(tab.route)}
              className={`flex h-12 cursor-pointer items-center justify-center border-b px-2 transition-all duration-300 ${
                pathname === tab.route
                  ? "text-primary border-b-primary"
                  : "border-b-transparent"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
        <div className="flex flex-1 justify-end">
          <OrangeButton
            icon={<OctagonAlert />}
            iconPosition="right"
            className="gap-2"
          >
            Reportar Erro
          </OrangeButton>
        </div>
      </div>

      {/* AQUI ESTÁ A MÁGICA: A ScrollArea ocupa o espaço restante */}
      <div className="flex max-h-[80vh] w-full flex-1 py-4">
        <ScrollArea className="w-full">
          {" "}
          <Table className="border-collapse">
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead
                    key={column.key}
                    className={cn(
                      column.key === "actions"
                        ? "flex w-10 px-0 text-center"
                        : column.key === "item"
                          ? "pl-8"
                          : "text-center",
                      "h-12 text-sm font-semibold text-[#808897] uppercase",
                    )}
                  >
                    {column.key === "sendDate" ? (
                      <div className="flex items-center gap-3">
                        <button className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-md border border-zinc-200 text-zinc-400"></button>
                        <span className="rounded-lg px-3 py-1 font-bold text-[#6C7386]">
                          {column.label}
                        </span>
                      </div>
                    ) : (
                      column.label
                    )}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="hover:bg-primary/10 h-14 transition duration-200"
                >
                  <TableCell className="text-center text-sm font-medium whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <button className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-md border border-zinc-200 text-zinc-400"></button>
                      <span className="rounded-lg px-3 py-1 font-bold text-[#6C7386]">
                        {row.sendDate}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="pl-8 text-sm font-medium whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <span className="bg-primary h-5 w-5 rounded-full" />
                      {row.name}
                      {row.priority && (
                        <span className="flex items-center justify-center rounded-lg bg-[#EEEFF2] p-2 font-bold text-[#6C7386]">
                          Alta Prioridade
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm font-medium whitespace-nowrap">
                    {row.price?.includes("\n") ? (
                      <>
                        <div>{row.price.split("\n")[0]}</div>
                        <div className="mt-1">{row.price.split("\n")[1]}</div>
                      </>
                    ) : (
                      row.price
                    )}
                  </TableCell>
                  <TableCell className="text-sm font-medium whitespace-nowrap">
                    {row.approvalStep}
                  </TableCell>
                  <TableCell className="text-sm font-medium whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <span className="bg-primary h-5 w-5 rounded-full" />
                      {row.requirent}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-md border border-zinc-200 text-zinc-400">
                      <EllipsisVertical size={14} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  );
}
