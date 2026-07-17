# Manual de Arquitetura, Padronização de Front-end e Processos de Desenvolvimento

Este documento consolida as diretrizes técnicas, arquiteturais e de processos adotadas no desenvolvimento do ecossistema front-end. Todos os desenvolvedores devem seguir estritamente estas definições para garantir a consistência, manutenibilidade e escalabilidade do código, além de assegurar um alinhamento perfeito com o nosso backend.

---

## Stack Tecnológica e Motivações

* **Framework:** Next.js (App Router) — Padrão de mercado e requisito do projeto.
* **Linguagem:** TypeScript — Maior controle de fluxo de dados, tipagem estática e segurança contra erros de runtime.
* **Arquitetura:** Feature-Driven Architecture (FDA) — Facilita o desenvolvimento em paralelo e isolamento de escopo por funcionalidade.
* **Validação & Formulários:** React Hook Form + Zod — Gestão eficiente de estados de formulário com validação rígida através de schemas.
* **Comunicação:** Axios + TanStack Query (React Query) — Axios para controle simplificado de instâncias e interceptadores JWT; TanStack Query para gerenciamento e cache do estado do servidor.
* **Linter & Formatter:** ESLint + Prettier — Padronização automática de escrita e formatação do código.
* **UI & Estilização:** Tailwind CSS + Shadcn/ui — Estilização utilitária de alta performance acoplada a componentes acessíveis e totalmente customizáveis.

> ℹ️ **Nota de Engenharia:** Não adotamos gerenciadores de estado global complexos (como Zustand ou Redux). O TanStack Query lida nativamente com o cache das entidades vindas do backend (Server State), enquanto a Context API nativa do React supre eventuais necessidades de estado de interface (UI State).

---

## Regras de Escrita e Convenção de Nomenclatura

Para manter a consistência do repositório, aplicamos convenções rígidas de nomenclatura para cada tipo de arquivo:

| Tipo de Recurso | Padrão de Escrita | Exemplo Prático |
| --- | --- | --- |
| **Componentes React** | `PascalCase.tsx` | `UserTable.tsx`, `SidebarMenu.tsx` |
| **Diretórios de Rotas (`app/`)** | `kebab-case` (Singular) | `painel-controle`, `cadastro-usuario` |
| **Custom Hooks** | `camelCase.ts` (Prefixo *use*) | `useCreateUser.ts`, `useAuth.ts` |
| **Funções Auxiliares (Utils)** | `camelCase.ts` | `formatBrlCurrency.ts`, `validateCpf.ts` |
| **Interfaces e Types (TS)** | `PascalCase.ts` | `UserResponseDTO.ts`, `PaymentStatus.ts` |

---

## 1. Arquitetura do Sistema

O projeto adota a **Feature-Driven Architecture (FDA)** no nível macro, permitindo que cada módulo do front-end replique logicamente o comportamento dos módulos isolados do backend.

```text
┌──────────────────────────────────────────────────────────┐
│         FEATURE-DRIVEN ARCHITECTURE (Macro)              │
│                                                          │
│   ┌──────────────┐      Shared/Utils     ┌───────────┐   │
│   │  Feature A   │ <───────────────────> │ Feature B │   │
│   └──────────────┘                       └───────────┘   │
│          │                                     │         │
│          ▼ (Micro)                             ▼ (Micro) │
│     Hooks/Services                        Hooks/Services │
└──────────────────────────────────────────────────────────┘

```

### 1.1. Macro-Arquitetura: FDA (Feature-Driven Architecture)

O código relacionado à regra de negócio é fatiado em domínios lógicos.

* **Isolamento:** Cada funcionalidade do sistema deve conter seus próprios componentes, types, hooks e serviços autossuficientes.
* **Reuso:** Elementos genéricos não pertencentes a um domínio específico devem obrigatoriamente residir na camada compartilhada (`shared/`).

### 1.2. Micro-Arquitetura: Smart & Presentational Components

Dentro de cada feature, dividimos a responsabilidade entre:

