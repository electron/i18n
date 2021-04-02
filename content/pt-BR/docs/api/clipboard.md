# clipboard

> Realizar cópia e colar operações na área de transferência do sistema.

Processo: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

No Linux, há também uma `selection` área de transferência. Para manipulá-lo você precisa passar `selection` para cada método:

```javascript
const { clipboard } = require('electron')

clipboard.writeText('Example String', 'selection')
console.log(clipboard.readText('selection'))
```

## Métodos

O módulo `clipboard` possui os seguintes métodos:

**Nota:** APIs experimentais são marcadas como tal e podem ser removidas no futuro.

### `clipboard.readText([type])`

* `type` String (opcional) - Pode ser `selection` ou `clipboard`; padrão é 'prancheta'. `selection` só está disponível no Linux.

Retorna `String` - o conteúdo da área de transferência como texto sem formatação.

```js
const { clipboard } = require ('electron')

prancheta.writeText('Olá eu sou um pouco de texto!')

texto const = clipboard.readText() console
.log(texto)
// Olá eu sou um pouco de texto!'
```

### `clipboard.writeText(text[, type])`

* `text` String
* `type` String (opcional) - Pode ser `selection` ou `clipboard`; padrão é 'prancheta'. `selection` só está disponível no Linux.

Escreve o `text` na área de transferência como texto sem formatação.

```js
const { clipboard } = require ('electron')

texto const = 'Olá eu sou um pouco de texto!'
prancheta.writeText(texto)
```

### `clipboard.readHTML([type])`

* `type` String (opcional) - Pode ser `selection` ou `clipboard`; padrão é 'prancheta'. `selection` só está disponível no Linux.

Retorna `String` - o conteúdo da área de transferência como marcação.

```js
const { clipboard } = require ('electron')

prancheta.writeHTML('<b>Hi</b>')
const html = clipboard.readHTML() console

.log(html)
// <meta charset='utf-8'><b>Hi</b>
```

### `clipboard.writeHTML(markup[, type])`

* `markup` String
* `type` String (opcional) - Pode ser `selection` ou `clipboard`; padrão é 'prancheta'. `selection` só está disponível no Linux.

Escreve `markup` na área de transferência.

```js
const { clipboard } = requer ('elétron')

prancheta.writeHTML('<b>Hi</b')
```

### `clipboard.readImage([type])`

* `type` String (opcional) - Pode ser `selection` ou `clipboard`; padrão é 'prancheta'. `selection` só está disponível no Linux.

Retorna [`Nativeimage`](native-image.md) - o conteúdo da imagem na área de transferência.

### `clipboard.writeImage(image[, type])`

* `image` [NativeImage](native-image.md)
* `type` String (opcional) - Pode ser `selection` ou `clipboard`; padrão é 'prancheta'. `selection` só está disponível no Linux.

Escreve `image` na área de transferência.

### `clipboard.readRTF([type])`

* `type` String (opcional) - Pode ser `selection` ou `clipboard`; padrão é 'prancheta'. `selection` só está disponível no Linux.

Retorna `String` - o conteúdo da área de transferência como RTF.

```js
const { clipboard } = require ('electron')

prancheta.writeRTF('{\\rtf1\\ansi{\\fonttbl\\f0\\fswiss Helvetica;} \\f0\\pard\nEste é algum texto {\\\b negrito}\n}')

const rtf = área de transferência.readRTF()
console.log(rtf)
// {\\rtf1\\ansi{\\fonttbl\\f0\\fswis Helvetica;} \\f0\\pard\nEste é algum texto {\\b negrito}.\\par\n}
```

### `clipboard.writeRTF(text[, type])`

* `text` String
* `type` String (opcional) - Pode ser `selection` ou `clipboard`; padrão é 'prancheta'. `selection` só está disponível no Linux.

Escreve o `text` na área de transferência em RTF.

```js
const { clipboard } = require ('electron')

const rtf = '{\\rtf1\\ansi{\\fonttbl\\f0\\fswiss Helvetica;} \\f0\\pard\nEste é algum texto {\\b negrito}.\\par\n}'
área de transferência.writeRTF(rtf)
```

### `clipboard.readBookmark()` __ __do MacOS

Retorna `Object`:

* `title` String
* String `url`

Retorna um Objeto que contém as chaves `title` e `url` representando o bookmark na área de transferência. Os valores de `title` e `url` serão strings vazias quando o bookmark estiver indisponível.

### `clipboard.writeBookmark(title, url[, type])` __ __do MacOS

