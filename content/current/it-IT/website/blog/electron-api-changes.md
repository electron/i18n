---
title: Modifiche API in arrivo in Electron 1.0
author: zcbenz
date: '2015-11-17'
---

Fin dall'inizio di Electron, iniziando indietro quando si chiamava Atom-Shell, abbiamo sperimentato con la fornitura di una bella API JavaScript cross-platform per il modulo contenuti di Chromium e componenti GUI nativi. Le API sono iniziate in modo molto organico, e nel tempo abbiamo apportato diverse modifiche per migliorare i disegni iniziali.

---

Ora con Electron che si prepara per un rilascio 1.0, vorremmo cogliere l'occasione per cambiare affrontando gli ultimi dettagli delle API niggling. Le modifiche descritte di seguito sono incluse in **0.35.**, con le vecchie API che riportano avvertimenti di deprecazione in modo da poter essere aggiornati per il futuro rilascio 1.0. Un Electron 1.0 non sarà fuori per alcuni mesi quindi hai un po 'di tempo prima che questi cambiamenti diventino rottura.

## Avvisi di deprecazione

Per impostazione predefinita, gli avvisi mostreranno se si utilizza API deprecate. Per disattivarli, puoi impostare `process.noDeprecation` a `true`. Per tenere traccia delle fonti di utilizzo delle API deprecate, è possibile impostare il processo `. hrowDeprecation` to `true` to throw exceptions instead of printing warnings, or set `process. raceDeprecation` to `true` per stampare le tracce delle deprecazioni.

## Nuovo modo di utilizzare moduli incorporati

I moduli incorporati sono ora raggruppati in un unico modulo, invece di essere separati in moduli indipendenti, così puoi usarli [senza conflitti con altri moduli](https://github.com/electron/electron/issues/387):

```javascript
var app = require('electron').app
var BrowserWindow = require('electron').BrowserWindow
```

Il vecchio modo di `require('app')` è ancora supportato per la compatibilità all'indietro, ma puoi anche disattivare:

```javascript
require('electron').hideInternalModules()
require('app') // genera errore.
```

## Un modo più semplice per utilizzare il modulo `remoto`

A causa del modo in cui si utilizzano moduli incorporati è cambiato, abbiamo reso più facile l'utilizzo dei moduli lato processo-principale nel processo di renderer. Ora puoi solo accedere agli attributi di `remote`per usarli:

```javascript
// Nuovo modo.
var app = require('electron').remote.app
var BrowserWindow = require('electron').remote.BrowserWindow
```

Invece di utilizzare una lunga catena di necessità:

```javascript
// Vecchio senso.
var app = require('electron').remote.require('app')
var BrowserWindow = require('electron').remote.require('BrowserWindow')
```

## Dividere il modulo `ipc`

Il modulo `ipc` esisteva sia sul processo principale che sul processo di renderer e l'API era diversa da ogni lato, che è abbastanza confuso per i nuovi utenti. Abbiamo rinominato il modulo in `ipcMain` nel processo principale, e `ipcRenderer` nel processo di renderer per evitare confusione:

```javascript
// Nel processo principale.
var ipcMain = require('electron').ipcMain
```

```javascript
// Nel processo di renderer.
var ipcRenderer = require('electron').ipcRenderer
```

E per il modulo `ipcRenderer` , è stato aggiunto un `event` object extra durante la ricezione dei messaggi, per corrispondere alle modalità di gestione dei messaggi nei moduli `ipcPrincipali`:

```javascript
ipcRenderer.on('message', function (event) {
  console.log(event)
})
```

## Standardizzazione `BrowserWindow` options

Le opzioni `BrowserWindow` avevano stili diversi in base alle opzioni di altre API, e sono stati un po 'difficile da usare in JavaScript a causa del `-` nei nomi. Essi sono ora standardizzati ai nomi JavaScript tradizionali:

```javascript
new BrowserWindow({ minWidth: 800, minHeight: 600 })
```

## Seguendo le convenzioni del DOM per i nomi API

I nomi API in Electron hanno usato per preferire camelCase per tutti i nomi API, like `Url` to `URL`, but the DOM has its own conventions, e preferiscono `URL` a `Url`, durante l'utilizzo di `Id` invece di `ID`. Abbiamo fatto i seguenti rinominamenti API per abbinare gli stili del DOM:

* `Url` è rinominato in `URL`
* `Csp` è rinominato in `CSP`

Noterai un sacco di deprecazioni quando utilizzerai Electron v0.35.0 per la tua app a causa di queste modifiche. Un modo semplice per correggerli è sostituire tutte le istanze di `Url` con `URL`.

## Modifiche ai nomi degli eventi del vassoio ``

Lo stile dei nomi degli eventi `Vassoio` era un po' diverso dagli altri moduli, quindi è stato fatto un rinominamento per renderlo corrispondente agli altri.

* `cliccato` è rinominato `clicca`
* `doppio clic` è rinominato `doppio clic`
* `cliccato con il tasto destro del mouse` è rinominato `fare clic col tasto destro`

