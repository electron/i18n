# Zwischenablage (clipboard)

> Ausführung von Kopier- und Einfüge-Operationen von der Zwischenablage des Betriebssystems.

Prozess: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

Das folgende Beispiel zeigt, wie Zeichenfolgen in die Zwischenablage geschrieben werden:

```javascript
const {clipboard} = require('electron')
clipboard.writeText('Example String')
```

Auf X Window Systemen existiert eine selektierende Zwischenablage. Um diese zu manipulieren, füge `selection` in jeder Methode ein:

```javascript
const {clipboard} = require('electron')
clipboard.writeText('Example String', 'selection')
console.log(clipboard.readText('selection'))
```

## Methoden

Das `clipboard` Modul besitzt die folgenden Methoden:

**Notiz:** Experimentelle Schnittstellen sind mit "Experimentell" markiert und könnten in der Zukunft wegfallen.

### `clipboard.readText([type])`

* `type` String (optional)

Gibt einen `String` zurück - Der Inhalt der Zwischenablage liegt in Klartext vor.

### `clipboard.writeText(text[, type])`

* `text` String
* `type` String (optional)

Schreibt den `text` als Klartext in die Zwischenablage.

### `clipboard.readHTML([type])`

* `type` String (optional)

Gibt einen `String` zurück - Der Inhalt der Zwischenablage liegt in Auszeichnungssprache (markup language) vor.

### `clipboard.writeHTML(markup[, type])`

* `markup` String
* `type` String (optional)

Schreibt `markup` in die Zwischenablage.

### `clipboard.readImage([type])`

* `type` String (optional)

Gibt ein [`NativeImage`](native-image.md) zurück - Der Inhalt des Bildes liegt in der Zwischenablage vor.

### `clipboard.writeImage(image[, type])`

* `image` [NativeImage](native-image.md)
* `type` String (optional)

Schreibt das `image` in die Zwischenablage.

### `clipboard.readRTF([type])`

* `type` String (optional)

Gibt einen `String` zurück - Der Inhalt der Zwischenablage liegt im Rich Text Format (RTF) vor.

### `clipboard.writeRTF(text[, type])`

* `text` String
* `type` String (optional)

Schreibt den `text` im Rich Text Format (RTF) in die Zwischenablage.

### `clipboard.readBookmark()` *macOS* *Windows*

Gibt das `Object` zurück:

* `title` String
* ` URL </ 0>  Zeichenfolge</li>
</ul>

<p>Gibt ein Objekt, dass die Keys <code>title` und `url` enthält zurück. Diese Keys repräsentieren das Lesezeichen in der Zwischenablage. Wenn das Lesezeichen nicht verfügbar ist, sind die Werte `title` und `url` leer.</p> 
  ### `clipboard.writeBookmark(title, url[, type])` *macOS* *Windows*
  
  * `title` String
  * ` URL </ 0>  Zeichenfolge</li>
<li><code>type` String (optional)
  
  Schreibt den `title` und die `url` als Lesezeichen in die Zwischenablage.
  
  **Notiz:** Viele Anwendungen unter Windows unterstützen das Einfügen von Lesezeichen nicht. In diesem Fall kann man `clipboard.write` benutzen, um sowohl ein Lesezeichen, als auch Text als Fallback-Variante in die Zwischenablage zu schreiben.
  
  ```js
  clipboard.write({
    text: 'https://electron.atom.io',
    bookmark: 'Electron Homepage'
  })
  ```
  
  ### `clipboard.readFindText()` *macOS*
  
  Returns `String` - The text on the find pasteboard. This method uses synchronous IPC when called from the renderer process. The cached value is reread from the find pasteboard whenever the application is activated.
  
  ### `clipboard.writeFindText(text)` *macOS*
  
  * `text` String
  
  Writes the `text` into the find pasteboard as plain text. This method uses synchronous IPC when called from the renderer process.
  
  ### `clipboard.clear([type])`
  
  * `type` String (optional)
  
  Löscht den Inhalt aus der Zwischenablage.
  
  ### `clipboard.availableFormats([type])`
  
  * `type` String (optional)
  
  Gibt ein `String[]` zurück - Ein Array mit allen von der Zwischenablage unterstützten Formattypen `type`.
  
  ### `clipboard.has(format[, type])` *Experimentell*
  
  * `format` String
  * `type` String (optional)
  
  Gibt einen `Boolean` zurück - Prüft, ob die Zwischenablage das angegebene `format` unterstützt.
  
  ```javascript
  const {clipboard} = require('electron')
  console.log(clipboard.has('<p>selection</p>'))
  ```
  
  ### `clipboard.read(format)` *Experimentell*
  
  * `format` String
  
  Gibt den `String` zurück - Liest den `format` Typ von der Zwischenablage.
  
  ### `clipboard.readBuffer(format)` *Experimentell*
  
  * `format` String
  
  Gibt den `Buffer` zurück - Liest den `format` Typ von der Zwischenablage.
  
  ### `clipboard.writeBuffer(format, buffer[, type])` *Experimentell*
  
  * `format` String
  * `buffer` Puffer
  * `type` String (optional)
  
  Schreibt den `buffer` mit dem angegebenen `format` in die Zwischenablage.
  
  ### `clipboard.write(data[, type])`
  
  * `data` Object 
    * `text` String (optional)
    * `html` String (optional)
    * `image` [NativeImage](native-image.md) (optional)
    * `rtf` String (optional)
    * `bookmark` String (optional) - Der Titel von der URL bei `text`.
  * `type` String (optional)
  ```javascript
  const {clipboard} = require('electron')
  clipboard.write({text: 'test', html: '<b>test</b>'})
  ```
  
  Schreibt `data` in die Zwischenablage.