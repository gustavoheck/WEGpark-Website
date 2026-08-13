# Testes de interface - WEGpark Front-end

Este documento registra o plano, a execucao e as evidencias dos testes de interface do WEGpark. Os testes autenticados dependem de uma API acessivel e de contas de teste autorizadas; eles nao devem ser marcados como aprovados sem a respectiva evidencia.

## Ambiente de teste

- Aplicacao: front-end WEGpark em `http://localhost:3000`;
- API: URL configurada em `NEXT_PUBLIC_API_URL`;
- Navegadores: versoes atuais do Chrome, Edge ou Firefox;
- Dispositivos: viewport desktop e viewport mobile;
- Responsavel: equipe de front-end.

## Casos de teste

| Codigo | Funcionalidade | Objetivo e etapas resumidas | Resultado esperado | Prioridade |
| --- | --- | --- | --- | --- |
| TC001 | Login valido | Informar credenciais validas e concluir o login. | Sessao iniciada e redirecionamento para a area permitida ao perfil. | Alta |
| TC002 | Login invalido | Informar senha incorreta para uma conta existente. | Acesso bloqueado e mensagem clara, sem detalhes internos da API. | Alta |
| TC003 | Cadastro de veiculo | Abrir veiculos, cadastrar um veiculo valido e retornar a lista. | Novo item exibido e feedback de sucesso apresentado. | Alta |
| TC004 | Validacao de formulario de veiculo | Tentar cadastrar veiculo com campo obrigatorio vazio ou placa invalida. | Envio bloqueado e mensagens de validacao associadas aos campos. | Alta |
| TC005 | Edicao de veiculo | Alterar um campo de veiculo existente e salvar. | Alteracao persistida, mensagem de sucesso e lista atualizada. | Media |
| TC006 | Navegacao por perfil | Acessar todos os itens da sidebar de cada perfil disponivel. | Rotas corretas e somente itens autorizados visiveis. | Alta |
| TC007 | Responsividade do dashboard | Validar sidebar, formularios, cards e tabelas em desktop e mobile. | Conteudo legivel, acionavel e sem quebra de layout. | Media |
| TC008 | Carregamento da autenticacao | Iniciar o login com credenciais validas e observar o envio. | Botao desabilitado e estado visual de verificacao durante a requisicao. | Media |
| TC009 | Exclusao de notificacao | Remover uma notificacao e recarregar a lista. | Toast de sucesso e lista atualizada. | Media |
| TC010 | Indisponibilidade da API | Interromper a API ou usar URL inacessivel e abrir uma listagem. | Mensagem amigavel, sem stack trace ou dados internos. | Alta |
| TC011 | Falha de autenticacao | Informar uma senha incorreta para uma conta existente. | Toast de erro claro e tela de login permanece utilizavel. | Alta |
| TC012 | Verificacao tecnica | Executar `npm run lint` e `npm run build`. | Sem erros de lint, TypeScript ou compilacao. | Alta |
| TC013 | Tela inicial do login | Abrir `/login` em viewport desktop. | Logo, campo, links e botao exibidos de forma organizada. | Media |
| TC014 | Validacao de cadastro | Selecionar o tipo colaborador e enviar o cadastro vazio. | Erros apresentados para todos os campos obrigatorios. | Alta |
| TC015 | Feedback de erro no login | Informar um e-mail de teste sem perfil e continuar. | Toast de erro claro, sem detalhes internos. | Alta |
| TC016 | Responsividade do login | Abrir `/login` em viewport de 390 x 844 px. | Formulario centralizado, legivel e utilizavel no mobile. | Media |

## Matriz de cobertura

| Demanda da avaliacao | Casos que cobrem a demanda |
| --- | --- |
| Navegacao entre telas | TC006, TC013 |
| Carregamento de dados e estado de carregamento | TC003, TC008 |
| Estado de erro e indisponibilidade da API | TC002, TC010, TC011, TC015 |
| Validacao de formularios | TC004, TC014 |
| Cadastro e edicao | TC003, TC005 |
| Exclusao | TC009 |
| Responsividade | TC007, TC016 |
| Feedback visual | TC003, TC005, TC009, TC011, TC015 |
| Qualidade de codigo e compilacao | TC012 |

## Registro da execucao e evidencias

Todos os casos abaixo possuem evidencias visuais exibidas neste documento. Clique em uma imagem para abri-la em tamanho completo.

