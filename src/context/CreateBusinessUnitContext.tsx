"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

interface CreateBusinessUnitContextValue {
  isOpenCreateBusinessUnitModal: boolean;
  openCreateBusinessUnitModal: () => void;
  closeCreateBusinessUnitModal: () => void;
}

const CreateBusinessUnitContext = createContext<
  CreateBusinessUnitContextValue | undefined
>(undefined);

export function CreateBusinessUnitProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isOpenCreateBusinessUnitModal, setIsOpenCreateBusinessUnitModal] =
    useState(false);

  const openCreateBusinessUnitModal = useCallback(
    () => setIsOpenCreateBusinessUnitModal(true),
    [],
  );
  const closeCreateBusinessUnitModal = useCallback(
    () => setIsOpenCreateBusinessUnitModal(false),
    [],
  );
  const value: CreateBusinessUnitContextValue = {
    isOpenCreateBusinessUnitModal,
    openCreateBusinessUnitModal,
    closeCreateBusinessUnitModal,
  };

  return (
    <CreateBusinessUnitContext.Provider value={value}>
      {children}
    </CreateBusinessUnitContext.Provider>
  );
}

export function useCreateBusinessUnit() {
  const ctx = useContext(CreateBusinessUnitContext);
  if (!ctx)
    throw new Error(
      "useCreateBusinessUnit must be used within a CreateBusinessUnitProvider",
    );
  return ctx;
}
