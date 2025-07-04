
export function Button({ children, onClick, variant = 'primary', className = '', ...props }) {
    let baseClasses = "font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2";
    if (variant === 'primary') {
        baseClasses += " bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-emerald-500";
    } else if (variant === 'secondary') {
        baseClasses += " bg-gray-300 hover:bg-gray-400 text-gray-800 focus:ring-gray-500";
    } else if (variant === 'danger') {
        baseClasses += " bg-red-600 hover:bg-red-700 text-white focus:ring-red-500";
    } else if (variant === 'link') {
        baseClasses += " text-emerald-600 hover:text-emerald-800 focus:ring-emerald-500 underline";
    }
    return (
        <button
            onClick={onClick}
            className={`${baseClasses} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};
