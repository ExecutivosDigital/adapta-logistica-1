"use client";

import { BranchProps, BusinessUnitProps } from "@/@types/branches";
import { useCookies } from "next-client-cookies";
import { createContext, useContext, useEffect, useState } from "react";
import { useApiContext } from "./ApiContext";

export const BranchContext = createContext<{
  branches: BranchProps[];
  selectedBranch: BranchProps | null;
  setSelectedBranch: React.Dispatch<React.SetStateAction<BranchProps | null>>;
  businessUnits: BusinessUnitProps[];
  selectedBusinessUnit: BusinessUnitProps | null;
  setSelectedBusinessUnit: React.Dispatch<
    React.SetStateAction<BusinessUnitProps | null>
  >;
} | null>(null);

export const BranchProvider = ({ children }: { children: React.ReactNode }) => {
  const cookies = useCookies();
  const { GetAPI } = useApiContext();
  const [branches, setBranches] = useState<BranchProps[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<BranchProps | null>(
    null,
  );
  const [businessUnits, setBusinessUnits] = useState<BusinessUnitProps[]>([]);
  const [selectedBusinessUnit, setSelectedBusinessUnit] =
    useState<BusinessUnitProps | null>(null);

  async function GetBranches() {
    const branches = await GetAPI("/subsidiary", true);
    if (branches.status === 200) {
      setBranches(branches.body.subsidiaries);
      if (cookies.get("selectedBranch") === undefined) {
        {
          cookies.set("selectedBranch", branches.body.subsidiaries[0].id);
          setSelectedBranch(branches.body.subsidiaries[0]);
        }
      }
    }
  }

  async function GetBusinessUnits(id: string) {
    const businessUnits = await GetAPI(`/business-unit/fetch/${id}`, true);
    if (businessUnits.status === 200) {
      setBusinessUnits(businessUnits.body.businessUnits);
      if (cookies.get("selectedBusinessUnit") === undefined) {
        {
          cookies.set(
            "selectedBusinessUnit",
            businessUnits.body.businessUnits[0].id,
          );
          setSelectedBusinessUnit(businessUnits.body.businessUnits[0]);
        }
      }
    }
  }

  useEffect(() => {
    GetBranches();
  }, []);

  useEffect(() => {
    if (branches.length !== 0) {
      if (cookies.get("selectedBranch") !== undefined) {
        setSelectedBranch(
          branches.find(
            (branch) => branch.id === cookies.get("selectedBranch"),
          ) as BranchProps,
        );
      }
    }
  }, [
    branches,
    cookies.get("selectedBranch") ? cookies.get("selectedBranch") : null,
  ]);

  useEffect(() => {
    if (businessUnits.length !== 0) {
      if (cookies.get("selectedBusinessUnit") !== undefined) {
        setSelectedBusinessUnit(
          businessUnits.find(
            (businessUnit) =>
              businessUnit.id === cookies.get("selectedBusinessUnit"),
          ) as BusinessUnitProps,
        );
      }
    }
  }, [
    businessUnits,
    cookies.get("selectedBusinessUnit")
      ? cookies.get("selectedBusinessUnit")
      : null,
  ]);

  useEffect(() => {
    if (branches.length !== 0) {
      if (selectedBranch) {
        GetBusinessUnits(selectedBranch.id);
      } else {
        GetBusinessUnits(branches[0].id);
      }
    }
  }, [branches, selectedBranch]);

  return (
    <BranchContext.Provider
      value={{
        branches,
        selectedBranch,
        setSelectedBranch,
        businessUnits,
        selectedBusinessUnit,
        setSelectedBusinessUnit,
      }}
    >
      {children}
    </BranchContext.Provider>
  );
};
export const useBranch = () => {
  const ctx = useContext(BranchContext);
  if (!ctx) throw new Error("useBranch must be used within a BranchProvider");
  return ctx;
};
