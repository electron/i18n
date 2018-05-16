# Desteklenen Chrome Komut Satırı Anahtarları

> Elektron tarafından desteklenen komut satırı anahtarları.

[Uygulama](app.md) modülünün [hazır](app.md#event-ready) olayı yayılmadan önce [app.commandLine.appendSwitch](app.md#appcommandlineappendswitchswitch-value) kullanarak uygulamanızın ana komut dosyalarına ekleyebilirsiniz:

```javascript
const {app} = require('electron')
app.commandLine.appendSwitch('remote-debugging-port', '8315')
app.commandLine.appendSwitch('host-rules', 'MAP * 127.0.0.1')

app.on('ready', () => {
  // Kodlarınızı buraya yazın
})
```

## --ignore-connections-limit=`domains`

`,` Ile ayrılmış `alan adları` listesi için bağlantı limitini yoksay.

## --disable-http-cache

HTTP istekleri için disk önbelleği devre dışı bırakır.

## --disable-http2

HTTP/2 ve SPDY/3.1 protokollerini devre dışı bırakın.

## --lang

Set a custom locale.

## --inspect=`port` and --inspect-brk=`port`

Debug-related flags, see the [Debugging the Main Process](../tutorial/debugging-main-process.md) guide for details.

## --remote-debugging-port=`port`

Enables remote debugging over HTTP on the specified `port`.

## --disk-cache-size=`size`

Forces the maximum disk space to be used by the disk cache, in bytes.

## --js-flags=`flags`

Specifies the flags passed to the Node JS engine. It has to be passed when starting Electron if you want to enable the `flags` in the main process.

```sh
$ electron --js-flags="--harmony_proxies --harmony_collections" app'iniz
```

See the [Node documentation](https://nodejs.org/api/cli.html) or run `node --help` in your terminal for a list of available flags. Additionally, run `node --v8-options` to see a list of flags that specifically refer to Node's V8 JavaScript engine.

## --proxy-server=`address:port`

Use a specified proxy server, which overrides the system setting. This switch only affects requests with HTTP protocol, including HTTPS and WebSocket requests. It is also noteworthy that not all proxy servers support HTTPS and WebSocket requests.

## --proxy-bypass-list=`hosts`

Instructs Electron to bypass the proxy server for the given semi-colon-separated list of hosts. This flag has an effect only if used in tandem with `--proxy-server`.

Örneğin:

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

Örneğin:

* `MAP * 127.0.0.1` Tüm ana makine adlarını 127.0.0.1 ile eşleşmesi için zorlar
* `MAP *.google.com proxy` Tüm google.com alt etki alanları "proxy" çözülmesi için zorlar.
* `MAP test.com [::1]:77` "test.com" u IPv6 loopback için çözülmesini zorlar. Elde edilen soket adresinin bağlantı noktasını da 77 olacak şekilde zorlar.
* `MAP * baz, EXCLUDE www.google.com` "www.google.com" dışında her şeyi "baz" a yeniden eşler.

These mappings apply to the endpoint host in a net request (the TCP connect and host resolver in a direct connection, and the `CONNECT` in an HTTP proxy connection, and the endpoint host in a `SOCKS` proxy connection).

## --host-resolver-rules=`rules`

Like `--host-rules` but these `rules` only apply to the host resolver.

## --auth-server-whitelist=`url`

A comma-separated list of servers for which integrated authentication is enabled.

Örneğin:

```sh
--auth-server-whitelist='*example.com, *foobar.com, *baz'
```

then any `url` ending with `example.com`, `foobar.com`, `baz` will be considered for integrated authentication. Without `*` prefix the url has to match exactly.

## --auth-negotiate-delegate-whitelist=`url`

A comma-separated list of servers for which delegation of user credentials is required. Without `*` prefix the url has to match exactly.

## --ignore-certificate-errors

Ignores certificate related errors.

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