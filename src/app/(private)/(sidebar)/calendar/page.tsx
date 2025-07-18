import CalendarApp from "@/components/calendar";
import { ButtonGroup } from "./components/button-group";

export default function Calendar() {
  return (
    <div className="flex h-full w-full flex-col gap-2 lg:gap-4">
      <span className="text-lg font-semibold lg:text-xl">
        Aprovação de Compras
      </span>
      <div className="grid w-full grid-cols-12 gap-8">
        <div className="col-span-12">
          <ButtonGroup />
        </div>
        <div className="col-span-12 flex w-full flex-col gap-4">
          <CalendarApp />
        </div>
      </div>
    </div>
  );
}