* **Componentes de Orquestração (Smart):** Componentes de página ou containers que lidam com a chamada de hooks do TanStack Query, mutations e manipulação direta de estados.
* **Componentes de Apresentação (Presentational/Dumb):** Componentes puramente visuais que recebem dados via props e disparam eventos recebidos por funções de callback.

---

## 2. Estrutura de Pastas e Encapsulamento

A estrutura de diretórios do projeto foi desenhada para garantir que as modificações de escopo fiquem contidas na feature correspondente.

### 2.1. Árvore de Diretórios Padrão

```text
src/
├── app/                           # Camada de Roteamento (App Router)
│   ├── (auth)/                    # Grupo de rotas públicas de autenticação
│   ├── (painel)/                  # Grupo de rotas protegidas (Dashboard)
│   ├── layout.tsx                 # Layout global
│   └── page.tsx                   # Página de entrada da aplicação
│
├── features/                      # Camada de Funcionalidades (Módulos de Negócio)
│   └── gestao-usuario/            # Exemplo de Feature
│       ├── components/            # Componentes visuais exclusivos desta feature
│       ├── hooks/                 # Custom hooks (Queries e Mutations)
│       ├── services/              # Chamadas HTTP específicas da feature (Axios)
│       └── types/                 # Tipagens e DTOs mapeados do backend
│
└── shared/                        # Camada de Infraestrutura/Global (Cross-cutting)
    ├── components/                # Componentes globais (Shadcn UI, botões, modais)
    ├── lib/                       # Instâncias e configurações globais (Ex: api.ts)
    ├── utils/                     # Funções utilitárias puras (Formatadores de texto)
    └── hooks/                     # Custom hooks utilitários globais

```

### 2.2. Diretrizes de Visibilidade e Responsabilidade

> 🚨 **REGRA DE OURO (Isolamento de Código):** É terminantemente proibido importar qualquer arquivo da pasta interna de uma feature (ex: `features/gestao-usuario/components/UserForm.tsx`) de dentro de outra feature (ex: `features/faturamento/`).
> Se duas features precisam utilizar o mesmo componente, hook ou utilitário, esse recurso deve ser promovido para a pasta `shared/`.

* **Pasta `app/`:** Contém apenas as definitions de páginas e layouts do Next.js. Ela atua como uma ponte de rotas e deve importar os componentes estruturais diretamente de suas respectivas `features/`.
* **Pasta `features/`:** Concentra toda a inteligência e regra de negócio do produto. Cada pasta aqui dentro representa um módulo de domínio.
* **Pasta `shared/`:** Agrega toda a biblioteca visual base (Shadcn UI) e utilitários agnósticos de regra de negócio.

---

## 3. Sincronia com o Backend (Contratos e DTOs)

Para manter o frontend em perfeita sincronia com o backend Java (Spring Boot) e evitar quebras de contrato inesperadas em tempo de execução, aplicamos as seguintes diretrizes de tipagem:

### 3.1. Tipagem Estrita (Proibição do `any`)

O uso de `any` ou `unknown` (sem o devido typecast) é estritamente proibido. Para cada `ResponseDTO` ou `RequestDTO` gerado pelo Spring Boot, deve existir uma interface TypeScript equivalente dentro do diretório `types/` de sua respectiva feature.

```typescript
// features/gestao-usuario/types/user-response.ts
export interface UserResponseDTO {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'OPERADOR' | 'ESPECTADOR';
  createdAt: string;
}

```

### 3.2. Importações Absolutas (Path Aliases)

Nunca utilize caminhos relativos complexos. Configure e utilize o prefixo `@/` para apontar para o diretório `src/`.

```typescript
// ❌ PROIBIDO
import { Button } from "../../../../shared/components/ui/button";

// ✅ CORRETO
import { Button } from "@/shared/components/ui/button";

```

---

## 4. Integração de API e Gerenciamento de Estado

Utilizamos o Axios para a infraestrutura de rede e o TanStack Query para gerenciar a reatividade do estado vindo do servidor.

### 4.1. Instância do Axios Compartilhada

A chamada de APIs deve consumir uma instância do Axios configurada no diretório `shared/lib/` para garantir a injeção automática de tokens e interceptação de erros HTTP comuns (ex: 401 Unauthorized).

