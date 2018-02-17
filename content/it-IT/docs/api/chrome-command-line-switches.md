# Opzioni di Chrome supportate da riga di comando

> La linea di comando cambia a supportata da Electron.

Puoi usare [app.commandLine.appendSwitch](app.md#appcommandlineappendswitchswitch-value) per aggiungerle nello script principale della tua app prima che sia emesso l' evento [ready](app.md#event-ready) del modulo [app](app.md):

```javascript
const {app} = require('electron')
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

## --ispeziona=`porta` e --ispeziona-brk=`porta`

Segnalazioni relative al debug, vedi la guida [Processi Principali di Debugging](../tutorial/debugging-main-process.md) per dettagli.

## --porta-debugging-remoto=`porta`

Abilita debugging remoto oltre HTTP sulla `porta` specificata.

## --disk-cache-size=`size`

Forza lo spazio massimo su disco da utilizzare dalla cache del disco, in byte.

## --js-flags=flags

Specifica i flag passati all engine Node JS. Deve essere passato all'avvio di Electron, se si desidera abilitare il `flag` nel processo principale (main process).

```bash
$ electron --js-flags="--harmony_proxies --harmony_collections" your-app
```

Vedere la [Documentazione di Node Js](https://nodejs.org/api/cli.html) o lanciare da terminale il comando `node --help` per ottenere la lista dei flag disponibili. Additionally, run `node --v8-options` to see a list of flags that specifically refer to Node's V8 JavaScript engine.

## --proxy-server=`address:port`

Utilizzare un server proxy specificato, che sostituisce l'impostazione di sistema. Questa opzione riguarda solo le richieste con protocollo HTTP, inclusi HTTPS e WebSocket. It is also noteworthy that not all proxy servers support HTTPS and WebSocket requests.

## --proxy-bypass-list=`hosts`

Indica ad Electron di "bypassare" il server proxy, per l'elenco degli host forniti separati da punto e virgola. Questo flag ha effetto solo se usato in tandem con `--proxy-server`.

Ad esempio:

```javascript
const {app} = require('electron')
app.commandLine.appendSwitch('proxy-bypass-list', '<local>;*.google.com;*foo.com;1.2.3.4:5678')
```

Will use the proxy server for all hosts except for local addresses (`localhost`, `127.0.0.1` etc.), `google.com` subdomains, hosts that contain the suffix `foo.com` and anything at `1.2.3.4:5678`.

## --proxy-pac-url=`url`

Utilizza lo script di PAC all' `url` specificato.

## --no-proxy-server

Don't use a proxy server and always make direct connections. Overrides any other proxy server flags that are passed.

## --host-rules=`rules`

A comma-separated list of `rules` that control how hostnames are mapped.

Ad esempio:

* `MAP * 127.0.0.1` Forces all hostnames to be mapped to 127.0.0.1
* `MAP *.google.com proxy` Forces all google.com subdomains to be resolved to "proxy".
* `MAP test.com [::1]:77` Forces "test.com" to resolve to IPv6 loopback. Will also force the port of the resulting socket address to be 77.
* `MAP * baz, EXCLUDE www.google.com` Remaps everything to "baz", except for "www.google.com".

These mappings apply to the endpoint host in a net request (the TCP connect and host resolver in a direct connection, and the `CONNECT` in an HTTP proxy connection, and the endpoint host in a `SOCKS` proxy connection).

## --host-resolver-rules=`rules`

Come `--host-rules` ma queste `regole` si applicano solo al resolver host.

## --auth-server-whitelist=`url`

Un elenco di server separati da virgola per i quali è abilitata l'autenticazione integrata.

Ad esempio:

```bash
--auth-server-whitelist='*example.com, *foobar.com, *baz'
```

per cui qualsiasi `url` che termina con `example.com`, `foobar.com`, `baz` verrà preso in considerazione per l'autenticazione integrata. Senza il prefisso `*` l'Url deve corrispondere esattamente.

## --auth-negotiate-delegate-whitelist=`url`

Un elenco di server separato da virgole, per il quale è necessaria la delega delle credenziali utente. Senza il prefisso `*`, l url deve corrispondere esattamente.

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