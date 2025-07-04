import { useState } from "react";
import { Modal, Button, InputField } from "../../../components/common"

export function DigitalPrescriptionScreen() {
    const [patientName, setPatientName] = useState('');
    const [medication, setMedication] = useState('');
    const [dosage, setDosage] = useState('');
    const [frequency, setFrequency] = useState('');
    const [duration, setDuration] = useState('');
    const [instructions, setInstructions] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!patientName || !medication || !dosage || !frequency || !duration) {
            alert('Por favor, preencha todos os campos obrigatórios da receita.');
            return;
        }
        setIsModalOpen(true);
    };

    const confirmIssue = () => {
        alert(`Receita digital para ${patientName} emitida com sucesso!`);
        console.log({ patientName, medication, dosage, frequency, duration, instructions });
        // Aqui você integraria com um sistema de assinatura digital real
        setIsModalOpen(false);
        setPatientName(''); setMedication(''); setDosage(''); setFrequency(''); setDuration(''); setInstructions('');
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Emissão de Receitas Digitais</h2>
            <form onSubmit={handleSubmit}>
                <InputField id="patientName" label="Nome do Paciente" value={patientName} onChange={(e) => setPatientName(e.target.value)} required />
                <InputField id="medication" label="Medicamento" value={medication} onChange={(e) => setMedication(e.target.value)} placeholder="Ex: Amoxicilina" required />
                <InputField id="dosage" label="Dosagem" value={dosage} onChange={(e) => setDosage(e.target.value)} placeholder="Ex: 500mg" required />
                <InputField id="frequency" label="Frequência" value={frequency} onChange={(e) => setFrequency(e.target.value)} placeholder="Ex: 8/8 horas" required />
                <InputField id="duration" label="Duração do Tratamento" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="Ex: 7 dias" required />
                <div className="mb-4">
                    <label htmlFor="instructions" className="block text-gray-700 text-sm font-bold mb-2">
                        Instruções Adicionais
                    </label>
                    <textarea
                        id="instructions"
                        className="w-full p-2 border rounded-lg h-24 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 resize-y"
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        placeholder="Ex: Tomar com alimentos."
                        aria-label="Instruções adicionais para a receita"
                    ></textarea>
                </div>
                <div className="mt-6">
                    <p className="text-gray-700 text-sm mb-2">Um mecanismo de assinatura digital será aplicado ao emitir a receita.</p>
                    <Button type="submit" className="w-full">Emitir Receita</Button>
                </div>
            </form>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Pré-visualização da Receita">
                <div className="p-4 border rounded-lg bg-gray-50 mb-4">
                    <h3 className="font-bold text-lg mb-2">Receita Digital</h3>
                    <p><strong>Paciente:</strong> {patientName}</p>
                    <p><strong>Medicamento:</strong> {medication}</p>
                    <p><strong>Dosagem:</strong> {dosage}</p>
                    <p><strong>Frequência:</strong> {frequency}</p>
                    <p><strong>Duração:</strong> {duration}</p>
                    {instructions && <p><strong>Instruções:</strong> {instructions}</p>}
                </div>
                <div className="flex justify-end space-x-3">
                    <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Editar</Button>
                    <Button onClick={confirmIssue}>Confirmar Emissão</Button>
                </div>
            </Modal>
        </div>
    );
};