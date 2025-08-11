/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  AllCommunityModule,
  ModuleRegistry,
  SelectEditorModule,
  themeQuartz,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import tableData from "./output_data.json";

ModuleRegistry.registerModules([AllCommunityModule, SelectEditorModule]);

const myTheme = themeQuartz.withParams({
  spacing: 2,
  headerBackgroundColor: "#d96927",
  rowHoverColor: "rgb(218, 87, 9, 0.1)",
  headerTextColor: "#fff",
  cellTextColor: "#000",
});

const centros = [
  "01.001. - Corp - Diretoria/Conselho",
  "01.003. - Corp - Controladoria",
  "01.005. - Corp - Qualidade",
  "01.007. - Corp - DHO/RH",
  "01.009. - Corp - Financeiro",
  "01.011. - Corp - Administrativo",
  "03.001. - Com - Vendas",
  "03.003. - Com - Atendimento",
  "05.001. - Oper - Planejamento",
  "05.003. - Oper - Programação",
  "05.005. - Oper - Armazém",
  "05.007. - Oper - Expedição",
  "05.009. - Oper - GR",
  "05.011. - Oper - Pendencia",
  "07.001. - Frota - Adm",
  "07.003. - Frota - Manutenção",
  "07.005. - Frota - Motoristas",
];

const filiais = [
  "01 - CWB - Curitiba - 01 - Filial",
  "02 - BSB - Brasília - 01 - Filial",
  "03 - SPO - Itapevi - 01 - Filial",
  "04 - RCF - Jaboatão - 01 - Filial",
  "05 - CTG - Contagem - 01 - Filial",
  "06 - CRC - Cariacica - 01 - Filial",
  "07 - SSA - Simões Fi - 01 - Filial",
  "08 - RCG - Rio - 03 - Parceiros",
  "09 - POA - Canoas - RS - 01 - Filial",
  "10 - CPL - Campos Lar - 01 - Filial",
  "101 - Arlete SJP - 03 - Parceiros",
  "103 - Arlete - Rio G - 03 - Parceiros",
  "105 - Bomfim - Feira - 03 - Parceiros",
  "107 - KM - MS - 03 - Parceiros",
  "109 - BOMFIM - BA - 03 - Parceiros",
  "11 - GYN - Goiania - 01 - Filial",
  "111 - Omega 7 - Rio - 03 - Parceiros",
  "115 - Transluc - 03 - Parceiros",
  "117 - Transcaju - SP - 03 - Parceiros",
  "119 - Transcaju - MG - 03 - Parceiros",
  "121 - Rodonova - CE - 03 - Parceiros",
  "123 - Rodonova - SP - 03 - Parceiros",
  "125 - Todo Bra - Man - 03 - Parceiros",
  "127 - ABM - MG - 03 - Parceiros",
  "129 - ABM - SP - 03 - Parceiros",
  "131 - TODO BR - BELEM - 03 - Parceiros",
  "133 - JC LOGISTICA MG - 03 - Parceiros",
  "135 - CW3 - UBERLAN - 03 - Parceiros",
  "137 - SSAI - IBL SSA - 03 - Parceiros",
  "139 - Centro Sul GO - 03 - Parceiros",
  "141 - BOMFIM - ARACA - 03 - Parceiros",
  "145 - C S SOUZA MS - 03 - Parceiros",
  "18 - RCG - Guarulhos - 03 - Parceiros",
  "33 - PMG - EMF log - 03 - Parceiros",
  "35 - TCP - TeleC - PR - 03 - Parceiros",
  "37 - ORS - Guarulhos - 03 - Parceiros",
  "39 - ORS - Caxias - MA - 03 - Parceiros",
  "40 - BEL - Belém NBL - 03 - Parceiros",
  "45 - CGB - Cuiabá PH - 03 - Parceiros",
  "50 - FOR - Fortaleza - 03 - Parceiros",
  "51 - GCE - GBEX - CE - 03 - Parceiros",
  "53 - GPI - GBEX - PI - 03 - Parceiros",
  "55 - CGR - Campo Gra - 03 - Parceiros",
  "57 - FLSP - São Paul - 03 - Parceiros",
  "60 - UDI - Uberland - 03 - Parceiros",
  "63 - SLZ - GBEX MA - 03 - Parceiros",
  "65 - THE - Teresina - 03 - Parceiros",
  "67 - PMW - Palmas - 03 - Parceiros",
  "70 - RDV - Guarulhos - 03 - Parceiros",
  "73 - RDV - Curitiba - 03 - Parceiros",
  "75 - RDV - Marituba - 03 - Parceiros",
  "77 - RDV - Manaus-AM - 03 - Parceiros",
  "80 - RCF - Logmodal - 03 - Parceiros",
  "81 - SSA - JM Transp - 03 - Parceiros",
  "83 - PAS - Guarul-SP - 03 - Parceiros",
  "85 - PCE Caucais-CE - 03 - Parceiros",
  "87 - ABM - Apare Goi - 03 - Parceiros",
  "91 - Frilog - SP - 03 - Parceiros",
  "93 - Frilog - Rio - 03 - Parceiros",
  "95 - Bomfim - Jaboat - 03 - Parceiros",
  "97 - Gbex - Jaboatão - 03 - Parceiros",
];

export function Table() {
  const [rowData, setRowData] = useState<any>([]);
  const output_data = tableData;

  const [colDefs] = useState([
    { field: "Conta Contábil Cód", editable: true },
    { field: "Conta Contábil", editable: true },
    { field: "Tipo de Custo", editable: true },
    { field: "% Custo", editable: true },
    { field: "Nível", editable: true },
    {
      field: "Centro de Resultados",
      editable: true,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: centros,
      },
    },
    {
      field: "Filial",
      editable: true,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: filiais,
      },
    },
    {
      field: "Jan",
      valueFormatter: (p: any) =>
        p.value.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      editable: true,
    },
    {
      field: "Fev",
      valueFormatter: (p: any) =>
        p.value.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      editable: true,
    },
    {
      field: "Mar",
      valueFormatter: (p: any) =>
        p.value.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      editable: true,
    },
    {
      field: "Abr",
      valueFormatter: (p: any) =>
        p.value.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      editable: true,
    },
    {
      field: "Mai",
      valueFormatter: (p: any) =>
        p.value.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      editable: true,
    },
    {
      field: "Jun",
      valueFormatter: (p: any) =>
        p.value.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      editable: true,
    },
    {
      field: "Jul",
      valueFormatter: (p: any) =>
        p.value.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      editable: true,
    },
    {
      field: "Ago",
      valueFormatter: (p: any) =>
        p.value.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      editable: true,
    },
    {
      field: "Set",
      valueFormatter: (p: any) =>
        p.value.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      editable: true,
    },
    {
      field: "Out",
      valueFormatter: (p: any) =>
        p.value.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      editable: true,
    },
    {
      field: "Nov",
      valueFormatter: (p: any) =>
        p.value.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      editable: true,
    },
    {
      field: "Dez",
      valueFormatter: (p: any) =>
        p.value.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      editable: true,
    },
    {
      field: "Total",
      valueFormatter: (p: any) =>
        p.value.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      editable: true,
    },
  ]);

  useEffect(() => {
    setRowData(output_data);
  }, []);

  return (
    <div className="h-[50vh]">
      <AgGridReact rowData={rowData} columnDefs={colDefs} theme={myTheme} />
    </div>
  );
}
