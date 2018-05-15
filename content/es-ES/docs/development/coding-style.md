# Estilo de código

Estas son las pautas de estilo para la codificación en Electron.

Para mostrar los problemas de estilo detectados por `cpplint` y `eslint`, puede ejecutar `npm run lint`.

## General Code

* End files with a newline.
* Place requires in the following order: 
  * Built in Node Modules (such as `path`)
  * Built in Electron Modules (such as `ipc`, `app`)
  * Local Modules (using relative paths)
* Place class properties in the following order: 
  * Class methods and properties (methods starting with a `@`)
  * Instance methods and properties
* Avoid platform-dependent code: 
  * Use `path.join()` to concatenate filenames.
  * Use `os.tmpdir()` rather than `/tmp` when you need to reference the temporary directory.
* Using a plain `return` when returning explicitly at the end of a function. 
  * Not `return null`, `return undefined`, `null` or `undefined`

## C++ y Python

Para C++ y Python, seguimos el [estilo de código](https://www.chromium.org/developers/coding-style) de Chromium. Puede usar el formato [clang-format](clang-format.md) para el código C++ automáticamente. También hay un script `script/cpplint.py` para comprobar si todos los archivos se cumplen con los requisitos.

La versión de Python que estamos utilizando actualmente es Python 2.7.

El código de C ++ utiliza una gran cantidad de abstracciones y tipos de Chromium, por lo que se recomienda familiarizarse con ellos. Un buen lugar para empezar es el documento de Chromium [Important Abstractions and Data Structures](https://www.chromium.org/developers/coding-style/important-abstractions-and-data-structures). El documento menciona algunos tipos especiales, tipos de ámbito (que liberan automáticamente su memoria cuando salen del ámbito), mecanismos de registro etc.

## Documentación

* Write [remark](https://github.com/remarkjs/remark) markdown style

You can run `npm run lint-docs` to ensure that your documentation changes are formatted correctly.

## JavaScript

* Escribe el estilo JavaScript [estándar](https://npm.im/standard).
* Los nombres de los archivos deben concatenarse con `-` en lugar de `_`, por ejemplo `file-name.js` en vez de `file_name.js`, porque en el módulo [github/atom](https://github.com/github/atom) los nombres están generalmente en la forma `module-name`. Esta regla solo aplica a archivos `.js`.
* Use la sintaxis ES6 / ES2015 más nueva cuando corresponda 
  * [`const`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const) Para solicitudes y otras constantes
  * [`let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let) para definir variables
  * [Arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) en lugar de `function () { }`
  * [Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) en lugar de el uso de cadenas concatenadas `+`

## Nombrar cosas

Las API de Electron utilizan el esquema de capitalización usado en Node.js:

* When the module itself is a class like `BrowserWindow`, use `PascalCase`.
* When the module is a set of APIs, like `globalShortcut`, use `camelCase`.
* Cuando la API es una propiedad de objeto, y es lo suficientemente compleja para estar en un capítulo separado como `win.webContents`, utilice `mixedCase`.
* For other non-module APIs, use natural titles, like `<webview> Tag` or `Process Object`.

Cuando se crea una nueva API, se prefiere utilizar captadores y establecedores en lugar del estilo one-function de JQuery. Por ejemplo, se prefiere `.getText()` y `.setText(text)`, en lugar de `.text([text])`. Hay una [discussion](https://github.com/electron/electron/issues/46) sobre esto.