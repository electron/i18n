# clipboard

> Permet d'effectuer les opérations copier et coller dans le presse-papiers.

Processus : [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

L'exemple suivant montre comment écrire une chaîne de caractère dans le presse-papiers :

```javascript
const {clipboard} = require('electron')
clipboard.writeText('Mon exemple')
```

Sur les systèmes Windows, il y existe aussi un presse-papiers de sélection. Pour le manipuler, vous devez passer le paramètre `selection` pour chaque méthode :

```javascript
const {clipboard} = require('electron')
clipboard.writeText('Mon exemple', 'selection') console.log(clipboard.readText('selection'))
```

## Méthodes

Le module `clipboard` dispose des méthodes suivantes :

**Remarque :** Les APIs expérimentales sont marquées comme telles et sont susceptibles d'être supprimés à l'avenir.

### `clipboard.readText([type])`

* `type` String (facultatif)

Retourne `String` - Le contenu dans le presse-papiers en tant que texte brut.

### `clipboard.writeText(text[, type])`

* `text` String
* `type` String (facultatif)

Écrit le `text` dans le presse-papiers au format texte brut.

### `clipboard.readHTML([type])`

* `type` String (facultatif)

Retourne `String` - Le contenu dans le presse-papiers en tant que balisage.

### `clipboard.writeHTML(markup[, type])`

* `markup` String
* `type` String (facultatif)

Writes `markup` to the clipboard.

### `clipboard.readImage([type])`

* `type` String (facultatif)

Returns [`NativeImage`](native-image.md) - The image content in the clipboard.

### `clipboard.writeImage(image[, type])`

* `image` [NativeImage](native-image.md)
* `type` String (facultatif)

Writes `image` to the clipboard.

### `clipboard.readRTF([type])`

* `type` String (facultatif)

Returns `String` - The content in the clipboard as RTF.

### `clipboard.writeRTF(text[, type])`

* `text` String
* `type` String (facultatif)

Writes the `text` into the clipboard in RTF.

### `clipboard.readBookmark()` *macOS* *Windows*

Retourne `Object`:

* `title` String
* `url` String

Returns an Object containing `title` and `url` keys representing the bookmark in the clipboard. The `title` and `url` values will be empty strings when the bookmark is unavailable.

### `clipboard.writeBookmark(title, url[, type])` *macOS* *Windows*

* `title` String
* `url` String
* `type` String (facultatif)

Writes the `title` and `url` into the clipboard as a bookmark.

**Note:** Most apps on Windows don't support pasting bookmarks into them so you can use `clipboard.write` to write both a bookmark and fallback text to the clipboard.

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

* `type` String (facultatif)

Clears the clipboard content.

### `clipboard.availableFormats([type])`

* `type` String (facultatif)

Returns `String[]` - An array of supported formats for the clipboard `type`.

### `clipboard.has(format[, type])` *Experimental*

* `format` String
* `type` String (facultatif)

Returns `Boolean` - Whether the clipboard supports the specified `format`.

```javascript
const {clipboard} = require('electron')
console.log(clipboard.has('<p>selection</p>'))
```

### `clipboard.read(format)` *Experimental*

* `format` String

Returns `String` - Reads `format` type from the clipboard.

### `clipboard.readBuffer(format)` *Experimental*

* `format` String

Returns `Buffer` - Reads `format` type from the clipboard.

### `clipboard.writeBuffer(format, buffer[, type])` *Experimental*

* `format` String
* `buffer` Buffer
* `type` String (facultatif)

Writes the `buffer` into the clipboard as `format`.

### `clipboard.write(data[, type])`

* `data` Object 
  * `text` String (optional)
  * `html` String (optional)
  * `image` [NativeImage](native-image.md) (optional)
  * `rtf` String (optional)
  * `bookmark` String (optional) - The title of the url at `text`.
* `type` String (facultatif)

```javascript
const {clipboard} = require('electron')
clipboard.write({text: 'test', html: '<b>test</b>'})
```

Writes `data` to the clipboard.