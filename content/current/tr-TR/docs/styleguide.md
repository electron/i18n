# Electron Dokümantasyon Stil Rehberi

Electron belgeleri yazmak için rehberler.

## Başlıklar

* Her sayfa en yukarıda `#` seviyesinde bir başlığa sahip olmalıdır.
* Aynı sayfadaki bölümler `##` seviyesinde başlığa sahip olmalıdır.
* Alt bölümler başlığın iç içe derinliğine göre `#` sayısını arttırmak zorundadır.
* "ve", "ile" gibi bağlaçlar dışında sayfanın başlığındaki tüm kelimeler büyük harfle başlamalıdır.
* Bölüm başlıklarının sadece ilk harfi büyük harfli olmalıdır.

Örnek olarak `Hızlı Başlangıç`:

```markdown
# Quick Start

...

## Main process

...

## Renderer process

...

## Run your app

...

### Run as a distribution

...

### Manually downloaded Electron binary

...
```

API referansları için bazı istisnalar mevcut.

## Yazı Stili kuralları

* Kod bloklarında `sh` yerine `cmd` kullanın. (Sözdizimi işaretleyicisinden dolayı).
* Satırlar 80. karakterde bitmelidir.
* İç içe listeleri 2'den fazla kademeyi listelemez (indirim işleyici nedeniyle).
* Tüm `js` ve `javascript` kod blokları [standard-markdown](https://www.npmjs.com/package/standard-markdown) ile kontrol edilir.

## Kelime seçimi

* Çıktıları tanımlarken "would" yerine "will" kullanın.
* "in the process" yerine "on" 'u tercih edin.

## API başvuruları

Aşağıdaki kurallar yalnızca API'ların belge işlemi için geçerlidir.

### Sayfa başlığı

Her sayfa başlık olarak `('electron') gerektirir`, tarafından döndürülen gerçek nesne adını kullanmalıdır `BrowserWindow`, `autoUpdater` ve `session` gibi.

Sayfa başlığı altında `>` ile başlayan tek satırlık bir açıklama olmalıdır.

Örnek olarak `session` kullanma:

```markdown
# session

> Tarayıcı oturumlarını, çerezleri, önbelleği, proxy ayarlarını vb. Yönetin.
```

### Modül metodları ve olayları

Sınıfı olmayan modüller için onların yöntemleri ve olayları `##Methods` ve `##Events` bölümlerinin altında listelenmelidir.

`autoUpdater` ögesini örnek verecek olursak:

```markdown
# autoUpdater

## Events

### Event: 'error'

## Methods

### `autoUpdater.setFeedURL(url[, requestHeaders])`
```

### Sınıflar

* API sınıfları veya modüllerin bir parçası olan sınıflar bir `## Class: TheClassName` bölümü.
* Bir sayfa birden fazla sınıfa sahip olabilir.
* Kurucular `###` düzeyinde başlıklarla listelenmelidir.
* [tatic Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static) `### Static Methods` bölümünün altında listelenmelidir.
* [nstance Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Prototype_methods) bir `### Instance Methods` bölümünün altında listelenmelidir.
* All methods that have a return value must start their description with "Returns `[TYPE]` - Return description"
  * Eğer yöntem `Nesne`'ye dönerse, yapısı iki noktadan sonra bir satır sonu karakteriyle, ardından da işlev parametreleriyle aynı tarzda sırasız bir özellik listesi kullanarak belirlenebilir.
* Örnek Olayları `### Instance Events` bölümünün altında listelenmelidir.
* Instance Properties must be listed under an `### Instance Properties` chapter.
  * Örnek özellikleri "Bir [Özellik Türü]..." ile başlamalıdır

Örnek olarak `Session` ve `Cookies` sınıflarını kullanmak:

```markdown
# oturum

## Yöntemler

### session.fromPartition(partition)

## Statik Özellikler

### session.defaultSession

## Sınıf: Oturum

### Örnek Olaylar

#### Olay: 'will-download'

### Örnek Yöntemleri

#### 'ses.getCacheSize()'

### Örnek Özellikleri

#### 'ses.çerezleri'

## Sınıf: Çerezler

### Örnek Yöntemleri

#### 'cookies.get(filtre, geri arama)'
```

### Metodlar

Metodların bölümü aşağıdaki formda olmak zorundadır:

```markdown
### `objectName.methodName(required[, optional]))`

* `required` String - A parameter description.
* `optional` Integer (optional) - Another parameter description.

...
```

Bir modülün veya bir sınıfın bir metodu olup olmadığına bağlı olarak başlık `###` veya `####` olabilir.

For modules, the `objectName` is the module's name. For classes, it must be the name of the instance of the class, and must not be the same as the module's name.

Örneğin, `Session`modülü altındaki `session` oturum sınıfının yöntemleri `objectName` olarak `ses` kullanmalıdır.

İsteğe bağlı bağımsız değişkenler isteğe bağlı bağımsız değişkeni çevreleyen köşeli parantezler `[]` ile ve isteğe bağlı bağımsız değişkenin başka bir bağımsız değişkeni izlemesi durumunda gerekli virgülle gösterilir:

```sh
gerekli[, isteğe bağlı]
```

Below the method is more detailed information on each of the arguments. The type of argument is notated by either the common types:

* [`Dize`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
* [`Sayı`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
* [`Nesne`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
* [`Dizi`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
* [`Boole değeri`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
* Ya da Electron'un [`WebContent`](api/web-contents.md) gibi özel bir tür

Bir bağımsız değişken veya yöntem belirli platformlara özgü ise, bu platformalar veri türünün ardında boşlukla sınırlanmış italikleşmiş bir liste kullanılarak ifade edilir. Değer `macOS`, `Windows` veya `Linux` olabilir.

```markdown
* `animate` Boolean (optional) _macOS_ _Windows_ - Animasyon ekle.
```

`Array` tür bağımsız değişkenleri, dizilimin hangi açıklayıcı öğeye dahil edilebileceğini belirtmelidir.

`Function` tür bağımsız değişkenleri için açıklamanın, nasıl çağrılabileceğini açıklığa kavuşturması ve ona iletilecek parametrelerin türlerini listelemesi gerekir.

### Olaylar

Olaylar bölümü aşşağıdaki form da olmak zorundadır:

```markdown
### Event: 'wake-up'

Returns:

* `time` String

...
```

Başlık bir modülün veya bir sınıfın bir etkinliğinin olup olmadığına bağlı olan `###` `####` düzeyleri olabilir.

Bir olayda ki argümanlar metodların takip ettiği kurallar ile aynıdır.

### Özellikler

Metodların bölümü aşağıdaki formda olmak zorundadır:

```markdown
### session.defaultSession

...
```

Başlığın bir modülün veya bir sınıfın özelliği olup olmadığına bağlı olan `###` `####` düzeyleri olabilir.

## Belge Çevirileri

Bakınız [electron/electron-i18n](https://github.com/electron/i18n#readme)
