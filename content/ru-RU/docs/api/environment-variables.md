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

`NODE_OPTIONS` явно запрещены в упакованных приложениях, за исключением следующих:

```sh
--макс-http-заголовок размера
--http-parser
```

### `GOOGLE_API_KEY`

Поддержка геолокации в Electron требует использования сервиса геолокации Google Cloud Platform. Для включения этой функции получите [Ключ Google API](https://developers.google.com/maps/documentation/geolocation/get-api-key) и поместите следующий код в ваш файл основного процесса перед открытием любых окон браузера, делающим запросы геолокации:

```javascript
process.env.GOOGLE_API_KEY = 'YOUR_KEY_HERE'
```

По умолчанию, новый сгенерированный ключ API Google не может делать запросы геолокации. Чтобы включить веб-сервис геолокации для вашего проекта требуется [библиотека API](https://console.cloud.google.com/apis/library).

N.b. Для работы веб-службы геолокации [учетную запись](https://cloud.google.com/billing/docs/how-to/payment-methods#add_a_payment_method) к проекту, связанному с ключом API.

### `ELECTRON_NO_ASAR`

Отключает поддержку ASAR. Эта переменная поддерживается только в раздвоенных детских процессах, и породила детские процессы, `ELECTRON_RUN_AS_NODE`.

### `ELECTRON_RUN_AS_NODE`

Начинает процесс как Node.js процесс.

В этом режиме вы сможете передать параметры [cli](https://nodejs.org/api/cli.html) в узел.js как вы бы при запуске обычного узла.js выполняется, за исключением следующих флагов:

* "--открывает-конфиг"
* "--использование-в комплекте-ca"
* "--использование-openssl-ca",
* "--форс-фипс"
* "--включить-fips"

Эти флаги отключены из-за того, что Electron использует BoringSSL вместо OpenSSL при создании модуля `crypto` Node.js, и поэтому не будет работать так, как задумано.

### `ELECTRON_NO_ATTACH_CONSOLE` _Windows_

Не присоединяться к текущей сессии терминала.

### `ELECTRON_FORCE_WINDOW_MENU_BAR` _Linux_

Не использовать глобальное меню в Linux.

### `ELECTRON_TRASH` _Linux_

Установите реализацию мусора на Linux. По умолчанию `gio`.

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

Когда Electron читает из файла ASAR, зайдите в файл смещения чтения и файл систему `tmpdir`. Полученный файл может быть предоставлен модулю ASAR для оптимизации заказа файлов.

### `ELECTRON_ENABLE_STACK_DUMPING`

Выводит содержимое стэка в консоль при сбое Electron приложения.

Данная переменная окружения не будет работать, если `crashReporter` запущен.

### `ELECTRON_DEFAULT_ERROR_MODE` _Windows_

Показывает диалог сбоя Windows при сбое Electron приложения.

Данная переменная окружения не будет работать, если `crashReporter` запущен.

### `ELECTRON_OVERRIDE_DIST_PATH`

При запуске из `electron` пакета, эта переменная дает команду `electron` использовать указанную сборку Electron вместо загруженной по `npm install`. Использование:

```sh
экспортные ELECTRON_OVERRIDE_DIST_PATH/пользователи/имя пользователя/проекты/электрон/аут/тестирование
```

## Набор электроном

Electron устанавливает некоторые переменные в вашей среде во время выполнения.

### `ORIGINAL_XDG_CURRENT_DESKTOP`

Эта переменная устанавливается на значение `XDG_CURRENT_DESKTOP` , с было запущено приложение.  Электрон иногда изменяет значение `XDG_CURRENT_DESKTOP` , чтобы повлиять на другую логику в Chromium, так что если вы хотите получить доступ к исходному __ значение вы должны искать эту среду переменной вместо.
