# iipit sa tabla

> Magsagawa ng mga kopya at idikit ang mga operasyon sa clipboard ng system.

Proseso: [Pangunahin](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

Ang mga sumusunod na halimbawa ay nagpapakita kung paano sumulat ng isang string sa clipboard ng: 

```javascript
const {clipboard} = require('electron')
clipboard.writeText('Halimbawa String')
 
Context | Request Context

```

Sa X Window system, mayroon ding seleksyon clipboard. Upang manipulahin ang mga ito kailangan mo na mapasa`selection` sa bawat pamamaraan:

```javascript
const {clipboard} = require('electron')
clipboard.writeText('Halimbawa String', 'selection')
console.log(clipboard.readText('selection'))
```

## Mga Paraan

Ang `clipboard` modyul ay ang ma sumusunod na pamamaraan:

**Note:** Eksperimental na APIs ay minarkahan bilang tulad at pwedeng maalis sa hinaharap. 

### `clipboard.readText([type])`

* `type` String (opsiyonal)

Returns `String` - Ang nilalaman ng klipboard bilang textstong walang format. 

### `clipboard.writeText(text[, type])`

* `text` String
* `type` String (opsiyonal)

Pagsulat ng `text` as klipboard bilang tekstong walang format.

### `clipboard.readHTML([i-type])

`

* `type` String (opsiyonal)

Returns `String` - Ang nilalaman ng klipboard bilang texkstong walang format. 

### `clipboard.writeHTML(markup[, type])
 

`

* `markup` String
* `type` String (opsiyonal)

Pagsulat ng `markup` sa klipboard. 

### `clipboard.readImage([i-type]`

* `type` String (opsiyonal)

Nagbabalik ang [`NativeImage`](native-image.md) ang nilalaman ng larawan sa klipbord. 

### `clipboard.writeImage(image[, type])
 

`

* `image` [NativeImage](native-image.md)
* `type` String (opsiyonal)

Pagsulat `image` sa klipboard.

### `clipboard.readRTF([i-type])`

* `type` String (opsiyonal)

Returns `String` - Ang nilalaman ng klipboard bilang RTF.

### `clipboard.writeRTF(text[, type])`

* `text` String
* `type` String (opsiyonal)

Pagsulat ng `text` sa klipboard bilang RTF.

### `clipboard.readBookmark()` *macOS* *Windows*

Returns `Object`:

* `title` String
* `url` Tali

Nagbabalik ng isang bagay na naglalaman `title` at `url` keys na kumakatawan sa bookmark sa klipbord. Ang `title` and `url` values ay walang laman na string kapag ang bookmark ay hindi magagamit. 

### `clipboard.writeBookmark(title, url[, type])` *macOS* *Windows*

* `title` String
* `url` Tali
* `type` String (opsiyonal)

Pagsulat ng `title` and `url` sa klipbord bilang bookmark.

**Note:** Karamihan ng apps sa Windows ay hindi sumusuporta sa pasting bookmarks para sa kanila kaya pwede kang gumamit ng `clipboard.write` para sumulat ng kapwa bookmark at fallback na texsto sa klipboard.

```js
clipboard.write({
  text: 'https://electron.atom.io',
  bookmark: 'Electron Homepage'
})
```

### `clipboard.readFindText()` *macOS*

Returns `String` - ang texksto sa find pasteboard. Ang paraan na ito ay gumagamit ng mga kasabay na IPC kapag tinawag mula sa proseso ng tagasalin. Ang cached value ay muling babasahin mula sa find pasteboard tuwing ang application na ito ay isinaaktibo.

### `clipboard.writeFindText(text)` *macOS*

* `text` String

Pagsulat ng `text` sa find pasteboard bilang tekstong walang format. Ang paraan na ito ay gumagamit ng mga kasabay ng IPC kapag tinawag mula sa proseso ng tagasalin. 

### `clipboard.clear([i-type])
 

`

* `type` String (opsiyonal)

Nililimas ang mga nilalaman ng klipboard. 

### `clipboard.availableFormats([i-type])`

* `type` String (opsiyonal)

Returns `String[]` - isang array ng mga supportadong pormat para sa klipboard `uri`.

### `clipboard.has(format[, type])` *Experimental*

* `format` String
* `type` String (opsiyonal)

Returns `Boolean` - maski ang clipboard ay sumusuporta sa tinukoy na`format`.

```javascript
const {clipboard} = require('electron')
console.log(clipboard.has('<p>selection</p>'))
```

### `clipboard.read(format)` *Experimental* 

* `format` String

Returns `String` - Reads `format` uri mula sa klipboard. 

### `clipboard.readBuffer(format)` *Experimental*

* `format` String

Returns `Buffer` - Reads `format` uri mula sa klipboard. 

### `clipboard.writeBuffer(format, buffer[, type])` *Experimental*

* `format` String
* `buffer` Buffer
* `type` String (opsiyonal)

Pagsulat ng `buffer` sa klipboard bilang `format`.

### `clipboard.write(data[, type])`

* `datos` Bagay 
  * `text` String (opsiyonal)
  * `html` String (opsiyonal)
  * `image` [NativeImage](native-image.md) (opsiyonal)
  * `rtf` String (opsiyonal)
  * `rtf` String (opsiyonal) - Ang pamagat ng url sa `text`. 
* `type` String (opsiyonal)

```javascript
onst {clipboard} = require('electron')
clipboard.write({text: 'test', html: '<b>test</b>'})
```

Pagsulat ng `data` sa klipboard.