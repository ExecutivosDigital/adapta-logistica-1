"use client";

import { clsx } from "clsx";
import {
  Banknote,
  CheckSquare,
  ChevronDown,
  CreditCard,
  DollarSign,
  Home,
  Layers,
  List,
  Plus,
  RefreshCw,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useSidebar } from "@/context/SidebarContext";
import Image from "next/image";
import { useState } from "react";

/* ---------- estrutura de navegação ---------- */
export type Item = {
  label: string;
  icon: React.ElementType;
  href?: string; // link simples
  badge?: string | number; // pílula à direita
  children?: Item[]; // sub-nível
};

const NAV: { heading: string; items: Item[] }[] = [
  {
    heading: "MENU INICIAL",
    items: [
      {
        label: "Dashboard",
        icon: Home,
        href: "#",
        children: [
          { label: "Home", icon: Home, href: "/" },
          { label: "Home 2", icon: Home, href: "/home2" },
          { label: "Dashboard", icon: Home, href: "#" },
        ],
      },
      {
        label: "Transações",
        icon: RefreshCw,
        children: [
          {
            label: "Receitas",
            icon: DollarSign,
            href: "#",
          },
          {
            label: "Despesas",
            icon: DollarSign,
            href: "#",
          },
        ],
      },
      { label: "Lorem", icon: List, href: "#" },
      {
        label: "Cartão de Crédito",
        icon: CreditCard,
        href: "#",
      },
      { label: "Plano de Contas", icon: Layers, href: "#" },
      {
        label: "Contas Bancárias",
        icon: Banknote,
        badge: 4,
        children: [
          { label: "Empresa", icon: Banknote, href: "#" },
          { label: "Pessoal", icon: Banknote, href: "#" },
        ],
      },
    ],
  },
  {
    heading: "WORKFLOW",
    items: [
      {
        label: "Relação de Compras",
        icon: ShoppingCart,
        href: "#",
      },
      {
        label: "Aprovação de Compras",
        icon: CheckSquare,
        href: "/purchase-approval",
      },
      {
        label: "Pagamentos",
        icon: DollarSign,
        href: "#",
      },
      { label: "Lorem", icon: Plus, href: "#" },
      {
        label: "Organização",
        icon: Layers,
        href: "#",
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

  /* util ─ verifica rota ativa ou filho ativo */
  const isActive = (item: Item): boolean => {
    // Se houver filhos, verificamos se algum filho coincide com a rota atual
    if (item.children?.length) {
      return item.children.some((c) => c.href && pathname === c.href);
    }

    // Caso contrário, comparamos o próprio href, ignorando marcadores vazios / #
    if (item.href && item.href !== "#") {
      return pathname === item.href;
    }

    return false;
  };

  /* ---------- render ---------- */
  return (
    <>
      {/* backdrop (mobile) */}
      <div
        onClick={closeMobile}
        className={clsx(
          "fixed inset-0 z-40 bg-black/40 transition-opacity lg:hidden",
          isOpenMobile ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      <aside
        className={clsx(
          "peer fixed z-50 flex h-full min-h-screen flex-col overflow-hidden bg-[#FAFBFD] transition-all duration-300 lg:static",
          width,
          isOpenMobile ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
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
        <nav className="flex-1 overflow-hidden px-2 py-4">
          {NAV.map(({ heading, items }) => (
            <div key={heading} className="mb-6 flex flex-col gap-1 first:mt-0">
              {/* heading */}
              <h4 className="mb-2 h-5 overflow-hidden px-2 text-xs font-semibold tracking-wider text-neutral-400 uppercase">
                {!isCollapsed ? heading : ""}
              </h4>

              {/* itens */}
              {items.map((item) => (
                <div key={item.label} className="flex w-full flex-col gap-0.5">
                  {/* link ou botão-pai */}
                  <SidebarItem
                    item={item}
                    active={isActive(item)}
                    collapsed={isCollapsed}
                    open={!!openGroup[item.label]}
                    toggle={() =>
                      setOpenGroup((s) => ({
                        ...s,
                        [item.label]: !s[item.label],
                      }))
                    }
                    closeMobile={closeMobile}
                  />

                  {item.children && openGroup[item.label] && (
                    <div
                      className={clsx(
                        "flex w-full flex-col pt-1 pl-3",
                        isCollapsed && "hidden",
                      )}
                    >
                      {item.children.map((sub) => (
                        <SidebarItem
                          key={sub.label}
                          item={sub}
                          active={pathname === sub.href} // o próprio sub-item está ativo?
                          parentActive={isActive(item)} // o PAI está ativo?
                          collapsed={false} // sub-menu nunca colapsa
                          isSub
                          closeMobile={closeMobile}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
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
  parentActive?: boolean;
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
  const Icon = item.icon;

  // estilos base
  const base =
    "group flex items-center  w-full gap-3   px-3 py-2 text-sm font-medium transition-all duration-300";

  // ---------- LÓGICA DE ESTILOS ----------
  // Pai (não é sub)
  // Pai (não é sub)
  const parentClasses = clsx(base, {
    "bg-primary text-white rounded-md": active, // ativo OU se algum filho ativo
    "text-zinc-900 hover:bg-zinc-100 hover:text-primary rounded-md": !active,
  });

  // Filho (sub)
  const childClasses = clsx(base, "pl-0", {
    "border-l-2 border-primary text-primary pl-2": active,
    "border-l-2 border-zinc-400 text-zinc-700 hover:text-primary pl-2": !active,
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
      <Icon className={clsx("h-5 w-5 shrink-0", iconColor)} />
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
          )}
        </span>
      )}
    </>
  );

  /* link ou botão-pai -- depende se tem children */
  if (item.children) {
    return (
      <button onClick={toggle} className={cls}>
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
