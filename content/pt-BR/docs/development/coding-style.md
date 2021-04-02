# Estilo de Codificação

Essas são as diretrizes para programar no Electron.

Você pode executar `npm run lint` para visualizar qualquer problemas de estilos detectados com `cpplint` e `eslint`.

## Código em Geral

* Termine arquivos com uma nova linha.
* Apresente condições na seguinte ordem:
  * Módulos internos do Node (assim como `path`)
  * Módulos internos do Electron (assim como `ipc`, `app`)
  * Módulos locais (usando caminhos relativos)
* Apresente propriedades de classe na seguinte ordem:
  * Métodos e propriedades de classe (métodos começando com um `@`)
  * Instancie métodos e propriedades
* Evite código dependente à uma plataforma:
  * Use `path.join()` para concatenar nome de arquivos.
  * Use `os.tmpdir()` ao invés de `/tmp` quando você precisar fazer referência ao diretório temporário.
* Usar um `return` simples ao retornar explicitamente no final de uma função.
  * Não `return null`, `return undefined`, `null` ou `undefined`

## C++ e Python

Para C++ e Python, seguimos o [coding Style da Chromium](https://www.chromium.org/developers/coding-style). Você pode usar [](clang-format.md) em formato clang para formatar o código C++automaticamente. Há também um script `script/cpplint.py` para verificar se todos os arquivos estão em conformidade.

A versão Python que estamos usando agora é Python 2.7.

O código C++ usa muitas abstrações e tipos de Cromo, por isso é recomendado para se familiarizar com eles. Um bom lugar para começar é [documento de abstrações e estruturas](https://www.chromium.org/developers/coding-style/important-abstractions-and-data-structures) de dados  importantes do Chromium. O documento menciona alguns tipos especiais, tipos escopo (que liberam automaticamente sua memória ao sair do escopo), mecanismos de registro etc.

## Documentação

* Escreva [comentário](https://github.com/remarkjs/remark) estilo de marcação.

Você pode executar `npm run lint-docs` para garantir que as alterações da documentação sejam formatadas corretamente.

## JavaScript

* Escreva [padrão](https://www.npmjs.com/package/standard) estilo JavaScript.
* Os nomes dos arquivos devem ser concatenados com `-` em vez de `_`, por exemplo, `file-name.js` em vez de `file_name.js`, porque em [os nomes do módulo de](https://github.com/github/atom) github/átomo geralmente estão em a forma `module-name` . Essa regra só se aplica a `.js` arquivos.
* Use a sintaxe ES6/ES2015 mais nova, quando for o caso
  * [`const`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const) para as requerações e outras constantes.  Se o valor for primitivo, use nomeação maiúsdia (por exemplo, `const NUMBER_OF_RETRIES = 5`).
  * [`let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let) para definir variáveis
  * [seta funciona](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) em vez de `function () { }`
  * [Modelo literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) em vez de concatenação de string usando `+`

## Nomeando coisas

As APIs do Electron usam o mesmo esquema de capitalização do Node.js:

* Quando o módulo em si é uma classe como `BrowserWindow`, use `PascalCase`.
* Quando o módulo é um conjunto de APIs, como `globalShortcut`, use `camelCase`.
* Quando a API é uma propriedade de objeto, e é complexo o suficiente para estar em capítulo separado como `win.webContents`, use `mixedCase`.
* Para outras APIs não-módulo, use títulos naturais, como `<webview> Tag` ou `Process Object`.

Ao criar uma nova API, é preferível usar getters e setters em vez de estilo de uma função do jQuery. Por exemplo, `.getText()` e `.setText(text)` são preferidos para `.text([text])`. Há uma [discussão](https://github.com/electron/electron/issues/46) sobre isso.
