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

## Markdown-Dateien

* Use `sh` instead of `cmd` in code blocks (due to the syntax highlighter).
* Lines should be wrapped at 80 columns.
* Keine Schachtelungen sind mehr als 2 Ebenen (aufgrund des Markdown Renderers).
* Wszystkie bloki kodu `js` i `javascript` są sprawdzane pod względem zgodności ze stylem [standard-markdown](https://www.npmjs.com/package/standard-markdown).
* Verwenden Sie für ungeordnete Listen Sternchen anstelle von Bindestrichen

## Wörter auswählen

* "Wird" sollte statt "würde" verwendet werden, um Ergebnisse zu beschreiben.
* Debuggen des Hauptprozesses in VSCode".

## API Referenzen

Die folgenden Regeln gelten nur für Dokumentationen der APIs.

### Seitentitel

Baby636.

Unter dem Seitentitel muss eine einzeilige Beschreibung sein, die mit `>`beginnt.

Verwenden sie `session` als Beispiel:

```markdown
• Sitzung

> Verwalten von Browsersitzungen, Cookies, Cache, Proxy-Einstellungen usw.
```

### Methoden und Events von Modulen

Bei Modulen, die keine Klassen sind, müssen ihre Methoden und Ereignisse unter `## Methods` und `## Events` Kapitel aufgeführt werden.

Verwende `AutoUpdater` als Beispiel:

```markdown
• autoUpdater

-Ereignisse

-Ereignis: 'error'

''Methoden

'autoUpdater.setFeedURL(url[, requestHeaders])'
```

### Klassen

* API-Klassen oder Klassen, die Teil von Modulen sind, müssen in einem `## Class: TheClassName` Kapitel aufgeführt werden.
* Eine Seite kann mehrere Klassen haben.
* Konstruktoren müssen mit `###` Level-Titeln aufgelistet werden.
* [Statische Methoden](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static) müssen unter einem Kapitel `### Statische Methoden` aufgelistet werden.
* [Instanz-Methoden](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Prototype_methods) müssen unter einem `### Instanz-Methoden` Kapitel aufgelistet werden.
* Alle Methoden, die einen Rückgabewert haben, müssen ihre Beschreibung mit "Returns `[TYPE]` - Rückgabewert" beginnen
  * Wenn die Methode eine `Object`zurückgibt, kann ihre Struktur mithilfe eines Doppelpunkts gefolgt von einer Zeile gefolgt von einer Zeilenumzlinie angegeben werden, dann eine ungeordnete Liste von Eigenschaften im gleichen Stil wie Funktionsparameter.
* Instanzereignisse müssen unter einem `### Instance Events` Kapitel aufgeführt werden.
* Instanz-Eigenschaften müssen im Kapitel `### Instanz-Eigenschaften` aufgelistet werden.
  * Instanzeigenschaften müssen mit "A [Property Type] ..." beginnen.

Verwenden der `Session` - und `Cookies` -Klassen als Beispiel:

```markdown
• Sitzung

-Methoden

-session.fromPartition(partition(partition)-

, "Static Properties

" session.defaultSession

-Class: Session

- Instanzereignisse

--Ereignis: 'will-download'

''-Instanz' Methoden

'ses.getCacheSize()'

'Instanzeigenschaften

'ses.cookies'

Klasse: Cookies

, Instanzmethoden

'cookies.get(filter, Rückruf)'
```

### Methoden

Das Methodenkapitel muss in der folgenden Form sein:

```markdown
### `objectName.methodName(required[, optional]))`

* `required` String - A parameter description.
* `optional` Ganzzahl (optional) - Eine weitere Parameterbeschreibung.

...
```

Der Titel kann `###` oder `####`-Ebenen sein, je nachdem, ob es sich um eine Methode ein Modul oder eine Klasse handelt.

Bei Modulen ist der `objectName` der Name des Moduls. Für Klassen muss es der Name der Instanz der Klasse sein und darf nicht der gleiche sein wie der Name des Moduls.

Beispielsweise müssen die Methoden der `Session` -Klasse unter dem `session` -Modul `ses` als `objectName` verwenden.

Die optionalen Argumente werden durch eckige Klammern notiert, `[]` das optionale Argument sowie das Komma, das erforderlich ist, wenn dieses optionale Argument einem anderen Argument folgt:

```sh
erforderlich[, optional]
```

Unter der Methode finden Sie detailliertere Informationen zu jedem der Argumente. Der Typ des Arguments wird von den gebräuchlichen Typen notiert:

* [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
* [`Number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
* [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
* [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
* [`Boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
* Oder ein benutzerdefinierter Typ wie die [`WebContent`](api/web-contents.md)

Wenn ein Argument oder eine Methode für bestimmte Plattformen eindeutig ist, werden diese Plattformen mit einer durch Leerzeichen getrennten kursiven Liste nach dem Datentyp bezeichnet. Werte können `macOS`, `Windows` oder `Linux` sein.

```markdown
* 'animate' Boolean (optional) _macOS_ _Windows_ - Animieren Sie das Ding.
```

`Array` Typargumente müssen angeben, welche Elemente das Array in der Beschreibung unten enthalten kann.

Die Beschreibung für `Function` Typargumente sollte deutlich machen, wie sie aufgerufen werden kann, und die Typen der Parameter auflisten, die an sie übergeben werden.

### Ereignisse

Das Veranstaltungskapitel muss in folgender Form sein:

```markdown
### Ereignis: 'aufwachen'

Gibt zurück:

* `time` String

...
```

Der Titel kann `###` oder `####`-Ebenen sein, je nachdem, ob es sich um ein Ereignis einem Modul oder einer Klasse handelt.

Die Argumente eines Ereignisses folgen den gleichen Regeln wie Methoden.

### Eigenschaften

Das Eigenschaftenkapitel muss in folgender Form sein:

```markdown
Session.defaultSession

...
```

Der Titel kann `###` oder `####`-Ebenen sein, je nachdem, ob es sich um eine Eigenschaft ein Modul oder eine Klasse handelt.

## Übersetzungen der Dokumentationen

Siehe [Elektron/i18n](https://github.com/electron/i18n#readme)
