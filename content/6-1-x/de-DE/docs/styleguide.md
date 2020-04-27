# Electron's Dokumentations-Styleguide

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

## Main-Prozess

...

## Renderer-Prozess

...

## Ihre App ausführen

...

### Als Distribution ausführen

...

### Electron-Binärdatei manuell herunterladen

...
```

Für API-Referenzen gibt es Ausnahmen von dieser Regel.

## Regeln für Markdown

* Use `sh` instead of `cmd` in code blocks (due to the syntax highlighter).
* Lines should be wrapped at 80 columns.
* Keine Schachtelungen sind mehr als 2 Ebenen (aufgrund des Markdown Renderers).
* Wszystkie bloki kodu `js` i `javascript` są sprawdzane pod względem zgodności ze stylem [standard-markdown](http://npm.im/standard-markdown).

## Wörter auswählen

* Verwende "wird" anstatt "würde" für die Beschreibung von Ergebnissen.
* Bevorzugen Sie "im ___ Prozess" gegenüber "bei".

## API Referenzen

Die folgenden Regeln gelten nur für Dokumentationen der APIs.

### Seitentitel

Jede Seite muss den tatsächlichen Objektnamen verwenden, den `require('electron')` als Titel zurück gibt, wie `BrowserWindow`, `autoUpdater`, und `session`.

Unter dem Seitentitel muss eine einzeilige Beschreibung sein, beginnend mit `>`.

Am Beispiel von `session`:

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
* Konstruktoren müssen mit `###` Level-Titeln aufgelistet werden.
* [Statische Methoden](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static) müssen unter einem Kapitel `### Statische Methoden` aufgelistet werden.
* [Instanz-Methoden](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Prototype_methods) müssen unter einem `### Instanz-Methoden` Kapitel aufgelistet werden.
* Alle Methoden, die einen Rückgabewert haben, müssen ihre Beschreibung mit "Returns `[TYPE]`" beginnen
  * Wenn die Methode ein `Objekt` zurückgibt, kann dessen Struktur angegeben werden mit einem Doppelpunkt gefolgt von einem Zeilenumbruch, dann einer ungeordneten Liste der Eigenschaften im gleichen Stil wie die Funktionsparameter.
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
* `optional` Integer (optional) - Another parameter description.

...
```

The title can be `###` or `####`-levels depending on whether it is a method of a module or a class.

For modules, the `objectName` is the module's name. For classes, it must be the name of the instance of the class, and must not be the same as the module's name.

For example, the methods of the `Session` class under the `session` module must use `ses` as the `objectName`.

The optional arguments are notated by square brackets `[]` surrounding the optional argument as well as the comma required if this optional argument follows another argument:

```sh
erforderlich[, optional]
```

Below the method is more detailed information on each of the arguments. The type of argument is notated by either the common types:

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
