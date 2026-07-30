# Plano de Testes — WEGpark

Este documento contém o plano de testes de interface da aplicação WEGpark, elaborado antes da execução, cobrindo as principais funcionalidades do sistema (login, veículos, ocorrências, gestão de usuários, etc.), conforme exigido na avaliação prática da Unidade Curricular de Programação Front-End.

**Legenda de prioridade:** Alta / Média / Baixa

## Plano de testes

| Código | Funcionalidade testada | Objetivo do teste | Pré-condições | Dados utilizados | Etapas de execução | Resultado esperado | Prioridade | Responsável |
|---|---|---|---|---|---|---|---|---|
| TC001 | Login com credenciais válidas | Verificar se o usuário consegue autenticar-se com e-mail e senha válidos | Usuário previamente cadastrado e ativo na base | E-mail: usuario.teste@wegpark.com / Senha: ******** | 1. Acessar `/login`<br>2. Informar e-mail<br>3. Informar senha<br>4. Clicar em "Entrar" | Usuário autenticado e redirecionado para a tela inicial do seu perfil | Alta | A definir |
| TC002 | Login com credenciais inválidas | Verificar mensagem de erro ao informar senha incorreta | Usuário previamente cadastrado | E-mail válido / Senha incorreta | 1. Acessar `/login`<br>2. Informar e-mail válido<br>3. Informar senha incorreta<br>4. Clicar em "Entrar" | Mensagem de erro exibida, sem expor detalhes internos da API, usuário permanece na tela de login | Alta | A definir |
| TC003 | Cadastro de veículo | Verificar se o colaborador/visitante consegue cadastrar um novo veículo (POST) | Usuário autenticado com papel de colaborador ou visitante | Placa: ABC1D23 / Modelo, cor e demais campos obrigatórios preenchidos | 1. Acessar `/veiculos`<br>2. Clicar em "Adicionar veículo"<br>3. Preencher formulário<br>4. Confirmar cadastro | Veículo cadastrado com sucesso, mensagem de confirmação exibida e lista atualizada automaticamente | Alta | A definir |
| TC004 | Validação de formulário de cadastro de veículo | Verificar se o formulário impede o envio de dados inválidos ou incompletos | Usuário autenticado, na tela de cadastro de veículo | Placa em formato inválido / campo obrigatório em branco | 1. Acessar `/veiculos/adicionar`<br>2. Deixar campo obrigatório vazio ou inserir placa inválida<br>3. Tentar submeter o formulário | Formulário não é enviado; mensagens de validação são exibidas nos campos correspondentes | Alta | A definir |
| TC005 | Edição de veículo | Verificar se as alterações em um veículo já cadastrado são salvas corretamente (PUT/PATCH) | Veículo previamente cadastrado pelo usuário autenticado | Alteração do campo "cor" do veículo | 1. Acessar `/veiculos/[id]/editar`<br>2. Alterar campo desejado<br>3. Salvar alterações | Dado é atualizado com sucesso, mensagem de confirmação exibida e refletida na listagem | Média | A definir |
| TC006 | Exclusão de veículo | Verificar se o usuário consegue excluir um veículo cadastrado (DELETE) | Veículo previamente cadastrado, sem outros vínculos | Veículo de teste cadastrado anteriormente | 1. Acessar `/veiculos`<br>2. Selecionar o veículo<br>3. Clicar em excluir<br>4. Confirmar exclusão no diálogo | Veículo removido da listagem e mensagem de confirmação exibida | Média | A definir |
| TC007 | Carregamento e estado de loading das ocorrências | Verificar se a interface exibe indicação visual de carregamento enquanto os dados da API são buscados | Usuário autenticado com acesso à tela de ocorrências | N/A | 1. Acessar `/ocorrencias`<br>2. Observar o comportamento da tela durante o carregamento | Skeleton/spinner de carregamento exibido até os dados chegarem, sem quebra de layout | Média | A definir |
| TC008 | Comportamento diante de indisponibilidade da API | Verificar o comportamento da aplicação quando a API não responde ou retorna erro | API indisponível ou variável `NEXT_PUBLIC_API_URL` apontando para endereço inválido | N/A | 1. Derrubar/simular indisponibilidade da API<br>2. Acessar uma tela que consome dados (ex: `/veiculos`)<br>3. Observar comportamento da interface | Mensagem de erro amigável exibida, sem exposição de detalhes internos, sem quebra da aplicação | Alta | A definir |
| TC009 | Navegação entre telas via sidebar | Verificar se a navegação entre as telas do dashboard funciona corretamente conforme o papel do usuário | Usuário autenticado | N/A | 1. Autenticar com um usuário de determinado papel<br>2. Clicar em cada item disponível na sidebar<br>3. Verificar se a rota correspondente é carregada | Cada item da sidebar leva à tela correta; apenas itens permitidos ao papel do usuário são exibidos | Alta | A definir |
| TC010 | Responsividade (Desktop x Mobile) | Verificar se a aplicação se adapta corretamente a diferentes tamanhos de tela | Usuário autenticado | N/A | 1. Acessar a aplicação em resolução desktop<br>2. Redimensionar para resolução mobile (ou usar DevTools)<br>3. Verificar sidebar, formulários, cards e tabelas | Layout se reorganiza sem quebras, elementos permanecem legíveis e utilizáveis em ambas resoluções | Média | A definir |
| TC011 | Criação de usuário pelo RH | Verificar se o RH consegue criar um novo usuário no sistema | Usuário autenticado com papel de RH | Dados de um novo colaborador/guarita a ser cadastrado | 1. Acessar `/gestao-usuarios/cadastrar`<br>2. Preencher os dados do novo usuário<br>3. Confirmar cadastro | Usuário criado com sucesso, mensagem de confirmação exibida e novo usuário aparece na listagem | Alta | A definir |
| TC012 | Feedback visual de sucesso e erro | Verificar se mensagens de sucesso e erro são exibidas de forma clara após operações de cadastro/edição/exclusão | Usuário autenticado | Operação de cadastro/edição/exclusão válida e inválida | 1. Realizar uma operação válida (ex: cadastrar veículo)<br>2. Observar mensagem de sucesso<br>3. Realizar uma operação inválida (ex: dados incompletos)<br>4. Observar mensagem de erro | Mensagens de sucesso e erro exibidas de forma consistente, visível e compreensível ao usuário | Média | A definir |

## Registro da execução dos testes

Preencher após a execução de cada teste sobre a versão final/candidata à entrega. Nenhum teste deve ser marcado como aprovado se a evidência (print de tela) demonstrar falha na funcionalidade.

| Código | Resultado obtido | Situação | Evidência | Problema encontrado | Correção realizada | Nova execução |
|---|---|---|---|---|---|---|
| TC001 | | ☐ Aprovado ☐ Reprovado | | | | |
| TC002 | | ☐ Aprovado ☐ Reprovado | | | | |
| TC003 | | ☐ Aprovado ☐ Reprovado | | | | |
| TC004 | | ☐ Aprovado ☐ Reprovado | | | | |
| TC005 | | ☐ Aprovado ☐ Reprovado | | | | |
| TC006 | | ☐ Aprovado ☐ Reprovado | | | | |
| TC007 | | ☐ Aprovado ☐ Reprovado | | | | |
| TC008 | | ☐ Aprovado ☐ Reprovado | | | | |
| TC009 | | ☐ Aprovado ☐ Reprovado | | | | |
| TC010 | | ☐ Aprovado ☐ Reprovado | | | | |
| TC011 | | ☐ Aprovado ☐ Reprovado | | | | |
| TC012 | | ☐ Aprovado ☐ Reprovado | | | | |
