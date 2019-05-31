# clipboard

> Realizar cópia e colar operações na área de transferência do sistema.

Processo: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

In the renderer process context it depends on the [`remote`](remote.md) module on Linux, it is therefore not available when this module is disabled.

O exemplo a seguir mostra como gravar uma sequência de caracteres para a área de transferência:

```javascript
const { clipboard } = require('electron')
clipboard.writeText('Exemplo de string')
```

No Linux, há também uma área de transferência `selection`. Para manipulá-la você precisa passar `selection` para cada método:

```javascript
const { clipboard } = require('electron')
clipboard.writeText('Example String', 'selection')
console.log(clipboard.readText('selection'))
```

## Métodos

O módulo `clipboard` possui os seguintes métodos:

**Nota:** APIs experimentais são marcadas como tal e podem ser removidas no futuro.

### `clipboard.readText([type])`

* `type` String (opcional) - Pode ser `selection` ou `clipboard`. `selection` só está disponível no Linux.

Retorna `String` - o conteúdo da área de transferência como texto sem formatação.

### `clipboard.writeText(text[, type])`

* `text` String
* `type` String (opcional) - Pode ser `selection` ou `clipboard`. `selection` só está disponível no Linux.

Escreve o `text` na área de transferência como texto sem formatação.

### `clipboard.readHTML([type])`

* `type` String (opcional) - Pode ser `selection` ou `clipboard`. `selection` só está disponível no Linux.

Retorna `String` - o conteúdo da área de transferência como marcação.

### `clipboard.writeHTML(markup[, type])`

* `markup` String
* `type` String (opcional) - Pode ser `selection` ou `clipboard`. `selection` só está disponível no Linux.

Escreve `markup` na área de transferência.

### `clipboard.readImage([type])`

* `type` String (opcional) - Pode ser `selection` ou `clipboard`. `selection` só está disponível no Linux.

Retorna [`Nativeimage`](native-image.md) - o conteúdo da imagem na área de transferência.

### `clipboard.writeImage(image[, type])`

* `image` [NativeImage](native-image.md)
* `type` String (opcional) - Pode ser `selection` ou `clipboard`. `selection` só está disponível no Linux.

Escreve `image` na área de transferência.

### `clipboard.readRTF([type])`

* `type` String (opcional) - Pode ser `selection` ou `clipboard`. `selection` só está disponível no Linux.

Retorna `String` - o conteúdo da área de transferência como RTF.

### `clipboard.writeRTF(text[, type])`

* `text` String
* `type` String (opcional) - Pode ser `selection` ou `clipboard`. `selection` só está disponível no Linux.

Escreve o `text` na área de transferência em RTF.

### `clipboard.readBookmark()` *macOS* *Windows*

Retorna `Object`:

* `title` String
* String `url`

Retorna um Objeto que contém as chaves `title` e `url` representando o bookmark na área de transferência. Os valores de `title` e `url` serão strings vazias quando o bookmark estiver indisponível.

### `clipboard.writeBookmark(title, url[, type])` *macOS* *Windows*

* `title` String
* String `url`
* `type` String (opcional) - Pode ser `selection` ou `clipboard`. `selection` só está disponível no Linux.

Escreve o `title` e o `url` na área de transferência como um bookmark.

**Note:** Most apps on Windows don't support pasting bookmarks into them so you can use `clipboard.write` to write both a bookmark and fallback text to the clipboard.

```js
clipboard.write({
  text: 'https://electronjs.org',
  bookmark: 'Electron Homepage'
})
```

### `clipboard.readFindText()` no *macOS*

Returns `String` - The text on the find pasteboard. This method uses synchronous IPC when called from the renderer process. The cached value is reread from the find pasteboard whenever the application is activated.

### `clipboard.writeFindText(text)` no *macOS*

* `text` String

Writes the `text` into the find pasteboard as plain text. This method uses synchronous IPC when called from the renderer process.

### `clipboard.clear([type])`

* `type` String (opcional) - Pode ser `selection` ou `clipboard`. `selection` só está disponível no Linux.

Clears the clipboard content.

### `clipboard.availableFormats([type])`

* `type` String (opcional) - Pode ser `selection` ou `clipboard`. `selection` só está disponível no Linux.

Returns `String[]` - An array of supported formats for the clipboard `type`.

### `clipboard.has(format[, type])` *Experimental*

* `format` String
* `type` String (opcional) - Pode ser `selection` ou `clipboard`. `selection` só está disponível no Linux.

Returns `Boolean` - Whether the clipboard supports the specified `format`.

```javascript
const { clipboard } = require('electron')
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
* `type` String (opcional) - Pode ser `selection` ou `clipboard`. `selection` só está disponível no Linux.

Writes the `buffer` into the clipboard as `format`.

### `clipboard.write(data[, type])`

* `data` Object 
  * `text` String (optional)
  * `html` String (optional)
  * `image` [NativeImage](native-image.md) (optional)
  * `rtf` String (optional)
  * `bookmark` String (optional) - The title of the url at `text`.
* `type` String (opcional) - Pode ser `selection` ou `clipboard`. `selection` só está disponível no Linux.

```javascript
const { clipboard } = require('electron')
clipboard.write({ text: 'test', html: '<b>test</b>' })
```

Writes `data` to the clipboard.