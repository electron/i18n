# Поддерживаемые параметры командной строки

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

Specifies the flags passed to the Node.js engine. Если вы хотите включить `flags` в главном процессе, то он должен быть передан при запуске Electron.

```sh
$ electron --js-flags="--harmony_proxies --harmony_collections" your-app
```

Смотрите [документацию Node.js](https://nodejs.org/api/cli.html) или запустите `node --help` в командной строке для списка доступных флагов. Дополнительно, запустите `node --v8-options` для просмотра списка флагов, которые касаются JavaScript движка V8 в Node.js.

## --proxy-server=`адрес:порт`

Использовать указанный прокси-сервер, переопределив системные настройки. Этот параметр влияет только на запросы протокола HTTP, включая HTTPS и WebSocket запросы. Примечательно также, что не все прокси-сервера поддерживают запросы HTTPS и WebSocket. В URL для прокси не поддерживается указание имени пользователя и пароля для аутентификации, [из-за проблемы в Chromium](https://bugs.chromium.org/p/chromium/issues/detail?id=615947).

## --proxy-bypass-list=`хосты`

Указывает Electron обходить прокси-сервер для списка хостов, разделённых точкой с запятой. Этот флаг действует только в том случае, если он используется вместе с `--proxy-server`.

Например:

```javascript
const { app } = require('electron')
app.commandLine.appendSwitch('proxy-bypass-list', '<local>;*.google.com;*foo.com;1.2.3.4:5678')
```

Будет использовать прокси-сервер для всех хостов, за исключением локальных адресов (`localhost`, `127.0.0.1` и т.д.), поддоменов `google.com`, хостов, которые содержат `foo.com` и `1.2.3.4:5678`.

## --proxy-pac-url=`ссылка`

Использовать PAC скрипт для указанной `ссылки`.

## --no-proxy-server

Не использовать прокси сервер и всегда делать прямые соединения. Переопределяет все остальные флаги прокси-сервера, которые были указаны.

## --host-rules=`правила`

Список `правил`, разделённых точкой с запятой, которые контролируют как сопоставляются имена хостов.

Например:

* `MAP * 127.0.0.1` Все имена хостов будут перенаправлены на 127.0.0.1
* `MAP *.google.com proxy` Заставляет все поддомены google.com обращаться к "proxy".
* `MAP test.com [::1]:77` Forces "test.com" to resolve to IPv6 loopback. Также принудительно выставит порт получаемого адреса сокета, равный 77.
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

тогда любая `ссылка` заканчивающаяся на `example.com`, `foobar.com` и `baz` будут рассматриваться для интегрированной аутентификации. Без префикса `*`, ссылка будет полностью соответствовать.

## --auth-negotiate-delegate-whitelist=`ссылка`

A comma-separated list of servers for which delegation of user credentials is required. Без префикса `*`, ссылка будет полностью соответствовать.

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

Gives the default maximal active V-logging level; 0 is the default. Normally positive values are used for V-logging levels.

Этот параметр работает только когда `--enable-logging` также указан.

## --vmodule=`шаблон`

Дает на каждый модуль максимальный уровень V-логирования, чтобы переопределить значения, заданное `--v`. Например, `my_module=2,foo*=3` изменит уровень логирования для всего кода в исходных файлах `my_module.*` и`foo*.*`.

Любой шаблон, содержащий переднюю или обратную косую черту, будет протестирован против всего пути, а не только модуля. Например, `*/foo/bar/*=2` изменит уровень логирования для всего кода в исходных файлах под директорией `foo/bar`.

Этот параметр работает только когда `--enable-logging` также указан.

## --enable-api-filtering-logging

Enables caller stack logging for the following APIs (filtering events):
- `desktopCapturer.getSources()` / `desktop-capturer-get-sources`
- `remote.require()` / `remote-require`
- `remote.getGlobal()` / `remote-get-builtin`
- `remote.getBuiltin()` / `remote-get-global`
- `remote.getCurrentWindow()` / `remote-get-current-window`
- `remote.getCurrentWebContents()` / `remote-get-current-web-contents`
- `remote.getGuestWebContents()` / `remote-get-guest-web-contents`

## --no-sandbox

Disables Chromium sandbox, which is now enabled by default. Should only be used for testing.
