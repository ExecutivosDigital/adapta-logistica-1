"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTitle,
} from "@/components/ui/sheet";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import Select from "react-select";

interface NewTransactionSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const colorStyles = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  option: (styles: any, { isSelected }: any) => ({
    ...styles,
    color: isSelected ? "#000" : "#fff",
    background: isSelected ? "#fff" : "#000",
  }),
};

export function NewTransactionSheet({
  open,
  onOpenChange,
}: NewTransactionSheetProps) {
  const [isCreating] = useState(false);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetTitle>Detalhes da Transação</SheetTitle>
        <form className="flex h-full flex-col justify-between">
          <div className="space-y-4">
            <div>
              <Label htmlFor="lorem1" className="text-default-600 mb-1.5">
                Lorem ipsum
              </Label>
              <Input id="lorem1" placeholder="Lorem ipsum" />
            </div>
            <div>
              <Label htmlFor="lorem2" className="text-default-600 mb-1.5">
                Lorem ipsum
              </Label>
              <Select
                className="react-select outline-none focus:outline-none"
                classNamePrefix="select"
                noOptionsMessage={() => "Nenhuma opção encontrada"}
                styles={colorStyles}
                isMulti
                placeholder="Lorem ipsum"
              />
            </div>
            <div>
              <Label htmlFor="lorem3" className="text-default-600 mb-1.5">
                Lorem ipsum
              </Label>
              <textarea
                id="lorem3"
                placeholder="Lorem ipsum"
                className="h-32 w-full rounded-md border border-gray-300 p-3 focus:outline-none"
              />
            </div>
            <div>
              <Label htmlFor="lorem4" className="text-default-600 mb-1.5">
                Lorem ipsum
              </Label>
              <Select
                className="react-select"
                classNamePrefix="select"
                noOptionsMessage={() => "Nenhuma opção encontrada"}
                styles={colorStyles}
                placeholder="Lorem ipsum"
              />
            </div>

            <div>
              <Label htmlFor="lorem5" className="text-default-600 mb-1.5">
                Lorem ipsum
              </Label>
              <Input type="date" placeholder="Lorem ipsum" />
            </div>

            <div>
              <Label htmlFor="lorem6" className="text-default-600 mb-1.5">
                Lorem ipsum
              </Label>
              <Select
                className="react-select"
                classNamePrefix="select"
                noOptionsMessage={() => "Nenhuma opção encontrada"}
                styles={colorStyles}
                placeholder="Lorem ipsum"
              />
            </div>
          </div>
          <SheetFooter className="mt-4 gap-2 pb-20">
            <SheetClose asChild>
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </SheetClose>
            <Button type="submit">
              {isCreating ? (
                <Loader2 className="mr-2 animate-spin" />
              ) : (
                "Salvar Transação"
              )}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
