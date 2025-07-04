import { Button, InputField } from "../../components/common"
export function TeleconsultationScreen() {
    const [chatMessage, setChatMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    const handleSendChat = () => {
        if (chatMessage.trim()) {
            setChatHistory(prev => [...prev, { sender: 'Você', message: chatMessage, time: new Date().toLocaleTimeString() }]);
            setChatMessage('');
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-5xl mx-auto flex flex-col h-[70vh]">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Sessão de Teleconsulta</h2>
            <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Área de vídeo */}
                <div className="md:col-span-2 bg-gray-200 rounded-lg flex items-center justify-center text-gray-600 text-lg relative">
                    <div className="absolute top-4 left-4 bg-white p-2 rounded-lg shadow-sm text-sm">
                        Paciente: Maria Silva
                    </div>
                    <div className="absolute top-4 right-4 bg-white p-2 rounded-lg shadow-sm text-sm">
                        Profissional: Dr. João
                    </div>
                    [Interface de Videochamada Aqui]
                    {/* Controles de vídeo e áudio */}
                    <div className="absolute bottom-4 flex space-x-4">
                        <Button variant="secondary" aria-label="Ligar/Desligar Microfone">
                            <span role="img" aria-label="Microfone">🎤</span>
                        </Button>
                        <Button variant="secondary" aria-label="Ligar/Desligar Câmera">
                            <span role="img" aria-label="Câmera">📹</span>
                        </Button>
                        <Button variant="primary" aria-label="Compartilhar Tela">
                            <span role="img" aria-label="Compartilhar Tela">🖥️</span>
                        </Button>
                        <Button variant="danger" aria-label="Encerrar Chamada">
                            <span role="img" aria-label="Encerrar Chamada">📞</span>
                        </Button>
                    </div>
                </div>

                {/* Chat e área de prontuário rápido */}
                <div className="md:col-span-1 flex flex-col space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg shadow-inner flex-grow flex flex-col">
                        <h3 className="text-lg font-semibold mb-2">Chat</h3>
                        <div className="flex-grow overflow-y-auto mb-2 border p-2 rounded-lg bg-white">
                            {chatHistory.length === 0 ? (
                                <p className="text-gray-500 text-sm">Nenhuma mensagem no chat.</p>
                            ) : (
                                chatHistory.map((msg, index) => (
                                    <p key={index} className="text-sm mb-1">
                                        <span className="font-semibold">{msg.sender}</span> ({msg.time}): {msg.message}
                                    </p>
                                ))
                            )}
                        </div>
                        <div className="flex">
                            <InputField
                                id="chat-input"
                                placeholder="Digite sua mensagem..."
                                value={chatMessage}
                                onChange={(e) => setChatMessage(e.target.value)}
                                className="flex-grow mr-2"
                                aria-label="Campo de mensagem do chat"
                            />
                            <Button onClick={handleSendChat}>Enviar</Button>
                        </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
                        <h3 className="text-lg font-semibold mb-2">Registro Rápido (Profissional)</h3>
                        <textarea
                            className="w-full p-2 border rounded-lg h-24 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                            placeholder="Anotações durante a consulta..."
                            aria-label="Campo para anotações rápidas durante a teleconsulta"
                        ></textarea>
                    </div>
                </div>
            </div>
        </div>
    );
};