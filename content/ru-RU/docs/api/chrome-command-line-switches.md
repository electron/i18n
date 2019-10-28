# Поддерживаемые параметры командной строки Chrome

> Параметры командной строки поддерживаемые Electron.

Вы можете использовать [app.commandLine.appendSwitch](app.md#appcommandlineappendswitchswitch-value), для добавления параметров командной строки, в основном скрипте Вашего приложения, перед тем как произойдет событие [ready](app.md#event-ready) модуля [app](app.md):

```javascript
const { app } = require('electron')
app.commandLine.appendSwitch('remote-debugging-port', '8315')
app.commandLine.appendSwitch('host-rules', 'MAP * 127.0.0.1')

app.on('ready', () => {
  // Ваш код здесь
})
```

## --ignore-connections-limit=`домены`

Игнорировать лимит подключения для списка `доменов`, разделённых `,`.

## --disable-http-cache

Отключить кэширование на жёсткий диск для HTTP запросов.

## --disable-http2

Отключить HTTP/2 и SPDY/3.1 протоколы.

## --lang

Установить пользовательский язык.

## --inspect=`порт` и --inspect-brk=`порт`

Связанные с отладкой флаги, смотрите руководство по [отладке основного процесса](../tutorial/debugging-main-process.md) для подробностей.

## --remote-debugging-port=`порт`

Включает удалённую отладку через HTTP для указанного `порта`.

## --disk-cache-size=`размер`

Максимальный размер кэша на жёстком диске в байтах.

## --js-flags=`флаги`

Specifies the flags passed to the Node.js engine. It has to be passed when starting Electron if you want to enable the `flags` in the main process.

```sh
$ electron --js-flags="--harmony_proxies --harmony_collections" your-app
```

See the [Node.js documentation](https://nodejs.org/api/cli.html) or run `node --help` in your terminal for a list of available flags. Additionally, run `node --v8-options` to see a list of flags that specifically refer to Node.js's V8 JavaScript engine.

## --proxy-server=`адрес:порт`

Использовать указанный прокси-сервер, переопределив системные настройки. Этот параметр влияет только на запросы протокола HTTP, включая HTTPS и WebSocket запросы. Примечательно также, что не все прокси-сервера поддерживают запросы HTTPS и WebSocket. В URL для прокси не поддерживается указание имени пользователя и пароля для аутентификации, [из-за проблемы в Chromium](https://bugs.chromium.org/p/chromium/issues/detail?id=615947).

## --proxy-bypass-list=`хосты`

Инструктирует Electron не использовать прокси-сервер для списка хостов, разделённых точкой с запятой. Данный параметр используется в связке с `--proxy-server`.

Например:

```javascript
const { app } = require('electron')
app.commandLine.appendSwitch('proxy-bypass-list', '<local>;*.google.com;*foo.com;1.2.3.4:5678')
```

Будет использовать прокси-сервер для всех хостов, за исключением локальных адресов (`localhost`, `127.0.0.1` и т.д.), поддоменов `google.com`, хостов, которые содержат `foo.com` и `1.2.3.4:5678`.

## --proxy-pac-url=`ссылка`

Использовать PAC скрипт для указанной `ссылки`.

## --no-proxy-server

Не использоваться прокси-сервер и всегда делать прямое соединение. Перезаписывает все прокси-сервера, параметры которых были переданы.

## --host-rules=`правила`

Список `правил`, разделённых точкой с запятой, которые контролируют как сопоставляются имена хостов.

Например:

* `MAP * 127.0.0.1` Все имена хостов будут перенаправлены на 127.0.0.1
* `MAP *.google.com proxy` Заставляет все поддомены google.com обращаться к "proxy".
* `MAP test.com [::1]:77` Заставляет "test.com" обращаться к локальному IPv6. Конечным портом для адреса сокета будет 77.
* `MAP * baz, EXCLUDE www.google.com` Перенаправляет всё на "baz", за исключением "www.google.com".

Эти перенаправления применяются к хосту конечной точки в сетевом запросе (TCP соединения и резолвер хоста в прямых соединениях, `CONNECT` в HTTP прокси-соединениях и хост конечной точки в `SOCKS` прокси-соединений).

## --host-resolver-rules=`правила`

Как `--host-rules`, но эти `правила` применяются только к резолверу хоста.

## --auth-server-whitelist=`ссылка`

Список серверов, разделенных запятой, для которых разрешена интегрированная аутентификация.

Например:

```sh
--auth-server-whitelist='*example.com, *foobar.com, *baz'
```

тогда любая `ссылка` заканчивающаяся на `example.com`, `foobar.com` и `baz` будут рассматриваться для интегрированной аутентификации. Without `*` prefix the URL has to match exactly.

## --auth-negotiate-delegate-whitelist=`ссылка`

A comma-separated list of servers for which delegation of user credentials is required. Without `*` prefix the URL has to match exactly.

## --ignore-certificate-errors

Игнорирует ошибки, связанные с сертификатами.

## --ppapi-flash-path=`путь`

Устанавливает `путь` до плагина pepper flash.

## --ppapi-flash-version=`версия`

Устанавливает `версию` плагина pepper flash.

## --log-net-log=`путь`

Включает логи сетевых событий для сохранения и записывает их в `путь`.

## --disable-renderer-backgrounding

Предотвращает Chromium от понижения приоритета для невидимых страниц графических процессов.

Этот параметр глобален для всех графических процессов, если Вы хотите отключить троттлинг в одном окне, Вы может использовать трюк с [проигрыванием беззвучных звуков](https://github.com/atom/atom/pull/9485/files).

## --enable-logging

Выводит логи Chromium в консоль.

Этот параметр не может быть использован в `app.commandLine.appendSwitch`, с тех пор как он парсится раньше, чем приложение пользователя загружается, но Вы можете установить переменную окружения `ELECTRON_ENABLE_LOGGING`, чтобы достичь того же эффекта.

## --v=`уровень_логирования`

Дает максимально активный уровень V-логированию по умолчанию; по умолчанию - 0. Обычно используются позитивные значения для уровней V-логирования.

Этот параметр работает только когда `--enable-logging` также указан.

## --vmodule=`шаблон`

Дает на каждый модуль максимальный уровень V-логирования, чтобы переопределить значения, заданное `--v`. Например, `my_module=2,foo*=3` изменит уровень логирования для всего кода в исходных файлах `my_module.*` и`foo*.*`.

Любой шаблон, содержащий переднюю или обратную косую черту, будет протестирован против всего пути, а не только модуля. Например, `*/foo/bar/*=2` изменит уровень логирования для всего кода в исходных файлах под директорией `foo/bar`.

Этот параметр работает только когда `--enable-logging` также указан.

## --no-sandbox

Disables Chromium sandbox, which is now enabled by default. Should only be used for testing.