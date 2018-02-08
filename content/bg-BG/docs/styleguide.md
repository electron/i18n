# Стилове за писане на Electron документация

В настоящият документ са описани основните стилове ползвани при дефиниране на документация за проект Electron.

## Заглавия

* Всяка страница трябва да има единствено заглавие с ниво `#` в горната си част.
* Главите в същата страница трябва да има заглавия с ниво `#`.
* Под-главите трябва да увеличат броя на `#` в заглавието според дълбочината им.
* Всички думи в заглавието на страницата трябва да бъдат капитализирани, освен съюзи като "на", "и".
* Само първата дума от заглавието на дадена глава трябва да бъде капитализирана.

Използване на `Бързо стартиране` като пример:

```markdown
# Бързо стартиране ... ## Основен процес ... ## Рендериращ процес ... ## Изпълни твоето приложение ... ### Изпълни като дистрибутор ... ### Ръчно изтегли бинарния Електрон ...
```

За API насоки има изключения от това правило.

## Markdown правила

* Използване на `sh` вместо `cmd` в блокове от код (поради синтактичните подчертавания).
* Редовете трябва да са завършени в 80 колони.
* Без вложени списъци с повече от 2 нива (поради рендерирането на Markdown).
* Всички `js` и `javascript` блокове от код са ограничени с [standard-markdown](http://npm.im/standard-markdown).

## Използване на думи

* Използвате "ще" вместо "щеше", когато описвате резултат.
* Предпочете "в ___ процеса" вместо "на".

## Функционална документация

Следващите правила се отнасят само за функционалната документация (API).

### Заглавие на страницата

Всяка страница трябва да използвате името на самия обект, върнат от `require('electron')` като заглавието, `BrowserWindow`, `autoUpdater` и `session`.

Под заглавието на страницата трябва да има един ред с описание, започващо с `>`.

Използваме `session` като пример:

```markdown
# session

> Управлява сесиите в браузъра, бисквитките, кеша, proxy настройките и др.
```

### Модулни методи и събития

За модулите, които не са класове, техните методи и събития трябва да бъдат изброени под главите `## Методи` и `## Събития`.

Използваме `autoUpdater` като пример:

```markdown
# autoUpdater

## Събития

### Събитие: 'error'

## Методи

### `autoUpdater.setFeedURL(url[, requestHeaders])`
```

### Класове

* API класове или класове, които са част от модулите трябва да бъдат изброени под главата `## Клас: ИмеНаКласа`.
* Една страница може да има множество класове.
* Конструкторите трябва да бъдат изброени със заглавия от ниво `#`.
* [Статични методи](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static) трябва да бъдат изброени под глава `### Статични методи`.
* [Инстантни методи](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Prototype_methods) трябва да бъдат изброени под глава `### Инстантни методи`.
* Всички методи, които връщат стойност, трябва да започнат своето описание с "Връща `[ТИП]` - описание на върнатото" 
  * Ако методът връща `Обект`, то неговата структура може да бъде описана с двоеточие ":", последвано от нов ред, следвано от несортиран списък със свойства, описани в същия стил на функционалните параметри.
* Инстантни събития трябва да бъдат изброени под глава `### Инстантни събития`.
* Инстантни свойства трябва да бъдат изброени под глава `### Инстантни свойства` . 
  * Инстантни свойства трябва да започват с "А [Тип на свойството]"

Използваме на класове `Session` и `Cookies` като един пример:

```markdown
# session

## Методи

### session.fromPartition(partition)

## Свойства

### session.defaultSession

## Клас: Session

### Инстантни събития

#### Събитие: 'will-download'

### Инстантни методи
```

### Методи

Глава методи трябва да бъде в следния вид:

```markdown
### `objectName.methodName(required[, optional]))`

* `required` String - A parameter description.
* `optional` Integer (optional) - Another parameter description.

...
```

The title can be `###` or `####`-levels depending on whether it is a method of a module or a class.

For modules, the `objectName` is the module's name. For classes, it must be the name of the instance of the class, and must not be the same as the module's name.

For example, the methods of the `Session` class under the `session` module must use `ses` as the `objectName`.

The optional arguments are notated by square brackets `[]` surrounding the optional argument as well as the comma required if this optional argument follows another argument:

```sh
required[, optional]
```

Below the method is more detailed information on each of the arguments. The type of argument is notated by either the common types:

* [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
* [`Number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
* [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
* [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
* [`Boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
* Or a custom type like Electron's [`WebContent`](api/web-contents.md)

If an argument or a method is unique to certain platforms, those platforms are denoted using a space-delimited italicized list following the datatype. Values can be `macOS`, `Windows`, or `Linux`.

```markdown
* `animate` Boolean (optional) _macOS_ _Windows_ - Animate the thing.
```

`Array` type arguments must specify what elements the array may include in the description below.

The description for `Function` type arguments should make it clear how it may be called and list the types of the parameters that will be passed to it.

### Events

The events chapter must be in following form:

```markdown
### Event: 'wake-up'

Returns:

* `time` String

...
```

The title can be `###` or `####`-levels depending on whether it is an event of a module or a class.

The arguments of an event follow the same rules as methods.

### Properties

The properties chapter must be in following form:

```markdown
### session.defaultSession

...
```

The title can be `###` or `####`-levels depending on whether it is a property of a module or a class.

## Documentation Translations

See [electron/electron-i18n](https://github.com/electron/electron-i18n#readme)