# Sessão de autenticação em cookie HttpOnly

## Problema atual

O front-end grava o JWT com JavaScript usando js-cookie. Isso permite montar o header Authorization, mas também significa que qualquer script executado na página pode ler o token. Uma vulnerabilidade de XSS poderia roubar a sessão do usuário.

As opções Secure e SameSite=Strict reduzem outros riscos, mas não impedem a leitura do token por JavaScript. Somente HttpOnly faz isso, e essa opção só pode ser definida pelo servidor.

## Alteração recomendada na API

1. No login, enviar o JWT em um cookie com HttpOnly, Secure, SameSite=Strict, Path=/ e expiração alinhada à expiração do token.
2. Fazer o filtro de autenticação da API ler o JWT desse cookie, em vez de depender exclusivamente do header Authorization.
3. Disponibilizar um endpoint autenticado como GET /auth/me que retorne os dados necessários para hidratar o front: UUID, nome, e-mail e roles.
4. No logout, expirar o cookie no servidor.
5. Se front e API estiverem em origens diferentes, configurar CORS com credenciais e usar withCredentials no Axios.
6. Manter proteção CSRF compatível com autenticação por cookie, especialmente para operações de escrita.

## Providências temporárias no front-end

Enquanto a API ainda exige o JWT no header, o front mantém o cookie acessível por JavaScript. Foram aplicadas estas reduções de risco:

- Secure em produção;
- SameSite=Strict;
- remoção de logs contendo dados do token;
- limpeza sincronizada do cookie e do estado React em respostas 401.

Essas providências são temporárias e não substituem o cookie HttpOnly.
