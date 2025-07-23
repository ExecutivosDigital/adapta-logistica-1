"use client";

import { DateValue } from "@internationalized/date";
import { Check, X } from "lucide-react";
import moment from "moment";
import "moment/locale/pt-br";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Button } from "../ui/button";
import { DatePicker } from "../ui/date-picker";
import { Modal } from "../ui/Modal";
import Events from "./EventData";
import CustomToolbar from "./toolbar";

moment.locale("pt-br");
const localizer = momentLocalizer(moment);

type EvType = {
  title: string;
  name?: string;
  allDay?: boolean;
  start?: Date;
  end?: Date;
  color?: string;
};

interface CalendarSlotInfo {
  start: Date;
  end: Date;
  title: string;
  slots: Date[];
  action: "select" | "click" | "doubleClick";
}

const CalendarApp = () => {
  const router = useRouter();
  const [calevents, setCalEvents] = useState<EvType[]>(Events);
  const [open, setOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [slot, setSlot] = useState<CalendarSlotInfo | null>(null);
  const [start, setStart] = useState<Date | null>(null);
  const [end, setEnd] = useState<Date | null>(null);
  const [color, setColor] = useState<string>("primary");
  const [update, setUpdate] = useState<EvType | null>(null);

  const ColorVariation = [
    { id: 1, eColor: "primary", value: "primary" },
    { id: 2, eColor: "green-500", value: "green" },
    { id: 3, eColor: "red-500", value: "red" },
    { id: 4, eColor: "yellow-200", value: "default" },
    { id: 5, eColor: "fuchsia-700", value: "cyan-200" },
  ];

  const addNewEventAlert = (slotInfo: CalendarSlotInfo) => {
    setOpen(true);
    setSlot(slotInfo);
    setStart(slotInfo.start);
    setEnd(slotInfo.end);
  };

  // const editEvent = (event: EvType) => {
  //   setOpen(true);
  //   const newEditEvent = calevents.find((elem) => elem.title === event.title);
  //   if (!newEditEvent) return;

  //   setTitle(newEditEvent.title);
  //   setColor(newEditEvent.color || "primary");
  //   setStart(newEditEvent.start || null);
  //   setEnd(newEditEvent.end || null);
  //   setUpdate(event);
  // };

  const updateEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCalEvents((prev) =>
      prev.map((elem) =>
        elem.title === update?.title
          ? {
              ...elem,
              title,
              start: start ?? undefined,
              end: end ?? undefined,
              color,
            }
          : elem,
      ),
    );
    setOpen(false);
    setTitle("");
    setColor("");
    setStart(null);
    setEnd(null);
    setUpdate(null);
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);

  const selectinputChangeHandler = (id: string) => setColor(id);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newEvent: EvType = {
      title,
      start: start ?? undefined,
      end: end ?? undefined,
      color,
    };
    setCalEvents([...calevents, newEvent]);
    setOpen(false);
    setTitle("");
    setStart(null);
    setEnd(null);
  };

  const handleClose = () => {
    setOpen(false);
    setTitle("");
    setStart(null);
    setEnd(null);
    setUpdate(null);
  };

  const eventColors = (event: EvType) => {
    return {
      className: `event-${event.color ?? "default"}`,
    };
  };

  const handleStartChange = (newValue: DateValue | null) => {
    if (newValue) {
      setStart(new Date(newValue.toString()));
    }
  };

  const handleEndChange = (newValue: DateValue | null) => {
    if (newValue) {
      setEnd(new Date(newValue.toString()));
    }
  };

  return (
    <div className="flex h-full w-full">
      <div className="flex w-full">
        <Calendar
          selectable
          events={calevents.map((evt: EvType) => ({
            ...evt,
            title: evt.name || evt.title, // add a default value if evt.name is undefined
            start: evt.start ? new Date(evt.start) : undefined,
            end: evt.end ? new Date(evt.end) : undefined,
          }))}
          defaultView="month"
          scrollToTime={new Date(1970, 1, 1, 6)}
          defaultDate={new Date()}
          localizer={localizer}
          components={{
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            toolbar: (props: any) => (
              <CustomToolbar {...props} addNewEvent={() => setOpen(true)} />
            ),
          }}
          // onSelectEvent={(event: EvType) => editEvent(event)}
          onSelectEvent={() => router.push("/purchase-approval/1")}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onSelectSlot={(slotInfo: any) => addNewEventAlert(slotInfo)}
          eventPropGetter={(event: EvType) => eventColors(event)}
          className="min-h-[600px] w-full text-black xl:min-h-[900px]"
          culture="pt-BR"
          messages={{
            noEventsInRange: "Nenhuma atividade encontrada.",
          }}
        />
      </div>
      <Modal
        show={open}
        onHide={() => setOpen(false)}
        className="border-zinc-400 bg-white p-0"
      >
        <div className="flex items-center justify-center self-center">
          <div className="self-center">
            <form onSubmit={update ? updateEvent : submitHandler}>
              <div className="flex flex-col gap-1 border-b px-6 py-4">
                <div className="flex w-full items-center justify-between">
                  <h3 className="text-text-100 text-xl font-semibold">
                    {update ? "Atualizar Event" : "Adicionar Evento"}
                  </h3>
                  <X
                    onClick={handleClose}
                    className="text-text-100 cursor-pointer"
                  />
                </div>
                <p className="text-text-100 mt-1 text-sm font-normal">
                  {!update
                    ? "Para adicionar um evento, por favor preencha o t tulo e escolha a cor do evento e pressione o bot o adicionar"
                    : "Para editar/atualizar um evento, por favor altere o t tulo e escolha a cor do evento e pressione o bot o atualizar"}
                  {slot?.title}
                </p>
              </div>
              <div className="flex flex-col gap-3 px-6 py-4 text-start">
                <div>
                  <div className="mb-2 block">
                    <label className="text-text-100" htmlFor="StartDate">
                      Título da atividade
                    </label>
                  </div>
                  <input
                    value={title}
                    className="h-8 w-full rounded border border-zinc-500 p-2"
                    onChange={inputChangeHandler}
                  />
                </div>
                <div className="text-start">
                  <div className="flex w-full">
                    <DatePicker
                      value={start}
                      label="Data Inicial"
                      onChange={handleStartChange}
                    />
                  </div>
                </div>

                <div className="flex w-full flex-col gap-4 text-start">
                  <DatePicker
                    value={end}
                    label="Data Final"
                    onChange={handleEndChange}
                  />
                </div>

                <div className="pt-4">
                  <h6 className="text-text-50 text-base">
                    Escolha a cor da marcação
                  </h6>
                  <div className="mt-2 flex items-center gap-2">
                    {ColorVariation.map((mcolor) => {
                      return (
                        <div
                          className={`flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-fuchsia-700 bg-${mcolor.eColor}`}
                          key={mcolor.id}
                          onClick={() => selectinputChangeHandler(mcolor.value)}
                        >
                          {mcolor.value === color ? (
                            <Check width="16" className="text-white" />
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="flex w-full flex-col items-center gap-2 border-t py-4 text-white md:flex-row md:justify-center">
                <div className="flex items-center gap-2">
                  <Button className="text-white" onClick={handleClose}>
                    Fechar
                  </Button>
                </div>
                <Button className="text-white" type="submit" disabled={!title}>
                  {update ? "Editar evento" : "Adicionar evento"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CalendarApp;
