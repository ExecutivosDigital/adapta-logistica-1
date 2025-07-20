"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ApexOptions } from "apexcharts";
import { ChevronDown } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export function Home2ResultsGraph() {
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
        curve: "smooth",
      },
      fill: {
        type: "gradient",
        colors: ["#00A181"],
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

  return (
    <div className="flex h-full w-full justify-between gap-2">
      <div className="flex h-full w-80 flex-col justify-between border-r border-r-zinc-200 p-2">
        <div className="flex items-center justify-between">
          <span className="w-max text-sm font-semibold">Res. Consolidado</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2 text-zinc-400">
                <span className="text-sm">Junho</span>
                <ChevronDown />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="hover:bg-primary/20 cursor-pointer transition duration-300">
                Lorem Ipsum
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-primary/20 cursor-pointer transition duration-300">
                Lorem Ipsum
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-primary/20 cursor-pointer transition duration-300">
                Lorem Ipsum
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <span className="text-2xl font-semibold text-[#00A181]">
          R$ <span className="font-bold">1.322.890,00</span>
        </span>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-4 w-px bg-[#00A181]" />
              <span className="text-xs text-zinc-400">Entradas</span>
            </div>
            <span className="text-sm font-semibold text-[#00A181]">
              R$2.220.890,00
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-4 w-px bg-[#EF4444]" />
              <span className="text-xs text-zinc-400">Saídas</span>
            </div>
            <span className="text-sm font-semibold text-[#EF4444]">
              -R$822.890,00
            </span>
          </div>
        </div>
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