* `title` String
* String `url`
* `type` String (opcional) - Pode ser `selection` ou `clipboard`; padrão é 'prancheta'. `selection` só está disponível no Linux.

Escreve o `title` e o `url` na área de transferência como um bookmark.

**Nota:** A maioria dos aplicativos no Windows não suportam marcar marcadores colados neles para você pode usar `clipboard.write` para escrever um marcador e um texto de recuo na área de transferência .

```js
const { clipboard } = require ('electron')

clipboard.writeBookmark({
  texto: 'https://electronjs.org',
  marcador: 'Página inicial de elétrons'
})
```

### `clipboard.readFindText()` __macOS

Devoluções `String` - O texto no quadro de dados find, que é o quadro de dados que contém informações sobre o estado atual do painel de achados do aplicativo ativo.

Este método usa IPC síncrocro quando chamado do processo renderizador. O valor armazenado em cache é relido a partir do quadro de dados de achados sempre que o aplicativo é ativado.

### `clipboard.writeFindText(text)` __macOS

* `text` String

A `text` no quadro de dados de achados (o quadro de dados que contém informações sobre o estado atual do painel de achados do aplicativo ativo) como texto simples. Este método usa IPC síncrocro quando chamado do processo renderizador.

### `clipboard.clear([type])`

* `type` String (opcional) - Pode ser `selection` ou `clipboard`; padrão é 'prancheta'. `selection` só está disponível no Linux.

Limpa o conteúdo da prancheta.

### `clipboard.availableFormats([type])`

* `type` String (opcional) - Pode ser `selection` ou `clipboard`; padrão é 'prancheta'. `selection` só está disponível no Linux.

Retornos `String[]` - Uma série de formatos suportados para a `type`da área de transferência .

```js
const { clipboard } = exigir ('elétron')

formatos de const = área de transferência.availableFormats()
console.log(formatos)
// [ 'text/plain', 'text/html' ]
```

### </em>Experimental `clipboard.has(format[, type])` _</h3>

* `format` Cordas
* `type` String (opcional) - Pode ser `selection` ou `clipboard`; padrão é 'prancheta'. `selection` só está disponível no Linux.

Devolução `Boolean` - Se a área de transferência suporta o `format`especificado .

```js
const { clipboard } = require ('electron')

const hasFormat = prancheta.has('<p>seleção</p>')
console.log(hasFormat)
// 'true' ou 'falso'
```

### </em>Experimental `clipboard.read(format)` _</h3>

* `format` Cordas

Devoluções `String` - Lê `format` tipo da prancheta.

### </em>Experimental `clipboard.readBuffer(format)` _</h3>

* `format` Cordas

Devoluções `Buffer` - Lê `format` tipo da prancheta.

```js
const { clipboard } = requer ('elétron')

tampão de const = Buffer.from ('isso é binário', 'utf8')
prancheta.writeBuffer ('public.utf8-plain-text', buffer)

const ret = clipboard.readBuffer ('public.utf8-plain-text')

console.log(buffer.equals(out))
// true
```

### </em>Experimental `clipboard.writeBuffer(format, buffer[, type])` _</h3>

* `format` Cordas
* `buffer` Buffer
* `type` String (opcional) - Pode ser `selection` ou `clipboard`; padrão é 'prancheta'. `selection` só está disponível no Linux.

Escreve o `buffer` na prancheta como `format`.

```js
const { clipboard } = require ('electron')

tampão de const = Buffer.from ('writeBuffer', 'utf8')
clipboard.writeBuffer('public.utf8-plain-text', buffer)
```

### `clipboard.write(data[, type])`

* objeto `data`
  * `text` String (opcional)
  * `html` String (opcional)
  * `image` [NativeImage](native-image.md) (opcional)
  * `rtf` String (opcional)
  * `bookmark` String (opcional) - O título da URL em `text`.
* `type` String (opcional) - Pode ser `selection` ou `clipboard`; padrão é 'prancheta'. `selection` só está disponível no Linux.

Escreve `data` para a prancheta.

```js
const { clipboard } = require ('electron')

clipboard.write({
  texto: 'teste',
  html: '<b>Hi</b>',
  rtf: '{\\rtf1\\utf8 text}',
  marcador: 'um título'
})

console.log(prancheta.readText())
// 'teste'

\rconsole .log(clipboard.readHTML())
// <meta charset='utf-8'><b>Console Hi</b>

.log(clipboard.readRTF())
// '{\  tf1\\utf8 text}' console

.log(clipboard.readBookmark())
// { title: 'a title', url: 'test' }
```
