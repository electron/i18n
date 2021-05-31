# Estilo de código

Estas son las pautas de estilo para la codificación en Electron.

Para mostrar los problemas de estilo detectados por `cpplint` y `eslint`, puede ejecutar `npm run lint`.

## Código general

* Termine los archivos con una nueva linea vacía.
* Coloque los requires en el siguiente orden:
  * Módulos incorporados en Node (tal como `path`)
  * Módulos incorporados en Electron (tal como `ipc`, `app`)
  * Módulos locales (usando rutas relativas)
* Coloque las propiedades de la case en el siguiente orden:
  * Métodos y propiedades de la clase (métodos que empiezan con un `@`)
  * Instancia métodos y propiedades
* Evitar código dependiente de la plataforma:
  * Use `path.join()` para concatenar nombres de archivos.
  * Use `os.tmpdir()` en lugar de `/tmp` cuando necesite referencias el directorio temporal.
* Usar una `return` simple cuando se devuelve explícitamente al final de una función.
  * No `return null`, `return undefined`, `null` o `undefined`

## C++ y Python

Para C++ y Python, seguimos el [estilo de código](https://chromium.googlesource.com/chromium/src/+/refs/heads/main/styleguide/styleguide.md) de Chromium. Puede usar el formato [clang-format](clang-format.md) para el código C++ automáticamente. También hay un script `script/cpplint.py` para comprobar si todos los archivos se cumplen con los requisitos.

La versión de Python que estamos utilizando actualmente es Python 2.7.

El código de C ++ utiliza una gran cantidad de abstracciones y tipos de Chromium, por lo que se recomienda familiarizarse con ellos. Un buen lugar para empezar es el documento de Chromium [Important Abstractions and Data Structures](https://www.chromium.org/developers/coding-style/important-abstractions-and-data-structures). El documento menciona algunos tipos especiales, tipos de ámbito (que liberan automáticamente su memoria cuando salen del ámbito), mecanismos de registro etc.

## Documentación

* Escribe [remark](https://github.com/remarkjs/remark) estilo markdown.

Puede ejecutar `npm run lint-docs` para asegurarse de que los cambios en su documentación tengan el formato correcto.

## JavaScript

* Escribe el estilo JavaScript [estándar](https://www.npmjs.com/package/standard).
* Los nombres de los archivos deben concatenarse con `-` en lugar de `_`, por ejemplo `file-name.js` en vez de `file_name.js`, porque en el módulo [github/atom](https://github.com/github/atom) los nombres están generalmente en la forma `module-name`. Esta regla solo aplica a archivos `.js`.
* Use la sintaxis ES6 / ES2015 más nueva cuando corresponda
  * [`const`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const) Para solicitudes y otras constantes.  Si el valor es un primitivo, use nombre en mayúsculas (por ejemplo, `const NUMBER_OF_RETRIES = 5`).
  * [`let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let) para definir variables
  * [Arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) en lugar de `function () { }`
  * [Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) en lugar de el uso de cadenas concatenadas `+`

## Nombrar cosas

Las API de Electron utilizan el esquema de capitalización usado en Node.js:

* Cuando el módulo en sí es una clase similar a `BrowserWindow`, use `PascalCase`.
* Cuando el módulo es un conjunto de APIs, similar a `globalShortcut`, use `camelCase`.
* Cuando la API es una propiedad de objeto, y es lo suficientemente compleja para estar en un capítulo separado como `win.webContents`, utilice `mixedCase`.
* Para otras APIs que no sean módulos, utilice títulos naturales, similar a `<webview> Tag` o `Process Object`.

Cuando se crea una nueva API, se prefiere utilizar captadores y establecedores en lugar del estilo one-function de JQuery. Por ejemplo, se prefiere `.getText()` y `.setText(text)`, en lugar de `.text([text])`. Hay una [discussion](https://github.com/electron/electron/issues/46) sobre esto.
