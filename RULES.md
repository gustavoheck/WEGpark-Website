# Regras de desenvolvimento - WEGpark Front-end

Este documento orienta o desenvolvimento do front-end do WEGpark. As regras devem ser aplicadas em conjunto com os contratos da API e com os padroes visuais registrados em [docs/guia-de-componentes.md](docs/guia-de-componentes.md).

## Stack e comandos

- Framework: Next.js com App Router;
- Linguagem: TypeScript;
- Interface: Tailwind CSS, shadcn/ui e Base UI;
- Estado remoto: TanStack Query;
- Formularios: React Hook Form e Zod;
- HTTP: Axios;
- Pacotes: npm.

Comandos disponiveis:

```bash
npm run dev
npm run lint
npm run build
npm run start
```

Nao existe script `type-check` separado: a verificacao de TypeScript e executada por `npm run build`.

## Organizacao do codigo

```text
src/
|- app/                  # Rotas, paginas e layouts
|- components/ui/        # Componentes genericos de interface
|- features/             # Modulos por dominio de negocio
|- shared/               # Recursos transversais: API, contexto, tipos e utilitarios
`- hooks/                # Hooks globais
```

- Mantenha paginas e layouts em `src/app/` enxutos; a regra de negocio pertence a `features/`;
- cada feature deve concentrar seus componentes, hooks, servicos, schemas e tipos;
- componentes e utilitarios reutilizados por mais de uma feature devem ficar em `shared/` ou `components/ui/`;
- use imports absolutos com `@/`;
- use `PascalCase.tsx` para componentes, `camelCase.ts` para hooks e utilitarios, e `kebab-case` para diretorios de rota.

## Componentes, acessibilidade e responsividade

- Reutilize as primitivas existentes em `src/components/ui/` antes de criar uma nova;
- use `cn` de `@/shared/lib/utils` ao combinar classes condicionais;
- desenvolva mobile-first e acrescente breakpoints `sm`, `md` e `lg` somente quando forem necessarios;
- associe campos a labels e mensagens de erro; use `aria-invalid` nos campos invalidos;
- use `Dialog` para interacoes contextuais e `AlertDialog` para confirmacoes de acoes destrutivas;
- exiba estados de carregamento com `Skeleton`, listas vazias ou erros com `DisplayCard` e resultados de mutacao com toasts.

## Dados, formularios e API

- Centralize requisicoes na instancia `src/shared/lib/api.ts`;
- modele os contratos da API com tipos TypeScript dentro da feature correspondente;
- use hooks do TanStack Query para consultas e mutacoes; invalide as queries relacionadas apos uma mutacao bem-sucedida;
- valide formularios com Zod e React Hook Form antes de enviar dados a API;
- apresente erros compreensiveis ao usuario sem expor respostas internas do servidor;
- respeite as permissoes da API e nao trate a interface como unica camada de autorizacao.

## Configuracao e seguranca

- Mantenha URLs e configuracoes em `.env.local`; o arquivo nao deve ser versionado;
- somente variaveis necessarias no navegador podem usar o prefixo `NEXT_PUBLIC_`;
- nunca adicione senhas, tokens, chaves privadas ou dados pessoais reais ao codigo, documentacao ou evidencias;
- o token de sessao atual e usado temporariamente para montar o cabecalho `Authorization`; qualquer migracao para cookie `HttpOnly` depende de suporte da API;
- use valores ficticios ao testar telas publicas.

## Testes e documentacao

- Mantenha o plano e o registro dos testes em [TESTE.md](TESTE.md);
- salve novas capturas em `docs/evidencias/plano-de-testes/TCxxx/` com nomes descritivos em kebab-case;
- nao marque um caso manual como aprovado sem evidencia correspondente;
- ao alterar componentes visuais, atualize [docs/guia-de-componentes.md](docs/guia-de-componentes.md) quando necessario;
- atualize o README sempre que houver alteracao de instalacao, configuracao, funcionalidades ou limitacoes.

## Git

- Crie funcionalidades a partir de `develop` ou da branch definida para o fluxo atual, usando Git Flow quando disponivel;
- use nomes como `feature/nome-da-funcionalidade` ou `bugfix/nome-da-correcao`;
- mantenha commits pequenos e descritivos, por exemplo `feat: add vehicle filters` ou `docs: update test evidence`;
- antes de publicar uma branch, execute `npm run lint` e `npm run build`;
- nao versione `node_modules`, `.next`, arquivos de ambiente ou artefatos temporarios.
