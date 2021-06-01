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
* Using a plain `return` when returning explicitly at the end of a function.
  * Not `return null`, `return undefined`, `null` or `undefined`

## C++ e Python

For C++ and Python, we follow Chromium's [Coding Style](https://chromium.googlesource.com/chromium/src/+/refs/heads/main/styleguide/styleguide.md). You can use [clang-format](clang-format.md) to format the C++ code automatically. There is also a script `script/cpplint.py` to check whether all files conform.

The Python version we are using now is Python 2.7.

The C++ code uses a lot of Chromium's abstractions and types, so it's recommended to get acquainted with them. A good place to start is Chromium's [Important Abstractions and Data Structures](https://www.chromium.org/developers/coding-style/important-abstractions-and-data-structures) document. The document mentions some special types, scoped types (that automatically release their memory when going out of scope), logging mechanisms etc.

## Documentação

* Write [remark](https://github.com/remarkjs/remark) markdown style.

You can run `npm run lint-docs` to ensure that your documentation changes are formatted correctly.

## JavaScript

* Write [standard](https://www.npmjs.com/package/standard) JavaScript style.
* File names should be concatenated with `-` instead of `_`, e.g. `file-name.js` rather than `file_name.js`, because in [github/atom](https://github.com/github/atom) module names are usually in the `module-name` form. This rule only applies to `.js` files.
* Use newer ES6/ES2015 syntax where appropriate
  * [`const`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const) for requires and other constants.  If the value is a primitive, use uppercase naming (eg `const NUMBER_OF_RETRIES = 5`).
  * [`let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let) for defining variables
  * [Arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) instead of `function () { }`
  * [Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) instead of string concatenation using `+`

## Naming Things

As APIs do Electron usam o mesmo esquema de capitalização do Node.js:

* Quando o módulo em si é uma classe como `BrowserWindow`, use `PascalCase`.
* Quando o módulo é um conjunto de APIs, como `globalShortcut`, use `camelCase`.
* Quando a API é uma propriedade de objeto, e é complexo o suficiente para estar em capítulo separado como `win.webContents`, use `mixedCase`.
* Para outras APIs não-módulo, use títulos naturais, como `<webview> Tag` ou `Process Object`.

Ao criar uma nova API, é preferível usar getters e setters em vez de estilo de uma função do jQuery. For example, `.getText()` and `.setText(text)` are preferred to `.text([text])`. There is a [discussion](https://github.com/electron/electron/issues/46) on this.
