# Supported Command Line Switches

> Befehlszeilenoptionen unterstützt von Electron.

[app.commandLine.appendSwitch][append-switch] kann benutzt werden um die Befehlszeilenoptionen zu dem Hauptskript der App, bevor das [ready][ready]-Ereignis des [app][app]-Moduls eintritt, hinzuzufügen:

```javascript
const { app } = require('electron')
app.commandLine.appendSwitch('remote-debugging-port', '8315')
app.commandLine.appendSwitch('host-rules', 'MAP * 127.0.0.1')

app.whenReady().then() =

  >
```

## Elektronen-CLI-Flags

### --auth-server-whitelist=`url`

Eine durch Kommas getrennte Liste von Servern, für die die integrierte Authentifizierung aktiviert ist.

Ein Beispiel:

```sh
--auth-server-whitelist='*beispiel.com, *foobar.com, *baz'
```

dann werden alle `url` , die mit `example.com`, `foobar.com`, `baz` enden, als für die integrierte Authentifizierung betrachtet. Ohne `*` Präfix muss die URL genau übereinstimmen.

### --auth-negotiate-delegate-whitelist=`url`

Eine durch Kommas getrennte Liste von Servern, für die eine Delegierung von Benutzeranmeldeinformationen erforderlich ist. Ohne `*` Präfix muss die URL genau übereinstimmen.

### --disable-ntlm-v2

Deaktiviert NTLM v2 für posix-Plattformen, an anderer Stelle kein Effekt.

### --disable-http-cache

Deaktiviert den Datenträgercache für HTTP-Anforderungen.

### --deaktivieren-http2

Deaktivieren Sie die Protokolle HTTP/2 und SPDY/3.1.

### --disable-renderer-backgrounding

Verhindert, dass Chromium die Priorität des Renderers unsichtbarer Seiten -Prozessen verringert.

Dieses Flag ist global für alle Renderer-Prozesse, wenn Sie nur Drosselung in einem Fenster deaktivieren möchten, können Sie den Hack von [die Wiedergabe von stillen Audio-][play-silent-audio].

### --disk-cache-size=`size`

Erzwingt den maximalen Speicherplatz, der vom Datenträgercache in Bytes verwendet werden soll.

### --enable-api-filtering-logging

Aktiviert die Aufruferlistenprotokollierung für die folgenden APIs (Filterereignisse):

- `desktopCapturer.getSources()` / `desktop-capturer-get-sources`
- `remote.require()` / `remote-require`
- `remote.getGlobal()` / `remote-get-builtin`
- `remote.getBuiltin()` / `remote-get-global`
- `remote.getCurrentWindow()` / `remote-get-current-window`
- `remote.getCurrentWebContents()` / `remote-get-current-web-contents`

### --enable-logging

Druckt die Anmeldung von Chromium bei der Konsole.

Dieser Schalter kann nicht in `app.commandLine.appendSwitch` verwendet werden, da er früher analysiert wird, als die App des Benutzers geladen ist, Aber Sie können die `ELECTRON_ENABLE_LOGGING` Umgebungsvariable festlegen, um den gleichen Effekt zu erzielen.

## --force-fieldtrials=`trials`

Feldversuche, die zwangsweise aktiviert oder deaktiviert werden können.

Zum Beispiel: `WebRTC-Audio-Red-For-Opus/Enabled/`

### --host-rules=`rules`

A comma-separated list of `rules` that control how hostnames are mapped.

Ein Beispiel:

* `MAP * 127.0.0.1` Erzwingt die Zuordnung aller Hostnamen zu 127.0.0.1
* `MAP *.google.com proxy` Erzwingt, dass alle google.com Subdomains aufgelöst werden, um "Proxy" zu .
* `MAP test.com [::1]:77` Erzwingt "test.com", um in IPv6-Loopback zu lösen. Wird auch den Port der resultierenden Socketadresse auf 77 zwingen.
* `MAP * baz, EXCLUDE www.google.com` ordnet alles "baz" neu zu, mit Ausnahme "www.google.com".

