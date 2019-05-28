# Стиль кода

Это руководство по стилю кодирования для Electron.

Вы пожете запустить `npm run lint` для того чтобы получить список проблемных мест по стилю кода, найденных с помощью `cpplint` и `eslint`.

## Оформление кода

* Завершайте все файлы переводом строки.
* Размещайте require в следующем порядке: 
  * Встроенные модули Node (такие как `path`)
  * Встроенные модули Electron (такие как `ipc`, `app`)
  * Локальные модули (используя относительные пути)
* Размещайте свойства классов в следующем порядке: 
  * Методы и свойства класса (названия методов должны начинаться с `@`)
  * Методы и свойства объекта (экземпляра)
* Избегайте платформенно-зависимого кода: 
  * Используйте `path.join()` для конкатенации имен файлов.
  * Используйте `os.tmpdir()` вместо `/tmp` когда нужно сослаться на каталог для временных файлов.
* Используйте просто `<0>return</0>` при явном возврате в конце функций. 
  * Не `return null`, не `return undefined`, не `null` или `undefined`

## C++ и Python

Для C++ и Python мы следуем [стилю кодирования](https://www.chromium.org/developers/coding-style) Chromium. Для автоматического форматирования кода на C++ вы можете использовать [clang-format](clang-format.md). Есть также скрипт `script/cpplint.py`, позволяющий проверить, что все файлы соответствуют стилю.

Версией Python, которую мы используем в настоящее время, является Python 2.7.

Код C++ использует многожество абстракций и типов Chrome, поэтому рекомендуется ознакомиться с ними. Хорошее место чтобы начать это [Important Abstractions and Data Structures](https://www.chromium.org/developers/coding-style/important-abstractions-and-data-structures) из документации по Chromium. Документ упоминает некоторые специальные типы, областные типы (которые автоматически освобождают используемую ими память при выходе из области), механизмы логгирования и т. д.

## Документация

* Используйте стиль разметки [remark](https://github.com/remarkjs/remark).

Вы можете выполнить команду `npm run lint-docs` чтобы убедиться, что ваши изменения документации корректно отформатированы.

## JavaScript

* Пишите в стиле [стандартном](https://npm.im/standard) для JavaScript.
* Имена файлов должны соединяться через `-` вместо `_`, например, `file-name.js` вместо `file_name.js`, поскольку имена в [github/atom](https://github.com/github/atom) обычно пишутся в форме `module-name`. Это правило применяется только к `.js`-файлам.
* Используйте новый синтаксис ES6/ES2015 там, где это уместно 
  * [`const`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const) для requires и прочих постоянных значений
  * [`let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let) для определения переменных
  * [Стрелочные функции](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Functions/Arrow_functions) вместо `function () { }`
  * [Используйте шаблоны литералов](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) вместо конкатенации строк с использованием `+`

## Именование сущностей

Electron APIs использует ту же схему капитализации, что и Node.js:

* When the module itself is a class like `BrowserWindow`, use `PascalCase`.
* When the module is a set of APIs, like `globalShortcut`, use `camelCase`.
* Когда API это свойство объекта, и оно обладает достаточной сложностью для помещения в отдельную главу, как например `win.webContents`, используйте `mixedCase`.
* For other non-module APIs, use natural titles, like `<webview> Tag` or `Process Object`.

When creating a new API, it is preferred to use getters and setters instead of jQuery's one-function style. For example, `.getText()` and `.setText(text)` are preferred to `.text([text])`. There is a [discussion](https://github.com/electron/electron/issues/46) on this.