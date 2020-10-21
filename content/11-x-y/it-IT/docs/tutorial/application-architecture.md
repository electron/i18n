# Architettura Applicazione

Prima di immergersi nelle API di Electron, bisogna discutere di due tipi di processo disponibili su Electron. Ci sono delle differenze importanti e fondamentali da capire.

## Principali Processi e di Rendering

In Electron, il processo chiamato `main` che esegue lo script indicato nel file `package.json` è chiamato __processo principale__. Lo script che viene eseguito nel processo principale può visualizzare una GUI tramite la creazione di pagine web. Una applicazione Electron ha sempre un processo principale, ma mai più di uno.

Poiché Electron utilizza Chromium per la visualizzazione di pagine web, viene utilizzata anche l'architettura multi-processo di Chromium. Ogni pagina web in Electron viene eseguita nel proprio processo, che si chiama __il processo di rendering__.

Nei browser normali, le pagine web vengono eseguite in un ambiente circoscritto nel quale non è consentito l'accesso alle risorse native. Gli utenti di Electron, tuttavia, hanno il potere di usare le API di Node.js nelle pagine web consentendo interazioni di sistema operativo di livello inferiore.

### Differenze tra processo principale (main) e di rendering (renderer)

Il processo principale crea pagine web mediante la creazione di istanze di `BrowserWindow`. In ogni istanza di `BrowserWindow` viene eseguita la pagina web nel proprio processo di rendering. Quando viene eliminata un'istanza di `BrowserWindow`, il processo di rendering corrispondente viene anch'esso terminato.

Il processo principale gestisce tutte le pagine web e il corrispondente processo di rendering. Ogni processo di rendering è isolato e può occuparsi solo delle pagine web in esecuzione in esso-

Nelle pagine web, chiamare le API dell'interfaccia grafica nativa non è consentito perché la gestione delle risorse di sistema nelle pagine web è molto pericolosa ed è facile perdere risorse. Se si desidera eseguire operazioni di GUI in una pagina web, il processo di rendering della pagina web deve comunicare con il processo principale per richiedere che il processo principale esegua tali operazioni.

> #### A parte: Comunicazione Tra Processi
> 
> In Electron, la comunicazione tra il processo principale e i processi di renderer, è fatto attraverso i moduli [`ipcRenderer`](../api/ipc-renderer.md) e [`ipcMain`](../api/ipc-main.md). C'è anche una voce FAQ su [come condividere i dati tra le pagine web][share-data].


## Usare le API di Electron

Electron offre numerose API che supportano lo sviluppo di un'applicazione desktop sia nel processo principale che in quello di render. In entrambi i processi, accederesti alle API di Electron richiedendone il modulo incluso:

```javascript
const electron = require('electron')
```

Tutte le API di Electron sono assegnate ad un tipo di processo. Molte di queste possono essere usate solo dal processo principale, alcune di esse solo da un processo di renderer, alcune da entrambi. La documentazione per ogni API individuale dichiarerà da quale processo possa essere usata.

Una finestra in Electron è creata per istanza usando la classe `BrowserWindow`. E' disponibile solo nel processo principale.

```javascript
// This will work in the main process, but be `undefined` in a
// renderer process:
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
```

Poiché la comunicazione tra i processi è possibile, un processo di renderer può richiedere il processo principale per eseguire le attività tramite IPC.

```javascript
// Nel processo principale:
const { ipcMain } = require('electron')

ipcMain. andle('perform-action', (event, ...args) => {
  // ... fare qualcosa per conto del renderer ...
})

// Nel processo di renderizzazione:
const { ipcRenderer } = require('electron')

ipcRenderer.invoke('perform-action', ...args)
```

Si noti che il codice nel renderer potrebbe non essere affidabile, quindi è importante convalidare attentamente nelle richieste di processo principali che provengono da renderer, soprattutto se ospitano contenuti di terze parti.

## Usare API Node.js

Electron espone l'accesso completo a Node.js sia nel processo principale che in quello di render. Questo ha due implicazioni importanti:

1) Tutte le API disponibili in Node.js sono disponibili in Electron. Chiamare il seguente codice da un'app di Electron funziona:

```javascript
const fs = require('fs')

const root = fs.readdirSync('/')

// This will print all files at the root-level of the disk,
// either '/' or 'C:\'.
console.log(root)
```

Come potresti indovinare, questo ha implicazioni di sicurezza importanti se mai dovessi tentare di caricare contenuto remoto. Puoi trovare altre informazioni e guide sul caricamento di contenuti remoti nella nostra [documentazione di sicurezza][security].

2) Puoi usare i moduli di Node.js nella tua applicazione. Scegli il tuo modulo npm preferito. npm offre la repository correntemente più grande al mondo di codice open source - l'abilità di usare del codice testato e ben mantenuto che era riservato alle applicazioni dei serve è una delle funzionalità chiave di Electron.

Ad esempio, per utilizzare l'SDK ufficiale AWS nella tua applicazione, dovresti prima installarlo come dipendenza:

```sh
npm install --save aws-sdk
```

Poi, nella tua app Electron, richiede e utilizza il modulo come se stavi costruendo un'applicazione Node.js:

```javascript
// Un client S3 pronto all'uso
const S3 = require('aws-sdk/clients/s3')
```

C'è una avvertenza importante: Nativo Nodo. s moduli (cioè, i moduli che richiedono la compilazione di codice nativo prima di poter essere usati) dovranno essere compilati per essere utilizzati con Electron.

The vast majority of Node.js modules are _not_ native. Solo 400 su ~ 650.000 moduli sono nativi. However, if you do need native modules, please consult [this guide on how to recompile them for Electron][native-node].

[security]: ./security.md
[native-node]: ./using-native-node-modules.md
[share-data]: ../faq.md#how-to-share-data-between-web-pages
