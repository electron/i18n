# Chrome 扩展支持

Electron 支持 [Chrome 扩展API][chrome-extensions-api-index]的子集， 主要是支持 DevTools 扩展和 Chromium-internal 扩展，但它同时也支持一些其他扩展能。

> **注意**：Electron 不支持商店中的任意 Chrome 扩展，Electron 项目的目标**不是**与 Chrome 的扩展实现完全兼容。

## 加载扩展

Electron 只支持加载未打包的扩展 (即不能使用 `.crx` 文件)。 插件会被安装到每一个`会话`。 要加载扩展，请调用 [`ses.loadextension`](session.md#sesloadextensionpath-options)：

```js
const { session } = require('electron')

session.loadExtension('path/to/unpacked/extension').then(({ id }) => {
  // ...
})
```

加载的扩展将不会被自动记住；如果在应用程序运行时未调用 `loadExtension`，则不会加载扩展。

注意，仅能在持久 session 中加载扩展。 尝试将扩展加载到内存 session 中会出现错误。

有关加载、卸载和查询活动扩展的更多信息，请查阅 [`session`](session.md) 文档。

## 支持的扩展 API

我们支持以下扩展 API，并需要注意一些警告。 其他API可能会得到额外支持，但对此处未列出的任何API的支持都是临时的，可能会被删除。

### `chrome.devtools.inspectedWindow`

支持这些 API 的所有功能。

### `chrome.devtools.network`

支持这些 API 的所有功能。

### `chrome.devtools.panels`

支持这些 API 的所有功能。

### `chrome.extension`

支持 `chrome.extension` 的以下属性：

- `chrome.extension.lastError`

支持 `chrome.extension` 的以下方法：

- `chrome.extension.getURL`
- `chrome.extension.getBackgroundPage`

### `chrome.runtime`

支持 `chrome.runtime` 的以下属性：

- `chrome.runtime.lastError`
- `chrome.runtime.id`

支持 `chrome.runtime` 的以下方法：

- `chrome.runtime.getBackgroundPage`
- `chrome.runtime.getManifest`
- `chrome.runtime.getPlatformInfo`
- `chrome.runtime.getURL`
- `chrome.runtime.connect`
- `chrome.runtime.sendMessage`

支持 `chrome.runtime` 的以下事件：

- `chrome.runtime.onStartup`
- `chrome.runtime.onInstalled`
- `chrome.runtime.onSuspend`
- `chrome.runtime.onSuspendCanceled`
- `chrome.runtime.onConnect`
- `chrome.runtime.onMessage`

### `chrome.storage`

仅支持 `chrome.storage.local` ； `chrome.storage.sync` 和 `chrome.storage.manage.manage` 不支持。

### `chrome.tabs`

支持 `chrome.tab` 的以下方法：

- `chrome.tabs.sendMessage`
- `chrome.tabs.executeScript`

> **注意：** 在 Chrome 中，通过 `-1` 作为标签ID表示“当前活动的标签”。 因为 Electron 没有这样的概念，通过 `-1` 作为选项卡ID不支持而且会报错。

### `chrome.management`

支持 `chrome.management` 的以下方法：

- `chrome.management.getAll`
- `chrome.management.get`
- `chrome.management.getSelf`
- `chrome.management.getPermissionWarningsById`
- `chrome.management.getPermissionWarningsByManifest`
- `chrome.management.onEnabled`
- `chrome.management.onDisabled`

### `chrome.webRequest`

支持这些 API 的所有功能。

> **注意：** 如果有冲突需要处理，Electron 的 [`webRequest`](web-request.md) 模块将优先于 `chrome.web` 。

[chrome-extensions-api-index]: https://developer.chrome.com/extensions/api_index
