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

### `NODE_OPTIONS`

Electron includes support for a subset of Node's [`NODE_OPTIONS`](https://nodejs.org/api/cli.html#cli_node_options_options). The majority are supported with the exception of those which conflict with Chromium's use of BoringSSL.

예시:

```sh
export NODE_OPTIONS="--no-warnings --max-old-space-size=2048"
```

Unsupported options are:

```sh
--use-bundled-ca
--force-fips
--enable-fips
--openssl-config
--use-openssl-ca
```

`NODE_OPTIONS` are explicitly disallowed in packaged apps, except for the following:

```sh
--max-http-header-size
--http-parser
```

### `GOOGLE_API_KEY`

You can provide an API key for making requests to Google's geocoding webservice. To do this, place the following code in your main process file, before opening any browser windows that will make geocoding requests:

```javascript
process.env.GOOGLE_API_KEY = 'API_키'
```

For instructions on how to acquire a Google API key, visit [this page](https://developers.google.com/maps/documentation/javascript/get-api-key). By default, a newly generated Google API key may not be allowed to make geocoding requests. To enable geocoding requests, visit [this page](https://developers.google.com/maps/documentation/geocoding/get-api-key).

### `ELECTRON_NO_ASAR`

Disables ASAR support. This variable is only supported in forked child processes and spawned child processes that set `ELECTRON_RUN_AS_NODE`.

### `ELECTRON_RUN_AS_NODE`

일반 Node.js 프로세스에서 프로세스를 시작합니다.

### `ELECTRON_NO_ATTACH_CONSOLE` _Windows_

Don't attach to the current console session.

### `ELECTRON_FORCE_WINDOW_MENU_BAR` _Linux_

Don't use the global menu bar on Linux.

### `ELECTRON_TRASH` _Linux_

Set the trash implementation on Linux. Default is `gio`.

Options:
* `gvfs-trash`
* `trash-cli`
* `kioclient5`
* `kioclient`

## 개발 변수

다음 환경 변수들은 주로 개발이나 디버깅 목적으로 사용됩니다.


### `ELECTRON_ENABLE_LOGGING`

Chrome 내장 로깅을 콘솔에 출력합니다.

### `ELECTRON_LOG_ASAR_READS`

When Electron reads from an ASAR file, log the read offset and file path to the system `tmpdir`. The resulting file can be provided to the ASAR module to optimize file ordering.

### `ELECTRON_ENABLE_STACK_DUMPING`

Prints the stack trace to the console when Electron crashes.

This environment variable will not work if the `crashReporter` is started.

### `ELECTRON_DEFAULT_ERROR_MODE` _Windows_

Shows the Windows's crash dialog when Electron crashes.

This environment variable will not work if the `crashReporter` is started.

### `ELECTRON_OVERRIDE_DIST_PATH`

When running from the `electron` package, this variable tells the `electron` command to use the specified build of Electron instead of the one downloaded by `npm install`. 사용법:

```sh
export ELECTRON_OVERRIDE_DIST_PATH=/Users/username/projects/electron/out/Debug
```
