"use client"

import { useState } from "react";
import {
  User,
  Eye,
  Pencil,
  Ban,
  History,
  ChevronDown,
  ChevronUp,
  Plus,
} from "lucide-react";
import Link from "next/link";

interface Usuario {
  id: number;
  nome: string;
  email: string;
  tipo: string;
  status: "Ativo" | "Inativo";
}

const usuarios: Usuario[] = [
  {
    id: 1,
    nome: "João Silva",
    email: "joao@weg.com.br",
    tipo: "Colaborador",
    status: "Ativo",
  },
  {
    id: 2,
    nome: "Maria Souza",
    email: "maria@weg.com.br",
    tipo: "RH",
    status: "Ativo",
  },
  {
    id: 3,
    nome: "Pedro Santos",
    email: "pedro@gmail.com",
    tipo: "Visitante",
    status: "Inativo",
  },
];

export default function UsuariosPage() {
  const [aberto, setAberto] = useState<number | null>(null);

  function toggleCard(id: number) {
    if (aberto === id) {
      setAberto(null);
      return;
    }

    setAberto(id);
  }

  return (
    <main className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Gestão de Usuários
          </h1>

          <p className="text-gray-500">
            Gerencie todos os usuários cadastrados no sistema.
          </p>
        </div>
      </div>

      {/* Pesquisa + botão */}
      <div className="flex items-center justify-between">
        <input
          type="text"
          placeholder="Pesquisar usuário..."
          className="w-80 rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-600"
        />

        <Link
          href="/admin/usuarios/criar"
          className="flex items-center gap-2 rounded-lg bg-blue-700 px-5 py-3 text-white transition hover:bg-blue-800"
        >
          <Plus size={20} />
          Cadastrar Usuário
        </Link>
      </div>

      {/* Lista de usuários */}
      <div className="space-y-5">
        {usuarios.map((usuario) => (
          <div
            key={usuario.id}
            className="overflow-hidden rounded-xl border bg-white shadow-sm"
          >
            {/* Cabeçalho do card */}
            <div className="flex items-center justify-between p-5">
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-blue-700 p-4">
                  <User size={30} className="text-white" />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    {usuario.nome}
                  </h2>

                  <p className="text-gray-500">
                    {usuario.email}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm text-gray-500">Tipo:</p>

                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-700">
                  {usuario.tipo}
                </span>

                <div className="mt-2">
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${
                      usuario.status === "Ativo"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {usuario.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Ações expandidas */}
            {aberto === usuario.id && (
              <>
                <hr />

                <div className="grid grid-cols-2 gap-4 p-4">
                  <Link
                    href={`/admin/usuarios/${usuario.id}`}
                    className="flex items-center justify-center gap-2 rounded-lg border p-4 transition hover:bg-gray-100"
                  >
                    <Eye size={20} />
                    Visualizar
                  </Link>

                  <Link
                    href={`/admin/usuarios/editar/${usuario.id}`}
                    className="flex items-center justify-center gap-2 rounded-lg border p-4 transition hover:bg-gray-100"
                  >
                    <Pencil size={20} />
                    Editar
                  </Link>

                  <Link
                    href={`/admin/historico/${usuario.id}`}
                    className="flex items-center justify-center gap-2 rounded-lg border p-4 transition hover:bg-gray-100"
                  >
                    <History size={20} />
                    Histórico
                  </Link>

                  <button className="flex items-center justify-center gap-2 rounded-lg bg-red-50 p-4 text-red-600 transition hover:bg-red-100">
                    <Ban size={20} />
                    Desativar
                  </button>
                </div>
              </>
            )}

            {/* Botão expandir */}
            <button
              onClick={() => toggleCard(usuario.id)}
              className="flex w-full items-center justify-center gap-2 border-t p-4 text-lg font-semibold text-blue-700 transition hover:bg-gray-50"
            >
              {aberto === usuario.id ? (
                <>
                  Ver Menos
                  <ChevronUp size={20} />
                </>
              ) : (
                <>
                  Ver Mais
                  <ChevronDown size={20} />
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}