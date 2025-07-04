"use client";
import { cn } from "@/utils/cn";
import { faker } from "@faker-js/faker";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import * as React from "react";

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className,
    )}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  max?: any;
  total?: number;
  custom?: boolean;
  countClass?: string;
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, children, max, total, custom, countClass, ...props }, ref) => {
    const avatars = React.Children.toArray(children);

    return (
      <div
        ref={ref}
        className={cn(
          "w-max-content avatarGroup relative flex items-center -space-x-3",
          className,
        )}
        {...props}
      >
        {avatars.slice(0, max).map((avatar) => (
          <React.Fragment key={`avatar-group-key-${faker.string.uuid()}`}>
            {avatar}
          </React.Fragment>
        ))}
        {avatars.length > max && (
          <>
            {custom ? (
              <div className="inline-block">
                <span className="inline-block ltr:ml-5 rtl:mr-5">
                  {" "}
                  +{avatars.length - max} more
                </span>
              </div>
            ) : (
              <Avatar
                className={cn(
                  "ring-primary ring-offset-primary ring-1 ring-offset-[1px]",
                  countClass,
                )}
              >
                <AvatarFallback className="font-normal">
                  +{total ? total : avatars.length - max}
                </AvatarFallback>
              </Avatar>
            )}
          </>
        )}
      </div>
    );
  },
);
AvatarGroup.displayName = "AvatarGroup";

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-white text-sm font-semibold",
      className,
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarFallback, AvatarGroup, AvatarImage };
