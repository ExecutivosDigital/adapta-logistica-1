"use client";

import { Modal, ModalBody } from "flowbite-react";
import { X } from "lucide-react";
import moment from "moment";
import "moment/locale/pt-br";
import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Button } from "../ui/button";
import Events from "./EventData";
import CustomToolbar from "./toolbar";
moment.locale("pt-br");
const localizer = momentLocalizer(moment);

type EvType = {
  title: string;
  allDay?: boolean;
  start?: Date;
  end?: Date;
  color?: string;
};

const CalendarApp = () => {
  const [calevents, setCalEvents] = React.useState<any>(Events);
  const [open, setOpen] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState<string>("");
  const [slot, setSlot] = React.useState<EvType>();
  const [start, setStart] = React.useState<any | null>();
  const [end, setEnd] = React.useState<any | null>();
  const [color, setColor] = React.useState<string>("primary");
  const [update, setUpdate] = React.useState<EvType | undefined | any>();

  const ColorVariation = [
    {
      id: 1,
      eColor: "primary",
      value: "primary",
    },
    {
      id: 2,
      eColor: "success",
      value: "green",
    },
    {
      id: 3,
      eColor: "error",
      value: "red",
    },
    {
      id: 4,
      eColor: "secondary",
      value: "default",
    },
    {
      id: 5,
      eColor: "warning",
      value: "warning",
    },
  ];
  const addNewEventAlert = (slotInfo: EvType) => {
    setOpen(true);
    setSlot(slotInfo);
    setStart(slotInfo.start);
    setEnd(slotInfo.end);
  };

  const editEvent = (event: any) => {
    setOpen(true);
    const newEditEvent = calevents.find(
      (elem: EvType) => elem.title === event.title,
    );
    setColor(event.color);
    setTitle(newEditEvent.title);
    setColor(newEditEvent.color);
    setStart(newEditEvent.start);
    setEnd(newEditEvent.end);
    setUpdate(event);
  };

  const updateEvent = (e: any) => {
    e.preventDefault();
    setCalEvents(
      calevents.map((elem: EvType) => {
        if (elem.title === update.title) {
          return { ...elem, title, start, end, color };
        }

        return elem;
      }),
    );
    setOpen(false);
    setTitle("");
    setColor("");
    setStart("");
    setEnd("");
    setUpdate(null);
  };
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const selectinputChangeHandler = (id: string) => setColor(id);

  const submitHandler = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    const newEvents = calevents;
    newEvents.push({
      title,
      start,
      end,
      color,
    });
    setOpen(false);
    e.target.reset();
    setCalEvents(newEvents);
    setTitle("");
    setStart(new Date());
    setEnd(new Date());
  };

  const handleClose = () => {
    setOpen(false);
    setTitle("");
    setStart(new Date());
    setEnd(new Date());
    setUpdate(null);
  };

  const eventColors = (event: EvType) => {
    if (event.color) {
      return { className: `event-${event.color}` };
    }

    return { className: `event-default` };
  };

  const handleStartChange = (newValue: any) => {
    setStart(newValue);
  };
  const handleEndChange = (newValue: any) => {
    setEnd(newValue);
  };
  return (
    <div className="flex h-full w-full">
      <div className="flex w-full">
        <Calendar
          selectable
          events={calevents.map((evt) => ({
            ...evt,
            title: evt.name,
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
          onSelectEvent={(event: EvType) => editEvent(event)}
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
        size="sm"
        show={open}
        onClose={handleClose}
        className="bg-white/10 backdrop-blur-md"
      >
        <ModalBody className="">
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
                {/* <div className="flex flex-col gap-3 px-6 py-4">
                  <div>
                    <div className="mb-2 block">
                      <label className="text-text-100" htmlFor="StartDate">
                        Título da atividade
                      </label>
                    </div>
                    <TextInput
                      id="event"
                      type="text"
                      sizing="md"
                      value={title}
                      className="form-control"
                      onChange={inputChangeHandler}
                    />
                  </div>
                  <div className="flex w-full flex-col">
                    <div className="mb-2 block">
                      <label className="text-text-100" htmlFor="StartDate">
                        Data inicial
                      </label>
                    </div>
                    <div className="flex w-full">
                      <Datepicker
                        value={start}
                        className=""
                        onSelectedDateChanged={handleStartChange}
                      />
                    </div>
                  </div>

                  <div className="flex flex-row gap-4">
                    <div>
                      <div className="mb-2 block">
                        <label className="text-text-100" htmlFor="StartDate">
                          Data Final
                        </label>
                      </div>
                      <Datepicker
                        value={end}
                        className="form-control calendarSec static"
                        onSelectedDateChanged={handleEndChange}
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <h6 className="text-text-50 text-base">
                      Escolha a cor da marcação
                    </h6>
                    <div className="mt-2 flex items-center gap-2">
                      {ColorVariation.map((mcolor) => {
                        return (
                          <div
                            className={`flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-${mcolor.eColor}`}
                            key={mcolor.id}
                            onClick={() =>
                              selectinputChangeHandler(mcolor.value)
                            }
                          >
                            {mcolor.value === color ? (
                              <Check width="16" className="text-white" />
                            ) : null}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div> */}
                <div className="flex w-full flex-col items-center gap-2 border-t py-4 text-white md:flex-row md:justify-center">
                  <div className="flex items-center gap-2">
                    <Button className="text-white" onClick={handleClose}>
                      Fechar
                    </Button>
                  </div>
                  <Button
                    className="text-white"
                    type="submit"
                    disabled={!title}
                  >
                    {update ? "Editar evento" : "Adicionar evento"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default CalendarApp;
