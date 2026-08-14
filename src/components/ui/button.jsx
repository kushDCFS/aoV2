import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

/* Press physics: every variant scales down 3% on press with the same spring
   curve as the rest of the system (--ease-out). A button that doesn't move
   when you press it reads as a static image, not a control. */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-[13.5px] font-medium tracking-[-0.006em] transition-[background-color,border-color,box-shadow,transform,opacity] duration-150 [transition-timing-function:var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-40 active:scale-[0.97] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[var(--shadow-sm)] hover:opacity-90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-[var(--shadow-sm)] hover:opacity-90",
        outline:
          "border border-border bg-card shadow-[var(--shadow-xs)] hover:bg-muted hover:border-border",
        secondary:
          "bg-muted text-foreground hover:bg-muted/70",
        ghost: "hover:bg-muted text-foreground/70 hover:text-foreground",
        link: "text-accent underline-offset-4 hover:underline active:scale-100",
      },
      size: {
        default: "h-10 px-5",
        sm: "h-8 rounded-md px-3.5 text-xs",
        lg: "h-11 px-6",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    (<Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />)
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }
