# Стиль кода

Это руководство по стилю кодирования для Electron.

Вы пожете запустить `npm run lint` для того чтобы получить список проблемных мест по стилю кода, найденных с помощью `cpplint` и `eslint`.

## Общий код

* Завершать файлы новой строкой.
* Размещать требования в следующем порядке: 
  * Модули Node (такие как `path`)
  * Модули Electron (такие как `ipc`, `app`)
  * Локальные модули (используя относительные пути)
* Размещать свойства класса в следующем порядке: 
  * Методы и свойства класса (методы, начинающиеся на `@`)
  * Методы и свойства экземпляра
* Избегайте платформо-зависимого кода: 
  * Используйте `path.join()` для связывания имен файлов.
  * Использовать `os.tmpdir()` лучше, чем `/tmp` когда вам нужно сослаться на временный каталог.
* Используйте `return` при явном возврате в конце функции. 
  * Не используйте `return null`, `return undefined`, `null` or `undefined`

## C++ и Python

Для C++ и Python мы следуем [стилю кодирования](https://www.chromium.org/developers/coding-style) Chromium. Для автоматического форматирования кода на C++ вы можете использовать [clang-format](clang-format.md). Есть также скрипт `script/cpplint.py`, позволяющий проверить, что все файлы соответствуют стилю.

Версией Python, которую мы используем в настоящее время, является Python 2.7.

Код C++ использует многожество абстракций и типов Chrome, поэтому рекомендуется ознакомиться с ними. Хорошее место чтобы начать это [Important Abstractions and Data Structures](https://www.chromium.org/developers/coding-style/important-abstractions-and-data-structures) из документации по Chromium. Документ упоминает некоторые специальные типы, областные типы (которые автоматически освобождают используемую ими память при выходе из области), механизмы логирования и т. д.

## Документация

* Используйте [remark](https://github.com/remarkjs/remark) markdown стиль.

Вы можете выполнить команду `npm run lint-docs` чтобы убедиться, что ваши изменения документации корректно отформатированы.

## JavaScript

* Пишите в стиле, [стандартном](https://npm.im/standard) для JavaScript.
* Имена файлов должны соединяться через `-` вместо `_`, например, `file-name.js` вместо `file_name.js`, поскольку имена в [github/atom](https://github.com/github/atom) обычно пишутся в форме `module-name`. Это правило применяется только к `.js`-файлам.
* Используйте новый синтаксис ES6/ES2015 там, где это уместно 
  * [`const`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const) для требований и других констан
  * [`let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let) для определения переменных
  * [Стрелочные функции](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Functions/Arrow_functions) вместо `function () { }`
  * [Шаблонные литералы](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) вместо конкатенации строк с использованием `+`

## Именование сущностей

Electron API использует ту же схему капитализации, что и Node.js:

* Когда сам модуль является классом `BrowserWindow`, используйте `PascalCase`.
* Когда модуль представляет собой набор API, например, `globalShortcut`, используйте `camelCase`.
* Когда API это свойство объекта, и оно обладает достаточной сложностью для помещения в отдельную главу, как например `win.webContents`, используйте `mixedCase`.
* Для других немодульных API используйте естественные заголовки, такие как `<webview> Tag` или `Process Object`.

При создании нового API предпочтительнее использовать геттеры и сеттеры вместо jQuery стиль одной функции. Для примера, `.getText()` и `.setText(text)` предпочтительнее `.text([text])`. [Здесь](https://github.com/electron/electron/issues/46) обсуждение данной темы.
