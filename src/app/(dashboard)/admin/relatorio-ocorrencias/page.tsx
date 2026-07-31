"use client";

import { AdminPageHeader } from "@/features/admin/components/molecules/AdminPageHeader";
import { Folder } from "lucide-react";
import { useRouter } from "next/navigation";

const reports = [
  { month: "Janeiro", route: "janeiro" },
  { month: "Fevereiro", route: "fevereiro" },
  { month: "Março", route: "marco" },
];

export default function RelatorioOcorrenciasPage() {
  const router = useRouter();

  return (
    <section className="w-full">
      <AdminPageHeader title="Relatório de Ocorrências" />

      <div className="flex justify-center mt-12">
        <div className="grid grid-cols-3 gap-12">
          {reports.map((report) => (
            <button
              key={report.route}
              onClick={() =>
                router.push(`/admin/relatorio-ocorrencias/${report.route}`)
              }
              className="flex flex-col items-center gap-2 transition-transform hover:scale-105 text-[#0056A6]"
            >
              <Folder
                size={72}
                className="fill-[#0056A6] text-[#0056A6]"
                strokeWidth={1.5}
              />

              <span className="font-semibold text-[#0056A6]">
                {report.month}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}