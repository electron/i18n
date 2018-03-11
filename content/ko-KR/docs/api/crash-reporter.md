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

Crash reports are saved locally in an application-specific temp directory folder. `productName`이 `YourName`인 경우에는 temp 디렉터리 안에 `YourName Crashes`의 폴더에 저장됩니다. You can customize this temp directory location for your app by calling the `app.setPath('temp', '/my/custom/temp')` API before starting the crash reporter.

## 메서드

`CrashReporter` 모듈은 다음과 같은 메서드를 가지고 있습니다:

### `crashReporter.start(options)`

* `options` Object 
  * `companyName` String (선택적)
  * `submitURL` String - POST로 보낼 충돌 보고서 URL 입니다.
  * `productName` String (선택적) - 기본 값은 `app.getName()` 입니다.
  * `uploadToServer` Boolean (선택적) - 충돌 보고서가 서버로 전송될지를 결정합니다. 기본값은 `true` 입니다.
  * `ignoreSystemCrashHandler` Boolean (선택적) - 기본값은 `false` 입니다.
  * `extra` Object (선택적) - 보고서와 함께 보낼 객체를 정의할 수 있습니다. 오직 문자열 속성들만 제대로 보내집니다. 중첩된 객체는 지원되지 않고, 속성 이름과 값은 64글자보다 작아야 합니다.
  * `crashesDirectory` String (선택적) - crashreports를 임시로 저장할 디렉터리입니다. (충돌 보고서가 `process.crashReporter.start`로 시작되었을 때만 사용됩니다.)

You are required to call this method before using any other `crashReporter` APIs and in each process (main/renderer) from which you want to collect crash reports. You can pass different options to `crashReporter.start` when calling from different processes.

**Note** Child processes created via the `child_process` module will not have access to the Electron modules. Therefore, to collect crash reports from them, use `process.crashReporter.start` instead. Pass the same options as above along with an additional one called `crashesDirectory` that should point to a directory to store the crash reports temporarily. You can test this out by calling `process.crash()` to crash the child process.

**Note:** To collect crash reports from child process in Windows, you need to add this extra code as well. This will start the process that will monitor and send the crash reports. Replace `submitURL`, `productName` and `crashesDirectory` with appropriate values.

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

* `uploadToServer` Boolean *macOS* - Whether reports should be submitted to the server

This would normally be controlled by user preferences. This has no effect if called before `start` is called.

**Note:** This API can only be called from the main process.

### `crashReporter.addExtraParameter(key, value)` *macOS*

* `key` String - Parameter key, must be less than 64 characters long.
* `value` String - Parameter value, must be less than 64 characters long.

Set an extra parameter to be sent with the crash report. The values specified here will be sent in addition to any values set via the `extra` option when `start` was called. This API is only available on macOS, if you need to add/update extra parameters on Linux and Windows after your first call to `start` you can call `start` again with the updated `extra` options.

### `crashReporter.removeExtraParameter(key)` *macOS*

* `key` String - Parameter key, must be less than 64 characters long.

Remove a extra parameter from the current set of parameters so that it will not be sent with the crash report.

### `crashReporter.getParameters()`

충돌 보고서에 넘겨진 모든 매개 변수를 보여줍니다.

## 충돌 보고서 탑재 내용

충돌 보고서는 데이터를 `submitURL`에 `multipart/form-data` 형식으로 `POST` 방식의 요청을 보냅니다.

* `ver` String - Electron의 버전입니다.
* `platform` String - 예를 들어 'win32' 같은 값입니다.
* `process_type` String - 예를 들어 'renderer' 같은 값입니다.
* `guid` String - 예를 들어 '5e1286fc-da97-479e-918b-6bfb0c3d1c72' 같은 값입니다.
* `_version` String - `package.json`의 버전입니다.
* `_productName` String - `crashReporter` `options` 객체의 애플리케이션 이름입니다.
* `prod` String - 기본 애플리케이션 이름 입니다. 이 경우엔 Electron입니다.
* `_companyName` String - `crashReporter` `options` 객체의 조직 이름 입니다.
* `upload_file_minidump` File - `minidump` 형식의 충돌 보고서입니다.
* All level one properties of the `extra` object in the `crashReporter` `options` object.