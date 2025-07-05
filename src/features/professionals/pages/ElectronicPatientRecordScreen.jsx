import { useState } from "react";
import { Button, InputField } from "../../../components/common"

export function ElectronicPatientRecordScreen() {
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [searchCpf, setSearchCpf] = useState('');
    const [recordContent, setRecordContent] = useState('');

    const patients = [
        { id: 1, name: 'Paciente A', cpf: '111.111.111-11', dob: '10/10/1985', records: [{ date: '2025-06-20', notes: 'Consulta de rotina. Sem queixas. PA: 120/80.' }] },
        { id: 2, name: 'Paciente B', cpf: '222.222.222-22', dob: '05/03/1992', records: [{ date: '2025-06-15', notes: 'Queixa de dor de garganta. Prescrito antibiótico.' }] },
    ];

    const handleSearch = () => {
        const foundPatient = patients.find(p => p.cpf === searchCpf);
        if (foundPatient) {
            setSelectedPatient(foundPatient);
            setRecordContent(foundPatient.records.map(r => `${r.date}: ${r.notes}`).join('\n\n'));
        } else {
            setSelectedPatient(null);
            setRecordContent('');
            alert('Paciente não encontrado.');
        }
    };

    const handleSaveRecord = () => {
        if (selectedPatient) {
            // Simulação de salvar o prontuário
            alert(`Prontuário de ${selectedPatient.name} atualizado com sucesso!`);
            console.log('Novo conteúdo do prontuário:', recordContent);
            // Aqui você integraria com o backend para salvar
        } else {
            alert('Nenhum paciente selecionado para salvar prontuário.');
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Prontuário Eletrônico do Paciente</h2>

            <div className="mb-6 flex items-center space-x-4">
                <InputField
                    id="searchCpf"
                    label="Buscar Paciente por CPF"
                    value={searchCpf}
                    onChange={(e) => setSearchCpf(e.target.value)}
                    placeholder="Digite o CPF do paciente"
                    className="flex-grow"
                />
                <Button onClick={handleSearch}>Buscar</Button>
            </div>

            {selectedPatient && (
                <div className="border p-4 rounded-lg bg-gray-50 mb-6">
                    <h3 className="text-xl font-semibold mb-2">{selectedPatient.name}</h3>
                    <p className="text-gray-700">CPF: {selectedPatient.cpf} | Data de Nascimento: {selectedPatient.dob}</p>
                    <div className="mt-4">
                        <label htmlFor="recordContent" className="block text-gray-700 text-sm font-bold mb-2">
                            Histórico de Atendimentos e Evolução
                        </label>
                        <textarea
                            id="recordContent"
                            className="w-full p-3 border rounded-lg h-80 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 resize-y"
                            value={recordContent}
                            onChange={(e) => setRecordContent(e.target.value)}
                            placeholder="Insira as informações do prontuário aqui..."
                            aria-label="Conteúdo do prontuário eletrônico"
                        ></textarea>
                    </div>
                    <div className="mt-4 flex justify-end space-x-3">
                        <Button variant="secondary" onClick={() => alert('Arquivo anexado com sucesso.')}>Anexar Laudo/Documento</Button>
                        <Button onClick={handleSaveRecord}>Salvar Prontuário</Button>
                    </div>
                </div>
            )}
            {!selectedPatient && searchCpf && <p className="text-center text-gray-600">Busque um paciente para visualizar o prontuário.</p>}
        </div>
    );
};