# Guia de componentes - WEGpark

Este guia registra os padroes visuais que estao em uso na interface do WEGpark. Ele deve ser consultado ao criar ou revisar telas para preservar a consistencia entre formulários, listas, cards e feedbacks.

## Fundamentos visuais

### Cores

| Uso | Token | Valor |
| --- | --- | --- |
| Fundo principal | `background` | `#FCFCFD` |
| Texto principal | `foreground` | `#191B1F` |
| Acao principal e sidebar | `primary` | `#00579D` |
| Acao principal selecionada | `primary-selected` | `#00335C` |
| Acao secundaria | `secondary` | `#EF8300` |
| Superficies neutras | `muted` | `oklch(0.97 0 0)` |
| Erro e acao destrutiva | `destructive` | `oklch(0.577 0.245 27.325)` |
| Bordas e campos | `border` / `input` | `oklch(0.922 0 0)` |

As cores sao definidas como variaveis CSS em `src/app/globals.css` e devem ser usadas pelos tokens do Tailwind, como `bg-primary`, `text-muted-foreground` e `border-input`.

### Tipografia

- Fonte: Geist, carregada pelo Next.js;
- corpo: `text-sm` como base em componentes e `text-base` em campos no mobile;
- titulos de card: `text-base`, peso medio;
- titulos de secao: componente `SectionTitle`;
- textos auxiliares: `text-sm text-muted-foreground`.

### Espacamento e raios

- escala de espacamento do Tailwind: `gap-2`, `gap-3`, `gap-4`, `p-4` e `p-5` sao os padroes predominantes;
- cards: espacamento interno padrao de `1rem` (`spacing(4)`);
- campos: altura `h-10` no mobile e `md:h-9` no desktop;
- botoes: altura padrao `h-8`, com variantes `sm` e `lg` quando necessario;
- campos e botoes: `rounded-lg`;
- cards: `rounded-xl`;
- raio global: `0.625rem`.

## Componentes reutilizaveis

### Botoes

Use `Button` de `src/components/ui/button.tsx`.

| Variante | Quando usar |
| --- | --- |
| `default` | Acao principal, como salvar ou confirmar |
| `secondary` | Acao secundaria com destaque visual |
| `outline` | Acao complementar sem competicao com a principal |
| `ghost` | Acao discreta em listas e barras de ferramentas |
| `destructive` | Remocao, desativacao ou outra acao irreversivel |
| `link` | Navegacao textual e acoes de baixa enfase |

Todo botao deve informar claramente a acao e usar `disabled` durante uma mutacao pendente para evitar envios duplicados.

### Campos e formularios

- Use `Input`, `Select`, `Label` e `FormField` como base;
- associe cada campo a um `label` e a uma mensagem de erro compreensivel;
- valide dados com schemas Zod e React Hook Form;
- use `aria-invalid` para campos invalidos;
- nao use apenas cor para comunicar erro.

### Cards, listas e tabelas

- Use `Card` para agrupar informacoes relacionadas;
- use `DisplayCard` para estados vazios ou erros de listagem;
- em telas responsivas, mantenha cards no mobile e tabelas/linhas condensadas quando houver largura suficiente;
- preserve titulos, descricoes e acoes de cada item visiveis e acessiveis.

### Dialogos

- Use `Dialog` para acoes que precisam de contexto adicional;
- use `AlertDialog` para confirmacao de acoes destrutivas, como desativacao;
- descreva a consequencia da acao e ofereca uma alternativa clara de cancelamento.

### Feedbacks

| Situacao | Componente ou padrao |
| --- | --- |
| Carregamento de lista | `Skeleton` |
| Nenhum resultado | `DisplayCard` com descricao orientativa |
| Erro de carregamento | `DisplayCard` com variante destrutiva |
| Sucesso ou falha de operacao | `toast.add` com tipo `success` ou `error` |
| Acao em andamento | Botao desabilitado e estado pendente da mutacao |

As mensagens devem explicar o resultado sem expor detalhes internos da API.

## Responsividade e acessibilidade

- Desenvolva primeiro para telas pequenas e acrescente breakpoints `sm`, `md` e `lg` quando necessario;
- a sidebar deve poder ser acessada em dispositivos moveis;
- mantenha controles acionaveis por teclado e foco visivel;
- use contrastes adequados entre texto, fundo e estados de erro;
- icones sem texto devem possuir rotulo acessivel.

## Referencias no codigo

- Tokens: `src/app/globals.css`;
- Botoes: `src/components/ui/button.tsx`;
- Campos: `src/components/ui/input.tsx`;
- Cards: `src/components/ui/card.tsx`;
- Toasts: `src/components/ui/toast.tsx`;
- Estados vazios e de erro: `src/shared/components/molecules/DisplayCard.tsx`.
