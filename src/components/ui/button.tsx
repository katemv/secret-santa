import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { Link } from "react-router-dom";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-semibold font-fields transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 focus:ring-christmas-600",
    {
        variants: {
            variant: {
                default:
                    "bg-white text-primary-foreground shadow text-christmas-600",
                outline:
                    "border-2 border-white bg-transparent text-white hover:bg-white hover:text-christmas-600",
                outlineRed:
                    "border-2 border-christmas-600 bg-transparent text-christmas-600 hover:bg-white hover:text-christmas-600",
                ghost: "hover:bg-white hover:text-white",
                link: "text-primary underline-offset-4 hover:underline",
                red: "bg-christmas-600 text-white focus:ring-white",
                dashed: "border-2 border-dashed border-christmas-300 text-christmas-600 hover:border-christmas-600 hover:bg-christmas-50 focus:ring-christmas-600",
                "christmas-outline": "border border-white text-white hover:bg-white hover:text-christmas-600 focus:ring-white",
            },
            size: {
                default: "h-9 px-4 py-2",
                sm: "px-4 py-2 text-sm",
                md: "px-6 py-3 text-base",
                lg: "px-8 py-4 text-lg",
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
  asChild?: boolean
  to?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, to, disabled, children, onClick, ...props }, ref) => {
        if (to && !disabled) {
            return (
                <Link
                    to={to}
                    className={cn(buttonVariants({ variant, size, className }))}
                >
                    {children}
                </Link>
            );
        }

        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                disabled={disabled}
                onClick={onClick}
                {...props}
            >
                {children}
            </Comp>
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
