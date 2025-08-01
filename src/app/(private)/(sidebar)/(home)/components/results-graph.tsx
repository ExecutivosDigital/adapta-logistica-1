"use client";
import { SimpleDatePicker } from "@/components/ui/simple-date-picker";
import { getLocalTimeZone } from "@internationalized/date";
import { ApexOptions } from "apexcharts";
import { ArrowDownRight, ArrowUpRight, DollarSign } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";
import { DateValue } from "react-aria-components";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export function HomeResultsGraph() {
  const [state] = useState({
    series: [
      {
        name: "STOCK ABC",
        data: [
          1052, 1055, 1054, 1062, 1061, 1053, 1069, 1065, 1063, 1063, 1055,
          1068, 1066,
        ],
      },
    ],
    options: {
      chart: {
        type: "area",
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
        background: "transparent",
      },
      tooltip: {
        enabled: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      fill: {
        type: "gradient",
        colors: ["#d96927"],
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.95,
          opacityTo: 0.25,
          stops: [20, 100, 100, 100],
        },
      },
      title: {
        show: false,
      },
      subtitle: {
        show: false,
      },
      labels: [
        "02/01/2003",
        "02/02/2003",
        "02/03/2003",
        "02/04/2003",
        "02/05/2003",
        "02/06/2003",
        "02/07/2003",
        "02/08/2003",
        "02/09/2003",
      ],
      grid: {
        show: true,
        borderColor: "#a1a1aa",
        strokeDashArray: 10,
        position: "back",
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
      },
      xaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
        },
      },
      legend: {
        show: false,
      },
      responsive: [
        {
          breakpoint: 4000,
          options: {
            chart: {
              height: 200,
            },
          },
        },
      ],
    },
  });
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
    <div className="flex w-full flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary/20 text-primary flex h-6 w-6 items-center justify-center rounded-full p-1">
            <DollarSign />
          </div>
          <span className="text-sm font-semibold">Resultado Consolidado</span>
        </div>

        <div className="flex cursor-pointer items-center gap-2 rounded-md border border-zinc-200 px-2 py-1 text-zinc-400 focus:outline-none">
          <SimpleDatePicker
            value={date}
            label="Filtro"
            onChange={handleDateChange}
            view="day"
          />
        </div>
      </div>
      <span className="text-2xl font-semibold">R$180.789,00</span>
      <div className="flex h-6 items-center gap-2">
        <ArrowUpRight className="text-green-500" />
        <span className="text-sm">R$522.000,00</span>
        <div className="h-full w-px bg-zinc-400" />
        <ArrowDownRight className="text-red-500" />
        <span className="text-sm">R$329.802,00</span>
      </div>
      <div className="w-full">
        <ReactApexChart
          options={state.options as ApexOptions}
          series={state.series}
          type="area"
          width="100%"
        />
      </div>
    </div>
  );
}
