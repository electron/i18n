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
* Using a plain `return` when returning explicitly at the end of a function.
  * Не `return null`, не `return undefined`, не `null` или `undefined`

## C++ и Python

Для C++ и Python мы следуем [стилю кодирования](https://chromium.googlesource.com/chromium/src/+/refs/heads/main/styleguide/styleguide.md) Chromium. Для автоматического форматирования кода на C++ вы можете использовать [clang-format](clang-format.md). Есть также скрипт `script/cpplint.py`, позволяющий проверить, что все файлы соответствуют стилю.

Версией Python, которую мы используем в настоящее время, является Python 2.7.

Код C++ использует многожество абстракций и типов Chrome, поэтому рекомендуется ознакомиться с ними. Хорошее место чтобы начать это [Important Abstractions and Data Structures](https://www.chromium.org/developers/coding-style/important-abstractions-and-data-structures) из документации по Chromium. Документ упоминает некоторые специальные типы, областные типы (которые автоматически освобождают используемую ими память при выходе из области), механизмы логгирования и т. д.

## Документация

* Используйте стиль разметки [remark](https://github.com/remarkjs/remark).

Вы можете выполнить команду `npm run lint-docs` чтобы убедиться, что ваши изменения документации корректно отформатированы.

## JavaScript

* Пишите в стиле [стандартном](https://www.npmjs.com/package/standard) для JavaScript.
* Имена файлов должны соединяться через `-` вместо `_`, например, `file-name.js` вместо `file_name.js`, поскольку имена в [github/atom](https://github.com/github/atom) обычно пишутся в форме `module-name`. Это правило применяется только к `.js`-файлам.
* Используйте новый синтаксис ES6/ES2015 там, где это уместно
  * [`const`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const) для requires и прочих постоянных значений.  Если значение примитивно, используйте имя в верхнем регистре (например, `const NUMBER_OF_RETRIES = 5`).
  * [`let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let) для определения переменных
  * [Стрелочные функции](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Functions/Arrow_functions) вместо `function () { }`
  * [Используйте шаблоны литералов](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) вместо конкатенации строк с использованием `+`

## Именование сущностей

Electron APIs использует ту же схему капитализации, что и Node.js:

* Если сам модуль является классом, напр. `BrowserWindow`, используйте `PascalCase`.
* Если модуль является набором API, напр. `globalShortcut`, используйте `camelCase`.
* Когда API это свойство объекта, и оно обладает достаточной сложностью для помещения в отдельную главу, как например `win.webContents`, используйте `mixedCase`.
* Для всех других не модульных API используйте естественные названия, напр. ` Tag` или `Process Object`.

При создании новых API рекомендуется использовать getters и setters вместо одной функции для доступа в типичном для jQuery стиле. Например, `.getText()` и `.setText(text)` более предпочтительны, чем `.text([text])`. См. обсуждение этой темы [здесь](https://github.com/electron/electron/issues/46).
