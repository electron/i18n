# Informazioni su Electron

[Electron](https://electronjs.org) è una libreria open source sviluppata da GitHub per la creazione di applicazioni desktop multipiattaforma con HTML, CSS e JavaScript. Electron realizza ciò combinando [Chromium](https://www.chromium.org/Home) e [Node.js](https://nodejs.org) in un singolo runtime e le app possono essere impacchettate per Mac, Windows e Linux.

Electron è iniziato nel 2013 come framework su cui sarebbe stato costruito [Atom](https://atom.io), l'editor di testo hackerabile di GitHub. I due erano open source nella primavera del 2014.

Da allora è diventato uno strumento popolare utilizzato da sviluppatori open source, startup e aziende consolidate. [Vedi chi sta costruendo su Electron](https://electronjs.org/apps).

Continua a leggere per saperne di più sui contributori e le versioni di Electron o inizia a costruire con Electron nella [Guida rapida](quick-start.md).

## Core Team e contributori

Electron è gestito da un team di GitHub e da un gruppo di [collaboratori attivi](https://github.com/electron/electron/graphs/contributors) della community. Alcuni dei contributori sono individuali e alcuni lavorano in aziende più grandi che si stanno sviluppando su Electron. Siamo lieti di aggiungere collaboratori frequenti al progetto come manutentori. Maggiori informazioni su come [contribuire a Electron](https://github.com/electron/electron/blob/master/CONTRIBUTING.md).

## Versioni

[Electron rilascia nuove versioni](https://github.com/electron/electron/releases) frequentemente. Rilasciamo quando ci sono correzioni di bug significativi, nuove API o aggiornamenti di versioni di Chromium o Node.js.

### Aggiornamento delle Dipendenze

La versione di Chromium di Electron viene di solito aggiornata entro una o due settimane dopo la pubblicazione di una nuova versione stabile di Chromium, a seconda dello sforzo impiegato nell'aggiornamento.

Quando viene rilasciata una nuova versione di Node.js, Electron di solito attende circa un mese prima dell'aggiornamento per ottenere una versione più stabile.

In Electron, Node.js e Chromium condividono un'unica istanza V8, in genere la versione utilizzata da Chromium. La maggior parte delle volte questo *funziona* ma a volte significa applicare patch a Node.js.

### Versioning

A partire dalla versione 2.0 Electron [segue `semver`](https://semver.org). Per la maggior parte delle applicazioni, e usando una versione recente di npm, l'esecuzione di `$ npm install electron` farà la cosa giusta.

Il processo di aggiornamento della versione è dettagliato in modo esplicito nel nostro [Versioning Doc](electron-versioning.md).

### LTS 

Il supporto a lungo termine delle versioni precedenti di Electron attualmente non esiste. Se la tua versione corrente di Electron funziona per te, puoi rimanerci per tutto il tempo che desideri. Se si desidera utilizzare le nuove funzionalità appena disponibili, è necessario eseguire l'aggiornamento a una versione più recente.

Un importante aggiornamento è arrivato con la versione `v1.0.0`. Se non stai ancora utilizzando questa versione, dovresti [leggere di più sulle modifiche di `v1.0.0`](https://electronjs.org/blog/electron-1-0).

## Filosofia di Base

Al fine di mantenere Electron piccolo (dimensione del file) e sostenibile (la diffusione delle dipendenze e delle API) il progetto limita l'ambito del progetto principale.

Ad esempio, Electron utilizza solo la libreria di rendering di Chromium anziché tutto di Chromium. Ciò semplifica l'aggiornamento di Chromium, ma significa anche che alcune funzioni del browser disponibili in Google Chrome non sono presenti in Electron.

Le nuove funzionalità aggiunte a Electron dovrebbero essere principalmente API native. Se una funzione può essere il suo modulo Node.js, probabilmente dovrebbe esserlo. Vedi i [Tools di Electron costruiti dalla community](https://electronjs.org/community).

## Cronologia

Di seguito sono riportate le pietre miliari nella cronologia di Electron.

| :calendar:      | :tada:                                                                                                         |
| --------------- | -------------------------------------------------------------------------------------------------------------- |
| **Aprile 2013** | [Atom Shell è avviato](https://github.com/electron/electron/commit/6ef8875b1e93787fa9759f602e7880f28e8e6b45).  |
| **Maggio 2014** | [Atom Shell è open source](https://blog.atom.io/2014/05/06/atom-is-now-open-source.html).                      |
| **Aprile 2015** | [Atom Shell è rinominato Electron](https://github.com/electron/electron/pull/1389).                            |
| **Maggio 2016** | [Electron rilascia la `v1.0.0`](https://electronjs.org/blog/electron-1-0).                                     |
| **Maggio 2016** | [Apps di Electron compatibili con il Mac App Store](mac-app-store-submission-guide.md).                        |
| **Agosto 2016** | [Supporto di Windows Store per le app Electron](windows-store-guide.md).                                       |
