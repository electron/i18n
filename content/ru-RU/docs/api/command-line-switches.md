# Поддерживаемые параметры командной строки

> Параметры командной строки поддерживаемые Electron.

Вы можете использовать [app.commandLine.appendSwitch][append-switch], для добавления параметров командной строки, в основном скрипте Вашего приложения, перед тем как произойдет событие [ready][ready] модуля [app][app]:

```javascript
const { app } = require('electron')
app.commandLine.appendSwitch('remote-debugging-port', '8315')
app.commandLine.appendSwitch('host-rules', 'MAP * 127.0.0.1')

app.whenReady().then(() => {
  // Your code here
})
```

## Electron CLI Flags

### --auth-server-whitelist=`ссылка`

Список серверов, разделенных запятой, для которых разрешена интегрированная аутентификация.

Например:

```sh
--auth-server-whitelist='*example.com, *foobar.com, *baz'
```

тогда любая `ссылка` заканчивающаяся на `example.com`, `foobar.com` и `baz` будут рассматриваться для интегрированной аутентификации. Без префикса `*`, ссылка будет полностью соответствовать.

### --auth-negotiate-delegate-whitelist=`ссылка`

A comma-separated list of servers for which delegation of user credentials is required. Без префикса `*`, ссылка будет полностью соответствовать.

### --disable-ntlm-v2

Disables NTLM v2 for posix platforms, no effect elsewhere.

### --disable-http-cache

Отключить кэширование на жёсткий диск для HTTP запросов.

### --disable-http2

Отключить HTTP/2 и SPDY/3.1 протоколы.

### --disable-renderer-backgrounding

Предотвращает Chromium от понижения приоритета для невидимых страниц графических процессов.

Этот параметр глобален для всех графических процессов, если Вы хотите отключить троттлинг в одном окне, Вы может использовать трюк с [проигрыванием беззвучных звуков][play-silent-audio].

### --disk-cache-size=`размер`

Максимальный размер кэша на жёстком диске в байтах.

### --enable-api-filtering-logging

Enables caller stack logging for the following APIs (filtering events):

* `desktopCapturer.getSources()` / `desktop-capturer-get-sources`
* `remote.require()` / `remote-require`
* `remote.getGlobal()` / `remote-get-builtin`
* `remote.getBuiltin()` / `remote-get-global`
* `remote.getCurrentWindow()` / `remote-get-current-window`
* `remote.getCurrentWebContents()` / `remote-get-current-web-contents`

### --enable-logging

Выводит логи Chromium в консоль.

Этот параметр не может быть использован в `app.commandLine.appendSwitch`, с тех пор как он парсится раньше, чем приложение пользователя загружается, но Вы можете установить переменную окружения `ELECTRON_ENABLE_LOGGING`, чтобы достичь того же эффекта.

### --force-fieldtrials=`trials`

Field trials to be forcefully enabled or disabled.

For example: `WebRTC-Audio-Red-For-Opus/Enabled/`

### --host-rules=`правила`

Список `правил`, разделённых точкой с запятой, которые контролируют как сопоставляются имена хостов.

Например:

* `MAP * 127.0.0.1` Все имена хостов будут перенаправлены на 127.0.0.1
* `MAP *.google.com proxy` Заставляет все поддомены google.com обращаться к "proxy".
* `MAP test.com [::1]:77` Forces "test.com" to resolve to IPv6 loopback. Также принудительно выставит порт получаемого адреса сокета, равный 77.
* `MAP * baz, EXCLUDE www.google.com` Перенаправляет всё на "baz", за исключением "www.google.com".

Эти перенаправления применяются к хосту конечной точки в сетевом запросе (TCP соединения и резолвер хоста в прямых соединениях, `CONNECT` в HTTP прокси-соединениях и хост конечной точки в `SOCKS` прокси-соединений).

### --host-resolver-rules=`правила`

Как `--host-rules`, но эти `правила` применяются только к резолверу хоста.

### --ignore-certificate-errors

Игнорирует ошибки, связанные с сертификатами.

### --ignore-connections-limit=`домены`

Игнорировать лимит подключения для списка `доменов`, разделённых `,`.

### --js-flags=`флаги`

Specifies the flags passed to the Node.js engine. Если вы хотите включить `flags` в главном процессе, то он должен быть передан при запуске Electron.

```sh
$ electron --js-flags="--harmony_proxies --harmony_collections" your-app
```

Смотрите [документацию Node.js][node-cli] или запустите `node --help` в командной строке для списка доступных флагов. Дополнительно, запустите `node --v8-options` для просмотра списка флагов, которые касаются JavaScript движка V8 в Node.js.

