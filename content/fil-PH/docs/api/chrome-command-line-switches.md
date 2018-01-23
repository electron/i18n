# Suportado ng Chrome Command Line Switches

> Ang Command line switches ay sinusuportahan ng Electron.

You can use [app.commandLine.appendSwitch](app.md#appcommandlineappendswitchswitch-value) to append them in your app's main script before the [ready](app.md#event-ready) event of the [app](app.md) module is emitted:

```javascript
const {app} = require('electron')
app.commandLine.appendSwitch('remote-debugging-port', '8315')
app.commandLine.appendSwitch('host-rules', 'MAP * 127.0.0.1')

app.on('ready', () => {
  // ilagay mo ang code mo dto
})
```

## --ignore-connections-limit=`domains`

Ipagsawalang bahala ang limitasyon ng iyong koneksyon ng `domains` para paghiwahiwalayin ang mga `,`.

## --disable-http-cache

Wag paganahin ang dish cache para sa kahilingan ng HTTP.

## --disable-http2

Huwag paganahin ang HTTP/2 at SPDY/3.1 protocol.

## --inspect=`port` and --inspect-brk=`port`

Debug-related flags, tingnan ang [Debugging ang pangunahing Process](../tutorial/debugging-main-process.md) tingnan ang detalye.

## --remote-debugging-port=`port`

Paganahin ang remote debugging bago ang HTTP sa pag tukoy sa `port`.

## --disk-cache-size=`size`

Gamitin ang pinakamataas na bakante ng disk cache, na magagamit, sa byte.

## --js-flags=`flags`

Tukuyin ang mga flag na nalampasan ng Node JS engine. ito ay kailangang malampasan habang gumagana ang electron. kung gusto mong gumana ang `flags` na pangunahing process.

```bash
$ electron --js-flags="--harmony_proxies --harmony_collections" your-app
```

Tingnan ang [Node documentation](https://nodejs.org/api/cli.html) o kaya paganahin ang `node --help` sa iyong terminal para sa listahan ng mga magagamit na flag. Bukod pa dito, paganahin ang `node --v8-options` para makita ang listahan ng mga flags na tumutukoy sa Node's V8 JavaScript engine.

## --proxy-server=`address:port`

Gumamit ng isang uri ng proxy server, para mapatungan ang system setting. Lumipat lamang kung nakakaapekto ang request ng HTTP protocol, pati na ang HTTPS at WebSocker request. It is also noteworthy that not all proxy servers support HTTPS and WebSocket requests.

## --proxy-bypass-list=`hosts`

Turuan ang Electron na lampasan ang proxy server na semi-colon-separated ang listahan ng mga hosts. ito ay magkakaapekto lamang sa pinagsamang paggamit nito `--proxy-server`.

Halimbawa:

```javascript
const {app} = require('electron')
app.commandLine.appendSwitch('proxy-bypass-list', '<local>;*.google.com;*foo.com;1.2.3.4:5678')
```

Gamitin ang proxy server nat sa lahat, maliban sa local address (`localhost`, `127.0.0.1` etc.), `google.com` subdomains, ang host na nag lalaman ng suffix na `foo.com` and anything at `1.2.3.4:5678`.

## --proxy-pac-url=`url`

Gumagamit ng mga PAC script sa tinukoy na mga `url`.

## --no-proxy-server

Huwag gumamit ng proxy server at palaging gumawa ng mga direktang koneksiyon. patungan ang iba pang mga proxy server flag na lumipas.

## --host-rules=`rules`

Ang kuwit ay nag hihiwalay sa listan ng `rules` na nag kokontrol kung paano ang hostname ay itinalaga.

Halimbawa:

* `MAP * 127.0.0.1` ang lahat ng hostname ay ginawa na 127.0.0.1
* `MAP *.google.com proxy` Forces all google.com subdomains to be resolved to "proxy".
* `MAP test.com [::1]:77` Forces "test.com" to resolve to IPv6 loopback. Will also force the port of the resulting socket address to be 77.
* `MAP * baz, EXCLUDE www.google.com` Remaps everything to "baz", except for "www.google.com".

These mappings apply to the endpoint host in a net request (the TCP connect and host resolver in a direct connection, and the `CONNECT` in an HTTP proxy connection, and the endpoint host in a `SOCKS` proxy connection).

## --host-resolver-rules=`rules`

Like `--host-rules` but these `rules` only apply to the host resolver.

## --auth-server-whitelist=`url`

A comma-separated list of servers for which integrated authentication is enabled.

Halimbawa:

    --auth-server-whitelist='*example.com, *foobar.com, *baz'
    

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