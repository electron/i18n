# Wspierane Zmienne Konsoli Chrome

> Przełączniki linii komand wspierane przez Electron.

[App.commandLine.appendSwitch](app.md#appcommandlineappendswitchswitch-value) można użyć, aby dołączyć je w skrypcie głównym aplikacji, zanim zostaną wyemitowane zdarzenie [ready](app.md#event-ready) modułu [aplikacji](app.md):

```javascript
const {app} = require('electron')
app.commandLine.appendSwitch('remote-debugging-port', '8315')
app.commandLine.appendSwitch('host-rules', 'MAP * 127.0.0.1')

app.on('ready', () => {
  // Twój kod aplikacji...
})
```

## --ignore-connections-limit=`domains`

Zignoruj limit połączeń dla `domains` w liście oddzielonej przecinkiem.

## --disable-http-cache

Wyłącz zapisywanie żądań HTTP w pamięci podręcznej.

## --disable-http2

Wyłącz protokoły HTTP/2 oraz SPDY/3.1.

## --lang

Set a custom locale.

## --inspect=`port` and --inspect-brk=`port`

Flagi związane z debugowaniem, zobacz więcej w poradniku dla debugowania [Main Process](../tutorial/debugging-main-process.md).

## --remote-debugging-port=`port`

Włącz zdalne debugowanie poprzez HTTP na określonym `port`.

## --disk-cache-size=`size`

Wymuś użycie maksymalnego miejsca na dysku dla pamięci podręcznej wyrażonej w bajtach.

## --js-flags=`flags`

Określa flagi przekazywane do silnika Node JS. Musi być przekazane podczas uruchamiania Electron'a, jeśli chcesz włączyć `flagi` w głównym procesie.

```sh
$ electron --js-flags="--harmony_proxies --harmony_collections" your-app
```

Zobacz więcej w [dokumentacji Node'a](https://nodejs.org/api/cli.html) albo uruchom komendę `node --help` w wierszu poleceń aby zobaczyć listę dostępnych flag. Dodatkowo wpisz polecenie `node --v8-options`, aby zobaczyć listę flag które odnoszą się do silnika Node V8 JavaScript.

## --proxy-server=`address:port`

Use a specified proxy server, which overrides the system setting. This switch only affects requests with HTTP protocol, including HTTPS and WebSocket requests. It is also noteworthy that not all proxy servers support HTTPS and WebSocket requests.

## --proxy-bypass-list=`hosts`

Instructs Electron to bypass the proxy server for the given semi-colon-separated list of hosts. This flag has an effect only if used in tandem with `--proxy-server`.

Na przykład:

```javascript
const {app} = require('electron')
app.commandLine.appendSwitch('proxy-bypass-list', '<local>;*.google.com;*foo.com;1.2.3.4:5678')
```

Will use the proxy server for all hosts except for local addresses (`localhost`, `127.0.0.1` etc.), `google.com` subdomains, hosts that contain the suffix `foo.com` and anything at `1.2.3.4:5678`.

## --proxy-pac-url=`url`

Uses the PAC script at the specified `url`.

## --no-proxy-server

Don't use a proxy server and always make direct connections. Overrides any other proxy server flags that are passed.

## --host-rules=`rules`

A comma-separated list of `rules` that control how hostnames are mapped.

Na przykład:

* `MAP * 127.0.0.1` Forces all hostnames to be mapped to 127.0.0.1
* `MAP *.google.com proxy` Forces all google.com subdomains to be resolved to "proxy".
* `MAP test.com [::1]:77` Forces "test.com" to resolve to IPv6 loopback. Will also force the port of the resulting socket address to be 77.
* `MAP * baz, EXCLUDE www.google.com` Remaps everything to "baz", except for "www.google.com".

These mappings apply to the endpoint host in a net request (the TCP connect and host resolver in a direct connection, and the `CONNECT` in an HTTP proxy connection, and the endpoint host in a `SOCKS` proxy connection).

## --host-resolver-rules=`rules`

Like `--host-rules` but these `rules` only apply to the host resolver.

## --auth-server-whitelist=`url`

A comma-separated list of servers for which integrated authentication is enabled.

Na przykład:

```sh
--auth-server-whitelist='*example.com, *foobar.com, *baz'
```

then any `url` ending with `example.com`, `foobar.com`, `baz` will be considered for integrated authentication. Without `*` prefix the url has to match exactly.

## --auth-negotiate-delegate-whitelist=`url`

A comma-separated list of servers for which delegation of user credentials is required. Without `*` prefix the url has to match exactly.

## --ignore-certificate-errors

Ignoruje błędy powiązane z certyfikatami.

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