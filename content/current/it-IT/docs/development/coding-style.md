# Stile Codice

Queste sono le linee guida di stile per programmare in Electron.

Puoi eseguire `npm run lint` per mostrare ogni problema di stile rilevato da `cpplint` ed `eslint`.

## Codice Generale

* Concludi i file con una nuova riga.
* Metti richieste nel seguente ordine:
  * Costruito nei Moduli Nodo (come `path`)
  * Costruito in Moduli Electron (come `ipc`, `app`)
  * Moduli Locali (usando percorsi relativi)
* Metti proprietà di classe nel seguente ordine:
  * I metodi e le proprietà di classe (metodi avviati con una `@`)
  * Metodi e proprietà istanza
* Evita codice dipendente dalla piattaforma:
  * Usa `path.join()` per concatenare nomi file.
  * Usa `os.tmpdir()` invece che `/tmp` quando ti server fare riferimento alla directory temporanea.
* Using a plain `return` when returning explicitly at the end of a function.
  * Non `return null`, `return undefined`, `null` o `undefined`

## C++ e Python

Per C++ e Python, seguiamo lo [Stile di Programmazione](https://www.chromium.org/developers/coding-style) di Chromium. Puoi usare [clang-format](clang-format.md) per formattare automaticamente il codice C++. Esiste anche uno script `script/cpplint.py` per verificare se tutti i file sono conformi.

La versione Python che stiamo usando ora è Python 2.7.

Il codice C ++ utilizza molte delle astrazioni e dei tipi di Chromium, quindi è così raccomandato di conoscerli. Un buon posto per iniziare è il documento [Importanti Astrazioni e Strutture di Dati](https://www.chromium.org/developers/coding-style/important-abstractions-and-data-structures) di Chromium. Il documento menziona alcuni tipi speciali, i tipi di ambito (che rilasciano automaticamente la loro memoria quando escono dal campo di applicazione), i meccanismi di registrazione, ecc.

## Documentazione

* Scrivi lo stile di [osservazione](https://github.com/remarkjs/remark) markdown.

Puoi eseguire `npm run lint-docs` per assicurarti che le tue modifiche alla documentazione siano formattate corretamente.

## JavaScript

* Scrivi lo stile JavaScript [standard](https://npm.im/standard).
* I nomi dei file dovrebbero essere concatenati con `-` invece che `_`, es. `file-name.js` piuttosto che `file_name.js` perché i nomi modulo in [github/atom](https://github.com/github/atom) sono di solito in formato `module-name`. Questa regola si applica solo ai file `.js`.
* Usa la più nuova sintassi ES6/ES2015 dove appropriato
  * [`const`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const) per richieste ed altri costanti.  Se il valore è primitivo, usa il nome in maiuscolo (es. `contest NUMBER_OF_RETRIES = 5`).
  * [`let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let) per definire variabili
  * [Funzioni freccia](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) invece di `function () { }`
  * <9>Lettere template</a> invece della concatenazione della stringa usando `+`

## Nominare Cose

Le API di Electron usano lo stesso schema di capitalizzazione di Node.js:

- Quando il modulo stesso è una classe come `BrowserWindow`, usa `PascalCase`.
- Quando il modulo è un insieme di API, come `globalShortcut`, usa `camelCase`.
- Quando l'API è una proprietà d'oggetto, ed è complessa abbastanza da essere in un capitolo separato come `win.webContents`, usa `mixedCase`.
- Per altre API non modulo, usa titoli naturali, come `<webview> Tag` o `Oggetto Processo`.

Quando si crea una nuova API, è preferibile utilizzare le funzioni get e set invece dello stile di una funzione jQuery. Per esempio, `.getText()` e `.setText(text)` sono preferiti a `.text([text])`. C'è una [discussione](https://github.com/electron/electron/issues/46) su questo.
