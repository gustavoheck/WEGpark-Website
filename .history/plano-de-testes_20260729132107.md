# Plano de Testes — WEGpark

Este documento contém o plano de testes de interface da aplicação WEGpark, elaborado antes da execução, e o registro dos resultados obtidos após a execução sobre a versão final/candidata à entrega.

**Legenda de prioridade:** Alta / Média / Baixa

---

## TC001 — Login com credenciais válidas

| Campo | Descrição |
|---|---|
| Funcionalidade testada | Autenticação (Login) |
| Objetivo do teste | Verificar se o usuário consegue autenticar-se com e-mail e senha válidos |
| Pré-condições | Usuário previamente cadastrado e ativo na base |
| Dados utilizados | E-mail: `usuario.teste@wegpark.com` / Senha: `********` |
| Etapas de execução | 1. Acessar `/login`<br>2. Informar e-mail<br>3. Informar senha<br>4. Clicar em "Entrar" |
| Resultado esperado | Usuário autenticado e redirecionado para a tela inicial do seu perfil |
| Prioridade | Alta |
| Responsável pela execução | _(nome do integrante)_ |
| Resultado obtido | _(a preencher)_ |
| Situação | ☐ Aprovado ☐ Reprovado |
| Evidências | _(print de tela)_ |
| Problemas encontrados | _(a preencher)_ |
| Correções realizadas | _(a preencher)_ |
| Nova execução | _(a preencher, se aplicável)_ |

---

## TC002 — Login com credenciais inválidas (estado de erro)

| Campo | Descrição |
|---|---|
| Funcionalidade testada | Autenticação (Login) |
| Objetivo do teste | Verificar mensagem de erro ao informar senha incorreta |
| Pré-condições | Usuário previamente cadastrado |
| Dados utilizados | E-mail válido / Senha incorreta |
| Etapas de execução | 1. Acessar `/login`<br>2. Informar e-mail válido<br>3. Informar senha incorreta<br>4. Clicar em "Entrar" |
| Resultado esperado | Mensagem de erro exibida, sem expor detalhes internos da API, e usuário permanece na tela de login |
| Prioridade | Alta |
| Responsável pela execução | _(nome do integrante)_ |
| Resultado obtido | _(a preencher)_ |
| Situação | ☐ Aprovado ☐ Reprovado |
| Evidências | _(print de tela)_ |
| Problemas encontrados | _(a preencher)_ |
| Correções realizadas | _(a preencher)_ |
| Nova execução | _(a preencher, se aplicável)_ |

---

## TC003 — Cadastro de veículo

| Campo | Descrição |
|---|---|
| Funcionalidade testada | CRUD de veículos (Cadastro) |
| Objetivo do teste | Verificar se o colaborador/visitante consegue cadastrar um novo veículo |
| Pré-condições | Usuário autenticado com papel de colaborador ou visitante |
| Dados utilizados | Placa: `ABC1D23` / Modelo, cor e demais campos obrigatórios preenchidos |
| Etapas de execução | 1. Acessar `/veiculos`<br>2. Clicar em "Adicionar veículo"<br>3. Preencher formulário<br>4. Confirmar cadastro |
| Resultado esperado | Veículo cadastrado com sucesso, mensagem de confirmação exibida e lista atualizada automaticamente |
| Prioridade | Alta |
| Responsável pela execução | _(nome do integrante)_ |
| Resultado obtido | _(a preencher)_ |
| Situação | ☐ Aprovado ☐ Reprovado |
| Evidências | _(print de tela)_ |
| Problemas encontrados | _(a preencher)_ |
| Correções realizadas | _(a preencher)_ |
| Nova execução | _(a preencher, se aplicável)_ |

---

## TC004 — Validação de formulário de cadastro de veículo

| Campo | Descrição |
|---|---|
| Funcionalidade testada | CRUD de veículos (Validação) |
| Objetivo do teste | Verificar se o formulário impede o envio de dados inválidos ou incompletos |
| Pré-condições | Usuário autenticado, na tela de cadastro de veículo |
| Dados utilizados | Placa em formato inválido / campo obrigatório em branco |
| Etapas de execução | 1. Acessar `/veiculos/adicionar`<br>2. Deixar campo obrigatório vazio ou inserir placa inválida<br>3. Tentar submeter o formulário |
| Resultado esperado | Formulário não é enviado; mensagens de validação são exibidas nos campos correspondentes |
| Prioridade | Alta |
| Responsável pela execução | _(nome do integrante)_ |
| Resultado obtido | _(a preencher)_ |
| Situação | ☐ Aprovado ☐ Reprovado |
| Evidências | _(print de tela)_ |
| Problemas encontrados | _(a preencher)_ |
| Correções realizadas | _(a preencher)_ |
| Nova execução | _(a preencher, se aplicável)_ |

---

