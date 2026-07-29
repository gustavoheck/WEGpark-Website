import {
    CreateUserRequestDTO,
    CreateUserResponseDTO,
    PaginatedUsersResponseDTO,
    UserListItem,
} from "../types/User";

const PAGE_SIZE = 15;

let mockUsers: UserListItem[] = [
    { id: "1", name: "João Silva", email: "joao.silva@weg.net", role: "COLABORADOR" },
    { id: "2", name: "Maria Souza", email: "maria.souza@exemplo.com", role: "VISITANTE" },
    { id: "3", name: "Carlos Pereira", email: "carlos.pereira@weg.net", role: "RH" },
    { id: "4", name: "Ana Costa", email: "ana.costa@weg.net", role: "GUARITA" },
    { id: "5", name: "Pedro Santos", email: "pedro.santos@weg.net", role: "COLABORADOR" },
    { id: "6", name: "Juliana Lima", email: "juliana.lima@exemplo.com", role: "VISITANTE" },
    { id: "7", name: "Rafael Alves", email: "rafael.alves@weg.net", role: "GUARITA" },
    { id: "8", name: "Fernanda Rocha", email: "fernanda.rocha@weg.net", role: "RH" },
    { id: "9", name: "Bruno Martins", email: "bruno.martins@weg.net", role: "COLABORADOR" },
    { id: "10", name: "Camila Ferreira", email: "camila.ferreira@exemplo.com", role: "VISITANTE" },
    { id: "11", name: "Diego Barbosa", email: "diego.barbosa@weg.net", role: "COLABORADOR" },
    { id: "12", name: "Larissa Gomes", email: "larissa.gomes@weg.net", role: "GUARITA" },
    { id: "13", name: "Thiago Cardoso", email: "thiago.cardoso@weg.net", role: "COLABORADOR" },
    { id: "14", name: "Patrícia Dias", email: "patricia.dias@weg.net", role: "RH" },
    { id: "15", name: "Lucas Ribeiro", email: "lucas.ribeiro@weg.net", role: "COLABORADOR" },
    { id: "16", name: "Beatriz Nunes", email: "beatriz.nunes@exemplo.com", role: "VISITANTE" },
    { id: "17", name: "Gustavo Teixeira", email: "gustavo.teixeira@weg.net", role: "GUARITA" },
    { id: "18", name: "Vanessa Moreira", email: "vanessa.moreira@weg.net", role: "COLABORADOR" },
    { id: "19", name: "Felipe Araújo", email: "felipe.araujo@weg.net", role: "RH" },
    { id: "20", name: "Isabela Correia", email: "isabela.correia@exemplo.com", role: "VISITANTE" },
    { id: "21", name: "Rodrigo Batista", email: "rodrigo.batista@weg.net", role: "COLABORADOR" },
    { id: "22", name: "Amanda Freitas", email: "amanda.freitas@weg.net", role: "GUARITA" },
];

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
    };

    mockUsers = [newUser, ...mockUsers]; 

    return {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
        createdAt: new Date().toISOString(),
    };
}

export async function listUsers(page: number): Promise<PaginatedUsersResponseDTO> {
    await delay(500);

    const startIndex = (page - 1) * PAGE_SIZE;
    const paginatedUsers = mockUsers.slice(startIndex, startIndex + PAGE_SIZE);

    return {
        users: paginatedUsers,
        currentPage: page,
        totalPages: Math.ceil(mockUsers.length / PAGE_SIZE),
        totalItems: mockUsers.length,
    };
}

export async function deleteUser(id: string): Promise<void> {
    await delay(500);
    mockUsers = mockUsers.filter((existingUser) => existingUser.id !== id);
}