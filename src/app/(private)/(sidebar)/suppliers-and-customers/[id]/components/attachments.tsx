"use client";
import { CustomPagination } from "@/components/ui/custom-pagination";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SimpleDatePicker } from "@/components/ui/simple-date-picker";
import { getLocalTimeZone } from "@internationalized/date";
import { ChevronRight, File } from "lucide-react";
import { useState } from "react";
import { DateValue } from "react-aria-components";
import EquipmentAttachmentModal from "./EquipmentAttachmentModal";

export function Attachments() {
  const [equipmentPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [openEquipmentAttachmentModal, setOpenEquipmentAttachmentModal] =
    useState<boolean>(false);
  const [date, setDate] = useState<Date | null>(new Date());
  const handleDateChange = (value: DateValue | null) => {
    if (!value) {
      setDate(null);
      return;
    }

    // CalendarDate, ZonedDateTime e afins expõem .toDate()
    if ("toDate" in value) {
      setDate(value.toDate(getLocalTimeZone())); // <-- ✅ sem salto!
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } else if (value !== null && (value as any) instanceof Date) setDate(value);
  };
  return (
    <>
      <div className="border-primary w-full overflow-hidden rounded-2xl border">
        <div className="flex w-full items-center justify-between p-2 xl:p-4">
          <span className="text-sm font-semibold xl:text-xl">
            Documentos Financeiros
          </span>
          <div className="self-star flex items-center gap-2 rounded-lg border border-zinc-400 p-2 text-black">
            <div className="">
              <SimpleDatePicker
                value={date}
                label="Ano Atual"
                view="day"
                onChange={handleDateChange}
              />
            </div>
          </div>
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
