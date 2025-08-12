/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/chat/tooltip";
import { DateValue } from "@internationalized/date";
import { Check, X } from "lucide-react";
import moment from "moment";
import "moment/locale/pt-br";
import React, { useMemo, useState } from "react";
import {
  Calendar,
  momentLocalizer,
  SlotInfo,
  View,
  Views,
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

// ---- Seus componentes/arquivos já existentes ----
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { DatePicker } from "../ui/date-picker";
import { Modal } from "../ui/Modal";
import { CustomEvent } from "./CustomEvent"; // componente para eventos normais (dia/semana)
import { CustomEventWeek } from "./CustomEventWeek";
import { Events2 } from "./EventData"; // lista inicial de eventos
import CustomToolbar from "./toolbar";

// -------------------------------------------------

moment.locale("pt-br");
const localizer = momentLocalizer(moment);

// ===== Tipagens =====
export interface EventType2 {
  id: string;
  type: "Recorrentes" | "Avulso" | "Colaborador";
  movementType: "Entrada" | "Saida";
  status: "À Pagar" | "Pendente" | "Atrasado" | "Pago";
  value: string | number; // mantive string, mas recomendo number
  name: string;
  installments?: string;
  start: Date;
  end: Date;
  color: string;
}

// Evento-resumo exibido somente na visão mensal
type SummaryEvent = {
  id: string;
  start: Date;
  end: Date;
  allDay: true;
  movementType: "Entrada" | "Saida";
  count: number;
  value: string | number;
  formattedValue: string;
  isSummary: true;
  name: string; // "A pagar" | "A receber"
  color: string;
};

// União para o Calendar aceitar ambos
type RBCEvent = EventType2 | SummaryEvent;

interface CalendarSlotInfo extends SlotInfo {
  name?: string;
}

interface ButtonGroupProps {
  accessLevel: string;
  setAccessLevel: React.Dispatch<React.SetStateAction<string>>;
}

function MonthSummaryEvent({ event }: { event: SummaryEvent }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "2px 4px",
              borderRadius: 6,
              fontSize: 12,
              lineHeight: 1.1,
            }}
            className="sum-card"
          >
            <div className="flex w-full flex-col text-[14px]">
              <span className="text-xs">{event.name}</span>
              <div className="flex w-full flex-row items-center gap-2">
                <span className="text-sm">Quantidade:</span>
                <span className="font-bold">{event.count}</span>
              </div>
              <div className="flex w-full flex-row items-center gap-2">
                <span className="text-sm">Total:</span>
                <span className="flex-1 font-bold">{event.formattedValue}</span>
              </div>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          align="start"
          className="border-primary border bg-white p-3"
        >
          <div className="font-bold text-[#6C7386]">
            <span className="mr-1">Nome:</span>
            <span className="text-primary">{event.name}</span>
          </div>
          <div className="font-bold text-[#6C7386]">
            <span className="mr-1">Data:</span>
            <span className="text-primary">
              {event.start.toLocaleDateString()}
            </span>
          </div>
          <div className="font-bold text-[#6C7386]">
            <span className="mr-1">Movimento:</span>
            <span className="text-primary">{event.movementType}</span>
          </div>
          <div className="font-bold text-[#6C7386]">
            <span className="mr-1">Quantidade de itens:</span>
            <span className="text-primary">{event.count}</span>
          </div>
          <div className="font-bold text-[#6C7386]">
            <span className="mr-1">Valor Total:</span>
            <span className="text-primary">{event.formattedValue}</span>
          </div>
          <TooltipArrow className="fill-primary" />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

