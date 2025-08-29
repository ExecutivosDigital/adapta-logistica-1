/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useApiContext } from "@/context/ApiContext";
import { useBranch } from "@/context/BranchContext";
import { useLoadingContext } from "@/context/LoadingContext";
import { useValueContext } from "@/context/ValueContext";
import moment from "moment";
import "moment/locale/pt-br";
import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CustomEvent } from "./CustomEvent";
import { CustomEventWeek } from "./CustomEventWeek";
import CustomToolbar from "./toolbar";

moment.locale("pt-br");
const localizer = momentLocalizer(moment);

export interface PayableTransactionProps {
  approvedById: string;
  bankAccount: {
    id: string;
    name: string;
  } | null;
  bankAccountId?: string;
  documentNumber: unknown | null;
  documents: {
    documentNumber: string;
    documentUrl?: string | null;
    dueDate: string;
    id: string;
    supplierId: string;
    value: number;
    comments?: string | null;
  }[];
  newDocuments?: {
    documentNumber: string;
    documentUrl?: string;
    dueDate: string;
    id: string;
    supplierId: string;
    value: number;
    comments?: string;
  }[];
  removedDocuments?: {
    documentNumber: string;
    documentUrl?: string;
    dueDate: string;
    id: string;
    supplierId: string;
    value: number;
    comments?: string;
  }[];
  dueDate: string;
  id: string;
  payable: {
    dueDate: string;
    id: string;
    installmentCount: number;
    isTotalValue: boolean;
    ledgerAccount: {
      code: string;
      companyId: string;
      entryType: {
        code: number;
        companyId: string;
        id: string;
        name: string;
      };
      id: string;
      level: number;
      name: string;
      normalizedCode: string;
      parentLedgerAccount: {
        code: string;
        companyId: string;
        entryTypeId: string | null;
        id: string;
        level: number;
        name: string;
        normalizedCode: string;
        parentLedgerAccountId: string;
        resultCenterId: string | null;
        type: string;
      };
      resultCenter: {
        code: number;
        companyId: string;
        id: string;
        name: string;
      };
      type: string;
    };
    mainDocumentUrl: string | null;
    paymentMode: string;
    referenceMonth: number;
    status: string;
    supplier: {
      address: string;
      city: string;
      cnpj: string;
      code: number;
      companyId: string;
      complement: string;
      createdAt: string;
      emails: string[];
      fiscalGroupId: string;
      id: string;
      latitude: number;
      ledgerAccountId: string;
      longitude: number;
      mobilePhone: string;
      municipalRegistration: string;
      name: string;
      neighborhood: string;
      number: string;
      paymentAccount: string;
      paymentAccountOwner: string;
      paymentAccountOwnerDocument: string;
      paymentAgency: string;
      paymentBank: string;
      phone: string;
      postalCode: string;
      resultCenterId: string;
      state: string;
      stateRegistration: string;
      suframa: string;
      supplierGroupId: string;
      supplierTypeId: string;
      tributaryRegimeId: string;
    };
    type: string;
    value: number;
  };
  paymentType: string;
  position: number;
  receiptUrl: string | null;
  status: string;
  value: number;
}

interface MonthSummaryTransactionProps {
  end: Date;
  events: PayableTransactionProps[];
  start: Date;
  value: number;
  isPayable: boolean;
}

type RBCEvent = PayableTransactionProps | MonthSummaryTransactionProps;

interface ButtonGroupProps {
  accessLevel: string;
  setAccessLevel: React.Dispatch<React.SetStateAction<string>>;
  filter: string;
}

function MonthSummaryEvent({ event }: { event: MonthSummaryTransactionProps }) {
  const { viewAllValues } = useValueContext();
  return (
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
        <span className="text-xs">
          {event.isPayable ? "À Pagar" : "À Receber"}
        </span>

        <div className="flex w-full flex-row items-center gap-2">
          <span className="text-sm">Total:</span>
          <span className="flex-1 font-bold">
            {viewAllValues
              ? event.value.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })
              : "****"}
          </span>
        </div>
      </div>
    </div>

    // WIP rotated month events

    //  <TooltipProvider>
    //   <Tooltip>
    //    <TooltipTrigger asChild>
    //    <div
    //    style={{
    //    display: "flex",
    //    fontSize: 12,
    //    lineHeight: 1.1,
    //    }}
    //    className="sum-card h-[150px] p-0 md:h-auto md:p-2"
    //    >
    //    <div className="text-primary flex h-max w-full rotate-90 flex-col text-[14px] transition duration-500 md:h-auto md:translate-y-0 md:rotate-0">
    //    <div className="h-10 w-full pt-2">{event.name}</div>
    //    <div className="h-10 w-full font-bold">
    //    {event.count} - {event.formattedValue}
    //    </div>{" "}
    //    </div>
    //    </div>
    //    </TooltipTrigger>
    //    <TooltipContent
    //    side="top"
    //    align="start"
    //    className="border-primary z-[999] border bg-white p-3"
    //    >
    //    <div className="font-bold text-[#6C7386]">
    //    <span className="mr-1">Nome:</span>
    //    <span className="text-primary">{event.name}</span>
    //    </div>
    //    <div className="font-bold text-[#6C7386]">
    //    <span className="mr-1">Data:</span>
    //    <span className="text-primary">
    //    {event.start.toLocaleDateString()}
    //    </span>
    //    </div>
    //    <div className="font-bold text-[#6C7386]">
    //    <span className="mr-1">Movimento:</span>
    //    <span className="text-primary">{event.movementType}</span>
    //    </div>
    //    <div className="font-bold text-[#6C7386]">
    //    <span className="mr-1">Quantidade de itens:</span>
    //    <span className="text-primary">{event.count}</span>
    //    </div>
    //    <div className="font-bold text-[#6C7386]">
    //    <span className="mr-1">Valor Total:</span>
    //    <span className="text-primary">{event.formattedValue}</span>
    //    </div>
    //    <TooltipArrow className="fill-primary" />
    //    </TooltipContent>
    //   </Tooltip>
    // </TooltipProvider>
  );
}

