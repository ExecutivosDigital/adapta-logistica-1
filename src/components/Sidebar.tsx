"use client";

import { clsx } from "clsx";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useSidebar } from "@/context/SidebarContext";
import Image from "next/image";
import { useState } from "react";

/* ---------- estrutura de navegação ---------- */
export type Item = {
  label: string;
  icon: string;
  href?: string; // link simples
  badge?: string | number; // pílula à direita
  children?: Item[]; // suporta sub‑níveis ilimitados agora
};

const NAV: { heading: string; items: Item[] }[] = [
  {
    heading: "WORKFLOW",
    items: [
      {
        label: "Dashboard",
        icon: "/icons/sidebar-dashboard.png",
        href: "/",
        children: [
          { label: "Home", icon: "/icons/sidebar-dashboard.png", href: "/" },
          {
            label: "Home 2",
            icon: "/icons/sidebar-dashboard.png",
            href: "/home2",
          },
        ],
      },
      {
        label: "Transações",
        icon: "/icons/sidebar-transactions.png",
        children: [
          {
            label: "Títulos á Receber",
            icon: "/icons/sidebar-transactions.png",
            href: "/transactions/receivable",
            children: [
              {
                label: "Recebidos Consolidado",
                icon: "/icons/sidebar-transactions.png",
                href: "/transactions/receivable/consolidated",
              },
              {
                label: "À Receber neste Mês",
                icon: "/icons/sidebar-transactions.png",
                href: "/transactions/receivable/this-month",
              },
              {
                label: "À Receber Atrasados",
                icon: "/icons/sidebar-transactions.png",
                href: "/transactions/receivable/overdue",
              },
            ],
          },
          {
            label: "Contas á Pagar",
            icon: "/icons/sidebar-transactions.png",
            href: "/transactions/payable",
            children: [
              {
                label: "Pagamentos Consolidado",
                icon: "/icons/sidebar-transactions.png",
                href: "/transactions/payable/consolidated",
              },
              {
                label: "Pagamentos neste Mês",
                icon: "/icons/sidebar-transactions.png",
                href: "/transactions/payable/this-month",
              },
              {
                label: "Pagamentos Atrasados",
                icon: "/icons/sidebar-transactions.png",
                href: "/transactions/payable/overdue",
              },
            ],
          },
        ],
      },
      {
        label: "Agenda",
        icon: "/icons/sidebar-calendar.png",
        href: "/calendar",
      },
      { label: "Chat", icon: "/icons/sidebar-chat.png", href: "/chat" },
      {
        label: "Fornecedores e Clientes",
        icon: "/icons/sidebar-clients.png",
        href: "/suppliers-and-customers",
      },
      { label: "Plano de Contas", icon: "/icons/sidebar-plan.png", href: "#" },
      {
        label: "Aprovação de Compras",
        icon: "/icons/sidebar-approval.png",
        href: "/purchase-approval",
      },
    ],
  },
  {
    heading: "EMPRESA",
    items: [
      {
        label: "Contas Bancárias",
        icon: "/icons/sidebar-accounts.png",
        children: [
          {
            label: "Contas",
            icon: "/icons/sidebar-accounts.png",
            href: "/bank-accounts",
          },
          {
            label: "Criar Conta",
            icon: "/icons/sidebar-accounts.png",
            href: "/bank-accounts/create",
          },
        ],
      },
      {
        label: "Organização",
        icon: "/icons/sidebar-org.png",
        href: "/register/branches-list",
      },
    ],
  },
  {
    heading: "Seus Dados",
    items: [
      {
        label: "Perfil",
        icon: "/icons/sidebar-user.png",
        href: "/profile",
      },
    ],
  },
];

