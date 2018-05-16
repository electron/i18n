# clipboard

> Realiza las operaciones de copiar y pegar en el portapapeles del sistema.

Proceso: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

El siguiente ejemplo muestra cómo escribir una cadena en el portapapeles:

```javascript
const {clipboard} = require('electron')
clipboard.writeText('Ejemplo de cadena')
```

En los sistemas X Window, también hay un portapapeles de selección. Para manipularlo, debe pasar `selección` a cada método:

```javascript
const {clipboard} = require('electron')
clipboard.writeText('Ejemplo de cadena', 'selección')
console.log(clipboard.readText ('selección'))
```

## Métodos

El módulo `portapapeles` tiene los siguientes métodos:

**Nota:** Las API experimentales están marcadas como tales y podrían eliminarse en el futuro.

### `clipboard.readText([type])`

* `type` Cadena (opcional)

Devuelve `Cadena` - El contenido en el portapapeles como texto sin formato.

### `clipboard.writeText(text[, type])`

* `texto` String
* `type` Cadena (opcional)

Escribe el `texto` en el portapapeles como texto sin formato.

### `clipboard.readHTML([type])`

* `type` Cadena (opcional)

Devuelve `Cadena` - El contenido en el portapapeles como marca.

### `clipboard.writeHTML(markup[, type])`

* `markup` Cadena
* `type` Cadena (opcional)

Escribe `markup` en el portapapeles.

### `clipboard.readImage([type])`

* `type` Cadena (opcional)

Devuelve [`NativeImage`](native-image.md) - El contenido de la imagen en el portapapeles.

### `clipboard.writeImage(image[, type])`

* `image` [NativeImage](native-image.md)
* `type` Cadena (opcional)

Escribe `image` en el portapapeles.

### `clipboard.readRTF([type])`

* `type` Cadena (opcional)

Devuelve `Cadena` - El contenido en el portapapeles como RTF.

### `clipboard.writeRTF(text[, type])`

* `texto` String
* `type` Cadena (opcional)

Escribe el `text` en el portapapeles en RTF.

### `clipboard.readBookmark()` *macOS* *Windows*

Devuelve `Objecto`:

* `title` Cadena
* `url` Cadena

Devuelve un Objeto que contiene las claves `title` y `url` que representan el marcador en el portapapeles. Los valores `title` y `url` serán cadenas vacías cuando el marcador no está disponible.

### `clipboard.writeBookmark(title, url[, type])` *macOS* *Windows*

* `title` Cadena
* `url` Cadena
* `type` Cadena (opcional)

Escribe el `título` y la `url` en el portapapeles como un marcador.

**Nota:** La mayoría de las aplicaciones en Windows no admiten el pegado de marcadores en ellas para que pueda usar `clipboard.write` para escribir un marcador y un texto alternativo en el portapapeles.

```js
clipboard.write({
  text: 'https://electronjs.org',
  bookmark: 'Electron Homepage'
})
```

### `clipboard.readFindText()` *macOS*

Devuelve `Cadena` - El texto en el portapapeles de búsqueda. Este método usa IPC síncrono cuando se llama desde el proceso de renderizado. El valor en caché se vuelve a leer desde el portapapeles de búsqueda cada vez que se activa la aplicación.

### `clipboard.writeFindText(text)` *macOS*

* `texto` Cadena

Escribe el `text` en el portapapeles de búsqueda como texto sin formato. Este método usa IPC síncrono cuando se llama desde el proceso de renderizado.

### `clipboard.clear([type])`

* `type` Cadena (opcional)

Borra el contenido del portapapeles.

### `clipboard.availableFormats([type])`

* `type` Cadena (opcional)

Devuelve `Cadena[] ` - Una matriz de formatos admitidos para el portapapeles `type`.

### `clipboard.has(format[, type])` *Experimental*

* `format` Cadena
* `type` Cadena (opcional)

Devuelve `Boolean`: si el portapapeles admite el `formato` especificado.

```javascript
const {clipboard} = require('electron')
console.log(clipboard.has('<p>selection</p>'))
```

### `clipboard.read(format)` *Experimental*

* `formato` Cadena

Devuelve `String` - Lee el tipo de `formato` del portapapeles.

### `clipboard.readBuffer(format)` *Experimental*

* `format` Cadena

Devuelve `Buffer` - Lee el `formato` del portapapeles.

### `clipboard.writeBuffer(format, buffer[, type])` *Experimental*

* `format` Cadena
* `buffer` Buffer
* `type` Cadena (opcional)

Escribe el `buffer` en el portapapeles como `formato`.

### `clipboard.write(data[, type])`

* `datos` Objecto 
  * `text` Cadena (opcional)
  * `html` Cadena (opcional)
  * `image` [NativeImage](native-image.md) (opcional)
  * `rtf` Cadena (opcional)
  * `marcador` Cadena (opcional) - El título de la url en `text`.
* `type` Cadena (opcional)

```javascript
const {clipboard} = require('electron')
clipboard.write({text: 'test', html: '<b>test</b>'})
```

Escribe `datos` en el portapapeles.