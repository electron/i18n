# Glossario

Questa pagina definisce una terminologia comunemente utilizzata nello sviluppo di Electron.

### ASAR

ASAR è l'acronimo di Atom Shell Archive Format. Un archivio [asar][asar] è un formato tipo `tar` che concatena i file in un unico file. Electron può leggere file arbitrari da esso senza decomprimere l'intero file.

Il formato ASAR è stato creato principalmente per migliorare le prestazioni su Windows... TODO

### CRT

La libreria C Run-time (CRT) è parte della libreria C++ Standard che incorpora la libreria standard ISO C99. Le librerie Visual C++ che implementano lo sviluppo di codice nativo CRT, e sia misto nativo che gestito, e gestito puro per lo sviluppo .NET.

### DMG

Un'immagine Apple Disk è un formato di package utilizzato da macOS. I file DMG sono comunemente usati per distribuire gli "installer" dell'applicazione. [electron-builder][] supporta `dmg` come build target.

### IME

Input Method Editor. Un programma che consente agli utenti di immettere caratteri e simboli non trovati sulla tastiera. Ad esempio, questo consente agli utenti di tastiere latine di inserire caratteri cinesi, giapponesi, coreani e indiani.

### IDL

Lingua descrizione dell'interfaccia. Scrivere le firme della funzione e i tipi di dati in un formato che può essere utilizzato per generare interfacce in Java, C++, JavaScript, ecc.

### IPC

IPC è sinonimo di comunicazione interprocesso. Electron uses IPC to send serialized JSON messages between the [main][] and [renderer][] processes.

### libchromiumcontent

Una libreria condivisa che include il [modulo Contenuto Chromium][] e tutte le sue dipendenze (es. Blink, [V8][], etc.). Anche riferito come "libcc".

