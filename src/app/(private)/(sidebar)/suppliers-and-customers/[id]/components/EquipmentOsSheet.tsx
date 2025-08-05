import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ChangeEventHandler, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { Calendar } from "@/components/ui/calendar";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Edit2, Loader2 } from "lucide-react";
import { z } from "zod";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/utils/cn";
import { setHours, setMinutes } from "date-fns";
import CreatableSelect from "react-select/creatable";

interface EditedEventDataProps {
  name: string;
  description: string;
  attendees: string[];
}

const schema = z.object({
  title: z.string().min(3, { message: "Required" }),
  description: z.string().min(3, { message: "Required" }),
  attendees: z.array(z.string()).min(1, { message: "Required" }),
  startDate: z.date(),
  endDate: z.date(),
});

const EquipmentOsSheet = ({
  open,
  onClose,
  selectedDate,
}: {
  open: boolean;
  onClose: () => void;
  selectedDate?: Date | null;
}) => {
  // const [event] = useState<EventDataProps | undefined>();
  const [editedEventData, setEditedEventData] = useState<EditedEventDataProps>({
    name: "",
    description: "",
    attendees: [],
  });

  const [selectedStart, setSelectedStart] = useState<Date | undefined>(
    selectedDate || new Date(),
  );
  const [timeValueStart, setTimeValueStart] = useState<string>(
    selectedDate
      ? selectedDate.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "12:00",
  );

  const [selectedEnd, setSelectedEnd] = useState<Date | undefined>(
    selectedDate
      ? new Date(selectedDate.getTime() + 60 * 60 * 1000)
      : new Date(new Date().getTime() + 60 * 60 * 1000),
  );
  const [timeValueEnd, setTimeValueEnd] = useState<string>(
    selectedDate
      ? new Date(selectedDate.getTime() + 60 * 60 * 1000).toLocaleTimeString(
          "pt-BR",
          {
            hour: "2-digit",
            minute: "2-digit",
          },
        )
      : "13:00",
  );
  const [editable, setEditable] = useState(false);
  const [isEditing] = useState(false);
  const [isStartTimePopoverOpen, setIsStartTimePopoverOpen] = useState(false);
  const [isEndTimePopoverOpen, setIsEndTimePopoverOpen] = useState(false);
  const [isDeleting] = useState(false);
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(schema),
    mode: "all",
  });

  // useEffect(() => {
  //   if (event) {
  //     setEditedEventData({
  //       name: event?.title,
  //       description: event?.description || "",
  //       attendees: event?.attendees
  //         ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //           event?.attendees.map((attendee: any) => attendee?.email)
  //         : [],
  //     });
  //     setSelectedStart(event?.start);
  //     setSelectedEnd(event?.end);
  //     setTimeValueStart(
  //       new Date(event?.start).toLocaleTimeString("pt-BR", {
  //         hour: "2-digit",
  //         minute: "2-digit",
  //       }),
  //     );
  //     setTimeValueEnd(
  //       new Date(event?.end).toLocaleTimeString("pt-BR", {
  //         hour: "2-digit",
  //         minute: "2-digit",
  //       }),
  //     );
  //   }
  // }, [event]);

  const handleTimeChangeStart: ChangeEventHandler<HTMLInputElement> = (e) => {
    const time = e.target.value;
    if (!selectedStart) {
      setTimeValueStart(time);
      return;
    }
    const [hours, minutes] = time.split(":").map((str) => parseInt(str, 10));
    const newSelectedDate = setHours(setMinutes(selectedStart, minutes), hours);
    setSelectedStart(newSelectedDate);
    setTimeValueStart(time);
  };

  const handleDaySelectStart = (date: Date | undefined) => {
    if (!timeValueStart || !date) {
      setSelectedStart(date);
      return;
    }
    const [hours, minutes] = timeValueStart
      .split(":")
      .map((str) => parseInt(str, 10));
    const newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hours,
      minutes,
    );
    setSelectedStart(newDate);
  };

  const handleTimeChangeEnd: ChangeEventHandler<HTMLInputElement> = (e) => {
    const time = e.target.value;
    if (!selectedEnd) {
      setTimeValueEnd(time);
      return;
    }
    const [hours, minutes] = time.split(":").map((str) => parseInt(str, 10));
    const newSelectedDate = setHours(setMinutes(selectedEnd, minutes), hours);
    setSelectedEnd(newSelectedDate);
    setTimeValueEnd(time);
  };

  const handleDaySelectEnd = (date: Date | undefined) => {
    if (!timeValueEnd || !date) {
      setSelectedEnd(date);
      return;
    }
    const [hours, minutes] = timeValueEnd
      .split(":")
      .map((str) => parseInt(str, 10));
    const newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hours,
      minutes,
    );
    setSelectedEnd(newDate);
  };

  return (
    <>
      <Sheet open={open}>
        <SheetContent
          onPointerDownOutside={onClose}
          onClose={onClose}
          className="h-screen px-0"
        >
          <SheetHeader className="flex-row items-center justify-between px-6">
            <SheetTitle>Lorem lipsum</SheetTitle>
            <button
              onClick={() => setEditable(!editable)}
              className={cn(
                "border-default-500 text-primary hover:bg-primary flex cursor-pointer items-center justify-between rounded border p-1 shadow transition duration-100 hover:-translate-y-0.5 hover:text-white",
                editable && "bg-primary -translate-y-0.5 text-white",
              )}
            >
              <Edit2 className="h-4 w-4" />
            </button>
          </SheetHeader>
          <div className="mt-6 h-full">
            <form className="h-full" onSubmit={handleSubmit(console.log)}>
              <div className="h-[calc(100vh-200px)]">
                <ScrollArea className="h-full">
                  <div className="space-y-4 px-6 pb-5">
                    <div className="space-y-1.5">
                      <Label htmlFor="title">
                        Lorem lipsum <span className="font-bold">*</span>
                      </Label>
                      <Input
                        disabled={!editable}
                        id="title"
                        type="text"
                        placeholder="Lorem lipsum"
                        value={editedEventData?.name}
                        onChange={(e) =>
                          setEditedEventData({
                            ...editedEventData,
                            name: e.target.value,
                          })
                        }
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="description">Lorem lipsum</Label>
                      <Input
                        disabled={!editable}
                        id="description"
                        type="text"
                        placeholder="Lorem lipsum"
                        value={editedEventData?.description}
                        onChange={(e) =>
                          setEditedEventData({
                            ...editedEventData,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <Label htmlFor="startDate" className="mb-1.5">
                        Lorem lipsum <span className="font-bold">*</span>
                      </Label>
                      <Popover
                        open={isStartTimePopoverOpen}
                        onOpenChange={() =>
                          setIsStartTimePopoverOpen(!isStartTimePopoverOpen)
                        }
                      >
                        <PopoverTrigger asChild>
                          <Button
                            disabled={!editable}
                            variant="outline"
                            className="border-default-200 text-default-600 w-full justify-between text-left font-normal"
                          >
                            Lorem lipsum
                            {/* {selectedStart
                              ? new Date(selectedStart).toLocaleDateString(
                                  "pt-BR",
                                  {
                                    month: "numeric",
                                    day: "numeric",
                                  },
                                )
                              : ""}
                            {""} - {timeValueStart}h */}
                            <CalendarIcon className="h-4 w-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="z-[99999] w-auto p-0">
                          <Controller
                            name="startDate"
                            control={control}
                            render={() => (
                              <Calendar
                                mode="single"
                                selected={selectedStart}
                                onSelect={(e) => {
                                  handleDaySelectStart(e);
                                  setIsStartTimePopoverOpen(false);
                                }}
                              />
                            )}
                          />
                          <div className="bg-primary/10 flex w-full items-center justify-between p-2 font-semibold">
                            <span>Hora: </span>
                            <input
                              type="time"
                              value={timeValueStart}
                              onChange={handleTimeChangeStart}
                              step="60"
                              className="focus:border-primary focus:outline-primary focus:ring-primary bg-transparent"
                            />
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div>
                      <Label htmlFor="endDate" className="mb-1.5">
                        Lorem lipsum
                        <span className="font-bold">*</span>
                      </Label>
                      <Popover
                        open={isEndTimePopoverOpen}
                        onOpenChange={() =>
                          setIsEndTimePopoverOpen(!isEndTimePopoverOpen)
                        }
                      >
                        <PopoverTrigger asChild>
                          <Button
                            disabled={!editable}
                            variant="outline"
                            className="border-default-200 text-default-600 w-full justify-between text-left font-normal"
                          >
                            Lorem lipsum
                            {/* {selectedEnd
                              ? new Date(selectedEnd).toLocaleDateString(
                                  "pt-BR",
                                  {
                                    month: "numeric",
                                    day: "numeric",
                                  },
                                )
                              : ""}
                            {""} - {timeValueEnd}h */}
                            <CalendarIcon className="h-4 w-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="z-[99999] w-auto p-0">
                          <Controller
                            name="endDate"
                            control={control}
                            render={() => (
                              <Calendar
                                mode="single"
                                selected={selectedEnd}
                                onSelect={(e) => {
                                  handleDaySelectEnd(e);
                                  setIsEndTimePopoverOpen(false);
                                }}
                              />
                            )}
                          />
                          <div className="bg-primary/10 flex w-full items-center justify-between p-2 font-semibold">
                            <span>Hora: </span>
                            <input
                              type="time"
                              value={timeValueEnd}
                              onChange={handleTimeChangeEnd}
                              step="60"
                              className="focus:border-primary focus:outline-primary focus:ring-primary bg-transparent"
                            />
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div>
                      <Label htmlFor="endDate" className="mb-1.5">
                        Lorem lipsum
                      </Label>
                      <CreatableSelect
                        components={{
                          DropdownIndicator: null,
                        }}
                        isDisabled={!editable}
                        className="w-full"
                        isMulti
                        placeholder="Lorem lipsum"
                        value={editedEventData.attendees?.map(
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          (event: any) => ({
                            value: event,
                            label: event,
                          }),
                        )}
                        onChange={(e) =>
                          setEditedEventData({
                            ...editedEventData,
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            attendees: e.map((event: any) => event.value),
                          })
                        }
                        noOptionsMessage={() => "Lorem lipsum"}
                      />
                    </div>
                  </div>
                </ScrollArea>
              </div>
              <div className="flex flex-wrap gap-2 px-6 pb-12">
                <Button variant="outline">
                  {isDeleting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Excluindo...
                    </>
                  ) : (
                    "Excluir Ordem de Serviço"
                  )}
                </Button>
                <Button disabled={isEditing} type="submit" className="flex-1">
                  {isEditing ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Editando...
                    </>
                  ) : (
                    "Editar Ordem de Serviço"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default EquipmentOsSheet;
