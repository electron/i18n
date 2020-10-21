---
title: Documenti API di Electrons come dati strutturati
author: zeke
date: '2016-09-27'
---

Oggi annunciamo alcuni miglioramenti alla documentazione di Electron. Ogni nuova release ora include un [file JSON](https://github.com/electron/electron/releases/download/v1.4.1/electron-api.json) che descrive in dettaglio tutte le API pubbliche di Electron. Abbiamo creato questo file per consentire agli sviluppatori di utilizzare la documentazione API di Electron, in nuovi modi interessanti.

---

## Panoramica dello schema

Ogni API è un oggetto con proprietà come nome, descrizione, tipo, ecc. Lezioni come `BrowserWindow` e `Menu` hanno proprietà aggiuntive che descrivono i loro metodi di istanza, proprietà di istanza, eventi di istanza, ecc.

Ecco un estratto dallo schema che descrive la classe `BrowserWindow`:

```js
{
  name: 'BrowserWindow',
  description: 'Create and control browser windows. ,
  processo: {
    main: true,
    renderer: false
  },
  type: 'Class',
  instanceName: 'win',
  slug: 'browser-window',
  websiteUrl: 'https://electronjs. rg/docs/api/browser-window',
  repoUrl: 'https://github.com/electron/electron/blob/v1.4.0/docs/api/browser-window. d',
  staticMethods: [...],
  instanceMethods: [...],
  instanceProperties: [...],
  instanceEvents: [...]
}
```

Ed ecco un esempio di descrizione di un metodo, in questo caso il `apis.BrowserWindow.instanceMethods.setMaximumSize` istanza metodo:

```js
{
  name: 'setMaximumSize',
  signature: '(width, height)',
  descrizione: 'Imposta la dimensione massima della finestra a larghezza e altezza. ,
  parametri: [{
    name: 'width',
    type: 'Integer'
  }, {
    name: 'height',
    type: 'Integer'
  }]
}
```

## Usare i nuovi dati

Per facilitare agli sviluppatori l'utilizzo di questi dati strutturati nei loro progetti, abbiamo creato [electron-docs-api](https://www.npmjs.com/package/electron-api-docs), un piccolo pacchetto npm che viene pubblicato automaticamente ogni volta che c'è una nuova release Electron .

```sh
npm install electron-api-docs --save
```

Per gratificazione immediata, prova il modulo nel tuo REPL Node.js:

```sh
npm i -g trymodule && trymodule electron-api-docs=apis
```

## Come vengono raccolti i dati

La documentazione API di Electron aderisce a [Electron Coding Style](https://github.com/electron/electron/blob/master/docs/development/coding-style.md) e [Electron Styleguide](https://github.com/electron/electron/blob/master/docs/styleguide.md#readme), in modo che il suo contenuto possa essere analizzato a livello programmatico.

Il [electron-docs-linter](https://github.com/electron/electron-docs-linter) è una nuova dipendenza di sviluppo del repository `electron/electron`. È uno strumento a riga di comando che lancia tutti i file markdown e impone le regole dello styleguide. Se si riscontrano errori, essi sono elencati e il processo di rilascio viene interrotto. Se i documenti API sono validi, il `electron-json. pi` file è stato creato e [caricato su GitHub](https://github.com/electron/electron/releases/tag/v1.4.1) come parte del rilascio di Electron.

## Javascript standard e Markdown standard

All'inizio di quest'anno, il codebase di Electron's è stato aggiornato per utilizzare lo standard [``](http://standardjs.com/) linter per tutti i JavaScript. Standard README riassume il ragionamento alla base di questa scelta:

> Adottare lo stile standard significa classificare l'importanza della chiarezza del codice e delle convenzioni comunitarie più alto dello stile personale. Questo potrebbe non avere senso per il 100% dei progetti e delle culture di sviluppo, ma open source può essere un luogo ostile per i neofiti. La definizione di aspettative chiare e automatizzate rende un progetto più sano.

Abbiamo anche creato di recente [standard-markdown](https://github.com/zeke/standard-markdown) per verificare che tutti i frammenti di codice JavaScript presenti nella nostra documentazione siano validi e coerenti con lo stile del codebase stesso.

Insieme questi strumenti ci aiutano a utilizzare l'integrazione continua (CI) per trovare automaticamente gli errori nelle richieste di pull. Questo riduce l'onere imposto agli esseri umani di fare la revisione del codice e ci dà più fiducia sull'accuratezza della nostra documentazione.

### Uno sforzo comunitario

La documentazione di Electron's è in costante miglioramento, e abbiamo la nostra fantastica comunità open-source per ringraziarlo. A partire da questo scritto, quasi 300 persone hanno contribuito ai documenti.

Siamo entusiasti di vedere cosa fanno le persone con questi nuovi dati strutturati. Possibili usi includono:

- Miglioramenti a [https://electronjs.org/docs/](https://electronjs.org/docs/)
- Un file di definizione [TypeScript](https://github.com/electron/electron-docs-linter/blob/master/README.md#typescript-definitions) per uno sviluppo più semplificato di Electron nei progetti che utilizzano TypeScript.
- Documentazione offline ricercabile per strumenti come [Dash.app](https://kapeli.com/dash) e [devdocs.io](http://devdocs.io/)

