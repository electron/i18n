# Supported Command Line Switches

> Ang Command line switches ay sinusuportahan ng Electron.

Maaari mong gamitin ang [app.commandLine.appendSwitch][append-switch] upang idagdag ito sa iyong app's ang iyong pangunahing script bago ang [ready][ready] event ng [app][app] modyul ay emitted:

```javascript
const { app } = require('electron')
app.commandLine.appendSwitch('remote-debugging-port', '8315')
app.commandLine.appendSwitch('host-rules', 'MAP * 127.0.0.1')

app.whenReady().then(() => {
  // Your code here
})
```

## Electron CLI Flags

### --auth-server-whitelist=`url`

Ang kuwit ang nag hihiwalay sa listahan ng mga servers para paganahin ang integrated authentication.

Halimbawa ng:

```sh
--auth-server-whitelist='*example.com, *foobar.com, *baz'
```

ang anumang `url` na nagtatapos sa `example.com`,`foobar.com`, `baz` ay isinaalang-alang Para sa pinagsama-samang pag papatunay. Without `*` prefix the URL has to match exactly.

### --auth-negotiate-delegate-whitelist=`url`

A comma-separated list of servers for which delegation of user credentials is required. Without `*` prefix the URL has to match exactly.

### --disable-ntlm-v2

Disables NTLM v2 for posix platforms, no effect elsewhere.

### --disable-http-cache

Wag paganahin ang disk cache para sa kahilingan ng HTTP.

### --disable-http2

Huwag paganahin ang HTTP/2 at SPDY/3.1 protocol.

### --disable-renderer-backgrounding

Pinipigilan ang Chromium mula sa pagpapababa ng priyoridad ng renderer ng mga pahina na hindi nakikita sa proseso.

Etong flag ay pangkalahatang proseso ng renderer. at kung gusto mong wag paganahin ang throtting ng isang window, maaari mong kunin ang hack ng [playing silent audio][play-silent-audio].

### --disk-cache-size=`size`

Gamitin ang pinakamataas na bakante ng disk cache, na magagamit, sa byte.

### --enable-api-filtering-logging

Enables caller stack logging for the following APIs (filtering events):
- `desktopCapturer.getSources()` / `desktop-capturer-get-sources`
- `remote.require()` / `remote-require`
- `remote.getGlobal()` / `remote-get-builtin`
- `remote.getBuiltin()` / `remote-get-global`
- `remote.getCurrentWindow()` / `remote-get-current-window`
- `remote.getCurrentWebContents()` / `remote-get-current-web-contents`

### --Enable-logging

Itala ang mga log ng Chromium's sa console.

Ang Switch na ito ay hindi pwedeng magamit ng `app.commandLine.appendSwitch` dahil ito ay parsed na mas maaga kaysa sa mga gumagamit ng app, ngunit maaari mong i-talaga ang `ELECTRON_ENABLE_LOGGING` sa paligid variable upang makamtan ang parehong epekto nito.

### --host-rules=`rules`

Ang kuwit ay nag hihiwalay sa listan ng `rules` na nag kokontrol kung paano ang hostname ay itinalaga.

Halimbawa:

* `MAP * 127.0.0.1` kailangang gawin na ang lahat ng hostname ay 127.0.0.1
* `MAP *.google.com proxy` kailangang lahat ng google.com subdomains ay maresolbahan ng "proxy".
* `MAP test.com [::1]:77` Forces "test.com" to resolve to IPv6 loopback. Will also force the port of the resulting socket address to be 77.
* `MAP * baz http, ibukod ang www.google.com` ilipat sa lahat ng bagay na may "baz http", maliban sa "www.google.com".

Ang pag mappings ay inaaplay sa dulo ng host. sa kahilingan ng net (ang TCP kumonekta at mag-host ng resolver ay isang direktang koneksyon, at ang `CONNECT` sa koneksiyon ng HTTP proxy connection, at ang dulo ng host sa `SOCKS` proxy connection).

