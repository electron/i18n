# Chrome Extension Support

Electron частично поддерживает [Chrome Extensions API][chrome-extensions-api-index] прежде всего для поддержки расширений для DevTools и внутренних Chromium расширений, но он также поддерживает и некоторые другие возможности расширений.

> **Примечание:** Electron не поддерживает пользовательские расширения из магазина Chrome. Идеальная совместимость с реализацией расширений Chrome **не является целью** проекта Electron.

## Загрузка расширений

Electron поддерживает загрузку только распакованных расширение (т.е. файлы `.crx` не будут работать). Расширения устанавливаются с помощью объекта `session`. Для загрузки расширения вызовите [`ses.loadExtension`](session.md#sesloadextensionpath):

```js
const { session } = require('electron')

session.loadExtension('path/to/unpacked/extension').then(({ id }) => {
  // ...
})
```

Загруженные расширения не буду автоматически запоминаться при выходе: если вы не вызовите `loadExtension` при запуске приложения - расширение не будет загружено.

Обратите внимание, что загрузка расширений поддерживается только в постоянных сессиях. Попытка загрузить расширение в сохраненную сессию приведет к ошибке.

Смотрите документацию по [`session`](session.md) чтобы узнать больше о загрузке, выгрузке и получении активных расширений.

## Поддерживаемые API расширений

Мы поддерживаем следующие API расширений с некоторыми оговорками. Остальные API могут дополнительно поддерживаться, но поддержка API, не перечисленных здесь, является предварительной и может быть удалена.

### `chrome.devtools.inspectedWindow`

Все функции этого API поддерживаются.

### `chrome.devtools.network`

Все функции этого API поддерживаются.

### `chrome.devtools.panels`

Все функции этого API поддерживаются.

### `chrome.extension`

Поддерживаются только следующие свойства `chrome.extension`:

- `chrome.extension.lastError`

Поддерживаются только следующие методы `chrome.extension`:

- `chrome.extension.getURL`
- `chrome.extension.getBackgroundPage`

### `chrome.runtime`

Поддерживаются только следующие свойства `chrome.runtime`:

- `chrome.runtime.lastError`
- `chrome.runtime.id`

Поддерживаются только следующие методы `chrome.runtime`:

- `chrome.runtime.getBackgroundPage`
- `chrome.runtime.getManifest`
- `chrome.runtime.getPlatformInfo`
- `chrome.runtime.getURL`
- `chrome.runtime.connect`
- `chrome.runtime.sendMessage`

Поддерживаются только следующие события `chrome.runtime`:

- `chrome.runtime.onStartup`
- `chrome.runtime.onInstalled`
- `chrome.runtime.onSuspend`
- `chrome.runtime.onSuspendCanceled`
- `chrome.runtime.onConnect`
- `chrome.runtime.onMessage`

### `chrome.storage`

Поддерживается только `chrome.storage.local`; `chrome.storage.sync` и `chrome.storage.managed` не поддерживаются.

### `chrome.tabs`

Поддерживаются только следующие методы `chrome.tabs`:

- `chrome.tabs.sendMessage`
- `chrome.tabs.executeScript`

> **Примечание:** В Chrome, передача `-1` в качестве идентификатора вкладки означает "текущую активную вкладку". Поскольку в Electron такого понятия нет, передача `-1` не поддерживается и вызовет ошибку.

### `chrome.management`

The following methods of `chrome.management` are supported:

- `chrome.management.getAll`
- `chrome.management.get`
- `chrome.management.getSelf`
- `chrome.management.getPermissionWarningsById`
- `chrome.management.getPermissionWarningsByManifest`
- `chrome.management.onEnabled`
- `chrome.management.onDisabled`

### `chrome.webRequest`

Все функции этого API поддерживаются.

> **NOTE:** Electron's [`webRequest`](web-request.md) module takes precedence over `chrome.webRequest` if there are conflicting handlers.

[chrome-extensions-api-index]: https://developer.chrome.com/extensions/api_index
