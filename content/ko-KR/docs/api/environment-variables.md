# 환경 변수

> 애플리케이션 구성과 동작을 코드 변경 없이 제어합니다.

Certain Electron behaviors are controlled by environment variables because they are initialized earlier than the command line flags and the app's code.

POSIX 쉘 예시:

```sh
$ export ELECTRON_ENABLE_LOGGING=true
$ electron
```

Windows 콘솔 예시:

```powershell
> set ELECTRON_ENABLE_LOGGING=true
> electron
```

## 제품 변수

The following environment variables are intended primarily for use at runtime in packaged Electron applications.

### `GOOGLE_API_KEY`

Electron includes a hardcoded API key for making requests to Google's geocoding webservice. Because this API key is included in every version of Electron, it often exceeds its usage quota. To work around this, you can supply your own Google API key in the environment. Place the following code in your main process file, before opening any browser windows that will make geocoding requests:

```javascript
process.env.GOOGLE_API_KEY = 'API_키'
```

Google API 키를 얻으려면, [이 페이지](https://www.chromium.org/developers/how-tos/api-keys)를 방문해 보세요.

By default, a newly generated Google API key may not be allowed to make geocoding requests. To enable geocoding requests, visit [this page](https://console.developers.google.com/apis/api/geolocation/overview).

### `ELECTRON_NO_ASAR`

Disables ASAR support. This variable is only supported in forked child processes and spawned child processes that set `ELECTRON_RUN_AS_NODE`.

### `ELECTRON_RUN_AS_NODE`

일반 Node.js 프로세스에서 프로세스를 시작합니다.

### `ELECTRON_NO_ATTACH_CONSOLE` *Windows*

Don't attach to the current console session.

### `ELECTRON_FORCE_WINDOW_MENU_BAR` *Linux*

Don't use the global menu bar on Linux.

## 개발 변수

다음 환경 변수들은 주로 개발이나 디버깅 목적으로 사용됩니다.

### `ELECTRON_ENABLE_LOGGING`

Chrome 내장 로깅을 콘솔에 출력합니다.

### `ELECTRON_LOG_ASAR_READS`

When Electron reads from an ASAR file, log the read offset and file path to the system `tmpdir`. The resulting file can be provided to the ASAR module to optimize file ordering.

### `ELECTRON_ENABLE_STACK_DUMPING`

Prints the stack trace to the console when Electron crashes.

This environment variable will not work if the `crashReporter` is started.

### `ELECTRON_DEFAULT_ERROR_MODE` *Windows*

Shows the Windows's crash dialog when Electron crashes.

This environment variable will not work if the `crashReporter` is started.