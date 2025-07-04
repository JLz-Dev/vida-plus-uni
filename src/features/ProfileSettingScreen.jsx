import { useState } from "react";
import { Button, InputField } from "../components/common"

export function ProfileSettingsScreen({ userRole }) {
    const [name, setName] = useState('Usuário Exemplo');
    const [email, setEmail] = useState(`exemplo@${userRole}.com`);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);

    const handleSaveProfile = (e) => {
        e.preventDefault();
        if (password && password !== confirmPassword) {
            alert('As senhas não coincidem!');
            return;
        }
        alert('Configurações de perfil salvas com sucesso!');
        console.log({ name, email, notificationsEnabled });
        setPassword('');
        setConfirmPassword('');
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Configurações de Perfil</h2>
            <form onSubmit={handleSaveProfile}>
                <InputField id="profileName" label="Nome Completo" value={name} onChange={(e) => setName(e.target.value)} required />
                <InputField id="profileEmail" label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                <h3 className="text-xl font-semibold mt-6 mb-4 text-gray-800">Alterar Senha</h3>
                <InputField id="newPassword" label="Nova Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Deixe em branco para não alterar" />
                <InputField id="confirmNewPassword" label="Confirmar Nova Senha" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

                <h3 className="text-xl font-semibold mt-6 mb-4 text-gray-800">Preferências de Notificação</h3>
                <div className="mb-4 flex items-center">
                    <input
                        type="checkbox"
                        id="notificationsEnabled"
                        checked={notificationsEnabled}
                        onChange={(e) => setNotificationsEnabled(e.target.checked)}
                        className="mr-2"
                    />
                    <label htmlFor="notificationsEnabled" className="text-sm text-gray-700">
                        Receber notificações por email
                    </label>
                </div>

                <Button type="submit" className="w-full mt-6">Salvar Alterações</Button>
            </form>
        </div>
    );
};