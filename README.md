# WEGpark - Front-end

Interface web do WEGpark, desenvolvida para simplificar a gestao de um estacionamento corporativo. A aplicacao oferece fluxos de autenticacao, consulta e manutencao de veiculos, ocorrencias, notificacoes, solicitacoes, perfil e gestao de usuarios, de acordo com o perfil autenticado.

> **Aviso:** este e um projeto educacional, criado para praticar desenvolvimento front-end. Ele nao representa um sistema oficial da WEG nem possui finalidade comercial.

## Sobre o projeto

O WEGpark substitui registros manuais e planilhas desconectadas por uma interface responsiva integrada a uma API REST. A interface prioriza clareza, feedback para as acoes do usuario e separacao das funcionalidades por perfil de acesso.

### Principais funcionalidades

- login, cadastro, verificacao de e-mail e recuperacao de senha;
- selecao do perfil de acesso quando uma conta possui mais de uma permissao;
- consulta, cadastro e edicao de veiculos;
- solicitacao, confirmacao e desativacao de vinculos de veiculos;
- consulta, cadastro e edicao de ocorrencias;
- central de notificacoes e solicitacoes de vinculo;
- consulta e edicao do proprio perfil;
- gestao de usuarios para os perfis autorizados;
- navegacao adaptada ao perfil de acesso;
- estados visuais de carregamento, vazio, sucesso e erro.

## Tecnologias utilizadas

- Next.js 16 com App Router;
- React 19 e TypeScript;
- Tailwind CSS, shadcn/ui e Base UI;
- TanStack Query para cache e estado do servidor;
- Axios para comunicacao HTTP;
- React Hook Form e Zod para formularios e validacao;
- Lucide React para icones;
- ESLint e Prettier para qualidade e padronizacao do codigo.

## Arquitetura do front-end

O projeto adota uma organizacao orientada a funcionalidades. Cada dominio concentra seus componentes, hooks, servicos, tipos e schemas, enquanto recursos reutilizaveis ficam em `shared/` ou `components/ui/`.

```text
src/
|- app/                  # Rotas, layouts e paginas do Next.js
|- components/ui/        # Primitivas visuais reutilizaveis
|- features/             # Modulos de negocio da interface
|  |- auth/
|  |- vehicles/
|  |- occurrences/
|  |- notifications/
|  |- requests/
|  |- profile/
|  `- user-management/
|- shared/               # Contextos, configuracoes, utilitarios e tipos globais
`- hooks/                # Hooks globais
```

As chamadas HTTP sao centralizadas em `src/shared/lib/api.ts`. O estado de sessao e mantido pelo `AuthContext`, e os dados remotos sao consultados e atualizados por hooks baseados no TanStack Query.

## Requisitos

- Node.js 20 ou superior;
- npm;
- API do WEGpark em execucao e acessivel pela URL configurada.

## Configuracao

Crie o arquivo `.env.local` na raiz do projeto. Ele e ignorado pelo Git e nao deve conter credenciais publicadas.

```dotenv
# URL base da API REST do WEGpark
NEXT_PUBLIC_API_URL=http://localhost:8081

# Use somente para desenvolvimento da gestao de usuarios sem a API
NEXT_PUBLIC_USE_MOCKS=false
```

As variaveis iniciadas por `NEXT_PUBLIC_` ficam disponiveis no navegador. Portanto, nunca inclua senhas, tokens ou chaves privadas nesse arquivo.

## Como executar

Instale as dependencias:

```bash
npm ci
```

Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

Para gerar uma versao de producao:

```bash
npm run build
npm run start
```

## Integracao com a API

O front-end consome a API REST do WEGpark por meio da URL definida em `NEXT_PUBLIC_API_URL`. Com a configuracao local padrao, a documentacao da API esta disponivel em:

- [Swagger UI](http://localhost:8081/swagger-ui/index.html)
- [OpenAPI JSON](http://localhost:8081/v3/api-docs)

As operacoes de consulta, cadastro, atualizacao e exclusao sao exibidas apenas quando fazem parte do fluxo e das permissoes do perfil autenticado. Algumas operacoes sao intencionalmente tratadas como desativacao ou desvinculo, conforme o contrato da API.

## Perfis e areas da interface

| Perfil | Acesso principal |
| --- | --- |
| Colaborador e visitante | Veiculos proprios, ocorrencias relacionadas, notificacoes, solicitacoes e perfil |
| Guarita | Veiculos, ocorrencias e perfil |
| RH | Gestao de usuarios e perfil |
| Administrador | Gestao de usuarios |

## Interface e responsividade

A interface utiliza layout mobile-first, breakpoints do Tailwind CSS, cards e tabelas responsivas, sidebar adaptavel e componentes reutilizaveis. Os estados de carregamento usam skeletons; listas sem dados e falhas de comunicacao possuem mensagens especificas; acoes concluidas ou rejeitadas apresentam toasts.

O guia dos componentes efetivamente utilizados esta em [docs/guia-de-componentes.md](docs/guia-de-componentes.md).

## Seguranca no front-end

- a URL da API e configurada por variavel de ambiente;
- `.env.local` e arquivos de ambiente sao ignorados pelo Git;
- formularios usam validacao com Zod antes do envio;
- o React escapa conteudo interpolado por padrao, reduzindo o risco de XSS;
- a interface trata respostas `401` removendo a sessao e redirecionando o usuario ao login;
- itens de navegacao e acoes visiveis respeitam o perfil autenticado.

Atualmente, a API exige o JWT no cabecalho `Authorization`. Por isso, o token fica em um cookie acessivel ao JavaScript, com `SameSite=Strict` e `Secure` em producao. Essa e uma medida temporaria: a solucao recomendada para producao e a API fornecer um cookie `HttpOnly` e um endpoint autenticado para restaurar a sessao, evitando o acesso do JavaScript ao token.

## Testes e qualidade

O plano de testes e os registros de execucao manual estao em [TESTE.md](TESTE.md), com evidencias em `docs/evidencias/plano-de-testes/`.

Antes de enviar alteracoes, execute:

```bash
npm run lint
npm run build
```

O plano cobre navegacao, autenticacao, carregamento de dados, validacao de formularios, cadastro, edicao, exclusao, responsividade, feedback visual e indisponibilidade da API.

## Limitacoes conhecidas

- o funcionamento completo depende de uma API compativel e acessivel;
- a edicao administrativa de colaboradores e visitantes depende de endpoint ainda nao disponibilizado pela API;
- o token de autenticacao ainda nao pode ser `HttpOnly` enquanto a API exigir o cabecalho `Authorization` montado pelo navegador;
- as credenciais e a documentacao protegida da API devem ser fornecidas apenas a usuarios autorizados.

## Equipe

- Adriane Victoria Cardoso Czycza - Gestao e front-end / Scrum Master;
- Cassio Stein Paulus - Back-end;
- David Hillesheim - Front-end;
- Gustavo Henrique Heck - Back-end / Product Owner;
- Matheus de Oliveira - Front-end.
