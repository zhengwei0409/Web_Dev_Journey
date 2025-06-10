import type { ReactElement } from "react";

interface ButtonProps {
    variant: 'primary' | 'secondary';
    text: string;
    startIcon?: ReactElement;
    onClick?: () => void;
    endIcon?: ReactElement;
    fullWidth?: boolean;
    loading?: boolean;
}

const variantClass = {
    'primary': 'bg-purple-600 text-white',
    'secondary': 'bg-purple-200 text-purple-600'
}

const defaultStyles = 'px-4 py-2 rounded-md font-light flex items-center  justify-center cursor-pointer';

export function Button( {variant, text, startIcon, onClick, endIcon, fullWidth, loading}: ButtonProps ) {
    return (
        <button onClick={onClick} className={`${defaultStyles} ${variantClass[variant]} ${fullWidth && 'w-full'} ${loading? 'opacity-45' : ""}`} disabled={loading}>
            {
                startIcon && (
                    <div className="pr-2 ">
                        {startIcon}
                    </div>
                )
            }
            {text}
            {
                endIcon && (
                    <div className="pl-2">
                        {endIcon}
                    </div>
                )
            }
        </button>
    )
}