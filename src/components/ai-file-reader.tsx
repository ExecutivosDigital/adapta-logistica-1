"use client";

import Image from "next/image";
import { useState } from "react";

interface AiFileReaderProps {
  handleData: (data: unknown) => void;
}

export function AiFileReader({ handleData }: AiFileReaderProps) {
  const [isShowingDocument] = useState(false);

  return (
    <>
      {!isShowingDocument ? (
        <div
          onClick={() => handleData({})}
          className="border-primary flex h-[80%] w-[80%] cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-8"
          style={{ borderWidth: "2px", borderSpacing: "80px" }}
        >
          <div className="border-primary flex h-16 w-16 items-center justify-center rounded-full border">
            <span className="text-primary text-3xl font-light">+</span>
          </div>
          <div className="mt-2 text-center">
            <p className="text-primary font-medium">Upload de Documento</p>
            <p className="text-primary/70 text-sm">
              Arraste e solte o arquivo aqui ou adicione do seu dispositivo
              <br />
              PDF ou PNG
            </p>
          </div>
        </div>
      ) : (
        <div className="h-full w-full overflow-y-auto">
          <Image
            src="/doc.png"
            width={500}
            height={500}
            className="h-max w-full"
            alt=""
          />
        </div>
      )}
    </>
  );
}
