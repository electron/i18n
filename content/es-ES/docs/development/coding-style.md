# Estilo de código

Estas son las pautas de estilo para la codificación en Electron.

Para mostrar los problemas de estilo detectados por `cpplint` y `eslint`, puede ejecutar `npm run lint`.

## C++ y Python

For C++ and Python, we follow Chromium's [Coding Style](https://www.chromium.org/developers/coding-style). You can use [clang-format](clang-format.md) to format the C++ code automatically. There is also a script `script/cpplint.py` to check whether all files conform.

La versión de Python que estamos utilizando actualmente es Python 2.7.

El código de C ++ utiliza una gran cantidad de abstracciones y tipos de Chromium, por lo que se recomienda familiarizarse con ellos. A good place to start is Chromium's [Important Abstractions and Data Structures](https://www.chromium.org/developers/coding-style/important-abstractions-and-data-structures) document. El documento menciona algunos tipos especiales, tipos de ámbito (que liberan automáticamente su memoria cuando salen del ámbito), mecanismos de registro etc.

## JavaScript

* Write [standard](https://npm.im/standard) JavaScript style.
* File names should be concatenated with `-` instead of `_`, e.g. `file-name.js` rather than `file_name.js`, because in [github/atom](https://github.com/github/atom) module names are usually in the `module-name` form. Esta regla solo aplica a archivos `.js`.
* Use la sintaxis ES6 / ES2015 más nueva cuando corresponda 
  * [`const`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const) for requires and other constants
  * [`let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let) para definir variables
  * [Arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) instead of `function () { }`
  * [Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) instead of string concatenation using `+`

## Nombrar cosas

Las API de Electron utilizan el esquema de capitalización usado en Node.js:

* Cuando el módulo en sí mismo es una clase como `BrowserWindow`, use `CamelCase`.
* Cuando el módulo es un conjunto de APIs, como `globalShortcut`, use `mixedCase`.
* When the API is a property of object, and it is complex enough to be in a separate chapter like `win.webContents`, use `mixedCase`.
* For other non-module APIs, use natural titles, like `<webview> Tag` or `Process Object`.

When creating a new API, it is preferred to use getters and setters instead of jQuery's one-function style. For example, `.getText()` and `.setText(text)` are preferred to `.text([text])`. There is a [discussion](https://github.com/electron/electron/issues/46) on this.