## Class: Dock

> Control your app in the macOS dock

Процесс: [Главный](../glossary.md#main-process)

The following example shows how to bounce your icon on the dock.

```javascript
const { app } = require('electron')
app.dock.bounce()
```

### Методы экземпляра

#### `dock.bounce([type])` _macOS_

* `type` String (optional) - Can be `critical` or `informational`. The default is `informational`

Returns `Integer` - an ID representing the request.

Когда передается `critical`, значок dock будет отскакивать, пока приложение не станет активным или запрос отменился.

When `informational` is passed, the dock icon will bounce for one second. However, the request remains active until either the application becomes active or the request is canceled.

**Nota Bene:** This method can only be used while the app is not focused; when the app is focused it will return -1.

#### `dock.cancelBounce(id)` _macOS_

* `id` Integer

Отменить отскок по `id`.

#### `dock.downloadFinished(filePath)` _macOS_

* `filePath` String

Отскакивает от загрузок, если путь к файлу находится в папке загрузок.

#### `dock.setBadge(text)` _macOS_

* `text` String

Устанавливает строку для отображения в зоне значка панели dock.

#### `dock.getBadge()` _macOS_

Возвращает `String` - строка значка в dock.

#### `dock.hide()` _macOS_

Скрывает значок в dock.

#### `dock.show()` _macOS_

Возвращает `Promise<void>` - выполняется, когда показан значок dock.

#### `dock.isVisible()` _macOS_

Возвращает `Boolean` - виден или нет значок dock.

#### `dock.setMenu(menu)` _macOS_

* `menu` [Menu](menu.md)

Sets the application's \[dock menu\]\[dock-menu\].

#### `dock.getMenu()` _macOS_

Returns `Menu | null` - The application's \[dock menu\]\[dock-menu\].

#### `dock.setIcon(image)` _macOS_

* `image` ([NativeImage](native-image.md) | String)

Устанавливает `image`, ассоциируемый со значком в dock.