| Codigo | Situacao | Resultado obtido |
| --- | --- | --- |
| TC001 | Aprovado | Login realizado e redirecionamento para veiculos. |
| TC002 | Aprovado | Credenciais invalidas bloqueadas com mensagem de erro. |
| TC003 | Aprovado | Veiculo cadastrado e exibido na listagem. |
| TC004 | Aprovado | Validacoes de campos obrigatorios exibidas. |
| TC005 | Aprovado | Veiculo editado e alteracao refletida na listagem. |
| TC006 | Aprovado | Itens da sidebar levaram as rotas previstas para o perfil. |
| TC007 | Aprovado | Layout validado em visualizacoes mobile e desktop. |
| TC008 | Aprovado | Botao exibiu o estado `Verificando...` enquanto a API validava o acesso. |
| TC009 | Aprovado | Notificacao real removida, lista atualizada de 4 para 3 itens e toast exibido. |
| TC010 | Aprovado | Com o acesso temporario a API interrompido, a tela exibiu mensagem amigavel. |
| TC011 | Aprovado | A API rejeitou credenciais invalidas e a tela exibiu feedback compreensivel. |
| TC012 | Aprovado | `npm run lint` e `npm run build` executados com sucesso nesta branch. |
| TC013 | Aprovado | Tela de login exibida corretamente em desktop. |
| TC014 | Aprovado | Cadastro vazio bloqueado com mensagens de validacao visiveis. |
| TC015 | Aprovado | E-mail sem perfil apresentou feedback amigavel de erro. |
| TC016 | Aprovado | Login responsivo e legivel em 390 x 844 px. |

### Evidencias visuais por caso

#### TC001 - Login valido

<a href="docs/evidencias/plano-de-testes/TC001/01.png"><img src="docs/evidencias/plano-de-testes/TC001/01.png" alt="TC001 - tela de login" width="360" /></a>
<a href="docs/evidencias/plano-de-testes/TC001/02.png"><img src="docs/evidencias/plano-de-testes/TC001/02.png" alt="TC001 - acesso concluido" width="360" /></a>

#### TC002 - Login invalido

<a href="docs/evidencias/plano-de-testes/TC002/01.png"><img src="docs/evidencias/plano-de-testes/TC002/01.png" alt="TC002 - credenciais invalidas" width="420" /></a>

#### TC003 - Cadastro de veiculo

<a href="docs/evidencias/plano-de-testes/TC003/01.png"><img src="docs/evidencias/plano-de-testes/TC003/01.png" alt="TC003 - formulario de veiculo" width="300" /></a>
<a href="docs/evidencias/plano-de-testes/TC003/02.png"><img src="docs/evidencias/plano-de-testes/TC003/02.png" alt="TC003 - cadastro de veiculo" width="300" /></a>
<a href="docs/evidencias/plano-de-testes/TC003/03.png"><img src="docs/evidencias/plano-de-testes/TC003/03.png" alt="TC003 - veiculo na listagem" width="300" /></a>

#### TC004 - Validacao do formulario de veiculo

<a href="docs/evidencias/plano-de-testes/TC004/01.png"><img src="docs/evidencias/plano-de-testes/TC004/01.png" alt="TC004 - mensagens de validacao" width="420" /></a>

#### TC005 - Edicao de veiculo

<a href="docs/evidencias/plano-de-testes/TC005/01.png"><img src="docs/evidencias/plano-de-testes/TC005/01.png" alt="TC005 - inicio da edicao" width="250" /></a>
<a href="docs/evidencias/plano-de-testes/TC005/02.png"><img src="docs/evidencias/plano-de-testes/TC005/02.png" alt="TC005 - formulario de edicao" width="250" /></a>
<a href="docs/evidencias/plano-de-testes/TC005/03.png"><img src="docs/evidencias/plano-de-testes/TC005/03.png" alt="TC005 - alteracao salva" width="250" /></a>
<a href="docs/evidencias/plano-de-testes/TC005/04.png"><img src="docs/evidencias/plano-de-testes/TC005/04.png" alt="TC005 - feedback da edicao" width="250" /></a>
<a href="docs/evidencias/plano-de-testes/TC005/05.png"><img src="docs/evidencias/plano-de-testes/TC005/05.png" alt="TC005 - lista atualizada" width="250" /></a>

#### TC006 - Navegacao por perfil

