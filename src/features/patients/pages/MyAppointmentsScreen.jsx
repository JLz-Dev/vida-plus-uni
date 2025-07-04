import { useState } from "react";
import { Modal, Button } from "../../../components/common"

export function MyAppointmentsScreen({ onNavigate }) {
    const [appointments, setAppointments] = useState([
        { id: 1, date: '28/06/2025', time: '10:00', doctor: 'Dr. João Silva', speciality: 'Clínico Geral', type: 'Presencial', status: 'Agendado' },
        { id: 2, date: '05/07/2025', time: '14:30', doctor: 'Dra. Ana Costa', speciality: 'Cardiologia', type: 'Telemedicina', status: 'Agendado' },
        { id: 3, date: '15/05/2025', time: '09:00', doctor: 'Dr. Pedro Santos', speciality: 'Pediatria', type: 'Presencial', status: 'Realizado' },
    ]);
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    const handleCancelClick = (appointment) => {
        setSelectedAppointment(appointment);
        setIsCancelModalOpen(true);
    };

    const confirmCancel = () => {
        if (selectedAppointment) {
            setAppointments(prev => prev.map(app =>
                app.id === selectedAppointment.id ? { ...app, status: 'Cancelado' } : app
            ));
            alert(`Agendamento com ${selectedAppointment.doctor} em ${selectedAppointment.date} cancelado.`);
            setIsCancelModalOpen(false);
            setSelectedAppointment(null);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Meus Agendamentos</h2>
            {appointments.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hora</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profissional</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Especialidade</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {appointments.map(app => (
                                <tr key={app.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{app.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{app.time}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{app.doctor}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{app.speciality}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{app.type}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${app.status === 'Agendado' ? 'bg-blue-100 text-blue-800' :
                                            app.status === 'Realizado' ? 'bg-green-100 text-green-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                            {app.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        {app.status === 'Agendado' && (
                                            <Button variant="danger" className="mr-2" onClick={() => handleCancelClick(app)}>
                                                Cancelar
                                            </Button>
                                        )}
                                        {app.status === 'Agendado' && app.type === 'Telemedicina' && (
                                            <Button variant="primary" onClick={() => alert('Entrando na teleconsulta...')}>
                                                Entrar na Consulta
                                            </Button>
                                        )}
                                        {app.status === 'Realizado' && (
                                            <Button variant="secondary" onClick={() => onNavigate('historico-clinico')}>
                                                Ver Histórico
                                            </Button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-gray-600 text-center">Você ainda não possui agendamentos.</p>
            )}

            <Modal isOpen={isCancelModalOpen} onClose={() => setIsCancelModalOpen(false)} title="Confirmar Cancelamento">
                {selectedAppointment && (
                    <p className="mb-4 text-gray-700">
                        Tem certeza que deseja cancelar o agendamento com <strong>{selectedAppointment.doctor}</strong> em <strong>{selectedAppointment.date} às {selectedAppointment.time}</strong>?
                    </p>
                )}
                <div className="flex justify-end space-x-3">
                    <Button variant="secondary" onClick={() => setIsCancelModalOpen(false)}>Não, Manter</Button>
                    <Button variant="danger" onClick={confirmCancel}>Sim, Cancelar</Button>
                </div>
            </Modal>
        </div>
    );
};