export type AdminUserStatus = "Ativo" | "Inativo";

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  role: string;
  department: string;
  status: AdminUserStatus;
  vehicles: string[];
}
