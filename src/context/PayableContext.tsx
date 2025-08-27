"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useApiContext } from "./ApiContext";
import { useBranch } from "./BranchContext";

export interface PayableProps {
  businessUnitId: string;
  dueDate: string;
  id: string;
  installmentCount: number;
  ledgerAccountId: string;
  mainDocumentUrl: string;
  paymentMode: string;
  referenceMonth: number;
  status: string;
  subsidiaryId: string;
  supplierId: string;
  type: string;
  value: number;
}

export interface PayableTransactionProps {
  bankAccount: unknown | null;
  documentNumber: unknown | null;
  documents: unknown[];
  dueDate: string;
  id: string;
  payable: {
    dueDate: string;
    id: string;
    installmentCount: number;
    ledgerAccount: {
      code: number;
      companyId: string;
      id: string;
      name: string;
    };
    mainDocumentUrl: string;
    paymentMode: string;
    referenceMonth: number;
    status: string;
    supplier: {
      address: string;
      city: string;
      cnpj: string;
      code: number;
      companyId: string;
      complement: string | null;
      createdAt: string;
      email: string;
      id: string;
      municipalRegistration: string | null;
      name: string;
      neighborhood: string;
      number: string;
      phone: string;
      postalCode: string;
      state: string;
      stateRegistration: string | null;
    };
    type: string;
    value: number;
  };
  paymentType: string;
  position: number;
  receiptUrl: string | null;
  status: string;
  value: number;
}

interface PayableContextProps {
  payableList: PayableProps[];
  setPayableList: React.Dispatch<React.SetStateAction<PayableProps[]>>;
}

const PayableContext = createContext<PayableContextProps | undefined>(
  undefined,
);

interface ProviderProps {
  children: React.ReactNode;
}

export const PayableContextProvider = ({ children }: ProviderProps) => {
  const { selectedBranch } = useBranch();
  const { GetAPI } = useApiContext();
  const [payableList, setPayableList] = useState<PayableProps[]>([]);

  async function GetPayables() {
    const payables = await GetAPI(
      `/payable?companyId=${selectedBranch?.companyId}&page=1`,
      true,
    );
    if (payables.status === 200) {
      setPayableList(payables.body.payables);
    }
  }

  async function GetPayableTransactions() {
    const transactions = await GetAPI(
      `/payable-transaction?companyId=${selectedBranch?.companyId}&page=1`,
      true,
    );
    if (transactions.status === 200) {
      setPayableList(transactions.body.payableTransactions);
    }
  }

  useEffect(() => {
    if (selectedBranch !== null) {
      GetPayables();
      GetPayableTransactions();
    }
  }, [selectedBranch]);

  return (
    <PayableContext.Provider
      value={{
        payableList,
        setPayableList,
      }}
    >
      {children}
    </PayableContext.Provider>
  );
};

export function usePayableContext() {
  const context = useContext(PayableContext);
  if (!context) {
    throw new Error(
      "usePayableContext deve ser usado dentro de um PayableContextProvider",
    );
  }
  return context;
}
