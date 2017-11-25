# Руководство по написанию документации Electron

Это руководство для написания Electron документации.

## Названия

* Каждая страница должна иметь один заголовок `#` в верхней части.
* Главы на одной странице должны иметь `##` - уровень названий.
* В подзаголовках необходимо увеличить количество `#` в названии согласно их вложенной глубине.
* Все слова в названии страницы должны быть заглавными, за исключением союзов как «из» и «и».
* Только первое слово название главы должны быть заглавными.

Используйте `Быстрый старт` как пример:

```markdown
# Быстрый старт (Quick Start)

... 

## Главный процесс (Main process)

... 

## Процесс отображения (Renderer process)

... 

## Запуск вашего приложения (Run your app)

... 

### Запуск в качестве дистрибутива (Run as a distribution)

... 

### Ручная загрузка бинарных файлов Electron

...
```

Для ссылок на API есть исключения из этого правила.

## Markdown правила

* Используйте `bash` вместо `cmd` в блоках кода (за счет выделения синтаксиса).
* Строки должны быть ограничены в 80 столбцов.
* Не делать вложенные списки более чем 2 уровня (из-за markdown отображения).
* Все блоки кода `js` и `javascript` проверяются линтером по [standard-markdown](http://npm.im/standard-markdown).

## Выбор слов

* Используйте "будет" над "был бы" при описании результатов.
* Предпочитайте "в ___ процессе" чем "в".

## Справочник по API

Следующие правила применяются только к документации по API-интерфейсам.

### Название страницы

Каждая страница должна использовать имя фактического объекта, возвращенное `require('electron')` как название, такие как `BrowserWindow`, `autoUpdater` и `session`.

Под страницей названия должна быть однострочное описание, начиная с `>`.

Используйте `session` как пример:

```markdown
# session

> Управление сеансами браузера, куками, кешем, настройками прокси и т.д.
```

### Методы и события модуля

Для модулей, которые не являются классами, методы и события должны быть перечислены под главами `## Методы` и `## События` .

Используйте `autoUpdater` как пример:

```markdown
# autoUpdater

## События (Events) 

### Event: 'error' 

## Методы (Methods)

### `autoUpdater.setFeedURL(url[, requestHeaders])`
```

### Классы

* Классы API или классы, которые являются частью модулей должны быть перечислены под главой `## Class: TheClassName`.
* Одна страница может иметь несколько классов.
* Конструкторы должны быть перечислены с `###`-уровнем названия.
* [Статические методы](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static) должны быть перечислены под главой `### Статические методы`.
* [Методы экземпляра](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Prototype_methods) должны быть перечислены под главой `### Методы экземпляра`.
* Все методы, которые возвращают значение должно начинаться с описания "Возвращают `[TYPE]` - Возвращают описание" 
  * If the method returns an `Object`, its structure can be specified using a colon followed by a newline then an unordered list of properties in the same style as function parameters.
* Instance Events must be listed under an `### Instance Events` chapter.
* Instance Properties must be listed under an `### Instance Properties` chapter. 
  * Instance properties must start with "A [Property Type] ..."

Используйте классы `Session` и `Cookies` в качестве примера:

```markdown
# session

## Methods

### session.fromPartition(partition)

## Properties

### session.defaultSession

## Class: Session

### Instance Events

#### Event: 'will-download'

### Instance Methods

#### `ses.getCacheSize(callback)`

### Instance Properties

#### `ses.cookies`

## Class: Cookies

### Instance Methods

#### `cookies.get(filter, callback)`
```

### Методы

Методы главы должны быть в следующем виде:

```markdown
### `objectName.methodName(required[, optional]))`

* `required` String - описание параметра. 
* `optional` Integer (опционально) - еще одно описание параметра.
  ...
```

The title can be `###` or `####`-levels depending on whether it is a method of a module or a class.

For modules, the `objectName` is the module's name. For classes, it must be the name of the instance of the class, and must not be the same as the module's name.

For example, the methods of the `Session` class under the `session` module must use `ses` as the `objectName`.

The optional arguments are notated by square brackets `[]` surrounding the optional argument as well as the comma required if this optional argument follows another argument:

    required[, optional]
    

Below the method is more detailed information on each of the arguments. The type of argument is notated by either the common types:

* [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
* [`Number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
* [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
* [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
* [`Boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
* или пользовательский тип как Electron [`WebContent`](api/web-contents.md)

If an argument or a method is unique to certain platforms, those platforms are denoted using a space-delimited italicized list following the datatype. Values can be `macOS`, `Windows`, or `Linux`.

```markdown
* `animate` Boolean (optional) _macOS_ _Windows_ - Animate the thing.
```

`Array` type arguments must specify what elements the array may include in the description below.

The description for `Function` type arguments should make it clear how it may be called and list the types of the parameters that will be passed to it.

### События

The events chapter must be in following form:

```markdown
### Event: 'wake-up'

Returns:

* `time` String

...
```

The title can be `###` or `####`-levels depending on whether it is an event of a module or a class.

The arguments of an event follow the same rules as methods.

### Свойства

Свойства главы должны быть в следующем виде:

```markdown
### session.defaultSession

...
```

The title can be `###` or `####`-levels depending on whether it is a property of a module or a class.

## Переводы документации

Переводы документов Electron находятся в папке `docs-translations`.

Чтобы добавить другой набор (или частичный набор):

* Создайте подкаталог с именем аббревиатуры языка.
* Перевод файлов.
* Обновите `README.md` ссылки на файлы в папке языка, которые вы переводили.
* Add a link to your translation directory on the main Electron [README](https://github.com/electron/electron#documentation-translations).

Note that the files under `docs-translations` must only include the translated ones, the original English files should not be copied there.