### --lang

Установить пользовательский язык.

### --log-net-log=`путь`

Включает логи сетевых событий для сохранения и записывает их в `путь`.

### --no-proxy-server

Не использовать прокси сервер и всегда делать прямые соединения. Переопределяет все остальные флаги прокси-сервера, которые были указаны.

### --no-sandbox

Disables the Chromium [sandbox](https://www.chromium.org/developers/design-documents/sandbox). Forces renderer process and Chromium helper processes to run un-sandboxed. Should only be used for testing.

### --proxy-bypass-list=`хосты`

Указывает Electron обходить прокси-сервер для списка хостов, разделённых точкой с запятой. Этот флаг действует только в том случае, если он используется вместе с `--proxy-server`.

Например:

```javascript
const { app } = require('electron')
app.commandLine.appendSwitch('proxy-bypass-list', '<local>;*.google.com;*foo.com;1.2.3.4:5678')
```

Будет использовать прокси сервер для всех хостов, за исключением локальных адресов (`localhost`, `127.0.0.1` и т. д.), `google.com` поддоменов, хостов которые содержат `foo.com` и `1.2.3.4:5678`.

### --proxy-pac-url=`ссылка`

Использовать PAC скрипт для указанного `url`.

### --proxy-server=`адрес:порт`

Использует указанный proxy сервер, который перезаписывает системные настройки. Этот параметр влияет только на запросы HTTP протокола, включая HTTPS и WebSocket. Примечательно также, что не все proxy серверы поддерживают HTTPS и WebSocket протоколы. В URL для прокси не поддерживается указание имени пользователя и пароля для аутентификации, [из-за проблемы в Chromium](https://bugs.chromium.org/p/chromium/issues/detail?id=615947).

### --remote-debugging-port=`порт`

Включает удалённую отладку через HTTP для указанного `порта`.

### --v=`уровень_логирования`

Gives the default maximal active V-logging level; 0 is the default. Normally positive values are used for V-logging levels.

Этот параметр работает только когда `--enable-logging` также указан.

### --vmodule=`шаблон`

Дает на каждый модуль максимальный уровень V-логирования, чтобы переопределить значения, заданное `--v`. Например, `my_module=2,foo*=3` would change the logging level for all code in source files `my_module.*` and `foo*.*`.

Любой шаблон, содержащий переднюю или обратную косую черту, будет протестирован против всего пути, а не только модуля. Например, `*/foo/bar/*=2` would change the logging level for all code in the source files under a `foo/bar` directory.

Этот параметр работает только когда `--enable-logging` также указан.

### --force_high_performance_gpu

Force using discrete GPU when there are multiple GPUs available.

### --force_low_power_gpu

Force using integrated GPU when there are multiple GPUs available.

## Node.js Flags

Electron поддерживает некоторые из флагов [CLI][node-cli], поддерживаемых Node.js.

**Note:** Passing unsupported command line switches to Electron when it is not running in `ELECTRON_RUN_AS_NODE` will have no effect.

### --inspect-brk[=[host:]port]

Activate inspector on host:port and break at start of user script. Default host:port is 127.0.0.1:9229.

Aliased to `--debug-brk=[host:]port`.

### --inspect-port=[host:]port

Set the `host:port` to be used when the inspector is activated. Useful when activating the inspector by sending the SIGUSR1 signal. Default host is `127.0.0.1`.

Aliased to `--debug-port=[host:]port`.

### --inspect[=[host:]port]

Activate inspector on `host:port`. По умолчанию - `127.0.0.1:9229`.

V8 inspector integration allows tools such as Chrome DevTools and IDEs to debug and profile Electron instances. The tools attach to Electron instances via a TCP port and communicate using the [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/).

Смотрите [Руководство по отладке главного процесса][debugging-main-process] для получения более подробной информации.

Aliased to `--debug[=[host:]port`.

### --inspect-publish-uid=stderr,http

Specify ways of the inspector web socket url exposure.

By default inspector websocket url is available in stderr and under /json/list endpoint on http://host:port/json/list.

[app]: app.md
[append-switch]: command-line.md#commandlineappendswitchswitch-value
[ready]: app.md#event-ready
[play-silent-audio]: https://github.com/atom/atom/pull/9485/files
[debugging-main-process]: ../tutorial/debugging-main-process.md
[node-cli]: https://nodejs.org/api/cli.html
[node-cli]: https://nodejs.org/api/cli.html
