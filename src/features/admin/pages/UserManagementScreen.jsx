import { useState } from "react";
import { Modal, Button, InputField } from "../../../components/common"
export function UserManagementScreen() {
    const [users, setUsers] = useState([
        { id: 1, name: 'Paciente A', email: 'pacientea@sghss.com', role: 'Paciente', status: 'Ativo' },
        { id: 2, name: 'Dr. João Silva', email: 'joao.s@sghss.com', role: 'Profissional', status: 'Ativo' },
        { id: 3, name: 'Admin Geral', email: 'admin@sghss.com', role: 'Administrador', status: 'Ativo' },
        { id: 4, name: 'Paciente Inativo', email: 'inativo@sghss.com', role: 'Paciente', status: 'Inativo' },
    ]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState('');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = filterRole ? user.role === filterRole : true;
        return matchesSearch && matchesRole;
    });

    const handleEdit = (user) => {
        setEditingUser({ ...user }); // Criar uma cópia para edição
        setIsEditModalOpen(true);
    };

    const handleSaveUser = () => {
        setUsers(prev => prev.map(u => u.id === editingUser.id ? editingUser : u));
        setIsEditModalOpen(false);
        setEditingUser(null);
        alert('Usuário atualizado com sucesso!');
    };

    const handleToggleStatus = (user) => {
        const newStatus = user.status === 'Ativo' ? 'Inativo' : 'Ativo';
        setUsers(prev => prev.map(u => u.id === user.id ? { ...u, status: newStatus } : u));
        alert(`Usuário ${user.name} agora está ${newStatus}.`);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Gestão de Usuários</h2>

            <div className="mb-6 flex flex-wrap gap-4 items-center">
                <InputField
                    id="searchUser"
                    label="Buscar por Nome/Email"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar usuário..."
                    className="flex-grow md:flex-grow-0 md:w-1/3"
                />
                <div className="flex-grow md:flex-grow-0 md:w-1/4">
                    <label htmlFor="filterRole" className="block text-gray-700 text-sm font-bold mb-2">
                        Filtrar por Perfil
                    </label>
                    <select
                        id="filterRole"
                        value={filterRole}
                        onChange={(e) => setFilterRole(e.target.value)}
                        className="shadow border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    >
                        <option value="">Todos</option>
                        <option value="Paciente">Paciente</option>
                        <option value="Profissional">Profissional de Saúde</option>
                        <option value="Administrador">Administrador</option>
                    </select>
                </div>
                <Button onClick={() => alert('Abrir modal para adicionar novo usuário.')} className="ml-auto">Adicionar Novo Usuário</Button>
            </div>

            {filteredUsers.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Perfil</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredUsers.map(user => (
                                <tr key={user.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === 'Ativo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                            }`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Button variant="secondary" className="mr-2" onClick={() => handleEdit(user)}>Editar</Button>
                                        <Button
                                            variant={user.status === 'Ativo' ? 'danger' : 'primary'}
                                            onClick={() => handleToggleStatus(user)}
                                        >
                                            {user.status === 'Ativo' ? 'Desativar' : 'Ativar'}
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-gray-600 text-center">Nenhum usuário encontrado.</p>
            )}

            <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Editar Usuário">
                {editingUser && (
                    <div>
                        <InputField
                            id="editUserName"
                            label="Nome"
                            value={editingUser.name}
                            onChange={(e) => setEditingUser(prev => ({ ...prev, name: e.target.value }))}
                        />
                        <InputField
                            id="editUserEmail"
                            label="Email"
                            type="email"
                            value={editingUser.email}
                            onChange={(e) => setEditingUser(prev => ({ ...prev, email: e.target.value }))}
                        />
                        <div className="mb-4">
                            <label htmlFor="editUserRole" className="block text-gray-700 text-sm font-bold mb-2">
                                Perfil
                            </label>
                            <select
                                id="editUserRole"
                                value={editingUser.role}
                                onChange={(e) => setEditingUser(prev => ({ ...prev, role: e.target.value }))}
                                className="shadow border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                            >
                                <option value="Paciente">Paciente</option>
                                <option value="Profissional">Profissional de Saúde</option>
                                <option value="Administrador">Administrador</option>
                            </select>
                        </div>
                        <div className="flex justify-end space-x-3 mt-4">
                            <Button variant="secondary" onClick={() => setIsEditModalOpen(false)}>Cancelar</Button>
                            <Button onClick={handleSaveUser}>Salvar Alterações</Button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};
