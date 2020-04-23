## Class: Dock

> Control your app in the macOS dock

Proses: [Main](../glossary.md#main-process)

The following example shows how to bounce your icon on the dock.

```javascript
onst { app } = require('electron')
app.dock.bounce()
```

### Методы экземпляра

#### `dock.bounce()` _macOS_

* `type` String (optional) - Can be `critical` or `informational`. The default is `informational`

Returns `Integer` - an ID representing the request.

Ketika `kritis` dilewatkan, ikon dermaga akan terpental sampai aplikasi menjadi aktif atau permintaan dibatalkan.

When `informational` is passed, the dock icon will bounce for one second. However, the request remains active until either the application becomes active or the request is canceled.

**Nota Bene:** This method can only be used while the app is not focused; when the app is focused it will return -1.

#### `dock.cancelBounce(id)` Linux _macOS_

* `identitas` Integer

Membatalkan bouncing `id`.

#### `dock.downloadFinished(filePath)` _Windows_

* `fullPath` String

Memantapkan Download stack jika filePath ada di dalam folder Downloads.

#### `dock.setBadge(text)` Linux _macOS_

* `teks` String

Menetapkan string yang akan ditampilkan di area badging dermaga.

#### ` dock.getBadge () </ 0>  <em x-id="4"> macos </ 1></h4>

<p spaces-before="0">Mengembalikan <code>String` - String badge dari dok.</p>

#### ` dock.hide () </ 0>  <em x-id="4"> macos </ 1></h4>

<p spaces-before="0">Sembunyikan ikon dok.</p>

<h4 spaces-before="0"><code> dock.show () </ 0>  <em x-id="4"> macos </ 1></h4>

<p spaces-before="0">Returns <code>Promise<void>` - Resolves when the dock icon is shown.</p>

#### ` dock.isVisible () </ 0>  <em x-id="4"> macos </ 1></h4>

<p spaces-before="0">Returns <code>Boolean` - Whether the dock icon is visible.</p>

#### `dock.setMenu(menu)` _macos_

* `menu` [Menu](menu.md)

Sets the application's \[dock menu\]\[dock-menu\].

#### ` dock.getMenu () </ 0>  <em x-id="4"> macos </ 1></h4>

<p spaces-before="0">Returns <code>Menu | null` - The application's \[dock menu\]\[dock-menu\].</p>

#### `dock.setIcon(image)` Linux _macOS_

* `gambar` ([NativeImage](native-image.md) | String)

Menetapkan `gambar` yang terkait dengan ikon dermaga ini.
