# Electron Documentation Style Guide

Це рекомендації для написання документації Electron.

## Заголовки

* Кожна сторінка має мати єдиний заголовок рівня `#` у верхній частині.
* Розділи цієї сторінки мають мати заголовки рівня `##`.
* Підрозділи мають збільшувати кількість `#` згідно глибини вкладеності.
* Всі слова в заголовку сторінки мають писатися з великої літери, за винятком сполучників таких як "з" чи "і".
* Тільки перше слово заголовку розділу має писатися з великої літери.

Для прикладу `Швидкий старт`:

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

Для довідника API є деякі винятки з цих правил.

## Правила Markdown

* Використовуйте `sh` замість `cmd` в блоках коду (згідно синтаксису підсвітки).
* Лінії мають вкладатися в 80 стовпчиків.
* Списки не можуть мати вкладеність більшу ніж 2 рівні (згідно візуалізатору markdown).
* Всі `js` та `javascript` блоки коду перевіряються за допопмогою [standard-markdown](http://npm.im/standard-markdown).

## Підбір слів

* Використовуйте "буде" замість "б" коли описуєте результати.
* Надавайте перевагу "в процесі ___", а не "далі".

## Довідник API

Наступні правила застосовуються тільки для API документації.

### Заголовок сторінки

Кожна сторінка повинна використовувати актуальне ім'я об'єкту як назву, що повертається з `require('electron')`, як-от `BrowserWindow`, `autoUpdater` і `session`.

Під заголовком сторінки має бути стрічка опису, яка починається з `>`.

Для прикладу `session`:

```markdown
# session

> Управління сесією браузера, кукі, кешем, налаштуваннями проксі і тд.
```

### Методи та події модуля

Для модулів, що не є класами, їхні методи та події мають бути перелічені під `## Методи` та `## Події` розділами.

Для прикладу `autoUpdater`:

```markdown
# autoUpdater

## Події

### Подія: 'error'

## Методи

### `autoUpdater.setFeedURL(url[, requestHeaders])`
```

### Класи

* API класи або класи, які є частиною модулів, повинні бути перераховані в розділі `## Клас: TheClassName`.
* Одна сторінка може мати кілька класів.
* Конструктори, повинні бути перераховані на `###` рівні.
* [Статичні методи](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static) мають бути перераховані в розділі `### Статичні Методи`.
* [Методи об'єкта класу](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Prototype_methods) повинні бути перераховані в главі `### Методи Екземпляру`.
* All methods that have a return value must start their description with "Returns `[TYPE]` - Return description"
  * Якщо метод повертає `Object`, його структура може бути визначена з використанням двокрапки потім з нового рядка невпорядкований список властивостей у стилі параметрів функції.
* Події об'єкта класу повинні бути перераховані в розділі `### Події Еекземпляру`.
* Instance Properties must be listed under an `### Instance Properties` chapter.
  * Власстивості об'єкта класу мають починатися з "A [тип властивості] ..."

Для прикладу `Session` та `Cookies` класи:

```markdown
# session

## Methods

### session.fromPartition(partition)

## Static Properties

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

Розділи методів мають мати наступну форму:

```markdown
### `objectName.methodName(required[, optional]))`

* `required` String - A parameter description.
* `optional` Integer (optional) - Another parameter description.

...
```

Заголовок може мати рівні `###` чи `####` в залежності від того, чи це метод модуля чи класу.

For modules, the `objectName` is the module's name. For classes, it must be the name of the instance of the class, and must not be the same as the module's name.

Наприклад, методи класу `Session` у модулі `session` повинні використовувати `ses` як `objectName`.

Необов'язкові аргументи мають бути зазначені в квадратні дужки `[]`, що оточують необов'язковий аргумент, а також кома, якщо за необов'язковим аргументом слідує ще один аргумент:

```sh
required[, optional]
```

Below the method is more detailed information on each of the arguments. The type of argument is notated by either the common types:

* [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
* [`Number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
* [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
* [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
* [`Boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
* Чи нестандартний тип як Electron's [`WebContent`](api/web-contents.md)

Якщо аргумент або метод є унікальним для певних платформ, тоді ці платформи позначаються списком які розділені пробілами та виділені курсивом після типу даних (datatype). Значення може бути `macOS`, `Windows` або `Linux`.

```markdown
* `animate` Boolean (optional) _macOS_ _Windows_ - Animate the thing.
```

Аргументи типу `Array` повинні вказувати, які саме елементи включає масив та бути вказані в описі нижче.

В описі аргументів для типу `Function` повинно бути чітко зазначено, як саме мають бути названі та перелік типів цих аргументів, що будуть передані в функцію.

### Події (Events)

Розділи подій мають мати наступну форму:

```markdown
### Event: 'wake-up'

Повертає:

* `time` String

...
```

Назва повинна починатися з `###` або `####`-рівня в залежності від того, це подія модуля чи класу.

Аргументи події слідують тим же правилам що й методи.

### Властивості (Properties)

Розділи властивостей мають мати наступну форму:

```markdown
### session.defaultSession

...

```

Назва повинна починатися з `###` або `####`-рівня в залежності від того, це властивість модуля чи класу.

## Переклади документації

Дивіться на [electron/electron-i18n](https://github.com/electron/i18n#readme)
