"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

interface SidebarContextValue {
  isOpenMobile: boolean;
  isCollapsed: boolean;
  openMobile: () => void;
  closeMobile: () => void;
  toggleCollapse: () => void;
}

const SidebarContext = createContext<SidebarContextValue | undefined>(
  undefined,
);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isOpenMobile, setOpenMobile] = useState(false);
  const [isCollapsed, setCollapsed] = useState(false);

  const openMobile = useCallback(() => setOpenMobile(true), []);
  const closeMobile = useCallback(() => setOpenMobile(false), []);
  const toggleCollapse = useCallback(() => setCollapsed((prev) => !prev), []);

  const value: SidebarContextValue = {
    isOpenMobile,
    isCollapsed,
    openMobile,
    closeMobile,
    toggleCollapse,
  };

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
}

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar deve estar dentro de SidebarProvider");
  return ctx;
}
