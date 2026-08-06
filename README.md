# WEGpark

O WEGpark foi desenvolvido para centralizar a gestão do estacionamento em uma única plataforma, permitindo o cadastro e gerenciamento de usuários e veículos, o registro e acompanhamento de ocorrências, o envio de notificações e o acesso às informações de acordo com o perfil de cada usuário. Dessa forma, o sistema proporciona maior organização, rastreabilidade, segurança e eficiência na administração do estacionamento corporativo.

## Integrantes da equipe

- **Adriane Victória Cardoso Czycza** — Gestão e Frontend / Scrum Master
- **Cássio Stein Paulus** — Equipe de Backend
- **David Hillesheim** — Equipe de Frontend
- **Gustavo Henrique Heck** — Equipe de Backend / Product Owner
- **Matheus de Oliveira** — Equipe de Frontend

## Descrição do problema

Empresas com estacionamento corporativo frequentemente realizam o controle de veículos, usuários e ocorrências por meio de processos manuais, como planilhas, registros em papel ou sistemas não integrados. Essa forma de gerenciamento dificulta o acompanhamento das informações, aumenta o risco de erros e torna mais demorada a comunicação entre a portaria, o setor de Recursos Humanos, os administradores e os colaboradores.

## Perfis de usuário e funcionalidades

- **Colaborador / Visitante (Usuário do estacionamento)**
  - Cadastro, edição e exclusão dos próprios veículos (pode possuir mais de um)
  - Solicitação de vínculo com um veículo já cadastrado por outro proprietário
  - Aprovação ou rejeição de solicitações recebidas para os próprios veículos
  - Recebimento de notificações sobre ocorrências do seu veículo
  - Consulta ao histórico de ocorrências do próprio veículo
- **Guarita**
  - CRUD completo de ocorrências dos veículos
  - Busca de qualquer veículo cadastrado
  - Emissão de notificações de ocorrência e de solicitação de alteração de dados
  - Consulta ao histórico completo de ocorrências
- **RH**
  - Criação de usuários
  - Desativação de usuários
- **Administrador**
  - Acesso completo ao sistema
  - Gestão de usuários (criar, editar, desativar)
  - Histórico completo de ocorrências

## Tecnologias utilizadas

