"use client";
import { OrangeButton } from "@/components/OrangeButton";
import { ArrowRight, ClipboardList } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ApprovalTable } from "./components/approval-table";
import { BudgetApprovalTable } from "./components/budget-approval-table";
import { DeleteRequestModal } from "./components/delete-request-modal";
import { FinalApprovalTable } from "./components/final-approval-table";
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
  const [showDeleteRequestModal, setShowDeleteRequestModal] =
    useState<boolean>(false);
  const [showNewPurchaseApprovalModal, setShowNewPurchaseApprovalModal] =
    useState<boolean>(false);
  const [showNewPurchaseBudgetModal, setShowNewPurchaseBudgetModal] =
    useState<boolean>(false);
  const [
    ShowNewPurchaseRequestModalEditable,
    setShowNewPurchaseRequestModalEditable,
  ] = useState<boolean>(false);
  const steps = [
    { label: "Solicitação de Compras", value: "requests" },
    { label: "Aprovação Financeiro", value: "approval" },
    { label: "Orçamento", value: "budget" },
    { label: "Aprovação Final", value: "final" },
  ];

  const handleOpenModal = () => {
    if (currentStep === 0) {
      setShowNewPurchaseRequestModal(true);
      setShowNewPurchaseRequestModalEditable(true);
    } else if (currentStep === 1) {
      setShowNewPurchaseApprovalModal(true);
    } else if (currentStep === 2) {
      setShowNewPurchaseBudgetModal(true);
    } else if (currentStep === 3) {
      router.push(`/purchase-approval/1`);
    }
  };

  return (
    <>
      <div className="flex h-full w-full flex-col gap-4 lg:gap-6">
        <span className="text-lg font-semibold lg:text-xl">
          Aprovação de Compras
        </span>
        <div className="w-full px-8 xl:px-0">
          <Stepper
            steps={steps}
            current={currentStep}
            onStepClick={(i) => setCurrentStep(i)}
            className="mb-4"
          />
        </div>

        <div className="mt-10 flex w-full flex-col items-center justify-between gap-2 border-b border-b-zinc-200 pb-2 xl:h-12 xl:flex-row">
          <OrangeButton icon={<ClipboardList />}>Ver Todos</OrangeButton>
        </div>

        <div className="flex w-full items-center justify-between gap-8 border-b border-b-zinc-200">
          <button className="hover:text-primary border-b-primary text-primary flex h-12 cursor-pointer items-center justify-center border-b px-2 font-semibold transition-all duration-300">
            Solicitação de Compras
          </button>
          {currentStep === 0 ? (
            <OrangeButton
              icon={<ArrowRight />}
              iconPosition="right"
              onClick={handleOpenModal}
            >
              Solicitar Compras
            </OrangeButton>
          ) : (
            <OrangeButton icon={<ArrowRight />} iconPosition="right">
              Reportar Erro
            </OrangeButton>
          )}
        </div>

        <div className="w-full">
          {currentStep === 0 ? (
            <RequestTable
              openJustifyModal={() => {
                setShowNewPurchaseRequestModal(true);
                setShowNewPurchaseRequestModalEditable(false);
              }}
              openEditModal={() => {
                setShowNewPurchaseRequestModal(true);
                setShowNewPurchaseRequestModalEditable(false);
              }}
              openDeleteModal={() => setShowDeleteRequestModal(true)}
            />
          ) : currentStep === 1 ? (
            <ApprovalTable
              openModal={handleOpenModal}
              openJustifyModal={() => setShowNewPurchaseRequestModal(true)}
            />
          ) : currentStep === 2 ? (
            <BudgetApprovalTable
              openModal={handleOpenModal}
              openJustifyModal={() => setShowNewPurchaseApprovalModal(true)}
            />
          ) : (
            <FinalApprovalTable
              openModal={handleOpenModal}
              openJustifyModal={() => setShowNewPurchaseBudgetModal(true)}
            />
          )}
        </div>
      </div>
      {showNewPurchaseRequestModal && (
        <NewPurchaseRequestModal
          show={showNewPurchaseRequestModal}
          isEditable={ShowNewPurchaseRequestModalEditable}
          onHide={() => setShowNewPurchaseRequestModal(false)}
        />
      )}
      {showDeleteRequestModal && (
        <DeleteRequestModal
          show={showDeleteRequestModal}
          onHide={() => setShowDeleteRequestModal(false)}
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
