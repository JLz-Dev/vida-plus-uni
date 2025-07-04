export function Modal({ isOpen, onClose, title, children }) {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg relative">
                <h3 id="modal-title" className="text-xl font-bold mb-4 text-gray-800">
                    {title}
                </h3>
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
                    aria-label="Fechar"
                >
                    &times;
                </button>
                <div className="modal-content">
                    {children}
                </div>
            </div>
        </div>
    );
};