/* ---------- componente ---------- */
export default function Sidebar() {
  const pathname = usePathname();
  const { isOpenMobile, isCollapsed, closeMobile, toggleCollapse } =
    useSidebar();

  // guarda quais sub-menus estão abertos
  const [openGroup, setOpenGroup] = useState<Record<string, boolean>>({});

  const width = isCollapsed ? "w-16" : "w-64";

  /* util ─ verifica rota ativa em profundidade */
  const isActive = (item: Item): boolean => {
    if (item.href && item.href !== "#" && pathname === item.href) return true;
    return item.children?.some(isActive) ?? false;
  };

  /* ---------- render recursivo ---------- */
  const renderItems = (items: Item[], level = 0) =>
    items.map((item) => {
      const open = !!openGroup[item.label];
      const collapsedProp = level === 0 ? isCollapsed : false; // só colapsa no 1º nível

      return (
        <div
          key={`${level}-${item.label}`}
          className="flex w-full flex-col gap-0.5"
        >
          <SidebarItem
            item={item}
            active={isActive(item)}
            collapsed={collapsedProp}
            open={open}
            toggle={() => {
              setOpenGroup((s) => ({ ...s, [item.label]: !s[item.label] }));
              if (isCollapsed && level === 0) {
                // se sidebar está colapsada, expande ao abrir o menu
                toggleCollapse();
              }
            }}
            isSub={level > 0}
            closeMobile={closeMobile}
          />

          {item.children && open && (
            <div
              className={clsx(
                "flex w-full flex-col pt-1",
                level === 0 ? "pl-3" : "pl-6", // indentação incremental
                collapsedProp && "hidden",
              )}
            >
              {renderItems(item.children, level + 1)}
            </div>
          )}
        </div>
      );
    });

  /* ---------- output ---------- */
  return (
    <>
      {/* backdrop (mobile) */}
      <div
        onClick={closeMobile}
        className={clsx(
          "fixed inset-0 z-[1010] cursor-pointer bg-black/40 backdrop-blur-[2px] transition-opacity xl:hidden",
          isOpenMobile ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      <aside
        className={clsx(
          "peer fixed z-[1011] flex h-full min-h-screen flex-col overflow-hidden bg-[#FAFBFD] transition-all duration-300",
          width,
          isOpenMobile ? "translate-x-0" : "-translate-x-full xl:translate-x-0",
        )}
      >
        {/* topo/logo */}
        <div
          className={clsx(
            "flex h-16 items-center justify-between overflow-hidden border-b border-b-zinc-200 px-4",
            isCollapsed && "justify-center",
          )}
        >
          <button
            onClick={toggleCollapse}
            aria-label="Toggle sidebar"
            className="flex h-12 cursor-pointer flex-row items-center justify-center gap-2"
          >
            <Image
              src="/logo/icon.png"
              alt=""
              width={500}
              height={500}
              className="h-10 w-max"
            />
            {!isCollapsed && (
              <Image
                src="/logo/logoText.png"
                alt=""
                width={5000}
                height={5000}
                className="h-12 w-max"
              />
            )}
          </button>
        </div>

        {/* navegação */}
        <nav className="scrollbar-hide flex-1 overflow-y-scroll px-2 py-4">
          {NAV.map(({ heading, items }) => (
            <div key={heading} className="mb-6 flex flex-col gap-1 first:mt-0">
              {/* heading */}
              <h4 className="mb-2 h-5 overflow-hidden px-2 text-xs font-semibold tracking-wider text-neutral-400 uppercase">
                {!isCollapsed ? heading : ""}
              </h4>

              {/* itens recursivos */}
              {renderItems(items)}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}

/* ---------- Item isolado ---------- */
interface SidebarItemProps {
  item: Item;
  active: boolean;
  collapsed: boolean;
  open?: boolean;
  toggle?: () => void;
  isSub?: boolean;
  closeMobile: () => void;
}

function SidebarItem({
  item,
  active,
  collapsed,
  open,
  toggle,
  isSub,
  closeMobile,
}: SidebarItemProps) {
  // estilos base
  const base =
    "group flex items-center  w-full gap-3   px-3 py-2 text-sm font-medium transition-all duration-300";

  // ---------- LÓGICA DE ESTILOS ----------
  const parentClasses = clsx(base, {
    "bg-primary text-white rounded-md": active,
    "text-zinc-900 hover:bg-zinc-100 hover:text-primary rounded-md": !active,
  });

  const childClasses = clsx(base, "pl-0", {
    "border-l-4 border-primary text-primary pl-2": active,
    "border-l-4 border-zinc-400 text-zinc-700 hover:text-primary pl-2": !active,
  });

  const cls = isSub ? childClasses : parentClasses;

  // ---------- CORES DO ÍCONE ----------
  const iconColor = (() => {
    if (isSub) {
      return active ? "text-primary" : "text-zinc-500 group-hover:text-primary";
    }
    return active ? "text-white" : "text-zinc-500 group-hover:text-primary";
  })();

  /* conteúdo comum */
  const inner = (
    <>
      <Image
        src={
          active
            ? isSub
              ? item.icon
              : item.icon.split(".")[0] + "-white." + item.icon.split(".")[1]
            : item.icon
        }
        alt=""
        width={100}
        height={100}
        className={clsx("h-5 w-5 shrink-0", iconColor)}
      />
      {!collapsed && <span className="truncate">{item.label}</span>}

      {/* badge / chevron */}
      {!collapsed && (
        <span className="ml-auto flex items-center gap-1">
          {item.badge !== undefined && (
            <span
              className={clsx(
                "rounded-full bg-orange-100 px-2 text-xs font-semibold text-orange-600",
                active && "bg-orange-600 text-white",
              )}
            >
              {item.badge}
            </span>
          )}
          {item.children && (
            <div
              onClick={(e) => {
                e.stopPropagation();
                toggle?.();
              }}
              className="flex cursor-pointer items-center justify-center rounded-md p-1 transition-all duration-300 hover:bg-zinc-400"
            >
              <ChevronDown
                className={clsx(
                  "h-4 w-4 transition-transform",
                  open ? "rotate-180" : "",
                  isSub
                    ? active
                      ? "text-primary"
                      : "group-hover:text-primary text-neutral-500"
                    : active
                      ? "text-white"
                      : "group-hover:text-primary text-neutral-500",
                )}
              />
            </div>
          )}
        </span>
      )}
    </>
  );

  /* link ou botão-pai -- depende se tem children */
  if (item.children) {
    return (
      <button
        onClick={() => {
          if (item.href) {
            window.location.href = item.href;
          } else toggle?.();
        }}
        className={cls}
      >
        {inner}
      </button>
    );
  }

  return (
    <Link href={item.href ?? "#"} onClick={closeMobile} className={cls}>
      {inner}
    </Link>
  );
}
