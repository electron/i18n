# 崩溃日志报告

> 将崩溃日志提交给远程服务器

参见： [process](../glossary.md#main-process), [renderer](../glossary.md#renderer-process) process

以下是一个自动提交崩溃日志到服务器的示例

```javascript
const {crashReporter} = require('electron')

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

崩溃日志被保存在本地的应用特有的临时文件夹中。 对于`YourName`对象中的`productName`，崩溃报日志将被储存在临时文件夹中名为`YourName Crashes`的文件文件夹中。 在启动崩溃报告器之前，您可以通过调用`app.setPath('temp', 'my/custom/temp')` API来自定义这些临时文件的保存路径

## 方法

` crashReporter ` 模块具有以下方法:

### `crashReporter.start(options)`

* `选项` Object - 过滤器对象，包含过滤参数 
  * `companyName` 字符串 - 公司名称 (可选).
  * `submitURL` 字符串 - 崩溃日志将以POST的方式发送给此URL.
  * `productName` 字符串(可选) - 默认为 `app.getName()`.
  * `uploadToServer` 布尔型(可选) - 控制是否将崩溃日志发送给服务器，默认为`true`.
  * `ignoreSystemCrashHandler` 布尔型(可选) - 默认为`false`.
  * `extra` 对象(可选) - 一个随崩溃日志发送的对象. 只有字符串属性能够被正确发送. 不支持发送嵌套对象，且属性名称和属性值必须小于64个字符长度.

你需要调用任何其他的`crashReporter` API，您必须调用此方法. 在每个需要收集崩溃日志的进程 (主进程 / 渲染器进程) 中，也必须先调用此方法. 从不同的进程调用时, 可以传不同的配置给 ` crashReporter. start `。

** 注意 **由 ` child_process ` 模块创建的子进程将无法访问 Electron 模块。 因此, 要收集它们的故障报告, 请用 ` process.crashReporter.start `代替。 传递与上面相同的选项以及一个名为 ` crashesDirectory ` 的附加项, 它应指向一个目录, 以便临时存储崩溃报告。 你可以调用 ` process.crash()` 使子进程崩溃，来测试结果。

** 注意: **要从 Windows 中的子进程收集崩溃报告, 您也需要添加这样额外的代码。 这将启动一个进程来监视和发送崩溃报告。 用适当的值去替换 ` submitURL `、` productName ` 和 ` crashesDirectory `。

**Note:** If you need send additional/updated `extra` parameters after your first call `start` you can call `setExtraParameter` on macOS or call `start` again with the new/updated `extra` parameters on Linux and Windows.

```js
 const args = [
   `--reporter-url=${submitURL}`,
   `--application-name=${productName}`,
   `--crashes-directory=${crashesDirectory}`
 ]
 const env = {
   ELECTRON_INTERNAL_CRASH_SERVICE: 1
 }
 spawn(process.execPath, args, {
   env: env,
   detached: true
 })
```

**注意：**在macOS上，Electron使用一个`crashpad`客户端来收集并报告崩溃信息。 如果要启用崩溃报告，则需要在主进程使用`crashReporter.start`初始化`crashpad`， 不管你想收集哪个进程的报告。 使用这种方式初始化后，crashpad将处理从所有进程收集的崩溃报告。 你仍然需要从渲染器进程或子进程中调用`crashReporter.start` ，否则崩溃报告将不包含`companyName`, `productName`和任何`extra`信息。

### `crashReporter.getLastCrashReport()`

返回 [`CrashReport`](structures/crash-report.md):

返回上次崩溃报告的日期和ID。如果没有崩溃报告 发送或crash reporter尚未开始，则返回`null`。

### `crashReporter.getUploadedReports()`

返回 [`CrashReport[]`](structures/crash-report.md):

返回所有上传的崩溃报告。每个报告都包含日期和上传ID。

### `crashReporter.getUploadToServer()` *Linux* *macOS*

Returns `Boolean` - Whether reports should be submitted to the server. Set through the `start` method or `setUploadToServer`.

**注意：** 这个API仅可从主进程调用。

### `crashReporter.setUploadToServer(uploadToServer)` *Linux* *macOS*

* `uploadToServer` Boolean *macOS* - Whether reports should be submitted to the server

通常, 是否提交是由用户对系统进行偏好设置而决定的。不能在 `start` 之前调用该方法，否则无效.

**注意：** 这个API仅可从主进程调用。

### `crashReporter.setExtraParameter(key, value)` *macOS*

* `key` String - 参数键，长度必须小于64个字符
* `value` String - Parameter value, must be less than 64 characters long. Specifying `null` or `undefined` will remove the key from the extra parameters.

设置一个在发送崩溃报告时将额外包含的参数。 The values specified here will be sent in addition to any values set via the `extra` option when `start` was called. This API is only available on macOS, if you need to add/update extra parameters on Linux and Windows after your first call to `start` you can call `start` again with the updated `extra` options.

## 崩溃报告内容

The crash reporter will send the following data to the `submitURL` as a `multipart/form-data` `POST`:

* `ver` String - The version of Electron.
* `platform` String - e.g. 'win32'.
* `process_type` String - e.g. 'renderer'.
* `guid` String - e.g. '5e1286fc-da97-479e-918b-6bfb0c3d1c72'
* `_version` String - The version in `package.json`.
* `_productName` String - The product name in the `crashReporter` `options` object.
* `prod` String - Name of the underlying product. In this case Electron.
* `_companyName` String - The company name in the `crashReporter` `options` object.
* `upload_file_minidump` File - The crash report in the format of `minidump`.
* All level one properties of the `extra` object in the `crashReporter` `options` object.