<a href="docs/evidencias/plano-de-testes/TC006/01.png"><img src="docs/evidencias/plano-de-testes/TC006/01.png" alt="TC006 - navegacao 1" width="250" /></a>
<a href="docs/evidencias/plano-de-testes/TC006/02.png"><img src="docs/evidencias/plano-de-testes/TC006/02.png" alt="TC006 - navegacao 2" width="250" /></a>
<a href="docs/evidencias/plano-de-testes/TC006/03.png"><img src="docs/evidencias/plano-de-testes/TC006/03.png" alt="TC006 - navegacao 3" width="250" /></a>
<a href="docs/evidencias/plano-de-testes/TC006/04.png"><img src="docs/evidencias/plano-de-testes/TC006/04.png" alt="TC006 - navegacao 4" width="250" /></a>
<a href="docs/evidencias/plano-de-testes/TC006/05.png"><img src="docs/evidencias/plano-de-testes/TC006/05.png" alt="TC006 - navegacao 5" width="250" /></a>

#### TC007 - Responsividade do dashboard

<a href="docs/evidencias/plano-de-testes/TC007/01.png"><img src="docs/evidencias/plano-de-testes/TC007/01.png" alt="TC007 - dashboard desktop" width="300" /></a>
<a href="docs/evidencias/plano-de-testes/TC007/02.png"><img src="docs/evidencias/plano-de-testes/TC007/02.png" alt="TC007 - dashboard mobile" width="300" /></a>
<a href="docs/evidencias/plano-de-testes/TC007/03.png"><img src="docs/evidencias/plano-de-testes/TC007/03.png" alt="TC007 - sidebar responsiva" width="300" /></a>

#### TC008 - Carregamento da autenticacao

<a href="docs/evidencias/plano-de-testes/TC008/01-carregamento-autenticacao.png"><img src="docs/evidencias/plano-de-testes/TC008/01-carregamento-autenticacao.png" alt="TC008 - botao Verificando durante autenticacao" width="420" /></a>

#### TC009 - Exclusao de notificacao

<a href="docs/evidencias/plano-de-testes/TC009/01-notificacoes-carregadas.png"><img src="docs/evidencias/plano-de-testes/TC009/01-notificacoes-carregadas.png" alt="TC009 - quatro notificacoes carregadas" width="360" /></a>
<a href="docs/evidencias/plano-de-testes/TC009/02-notificacao-removida.png"><img src="docs/evidencias/plano-de-testes/TC009/02-notificacao-removida.png" alt="TC009 - notificacao removida com toast de sucesso" width="360" /></a>

#### TC010 - Indisponibilidade da API

<a href="docs/evidencias/plano-de-testes/TC010/01-api-indisponivel.png"><img src="docs/evidencias/plano-de-testes/TC010/01-api-indisponivel.png" alt="TC010 - mensagem amigavel para API indisponivel" width="420" /></a>

#### TC011 - Falha de autenticacao

<a href="docs/evidencias/plano-de-testes/TC011/01-credenciais-invalidas.png"><img src="docs/evidencias/plano-de-testes/TC011/01-credenciais-invalidas.png" alt="TC011 - toast de credenciais invalidas" width="420" /></a>

#### TC013 - Login em desktop

<a href="docs/evidencias/plano-de-testes/TC013/01-login-inicial-desktop.png"><img src="docs/evidencias/plano-de-testes/TC013/01-login-inicial-desktop.png" alt="TC013 - tela inicial de login em desktop" width="420" /></a>

#### TC014 - Validacao do cadastro

<a href="docs/evidencias/plano-de-testes/TC014/01-validacao-cadastro.png"><img src="docs/evidencias/plano-de-testes/TC014/01-validacao-cadastro.png" alt="TC014 - mensagens de validacao do cadastro" width="420" /></a>

#### TC015 - Feedback de erro da API

<a href="docs/evidencias/plano-de-testes/TC015/02-toast-erro-api.png"><img src="docs/evidencias/plano-de-testes/TC015/02-toast-erro-api.png" alt="TC015 - toast de erro" width="420" /></a>

#### TC016 - Login em mobile

<a href="docs/evidencias/plano-de-testes/TC016/01-login-mobile-390x844.png"><img src="docs/evidencias/plano-de-testes/TC016/01-login-mobile-390x844.png" alt="TC016 - tela de login no mobile" width="260" /></a>

## Criterio de aprovacao

Um caso manual somente pode ser considerado aprovado quando o resultado observado corresponder ao esperado e houver evidencia identificavel. Havendo falha, registre o problema, aplique a correcao e execute o caso novamente antes da entrega.
