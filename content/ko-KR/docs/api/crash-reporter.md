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
  * `companyName` String (선택적)
  * `submitURL` String - POST로 보낼 충돌 보고서 URL 입니다.
  * `productName` String (선택적) - 기본 값은 `app.getName()` 입니다.
  * `uploadToServer` Boolean (선택적) - 충돌 보고서가 서버로 전송될지를 결정합니다. 기본값은 `true` 입니다.
  * `ignoreSystemCrashHandler` Boolean (선택적) - 기본값은 `false` 입니다.
  * `extra` Object (선택적) - 보고서와 함께 보낼 객체를 정의할 수 있습니다. 오직 문자열 속성들만 제대로 보내집니다. 중첩된 객체는 지원되지 않고, 속성 이름과 값은 64글자보다 작아야 합니다.
  * `crashesDirectory` String (선택적) - crashreports를 임시로 저장할 디렉터리입니다. (충돌 보고서가 `process.crashReporter.start`로 시작되었을 때만 사용됩니다.)

You are required to call this method before using any other `crashReporter` APIs and in each process (main/renderer) from which you want to collect crash reports. You can pass different options to `crashReporter.start` when calling from different processes.

**참고** `child_process` 모듈로 생성된 자식 프로세스는 Electron 모듈에 접근할 수 없습니다. 그러므로, 그것들에서 충돌 정보를 수집하려면, `process.crashReporter.start`를 대신 사용하세요. Pass the same options as above along with an additional one called `crashesDirectory` that should point to a directory to store the crash reports temporarily. `process.crash()`를 호출하여 자식 프로세스를 충돌시켜서 실험해볼 수 있습니다.

**참고:** Windows에서 자식 프로세스의 충돌 보고서를 수집하려면, 이 코드를 추가해야 합니다. 이 코드는 계속 감시하고 충돌 보고서를 보내는 프로세스를 시작합니다. `submitURL`, `productName` 와 `crashesDirectory`를 적절한 값으로 교체하세요.

**참고:** 추가하거나 업데이트한 `extra` 매개 변수를 `start`를 호출한 뒤에 전송하려면 macOS인 경우 `setExtraParameter`를 호출할 수 있고, Linux 나 Windows 인 경우, `start`를 추가되거나 업데이트된 `extra` 매개 변수로 다시 호출 할 수 있습니다.

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

`Boolean`을 반환합니다. - 보고서가 서버에 전송될 지를 표시합니다. `start` 매서드나 `setUploadToServer`를 통해 지정할 수 있습니다.

**참고:** 이 API는 주 프로세스에서만 호출될 수 있습니다.

### `crashReporter.setUploadToServer(uploadToServer)` *Linux* *macOS*

* `uploadToServer` Boolean *macOS* - 보고서가 서버에 전송될 지를 정합니다.

주로 유저 설정에 의해 제어됩니다. `start`가 호출 되기 전에는 효과가 없습니다.

**참고:** 이 API는 주 프로세스에서만 호출될 수 있습니다.

### `crashReporter.addExtraParameter(key, value)` *macOS*

* `key` String - 매개 변수 키, 64글자보다 작아야 합니다.
* `value` String - 매개 변수 키, 64글자보다 작아야 합니다.

충돌 보고와 함께 보낼 추가 매개 변수를 지정합니다. 여기에 지정된 값은 `start`가 호출 됐을때 `extra` 옵션으로 지정한 값이 추가로 전송됩니다. This API is only available on macOS, if you need to add/update extra parameters on Linux and Windows after your first call to `start` you can call `start` again with the updated `extra` options.

### `crashReporter.removeExtraParameter(key)` *macOS*

* `key` String - 매개 변수 키, 64글자보다 작아야 합니다.

현재 매개 변수 집합에서 추가 매개 변수가 제거되고 충돌 보고서와 같이 전송되지 않게 합니다.

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
* `crashReporter` `options` 객체안의 `extra` 객체의 모든 한 속성들이 포함됩니다.