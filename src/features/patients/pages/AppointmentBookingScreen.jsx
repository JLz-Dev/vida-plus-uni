import { useState } from "react";
import { Modal, Button, InputField } from "../../../components/common"

export function AppointmentBookingScreen({ onNavigate }) {
    const [speciality, setSpeciality] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [professional, setProfessional] = useState('');
    const [appointmentType, setAppointmentType] = useState('presencial'); // 'presencial' ou 'telemedicina'
    const [isModalOpen, setIsModalOpen] = useState(false);

    const availableProfessionals = [
        { id: 'dr-joao', name: 'Dr. João Silva (Clínico Geral)' },
        { id: 'dra-ana', name: 'Dra. Ana Luiza (Cardiologia)' },
        { id: 'dr-pedro', name: 'Dr. Pedro Santana (Pediatria)' },
    ];

    const handleBooking = (e) => {
        e.preventDefault();
        if (!speciality || !date || !time || !professional || !appointmentType) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }
        setIsModalOpen(true);
    };

    const confirmBooking = () => {
        alert('Agendamento confirmado!');
        setIsModalOpen(false);
        onNavigate('minhas-consultas');
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Agendar Consulta/Exame</h2>
            <form onSubmit={handleBooking}>
                <div className="mb-4">
                    <label htmlFor="speciality" className="block text-gray-700 text-sm font-bold mb-2">
                        Especialidade/Tipo de Exame <span className="text-red-500">*</span>
                    </label>
                    <select
                        id="speciality"
                        value={speciality}
                        onChange={(e) => setSpeciality(e.target.value)}
                        className="shadow border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                        required
                    >
                        <option value="">Selecione</option>
                        <option value="clinico-geral">Clínico Geral</option>
                        <option value="cardiologia">Cardiologia</option>
                        <option value="pediatria">Pediatria</option>
                        <option value="dermatologia">Dermatologia</option>
                        <option value="exame-sangue">Exame de Sangue</option>
                    </select>
                </div>

                <InputField id="date" label="Data Desejada" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                <InputField id="time" label="Horário Disponível" type="time" value={time} onChange={(e) => setTime(e.target.value)} required />

                <div className="mb-4">
                    <label htmlFor="professional" className="block text-gray-700 text-sm font-bold mb-2">
                        Profissional (Opcional)
                    </label>
                    <select
                        id="professional"
                        value={professional}
                        onChange={(e) => setProfessional(e.target.value)}
                        className="shadow border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    >
                        <option value="">Qualquer Profissional</option>
                        {availableProfessionals.map(prof => (
                            <option key={prof.id} value={prof.id}>{prof.name}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <span className="block text-gray-700 text-sm font-bold mb-2">Tipo de Consulta <span className="text-red-500">*</span></span>
                    <div className="flex space-x-4">
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name="appointmentType"
                                value="presencial"
                                checked={appointmentType === 'presencial'}
                                onChange={() => setAppointmentType('presencial')}
                                className="form-radio"
                            />
                            <span className="ml-2 text-gray-700">Presencial</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name="appointmentType"
                                value="telemedicina"
                                checked={appointmentType === 'telemedicina'}
                                onChange={() => setAppointmentType('telemedicina')}
                                className="form-radio"
                            />
                            <span className="ml-2 text-gray-700">Telemedicina</span>
                        </label>
                    </div>
                </div>

                <Button type="submit" className="w-full mt-6">Agendar</Button>
            </form>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Confirmação de Agendamento">
                <p className="mb-4 text-gray-700">Você está prestes a agendar uma consulta:</p>
                <ul className="list-disc list-inside mb-4 text-gray-700">
                    <li><strong>Especialidade:</strong> {speciality}</li>
                    <li><strong>Data:</strong> {date}</li>
                    <li><strong>Hora:</strong> {time}</li>
                    <li><strong>Profissional:</strong> {availableProfessionals.find(p => p.id === professional)?.name || 'Não selecionado'}</li>
                    <li><strong>Tipo:</strong> {appointmentType === 'presencial' ? 'Presencial' : 'Telemedicina'}</li>
                </ul>
                <div className="flex justify-end space-x-3">
                    <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                    <Button onClick={confirmBooking}>Confirmar Agendamento</Button>
                </div>
            </Modal>
        </div>
    );
};