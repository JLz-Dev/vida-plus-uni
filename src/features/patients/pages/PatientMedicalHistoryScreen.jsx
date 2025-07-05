export function PatientMedicalHistoryScreen() {
    const patientData = {
        name: 'Paciente: José Silva',
        cpf: '123.456.789-00',
        dob: '01/01/1990',
    };

    const medicalHistory = [
        {
            id: 1,
            date: '15/05/2025',
            type: 'Consulta',
            professional: 'Dr. João Silva (Clínico Geral)',
            details: 'Paciente relatou dores de cabeça leves. Exame físico sem alterações significativas. Prescrição de analgésico.',
            attachments: [{ name: 'Receita_Paracetamol.pdf' }],
        },
        {
            id: 2,
            date: '20/04/2025',
            type: 'Exame',
            professional: 'Laboratório Central',
            details: 'Exame de sangue completo. Resultados dentro da normalidade.',
            attachments: [{ name: 'Laudo_Exame_Sangue.pdf' }],
        },
        {
            id: 3,
            date: '10/03/2025',
            type: 'Internação',
            professional: 'Dr. Pedro Santana (Pediatria)', // Exemplo de histórico mais antigo
            details: 'Internação por pneumonia leve. Alta após 3 dias de tratamento com antibióticos.',
            attachments: [{ name: 'Relatorio_Alta_Hospitalar.pdf' }],
        },
    ];

    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Histórico Clínico do Paciente</h2>
            <div className="mb-6 border-b pb-4">
                <p className="text-lg font-semibold text-gray-800">{patientData.name}</p>
                <p className="text-gray-600">CPF: {patientData.cpf} | Data de Nascimento: {patientData.dob}</p>
            </div>

            {medicalHistory.length > 0 ? (
                <div className="space-y-4">
                    {medicalHistory.map(record => (
                        <div key={record.id} className="border p-4 rounded-lg bg-gray-50">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">{record.type} - {record.date}</h3>
                            <p className="text-gray-700 mb-2">Profissional/Local: {record.professional}</p>
                            <p className="text-gray-700 mb-2">{record.details}</p>
                            {record.attachments && record.attachments.length > 0 && (
                                <div className="mt-2">
                                    <p className="font-medium text-gray-700">Anexos:</p>
                                    <ul className="list-disc list-inside ml-4">
                                        {record.attachments.map((attach, idx) => (
                                            <li key={idx}>
                                                <a href={attach.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                                    {attach.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-600 text-center">Nenhum registro no histórico clínico.</p>
            )}
        </div>
    );
};