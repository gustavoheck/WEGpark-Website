# Plano de Testes — WEGpark

Este documento contém o plano de testes de interface da aplicação WEGpark, elaborado antes da execução, cobrindo as principais funcionalidades do sistema (login, veículos, ocorrências, gestão de usuários, etc.), conforme exigido na avaliação prática da Unidade Curricular de Programação Front-End.

**Legenda de prioridade:** Alta / Média / Baixa

## Plano de testes

| Código | Funcionalidade testada | Objetivo do teste | Pré-condições | Dados utilizados | Etapas de execução | Resultado esperado | Prioridade | Responsável |
|---|---|---|---|---|---|---|---|---|
| TC001 | Login com credenciais válidas | Verificar se o usuário consegue autenticar-se com e-mail e senha válidos | Usuário previamente cadastrado e ativo na base | E-mail: david_hillesheim@estudante.sesisenai.org.br / Senha: Aa$123123 | 1. Acessar `/login`<br>2. Informar e-mail<br>3. Informar senha<br>4. Clicar em "Entrar" | Usuário autenticado e redirecionado para a tela inicial do seu perfil | Alta | A definir |
| TC002 | Login com credenciais inválidas | Verificar mensagem de erro ao informar senha incorreta | Usuário previamente cadastrado | E-mail válido / Senha incorreta | 1. Acessar `/login`<br>2. Informar e-mail válido<br>3. Informar senha incorreta<br>4. Clicar em "Entrar" | Mensagem de erro exibida, sem expor detalhes internos da API, usuário permanece na tela de login | Alta | A definir |
| TC003 | Cadastro de veículo | Verificar se o colaborador/visitante consegue cadastrar um novo veículo (POST) | Usuário autenticado com papel de colaborador ou visitante | Placa: ABC1D23 / Modelo, cor e demais campos obrigatórios preenchidos | 1. Acessar `/veiculos`<br>2. Clicar em "Adicionar veículo"<br>3. Preencher formulário<br>4. Confirmar cadastro | Veículo cadastrado com sucesso, mensagem de confirmação exibida e lista atualizada automaticamente | Alta | A definir |
| TC004 | Validação de formulário de cadastro de veículo | Verificar se o formulário impede o envio de dados inválidos ou incompletos | Usuário autenticado, na tela de cadastro de veículo | Placa em formato inválido / campo obrigatório em branco | 1. Acessar `/veiculos/adicionar`<br>2. Deixar campo obrigatório vazio ou inserir placa inválida<br>3. Tentar submeter o formulário | Formulário não é enviado; mensagens de validação são exibidas nos campos correspondentes | Alta | A definir |
| TC005 | Edição de veículo | Verificar se as alterações em um veículo já cadastrado são salvas corretamente (PUT/PATCH) | Veículo previamente cadastrado pelo usuário autenticado | Alteração do campo "cor" do veículo | 1. Acessar `/veiculos/[id]/editar`<br>2. Alterar campo desejado<br>3. Salvar alterações | Dado é atualizado com sucesso, mensagem de confirmação exibida e refletida na listagem | Média | A definir |
| TC006 | Navegação entre telas via sidebar | Verificar se a navegação entre as telas do dashboard funciona corretamente conforme o papel do usuário | Usuário autenticado | N/A | 1. Autenticar com um usuário de determinado papel<br>2. Clicar em cada item disponível na sidebar<br>3. Verificar se a rota correspondente é carregada | Cada item da sidebar leva à tela correta; apenas itens permitidos ao papel do usuário são exibidos | Alta | A definir |
| TC007 | Responsividade (Desktop x Mobile) | Verificar se a aplicação se adapta corretamente a diferentes tamanhos de tela | Usuário autenticado | N/A | 1. Acessar a aplicação em resolução desktop<br>2. Redimensionar para resolução mobile (ou usar DevTools)<br>3. Verificar sidebar, formulários, cards e tabelas | Layout se reorganiza sem quebras, elementos permanecem legíveis e utilizáveis em ambas resoluções | Média | A definir |

## Registro da execução dos testes

As evidências estão organizadas na ordem de execução. As setas entre as imagens representam a sequência do fluxo testado.

### TC001 — Login com credenciais válidas

| Campo | Registro |
|---|---|
| Resultado obtido | Login realizado com sucesso e redirecionamento para a listagem de veículos. |
| Situação | ✅ Aprovado |
| Evidências | <img src="./docs/evidencias/plano-de-testes/TC001/01.png" alt="TC001 - preenchimento das credenciais" width="180"> &nbsp;→&nbsp; <img src="./docs/evidencias/plano-de-testes/TC001/02.png" alt="TC001 - acesso realizado" width="180"> |
| Problema encontrado | N/A |
| Correção realizada | N/A |
| Nova execução | N/A |

### TC002 — Login com credenciais inválidas

