"use client";
import { cn } from "@/utils/cn";
import { Home, MoveDownLeft, MoveUpRight } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export function Footer() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="fixed bottom-6 left-1/2 z-[1000] flex w-[200px] -translate-x-1/2 items-center justify-between rounded-xl border border-zinc-200 bg-white p-2 shadow-lg xl:hidden">
      <div
        onClick={() => router.push("/transactions/receivable")}
        className={cn(
          "flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border transition duration-200",
          (pathname === "/transactions/receivable" ||
            pathname.includes("/transactions/receivable")) &&
            "bg-primary border-white text-white",
        )}
      >
        <MoveDownLeft />
      </div>
      <div
        onClick={() => router.push("/")}
        className={cn(
          "flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border p-1 transition duration-200",
          pathname === "/" && "bg-primary border-white text-white",
        )}
      >
        <Home />
      </div>
      <div
        onClick={() => router.push("/transactions/payable")}
        className={cn(
          "flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border transition duration-200",
          (pathname === "/transactions/payable" ||
            pathname.includes("/transactions/payable")) &&
            "bg-primary border-white text-white",
        )}
      >
        <MoveUpRight />
      </div>
    </div>
  );
}
