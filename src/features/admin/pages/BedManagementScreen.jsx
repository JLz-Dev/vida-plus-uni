import { useState } from "react";
import { Modal, Button, InputField } from "../../../components/common"

export function BedManagementScreen() {
    const [beds, setBeds] = useState([
        { id: 1, room: 'A101', bedNum: '01', status: 'Ocupado', patient: 'Pedro H.', entryDate: '2025-06-25' },
        { id: 2, room: 'A101', bedNum: '02', status: 'Livre', patient: null, entryDate: null },
        { id: 3, room: 'A102', bedNum: '01', status: 'Manutenção', patient: null, entryDate: null },
        { id: 4, room: 'A102', bedNum: '02', status: 'Ocupado', patient: 'Laura C.', entryDate: '2025-06-20' },
    ]);
    const [isAdmissionModalOpen, setIsAdmissionModalOpen] = useState(false);
    const [isDischargeModalOpen, setIsDischargeModalOpen] = useState(false);
    const [selectedBed, setSelectedBed] = useState(null);
    const [admissionPatientName, setAdmissionPatientName] = useState('');

    const getBedStatusColor = (status) => {
        switch (status) {
            case 'Ocupado': return 'bg-red-500';
            case 'Livre': return 'bg-green-500';
            case 'Manutenção': return 'bg-yellow-500';
            default: return 'bg-gray-400';
        }
    };

    const handleAdmitPatient = (bed) => {
        setSelectedBed(bed);
        setIsAdmissionModalOpen(true);
    };

    const confirmAdmission = () => {
        if (selectedBed && admissionPatientName) {
            setBeds(prev => prev.map(b =>
                b.id === selectedBed.id ? { ...b, status: 'Ocupado', patient: admissionPatientName, entryDate: new Date().toISOString().split('T')[0] } : b
            ));
            alert(`Paciente ${admissionPatientName} internado no leito ${selectedBed.room}-${selectedBed.bedNum}.`);
            setIsAdmissionModalOpen(false);
            setAdmissionPatientName('');
            setSelectedBed(null);
        }
    };

    const handleDischargePatient = (bed) => {
        setSelectedBed(bed);
        setIsDischargeModalOpen(true);
    };

    const confirmDischarge = () => {
        if (selectedBed) {
            setBeds(prev => prev.map(b =>
                b.id === selectedBed.id ? { ...b, status: 'Livre', patient: null, entryDate: null } : b
            ));
            alert(`Paciente ${selectedBed.patient} recebeu alta do leito ${selectedBed.room}-${selectedBed.bedNum}.`);
            setIsDischargeModalOpen(false);
            setSelectedBed(null);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Gestão de Internações e Leitos</h2>

            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Mapa de Leitos</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {beds.map(bed => (
                        <div
                            key={bed.id}
                            className={`p-4 rounded-lg shadow-sm flex flex-col items-center justify-center text-white ${getBedStatusColor(bed.status)}`}
                            aria-label={`Leito ${bed.room}-${bed.bedNum}, Status: ${bed.status} ${bed.patient ? ', Paciente: ' + bed.patient : ''}`}
                        >
                            <p className="font-bold text-lg">Leito {bed.bedNum}</p>
                            <p className="text-sm">Quarto {bed.room}</p>
                            <p className="text-xs">{bed.status}</p>
                            {bed.patient && <p className="text-xs mt-1">Paciente: {bed.patient}</p>}
                            {bed.status === 'Livre' && (
                                <Button variant="secondary" className="mt-2 text-xs" onClick={() => handleAdmitPatient(bed)}>Internar</Button>
                            )}
                            {bed.status === 'Ocupado' && (
                                <Button variant="danger" className="mt-2 text-xs" onClick={() => handleDischargePatient(bed)}>Alta</Button>
                            )}
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-4 space-x-4 text-sm text-gray-700">
                    <span className="flex items-center"><span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>Ocupado</span>
                    <span className="flex items-center"><span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>Livre</span>
                    <span className="flex items-center"><span className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>Manutenção</span>
                </div>
            </div>

            <h3 className="text-xl font-semibold mb-3 text-gray-800">Pacientes Internados</h3>
            {beds.filter(b => b.status === 'Ocupado').length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leito</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paciente</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entrada</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {beds.filter(b => b.status === 'Ocupado').map(bed => (
                                <tr key={bed.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{bed.room}-{bed.bedNum}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{bed.patient}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{bed.entryDate}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Button variant="danger" onClick={() => handleDischargePatient(bed)}>Dar Alta</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-gray-600 text-center">Nenhum paciente internado no momento.</p>
            )}

            <Modal isOpen={isAdmissionModalOpen} onClose={() => setIsAdmissionModalOpen(false)} title="Internar Paciente">
                {selectedBed && (
                    <div>
                        <p className="mb-4 text-gray-700">Internar paciente no leito <strong>{selectedBed.room}-{selectedBed.bedNum}</strong>.</p>
                        <InputField
                            id="admissionPatientName"
                            label="Nome do Paciente"
                            value={admissionPatientName}
                            onChange={(e) => setAdmissionPatientName(e.target.value)}
                            required
                        />
                        <div className="flex justify-end space-x-3 mt-4">
                            <Button variant="secondary" onClick={() => setIsAdmissionModalOpen(false)}>Cancelar</Button>
                            <Button onClick={confirmAdmission}>Confirmar Internação</Button>
                        </div>
                    </div>
                )}
            </Modal>

            <Modal isOpen={isDischargeModalOpen} onClose={() => setIsDischargeModalOpen(false)} title="Confirmar Alta do Paciente">
                {selectedBed && (
                    <div>
                        <p className="mb-4 text-gray-700">
                            Tem certeza que deseja dar alta ao paciente <strong>{selectedBed.patient}</strong> do leito <strong>{selectedBed.room}-{selectedBed.bedNum}</strong>?
                        </p>
                        <div className="flex justify-end space-x-3">
                            <Button variant="secondary" onClick={() => setIsDischargeModalOpen(false)}>Não, Manter Internado</Button>
                            <Button variant="danger" onClick={confirmDischarge}>Sim, Dar Alta</Button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};