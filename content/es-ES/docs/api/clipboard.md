# clipboard

> Realiza las operaciones de copiar y pegar en el portapapeles del sistema.

Proceso: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

En Linux, además hay un portapapeles `selection`. Para manipularlo necesitas pasar `selection` a cada método:

```javascript
const { clipboard } = require('electron')

clipboard.writeText('Example String', 'selection')
console.log(clipboard.readText('selection'))
```

## Métodos

El módulo `portapapeles` tiene los siguientes métodos:

**Nota:** APIs experimentales son marcadas como tales y podría ser removidas en el futuro.

### `clipboard.readText([type])`

* `type` String (opcional) - Puede ser `selection` o `clipboard`; por defecto es 'clipboard'. `selection` solo está disponible en Linux.

Devuelve `Cadena` - El contenido en el portapapeles como texto sin formato.

```js
const { clipboard } = require('electron')

clipboard.writeText('hello i am a bit of text!')

const text = clipboard.readText()
console.log(text)
// hello i am a bit of text!'
```

### `clipboard.writeText(text[, type])`

* `texto` String
* `type` String (opcional) - Puede ser `selection` o `clipboard`; por defecto es 'clipboard'. `selection` solo está disponible en Linux.

Escribe el `texto` en el portapapeles como texto sin formato.

```js
const { clipboard } = require('electron')

const text = 'hello i am a bit of text!'
clipboard.writeText(text)
```

### `clipboard.readHTML([type])`

* `type` String (opcional) - Puede ser `selection` o `clipboard`; por defecto es 'clipboard'. `selection` solo está disponible en Linux.

Devuelve `Cadena` - El contenido en el portapapeles como marca.

```js
const { clipboard } = require('electron')

clipboard.writeHTML('<b>Hi</b>')
const html = clipboard.readHTML()

console.log(html)
// <meta charset='utf-8'><b>Hi</b>
```

### `clipboard.writeHTML(markupo[, type])`

* `markup` Cadena
* `type` String (opcional) - Puede ser `selection` o `clipboard`; por defecto es 'clipboard'. `selection` solo está disponible en Linux.

Escribe `markup` en el portapapeles.

```js
const { clipboard } = require('electron')

clipboard.writeHTML('<b>Hi</b')
```

### `clipboard.readImage([type])`

* `type` String (opcional) - Puede ser `selection` o `clipboard`; por defecto es 'clipboard'. `selection` solo está disponible en Linux.

Devuelve [`NativeImage`](native-image.md) - El contenido de la imagen en el portapapeles.

### `clipboard.writeImage(imageo[, type])`

* `image` [NativeImage](native-image.md)
* `type` String (opcional) - Puede ser `selection` o `clipboard`; por defecto es 'clipboard'. `selection` solo está disponible en Linux.

Escribe `image` en el portapapeles.

### `clipboard.readRTF([type])`

* `type` String (opcional) - Puede ser `selection` o `clipboard`; por defecto es 'clipboard'. `selection` solo está disponible en Linux.

Devuelve `Cadena` - El contenido en el portapapeles como RTF.

```js
const { clipboard } = require('electron')

clipboard.writeRTF('{\\rtf1\\ansi{\\fonttbl\\f0\\fswiss Helvetica;}\\f0\\pard\nThis is some {\\b bold} text.\\par\n}')

const rtf = clipboard.readRTF()
console.log(rtf)
// {\\rtf1\\ansi{\\fonttbl\\f0\\fswiss Helvetica;}\\f0\\pard\nThis is some {\\b bold} text.\\par\n}
```

### `clipboard.writeRTF(texto[, type])`

* `texto` String
* `type` String (opcional) - Puede ser `selection` o `clipboard`; por defecto es 'clipboard'. `selection` solo está disponible en Linux.

Escribe el `text` en el portapapeles en RTF.

```js
const { clipboard } = require('electron')

const rtf = '{\\rtf1\\ansi{\\fonttbl\\f0\\fswiss Helvetica;}\\f0\\pard\nThis is some {\\b bold} text.\\par\n}'
clipboard.writeRTF(rtf)
```

### `clipboard.readBookmark()` _macOS_ _Windows_

Devuelve `Objecto`:

* `title` String
* `url` String

