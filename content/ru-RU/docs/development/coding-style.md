# Стиль кода

Это руководство по стилю кодирования для Electron.

Вы пожете запустить `npm run lint` для того чтобы получить список проблемных мест по стилю кода, найденных с помощью `cpplint` и `eslint`.

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
* Using a plain `возврат` when returning explicitly at the end of a function. 
  * Not `return null`, `return undefined`, `null` or `undefined`

## C++ и Python

Для C++ и Python мы следуем [стилю кодирования](https://www.chromium.org/developers/coding-style) Chromium. Для автоматического форматирования кода на C++ вы можете использовать [clang-format](clang-format.md). Есть также скрипт `script/cpplint.py`, позволяющий проверить, что все файлы соответствуют стилю.

Версией Python, которую мы используем в настоящее время, является Python 2.7.

Код C++ использует многожество абстракций и типов Chrome, поэтому рекомендуется ознакомиться с ними. Хорошее место чтобы начать это [Important Abstractions and Data Structures](https://www.chromium.org/developers/coding-style/important-abstractions-and-data-structures) из документации по Chromium. The document mentions some special types, scoped types (that automatically release their memory when going out of scope), logging mechanisms etc.

## Документация

* Write [remark](https://github.com/remarkjs/remark) markdown style

You can run `npm run lint-docs` to ensure that your documentation changes are formatted correctly.

## JavaScript

* Пишите в стиле [стандартном](https://npm.im/standard) для JavaScript.
* Имена файлов должны соединяться через `-` вместо `_`, например, `file-name.js` вместо `file_name.js`, поскольку имена в [github/atom](https://github.com/github/atom) обычно пишутся в форме `module-name`. Это правило применяется только к `.js`-файлам.
* Используйте новый синтаксис ES6/ES2015 там, где это уместно 
  * [`const`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const) for requires and other constants
  * [`let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let) для определения переменных
  * [Arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) instead of `function () { }`
  * [Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) instead of string concatenation using `+`

## Именование сущностей

Electron APIs использует ту же схему капитализации, что и Node.js:

* When the module itself is a class like `BrowserWindow`, use `PascalCase`.
* When the module is a set of APIs, like `globalShortcut`, use `camelCase`.
* Когда API это свойство объекта, и оно обладает достаточной сложностью для помещения в отдельную главу, как например `win.webContents`, используйте `mixedCase`.
* For other non-module APIs, use natural titles, like `<webview> Tag` or `Process Object`.

When creating a new API, it is preferred to use getters and setters instead of jQuery's one-function style. For example, `.getText()` and `.setText(text)` are preferred to `.text([text])`. There is a [discussion](https://github.com/electron/electron/issues/46) on this.