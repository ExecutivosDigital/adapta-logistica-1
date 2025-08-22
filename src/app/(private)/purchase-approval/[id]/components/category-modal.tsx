"use client";
import { Modal } from "@/components/ui/Modal";
import { cn } from "@/utils/cn";
import { Search, X } from "lucide-react";
import { DataType } from "../page";

interface CategoryModalProps {
  show: boolean;
  onHide: () => void;
  filteredCategories: string;
  setFilteredCategories: (value: string) => void;
  categoryOptions: { type: string }[];
  data: DataType;
  setData: (value: DataType) => void;
}

export function CategoryModal({
  show,
  onHide,
  filteredCategories,
  setFilteredCategories,
  categoryOptions,
  data,
  setData,
}: CategoryModalProps) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      className="h-[85vh] w-[50vw] border-none px-8"
    >
      <X
        className="text-primary absolute top-2 right-2 ml-auto cursor-pointer"
        onClick={onHide}
      />
      <div className="flex h-full w-full flex-col gap-4 pt-6">
        <div className="border-primary text-primary flex h-8 w-full flex-shrink-0 items-center justify-between gap-4 rounded-lg border p-2 text-sm">
          <input
            value={filteredCategories || ""}
            onChange={(e) => setFilteredCategories(e.target.value)}
            placeholder="Pesquisar a Categoria"
            className="flex-1 focus:outline-none"
          />
          <Search size={14} />
        </div>
        <div className="grid min-h-0 grid-cols-2 gap-8 overflow-y-auto">
          {categoryOptions.length === 0 && (
            <div className="col-span-2 p-2 text-center text-sm text-zinc-600">
              Nenhum item encontrado
            </div>
          )}
          {categoryOptions?.map(({ type }, index) => (
            <button
              key={`${type}-${index}`}
              onClick={() => {
                setData({ ...data, category: type });
                onHide();
              }}
              className="hover:bg-primary/20 h-max cursor-pointer transition duration-300"
            >
              <div className="flex w-full flex-row items-center justify-between gap-2 border-b border-b-zinc-400 p-1 py-2">
                {type}
                <div
                  className={cn(
                    "border-primary bg-primary h-4 w-4 rounded-md border",
                    data.category !== type && "opacity-0",
                  )}
                />
              </div>
            </button>
          ))}
        </div>
      </div>
    </Modal>
  );
}
