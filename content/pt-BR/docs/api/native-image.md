# nativeImage

> Cria ícones de bandeija, dock e aplicações usando arquivos PNG ou JPG.

Processo: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

No Electron, para as API's que levam imagens, você pode passar tanto caminhos de arquivos ou instâncias `NativeImage`. Uma imagem vazia será usada quando `null` é passado.

Por exemplo, quando for criar uma bandeija ou designar um ícone para uma janela, você pode passar um caminho de arquivo de imagem com a `String`:

```javascript
const {BrowserWindow, Tray} = require('electron')

const appIcon = new Tray('/Users/somebody/images/icon.png')
let win = new BrowserWindow({icon: '/Users/somebody/images/window.png'})
console.log(appIcon, win)
```

Ou ler a imagem a partir do clipboard que retorna um `NativeImage`:

```javascript
const {clipboard, Tray} = require('electron')
const image = clipboard.readImage()
const appIcon = new Tray(image)
console.log(appIcon)
```

## Formatos Suportados

Atualmente os formatos de imagem `PNG` e `JPEG` são suportados. `PNG` são recomendados pelo seu suporte a transparência e compressão sem perda de qualidade.

No Windows, você também pode carregar icones `ICO` a partir de caminhos de arquivos. Para a melhor qualidade visual é recomendado incluir ao menos os seguintes tamanhos nos:

* Ícone pequeno 
 * 16x16 (com escala de DPI com 100%)
 * 20x20 (com escala de DPI com 125%)
 * 24x24 (com escala de DPI com 150%)
 * 32x32 (com escala de DPI com 200%)
* Ícone grande 
 * 32x32 (com escala de DPI com 100%)
 * 40x40 (com escala de DPI com 150%)
 * 48x48 (com escala de DPI com 150%)
 * 64x64 (com escala de DPI com 200%)
* 256x256

