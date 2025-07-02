import React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  centered?: boolean
  fullWidth?: boolean
  inputSize?: "default" | "large"
  variant?: "default" | "christmas"
}

export const Input: React.FC<InputProps> = ({
    value,
    onChange,
    placeholder,
    centered = false,
    fullWidth = true,
    inputSize = "default",
    variant = "christmas",
    className,
    ...props
}) => {
    return (
        <input
            type={"text"}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={cn(
                "px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none transition-colors",
                variant === "christmas" && "focus:border-christmas-600",
                variant === "default" && "focus:border-blue-500",
                fullWidth && "w-full",
                centered && "text-center",
                inputSize === "large" && "text-lg",
                className
            )}
            {...props}
        />
    );
}; 