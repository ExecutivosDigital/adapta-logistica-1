"use client";
import { useState } from "react";
import { Home2ButtonGroup } from "./components/button-group";
import { CarrierTable } from "./components/carrier";
import { DriverTable } from "./components/driver";
import { SupplierTable } from "./components/supplier";
import { ClientsTable } from "./components/transactions";

export default function Home2() {
  const [selectedToolType, setSelectedToolType] = useState(0);

  return (
    <div className="flex h-full w-full flex-col pb-20 xl:pb-0">
      <span className="text-lg font-semibold lg:text-xl">
        Bem vindo Geovane
      </span>
      <div className="grid w-full grid-cols-12 gap-8">
        <div className="col-span-12">
          <Home2ButtonGroup
            selectedToolType={selectedToolType}
            setSelectedToolType={setSelectedToolType}
          />
        </div>

        <div className={`col-span-12`}>
          {selectedToolType === 0 ? (
            <ClientsTable />
          ) : selectedToolType === 1 ? (
            <SupplierTable />
          ) : selectedToolType === 2 ? (
            <DriverTable />
          ) : (
            selectedToolType === 3 && <CarrierTable />
          )}
        </div>
      </div>
    </div>
  );
}
