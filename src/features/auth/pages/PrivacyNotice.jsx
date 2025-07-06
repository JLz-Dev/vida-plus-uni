export function LGPDNotice({ privacyPolicyLink, className = '' }) {
    return (
        <div
            className={`bg-blue-50 border border-green-200 text-emerald-800 p-4 rounded-lg shadow-sm text-sm text-center max-w-md mx-auto mt-8 ${className}`}
            role="alert"
            aria-live="polite"
        >
            <p className="mb-2">
                Ao utilizar nosso sistema, você concorda com a nossa política de privacidade e tratamento de dados, em conformidade com a Lei Geral de Proteção de Dados (LGPD).
            </p>
            <p>
                Para mais detalhes, acesse nossa{' '}
                <a
                    href={privacyPolicyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-700 hover:text-green-900 font-semibold underline focus:outline-none focus:ring-2 focus:ring-green-500 rounded-sm cursor-pointer"
                    aria-label="Leia nossa política de privacidade completa"
                >
                    Política de Privacidade
                </a>.
            </p>
        </div>
    );
};