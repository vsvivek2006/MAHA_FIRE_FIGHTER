import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-400 disabled:pointer-events-none disabled:opacity-50 tracking-wider uppercase rounded-sm",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--theme-primary)] text-white hover:bg-[var(--theme-primary-hover)] shadow-sm",
        secondary:
          "bg-slate-800 text-white hover:bg-slate-700 border border-slate-700",
        outline:
          "border border-slate-600 bg-transparent text-slate-200 hover:bg-slate-800 hover:text-white",
        outlineLight:
          "border border-slate-300 bg-white text-slate-900 hover:bg-slate-100",
        ghost:
          "hover:bg-slate-800 hover:text-white text-slate-300",
        link:
          "text-[var(--theme-primary)] underline-offset-4 hover:underline lowercase font-medium tracking-normal",
        emergency:
          "bg-[var(--theme-primary)] text-white hover:bg-[var(--theme-primary-hover)] border border-[var(--theme-primary-border)] shadow-sm",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 px-3.5 text-[11px]",
        lg: "h-12 px-7 text-sm",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants, cn };
