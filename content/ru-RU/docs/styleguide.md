# Руководство по стилю документации Electron

Это руководство для написания Electron документации.

## Headings

* Каждая страница должна иметь один заголовок `#` в верхней части.
* Chapters in the same page must have `##`-level headings.
* Sub-chapters need to increase the number of `#` in the heading according to their nesting depth.
* The page's title must follow [APA title case][title-case].
* All chapters must follow [APA sentence case][sentence-case].

Используйте `Быстрый старт` как пример:

```markdown
# Быстрый старт

...

## Основной процесс

...

## Процесс визуализации

...

## Запустите приложение

...

### Запустите как дистрибутив

...

### Ручная загрузка файла Electron

...
```

Для ссылок на API есть исключения из этого правила.

## Markdown правила

This repository uses the [`markdownlint`][markdownlint] package to enforce consistent Markdown styling. For the exact rules, see the `.markdownlint.json` file in the root folder.

There are a few style guidelines that aren't covered by the linter rules:

<!--TODO(erickzhao): make sure this matches with the lint:markdownlint task-->
* Используйте `sh` вместо `cmd` в блоках кода (из-за синтаксической подсветки).
* Keep line lengths between 80 and 100 characters if possible for readability purposes.
* Не делать вложенные списки более чем 2 уровня (из-за markdown отображения).
* Все блоки кода `js` и `javascript` проверяются линтером по [standard-markdown](https://www.npmjs.com/package/standard-markdown).
* For unordered lists, use asterisks instead of dashes.

## Выбор слов

* Используйте "будет" вместо "был бы" при описании результатов.
* Предпочитайте "в ___ процессе" чем "в".

## Справочник по API

Следующие правила применяются только к документации по API.

### Title and description

Each module's API doc must use the actual object name returned by `require('electron')` as its title (such as `BrowserWindow`, `autoUpdater`, and `session`).

Directly under the page title, add a one-line description of the module as a markdown quote (beginning with `>`).

Using the `session` module as an example:

```markdown
# session

> Управление сеансами браузера, куками, кешем, настройками прокси и т.д.
```

### Методы и события модуля

Для модулей, которые не являются классами, методы и события должны быть перечислены под главами `## Методы` и `## События` .

Используйте `autoUpdater` как пример:

```markdown
# autoUpdater

## События 

### Событие: 'error' 

## Методы 

### `autoUpdater.setFeedURL(url[, requestHeaders])`
```

### Классы

* Классы API или классы, которые являются частью модулей должны быть перечислены под главой `## Класс: НазваниеКласса`.
* Одна страница может иметь несколько классов.
* Constructors must be listed with `###`-level headings.
* [Static Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static) must be listed under a `### Static Methods` chapter.
* [Instance Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Prototype_methods) must be listed under an `### Instance Methods` chapter.
* All methods that have a return value must start their description with "Returns `[TYPE]` - [Return description]"
  * If the method returns an `Object`, its structure can be specified using a colon followed by a newline then an unordered list of properties in the same style as function parameters.
* События экземпляров, должны быть перечислены под главой `### События экземпляра`.
* Свойства экземпляра должны быть перечислены в разделе `### Свойства экземпляра`.
  * Instance Properties must start with "A [Property Type] ..."

Используйте классы `Session` и `Cookies` в качестве примера:

```markdown
# session

## Методы

### session.fromPartition(partition)

## Статические свойства

### session.defaultSession

## Class: Session

### События экземпляра

#### Event: 'will-download'

### Методы экземпляра

#### `ses.getCacheSize()`

### Свойства экземпляра

#### `ses.cookies`

## Class: Cookies

### Методы экземпляра

#### `cookies.get(filter, callback)`
```

### Methods and their arguments

Методы главы должны быть в следующем виде:

```markdown
### `objectName.methodName(required[, optional])`

* `required` String - Описание параметра.
* `optional` Integer (необязательно) - Описание другого параметра.

...
```

#### Heading level

The heading can be `###` or `####`-levels depending on whether the method belongs to a module or a class.

#### Function signature

For modules, the `objectName` is the module's name. For classes, it must be the name of the instance of the class, and must not be the same as the module's name.

Например, методы класса `Session` под модулем `session` должны использовать `ses` как `objectName`.

Optional arguments are notated by square brackets `[]` surrounding the optional argument as well as the comma required if this optional argument follows another argument:

```markdown
required[, optional]
```

#### Argument descriptions

More detailed information on each of the arguments is noted in an unordered list below the method. The type of argument is notated by either JavaScript primitives (e.g. `String`, `Promise`, or `Object`), a custom API structure like Electron's [`Cookie`](api/structures/cookie.md), or the wildcard `any`.

If the argument is of type `Array`, use `[]` shorthand with the type of value inside the array (for example,`any[]` or `String[]`).

If the argument is of type `Promise`, parametrize the type with what the promise resolves to (for example, `Promise<void>` or `Promise<String>`).

If an argument can be of multiple types, separate the types with `|`.

Описание аргументов типа `Function` должно дать понять, как это может быть вызвано и перечислить типы параметров, которые будут переданы ему.

#### Platform-specific functionality

Если аргумент или метод является уникальным для определенных платформ, эти платформы обозначаются списком, разделенных пробелами, после типа данных. Значения могут быть `macOS`, `Windows` или `Linux`.

```markdown
* `animate` Boolean (по усмотрению) _macOS_ _Windows_ - анимировать вещь.
```

### События

Глава события должна быть в следующем виде:

```markdown
### Событие: 'wake-up'

Возвращает:

* `time` String

...
```

The heading can be `###` or `####`-levels depending on whether the event belongs to a module or a class.

Аргументы события следуют тем же правилам методов.

### Свойства

Глава свойства должна быть в следующем виде:

```markdown
### session.defaultSession

...
```

The heading can be `###` or `####`-levels depending on whether the property belongs to a module or a class.

## Documentation translations

См. [electron/i18n](https://github.com/electron/i18n#readme)

[title-case]: https://apastyle.apa.org/style-grammar-guidelines/capitalization/title-case
[sentence-case]: https://apastyle.apa.org/style-grammar-guidelines/capitalization/sentence-case
[markdownlint]: https://github.com/DavidAnson/markdownlint
