# 崩溃日志报告

> 将崩溃日志提交给远程服务器

进程： [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

以下是一个自动提交崩溃日志到服务器的示例

```javascript
const { crashReporter } = require('electron')

crashReporter.start({
  productName: 'YourName',
  companyName: 'YourCompany',
  submitURL: 'https://your-domain.com/url-to-submit',
  uploadToServer: true
})
```

构建一个用于接受和处理崩溃日志的服务，你需要以下工程

* [socorro](https://github.com/mozilla/socorro)
* [mini-breakpad-server](https://github.com/electron/mini-breakpad-server)

或者使用第三方托管的解决办法：

* [Backtrace I/O](https://backtrace.io/electron/)
* [Sentry](https://docs.sentry.io/clients/electron)

崩溃日志被保存在本地的应用特有的临时文件夹中。 对于`YourName`对象中的`productName`，崩溃报日志将被储存在临时文件夹中名为`YourName Crashes`的文件文件夹中。 在启动崩溃报告器之前，您可以通过调用`app.setPath('temp', 'my/custom/temp')` API来自定义这些临时文件的保存路径

## 方法

` crashReporter ` 模块具有以下方法:

### `crashReporter.start(options)`

* `options` Object
  * `compannyame` 字符串
  * `submitURL` 字符串 - 崩溃日志将以POST的方式发送给此URL.
  * `productName` 字符串(可选) - 默认为 `app.getName()`.
  * `uploadToServer` 布尔型(可选) - 控制是否将崩溃日志发送给服务器，默认为`true`.
  * `ignoreSystemCrashHandler` 布尔型(可选) - 默认为`false`.
  * `extra` 对象(可选) - 一个随崩溃日志发送的对象. 只有字符串属性能够被正确发送. 不支持发送嵌套对象，且属性名称和属性值必须小于64个字符长度.
  * ` crashesDirectory `String (可选)-用于临时存储 crashreports 的目录 (仅在崩溃报告器通过 ` process.crashReporter.start ` 启动时使用).

在你调用任何其他的`crashReporter` API之前，您必须调用此方法. 在每个需要收集崩溃日志的进程 (主进程 / 渲染器进程) 中，也必须先调用此方法. 从不同的进程调用时, 可以传不同的配置给 ` crashReporter. start `。

** 注意 **由 ` child_process ` 模块创建的子进程将无法访问 Electron 模块。 因此, 要收集它们的故障报告, 请用 ` process.crashReporter.start `代替。 传递与上面相同的选项以及一个名为 ` crashesDirectory ` 的附加项, 它应指向一个目录, 以便临时存储崩溃报告。 你可以调用 ` process.crash()` 使子进程崩溃，来测试结果。

** 注意: **，如果您在第一次调用 ` start ` 后需要发送 附加的/更新的 ` extra ` 参数, 在 macOS 上，你可以调用 ` addExtraParameter `。而在 Linux 和 Windows 上，则使用 新的/更新的 ` extra ` 参数，再次调用 `start `即可。

**Note:** On macOS and windows, Electron uses a new `crashpad` client for crash collection and reporting. 如果要启用崩溃报告，则需要在主进程使用`crashReporter.start`初始化`crashpad`， 不管你想收集哪个进程的报告。 使用这种方式初始化后，crashpad将处理从所有进程收集的崩溃报告。 你仍然需要从渲染器进程或子进程中调用`crashReporter.start` ，否则崩溃报告将不包含`companyName`, `productName`和任何`extra`信息。

### `crashReporter.getLastCrashReport()`

返回 [`CrashReport`](structures/crash-report.md):

返回上次崩溃报告的日期和ID。 只有已上传的崩溃报告将被返回；在磁盘上存在崩溃报告，除非上传，不然不会返回。 如果没有上传的报告，则返回`null`

### `crashReporter.getUploadedReports()`

返回 [`CrashReport[]`](structures/crash-report.md):

Returns all uploaded crash reports. Each report contains the date and uploaded ID.

### `crashReporter.getUploadToServer()`

Returns `Boolean` - Whether reports should be submitted to the server. Set through the `start` method or `setUploadToServer`.

**注意：** 这个API仅可从主进程调用。

### `crashReporter.setUploadToServer(uploadToServer)`

* `uploadToServer` Boolean _macOS_ - 是否将报告提交到服务器.

This would normally be controlled by user preferences. This has no effect if called before `start` is called.

**注意：** 这个API仅可从主进程调用。

### `crashReporter.addExtraParameter(key, value)` _macOS_ _Windows_

* `key` String - 参数键，长度必须小于64个字符
* `value` String - 参数值, 长度必须小于64个字符

设置一个在发送崩溃报告时将额外包含的参数。 当调用 `start` 时, 除了通过 `extra` 选项设置的值之外, 此处指定值也将被发送。 This API is only available on macOS and windows, if you need to add/update extra parameters on Linux after your first call to `start` you can call `start` again with the updated `extra` options.

### `crashReporter.removeExtraParameter(key)` _macOS_ _Windows_

* `key` String - 参数键，长度必须小于64个字符

从当前设定的参数中移除一个额外的参数, 以便它不会与崩溃报告一起发送。

### `crashReporter.getParameters()`

查看传递给崩溃报告的所有当前参数。

## 崩溃报告内容

崩溃报告将发送下面 `multipart/form-data` `POST` 型的数据给 `submitURL`:

* `ver` String - Electron 的版本.
* `platform` String - 例如 'win32'.
* `process_type` String - 例如 'renderer'.
* `guid` String - 例如 '5e1286fc-da97-479e-918b-6bfb0c3d1c72'.
* `_version` String - `package.json` 里的版本号.
* `_productName` String - `crashReporter` `options` 对象中的产品名字
* `prod` String - Name of the underlying product. In this case Electron.
* `_companyName` String - `crashReporter` `options` 对象中的公司名称
* `upload_file_minidump` File - `minidump` 格式的崩溃报告
* All level one properties of the `extra` object in the `crashReporter` `options` object.
