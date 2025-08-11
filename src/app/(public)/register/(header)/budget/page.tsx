"use client";
import { Table } from "./components/table";

export default function Budget() {
  return (
    <div className="w-[calc(100vw-8rem)] overflow-x-scroll">
      <Table />
    </div>
  );
}
