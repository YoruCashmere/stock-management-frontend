import React from "react";
import { cn } from "../utils/cn.utils";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";
type ButtonSize = "sm" | "md" | "lg"

type ButtonType = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode,
    variant?: ButtonVariant,
    size?: ButtonSize
}

const variantStyles = {
    primary: "bg-brand-laurel text-black hover:bg-brand-forest",
    secondary: "bg-brand-cream text-brand-deep border",
    danger: "bg-danger text-white",
    ghost: "bg-transparent text-brand-forest",
};
const sizeStyle = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
}

function Button({ children, variant = "primary", size = "lg", className, ...props }: ButtonType) {
    return (
        <button
            className={cn(
                "rounded-lg font-medium transition-colors",
                variantStyles[variant],
                sizeStyle[size],
                className
            )}
            {...props}
        >{children}</button>
    );
}

export default Button




{/* <button onClick={() => { setActive(!isActive) }}
        className={`border p-2 ${isActive ? "bg-green-200" : "bg-yellow-200"}`}>
        {isActive ? <h1 className='text-4xl'>it is active</h1> : "it is not active"}
      </button>
        <div className='text-xl font-serif'>count: {count}</div> */}