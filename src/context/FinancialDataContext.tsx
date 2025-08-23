"use client";

import {
  LedgerAccountsProps,
  ResultCenterProps,
  SupplierProps,
} from "@/@types/financial-data";
import { createContext, useContext, useEffect, useState } from "react";
import { useApiContext } from "./ApiContext";
import { useBranch } from "./BranchContext";

interface FinancialDataContextProps {
  suppliers: SupplierProps[];
  ledgerAccounts: LedgerAccountsProps[];
  resultCenters: ResultCenterProps[];
}

const FinancialDataContext = createContext<
  FinancialDataContextProps | undefined
>(undefined);

interface ProviderProps {
  children: React.ReactNode;
}

export const FinancialDataContextProvider = ({ children }: ProviderProps) => {
  const { GetAPI } = useApiContext();
  const { selectedBranch } = useBranch();
  const [suppliers, setSuppliers] = useState<SupplierProps[]>([]);
  const [ledgerAccounts, setLedgerAccounts] = useState<LedgerAccountsProps[]>(
    [],
  );
  const [resultCenters, setResultCenters] = useState<ResultCenterProps[]>([]);

  async function GetSuppliers() {
    const suppliers = await GetAPI(
      `/supplier?page=1&companyId=${selectedBranch?.companyId}`,
      true,
    );
    if (suppliers.status === 200) {
      setSuppliers(suppliers.body.suppliers);
    }
  }

  async function GetLedgerAccounts() {
    const ledgerAccounts = await GetAPI(
      `/ledger-account/fetch/${selectedBranch?.companyId}`,
      true,
    );
    if (ledgerAccounts.status === 200) {
      setLedgerAccounts(ledgerAccounts.body.ledgerAccounts);
    }
  }

  async function GetResultCenters() {
    const resultCenters = await GetAPI(
      `/result-center/fetch/${selectedBranch?.companyId}`,
      true,
    );
    console.log("resultCenters", resultCenters);
  }

  useEffect(() => {
    if (!selectedBranch) return;
    GetSuppliers();
    GetLedgerAccounts();
    GetResultCenters();
  }, [selectedBranch]);

  return (
    <FinancialDataContext.Provider
      value={{
        suppliers,
        ledgerAccounts,
        resultCenters,
      }}
    >
      {children}
    </FinancialDataContext.Provider>
  );
};

export function useFinancialDataContext() {
  const context = useContext(FinancialDataContext);
  if (!context) {
    throw new Error(
      "useFinancialDataContext deve ser usado dentro de um FinancialDataContextProvider",
    );
  }
  return context;
}
