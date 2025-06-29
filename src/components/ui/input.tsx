import { InputColor, InputVariant, Radius, Shadow } from "@/lib/type";
import { cn } from "@/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

//py-[10px]
export const inputVariants = cva(
  " w-full   bg-background  border-zinc-300  px-3 h-9  file:border-0 file:bg-transparent  file:font-medium  read-only:leading-9 read-only:bg-background  disabled:cursor-not-allowed disabled:opacity-50  transition duration-300 ",
  {
    variants: {
      color: {
        default:
          "text-default-900 focus:outline-none disabled:bg-default-200  placeholder:text-accent-foreground/50",
        primary:
          "text-primary focus:outline-none disabled:bg-primary/30 disabled:placeholder:text-primary  placeholder:text-primary/70",
        info: "text-info focus:outline-none  disabled:bg-info/30 disabled:placeholder:text-info  placeholder:text-info/70",
        warning:
          "text-warning focus:outline-none disabled:bg-warning/30 disabled:placeholder:text-info  placeholder:text-warning/70",
        success:
          "text-success focus:outline-none disabled:bg-success/30 disabled:placeholder:text-info  placeholder:text-success/70",
        destructive:
          "text-destructive focus:outline-none disabled:bg-destructive/30 disabled:placeholder:text-destructive  placeholder:text-destructive/70",
      },
      variant: {
        flat: "bg-default-100 read-only:bg-default-100",
        underline: "border-b",
        bordered: "border  ",
        borderedPrimary: "border shadow-sm",
        faded: "border bg-default-100",
        ghost: "focus:border",
        "flat-underline": "bg-default-100 border-b",
      },
      shadow: {
        none: "",
        sm: "shadow-sm",
        md: "shadow-md",
        lg: "shadow-lg",
        xl: "shadow-xl",
        "2xl": "shadow-2xl",
      },
      radius: {
        none: "rounded-none",
        sm: "rounded",
        md: "rounded-lg",
        lg: "rounded-xl",
        xl: "rounded-[20px]",
      },
      size: {
        sm: "h-8 read-only:leading-8",
        md: "h-9 read-only:leading-9",
        lg: "h-10 read-only:leading-10",
        xl: "h-12 text-base read-only:leading-[48px]",
      },
    },
    compoundVariants: [
      {
        variant: "flat",
        color: "primary",
        className: "bg-primary/20 read-only:bg-primary/20",
      },
      {
        variant: "flat",
        color: "info",
        className: "bg-info/10 read-only:bg-info/10",
      },
      {
        variant: "flat",
        color: "warning",
        className: "bg-warning/10 read-only:bg-warning/10",
      },
      {
        variant: "flat",
        color: "success",
        className: "bg-success/10 read-only:bg-success/10",
      },
      {
        variant: "flat",
        color: "destructive",
        className: "bg-destructive/10 read-only:bg-destructive/10",
      },
      {
        variant: "faded",
        color: "primary",
        className: "bg-primary/20 read-only:bg-primary/20",
      },
      {
        variant: "faded",
        color: "info",
        className: "bg-info/10",
      },
      {
        variant: "faded",
        color: "warning",
        className: "bg-warning/10",
      },
      {
        variant: "faded",
        color: "success",
        className: "bg-success/10",
      },
      {
        variant: "faded",
        color: "destructive",
        className: "bg-destructive/10",
      },
    ],

    defaultVariants: {
      color: "default",
      size: "md",
      variant: "bordered",
      radius: "sm",
    },
  },
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  removeWrapper?: boolean;
  color?: InputColor;
  variant?: InputVariant;
  radius?: Radius;
  shadow?: Shadow;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  size?: any;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      size,
      color,
      radius,
      variant,
      shadow,
      removeWrapper = false,
      ...props
    },
    ref,
  ) => {
    return removeWrapper ? (
      <input
        type={type}
        className={cn(
          inputVariants({ color, size, radius, variant, shadow }),
          className,
        )}
        ref={ref}
        {...props}
      />
    ) : (
      <div className="w-full flex-1">
        <input
          type={type}
          className={cn(
            inputVariants({ color, size, radius, variant, shadow }),
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
