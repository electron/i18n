# Electron Belgeleme Stil Rehberi

Electron belgeleri yazmak için rehberler.

## Başlıklar

* Her sayfa en yukarıda `#` seviyesinde bir başlığa sahip olmalıdır.
* Aynı sayfadaki bölümler `##` seviyesinde başlığa sahip olmalıdır.
* Alt bölümler başlığın iç içe derinliğine göre `#` sayısını arttırmak zorundadır.
* "ve", "ile" gibi bağlaçlar dışında sayfanın başlığındaki tüm kelimeler büyük harfle başlamalıdır.
* Bölüm başlıklarının sadece ilk harfi büyük harfli olmalıdır.

Örnek olarak `Hızlı Başlangıç`:

```markdown
# Hızlı Başlangıç

...

## Ana Süreç

...

## Renderer Süreç

...

## Uygulamanızı başlatın

...

### Dağıtım olarak başlatın

...

### El ile indirilmiş Electron binary'si

...
```

API referansları için bazı istisnalar mevcut.

## Markdown kuralları

* Kod bloklarında `sh` yerine `cmd` kullanın. (Sözdizimi işaretleyicisinden dolayı).
* Satırlar 80. karakterde bitmelidir.
* İç içe listeleri 2'den fazla kademeyi listelemez (indirim işleyici nedeniyle).
* Tüm `js` ve `javascript` kod blokları [standard-markdown](http://npm.im/standard-markdown) ile kontrol edilir.

## Kelime seçimi

* Çıktıları tanımlarken "would" yerine "will" kullanın.
* "in the process" yerine "on" 'u tercih edin.

## API başvuruları

Aşağıdaki kurallar yalnızca API'ların belge işlemi için geçerlidir.

### Sayfa başlığı

Her sayfa başlık olarak `('electron') gerektirir`, tarafından döndürülen gerçek nesne adını kullanmalıdır `TarayıcıPenceresi`, `otomatikGüncelleyici` ve `oturum` gibi.

Sayfa başlığı altında `>` ile başlayan tek satırlık bir açıklama olmalıdır.

Örnek olarak `oturum` kullanma:

```markdown
#oturum
> Tarayıcı oturumlarını, çerezleri, önbelleği, proxy ayarlarını vb. Yönetin.
```

### Modül yöntem ve etkinlikleri

Sınıfı olmayan modüller için onların yöntemleri ve olayları `##Yöntem` ve `##Olaylar` bölümlerinin altında listelenmelidir.

`otomatikGüncelleme` ögesini örnek olarak kullanmak:

```markdown
#otomatikGüncelleyici
##Etkinlikler
###Etkinlik: 'hatası'
#Yöntemler
#otomatikGüncelleyici.BeslemeUrl'sini ayarla(url[,istekBaşlıkları])
```

### Sınıflar

* API sınıfları veya modüllerin bir parçası olan sınıflar bir `## Sınıf altında listelenmelidir; Sınıf İsmi` bölümü.
* Bir sayfa birden fazla sınıfa sahip olabilir.
* Kurucular `###` düzeyinde başlıklarla listelenmelidir.
* [Statik Yöntemler](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static) `### Statik Yöntemler` bölümünün altında listelenmelidir.
* [Örnek Yöntemler](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Prototype_methods) bir `### Örnek Yöntemler` bölümünün altında listelenmelidir.
* Bir getiri değeri olan tüm yöntemlerin açıklamalarını "getiriler ile başlatması gerekir `[TYPE]` -Getiri tanımı" 
  * Eğer yöntem `Nesne`'ye dönerse, yapısı iki noktadan sonra bir satır sonu karakteriyle, ardından da işlev parametreleriyle aynı tarzda sırasız bir özellik listesi kullanarak belirlenebilir.
* Örnek Olayları `###Örnek Olaylar` bölümünün altında listelenmelidir.
* Örnek Özellikler aşağısında listelenmelidir `### Örnek Özellikleri` bölüm. 
  * Örnek özellikleri "Bir [Özellik Türü]..." ile başlamalıdır

Örnek olarak `Oturum` ve `Çerezler` sınıflarını kullanmak:

```markdown
# session

## Methods

### session.fromPartition(partition)

## Properties

### session.defaultSession

## Class: Session

### Instance Events

#### Event: 'will-download'

### Instance Methods

#### `ses.getCacheSize(callback)`

### Instance Properties

#### `ses.cookies`

## Class: Cookies

### Instance Methods

#### `cookies.get(filter, callback)`
```

### Metodlar

Metodların bölümü aşağıdaki formda olmak zorundadır:

```markdown
### `objectName.methodName(required[, optional]))`

* `required` String - A parameter description.
* `optional` Integer (optional) - Another parameter description.

...
```

The title can be `###` or `####`-levels depending on whether it is a method of a module or a class.

For modules, the `objectName` is the module's name. For classes, it must be the name of the instance of the class, and must not be the same as the module's name.

For example, the methods of the `Session` class under the `session` module must use `ses` as the `objectName`.

The optional arguments are notated by square brackets `[]` surrounding the optional argument as well as the comma required if this optional argument follows another argument:

```sh
required[, optional]
```

Below the method is more detailed information on each of the arguments. The type of argument is notated by either the common types:

* [`Dize`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
* [`Sayı`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
* [`Nesne`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
* [`Dizi`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
* [`Boole değeri`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
* Or a custom type like Electron's [`WebContent`](api/web-contents.md)

If an argument or a method is unique to certain platforms, those platforms are denoted using a space-delimited italicized list following the datatype. Values can be `macOS`, `Windows`, or `Linux`.

```markdown
* `animate` Boolean (optional) _macOS_ _Windows_ - Animate the thing.
```

`Array` type arguments must specify what elements the array may include in the description below.

The description for `Function` type arguments should make it clear how it may be called and list the types of the parameters that will be passed to it.

### Olaylar

Olaylar bölümü aşşağıdaki form da olmak zorundadır:

```markdown
### Event: 'wake-up'

Returns:

* `time` String

...
```

The title can be `###` or `####`-levels depending on whether it is an event of a module or a class.

Bir olayda ki argümanlar metodların takip ettiği kurallar ile aynıdır.

### Özellikler

Metodların bölümü aşağıdaki formda olmak zorundadır:

```markdown
### session.defaultSession

...
```

The title can be `###` or `####`-levels depending on whether it is a property of a module or a class.

## Belge Çevirileri

See [electron/electron-i18n](https://github.com/electron/electron-i18n#readme)