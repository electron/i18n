# crashReporter

> 将崩溃日志提交给远程服务器

进程： [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

以下是一个设置Electron自动提交崩溃日志到远程服务器的示例：

```javascript
const { crashReporter } = require('electron')

crashReporter.start({ submitURL: 'https://your-domain.com/url-to-submit' })
```

构建一个用于接受和处理崩溃日志的服务，你需要以下工程

* [socorro](https://github.com/mozilla/socorro)
* [mini-breakpad-server](https://github.com/electron/mini-breakpad-server)

或者使用第三方托管的解决办法：

* [Backtrace](https://backtrace.io/electron/)
* [Sentry](https://docs.sentry.io/clients/electron)
* [BugSplat](https://www.bugsplat.com/docs/platforms/electron)

崩溃报告在上传之前会临时存储在应用程序的用户数据目录下 (在Windows和Mac上称为“Crashpad”，在Linux上称为“Crash reports”)。 在启动崩溃报告器之前，你可以通过调用 `app.setPath('crashDumps', '/path/to/crashes')` 来覆盖该目录。

在 Windows 和 macOS 上，Electron 使用 [crashpad](https://chromium.googlesource.com/crashpad/crashpad/+/master/README.md) 来监视和报告崩溃情况。 在 Linux上，Electron 使用[breakpad](https://chromium.googlesource.com/breakpad/breakpad/+/master/)。 这个实现细节是由Chromium驱动的，将来可能会发生变化。 尤其，crashpad是新出的，可能最终会取代所有平台的breakpad。

### 关于Linux上的Node子进程的说明

如果你在Linux上使用的是Node.js的 `child_process` 模块，并且想要在这些进程中报告崩溃信息，那么需要采取额外的步骤来在子进程中正确初始化崩溃报告器。 在 Mac 或 Windows 上就没有这个问题，因为这两个平台使用的Crashpad会自动监视子进程。

由于Node的子进程中无法使用 `require('electron')` ，那么在Node的子进程中的 `process` 对象中的以下 API 是可用的。 请注意，在Linux上，每个Node子进程的 breakpad 崩溃报告器都有自己独立的实例。 这与渲染器子进程不同，其具有"存根" breakpad 报告器，将信息返回到主进程进行报告。

#### `process.crashReporter.start(options)`

见 [`crashReporter.start()`](#crashreporterstartoptions)。

#### `process.crashReporter.getParameters()`

见 [`crashReporter.getParameters()`](#crashreportergetparameters)。

#### `process.crashReporter.addExtraParameter(key, value)`

见 [`crashReporter.addExtraParameter(key, value)`](#crashreporteraddextraparameterkey-value)。

#### `process.crashReporter.removeExtraParameter(key)`

见 [`crashReporter.removeExtraParameter(key)`](#crashreporterremoveextraparameterkey)。

## 方法

` crashReporter ` 模块具有以下方法:

### `crashReporter.start(options)`

* `选项` 对象
  * `submitURL` String (可选) - 崩溃报告将以POST的方式发送给这个URL。 必填 除非`uploadToServer`是`false`
  * `productName` String (可选) - 默认为 `app.name`.
  * `companyName` String (可选) _已废弃_ - 已废弃别名为`{ globalExtra: { _companyName: ... } }`。
  * `uploadToServer` Boolean (可选) - 是否将崩溃报告发送给服务器。 如果为 false，崩溃报告将被收集并存储在崩溃目录中，但不会上传。 默认值为 `true`。
  * `ignoreSystemCrashHandler` Boolean (可选) - 如果为true，在主进程中生成的崩溃将不会转发给系统崩溃处理器。 默认值为 `false`.
  * `rateLimit` Boolean (可选) _macOS_ _Windows_ - 如果为true，将上传的崩溃次数限制到 1次/小时。 默认值为 `false`.
  * `compress` Boolean (可选) - 如果为true，崩溃报告将压缩并上传，使用带有 `Content-Encoding: gzip` 的头部。 默认值为 `true`。
  * `extra` Record<String, String> (可选) - 将随主进程生成的崩溃报告一起发送的额外字符串键/值注解。 只支持string值。 在子进程中产生的崩溃将不会在子进程生成的崩溃报告中包含这些额外的参数。 在子进程中调用 [`addExtrameter`](#crashreporteraddextraparameterkey-value) 。
  * `globalExtra` Record<String, String> (可选) - 会与任意进程产生的崩溃报告一起发送的额外字符串键/值注解。 一旦崩溃报告器启动，这些注解就无法更改。 如果一个键在global extra参数和进程特定的额外参数中出现，那么全局的那个将优先使用。 默认情况下，会包括 `productName` 和应用程序版本，也就是Electron版本。

该方法必须在使用其他 `崩溃报告器` 的API之前调用。 一旦以这种方式初始化，crashpad处理器就会从所有随后创建的进程中收集崩溃信息。 崩溃报告器一旦启动就无法禁用了。

该方法应尽早地在app启动后调用，最好在 `app.on('ready')` 之前。 如果崩溃报告器没有在渲染器进程创建前初始化，那么渲染器进程将不会被崩溃报告器监视。

**注意：** 您可以通过使用`process.crash()`生成一个崩溃来测试崩溃报告器。

** 注意: **，如果您在第一次调用 `start` 后需要发送 附加的/更新的 ` extra ` 参数，你可以调用 ` addExtraParameter `。

**注意：** 通过 `extra`, `globalExtra`传递，或通过`addExtrameter`设置的参数对键和值的长度有限制。 键名最长是 39 字节，值不能超过 127 字节。 超过最大长度的键名将被直接忽略。 超过最大长度的键值将被截断。

**注意：** 此方法仅在主进程中可用。

### `crashReporter.getLastCrashReport()`

返回 [`CrashReport`](structures/crash-report.md) - 上次崩溃报告的日期和 ID。 只有已上传的崩溃报告会被返回；在磁盘上存在崩溃报告，除非上传了，否则不会返回。 如果没有上传的报告，则返回`null`

**注意：** 此方法仅在主进程中可用。

### `crashReporter.getUploadedReports()`

返回 [`CrashReport[]`](structures/crash-report.md):

返回所有已上传的崩溃报告。 每个报告包含日期以及上传ID。

**注意：** 此方法仅在主进程中可用。

### `crashReporter.getUploadToServer()`

返回 `Boolean` - 是否应向服务器提交报告。 通过`start` 方法或 `setUploadToServer`设置。

**注意：** 此方法仅在主进程中可用。

### `crashReporter.setUploadToServer(uploadToServer)`

* `uploadToServer` Boolean - 是否将报告提交到服务器。

通常由用户首选项控制。 如果在 `start` 被调用前调用，该方法将不起作用。

**注意：** 此方法仅在主进程中可用。

### `crashReporter.addExtraParameter(key, value)`

* `key` String - 参数键，长度必须小于39个字节。
* `value` String - 参数值，长度必须小于127个字节。

设置一个在发送崩溃报告时将额外包含的参数。 当调用 `start` 时, 在这里指定的值会和所有通过 `extra` 选项设置的值一起发送。

以这种方式添加的参数 (或通过 `extra` 参数到`crashReporter.start`)是特定于调用进程的。 在主进程中添加extra参数，这些参数将不会与渲染器或其它子进程的崩溃报告一起发送。 同样，在渲染器进程中添加的extra参数不会与其它渲染器进程或主进程中发生的崩溃一起发送。

**注意：** 参数对键和值的长度有限制。 键名最长是 39 字节，值不能超过 20320 字节。 超过最大长度的键名将被直接忽略。 超过最大长度的键值将被截断。

**注意：** 在linux上，超过 127 字节的值将被分割成多个键，每个长度为127个字节。  如下: `addExtraParameter('foo', 'a'.repeat(130))`将产生两个分块的键， `foo__1` 和 `foo__2`，第一个将包含前127字节，第二个将包含剩余的3字节。  在你的崩溃报告后端，你应该以这种格式将键合在一起。

### `crashReporter.removeExtraParameter(key)`

* `key` String - 参数键，长度必须小于39个字节。

从当前的参数集中删除一个额外的参数。 未来的崩溃中将不包含此参数。

### `crashReporter.getParameters()`

返回 `Record<String, String>` - 崩溃报告器当前的“extra”参数。

## 崩溃报告内容

崩溃报告将发送下面 `multipart/form-data` `POST` 型的数据给 `submitURL`:

* `ver` String - Electron 的版本.
* `platform` String - 例如 'win32'.
* `process_type` String - 例如 'renderer'.
* `guid` String - 例如 '5e1286fc-da97-479e-918b-6bfb0c3d1c72'.
* `_version` String - `package.json` 里的版本号.
* `_productName` String - `crashReporter` `options` 对象中的产品名字
* `prod` String - 基础产品的名称。 在这种情况下是Electron。
* `_companyName` String - `crashReporter` `options` 对象中的公司名称
* `upload_file_minidump` File - `minidump` 格式的崩溃报告
* All level one properties of the `extra` object in the `crashReporter` `options` object.
