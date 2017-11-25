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
  * Если метод возвращает `Object`, его структуру можно указать с помощью двоеточия, следующие строки в виде неупорядоченного списка свойств в том же стиле параметров функции.
* Экземпляр событий, должнен быть перечислены под `### Instance Events` главой.
* Свойства экземпляра должны быть перечислены под `### Instance Properties` главой. 
  * Свойства экземпляра должно начинаться с "[Property Type] ..."

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

Название может быть`###` или`####`-уровня в зависимости от того, является ли эти методы модуля или класса.

Для модулей, `objectName` это имя модуля. Для классов это должны быть имена экземпляров класса и не должны быть таким же, как имя модулей.

Например, методы класса `Session` под модулем `session` должны использовать `ses` как `objectName`.

Необязательные аргументы нотированы в квадратные скобки `[]` окружают необязательный аргумент, а также запятая, если за необязательным аргументом следует еще один аргумент:

    required[, optional]
    

Ниже метода объявляется более подробная информация о каждом из аргументов. Тип аргумента нотируется из общих типов:

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

Глава события должна быть в следующем виде:

```markdown
### Event: 'wake-up'

Returns:

* `time` String

...
```

Название может быть`###` или`####`-уровня в зависимости от того, является ли это событие модуля или класса.

Аргументы события следуют тем же правилам методов.

### Свойства

Свойства главы должны быть в следующем виде:

```markdown
### session.defaultSession

...
```

Название может быть`###` или`####`-уровня в зависимости от того, является ли это свойство модуля или класса.

## Переводы документации

Переводы документов Electron находятся в папке `docs-translations`.

Чтобы добавить другой набор (или частичный набор):

* Создайте подкаталог с именем аббревиатуры языка.
* Перевод файлов.
* Обновите `README.md` ссылки на файлы в папке языка, которые вы переводили.
* Добавьте ссылку в главном каталоге вашего перевода Electron на [README](https://github.com/electron/electron#documentation-translations).

Обратите внимание, что файлы в `docs-translations` должны включать только переведённое, оригинальные Английские файлы не должны копироваться туда.