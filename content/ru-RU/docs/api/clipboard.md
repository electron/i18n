# clipboard

> Выполняет копирование и вставку в буфер обмена системы.

Процессы: [Основной](../glossary.md#main-process), [Графический](../glossary.md#renderer-process)

На Linux, в контексте графического процесса зависит от модуля [`remote`](remote.md), соответственно не доступен, когда этот модуль отключен.

Следующий пример показывает, как записать строку в буфер обмена:

```javascript
const { clipboard } = require('electron')
clipboard.writeText('Пример строки')
```

На Linux также есть `selection` буфер обмена. Чтобы им воспользоваться, Вам нужно передать `selection` в каждый метод:

```javascript
const { clipboard } = require('electron')
clipboard.writeText('Пример строки', 'selection)
console.log(clipboard.readText('selection'))
```

## Методы

Модуль `clipboard` имеет следующие методы:

**Примечание:** Экспериментальные API помечены как таковые и могут быть удалены в будущем.

### `clipboard.readText([type])`

* `type` String (опционально) - может быть `selection` или `clipboard`. `selection` доступен только на Linux.

Возвращает `String` — содержимое буфера обмена в виде обычного текста.

### `clipboard.writeText(text[, type])`

* `text` String
* `type` String (опционально) - может быть `selection` или `clipboard`. `selection` доступен только на Linux.

Записывает `text` в буфер обмена, как обычный текст.

### `clipboard.readHTML([type])`

* `type` String (опционально) - может быть `selection` или `clipboard`. `selection` доступен только на Linux.

Возвращает `String` - содержимое буфера обмена в виде разметки.

### `clipboard.writeHTML(markup[, type])`

* `markup` String
* `type` String (опционально) - может быть `selection` или `clipboard`. `selection` доступен только на Linux.

Записывает `markup` в буфер обмена.

### `clipboard.readImage([type])`

* `type` String (опционально) - может быть `selection` или `clipboard`. `selection` доступен только на Linux.

Возвращает [`NativeImage`](native-image.md) - содержимое изображения в буфере обмена.

### `clipboard.writeImage(image[, type])`

* `image` [NativeImage](native-image.md)
* `type` String (опционально) - может быть `selection` или `clipboard`. `selection` доступен только на Linux.

Записывает `image` в буфер обмена.

### `clipboard.readRTF([type])`

* `type` String (опционально) - может быть `selection` или `clipboard`. `selection` доступен только на Linux.

Возвращает `String` - содержимое в буфере обмена в виде RTF.

### `clipboard.writeRTF(text[, type])`

* `text` String
* `type` String (опционально) - может быть `selection` или `clipboard`. `selection` доступен только на Linux.

Записывает `text` в буфер обмена как RTF.

### `clipboard.readBookmark()` *macOS* *Windows*

Возвращает `Object`:

* `title` String
* `url` String

Возвращает объект, содержащий ключи `title` и `url`, представляющие закладку в буфере обмена. Значения `title` и `url` будут пустыми строками, когда закладки недоступны.

### `clipboard.writeBookmark(title, url[, type])` *macOS* *Windows*

* `title` String
* `url` String
* `type` String (опционально) - может быть `selection` или `clipboard`. `selection` доступен только на Linux.

Записывает `title` и `url` в буфер обмена, как закладку.

**Примечание:** Большинство приложений на Windows не поддерживают размещение закладок в них, так что Вы можете использовать `clipboard.write`, чтобы записать и закладку и резервный текст в буфер обмена.

```js
clipboard.write({
  text: 'https://electronjs.org',
  bookmark: 'Домашняя страница Electron'
})
```

### `clipboard.readFindText()` *macOS*

Returns `String` - The text on the find pasteboard. This method uses synchronous IPC when called from the renderer process. The cached value is reread from the find pasteboard whenever the application is activated.

### `clipboard.writeFindText(text)` *macOS*

* `text` String

Writes the `text` into the find pasteboard as plain text. This method uses synchronous IPC when called from the renderer process.

### `clipboard.clear([type])`

* `type` String (опционально) - может быть `selection` или `clipboard`. `selection` доступен только на Linux.

Очищает содержимое буфера обмена.

### `clipboard.availableFormats([type])`

* `type` String (опционально) - может быть `selection` или `clipboard`. `selection` доступен только на Linux.

Returns `String[]` - An array of supported formats for the clipboard `type`.

### `clipboard.has(format[, type])` *Experimental*

* `format` String
* `type` String (опционально) - может быть `selection` или `clipboard`. `selection` доступен только на Linux.

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
* `type` String (опционально) - может быть `selection` или `clipboard`. `selection` доступен только на Linux.

Writes the `buffer` into the clipboard as `format`.

### `clipboard.write(data[, type])`

* `data` Object 
  * `text` String (optional)
  * `html` String (optional)
  * `image` [NativeImage](native-image.md) (optional)
  * `rtf` String (optional)
  * `bookmark` String (optional) - The title of the url at `text`.
* `type` String (опционально) - может быть `selection` или `clipboard`. `selection` доступен только на Linux.

```javascript
const { clipboard } = require('electron')
clipboard.write({ text: 'test', html: '<b>test</b>' })
```

Записывает `data` в буфер обмена.