"use client";

import { useEffect } from "react";

export default function Budget() {
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("navigationComplete"));
  }, []);

  return <div></div>;
}
