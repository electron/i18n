# Opzioni di Chrome supportate da riga di comando

> La Command line switches è supportata da Electron.

Puoi usare [app.commandLine.appendSwitch](app.md#appcommandlineappendswitchswitch-value) per aggiungerlo nello script principale della tua app prima che sia emesso l' evento [ready](app.md#event-ready) del modulo [app](app.md):

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

## --lang

Set a custom locale.

## --ispeziona=`porta` e --ispeziona-brk=`porta`

Segnalazioni relative al debug, vedi la guida [Processi Principali di Debugging](../tutorial/debugging-main-process.md) per dettagli.

## --porta-debugging-remoto=`porta`

Abilita debugging remoto oltre HTTP sulla `porta` specificata.

## --disk-cache-size=`size`

Forza lo spazio massimo su disco da utilizzare dalla cache del disco, in byte.

## --js-flags=flags

Specifica i flag passati all engine Node JS. Deve essere passato all'avvio di Electron, se si desidera abilitare il `flag` nel processo principale (main process).

```sh
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

Un elenco di regole separate da virgole che controllano il modo in cui i nomi degli host sono mappati.

Ad esempio:

* MAP * 127.0.0.1 Forza tutti gli hostname a mappare su 127.0.0.1
* MAP *.google.com proxy Forza tutti i sottodomini google.com da risolvere in "proxy".
* MAP test.com [:: 1]: 77 Forza "test.com" per risolvere il loopback IPv6. Forzerà anche la porta dell'indirizzo socket risultante a 77.
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

per cui qualsiasi `url` che termina con `example.com`, `foobar.com`, `baz` verrà preso in considerazione per l'autenticazione integrata. Senza il prefisso `*` l'Url deve corrispondere esattamente.

## --auth-negotiate-delegate-whitelist=`url`

Un elenco di server separato da virgole, per il quale è necessaria la delega delle credenziali utente. Senza il prefisso `*`, l url deve corrispondere esattamente.

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

Fornisce il massimo livello di V-logging attivo predefinito; 0 è il valore predefinito. I valori di norma positivi vengono utilizzati per i livelli di registrazione V (*V-logging levels*).

Questa opzione funziona solo quando viene passato anche `--enable-logging`.

## --vmodule=`pattern`

Fornisce i livelli massimi di V-logging per modulo, per sovrascrivere il valore fornito da `--v`. E.g. `my_module=2,foo*=3` would change the logging level for all code in source files `my_module.*` and `foo*.*`.

Qualsiasi pattern contenente una barra avanti o indietro (forward e back slash) verrà testato rispetto all'intero percorso e non solo al modulo. Ad esempio. `*/foo/bar/*=2` cambierebbe il livello di logging per tutto il codice sorgente nei file all interno della directory `foo/bar`.

Questa opzione funziona solo quando viene passato anche `--enable-logging`.