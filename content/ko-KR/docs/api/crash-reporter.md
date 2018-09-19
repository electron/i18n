# crashReporter

> 원격 서버에 충돌 보고서를 제출합니다.

프로세스:[메인](../glossary.md#main-process), [렌더러](../glossary.md#renderer-process)

아래는 자동으로 원격 서버에 충돌 보고서를 제출하는 예제입니다.

```javascript
const {crashReporter} = require('electron')

crashReporter.start({
  productName: '이름',
  companyName: '조직 이름',
  submitURL: 'https://your-domain.com/url-to-submit',
  uploadToServer: true
})
```

서버가 요청을 받게 하고 충돌 보고서를 처리하게 하려면, 다음 프로젝트를 사용할 수 있습니다:

* [socorro](https://github.com/mozilla/socorro)
* [mini-breakpad-server](https://github.com/electron/mini-breakpad-server)

Crash reports are saved locally in an application-specific temp directory folder. For a `productName` of `YourName`, crash reports will be stored in a folder named `YourName Crashes` inside the temp directory. You can customize this temp directory location for your app by calling the `app.setPath('temp', '/my/custom/temp')` API before starting the crash reporter.

## 메서드

The `crashReporter` module has the following methods:

### `crashReporter.start(options)`

* `options` Object 
  * `companyName` String (optional)
  * `submitURL` String - URL that crash reports will be sent to as POST.
  * `productName` String (optional) - Defaults to `app.getName()`.
  * `uploadToServer` Boolean (optional) - Whether crash reports should be sent to the server Default is `true`.
  * `ignoreSystemCrashHandler` Boolean (optional) - Default is `false`.
  * `extra` Object (optional) - An object you can define that will be sent along with the report. Only string properties are sent correctly. Nested objects are not supported and the property names and values must be less than 64 characters long.
  * `crashesDirectory` String (optional) - Directory to store the crashreports temporarily (only used when the crash reporter is started via `process.crashReporter.start`).

You are required to call this method before using any other `crashReporter` APIs and in each process (main/renderer) from which you want to collect crash reports. You can pass different options to `crashReporter.start` when calling from different processes.

**Note** Child processes created via the `child_process` module will not have access to the Electron modules. Therefore, to collect crash reports from them, use `process.crashReporter.start` instead. Pass the same options as above along with an additional one called `crashesDirectory` that should point to a directory to store the crash reports temporarily. You can test this out by calling `process.crash()` to crash the child process.

**Note:** To collect crash reports from child process in Windows, you need to add this extra code as well. This will start the process that will monitor and send the crash reports. Replace `submitURL`, `productName` and `crashesDirectory` with appropriate values.

**Note:** If you need send additional/updated `extra` parameters after your first call `start` you can call `addExtraParameter` on macOS or call `start` again with the new/updated `extra` parameters on Linux and Windows.

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

**Note:** On macOS, Electron uses a new `crashpad` client for crash collection and reporting. If you want to enable crash reporting, initializing `crashpad` from the main process using `crashReporter.start` is required regardless of which process you want to collect crashes from. Once initialized this way, the crashpad handler collects crashes from all processes. You still have to call `crashReporter.start` from the renderer or child process, otherwise crashes from them will get reported without `companyName`, `productName` or any of the `extra` information.

### `crashReporter.getLastCrashReport()`

Returns [`CrashReport`](structures/crash-report.md):

Returns the date and ID of the last crash report. If no crash reports have been sent or the crash reporter has not been started, `null` is returned.

### `crashReporter.getUploadedReports()`

Returns [`CrashReport[]`](structures/crash-report.md):

Returns all uploaded crash reports. Each report contains the date and uploaded ID.

### `crashReporter.getUploadToServer()` *Linux* *macOS*

Returns `Boolean` - Whether reports should be submitted to the server. Set through the `start` method or `setUploadToServer`.

**Note:** This API can only be called from the main process.

### `crashReporter.setUploadToServer(uploadToServer)` *Linux* *macOS*

* `uploadToServer` Boolean *macOS* - Whether reports should be submitted to the server.

This would normally be controlled by user preferences. This has no effect if called before `start` is called.

**Note:** This API can only be called from the main process.

### `crashReporter.addExtraParameter(key, value)` *macOS*

* `key` String - 매개 변수 키, 64글자보다 작아야 합니다.
* `value` String - Parameter value, must be less than 64 characters long.

Set an extra parameter to be sent with the crash report. The values specified here will be sent in addition to any values set via the `extra` option when `start` was called. This API is only available on macOS, if you need to add/update extra parameters on Linux and Windows after your first call to `start` you can call `start` again with the updated `extra` options.

### `crashReporter.removeExtraParameter(key)` *macOS*

* `key` String - 매개 변수 키, 64글자보다 작아야 합니다.

Remove a extra parameter from the current set of parameters so that it will not be sent with the crash report.

### `crashReporter.getParameters()`

See all of the current parameters being passed to the crash reporter.

## 충돌 보고서 탑재 내용

The crash reporter will send the following data to the `submitURL` as a `multipart/form-data` `POST`:

* `ver` String - The version of Electron.
* `platform` String - e.g. 'win32'.
* `process_type` String - e.g. 'renderer'.
* `guid` String - e.g. '5e1286fc-da97-479e-918b-6bfb0c3d1c72'.
* `_version` String - The version in `package.json`.
* `_productName` String - The product name in the `crashReporter` `options` object.
* `prod` String - Name of the underlying product. In this case Electron.
* `_companyName` String - The company name in the `crashReporter` `options` object.
* `upload_file_minidump` File - The crash report in the format of `minidump`.
* All level one properties of the `extra` object in the `crashReporter` `options` object.