Confira a seção *Size requirements* [nesse artigo](https://msdn.microsoft.com/en-us/library/windows/desktop/dn742485(v=vs.85).aspx).

## Imagem em Alta Resolução

Em plataformas que possuem supporte para high-DPI como a tela Retina daApple, você pode acrescentar `@2x` depois do nome base da imagem para marcar-la como imagem de alta resolução.

Por exmplo se `icon.png` é uma imagem normal que possui resolução padrão, então `icon@2x.png` será tratada como uma imagem de alta resolução que tem dupla densidade de DPI.

Se você deseja ter o suporte para telas com diferentes densidades de DPI ao mesmo tempo, você pode colocar imagens de diferentes tamanhos na mesma pasta e usar o nome do arquivo sem os sufixos de DPI. Como por exemplo:

```text
images/
├── icon.png
├── icon@2x.png
└── icon@3x.png
```

```javascript
const {Tray} = require('electron')
let appIcon = new Tray('/Users/somebody/images/icon.png')
console.log(appIcon)
```

Os seguintes sufixos para DPI são também suportados:

* `@1x`
* `@1.25x`
* `@1.33x`
* `@1.4x`
* `@1.5x`
* `@1.8x`
* `@2x`
* `@2.5x`
* `@3x`
* `@4x`
* `@5x`

## Imagem Padrão

Imagens padrão consistem de cores claras e pretas (e um canal alfa). Imagens padrão não são destinadas a serem usadas sozinhas, e geralmente são acompanhadas por outros conteúdos para criar a aparência final desejada.

O caso mais comum é usar imagens padrão em ícones de barra de menu assim podendo se adaptar tanto para barras de menus claras quanto escuras.

**Obs.:** Imagens padrão são suportadas somente no macOS.

Para marcar uma imagem como imagem padão, o nome do arquivo deverá terminar com a palavra `Template`. Como por exemplo:

* `xxxTemplate.png`
* `xxxTemplate@2x.png`

## Métodos

O módulo `nativeImage` possui os seguintes métodos, todos os quais retornam uma instância da classe `NativeImage`:

### `nativeImage.createEmpty()`

Retorna `NativeImage`

Cria uma instância `NativeImage` vazia.

### `nativeImage.createFromPath(path)`

* `path` String

Retorna `NativeImage`

Cria uma nova instância `NativeImage` de um arquivo localizado em `path`. Esse método retorna uma imagem vazia se `path` não existir, não poder ser lido, ou não ser uma imagem válida.

```javascript
const nativeImage = require('electron').nativeImage

let image = nativeImage.createFromPath('/Users/somebody/images/icon.png')
console.log(image)
```

### `nativeImage.createFromBuffer(buffer[, options])`

* `buffer` [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer)
* `options` Object (opcional) * `width` Integer (opcional) - Necessário para buffers de bitmap. * `height` Integer (opicional) - Necessário para buffers de bitmap. * `scaleFactor` Double (opicional) - Padrão sendo 1.0.

Retorna `NativeImage`

Cria uma nova instância `NativeImage` a partir do `buffer`.

### `nativeImage.createFromDataURL(dataURL)`

* `dataURL` String

Retorna `NativeImage`

Cria uma nova instância `NativeImage` a partir do `dataURL`.

### `nativeImage.createFromNamedImage(imageName[, hslShift])` *macOS*

* `imageName` String
* `hslShift` Number[]

Retorna `NativeImage`

Cria uma nova instância de `NativeImage` a partir de NSImage o qual direciona para o dado nome da Imagem. Veja [`NSImageName`](https://developer.apple.com/documentation/appkit/nsimagename?language=objc) para uma lista dos possíveis valores.

O `hslShift` é aplicado à imagem com as seguintes regras

* `hsl_shift[0]` (matiz): O valor absoluto da matiz para a imagem - 0 e 1 direciona para 0 e 360 na roda de cores (vermelho).
* `hsl_shift[1]` (saturação): Uma mudança de saturação para a imagem, com os seguintes valores chaves:  
 0 = remove todas as cores:  
 0.5 = permanece inalterada  
 1 = realiza a saturação total da imagem. 
* `hsl_shift[2]` (luminosidade): Uma mudança de luminosidade para a imagem, com os seguintes valores chaves:  
 0 = remove totalmente a luminosidade (deixa todos os pixels pretos)  
 0.5 = permanece inalterada  
 1 = luminosidade total (deixa todos os pixels brancos).

Isso significa que `[-1, 0, 1]` irá deixar a imagem totalmente branca e `[-1, 1, 0]` irá deixar a imagem totalmente preta.

## Classe: NativeImage

> Natively wrap images such as tray, dock, and application icons.

Processo: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

### Métodos de Instância

Os seguintes métodos estão disponíveis nas instâncias da classe `NativeImage`:

#### `image.toPNG([options])`

* `options` Object (opcional) * `scaleFactor` Double (opcional) - Padrão sendo 1.0.

Retorna `Buffer` - Um [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer) que contém os dados codificados de `PNG` da imagem.

#### `image.toJPEG(quality)`

* `quality` Integer (**Necessário**) - Entre 0 - 100.

Retorna `Buffer` - Um [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer) que contém os dados codificados de `JPG` da imagem.

#### `image.toBitmap([options])`

* `options` Object (opcional) * `scaleFactor` Double (opcional) - Padrão sendo 1.0.

Retorna `Buffer` - Um [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer) que contém uma copia dos dados de bitmap crus (sem alterações) da imagem.

#### `image.toDataURL([options])`

* `options` Object (opcional) * `scaleFactor` Double (opcional) - Padrão sendo 1.0.

Retorna `String` - Os dados de URL da imagem.

#### `image.getBitmap([options])`

* `options` Object (opcional) * `scaleFactor` Double (opcional) - Padrão sendo 1.0.

Retorna `Buffer` - Um [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer) que contém os dados de bitmap crus (sem alterações) da imagem.

A diferença entre `getBitmap()` e `toBitmap()` é que, `getBitmap()` não copia os dados de bitmap, portanto você tem que usar o buffer retornado imadiatamente no instante do loop do evento, senão os dados podem mudar ou serem destruídos.

#### `image.getNativeHandle()` no *macOS*

Returns `Buffer` - A [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer) that stores C pointer to underlying native handle of the image. On macOS, a pointer to `NSImage` instance would be returned.

Perceba que o ponteiro retornado é um ponteiro fraco para a imagem nativa subjacente invés de uma cópia, então você *deve* se certificar de que a instância `nativeImage` esteja próxima.

#### `image.isEmpty()`

Retorna `Boolean` - estando a imagem vazia ou não.

#### `image.getSize()`

Retorna [`Size`](structures/size.md)

#### `image.setTemplateImage(option)`

* `option` Boolean

Marca a imagem como uma imagem padrão.

#### `image.isTemplateImage()`

Retorna `Boolean` - sendo a imagem uma imagem padrão ou não.

#### `image.crop(rect)`

* `rect` [Rectangle](structures/rectangle.md) - A área da imagem a ser cortada

Retorna `NativeImage` - A imagem cortada.

#### `image.resize(options)`

* `options` Object * `width` Integer (opcional) - O padrão para a largura da imagem. * `height` Integer (opcional) - O padrão para a altura da imagem * `quality` String (opcional) - A qualidade desejada para a imagem cortada. Possíveis valores são `good`, `better` ou `best`. O padrão é `best`. These values express a desired quality/speed tradeoff. They are translated into an algorithm-specific method that depends on the capabilities (CPU, GPU) of the underlying platform. It is possible for all three methods to be mapped to the same algorithm on a given platform.

Returns `NativeImage` - The resized image.

If only the `height` or the `width` are specified then the current aspect ratio will be preserved in the resized image.

#### `image.getAspectRatio()`

Returns `Float` - The image's aspect ratio.

#### `image.addRepresentation(options)`

* `options` Object * `scaleFactor` Double - The scale factor to add the image representation for. * `width` Integer (optional) - Defaults to 0. Required if a bitmap buffer is specified as `buffer`. * `height` Integer (optional) - Defaults to 0. Required if a bitmap buffer is specified as `buffer`. * `buffer` Buffer (optional) - The buffer containing the raw image data. * `dataURL` String (optional) - The data URL containing either a base 64 encoded PNG or JPEG image.

Add an image representation for a specific scale factor. This can be used to explicitly add different scale factor representations to an image. This can be called on empty images.