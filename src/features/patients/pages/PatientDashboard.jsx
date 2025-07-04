import { Button } from "../../../components/common"

export function PatientDashboard({ onNavigate }) {
    const upcomingAppointments = [
        { id: 1, date: '28/06/2025', time: '10:00', doctor: 'Dr. João Silva', speciality: 'Clínico Geral', type: 'Presencial' },
        { id: 2, date: '05/07/2025', time: '14:30', doctor: 'Dra. Ana Costa', speciality: 'Cardiologia', type: 'Telemedicina' },
    ];
    const notifications = [
        { id: 1, message: 'Lembrete: Consulta com Dr. João Silva amanhã às 10h.', date: '27/06/2025' },
        { id: 2, message: 'Seu laudo de exame de sangue está disponível.', date: '25/06/2025' },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="col-span-1 md:col-span-2 lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Próximas Consultas</h2>
                {upcomingAppointments.length > 0 ? (
                    <ul>
                        {upcomingAppointments.map(app => (
                            <li key={app.id} className="mb-3 p-3 border rounded-lg bg-gray-50">
                                <p className="font-medium">{app.date} às {app.time} - {app.doctor} ({app.speciality})</p>
                                <p className="text-sm text-gray-600">Tipo: {app.type}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-600">Nenhuma consulta agendada.</p>
                )}
                <Button onClick={() => onNavigate('agendar-consulta')} className="mt-4 w-full">Agendar Nova Consulta</Button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Notificações</h2>
                {notifications.length > 0 ? (
                    <ul>
                        {notifications.map(notif => (
                            <li key={notif.id} className="mb-2 p-2 border-b last:border-b-0">
                                <p className="text-sm font-medium">{notif.message}</p>
                                <span className="text-xs text-gray-500">{notif.date}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-600">Nenhuma notificação.</p>
                )}
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Atalhos Rápidos</h2>
                <div className="space-y-4">
                    <Button onClick={() => onNavigate('historico-clinico')} className="w-full">Acessar Histórico Clínico</Button>
                    <Button onClick={() => onNavigate('minhas-consultas')} className="w-full">Ver Meus Agendamentos</Button>
                </div>
            </div>
        </div>
    );
};