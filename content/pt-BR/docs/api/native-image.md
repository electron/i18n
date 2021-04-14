# nativeImage

> Cria ícones de bandeija, dock e aplicações usando arquivos PNG ou JPG.

Processo: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

Em Electron, para as APIs que tiram imagens, você pode passar por caminhos de arquivo ou `NativeImage` instâncias. Uma imagem vazia será usada quando `null` for aprovada.

Por exemplo, quando for criar uma bandeija ou designar um ícone para uma janela, você pode passar um caminho de arquivo de imagem com a `String`:

```javascript
const { BrowserWindow, Tray } = require ('electron')

const appIcon = novo Tray('/Users/somebody/images/icon.png')
const win = novo browserWindow({icon: '/Users/somebody/images/window.png' })
console.log(appIcon, win)
```

Ou leia a imagem da prancheta, que retorna uma `NativeImage`:

```javascript
const { clipboard, Tray } = require('electron')
const image = clipboard.readImage()
const appIcon = new Tray(image)
console.log(appIcon)
```

## Formatos Suportados

Atualmente, formatos de imagem `PNG` e `JPEG` são suportados. `PNG` é recomendado devido ao seu apoio à transparência e à compressão sem perdas.

No Windows, você também pode carregar `ICO` ícones de caminhos de arquivo. Para a melhor qualidade visual , recomenda-se incluir pelo menos os seguintes tamanhos no:

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

Confira a seção *Size requirements* [nesse artigo][icons].

## Imagem em Alta Resolução

Em plataformas que possuem suporte para high-DPI como a tela Retina da Apple, você pode acrescentar `@2x` depois do nome base da imagem para marcar-la como imagem de alta resolução.

Por exemplo, se `icon.png` é uma imagem normal que tem resolução padrão, então `icon@2x.png` será tratada como uma imagem de alta resolução que tem dupla densidade de DPI.

Se você quiser suportar displays com diferentes densidades de DPI ao mesmo tempo, você pode colocar imagens com tamanhos diferentes na mesma pasta e usar o nome de arquivo sem sufixos DPI. Como por exemplo:

```plaintext
images/
├── icon.png
├── icon@2x.png
└── icon@3x.png
```

```javascript
const { Tray } = require ('electron')
const appIcon = novo Tray ('/Users/somebody/images/icon.png')
console.log(appIcon)
```

Os seguintes sufixos para DPI também são suportados:

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

## Modelo de Imagem

As imagens do modelo consistem em preto e um canal alfa. Imagens padrão não são destinadas a serem usadas sozinhas, e geralmente são acompanhadas por outros conteúdos para criar a aparência final desejada.

O caso mais comum é usar imagens de modelo para um ícone de barra de menu, para que ele possa se adaptar às barras de menu claro e escuro.

**Nota:** Imagens padrão são suportadas somente no macOS.

Para marcar uma imagem como uma imagem de modelo, seu nome de arquivo deve terminar com a palavra `Template`. Como por exemplo:

* `xxxTemplate.png`
* `xxxTemplate@2x.png`

## Métodos

O módulo `nativeImage` possui os seguintes métodos, todos os quais retornam uma instância da classe `NativeImage`:

### `nativeImage.createEmpty()`

Retorna `NativeImage`

Cria uma instância `NativeImage` vazia.

### `nativeImage.createThumbnailFromPath(path, maxSize)` __ __do MacOS

* `path` String - caminho para um arquivo que pretendemos construir uma miniatura a partir.
* `maxSize` [Tamanho](structures/size.md) - a largura máxima e altura (números positivos) que a miniatura retornou podem ser. A implementação do Windows ignorará `maxSize.height` e dimensionará a altura de acordo com `maxSize.width`.

Devoluções `Promise<NativeImage>` - cumpridas com a imagem de visualização em miniatura do arquivo, que é uma</a>

NativeImage .</p> 



### `nativeImage.createFromPath(path)`

* `path` String

Retorna `NativeImage`

Cria uma nova instância `NativeImage` de um arquivo localizado em `path`. Esse método retorna uma imagem vazia se `path` não existir, não poder ser lido, ou não ser uma imagem válida.



```javascript
const nativeImage = require ('electron').nativeImage

imagem const = nativeImage.createFromPath('/Users/somebody/images/icon.png')
console.log(imagem)
```




### `nativeImage.createFromBitmap (buffer, opções)`

