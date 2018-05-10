# Differenze tecniche tra Electron e NW.js (formalmente node-webkit)

**Nota: Electron in precedenza veniva chiamato Atom Shell.**

Similmente a NW.js, Electron fornisce una piattaforma per scrivere applicazioni desktop in JavaScript e HTML con integrazioni in Node.js per garantire accesso al sistema dalle pagine web.

Ma ci sono anche differenze fondamentali tra i due progetti che rendono Electron un prodotto nettamente diverso da NW.js:

**1. Entry point dell'applicazione**

In NW.js l'entry point principale di un'applicazione è una web page o un script JS. Quindi all'interno del `package.json` viene specificato o un file html o un file js e verrà caricato in una finertra del browser come finestra principale (in caso di un entrypoint html) oppure verrà eseguito lo script.

In Electron l'entry point è uno script JavaScript. Invece di fornire direttamente un URL è necessario creare manualmente una finestra del browser e caricare un file HTML utilizzando l'API. Inoltre è anche necessario mettersi in ascolto per gli eventi della finestra in modo da poter decidere quando chiudere l'applicazione.

Electron funziona più similmente al runtime di Node.js. Le API di Electron funzionano ad un livello piu basso di sistema, in questo modo si possono utilizzare per testing al posto di [PhantomJS](http://phantomjs.org/).

**2. Build System**

Per ovviare la complessità di compilare l'intero Chromium, Electron usa [`libchromiumcontent`](https://github.com/electron/libchromiumcontent) per accedere alle Chromium's Content API. `libchromiumcontent` è una singola libreria condivisa che include il modulo Chromium Content e tutte le sue dipendenze. Gli utenti non avrano necessita di hardware prestante per compilare Electron.

**3. Integrazioni con Node**

In NW.js, le integrazioni tra Node e le pagine web richiedono di applicare patch a Chromium al fine di poter funzionare, in Electron invece abbiamo scelto un modo diverso per integrare i cicli libuv con i cicli di messaggi di ogni piattaforma in modo da evitare hacking a Chromium. Vedi anche i sorgenti di [`node_bindings`](https://github.com/electron/electron/tree/master/atom/common) per vedere in dettaglio come abbiamo fatto.

**4. Multi-context**

Se sei un utente NW.js con esperienza ti dovrebbe essere familiare il concetto di Contesto Node e Contesto Web. Questi concetti sono stati inventati per venire incontro al modo in cui è stato implementato NW.js.

By using the [multi-context](https://github.com/nodejs/node-v0.x-archive/commit/756b622) feature of Node, Electron doesn't introduce a new JavaScript context in web pages.

Note: NW.js has optionally supported multi-context since 0.13.