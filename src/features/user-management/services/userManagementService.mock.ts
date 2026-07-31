import { GetServiceProps } from "@/shared/types/GetServiceProps";

import {
    CreateUserRequestDTO,
    CreateUserResponseDTO,
    PaginatedUsersResponseDTO,
    UserListItem,
    UserDetailDTO,
    UpdateUserRequestDTO
} from "../types/User";

const PAGE_SIZE = 15;

// Apenas os três possuem badgeNumber pois foi utilizado para teste nos filtros

let mockUsers: UserListItem[] = [
    { id: "1", name: "João Silva", email: "joao.silva@weg.net", role: "EMPLOYEE", active: true, badgeNumber: "0001"},
    { id: "2", name: "Maria Souza", email: "maria.souza@exemplo.com", role: "VISITOR", active: true },
    { id: "3", name: "Carlos Pereira", email: "carlos.pereira@weg.net", role: "HR", active: true, badgeNumber: "0002" },
    { id: "4", name: "Ana Costa", email: "ana.costa@weg.net", role: "GUARD", active: true },
    { id: "5", name: "Pedro Santos", email: "pedro.santos@weg.net", role: "EMPLOYEE", active: true, badgeNumber: "0003"},
    { id: "6", name: "Juliana Lima", email: "juliana.lima@exemplo.com", role: "VISITOR", active: true },
    { id: "7", name: "Rafael Alves", email: "rafael.alves@weg.net", role: "GUARD", active: true },
    { id: "8", name: "Fernanda Rocha", email: "fernanda.rocha@weg.net", role: "HR", active: true },
    { id: "9", name: "Bruno Martins", email: "bruno.martins@weg.net", role: "EMPLOYEE", active: true },
    { id: "10", name: "Camila Ferreira", email: "camila.ferreira@exemplo.com", role: "VISITOR", active: true },
    { id: "11", name: "Diego Barbosa", email: "diego.barbosa@weg.net", role: "EMPLOYEE", active: true },
    { id: "12", name: "Larissa Gomes", email: "larissa.gomes@weg.net", role: "GUARD", active: true },
    { id: "13", name: "Thiago Cardoso", email: "thiago.cardoso@weg.net", role: "EMPLOYEE", active: true },
    { id: "14", name: "Patrícia Dias", email: "patricia.dias@weg.net", role: "HR", active: true },
    { id: "15", name: "Lucas Ribeiro", email: "lucas.ribeiro@weg.net", role: "EMPLOYEE", active: true },
    { id: "16", name: "Beatriz Nunes", email: "beatriz.nunes@exemplo.com", role: "VISITOR", active: true },
    { id: "17", name: "Gustavo Teixeira", email: "gustavo.teixeira@weg.net", role: "GUARD", active: true },
    { id: "18", name: "Vanessa Moreira", email: "vanessa.moreira@weg.net", role: "EMPLOYEE", active: true },
    { id: "19", name: "Felipe Araújo", email: "felipe.araujo@weg.net", role: "HR", active: true },
    { id: "20", name: "Isabela Correia", email: "isabela.correia@exemplo.com", role: "VISITOR", active: true },
    { id: "21", name: "Rodrigo Batista", email: "rodrigo.batista@weg.net", role: "EMPLOYEE", active: true },
    { id: "22", name: "Amanda Freitas", email: "amanda.freitas@weg.net", role: "GUARD", active: true },
];

const mockUserDetails: Record<string, Partial<UserDetailDTO>> = {
    "1": { badgeNumber: "000001", department: "TI" },
    "2": { companyName: "Empresa XYZ", cpf: "123.456.789-00" },
    "3": { badgeNumber: "000003" },
    "4": { badgeNumber: "000004", department: "Portaria", chefe: "Carlos Pereira" },
};

function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function createUser(payload: CreateUserRequestDTO): Promise<CreateUserResponseDTO> {
    await delay(600);

    const alreadyExists = mockUsers.some(
        (existingUser) => existingUser.email === payload.email && existingUser.role === payload.role,
    );

    if (alreadyExists) {
        throw new Error("Já existe um usuário com esse e-mail e essa role");
    }

    const newUser: UserListItem = {
        id: String(Date.now()), 
        name: payload.name,
        email: payload.email,
        role: payload.role,
        active: payload.active
    };

    mockUsers = [newUser, ...mockUsers]; 

    return {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
        createdAt: new Date().toISOString(),
    };
}

export async function getUserById(id: string): Promise<UserDetailDTO> {
    await delay(500);

    const user = mockUsers.find((existingUser) => existingUser.id === id);
    if (!user) throw new Error("Usuário não encontrado");

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: "(00) 00000-0000",
        ...mockUserDetails[id],
    } as UserDetailDTO;
}

export async function updateUser(
    id: string,
    payload: UpdateUserRequestDTO
): Promise<UserDetailDTO> {
    await delay(500);

    const index = mockUsers.findIndex(
        (existingUser) => existingUser.id === id
    );

    if (index === -1) {
        throw new Error("Usuário não encontrado");
    }

    const currentUser = mockUsers[index];

    const alreadyExists = mockUsers.some(
        (existingUser) =>
            existingUser.id !== id &&
            existingUser.email === payload.email &&
            existingUser.role === payload.role
    );

    if (alreadyExists) {
        throw new Error("Já existe um usuário com esse e-mail e essa role");
    }

    mockUsers[index] = {
        ...currentUser,
        name: payload.name,
        email: payload.email,
        role: payload.role,
    };

    return {
        ...mockUsers[index],
        ...payload,
    } as UserDetailDTO;
}

export async function listUsers(
    page: number,
    filters: GetServiceProps = {},
): Promise<PaginatedUsersResponseDTO> {
    await delay(500);

    const { category, value } = filters;
    const normalizedValue = value?.trim().toLocaleLowerCase("pt-BR") ?? "";
    const filteredUsers = category && normalizedValue
        ? mockUsers.filter((user) => {
            const fieldValue = user[category as keyof UserListItem];
            return typeof fieldValue === "string"
                && fieldValue.toLocaleLowerCase("pt-BR").includes(normalizedValue);
        })
        : mockUsers;
    const startIndex = (page - 1) * PAGE_SIZE;
    const paginatedUsers = filteredUsers.slice(startIndex, startIndex + PAGE_SIZE);

    return {
        users: paginatedUsers,
        currentPage: page,
        totalPages: Math.ceil(filteredUsers.length / PAGE_SIZE),
        totalItems: filteredUsers.length,
    };
}

export async function deactivateUser(id: string): Promise<void> {
    await delay(500);
    const index = mockUsers.findIndex((existingUser) => existingUser.id === id);
    if (index === -1) throw new Error("Usuário não encontrado");
    mockUsers[index] = { ...mockUsers[index], active: false };
}

export async function activateUser(id: string): Promise<void> {
    await delay(500);
    const index = mockUsers.findIndex((existingUser) => existingUser.id === id);
    if (index === -1) throw new Error("Usuário não encontrado");
    mockUsers[index] = { ...mockUsers[index], active: true };
}