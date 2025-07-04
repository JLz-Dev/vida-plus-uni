import { useState } from "react";
import { Button, InputField } from "../../../components/common"
export function ReportsScreen() {
    const [reportType, setReportType] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reportData, setReportData] = useState(null);

    const generateReport = () => {
        if (!reportType || !startDate || !endDate) {
            alert('Por favor, selecione o tipo de relatório e o período.');
            return;
        }
        // Simulação de geração de dados de relatório
        let data;
        switch (reportType) {
            case 'atendimentos':
                data = {
                    title: 'Relatório de Atendimentos',
                    headers: ['Data', 'Tipo', 'Profissional', 'Status'],
                    rows: [
                        ['2025-06-01', 'Consulta', 'Dr. João', 'Concluído'],
                        ['2025-06-05', 'Exame', 'Laboratório X', 'Concluído'],
                        ['2025-06-10', 'Consulta', 'Dra. Ana', 'Cancelado'],
                    ]
                };
                break;
            case 'ocupacao-leitos':
                data = {
                    title: 'Relatório de Ocupação de Leitos',
                    headers: ['Período', 'Ocupação Média (%)', 'Leitos Livres Médios'],
                    rows: [
                        ['Jun/2025', '80%', '5'],
                    ]
                };
                break;
            case 'financeiro':
                data = {
                    title: 'Relatório Financeiro (Receitas)',
                    headers: ['Mês', 'Consultas', 'Exames', 'Internações', 'Total'],
                    rows: [
                        ['Jun/2025', 'R$ 15.000', 'R$ 7.000', 'R$ 20.000', 'R$ 42.000'],
                    ]
                };
                break;
            default:
                data = null;
        }
        setReportData(data);
    };

    const exportReport = (format) => {
        if (reportData) {
            alert(`Relatório "${reportData.title}" exportado como ${format}.`);
            // Lógica real de exportação para PDF/Excel aqui
        } else {
            alert('Gere um relatório primeiro para poder exportar.');
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Relatórios</h2>

            <div className="mb-6 flex flex-wrap gap-4 items-end">
                <div className="flex-grow md:flex-grow-0 md:w-1/4">
                    <label htmlFor="reportType" className="block text-gray-700 text-sm font-bold mb-2">
                        Tipo de Relatório <span className="text-red-500">*</span>
                    </label>
                    <select
                        id="reportType"
                        value={reportType}
                        onChange={(e) => setReportType(e.target.value)}
                        className="shadow border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                        required
                    >
                        <option value="">Selecione</option>
                        <option value="atendimentos">Atendimentos</option>
                        <option value="ocupacao-leitos">Ocupação de Leitos</option>
                        <option value="financeiro">Financeiro</option>
                    </select>
                </div>
                <InputField
                    id="startDate"
                    label="Data Início"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                />
                <InputField
                    id="endDate"
                    label="Data Fim"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                />
                <Button onClick={generateReport}>Gerar Relatório</Button>
            </div>

            {reportData && (
                <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">{reportData.title}</h3>
                    <div className="overflow-x-auto mb-6">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    {reportData.headers.map((header, index) => (
                                        <th key={index} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {reportData.rows.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {row.map((cell, cellIndex) => (
                                            <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                                {cell}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-end space-x-3">
                        <Button variant="secondary" onClick={() => exportReport('PDF')}>Exportar para PDF</Button>
                        <Button variant="secondary" onClick={() => exportReport('Excel')}>Exportar para Excel</Button>
                    </div>
                </div>
            )}
            {!reportData && <p className="text-gray-600 text-center mt-8">Gere um relatório para visualizar os dados.</p>}
        </div>
    );
};