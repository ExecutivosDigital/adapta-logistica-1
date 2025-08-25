import { cn } from "@/utils/cn";
import {
  Building2,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  CircleDollarSign,
  DollarSign,
  FileText,
  Mail,
  MapPin,
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

  const Documents = [
    {
      id: "1",
      name: "CTE 1",
      doc: "/test-pdf.pdf",
    },
    {
      id: "2",
      name: "CTE 2",
      doc: "/test-pdf.pdf",
    },
    {
      id: "3",
      name: "CTE 3",
      doc: "/test-pdf.pdf",
    },
    {
      id: "4",
      name: "CTE 4",
      doc: "/test-pdf.pdf",
    },
    {
      id: "5",
      name: "CTE 5",
      doc: "/test-pdf.pdf",
    },
    {
      id: "6",
      name: "CTE 6",
      doc: "/test-pdf.pdf",
    },
    {
      id: "7",
      name: "CTE 7",
      doc: "/test-pdf.pdf",
    },
    {
      id: "8",
      name: "CTE 8",
      doc: "/test-pdf.pdf",
    },
    {
      id: "9",
      name: "CTE 9",
      doc: "/test-pdf.pdf",
    },
    {
      id: "10",
      name: "CTE 10",
      doc: "/test-pdf.pdf",
    },
  ];

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
                            <span className="text-xs text-zinc-600">
                              00.000.000/0000-00
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
          <label className="col-span-7 flex flex-col gap-1">
            <span className="text-zinc-600">Cliente</span>
            <div className="relative flex h-12 items-center gap-2 rounded-2xl border border-zinc-200 px-2 py-1 text-center xl:h-16 xl:px-3 xl:py-2">
              <MapPin
                size={16}
                className="text-primary absolute top-1 left-1 xl:top-2 xl:left-2"
              />
              <div className="flex flex-1 flex-col">
                <span className="flex-1 2xl:text-lg">Cliente Tal</span>
                <span className="text-xs text-zinc-400">
                  00.000.000/0000-00
                </span>
                <span className="text-xs text-zinc-400">Rua Tal, 123</span>
              </div>
            </div>
          </label>

          <label className="col-span-5 flex flex-col gap-1">
            <span className="text-zinc-600">Aprovação</span>
            <div className="relative flex h-12 items-center gap-2 rounded-2xl border border-zinc-200 px-2 py-1 text-center xl:h-16 xl:px-3 xl:py-2">
              <DollarSign
                size={16}
                className="text-primary absolute top-1 left-1 xl:top-2 xl:left-2"
              />
              <div className="flex h-full flex-1 items-center">
                <span className="flex-1 2xl:text-lg">Usuário Tal</span>
              </div>
            </div>
          </label>

          <div className="col-span-12 flex flex-col gap-1">
            <span className="text-zinc-600">Email de Fatura:</span>
            <div className="relative flex h-12 items-center gap-2 rounded-2xl border border-zinc-200 px-2 py-1 text-center xl:h-16 xl:px-3 xl:py-2">
              <Mail
                size={16}
                className="text-primary absolute top-1 left-1 xl:top-2 xl:left-2"
              />
              <div className="flex flex-1 flex-col">
                <span className="flex-1 2xl:text-lg">email.tal@email.com</span>
              </div>
            </div>
          </div>

          <label className="col-span-6 flex flex-col gap-1">
            <span className="text-zinc-600">Centro de Resultados</span>
            <div className="relative flex h-12 items-center gap-2 overflow-hidden rounded-2xl border border-zinc-200 px-2 py-1 xl:h-16 xl:px-3 xl:py-2">
              <Building2
                size={16}
                className="text-primary absolute top-1 left-1 xl:top-2 xl:left-2"
              />
              <div className="flex h-full flex-1 items-center">
                <span className="ml-4 flex flex-1 flex-col text-left">
                  1 selecionado
                  <span className="truncate text-sm text-zinc-500">
                    Centro de Resultados Tal
                  </span>
                </span>
              </div>
            </div>
          </label>

          <label className="col-span-6 flex flex-col gap-1">
            <span className="text-zinc-600">Conta Contábil</span>
            <div className="relative flex h-12 items-center gap-2 rounded-2xl border border-zinc-200 px-2 py-1 xl:h-16 xl:px-3 xl:py-2">
              <MapPin
                size={16}
                className="text-primary absolute top-1 left-1 xl:top-2 xl:left-2"
              />
              <div className="ml-4 flex flex-1 flex-col overflow-hidden text-left">
                <span className="flex-1">123</span>
                <span className="truncate text-zinc-400">
                  Conta Contábil tal
                </span>
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