### --host-resolver-rules=`rules`

Gusto ng `--host-rules` subalit ang `rules` ay maaplay lamang sa host resolver.

### --ignore-certificate-errors

Balewalain ang sertipiko na may kaugnay sa mga pagkakamali.

### --ignore-connections-limit=`domains`

Ipagsawalang bahala ang limitasyon ng koneksyon para sa `domains` bukod na listahan ng `,`.

### --js-flags=`flags`

Specifies the flags passed to the Node.js engine. It has to be passed when starting Electron if you want to enable the `flags` in the main process.

```sh
$ electron --js-flags="--harmony_proxies --harmony_collections" your-app
```

See the [Node.js documentation][node-cli] or run `node --help` in your terminal for a list of available flags. Additionally, run `node --v8-options` to see a list of flags that specifically refer to Node.js's V8 JavaScript engine.

### --lang

Set a custom locale.

### --log-net-log=`path`

Paganahin ang net log ng mga nangyari isulat at i-save sila sa `path`.

### --no-proxy-server

Don't use a proxy server and always make direct connections. Overrides any other proxy server flags that are passed.

### --no-sandbox

Disables Chromium sandbox, which is now enabled by default. Should only be used for testing.

### --proxy-bypass-list=`hosts`

Instructs Electron to bypass the proxy server for the given semi-colon-separated list of hosts. This flag has an effect only if used in tandem with `--proxy-server`.

Halimbawa:

```javascript
const { app } = require('electron')
app.commandLine.appendSwitch('proxy-bypass-list', '<local>;*.google.com;*foo.com;1.2.3.4:5678')
```

Gamitin ang proxy server sa lahat ng host, maliban sa local address (`localhost`, `127.0.0.1` etc.), `google.com` subdomains, ang host na nag lalaman ng suffix na `foo.com` at kahit ano sa `1.2.3.4:5678`.

### --proxy-pac-url=`url`

Gumagamit ng mga PAC script at tukuyin ang `url`.

### --proxy-server=`address:port`

Gumamit ng isang uri ng proxy server, para mapatungan ang system setting. Lumipat lamang kung nakakaapekto ang request ng HTTP protocol, pati na ang HTTPS at WebSocker request. Maaring kapansin-pansin na ang lahat ng proxy servers ay sumusuporta sa HTTPS at sa hiling ng WebSocket. The proxy URL does not support username and password authentication [per Chromium issue](https://bugs.chromium.org/p/chromium/issues/detail?id=615947).

### --remote-debugging-port=`port`

Paganahin ang remote debugging bago ang HTTP sa pag tukoy sa `port`.

### --ppapi-flash-path=`path`

Italaga ang `path` para sa plugin ng pepper flash.

### --ppapi-flash-version=`version`

Italaga ang `version` para sa plugin ng pepper flash.

### --v=`log_level`

Gives the default maximal active V-logging level; 0 is the default. Normally positive values are used for V-logging levels.

Ang pagpapalit nato ay gagana lamang kapag ang `--enable-logging` ay tapos na.

### --vmodule=`pattern`

Binigyan ang kada-modyul ng mainam na antas ng V-logging para i-override ang halaga na binigay ng `--v`. Halimbawa. `my_module=2,foo*=3` would change the logging level for all code in source files `my_module.*` and `foo*.*`.

Any pattern containing a forward or backward slash will be tested against the whole pathname and not only the module. Halimbawa. `*/foo/bar/*=2` would change the logging level for all code in the source files under a `foo/bar` directory.

Ang pagpapalit nato ay gagana lamang kapag ang `--enable-logging` ay tapos na.

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
[append-switch]: app.md#appcommandlineappendswitchswitch-value
[ready]: app.md#event-ready
[play-silent-audio]: https://github.com/atom/atom/pull/9485/files
[debugging-main-process]: ../tutorial/debugging-main-process.md
[node-cli]: https://nodejs.org/api/cli.html
[node-cli]: https://nodejs.org/api/cli.html
