# Electron Documentation Style Guide

Dies sind die Richtlinien für das Schreiben von Dokumentation zu Elektron.

## Überschriften

* Jede Seite hat ein einzelnen Titel mit `#` am Anfang.
* Chapters in the same page must have `##`-level headings.
* Sub-chapters need to increase the number of `#` in the heading according to their nesting depth.
* The page's title must follow [APA title case][title-case].
* All chapters must follow [APA sentence case][sentence-case].

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

## Markdown-Dateien

This repository uses the [`markdownlint`][markdownlint] package to enforce consistent Markdown styling. For the exact rules, see the `.markdownlint.json` file in the root folder.

There are a few style guidelines that aren't covered by the linter rules:

<!--TODO(erickzhao): make sure this matches with the lint:markdownlint task-->
* Use `sh` instead of `cmd` in code blocks (due to the syntax highlighter).
* Keep line lengths between 80 and 100 characters if possible for readability purposes.
* Keine Schachtelungen sind mehr als 2 Ebenen (aufgrund des Markdown Renderers).
* Wszystkie bloki kodu `js` i `javascript` są sprawdzane pod względem zgodności ze stylem [standard-markdown](https://www.npmjs.com/package/standard-markdown).
* For unordered lists, use asterisks instead of dashes.

## Wörter auswählen

* "Wird" sollte statt "würde" verwendet werden, um Ergebnisse zu beschreiben.
* Debuggen des Hauptprozesses in VSCode".

## API Referenzen

Die folgenden Regeln gelten nur für Dokumentationen der APIs.

### Title and description

Each module's API doc must use the actual object name returned by `require('electron')` as its title (such as `BrowserWindow`, `autoUpdater`, and `session`).

Directly under the page title, add a one-line description of the module as a markdown quote (beginning with `>`).

Using the `session` module as an example:

```markdown
# session

> Verwalte Browser-Sitzungen, Cookies, Cache, Proxy-Einstellungen, etc.
```

### Methoden und Events von Modulen

Für Module, die keine Klassen sind, müssen deren Methoden und Events unter `## Methods` und `## Events` aufgelistet werden.

Verwende `AutoUpdater` als Beispiel:

```markdown
# autoUpdater

## Events

### Event: 'error'

## Methoden

### `autoUpdater.setFeedURL(url[, requestHeaders])`
```

### Klassen

* API-Klassen oder Klassen, die Teil von Modulen sind, müssen unter dem Kapitel `## Klassen: Klassenname` aufgeführt werden.
* Eine Seite kann mehrere Klassen haben.
* Constructors must be listed with `###`-level headings.
* [Static Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static) must be listed under a `### Static Methods` chapter.
* [Instance Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Prototype_methods) must be listed under an `### Instance Methods` chapter.
* All methods that have a return value must start their description with "Returns `[TYPE]` - [Return description]"
  * If the method returns an `Object`, its structure can be specified using a colon followed by a newline then an unordered list of properties in the same style as function parameters.
* Instance Events must be listed under an `### Instance Events` chapter.
* Instanz-Eigenschaften müssen im Kapitel `### Instanz-Eigenschaften` aufgelistet werden.
  * Instance Properties must start with "A [Property Type] ..."

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

### Methods and their arguments

The methods chapter must be in the following form:

```markdown
### `objectName.methodName(required[, optional]))`

* `required` String - A parameter description.
* `optional` Ganzzahl (optional) - Eine weitere Parameterbeschreibung.

...
```

#### Heading level

The heading can be `###` or `####`-levels depending on whether the method belongs to a module or a class.

#### Function signature

For modules, the `objectName` is the module's name. For classes, it must be the name of the instance of the class, and must not be the same as the module's name.

For example, the methods of the `Session` class under the `session` module must use `ses` as the `objectName`.

Optional arguments are notated by square brackets `[]` surrounding the optional argument as well as the comma required if this optional argument follows another argument:

```markdown
erforderlich[, optional]
```

#### Argument descriptions

More detailed information on each of the arguments is noted in an unordered list below the method. The type of argument is notated by either JavaScript primitives (e.g. `String`, `Promise`, or `Object`), a custom API structure like Electron's [`Cookie`](api/structures/cookie.md), or the wildcard `any`.

If the argument is of type `Array`, use `[]` shorthand with the type of value inside the array (for example,`any[]` or `String[]`).

If the argument is of type `Promise`, parametrize the type with what the promise resolves to (for example, `Promise<void>` or `Promise<String>`).

If an argument can be of multiple types, separate the types with `|`.

The description for `Function` type arguments should make it clear how it may be called and list the types of the parameters that will be passed to it.

#### Platform-specific functionality

If an argument or a method is unique to certain platforms, those platforms are denoted using a space-delimited italicized list following the datatype. Werte können `macOS`, `Windows` oder `Linux` sein.

```markdown
* `animate` Boolean (optional) _macOS_ _Windows_ - Animate the thing.
```

### Ereignisse

The events chapter must be in following form:

```markdown
### Ereignis: 'aufwachen'

Gibt zurück:

* `time` String

...
```

The heading can be `###` or `####`-levels depending on whether the event belongs to a module or a class.

The arguments of an event follow the same rules as methods.

### Eigenschaften

The properties chapter must be in following form:

```markdown
### session.defaultSession

...
```

The heading can be `###` or `####`-levels depending on whether the property belongs to a module or a class.

## Documentation translations

Siehe [Elektron/i18n](https://github.com/electron/i18n#readme)

[title-case]: https://apastyle.apa.org/style-grammar-guidelines/capitalization/title-case
[sentence-case]: https://apastyle.apa.org/style-grammar-guidelines/capitalization/sentence-case
[markdownlint]: https://github.com/DavidAnson/markdownlint
