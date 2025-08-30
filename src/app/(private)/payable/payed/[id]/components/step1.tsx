import { PayableTransactionProps } from "@/components/calendar";
import { cn } from "@/utils/cn";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  CircleDollarSign,
  DollarSign,
  FileText,
  MapPin,
  MessageCircle,
} from "lucide-react";
import moment from "moment";
import "moment/locale/pt-br";
import { useCallback, useRef, useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { UserProps } from "../page";
moment.locale("pt-br");

interface DocumentProps {
  comments?: string | null;
  documentNumber: string;
  documentUrl?: string | null;
  dueDate: string;
  id: string;
  supplierId: string;
  value: number;
}

interface Props {
  selectedPayable: PayableTransactionProps;
  users: UserProps[];
}

export function Step1({ selectedPayable, users }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sliderRef: any = useRef(null);
  const [selectedDocument, setSelectedDocument] =
    useState<DocumentProps | null>(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.slideNext();
  }, []);

  const handleCardClick = (index: number, document: DocumentProps) => {
    if (sliderRef.current) {
      sliderRef.current.slideTo(index);
      if (document.id === selectedDocument?.id) {
        if (document.documentUrl) {
          if (confirm("Voce deseja abrir o documento?")) {
            window.open(document.documentUrl, "_blank");
          }
        }
      }
      setSelectedDocument(document);
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
              initialSlide={1}
            >
              {selectedPayable.documents.map((d, index) => (
                <SwiperSlide key={index}>
                  <div
                    onClick={() => handleCardClick(index, d)}
                    className="flex w-32 flex-col gap-2"
                  >
                    <div className="border-primary relative w-full cursor-pointer overflow-hidden rounded-lg border">
                      <CircleCheck
                        className={cn(
                          "fill-primary absolute top-1 right-1 z-10 text-white transition duration-200",
                          selectedDocument?.id !== d.id && "opacity-0",
                        )}
                      />
                      {d.documentUrl ? (
                        <div className="flex h-32 w-32 items-center justify-center">
                          <FileText
                            className={cn(
                              "m-auto transition duration-200",
                              selectedDocument?.id !== d.id && "opacity-20",
                            )}
                          />
                        </div>
                      ) : (
                        <div className="flex h-32 w-32 items-center justify-center bg-zinc-100">
                          <FileText
                            className={cn(
                              "m-auto text-red-500 transition duration-200",
                              selectedDocument?.id !== d.id && "opacity-20",
                            )}
                          />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-1 text-sm">
                      <span>
                        {d.documentUrl ? d.documentNumber : "Sem Documento"}
                      </span>
                      <div className="flex items-center gap-1">
                        <CalendarDays className="text-primary fill-primary/40 h-5 w-5" />
                        <span className="text-sm text-zinc-600">
                          {moment(d.dueDate).format("DD/MM/YYYY")}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CircleDollarSign className="text-primary fill-primary/40 h-5 w-5" />
                        <span className="text-primary text-sm">
                          {d.value.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </span>
                      </div>
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
            <span className="text-zinc-600">Fornecedor</span>
            <div className="border-primary relative flex h-12 items-center gap-2 rounded-2xl border px-2 py-1 xl:h-16 xl:px-3 xl:py-2">
              <MapPin
                size={16}
                className="text-primary absolute top-1 left-1 xl:top-2 xl:left-2"
              />
              <div className="flex flex-1 flex-col text-center">
                <span className="flex-1 2xl:text-lg">
                  {selectedPayable.payable.supplier.name}
                </span>
                <span className="text-zinc-400">
                  {selectedPayable.payable.supplier.cnpj}
                </span>
              </div>
            </div>
          </label>

          <label className="col-span-5 flex flex-col gap-1">
            <span className="text-zinc-600">Aprovação</span>

            <div className="border-primary relative flex h-12 items-center gap-2 rounded-2xl border px-2 py-1 text-center xl:h-16 xl:px-3 xl:py-2">
              <DollarSign
                size={16}
                className="text-primary absolute top-1 left-1 xl:top-2 xl:left-2"
              />
              <div className="flex h-full flex-1 items-center">
                <span className="flex-1 2xl:text-lg">
                  {
                    users.find((u) => u.id === selectedPayable.approvedById)
                      ?.name as string
                  }
                </span>
              </div>
            </div>
          </label>

          <label className="col-span-12 flex flex-col gap-1">
            <span className="text-zinc-600">Comentário</span>
            <div className="border-primary relative flex h-12 items-center gap-2 rounded-2xl border px-2 py-1 xl:h-16 xl:px-3 xl:py-2">
              <MessageCircle
                size={16}
                className="text-primary absolute top-1 left-1 xl:top-2 xl:left-2"
              />
              <div className="flex flex-1 flex-col text-center">
                <span className="flex-1 2xl:text-lg">
                  {selectedDocument?.comments || "Sem comentário"}
                </span>
              </div>
            </div>
          </label>

          <label className="col-span-6 flex flex-col gap-1">
            <span className="text-zinc-600">Tipo de Lançamento</span>
            <div className="border-primary relative flex h-12 items-center gap-2 rounded-2xl border px-2 py-1 xl:h-16 xl:px-3 xl:py-2">
              <FileText
                className="text-primary absolute top-1 left-1 xl:top-2 xl:left-2"
                size={16}
              />
              <span className="flex-1 text-center text-zinc-700 2xl:text-lg">
                {selectedPayable.payable.ledgerAccount.code +
                  " - " +
                  selectedPayable.payable.ledgerAccount.name}
              </span>
            </div>
          </label>

          <label className="col-span-6 flex flex-col gap-1">
            <span className="text-zinc-600">Tipo de Custo</span>
            <div className="border-primary relative flex h-12 items-center gap-2 rounded-2xl border px-2 py-1 xl:h-16 xl:px-3 xl:py-2">
              <DollarSign
                className="text-primary absolute top-1 left-1 xl:top-2 xl:left-2"
                size={16}
              />
              <span className="flex-1 text-center text-zinc-700 2xl:text-lg">
                {selectedPayable.payable.ledgerAccount.entryType.code +
                  " - " +
                  selectedPayable.payable.ledgerAccount.entryType.name}
              </span>
            </div>
          </label>

          {/* <label className="col-span-6 flex flex-col gap-1">
            <span className="text-zinc-600">Centro de Resultados</span>
            <div className="relative flex h-12 items-center gap-2 overflow-hidden rounded-2xl border border-primary px-2 py-1 xl:h-16 xl:px-3 xl:py-2">
              <Building2
                size={16}
                className="text-primary absolute top-1 left-1 xl:top-2 xl:left-2"
              />
              <div className="flex h-full flex-1 items-center">
                <span className="ml-4 flex flex-1 flex-col text-left">
                  1 selecionado
                  <span className="truncate text-sm text-zinc-500">
                    Centro de Resultado 1
                  </span>
                </span>
              </div>
            </div>
          </label>

          <label className="col-span-6 flex flex-col gap-1">
            <span className="text-zinc-600">Conta Contábil</span>
            <div className="relative flex h-12 items-center gap-2 rounded-2xl border border-primary px-2 py-1 xl:h-16 xl:px-3 xl:py-2">
              <MapPin
                size={16}
                className="text-primary absolute top-1 left-1 xl:top-2 xl:left-2"
              />
              <div className="ml-4 flex flex-1 flex-col overflow-hidden text-left">
                <span className="flex-1">Código da Conta Contábil Tal</span>
                <span className="truncate text-zinc-400">
                  Conta Contábil Tal
                </span>
              </div>
            </div>
          </label> */}
        </div>
        {/* {selectedPayable.payable.costCenters.length > 0 && (
          <CostCentersList data={data} setData={setData} />
        )} */}
      </div>
    </>
  );
}
