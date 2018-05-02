# Поддерживаемые параметры командной строки Chrome

> Параметры командной строки поддерживаемые Electron.

Вы можете использовать [app.commandLine.appendSwitch](app.md#appcommandlineappendswitchswitch-value) для добавления параметров командной строки в основной скрипт вашего приложения, перед появлением [ready](app.md#event-ready) события в [app](app.md) модуле:

```javascript
const {app} = require('electron')
app.commandLine.appendSwitch('remote-debugging-port', '8315')
app.commandLine.appendSwitch('host-rules', 'MAP * 127.0.0.1')

app.on('ready', () => {
  // Ваш код здесь
})
```

## --ignore-connections-limit=`domains`

Игнорировать лимит подключения для `списка доменов`, разделённых `,`.

## --disable-http-cache

Отключить кеширование на жёсткий диск для HTTP запросов.

## --disable-http2

Отключить HTTP/2 и SPDY/3.1 протоколы.

## --lang

Set a custom locale.

## --inspect=`port` and --inspect-brk=`port`

Связанные с отладкой флаги, смотрите [Отладка основного процесса](../tutorial/debugging-main-process.md) для деталей.

## --remote-debugging-port=`порт`

Включает удалённую отладку через HTTP для указанного `порта`.

## --disk-cache-size=`размер`

Максимальный размер кеша на жёстком диске в байтах.

## --js-flags=`флаги`

Specifies the flags passed to the Node JS engine. It has to be passed when starting Electron if you want to enable the `flags` in the main process.

```sh
$ electron --js-flags="--harmony_proxies --harmony_collections" your-app
```

Смотрите [Node документацию](https://nodejs.org/api/cli.html) или запустите `node --help` в командной строке для списка доступных флагов. Дополнительно, запустите `node --v8-options` для просмотра списка флагов которые касаются Node's V8 JavaScript engine.

## --proxy-server=`address:port`

Использует указанный proxy сервер, который перезаписывает системные настройки. Этот параметр влияет только на запросы HTTP протокола, включая HTTPS и WebSocket. Примечательно также, что не все proxy серверы поддерживают HTTPS и WebSocket протоколы.

## --proxy-bypass-list=`hosts`

Инструктирует Electron не использовать proxy сервер для списка хостов, разделённых точкой с запятой. Данные параметр используется в связке с `--proxy-server`.

Например:

```javascript
const {app} = require('electron')
app.commandLine.appendSwitch('proxy-bypass-list', '<local>;*.google.com;*foo.com;1.2.3.4:5678')
```

Будет использовать прокси сервер для всех хостов, за исключением локальных адресов (`localhost`, `127.0.0.1` и т. д.), `google.com` поддоменов, хостов которые содержат `foo.com` и `1.2.3.4:5678`.

## --proxy-pac-url=`url`

Использовать PAC скрипт для указанного `url`.

## --no-proxy-server

Не использоваться прокси сервер и всегда делать прямое соединение. Перезаписывает все прокси серверы, параметры которых были переданы.

## --host-rules=`rules`

Список `правил`, разделённых точкой с запятой, которые контролируют как сопоставляются имена хостов.

Например:

* `MAP * 127.0.0.1` Все имена хостов будут перенаправлены на 127.0.0.1
* `MAP *.google.com proxy` Заставляет все google.com поддомены обращаться к "proxy".
* `MAP test.com [::1]:77` Заставляет "test.com" обращаться к IPv6 loopback. Конечным портом для адреса сокета будет 77.
* `MAP * baz, EXCLUDE www.google.com` Перенаправляет всё на "baz", за исключением "www.google.com".

These mappings apply to the endpoint host in a net request (the TCP connect and host resolver in a direct connection, and the `CONNECT` in an HTTP proxy connection, and the endpoint host in a `SOCKS` proxy connection).

## --host-resolver-rules=`rules`

Like `--host-rules` but these `rules` only apply to the host resolver.

## --auth-server-whitelist=`url`

Список серверов (разделенные запятой), для которых разрешена интегрированная аутентификация.

Например:

```sh
--auth-server-whitelist='*example.com, *foobar.com, *baz'
```

then any `url` ending with `example.com`, `foobar.com`, `baz` will be considered for integrated authentication. Without `*` prefix the url has to match exactly.

## --auth-negotiate-delegate-whitelist=`url`

A comma-separated list of servers for which delegation of user credentials is required. Without `*` prefix the url has to match exactly.

## --ignore-certificate-errors

Игнорировать ошибки, связанные с сертификатами.

## --ppapi-flash-path=`path`

Sets the `path` of the pepper flash plugin.

## --ppapi-flash-version=`version`

Sets the `version` of the pepper flash plugin.

## --log-net-log=`path`

Enables net log events to be saved and writes them to `path`.

## --disable-renderer-backgrounding

Prevents Chromium from lowering the priority of invisible pages' renderer processes.

This flag is global to all renderer processes, if you only want to disable throttling in one window, you can take the hack of [playing silent audio](https://github.com/atom/atom/pull/9485/files).

## --enable-logging

Prints Chromium's logging into console.

This switch can not be used in `app.commandLine.appendSwitch` since it is parsed earlier than user's app is loaded, but you can set the `ELECTRON_ENABLE_LOGGING` environment variable to achieve the same effect.

## --v=`log_level`

Gives the default maximal active V-logging level; 0 is the default. Normally positive values are used for V-logging levels.

This switch only works when `--enable-logging` is also passed.

## --vmodule=`pattern`

Gives the per-module maximal V-logging levels to override the value given by `--v`. E.g. `my_module=2,foo*=3` would change the logging level for all code in source files `my_module.*` and `foo*.*`.

Any pattern containing a forward or backward slash will be tested against the whole pathname and not just the module. E.g. `*/foo/bar/*=2` would change the logging level for all code in the source files under a `foo/bar` directory.

This switch only works when `--enable-logging` is also passed.