Devuelve un Objeto que contiene las claves `title` y `url` que representan el marcador en el portapapeles. Los valores `title` y `url` serán cadenas vacías cuando el marcador no está disponible.

### `clipboard.writeBookmark(title, url[, type])` _macOS_ _Windows_

* `title` String
* `url` String
* `type` String (opcional) - Puede ser `selection` o `clipboard`; por defecto es 'clipboard'. `selection` solo está disponible en Linux.

Escribe el `título` y la `url` en el portapapeles como un marcador.

**Nota:** La mayoría de las aplicaciones en Windows no soportan el pegado de marcadores dentro de ellas así que puedes usar `clipboard.write` para escribir tanto un marcador como un texto de respaldo en el portapapeles.

```js
const { clipboard } = require('electron')

clipboard.writeBookmark({
  text: 'https://electronjs.org',
  bookmark: 'Electron Homepage'
})
```

### `clipboard.readFindText()` _macOS_

Devuelve `String` - El texto en el portapapeles de búsqueda, el cual es el portapapeles que contiene información sobre el estado actual del panel de búsqueda de la aplicación.

Este método usa IPC síncrono cuando se llama desde el renderer process. El valor almacenado en el cache es re leído desde portapapeles de búsqueda cada vez que la aplicación se activa.

### `clipboard.writeFindText(text)` _macOS_

* `texto` String

Escribe el `text` portapapeles de búsqueda ( portapapeles que contiene información sobre el estado actual del panel de búsqueda de la aplicación) como texto plano. Este método usa IPC síncrono cuando se llama desde el renderer process.

### `clipboard.clear([type])`

* `type` String (opcional) - Puede ser `selection` o `clipboard`; por defecto es 'clipboard'. `selection` solo está disponible en Linux.

Borra el contenido del portapapeles.

### `clipboard.availableFormats([type])`

* `type` String (opcional) - Puede ser `selection` o `clipboard`; por defecto es 'clipboard'. `selection` solo está disponible en Linux.

Devuelve `Cadena[] ` - Una matriz de formatos admitidos para el portapapeles `type`.

```js
const { clipboard } = require('electron')

const formats = clipboard.availableFormats()
console.log(formats)
// [ 'text/plain', 'text/html' ]
```

### `clipboard.has(format[, type])` _Experimental_

* `format` Cadena
* `type` String (opcional) - Puede ser `selection` o `clipboard`; por defecto es 'clipboard'. `selection` solo está disponible en Linux.

Devuelve `Boolean`: si el portapapeles admite el `formato` especificado.

```js
const { clipboard } = require('electron')

const hasFormat = clipboard.has('<p>selection</p>')
console.log(hasFormat)
// 'true' or 'false
```

### `clipboard.read(format)` _Experimental_

* `format` Cadena

Devuelve `String` - Lee el tipo de `formato` del portapapeles.

### `clipboard.readBuffer(format)` _Experimental_

* `format` Cadena

Devuelve `Buffer` - Lee el `formato` del portapapeles.

```js
const { clipboard } = require('electron')

const buffer = Buffer.from('this is binary', 'utf8')
clipboard.writeBuffer('public.utf8-plain-text', buffer)

const ret = clipboard.readBuffer('public.utf8-plain-text')

console.log(buffer.equals(out))
// true
```

### `clipboard.writeBuffer(format, buffer[, type])` _Experimental_

* `format` Cadena
* `buffer` Buffer
* `type` String (opcional) - Puede ser `selection` o `clipboard`; por defecto es 'clipboard'. `selection` solo está disponible en Linux.

Escribe el `buffer` en el portapapeles como `formato`.

```js
const { clipboard } = require('electron')

const buffer = Buffer.from('writeBuffer', 'utf8')
clipboard.writeBuffer('public.utf8-plain-text', buffer)
```

### `clipboard.write(datao[, type])`

* `data` Object
  * `text` Cadena (opcional)
  * `html` Cadena (opcional)
  * `image` [NativeImage](native-image.md) (opcional)
  * `rtf` Cadena (opcional)
  * `bookmark` String (opcional) - El título de la URL en `text`.
* `type` String (opcional) - Puede ser `selection` o `clipboard`; por defecto es 'clipboard'. `selection` solo está disponible en Linux.

Escribe `datos` en el portapapeles.

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
