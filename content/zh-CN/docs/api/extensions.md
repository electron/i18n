# Chrome 扩展支持

Electron 支持 [Chrome 扩展API][chrome-extensions-api-index]的子集， 主要是支持 DevTools 扩展和 Chromium-internal 扩展，但它同时也支持一些其他扩展能。

> **Note:** Electron does not support arbitrary Chrome extensions from the store, and it is a **non-goal** of the Electron project to be perfectly compatible with Chrome's implementation of Extensions.

## 加载扩展

Electron 只支持加载未打包的扩展 (即不能使用 `.crx` 文件)。 插件会被安装到每一个`会话`。 要加载扩展，请调用 [`ses.loadextension`](session.md#sesloadextensionpath-options)：

```js
const { session } = require('electron')

session.loadExtension('path/to/unpacked/extension').then(({ id }) => {
  // ...
})
```

Loaded extensions will not be automatically remembered across exits; if you do not call `loadExtension` when the app runs, the extension will not be loaded.

注意，仅能在持久 session 中加载扩展。 尝试将扩展加载到内存 session 中会出现错误。

See the [`session`](session.md) documentation for more information about loading, unloading, and querying active extensions.

## Supported Extensions APIs

We support the following extensions APIs, with some caveats. Other APIs may additionally be supported, but support for any APIs not listed here is provisional and may be removed.

### `chrome.devtools.inspectedWindow`

All features of this API are supported.

### `chrome.devtools.network`

All features of this API are supported.

### `chrome.devtools.panels`

All features of this API are supported.

### `chrome.extension`

The following properties of `chrome.extension` are supported:

- `chrome.extension.lastError`

The following methods of `chrome.extension` are supported:

- `chrome.extension.getURL`
- `chrome.extension.getBackgroundPage`

### `chrome.runtime`

The following properties of `chrome.runtime` are supported:

- `chrome.runtime.lastError`
- `chrome.runtime.id`

The following methods of `chrome.runtime` are supported:

- `chrome.runtime.getBackgroundPage`
- `chrome.runtime.getManifest`
- `chrome.runtime.getPlatformInfo`
- `chrome.runtime.getURL`
- `chrome.runtime.connect`
- `chrome.runtime.sendMessage`

The following events of `chrome.runtime` are supported:

- `chrome.runtime.onStartup`
- `chrome.runtime.onInstalled`
- `chrome.runtime.onSuspend`
- `chrome.runtime.onSuspendCanceled`
- `chrome.runtime.onConnect`
- `chrome.runtime.onMessage`

### `chrome.storage`

Only `chrome.storage.local` is supported; `chrome.storage.sync` and `chrome.storage.managed` are not.

### `chrome.tabs`

The following methods of `chrome.tabs` are supported:

- `chrome.tabs.sendMessage`
- `chrome.tabs.executeScript`

> **Note:** In Chrome, passing `-1` as a tab ID signifies the "currently active tab". Since Electron has no such concept, passing `-1` as a tab ID is not supported and will raise an error.

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

All features of this API are supported.

> **注意：** 如果有冲突需要处理，Electron 的 [`webRequest`](web-request.md) 模块将优先于 `chrome.web` 。

[chrome-extensions-api-index]: https://developer.chrome.com/extensions/api_index
