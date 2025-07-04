import { useState } from "react";
import { Button, InputField } from "../../../components/common"

export function PatientRegistrationScreen({ onNavigate }) {
    const [formData, setFormData] = useState({
        nome: '', cpf: '', dataNascimento: '', endereco: '', telefone: '', email: '', senha: '', termos: false
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [id]: type === 'checkbox' ? checked : value }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.nome) newErrors.nome = 'Nome completo é obrigatório.';
        if (!formData.cpf) newErrors.cpf = 'CPF é obrigatório.';
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email inválido.';
        if (!formData.senha || formData.senha.length < 6) newErrors.senha = 'Senha deve ter pelo menos 6 caracteres.';
        if (!formData.termos) newErrors.termos = 'Você deve aceitar os termos de uso.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            alert('Cadastro de paciente realizado com sucesso! Redirecionando para o login.');
            console.log('Dados do paciente:', formData);
            onNavigate('login');
        } else {
            alert('Por favor, corrija os erros no formulário.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Cadastro de Paciente</h2>
                <form onSubmit={handleSubmit}>
                    <InputField id="nome" label="Nome Completo" value={formData.nome} onChange={handleChange} required />
                    {errors.nome && <p className="text-red-500 text-sm mb-2">{errors.nome}</p>}
                    <InputField id="cpf" label="CPF" value={formData.cpf} onChange={handleChange} placeholder="XXX.XXX.XXX-XX" required />
                    {errors.cpf && <p className="text-red-500 text-sm mb-2">{errors.cpf}</p>}
                    <InputField id="dataNascimento" label="Data de Nascimento" type="date" value={formData.dataNascimento} onChange={handleChange} required />
                    <InputField id="endereco" label="Endereço Completo" value={formData.endereco} onChange={handleChange} />
                    <InputField id="telefone" label="Telefone" type="tel" value={formData.telefone} onChange={handleChange} placeholder="(XX) XXXXX-XXXX" />
                    <InputField id="email" label="Email" type="email" value={formData.email} onChange={handleChange} required />
                    {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email}</p>}
                    <InputField id="senha" label="Senha" type="password" value={formData.senha} onChange={handleChange} required />
                    {errors.senha && <p className="text-red-500 text-sm mb-2">{errors.senha}</p>}
                    <div className="mb-4 flex items-center">
                        <input
                            type="checkbox"
                            id="termos"
                            checked={formData.termos}
                            onChange={handleChange}
                            className="mr-2"
                            required
                        />
                        <label htmlFor="termos" className="text-sm text-gray-700">
                            Concordo com os <a href="#" className="text-blue-600 hover:underline" onClick={() => alert('Termos de uso e política de privacidade.')}>termos de uso e política de privacidade</a>.
                        </label>
                    </div>
                    {errors.termos && <p className="text-red-500 text-sm mb-2">{errors.termos}</p>}

                    <Button type="submit" className="w-full mt-6">Cadastrar</Button>
                    <Button variant="secondary" onClick={() => onNavigate('login')} className="w-full mt-2">Voltar ao Login</Button>
                </form>
            </div>
        </div>
    );
};