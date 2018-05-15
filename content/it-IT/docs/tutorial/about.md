# Riguardo Electron

[Election](https://electronjs.org) è una libreria open source sviluppata da GitHub per costruire applicazioni desktop cross-platform utilizzando HTML, CSS e Javascript. Electron consente questo combinando [Chromium](https://www.chromium.org/Home) e [Node.js](https://nodejs.org) in un singolo ambiente di runtime e inoltre le app possono essere impacchettate per Mac, Windows e Linux.

Electron nasce nel 2013 come framework sul quale è stato costruito [Atom](https://atom.io), l'editor di testo di GitHub. Entrambi furono resi open source nella Primavera del 2014.

Da allora è diventato uno strumento popolare utilizzato da sviluppatori open source, Start-up e società consolidate. [Guarda chi sta contribuendo su Electron](https://electronjs.org/apps).

Continua a leggere per sapere di più sui contributi e i rilasci di Electron o inizia a sviluppare con Electron attraverso la [Guida introduttiva](quick-start.md).

## Squadra e collaboratori

Electron è mantenuto da un team di GitHub, nonché da un gruppo di [Collaboratori attivi](https://github.com/electron/electron/graphs/contributors) della community. Alcuni dei collaboratori lavorano in proprio, altri fanno parte di grandi aziende che stanno sviluppando soluzioni con Electron. Siamo lieti di aggiungere collaboratori al progetto come manutentori. Per saperne di più su come [contribuire a Electron](https://github.com/electron/electron/blob/master/CONTRIBUTING.md).

## Versioni

[Electron rilascia](https://github.com/electron/electron/releases) spesso. Rilasciamo quando ci sono significative correzioni di errori, nuove API o ci sono nuove versioni di aggiornamento di Chromium o Node.js.

### Aggiornamento delle Dipendenze

La versione di Chromium di Electron è generalmente aggiornata entro una o due settimane dal un nuovo rilascio stabile di Chromium, a seconda dello sforzo richiesto per l'aggiornamento.

Quando viene rilasciata una nuova versione di Nodw.js, Electron normalmente attende circa un mese prima di rilasciare l'aggiornamento al fine di includere una versione più stabile.

All'interno di Electron, Node.js e Chromium condividono una singola istanza di V8 -- di solito è la versione che utilizza Chromium. Il più delle volte questo *funziona*, ma a volte significa fare delle patch a Node.js.

### Versionamento

A partire dalla versione 2.0 Electron [segue `semver`](https://semver.org). Per la maggior parte delle applicazione è possibile utilizzare la versione più recente di npm, lanciando ` npm installare Electron` che farà la cosa giusta.

Il processo di aggiornamento delle versioni è dettagliato esplicitamente nel nostro [Documento di versionamento](electron-versioning.md).

### LTS

Il supporto a lungo termine delle versioni precedenti di Electron attualmente non esistono. Se la vostra versione di Electron funziona bene, puoi mantenerla per tutto il tempo che desideri. Se si vuole utilizzare le nuove funzionalità, bisogna aggiornare alla nuova versione.

Un aggiornamento importante è stata la versione `v1.0.0`. Se non stai utilizzando questa versione, dovresti [leggere di più sulle modifiche della versione `v1.0.0`](https://electronjs.org/blog/electron-1-0).

## Filosofia di base

Al fine di mantenere Electron leggero (dimensione dei files) e sostenibile (la diffusione delle dipendenze delle API) il progetto limita l'ambito del progetto core.

For instance, Electron uses Chromium's rendering library rather than all of Chromium. Questo rende più facile l'aggiornamento di Chromium, ma significa anche che alcune funzionalità di Google Chrome non esistono in Electron.

Le nuove funzionalità aggiunte in Electron dovrebbero essere innanzitutto nelle API native. Se la funzionalità riguarda il modulo Node,js, probabilmente ci sarà. Vedere [ strumenti di Electron della comunità](https://electronjs.org/community).

## Cronologia

Di seguito i principali rilasci della storia di Electron.

| Data:           | Evento:                                                                                                         |
| --------------- | --------------------------------------------------------------------------------------------------------------- |
| **Aprile 2013** | [Partenza di Atom Shell](https://github.com/electron/electron/commit/6ef8875b1e93787fa9759f602e7880f28e8e6b45). |
| **Maggio 2014** | [Atom Shell è open source](https://blog.atom.io/2014/05/06/atom-is-now-open-source.html).                       |
| **Aprile 2015** | [Atom Shell è ribattezzato Electron](https://github.com/electron/electron/pull/1389).                           |
| **Maggio 2016** | [Electron rilascia la versione `v 1.0.0`](https://electronjs.org/blog/electron-1-0).                            |
| **Maggio 2016** | [Le applicazioni Electron sono compatibili con Mac App Store](mac-app-store-submission-guide.md).               |
| **Agosto 2016** | [Windows Store supporta per le app di electron](windows-store-guide.md).                                        |