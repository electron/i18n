## Class: Dock

> Control your app in the macOS dock

Процес: [Main](../glossary.md#main-process)

The following example shows how to bounce your icon on the dock.

```javascript
const { app } = require('electron')
app.dock.bounce()
```

### Методи Екземпляра

#### `dock.bounce([type])` _macOS_

* `type` String (optional) - Can be `critical` or `informational`. The default is `informational`

Returns `Integer` - an ID representing the request.

Коли передано `critical`, піктограма в панелі завдань буде стрибати поки застосунок не стане активним чи поки запит не скасується.

When `informational` is passed, the dock icon will bounce for one second. However, the request remains active until either the application becomes active or the request is canceled.

**Nota Bene:** This method can only be used while the app is not focused; when the app is focused it will return -1.

#### `dock.cancelBounce(id)` _macOS_

* `id` Integer

Скасувати стрибання `id`.

#### `dock.downloadFinished(filePath)` _macOS_

* `filePath` String

Примусити стрибати піктограму Downloads якщо filePath всередині директорії Downloads.

#### `dock.setBadge(text)` _macOS_

* `text` String

Встановлює для показу в зоні бейжда піктограми на панелі завдань.

#### `dock.getBadge()` _macOS_

Повертає `String` - Стрічка з бейджа піктограми на панелі завдань.

#### `dock.hide()` _macOS_

Ховає піктограму з панелі задач.

#### `dock.show()` _macOS_

Повертає `Promise<void>` - Виконується коли показується піктограма на панелі задач.

#### `dock.isVisible()` _macOS_

Повертає `Boolean` - Чи видима піктограма на панелі задач.

#### `dock.setMenu(menu)` _macOS_

* `menu` [Menu](menu.md)

Sets the application's \[dock menu\]\[dock-menu\].

#### `dock.getMenu()` _macOS_

Returns `Menu | null` - The application's \[dock menu\]\[dock-menu\].

#### `dock.setIcon(image)` _macOS_

* `image` ([NativeImage](native-image.md) | String)

Встановлює `image`, що відповідає панелі задач.
