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

충돌 보고서는 애플리케이션 지정 temp 디렉터리에 로컬로 저장됩니다. `productName`이 `YourName`인 경우에는 temp 디렉터리 안에 `YourName Crashes`의 폴더에 저장됩니다. 충돌 제보기를 실행하기 전에 API `app.setPath('temp', '/my/custom/temp')`를 호출하여 이 temp 디렉터리 위치를 수정할 수 있습니다.

## 메서드

`CrashReporter` 모듈은 다음과 같은 메서드를 가지고 있습니다:

### `crashReporter.start(options)`

* `options` Object 
  * `companyName` String (선택)
  * `submitURL` String - POST로 보낼 충돌 보고서 URL 입니다.
  * `productName` String (선택) - 기본 값은 `app.getName()` 입니다.
  * `uploadToServer` Boolean (선택) - 충돌 보고서가 서버로 전송될지를 결정합니다. 기본값은 `true` 입니다.
  * `ignoreSystemCrashHandler` Boolean (선택) - 기본값은 `false` 입니다.
  * `extra` Object (선택) - 보고서와 함께 보낼 객체를 정의할 수 있습니다. 오직 문자열 속성들만 제대로 보내집니다. 중첩된 객체는 지원되지 않고, 속성 이름과 값은 64글자보다 작아야 합니다.

다른 `crashReporter` API 혹은 각각의 프로세스 (메인/렌더러) 에서 충돌 보고서를 수집을 사용하기 전에, 이 메서드를 호출해야 합니다. 서로 다른 프로세스에서 호출할 때 다른 옵션을 `crashReporter.start`로 전달할 수 있습니다.

**참고** `child_process` 모듈로 생성된 자식 프로세스는 Electron 모듈에 접근할 수 없습니다. 그러므로, 그것들에서 충돌 정보를 수집하려면, `process.crashReporter.start`를 대신 사용하세요. 위와 똑같은 옵션에 추가로 충돌 보고서를 임시로 저장하는 디렉터리를 가리키는 `crashesDirectory` 값과 함께 전달합니다. `process.crash()`를 호출하여 자식 프로세스를 충돌시켜서 실험해볼 수 있습니다.

**참고:** Windows에서 자식 프로세스의 충돌 보고서를 수집하려면, 이 코드를 추가해야 합니다. 이 코드는 계속 감시하고 충돌 보고서를 보내는 프로세스를 시작합니다. `submitURL`, `productName` 와 `crashesDirectory`를 적절한 값으로 교체하세요.

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

**참고:** macOS에서는, Electron은 새 `crashpad` 클라이언트를 사용하여 충돌 수집과 보고서를 작성합니다. 충돌 보고를 사용 하려면, 주 프로세스에서 `crashReporter.start`를 사용하여, `crashpad`를 초기화 하는것이 어느 프로세스에서 충돌 수집을 하든 필요합니다. 이 방법으로 한번 초기화 되면, crashpad 핸들러가 모든 프로세스에서 충돌을 수집합니다. 아직 `crashReporter.start`를 렌더러나 자식 프로세스에서 호출하는 것이 필요합니다, 그렇지 않으면 `companyName`, `productName` 혹은 어느 `extra` 정보가 포함되지 않은 보고서가 제보될 것입니다.

### `crashReporter.getLastCrashReport()`

[`CrashReport`](structures/crash-report.md)를 반환합니다:

마지막 충돌 보고서의 날짜와 ID를 반환합니다. 충돌 보고서가 전송되지 않았거나 충돌 제보기가 시작되지 않았으면, `null`이 반환됩니다.

### `crashReporter.getUploadedReports()`

[`CrashReport[]`](structures/crash-report.md)를 반환합니다:

업로드된 모든 충돌 보고서를 반환합니다. 각자의 보고서는 날짜와 업로드 ID를 포함합니다.

### `crashReporter.getUploadToServer()` *Linux* *macOS*

Returns `Boolean` - Whether reports should be submitted to the server. Set through the `start` method or `setUploadToServer`.

**참고:** 이 API는 주 프로세스에서만 호출될 수 있습니다.

### `crashReporter.setUploadToServer(uploadToServer)` *Linux* *macOS*

* `uploadToServer` Boolean *macOS* - Whether reports should be submitted to the server

주로 유저 설정에 의해 제어됩니다. `start`가 호출 되기 전에는 효과가 없습니다.

**참고:** 이 API는 주 프로세스에서만 호출될 수 있습니다.

### `crashReporter.setExtraParameter(key, value)` *macOS*

* `key` String - 매개 변수 키, 64글자보다 작아야 합니다.
* `value` String - Parameter value, must be less than 64 characters long. Specifying `null` or `undefined` will remove the key from the extra parameters.

충돌 보고와 함께 보낼 추가 매개 변수를 지정합니다. The values specified here will be sent in addition to any values set via the `extra` option when `start` was called. This API is only available on macOS, if you need to add/update extra parameters on Linux and Windows after your first call to `start` you can call `start` again with the updated `extra` options.

## 충돌 보고서 탑재 내용

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