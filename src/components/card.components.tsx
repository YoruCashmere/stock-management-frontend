import { cn } from "../utils/cn.utils";

type CardVariants = "elevated" | "default" | "danger";
type CardSize = "sm" | "md" | "lg";

type CardType = {
    children: React.ReactNode;
    variant?: CardVariants;
    size?: CardSize;
    className?: string
}
const variantStyle = {
    default: "bg-brand-cream",
    elevated: "bg-white shadow-lg",
    danger: "bg-red border-danger"
}

const sizeStyle = {
    sm: "p-3",
    md: "p-5",
    lg: "p-8"
}

function Card({ children, variant = "default", size = "md", className = "" }: CardType) {
    return (
        <div className={cn(`border rounded-xl p-3 shadow-md bg-brand-cream 
        ${variantStyle[variant]} ${sizeStyle[size]} ${className}`)}>
            {children}
        </div>
    )
}
export default Card;