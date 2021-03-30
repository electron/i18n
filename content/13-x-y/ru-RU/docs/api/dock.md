## Класс: Dock

> Управляйте вашим приложением в macOS dock

Процесс: [Основной](../glossary.md#main-process)

Следующий пример показывает, как отскочить вашу иконку в dock.

```javascript
const { app } = require('electron')
app.dock.bounce()
```

### Методы экземпляра

#### `dock.bounce([type])` _macOS_

* `type` String (опционально) - Может быть `critical` или `informational`. По умолчанию `informational`

Возвращает `Integer` - ID, представляющий запрос.

Когда передается `critical`, значок dock будет отскакивать, пока приложение не станет активным или запрос отменился.

Когда `informational` пропущен, значок dock будет подпрыгивать в течение одной секунды. Тем не менее, запрос остается активным, пока приложение не станет активным или запрос не будет отменен.

**Обратите внимание:** Этот метод можно использовать только тогда, когда приложение не сфокусировано; когда приложение сфокусировано, оно вернет -1.

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

Устанавливает Dock меню приложения [dock-menu].

#### `dock.getMenu()` _macOS_

Возвращает `Menu | null` - Dock меню приложения [dock-menu].

#### `dock.setIcon(image)` _macOS_

* `image` ([NativeImage](native-image.md) | String)

Устанавливает `image`, ассоциируемый со значком в dock.
