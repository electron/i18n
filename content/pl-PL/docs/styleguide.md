# Electron Documentation Styleguide

To są wytyczne do pisania dokumentacji Electron.

## Titles

* Each page must have a single `#`-level title at the top.
* Chapters in the same page must have `##`-level titles.
* Sub-chapters need to increase the number of `#` in the title according to their nesting depth.
* All words in the page's title must be capitalized, except for conjunctions like "of" and "and" .
* Only the first word of a chapter title must be capitalized.

Używając `Quick Start` jako przykładu:

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

Istnieją wyjątki od tej reguły dla odwołań do API.

## Markdown rules

* Używaj `sh` zamiast `cmd` w code blocks (z powodu podświetlacza składni).
* Linie powinny być zawinięte na 80 kolumnie.
* No nesting lists more than 2 levels (due to the markdown renderer).
* All `js` and `javascript` code blocks are linted with [standard-markdown](http://npm.im/standard-markdown).

## Wybieranie słów

* Use "will" over "would" when describing outcomes.
* Prefer "in the ___ process" over "on".

## API references

Poniższe reguły zaliczają się tylko dla dokumentacji API.

### Tytuł strony

Każda strona musi używać nazwę obiektu zwracaną przez `require('electron')` jako tytuł, jak na przykład `BrowserWindow`, `autoUpdater`, oraz `session`.

Pod tytułem strony musi być jedno liniowy komentarz rozpoczynający się `>`.

Używając `session` jako przykład:

```markdown
# session

> Zarządzaj sesjami przeglądarki, ciasteczkami, cache, ustawieniami proxy, itd.
```

### Module methods and events

For modules that are not classes, their methods and events must be listed under the `## Methods` and `## Events` chapters.

Using `autoUpdater` as an example:

```markdown
# autoUpdater

## Events

### Event: 'error'

## Methods

### `autoUpdater.setFeedURL(url[, requestHeaders])`
```

### Classes

* API classes or classes that are part of modules must be listed under a `## Class: TheClassName` chapter.
* One page can have multiple classes.
* Constructors must be listed with `###`-level titles.
* [Static Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static) must be listed under a `### Static Methods` chapter.
* [Instance Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Prototype_methods) must be listed under an `### Instance Methods` chapter.
* All methods that have a return value must start their description with "Returns `[TYPE]` - Return description" 
  * If the method returns an `Object`, its structure can be specified using a colon followed by a newline then an unordered list of properties in the same style as function parameters.
* Instance Events must be listed under an `### Instance Events` chapter.
* Instance Properties must be listed under an `### Właściwości instancji` chapter. 
  * Instance properties must start with "A [Property Type] ..."

Using the `Session` and `Cookies` classes as an example:

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

### Metody

Rozdział "Metody" musi zachować podaną niżej formę:

```markdown
### `objectName.methodName(required[, optional]))`

* `required` String - A parameter description.
* `optional` Integer (optional) - Another parameter description.

...
```

Tytuł może być `###` lub `####` poziomowy zależnie od tego, czy jest to metoda modułu czy klasy.

Dla modułów, `objectName` jest nazwą modułu. Dla klas, to musi być nazwa wystąpienia klasy oraz nie może być taka sama jak nazwa modułu.

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

### Zdarzenia

The events chapter must be in following form:

```markdown
### Event: 'wake-up'

Returns:

* `time` String

...
```

The title can be `###` or `####`-levels depending on whether it is an event of a module or a class.

The arguments of an event follow the same rules as methods.

### Właściwości

The properties chapter must be in following form:

```markdown
### session.defaultSession

...
```

The title can be `###` or `####`-levels depending on whether it is a property of a module or a class.

## Documentation Translations

See [electron/electron-i18n](https://github.com/electron/electron-i18n#readme)