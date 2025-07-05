
export function Button({ children, onClick, variant = 'primary', className = '', ...props }) {
    let baseClasses = "font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer";
    if (variant === 'primary') {
        baseClasses += " bg-emerald-500 hover:bg-emerald-600 text-white focus:ring-emerald-400";
    } else if (variant === 'secondary') {
        baseClasses += " bg-gray-300 hover:bg-gray-400 text-gray-800 focus:ring-gray-500";
    } else if (variant === 'danger') {
        baseClasses += " bg-red-600 hover:bg-red-700 text-white focus:ring-red-500";
    } else if (variant === 'link') {
        baseClasses += " text-gray-300 hover:text-emerald-800 focus:text-gray-600 focus:bg-emerald-600 focus:underline";
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
