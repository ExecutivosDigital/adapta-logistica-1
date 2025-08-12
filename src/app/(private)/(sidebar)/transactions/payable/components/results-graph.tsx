"use client";
import { SimpleDatePicker } from "@/components/ui/simple-date-picker";
import { DateValue, getLocalTimeZone } from "@internationalized/date";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useState } from "react";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export function PayableResultsGraph() {
  const [state] = useState({
    series: [
      {
        name: "Pago",
        data: [
          1052, 1055, 1054, 500, 1061, 1053, 1069, 1065, 1063, 1063, 1055, 1068,
          1066,
        ],
      },
      {
        name: "Á Pagar",
        data: [852, 855, 854, 862, 861, 853, 869, 865, 863, 863, 855, 868, 866],
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
        colors: ["#ef8b44", ["#fa0303"]],
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
    <div className="flex h-full w-full flex-col justify-between gap-2 xl:flex-row">
      <div className="flex h-full w-full flex-col items-start justify-between border-b border-b-zinc-200 p-2 xl:w-80 xl:border-r xl:border-b-0 xl:border-r-zinc-200">
        <div className="ml-auto flex items-center gap-2 rounded-lg border border-zinc-400 p-2 text-black xl:ml-0">
          <div className="">
            <SimpleDatePicker
              value={date}
              label="Ano Atual"
              view="year"
              onChange={handleDateChange}
            />
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 xl:flex-col xl:items-start xl:justify-normal xl:gap-0">
          <div className="flex w-1/2 flex-col gap-1 xl:w-auto">
            <div className="flex flex-row items-center gap-2">
              <div className="h-full w-1 bg-[#ef8b44]" />
              <span className="text-zinc-400 2xl:text-2xl">Pago</span>
            </div>
            <span className="text-2xl font-semibold text-[#ef8b44]">
              R$ <span className="">1.322.890,00</span>
            </span>
          </div>
          <div className="flex w-1/2 flex-col gap-1 xl:w-auto">
            <div className="flex flex-row items-center gap-2">
              <div className="h-full w-1 bg-[#fa0303]" />
              <span className="text-zinc-400 2xl:text-2xl">Á Pagar</span>
            </div>
            <span className="text-2xl font-semibold text-[#fa0303]">
              R$ <span className="">1.322.890,00</span>
            </span>
          </div>
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
