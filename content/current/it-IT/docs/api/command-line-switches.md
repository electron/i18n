# Opzioni della linea di comando supportate

> La Command line switches è supportata da Electron.

Puoi usare [app.commandLine.appendSwitch](app.md#appcommandlineappendswitchswitch-value) per aggiungerlo nello script principale della tua app prima che sia emesso l' evento [ready](app.md#event-ready) del modulo [app](app.md):

```javascript
const { app } = require('electron')
app.commandLine.appendSwitch('remote-debugging-port', '8315')
app.commandLine.appendSwitch('host-rules', 'MAP * 127.0.0.1')

app.on('ready', () =>  {
  // Il tuo codice va qui
})
```

## --ignora-limite-connessione=`dominio`

Ignora il limite di connessioni per la lista dei `domini` separati da `,`.

## --disabilita-cache-http

Disabilita la cache del disco per le richieste HTTP.

## --disabilita-http2

Disabilita protocolli HTTP/2 e SPDY/3.1.

## --lang

Set a custom locale.

## --ispeziona=`porta` e --ispeziona-brk=`porta`

Segnalazioni relative al debug, vedi la guida [Processi Principali di Debugging](../tutorial/debugging-main-process.md) per dettagli.

## --porta-debugging-remoto=`porta`

Abilita debugging remoto oltre HTTP sulla `porta` specificata.

## --disk-cache-size=`size`

Forza lo spazio massimo su disco da utilizzare dalla cache del disco, in byte.

## --js-flags=flags

Specifies the flags passed to the Node.js engine. It has to be passed when starting Electron if you want to enable the `flags` in the main process.

```sh
$ electron --js-flags="--harmony_proxies --harmony_collections" your-app
```

See the [Node.js documentation](https://nodejs.org/api/cli.html) or run `node --help` in your terminal for a list of available flags. Additionally, run `node --v8-options` to see a list of flags that specifically refer to Node.js's V8 JavaScript engine.

## --proxy-server=`address:port`

Utilizzare un server proxy specificato, che sostituisce l'impostazione di sistema. Questa opzione riguarda solo le richieste con protocollo HTTP, inclusi HTTPS e WebSocket. It is also noteworthy that not all proxy servers support HTTPS and WebSocket requests. The proxy URL does not support username and password authentication [per Chromium issue](https://bugs.chromium.org/p/chromium/issues/detail?id=615947).

## --proxy-bypass-list=`hosts`

Instructs Electron to bypass the proxy server for the given semi-colon-separated list of hosts. This flag has an effect only if used in tandem with `--proxy-server`.

Ad esempio:

```javascript
const { app } = require('electron')
app.commandLine.appendSwitch('proxy-bypass-list', '<local>;*.google.com;*foo.com;1.2.3.4:5678')
```

Will use the proxy server for all hosts except for local addresses (`localhost`, `127.0.0.1` etc.), `google.com` subdomains, hosts that contain the suffix `foo.com` and anything at `1.2.3.4:5678`.

## --proxy-pac-url=`url`

Utilizza lo script di PAC all' `url` specificato.

## --no-proxy-server

Don't use a proxy server and always make direct connections. Overrides any other proxy server flags that are passed.

## --host-rules=`rules`

Un elenco di regole separate da virgole che controllano il modo in cui i nomi degli host sono mappati.

Ad esempio:

* MAP * 127.0.0.1 Forza tutti gli hostname a mappare su 127.0.0.1
* MAP *.google.com proxy Forza tutti i sottodomini google.com da risolvere in "proxy".
* `MAP test.com [::1]:77` Forces "test.com" to resolve to IPv6 loopback. Will also force the port of the resulting socket address to be 77.
* MAP * baz, EXCLUDE www.google.com Rimappa tutto in "baz", ad eccezione di "www.google.com".

Questi mapping si applicano all'host dell'endpoint in una richiesta net (il TCP connect e il resolver host in una connessione diretta e CONNECT in una connessione proxy HTTP e l'host endpoint in una connessione proxy SOCKS).

## --host-resolver-rules=`rules`

Come `--host-rules` ma queste `regole` si applicano solo al resolver host.

## --auth-server-whitelist=`url`

Un elenco di server separati da virgola per i quali è abilitata l'autenticazione integrata.

Ad esempio:

```sh
--auth-server-whitelist='*example.com, *foobar.com, *baz'
```

per cui qualsiasi `url` che termina con `example.com`, `foobar.com`, `baz` verrà preso in considerazione per l'autenticazione integrata. Without `*` prefix the URL has to match exactly.

## --auth-negotiate-delegate-whitelist=`url`

A comma-separated list of servers for which delegation of user credentials is required. Without `*` prefix the URL has to match exactly.

## --ignore-certificate-errors

Ignora gli errori di certificato correlati.

## --ppapi-flash-path=`path`

Imposta il `percorso` del plugin flash pepper.

## --ppapi-flash-version=`version`

Imposta la `versione` del plugin flash pepper.

## --log-net-log=`path`

Consente di salvare gli eventi del registro di rete e li scrive sul percorso.

## --disable-renderer-backgrounding

Impedisce a Chromium di ridurre la priorità dei processi di rendering delle pagine invisibili.

Questo flag è globale per tutti i processi di rendering, se si desidera disattivare la limitazione delle richieste in un'unica finestra, si può prendere l'hack di [playing silent audio.](https://github.com/atom/atom/pull/9485/files).

## --enable-logging

Stampa il logging di Chromium in console.

Questa opzione non può essere utilizzata in `app.commandLine.appendSwitch` poiché viene analizzata prima del caricamento dell' `app` dell utente, ma puoi impostare la variabile di ambiente ELECTRON_ENABLE_LOGGING per ottenere lo stesso effetto.

## --v=`log_level`

Gives the default maximal active V-logging level; 0 is the default. Normally positive values are used for V-logging levels.

Questa opzione funziona solo quando viene anche eseguito il *--enable-logging*.

## --vmodule=`pattern`

Fornisce i livelli massimi di V-logging per modulo, per sovrascrivere il valore fornito da `--v`. E.g. `my_module=2,foo*=3` would change the logging level for all code in source files `my_module.*` and `foo*.*`.

Any pattern containing a forward or backward slash will be tested against the whole pathname and not only the module. Ad esempio. `*/foo/bar/*=2` cambierebbe il livello di logging per tutto il codice sorgente nei file all interno della directory `foo/bar`.

Questa opzione funziona solo quando viene anche eseguito il *--enable-logging*.

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
