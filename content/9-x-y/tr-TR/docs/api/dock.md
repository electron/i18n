## Class: Dock

> Control your app in the macOS dock

Süreç: [Ana](../glossary.md#main-process)

The following example shows how to bounce your icon on the dock.

```javascript
const { app } = require('electron')
app.dock.bounce()
```

### Örnek yöntemleri

#### `dock.bounce([type])` _macOS_

* `type` String (optional) - Can be `critical` or `informational`. The default is `informational`

Returns `Integer` - an ID representing the request.

`critical` geçildiğinde, dock simgesi uygulama aktifleşinceye veya istek iptal edilene kadar sıçrar.

When `informational` is passed, the dock icon will bounce for one second. However, the request remains active until either the application becomes active or the request is canceled.

**Nota Bene:** This method can only be used while the app is not focused; when the app is focused it will return -1.

#### `dock.cancelBounce(id)` _macOS_

* `id` tamsayı

`id` sıçramasını iptal et.

#### `dock.downloadFinished(filePath)` _macOS_

* `filePath` Dizi

FilePath, İndirilenler klasörünün içindeyse İndirme yığınla geri döner.

#### `dock.setBadge(text)` _macOS_

* `text` String

Dock'un rozetleme alanında gösterilecek satırı ayarlar.

#### `dock.getBadge()` _macOS_

`String` geri getirir - dock'un işaret dizisi.

#### `dock.hide()` _macOS_

Dock simgesini gizler.

#### `dock.show()` _macOS_

Returns `Promise<void>` - Resolves when the dock icon is shown.

#### `dock.isVisible()` _macOS_

Returns `Boolean` - Whether the dock icon is visible.

#### `dock.setMenu(menu)` _macOS_

* `menu` [Menü](menu.md)

Sets the application's \[dock menu\]\[dock-menu\].

#### `dock.getMenu()` _macOS_

Returns `Menu | null` - The application's \[dock menu\]\[dock-menu\].

#### `dock.setIcon(image)` _macOS_

* `image` ([NativeImage](native-image.md) | String)

Dock simgesiyle ilişkilendirilmiş `image` 'ı ayarlar.
