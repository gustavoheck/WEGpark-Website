// features/auth/services/login-service.mock.ts
import {
  CheckEmailRequestDTO,
  CheckEmailResponseDTO,
  LoginRequestDTO,
  LoginResponseDTO,
  UserRole,
} from '../types/Login';

// "Banco de dados" falso, só em memória, pra simular os 3 cenários do RF00:
// 1) e-mail com role única (pula popup)
// 2) e-mail com múltiplas roles (mostra popup)
// 3) e-mail que não existe (mensagem de erro genérica)
const MOCK_ACCOUNTS: Record<string, { roles: UserRole[]; password: string }> = {
  'visitante@exemplo.com': { roles: ['VISITANTE'], password: '12345678' },
  'colaborador@weg.net': { roles: ['COLABORADOR'], password: '12345678' },
  // Esse e-mail tem duas contas distintas — é o que deve disparar o SelectRoleDialog.
  'multi@weg.net': { roles: ['COLABORADOR', 'RH'], password: '12345678' },
};

// Simula latência de rede real — sem isso, os estados de loading (isPending)
// passam rápido demais pra você conseguir ver o botão "Verificando...", "Entrando..." etc.
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function checkEmailAccounts(payload: CheckEmailRequestDTO): Promise<CheckEmailResponseDTO> {
  await delay(600);

  const account = MOCK_ACCOUNTS[payload.email.toLowerCase()];

  // Lança erro proposital pra simular "e-mail não encontrado" —
  // é isso que o CheckEmailForm vai capturar em isError.
  if (!account) {
    throw new Error('E-mail não encontrado');
  }

  return { roles: account.roles };
}

export async function loginUser(payload: LoginRequestDTO): Promise<LoginResponseDTO> {
  await delay(600);

  const account = MOCK_ACCOUNTS[payload.email.toLowerCase()];

  // Mesma mensagem genérica pros dois casos (e-mail some do mock OU senha
  // errada) — reforçando a regra do RF00 de não vazar qual dos dois errou.
  if (!account || account.password !== payload.password) {
    throw new Error('E-mail ou senha inválidos');
  }

  return {
    token: 'mock-jwt-token-123',
    role: payload.role,
  };
}