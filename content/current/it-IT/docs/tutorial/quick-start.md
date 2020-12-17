# Guida All'Avvio Rapido

## Avvio Rapido

Electron è un framework che consente di creare applicazioni desktop con JavaScript, HTML e CSS. Queste applicazioni possono quindi essere confezionate per essere eseguite direttamente su macOS, Windows o Linux, o distribuite tramite Mac App Store o Microsoft Store.

Tipicamente, si crea un'applicazione desktop per un sistema operativo (OS) utilizzando i quadri specifici delle applicazioni native di ciascun sistema operativo. Electron consente di scrivere la tua applicazione una volta utilizzando le tecnologie che già conosci.

### Prerequisiti

Prima di procedere con Electron è necessario installare [Node.js](https://nodejs.org/en/download/). Si consiglia di installare o l'ultima versione `LTS` o `Corrente` disponibile.

> Si prega di installare Node.js utilizzando installatori precostruiti per la piattaforma. In caso contrario potresti incontrare problemi di incompatibilità con diversi strumenti di sviluppo.

Per verificare che Node.js sia stato installato correttamente, digitare i seguenti comandi nel tuo client di terminale:

```sh
node -v
npm -v
```

I comandi dovrebbero stampare le versioni di Node.js e npm di conseguenza. Se entrambi i comandi sono riusciti, sei pronto per installare Electron.

### Crea un'applicazione di base

Dal punto di vista dello sviluppo, un'applicazione Electron è essenzialmente un'applicazione Node.js. Ciò significa che il punto di partenza dell'applicazione Electron sarà un file `package.json` come in qualsiasi altra applicazione Node.js. Un'applicazione Electron minima ha la seguente struttura:

```plaintext
my-electron-app/
├<unk> <unk> <unk> package.json
<unk> <unk> <unk> <unk> <unk> main.js
<unk> <unk> <unk> <unk> <unk> index.html
```

Creiamo un'applicazione di base basata sulla struttura qui sopra.

#### Install Electron

Crea una cartella per il tuo progetto e installa Electron qui:

```sh
mkdir my-electron-app && cd my-electron-app
npm init -y
npm i --save-dev electron
```

#### Crea il file script principale

Lo script principale specifica il punto di entrata della tua applicazione Electron (nel nostro caso, il file `main.js` ) che eseguirà il processo principale. Tipicamente, lo script che viene eseguito nel processo principale controlla il ciclo di vita dell'applicazione, visualizza l'interfaccia utente grafica e i suoi elementi, esegue interazioni native del sistema operativo e crea processi Renderer all'interno delle pagine web. Un'applicazione Electron può avere un solo processo principale.

Lo script principale può apparire come segue:

```javascript fiddle='docs/fiddles/quick-start'
const { app, BrowserWindow } = require('electron')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
```

##### Cosa sta succedendo sopra?

1. Linea 1: Prima, importa i moduli `app` e `BrowserWindow` del pacchetto `electron` per poter gestire gli eventi del ciclo di vita della tua applicazione, oltre a creare e controllare le finestre del browser.
2. Line 3: After that, you define a function that creates a [new browser window](../api/browser-window.md#new-browserwindowoptions) with node integration enabled, loads `index.html` file into this window (line 12, we will discuss the file later).
3. Line 15: You create a new browser window by invoking the `createWindow` function once the Electron application [is initialized](../api/app.md#appwhenready).
4. Line 17: You add a new listener that tries to quit the application when it no longer has any open windows. Questo listener è un no-op su macOS a causa del comportamento di gestione delle finestre [del sistema operativo](https://support.apple.com/en-ca/guide/mac-help/mchlp2469/mac).
5. Line 23: You add a new listener that creates a new browser window only if when the application has no visible windows after being activated. Ad esempio, dopo aver lanciato l'applicazione per la prima volta o aver riavviato l'applicazione già in esecuzione.

#### Crea una pagina web

Questa è la pagina web che si desidera visualizzare una volta che l'applicazione è inizializzata. Questa pagina web rappresenta il processo Renderer. È possibile creare più finestre del browser, dove ogni finestra utilizza il proprio Renderer indipendente. Ogni finestra può opzionalmente essere concessa con pieno accesso all'API Node.js tramite la preferenza `nodeIntegration`.

La pagina `index.html` appare come segue:

```html fiddle='docs/fiddles/quick-start'
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
    <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline';" />
</head>
<body style="background: white;">
    <h1>Hello World!</h1>
    <p>
        We are using node <script>document.write(process.versions.node)</script>,
        Chrome <script>document.write(process.versions.chrome)</script>,
        and Electron <script>document.write(process.versions.electron)</script>.
    </p>
</body>
</html>
```

#### Modifica il file package.json

La tua applicazione Electron utilizza il file `package.json` come punto di entrata principale (come qualsiasi altra applicazione Node.js). Lo script principale della tua applicazione è `main.js`, quindi modifica il file `package.json` di conseguenza:

```json
{
    "name": "my-electron-app",
    "version": "0.1.0",
    "author": "your name",
    "description": "My Electron app",
    "main": "main.js"
}
```

> NOTA: Se il campo `principale` è omesso, Electron tenterà di caricare un `indice. s` file dalla directory contenente `package.json`.

> NOTE: The `author` and `description` fields are required for packaging, otherwise error will occur when running `npm run make`.

Per impostazione predefinita, il comando `npm start` esegue lo script principale con Node.js. Per eseguire lo script con Electron, è necessario cambiarlo come tale:

```json
{
    "name": "my-electron-app",
    "version": "0.1.0",
    "author": "your name",
    "description": "My Electron app",
    "main": "main.js",
    "scripts": {
        "start": "electron ."
    }
}
```

#### Esegui la tua applicazione

```sh
npm start
```

L'app Electron in esecuzione dovrebbe essere la seguente:

![App Electron più semplice](../images/simplest-electron-app.png)

### Pacchetto e distribuzione dell'applicazione

Il modo più semplice e veloce per distribuire la tua app appena creata utilizza [Electron Forge](https://www.electronforge.io).

1. Importa Electron Forge nella cartella dell'app:

    ```sh
    npx @electron-forge/cli import

    ✔ Verifica del tuo sistema
    ✔ Inizializzazione di Git Repository
    ✔ Scrittura del pacchetto modificato. son file
    ✔ Installazione delle dipendenze
    ✔ Scrittura del pacchetto modificato. son file
    ✔ Correzione . itignore

    Abbiamo ATTEMPTED per convertire la tua app per essere in un formato che elettron-forge capisce.

    Grazie per aver usato "electron-forge"!!!
    ```

1. Crea un distribuibile:

    ```sh
    npm run make

    > my-gsod-electron-app@1.0. make /my-electron-app
    > electron-forge make

    ✔ Controllare il tuo sistema
    ✔ Risolvere Forge Config
    Dobbiamo imballare la tua applicazione prima di renderla
    ✔ Preparazione al pacchetto Applicazione per arch: x64
    ✔ Preparazione delle dipendenze native
    ✔ Imballaggio Applicazione
    Fare per i seguenti obiettivi: zip
    ✔ Fare per target: zip - Sulla piattaforma: darwin - Per arch: x64
    ```

    Electron-forge crea la cartella `out` in cui si troverà il pacchetto:

    ```plain
    // Esempio per MacOS
    out/
    fuori/fuori/make/zip/darwin/x64/my-electron-app-darwin-x64-1.0.0.zip
    fuori...
    ● out/my-electron-app-darwin-x64/my-electron-app.app/Contents/MacOS/my-electron-app
    ```

## Imparare le basi

Questa sezione ti guida attraverso le basi di come Electron funziona sotto il cofano. Esso mira a rafforzare la conoscenza di Electron e l'applicazione creata in precedenza nella sezione Quickstart.

### Architettura dell'applicazione

Electron è costituito da tre pilastri principali:

* **Cromo** per la visualizzazione dei contenuti web.
* **Node.js** per lavorare con il filesystem locale e il sistema operativo.
* **API personalizzate** per lavorare con funzioni native del sistema operativo spesso necessarie.

Sviluppare un'applicazione con Electron è come costruire un'app Node.js con un'interfaccia web o costruire pagine web con l'integrazione senza soluzione di continuità Node.js.

#### Principali Processi e di Rendering

Come si è detto prima, Electron ha due tipi di processi: Main e Renderer.

* Il processo principale **crea** pagine web creando `istanze BrowserWindow`. Ogni istanza `BrowserWindow` esegue la pagina web nel suo processo Renderer. Quando un'istanza `BrowserWindow` viene distrutta, anche il processo Renderer corrispondente viene terminato.
* Il processo principale **gestisce** tutte le pagine web e i processi Renderer corrispondenti.

----

* Il processo Renderer **gestisce** solo la pagina web corrispondente. Un crash in un processo di Renderer non influenza altri processi di Renderer.
* Il processo Renderer **comunica** con il processo Principale tramite IPC per eseguire operazioni GUI in una pagina web. Chiamare API native relative all'interfaccia grafica dal processo Renderer direttamente è limitato a causa di problemi di sicurezza e potenziale perdita di risorse.

----

La comunicazione tra processi è possibile tramite moduli Inter-Process Communication (IPC): [`ipcMain`](../api/ipc-main.md) e [`ipcRenderer`](../api/ipc-renderer.md).

#### API

##### Electron API

Le API Electron sono assegnate in base al tipo di processo, significa che alcuni moduli possono essere utilizzati sia dal processo Principale o Renderer, sia da entrambi. La documentazione API di Electron's indica da quale processo ogni modulo può essere utilizzato.

Per esempio, per accedere all'API Electron in entrambi i processi, è necessario un modulo incluso:

```js
const electron = require('electron')
```

Per creare una finestra, chiama la classe `BrowserWindow` che è disponibile solo nel processo principale:

```js
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()
```

Per chiamare il processo Principale dal Renderer, utilizzare il modulo IPC:

```js
// Nel processo principale
const { ipcMain } = require('electron')

ipcMain.handle('perform-action', (event, ...args) => {
  // ... fare azioni per conto del Renderer
})
```

```js
// Nel processo Renderer
const { ipcRenderer } = require('electron')

ipcRenderer.invoke('perform-action', ...args)
```

> NOTA: Poiché i processi di Renderer possono eseguire codice non attendibile (specialmente da terze parti), è importante convalidare attentamente le richieste che giungono al processo principale.

##### Node.js API

> NOTA: Per accedere all'API Node.js dal processo Renderer, è necessario impostare la preferenza `nodeIntegration` a `true`.

Electron espone l'accesso completo all'API Node.js e ai suoi moduli sia nei processi Main che Renderer. Ad esempio, è possibile leggere tutti i file dalla directory root:

```js
const fs = require('fs')

const root = fs.readdirSync('/')

console.log(root)
```

Per utilizzare un modulo Node.js, devi prima installarlo come dipendenza:

```sh
npm install --save aws-sdk
```

Quindi, nell'applicazione Electron, richiede il modulo:

```js
const S3 = require('aws-sdk/clients/s3')
```
