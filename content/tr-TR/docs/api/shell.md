# shell

> Varsayılan uygulamalarını kullanarak dosyaları ve URL'leri yönetin.

İşlem: [Ana](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

`shell` modülü, masaüstü entegrasyonuyla ilgili işlevler sunar.

Bir URL'yi kullanıcının varsayılan tarayıcısında açmaya örnek:

```javascript
const { shell } = require('electron')

shell.openExternal('https://github.com')
```

## Yöntemler

The `shell` modülünün aşağıdaki yöntemleri vardır:

### `shell.showItemInFolder(fullPath)`

* `fullPath` Dizgi

`Boolean` Döndürür - Öğenin başarıyla gösterilip gösterilmediği.

Verilen dosyayı bir dosya yöneticisinde görüntüler. Mümkünse, dosyayı seçin.

### `shell.openItem(fullPath)`

* `fullPath` Dizgi

`Boolean` Döndürür - Öğenin başarılı bir şekilde açılıp açılmadığı.

Verilen dosyayı masaüstünün varsayılan yöntemiyle açın.

### `shell.openExternalSync(url[, options])`

* `url` String - Max 2081 characters on Windows, or the function returns false.
* `seçenekler` Obje (opsiyonel) 
  * `activate` Boolean (optional) - `true` to bring the opened application to the foreground. The default is `true`. *macOS*
  * `workingDirectory` String (optional) - The working directory. *Windows*

Returns `Boolean` - Whether an application was available to open the URL.

Open the given external protocol URL in the desktop's default manner. (For example, mailto: URLs in the user's default mail agent).

### `shell.openExternal(url[, options])`

* `url` String - Max 2081 characters on windows.
* `seçenekler` Hedef (isteğe bağlı) 
  * `activate` Boolean (optional) - `true` to bring the opened application to the foreground. The default is `true`. *macOS*
  * `workingDirectory` String (optional) - The working directory. *Windows*

Returns `Promise<void>`

Open the given external protocol URL in the desktop's default manner. (For example, mailto: URLs in the user's default mail agent).

### `shell.moveItemToTrash(fullPath)`

* `fullPath` Dizgi

`Boolean` Döndürür - Öğenin çöp kutusuna başarıyla taşınıp taşınmadığı.

Verilen dosyayı çöp kutusuna taşır ve işlem için bir boolean durumu döndürür.

### `shell.beep()`

Bip sesini oynatın.

### `shell.writeShortcutLink(shortcutPath[, operation], options)` *Windows*

* `shortcutPath` Dizgi
* `operasyon` Dize (İsteğe bağlı) - Fabrika ayarları şu şekilde `oluştur`Sıradakilerden biri olabilir: 
  * `create` - Yeni kısayol oluşturur, gerekliyse üzerine kaydeder.
  * `update` - Seçilen özellikleri sadece varolon kısayola günceller.
  * `replace` - Varolan bir kısayolun üzerine yazar, kısayol yoksa başarısız olur.
* `options` [ShortcutDetails](structures/shortcut-details.md)

`Boolean` Döndürür - Kısayolun başarıyla oluşturulup oluşturulmadığı.

`shortcutPath` bir kısayol bağlantısı oluşturur veya güncelleştirir.

### `shell.readShortcutLink(shortcutPath)` *Windows*

* `shortcutPath` Dizgi

[`ShortcutDetails`](structures/shortcut-details.md) geri al

Kısayol bağlantısını `shortcutPath` adresinde çözer.

Bir hata oluştuğunda istisna atılır.