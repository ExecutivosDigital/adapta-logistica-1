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
type Item = {
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
        href: "/",
        children: [
          { label: "Dashboard", icon: Home, href: "/1" },
          { label: "Dashboard", icon: Home, href: "/2" },
          { label: "Dashboard", icon: Home, href: "/3" },
        ],
      },
      {
        label: "Transações",
        icon: RefreshCw,
        children: [
          {
            label: "Receitas",
            icon: DollarSign,
            href: "/private/transacoes/receitas",
          },
          {
            label: "Despesas",
            icon: DollarSign,
            href: "/private/transacoes/despesas",
          },
        ],
      },
      { label: "Lorem", icon: List, href: "/private/lorem" },
      {
        label: "Cartão de Crédito",
        icon: CreditCard,
        href: "/private/cartoes",
      },
      { label: "Plano de Contas", icon: Layers, href: "/private/planos" },
      {
        label: "Contas Bancárias",
        icon: Banknote,
        badge: 4,
        children: [
          { label: "Empresa", icon: Banknote, href: "/private/contas/empresa" },
          { label: "Pessoal", icon: Banknote, href: "/private/contas/pessoal" },
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
        href: "/private/workflow/compras",
      },
      {
        label: "Aprovação de Compras",
        icon: CheckSquare,
        href: "/purchase-approval",
      },
      {
        label: "Pagamentos",
        icon: DollarSign,
        href: "/private/workflow/pagamentos",
      },
      { label: "Lorem", icon: Plus, href: "/private/workflow/lorem" },
      {
        label: "Organização",
        icon: Layers,
        href: "/private/workflow/organizacao",
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
  const isActive = (item: Item): boolean =>
    item.href
      ? pathname === item.href
      : !!item.children?.some((c) => pathname === c.href);

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
          "peer fixed z-50 flex h-full min-h-screen flex-col overflow-hidden bg-[#FAFBFD] transition-all duration-200 lg:static",
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
                <div
                  key={item.label}
                  className={`${isActive(item) ? "from-primary/90 to-primary flex w-full flex-col gap-0.5 rounded-lg bg-gradient-to-b text-white" : item.children && openGroup[item.label] ? "flex w-full flex-col gap-0.5 rounded-lg bg-zinc-400/60" : ""}`}
                >
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
                        "flex w-full flex-col gap-1 px-4 pb-1",
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
  parentActive = false,
  open,
  toggle,
  isSub,
  closeMobile,
}: SidebarItemProps) {
  const Icon = item.icon;

  const base =
    "group flex group items-center gap-3 w-full rounded-md px-3 py-2 text-sm font-medium transition-all duration-300";

  /* estilos */
  const cls = clsx(base, {
    // 👇 Se nem ele nem o pai estiverem ativos, usa hover padrão
    "bg-white text-primary": isSub && active,
    "hover:bg-zinc-600/80 hover:text-white text-zinc-500":
      !active && !parentActive,

    // 👇 Pai ativo, eu NÃO ativo → estilo “herdado”
    "bg-zinc-400/60 hover:bg-zinc-400/80  ": parentActive && !active,

    // 👇 Eu ativo (prioridade maior que herdado)
    "": active,

    // Ajustes já existentes
    "justify-center gap-0": collapsed,
    "pl-2": isSub, // sub-item indented
  });

  /* conteúdo comum */
  const inner = (
    <>
      <Icon
        className={clsx(
          "h-5 w-5 shrink-0",
          isSub && active
            ? "text-primary"
            : isSub && parentActive && !active
              ? "text-white"
              : !isSub && active
                ? "text-white"
                : "text-zinc-500 group-hover:text-white",
        )}
      />
      {!collapsed && <span className="truncate">{item.label}</span>}

      {/* badge / chevron */}
      {!collapsed && (
        <span className="ml-auto flex items-center gap-1">
          {item.badge !== undefined && (
            <span
              className={clsx(
                "rounded-full bg-orange-100 px-2 text-xs font-semibold text-orange-600",
                active && "bg-white/20 text-white",
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
                active
                  ? "text-white"
                  : "text-neutral-500 group-hover:text-white",
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
    <Link
      href={
        // item.href ??
        "#"
      }
      onClick={closeMobile}
      className={cls}
    >
      {inner}
    </Link>
  );
}
