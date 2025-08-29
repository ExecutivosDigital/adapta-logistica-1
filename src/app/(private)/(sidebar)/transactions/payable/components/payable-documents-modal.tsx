"use client";
import { PayableTransactionProps } from "@/context/PayableContext";
import { cn } from "@/utils/cn";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  CircleDollarSign,
  FileText,
  MessageCircle,
} from "lucide-react";
import moment from "moment";
import { useCallback, useRef, useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

interface DocumentProps {
  comments?: string | null;
  documentNumber: string;
  documentUrl?: string | null;
  dueDate: string;
  id: string;
  supplierId: string;
  value: number;
}

interface PayableDocumentsModalProps {
  isOpenPayableDocumentsModal: boolean;
  setIsOpenPayableDocumentsModal: () => void;
  selectedPayable: PayableTransactionProps;
}

export function PayableDocumentsModal({
  isOpenPayableDocumentsModal,
  setIsOpenPayableDocumentsModal,
  selectedPayable,
}: PayableDocumentsModalProps) {
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
      <div
        className="fixed top-0 right-0 bottom-0 left-0 z-[990] flex w-full cursor-pointer items-center justify-center bg-white/50 p-4 text-center backdrop-blur-[4px] transition-opacity duration-300 ease-in-out"
        style={{ opacity: isOpenPayableDocumentsModal ? 1 : 0 }}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setIsOpenPayableDocumentsModal();
          }
        }}
      >
        <div
          className={cn(
            "relative z-20 flex h-max w-[90vw] flex-col items-center justify-start gap-4 overflow-hidden rounded-xl border bg-white shadow-md xl:w-[50vw]",
          )}
        >
          <div className="flex h-full w-full flex-col justify-between rounded-xl shadow-xl">
            <div className="bg-primary flex h-16 items-center justify-between px-6 py-4">
              <h2 className="text-lg font-semibold text-white">
                Lista de Documentos do À Pagar
              </h2>
            </div>
            <div className="flex flex-col">
              <div className="relative col-span-12 flex items-center gap-4 px-2 py-4">
                <div
                  onClick={handlePrev}
                  className="text-primary bg-primary/20 flex cursor-pointer items-center justify-center rounded-full p-1"
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
                  {selectedPayable.documents.length !== 0 ? (
                    selectedPayable.documents.map((d, index) => (
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
                                    selectedDocument?.id !== d.id &&
                                      "opacity-20",
                                  )}
                                />
                              </div>
                            ) : (
                              <div className="flex h-32 w-32 items-center justify-center bg-zinc-100">
                                <FileText
                                  className={cn(
                                    "m-auto text-red-500 transition duration-200",
                                    selectedDocument?.id !== d.id &&
                                      "opacity-20",
                                  )}
                                />
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col gap-1 text-sm">
                            <span>
                              {d.documentUrl
                                ? d.documentNumber
                                : "Sem Documento"}
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
                    ))
                  ) : (
                    <div className="flex h-32 w-32 items-center justify-center bg-zinc-100">
                      <span>Sem Documentos</span>
                    </div>
                  )}
                </Swiper>
                <div
                  onClick={handleNext}
                  className="text-primary bg-primary/20 flex cursor-pointer items-center justify-center rounded-full p-1"
                >
                  <ChevronRight className="h-4 w-4" />
                </div>
              </div>
              <label className="flex flex-col gap-1 px-4">
                <span className="w-max text-zinc-600">Comentário</span>
                <div className="relative flex h-12 items-center gap-2 rounded-2xl border border-zinc-200 px-2 py-1 xl:h-16 xl:px-3 xl:py-2">
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
            </div>

            <button
              onClick={setIsOpenPayableDocumentsModal}
              className="text-primary m-2 cursor-pointer self-end rounded-md border border-zinc-200 px-2 py-1 font-bold xl:px-6 xl:py-2"
            >
              Voltar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
