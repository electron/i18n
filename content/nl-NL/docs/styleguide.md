# Electron Documentatie Styleguide

Dit zijn de richtlijnen voor het schrijven van Electron documentatie.

## Titels

* Elke pagina moet een `#`-level titel bovenaan hebben.
* Hoofdstukken in dezelfde pagina moeten `##`-level titels hebben.
* Sub hoofdstukken moeten toenemen in het aantal `#` in de titel volgens hun diepte.
* Alle woorden in de titel van de pagina moeten in hoofdletters, met uitzondering van voegwoorden als "of" en "en".
* Alleen het eerste woord van een hoofdstuktitel moet in hoofdletters worden geschreven.

Met `Quick Start` als voorbeeld:

```markdown
# Quick Start

...

## Basis proces

...

## Renderer proces

...

## Je app onderhouden

...

### Onderhoud als een bijdrage

...

### Handmatig Electron binaire gedownload

...
```

Voor de API-referenties zijn er uitzonderingen op deze regel.

## Markdown regels

* Use `sh` instead of `cmd` in code blocks (due to the syntax highlighter).
* Lijnen moeten worden verpakt in 80 kolommen.
* Geen geneste lijsten meer dan 2 verdiepingen (vanwege de markdown renderer).
* Alle `js` en `javascript` codeblokken zijn systeemlibraries met [standaard-markdown](http://npm.im/standard-markdown).

## Het kiezen van woorden

* Het gebruik maken van "zal" in plaats van "zou" bij het beschrijven van resultaten.
* Liever "in het proces van ___" dan "aan".

## API verwijzingen

De volgende regels gelden alleen voor de documentatie van de API's.

### Paginatitel

Elke pagina moet met de naam van het werkelijke object geretourneerd worden door `require('electron')` als de titel, zoals `BrowserWindow`, `autoUpdater`en `sessie`.

Under the page title must be a one-line description starting with `>`.

Met `sessie` als voorbeeld:

```markdown
# session

> Manage browser sessions, cookies, cache, proxy settings, etc.
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
* Instance Properties must be listed under an `### Instance Properties` chapter. 
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

### Methods

The methods chapter must be in the following form:

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

If an argument or a method is unique to certain platforms, those platforms are denoted using a space-delimited italicized list following the datatype. Values can be `macOS`, `Windows` or `Linux`.

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

## Vertalingen van de documentatie

See [electron/i18n](https://github.com/electron/i18n#readme)