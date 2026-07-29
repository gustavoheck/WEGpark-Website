"use client";
import { AdminPageHeader } from "@/features/admin/components/molecules/AdminPageHeader";
import { AdminUserForm } from "@/features/admin/components/molecules/AdminUserForm";
import { adminUsers } from "@/features/admin/mocks/adminUsers";


import Link from "next/link";
import { ArrowLeft, Save, User } from "lucide-react";

export default function EditarUsuarioPage() {
  return (
    <section>
      <AdminPageHeader title={"editar usu\u00e1rio"} showBackButton />
      <AdminUserForm mode="edit" user={adminUsers[0]} />
    </section>
  );

  return (
    <main className="mx-auto max-w-5xl space-y-6 py-8">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#005CA9]">
            Editar Usuário
          </h1>

          <p className="text-gray-500">
            Atualize as informações do usuário.
          </p>
        </div>

        <Link
          href="/admin/usuarios"
          className="flex items-center gap-2 rounded-lg border px-5 py-3 hover:bg-gray-100"
        >
          <ArrowLeft size={20} />
          Voltar
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border bg-white shadow">

        <div className="flex items-center gap-4 border-b p-6">
          <div className="rounded-xl bg-[#005CA9] p-4">
            <User
              className="text-white"
              size={34}
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              João Silva
            </h2>

            <p className="text-gray-500">
              Editando cadastro do usuário
            </p>
          </div>
        </div>

        <form className="space-y-6 p-8">

          <div className="grid grid-cols-2 gap-6">

            <div>
              <label className="mb-2 block font-semibold">
                Nome
              </label>

              <input
                type="text"
                defaultValue="João Silva"
                className="w-full rounded-lg border p-3 outline-none focus:border-[#005CA9]"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold">
                E-mail
              </label>

              <input
                type="email"
                defaultValue="joao@weg.com.br"
                className="w-full rounded-lg border p-3 outline-none focus:border-[#005CA9]"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold">
                Tipo de Usuário
              </label>

              <select
                defaultValue="Colaborador"
                className="w-full rounded-lg border p-3"
              >
                <option>Colaborador</option>
                <option>Visitante</option>
                <option>Guarita</option>
                <option>RH</option>
                <option>Administrador</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block font-semibold">
                Status
              </label>

              <select
                defaultValue="Ativo"
                className="w-full rounded-lg border p-3"
              >
                <option>Ativo</option>
                <option>Inativo</option>
              </select>
            </div>

          </div>

          <div className="flex justify-end gap-4 border-t pt-6">

            <Link
              href="/admin/usuarios"
              className="rounded-lg border px-6 py-3 font-semibold hover:bg-gray-100"
            >
              Cancelar
            </Link>

            <button
              type="submit"
              className="flex items-center gap-2 rounded-lg bg-[#005CA9] px-6 py-3 font-semibold text-white hover:bg-[#004b88]"
            >
              <Save size={20} />
              Salvar Alterações
            </button>

          </div>

        </form>

      </div>

    </main>
  );
}