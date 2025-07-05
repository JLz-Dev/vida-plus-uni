import { Button } from "../../../components/common"

export function ProfessionalDashboard({ onNavigate }) {
    const todayAppointments = [
        { id: 1, time: '09:00', patient: 'Bianca Silva', type: 'Consulta', status: 'Confirmado' },
        { id: 2, time: '11:00', patient: 'Caio Motta', type: 'Retorno', status: 'Aguardando' },
    ];
    const waitingPatients = ['Ana Cristina', 'João Carlos'];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Agenda de Hoje ({new Date().toLocaleDateString('pt-BR')})</h2>
                {todayAppointments.length > 0 ? (
                    <ul>
                        {todayAppointments.map(app => (
                            <li key={app.id} className="mb-3 p-3 border rounded-lg bg-gray-50">
                                <p className="font-medium">{app.time} - {app.patient} ({app.type})</p>
                                <span className={`text-sm ${app.status === 'Confirmado' ? 'text-green-600' : 'text-orange-600'}`}>Status: {app.status}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-600">Nenhum agendamento para hoje.</p>
                )}
                <Button onClick={() => onNavigate('gestao-agenda')} className="mt-4 w-full">Gerenciar Agenda</Button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Pacientes Aguardando</h2>
                {waitingPatients.length > 0 ? (
                    <ul>
                        {waitingPatients.map((patient, index) => (
                            <li key={index} className="mb-2 p-2 border-b last:border-b-0">
                                <p className="font-medium">{patient}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-600">Nenhum paciente aguardando.</p>
                )}
                <Button onClick={() => onNavigate('prontuario-eletronico')} className="w-full mt-4">Acessar Prontuários Recentes</Button>
            </div>
        </div>
    );
};