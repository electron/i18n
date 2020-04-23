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

Show the given file in a file manager. If possible, select the file.

### `shell.openItem(fullPath)`

* `fullPath` Dizgi

`Boolean` Döndürür - Öğenin başarılı bir şekilde açılıp açılmadığı.

Verilen dosyayı masaüstünün varsayılan yöntemiyle açın.

### `shell.openExternalSync(url[, options])`

* `url` String - Max 2081 characters on Windows, or the function returns false.
* `options` Object (optional)
  * `activate` Boolean (optional) - `true` to bring the opened application to the foreground. The default is `true`. _macOS_
  * `workingDirectory` String (optional) - The working directory. _Windows_

Returns `Boolean` - Whether an application was available to open the URL.

Open the given external protocol URL in the desktop's default manner. (For example, mailto: URLs in the user's default mail agent).

**Kullanımdan kaldırıldı**

### `shell.openExternal(url[, options])`

* `url` String - Max 2081 characters on windows.
* `options` Object (optional)
  * `activate` Boolean (optional) - `true` to bring the opened application to the foreground. The default is `true`. _macOS_
  * `workingDirectory` String (optional) - The working directory. _Windows_

Returns `Promise<void>`

Open the given external protocol URL in the desktop's default manner. (For example, mailto: URLs in the user's default mail agent).

### `shell.moveItemToTrash(fullPath)`

* `fullPath` Dizgi

`Boolean` Döndürür - Öğenin çöp kutusuna başarıyla taşınıp taşınmadığı.

Verilen dosyayı çöp kutusuna taşır ve işlem için bir boolean durumu döndürür.

### `shell.beep()`

Bip sesini oynatın.

### `shell.writeShortcutLink(shortcutPath[, operation], options)` _Windows_

* `shortcutPath` Dizgi
* `operation` String (optional) - Default is `create`, can be one of following:
  * `create` - Yeni kısayol oluşturur, gerekliyse üzerine kaydeder.
  * `update` - Seçilen özellikleri sadece varolon kısayola günceller.
  * `replace` - Varolan bir kısayolun üzerine yazar, kısayol yoksa başarısız olur.
* `options` [ShortcutDetails](structures/shortcut-details.md)

`Boolean` Döndürür - Kısayolun başarıyla oluşturulup oluşturulmadığı.

`shortcutPath` bir kısayol bağlantısı oluşturur veya güncelleştirir.

### `shell.readShortcutLink(shortcutPath)` _Windows_

* `shortcutPath` Dizgi

[`ShortcutDetails`](structures/shortcut-details.md) geri al

Kısayol bağlantısını `shortcutPath` adresinde çözer.

Bir hata oluştuğunda istisna atılır.
