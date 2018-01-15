# pano

> Kopyalama ve yapıştırma işlemlerini sistem panosunda gerçekleştirin.

İşlem: [Ana](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

Aşağıdaki örnek bir dizeyi panoya nasıl yazacağınızı gösterir:

```javascript
const {clipboard} = require('electron')
clipboard.writeText('Example String')
```

Ayrıca X Window sistemlerinde bir seçim panosu bulunur. Bunu değiştirmek için `selection`'ı her bir metoda geçirmelisiniz:

```javascript
const {clipboard} = require('electron')
clipboard.writeText('Example String', 'selection')
console.log(clipboard.readText('selection'))
```

## Metodlar

Pano modülü aşağıdaki yöntemleri içerir:

**Not:** Deneysel API'ler bu şekilde işaretlenir ve gelecekte kaldırılabilir.

### `clipboard.readText([type])`

* `type` String (isteğe bağlı)

`String` döndürür - Panodaki içeriği düz metin olarak.

### `clipboard.writeText(text[, type])`

* `text` Dizi
* `type` String (isteğe bağlı)

Panoya `text`'i düz yazı olarak yazar.

### `clipboard.readHTML([type])`

* `type` Dize (isteğe bağlı)

`String` döndürür - Panodaki içeriği işaretlenmiş olarak.

### `clipboard.writeHTML(markup[, type])`

* `markup` String
* `type` String (isteğe bağlı)

Yazar `markup` panoya.

### `clipboard.readImage([type])`

* `type` String (isteğe bağlı)

[`NativeImage`](native-image.md) - Pano içindeki resim içeriği.

### `clipboard.writeImage(image[, type])`

* `image` [NativeImage](native-image.md)
* `type` String (isteğe bağlı)

`image`'i panoya yazar.

### `clipboard.readRTF([type])`

* `type` String (isteğe bağlı)

`Dize` - RTF olarak pano içeriği.

### `clipboard.writeRTF(text[, type])`

* `text` Dizi
* `type` String (isteğe bağlı)

Panoya `text`'i RTF olarak yazar.

### `clipboard.readBookmark()` *macOS* *Windows*

`Object` 'i geri getirir:

* `başlık` Dizi
* `url` Dize

Panodaki sayfa işaretini temsil eden `title` ve `url` anahtarlarını içeren bir nesne döndürür. Sayfa işaretçisi erişilemez olduğunda `title` ve `url` değerleri boş dizeler olacaktır.

### `clipboard.writeBookmark(title, url[, type])` *macOS* *Windows*

* `başlık` Dizi
* `url` Dize
* `type` String (isteğe bağlı)

`title` ve `url`'yi panoya sayfa işaretçisi olarak yazar.

**Not:** Windows üzerindeki çoğu uygulama sayfa işaretçisi yapıştırmayı desteklememektedir. Panoya sayfa işaretçisi ve dönüş metni yazmak için `clipboard.write` kullanabilirsiniz.

```js
clipboard.write({
  text: 'https://electron.atom.io',
  bookmark: 'Electron Homepage'
})
```

### `clipboard.readFindText()` *macOS*

Returns `String` - The text on the find pasteboard. This method uses synchronous IPC when called from the renderer process. Önbelleğe alınmış olan değer, uygulama her etkinleştirildiğinde kartuşun bulunduğu sayfadan yeniden okunur.

### `clipboard.writeFindText(text)` *macOS*

* `text` Dizi

Writes the `text` into the find pasteboard as plain text. This method uses synchronous IPC when called from the renderer process.

### `clipboard.clear([type])`

* `type` String (isteğe bağlı)

Pano içeriğini temizler.

### `clipboard.availableFormats([type])`

* `type` String (isteğe bağlı)

Returns `String[]` - An array of supported formats for the clipboard `type`.

### `clipboard.has(format[, type])` *Deneysel*

* `format` String
* `type` String (isteğe bağlı)

Returns `Boolean` - Whether the clipboard supports the specified `format`.

```javascript
const {clipboard} = require('electron')
console.log(clipboard.has('<p>selection</p>'))
```

### `clipboard.read(format)` *Deneysel*

* `format` String

Returns `String` - Reads `format` type from the clipboard.

### `clipboard.readBuffer(format)` *Deneysel*

* `format` String

Returns `Buffer` - Reads `format` type from the clipboard.

### `clipboard.writeBuffer (biçim, arabellek [, tür])` *Deneysel*

* `format` String
* `buffer` Buffer
* `type` String (isteğe bağlı)

Writes the `buffer` into the clipboard as `format`.

### `clipboard.write(data[, type])`

* `veri` Nesne 
  * `text` String (optional)
  * `html` dizi(isteğe bağlı)
  * `image` [NativeImage](native-image.md) (isteğe bağlı)
  * `rtf` Dizi (İsteğe Bağlı)
  * `bookmark` Dizi (İsteğe bağlı) - `text` ' da url nin başlığı yer alır.
* `type` String (isteğe bağlı)

```javascript
const {clipboard} = require('electron')
clipboard.write({text: 'test', html: '<b>test</b>'})
```

`Verileri` panoya yazar.