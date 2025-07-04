export function InputField({ id, label, type = 'text', value, onChange, placeholder,
    required = false, ...props }) {
    return (
        <div className="mb-4">
            <label htmlFor={id} className="block text-gray-700 text-sm font-bold mb-2">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
                type={type}
                id={id}
                className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                aria-label={label}
                {...props}
            />
        </div>
    )
}
