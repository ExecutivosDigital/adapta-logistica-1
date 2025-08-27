"use client";

import {
  FiscalGroupProps,
  LedgerAccountsProps,
  ResultCenterProps,
  SupplierGroupProps,
  SupplierProps,
  SupplierTypeProps,
  TributaryRegimeProps,
} from "@/@types/financial-data";
import { createContext, useContext, useEffect, useState } from "react";
import { useApiContext } from "./ApiContext";
import { useBranch } from "./BranchContext";

export interface LedgerAccountFiltersProps {
  type: string;
  level: number;
  page: number;
  query: string;
}

interface FinancialDataContextProps {
  suppliers: SupplierProps[];
  GetSuppliers: () => Promise<void>;
  ledgerAccounts: LedgerAccountsProps[];
  ledgerAccountFilters: LedgerAccountFiltersProps;
  setLedgerAccountFilters: React.Dispatch<
    React.SetStateAction<LedgerAccountFiltersProps>
  >;
  ledgerAccountPages: number;
  resultCenters: ResultCenterProps[];
  supplierGroups: SupplierGroupProps[];
  supplierTypes: SupplierTypeProps[];
  tributaryRegimes: TributaryRegimeProps[];
  fiscalGroups: FiscalGroupProps[];
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
  const [ledgerAccountFilters, setLedgerAccountFilters] = useState({
    type: "EXPENSE",
    level: 4,
    page: 1,
    query: "",
  });
  const [ledgerAccountPages, setLedgerAccountPages] = useState(0);
  const [resultCenters, setResultCenters] = useState<ResultCenterProps[]>([]);
  const [supplierGroups, setSupplierGroups] = useState<SupplierGroupProps[]>(
    [],
  );
  const [supplierTypes, setSupplierTypes] = useState<SupplierTypeProps[]>([]);
  const [tributaryRegimes, setTributaryRegimes] = useState<
    TributaryRegimeProps[]
  >([]);
  const [fiscalGroups, setFiscalGroups] = useState<FiscalGroupProps[]>([]);

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
    const filter = `?type=${ledgerAccountFilters.type}&level=${ledgerAccountFilters.level}&page=${ledgerAccountFilters.page}&query=${ledgerAccountFilters.query}`;
    const ledgerAccounts = await GetAPI(
      `/ledger-account/fetch/${selectedBranch?.companyId}${filter}`,
      true,
    );
    if (ledgerAccounts.status === 200) {
      setLedgerAccounts(ledgerAccounts.body.ledgerAccounts);
      setLedgerAccountPages(ledgerAccounts.body.pages);
    }
  }

  async function GetResultCenters() {
    const resultCenters = await GetAPI(
      `/result-center/fetch/${selectedBranch?.companyId}`,
      true,
    );
    if (resultCenters.status === 200) {
      setResultCenters(resultCenters.body.resultCenters);
    }
  }

  async function GetSupplierGroups() {
    const supplierGroups = await GetAPI(
      `/supplier-group/fetch/${selectedBranch?.companyId}`,
      true,
    );
    if (supplierGroups.status === 200) {
      setSupplierGroups(supplierGroups.body.supplierGroups);
    }
  }

  async function GetFiscalGroups() {
    const fiscalGroups = await GetAPI(
      `/fiscal-group/fetch/${selectedBranch?.companyId}`,
      true,
    );
    if (fiscalGroups.status === 200) {
      setFiscalGroups(fiscalGroups.body.fiscalGroups);
    }
  }

  async function GetSupplierTypes() {
    const supplierTypes = await GetAPI(
      `/supplier-type/fetch/${selectedBranch?.companyId}`,
      true,
    );
    if (supplierTypes.status === 200) {
      setSupplierTypes(supplierTypes.body.supplierTypes);
    }
  }

  async function GetTributaryRegimes() {
    const tributaryRegimes = await GetAPI("/tributary-regime", true);
    if (tributaryRegimes.status === 200) {
      setTributaryRegimes(tributaryRegimes.body.regimes);
    }
  }

  useEffect(() => {
    if (!selectedBranch) return;
    GetSuppliers();
    GetLedgerAccounts();
    GetResultCenters();
    GetSupplierGroups();
    GetFiscalGroups();
    GetSupplierTypes();
    GetTributaryRegimes();
  }, [selectedBranch]);

  useEffect(() => {
    if (!selectedBranch) return;
    GetLedgerAccounts();
  }, [ledgerAccountFilters]);

  return (
    <FinancialDataContext.Provider
      value={{
        suppliers,
        GetSuppliers,
        ledgerAccounts,
        ledgerAccountFilters,
        setLedgerAccountFilters,
        ledgerAccountPages,
        resultCenters,
        supplierGroups,
        supplierTypes,
        tributaryRegimes,
        fiscalGroups,
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
