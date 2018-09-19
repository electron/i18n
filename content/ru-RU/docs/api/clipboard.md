# clipboard

> Выполняет копирование и вставку в буфер обмена системы.

Процессы: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

Следующий пример показывает, как записать строку в буфер обмена:

```javascript
const {clipboard} = require('electron')
clipboard.writeText('Пример строки')
```

На системах X Window также есть буфер обмена. Чтобы им манипулировать, вам нужно передать `selection` каждому методу:

```javascript
const {clipboard} = require('electron')
clipboard.writeText('Пример строки', 'selection')
console.log(clipboard.readText('selection'))
```

## Методы

Модуль `clipboard` имеет следующие методы:

**Примечание:** Экспериментальные API помечены и могут быть удалены в будущем.

### `clipboard.readText([type])`

* `type` String (опционально)

Возвращает `String` — содержимое в буфере обмена в виде обычного текста.

### `clipboard.writeText(text[, type])`

* `text` String
* `type` String (опционально)

Записывает `text` в буфер обмена как обычный текст.

### `clipboard.readHTML([type])`

* `type` String (опционально)

Возвращает `String` - содержимое в буфере обмена в виде разметки.

### `clipboard.writeHTML(markup[, type])`

* `markup` String
* `type` String (опционально)

Записывает `markup` в буфер обмена.

### `clipboard.readImage([type])`

* `type` String (опционально)

Возвращает [`NativeImage`](native-image.md) - Содержимое изображения в буфере обмена.

### `clipboard.writeImage(image[, type])`

* `image` [NativeImage](native-image.md)
* `type` String (опционально)

Записывает `image` в буфер обмена.

### `clipboard.readRTF([type])`

* `type` String (опционально)

Возвращает `String` - содержимое в буфере обмена в виде RTF.

### `clipboard.writeRTF(text[, type])`

* `text` String
* `type` String (опционально)

Записывает `text` в буфер обмена как RTF.

### `clipboard.readBookmark()` *macOS* *Windows*

Возвращает `Object`:

* `title` String
* `url` String

Returns an Object containing `title` and `url` keys representing the bookmark in the clipboard. The `title` and `url` values will be empty strings when the bookmark is unavailable.

### `clipboard.writeBookmark(title, url[, type])` *macOS* *Windows*

* `title` String
* `url` String
* `type` String (опционально)

Writes the `title` and `url` into the clipboard as a bookmark.

**Note:** Most apps on Windows don't support pasting bookmarks into them so you can use `clipboard.write` to write both a bookmark and fallback text to the clipboard.

```js
clipboard.write({
  text: 'https://electronjs.org',
  bookmark: 'Electron Homepage'
})
```

### `clipboard.readFindText()` *macOS*

Returns `String` - The text on the find pasteboard. This method uses synchronous IPC when called from the renderer process. The cached value is reread from the find pasteboard whenever the application is activated.

### `clipboard.writeFindText(text)` *macOS*

* `text` String

Writes the `text` into the find pasteboard as plain text. This method uses synchronous IPC when called from the renderer process.

### `clipboard.clear([type])`

* `type` String (опционально)

Очищает содержимое буфера обмена.

### `clipboard.availableFormats([type])`

* `type` String (опционально)

Returns `String[]` - An array of supported formats for the clipboard `type`.

### `clipboard.has(format[, type])` *Experimental*

* `format` String
* `type` String (опционально)

Returns `Boolean` - Whether the clipboard supports the specified `format`.

```javascript
const {clipboard} = require('electron')
console.log(clipboard.has('<p>selection</p>'))
```

### `clipboard.read(format)` *Экспериментально*

* `format` String

Returns `String` - Reads `format` type from the clipboard.

### `clipboard.readBuffer(format)` *Экспериментально*

* `format` String

Returns `Buffer` - Reads `format` type from the clipboard.

### `clipboard.writeBuffer(format, buffer[, type])` *Experimental*

* `format` String
* `buffer` Buffer
* `type` String (опционально)

Writes the `buffer` into the clipboard as `format`.

### `clipboard.write(data[, type])`

* `data` Object 
  * `text` String (optional)
  * `html` String (optional)
  * `image` [NativeImage](native-image.md) (optional)
  * `rtf` String (optional)
  * `bookmark` String (optional) - The title of the url at `text`.
* `type` String (опционально)

```javascript
const {clipboard} = require('electron')
clipboard.write({text: 'test', html: '<b>test</b>'})
```

Записывает `data` в буфер обмена.