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

`NODE_OPTIONS` явно запрещены в пакетах приложений.

### `GOOGLE_API_KEY`

Вы можете предоставить ключ API для запроса на геокодирование веб-сервиса Google. Чтобы сделать это, поместите следующий код в ваш основной файл перед открытием любых окон браузера, которые будут делать геокодирование запросов:

```javascript
process.env.GOOGLE_API_KEY = 'YOUR_KEY_HERE'
```

Инструкции по получению ключа API Google можно получить [на данной странице](https://developers.google.com/maps/documentation/javascript/get-api-key). По умолчанию, новый сгенерированный ключ API Google не может делать запросы геолокации. Чтобы разрешить использование запросов геолокации, [посетите данную страницу](https://developers.google.com/maps/documentation/geocoding/get-api-key).

### `ELECTRON_NO_ASAR`

Отключает поддержку ASAR. Данная переменная поддерживается только в дочерних процессах, которые установили переменную окружения `ELECTRON_RUN_AS_NODE`.

### `ELECTRON_RUN_AS_NODE`

Начинает процесс как Node.js процесс.

### `ELECTRON_NO_ATTACH_CONSOLE` *Windows*

Не присоединяться к текущей сессии терминала.

### `ELECTRON_FORCE_WINDOW_MENU_BAR` *Linux*

Не использовать глобальное меню в Linux.

### `ELECTRON_TRASH` *Linux*

Set the trash implementation on Linux. Default is `gio`.

Options:

* `gvfs-trash`
* `trash-cli`
* `kioclient5`
* `kioclient`

## Переменные разработки (development)

Следующие переменные окружения предназначены для использования в среде выполнения приложения Electron во время разработки и отладки.

### `ELECTRON_ENABLE_LOGGING`

Выводит логи Chrome в консоль.

### `ELECTRON_LOG_ASAR_READS`

Когда Electron читает ASAR файл, логирует путь к файлу и смещение чтения (read offset) в системную временную папку `tmpdir`. Результирующий файл может быть предоставлен модулю ASAR, чтобы оптимизировать порядок файлов.

### `ELECTRON_ENABLE_STACK_DUMPING`

Выводит содержимое стэка в консоль при сбое Electron приложения.

Данная переменная окружения не будет работать, если `crashReporter` запущен.

### `ELECTRON_DEFAULT_ERROR_MODE` *Windows*

Показывает диалог сбоя Windows при сбое Electron приложения.

Данная переменная окружения не будет работать, если `crashReporter` запущен.

### `ELECTRON_OVERRIDE_DIST_PATH`

When running from the `electron` package, this variable tells the `electron` command to use the specified build of Electron instead of the one downloaded by `npm install`. Usage:

```sh
export ELECTRON_OVERRIDE_DIST_PATH=/Users/username/projects/electron/out/Debug
```