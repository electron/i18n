# Стиль документації Electron

Це рекомендації для написання документації Electron.

## Заголовки

* Кожна сторінка має мати єдиний заголовок рівня `#` у верхній частині.
* Розділи цієї сторінки мають мати заголовки рівня `##`.
* Підрозділи мають збільшувати кількість `#` згідно глибини вкладеності.
* Всі слова в заголовку сторінки мають писатися з великої літери, за винятком сполучників таких як "з" чи "і".
* Тільки перше слово заголовку розділу має писатися з великої літери.

Для прикладу `Швидкий старт`:

```markdown
# Швидкий Старт

...

## Загальний процес

...

## Процес візуалізації

...

## Запуск додатку

...

### Запустити як дистрибутив

...

### Завантажити вручну бібліотеку Electron

...
```

Для довідника API є деякі винятки з цих правил.

## Правила Markdown

* Використовуйте `bash` замість `cmd` в блоках коду (згідно синтаксису підсвітки).
* Лінії мають вкладатися в 80 стовпчиків.
* Списки не можуть мати вкладеність більшу ніж 2 рівні ( згідно візуалізатору markdown).
* Всі `js` та `javascript` блоки коду перевіряються за допопмогою [standard-markdown](http://npm.im/standard-markdown).

## Підбір слів

* Використовуйте "буде" замість "б" коли описуєте результати.
* Надавайте перевагу "в процесі ___", а не "далі".

## Довідник API

Наступні правила застосовуються тільки для API документації.

### Заголовок сторінки

Кожна сторінка повинна використовувати ім'я фактичного об'єкта, що повертається з `require('electron')`, як назву, такі як `BrowserWindow`, `autoUpdater` і `session`.

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
* [Методи об'єкта класу](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Prototype_methods) повинні біти перераховані в главі `### Методи Екземпляру`.
* Опис всіх методів, що повертають значення, повинен починатися з "Повертає `[TYPE]` - Опис повернення" 
  * Якщо метод повертає `Object`, його структура може бути визначена з використанням двокрапки потім з нового рядка невпорядкований список властивостей у стилі параметрів функції.
* Події об'єкта класу повинні бути перераховані в розділі `### Події Еекземпляру`.
* Властивості об'єкта класу повинні бути перераховані в `### Instance Properties` розділі. 
  * Власстивості об'єкта класу мають починатися з "A [тип властивості] ..."

Для прикладу `Session` та `Cookies` класи:

```markdown
# session

## Методи

### session.fromPartition(partition)

## Властивості

### session.defaultSession

## Клас: Session

### Події екзкмпляру

#### Подія: 'will-download'

### Методи екземпляру

#### `ses.getCacheSize(callback)`

### Властивості екземпляру

#### `ses.cookies`

## Клас: Cookies

### Методи екземпляру

#### `cookies.get(filter, callback)`
```

### Методи

Розділи методів мають мати наступну форму:

```markdown
### `objectName.methodName(required[, optional]))`

* `required` String - Опис параметру.
* `optional` Integer (optional) - Інший опис параметру.

...
```

Заголовок може мати рівні `###` чи `####` в залежності від того, чи це метод модуля чи класу.

Для модулів, `objectName` це ім'я модуля. Для класів це повинно бути імена екземплярів класу і не повинні бути такими ж як і ім'я модулів.

For example, the methods of the `Session` class under the `session` module must use `ses` as the `objectName`.

The optional arguments are notated by square brackets `[]` surrounding the optional argument as well as the comma required if this optional argument follows another argument:

    required[, optional]
    

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

Translations of the Electron docs are located within the `docs-translations` directory.

To add another set (or partial set):

* Create a subdirectory named by language abbreviation.
* Translate the files.
* Update the `README.md` within your language directory to link to the files you have translated.
* Add a link to your translation directory on the main Electron [README](https://github.com/electron/electron#documentation-translations).

Note that the files under `docs-translations` must only include the translated ones, the original English files should not be copied there.