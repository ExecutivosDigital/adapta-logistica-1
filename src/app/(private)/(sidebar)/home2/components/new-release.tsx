"use client";
import { OrangeButton } from "@/components/OrangeButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Home2NewReleaseSheet } from "./new-release-sheet";

export function Home2NewRelease() {
  const router = useRouter();
  const [isNewReleaseSheetOpen, setIsNewReleaseSheetOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div>
            <OrangeButton
              disabled
              className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 text-white shadow-sm transition duration-300"
            >
              <span className="text-sm"> Criar Lançamento</span>
              <ChevronRight />
            </OrangeButton>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="end" className="z-[999]">
          <DropdownMenuItem
            onClick={() => router.push("/payable/new")}
            className="hover:bg-primary/20 cursor-pointer transition duration-300"
          >
            <div className="flex w-full flex-row items-center justify-between gap-2 border-b p-1 py-2">
              Lançar Despesa
              <div className="border-primary h-4 w-4 rounded-md border"></div>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-primary/20 cursor-pointer transition duration-300">
            <div className="flex w-full flex-row items-center justify-between gap-2 border-b p-1 py-2">
              Pagamento de Colaboradores
              <div className="border-primary h-4 w-4 rounded-md border"></div>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push("/payable/recurring/new")}
            className="hover:bg-primary/20 cursor-pointer transition duration-300"
          >
            <div className="flex w-full flex-row items-center justify-between gap-2 border-b p-1 py-2">
              Desp. Recorrentes
              <div className="border-primary h-4 w-4 rounded-md border"></div>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {isNewReleaseSheetOpen && (
        <Home2NewReleaseSheet
          open={isNewReleaseSheetOpen}
          onOpenChange={() => setIsNewReleaseSheetOpen(false)}
        />
      )}
    </>
  );
}
