# clipboard

> Выполняет копирование и вставку в буфер обмена системы.

Процессы: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

В контексте renderer процесса clipboard зависит от [`remote`](remote.md) модуля в Linux, соответственно он не доступен, когда этот модуль отключен.

Следующий пример показывает, как записать строку в буфер обмена:

```javascript
const { clipboard } = require('electron')
clipboard.writeText('Пример строки')
```

Также в linux есть `selection` clipboard. Чтобы им воспользоваться, вам нужно указать `selection` в каждом методе:

```javascript
const { clipboard } = require('electron')
clipboard.writeText('Пример строки', 'selection')
console.log(clipboard.readText('selection'))
```

## Методы

Модуль `clipboard` имеет следующие методы:

**Примечание:** Экспериментальные API помечены и могут быть удалены в будущем.

### `clipboard.readText([type])`

* `тип` Строка (опционально) - может быть `selection` или `clipboard`. `selection` доступен только в Linux.

Возвращает `String` — содержимое в буфере обмена в виде обычного текста.

### `clipboard.writeText(text[, type])`

* `text` String
* `тип` Строка (опционально) - может быть `selection` или `clipboard`. `selection` доступен только в Linux.

Записывает `text` в буфер обмена как обычный текст.

### `clipboard.readHTML([type])`

* `тип` Строка (опционально) - может быть `selection` или `clipboard`. `selection` доступен только в Linux.

Возвращает `String` - содержимое в буфере обмена в виде разметки.

### `clipboard.writeHTML(markup[, type])`

* `markup` String
* `тип` Строка (опционально) - может быть `selection` или `clipboard`. `selection` доступен только в Linux.

Записывает `markup` в буфер обмена.

### `clipboard.readImage([type])`

* `тип` Строка (опционально) - может быть `selection` или `clipboard`. `selection` доступен только в Linux.

Возвращает [`NativeImage`](native-image.md) - Содержимое изображения в буфере обмена.

### `clipboard.writeImage(image[, type])`

* `image` [NativeImage](native-image.md)
* `тип` Строка (опционально) - может быть `selection` или `clipboard`. `selection` доступен только в Linux.

Записывает `image` в буфер обмена.

### `clipboard.readRTF([type])`

* `тип` Строка (опционально) - может быть `selection` или `clipboard`. `selection` доступен только в Linux.

Возвращает `String` - содержимое в буфере обмена в виде RTF.

### `clipboard.writeRTF(text[, type])`

* `text` String
* `тип` Строка (опционально) - может быть `selection` или `clipboard`. `selection` доступен только в Linux.

Записывает `text` в буфер обмена как RTF.

### `clipboard.readBookmark()` *macOS* *Windows*

Возвращает `Object`:

* `title` String
* `url` String

Returns an Object containing `title` and `url` keys representing the bookmark in the clipboard. The `title` and `url` values will be empty strings when the bookmark is unavailable.

### `clipboard.writeBookmark(title, url[, type])` *macOS* *Windows*

* `title` String
* `url` String
* `тип` Строка (опционально) - может быть `selection` или `clipboard`. `selection` доступен только в Linux.

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

* `тип` Строка (опционально) - может быть `selection` или `clipboard`. `selection` доступен только в Linux.

Очищает содержимое буфера обмена.

### `clipboard.availableFormats([type])`

* `тип` Строка (опционально) - может быть `selection` или `clipboard`. `selection` доступен только в Linux.

Returns `String[]` - An array of supported formats for the clipboard `type`.

### `clipboard.has(format[, type])` *Experimental*

* `format` String
* `тип` Строка (опционально) - может быть `selection` или `clipboard`. `selection` доступен только в Linux.

Returns `Boolean` - Whether the clipboard supports the specified `format`.

```javascript
const { clipboard } = require('electron')
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
* `тип` Строка (опционально) - может быть `selection` или `clipboard`. `selection` доступен только в Linux.

Writes the `buffer` into the clipboard as `format`.

### `clipboard.write(data[, type])`

* `data` Object 
  * `text` String (optional)
  * `html` String (optional)
  * `image` [NativeImage](native-image.md) (optional)
  * `rtf` String (optional)
  * `bookmark` String (optional) - The title of the url at `text`.
* `тип` Строка (опционально) - может быть `selection` или `clipboard`. `selection` доступен только в Linux.

```javascript
const { clipboard } = require('electron')
clipboard.write({ text: 'test', html: '<b>test</b>' })
```

Записывает `data` в буфер обмена.