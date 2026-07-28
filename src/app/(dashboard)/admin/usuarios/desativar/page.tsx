"use client";

import Link from "next/link";
import { ArrowLeft, Ban } from "lucide-react";

export default function DesativarUsuarioPage() {
  return (
    <main className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/usuarios"
          className="rounded-lg border p-2 hover:bg-gray-100"
        >
          <ArrowLeft />
        </Link>

        <div>
          <h1 className="text-3xl font-bold text-red-600">
            Desativar Usuário
          </h1>

          <p className="text-gray-500">
            Esta ação impedirá o usuário de acessar o sistema.
          </p>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-8 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold">
          Confirmar desativação
        </h2>

        <div className="space-y-4">
          <p>
            <strong>Nome:</strong> João Silva
          </p>

          <p>
            <strong>E-mail:</strong> joao@weg.com.br
          </p>

          <p>
            <strong>Tipo:</strong> Colaborador
          </p>

          <p className="rounded-lg bg-red-50 p-4 text-red-600">
            Após confirmar, o usuário ficará com o status <strong>Inativo</strong> e não poderá acessar o sistema até ser reativado.
          </p>
        </div>

        <div className="mt-8 flex justify-end gap-4">
          <Link
            href="/admin/usuarios"
            className="rounded-lg border px-6 py-3 hover:bg-gray-100"
          >
            Cancelar
          </Link>

          <button
            className="flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-white hover:bg-red-700"
          >
            <Ban size={20} />
            Confirmar Desativação
          </button>
        </div>
      </div>
    </main>
  );
}