const CalendarApp = ({ accessLevel }: ButtonGroupProps) => {
  const { handleNavigation } = useLoadingContext();
  const { selectedBranch, selectedBusinessUnit } = useBranch();
  const { GetAPI } = useApiContext();
  const [view, setView] = useState<View>(Views.MONTH);
  const [date, setDate] = useState<Date>(new Date());
  const [payableTransactions, setPayableTransactions] = useState<
    PayableTransactionProps[]
  >([]);
  const [monthSummaryTransactions, setMonthSummaryTransactions] = useState<
    MonthSummaryTransactionProps[]
  >([]);

  const onSelectEvent = (event: RBCEvent) => {
    if ("isPayable" in event) {
      setDate(event.start);
      setView(Views.DAY);
      return;
    }
    if (event.payable) {
      if (event.status === "CLOSED") {
        return handleNavigation(`/payable/payed/${event.id}`);
      }
      if (event.status !== "APPROVED") {
        if (accessLevel === "common") {
          return handleNavigation(`/payable/add-document/${event.id}`);
        } else if (accessLevel === "admin") {
          return handleNavigation(`/payable/approve/${event.id}`);
        }
      } else if (event.status === "APPROVED") {
        return handleNavigation(`/payable/pay/${event.id}`);
      }
    }
    // else if (!event.payable) {
    //   if (event.status === "Recebido") {
    //     return handleNavigation(`/receivable/received/${event.id}`);
    //   } else if (event.status !== "À Receber") {
    //     if (accessLevel === "common") {
    //       return handleNavigation(
    //         `/transactions/receivable/update/${event.id}`,
    //       );
    //     } else if (accessLevel === "admin") {
    //       return handleNavigation(
    //         `/transactions/receivable/approve/${event.id}`,
    //       );
    //     }
    //   } else if (event.status === "À Receber") {
    //     return handleNavigation(`/receivable/receive/${event.id}`);
    //   }
    // }
  };

  async function GetMonthlyTransactions() {
    let data = "";
    data += "?companyId=" + selectedBranch?.companyId;
    data += "&month=" + moment(date).month();
    data += "&year=" + moment(date).year();
    data += "&subsidiaryId=" + selectedBranch?.id;
    data += "&businessUnitId=" + selectedBusinessUnit?.id;
    data += "&page=1";
    const transactions = await GetAPI(
      `/payable-transaction/monthly${data}`,
      true,
    );
    if (transactions.status === 200) {
      const grouped = transactions.body.payableTransactions.reduce(
        (acc: any, item: any) => {
          const key = moment(item.dueDate).format("DD/MM/YYYY");

          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(item);

          return acc;
        },
        {},
      );

      const groupedArray = Object.keys(grouped).map((key) => {
        return {
          start: moment(key, "DD/MM/YYYY").startOf("day").toDate(),
          end: moment(key, "DD/MM/YYYY").endOf("day").toDate(),
          value: grouped[key].reduce(
            (acc: number, item: any) => acc + item.value,
            0,
          ),
          events: grouped[key],
          isPayable: true,
        };
      });

      setMonthSummaryTransactions(groupedArray);

      setPayableTransactions(
        transactions.body.payableTransactions.map((e: any) => {
          const day = moment(e.dueDate).date();
          const month = moment(e.dueDate).month();
          const year = moment(e.dueDate).year();
          return {
            ...e,
            start: new Date(year, month, day),
            end: new Date(year, month, day),
          };
        }),
      );
    }
  }

  useEffect(() => {
    if (selectedBranch) {
      if (selectedBusinessUnit) {
        GetMonthlyTransactions();
      }
    }
  }, [selectedBranch, selectedBusinessUnit, date]);

  return (
    <div className="flex h-full w-full">
      <div className="flex w-full">
        {payableTransactions.length !== 0 && (
          <Calendar
            selectable
            date={date}
            onNavigate={setDate}
            view={view}
            onView={setView}
            events={
              view === Views.MONTH
                ? monthSummaryTransactions
                : payableTransactions
            }
            localizer={localizer}
            defaultView={Views.MONTH}
            scrollToTime={new Date(1970, 1, 1, 6)}
            defaultDate={new Date()}
            components={{
              event: (props) => {
                const { event } = props;
                if (view === Views.MONTH) {
                  return (
                    <MonthSummaryEvent
                      event={event as MonthSummaryTransactionProps}
                    />
                  );
                } else if (view === Views.WEEK) {
                  return (
                    <CustomEventWeek
                      event={event as PayableTransactionProps}
                      onView={() => {}}
                    />
                  );
                } else {
                  return (
                    <CustomEvent
                      event={event as PayableTransactionProps}
                      onView={() => {}}
                    />
                  );
                }
              },
              toolbar: (props: any) => <CustomToolbar {...props} />,
            }}
            onSelectEvent={onSelectEvent}
            eventPropGetter={() => {
              const bg = "#FFECEC";
              const border = "#D93025";
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
        )}
      </div>
    </div>
  );
};

export default CalendarApp;