| Categoria          | Tecnologia                                                                                                                |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| Framework          | [Next.js](https://nextjs.org/) (App Router) + [React](https://react.dev/) + TypeScript                                    |
| Estilização        | [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/), [Base UI](https://base-ui.com/)            |
| Estado do servidor | [TanStack Query](https://tanstack.com/query)                                                                              |
| Formulários        | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)                                                 |
| HTTP Client        | [Axios](https://axios-http.com/)                                                                                          |
| Autenticação       | JWT via cookies ([js-cookie](https://github.com/js-cookie/js-cookie) + [jwt-decode](https://github.com/auth0/jwt-decode)) |
| Ícones             | [Lucide React](https://lucide.dev/)                                                                                       |

## Fluxo de vínculo com veículo existente

O primeiro usuário que cadastra um veículo é considerado seu **proprietário**. Quando outra pessoa tenta cadastrar a mesma placa, o sistema não cria um novo veículo nem realiza o vínculo automaticamente. Esse usuário pode solicitar ao proprietário autorização para ser incluído como **dependente**.

1. O usuário informa uma placa já cadastrada na opção **Adicionar Veículo**.
2. O frontend identifica a resposta de conflito da API e pede a confirmação do usuário.
3. Ao confirmar, é enviada uma solicitação para o proprietário.
4. O proprietário consulta o pedido na página **Solicitações**.
5. O proprietário aceita ou rejeita o vínculo.
6. Somente após a aprovação a API vincula o solicitante ao veículo como dependente.

| Ação                          | Método   | Endpoint                                |
| ----------------------------- | -------- | --------------------------------------- |
| Enviar solicitação de vínculo | `POST`   | `/vehicle/associate/notification`       |
| Listar solicitações           | `GET`    | `/notification`                         |
| Aceitar vínculo               | `POST`   | `/vehicle/associate/{uuidNotification}` |
| Rejeitar solicitação          | `DELETE` | `/notification/{uuidNotification}`      |

> A regra de propriedade e a criação do vínculo como dependente são de responsabilidade da API. O frontend apenas apresenta o fluxo e consome os endpoints existentes.

## Instruções para instalação

Pré-requisitos: Node.js 20.9+ e npm.

```bash
# Clonar o repositório
git clone https://github.com/gustavoheck/WEGpark-Website.git
cd WEGpark-Website

# Instalar as dependências
npm install
```

## Variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto com base no exemplo abaixo:

```env
# URL base da API consumida pela aplicação
NEXT_PUBLIC_API_URL=http://localhost:8081/

# Habilita o uso de dados mockados quando a API não está disponível (true/false)
# Quando true, a aplicação utiliza dados fictícios pré-definidos no lugar
# das chamadas à API, permitindo desenvolver o frontend sem o backend em execução.
NEXT_PUBLIC_USE_MOCKS=false
```

Altere a porta de `NEXT_PUBLIC_API_URL` conforme a configuração do ambiente onde a API está sendo executada. O modo mock está disponível somente nas funcionalidades que implementam esse suporte.

## Instruções para execução

```bash
# Ambiente de desenvolvimento
npm run dev

# Verificação estática
npm run lint
npx tsc --noEmit

# Build de produção
npm run build

# Executar build de produção
npm run start
```

A aplicação estará disponível em `http://localhost:3000`.

## Endereço / documentação da API

A aplicação consome a API RESTful do WEGpark, cuja URL é configurada pela variável `NEXT_PUBLIC_API_URL`. Consulte a documentação da API disponibilizada pela equipe de Back-End (repositório e/ou coleção de endpoints) para o detalhamento completo dos endpoints.

## Estrutura resumida de pastas

```
src/
├── app/                     # Rotas (App Router)
│   ├── (auth)/                 # Login, cadastro, recuperação de senha
│   └── (dashboard)/            # Áreas autenticadas (veículos, ocorrências, admin, etc.)
├── components/ui/           # Componentes de UI reutilizáveis (shadcn/ui)
├── features/                # Regras de negócio organizadas por domínio
│   ├── auth/                   # Login e autenticação
│   ├── sign-up/                 # Cadastro de usuários
│   ├── reset-pass/              # Recuperação de senha
│   ├── profile/                 # Perfil do usuário
│   ├── vehicles/                # CRUD de veículos
│   ├── occurrences/             # Ocorrências dos veículos
│   ├── notifications/           # Notificações
│   ├── requests/                # Solicitações
│   ├── hr-user-management/      # Gestão de usuários pelo RH
│   └── admin/                   # Gestão administrativa
├── shared/                  # Recursos compartilhados entre features
│   ├── components/              # Componentes globais (Header, Sidebar, etc.)
│   ├── context/                 # Contexto de autenticação (AuthContext)
│   ├── lib/                     # Cliente HTTP (axios) e utilitários
│   ├── providers/                # Provider do TanStack Query
│   ├── types/                    # Tipos globais
│   └── enum/                     # Enumerações (papéis de usuário, etc.)
└── hooks/                   # Hooks globais (ex: detecção de mobile)
```

O projeto segue uma arquitetura orientada a funcionalidades. Cada domínio pode possuir seus próprios componentes, hooks, schemas, serviços, tipos e mocks conforme sua necessidade.

## Principais funcionalidades

- Autenticação com login, cadastro, verificação de e-mail e recuperação de senha
- Seleção de papel de acesso (colaborador, visitante, guarita, RH e administrador)
- Cadastro, edição e exclusão de veículos
- Solicitação de vínculo com veículo existente
- Aprovação ou rejeição de dependentes pelo proprietário do veículo
- Consulta dos usuários vinculados a um veículo
- Registro e histórico de ocorrências (janela aberta, luz acesa, alarme, acidente de trânsito, estacionamento irregular)
- Central de notificações
- Gestão de usuários pelo RH e pelo administrador (criação e desativação)
- Sidebar dinâmica de navegação, adaptada conforme o papel do usuário logado
- Feedback visual de carregamento, sucesso e erro nas operações com a API

## Boas Práticas de Segurança Adotadas

- **Autenticação com JWT**
  - O acesso ao sistema é realizado por meio de login, com emissão de um **JSON Web Token (JWT)** pela API após a autenticação do usuário.

- **Validação da sessão**
  - Antes de restaurar a sessão do usuário, o cliente verifica se o **token JWT** ainda é válido, evitando o uso de credenciais expiradas.

- **Autorização nas requisições**
  - Todas as chamadas autenticadas à API enviam o token no cabeçalho **`Authorization: Bearer <token>`**, garantindo que apenas usuários autenticados possam acessar recursos protegidos.

- **Tratamento de sessões expiradas**
  - Quando a API retorna o código **401 (Unauthorized)**, o usuário é automaticamente redirecionado para a tela de login, impedindo o acesso com sessões inválidas.

- **Uso seguro de cookies**
  - A aplicação utiliza cookies com o atributo **`SameSite=Strict`** para reduzir riscos de ataques CSRF.
  - Em ambiente de produção, também é utilizado o atributo **`Secure`**, permitindo o envio do cookie apenas por conexões HTTPS.

- **Validação de formulários**
  - Os dados informados pelos usuários são validados utilizando **React Hook Form** em conjunto com **Zod**, reduzindo o envio de informações inválidas para a API.

- **Controle de acesso por perfil**
  - Funcionalidades, páginas e itens de navegação são exibidos conforme o perfil do usuário autenticado, restringindo o acesso a recursos não autorizados.

- **Configuração por variáveis de ambiente**
  - A URL da API é definida por meio da variável **`NEXT_PUBLIC_API_URL`**, evitando que informações específicas do ambiente fiquem fixas no código-fonte.

- **Proteção contra XSS**
  - A interface é desenvolvida com **React**, que realiza o escape automático de conteúdo interpolado por padrão, contribuindo para mitigar ataques de **Cross-Site Scripting (XSS)**.

## Procedimento utilizado para realização dos testes

Os testes de interface foram planejados e executados conforme o plano de testes do projeto (arquivo `plano-de-testes.md` / planilha correspondente), cobrindo cenários de navegação entre telas, carregamento de dados, estados de carregamento e erro, validação de formulários, cadastro, edição, exclusão, responsividade e feedback visual. Cada teste foi executado manualmente sobre a versão candidata à entrega, com evidências registradas por meio de capturas de tela, e problemas identificados foram corrigidos e reexecutados até aprovação.

## Limitações conhecidas
