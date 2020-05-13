# crashReporter

> 원격 서버에 충돌 보고서를 제출합니다.

프로세스:[메인](../glossary.md#main-process), [렌더러](../glossary.md#renderer-process)

The following is an example of setting up Electron to automatically submit crash reports to a remote server:

```javascript
const { crashReporter } = require('electron')

crashReporter.start({ submitURL: 'https://your-domain.com/url-to-submit' })
```

서버가 요청을 받게 하고 충돌 보고서를 처리하게 하려면, 다음 프로젝트를 사용할 수 있습니다:

* [socorro](https://github.com/mozilla/socorro)
* [mini-breakpad-server](https://github.com/electron/mini-breakpad-server)

Or use a 3rd party hosted solution:

* [Backtrace](https://backtrace.io/electron/)
* [Sentry](https://docs.sentry.io/clients/electron)
* [BugSplat](https://www.bugsplat.com/docs/platforms/electron)

Crash reports are stored temporarily before being uploaded in a directory underneath the app's user data directory (called 'Crashpad' on Windows and Mac, or 'Crash Reports' on Linux). You can override this directory by calling `app.setPath('crashDumps', '/path/to/crashes')` before starting the crash reporter.

On Windows and macOS, Electron uses [crashpad](https://chromium.googlesource.com/crashpad/crashpad/+/master/README.md) to monitor and report crashes. On Linux, Electron uses [breakpad](https://chromium.googlesource.com/breakpad/breakpad/+/master/). This is an implementation detail driven by Chromium, and it may change in future. In particular, crashpad is newer and will likely eventually replace breakpad on all platforms.

## 메서드

`CrashReporter` 모듈은 다음과 같은 메서드를 가지고 있습니다:

### `crashReporter.start(options)`

* `options` Object
  * `submitURL` String - POST로 보낼 충돌 보고서 URL 입니다.
  * `productName` String (optional) - Defaults to `app.name`.
  * `companyName` String (optional) _Deprecated_ - Deprecated alias for `{ globalExtra: { _companyName: ... } }`.
  * `uploadToServer` Boolean (optional) - Whether crash reports should be sent to the server. If false, crash reports will be collected and stored in the crashes directory, but not uploaded. 기본값은 `true`이다.
  * `ignoreSystemCrashHandler` Boolean (optional) - If true, crashes generated in the main process will not be forwarded to the system crash handler. 기본값은 `false`이다.
  * `rateLimit` Boolean (optional) _macOS_ _Windows_ - If true, limit the number of crashes uploaded to 1/hour. 기본값은 `false`이다.
  * `compress` Boolean (optional) _macOS_ _Windows_ - If true, crash reports will be compressed and uploaded with `Content-Encoding: gzip`. Not all collection servers support compressed payloads. 기본값은 `false`이다.
  * `extra` Record<String, String> (optional) - Extra string key/value annotations that will be sent along with crash reports that are generated in the main process. Only string values are supported. Crashes generated in child processes will not contain these extra parameters to crash reports generated from child processes, call [`addExtraParameter`](#crashreporteraddextraparameterkey-value) from the child process.
  * `globalExtra` Record<String, String> (optional) - Extra string key/value annotations that will be sent along with any crash reports generated in any process. These annotations cannot be changed once the crash reporter has been started. If a key is present in both the global extra parameters and the process-specific extra parameters, then the global one will take precedence. By default, `productName` and the app version are included, as well as the Electron version.

This method must be called before using any other `crashReporter` APIs. Once initialized this way, the crashpad handler collects crashes from all subsequently created processes. The crash reporter cannot be disabled once started.

This method should be called as early as possible in app startup, preferably before `app.on('ready')`. If the crash reporter is not initialized at the time a renderer process is created, then that renderer process will not be monitored by the crash reporter.

**Note:** You can test out the crash reporter by generating a crash using `process.crash()`.

**Note:** If you need to send additional/updated `extra` parameters after your first call `start` you can call `addExtraParameter`.

**Note:** Parameters passed in `extra`, `globalExtra` or set with `addExtraParameter` have limits on the length of the keys and values. Key names must be at most 39 bytes long, and values must be no longer than 127 bytes. Keys with names longer than the maximum will be silently ignored. Key values longer than the maximum length will be truncated.

**Note:** Calling this method from the renderer process is deprecated.

### `crashReporter.getLastCrashReport()`

Returns [`CrashReport`](structures/crash-report.md) - The date and ID of the last crash report. Only crash reports that have been uploaded will be returned; even if a crash report is present on disk it will not be returned until it is uploaded. In the case that there are no uploaded reports, `null` is returned.

**Note:** Calling this method from the renderer process is deprecated.

### `crashReporter.getUploadedReports()`

[`CrashReport[]`](structures/crash-report.md)를 반환합니다:

Returns all uploaded crash reports. Each report contains the date and uploaded ID.

**Note:** Calling this method from the renderer process is deprecated.

### `crashReporter.getUploadToServer()`

Returns `Boolean` - Whether reports should be submitted to the server. Set through the `start` method or `setUploadToServer`.

**Note:** Calling this method from the renderer process is deprecated.

### `crashReporter.setUploadToServer(uploadToServer)`

* `uploadToServer` Boolean - Whether reports should be submitted to the server.

This would normally be controlled by user preferences. This has no effect if called before `start` is called.

**Note:** Calling this method from the renderer process is deprecated.

### `crashReporter.getCrashesDirectory()` _Deprecated_

Returns `String` - The directory where crashes are temporarily stored before being uploaded.

**Note:** This method is deprecated, use `app.getPath('crashDumps')` instead.

### `crashReporter.addExtraParameter(key, value)`

* `key` String - Parameter key, must be no longer than 39 bytes.
* `value` String - Parameter value, must be no longer than 127 bytes.

충돌 보고와 함께 보낼 추가 매개 변수를 지정합니다. The values specified here will be sent in addition to any values set via the `extra` option when `start` was called.

Parameters added in this fashion (or via the `extra` parameter to `crashReporter.start`) are specific to the calling process. Adding extra parameters in the main process will not cause those parameters to be sent along with crashes from renderer or other child processes. Similarly, adding extra parameters in a renderer process will not result in those parameters being sent with crashes that occur in other renderer processes or in the main process.

**Note:** Parameters have limits on the length of the keys and values. Key names must be no longer than 39 bytes, and values must be no longer than 127 bytes. Keys with names longer than the maximum will be silently ignored. Key values longer than the maximum length will be truncated.

### `crashReporter.removeExtraParameter(key)`

* `key` String - Parameter key, must be no longer than 39 bytes.

Remove a extra parameter from the current set of parameters. Future crashes will not include this parameter.

### `crashReporter.getParameters()`

Returns `Record<String, String>` - The current 'extra' parameters of the crash reporter.

## 충돌 보고서 탑재 내용

충돌 보고서는 데이터를 `submitURL`에 `multipart/form-data` 형식으로 `POST` 방식의 요청을 보냅니다.

* `ver` String - Electron의 버전입니다.
* `platform` String - 예를 들어 'win32' 같은 값입니다.
* `process_type` String - 예를 들어 'renderer' 같은 값입니다.
* `guid` String - e.g. '5e1286fc-da97-479e-918b-6bfb0c3d1c72'.
* `_version` String - `package.json`의 버전입니다.
* `_productName` String - `crashReporter` `options` 객체의 애플리케이션 이름입니다.
* `prod` String - Name of the underlying product. In this case Electron.
* `_companyName` String - `crashReporter` `options` 객체의 조직 이름 입니다.
* `upload_file_minidump` File - `minidump` 형식의 충돌 보고서입니다.
* `crashReporter` `options` 객체안의 `extra` 객체의 모든 한 속성들이 포함됩니다.
