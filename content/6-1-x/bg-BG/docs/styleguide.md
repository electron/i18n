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
# Quick Start

...

## Main process

...

## Renderer process

...

## Run your app

...

### Run as a distribution

...

### Manually downloaded Electron binary

...
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
* All methods that have a return value must start their description with "Returns `[TYPE]` - Return description"
  * Ако методът връща `Обект`, то неговата структура може да бъде описана с двоеточие ":", последвано от нов ред, следвано от несортиран списък със свойства, описани в същия стил на функционалните параметри.
* Инстантни събития трябва да бъдат изброени под глава `### Инстантни събития`.
* Instance Properties must be listed under an `### Instance Properties` chapter.
  * Инстантни свойства трябва да започват с "А [Тип на свойството]"

Използваме на класове `Session` и `Cookies` като един пример:

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

#### `ses.getCacheSize()`

### Instance Properties

#### `ses.cookies`

## Class: Cookies

### Instance Methods

#### `cookies.get(filter, callback)`
```

### Методи

Глава методи трябва да бъде в следния вид:

```markdown
### `objectName.methodName(required[, optional]))`

* `required` String - A parameter description.
* `optional` Integer (optional) - Another parameter description.

...
```

Заглавието може да бъде в нива `###` или `####` в зависимост от това дали е метод за модул или за клас.

For modules, the `objectName` is the module's name. For classes, it must be the name of the instance of the class, and must not be the same as the module's name.

Например методите на класа `Session` под модул `session` трябва да използват `ses` като `имеНаОбект`.

Незадължителни аргументи са записани с квадратни скоби `[]` които обграждат незадължителен аргумент, както се изисква и запетая, ако този незадължителен аргумент следва друг аргумент:

```sh
задължително [, по избор]
```

Below the method is more detailed information on each of the arguments. The type of argument is notated by either the common types:

* [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
* [`Number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
* [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
* [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
* [`Boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
* Или от персонален тип като този от Електрон [`WebContent`](api/web-contents.md)

If an argument or a method is unique to certain platforms, those platforms are denoted using a space-delimited italicized list following the datatype. Values can be `macOS`, `Windows` or `Linux`.

```markdown
* `animate` Boolean (по избор) _macOS_ _Windows_ - Анимация за нещо.
```

Аргументи от тип `Array` трябва да опише какви елементи може да включва в описанието по-долу.

Описанието за аргументи от тип `Function` трябва ясно да обясни как може да се нарече и да опише списъка на параметрите, които ще бъдат прехвърлени към него.

### Събития

Глава методи трябва да бъде в следния вид:

```markdown
### Събитие: 'wake-up'

Връща:

* `time` String

...
```

Заглавието може да бъде в нива `###` или `####` в зависимост от това дали е събитие за модул или за клас.

Аргументите на събитието следват същите правила като правилата за методи.

### Свойства

Глава свойства трябва да бъде в следния вид:

```markdown
### session.defaultSession

...
```

Заглавието може да бъде в нива `###` или `####` в зависимост от това дали е свойство за модул или за клас.

## Превод на документацията

Виж [electron/electron-i18n](https://github.com/electron/i18n#readme)
