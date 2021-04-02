## 类： 码头

> 在 macOS 扩展坞中控制您的应用

进程：[主进程](../glossary.md#main-process)

以下示例显示了如何在基座上弹跳图标。

```javascript
const { app } = require('electron')
app.dock.bounce()
```

### 实例方法

#### `dock.bounce([type])` _macOS_

* `type` 字符串（可选） - 可以 `critical` 或 `informational`。 默认值为 `informational`

返回 `Integer` - 代表请求的 ID。

当传入的是 `critical` 时, dock 中的应用将会开始弹跳, 直到这个应用被激活或者这个请求被取消。

当 `informational` 通过时，基座图标将反弹一秒钟。 但是，请求保持活动状态，直到应用程序 激活或请求被取消。

**·奥塔·贝恩：** 这种方法只能在应用程序不集中时使用：当应用程序集中时，它将返回-1。

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

返回 `Promise<void>` - 显示基座图标时解析。

#### `dock.isVisible()` _macOS_

返回 `Boolean` - 是否可见基座图标。

#### `dock.setMenu(menu)` _macOS_

* `menu` [Menu](menu.md)

设置应用程序的\[码头菜单\]\[dock-menu\]。

#### `dock.getMenu()` _macOS_

返回 `Menu | null` - 应用程序的\[码头菜单\]\[dock-menu\]。

#### `dock.setIcon(image)` _macOS_

* `image` ([NativeImage](native-image.md) | String)

设置`image`作为应用在 dock 中显示的图标
