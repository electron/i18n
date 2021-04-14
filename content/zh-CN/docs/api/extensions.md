# 铬扩展支持

电子支持 [铬扩展 API][chrome-extensions-api-index]的子集，主要支持DevTools扩展和 铬内部扩展，但它也碰巧支持一些其他 扩展功能。

> **注意：** 电子不支持 存储的任意 Chrome 扩展，并且电子项目的 **非目标** 与 Chrome 的扩展实施完全 兼容。

## 加载扩展

电子仅支持加载未包装的扩展（即 `.crx` 文件不 工作）。 扩展按`session`安装。 要加载扩展，请致电 [`ses.loadExtension`](session.md#sesloadextensionpath-options)：

```js
续 { session } =要求（"电子"）

会话。加载扩展（"路径/到/拆包/扩展"）然后（{ id }）=> {
  //
})
```

加载的扩展不会跨出口自动记住：如果您 在应用运行时不呼叫 `loadExtension` ，则不会加载扩展。

请注意，加载扩展仅在持续会话中支持。 尝试将扩展加载到内存会话中会抛出一个错误。

有关 加载、卸载和查询活动扩展的更多信息，请参阅 [`session`](session.md) 文档。

## 支持扩展 ABI

我们支持以下扩展 ABI，并提出了一些警告。 其他 ABI 可能 其他支持，但此处未列出的任何 ABI 的支持 临时的，可能会被删除。

### `铬. 德夫图尔. 检查窗口`

此 API 的所有功能都得到支持。

### `铬. 开发凳子. 网络`

此 API 的所有功能都得到支持。

### `铬. 开发凳子. 面板`

此 API 的所有功能都得到支持。

### `铬。扩展`

支持 `chrome.extension` 的以下属性：

- `铬. 扩展. 最后`

支持以下 `chrome.extension` 方法：

- `铬.扩展。获取`
- `铬. 扩展. 获取后地页`

### `铬。运行时间`

支持 `chrome.runtime` 的以下属性：

- `铬。 运行时间. 最后`
- `chrome.runtime.id`

支持以下 `chrome.runtime` 方法：

- `铬。运行时间。获取后地页`
- `铬。 运行时间. 获取马尼菲斯特`
- `铬。 运行时间. 获取平台信息`
- `铬。 运行时间. 获取`
- `铬. 运行时间. 连接`
- `铬。 运行时间. 发送信息`

支持以下 `chrome.runtime` 活动：

- `铬。运行时间。启动`
- `铬。 运行时间. 安装`
- `铬。 运行时间. 暂停`
- `铬。 运行时间. 暂停`
- `铬。运行时间。连接`
- `铬。运行时间。信息`

### `铬存储`

仅支持 `chrome.storage.local` ： `chrome.storage.sync` 和 `chrome.storage.managed` 不是。

### `铬。`

支持以下 `chrome.tabs` 方法：

- `铬. 标签. 发送信息`
- `铬. 标签. 执行脚本`

> **注意：在Chrome中** ，将 `-1` 作为选项卡 ID 表示"当前活动 选项卡"。 由于 Electron 没有此类概念，因此通过 `-1` 作为选项卡 ID 不会 支持，并且会产生错误。

### `铬管理`

支持以下 `chrome.management` 方法：

- `铬.管理。获取所有`
- `铬. 管理. 获取`
- `铬.管理。获取自我`
- `铬.管理。获取管理警告`
- `铬.管理.获取通过马尼菲斯特的警告`
- `铬. 管理. 可打开`
- `铬。管理。可解`

### `chrome.webRequest`

此 API 的所有功能都得到支持。

> **注意：** 如果有冲突需要处理，Electron 的 [`webRequest`](web-request.md) 模块将优先于 `chrome.web` 。

[chrome-extensions-api-index]: https://developer.chrome.com/extensions/api_index
