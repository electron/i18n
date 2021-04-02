# Zwischenablage (clipboard)

> Ausführung von Kopier- und Einfüge-Operationen von der Zwischenablage des Betriebssystems.

Prozess: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

Unter Linux gibt es auch eine `selection` Zwischenablage. Zum Bearbeiten müssen Sie `selection` an jede Methode übergeben:

```javascript
const { clipboard } = require('electron')

clipboard.writeText('Example String', 'selection')
console.log(clipboard.readText('selection'))
```

## Methoden

Das `clipboard` Modul besitzt die folgenden Methoden:

**Hinweis:** Experimentelle APIs sind als solche gekennzeichnet und könnten in Zukunft entfernt werden.

### `clipboard.readText([type])`

* `type` String (optional) - Kann `selection` oder `clipboard`werden; Standard ist 'Clipboard'. `selection` ist nur unter Linux verfügbar.

Gibt einen `String` zurück - Der Inhalt der Zwischenablage liegt in Klartext vor.

```js
const { clipboard } = require('electron')

clipboard.writeText('hello i am a bit of text!')

const text = clipboard.readText()
console.log(text)
/ / hello i am a bit of text!'
```

### `clipboard.writeText(text[, type])`

* `text` String
* `type` String (optional) - Kann `selection` oder `clipboard`werden; Standard ist 'Clipboard'. `selection` ist nur unter Linux verfügbar.

Schreibt den `text` als Klartext in die Zwischenablage.

```js
const { clipboard } = require('electron')

const text = 'hello i am a bit of text!'
clipboard.writeText(text)
```

### `clipboard.readHTML([type])`

* `type` String (optional) - Kann `selection` oder `clipboard`werden; Standard ist 'Clipboard'. `selection` ist nur unter Linux verfügbar.

Gibt einen `String` zurück - Der Inhalt der Zwischenablage liegt in Auszeichnungssprache (markup language) vor.

```js
const { clipboard } = require('electron')

clipboard.writeHTML('<b>Hi</b>')
const html = clipboard.readHTML()

console.log(html)
/ <meta charset='utf-8'><b>Hi</b>
```

### `clipboard.writeHTML(markup[, type])`

* `markup` String
* `type` String (optional) - Kann `selection` oder `clipboard`werden; Standard ist 'Clipboard'. `selection` ist nur unter Linux verfügbar.

Schreibt `markup` in die Zwischenablage.

```js
const { clipboard } = require('electron')

clipboard.writeHTML('<b>Hi</b')
```

### `clipboard.readImage([type])`

* `type` String (optional) - Kann `selection` oder `clipboard`werden; Standard ist 'Clipboard'. `selection` ist nur unter Linux verfügbar.

Gibt ein [`NativeImage`](native-image.md) zurück - Der Inhalt des Bildes liegt in der Zwischenablage vor.

### `clipboard.writeImage(image[, type])`

* `image` [NativeImage](native-image.md)
* `type` String (optional) - Kann `selection` oder `clipboard`werden; Standard ist 'Clipboard'. `selection` ist nur unter Linux verfügbar.

Schreibt das `image` in die Zwischenablage.

### `clipboard.readRTF([type])`

* `type` String (optional) - Kann `selection` oder `clipboard`werden; Standard ist 'Clipboard'. `selection` ist nur unter Linux verfügbar.

Gibt einen `String` zurück - Der Inhalt der Zwischenablage liegt im Rich Text Format (RTF) vor.

```js
const { clipboard } = require('electron')

clipboard.writeRTF(''\rtf1'ansi'fonttbl'f0'fswiss Helvetica;' "\n\n

const rtf = clipboard.readRTF()
console.log(rtf)
\r/ ""\nDies ist ein Text mit der Fettschrift von "\nb" .
```

### `clipboard.writeRTF(text[, type])`

* `text` String
* `type` String (optional) - Kann `selection` oder `clipboard`werden; Standard ist 'Clipboard'. `selection` ist nur unter Linux verfügbar.

Schreibt den `text` im Rich Text Format (RTF) in die Zwischenablage.

```js
const { clipboard } = require('electron')

const rtf = ''\r' "
"-\nDies ist ein Text mit der Fettschrift\nvon "b" .writeRTF(rtf)
```

### `clipboard.readBookmark()` _macOS_ _Windows_

Gibt das `Object` zurück:

* `title` String
* `url` String

Gibt ein Objekt, dass die Keys `title` und `url` enthält zurück. Diese Keys repräsentieren das Lesezeichen in der Zwischenablage. Wenn das Lesezeichen nicht verfügbar ist, sind die Werte `title` und `url` leer.

### `clipboard.writeBookmark(title, url[, type])` _macOS_ _Windows_

* `title` String
* `url` String
* `type` String (optional) - Kann `selection` oder `clipboard`werden; Standard ist 'Clipboard'. `selection` ist nur unter Linux verfügbar.

