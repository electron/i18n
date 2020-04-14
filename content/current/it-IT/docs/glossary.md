# Glossario

Questa pagina definisce una terminologia comunemente utilizzata nello sviluppo di Electron.

### ASAR

ASAR è l'acronimo di Atom Shell Archive Format. Un archivio [asar](https://github.com/electron/asar) è un formato tipo `tar` che concatena i file in un unico file. Electron può leggere file arbitrari da esso senza decomprimere l'intero file.

Il formato ASAR è stato creato principalmente per migliorare le prestazioni su Windows... TODO

### CRT

La libreria C Run-time (CRT) è parte della libreria C++ Standard che incorpora la libreria standard ISO C99. Le librerie Visual C++ che implementano lo sviluppo di codice nativo CRT, e sia misto nativo che gestito, e gestito puro per lo sviluppo .NET.

### DMG

Un'immagine Apple Disk è un formato di package utilizzato da macOS. I file DMG sono comunemente usati per distribuire gli "installer" dell'applicazione. [electron-builder](https://github.com/electron-userland/electron-builder) supporta `dmg` come build target.

### IME

Input Method Editor. Un programma che consente agli utenti di immettere caratteri e simboli non trovati sulla tastiera. Ad esempio, questo consente agli utenti di tastiere latine di inserire caratteri cinesi, giapponesi, coreani e indiani.

### IDL

Lingua di descrizione interfaccia. Scrivi le firme delle funzioni ed i tipi di dato in un formato che può essere usato per generare interfacce in Java, C++, JavaScript, etc.

### IPC

IPC sta per Comunicazione Inter-processo. Electron usa IPC per inviare messaggi JSON serializzati tra processi [principali](#main-process) e di [render](#renderer-process).

### libchromiumcontent

Una libreria condivisa che include il [modulo Contenuto Chromium](https://www.chromium.org/developers/content-module) e tutte le sue dipendenze (es. Blink, [V8](#v8), etc.). Anche riferito come "libcc".

- [github.com/electron/libchromiumcontent](https://github.com/electron/libchromiumcontent)

### processo principale

Il processo principale, comunemente un file nominato `main.js` è il punto di accesso ad ogni app Electron. Controlla la vita dell'app, dall'apertura alla chiusura. Gestisce anche elementi nativi come il Menu, la Barra dei Menu, il Dock, il Tray, etc. Il processo principale è responsabile della creazione di ogni nuovo processo di rendering nell'app. L'intera API Node è integrata.

Ogni processo principale dell'app è specificato nella proprietà `principale` in `package.json`. Così `electron` sa quale file eseguire all'avvio.

In Chromium, questo processo è definito come il "processo browser". Esso è rinominato in Electron per evitare confusione con i processi di render.

Vedi anche: [processo](#process), [processo di rendering](#renderer-process)

### MAS

Acronimo per App Store di Apple e Mac. Per dettagli sull'inviare la tua app al MAS, vedi la [Guida Invio Mac App Store](tutorial/mac-app-store-submission-guide.md).

### Mojo

Un sistema IPC per comunicare intra e inter processo, e ciò è importante perché Chrome è ansioso di dividere il proprio lavoro in processi separati o no, in base alle pressioni di memoria etc.

Vedi https://chromium.googlesource.com/chromium/src/+/master/mojo/README.md

### moduli nativi

I moduli nativi (anche chiamati [addon](https://nodejs.org/api/addons.html) in Node.js) sono moduli scritti in C o C++ che possono essere caricati in Node.js o Electron usando la funzione require(), ed usati come fossero un modulo Node.js ordinario. Sono usati principalmente per fornire un'interfaccia tra JavaScript in esecuzione in Node.js e librerie C/C++.

I moduli Nodo Nativo sono supportati da Electron, ma essendo che Electron usa una versione V8 differente dal Nodo binario installato nel tuo sistema, devi specificare manualmente la posizione delle voci di Electron quando costruisci moduli nativi.

Vedi anche [Usare Moduli Nodo Nativo](tutorial/using-native-node-modules.md).

### NSIS

Nullsoft Scriptable Install System è un Installatore basato su script che autorizza lo strumento per Microsoft Windows. Viene rilasciato sotto una combinazione di licenze software gratuite ed è largamente usato come alternativa a prodotti proprietari commerciali come InstallShield. [electron-builder](https://github.com/electron-userland/electron-builder) supporta NSIS come target build.

### OSR

OSR (Rendering a schermo spento) può essere usato per caricare pagine pesanti in background e poi mostrarle dopo (sarà molto più veloce). Ti consente di renderizzare pagine senza mostrarle sullo schermo.

### process

Un processo è un'istanza di un programma che è in fase di esecuzione. Le app di Electron che fanno uso del processo [main](#main-process) e di uno o più processi [render](#renderer-process) stanno eseguendo in realtà numerosi programmi simultaneamente.

In Node.js ed Electron, ogni processo in esecuzione ha un oggetto `processo`. Questo oggetto è un globale che fornisce informazioni e controlla il processo corrente. Come globale, è sempre disponibile alle applicazioni senza usare require().

Vedi anche: [processo principale](#main-process), [processo di rendering](#renderer-process)

### processo di rendering

Il processo di rendering è una finestra del browser nella tua app. A differenza del processo principale, possono esserci più di questi e ognuno viene eseguito in un processo separato. Possono anche essere nascosti.

Nei browser normali, le pagine web vengono eseguite in un ambiente circoscritto nel quale non è consentito l'accesso alle risorse native. Gli utenti di Electron, tuttavia, hanno il potere di usare le API di Node.js nelle pagine web consentendo interazioni di sistema operativo di livello inferiore.

Vedi anche: [processo](#process), [processo principale](#main-process)

### Squirrel

Squirrel è un framework open source che abilita le app Electron ad aggiornarsi automaticamente come nuove versioni sono rilasciate. Vedi l'API [autoUpdater](api/auto-updater.md) per informazioni sull'iniziare con Squirrel.

### userland

Questo termine si è originato nella community Unix, dove "userland" o "userspace" si riferivano a programmi che si eseguono fuori dal kernel del sistema operativo. Più di recente, il termine è stato popolarizzato nella community di Node ed npm per distinguere tra funzioni disponibili nel "Nucleo Node" contro pacchetti pubblicati al registro npm dalla più grande comunità "utente".

Come Node, Electron si concentra sull'avere un piccolo set di API che fornisce tutte le primitive necessarie per lo sviluppo di applicazioni desktop multipiattaforma. Questa filosofia progettuale consente a Electron di rimanere uno strumento flessibile senza essere eccessivamente prescrittivo su come dovrebbe essere usato. Userland abilita gli utenti a creare e condividere strumenti che forniscono funzionalità aggiuntive oltre a quanto disponibile in "core".

### V8

V8 è l'engine JavaScript open source di Google. È scritto in C++ ed è usato in Google Chrome. V8 può essere eseguito standalone o può essere incorporato in qualsiasi applicazione in C++.

Electron costruisce V8 come parte di Chromium e poi punta Node a quel V8 mentre lo costruisce.

I numeri delle versioni di V8 corrispondono sempre a quelli di Google Chrome. Chrome 59 include V8 5.9, Chrome 58 include V8 5.8, ecc.

- [developers.google.com/v8](https://developers.google.com/v8)
- [nodejs.org/api/v8.html](https://nodejs.org/api/v8.html)
- [docs/development/v8-development.md](development/v8-development.md)

### webview

I tag `webview` sono usati per incorporare contenuti 'guest' (come pagine web esterne) nella tua app Electron. Sono simili ad `iframe` ma differiscono nel fatto che ogni vista web viene eseguita in un processo separato. Non ha alcuni permessi come la tua pagina web e tutte le interazioni tra la tua app ed i contenuti incorporati saranno asincroni. Questo mantiene la tua app al sicuro dal contenuto incorporato.