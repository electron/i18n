# crashReporter

> 将崩溃日志提交给远程服务器

进程： [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

以下是设置 Electron 以自动将 崩溃报告提交到远程服务器的示例：

```javascript
康斯特 { crashReporter } =要求（"电子"）

崩溃报告器。开始（{提交URL：'https://your-domain.com/url-to-submit'}）
```

构建一个用于接受和处理崩溃日志的服务，你需要以下工程

* [socorro](https://github.com/mozilla/socorro)
* [mini-breakpad-server](https://github.com/electron/mini-breakpad-server)

或者使用第三方托管的解决办法：

* [回溯](https://backtrace.io/electron/)
* [Sentry](https://docs.sentry.io/clients/electron)
* [错误板](https://www.bugsplat.com/docs/platforms/electron)

崩溃报告在上传到应用用户数据目录下方的目录 之前会暂时存储（在 Windows 和 Mac 上称为"崩溃板"， 或 Linux 上的"崩溃报告"）。 您可以在 记者开始崩溃之前致电 `app.setPath('crashDumps', '/path/to/crashes')` ，从而覆盖此目录。

在 Windows 和 macOS 上，电子使用 [防撞板](https://chromium.googlesource.com/crashpad/crashpad/+/master/README.md) 来监视和报告崩溃。 在Linux上，电子使用 [断板](https://chromium.googlesource.com/breakpad/breakpad/+/master/)。 此 是铬驱动的实现细节，将来可能会发生变化。 特别是 ，防撞板较新，最终可能会取代所有平台上的 断板。

### 关于Linux上的节点儿童流程的说明

如果您正在使用节点.js `child_process` 模块，并希望报告从 Linux 上的这些流程 崩溃，则需要采取额外的步骤来 在儿童过程中正确初始化崩溃报告。 这在 Mac 或 Windows 上 没有必要，因为这些平台使用崩溃板， 自动监控儿童过程。

由于节点儿童流程中不提供 `require('electron')` ，在节点儿童流程中的 `process` 对象上可获得 API 之后的 。 请注意，在 Linux 上，每个节点子过程都有自己的单独实例 断板崩溃记者。 这与渲染器儿童过程不同， 其中有一个"存根"断板记者，将信息返回到主要 过程进行报告。

#### `process.crashReporter.start(options)`

见 [`crashReporter.start()`](#crashreporterstartoptions)。

#### `过程。崩溃报告器.获取参数（）`

见 [`crashReporter.getParameters()`](#crashreportergetparameters)。

#### `过程.崩溃报告器.添加超参数（关键，值）`

见 [`crashReporter.addExtraParameter(key, value)`](#crashreporteraddextraparameterkey-value)。

#### `过程。崩溃报告器.删除外移参数（密钥）`

见 [`crashReporter.removeExtraParameter(key)`](#crashreporterremoveextraparameterkey)。

## 方法

` crashReporter ` 模块具有以下方法:

### `crashReporter.start(options)`

* `选项` 对象
  * `submitURL` 字符串 - 崩溃日志将以POST的方式发送给此URL.
  * `productName` 字符串（可选） - 默认 `app.name`。
  * `companyName` 字符串（可选） _弃用_ -弃用别名为 `{ globalExtra: { _companyName: ... } }`。
  * `uploadToServer` Boolean（可选） - 是否应 将崩溃报告发送到服务器。 如果错误，碰撞报告将被收集并存储在 崩溃目录中，但不会上传。 默认值为 `true`。
  * `ignoreSystemCrashHandler` Boolean （可选） - 如果是真的，主过程中产生的崩溃 不会转发给系统崩溃处理程序。 默认值为 `false`.
  * `rateLimit` 布尔（可选） _macOS_ _视窗_ - 如果是真的，将上传的崩溃 数量限制为 1/小时。 默认值为 `false`.
  * `compress` 布尔（可选） - 如果是真的，碰撞报告将被压缩 ，并与 `Content-Encoding: gzip`上传。 默认值为 `true`。
  * `extra` 记录<String, String> （可选） - 额外的字符串键/值 注释，这些注释将连同在主要过程中 生成的崩溃报告一起发送。 仅支持字符串值。 儿童过程中生成的崩溃将不包含这些额外的 参数，以崩溃从儿童过程生成的报告，呼叫 [`addExtraParameter`](#crashreporteraddextraparameterkey-value) 从 儿童过程。
  * `globalExtra` 记录<String, String> （可选） - 附加字符串键/值 注释，这些注释将与任何 过程中生成的任何崩溃报告一起发送。 这些注释无法更改，一旦崩溃的记者已经 开始。 如果全球额外参数中都存在密钥，并且 过程特定的额外参数，则全球参数将占据 优先级。 默认情况下， `productName` 和应用程序版本包括在内， 以及电子版本。

在使用任何其他 `crashReporter` ABI 之前，必须调用此方法。 一旦 以这种方式初始化，崩溃垫处理程序会收集来自所有 随后创建的流程的崩溃。 撞车记者一旦 开始，就不能被禁用。

这种方法应尽早在应用程序启动中调用，最好在 `app.on('ready')`之前 。 如果碰撞报告器在创建渲染器过程 未初始化，则碰撞报告 不会监控该渲染器过程。

**注意：** 你可以用 `process.crash()`来测试坠机记者。

**注意：** 如果您需要在 第一次通话后发送附加/更新 `extra` 参数， `start` 您可以拨打 `addExtraParameter`。

**注意：** 参数在 `extra`中传递、 `globalExtra` 或设置 `addExtraParameter` 对密钥和值的长度有限制。 的关键名称最多必须为 39 字节长，值不得超过 127 字节。 名称长于最大值的密钥将被默默忽略。 关键值 超过最大长度将被截断。

**注意：** 此方法仅在主要过程中可用。

### `crashReporter.getLastCrashReport()`

返回 [`CrashReport`](structures/crash-report.md) - 上次崩溃报告的日期和ID。 仅将返回已上传的崩溃报告： 即使磁盘上存在崩溃报告，在上传 之前也不会返回。 如果没有上传的报告，则返回`null`

**注意：** 此方法仅在主要过程中可用。

### `crashReporter.getUploadedReports()`

返回 [`CrashReport[]`](structures/crash-report.md):

返回所有上传的崩溃报告。 每个报告都包含日期并上传 ID。

**注意：** 此方法仅在主要过程中可用。

### `崩溃报告器。获取上传到服务器（）`

返回 `Boolean` - 是否应向服务器提交报告。 通过 `start` 方法或 `setUploadToServer`。

**注意：** 此方法仅在主要过程中可用。

### `崩溃报告器.设置上传到服务器（上传到服务器）`

* `uploadToServer` 布尔 - 是否应向服务器提交报告。

这通常由用户首选项控制。 如果在呼叫 `start` 之前 调用，则此无效。

**注意：** 此方法仅在主要过程中可用。

### `崩溃报告器.添加扩展参数（密钥、值）`

* `key` 字符串 - 参数密钥，必须不超过 39 字节。
* `value` 字符串 - 参数值，必须不超过 127 字节。

设置一个在发送崩溃报告时将额外包含的参数。 此处指定 的值将发送到通过 `extra` 选项设置的任何值之外，当 `start` 被调用时。

以这种方式添加的参数（或通过 `extra` 参数 `crashReporter.start`）是特定于调用过程的。 在主过程中添加额外的 参数不会导致这些参数沿 发送，并带有渲染器或其他儿童过程的崩溃。 同样，在渲染器过程中添加额外的 参数不会导致这些参数 发送，而其他渲染器过程或主要过程中会发生崩溃。

**注意：** 参数对密钥和值的长度有限制。 关键 名称不得超过 39 字节，值不得超过 20320 字节。 名称长于最大值的密钥将被默默忽略。 关键 值超过最大长度将被截断。

**注意：** 长于 127 字节的 linux 值将被分成多个键 ，每个密钥的长度为 127 字节。  如下: `addExtraParameter('foo', 'a'.repeat(130))` 将导致两个块键 `foo__1` 和 `foo__2`，第一个将包含 前127字节，第二个将包含剩余的3字节。  在 崩溃报告后端，您应该将此格式的键拼接在一起。

### `崩溃报告器。删除外参数（密钥）`

* `key` 字符串 - 参数密钥，必须不超过 39 字节。

从当前参数集中删除额外的参数。 未来的崩溃 将不包括此参数。

### `crashReporter.getParameters()`

返回 `Record<String, String>` - 坠毁记者当前的"额外"参数。

## 崩溃报告内容

崩溃报告将发送下面 `multipart/form-data` `POST` 型的数据给 `submitURL`:

* `ver` String - Electron 的版本.
* `platform` String - 例如 'win32'.
* `process_type` String - 例如 'renderer'.
* `guid` String - 例如 '5e1286fc-da97-479e-918b-6bfb0c3d1c72'.
* `_version` String - `package.json` 里的版本号.
* `_productName` String - `crashReporter` `options` 对象中的产品名字
* `prod` 字符串 - 基础产品的名称。 在这种情况下，电子。
* `_companyName` String - `crashReporter` `options` 对象中的公司名称
* `upload_file_minidump` File - `minidump` 格式的崩溃报告
* All level one properties of the `extra` object in the `crashReporter` `options` object.
