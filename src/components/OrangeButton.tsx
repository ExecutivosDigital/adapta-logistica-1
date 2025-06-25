import { cn } from "@/utils/cn";

type Props = {
  children: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: "button" | "submit";
  loading?: boolean;
  loadingText?: string;
  unselected?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
};
export function OrangeButton({
  children,
  className,
  onClick,
  disabled,
  unselected = false,
  type = "button",
  loading,
  loadingText,
  icon,
  iconPosition = "left",
}: Props) {
  return (
    <div className="p-0.5">
      <button
        type={type}
        className={`group hover:bg-primary-dark/80 flex cursor-pointer flex-row gap-2 overflow-hidden rounded-lg border font-bold transition-all duration-300 hover:scale-[1.02] ${unselected ? "border-zinc-600/40 bg-white text-[#272835]" : "bg-primary border-transparent text-white"}`}
        onClick={onClick}
        disabled={disabled || loading}
      >
        <div
          className={cn(
            "px-4 py-2",
            className,
            {
              "bg-white": unselected,
              "bg-gradient-to-b from-white/20 to-white/0": !unselected,
            },
            "hover:from-white-0",
            "flex w-full flex-row",
            "transition-all duration-300",
          )}
        >
          {loading ? (
            <span>{loadingText || "Loading..."}</span>
          ) : (
            <>
              {icon && iconPosition === "left" && icon}
              {children}
              {icon && iconPosition === "right" && icon}
            </>
          )}
        </div>
      </button>
    </div>
  );
}
