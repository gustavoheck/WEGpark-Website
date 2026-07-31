"use client";

import { useEffect, useState } from "react";
import { Folder, ChevronDown, ChevronRight } from "lucide-react";
// import { api } from "@/shared/services/api";

interface Relatorio {
  id: string;
  ano: number;
  mes: string;
  arquivo?: string;
}

interface RelatoriosPorAno {
  ano: number;
  relatorios: Relatorio[];
}

export default function RelatorioOcorrenciasPage() {
  const [relatorios, setRelatorios] = useState<RelatoriosPorAno[]>([]);
  const [loading, setLoading] = useState(true);

  // Ano atual fica aberto por padrão
  const [anosAbertos, setAnosAbertos] = useState<number[]>([
    new Date().getFullYear(),
  ]);

  function toggleAno(ano: number) {
    setAnosAbertos((prev) =>
      prev.includes(ano)
        ? prev.filter((a) => a !== ano)
        : [...prev, ano]
    );
  }

  useEffect(() => {
    async function carregarRelatorios() {
      try {
        // Quando a API estiver pronta:
        // const { data } = await api.get("/relatorios");

        // Simulação
        const data: Relatorio[] = [
          // 2026
          { id: "1", ano: 2026, mes: "Janeiro" },
          { id: "2", ano: 2026, mes: "Fevereiro" },
          { id: "3", ano: 2026, mes: "Março" },
          { id: "4", ano: 2026, mes: "Abril" },
          { id: "5", ano: 2026, mes: "Maio" },
          { id: "6", ano: 2026, mes: "Junho" },

          // 2025
          { id: "7", ano: 2025, mes: "Janeiro" },
          { id: "8", ano: 2025, mes: "Fevereiro" },
          { id: "9", ano: 2025, mes: "Março" },
          { id: "10", ano: 2025, mes: "Abril" },
          { id: "11", ano: 2025, mes: "Maio" },
          { id: "12", ano: 2025, mes: "Junho" },
          { id: "13", ano: 2025, mes: "Julho" },
          { id: "14", ano: 2025, mes: "Agosto" },
          { id: "15", ano: 2025, mes: "Setembro" },
          { id: "16", ano: 2025, mes: "Outubro" },
          { id: "17", ano: 2025, mes: "Novembro" },
          { id: "18", ano: 2025, mes: "Dezembro" },
        ];

        const agrupado = data.reduce((acc, relatorio) => {
          const grupo = acc.find((item) => item.ano === relatorio.ano);

          if (grupo) {
            grupo.relatorios.push(relatorio);
          } else {
            acc.push({
              ano: relatorio.ano,
              relatorios: [relatorio],
            });
          }

          return acc;
        }, [] as RelatoriosPorAno[]);

        agrupado.sort((a, b) => b.ano - a.ano);

        setRelatorios(agrupado);

        // Abre automaticamente o ano mais recente caso o atual não exista
        if (
          agrupado.length > 0 &&
          !agrupado.some((g) => g.ano === new Date().getFullYear())
        ) {
          setAnosAbertos([agrupado[0].ano]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    carregarRelatorios();
  }, []);

  if (loading) {
    return (
      <p className="text-center mt-10 text-lg font-medium">
        Carregando...
      </p>
    );
  }

  return (
    <div className="w-full px-10 py-8">
      <h1 className="text-3xl font-bold text-center text-[#005CA9] mb-10">
        Relatório de Ocorrências
      </h1>

      {relatorios.map((grupo) => (
        <section key={grupo.ano} className="mb-8">

          <button
            onClick={() => toggleAno(grupo.ano)}
            className="w-full flex items-center gap-3 mb-5"
          >
            {anosAbertos.includes(grupo.ano) ? (
              <ChevronDown
                size={22}
                className="text-[#005CA9]"
              />
            ) : (
              <ChevronRight
                size={22}
                className="text-[#005CA9]"
              />
            )}

            <h2 className="text-2xl font-bold text-[#005CA9]">
              {grupo.ano}
            </h2>

            <div className="flex-1 h-px bg-gray-300" />
          </button>

          {anosAbertos.includes(grupo.ano) && (
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">

              {grupo.relatorios.map((relatorio) => (
                <button
                  key={relatorio.id}
                  className="flex flex-col items-center rounded-lg p-3 transition-all hover:bg-gray-100 hover:scale-105"
                  onClick={() => {
                    // Futuramente:
                    // router.push(`/relatorios/${relatorio.id}`)
                    // ou download do PDF
                  }}
                >
                  <Folder
                    size={70}
                    className="fill-[#005CA9] text-[#005CA9]"
                  />

                  <span className="mt-2 text-center font-semibold text-[#005CA9]">
                    {relatorio.mes}/{relatorio.ano}
                  </span>
                </button>
              ))}

            </div>
          )}
        </section>
      ))}
    </div>
  );
}