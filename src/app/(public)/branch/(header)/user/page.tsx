"use client";

import { useEffect } from "react";

export default function User() {
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("navigationComplete"));
  }, []);

  return <div></div>;
}
