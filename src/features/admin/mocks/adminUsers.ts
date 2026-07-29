import { AdminUser } from "@/features/admin/types/AdminUser";

export const adminUsers: AdminUser[] = [
  {
    id: 1,
    name: "João Silva",
    email: "joao@weg.com.br",
    cpf: "000.000.000-00",
    phone: "(47) 99999-9999",
    role: "Colaborador",
    department: "Produção",
    status: "Ativo",
    vehicles: ["ABC-1234", "XYZ-9876"],
  },
  {
    id: 2,
    name: "Maria Souza",
    email: "maria@weg.com.br",
    cpf: "111.111.111-11",
    phone: "(47) 98888-8888",
    role: "RH",
    department: "Recursos Humanos",
    status: "Ativo",
    vehicles: ["QWE-9876"],
  },
  {
    id: 3,
    name: "Pedro Santos",
    email: "pedro@gmail.com",
    cpf: "222.222.222-22",
    phone: "(47) 97777-7777",
    role: "Visitante",
    department: "Não informado",
    status: "Inativo",
    vehicles: [],
  },
];
