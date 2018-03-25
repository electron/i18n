# Riguardo Electron

[Election](https://electronjs.org) è una libreria open source sviluppata da GitHub per costruire applicazioni desktop cross-platform utilizzando HTML, CSS e Javascript. Electron consente questo combinando [Chromium](https://www.chromium.org/Home) e [Node.js](https://nodejs.org) in un singolo ambiente di runtime e inoltre le app possono essere impacchettate per Mac, Windows e Linux.

Electron nasce nel 2013 come framework sul quale è stato costruito [Atom](https://atom.io), l'editor di testo di GitHub. Entrambi furono resi open source nella Primavera del 2014.

Da allora è diventato uno strumento popolare utilizzato da sviluppatori open source, Start-up e società consolidate. [Guarda chi sta contribuendo su Electron](https://electronjs.org/apps).

Continua le leggere per sapere di più sui contributi e i rilasci di Electron o inizia a costruire con Electron attraverso la [Guida introduttiva](quick-start.md).

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

## Filosofia del codice

Al fine di mantenere Electron leggero (dimensione dei files) e sostenibile (la diffusione delle dipendenze delle API) il progetto limita l'ambito del progetto core.

Per esempio, Electron utilizza solo la libreria di rendering di Chromium, anziché tutto Chromium. Questo rende più facile l'aggiornamento di Chromium, ma significa anche che alcune funzionalità di Google Chrome non esistono in Electron.

New features added to Electron should primarily be native APIs. If a feature can be its own Node.js module, it probably should be. See the [Electron tools built by the community](https://electronjs.org/community).

## History

Below are milestones in Electron's history.

| :calendar:      | :tada:                                                                                                         |
| --------------- | -------------------------------------------------------------------------------------------------------------- |
| **April 2013**  | [Atom Shell is started](https://github.com/electron/electron/commit/6ef8875b1e93787fa9759f602e7880f28e8e6b45). |
| **May 2014**    | [Atom Shell is open sourced](https://blog.atom.io/2014/05/06/atom-is-now-open-source.html).                    |
| **April 2015**  | [Atom Shell is re-named Electron](https://github.com/electron/electron/pull/1389).                             |
| **May 2016**    | [Electron releases `v1.0.0`](https://electronjs.org/blog/electron-1-0).                                        |
| **May 2016**    | [Electron apps compatible with Mac App Store](mac-app-store-submission-guide.md).                              |
| **August 2016** | [Windows Store support for Electron apps](windows-store-guide.md).                                             |