"use client";
import { AdminPageHeader } from "@/features/admin/components/molecules/AdminPageHeader";
import { AdminUserForm } from "@/features/admin/components/molecules/AdminUserForm";


import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

export default function CriarUsuarioPage() {
  return (
    <section>
      <AdminPageHeader title={"cadastrar usuario"} showBackButton />
      <AdminUserForm mode="create" />
    </section>
  );

  return (
    <main className="mx-auto max-w-5xl p-6">

      <div className="mb-6 flex items-center justify-between">

        <div>

          <Link
            href="/admin/usuarios"
            className="mb-3 inline-flex items-center gap-2 text-blue-700 hover:underline"
          >
            <ArrowLeft size={18} />
            Voltar
          </Link>

          <h1 className="text-3xl font-bold">
            Cadastrar Usuário
          </h1>

          <p className="text-gray-500">
            Preencha os dados abaixo.
          </p>

        </div>

      </div>

      <div className="rounded-xl border bg-white p-8 shadow-sm">

        <div className="grid grid-cols-2 gap-6">

          <div>
            <label className="mb-2 block font-medium">
              Nome
            </label>

            <input
              type="text"
              className="w-full rounded-lg border p-3 outline-none focus:border-blue-600"
              placeholder="Nome completo"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Email
            </label>

            <input
              type="email"
              className="w-full rounded-lg border p-3 outline-none focus:border-blue-600"
              placeholder="email@empresa.com"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              CPF
            </label>

            <input
              type="text"
              className="w-full rounded-lg border p-3 outline-none focus:border-blue-600"
              placeholder="000.000.000-00"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Telefone
            </label>

            <input
              type="text"
              className="w-full rounded-lg border p-3 outline-none focus:border-blue-600"
              placeholder="(47) 99999-9999"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Tipo de Usuário
            </label>

            <select className="w-full rounded-lg border p-3">

              <option>Colaborador</option>

              <option>Administrador</option>

              <option>RH</option>

              <option>Guarita</option>

              <option>Visitante</option>

            </select>

          </div>

          <div>
            <label className="mb-2 block font-medium">
              Status
            </label>

            <select className="w-full rounded-lg border p-3">

              <option>Ativo</option>

              <option>Inativo</option>

            </select>

          </div>

          <div>
            <label className="mb-2 block font-medium">
              Senha
            </label>

            <input
              type="password"
              className="w-full rounded-lg border p-3 outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Confirmar Senha
            </label>

            <input
              type="password"
              className="w-full rounded-lg border p-3 outline-none focus:border-blue-600"
            />
          </div>

        </div>

        <div className="mt-8 flex justify-end gap-4">

          <Link
            href="/admin/usuarios"
            className="rounded-lg border px-6 py-3 hover:bg-gray-100"
          >
            Cancelar
          </Link>

          <button
            className="flex items-center gap-2 rounded-lg bg-blue-700 px-6 py-3 text-white hover:bg-blue-800"
          >
            <Save size={18} />
            Salvar Usuário
          </button>

        </div>

      </div>

    </main>
  );
}