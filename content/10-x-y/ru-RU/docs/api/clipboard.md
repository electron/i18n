# clipboard

> Выполняет копирование и вставку в буфер обмена системы.

Процессы: [Основной](../glossary.md#main-process), [Графический](../glossary.md#renderer-process)

В Linux также есть `selection` буфер обмена. Для работы с ним необходимо передать `selection` каждому методу:

```javascript
const { clipboard } = require('electron')

clipboard.writeText('Пример строки', 'selection')
console.log(clipboard.readText('selection'))
```

## Методы

Модуль `clipboard` имеет следующие методы:

**Примечание:** Экспериментальные API помечены и могут быть удалены в будущем.

### `clipboard.readText([type])`

* `type` String (опционально) - Может быть `selection` или `clipboard`; по умолчанию 'clipboard'. `selection` доступен только в Linux.

Возвращает `String` — содержимое в буфере обмена в виде обычного текста.

```js
const { clipboard } = require('electron')

clipboard.writeText('hello i am a bit of text!')

const text = clipboard.readText()
console.log(text)
// hello i am a bit of text!'
```

### `clipboard.writeText(text[, type])`

* `text` String
* `type` String (опционально) - Может быть `selection` или `clipboard`; по умолчанию 'clipboard'. `selection` доступен только в Linux.

Записывает `text` в буфер обмена как обычный текст.

```js
const { clipboard } = require('electron')

const text = 'hello i am a bit of text!'
clipboard.writeText(text)
```

### `clipboard.readHTML([type])`

* `type` String (опционально) - Может быть `selection` или `clipboard`; по умолчанию 'clipboard'. `selection` доступен только в Linux.

Возвращает `String` - содержимое в буфере обмена в виде разметки.

```js
const { clipboard } = require('electron')

clipboard.writeHTML('<b>Hi</b>')
const html = clipboard.readHTML()

console.log(html)
// <meta charset='utf-8'><b>Hi</b>
```

### `clipboard.writeHTML(markup[, type])`

* `markup` String
* `type` String (опционально) - Может быть `selection` или `clipboard`; по умолчанию 'clipboard'. `selection` доступен только в Linux.

Записывает `markup` в буфер обмена.

```js
const { clipboard } = require('electron')

clipboard.writeHTML('<b>Hi</b')
```

### `clipboard.readImage([type])`

* `type` String (опционально) - Может быть `selection` или `clipboard`; по умолчанию 'clipboard'. `selection` доступен только в Linux.

Возвращает [`NativeImage`](native-image.md) - Содержимое изображения в буфере обмена.

### `clipboard.writeImage(image[, type])`

* `image` [NativeImage](native-image.md)
* `type` String (опционально) - Может быть `selection` или `clipboard`; по умолчанию 'clipboard'. `selection` доступен только в Linux.

Записывает `image` в буфер обмена.

### `clipboard.readRTF([type])`

* `type` String (опционально) - Может быть `selection` или `clipboard`; по умолчанию 'clipboard'. `selection` доступен только в Linux.

Возвращает `String` - содержимое в буфере обмена в виде RTF.

```js
const { clipboard } = require('electron')

clipboard.writeRTF('{\\rtf1\\ansi{\\fonttbl\\f0\\fswiss Helvetica;}\\f0\\pard\nThis is some {\\b bold} text.\\par\n}')

const rtf = clipboard.readRTF()
console.log(rtf)
// {\\rtf1\\ansi{\\fonttbl\\f0\\fswiss Helvetica;}\\f0\\pard\nThis is some {\\b bold} text.\\par\n}
```

### `clipboard.writeRTF(text[, type])`

* `text` String
* `type` String (опционально) - Может быть `selection` или `clipboard`; по умолчанию 'clipboard'. `selection` доступен только в Linux.

Записывает `text` в буфер обмена как RTF.

```js
const { clipboard } = require('electron')

const rtf = '{\\rtf1\\ansi{\\fonttbl\\f0\\fswiss Helvetica;}\\f0\\pard\nThis is some {\\b bold} text.\\par\n}'
clipboard.writeRTF(rtf)
```

### `clipboard.readBookmark()` _macOS_ _Windows_

Возвращает `Object`:

* `title` String
* `url` String

Возвращает объект, содержащий ключи `title` и `url`, представляющие закладку в буфере обмена. Значения `title` и `url` будут пустыми строками, когда закладки недоступны.

### `clipboard.writeBookmark(title, url[, type])` _macOS_ _Windows_

* `title` String
* `url` String
* `type` String (опционально) - Может быть `selection` или `clipboard`; по умолчанию 'clipboard'. `selection` доступен только в Linux.

Записывает `title` и `url` в буфер обмена, как закладку.

**Примечание:** Большинство приложений на Windows не поддерживают размещение закладок в них, так что Вы можете использовать `clipboard.write`, чтобы записать и закладку и резервный текст в буфер обмена.

```js
const { clipboard } = require('electron')

clipboard.writeBookmark({
  text: 'https://electronjs.org',
  bookmark: 'Electron Homepage'
})
```

### `clipboard.readFindText()` _macOS_

Возвращает `String` - текст в панели поиска, который представляет собой информацию о текущем состоянии панели поиска активного приложения.

Этот метод использует синхронный IPC, когда вызывается в процессе рендеринга. Закэшированное значение перечитывается из буфера обмена, всякий раз, когда приложение активировано.

### `clipboard.writeFindText(text)` _macOS_

* `text` String

Записывает `text` в панель поиска (панель, которая содержит информацию о текущем состоянии панели поиска активного приложения) в виде простого текста. Этот метод использует синхронный IPC, когда вызывается в процессе рендеринга.

### `clipboard.clear([type])`

* `type` String (опционально) - Может быть `selection` или `clipboard`; по умолчанию 'clipboard'. `selection` доступен только в Linux.

Очищает содержимое буфера обмена.

### `clipboard.availableFormats([type])`

* `type` String (опционально) - Может быть `selection` или `clipboard`; по умолчанию 'clipboard'. `selection` доступен только в Linux.

Возвращает `String[]` - массив поддерживаемых форматов для `type` буфера обмена.

```js
const { clipboard } = require('electron')

const formats = clipboard.availableFormats()
console.log(formats)
// [ 'text/plain', 'text/html' ]
```

### `clipboard.has(format[, type])` _Экспериментально_

* `format` String
* `type` String (опционально) - Может быть `selection` или `clipboard`; по умолчанию 'clipboard'. `selection` доступен только в Linux.

Возвращает `Boolean` - поддерживает ли буфер обмена указанный `format`.

```js
const { clipboard } = require('electron')

const hasFormat = clipboard.has('<p>selection</p>')
console.log(hasFormat)
// 'true' or 'false
```

### `clipboard.read(format)` _Экспериментально_

* `format` String

Возвращает `String` - читает тип `format` из буфера обмена.

### `clipboard.readBuffer(format)` _Экспериментально_

* `format` String

Возвращает `Buffer` - читает тип `format` из буфера обмена.

```js
const { clipboard } = require('electron')

const buffer = Buffer.from('this is binary', 'utf8')
clipboard.writeBuffer('public.utf8-plain-text', buffer)

const ret = clipboard.readBuffer('public.utf8-plain-text')

console.log(buffer.equals(out))
// true
```

### `clipboard.writeBuffer(format, buffer[, type])` _Экспериментально_

* `format` String
* `buffer` Buffer
* `type` String (опционально) - Может быть `selection` или `clipboard`; по умолчанию 'clipboard'. `selection` доступен только в Linux.

Записывает `buffer` в буфер обмена, как `format`.

```js
const { clipboard } = require('electron')

const buffer = Buffer.from('writeBuffer', 'utf8')
clipboard.writeBuffer('public.utf8-plain-text', buffer)
```

### `clipboard.write(data[, type])`

* `data` Object
  * `text` String (опционально)
  * `html` String (опционально)
  * `image` [NativeImage](native-image.md) (опционально)
  * `rtf` String (опционально)
  * `bookmark` String (опционально) - заголовок ссылки на `text`.
* `type` String (опционально) - Может быть `selection` или `clipboard`; по умолчанию 'clipboard'. `selection` доступен только в Linux.

Записывает `data` в буфер обмена.

```js
const { clipboard } = require('electron')

clipboard.write({
  text: 'test',
  html: '<b>Hi</b>',
  rtf: '{\\rtf1\\utf8 text}',
  bookmark: 'a title'
})

console.log(clipboard.readText())
// 'test'

console.log(clipboard.readHTML())
// <meta charset='utf-8'><b>Hi</b>

console.log(clipboard.readRTF())
// '{\\rtf1\\utf8 text}'

console.log(clipboard.readBookmark())
// { title: 'a title', url: 'test' }
```