## TC005 — Edição de veículo

| Campo | Descrição |
|---|---|
| Funcionalidade testada | CRUD de veículos (Edição) |
| Objetivo do teste | Verificar se as alterações em um veículo já cadastrado são salvas corretamente |
| Pré-condições | Veículo previamente cadastrado pelo usuário autenticado |
| Dados utilizados | Alteração do campo "cor" do veículo |
| Etapas de execução | 1. Acessar `/veiculos/[id]/editar`<br>2. Alterar campo desejado<br>3. Salvar alterações |
| Resultado esperado | Dados atualizados com sucesso, mensagem de confirmação exibida e informação refletida na listagem |
| Prioridade | Média |
| Responsável pela execução | _(nome do integrante)_ |
| Resultado obtido | _(a preencher)_ |
| Situação | ☐ Aprovado ☐ Reprovado |
| Evidências | _(print de tela)_ |
| Problemas encontrados | _(a preencher)_ |
| Correções realizadas | _(a preencher)_ |
| Nova execução | _(a preencher, se aplicável)_ |

---

## TC006 — Exclusão de veículo

| Campo | Descrição |
|---|---|
| Funcionalidade testada | CRUD de veículos (Exclusão) |
| Objetivo do teste | Verificar se o usuário consegue excluir um veículo cadastrado |
| Pré-condições | Veículo previamente cadastrado |
| Dados utilizados | Veículo de teste cadastrado anteriormente |
| Etapas de execução | 1. Acessar `/veiculos`<br>2. Selecionar o veículo<br>3. Clicar em excluir<br>4. Confirmar exclusão no diálogo |
| Resultado esperado | Veículo removido da listagem e mensagem de confirmação exibida |
| Prioridade | Média |
| Responsável pela execução | _(nome do integrante)_ |
| Resultado obtido | _(a preencher)_ |
| Situação | ☐ Aprovado ☐ Reprovado |
| Evidências | _(print de tela)_ |
| Problemas encontrados | _(a preencher)_ |
| Correções realizadas | _(a preencher)_ |
| Nova execução | _(a preencher, se aplicável)_ |

---

## TC007 — Carregamento e estado de loading das ocorrências

| Campo | Descrição |
|---|---|
| Funcionalidade testada | Listagem de ocorrências |
| Objetivo do teste | Verificar se a interface exibe indicação visual de carregamento enquanto os dados da API são buscados |
| Pré-condições | Usuário autenticado com acesso à tela de ocorrências |
| Dados utilizados | N/A |
| Etapas de execução | 1. Acessar `/ocorrencias`<br>2. Observar o comportamento da tela durante o carregamento dos dados |
| Resultado esperado | Skeleton/spinner de carregamento exibido até os dados chegarem, sem quebra de layout |
| Prioridade | Média |
| Responsável pela execução | _(nome do integrante)_ |
| Resultado obtido | _(a preencher)_ |
| Situação | ☐ Aprovado ☐ Reprovado |
| Evidências | _(print de tela)_ |
| Problemas encontrados | _(a preencher)_ |
| Correções realizadas | _(a preencher)_ |
| Nova execução | _(a preencher, se aplicável)_ |

---

## TC008 — Comportamento diante de indisponibilidade da API

| Campo | Descrição |
|---|---|
| Funcionalidade testada | Tratamento de erros de comunicação |
| Objetivo do teste | Verificar o comportamento da aplicação quando a API não responde ou retorna erro |
| Pré-condições | API indisponível ou variável `NEXT_PUBLIC_API_URL` apontando para endereço inválido |
| Dados utilizados | N/A |
| Etapas de execução | 1. Derrubar/simular indisponibilidade da API<br>2. Acessar uma tela que consome dados (ex: `/veiculos`)<br>3. Observar comportamento da interface |
| Resultado esperado | Mensagem de erro amigável exibida ao usuário, sem exposição de detalhes internos, e sem quebra da aplicação |
| Prioridade | Alta |
| Responsável pela execução | _(nome do integrante)_ |
| Resultado obtido | _(a preencher)_ |
| Situação | ☐ Aprovado ☐ Reprovado |
| Evidências | _(print de tela)_ |
| Problemas encontrados | _(a preencher)_ |
| Correções realizadas | _(a preencher)_ |
| Nova execução | _(a preencher, se aplicável)_ |

---

## TC009 — Navegação entre telas via sidebar

