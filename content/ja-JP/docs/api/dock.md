## Class: Dock

> Control your app in the macOS dock

プロセス: [Main](../glossary.md#main-process)

The following example shows how to bounce your icon on the dock.

```javascript
const { app } = require('electron')
app.dock.bounce()
```

### インスタンスメソッド

#### `dock.bounce([type])` _macOS_

* `type` String (optional) - Can be `critical` or `informational`. The default is `informational`

Returns `Integer` - an ID representing the request.

`critical` が渡された場合、ドックのアイコンはアプリケーションがアクティブになるか、リクエストがキャンセルされるまでバウンスします。

When `informational` is passed, the dock icon will bounce for one second. However, the request remains active until either the application becomes active or the request is canceled.

**Nota Bene:** This method can only be used while the app is not focused; when the app is focused it will return -1.

#### `dock.cancelBounce(id)` _macOS_

* `id` Integer

`id` のバウンスをキャンセルします。

#### `dock.downloadFinished(filePath)` _macOS_

* `filePath` String

filePath がダウンロードフォルダの中の場合、ダウンロードのスタックをバウンスさせます。

#### `dock.setBadge(text)` _macOS_

* `text` String

ドックのバッジ領域に表示される文字列を設定します。

#### `dock.getBadge()` _macOS_

戻り値 `String` - ドックのバッジ文字列。

#### `dock.hide()` _macOS_

ドックのアイコンを非表示にする

#### `dock.show()` _macOS_

戻り値 `Promise<void>` - Dock のアイコンが表示されたときに実行されます。

#### `dock.isVisible()` _macOS_

Returns `Boolean` - Dock のアイコンが表示されているかどうか。

#### `dock.setMenu(menu)` _macOS_

* `menu` [Menu](menu.md)

Sets the application's \[dock menu\]\[dock-menu\].

#### `dock.getMenu()` _macOS_

Returns `Menu | null` - The application's \[dock menu\]\[dock-menu\].

#### `dock.setIcon(image)` _macOS_

* `image` ([NativeImage](native-image.md) | String)

このドックアイコンに関連付けられた `image` を設定します。
