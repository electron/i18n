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

由于Node的子进程中无法使用 `require('electron')` ，那么在Node的子进程中的 `process` 对象中的以下 API 是可用的。 Note that, on Linux, each Node child process has its own separate instance of the breakpad crash reporter. This is dissimilar to renderer child processes, which have a "stub" breakpad reporter which returns information to the main process for reporting.

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
  * `submitURL` 字符串 - 崩溃日志将以POST的方式发送给此URL.
  * `productName` String (optional) - Defaults to `app.name`.
  * `companyName` String (optional) _Deprecated_ - Deprecated alias for `{ globalExtra: { _companyName: ... } }`.
  * `uploadToServer` Boolean (optional) - Whether crash reports should be sent to the server. If false, crash reports will be collected and stored in the crashes directory, but not uploaded. 默认值为 `true`。
  * `ignoreSystemCrashHandler` Boolean (optional) - If true, crashes generated in the main process will not be forwarded to the system crash handler. 默认值为 `false`.
  * `rateLimit` Boolean (optional) _macOS_ _Windows_ - If true, limit the number of crashes uploaded to 1/hour. 默认值为 `false`.
  * `compress` Boolean (optional) - If true, crash reports will be compressed and uploaded with `Content-Encoding: gzip`. 默认值为 `true`。
  * `extra` Record<String, String> (optional) - Extra string key/value annotations that will be sent along with crash reports that are generated in the main process. Only string values are supported. Crashes generated in child processes will not contain these extra parameters to crash reports generated from child processes, call [`addExtraParameter`](#crashreporteraddextraparameterkey-value) from the child process.
  * `globalExtra` Record<String, String> (optional) - Extra string key/value annotations that will be sent along with any crash reports generated in any process. These annotations cannot be changed once the crash reporter has been started. If a key is present in both the global extra parameters and the process-specific extra parameters, then the global one will take precedence. By default, `productName` and the app version are included, as well as the Electron version.

This method must be called before using any other `crashReporter` APIs. Once initialized this way, the crashpad handler collects crashes from all subsequently created processes. The crash reporter cannot be disabled once started.

This method should be called as early as possible in app startup, preferably before `app.on('ready')`. If the crash reporter is not initialized at the time a renderer process is created, then that renderer process will not be monitored by the crash reporter.

**Note:** You can test out the crash reporter by generating a crash using `process.crash()`.

**Note:** If you need to send additional/updated `extra` parameters after your first call `start` you can call `addExtraParameter`.

**Note:** Parameters passed in `extra`, `globalExtra` or set with `addExtraParameter` have limits on the length of the keys and values. Key names must be at most 39 bytes long, and values must be no longer than 127 bytes. Keys with names longer than the maximum will be silently ignored. Key values longer than the maximum length will be truncated.

**Note:** This method is only available in the main process.

### `crashReporter.getLastCrashReport()`

Returns [`CrashReport`](structures/crash-report.md) - The date and ID of the last crash report. Only crash reports that have been uploaded will be returned; even if a crash report is present on disk it will not be returned until it is uploaded. 如果没有上传的报告，则返回`null`

**Note:** This method is only available in the main process.

### `crashReporter.getUploadedReports()`

返回 [`CrashReport[]`](structures/crash-report.md):

Returns all uploaded crash reports. Each report contains the date and uploaded ID.

**Note:** This method is only available in the main process.

### `crashReporter.getUploadToServer()`

Returns `Boolean` - Whether reports should be submitted to the server. Set through the `start` method or `setUploadToServer`.

**Note:** This method is only available in the main process.

### `crashReporter.setUploadToServer(uploadToServer)`

* `uploadToServer` Boolean - Whether reports should be submitted to the server.

This would normally be controlled by user preferences. This has no effect if called before `start` is called.

**Note:** This method is only available in the main process.

### `crashReporter.addExtraParameter(key, value)`

* `key` String - Parameter key, must be no longer than 39 bytes.
* `value` String - Parameter value, must be no longer than 127 bytes.

设置一个在发送崩溃报告时将额外包含的参数。 The values specified here will be sent in addition to any values set via the `extra` option when `start` was called.

Parameters added in this fashion (or via the `extra` parameter to `crashReporter.start`) are specific to the calling process. Adding extra parameters in the main process will not cause those parameters to be sent along with crashes from renderer or other child processes. Similarly, adding extra parameters in a renderer process will not result in those parameters being sent with crashes that occur in other renderer processes or in the main process.

**Note:** Parameters have limits on the length of the keys and values. Key names must be no longer than 39 bytes, and values must be no longer than 20320 bytes. Keys with names longer than the maximum will be silently ignored. Key values longer than the maximum length will be truncated.

**Note:** On linux values that are longer than 127 bytes will be chunked into multiple keys, each 127 bytes in length.  如下: `addExtraParameter('foo', 'a'.repeat(130))` will result in two chunked keys `foo__1` and `foo__2`, the first will contain the first 127 bytes and the second will contain the remaining 3 bytes.  On your crash reporting backend you should stitch together keys in this format.

### `crashReporter.removeExtraParameter(key)`

* `key` String - Parameter key, must be no longer than 39 bytes.

Remove an extra parameter from the current set of parameters. Future crashes will not include this parameter.

### `crashReporter.getParameters()`

Returns `Record<String, String>` - The current 'extra' parameters of the crash reporter.

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
