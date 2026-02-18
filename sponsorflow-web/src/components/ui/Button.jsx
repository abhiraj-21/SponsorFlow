import React from 'react';
import clsx from 'clsx';
import { Loader2 } from 'lucide-react';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className,
    isLoading = false,
    disabled = false,
    ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-bold transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25",
        secondary: "bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white border border-transparent hover:border-slate-300 dark:hover:border-slate-700",
        danger: "bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white",
        ghost: "bg-transparent text-slate-500 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800",
    };

    const sizes = {
        sm: "px-3 py-1.5 text-xs",
        md: "px-5 py-2.5 text-sm",
        lg: "px-6 py-3 text-base",
    };

    return (
        <button
            className={clsx(baseStyles, variants[variant], sizes[size], className)}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {children}
        </button>
    );
};

export default Button;
