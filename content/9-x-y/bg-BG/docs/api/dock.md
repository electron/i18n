## Class: Dock

> Control your app in the macOS dock

Процеса: [Main](../glossary.md#main-process)

The following example shows how to bounce your icon on the dock.

```javascript
const { app } = require('electron')
app.dock.bounce()
```

### Инстантни методи

#### `dock.bounce([type])` _macOS_

* `type` String (optional) - Can be `critical` or `informational`. The default is `informational`

Returns `Integer` - an ID representing the request.

Когато е изпратено `critical`, иконката на дока ще подскоча докато или приложението не стане активно или заявката не бъде спряна.

When `informational` is passed, the dock icon will bounce for one second. However, the request remains active until either the application becomes active or the request is canceled.

**Nota Bene:** This method can only be used while the app is not focused; when the app is focused it will return -1.

#### `dock.cancelBounce(id)` _macOS_

* `id` Integer

Спира подскачането на `id`.

#### `dock.downloadFinished(filePath)` _macOS_

* `filePath` String

Подскача Downloads ако е включен filePath в папката за сваляне.

#### `dock.setBadge(text)` _macOS_

* `text` String

Поставя низ, който да бъде показан в областта на дока.

#### `dock.getBadge()` _macOS_

Връща `String` - Низът от дока.

#### `dock.hide()` _macOS_

Скрива иконката на дока.

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

Слага `image` асоцииран с тази иконка на дока.
