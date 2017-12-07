# Переменные окружения

> Управляй настройкой приложения и его поведением без изменения кода.

Certain Electron behaviors are controlled by environment variables because they are initialized earlier than the command line flags and the app's code.

Пример терминала POSIX:

```bash
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

### `GOOGLE_API_KEY`

Electron включает жёстко запрограммированный (hardcoded) ключ API для запросов к веб-сервису геолокации Google. Так как этот ключ включен в каждую версию Electron, его использование часто превышает доступную квоту. Вы можете предоставить свой API ключ Google в переменной окружения, чтобы данная проблема не возникала. Вставьте следующей код в файл главного процесса, перед открытием любого окна браузера, который производит запросы геолокации:

```javascript
process.env.GOOGLE_API_KEY = 'YOUR_KEY_HERE'
```

Инструкции по получению ключа API Google можно получить [на данной странице](https://www.chromium.org/developers/how-tos/api-keys).

По умолчанию, новый сгенерированный ключ API Google не может делать запросы геолокации. Чтобы разрешить использование запросов геолокации, [посетите данную страницу](https://console.developers.google.com/apis/api/geolocation/overview).

### `ELECTRON_NO_ASAR`

Отключает поддержку ASAR. Данная переменная поддерживается только в дочерних процессах, которые установили переменную окружения `ELECTRON_RUN_AS_NODE`.

### `ELECTRON_RUN_AS_NODE`

Starts the process as a normal Node.js process.

### `ELECTRON_NO_ATTACH_CONSOLE` *Windows*

Don't attach to the current console session.

### `ELECTRON_FORCE_WINDOW_MENU_BAR` *Linux*

Не использовать глобальное меню в Linux.

## Development Variables

The following environment variables are intended primarily for development and debugging purposes.

### `ELECTRON_ENABLE_LOGGING`

Prints Chrome's internal logging to the console.

### `ELECTRON_LOG_ASAR_READS`

When Electron reads from an ASAR file, log the read offset and file path to the system `tmpdir`. The resulting file can be provided to the ASAR module to optimize file ordering.

### `ELECTRON_ENABLE_STACK_DUMPING`

Prints the stack trace to the console when Electron crashes.

This environment variable will not work if the `crashReporter` is started.

### `ELECTRON_DEFAULT_ERROR_MODE` *Windows*

Shows the Windows's crash dialog when Electron crashes.

This environment variable will not work if the `crashReporter` is started.