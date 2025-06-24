type Props = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
  loading?: boolean;
  loadingText?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
};
export function OrangeButton({
  children,
  className,
  onClick,
  disabled,
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
        className={`group flex flex-row gap-2 rounded-lg bg-orange-500 font-bold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-orange-600`}
        onClick={onClick}
        disabled={disabled || loading}
      >
        <div
          className={`px-4 py-2 ${className} hover:from-white-0 flex w-full flex-row bg-gradient-to-b from-white/20 to-white/0 transition-all duration-300`}
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
