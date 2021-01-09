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

> #### Asia: Comunicazione Tra I Processi
> 
> In Electron ci sono diversi modi per comunicare tra il processo principale e quelli di rendering, come i moduli  [`ipcRenderer`](../api/ipc-renderer.md)  e  [`ipcMain`](../api/ipc-main.md) per inviare messaggi, e il modulo [remote](../api/remote.md) per una comunicazione tipo RPC. C'è inoltre un elemento delle FAQ su [come condividere dati tra pagine web][share-data].

## Usare API Electron

Electron offre una serie di API che supportano lo sviluppo di un'applicazione desktop sia nel processo principale che nel processo di renderer. In entrambi i processi , accedi alle API di Electron, richiedendo il modulo incluso:

```javascript
const electron = require('electron')
```

A tutte le API Electron viene assegnato un tipo di processo. Molti di loro possono essere usati solo dal processo principale, alcuni solo da un processo di renderer, alcuni da entrambi. La documentazione per ogni singola API indicherà da quale processo può essere utilizzata.

Una finestra in Electron è creata per esempio usando la classe `BrowserWindow` . È disponibile solo nel processo principale.

```javascript
// Questo funzionerà nel processo principale, but be `undefined` in a
// renderer process:
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
```

Poiché la comunicazione tra i processi è possibile, un processo di renderer può richiedere il processo principale per eseguire le attività. Electron viene fornito con un modulo chiamato `remoto` che espone le API di solito disponibili solo sul processo principale . Per creare una `Finestra di navigazione` da un processo di renderer, useremmo il remoto come medio-man:

```javascript
// Questo funzionerà in un processo di renderer, ma sia `undefined` nel processo
// principale:
const { remote } = require('electron')
const { BrowserWindow } = remote

const win = new BrowserWindow()
```

## Usare API Node.js

Electron espone l'accesso completo a Node.js sia nel processo principale che nel processo di renderer . Ciò ha due importanti implicazioni:

1) Tutte le API disponibili in Node.js sono disponibili in Electron. Chiamare il seguente codice da un'applicazione Electron funziona:

```javascript
const fs = require('fs')

const root = fs. eaddirSync('/')

// Questo stamperà tutti i file al livello radice del disco,
// o '/' o 'C:\'.
console.log(root)
```

Come si potrebbe già essere in grado di indovinare, questo ha importanti implicazioni per la sicurezza se si tenta mai di caricare contenuti remoti. Puoi trovare altre informazioni e guide sul caricamento di contenuti remoti nella nostra [documentazione di sicurezza][security].

2) È possibile utilizzare i moduli Node.js nella vostra applicazione. Scegli il tuo modulo preferito npm . npm offre attualmente il più grande repository al mondo di codice open-source – la capacità di utilizzare codice ben curato e testato che un tempo era riservato alle applicazioni server è una delle caratteristiche chiave di Electron.

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
