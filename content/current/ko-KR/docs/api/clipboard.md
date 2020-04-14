# clipboard

> 시스템 클립보드에 복사와 붙여넣기를 수행합니다.

프로세스: [메인](../glossary.md#main-process), [렌더러](../glossary.md#renderer-process)

On Linux, there is also a `selection` clipboard. To manipulate it you need to pass `selection` to each method:

```javascript
const { clipboard } = require('electron')

clipboard.writeText('Example String', 'selection')
console.log(clipboard.readText('selection'))
```

## 메소드

`clipboard` 모듈은 다음과 같은 메서드를 가지고 있습니다:

**Note:** Experimental APIs are marked as such and could be removed in future.

### `clipboard.readText([type])`

* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

Returns `String` - 일반 텍스트 형식의 클립보드의 내용.

```js
const { clipboard } = require('electron')

clipboard.writeText('hello i am a bit of text!')

const text = clipboard.readText()
console.log(text)
// hello i am a bit of text!'
```

### `clipboard.writeText(text[, type])`

* `text` String
* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

클립보드에 `plain text`로 문자열을 씁니다.

```js
const { clipboard } = require('electron')

const text = 'hello i am a bit of text!'
clipboard.writeText(text)
```

### `clipboard.readHTML([type])`

* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

Returns `String` - 마크업 형식의 클립보드의 내용.

```js
const { clipboard } = require('electron')

clipboard.writeHTML('<b>Hi</b>')
const html = clipboard.readHTML()

console.log(html)
// <meta charset='utf-8'><b>Hi</b>
```

### `clipboard.writeHTML(markup[, type])`

* `markup` String
* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

클립보드에 `markup`으로 씁니다.

```js
const { clipboard } = require('electron')

clipboard.writeHTML('<b>Hi</b')
```

### `clipboard.readImage([type])`

* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

Returns [`NativeImage`](native-image.md) - NativeImage 형식의 클립보드의 내용.

### `clipboard.writeImage(image[, type])`

* `image` [NativeImage](native-image.md)
* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

클립보드에 `image`를 씁니다.

### `clipboard.readRTF([type])`

* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

Returns `String` - RTF 형식의 클립보드 내용.

```js
const { clipboard } = require('electron')

clipboard.writeRTF('{\\rtf1\\ansi{\\fonttbl\\f0\\fswiss Helvetica;}\\f0\\pard\nThis is some {\\b bold} text.\\par\n}')

const rtf = clipboard.readRTF()
console.log(rtf)
// {\\rtf1\\ansi{\\fonttbl\\f0\\fswiss Helvetica;}\\f0\\pard\nThis is some {\\b bold} text.\\par\n}
```

### `clipboard.writeRTF(text[, type])`

* `text` String
* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

클립보드에 `text`를 RTF 형식으로 씁니다.

```js
const { clipboard } = require('electron')

const rtf = '{\\rtf1\\ansi{\\fonttbl\\f0\\fswiss Helvetica;}\\f0\\pard\nThis is some {\\b bold} text.\\par\n}'
clipboard.writeRTF(rtf)
```

### `clipboard.readBookmark()` _macOS_ _Windows_

Returns `Object`:

* `title` String
* `url` String

클립보드로부터 북마크 형식으로 표현된 `title와 <code>url` 키를 담은 객체를 반환합니다. `title`과 `url` 값들은 북마크를 사용할 수 없을 때 빈 문자열을 포함합니다.

### `clipboard.writeBookmark(title, url[, type])` _macOS_ _Windows_

* `title` String
* `url` String
* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

`title`과 `url`을 클립보드에 북마크 형식으로 씁니다.

**Note:** Most apps on Windows don't support pasting bookmarks into them so you can use `clipboard.write` to write both a bookmark and fallback text to the clipboard.

```js
const { clipboard } = require('electron')

clipboard.writeBookmark({
  text: 'https://electronjs.org',
  bookmark: 'Electron Homepage'
})
```

### `clipboard.readFindText()` _macOS_

Returns `String` - The text on the find pasteboard, which is the pasteboard that holds information about the current state of the active application’s find panel.

This method uses synchronous IPC when called from the renderer process. The cached value is reread from the find pasteboard whenever the application is activated.

### `clipboard.writeFindText(text)` _macOS_

* `text` String

Writes the `text` into the find pasteboard (the pasteboard that holds information about the current state of the active application’s find panel) as plain text. This method uses synchronous IPC when called from the renderer process.

### `clipboard.clear([type])`

* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

클립보드에 저장된 모든 콘텐츠를 삭제합니다.

### `clipboard.availableFormats([type])`

* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

Return `String[]` - 클립보드 `type` 에 지원되는 형식의 배열.

```js
const { clipboard } = require('electron')

const formats = clipboard.availableFormats()
console.log(formats)
// [ 'text/plain', 'text/html' ]
```

### `clipboard.has(format[, type])` _Experimental_

* `format` String
* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

Returns `Boolean` - 클립보드가 지정한 `format`을 지원하는지 여부.

```js
const { clipboard } = require('electron')

const hasFormat = clipboard.has('<p>selection</p>')
console.log(hasFormat)
// 'true' or 'false
```

### `clipboard.read(format)` _Experimental_

* `format` String

Returns `String` - 클립보드로부터 `format`를 읽습니다.

### `clipboard.readBuffer(format)` _Experimental_

* `format` String

Returns `Buffer` - 클립보드로부터 `format` 타입을 읽습니다.

```js
const { clipboard } = require('electron')

const buffer = Buffer.from('this is binary', 'utf8')
clipboard.writeBuffer('public.utf8-plain-text', buffer)

const ret = clipboard.readBuffer('public.utf8-plain-text')

console.log(buffer.equals(out))
// true
```

### `clipboard.writeBuffer(format, buffer[, type])` _Experimental_

* `format` String
* `buffer` Buffer
* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

`buffer`에 있는 `format`을 클립보드에 씁니다 .

```js
const { clipboard } = require('electron')

const buffer = Buffer.from('writeBuffer', 'utf8')
clipboard.writeBuffer('public.utf8-plain-text', buffer)
```

### `clipboard.write(data[, type])`

* `data` Object
  * `text` String (optional)
  * `html` String (optional)
  * `image` [NativeImage](native-image.md) (optional)
  * `rtf` String (optional)
  * `bookmark` String (optional) - The title of the URL at `text`.
* `type` String (optional) - Can be `selection` or `clipboard`; default is 'clipboard'. `selection` is only available on Linux.

`data`를 클립보드에 씁니다.

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
