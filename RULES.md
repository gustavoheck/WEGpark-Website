# Manual de padronização

Este documento consolida as diretrizes técnicas, arquiteturais e de processos adotadas no desenvolvimento do ecossistema frontend. Todos os desenvolvedores devem seguir estritamente estas definições para garantir a consistência, escalabilidade e qualidade do código.
---

## Stack

---

## Regras de Escrita

---

## 1. Arquitetura do Sistema

---

## 2. Estrutura de Pastas e Encapsulamento

---

## 3. Metodologia de Organização de Repositório Git (GitFlow)

Adotamos o fluxo de ramificação **GitFlow** para gerenciar de forma previsível as entregas, correções de bugs e ciclos de releases de software.

```
                  ┌───────── Master (Produção) ◄───────────────┐
                  │                                            │
                  │              ▲ (Hotfix)                    │ (Release / Hotfix)
                  ▼              │                             │
    ┌────────► Release ──────────┴─────────────────────────────┤
    │                                                          │
    │             ▲ (Merge de Features / Bugfixes)             │
    │             │                                            │
    │   ┌─────► Develop ───────────────────────────────────────┘
    │   │         ▲
    │   │         │ (Feature / Bugfix)
    │   │         ▼
    └───┴─── Feature / Bugfix
```

### 3.1. Principais Branches e Regras de Proteção

| Branch | Origem recomendada | Destino de Integration | Permissões / Regras de Acesso |
| :--- | :--- | :--- | :--- |
| `master` (ou `main`) | `release` ou `hotfix` | *Nenhum (ponto final)* | **Bloqueada para push direto.** Recebe apenas merges formais de releases ou hotfixes testados. Sempre contém tag de versão (Ex: `v1.2.0`). Representa o estado em produção. |
| `release` | `develop` | `master` e `develop` | **Bloqueada para push direto.** Contém o código candidato a produção. Passa por testes de regressão e correção de bugs finais. |
| `develop` | - | `release` | **Bloqueada para push direto.** É a branch de integração contínua do desenvolvimento. Todas as features prontas são integradas aqui. |
| `feature/` | `develop` | `develop` | **Livre para escrita dos desenvolvedores.** Utilizada para codificar novas funcionalidades. O merge de volta para `develop` é feito estritamente via Pull Request (PR) com revisão de código. |
| `bugfix/` | `develop` ou `release` | `develop` ou `release` | **Livre para escrita.** Similar à branch de feature, mas com foco exclusivo na resolução de defeitos identificados durante o ciclo de testes em desenvolvimento/homologação. |
| `hotfix/` | `master` | `master` e `develop` | **Livre para escrita de engenheiros autorizados.** Branch temporária de alta prioridade para sanar problemas críticos diretamente em produção. |

---

### 3.2. Comandos Principais e Fluxo de Trabalho

#### Inicialização do Repositório (Obrigatório)
Sempre que clonar o repositório ou precisar reconfigurar o GitFlow localmente, execute o seguinte comando e certifique-se de preencher as perguntas com os padrões definidos abaixo:

```bash
git flow init
```

##### ⚠️ CONFIGURAÇÃO REQUERIDA (Durante o `git flow init`):
* **Branch para releases de produção:** `master` (ou `main`)
* **Branch para integração/desenvolvimento:** `develop`
* **Prefixo de ramificação de Feature:** `feature/`
* **Prefixo de ramificação de Bugfix:** `bugfix/`
* **Prefixo de ramificação de Release:** `release/`
* **Prefixo de ramificação de Hotfix:** `hotfix/`
* **Prefixo de ramificação de Support:** `support/`
* **Prefixo de tag de versão:** `v` (Ex: `v1.0.0`)

---

#### Ciclo de Desenvolvimento de Novas Funcionalidades (Feature)

1. **Iniciar a Feature:**
   Cria a branch local `feature/nome-da-feature` a partir da `develop` mais atualizada.
   ```bash
   git flow feature start nome-da-feature
   ```

2. **Publicar a Feature:**
   Sobe a branch para o servidor de origem remoto para que seu progresso esteja seguro e visível.
   ```bash
   git flow feature publish nome-da-feature
   ```

3. **Abrir Pull Request (PR):**
   > 📢 **IMPORTANTE:** Sempre que publicar uma branch de feature/bugfix, você deve acessar a interface web do repositório (GitHub, GitLab, Azure DevOps) e **abrir uma Pull Request (PR) para a branch `develop`**. O merge definitivo da funcionalidade na `develop` ocorrerá via ferramenta após a aprovação de code review e testes integrados.

---

#### Ciclo de Correção de Defeitos em Desenvolvimento ou Homologação (Bugfix)

1. **Iniciar o Bugfix:**
   Cria a branch local `bugfix/nome-do-bug` a partir da `develop` (ou da release correspondente).
   ```bash
   git flow bugfix start nome-do-bug
   ```

2. **Publicar o Bugfix:**
   Envia a branch de correção para o servidor remoto.
   ```bash
   git flow bugfix publish nome-do-bug
   ```

---

#### Ciclo de Preparação para Lançamento (Release)

1. **Iniciar a Release:**
   Reúne todo o código acumulado na `develop` em uma ramificação de homologação sob uma versão específica.
   ```bash
   git flow release start 1.2.0
   ```

2. **Publicar a Release:**
   Garante que a equipe de QA (Quality Assurance) possa baixar o código e realizar os testes de fumaça e homologação no ambiente correspondente.
   ```bash
   git flow release publish 1.2.0
   ```

3. **Finalizar a Release (Remoto):**
   Após a validação, a release deve ser finalizada, fazendo o merge para a `master`, gerando a respectiva tag de versão (Ex: `v1.2.0`) e atualizando a `develop` com quaisquer correções de última hora feitas no ambiente de homologação. (Recomenda-se realizar este merge via PR/Pipeline de CI/CD para manter a integridade das branches protegidas).

---

#### Ciclo de Correções Críticas Emergenciais em Produção (Hotfix)

1. **Iniciar o Hotfix:**
   Cria uma branch a partir da `master` em produção para consertar um bug crítico que está afetando usuários finais instantaneamente.
   ```bash
   git flow hotfix start 1.0.1
   ```

2. **Publicar o Hotfix:**
   Envia a correção urgente para o servidor para revisão.
   ```bash
   git flow hotfix publish 1.0.1
   ```

3. **Conclusão:**
   Semelhante à release, o hotfix concluído é incorporado diretamente de volta à `master` (gerando nova tag, ex: `v1.0.1`) e também mesclado de volta para a `develop` para assegurar que a correção não se perca no próximo ciclo regular de deploy.
---