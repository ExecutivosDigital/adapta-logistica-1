"use client";
import { SimpleDatePicker } from "@/components/ui/simple-date-picker";
import { getLocalTimeZone } from "@internationalized/date";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useState } from "react";
import { DateValue } from "react-aria-components";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export function ReceivableResultsGraph() {
  const [state] = useState({
    series: [
      {
        name: "Recebido",
        data: Array.from(
          { length: 13 },
          () => Math.floor(Math.random() * (2000 - 500 + 1)) + 500,
        ),
      },
      {
        name: "Á Receber",
        data: Array.from(
          { length: 13 },
          () => Math.floor(Math.random() * (2000 - 500 + 1)) + 500,
        ),
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
        enabled: true,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      fill: {
        type: "gradient",
        colors: ["#00A181", "#003ffd"],
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.55,
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
    <div className="flex h-full w-full justify-between gap-2">
      <div className="flex h-full w-80 flex-col items-start justify-between border-r border-r-zinc-200 p-2">
        <div className="self-star flex items-center gap-2 rounded-lg border border-zinc-400 p-2 text-black">
          <div className="">
            <SimpleDatePicker
              value={date}
              label="Ano Atual"
              view="year"
              onChange={handleDateChange}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex flex-row items-center gap-2">
            <div className="h-full w-1 bg-[#00A181]" />
            <span className="text-zinc-400">Recebido</span>
          </div>
          <span className="text-2xl font-semibold text-[#00A181]">
            R$ <span className="">1.322.890,00</span>
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex flex-row items-center gap-2">
            <div className="h-full w-1 bg-[#003ffd]" />
            <span className="text-zinc-400">Á Receber</span>
          </div>
          <span className="text-2xl font-semibold text-[#003ffd]">
            R$ <span className="">1.322.890,00</span>
          </span>
        </div>

        <div />
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
