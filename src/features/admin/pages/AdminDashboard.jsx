import { Button } from "../../../components/common/Button";
export function AdminDashboard({ onNavigate }) {
    const metrics = {
        internations: 15,
        bedOccupancy: '85%',
        newPatients: 120,
        activeProfessionals: 55,
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Métricas Hospitalares</h2>
                <p className="mb-2"><span className="font-medium">Internações Atuais:</span> {metrics.internations}</p>
                <p className="mb-2"><span className="font-medium">Ocupação de Leitos:</span> {metrics.bedOccupancy}</p>
                <p className="mb-2"><span className="font-medium">Novos Pacientes (Mês):</span> {metrics.newPatients}</p>
                <p><span className="font-medium">Profissionais Ativos:</span> {metrics.activeProfessionals}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Gestão Rápida</h2>
                <div className="space-y-4">
                    <Button onClick={() => onNavigate('gestao-usuarios')} className="w-full">Gestão de Usuários</Button>
                    <Button onClick={() => onNavigate('gestao-internacoes')} className="w-full">Gestão de Internações/Leitos</Button>
                    <Button onClick={() => onNavigate('relatorios')} className="w-full">Gerar Relatórios</Button>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Gráfico de Exemplo</h2>
                {/* Placeholder para um gráfico simples */}
                <div className="bg-gray-200 h-40 flex items-center justify-center rounded-md text-gray-600">
                    [Gráfico de Ocupação de Leitos]
                </div>
            </div>
        </div>
    );
};