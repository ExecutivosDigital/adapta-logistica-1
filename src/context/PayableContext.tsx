"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useApiContext } from "./ApiContext";
import { useBranch } from "./BranchContext";

export interface PayableTransactionProps {
  approvedById: string | null;
  bankAccount: {
    id: string;
    name: string;
  } | null;
  documentNumber: string | null;
  documents: {
    comments: string | null;
    documentNumber: string;
    documentUrl: string | null;
    dueDate: string;
    id: string;
    payableTransactionId: string;
    supplierId: string;
    value: number;
  }[];
  dueDate: string;
  id: string;
  payable: {
    dueDate: string;
    id: string;
    installmentCount: number;
    isTotalValue: boolean;
    ledgerAccount: {
      code: string;
      companyId: string;
      entryType: {
        code: number;
        companyId: string;
        id: string;
        name: string;
      };
      id: string;
      level: number;
      name: string;
      normalizedCode: string;
      parentLedgerAccount: {
        code: string;
        companyId: string;
        entryTypeId: string | null;
        id: string;
        level: number;
        name: string;
        normalizedCode: string;
        parentledgerAccountId: string | null;
        resultCenterId: string | null;
        type: string;
      };
      resultCenter: {
        code: number;
        companyId: string;
        id: string;
        name: string;
      };
      type: string;
    };
    mainDocumentUrl: string | null;
    paymentMode: string;
    referenceMonth: number;
    status: string;
    supplier: {
      address: string;
      city: string;
      cnpj: string;
      code: number;
      companyId: string;
      complement: string;
      createdAt: string;
      emails: string[];
      fiscalGroupId: string;
      id: string;
      latitude: number;
      ledgerAccountId: string;
      longitude: number;
      mobilePhone: string;
      municipalRegistration: string;
      name: string;
      neighborhood: string;
      number: string;
      paymentAccount: string;
      paymentAccountOwner: string;
      paymentAccountOwnerDocument: string;
      paymentAgency: string;
      paymentBank: string;
      phone: string;
      postalCode: string;
      resultCenterId: string;
      state: string;
      stateRegistration: string;
      suframa: string;
      supplierGroupId: string;
      supplierTypeId: string;
      tributaryRegimeId: string;
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

export interface PayableProps {
  dueDate: string;
  id: string;
  installmentCount: number;
  isTotalValue: boolean;
  ledgerAccount: {
    code: string;
    companyId: string;
    entryType: {
      code: number;
      companyId: string;
      id: string;
      name: string;
    };
    id: string;
    level: number;
    name: string;
    normalizedCode: string;
    parentLedgerAccountId: string;
    resultCenter: {
      code: number;
      companyId: string;
      id: string;
      name: string;
    };
    type: string;
  };
  mainDocumentUrl: string;
  paymentMode: string;
  referenceMonth: number;
  status: string;
  supplier: {
    address: string;
    city: string;
    cnpj: string;
    code: string;
    companyId: string;
    complement: string;
    createdAt: string;
    emails: string[];
    fiscalGroupId: string;
    id: string;
    latitude: number;
    ledgerAccountId: string;
    longitude: number;
    mobilePhone: string;
    municipalRegistration: string;
    name: string;
    neighborhood: string;
    number: string;
    paymentAccount: string;
    paymentAccountOwner: string;
    paymentAccountOwnerDocument: string;
    paymentAgency: string;
    paymentBank: string;
    phone: string;
    postalCode: string;
    resultCenterId: string;
    state: string;
    stateRegistration: string;
    suframa: string;
    supplierGroupId: string;
    supplierTypeId: string;
    tributaryRegimeId: string;
  };
  transactions: {
    approvedById: string | null;
    bankAccount: {
      id: string;
      name: string;
    } | null;
    documents: {
      comments: string | null;
      documentNumber: string;
      documentUrl: string | null;
      dueDate: string;
      id: string;
      payableTransactionId: string;
      supplierId: string;
      value: number;
    }[];
    dueDate: string;
    id: string;
    paymentType: string;
    position: number;
    receiptUrl: string | null;
    status: string;
    value: number;
  }[];
  type: string;
  value: number;
}

interface PayableContextProps {
  payableList: PayableProps[];
  setPayableList: React.Dispatch<React.SetStateAction<PayableProps[]>>;
  payablePages: number;
  setPayablePages: React.Dispatch<React.SetStateAction<number>>;
  selectedPayablePage: number;
  setSelectedPayablePage: React.Dispatch<React.SetStateAction<number>>;
  isGettingPayables: boolean;
  payableQuery: string;
  setPayableQuery: React.Dispatch<React.SetStateAction<string>>;
  payableTransactionList: PayableTransactionProps[];
  setPayableTransactionList: React.Dispatch<
    React.SetStateAction<PayableTransactionProps[]>
  >;
  payableTransactionPages: number;
  setPayableTransactionPages: React.Dispatch<React.SetStateAction<number>>;
  selectedPayableTransactionPage: number;
  setSelectedPayableTransactionPage: React.Dispatch<
    React.SetStateAction<number>
  >;
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
  const [payablePages, setPayablePages] = useState(1);
  const [selectedPayablePage, setSelectedPayablePage] = useState(1);
  const [isGettingPayables, setIsGettingPayables] = useState(true);
  const [payableQuery, setPayableQuery] = useState<string>("");
  const [payableTransactionList, setPayableTransactionList] = useState<
    PayableTransactionProps[]
  >([]);
  const [payableTransactionPages, setPayableTransactionPages] = useState(1);
  const [selectedPayableTransactionPage, setSelectedPayableTransactionPage] =
    useState(1);

  async function GetPayables() {
    setIsGettingPayables(true);
    const payables = await GetAPI(
      `/payable?companyId=${selectedBranch?.companyId}&page=${selectedPayablePage}`,
      true,
    );
    if (payables.status === 200) {
      setPayableList(payables.body.payables);
      setPayablePages(payables.body.total);
      return setIsGettingPayables(false);
    }
    return setIsGettingPayables(false);
  }

  async function GetPayableTransactions() {
    const transactions = await GetAPI(
      `/payable-transaction?companyId=${selectedBranch?.companyId}&page=${selectedPayableTransactionPage}`,
      true,
    );
    console.log("transactions", transactions);
    if (transactions.status === 200) {
      setPayableTransactionList(transactions.body.payableTransactions);
      setPayableTransactionPages(transactions.body.total);
    }
  }

  useEffect(() => {
    if (selectedBranch !== null) {
      GetPayables();
    }
  }, [selectedBranch, selectedPayablePage]);

  useEffect(() => {
    if (selectedBranch !== null) {
      GetPayableTransactions();
    }
  }, [selectedBranch, selectedPayableTransactionPage]);

  return (
    <PayableContext.Provider
      value={{
        payableList,
        setPayableList,
        payablePages,
        setPayablePages,
        selectedPayablePage,
        setSelectedPayablePage,
        isGettingPayables,
        payableQuery,
        setPayableQuery,
        payableTransactionList,
        setPayableTransactionList,
        payableTransactionPages,
        setPayableTransactionPages,
        selectedPayableTransactionPage,
        setSelectedPayableTransactionPage,
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
