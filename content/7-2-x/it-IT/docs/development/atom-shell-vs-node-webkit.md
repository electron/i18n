# Differenze tecniche tra Electron e NW.js (formalmente node-webkit)

__Nota: Electron in precedenza veniva chiamato Atom Shell.__

Similmente a NW.js, Electron fornisce una piattaforma per scrivere applicazioni desktop in JavaScript e HTML con integrazioni in Node.js per garantire accesso al sistema dalle pagine web.

Ma ci sono anche differenze fondamentali tra i due progetti che rendono Electron un prodotto nettamente diverso da NW.js:

__1. Entry point dell'applicazione__

In NW.js l'entry point principale di un'applicazione è una web page o un script JS. Quindi all'interno del `package.json` viene specificato o un file html o un file js e verrà caricato in una finertra del browser come finestra principale (in caso di un entrypoint html) oppure verrà eseguito lo script.

In Electron l'entry point è uno script JavaScript. Invece di fornire direttamente un URL è necessario creare manualmente una finestra del browser e caricare un file HTML utilizzando l'API. Inoltre è anche necessario mettersi in ascolto per gli eventi della finestra in modo da poter decidere quando chiudere l'applicazione.

Electron works more like the Node.js runtime. Electron's APIs are lower level so you can use it for browser testing in place of [PhantomJS](http://phantomjs.org/).

__2. Build System__

Per ovviare la complessità di compilare l'intero Chromium, Electron usa [`libchromiumcontent`](https://github.com/electron/libchromiumcontent) per accedere alle Chromium's Content API. `libchromiumcontent` è una singola libreria condivisa che include il modulo Chromium Content e tutte le sue dipendenze. Gli utenti non avrano necessita di hardware prestante per compilare Electron.

__3. Integrazioni con Node__

In NW.js, le integrazioni tra Node e le pagine web richiedono di applicare patch a Chromium al fine di poter funzionare, in Electron invece abbiamo scelto un modo diverso per integrare i cicli libuv con i cicli di messaggi di ogni piattaforma in modo da evitare hacking a Chromium. Vedi anche i sorgenti di [`node_bindings`](https://github.com/electron/electron/tree/master/atom/common) per vedere in dettaglio come abbiamo fatto.

__4. Multi-context__

If you are an experienced NW.js user, you should be familiar with the concept of Node context and web context. These concepts were invented because of how NW.js was implemented.

Utilizzando la feature [multi-context](https://github.com/nodejs/node-v0.x-archive/commit/756b622) di Node, Electron non introduce un nuovo contesto JavaScript nelle pagine web.

Nota: NW.js ha introdotto il supporto opzionale per multi-context dalla versione 0.13.
