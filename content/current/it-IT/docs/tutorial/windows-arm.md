# Windows 10 su braccio

Se l'app viene eseguita con Electron 6.0.8 o successivo, è ora possibile compilarla per Windows 10 sul braccio. Questo migliora notevolmente le prestazioni, ma richiede la ricostruzione di tutti i moduli nativi utilizzati nella tua app. Potrebbe anche richiedere piccoli fixup per il tuo script di costruzione e imballaggio.

## Esecuzione di un'applicazione di base

Se la tua app non utilizza moduli nativi, è davvero facile creare una versione Arm della tua app.

1. Assicurati che la directory `node_modules` della tua app sia vuota.
2. Usando un _Command Prompt_, esegui `set npm_config_arch=arm64` prima di eseguire `npm install`/`yarn install` come al solito.
3. [Se hai installato Electron come dipendenza da sviluppo](quick-start.md#prerequisites), npm scaricherà e scompatterà la versione arm64. È quindi possibile confezionare e distribuire la tua app come normale.

## Considerazioni generali

### Codice specifico per l’architettura

Un sacco di codice specifico di Windows contiene se... altrimenti la logica che seleziona tra le architetture x64 o x86.

```js
if (process.arch === 'x64') {
  // Do 64-bit thing...
} else {
  // Do 32-bit thing...
}
```

Se si desidera mirare al braccio64, in genere la logica di questo tipo selezionerà l'architettura sbagliata, così attentamente controllare la vostra applicazione e costruire script per condizioni come questo. In script di build e packaging personalizzati, dovresti sempre controllare il valore di `npm_config_arch` nell'ambiente, piuttosto che affidarsi all'arco di processo corrente.

### Moduli nativi

Se si utilizzano moduli nativi, è necessario assicurarsi che essi compilano contro v142 del compilatore MSVC (fornito in Visual Studio 2017). È inoltre necessario verificare che qualsiasi pre-costruito `.dll` o `. I file ib` forniti o referenziati dal modulo nativo sono disponibili per Windows su Arm.

### Testare la tua app

Per testare la tua app, usa un dispositivo Windows su Arm con Windows 10 (versione 1903 o successiva). Assicurati di copiare la tua applicazione sul dispositivo di destinazione - la sandbox di Chromium non funzionerà correttamente durante il caricamento delle risorse dell'applicazione da una posizione di rete.

## Requisiti di sviluppo

### Node.js/node-gyp

[Node.js v12.9.0 o versioni successive è raccomandato.](https://nodejs.org/en/) Se l'aggiornamento a una nuova versione di Nodo è indesiderabile, puoi invece [aggiornare manualmente la copia di npm di node-gyp](https://github.com/nodejs/node-gyp/wiki/Updating-npm's-bundled-node-gyp) alla versione 5. .2 o successivo, che contiene le modifiche necessarie per compilare i moduli nativi per il braccio.

### Visual Studio 2017

Visual Studio 2017 (qualsiasi edizione) è necessario per la cross-compilazione dei moduli nativi. Puoi scaricare Visual Studio Community 2017 tramite il programma [Visual Studio Dev Essentials](https://visualstudio.microsoft.com/dev-essentials/). Dopo l'installazione, è possibile aggiungere i componenti specifici dell'Arma eseguendo quanto segue da un _prompt dei comandi_:

```powershell
vs_installer.exe ^
--add Microsoft.VisualStudio.Workload.NativeDesktop ^
--add Microsoft.VisualStudio.Component.VC.ATLMFC ^
--add Microsoft.VisualStudio.Component.VC.Tools.ARM64 ^
--add Microsoft.VisualStudio.Component.VC.MFC.ARM64 ^
--includeRecommended
```

#### Creazione di un prompt dei comandi cross-compilation

Impostazione `npm_config_arch=arm64` nell'ambiente crea il braccio corretto64 `. bj` file, ma lo standard _Developer Command Prompt for VS 2017_ userà il link x64. Per risolvere questo:

1. Duplica la scorciatoia di comando _x64_x86 Strumenti trasversali per VS 2017_ (es. localizzandolo nel menu di avvio, facendo clic con il tasto destro, selezionando _Apri posizione file_, copiando e incollando) in qualche luogo conveniente.
2. Fare clic con il pulsante destro del mouse sulla nuova scorciatoia e scegliere _Proprietà_.
3. Cambia il campo _Target_ per leggere `vcvarsamd64_arm64.bat` alla fine invece di `vcvarsamd64_x86.bat`.

Se fatto con successo, il prompt dei comandi dovrebbe stampare qualcosa di simile all'avvio:

```bat
**************************************************************************
** Visual Studio 2017 Developer Command Prompt v15.9.15
** Copyright (c) 2017 Microsoft Corporation
******************************************************************************************************
[vcvarsall.bat] Environment initialized for: 'x64_arm64'
```

Se si desidera sviluppare l'applicazione direttamente su un dispositivo Windows su Arm, sostituire `vcvarsx86_arm64. a` in _Target_ in modo che la cross-compilation possa avvenire con l'emulazione x86 del dispositivo.

### Collegamento contro il corretto `node.lib`

Per impostazione predefinita, `node-gyp` scompatta le intestazioni del nodo di Electron, scaricando le versioni x86 e x64 del nodo `. ib` in `%APPDATA%\. \Local\node-gyp\Cache`, ma non scarica la versione arm64 ([una correzione per questo è in sviluppo](https://github.com/nodejs/node-gyp/pull/1875). Per risolvere questo:

1. Scarica l'arm64 `node.lib` da https://electronjs.org/headers/v6.0.9/win-arm64/node.lib
2. Spostalo su `%APPDATA%\..\Local\node-gyp\Cache\6.0.9\arm64\node.lib`

Sostituisci `6.0.9` per la versione che stai utilizzando.

## Moduli nativi compilatori incrociati

Dopo aver completato tutto quanto sopra, apri il tuo prompt dei comandi cross-compilation ed esegui `set npm_config_arch=arm64`. Quindi usa `npm install` per costruire il tuo progetto come normale. Come per i moduli x86 cross-compiling, potrebbe essere necessario rimuovere `node_modules` per forzare la recompilazione dei moduli nativi se sono stati precedentemente compilati per un'altra architettura.

## Debug dei moduli nativi

Il debug dei moduli nativi può essere fatto con Visual Studio 2017 (eseguito sulla macchina di sviluppo) e corrispondente [Visual Studio Remote Debugger](https://docs.microsoft.com/en-us/visualstudio/debugger/remote-debugging-cpp?view=vs-2019) in esecuzione sul dispositivo di destinazione. Per debug:

1. Avvia la tua app `. xe` sul dispositivo di destinazione tramite il _prompt dei comandi_ (passando `--inspect-brk` per metterlo in pausa prima che vengano caricati i moduli nativi).
2. Lancia Visual Studio 2017 sulla tua macchina di sviluppo.
3. Connettiti al dispositivo di destinazione selezionando _Debug > Allega al processo..._ e inserisci l'indirizzo IP del dispositivo e il numero di porta visualizzato dallo strumento Visual Studio Remote Debugger.
4. Fare clic su _Aggiorna_ e selezionare il [processo Electron appropriato per allegare](../development/debug-instructions-windows.md).
5. Potrebbe essere necessario assicurarsi che tutti i simboli per i moduli nativi nella tua app siano caricati correttamente. Per configurare questo, vai a _Debug > Opzioni..._ in Visual Studio 2017, e aggiungere le cartelle contenenti il tuo `. db` simboli sotto _Debugging > Simboli_.
6. Una volta collegato, imposta qualsiasi breakpoint appropriato e riprendi l'esecuzione di JavaScript utilizzando gli strumenti remoti [di Chrome per il Nodo](debugging-main-process.md).

## Ottenere un aiuto aggiuntivo

Se riscontri un problema con questa documentazione, o se la tua app funziona quando compilata per x86 ma non per l'arm64, please [file an issue](../development/issues.md) with "Windows on Arm" in the title.
