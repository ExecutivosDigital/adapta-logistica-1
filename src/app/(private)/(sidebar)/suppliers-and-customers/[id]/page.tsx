"use client";

import { Attachments } from "./components/attachments";
import { Gallery } from "./components/gallery";
import { Header } from "./components/header";
import { Kpis } from "./components/kpis";
import { SuppliersAndCustomersTable } from "./components/os-table";

export default function Home2() {
  return (
    <div className="flex h-full w-full flex-col">
      <span className="text-lg font-semibold lg:text-xl">
        Bem vindo Geovane
      </span>
      <div className="grid w-full grid-cols-12 gap-8">
        <div className="col-span-12">
          <div className={`col-span-12`}>
            <div className="flex h-full w-full flex-1 flex-col gap-6 overflow-hidden">
              <Header />
              <Kpis />
              <SuppliersAndCustomersTable />
              <div className="flex w-full flex-col items-center justify-between gap-2 p-2 xl:flex-row xl:gap-4 xl:p-4">
                <Attachments />
                <Gallery />
              </div>
            </div>
          </div>
        </div>

        <div className={`col-span-12`}></div>
      </div>
    </div>
  );
}
