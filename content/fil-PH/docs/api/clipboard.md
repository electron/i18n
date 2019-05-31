# iipit sa tabla

> Magsagawa ng mga kopya at idikit ang mga operasyon sa clipboard ng system.

Proseso: [Pangunahin](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

In the renderer process context it depends on the [`remote`](remote.md) module on Linux, it is therefore not available when this module is disabled.

Ang mga sumusunod na halimbawa ay nagpapakita kung paano sumulat ng isang string sa clipboard ng: 

```javascript
const { clipboard } = require('electron')
clipboard.writeText('Halimbawa String')
 
Context | Request Context

```

On Linux, there is also a `selection` clipboard. To manipulate it you need to pass `selection` to each method:

```javascript
const { clipboard } = require('electron')
clipboard.writeText('Halimbawa String', 'selection')
console.log(clipboard.readText('selection'))
```

## Mga Paraan

Ang `clipboard` modyul ay ang ma sumusunod na pamamaraan:

**Note:** Eksperimental na APIs ay minarkahan bilang tulad at pwedeng maalis sa hinaharap. 

### `clipboard.readText([i-type])

`

* `type` String (optional) - Can be `selection` or `clipboard`. `selection` is only available on Linux.

Returns `String` - Ang nilalaman ng klipboard bilang textstong walang format. 

### `clipboard.writeText(text[ ,i-type])

`

* `text` String
* `type` String (optional) - Can be `selection` or `clipboard`. `selection` is only available on Linux.

Pagsulat ng `text` as klipboard bilang tekstong walang format.

### `clipboard.readHTML([i-type])`

* `type` String (optional) - Can be `selection` or `clipboard`. `selection` is only available on Linux.

Returns `String` - Ang nilalaman ng klipboard bilang texkstong walang format. 

### `clipboard.writeHTML(markup[ ,i-type])

`

* `markup` String
* `type` String (optional) - Can be `selection` or `clipboard`. `selection` is only available on Linux.

Pagsulat ng `markup` sa klipboard. 

### `clipboard.readImage([i-type])

`

* `type` String (optional) - Can be `selection` or `clipboard`. `selection` is only available on Linux.

Nagbabalik ang [`NativeImage`](native-image.md) ang nilalaman ng larawan sa klipbord. 

### `clipboard.writeImage(image[ ,i-type])

`

* `image` [NativeImage](native-image.md)
* `type` String (optional) - Can be `selection` or `clipboard`. `selection` is only available on Linux.

Pagsulat `image` sa klipboard.

### `clipboard.readRTF([i-type])

`

* `type` String (optional) - Can be `selection` or `clipboard`. `selection` is only available on Linux.

Returns `String` - Ang nilalaman ng klipboard bilang RTF.

### `clipboard.writeRTF(text[, type])`

* `text` String
* `type` String (optional) - Can be `selection` or `clipboard`. `selection` is only available on Linux.

Pagsulat ng `text` sa klipboard bilang RTF.

### `clipboard.readBookmark()` *macOS* *Windows*

Nagbabalik ng mga `bagay`:

* `title` String
* `url` Tali

Nagbabalik ng isang bagay na naglalaman `title` at `url` keys na kumakatawan sa bookmark sa klipbord. Ang `title` and `url` values ay walang laman na string kapag ang bookmark ay hindi magagamit. 

### `clipboard.writeBookmark(title, url[, type])` *macOS* *Windows*

* `title` String
* `url` Tali
* `type` String (optional) - Can be `selection` or `clipboard`. `selection` is only available on Linux.

Pagsulat ng `title` and `url` sa klipbord bilang bookmark.

**Note:** Karamihan ng apps sa Windows ay hindi sumusuporta sa pasting bookmarks para sa kanila kaya pwede kang gumamit ng `clipboard.write` para sumulat ng kapwa bookmark at fallback na texsto sa klipboard.

```js
clipboard.write({
  text: 'https://electronjs.org',
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

* `type` String (optional) - Can be `selection` or `clipboard`. `selection` is only available on Linux.

Nililimas ang mga nilalaman ng klipboard. 

### `clipboard.availableFormats([i-type])

`

* `type` String (optional) - Can be `selection` or `clipboard`. `selection` is only available on Linux.

Returns `String[]` - isang array ng mga supportadong pormat para sa klipboard `uri`.

### `clipboard.has(format[, type])` *Experimental*

* `format` String
* `type` String (optional) - Can be `selection` or `clipboard`. `selection` is only available on Linux.

Returns `Boolean` - maski ang clipboard ay sumusuporta sa tinukoy na`format`.

```javascript
const { clipboard } = require('electron')
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
* `type` String (optional) - Can be `selection` or `clipboard`. `selection` is only available on Linux.

Pagsulat ng `buffer` sa klipboard bilang `format`.

### `clipboard.write(data[ ,i-type])

`

* `datos` Bagay 
  * `text` String (opsiyonal)
  * `html` String (opsiyonal)
  * `image` [NativeImage](native-image.md) (opsiyonal)
  * `rtf` String (opsiyonal)
  * `rtf` String (opsiyonal) - Ang pamagat ng url sa `text`. 
* `type` String (optional) - Can be `selection` or `clipboard`. `selection` is only available on Linux.

```javascript
const { clipboard } = require('electron')
clipboard.write({ text: 'test', html: '<b>test</b>' })
```

Pagsulat ng `data` sa klipboard.