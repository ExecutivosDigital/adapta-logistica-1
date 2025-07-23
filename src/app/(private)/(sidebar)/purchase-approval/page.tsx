"use client";
import { OrangeButton } from "@/components/OrangeButton";
import { ArrowRight, ClipboardList } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ApprovalTable } from "./components/approval-table";
import { NewPurchaseApprovalModal } from "./components/new-purchase-approval-modal";
import { NewPurchaseBudgetModal } from "./components/new-purchase-budget-modal";
import { NewPurchaseRequestModal } from "./components/new-purchase-request-modal";
import { RequestTable } from "./components/request-table";
import Stepper from "./components/steper";

export default function PurchaseApproval() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [showNewPurchaseRequestModal, setShowNewPurchaseRequestModal] =
    useState<boolean>(false);
  const [showNewPurchaseApprovalModal, setShowNewPurchaseApprovalModal] =
    useState<boolean>(false);
  const [showNewPurchaseBudgetModal, setShowNewPurchaseBudgetModal] =
    useState<boolean>(false);

  const steps = [
    { label: "Solicitação de Compras", value: "requests" },
    { label: "Aprovação Financeiro", value: "approval" },
    { label: "Orçamento", value: "budget" },
    { label: "Aprovação Final", value: "final" },
  ];

  const handleOpenModal = () => {
    if (currentStep === 0) {
      setShowNewPurchaseRequestModal(true);
    } else if (currentStep === 1) {
      setShowNewPurchaseApprovalModal(true);
    } else if (currentStep === 2) {
      setShowNewPurchaseBudgetModal(true);
    } else if (currentStep === 3) {
      router.push(`/purchase-approval/1`);
    }
  };

  console.log("currentStep", currentStep);

  return (
    <>
      <div className="flex h-full w-full flex-col gap-4 lg:gap-6">
        <span className="text-lg font-semibold lg:text-xl">
          Aprovação de Compras
        </span>

        <Stepper
          steps={steps}
          current={currentStep}
          onStepClick={(i) => setCurrentStep(i)}
          className="mb-4"
        />

        <div className="flex items-center gap-4">
          <OrangeButton icon={<ClipboardList />}>Ver Todos</OrangeButton>
        </div>

        <div className="flex w-full items-center justify-between gap-8 border-b border-b-zinc-200">
          <button className="hover:text-primary border-b-primary text-primary flex h-12 cursor-pointer items-center justify-center border-b px-2 font-semibold transition-all duration-300">
            Solicitação de Compras
          </button>
          <OrangeButton
            icon={<ArrowRight />}
            iconPosition="right"
            onClick={handleOpenModal}
          >
            Solicitar Compras
          </OrangeButton>
        </div>

        {currentStep === 0 ? (
          <RequestTable />
        ) : currentStep === 1 ? (
          <ApprovalTable />
        ) : (
          <></>
        )}
      </div>
      {showNewPurchaseRequestModal && (
        <NewPurchaseRequestModal
          show={showNewPurchaseRequestModal}
          onHide={() => setShowNewPurchaseRequestModal(false)}
        />
      )}
      {showNewPurchaseApprovalModal && (
        <NewPurchaseApprovalModal
          show={showNewPurchaseApprovalModal}
          onHide={() => setShowNewPurchaseApprovalModal(false)}
        />
      )}
      {showNewPurchaseBudgetModal && (
        <NewPurchaseBudgetModal
          show={showNewPurchaseBudgetModal}
          onHide={() => setShowNewPurchaseBudgetModal(false)}
        />
      )}
    </>
  );
}
