"use client";
import { cn } from "@/utils/cn";
import { usePathname, useRouter } from "next/navigation";
import { FooterHome } from "../../public/icons/footer-home";
import { FooterHomeActive } from "../../public/icons/footer-home-active";
import { FooterPayable } from "../../public/icons/footer-payable";
import { FooterPayableActive } from "../../public/icons/footer-payable-active";
import { FooterReceivable } from "../../public/icons/footer-receivable";
import { FooterReceivableActive } from "../../public/icons/footer-receivable-active";

export function Footer() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="fixed bottom-6 left-1/2 z-[980] flex w-[200px] -translate-x-1/2 items-center justify-between rounded-xl border border-zinc-200 bg-white p-2 shadow-lg xl:hidden">
      <div
        onClick={() => router.push("/transactions/receivable")}
        className={cn(
          "flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition duration-200",
        )}
      >
        {pathname === "/transactions/receivable" ||
        pathname.includes("/transactions/receivable") ? (
          <FooterReceivableActive className="text-primary" />
        ) : (
          <FooterReceivable className="text-primary" />
        )}
      </div>
      <div
        onClick={() => router.push("/")}
        className={cn(
          "flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition duration-200",
        )}
      >
        {pathname === "/" ? (
          <FooterHomeActive className="text-primary" />
        ) : (
          <FooterHome className="text-primary" />
        )}
      </div>
      <div
        onClick={() => router.push("/transactions/payable")}
        className={cn(
          "flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition duration-200",
        )}
      >
        {pathname === "/transactions/payable" ||
        pathname.includes("/transactions/payable") ? (
          <FooterPayableActive className="text-primary" />
        ) : (
          <FooterPayable className="text-primary" />
        )}
      </div>
    </div>
  );
}
