## Class: Dock

> Control your app in the macOS dock

프로세스:[Main](../glossary.md#main-process)

The following example shows how to bounce your icon on the dock.

```javascript
onst { app } = require('electron')
app.dock.bounce()
```

### Instance Methods (인스턴스 메소드)

#### `dock.bounce([type])` _macOS_

* `type` String (optional) - Can be `critical` or `informational`. The default is `informational`

Returns `Integer` - an ID representing the request.

When `critical` is passed, the dock icon will bounce until either the application becomes active or the request is canceled.

When `informational` is passed, the dock icon will bounce for one second. However, the request remains active until either the application becomes active or the request is canceled.

**Nota Bene:** This method can only be used while the app is not focused; when the app is focused it will return -1.

#### `dock.cancelBounce(id)` _macOS_

* `id` Integer

Cancel the bounce of `id`.

#### `dock.downloadFinished(filePath)` _macOS_

* `filePath` String

Bounces the Downloads stack if the filePath is inside the Downloads folder.

#### `dock.setBadge(text)` _macOS_

* `text` String

Dock 아이콘의 알림 배지(badge) 안에 표현될 텍스트를 설정합니다.

#### `dock.getBadge()` _macOS_

`String`을 반환 - Dock 아이콘의 알림 배지(badge) 안에 있는 문자열을 반환합니다.

#### `dock.hide()` _macOS_

Dock 아이콘을 숨깁니다.

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

`image` Dock 메뉴의 아이콘과 관련된 이미지를 설정합니다.
