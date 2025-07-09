"use client";
import { useState } from "react";
import { Home2ButtonGroup } from "./components/button-group";
import { Header } from "./components/Header";
import { SupplierTable } from "./components/supplier";
import { ClientsTable } from "./components/transactions";

export default function Home2() {
  const [selectedToolType, setSelectedToolType] = useState(0);

  return (
    <div className="flex h-full w-full flex-col">
      <span className="text-lg font-semibold lg:text-xl">
        Bem vindo Geovane
      </span>
      <div className="grid w-full grid-cols-12 gap-8">
        <div className="col-span-12">
          <Home2ButtonGroup />
        </div>

        <div className="col-span-12">
          <Header
            selectedToolType={selectedToolType}
            setSelectedToolType={setSelectedToolType}
          />
        </div>

        <div className={`col-span-12`}>
          {selectedToolType === 0 ? <ClientsTable /> : <SupplierTable />}
        </div>
      </div>
    </div>
  );
}
