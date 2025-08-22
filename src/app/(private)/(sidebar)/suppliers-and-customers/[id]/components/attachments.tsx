"use client";
import { Calendar } from "@/components/ui/calendar";
import { CustomPagination } from "@/components/ui/custom-pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/utils/cn";
import { ChevronRight, File } from "lucide-react";
import moment from "moment";
import { useState } from "react";
import { DateRange, SelectRangeEventHandler } from "react-day-picker";
import EquipmentAttachmentModal from "./EquipmentAttachmentModal";

export function Attachments() {
  const [equipmentPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [openEquipmentAttachmentModal, setOpenEquipmentAttachmentModal] =
    useState<boolean>(false);
  const [dateRange, setDateRange] = useState({
    from: moment().subtract(1, "month").toDate(),
    to: moment().toDate(),
  });

  const handleSelect: SelectRangeEventHandler = (
    range: DateRange | undefined,
  ) => {
    if (range && range.from && range.to) {
      setDateRange({ from: range.from, to: range.to });
    } else {
      setDateRange({ from: new Date(), to: new Date() }); // or handle undefined case as needed
    }
  };

  return (
    <>
      <div className="border-primary w-full overflow-hidden rounded-2xl border">
        <div className="flex w-full items-center justify-between p-2 xl:p-4">
          <span className="text-sm font-semibold xl:text-xl">
            Documentos Financeiros
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="cursor-pointer rounded-md border border-zinc-200 px-2 py-1 text-zinc-400">
                {moment(dateRange.from).format("DD/MM/YYYY")} -{" "}
                {moment(dateRange.to).format("DD/MM/YYYY")}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="left" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                classNames={{
                  day_range_middle: cn("bg-zinc-400", "hover:bg-zinc-500"),
                }}
                onSelect={handleSelect}
              />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex h-96 w-full flex-col">
          <ScrollArea className="h-80 w-full">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                onClick={() => setOpenEquipmentAttachmentModal(true)}
                className="hover:bg-primary/20 group flex w-full cursor-pointer items-center justify-between border-b px-2 py-1 transition duration-200 xl:px-4 xl:py-2"
              >
                <div className="flex items-center gap-2">
                  <div className="bg-primary/20 flex h-10 min-h-10 w-10 min-w-10 items-center justify-center rounded-md">
                    <File className="h-6 w-6" />
                  </div>
                  <div className="flex flex-col text-xs xl:text-sm">
                    <span className="font-bold">
                      Lorem Ipsum is simply dummy text
                    </span>
                    <span>{new Date().toLocaleDateString("pt-BR")}</span>
                  </div>
                </div>
                <div className="group-hover:text-primary flex w-max items-center gap-1 text-zinc-500">
                  <span className="w-max text-xs font-semibold transition duration-200 group-hover:underline xl:text-sm">
                    Acesse Aqui
                  </span>
                  <ChevronRight className="w-4" />
                </div>
              </div>
            ))}
          </ScrollArea>
          <div className="flex h-16 w-full items-center justify-center">
            <CustomPagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              pages={equipmentPages}
            />
          </div>
        </div>
      </div>
      {openEquipmentAttachmentModal && (
        <EquipmentAttachmentModal
          open={openEquipmentAttachmentModal}
          onClose={() => setOpenEquipmentAttachmentModal(false)}
        />
      )}
    </>
  );
}
