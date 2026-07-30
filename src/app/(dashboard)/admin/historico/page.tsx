"use client";

import { AdminPageHeader } from "@/features/admin/components/molecules/AdminPageHeader";
import { AdminOccurrenceHistory } from "@/features/admin/components/organisms/AdminOccurrenceHistory";
import { useState } from "react";

interface Ocorrencia {
  id: number;
  usuario: string;
  veiculo: string;
  data: string; 
  ano: number;
  tipo: string;
  status: "Aberta" | "Resolvida";
  descricao: string;
  pdfUrl?: string; 
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
  return (
    <section>
      <AdminPageHeader title="histórico de ocorrências" />
      <AdminOccurrenceHistory />
    </section>
  );

  const [anoSelecionado, setAnoSelecionado] = useState<string>("todos");
  const [aberto, setAberto] = useState<number | null>(null);

  const anosDisponiveis = [2026, 2025, 2024];
  
  function toggleCard(id: number) {
    setAberto(aberto === id ? null : id);
  }
}