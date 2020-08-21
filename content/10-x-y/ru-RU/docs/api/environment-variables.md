# Переменные окружения

> Управляй настройкой приложения и его поведением без изменения кода.

Некоторые поведения Electron управляются переменными окружения, потому что они инициализируются раньше, чем флаги командной строки и код приложения.

Пример терминала POSIX:

```sh
$ export ELECTRON_ENABLE_LOGGING=true
$ electron
```

Пример терминала Windows:

```powershell
> set ELECTRON_ENABLE_LOGGING=true
> electron
```

## Переменные production

Следующие переменные окружения предназначены для использования в среде выполнения приложения Electron.

### `NODE_OPTIONS`

Electron включает поддержку подмножества Node's [`NODE_OPTIONS`](https://nodejs.org/api/cli.html#cli_node_options_options). Большинство поддерживаются за исключением тех, которые конфликтуют с использованием Chromium BoringSSL.

Пример:

```sh
export NODE_OPTIONS="--no-warnings --max-old-space-size=2048"
```

Неподдерживаемые опции:

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

Geolocation support in Electron requires the use of Google Cloud Platform's geolocation webservice. To enable this feature, acquire a [Google API key](https://developers.google.com/maps/documentation/geolocation/get-api-key) and place the following code in your main process file, before opening any browser windows that will make geolocation requests:

```javascript
process.env.GOOGLE_API_KEY = 'YOUR_KEY_HERE'
```

By default, a newly generated Google API key may not be allowed to make geolocation requests. To enable the geolocation webservice for your project, enable it through the [API library](https://console.cloud.google.com/apis/library).

N.B. You will need to add a [Billing Account](https://cloud.google.com/billing/docs/how-to/payment-methods#add_a_payment_method) to the project associated to the API key for the geolocation webservice to work.

### `ELECTRON_NO_ASAR`

Disables ASAR support. This variable is only supported in forked child processes and spawned child processes that set `ELECTRON_RUN_AS_NODE`.

### `ELECTRON_RUN_AS_NODE`

Начинает процесс как Node.js процесс.

In this mode, you will be able to pass [cli options](https://nodejs.org/api/cli.html) to Node.js as you would when running the normal Node.js executable, with the exception of the following flags:

* "--openssl-config"
* "--use-bundled-ca"
* "--use-openssl-ca",
* "--force-fips"
* "--enable-fips"

These flags are disabled owing to the fact that Electron uses BoringSSL instead of OpenSSL when building Node.js' `crypto` module, and so will not work as designed.

### `ELECTRON_NO_ATTACH_CONSOLE` _Windows_

Не присоединяться к текущей сессии терминала.

### `ELECTRON_FORCE_WINDOW_MENU_BAR` _Linux_

Не использовать глобальное меню в Linux.

### `ELECTRON_TRASH` _Linux_

Set the trash implementation on Linux. Default is `gio`.

Параметры:
* `gvfs-trash`
* `trash-cli`
* `kioclient5`
* `kioclient`

## Переменные разработки (development)

Следующие переменные окружения предназначены для использования в среде выполнения приложения Electron во время разработки и отладки.


### `ELECTRON_ENABLE_LOGGING`

Выводит логи Chrome в консоль.

### `ELECTRON_LOG_ASAR_READS`

When Electron reads from an ASAR file, log the read offset and file path to the system `tmpdir`. The resulting file can be provided to the ASAR module to optimize file ordering.

### `ELECTRON_ENABLE_STACK_DUMPING`

Выводит содержимое стэка в консоль при сбое Electron приложения.

Данная переменная окружения не будет работать, если `crashReporter` запущен.

### `ELECTRON_DEFAULT_ERROR_MODE` _Windows_

Показывает диалог сбоя Windows при сбое Electron приложения.

Данная переменная окружения не будет работать, если `crashReporter` запущен.

### `ELECTRON_OVERRIDE_DIST_PATH`

При запуске из `electron` пакета, эта переменная дает команду `electron` использовать указанную сборку Electron вместо загруженной по `npm install`. Использование:

```sh
export ELECTRON_OVERRIDE_DIST_PATH=/Users/username/projects/electron/out/Testing
```

## Set By Electron

Electron sets some variables in your environment at runtime.

### `ORIGINAL_XDG_CURRENT_DESKTOP`

This variable is set to the value of `XDG_CURRENT_DESKTOP` that your application originally launched with.  Electron sometimes modifies the value of `XDG_CURRENT_DESKTOP` to affect other logic within Chromium so if you want access to the _original_ value you should look up this environment variable instead.
