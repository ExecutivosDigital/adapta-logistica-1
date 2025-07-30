import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/utils/cn";
import {
  Building2,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  CircleDollarSign,
  DollarSign,
  Edit,
  FileText,
  Mail,
  MapPin,
  Search,
} from "lucide-react";
import moment from "moment";
import "moment/locale/pt-br";
import { useCallback, useRef, useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { DataType } from "../page";
import { CostCentersList } from "./cost-centers-list";

moment.locale("pt-br");

interface Props {
  data: DataType;
  setData: (value: DataType) => void;
}

export function Step1({ data, setData }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sliderRef: any = useRef(null);
  const [selectedDocument, setSelectedDocument] = useState(4);
  const [filteredCostCenters, setFilteredCostCenters] = useState("");
  const [selectedCostCenters, setSelectedCostCenters] = useState<
    { name: string; value: string; locked?: boolean }[]
  >([]);

  const Documents = [
    {
      id: "1",
      name: "Documento 1",
      doc: null,
    },
    {
      id: "2",
      name: "Documento 2",
      doc: null,
    },
    {
      id: "3",
      name: "Documento 3",
      doc: "/test-pdf.pdf",
    },
    {
      id: "4",
      name: "Documento 4",
      doc: "/test-pdf.pdf",
    },
    {
      id: "5",
      name: "Documento 5",
      doc: null,
    },
    {
      id: "6",
      name: "Documento 6",
      doc: "/test-pdf.pdf",
    },
    {
      id: "7",
      name: "Documento 7",
      doc: null,
    },
    {
      id: "8",
      name: "Documento 8",
      doc: null,
    },
    {
      id: "9",
      name: "Documento 9",
      doc: "/test-pdf.pdf",
    },
    {
      id: "10",
      name: "Documento 10",
      doc: null,
    },
  ];

  const costCenters = [
    "Centro de Custo",
    "Abastecimento Interno",
    "Administrativo",
    "Armazém / CD",
    "Atendimento ao Cliente / SAC",
    "Auditoria / Conformidade",
    "Backoffice / Suporte",
    "Caixa Interno / Fundo Fixo",
    "Capex / Investimentos",
    "Comercial",
    "Compras / Suprimentos",
    "Consultivo Empresarial",
    "Consultoria Estratégica",
    "Contabilidade",
    "Contencioso Trabalhista",
    "Controle de Estoque / Inventário",
    "Departamento Pessoal",
    "Desenvolvimento de Produto",
    "Desenvolvimento de Sistemas",
    "Engenharia de Processos",
    "Equipamentos Logísticos",
    "Filiais / Regionais",
    "Financeiro",
    "Fiscal / Tributário",
    "Frota",
    "Funcionários em Viagem",
    "Gerenciamento de Crises",
    "Gestão Ambiental",
    "Infraestrutura",
    "Infraestrutura / Manutenção",
    "Infraestrutura de TI",
    "Inovação e P&D",
    "Investimentos",
    "Jurídico",
    "Licenças e Softwares",
    "Manutenção Predial",
    "Marketing Digital",
    "Motoristas",
    "Novas Filiais",
    "Obras e Projetos",
    "Obras e Reformas",
    "Oficina Interna",
    "Operacional",
    "Parcerias Estratégicas / Franquias",
    "Planejamento Operacional",
    "Produção",
    "Projetos Estratégicos",
    "Projetos e Expansão",
    "Provisões Jurídicas",
    "Qualidade / Compliance Operacional",
    "RH",
    "Recrutamento e Seleção",
    "Reembolsos e Adiantamentos",
    "Relacionamento com Cliente",
    "Saúde e Segurança do Trabalho",
    "Sede / Escritório Central",
    "Segurança Logística",
    "Suporte Técnico",
    "TI",
    "Tecnologia",
    "Tesouraria",
    "Transferência / Roteirização",
    "Transportadoras Parceiras",
    "Treinamento e Desenvolvimento",
    "Vendas Diretas",
    "Viagens Corporativas",
  ];

  const paymentTerms = ["Total no Ato", "Parcelado", "Recorrente"];

  const handleCostCenterToggle = (costCenterName: string) => {
    const isSelected = selectedCostCenters.some(
      (cc) => cc.name === costCenterName,
    );

    let updatedSelectedCenters;
    let updatedCostCenters;

    if (isSelected) {
      // Remove the cost center
      updatedSelectedCenters = selectedCostCenters.filter(
        (cc) => cc.name !== costCenterName,
      );
      updatedCostCenters = data.costCenters.filter(
        (cc) => cc.name !== costCenterName,
      );
    } else {
      // Add the cost center
      const newCostCenter = {
        name: costCenterName,
        value: "0.00",
        locked: false,
      };
      updatedSelectedCenters = [...selectedCostCenters, newCostCenter];
      updatedCostCenters = [...data.costCenters, newCostCenter];
    }

    setSelectedCostCenters(updatedSelectedCenters);

    // Apply the same distribution logic as distributeValueEvenly
    if (updatedCostCenters.length > 0) {
      const lockedCenters = updatedCostCenters.filter(
        (center) => center.locked,
      );
      const unlockedCenters = updatedCostCenters.filter(
        (center) => !center.locked,
      );

      const lockedTotal = lockedCenters.reduce(
        (sum, center) => sum + (parseFloat(center.value) || 0),
        0,
      );

      const remainingValue = data.totalValue - lockedTotal;

      if (unlockedCenters.length > 0 && remainingValue >= 0) {
        // Convert to cents to avoid floating point issues
        const remainingCents = Math.round(remainingValue * 100);
        const baseValueCents = Math.floor(
          remainingCents / unlockedCenters.length,
        );
        const remainder = remainingCents % unlockedCenters.length;

        const finalUpdatedCostCenters = updatedCostCenters.map(
          (center, index) => {
            if (center.locked) {
              return center;
            }

            // Find the position of this center in the unlocked centers array
            const unlockedIndex = unlockedCenters.findIndex(
              (uc) => updatedCostCenters.findIndex((dc) => dc === uc) === index,
            );

            // Distribute remainder to first N centers (where N = remainder)
            const extraCent = unlockedIndex < remainder ? 1 : 0;
            const finalValueCents = baseValueCents + extraCent;
            const finalValue = (finalValueCents / 100).toFixed(2);

            return {
              ...center,
              value: finalValue,
            };
          },
        );

        setData({ ...data, costCenters: finalUpdatedCostCenters });
      } else {
        setData({ ...data, costCenters: updatedCostCenters });
      }
    } else {
      setData({ ...data, costCenters: [] });
    }
  };

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.slideNext();
  }, []);

  const handleCardClick = (index: number, doc: string | null) => {
    if (sliderRef.current) {
      sliderRef.current.slideTo(index);
      setSelectedDocument(index + 1);
      if (index === selectedDocument - 1) {
        if (doc) {
          if (confirm("Voce deseja abrir o documento?")) {
            window.open(doc, "_blank");
          }
        }
      }
    }
  };

  return (
    <>
      <div className="flex-1">
        <div className="grid grid-cols-12 gap-4 text-sm text-zinc-700">
          <div className="relative col-span-12 px-8">
            <div
              onClick={handlePrev}
              className="text-primary bg-primary/20 absolute top-1/2 left-0 flex -translate-y-1/2 cursor-pointer items-center justify-center rounded-full p-1"
            >
              <ChevronLeft className="h-4 w-4" />
            </div>
            <Swiper
              ref={sliderRef}
              onSwiper={(swiper) => (sliderRef.current = swiper)}
              slidesPerView={"auto"}
              centeredSlides
              spaceBetween={10}
              initialSlide={3}
            >
              {Documents.map((d, index) => (
                <SwiperSlide key={index}>
                  <div
                    onClick={() => handleCardClick(index, d.doc ? d.doc : null)}
                    className="flex w-32 flex-col gap-2"
                  >
                    <div className="border-primary relative w-full cursor-pointer overflow-hidden rounded-lg border">
                      <CircleCheck
                        className={cn(
                          "fill-primary absolute top-1 right-1 z-10 text-white transition duration-200",
                          selectedDocument !== index + 1 && "opacity-0",
                        )}
                      />
                      {d.doc ? (
                        <div className="flex h-32 w-32 items-center justify-center">
                          <FileText
                            className={cn(
                              "m-auto transition duration-200",
                              selectedDocument !== index + 1 && "opacity-20",
                            )}
                          />
                        </div>
                      ) : (
                        <div className="flex h-32 w-32 items-center justify-center bg-zinc-100">
                          <FileText
                            className={cn(
                              "m-auto text-red-500 transition duration-200",
                              selectedDocument !== index + 1 && "opacity-20",
                            )}
                          />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-1 text-sm">
                      <span>{d.doc ? d.name : "Sem Documento"}</span>
                      {d.doc && (
                        <>
                          <div className="flex items-center gap-1">
                            <CalendarDays className="text-primary fill-primary/40 h-5 w-5" />
                            <span className="text-sm text-zinc-600">
                              12/06/2025
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <CircleDollarSign className="text-primary fill-primary/40 h-5 w-5" />
                            <span className="text-primary text-sm">
                              R$ 1.234,56
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div
              onClick={handleNext}
              className="text-primary bg-primary/20 absolute top-1/2 right-0 flex -translate-y-1/2 cursor-pointer items-center justify-center rounded-full p-1"
            >
              <ChevronRight className="h-4 w-4" />
            </div>
          </div>
          <label className="col-span-8 flex flex-col gap-1">
            <span className="text-zinc-600">Fornecedor</span>
            <button className="flex h-16 cursor-pointer items-center gap-2 rounded-2xl border border-zinc-200 px-3 py-2">
              <div className="flex h-full w-6">
                <MapPin size={16} className="text-primary" />
              </div>
              <div className="flex flex-1 flex-col">
                <span className="flex-1 2xl:text-lg">
                  {data.supplier.name || "Selecione"}
                </span>
                <span className="text-zinc-400">
                  {data.supplier.cnpj || ""}
                </span>
              </div>
              <div className="flex h-full w-6 justify-end">
                <Edit size={16} className="text-primary" />
              </div>
            </button>
          </label>

          <label className="col-span-4 flex flex-col gap-1">
            <span className="text-zinc-600">Aprovação</span>

            <div className="flex h-16 items-center gap-2 rounded-2xl border border-zinc-200 px-3 py-2 text-center">
              <div className="flex h-full w-6">
                <DollarSign size={16} className="text-primary" />
              </div>
              <div className="flex h-full flex-1 items-center">
                <span className="flex-1 2xl:text-lg">
                  {data.approval ? data.approval : "Selecione"}
                </span>
              </div>
              <div className="flex h-full w-6 justify-end">
                <Edit size={16} className="text-primary" />
              </div>
            </div>
          </label>

          <div className="col-span-12 flex flex-col gap-1">
            <span className="text-zinc-600">Email de Fatura:</span>
            <button className="flex h-16 cursor-pointer items-center gap-2 rounded-2xl border border-zinc-200 px-3 py-2">
              <div className="flex h-full w-6">
                <Mail size={16} className="text-primary" />
              </div>
              <div className="flex flex-1 flex-col">
                <span className="flex-1 2xl:text-lg">
                  {data.supplier.name || "Selecione"}
                </span>
                <span className="text-zinc-400">
                  {data.supplier.cnpj || ""}
                </span>
              </div>
              <div className="flex h-full w-6 justify-end">
                <Edit size={16} className="text-primary" />
              </div>
            </button>
          </div>

          <label className="col-span-6 flex flex-col gap-1">
            <span className="text-zinc-600">Tipo de Lançamento</span>
            <DropdownMenu>
              <DropdownMenuTrigger className="w-full focus:outline-none">
                <div className="flex h-16 items-center gap-2 rounded-2xl border border-zinc-200 px-3 py-2">
                  <FileText className="text-primary" size={16} />
                  <span className="flex-1 text-zinc-700 2xl:text-lg">
                    {data.paymentTerms || "Selecione"}
                  </span>
                  <Edit className="text-primary ml-auto" size={16} />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="right"
                sideOffset={0}
                align="end"
                className="z-[999] w-72 border-zinc-200"
              >
                {paymentTerms.map((term) => (
                  <DropdownMenuItem
                    key={term}
                    onClick={() => setData({ ...data, paymentTerms: term })}
                    className="hover:bg-primary/20 cursor-pointer transition duration-300"
                  >
                    <div className="flex w-full flex-row items-center justify-between gap-2 border-b border-b-zinc-400 p-1 py-2">
                      {term}
                      {data.paymentTerms === term && (
                        <div className="border-primary bg-primary h-4 w-4 rounded-md border" />
                      )}
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </label>

          <label className="col-span-6 flex flex-col gap-1">
            <span className="text-zinc-600">Tipo de Custo</span>
            <DropdownMenu>
              <DropdownMenuTrigger className="w-full focus:outline-none">
                <div className="flex h-16 items-center gap-2 rounded-2xl border border-zinc-200 px-3 py-2">
                  <DollarSign className="text-primary" size={16} />
                  <span className="flex-1 text-zinc-700 2xl:text-lg">
                    {data.paymentDetails || "Selecione"}
                  </span>
                  <Edit className="text-primary ml-auto" size={16} />
                </div>
              </DropdownMenuTrigger>
            </DropdownMenu>
          </label>

          <label className="col-span-6 flex flex-col gap-1">
            <span className="text-zinc-600">Centro de Custos</span>
            <DropdownMenu>
              <DropdownMenuTrigger className="w-full focus:outline-none">
                <div className="flex h-16 items-center gap-2 overflow-hidden rounded-2xl border border-zinc-200 px-3 py-2">
                  <div className="flex h-full w-6">
                    <Building2 size={16} className="text-primary" />
                  </div>
                  <div className="flex h-full flex-1 items-center">
                    <span className="flex flex-1 flex-col text-left">
                      {selectedCostCenters.length > 0
                        ? `${selectedCostCenters.length} selecionado${selectedCostCenters.length > 1 ? "s" : ""}`
                        : "Selecione"}
                      {selectedCostCenters.length === 0 && (
                        <span className="text-sm text-zinc-500">
                          Selecionar
                        </span>
                      )}
                      {selectedCostCenters.length > 0 && (
                        <span className="truncate text-sm text-zinc-500">
                          {selectedCostCenters
                            .slice(0, 2)
                            .map((cc) => cc.name)
                            .join(", ")}
                          {selectedCostCenters.length > 2 &&
                            ` +${selectedCostCenters.length - 2}`}
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="flex h-full w-6 justify-end">
                    <Edit size={16} className="text-primary" />
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="right"
                align="end"
                className="z-[999] max-h-[500px] overflow-y-auto rounded-lg border-zinc-200"
              >
                <div className="border-primary text-primary mx-auto mb-2 flex h-8 w-[95%] items-center justify-between gap-4 rounded-lg border p-2">
                  <input
                    value={filteredCostCenters}
                    onChange={(e) => setFilteredCostCenters(e.target.value)}
                    placeholder="Pesquisar Centro de Custos"
                    className="flex-1 focus:outline-none"
                  />
                  <Search size={14} />
                </div>

                {/* Add clear all button */}
                {selectedCostCenters.length > 0 && (
                  <div className="px-8 pb-2">
                    <button
                      onClick={() => {
                        setSelectedCostCenters([]);
                        setData({ ...data, costCenters: [] });
                      }}
                      className="text-sm text-red-500 hover:text-red-700"
                    >
                      Limpar seleção
                    </button>
                  </div>
                )}

                <div className="flex flex-col">
                  {costCenters
                    .filter((item) =>
                      item
                        .toLowerCase()
                        .includes(filteredCostCenters.toLowerCase()),
                    )
                    .map((item) => (
                      <DropdownMenuItem
                        key={item}
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          handleCostCenterToggle(item);
                        }}
                        className="hover:bg-primary/20 cursor-pointer transition duration-300"
                      >
                        <div className="flex w-full flex-row items-center justify-between gap-2 border-b border-b-zinc-400 p-1 py-2">
                          {item}
                          {selectedCostCenters.some(
                            (cc) => cc.name === item,
                          ) && (
                            <div className="border-primary bg-primary flex h-4 w-4 items-center justify-center rounded-md border">
                              <Check size={12} className="text-white" />
                            </div>
                          )}
                        </div>
                      </DropdownMenuItem>
                    ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </label>

          {/* --------------------- CONTA CONTÁBIL --------------------- */}
          <label className="col-span-6 flex flex-col gap-1">
            <span className="text-zinc-600">Conta Contábil</span>
            <div className="flex h-16 cursor-pointer items-center gap-2 rounded-2xl border border-zinc-200 px-3 py-2">
              <div className="flex h-full w-6">
                <MapPin size={16} className="text-primary" />
              </div>
              <div className="flex flex-1 flex-col text-left">
                <span className="flex-1">
                  {data.accountingAccount.code || "-"}
                </span>
                <span className="text-zinc-400">
                  {data.accountingAccount.description || "Selecione"}
                </span>
              </div>
              <div className="flex h-full w-6 justify-end">
                <Edit size={16} className="text-primary" />
              </div>
            </div>
          </label>
        </div>
        {data.costCenters.length > 0 && (
          <CostCentersList data={data} setData={setData} />
        )}
      </div>
    </>
  );
}
