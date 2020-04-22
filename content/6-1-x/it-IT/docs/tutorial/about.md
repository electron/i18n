# Riguardo Electron

[Election](https://electronjs.org) è una libreria open source sviluppata da GitHub per costruire applicazioni desktop cross-platform utilizzando HTML, CSS e Javascript. Tutto ciò è possibile combinando [Chromium](https://www.chromium.org/Home) e [Node.js](https://nodejs.org) in un singolo ambiente di runtime. Inoltre le app possono essere rilasciate per Mac, Windows e Linux.

Electron began in 2013 as the framework on which [Atom](https://atom.io), GitHub's hackable text editor, would be built. The two were open sourced in the Spring of 2014.

It has since become a popular tool used by open source developers, startups, and established companies. [See who is building on Electron](https://electronjs.org/apps).

Continua a leggere per sapere di più sui contributi e le release di Electron o inizia a sviluppare con Electron attraverso la [Guida introduttiva](quick-start.md).

## Squadra e collaboratori

Electron è mantenuto da un team di GitHub, supportato da un gruppo di [Collaboratori attivi](https://github.com/electron/electron/graphs/contributors) della community. Alcuni dei collaboratori lavorano in proprio, altri fanno parte di grandi aziende che stanno sviluppando soluzioni con Electron. Siamo lieti di aggiungere collaboratori al progetto come manutentori. Leggi qui come [contribuire a Electron](https://github.com/electron/electron/blob/master/CONTRIBUTING.md).

## Versioni

[Electron releases](https://github.com/electron/electron/releases) frequently. We release when there are significant bug fixes, new APIs or are updating versions of Chromium or Node.js.

### Aggiornamento delle Dipendenze

La versione di Chromium distribuita con Electron è generalmente aggiornata entro un paio di settimane dall'uscita di una nuova versione stabile; i tempi possono subire delle piccole variazioni in funzione dello sforzo richiesto per l'aggiornamento.

Quando viene rilasciata una nuova versione di Node.js, è necessario attendere circa un mese prima dell'aggiornamento di Electron.

In Electron, Node.js and Chromium share a single V8 instance—usually the version that Chromium is using. Most of the time this _just works_ but sometimes it means patching Node.js.


### Controllo delle versioni

A partire dalla versione 2.0 Electron [segue `semver`](https://semver.org). Per la maggior parte delle applicazioni, e utilizzando un versione recente di npm, sarà sufficiente eseguire `npm install electron`.

Il processo di aggiornamento delle versioni è dettagliato esplicitamente nel nostro [Documento di Controllo delle Versioni](electron-versioning.md).

### LTS

Il supporto a lungo termine delle versioni precedenti di Electron attualmente non è disponibile. Se la vostra versione di Electron funziona bene, potete impiegarla per tutto il tempo che desiderate. Se invece volete utilizzare nuove funzionalità, sarà necessario aggiornare a una versione più recente.

Con la versione `v1.0.0` è stato reso disponibile un aggiornamento molto importante. Se non state utilizzando questa versione, dovreste [leggere di più sulle modifiche della versione `v1.0.0`](https://electronjs.org/blog/electron-1-0).

## Filosofia di base

Al fine di mantenere Electron leggero (dimensione dei files) e sostenibile (la diffusione delle dipendenze delle API) il progetto si limita all'ambito del core.

Per esempio, Electron utilizza solo la libreria di rendering di Chromium, anziché tutto Chromium. Questo rende più facile l'aggiornamento di Chromium, ma significa anche che alcune funzionalità di Google Chrome non esistono in Electron.

Le nuove funzionalità aggiunte in Electron dovrebbero essere innanzitutto nelle API native. Se la funzionalità riguarda il modulo Node,js, probabilmente ci sarà. Vedere [ strumenti di Electron creati dalla comunità](https://electronjs.org/community).

## Cronologia

Di seguito i principali rilasci della storia di Electron.

| Data:           | Evento:                                                                                                          |
| --------------- | ---------------------------------------------------------------------------------------------------------------- |
| **Aprile 2013** | [Creazione di Atom Shell](https://github.com/electron/electron/commit/6ef8875b1e93787fa9759f602e7880f28e8e6b45). |
| **Maggio 2014** | [Atom Shell è open source](https://blog.atom.io/2014/05/06/atom-is-now-open-source.html).                        |
| **Aprile 2015** | [Atom Shell è ribattezzato Electron](https://github.com/electron/electron/pull/1389).                            |
| **Maggio 2016** | [Electron rilascia la versione `v 1.0.0`](https://electronjs.org/blog/electron-1-0).                             |
| **Maggio 2016** | [Le applicazioni Electron sono compatibili con Mac App Store](mac-app-store-submission-guide.md).                |
| **Agosto 2016** | [Windows Store supportato per le app di electron](windows-store-guide.md).                                       |
