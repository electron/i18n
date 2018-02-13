# clipboard

> 시스템 클립보드에 복사와 붙여넣기를 수행합니다.

프로세스: [메인](../glossary.md#main-process), [렌더러](../glossary.md#renderer-process)

다음 예시는 클립보드에 문자열을 쓰는 방법을 보여줍니다:

```javascript
const {clipboard} = require('electron')
clipboard.writeText('Example String')
```

X Window 시스템에선 selection 클립보드도 존재합니다. 이를 사용하려면 인수 뒤에 `selection` 문자열을 같이 지정해주어야 합니다:

```javascript
const {clipboard} = require('electron')
clipboard.writeText('Example String', 'selection')
console.log(clipboard.readText('selection'))
```

## 메서드

`clipboard` 모듈은 다음과 같은 메서드를 가지고 있습니다:

**참고**: Experimental 마크가 붙은 API는 실험적인 기능이며 차후 최신 버전에서 제거될 수 있습니다.

### `clipboard.readText([type])`

* `type` String (optional)

Returns `String` - 일반 텍스트 형식의 클립보드의 내용.

### `clipboard.writeText(text[, type])`

* `text` String
* `type` String (optional)

클립보드에 `plain text`로 문자열을 씁니다.

### `clipboard.readHTML([type])`

* `type` String (optional)

Returns `String` - 마크업 형식의 클립보드의 내용.

### `clipboard.writeHTML(markup[, type])`

* `markup` String
* `type` String (optional)

클립보드에 `markup`으로 씁니다.

### `clipboard.readImage([type])`

* `type` String (optional)

Returns [`NativeImage`](native-image.md) - NativeImage 형식의 클립보드의 내용.

### `clipboard.writeImage(image[, type])`

* `image` [NativeImage](native-image.md)
* `type` String (optional)

클립보드에 `image`를 씁니다.

### `clipboard.readRTF([type])`

* `type` String (optional)

Returns `String` - RTF 형식의 클립보드 내용.

### `clipboard.writeRTF(text[, type])`

* `text` String
* `type` String (optional)

클립보드에 `text`를 RTF 형식으로 씁니다.

### `clipboard.readBookmark()` *macOS* *Windows*

Returns `Object`:

* `title` String
* `url` String

클립보드로부터 북마크 형식으로 표현된 `title와 <code>url` 키를 담은 객체를 반환합니다. `title`과 `url` 값들은 북마크를 사용할 수 없을 때 빈 문자열을 포함합니다.

### `clipboard.writeBookmark(title, url[, type])` *macOS* *Windows*

* `title` String
* `url` String
* `type` String (optional)

`title`과 `url`을 클립보드에 북마크 형식으로 씁니다.

**참고**: 윈도우의 대부분의 앱은 북마크 붙여넣기를 지원하지 않습니다. `clipboard.write` 를 통해 북마크와 대체 텍스트를 클립보드에 쓸 수 있습니다.

```js
clipboard.write({
  text: 'https://electronjs.org',
  bookmark: 'Electron Homepage'
})
```

### `clipboard.readFindText()` *macOS*

Returns `String` - FindPasteboard 의 텍스트. 이 메소드는 렌더러 프로세스에서 호출되었을 떄 동기 IPC 를 사용합니다. 캐시된 값은 애플리케이션이 활성화될 때 마다 FindPasteboard 에서 다시 읽습니다. 

### `clipboard.writeFindText(text)` *macOS*

* `text` String

`text` 를 FindPasteboard 에 일반 텍스트로 씁니다. 이 메소드는 렌더러 프로세스에서 호출되었을 떄 동기 IPC 를 사용합니다.

### `clipboard.clear([type])`

* `type` String (optional)

클립보드에 저장된 모든 콘텐츠를 삭제합니다.

### `clipboard.availableFormats([type])`

* `type` String (optional)

Return `String[]` - 클립보드 `type` 에 지원되는 형식의 배열.

### `clipboard.has(format[, type])` *Experimental*

* `format` String
* `type` String (optional)

Returns `Boolean` - 클립보드가 지정한 `format`을 지원하는지 여부.

```javascript
const {clipboard} = require('electron')
console.log(clipboard.has('<p>selection</p>'))
```

### `clipboard.read(format)` *Experimental*

* `format` String

Returns `String` - 클립보드로부터 `format`를 읽습니다.

### `clipboard.readBuffer(format)` *Experimental*

* `format` String

Returns `Buffer` - 클립보드로부터 `format` 타입을 읽습니다.

### `clipboard.writeBuffer(format, buffer[, type])` *Experimental*

* `format` String
* `buffer` Buffer
* `type` String (optional)

`buffer`에 있는 `format`을 클립보드에 씁니다 .

### `clipboard.write(data[, type])`

* `data` Object 
  * `text` String (optional)
  * `html` String (optional)
  * `image` [NativeImage](native-image.md) (optional)
  * `rtf` String (optional)
  * `bookmark` String (optional) - The title of the url at `text`.
* `type` String (optional)

```javascript
const {clipboard} = require('electron')
clipboard.write({text: 'test', html: '<b>test</b>'})
```

`data`를 클립보드에 씁니다.