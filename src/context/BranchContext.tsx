"use client";

import { Branch, branches } from "@/mock/branches";
import { createContext, useContext, useState } from "react";

export const BranchContext = createContext<{
  selectedBranch: Branch | null;
  setSelectedBranch: React.Dispatch<React.SetStateAction<Branch | null>>;
} | null>(null);

export const BranchProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(
    branches[0],
  );

  return (
    <BranchContext.Provider value={{ selectedBranch, setSelectedBranch }}>
      {children}
    </BranchContext.Provider>
  );
};
export const useBranch = () => {
  const ctx = useContext(BranchContext);
  if (!ctx) throw new Error("useBranch must be used within a BranchProvider");
  return ctx;
};
