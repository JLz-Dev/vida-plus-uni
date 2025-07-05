import { useState } from "react";
import { Button, InputField } from "../../../components/common"
export function LoginScreen({ onLogin, onNavigate }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');
        // Simulação de autenticação
        if (email === 'paciente@vidaplus.com' && password === '123') {
            onLogin('paciente');
        } else if (email === 'profissional@vidaplus.com' && password === '123') {
            onLogin('profissional');
        } else if (email === 'admin@vidaplus.com' && password === '123') {
            onLogin('administrador');
        } else {
            setError('Credenciais inválidas. Tente novamente.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login Vida Plus </h2>
                <form onSubmit={handleLogin}>
                    {error && <p className="text-red-600 text-center mb-4" role="alert">{error}</p>}
                    <InputField
                        id="email"
                        label="Email/CPF"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Seu email ou CPF"
                        required
                    />
                    <InputField
                        id="password"
                        label="Senha"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Sua senha"
                        required
                    />
                    <Button type="submit" className="w-full mt-4">Entrar</Button>
                    <div className="flex justify-between items-center mt-4 text-sm">
                        <Button className="cursor-pointer" variant="link" onClick={() => alert('Funcionalidade "Esqueceu a senha?" ainda não implementada.')}>
                            Esqueceu a senha?
                        </Button>
                        <Button className="cursor-pointer" variant="link" onClick={() => onNavigate('register')}>
                            Cadastre-se (Pacientes)
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};