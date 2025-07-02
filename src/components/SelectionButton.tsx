import React from "react";
import { cn } from "@/lib/utils";

interface SelectionButtonProps {
  title: string
  subtitle?: string
  selected: boolean
  onClick: () => void
  disabled?: boolean
  className?: string
  children?: React.ReactNode
  icon?: React.ReactNode
}

export const SelectionButton: React.FC<SelectionButtonProps> = ({
    title,
    subtitle,
    selected,
    onClick,
    disabled = false,
    className,
    children,
    icon
}) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={cn(
                "p-4 rounded-lg border-2 transition-all duration-200 text-left w-full",
                "hover:bg-christmas-50 hover:border-christmas-300",
                "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-200",
                selected
                    ? "border-christmas-500 bg-christmas-50 shadow-md"
                    : "border-gray-200 bg-white",
                className
            )}
        >
            <div className={"flex justify-between items-center"}>
                <div className={"flex items-center gap-3 flex-1"}>
                    {icon && (
                        <div className={"flex-shrink-0"}>
                            {icon}
                        </div>
                    )}
                    <div className={"flex-1"}>
                        <div className={"font-semibold text-gray-900"}>
                            {title}
                        </div>
                        {subtitle && (
                            <div className={"text-sm text-gray-600"}>
                                {subtitle}
                            </div>
                        )}
                        {children}
                    </div>
                </div>
        
                {/* Radio button indicator */}
                <div className={cn(
                    "w-4 h-4 rounded-full border-2 flex-shrink-0",
                    selected
                        ? "border-christmas-500 bg-christmas-500"
                        : "border-gray-300"
                )}>
                    {selected && (
                        <div className={"w-2 h-2 bg-white rounded-full mx-auto mt-0.5"} />
                    )}
                </div>
            </div>
        </button>
    );
}; 