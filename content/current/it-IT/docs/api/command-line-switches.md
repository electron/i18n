# Opzioni della linea di comando supportate

> La Command line switches è supportata da Electron.

Puoi usare [app.commandLine.appendSwitch](app.md#appcommandlineappendswitchswitch-value) per aggiungerlo nello script principale della tua app prima che sia emesso l' evento [ready](app.md#event-ready) del modulo [app](app.md):

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

Un elenco di server separati da virgola per i quali è abilitata l'autenticazione integrata.

Ad esempio:

```sh
--auth-server-whitelist='*example.com, *foobar.com, *baz'
```

per cui qualsiasi `url` che termina con `example.com`, `foobar.com`, `baz` verrà preso in considerazione per l'autenticazione integrata. Without `*` prefix the URL has to match exactly.

### --auth-negotiate-delegate-whitelist=`url`

A comma-separated list of servers for which delegation of user credentials is required. Without `*` prefix the URL has to match exactly.

### --disable-ntlm-v2

Disables NTLM v2 for posix platforms, no effect elsewhere.

### --disabilita-cache-http

Disabilita la cache del disco per le richieste HTTP.

### --disabilita-http2

Disabilita protocolli HTTP/2 e SPDY/3.1.

### --disable-renderer-backgrounding

Impedisce a Chromium di ridurre la priorità dei processi di rendering delle pagine invisibili.

Questo flag è globale per tutti i processi di rendering, se si desidera disattivare la limitazione delle richieste in un'unica finestra, si può prendere l'hack di [playing silent audio.](https://github.com/atom/atom/pull/9485/files).

### --disk-cache-size=`size`

Forza lo spazio massimo su disco da utilizzare dalla cache del disco, in byte.

### --enable-api-filtering-logging

Enables caller stack logging for the following APIs (filtering events):
- `desktopCapturer.getSources()` / `desktop-capturer-get-sources`
- `remote.require()` / `remote-require`
- `remote.getGlobal()` / `remote-get-builtin`
- `remote.getBuiltin()` / `remote-get-global`
- `remote.getCurrentWindow()` / `remote-get-current-window`
- `remote.getCurrentWebContents()` / `remote-get-current-web-contents`

### --enable-logging

Stampa il logging di Chromium in console.

Questa opzione non può essere utilizzata in `app.commandLine.appendSwitch` poiché viene analizzata prima del caricamento dell' `app` dell utente, ma puoi impostare la variabile di ambiente ELECTRON_ENABLE_LOGGING per ottenere lo stesso effetto.

### --host-rules=`rules`

Un elenco di regole separate da virgole che controllano il modo in cui i nomi degli host sono mappati.

Ad esempio:

* MAP * 127.0.0.1 Forza tutti gli hostname a mappare su 127.0.0.1
* MAP *.google.com proxy Forza tutti i sottodomini google.com da risolvere in "proxy".
* `MAP test.com [::1]:77` Forces "test.com" to resolve to IPv6 loopback. Will also force the port of the resulting socket address to be 77.
* MAP * baz, EXCLUDE www.google.com Rimappa tutto in "baz", ad eccezione di "www.google.com".

Questi mapping si applicano all'host dell'endpoint in una richiesta net (il TCP connect e il resolver host in una connessione diretta e CONNECT in una connessione proxy HTTP e l'host endpoint in una connessione proxy SOCKS).

### --host-resolver-rules=`rules`

Come `--host-rules` ma queste `regole` si applicano solo al resolver host.

### --ignore-certificate-errors

Ignora gli errori di certificato correlati.

### --ignora-limite-connessione=`dominio`

Ignora il limite di connessioni per la lista dei `domini` separati da `,`.

### --js-flags=flags

Specifies the flags passed to the Node.js engine. It has to be passed when starting Electron if you want to enable the `flags` in the main process.

```sh
$ electron --js-flags="--harmony_proxies --harmony_collections" your-app
```

See the [Node.js documentation](https://nodejs.org/api/cli.html) or run `node --help` in your terminal for a list of available flags. Additionally, run `node --v8-options` to see a list of flags that specifically refer to Node.js's V8 JavaScript engine.

### --lang

Set a custom locale.

### --log-net-log=`path`

Consente di salvare gli eventi del registro di rete e li scrive sul percorso.

### --no-proxy-server

Don't use a proxy server and always make direct connections. Overrides any other proxy server flags that are passed.

### --no-sandbox

Disables Chromium sandbox, which is now enabled by default. Should only be used for testing.

### --proxy-bypass-list=`hosts`

Instructs Electron to bypass the proxy server for the given semi-colon-separated list of hosts. This flag has an effect only if used in tandem with `--proxy-server`.

Ad esempio:

```javascript
const { app } = require('electron')
app.commandLine.appendSwitch('proxy-bypass-list', '<local>;*.google.com;*foo.com;1.2.3.4:5678')
```

Will use the proxy server for all hosts except for local addresses (`localhost`, `127.0.0.1` etc.), `google.com` subdomains, hosts that contain the suffix `foo.com` and anything at `1.2.3.4:5678`.

### --proxy-pac-url=`url`

Utilizza lo script di PAC all' `url` specificato.

### --proxy-server=`address:port`

Utilizzare un server proxy specificato, che sostituisce l'impostazione di sistema. Questa opzione riguarda solo le richieste con protocollo HTTP, inclusi HTTPS e WebSocket. It is also noteworthy that not all proxy servers support HTTPS and WebSocket requests. The proxy URL does not support username and password authentication [per Chromium issue](https://bugs.chromium.org/p/chromium/issues/detail?id=615947).

### --porta-debugging-remoto=`porta`

Abilita debugging remoto oltre HTTP sulla `porta` specificata.

### --ppapi-flash-path=`path`

Imposta il `percorso` del plugin flash pepper.

### --ppapi-flash-version=`version`

Imposta la `versione` del plugin flash pepper.

### --v=`log_level`

Gives the default maximal active V-logging level; 0 is the default. Normally positive values are used for V-logging levels.

Questa opzione funziona solo quando viene passato anche `--enable-logging`.

### --vmodule=`pattern`

Fornisce i livelli massimi di V-logging per modulo, per sovrascrivere il valore fornito da `--v`. E.g. `my_module=2,foo*=3` would change the logging level for all code in source files `my_module.*` and `foo*.*`.

Any pattern containing a forward or backward slash will be tested against the whole pathname and not only the module. Ad esempio. `*/foo/bar/*=2` cambierebbe il livello di logging per tutto il codice sorgente nei file all interno della directory `foo/bar`.

Questa opzione funziona solo quando viene passato anche `--enable-logging`.

## Node.js Flags

Electron supports some of the [CLI flags](https://nodejs.org/api/cli.html) supported by Node.js.

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

See the [Debugging the Main Process](../tutorial/debugging-main-process.md) guide for more details.

Aliased to `--debug[=[host:]port`.

### --inspect-publish-uid=stderr,http
Specify ways of the inspector web socket url exposure.

By default inspector websocket url is available in stderr and under /json/list endpoint on http://host:port/json/list.
