import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider uppercase border rounded-none transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-slate-700 bg-slate-900/80 text-slate-300",
        safety:
          "border-red-900/60 bg-red-950/60 text-red-400",
        compliance:
          "border-emerald-900/60 bg-emerald-950/60 text-emerald-400",
        amber:
          "border-amber-900/60 bg-amber-950/60 text-amber-400",
        light:
          "border-slate-300 bg-slate-100 text-slate-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
