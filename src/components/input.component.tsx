import { cn } from "../utils/cn.utils";
type InputType = React.HtmlHTMLAttributes<HTMLInputElement> & {
    label?: string,
    error?: string
}
function Input({
    label,
    error,
    className,
    ...props
}: InputType) {
    return (
        <div className="flex flex-col gap-2 fleX-auto">
            {label && (
                <label className="text-sm font-medium text-brand-deep">
                    {label}
                </label>
            )}

            <input
                className={cn(
                    "rounded-lg border border-brand-laurel px-2 py-1",
                    "bg-white text-brand-deep",
                    "outline-none",
                    "focus:border-brand-forest",
                    "focus:py-2",                    
                    className
                )}
                {...props}
            />

            {error && (
                <p className="text-sm text-danger">
                    {error}
                </p>
            )}

        </div>
    );
}

export default Input;