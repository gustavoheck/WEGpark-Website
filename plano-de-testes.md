# Plano de testes - WEGpark Front-end

Este documento organiza os testes de interface do WEGpark. Os casos manuais devem ser executados em uma versao candidata a entrega, com a API disponivel e uma conta de teste autorizada para o perfil indicado.

## Ambiente de teste

- Aplicacao: front-end WEGpark em `http://localhost:3000`;
- API: URL definida em `NEXT_PUBLIC_API_URL`;
- Navegadores: versao atual do Chrome, Edge ou Firefox;
- Dispositivos: viewport desktop e viewport mobile;
- Responsavel: equipe de front-end.

## Casos de teste

| Codigo | Funcionalidade | Objetivo e etapas resumidas | Resultado esperado | Prioridade |
| --- | --- | --- | --- | --- |
| TC001 | Login valido | Informar credenciais validas e concluir o login. | Sessao iniciada e redirecionamento para a area permitida ao perfil. | Alta |
| TC002 | Login invalido | Informar senha incorreta para uma conta existente. | Acesso bloqueado e mensagem clara, sem detalhes internos da API. | Alta |
| TC003 | Carregamento e cadastro de veiculo | Abrir veiculos, cadastrar um veiculo valido e retornar a lista. | Dados carregados; novo item exibido e feedback de sucesso apresentado. | Alta |
| TC004 | Validacao de formulario | Tentar cadastrar veiculo com campo obrigatorio vazio ou placa invalida. | Envio bloqueado e mensagens de validacao associadas aos campos. | Alta |
| TC005 | Edicao de veiculo | Alterar um campo de veiculo existente e salvar. | Alteracao persistida, mensagem de sucesso e lista atualizada. | Media |
| TC006 | Navegacao por perfil | Acessar todos os itens da sidebar de cada perfil disponivel. | Rotas corretas e somente itens autorizados visiveis. | Alta |
| TC007 | Responsividade | Validar sidebar, formularios, cards e tabelas em desktop e mobile. | Conteudo legivel, acionavel e sem quebra de layout. | Media |
| TC008 | Estado de carregamento | Sob conexao lenta, abrir uma listagem de veiculos ou ocorrencias. | Skeleton apresentado ate a conclusao da consulta, sem tela vazia enganosa. | Media |
| TC009 | Exclusao de notificacao | Abrir notificacoes, confirmar a remocao de uma notificacao e recarregar a lista. | Notificacao removida, toast de sucesso e lista atualizada. | Media |
| TC010 | Indisponibilidade da API | Interromper a API ou usar URL inacessivel e abrir uma listagem. | Mensagem amigavel de erro, sem stack trace nem dados internos. | Alta |
| TC011 | Feedback de falha de operacao | Forcar resposta de erro em uma acao de cadastro, edicao ou solicitacao. | Toast de erro compreensivel; formulario ou lista permanece em estado consistente. | Alta |
| TC012 | Verificacao tecnica | Executar `npm run lint` e `npm run build`. | Sem erros de lint, TypeScript ou compilacao de producao. | Alta |

## Matriz de cobertura

| Demanda da avaliacao | Casos que cobrem a demanda |
| --- | --- |
| Navegacao entre telas | TC006 |
| Carregamento de dados e estado de carregamento | TC003, TC008 |
| Estado de erro e indisponibilidade da API | TC002, TC010, TC011 |
| Validacao de formularios | TC004 |
| Cadastro e edicao | TC003, TC005 |
| Exclusao | TC009 |
| Responsividade | TC007 |
| Feedback visual | TC003, TC005, TC009, TC011 |
| Qualidade de codigo e compilacao | TC012 |

## Registro da execucao

As evidencias dos casos executados manualmente ficam em `docs/evidencias/plano-de-testes/`. Os resultados abaixo so devem ser marcados como aprovados quando a evidencia correspondente confirmar o comportamento esperado.

| Codigo | Situacao | Resultado obtido | Evidencia |
| --- | --- | --- | --- |
| TC001 | Aprovado | Login realizado e redirecionamento para veiculos. | `docs/evidencias/plano-de-testes/TC001/01.png` e `02.png` |
| TC002 | Aprovado | Credenciais invalidas bloqueadas com mensagem de erro. | `docs/evidencias/plano-de-testes/TC002/01.png` |
| TC003 | Aprovado | Veiculo cadastrado e exibido na listagem. | `docs/evidencias/plano-de-testes/TC003/01.png` a `03.png` |
| TC004 | Aprovado | Validacoes de campos obrigatorios exibidas. | `docs/evidencias/plano-de-testes/TC004/01.png` |
| TC005 | Aprovado | Veiculo editado e alteracao refletida na listagem. | `docs/evidencias/plano-de-testes/TC005/01.png` a `05.png` |
| TC006 | Aprovado | Itens da sidebar levaram as rotas previstas para o perfil. | `docs/evidencias/plano-de-testes/TC006/01.png` a `05.png` |
| TC007 | Aprovado | Layout validado em visualizacoes mobile e desktop. | `docs/evidencias/plano-de-testes/TC007/01.png` a `03.png` |
| TC008 | Pendente de execucao manual | Caso incluido para registrar explicitamente o estado de carregamento. | Registrar captura ao executar com rede limitada. |
| TC009 | Pendente de execucao manual | Caso incluido para cobrir exclusao e atualizacao da interface. | Registrar captura do dialogo, toast e lista atualizada. |
| TC010 | Pendente de execucao manual | Caso incluido para validar falha de comunicacao com a API. | Registrar captura da mensagem de erro. |
| TC011 | Pendente de execucao manual | Caso incluido para validar o feedback de uma mutacao rejeitada. | Registrar captura do toast de erro. |
| TC012 | Executado | `npm run lint` e `npm run build` executados com sucesso nesta branch. | Saida dos comandos registrada na verificacao da entrega. |

## Criterio de aprovacao

Um caso manual somente pode ser considerado aprovado quando o resultado observado corresponder ao esperado e houver evidencia identificavel. Se houver falha, registre o problema, aplique a correcao e execute o caso novamente antes da entrega.
