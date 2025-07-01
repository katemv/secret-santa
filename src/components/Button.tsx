import React from "react";
import { Link } from "react-router-dom";
import { cn } from "../utils/tailwind";

interface ButtonProps {
  variant?: "filled" | "outline" | "red" | "dashed"
  size?: "sm" | "md" | "lg"
  children: React.ReactNode
  className?: string
  disabled?: boolean
  to?: string
  onClick?: () => void
  type?: "button" | "submit" | "reset"
}

export const Button: React.FC<ButtonProps> = ({
    variant = "filled",
    size = "md",
    children,
    className,
    disabled = false,
    to,
    onClick,
    type = "button",
    ...props
}) => {
    const baseClasses = cn(
        "font-semibold font-fields rounded-lg transition-colors duration-200 inline-flex items-center justify-center",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        {
            "opacity-50 cursor-not-allowed": disabled,
            "cursor-pointer": !disabled,
        }
    );

    const variantClasses = cn({
        "bg-white text-christmas-600 hover:bg-gray-100 focus:ring-christmas-600": variant === "filled",
        "border border-white text-white hover:bg-white hover:text-christmas-600 focus:ring-white": variant === "outline",
        "bg-christmas-600 text-white focus:ring-white": variant === "red",
        "border-2 border-dashed border-christmas-300 text-christmas-600 hover:border-christmas-600 hover:bg-christmas-50 focus:ring-christmas-600": variant === "dashed",
    });

    const sizeClasses = cn({
        "px-4 py-2 text-sm": size === "sm",
        "px-6 py-3 text-base": size === "md",
        "px-8 py-4 text-lg": size === "lg",
    });

    const combinedClassName = cn(baseClasses, variantClasses, sizeClasses, className);

    if (to && !disabled) {
        return (
            <Link
                to={to}
                className={combinedClassName}
                {...props}
            >
                {children}
            </Link>
        );
    }

    return (
        <button
            type={type}
            className={combinedClassName}
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};