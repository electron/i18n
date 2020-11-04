---
title: "Annuncio del supporto TypeScript in Electron"
author: zeke
date: '2017-06-01'
---

Il pacchetto `electron` npm ora include un file di definizione TypeScript che fornisce annotazioni dettagliate dell'intera API Electron. Queste annotazioni possono migliorare la tua esperienza di sviluppo di Electron **anche se stai scrivendo vaniglia JavaScript**. Solo `npm install electron` per ottenere nuovi tipi di Electron nel tuo progetto.

---

TypeScript è un linguaggio di programmazione open-source creato da Microsoft. È un superset di JavaScript che estende la lingua aggiungendo il supporto per tipi statici. La comunità TypeScript è cresciuta rapidamente negli ultimi anni, e TypeScript sono stati classificati tra i [linguaggi di programmazione più amati](https://stackoverflow.com/insights/survey/2017#technology-most-loved-dreaded-and-wanted-languages) in un recente sondaggio Stack Overflow.  TypeScript è descritto come "JavaScript che scala" e squadre di [GitHub](https://githubengineering.com/how-four-native-developers-wrote-an-electron-app/), [Slack](https://slack.engineering/typescript-at-slack-a81307fa288d), e [Microsoft](https://github.com/Microsoft/vscode) lo utilizzano tutti per scrivere app di Electron scalabili che vengono utilizzate da milioni di persone.

TypeScript supporta molte delle funzionalità linguistiche più recenti in JavaScript come le classi , distruzione di oggetti, and async/await, but its real differentiating feature is **type annotations**. Dichiarare i tipi di dati di input e output previsti dal programma può [ridurre i bug](https://slack.engineering/typescript-at-slack-a81307fa288d) aiutandoti a trovare errori al momento della compilazione, e le annotazioni possono anche servire come dichiarazione formale di [come funziona il tuo programma](https://staltz.com/all-js-libraries-should-be-authored-in-typescript.html).

Quando le librerie sono scritte in Javascript, i tipi sono spesso vagamente definiti come un ripensamento quando si scrive la documentazione. Le funzioni possono spesso accettare più tipi di quello che è stato documentato, o una funzione può avere vincoli invisibili che non sono documentati, che possono portare a errori di runtime.

TypeScript risolve questo problema con i file di definizione ****. Un file di definizione TypeScript descrive tutte le funzioni di una libreria e i suoi tipi di input e output previsti. Quando gli autori della libreria raggruppano un file di definizione TypeScript con la loro libreria pubblicata, i consumatori di quella libreria possono [esplorare la sua API direttamente all'interno del loro editor](https://code.visualstudio.com/docs/editor/intellisense) e iniziare a usarla subito, spesso senza bisogno di consultare la documentazione della biblioteca .

Molti progetti popolari come [Angular](https://angularjs.org/), [Vue. s](http://vuejs.org/), [node-github](https://github.com/mikedeboer/node-github) (e ora Electron! compilare il proprio file di definizione e bundle con il loro pubblicato pacchetto npm. Per i progetti che non aggregano il proprio file di definizione, c'è [DefinitamenteDigitato](https://github.com/DefinitelyTyped/DefinitelyTyped), un ecosistema di terze parti di file di definizione mantenuti nella comunità.

## Installazione

A partire dalla versione 1.6.10, ogni rilascio di Electron include il proprio file di definizione TypeScript. Quando si installa il pacchetto `electron` da npm, il file `electron.d.ts` viene fornito automaticamente con il pacchetto installato.

Il modo [più sicuro](https://electronjs.org/docs/tutorial/electron-versioning/) per installare Electron sta usando un numero di versione esatto:

```sh
npm install electron --save-dev --save-exact
```

O se stai usando [filati](https://yarnpkg.com/lang/en/docs/migrating-from-npm/#toc-cli-commands-comparison):

```sh
yarn add electron --dev --exact
```

Se stavi già usando definizioni di terze parti come `@types/electron` e `@types/node`, dovresti rimuoverli dal tuo progetto Electron per evitare collisioni.

Il file di definizione è derivato dalla nostra documentazione [strutturata API](https://electronjs.org/blog/2016/09/27/api-docs-json-schema), quindi sarà sempre coerente con la documentazione API di [di Electron](https://electronjs.org/docs/api/). Basta installare `electron` e otterrai sempre le definizioni TypeScript che sono aggiornate con la versione di Electron che stai utilizzando.

## Uso

Per un riassunto di come installare e utilizzare le nuove annotazioni TypeScript di Electron, guarda questo breve screencast demo: <iframe width="100%" height="420" src="https://www.youtube.com/embed/PJRag0rYQt8" frameborder="0" allowfullscreen mark="crwd-mark"></iframe>

Se stai usando [Visual Studio Code](https://code.visualstudio.com/), hai già il supporto TypeScript è stato integrato. Ci sono anche plugin mantenuti dalla comunità per [Atom](https://atom.io/packages/atom-typescript), [Sublime](https://github.com/Microsoft/TypeScript-Sublime-Plugin), [vim](https://github.com/Microsoft/TypeScript/wiki/TypeScript-Editor-Support#vim), e [altri redattori](https://www.typescriptlang.org/index.html#download-links).

Una volta che il tuo editor è configurato per TypeScript, inizierai a vedere più comportamento consapevole del contesto come suggerimenti di autocompletamento, riferimento metodo inline, controllo degli argomenti, e altro ancora.

<figure>
  <img src="https://cloud.githubusercontent.com/assets/2289/26128017/f6318c20-3a3f-11e7-9c2c-401a32d1f9fb.png" alt="Metodo autocompletamento">
  <figcaption>Metodo di completamento automatico</figcaption>
</figure>

<figure>
  <img src="https://cloud.githubusercontent.com/assets/2289/26128018/f6352600-3a3f-11e7-8d92-f0fb88ecc53e.png" alt="Metodo di riferimento">
  <figcaption>Inline method reference</figcaption>
</figure>

<figure>
  <img src="https://cloud.githubusercontent.com/assets/2289/26128021/f6b1ca0c-3a3f-11e7-8161-ce913268a9f0.png" alt="Controllo argomenti">
  <figcaption>Controllo degli argomenti</figcaption>
</figure>

## Iniziare con TypeScript

Se sei nuovo a TypeScript e vuoi saperne di più, questo video introduttivo [di Microsoft](http://video.ch9.ms/ch9/4ae3/062c336d-9cf0-498f-ae9a-582b87954ae3/B881_mid.mp4) fornisce una bella panoramica del perché la lingua è stata creata, come funziona, come usarlo, e dove è diretto.

C'è anche un manuale [](https://www.typescriptlang.org/docs/handbook/basic-types.html) e un [parco giochi](https://www.typescriptlang.org/play/index.html) sul sito ufficiale di TypeScript.

Poiché TypeScript è un superset di JavaScript, il tuo codice JavaScript esistente è già valido TypeScript. This means you can gradually transition an existing JavaScript project to TypeScript, sprinkling in new language features as needed.

## Grazie

Questo progetto non sarebbe stato possibile senza l'aiuto di Electron's comunità di manutentori open-source. Grazie a [Samuel Attard](https://github.com/MarshallOfSound), [Felix Rieseberg](https://github.com/felixrieseberg), [Birunthan Mohanathas](https://github.com/poiru), [Milan Burda](https://github.com/miniak), [Brendan Forster](https://github.com/shiftkey), e molti altri per le loro correzioni di bug, miglioramenti della documentazione, e guida tecnica.

## Supporto

Se si riscontrano problemi utilizzando i nuovi file di definizione TypeScript di Electron, si prega di archiviare un problema sul repository [electron-typescript-definitions](https://github.com/electron/electron-typescript-definitions/issues).

Felice TypeScripting!
