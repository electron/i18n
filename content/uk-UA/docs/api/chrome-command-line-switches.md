# Підтримувані Параметри Командного Рядка Chrome

> Параметри командного рядка, підтримувані Electron.

Ви можете використовувати [app.commandLine.appendSwitch](app.md#appcommandlineappendswitchswitch-value) для додавання параметрів командного рядка в основний скрипт Вашого додатку, перед появою події [ready](app.md#event-ready) в модулі [app](app.md):

```javascript
const {app} = require('electron')
app.commandLine.appendSwitch('remote-debugging-port', '8315')
app.commandLine.appendSwitch('host-rules', 'MAP * 127.0.0.1')

app.on('ready', () => {
  // Ваш код
})
```

## --ignore-connections-limit=`домени`

Ігнорувати ліміт підключень для списку `доменів`, розділених `,`.

## --disable-http-cache

Відключає дисковий кеш для HTTP-запитів.

## --disable-http2

Відключити протоколи HTTP/2 і SPDY/3.1.

## --lang

Встановити користувацьку мову.

## --inspect=`порт` і --inspect-brk=`порт`

Зв'язані з відладкою прапорці, дивіться [Відлагодження основного процесу](../tutorial/debugging-main-process.md) для деталей.

## --remote-debugging-port=`порт`

Дозволяє віддалено відлагоджувати через HTTP для вказаного `порту`.

## --disk-cache-size=`розмір`

Встановлює максимальний розмір для кешу диску, в байтах.

## --js-flags=`прапорці`

Specifies the flags passed to the Node JS engine. It has to be passed when starting Electron if you want to enable the `flags` in the main process.

```sh
$ electron --js-flags="--harmony_proxies --harmony_collections" your-app
```

See the [Node documentation](https://nodejs.org/api/cli.html) or run `node --help` in your terminal for a list of available flags. Additionally, run `node --v8-options` to see a list of flags that specifically refer to Node's V8 JavaScript engine.

## --proxy-server=`адреса:порт`

Use a specified proxy server, which overrides the system setting. This switch only affects requests with HTTP protocol, including HTTPS and WebSocket requests. It is also noteworthy that not all proxy servers support HTTPS and WebSocket requests.

## --proxy-bypass-list=`хости`

Instructs Electron to bypass the proxy server for the given semi-colon-separated list of hosts. This flag has an effect only if used in tandem with `--proxy-server`.

Наприклад:

```javascript
const {app} = require('electron')
app.commandLine.appendSwitch('proxy-bypass-list', '<local>;*.google.com;*foo.com;1.2.3.4:5678')
```

Will use the proxy server for all hosts except for local addresses (`localhost`, `127.0.0.1` etc.), `google.com` subdomains, hosts that contain the suffix `foo.com` and anything at `1.2.3.4:5678`.

## --proxy-pac-url=`url`

Uses the PAC script at the specified `url`.

## --no-proxy-server

Не використовувати проксі-сервер і завжди робити прямі з'єднання. Замінює будь-які інші проксі-сервер прапорів, які передаються.

## --host-rules=`правила`

A comma-separated list of `rules` that control how hostnames are mapped.

Наприклад:

* `MAP * 127.0.0.1` Forces all hostnames to be mapped to 127.0.0.1
* `MAP *.google.com proxy` Forces all google.com subdomains to be resolved to "proxy".
* `MAP test.com [::1]:77` Forces "test.com" to resolve to IPv6 loopback. Will also force the port of the resulting socket address to be 77.
* `MAP * baz, EXCLUDE www.google.com` Remaps everything to "baz", except for "www.google.com".

These mappings apply to the endpoint host in a net request (the TCP connect and host resolver in a direct connection, and the `CONNECT` in an HTTP proxy connection, and the endpoint host in a `SOCKS` proxy connection).

## --host-resolver-rules=`правила`

Like `--host-rules` but these `rules` only apply to the host resolver.

## --auth-server-whitelist=`url`

A comma-separated list of servers for which integrated authentication is enabled.

Наприклад:

```sh
--auth-server-whitelist='*example.com, *foobar.com, *baz'
```

then any `url` ending with `example.com`, `foobar.com`, `baz` will be considered for integrated authentication. Without `*` prefix the url has to match exactly.

## --auth-negotiate-delegate-whitelist=`url`

A comma-separated list of servers for which delegation of user credentials is required. Without `*` prefix the url has to match exactly.

## --ignore-certificate-errors

Ігнорувати помилки, пов'язані з сертифікатом.

## --ppapi-flash-path=`шлях`

Sets the `path` of the pepper flash plugin.

## --ppapi-flash-version=`версія`

Sets the `version` of the pepper flash plugin.

## --log-net-log=`шлях`

Enables net log events to be saved and writes them to `path`.

## --disable-renderer-backgrounding

Prevents Chromium from lowering the priority of invisible pages' renderer processes.

This flag is global to all renderer processes, if you only want to disable throttling in one window, you can take the hack of [playing silent audio](https://github.com/atom/atom/pull/9485/files).

## --enable-logging

Prints Chromium's logging into console.

This switch can not be used in `app.commandLine.appendSwitch` since it is parsed earlier than user's app is loaded, but you can set the `ELECTRON_ENABLE_LOGGING` environment variable to achieve the same effect.

## --v=`рівень_журналювання`

Gives the default maximal active V-logging level; 0 is the default. Normally positive values are used for V-logging levels.

This switch only works when `--enable-logging` is also passed.

## --vmodule=`патерн`

Gives the per-module maximal V-logging levels to override the value given by `--v`. E.g. `my_module=2,foo*=3` would change the logging level for all code in source files `my_module.*` and `foo*.*`.

Any pattern containing a forward or backward slash will be tested against the whole pathname and not just the module. E.g. `*/foo/bar/*=2` would change the logging level for all code in the source files under a `foo/bar` directory.

This switch only works when `--enable-logging` is also passed.