These mappings apply to the endpoint host in a net request (the TCP connect and host resolver in a direct connection, and the `CONNECT` in an HTTP proxy connection, and the endpoint host in a `SOCKS` proxy connection).

### --host-resolver-rules=`rules`

Like `--host-rules` but these `rules` only apply to the host resolver.

### --ignore-certificate-errors

Ignores certificate related errors.

### --ignore-connections-limit=`domains`

Ignore the connections limit for `domains` list separated by `,`.

### --js-flags=`flags`

Specifies the flags passed to the Node.js engine. It has to be passed when starting Electron if you want to enable the `flags` in the main process.

```sh
$ Elektron --js-flags="--harmony_proxies --harmony_collections" your-app
```

See the [Node.js documentation][node-cli] or run `node --help` in your terminal for a list of available flags. Additionally, run `node --v8-options` to see a list of flags that specifically refer to Node.js's V8 JavaScript engine.

### --lang

Set a custom locale.

### --log-net-log=`path`

Enables net log events to be saved and writes them to `path`.

### --no-proxy-server

Don't use a proxy server and always make direct connections. Overrides any other proxy server flags that are passed.

### --no-sandbox

Disables Chromium sandbox, which is now enabled by default. Should only be used for testing.

### --proxy-bypass-list=`hosts`

Instructs Electron to bypass the proxy server for the given semi-colon-separated list of hosts. This flag has an effect only if used in tandem with `--proxy-server`.

Ein Beispiel:

```javascript
const { app } = require('electron')
app.commandLine.appendSwitch('proxy-bypass-list', '<local>;*.google.com;*foo.com;1.2.3.4:5678')
```

Will use the proxy server for all hosts except for local addresses (`localhost`, `127.0.0.1` etc.), `google.com` subdomains, hosts that contain the suffix `foo.com` and anything at `1.2.3.4:5678`.

### --proxy-pac-url=`url`

Uses the PAC script at the specified `url`.

### --proxy-server=`address:port`

Use a specified proxy server, which overrides the system setting. This switch only affects requests with HTTP protocol, including HTTPS and WebSocket requests. It is also noteworthy that not all proxy servers support HTTPS and WebSocket requests. The proxy URL does not support username and password authentication [per Chromium issue](https://bugs.chromium.org/p/chromium/issues/detail?id=615947).

### --remote-debugging-port=`port`

Enables remote debugging over HTTP on the specified `port`.

### --v=`log_level`

Gives the default maximal active V-logging level; 0 is the default. Normally positive values are used for V-logging levels.

This switch only works when `--enable-logging` is also passed.

### --vmodule=`pattern`

Gives the per-module maximal V-logging levels to override the value given by `--v`. z.B. `my_module=2,foo*=3` would change the logging level for all code in source files `my_module.*` and `foo*.*`.

Any pattern containing a forward or backward slash will be tested against the whole pathname and not only the module. z.B. `*/foo/bar/*=2` would change the logging level for all code in the source files under a `foo/bar` directory.

This switch only works when `--enable-logging` is also passed.

### --force_high_performance_gpu

Force using discrete GPU when there are multiple GPUs available.

### --force_low_power_gpu

Force using integrated GPU when there are multiple GPUs available.

## Node.js Flags

Electron supports some of the [CLI flags][node-cli] supported by Node.js.

**Note:** Passing unsupported command line switches to Electron when it is not running in `ELECTRON_RUN_AS_NODE` will have no effect.

### --inspect-brk[=[host:]port]

Activate inspector on host:port and break at start of user script. Default host:port is 127.0.0.1:9229.

Aliased to `--debug-brk=[host:]port`.

### --inspect-port=[host:]port

Set the `host:port` to be used when the inspector is activated. Useful when activating the inspector by sending the SIGUSR1 signal. Default host is `127.0.0.1`.

Aliased to `--debug-port=[host:]port`.

### --inspect[=[host:]port]

Activate inspector on `host:port`. Default is `127.0.0.1:9229`.

V8 inspector integration allows tools such as Chrome DevTools and IDEs to debug and profile Electron instances. The tools attach to Electron instances via a TCP port and communicate using the [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/).

See the [Debugging the Main Process][debugging-main-process] guide for more details.

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
