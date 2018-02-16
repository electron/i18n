# shell

> Varsayılan uygulamalarını kullanarak dosyaları ve URL'leri yönetin.

İşlem: [Ana](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

`shell` modülü, masaüstü entegrasyonuyla ilgili işlevler sunar.

Bir URL'yi kullanıcının varsayılan tarayıcısında açmaya örnek:

```javascript
const {shell} = require('electron')

shell.openExternal('https://github.com')
```

## Yöntemler

The `shell` modülünün aşağıdaki yöntemleri vardır:

### `shell.showItemInFolder(fullPath)`

* `fullPath` Dizgi

`Boolean` Döndürür - Öğenin başarıyla gösterilip gösterilmediği

Verilen dosyayı bir dosya yöneticisinde görüntüler. Mümkünse, dosyayı seçin.

### `shell.openItem(fullPath)`

* `fullPath` Dizgi

`Boolean` Döndürür - Öğenin başarılı bir şekilde açılıp açılmadığı.

Verilen dosyayı masaüstünün varsayılan yöntemiyle açın.

### `shell.openExternal(url[, options, callback])`

* `url` String - max 2081 characters on windows, or the function returns false
* `seçenekler` Obje (opsiyonel) *macOS* 
  * `activate` Boolean - `true` to bring the opened application to the foreground. The default is `true`.
* `geri aramak` Function (optional) - If specified will perform the open asynchronously. *macOS* 
  * `error` Error

`Boolean` döner - uygulamanın URL açmaya uygun olup olmaması. Eğer geri çağırma belirtildiyse her zaman true döner.

Verilen harici protokol URL'sini masaüstünde varsayılan şekilde açın. (Örneğin, mailto: kullanıcının varsayılan posta aracısındaki URL'leri).

### `shell.moveItemToTrash(fullPath)`

* `fullPath` Dizgi

`Boolean` Döndürür - Öğenin çöp kutusuna başarıyla taşınıp taşınmadığı

Verilen dosyayı çöp kutusuna taşır ve işlem için bir boolean durumu döndürür.

### `shell.beep()`

Bip sesini oynatın.

### `shell.writeShortcutLink(shortcutPath[, operation], options)` *Windows*

* `shortcutPath` String
* `operasyon` Dize (İsteğe bağlı) - Fabrika ayarları şu şekilde `oluştur`Sıradakilerden biri olabilir: 
  * `create` - Yeni kısayol oluşturur, gerekliyse üzerine kaydeder.
  * `update` - Seçilen özellikleri sadece varolon kısayola günceller.
  * `replace` - Overwrites an existing shortcut, fails if the shortcut doesn't exist.
* `options` [ShortcutDetails](structures/shortcut-details.md)

`Boolean` Döndürür - Kısayolun başarıyla oluşturulup oluşturulmadığı

`shortcutPath` bir kısayol bağlantısı oluşturur veya güncelleştirir.

### `shell.readShortcutLink(shortcutPath)` *Windows*

* `shortcutPath` String

[`ShortcutDetails`](structures/shortcut-details.md) geri al

Kısayol bağlantısını `shortcutPath` adresinde çözer.

Bir hata oluştuğunda istisna atılır.