| Campo | Registro |
|---|---|
| Resultado obtido | A tentativa de login foi bloqueada e a mensagem de credenciais inválidas foi exibida. |
| Situação | ✅ Aprovado |
| Evidências | <img src="./docs/evidencias/plano-de-testes/TC002/01.png" alt="TC002 - mensagem de credenciais inválidas" width="180"> |
| Problema encontrado | N/A |
| Correção realizada | N/A |
| Nova execução | N/A |

### TC003 — Cadastro de veículo

| Campo | Registro |
|---|---|
| Resultado obtido | O formulário foi preenchido, o veículo foi cadastrado e passou a ser exibido na listagem. |
| Situação | ✅ Aprovado |
| Evidências | <img src="./docs/evidencias/plano-de-testes/TC003/01.png" alt="TC003 - acesso ao cadastro" width="150"> &nbsp;→&nbsp; <img src="./docs/evidencias/plano-de-testes/TC003/02.png" alt="TC003 - formulário preenchido" width="150"> &nbsp;→&nbsp; <img src="./docs/evidencias/plano-de-testes/TC003/03.png" alt="TC003 - veículo cadastrado" width="150"> |
| Problema encontrado | N/A |
| Correção realizada | N/A |
| Nova execução | N/A |

### TC004 — Validação do formulário de cadastro de veículo

| Campo | Registro |
|---|---|
| Resultado obtido | O envio foi impedido e as mensagens de validação foram apresentadas nos campos obrigatórios. |
| Situação | ✅ Aprovado |
| Evidências | <img src="./docs/evidencias/plano-de-testes/TC004/01.png" alt="TC004 - validação dos campos obrigatórios" width="180"> |
| Problema encontrado | N/A |
| Correção realizada | N/A |
| Nova execução | N/A |

### TC005 — Edição de veículo

| Campo | Registro |
|---|---|
| Resultado obtido | O veículo foi selecionado, editado, salvo e a alteração foi refletida na listagem. |
| Situação | ✅ Aprovado |
| Evidências | <img src="./docs/evidencias/plano-de-testes/TC005/01.png" alt="TC005 - seleção do veículo" width="120"> &nbsp;→&nbsp; <img src="./docs/evidencias/plano-de-testes/TC005/02.png" alt="TC005 - formulário de edição" width="120"> &nbsp;→&nbsp; <img src="./docs/evidencias/plano-de-testes/TC005/03.png" alt="TC005 - alteração dos dados" width="120"> &nbsp;→&nbsp; <img src="./docs/evidencias/plano-de-testes/TC005/04.png" alt="TC005 - confirmação da alteração" width="120"> &nbsp;→&nbsp; <img src="./docs/evidencias/plano-de-testes/TC005/05.png" alt="TC005 - resultado na listagem" width="120"> |
| Problema encontrado | N/A |
| Correção realizada | N/A |
| Nova execução | N/A |

### TC006 — Navegação entre telas via sidebar

| Campo | Registro |
|---|---|
| Resultado obtido | Os itens da sidebar direcionaram para as telas correspondentes e respeitaram as opções disponíveis ao perfil autenticado. |
| Situação | ✅ Aprovado |
| Evidências | <img src="./docs/evidencias/plano-de-testes/TC006/01.png" alt="TC006 - veículos" width="120"> &nbsp;→&nbsp; <img src="./docs/evidencias/plano-de-testes/TC006/02.png" alt="TC006 - ocorrências" width="120"> &nbsp;→&nbsp; <img src="./docs/evidencias/plano-de-testes/TC006/03.png" alt="TC006 - notificações" width="120"> &nbsp;→&nbsp; <img src="./docs/evidencias/plano-de-testes/TC006/04.png" alt="TC006 - dados do perfil" width="120"> &nbsp;→&nbsp; <img src="./docs/evidencias/plano-de-testes/TC006/05.png" alt="TC006 - solicitações" width="120"> |
| Problema encontrado | N/A |
| Correção realizada | N/A |
| Nova execução | N/A |

### TC007 — Responsividade (Desktop x Mobile)

| Campo | Registro |
|---|---|
| Resultado obtido | O layout foi validado em diferentes larguras, mantendo conteúdo legível, controles acessíveis e composição sem quebras. |
| Situação | ✅ Aprovado |
| Evidências | <img src="./docs/evidencias/plano-de-testes/TC007/01.png" alt="TC007 - visualização mobile" width="150"> &nbsp;→&nbsp; <img src="./docs/evidencias/plano-de-testes/TC007/02.png" alt="TC007 - visualização mobile reduzida" width="150"> &nbsp;→&nbsp; <img src="./docs/evidencias/plano-de-testes/TC007/03.png" alt="TC007 - visualização desktop" width="150"> |
| Problema encontrado | N/A |
| Correção realizada | N/A |
| Nova execução | N/A |
