"use client";
import { AdminPageHeader } from "@/features/admin/components/molecules/AdminPageHeader";
import { AdminUserDetails } from "@/features/admin/components/organisms/AdminUserDetails";
import { adminUsers } from "@/features/admin/mocks/adminUsers";


import Link from "next/link";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  BadgeCheck,
  Building,
  Car,
  Pencil,
  Ban,
  History,
} from "lucide-react";

export default function UsuarioDetalhesPage() {
  return (
    <section>
      <AdminPageHeader title={"detalhes do usuário"} showBackButton />
      <AdminUserDetails user={adminUsers[0]} />
    </section>
  );

  const usuario = {
    id: 1,
    nome: "João Silva",
    email: "joao@weg.com.br",
    telefone: "(47) 99999-9999",
    cpf: "000.000.000-00",
    tipo: "Colaborador",
    setor: "Produção",
    status: "Ativo",
    veiculos: [
      "ABC-1234",
      "XYZ-9876",
    ],
  };

  return (
    <main className="mx-auto max-w-5xl p-6">

      <Link
        href="/admin/usuarios"
        className="mb-6 inline-flex items-center gap-2 text-blue-700 hover:underline"
      >
        <ArrowLeft size={18} />
        Voltar
      </Link>

      <div className="rounded-xl border bg-white shadow-sm">

        <div className="flex flex-col items-center border-b p-8">

          <div className="rounded-full bg-blue-700 p-6">

            <User
              size={50}
              className="text-white"
            />

          </div>

          <h1 className="mt-4 text-3xl font-bold">
            {usuario.nome}
          </h1>

          <span className="mt-2 rounded-full bg-green-100 px-4 py-1 text-green-700 font-semibold">
            {usuario.status}
          </span>

        </div>

        <div className="grid grid-cols-2 gap-6 p-8">

          <div className="flex items-center gap-3">

            <Mail className="text-blue-700" />

            <div>

              <p className="text-gray-500">
                Email
              </p>

              <strong>{usuario.email}</strong>

            </div>

          </div>

          <div className="flex items-center gap-3">

            <Phone className="text-blue-700" />

            <div>

              <p className="text-gray-500">
                Telefone
              </p>

              <strong>{usuario.telefone}</strong>

            </div>

          </div>

          <div className="flex items-center gap-3">

            <BadgeCheck className="text-blue-700" />

            <div>

              <p className="text-gray-500">
                CPF
              </p>

              <strong>{usuario.cpf}</strong>

            </div>

          </div>

          <div className="flex items-center gap-3">

            <Building className="text-blue-700" />

            <div>

              <p className="text-gray-500">
                Tipo
              </p>

              <strong>{usuario.tipo}</strong>

            </div>

          </div>

          <div className="flex items-center gap-3">

            <Building className="text-blue-700" />

            <div>

              <p className="text-gray-500">
                Setor
              </p>

              <strong>{usuario.setor}</strong>

            </div>

          </div>

        </div>

        <div className="border-t p-8">

          <h2 className="mb-4 text-xl font-semibold">
            Veículos
          </h2>

          <div className="flex flex-wrap gap-3">

            {usuario.veiculos.map((placa) => (

              <div
                key={placa}
                className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2"
              >

                <Car size={18} />

                {placa}

              </div>

            ))}

          </div>

        </div>

        <div className="grid grid-cols-2 gap-4 border-t p-8">

          <Link
            href={`/admin/usuarios/${usuario.id}/editar`}
            className="flex items-center justify-center gap-2 rounded-lg bg-blue-700 py-3 text-white hover:bg-blue-800"
          >
            <Pencil size={18} />
            Editar Usuário
          </Link>

          <button
            className="flex items-center justify-center gap-2 rounded-lg bg-red-600 py-3 text-white hover:bg-red-700"
          >
            <Ban size={18} />
            Desativar
          </button>

          <button
            className="col-span-2 flex items-center justify-center gap-2 rounded-lg border py-3 hover:bg-gray-100"
          >
            <History size={18} />
            Ver Histórico de Ocorrências
          </button>

        </div>

      </div>

    </main>
  );
}