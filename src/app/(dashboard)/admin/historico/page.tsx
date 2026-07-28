"use client";

import { useState } from "react";
import {
  Search,
  Calendar,
  TriangleAlert,
  ChevronDown,
  ChevronUp,
  FileDown,
  FileText,
  Filter,
} from "lucide-react";

interface Ocorrencia {
  id: number;
  usuario: string;
  veiculo: string;
  data: string; // Formato DD/MM/AAAA
  ano: number;
  tipo: string;
  status: "Aberta" | "Resolvida";
  descricao: string;
  pdfUrl?: string; // Link para PDF anexado à ocorrência
}

const ocorrenciasMock: Ocorrencia[] = [
  {
    id: 1,
    usuario: "João Silva",
    veiculo: "ABC-1234",
    data: "27/07/2026",
    ano: 2026,
    tipo: "Estacionamento Irregular",
    status: "Aberta",
    descricao: "Veículo estacionado em vaga exclusiva sem credencial visível.",
    pdfUrl: "/relatorios/ocorrencia-1.pdf",
  },
  {
    id: 2,
    usuario: "Maria Souza",
    veiculo: "QWE-9876",
    data: "26/07/2026",
    ano: 2026,
    tipo: "Acesso Indevido",
    status: "Resolvida",
    descricao: "Entrada na garagem sem autorização registrada na portaria.",
    pdfUrl: "/relatorios/ocorrencia-2.pdf",
  },
  {
    id: 3,
    usuario: "Carlos Eduardo",
    veiculo: "XYZ-5544",
    data: "10/11/2025",
    ano: 2025,
    tipo: "Colisão / Avaria",
    status: "Resolvida",
    descricao: "Pequena colisão ao manobrar no Setor B.",
    pdfUrl: "/relatorios/ocorrencia-3.pdf",
  },
];

export default function HistoricoOcorrenciasPage() {
  const [busca, setBusca] = useState("");
  const [anoSelecionado, setAnoSelecionado] = useState<string>("todos");
  const [aberto, setAberto] = useState<number | null>(null);

  // Anos disponíveis para o relatório anual
  const anosDisponiveis = [2026, 2025, 2024];

  // Alterna a sanfona de detalhes
  function toggleCard(id: number) {
    setAberto(aberto === id ? null : id);
  }

  // Filtragem das ocorrências
  const ocorrenciasFiltradas = ocorrenciasMock.filter((item) => {
    const atendeBusca =
      item.usuario.toLowerCase().includes(busca.toLowerCase()) ||
      item.veiculo.toLowerCase().includes(busca.toLowerCase()) ||
      item.tipo.toLowerCase().includes(busca.toLowerCase());

    const atendeAno =
      anoSelecionado === "todos" || item.ano.toString() === anoSelecionado;

    return atendeBusca && atendeAno;
  });

  // Função simulada para download do Relatório Anual em PDF
  const handleDownloadRelatorioAnual = (ano: string) => {
    if (ano === "todos") {
      alert("Gerando e baixando o Relatório Consolidado Geral em PDF...");
    } else {
      alert(`Gerando e baixando o Relatório Anual de Ocorrências (${ano}) em PDF...`);
    }
    // Aqui seria chamada a API para baixar/gerar o PDF real via pdfmake, jsPDF ou endpoint do Backend
  };

  return (
    <main className="space-y-6 p-6 bg-white min-h-screen text-slate-800">
      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Histórico e Arquivo de Ocorrências
          </h1>
          <p className="text-slate-500">
            Consulte os registros salvos e exporte balanços anuais em PDF.
          </p>
        </div>

        {/* Botão de Ação Principal: Baixar Relatório Anual */}
        <button
          onClick={() => handleDownloadRelatorioAnual(anoSelecionado)}
          className="flex items-center justify-center gap-2 rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800 transition shadow-sm"
        >
          <FileDown size={20} />
          Exportar Relatório em PDF {anoSelecionado !== "todos" ? `(${anoSelecionado})` : "Geral"}
        </button>
      </div>

      {/* Barra de Pesquisa e Filtros de Período */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative w-full">
          <Search
            className="absolute left-3 top-3.5 text-slate-400"
            size={20}
          />
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Pesquisar por usuário, placa do veículo ou tipo..."
            className="w-full rounded-lg border border-slate-300 py-3 pl-10 pr-4 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
          />
        </div>

        {/* Seleção de Ano / Período */}
        <div className="flex items-center gap-2 border border-slate-300 rounded-lg px-3 bg-white min-w-[200px]">
          <Filter size={18} className="text-slate-500" />
          <select
            value={anoSelecionado}
            onChange={(e) => setAnoSelecionado(e.target.value)}
            className="w-full py-3 bg-transparent outline-none text-slate-700 font-medium cursor-pointer"
          >
            <option value="todos">Todos os Anos</option>
            {anosDisponiveis.map((ano) => (
              <option key={ano} value={ano}>
                Ano {ano}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Lista de Ocorrências */}
      <div className="space-y-4">
        {ocorrenciasFiltradas.length === 0 ? (
          <div className="text-center py-12 border border-dashed rounded-xl text-slate-500">
            Nenhuma ocorrência encontrada com os filtros selecionados.
          </div>
        ) : (
          ocorrenciasFiltradas.map((ocorrencia) => (
            <div
              key={ocorrencia.id}
              className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 gap-4">
                <div className="flex items-center gap-4">
                  <div
                    className={`rounded-xl p-4 ${
                      ocorrencia.status === "Aberta"
                        ? "bg-red-600 text-white"
                        : "bg-slate-600 text-white"
                    }`}
                  >
                    <TriangleAlert size={28} />
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      {ocorrencia.tipo}
                    </h2>
                    <p className="text-sm text-slate-500">
                      Envolvido: <span className="font-medium text-slate-700">{ocorrencia.usuario}</span>
                    </p>
                  </div>
                </div>

                <div className="flex sm:flex-col items-start sm:items-end justify-between gap-2">
                  <span className="text-sm font-medium text-slate-500">
                    {ocorrencia.data}
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      ocorrencia.status === "Aberta"
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {ocorrencia.status}
                  </span>
                </div>
              </div>

              {/* Detalhes Expansíveis */}
              {aberto === ocorrencia.id && (
                <>
                  <hr className="border-slate-100" />

                  <div className="space-y-3 p-5 bg-slate-50/50 text-slate-700 text-sm">
                    <p>
                      <strong>Usuário / Envolvido:</strong> {ocorrencia.usuario}
                    </p>

                    <p>
                      <strong>Veículo / Placa:</strong> {ocorrencia.veiculo}
                    </p>

                    <p>
                      <strong>Descrição do Fato:</strong> {ocorrencia.descricao}
                    </p>
                  </div>
                </>
              )}

              {/* Botão de Ação para Expandir/Recolher */}
              <button
                onClick={() => toggleCard(ocorrencia.id)}
                className="flex w-full items-center justify-center gap-2 border-t border-slate-100 p-3 text-sm font-semibold text-blue-700 hover:bg-slate-50 transition"
              >
                {aberto === ocorrencia.id ? (
                  <>
                    Ver Menos
                    <ChevronUp size={18} />
                  </>
                ) : (
                  <>
                    Ver Detalhes
                    <ChevronDown size={18} />
                  </>
                )}
              </button>
            </div>
          ))
        )}
      </div>
    </main>
  );
}