import { useState } from "react";
import { Modal, Button, InputField } from "../../../components/common"

export function ProfessionalScheduleScreen() {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [appointments, setAppointments] = useState([
        { id: 1, date: '2025-06-28', time: '09:00', patient: 'João da Silva', type: 'Consulta', status: 'Confirmado' },
        { id: 2, date: '2025-06-28', time: '10:00', patient: 'Maria Oliveira', type: 'Retorno', status: 'Aguardando' },
        { id: 3, date: '2025-06-29', time: '14:00', patient: 'Ana Paula', type: 'Consulta', status: 'Agendado' },
    ]);
    const [isIndisponibilityModalOpen, setIsIndisponibilityModalOpen] = useState(false);
    const [indisponibilityReason, setIndisponibilityReason] = useState('');

    const filteredAppointments = appointments.filter(app => app.date === selectedDate);

    const handleMarkIndisponibility = () => {
        setIsIndisponibilityModalOpen(true);
    };

    const confirmIndisponibility = () => {
        alert(`Indisponibilidade para ${selectedDate} marcada por: ${indisponibilityReason}`);
        setIsIndisponibilityModalOpen(false);
        setIndisponibilityReason('');
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Gestão de Agenda</h2>

            <div className="mb-6 flex items-center justify-between">
                <InputField
                    id="scheduleDate"
                    label="Data da Agenda"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="max-w-xs"
                    aria-label="Selecione a data da agenda"
                />
                <Button onClick={handleMarkIndisponibility}>Marcar Indisponibilidade</Button>
            </div>

            <h3 className="text-xl font-semibold mb-4 text-gray-800">Agendamentos para {new Date(selectedDate).toLocaleDateString('pt-BR')}</h3>
            {filteredAppointments.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hora</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paciente</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredAppointments.map(app => (
                                <tr key={app.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{app.time}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{app.patient}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{app.type}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${app.status === 'Confirmado' ? 'bg-green-100 text-green-800' :
                                            app.status === 'Agendado' ? 'bg-blue-100 text-blue-800' :
                                                'bg-orange-100 text-orange-800'
                                            }`}>
                                            {app.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Button variant="secondary" className="mr-2" onClick={() => alert(`Editar agendamento ${app.id}`)}>Editar</Button>
                                        <Button variant="danger" onClick={() => alert(`Cancelar agendamento ${app.id}`)}>Cancelar</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-gray-600 text-center">Nenhum agendamento para a data selecionada.</p>
            )}

            <Modal isOpen={isIndisponibilityModalOpen} onClose={() => setIsIndisponibilityModalOpen(false)} title="Marcar Indisponibilidade">
                <InputField
                    id="indisponibilityReason"
                    label="Motivo da Indisponibilidade"
                    value={indisponibilityReason}
                    onChange={(e) => setIndisponibilityReason(e.target.value)}
                    placeholder="Ex: Férias, congresso, emergência"
                    required
                />
                <div className="flex justify-end space-x-3 mt-4">
                    <Button variant="secondary" onClick={() => setIsIndisponibilityModalOpen(false)}>Cancelar</Button>
                    <Button onClick={confirmIndisponibility}>Confirmar</Button>
                </div>
            </Modal>
        </div>
    );
};

