## Класс: Dock

> Управляйте вашим приложением в macOS dock

Процесс: [Главный](../glossary.md#main-process)

Следующий пример показывает, как отскочить вашу иконку в dock.

```javascript
const { app } = require('electron')
app.dock.bounce()
```

### Методы экземпляра

#### `dock.bounce([type])` _macOS_

* `type` String (опционально) - Может быть `critical` или `informational`. По умолчанию `informational`

Возвращает `Integer` - ID, представляющий запрос.

Когда `critical` передается, значок dock будет отскакивать, пока приложение не станет активным или запрос отменяется.

Когда `informational` пропущен, значок dock будет подпрыгивать в течение одной секунды. Тем не менее, запрос остается активным, пока приложение не станет активным или запрос не будет отменен.

**Обратите внимание:** Этот метод можно использовать только тогда, когда приложение не сфокусировано; когда приложение сфокусировано, оно вернет -1.

#### `dock.cancelBounce(id)` _macOS_

* `id` Integer

Отменить отскок по `id`.

#### `dock.downloadFinished(filePath)` _macOS_

* `filePath` String

Отскакивает от "Downloads", если путь к файлу находится в папке "Downloads".

#### `dock.setBadge(text)` _macOS_

* `text` String

Устанавливает строку для отображения в панели dock запирающими областями.

#### `dock.getBadge()` _macOS_

Возвращает `String` - строки значка в dock.

#### `dock.hide()` _macOS_

Скрыть значок в dock.

#### `dock.show()` _macOS_

Возвращает `Promise<void>` - выполняется, когда показан значок dock.

#### `dock.isVisible()` _macOS_

Возвращает `Boolean` - виден или нет значок dock.

#### `dock.setMenu(menu)` _macOS_

* `menu` [Menu](menu.md)

Устанавливает Dock меню приложения [dock-menu].

#### `dock.getMenu()` _macOS_

Возвращает `Menu | null` - Dock меню приложения [dock-menu].

#### `dock.setIcon(image)` _macOS_

* `image` ([NativeImage](native-image.md) | String)

Задает `image`, связывает со значком в dock.
