"use client";
import { useEffect } from "react";
import { Table } from "./components/table";

export default function Budget() {
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("navigationComplete"));
  }, []);

  return (
    <div className="w-[calc(100vw-8rem)] overflow-x-scroll">
      <Table />
    </div>
  );
}
