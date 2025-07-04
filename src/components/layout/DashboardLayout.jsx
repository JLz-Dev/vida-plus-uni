import { Button } from "../common/Button"
export function DashboardLayout({ userRole, onLogout, onNavigate, children }) {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <header className="bg-emerald-700 text-white p-4 shadow-md flex justify-between items-center">
                <h1 className="text-2xl font-bold">VidaPlus+</h1>
                <nav className="hidden md:flex space-x-4">
                    {userRole === 'paciente' && (
                        <>
                            <Button variant="link" onClick={() => onNavigate('dashboard')}>Dashboard</Button>
                            <Button variant="link" onClick={() => onNavigate('agendar-consulta')}>Agendar Consulta</Button>
                            <Button variant="link" onClick={() => onNavigate('minhas-consultas')}>Minhas Consultas</Button>
                            <Button variant="link" onClick={() => onNavigate('historico-clinico')}>Histórico Clínico</Button>
                        </>
                    )}
                    {userRole === 'profissional' && (
                        <>
                            <Button variant="link" onClick={() => onNavigate('dashboard')}>Dashboard</Button>
                            <Button variant="link" onClick={() => onNavigate('gestao-agenda')}>Gestão de Agenda</Button>
                            <Button variant="link" onClick={() => onNavigate('prontuario-eletronico')}>Prontuário</Button>
                            <Button variant="link" onClick={() => onNavigate('receitas-digitais')}>Receitas Digitais</Button>
                        </>
                    )}
                    {userRole === 'administrador' && (
                        <>
                            <Button variant="link" onClick={() => onNavigate('dashboard')}>Dashboard</Button>
                            <Button variant="link" onClick={() => onNavigate('gestao-usuarios')}>Gestão de Usuários</Button>
                            <Button variant="link" onClick={() => onNavigate('gestao-internacoes')}>Internações/Leitos</Button>
                            <Button variant="link" onClick={() => onNavigate('relatorios')}>Relatórios</Button>
                        </>
                    )}
                    <Button variant="link" onClick={() => onNavigate('configuracoes-perfil')}>Configurações</Button>
                </nav>
                <div className="flex items-center space-x-4">
                    <span className="text-sm">Logado como: <span className="font-semibold capitalize">{userRole}</span></span>
                    <Button onClick={onLogout} variant="secondary">Sair</Button>
                </div>
            </header>
            <main className="flex-grow p-6">
                {children}
            </main>
            <footer className="bg-gray-800 text-white p-4 text-center text-sm">
                VidaPlus+ &copy; 2025. Todos os direitos reservados.
            </footer>
        </div>
    )
};