* `buffer` [Buffer][buffer]
* objeto `options` 
    * `width` Integer
  * `height` Integer
  * `scaleFactor` Double (opcional) - Padrão sendo 1.0.

Retorna `NativeImage`

Cria uma nova instância de `NativeImage` a partir de `buffer` que contém o bitmap bruto dados de pixels retornados por `toBitmap()`. O formato específico é dependente da plataforma.



### `nativeImage.createFromBuffer(buffer[, options])`

* `buffer` [Buffer][buffer]
* objeto `options` (opcional) 
    * `width` Inteiro (opcional) - Necessário para buffers de bitmap.
  * `height` Integer (opicional) - Necessário para buffers de bitmap.
  * `scaleFactor` Double (opcional) - Padrão sendo 1.0.

Retorna `NativeImage`

Cria uma nova instância `NativeImage` a partir do `buffer`. Tenta decodificar como PNG ou JPEG primeiro.



### `nativeImage.createFromDataURL(dataURL)`

* `dataURL` String

Retorna `NativeImage`

Cria uma nova instância `NativeImage` a partir do `dataURL`.



### `nativeImage.createFromNamedImage(imageName[, hslShift])` _macOS_

* `imageName` String
* número de `hslShift` [] (opcional)

Retorna `NativeImage`

Cria uma nova instância de `NativeImage` a partir de NSImage o qual direciona para o dado nome da Imagem. Consulte [`System Icons`](https://developer.apple.com/design/human-interface-guidelines/macos/icons-and-images/system-icons/) para obter uma lista de possíveis valores.

O `hslShift` é aplicado à imagem com as seguintes regras:

* `hsl_shift[0]` (matiz): O valor absoluto da tonalidade para a imagem - 0 e 1 mapa para 0 e 360 na roda colorida da tonalidade (vermelho).

* `hsl_shift[1]` (saturação): Uma mudança de saturação para a imagem, com a seguintes valores-chave: 0 = remova toda a cor. 0,5 = deixar inalterado. 1 = saturar totalmente a imagem.

* `hsl_shift[2]` (leveza): Uma mudança de leveza para a imagem, com o seguintes valores-chave: 0 = remova toda a leveza (faça todos os pixels pretos). 0,5 = deixar inalterado. 1 = leveza total (tornar todos os pixels brancos).

Isso significa que `[-1, 0, 1]` irá deixar a imagem totalmente branca e `[-1, 1, 0]` irá deixar a imagem totalmente preta.

Em alguns casos, o `NSImageName` não corresponde à sua representação de cordas; um exemplo disso é `NSFolderImageName`, cuja representação de cordas seria realmente `NSFolder`. Portanto, você precisará determinar a representação correta da sequência de strings para sua imagem antes de passá-la. Isso pode ser feito com o seguinte:

`echo -e '#import <Cocoa/Cocoa.h>\nint main() { NSLog(@"%@", SYSTEM_IMAGE_NAME); }' | clang -otest -x objective-c -framework Cacau - && ./teste`

onde `SYSTEM_IMAGE_NAME` deve ser substituído por qualquer valor de [esta lista](https://developer.apple.com/documentation/appkit/nsimagename?language=objc).



## Class: NativeImage



> Embrulhe nativamente imagens como ícones de bandeja, doca e aplicativo.

Processo: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)



### Métodos de Instância

Os seguintes métodos estão disponíveis nas instâncias da classe `NativeImage`:



#### `image.toPNG([options])`

* objeto `options` (opcional) 
    * `scaleFactor` Double (opcional) - Padrão sendo 1.0.

Retorna `Buffer` - Um [Buffer][buffer] que contém os dados codificados de `PNG` da imagem.



#### `image.toJPEG(quality)`

* `quality` Inteiro - Entre 0 a 100.

Retorna `Buffer` - Um [Buffer][buffer] que contém os dados codificados de `JPG` da imagem.



#### `image.toBitmap([options])`

* objeto `options` (opcional) 
    * `scaleFactor` Double (opcional) - Padrão sendo 1.0.

Retorna `Buffer` - Um [Buffer][buffer] que contém uma copia dos dados de bitmap crus (sem alterações) da imagem.



#### `image.toDataURL([options])`

* objeto `options` (opcional) 
    * `scaleFactor` Double (opcional) - Padrão sendo 1.0.

Retorna `String` - Os dados de URL da imagem.



#### `image.getBitmap([options])`

* objeto `options` (opcional) 
    * `scaleFactor` Double (opcional) - Padrão sendo 1.0.

Retorna `Buffer` - Um [Buffer][buffer] que contém os dados de bitmap crus (sem alterações) da imagem.

A diferença entre `getBitmap()` e `toBitmap()` é que `getBitmap()` não copia os dados do bitmap, então você tem que usar o Buffer retornado imediatamente em atual tique-taque do loop de evento; caso contrário, os dados podem ser alterados ou destruídos.



#### `image.getNativeHandle()` no _macOS_

Devoluções `Buffer` - Um</a> de buffer de que armazena o ponteiro C para a alça nativa subjacente de a imagem. No macOS, um ponteiro para `NSImage` instância seria devolvido.</p> 

Perceba que o ponteiro retornado é um ponteiro fraco para a imagem nativa subjacente invés de uma cópia, então você _deve_ se certificar de que a instância `nativeImage` esteja próxima.



#### `image.isEmpty()`

Retorna `Boolean` - Se a imagem está vazia.



#### `image.getSize ([scaleFactor])`

* `scaleFactor` Double (opcional) - Padrão sendo 1.0.

Retorna [`Size`](structures/size.md).

Se `scaleFactor` for aprovada, isso retornará o tamanho correspondente à representação da imagem mais próxima do valor passado.



#### `image.setTemplateImage(option)`

* `option` Boolean

Marca a imagem como uma imagem padrão.



#### `image.isTemplateImage()`

Retorna `Boolean` - sendo a imagem uma imagem padrão ou não.



#### `image.crop(rect)`

* `rect` [Rectangle](structures/rectangle.md) - A área da imagem a ser cortada.

Retorna `NativeImage` - A imagem cortada.



#### `image.resize(options)`

* objeto `options` 
    * `width` Inteiro (opcional) - Padrão para a largura da imagem.
  * `height` Inteiro (opcional) - Padrão na altura da imagem.
  * `quality` String (opcional) - A qualidade desejada da imagem de redimensionar. Os valores possíveis são `good`, `better`ou `best`. O padrão é `best`. Esses valores apresentam a qualidade/velocidade de troca desejada. Eles são traduzidos em um método específico de algoritmo que depende das capacidades (CPU, GPU) da plataforma subjacente. É possível que todos os três métodos sejam mapeados para o mesmo algoritmo em uma determinada plataforma.

Retorna `NativeImage` - A imagem redimensionada.

Se apenas o `height` ou o `width` forem definidos então a atual proporção de tela da imagem será preservada na imagem redimensionada.



#### `image.getAspectRatio ([scaleFactor])`

* `scaleFactor` Double (opcional) - Padrão sendo 1.0.

Retorna `Float` - A proporção de tela da imagem.

Se `scaleFactor` for aprovada, isso retornará a proporção correspondente à representação da imagem mais próxima do valor passado.



#### `image.getScaleFactors()`

Retornos `Float[]` - Uma série de todos os fatores de escala correspondentes a representações para um determinado nativeImage.



#### `image.addRepresentation(options)`

* objeto `options` 
    * `scaleFactor` Double - O fator de escala para adicionar a representação da imagem.
  * `width` Integer (optional) - Padrão sendo 0. Necessário se um de buffer de bitmap for especificado como `buffer`.
  * `height` Integer (opcional) - Padrão sendo 0. Necessário se um de buffer de bitmap for especificado como `buffer`.
  * `buffer` Buffer (opcional) - O buffer contendo os dados crus (sem alteração) da imagem.
  * `dataURL` String (opcional) - A URL de dados contendo uma base de 64 imagem PNG codificada ou JPEG.

Adicione uma representação de imagem para um fator de escala específico. Isso pode ser usado para adicionar explicitamente diferentes representações de fatores de escala a uma imagem. Esta pode ser chamada em imagens vazias.



### Propriedades de Instância



#### `nativeImage.isMacTemplateImage` __macOS

Uma propriedade `Boolean` que determina se a imagem é considerada uma</a>de imagem de modelo .</p> 

Por favor, note que esta propriedade só tem um efeito no macOS.

[icons]: https://msdn.microsoft.com/en-us/library/windows/desktop/dn742485(v=vs.85).aspx

[buffer]: https://nodejs.org/api/buffer.html#buffer_class_buffer