- [github.com/electron/libchromiumcontent](https://github.com/electron/libchromiumcontent)

### processo principale

The main process, commonly a file named `main.js`, is the entry point to every Electron app. It controls the life of the app, from open to close. Gestisce anche elementi nativi come il Menu, la Barra dei Menu, il Dock, il Tray, etc. The main process is responsible for creating each new renderer process in the app. The full Node API is built in.

Il file di processo principale di ogni app è specificato nella proprietà `principale` in `package.json`. Questo è il modo in cui `electron .` sa quale file eseguire all'avvio.

In Chromium, questo processo è indicato come il "processo del browser". È rinominato in Electron per evitare confusione con i processi di renderer.

Vedi anche: [processo](#process), [processo di rendering](#renderer-process)

### MAS

Acronimo per Mac App Store di Apple. For details on submitting your app to the MAS, see the [Mac App Store Submission Guide][].

### Mojo

Un sistema IPC per comunicare intra e inter processo, e ciò è importante perché Chrome è ansioso di dividere il proprio lavoro in processi separati o no, in base alle pressioni di memoria etc.

Vedi https://chromium.googlesource.com/chromium/src/+/master/mojo/README.md

### moduli nativi

I moduli nativi (anche chiamati [addon][] in Node.js) sono moduli scritti in C o C++ che possono essere caricati in Node.js o Electron usando la funzione require(), ed usati come fossero un modulo Node.js ordinario. Sono usati principalmente per fornire un'interfaccia tra JavaScript in esecuzione in Node.js e librerie C/C++.

I moduli Nodo Nativo sono supportati da Electron, ma essendo che Electron usa una versione V8 differente dal Nodo binario installato nel tuo sistema, devi specificare manualmente la posizione delle voci di Electron quando costruisci moduli nativi.

Vedi anche [Usare Moduli Nodo Nativo][].

### NSIS

Nullsoft Scriptable Install System è un Installatore basato su script che autorizza lo strumento per Microsoft Windows. Viene rilasciato sotto una combinazione di licenze software gratuite ed è largamente usato come alternativa a prodotti proprietari commerciali come InstallShield. [electron-builder][] supporta NSIS come target build.

### OSR

OSR (Off-screen rendering) può essere utilizzato per caricare la pagina pesante in sfondo e poi visualizzarla dopo (sarà molto più veloce). Ti permette di visualizzare la pagina senza mostrarla sullo schermo.

### process

Un processo è un'istanza di un programma che è in fase di esecuzione. Le app di Electron che fanno uso del processo [main][] e di uno o più processi [render][] stanno eseguendo in realtà numerosi programmi simultaneamente.

In Node.js ed Electron, ogni processo in esecuzione ha un oggetto `processo`. Questo oggetto è un globale che fornisce informazioni e controlla il processo corrente. Come globale, è sempre disponibile alle applicazioni senza usare require().

Vedi anche: [processo principale](#main-process), [processo di rendering](#renderer-process)

### processo di rendering

The renderer process is a browser window in your app. Unlike the main process, there can be multiple of these and each is run in a separate process. Possono anche essere nascosti.

Nei browser normali, le pagine web vengono eseguite in un ambiente circoscritto nel quale non è consentito l'accesso alle risorse native. Gli utenti di Electron, tuttavia, hanno il potere di usare le API di Node.js nelle pagine web consentendo interazioni di sistema operativo di livello inferiore.

Vedi anche: [processo](#process), [processo principale](#main-process)

### Squirrel

Squirrel è un framework open source che abilita le app Electron ad aggiornarsi automaticamente come nuove versioni sono rilasciate. Vedi l'API [autoUpdater][] per informazioni sull'iniziare con Squirrel.

### userland

Questo termine si è originato nella community Unix, dove "userland" o "userspace" si riferivano a programmi che si eseguono fuori dal kernel del sistema operativo. Più di recente, il termine è stato popolarizzato nella community di Node ed npm per distinguere tra funzioni disponibili nel "Nucleo Node" contro pacchetti pubblicati al registro npm dalla più grande comunità "utente".

Come Node, Electron si concentra sull'avere un piccolo set di API che fornisce tutte le primitive necessarie per lo sviluppo di applicazioni desktop multipiattaforma. Questa filosofia progettuale consente a Electron di rimanere uno strumento flessibile senza essere eccessivamente prescrittivo su come dovrebbe essere usato. Userland abilita gli utenti a creare e condividere strumenti che forniscono funzionalità aggiuntive oltre a quanto disponibile in "core".

### V8

V8 è il motore JavaScript open source di Google. È scritto in C++ ed è utilizzato in Google Chrome. V8 può essere eseguito standalone o può essere incorporato in qualsiasi applicazione C++.

Electron costruisce V8 come parte di Chromium e poi punta Node a quel V8 mentre lo costruisce.

I numeri di versione di V8 corrispondono sempre a quelli di Google Chrome. Chrome 59 include V8 5.9, Chrome 58 include V8 5.8, ecc.

- [v8.dev](https://v8.dev/)
- [nodejs.org/api/v8.html](https://nodejs.org/api/v8.html)
- [docs/development/v8-development.md](development/v8-development.md)

### webview

`webview` tags are used to embed 'guest' content (such as external web pages) in your Electron app. They are similar to `iframe`s, but differ in that each webview runs in a separate process. Non ha alcuni permessi come la tua pagina web e tutte le interazioni tra la tua app ed i contenuti incorporati saranno asincroni. Questo mantiene la tua app al sicuro dal contenuto incorporato.

[addon]: https://nodejs.org/api/addons.html
[asar]: https://github.com/electron/asar
[autoUpdater]: api/auto-updater.md
[modulo Contenuto Chromium]: https://www.chromium.org/developers/content-module
[electron-builder]: https://github.com/electron-userland/electron-builder
[Mac App Store Submission Guide]: tutorial/mac-app-store-submission-guide.md
[main]: #main-process
[renderer]: #renderer-process
[render]: #renderer-process
[Usare Moduli Nodo Nativo]: tutorial/using-native-node-modules.md
[V8]: #v8