// ===== Arquivo principal =====
const CalendarApp = ({ accessLevel }: ButtonGroupProps) => {
  const router = useRouter();
  const [calevents, setCalEvents] = useState<EventType2[]>(Events2);
  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [slot, setSlot] = useState<CalendarSlotInfo | null>(null);
  const [start, setStart] = useState<Date | null>(null);
  const [end, setEnd] = useState<Date | null>(null);
  const [color, setColor] = useState<string>("primary");
  const [update, setUpdate] = useState<EventType2 | null>(null);
  const [view, setView] = useState<View>(Views.MONTH);
  const [date, setDate] = useState<Date>(new Date());

  const ColorVariation = [
    { id: 1, eColor: "#da5709", value: "primary" },
    { id: 2, eColor: "#7928CA", value: "purple" },
    { id: 3, eColor: "#2196F3", value: "blue" },
    { id: 6, eColor: "#faca15", value: "yellow" },
    { id: 7, eColor: "#f05252", value: "red" },
  ];

  const addNewEventAlert = (slotInfo: CalendarSlotInfo) => {
    setOpen(true);
    setSlot(slotInfo);
    setStart(slotInfo.start);
    setEnd(slotInfo.end);
  };

  const updateEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCalEvents((prev) =>
      prev.map((elem) =>
        elem.name === update?.name
          ? {
              ...elem,
              name,
              start: start || new Date(),
              end: end || new Date(),
              color,
            }
          : elem,
      ),
    );
    handleClose();
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);

  const selectinputChangeHandler = (id: string) => setColor(id);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newEvent: EventType2 = {
      id: "",
      type: "Avulso",
      movementType: "Entrada",
      status: "Pendente",
      value: "0",
      name,
      start: start ?? new Date(),
      end: end ?? new Date(),
      color,
    };
    setCalEvents((prev) => [...prev, newEvent]);
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    setName("");
    setStart(null);
    setEnd(null);
    setUpdate(null);
  };

  const handleStartChange = (newValue: DateValue | null) => {
    if (newValue) setStart(new Date(newValue.toString()));
  };

  const handleEndChange = (newValue: DateValue | null) => {
    if (newValue) setEnd(new Date(newValue.toString()));
  };

  const monthEvents: RBCEvent[] = useMemo(() => {
    if (view !== Views.MONTH) return calevents;

    const formatCurrency = (value: number): string =>
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(Number(value.toFixed(2)));

    const parseBrazilianCurrency = (raw: string): number => {
      // Ex: "R$ 3.500,00" => 3500.00
      return parseFloat(
        raw
          .replace(/[R$\s.]/g, "") // remove R$, espaços e pontos
          .replace(",", "."), // substitui vírgula decimal por ponto
      );
    };

    const bucket: Record<
      string,
      {
        entrada: number;
        saida: number;
        day: Date;
        totalEntrada: number;
        totalSaida: number;
      }
    > = {};

    calevents.forEach((e) => {
      const key = moment(e.start).startOf("day").format("YYYY-MM-DD");

      if (!bucket[key]) {
        bucket[key] = {
          entrada: 0,
          saida: 0,
          day: moment(e.start).startOf("day").toDate(),
          totalEntrada: 0,
          totalSaida: 0,
        };
      }

      const value = parseBrazilianCurrency(String(e.value));

      if (e.movementType === "Entrada") {
        bucket[key].entrada += 1;
        bucket[key].totalEntrada += value;
      } else {
        bucket[key].saida += 1;
        bucket[key].totalSaida += value;
      }
    });

    const list: RBCEvent[] = [];

    Object.values(bucket).forEach(
      ({ entrada, saida, day, totalEntrada, totalSaida }) => {
        if (entrada > 0) {
          list.push({
            id: `${day.toISOString()}-ent`,
            start: day,
            end: day,
            allDay: true,
            movementType: "Entrada",
            count: entrada,
            isSummary: true,
            name: "A receber",
            value: totalEntrada,
            formattedValue: formatCurrency(totalEntrada),
            color: "#0BB34B",
          });
        }

        if (saida > 0) {
          list.push({
            id: `${day.toISOString()}-sai`,
            start: day,
            end: day,
            allDay: true,
            movementType: "Saida",
            count: saida,
            isSummary: true,
            name: "A pagar",
            value: totalSaida,
            formattedValue: formatCurrency(totalSaida),
            color: "#D93025",
          });
        }
      },
    );

    return list;
  }, [view, calevents]);

  const onSelectEvent = (event: RBCEvent) => {
    if ("isSummary" in event) {
      setDate(event.start);
      setView(Views.DAY);
      return;
    }
    if (event.movementType === "Saida") {
      if (event.status !== "À Pagar") {
        if (accessLevel === "common") {
          if (event.type === "Recorrentes") {
            return router.push(`/payable/recurring/add-document/${event.id}`);
          } else {
            return router.push(`/payable/add-document/${event.id}`);
          }
        } else if (accessLevel === "admin") {
          return router.push(`/payable/approve/${event.id}`);
        }
      } else if (event.status === "À Pagar") {
        return router.push(`/payable/pay/${event.id}`);
      }
    } else if (event.movementType === "Entrada") {
      if (event.status !== "À Pagar") {
        return router.push(`/receivable/update/${event.id}`);
      } else if (event.status === "À Pagar") {
        if (accessLevel === "common") {
          return router.push(`/receivable/receive/${event.id}`);
        } else if (accessLevel === "admin") {
          return router.push(`/receivable/approve/${event.id}`);
        }
      }
    }
  };

  const onSelectSlot = (slotInfo: CalendarSlotInfo) => {
    if (view === Views.MONTH) {
      setDate(slotInfo.start);
      setView(Views.DAY);
    } else {
      addNewEventAlert(slotInfo);
    }
  };

  return (
    <div className="flex h-full w-full">
      <div className="flex w-full">
        <Calendar
          selectable
          date={date}
          onNavigate={setDate}
          view={view}
          onView={setView}
          events={view === Views.MONTH ? monthEvents : calevents}
          localizer={localizer}
          defaultView={Views.MONTH}
          scrollToTime={new Date(1970, 1, 1, 6)}
          defaultDate={new Date()}
          components={{
            event: (props) => {
              const { event } = props;
              if (view === Views.MONTH) {
                if ("isSummary" in event && event.isSummary) {
                  return <MonthSummaryEvent event={event as SummaryEvent} />;
                }
              } else if (view === Views.WEEK) {
                if (!("isSummary" in event)) {
                  return (
                    <CustomEventWeek event={event as any} onView={() => {}} />
                  );
                }
              } else {
                if (!("isSummary" in event)) {
                  return <CustomEvent event={event as any} onView={() => {}} />;
                }
              }
              return null;
            },
            toolbar: (props: any) => (
              <CustomToolbar {...props} addNewEvent={() => setOpen(true)} />
            ),
          }}
          onSelectEvent={onSelectEvent}
          onSelectSlot={onSelectSlot}
          eventPropGetter={(event: RBCEvent) => {
            if ("isSummary" in event) {
              const isEnt = event.movementType === "Entrada";
              return {
                style: {
                  backgroundColor: isEnt ? "#E9FFF0" : "#FFECEC",
                  color: isEnt ? "#0A8C3B" : "#D93025",
                  padding: 0,
                  marginTop: !isEnt ? 10 : 0,
                },
              };
            }

            const isEntrada = event.movementType === "Entrada";
            const bg = isEntrada ? "#E9FFF0" : "#FFECEC";
            const border = isEntrada ? "#0A8C3B" : "#D93025";
            return {
              style: {
                backgroundColor: bg,
                borderLeft: `4px solid ${border}`,
                paddingLeft: 4,
                marginLeft: 2,
                width: "95%",
                color: border,
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
              },
            };
          }}
          className="min-h-[600px] w-full text-black xl:min-h-[900px]"
          culture="pt-BR"
          messages={{ noEventsInRange: "Nenhuma atividade encontrada." }}
        />
      </div>

      {/* Modal */}
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
                    {update ? "Atualizar Evento" : "Adicionar Evento"}
                  </h3>
                  <X
                    onClick={handleClose}
                    className="text-text-100 cursor-pointer"
                  />
                </div>
                <p className="text-text-100 mt-1 text-sm font-normal">
                  {!update
                    ? "Para adicionar um evento, preencha o título, escolha as datas e a cor, depois clique em Adicionar."
                    : "Para editar/atualizar, altere os campos e clique em Editar evento."}
                  {slot?.name}
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
                    value={name}
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
                    {ColorVariation.map((mcolor) => (
                      <div
                        key={mcolor.id}
                        className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full"
                        style={{ background: mcolor.eColor }}
                        onClick={() => selectinputChangeHandler(mcolor.value)}
                      >
                        {mcolor.value === color ? (
                          <Check width="16" className="text-white" />
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex w-full flex-col items-center gap-2 border-t py-4 text-white md:flex-row md:justify-center">
                <div className="flex items-center gap-2">
                  <Button
                    className="text-white"
                    onClick={handleClose}
                    type="button"
                  >
                    Fechar
                  </Button>
                </div>
                <Button className="text-white" type="submit" disabled={!name}>
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
