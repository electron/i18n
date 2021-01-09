# Electron Documentation Style Guide

Dies sind die Richtlinien für das Schreiben von Dokumentation zu Elektron.

## Titel

* Jede Seite hat ein einzelnen Titel mit `#` am Anfang.
* Kapitel der selben Seite müssen `##`-Level Titel haben.
* Unterkapitel müssen die Anzahl der `#` im Titel entsprechend ihrer Schachtelungstiefe erhöhen.
* Alle Wörter im Titel der Seite müssen groß geschrieben werden, mit Ausnahme von Konjunktionen wie "von" und "und".
* Nur das erste Wort eines Kapiteltitels muss großgeschrieben werden.

Am Beispiel von `Schnellstart`:

```markdown
# Schnellstart

...

## Hauptprozess

...

## Renderer Prozess

...

## Starte deine App

...

### Als Distribution ausführen

...

### Manuell heruntergeladene Electron Binärdatei

...
```

Für API-Referenzen gibt es Ausnahmen von dieser Regel.

## Regeln für Markdown

* Use `sh` instead of `cmd` in code blocks (due to the syntax highlighter).
* Lines should be wrapped at 80 columns.
* Keine Schachtelungen sind mehr als 2 Ebenen (aufgrund des Markdown Renderers).
* Wszystkie bloki kodu `js` i `javascript` są sprawdzane pod względem zgodności ze stylem [standard-markdown](https://www.npmjs.com/package/standard-markdown).
* For unordered lists, use asterisks instead of dashes

## Wörter auswählen

* "Wird" sollte statt "würde" verwendet werden, um Ergebnisse zu beschreiben.
* Prefer "in the ___ process" over "on".

## API Referenzen

Die folgenden Regeln gelten nur für Dokumentationen der APIs.

### Seitentitel

Each page must use the actual object name returned by `require('electron')` as the title, such as `BrowserWindow`, `autoUpdater`, and `session`.

Under the page title must be a one-line description starting with `>`.

Using `session` as example:

```markdown
# session

> Manage browser sessions, cookies, cache, proxy settings, etc.
```

### Methoden und Events von Modulen

For modules that are not classes, their methods and events must be listed under the `## Methods` and `## Events` chapters.

Verwende `AutoUpdater` als Beispiel:

```markdown
# autoUpdater

## Events

### Event: 'error'

## Methods

### `autoUpdater.setFeedURL(url[, requestHeaders])`
```

### Klassen

* API classes or classes that are part of modules must be listed under a `## Class: TheClassName` chapter.
* One page can have multiple classes.
* Konstruktoren müssen mit `###` Level-Titeln aufgelistet werden.
* [Statische Methoden](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static) müssen unter einem Kapitel `### Statische Methoden` aufgelistet werden.
* [Instanz-Methoden](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Prototype_methods) müssen unter einem `### Instanz-Methoden` Kapitel aufgelistet werden.
* Alle Methoden, die einen Rückgabewert haben, müssen ihre Beschreibung mit "Returns `[TYPE]` - Rückgabewert" beginnen
  * If the method returns an `Object`, its structure can be specified using a colon followed by a newline then an unordered list of properties in the same style as function parameters.
* Instance Events must be listed under an `### Instance Events` chapter.
* Instanz-Eigenschaften müssen im Kapitel `### Instanz-Eigenschaften` aufgelistet werden.
  * Instance properties must start with "A [Property Type] ..."

Using the `Session` and `Cookies` classes as an example:

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

### Methoden

The methods chapter must be in the following form:

```markdown
### `objectName.methodName(required[, optional]))`

* `required` String - A parameter description.
* `optional` Ganzzahl (optional) - Eine weitere Parameterbeschreibung.

...
```

The title can be `###` or `####`-levels depending on whether it is a method of a module or a class.

Bei Modulen ist der `objectName` der Name des Moduls. Für Klassen muss es der Name der Instanz der Klasse sein und darf nicht der gleiche sein wie der Name des Moduls.

For example, the methods of the `Session` class under the `session` module must use `ses` as the `objectName`.

The optional arguments are notated by square brackets `[]` surrounding the optional argument as well as the comma required if this optional argument follows another argument:

```sh
erforderlich[, optional]
```

Unter der Methode finden Sie detailliertere Informationen zu jedem der Argumente. Der Typ des Arguments wird von den gebräuchlichen Typen notiert:

* [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
* [`Number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
* [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
* [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
* [`Boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
* Or a custom type like Electron's [`WebContent`](api/web-contents.md)

If an argument or a method is unique to certain platforms, those platforms are denoted using a space-delimited italicized list following the datatype. Werte können `macOS`, `Windows` oder `Linux` sein.

```markdown
* `animate` Boolean (optional) _macOS_ _Windows_ - Animate the thing.
```

`Array` type arguments must specify what elements the array may include in the description below.

The description for `Function` type arguments should make it clear how it may be called and list the types of the parameters that will be passed to it.

### Ereignisse

The events chapter must be in following form:

```markdown
### Ereignis: 'aufwachen'

Gibt zurück:

* `time` String

...
```

The title can be `###` or `####`-levels depending on whether it is an event of a module or a class.

The arguments of an event follow the same rules as methods.

### Eigenschaften

The properties chapter must be in following form:

```markdown
### session.defaultSession

...
```

The title can be `###` or `####`-levels depending on whether it is a property of a module or a class.

## Übersetzungen der Dokumentationen

Siehe [Elektron/i18n](https://github.com/electron/i18n#readme)
