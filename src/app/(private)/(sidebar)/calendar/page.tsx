"use client";
import CalendarApp from "@/components/calendar";
import { useState } from "react";
import { ButtonGroup } from "./components/button-group";

export default function Calendar() {
  const [accessLevel, setAccessLevel] = useState("common");

  return (
    <div className="flex h-full w-full flex-col gap-2 lg:gap-4">
      <span className="text-lg font-semibold lg:text-xl">
        genda de Pagamentos
      </span>
      <div className="grid w-full grid-cols-12 gap-8">
        <div className="col-span-12">
          <ButtonGroup
            accessLevel={accessLevel}
            setAccessLevel={setAccessLevel}
          />
        </div>
        <div className="col-span-12 flex w-full flex-col gap-4">
          <CalendarApp
            accessLevel={accessLevel}
            setAccessLevel={setAccessLevel}
          />
        </div>
      </div>
    </div>
  );
}