Schreibt den `title` und die `url` als Lesezeichen in die Zwischenablage.

**Hinweis:** Die meisten Apps unter Windows unterstützen das Einfügen von Lesezeichen nicht in sie, sodass Sie `clipboard.write` verwenden können, um sowohl ein Lesezeichen als auch einen Fallbacktext in die Zwischenablage zu schreiben.

```js
const { clipboard } = require('electron')

clipboard.writeBookmark('
  Text: 'https://electronjs.org',
  Lesezeichen: 'Elektronen-Homepage'
)
```

### `clipboard.readFindText()` _macOS-_

Gibt `String` zurück - Der Text auf der Zwischenablage suchen, d. h. die Einfügetafel, die Informationen über den aktuellen Status des Find-Panels der aktiven Anwendung enthält.

Diese Methode verwendet synchrone IPC, wenn sie vom Rendererprozess aufgerufen wird. Der zwischengespeicherte Wert wird bei jeder Aktivierung der Anwendung von der Find-Pasteboard erneut gelesen.

### `clipboard.writeFindText(text)` _macOS_

* `text` String

Schreibt die `text` in die Find-Paste (die Zwischenablage, die Informationen über den aktuellen Status des Find-Panels der aktiven Anwendung enthält) als Nur-Text. Diese Methode verwendet synchrone IPC, wenn sie vom Rendererprozess aufgerufen wird.

### `clipboard.clear([type])`

* `type` String (optional) - Kann `selection` oder `clipboard`werden; Standard ist 'Clipboard'. `selection` ist nur unter Linux verfügbar.

Löscht den Inhalt aus der Zwischenablage.

### `clipboard.availableFormats([type])`

* `type` String (optional) - Kann `selection` oder `clipboard`werden; Standard ist 'Clipboard'. `selection` ist nur unter Linux verfügbar.

Gibt ein `String[]` zurück - Ein Array mit allen von der Zwischenablage unterstützten Formattypen `type`.

```js
const { clipboard } = require('electron')

const formats = clipboard.availableFormats()
console.log(formats)
/ / [ 'text/plain', 'text/html' ]
```

### `clipboard.has(format[, type])` _Experimentelle_

* `format` String
* `type` String (optional) - Kann `selection` oder `clipboard`werden; Standard ist 'Clipboard'. `selection` ist nur unter Linux verfügbar.

Gibt einen `Boolean` zurück - Prüft, ob die Zwischenablage das angegebene `format` unterstützt.

```js
const { clipboard } = require('electron')

const hasFormat = clipboard.has('<p>Auswahl</p>')
console.log(hasFormat)
/ 'true' oder 'false
```

### `clipboard.read(format)` _Experimentelle_

* `format` String

Gibt den `String` zurück - Liest den `format` Typ von der Zwischenablage.

### `clipboard.readBuffer(format)` _Experimentelle_

* `format` String

Gibt den `Buffer` zurück - Liest den `format` Typ von der Zwischenablage.

```js
const { clipboard } = require('electron')

const buffer = Buffer.from('this is binary', 'utf8')
clipboard.writeBuffer('public.utf8-plain-text', buffer)

const ret = clipboard.readBuffer('public.utf8-plain-text')

console.log(buffer.equals))

```

### `clipboard.writeBuffer(format, buffer[, type])` _Experimentelle_

* `format` String
* `buffer` Puffer
* `type` String (optional) - Kann `selection` oder `clipboard`werden; Standard ist 'Clipboard'. `selection` ist nur unter Linux verfügbar.

Schreibt den `buffer` mit dem angegebenen `format` in die Zwischenablage.

```js
const { clipboard } = require('electron')

const buffer = Buffer.from('writeBuffer', 'utf8')
clipboard.writeBuffer('public.utf8-plain-text', buffer)
```

### `clipboard.write(data[, type])`

* `data` -Objekt
  * `text` String (optional)
  * `html` String (optional)
  * `image` [NativeImage](native-image.md) (optional)
  * `rtf` String (optional)
  * `bookmark` String (optional) - Der Titel der URL bei `text`.
* `type` String (optional) - Kann `selection` oder `clipboard`werden; Standard ist 'Clipboard'. `selection` ist nur unter Linux verfügbar.

Schreibt `data` in die Zwischenablage.

```js
const { clipboard } = require('electron')

clipboard.write('
  text: 'test',
  html: '<b>Hi</b>',
  rtf: ''\rtf1'utf8 text'',
  Lesezeichen: 'ein Titel'
')

console.log(clipboard.readText())
/ 'test'

console.log(clipboard.readHTML())
/ <meta charset='utf-8'><b>Hi</b>

console.log(clipboard.readRTF())
/ ''\rtf1'utf8 text''

console.log(clipboard.readBookmark) { title: 'a title', url: 'test' }
)
```
