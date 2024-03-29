## クラス: Dock

> macOS Dock 内のアプリを制御する

プロセス: [メイン](../glossary.md#main-process)<br /> _このクラスは `'electron'` モジュールからはエクスポートされません。 Electron API では、他のメソッドの戻り値としてのみ利用できます。_

以下の例は、Dock でアイコンをバウンスさせる方法を示しています。

```javascript
const { app } = require('electron')
app.dock.bounce()
```

### インスタンスメソッド

#### `dock.bounce([type])` _macOS_

* `type` String (任意) - `critical` か `informational` にできます。 省略値は、`informational` です。

戻り値 `Integer` - このリクエストを表すID。

`critical` が渡された場合、ドックのアイコンはアプリケーションがアクティブになるか、リクエストがキャンセルされるまでバウンスします。

`informational` が渡されると、ドックアイコンが 1 秒間バウンスします。 ただし、アプリケーションがアクティブになるかリクエストがキャンセルされるまで、そのリクエストはアクティブのままです。

**注釈:** このメソッドは、アプリがフォーカスされていないときにのみ使用できます。アプリがフォーカスされていると -1 を返します。

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

アプリケーションの \[Dock メニュー\]\[dock-menu\] を設定します。

#### `dock.getMenu()` _macOS_

戻り値 `Menu | null` - アプリケーションの \[Dock メニュー\]\[dock-menu\]。

#### `dock.setIcon(image)` _macOS_

* `image` ([NativeImage](native-image.md) | String)

このドックアイコンに関連付けられた `image` を設定します。
