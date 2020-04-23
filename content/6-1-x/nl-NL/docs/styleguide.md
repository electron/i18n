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

Voor de API-referenties zijn er uitzonderingen op deze regel.

## Markdown regels

* Gebruik `sh` in plaats van `cmd` in codeblokken (vanwege de syntaxis highlighter).
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

Onder de pagina titel moet een beschrijving zijn van één regel die begint met `>`.

Met `sessie` als voorbeeld:

```markdown
# sessie

> Manage browser sessions, cookies, cache, proxy settings, etc.
```

### Module methoden en events

Voor modules die geen klassen zijn, moeten hun methoden en events hieronder worden vermeld in de hoofdstukken `## Methods` en `## Events`.

Gebruik `autoUpdater` als voorbeeld:

```markdown
# autoUpdater

## Events

### Event: 'error'

## Methods

### `autoUpdater.setFeedURL(url[, requestHeaders])`
```

### Klassen

* API-klassen of klassen die deel uitmaken van modules moeten worden vermeld onder het hoofdstuk `## Class: TheClassName`.
* Eén pagina kan meerdere klassen hebben.
* Constructors moeten worden vermeld met ` ### `-titels op niveau.
* [Statische methoden](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static) moeten worden vermeld onder een `### Static Methods` hoofdstuk.
* [Instance Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Prototype_methods) moeten worden vermeld onder een `### Instance Methods` hoofdstuk.
* All methods that have a return value must start their description with "Returns `[TYPE]` - Return description"
  * Als de methode een `object` retourneert, kan de structuur worden opgegeven met een dubbele punt gevolgd door een nieuwe regel en vervolgens een ongeordende lijst met eigenschappen in dezelfde stijl als functieparameters.
* Instantie events moeten vermeld worden onder een `### Instance Events` hoofdstuk.
* Instance Properties must be listed under an `### Instance Properties` chapter.
  * Instantie properties moeten beginnen met "A [Property Type] ..."

Het gebruik van de `Session` en `Cookies` klassen in een voorbeeld:

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

### Methoden

Het hoofdstuk Methoden moet de volgende vorm hebben:

```markdown
### `objectName.methodName(required[, optional]))`

* `required` String - A parameter description.
* `optional` Integer (optional) - Another parameter description.

...
```

De titel kan `###` of `####`-niveau zijn, afhankelijk van of het een methode van een module of een klasse.

For modules, the `objectName` is the module's name. For classes, it must be the name of the instance of the class, and must not be the same as the module's name.

De methoden van de sessie `Session` onder de module `session` moeten bijvoorbeeld `ses` gebruiken als de `objectName`.

De optionele argumenten worden aangegeven door vierkante haakjes `[]` rondom het optionele argument evenals de vereiste komma als dit optionele argument volgt op een andere argument:

```sh
required[, optional]
```

Below the method is more detailed information on each of the arguments. The type of argument is notated by either the common types:

* [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
* [`Number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
* [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
* [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
* [`Boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
* Of een aangepast type zoals Electron's [`WebContent`](api/web-contents.md)

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
