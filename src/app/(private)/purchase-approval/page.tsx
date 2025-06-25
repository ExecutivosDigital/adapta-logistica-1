"use client";
import { useState } from "react";
import Purchase from "./components/purchase";
import Stepper from "./components/steper";

export default function PurchaseApproval() {
  const steps = [
    { label: "Solicitação de Compras", value: "solicitacao" },
    { label: "Aprovação de Gestor", value: "gestor" },
    { label: "Aprovação de Financeiro", value: "financeiro" },
    { label: "Confirmação da Compra", value: "confirmacao" },
    { label: "Pagamento Efetuado", value: "pagamento" },
  ];

  // 2. Última etapa concluída (estado)
  const [current, setCurrent] = useState<number>(2);

  // 3. Clique em uma etapa
  function handleStepClick(index: number) {
    setCurrent(index); // atualiza o stepper
    // aqui você pode acionar filtros, consultas etc.
  }
  return (
    <div className="flex h-full w-full flex-col gap-2 lg:gap-4">
      <span className="text-lg font-semibold lg:text-xl">
        Aprovação de Compras
      </span>
      <div className="flex w-full flex-col gap-8">
        <Stepper
          steps={steps}
          current={current}
          onStepClick={handleStepClick}
          className="mb-8"
        />
        <Purchase />
      </div>
    </div>
  );
}
