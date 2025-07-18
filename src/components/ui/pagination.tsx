import { cn } from "@/utils/cn";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import * as React from "react";
import { ButtonProps, buttonVariants } from "./button";

interface PaginationProps extends React.ComponentProps<"nav"> {
  isDisabled?: boolean;
}
const Pagination = ({ isDisabled, className, ...props }: PaginationProps) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", isDisabled, className)}
    {...props}
  />
);

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("no-scrollbar flex flex-row items-center gap-1", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

interface PaginationItemProps extends React.ComponentProps<"li"> {
  radius?: string;
}
const PaginationItem = React.forwardRef<HTMLLIElement, PaginationItemProps>(
  ({ className, radius, ...props }, ref) => (
    <li ref={ref} className={cn("flex", className, radius)} {...props} />
  ),
);
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a">;

const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size,
      }),
      className,
    )}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn("h-6 gap-1 pr-1", className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
    <span className="hidden lg:block">Primeiro</span>
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={cn("h-6 gap-1 pr-1", className)}
    {...props}
  >
    <span className="hidden lg:block">Último</span>
    <ChevronRight className="h-4 w-4 rtl:rotate-180" />
  </PaginationLink>
);

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-6 w-6 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