| Campo | Descrição |
|---|---|
| Funcionalidade testada | Navegação |
| Objetivo do teste | Verificar se a navegação entre as telas do dashboard funciona corretamente conforme o papel do usuário |
| Pré-condições | Usuário autenticado |
| Dados utilizados | N/A |
| Etapas de execução | 1. Autenticar com um usuário de determinado papel<br>2. Clicar em cada item disponível na sidebar<br>3. Verificar se a rota correspondente é carregada |
| Resultado esperado | Cada item da sidebar leva à tela correta, e apenas os itens permitidos para o papel do usuário são exibidos |
| Prioridade | Alta |
| Responsável pela execução | _(nome do integrante)_ |
| Resultado obtido | _(a preencher)_ |
| Situação | ☐ Aprovado ☐ Reprovado |
| Evidências | _(print de tela)_ |
| Problemas encontrados | _(a preencher)_ |
| Correções realizadas | _(a preencher)_ |
| Nova execução | _(a preencher, se aplicável)_ |

---

## TC010 — Responsividade (Desktop x Mobile)

| Campo | Descrição |
|---|---|
| Funcionalidade testada | Layout responsivo |
| Objetivo do teste | Verificar se a aplicação se adapta corretamente a diferentes tamanhos de tela |
| Pré-condições | Usuário autenticado |
| Dados utilizados | N/A |
| Etapas de execução | 1. Acessar a aplicação em resolução desktop<br>2. Redimensionar para resolução mobile (ou usar DevTools)<br>3. Verificar sidebar, formulários, cards e tabelas |
| Resultado esperado | Layout se reorganiza sem quebras, elementos permanecem legíveis e utilizáveis em ambas resoluções |
| Prioridade | Média |
| Responsável pela execução | _(nome do integrante)_ |
| Resultado obtido | _(a preencher)_ |
| Situação | ☐ Aprovado ☐ Reprovado |
| Evidências | _(print de tela — desktop e mobile)_ |
| Problemas encontrados | _(a preencher)_ |
| Correções realizadas | _(a preencher)_ |
| Nova execução | _(a preencher, se aplicável)_ |

---

## TC011 — Criação de usuário pelo RH

| Campo | Descrição |
|---|---|
| Funcionalidade testada | Gestão de usuários (RH) |
| Objetivo do teste | Verificar se o RH consegue criar um novo usuário no sistema |
| Pré-condições | Usuário autenticado com papel de RH |
| Dados utilizados | Dados de um novo colaborador/guarita a ser cadastrado |
| Etapas de execução | 1. Acessar `/gestao-usuarios/cadastrar`<br>2. Preencher os dados do novo usuário<br>3. Confirmar cadastro |
| Resultado esperado | Usuário criado com sucesso, mensagem de confirmação exibida e novo usuário aparece na listagem |
| Prioridade | Alta |
| Responsável pela execução | _(nome do integrante)_ |
| Resultado obtido | _(a preencher)_ |
| Situação | ☐ Aprovado ☐ Reprovado |
| Evidências | _(print de tela)_ |
| Problemas encontrados | _(a preencher)_ |
| Correções realizadas | _(a preencher)_ |
| Nova execução | _(a preencher, se aplicável)_ |

---

## TC012 — Feedback visual de sucesso e erro

| Campo | Descrição |
|---|---|
| Funcionalidade testada | Feedback de operações (toast/alertas) |
| Objetivo do teste | Verificar se mensagens de sucesso e erro são exibidas de forma clara ao usuário após operações de cadastro/edição/exclusão |
| Pré-condições | Usuário autenticado |
| Dados utilizados | Operação de cadastro/edição/exclusão válida e inválida |
| Etapas de execução | 1. Realizar uma operação válida (ex: cadastrar veículo)<br>2. Observar mensagem de sucesso<br>3. Realizar uma operação inválida (ex: dados incompletos)<br>4. Observar mensagem de erro |
| Resultado esperado | Mensagens de sucesso e erro exibidas de forma consistente, visível e compreensível ao usuário |
| Prioridade | Média |
| Responsável pela execução | _(nome do integrante)_ |
| Resultado obtido | _(a preencher)_ |
| Situação | ☐ Aprovado ☐ Reprovado |
| Evidências | _(print de tela)_ |
| Problemas encontrados | _(a preencher)_ |
| Correções realizadas | _(a preencher)_ |
| Nova execução | _(a preencher, se aplicável)_ |

---

## Resumo da execução

| ID | Funcionalidade | Prioridade | Situação |
|---|---|---|---|
| TC001 | Login (sucesso) | Alta | ☐ |
| TC002 | Login (erro) | Alta | ☐ |
| TC003 | Cadastro de veículo | Alta | ☐ |
| TC004 | Validação de formulário | Alta | ☐ |
| TC005 | Edição de veículo | Média | ☐ |
| TC006 | Exclusão de veículo | Média | ☐ |
| TC007 | Loading de ocorrências | Média | ☐ |
| TC008 | Indisponibilidade da API | Alta | ☐ |
| TC009 | Navegação (sidebar) | Alta | ☐ |
| TC010 | Responsividade | Média | ☐ |
| TC011 | Criação de usuário (RH) | Alta | ☐ |
| TC012 | Feedback visual | Média | ☐ |