```typescript
// shared/lib/api.ts
import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Exemplo de interceptador para tratar JWT expirado
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Lógica de logout ou refresh token
    }
    return Promise.reject(error);
  }
);

```

### 4.2. Padrão de Queries e Mutations

Toda manipulação de dados externos deve passar pelo TanStack Query, encapsulado dentro de hooks específicos para manter os componentes declarativos e fáceis de ler.

```typescript
// features/gestao-usuario/hooks/use-get-users.ts
import { useQuery } from '@tanstack/react-query';
import { api } from '@/shared/lib/api';
import { UserResponseDTO } from '../types/user-response';

async function fetchUsers(): Promise<UserResponseDTO[]> {
  const { data } = await api.get<UserResponseDTO[]>('/users');
  return data;
}

export function useGetUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: 1000 * 60 * 5, // Cache de 5 minutos
  });
}

```

---

## 5. Gerenciamento de Configurações e Variáveis de Ambiente

Para evitar vazamento de credenciais e inconsistência de endereços entre ambientes locais, de homologação e produção, utilizamos a injeção de variáveis via arquivo `.env.local`.

### 5.1. Diretrizes para o Uso do `.env.local`

* **Exclusão do Git (`.gitignore`):** O arquivo `.env.local` nunca deve ser commitado para o repositório central. Ele deve estar listado no `.gitignore` global.
* **O Arquivo de Exemplo (`.env.example`):** Deve listar todas as chaves necessárias sem expor valores sensíveis.
* **Prefixo Exclusivo Next.js:** Variáveis que precisam ser lidas pelo navegador (client-side) devem, obrigatoriamente, ser precedidas pelo prefixo `NEXT_PUBLIC_`.

```bash
# .env.example
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
NEXT_PUBLIC_APP_ENV=development

```

---

## 6. Padronização Visual e Componentização (Shadcn/ui + Tailwind)

A biblioteca shadcn/ui difere de frameworks de componentes tradicionais pois os arquivos visuais são injetados diretamente na sua base de código (`src/shared/components/ui/`), garantindo customização total.

### 6.1. Regras de Estilização

* **Não duplique componentes básicos:** Use as primitivas do Shadcn UI contidas em `shared/components/ui/` (ex: `button.tsx`, `dialog.tsx`).
* **Responsividade móvel nativa:** Use os prefixos do Tailwind (ex: `md:`, `lg:`) para construir telas responsivas mobile-first.
* **Utilização de Classes do Tailwind:** Mantenha as classes focadas onde são necessárias, evitando Inline Styles (`style={{ ... }}`) que quebram a consistência visual.

---

## 7. Diretrizes de Codificação e Boas Práticas (Como Codar)

Esta seção padroniza a escrita de código para evitar que cada desenvolvedor siga um estilo pessoal diferente, mantendo a base de código previsível e homogênea.

### 7.1. Declaração de Componentes e Funções

* **Componentes React:** Devem ser declarados usando funções nomeadas tradicionais (`export function`), facilitando o rastreamento em ferramentas de debug e auto-import do VS Code.
* **Funções Internas e Callbacks:** Podem utilizar arrow functions (`const handleSort = () => {}`) dentro dos componentes.

```typescript
// ❌ EVITAR (Arrow function anônima/atribuída para componentes)
export const UserCard = ({ name }: UserCardProps) => { ... }

// ✅ SEGUIR (Função nomeada limpa com parênteses obrigatórios no return)
interface UserCardProps {
  name: string;
}

export function UserCard({ name }: UserCardProps) {
  return (
    <div>{name}</div>
  );
}

```

### 7.2. Desestruturação de Propriedades (Props)

Sempre desestruture as props do componente diretamente na assinatura do parâmetro para manter a leitura limpa e de fácil manutenção.

```typescript
// ❌ EVITAR (Acessar através do objeto "props" e sem parênteses no return)
export function UserStatus(props: UserStatusProps) {
  return <span>{props.isActive ? 'Ativo' : 'Inativo'}</span>;
}

// ✅ SEGUIR (Desestruturação direta e parênteses obrigatórios no return)
export function UserStatus({ isActive, role }: UserStatusProps) {
  return (
    <span>{isActive ? `Ativo (${role})` : 'Inativo'}</span>
  );
}

```

