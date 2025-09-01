"use client";

import ChatWidget from "@/components/chatPopup";
import { LoadingOverlay } from "@/components/loading-overlay";
import { useLoadingContext } from "@/context/LoadingContext";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isNavigating } = useLoadingContext();
  return (
    <>
      {isNavigating && <LoadingOverlay />}
      {children}
      <ChatWidget />
    </>
  );
}
