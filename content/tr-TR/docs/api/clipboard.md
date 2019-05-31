# clipboard

> Kopyalama ve yapıştırma işlemlerini sistem panosunda gerçekleştirin.

İşlem: [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

In the renderer process context it depends on the [`remote`](remote.md) module on Linux, it is therefore not available when this module is disabled.

Aşağıdaki örnek bir dizeyi panoya nasıl yazacağınızı gösterir:

```javascript
const { clipboard } = require('electron')
clipboard.writeText('Example String')
```

On Linux, there is also a `selection` clipboard. To manipulate it you need to pass `selection` to each method:

```javascript
const { clipboard } = require('electron')
clipboard.writeText('Example String', 'selection')
console.log(clipboard.readText('selection'))
```

## Yöntemler

Pano modülü aşağıdaki yöntemleri içerir:

**Not:** Deneysel API'ler bu şekilde işaretlenir ve gelecekte kaldırılabilir.

### `clipboard.readText([type])`

* `type` String (optional) - Can be `selection` or `clipboard`. `selection` is only available on Linux.

`String` döndürür - Panodaki içeriği düz metin olarak.

### `clipboard.writeText(text[, type])`

* `text` String
* `type` String (optional) - Can be `selection` or `clipboard`. `selection` is only available on Linux.

Panoya `text`'i düz yazı olarak yazar.

### `clipboard.readHTML([type])`

* `type` String (optional) - Can be `selection` or `clipboard`. `selection` is only available on Linux.

`String` döndürür - Panodaki içeriği işaretlenmiş olarak.

### `clipboard.writeHTML(markup[, type])`

* `markup` String
* `type` String (optional) - Can be `selection` or `clipboard`. `selection` is only available on Linux.

Yazar `markup` panoya.

### `clipboard.readImage([type])`

* `type` String (optional) - Can be `selection` or `clipboard`. `selection` is only available on Linux.

[`NativeImage`](native-image.md) - Pano içindeki resim içeriği.

### `clipboard.writeImage(image[, type])`

* `image` [NativeImage](native-image.md)
* `type` String (optional) - Can be `selection` or `clipboard`. `selection` is only available on Linux.

`image`'i panoya yazar.

### `clipboard.readRTF([type])`

* `type` String (optional) - Can be `selection` or `clipboard`. `selection` is only available on Linux.

`Dize` - RTF olarak pano içeriği.

### `clipboard.writeRTF(text[, type])`

* `text` String
* `type` String (optional) - Can be `selection` or `clipboard`. `selection` is only available on Linux.

Panoya `text`'i RTF olarak yazar.

### `clipboard.readBookmark()` *macOS* *Windows*

`Object` 'i geri getirir:

* `title` String
* `url` Dize

Panodaki sayfa işaretini temsil eden `title` ve `url` anahtarlarını içeren bir nesne döndürür. Sayfa işaretçisi erişilemez olduğunda `title` ve `url` değerleri boş dizeler olacaktır.

### `clipboard.writeBookmark(title, url[, type])` *macOS* *Windows*

* `title` String
* `url` Dize
* `type` String (optional) - Can be `selection` or `clipboard`. `selection` is only available on Linux.

`title` ve `url`'yi panoya sayfa işaretçisi olarak yazar.

**Not:** Windows üzerindeki çoğu uygulama sayfa işaretçisi yapıştırmayı desteklememektedir. Panoya sayfa işaretçisi ve dönüş metni yazmak için `clipboard.write` kullanabilirsiniz.

```js
clipboard.write({
  text: 'https://electronjs.org',
  bookmark: 'Electron Homepage'
})
```

### `clipboard.readFindText()` *macOS*

`String` - Karton üzerindeki metni bulmaya yarar. Oluşturucu işleminden çağrılan bu yöntem senkron IPC kullanır. Önbelleğe alınmış olan değer, uygulama her etkinleştirildiğinde kartuşun bulunduğu sayfadan yeniden okunur.

### `clipboard.writeFindText(text)` *macOS*

* `text` Dizi

`text` komutu içerisindeki metin karton bulma alanına düz yazı olarak yazılır. Oluşturucu işleminden çağrılan bu yöntem senkron IPC kullanır.

### `clipboard.clear([type])`

* `type` String (optional) - Can be `selection` or `clipboard`. `selection` is only available on Linux.

Pano içeriğini temizler.

### `clipboard.availableFormats([type])`

* `type` String (optional) - Can be `selection` or `clipboard`. `selection` is only available on Linux.

`String[]` - Panodaki `type` için desteklenen formatlar dizisi.

### `clipboard.has(format[, type])` *Deneysel*

* `format` String
* `type` String (optional) - Can be `selection` or `clipboard`. `selection` is only available on Linux.

`Boolean` - Panoda belirtilen `format` komutunun desteklenip desteklenmediğini gösterir.

```javascript
const { clipboard } = require('electron')
console.log(clipboard.has('<p>selection</p>'))
```

### `clipboard.read(format)` *Deneysel*

* `format` String

`String` - Panoya `format` tipinde okuma yapar.

### `clipboard.readBuffer(format)` *Deneysel*

* `format` String

`Buffer` - `format` türünü panodan okur.

### `clipboard.writeBuffer (biçim, arabellek [, tür])` *Deneysel*

* `format` String
* `arabellek` Arabellek
* `type` String (optional) - Can be `selection` or `clipboard`. `selection` is only available on Linux.

`buffer`' ı `format` olarak panoya yazar.

### `clipboard.write(data[, type])`

* `veri` Nesne 
  * `text` dizin (isteğe bağlı)
  * `html` dizi(isteğe bağlı)
  * `image` [NativeImage](native-image.md) (isteğe bağlı)
  * `rtf` Dizi (İsteğe Bağlı)
  * `bookmark` Dizi (İsteğe bağlı) - `text` ' da url nin başlığı yer alır.
* `type` String (optional) - Can be `selection` or `clipboard`. `selection` is only available on Linux.

```javascript
const { clipboard } = require('electron')
clipboard.write({ text: 'test', html: '<b>test</b>' })
```

`Verileri` panoya yazar.