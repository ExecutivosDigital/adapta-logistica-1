"use client";

import { useEffect } from "react";

export default function CostCenter() {
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("navigationComplete"));
  }, []);

  return <div></div>;
}
