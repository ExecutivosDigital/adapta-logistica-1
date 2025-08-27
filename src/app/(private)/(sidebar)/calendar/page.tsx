"use client";
import CalendarApp from "@/components/calendar";
import { useEffect, useState } from "react";
import { ButtonGroup } from "./components/button-group";

export default function Calendar() {
  const [accessLevel, setAccessLevel] = useState("common");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("navigationComplete"));
  }, []);

  return (
    <div className="flex h-full w-full flex-col gap-2 pb-20 lg:gap-4 xl:pb-0">
      <span className="text-lg font-semibold lg:text-xl">
        Agenda de Pagamentos
      </span>
      <div className="grid w-full grid-cols-12 gap-8">
        <div className="col-span-12">
          <ButtonGroup
            accessLevel={accessLevel}
            setAccessLevel={setAccessLevel}
            setFilter={setFilter}
          />
        </div>
        <div className="col-span-12 flex w-full flex-col gap-4">
          <CalendarApp
            accessLevel={accessLevel}
            setAccessLevel={setAccessLevel}
            filter={filter}
          />
        </div>
      </div>
    </div>
  );
}
