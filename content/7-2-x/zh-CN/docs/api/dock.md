## Class: Dock

> Control your app in the macOS dock

进程：[主进程](../glossary.md#main-process)

The following example shows how to bounce your icon on the dock.

```javascript
const { app } = require('electron')
app.dock.bounce()
```

### 实例方法

#### `dock.bounce([type])` _macOS_

* `type` String (optional) - Can be `critical` or `informational`. The default is `informational`

Returns `Integer` - an ID representing the request.

当传入的是 `critical` 时, dock 中的应用将会开始弹跳, 直到这个应用被激活或者这个请求被取消。

When `informational` is passed, the dock icon will bounce for one second. However, the request remains active until either the application becomes active or the request is canceled.

**Nota Bene:** This method can only be used while the app is not focused; when the app is focused it will return -1.

#### `dock.cancelBounce(id)` _macOS_

* `id` Integer

取消这个 ` id ` 对应的请求。

#### `dock.downloadFinished(filePath)` _macOS_

* `filePath` String

如果 filePath 位于 Downloads 文件夹中，则弹出下载队列。

#### `dock.setBadge(text)` _macOS_

* `text` String

设置应用在 dock 中显示的字符串。

#### `dock.getBadge()` _macOS_

返回 `String` - 应用在 dock 中显示的字符串。

#### `dock.hide()` _macOS_

隐藏 dock 中的图标。

#### `dock.show()` _macOS_

Returns `Promise<void>` - Resolves when the dock icon is shown.

#### `dock.isVisible()` _macOS_

Returns `Boolean` - Whether the dock icon is visible.

#### `dock.setMenu(menu)` _macOS_

* `menu` [Menu](menu.md)

Sets the application's \[dock menu\]\[dock-menu\].

#### `dock.getMenu()` _macOS_

Returns `Menu | null` - The application's \[dock menu\]\[dock-menu\].

#### `dock.setIcon(image)` _macOS_

* `image` ([NativeImage](native-image.md) | String)

设置`image`作为应用在 dock 中显示的图标