### 7.3. Renderização Condicional Segura

Evite o uso do operador `&&` ao lidar com números ou arrays em verificações de renderização, pois valores como `0` serão renderizados acidentalmente na tela pelo React. Sempre use ternários ou coerção booleana dupla (`!!`).

```typescript
// ❌ EVITAR (Se list.length for 0, o número "0" será impresso na tela e sem parênteses)
return <div>{list.length && <ListComponent data={list}/>}</div>;

// ✅ SEGUIR (Uso de ternários encapsulados em parênteses obrigatórios no return)
return (
  <div>{list.length > 0 ? <ListComponent data={list}/> : null}</div>
);

```

### 7.4. Tratamento de Valores Nulos ou Omissos (Nullish Coalescing)

Use o operador de coalescência nula (`??`) em vez do operador lógico OU (`||`) quando quiser definir valores padrão para variáveis que podem vir falsas legítimas (como `0`, `""` ou `false`).

```typescript
// ❌ EVITAR (Se a contagem for 0, ele assumirá "Não informado" incorretamente)
const countLabel = results.count || "Não informado"; 

// ✅ SEGUIR (Avalia apenas null e undefined de forma segura)
const countLabel = results.count ?? "Não informado";

```

### 7.5. Estilização Condicional com `cn` (Tailwind + Shadcn)

Para qualquer componente que exija classes do Tailwind aplicadas condicionalmente ou que precise expor uma propriedade `className` customizável externa, utilize obrigatoriamente a função utilitária `cn`.

```typescript
// ❌ EVITAR (Interpolações de strings manuais propensas a conflitos de classes)
export function Card({ isActive, className }: CardProps) {
  return (
    <div className={`p-4 rounded-lg ${isActive ? 'bg-blue-500' : 'bg-gray-100'} ${className}`}>
      ...
    </div>
  );
}

// ✅ SEGUIR (Fusão segura de classes e bloco return com parênteses obrigatórios)
import { cn } from "@/shared/utils/cn";

export function Card({ isActive, className }: CardProps) {
  return (
    <div className={cn(
      "p-4 rounded-lg bg-gray-100 transition-colors", 
      isActive && "bg-blue-500 text-white",
      className
    )}>
      ...
    </div>
  );
}

```

### 7.6. Parênteses Obrigatórios no `return` do JSX

Todo e qualquer `return` que entregue um elemento ou bloco JSX deve obrigatoriamente ser encapsulado por parênteses `()`, independentemente de ser um bloco de múltiplas linhas ou uma tag simples de linha única.

> **Motivação:** Mantém a consistência visual absoluta em todo o projeto, padroniza o comportamento de formatação de ferramentas automáticas e previne falhas silenciosas causadas pelo mecanismo de inserção automática de ponto e vírgula (*Automatic Semicolon Insertion - ASI*) do ecossistema JavaScript.

```typescript
// ❌ PROIBIDO (Mesmo para linhas simples)
return <button>Salvar</button>;

// ❌ PROIBIDO (Retornos condicionais em linha sem parênteses)
return isActive ? <AdminPanel/> : <UserPanel/>;

// ✅ OBRIGATÓRIO (Tag única encapsulada)
return (
  <button>Salvar</button>
);

// ✅ OBRIGATÓRIO (Expressões complexas ou ternários encapsulados)
return (
  isActive ? <AdminPanel/> : <UserPanel/>
);

```

---

## 8. Comandos de Inicialização e Operação Local

Utilize o gerenciador de pacotes padrão definido para o projeto (`npm`) para executar os scripts de desenvolvimento e validação.

### 8.1. Comandos do Projeto

```bash
# Instalar dependências de forma limpa baseando-se no lockfile
npm ci

# Iniciar o servidor de desenvolvimento local
npm run dev

# Executar o linter para buscar problemas estáticos no código
npm run lint

# Executar a verificação de tipagem do TypeScript
npm run type-check

# Gerar build otimizada de produção
npm run build

```