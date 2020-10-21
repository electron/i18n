---
title: Cerca
author:
  - echjordan
  - vanessayuenn
  - zeke
date: '2018-06-21'
---

Il sito web di Electron ha un nuovo motore di ricerca che fornisce risultati istantanei per documenti API, tutorial, pacchetti npm relativi ad elettroni e altro ancora.

<figure>
  <a href="https://electronjs.org/?query=resize" style="display: block; text-align: center;">
    <img class="screenshot" src="https://user-images.githubusercontent.com/2289/41683719-417ca80a-7490-11e8-9a52-fb145f4251ba.png" alt="Screenshot Ricerca Elettronica">
  </a>
</figure>

---

Imparare una nuova tecnologia o un quadro come Electron può essere intimidatorio. Una volta superata la fase [quick-start](https://github.com/electron/electron-quick-start) , può essere difficile imparare le migliori pratiche, trova le API giuste, o scopri gli strumenti che ti aiuteranno a costruire l'app dei tuoi sogni. Vogliamo che il sito web Electron sia uno strumento migliore per trovare le risorse di cui hai bisogno per costruire app più velocemente e più facilmente.

Visita qualsiasi pagina su [electronjs.org](https://electronjs.org) e troverai il nuovo input di ricerca nella parte superiore della pagina.

## Il Motore Di Ricerca

Quando abbiamo impostato per la prima volta di aggiungere la ricerca al sito web, abbiamo fatto rotolare il nostro motore di ricerca utilizzando GraphQL come backend. GraphQL è stato divertente per lavorare con e il motore di ricerca è stato performante, ma ci siamo rapidamente resi conto che costruire un motore di ricerca non è un compito banale. Cose come la ricerca multi-parola e il rilevamento di errori di battitura richiedono molto lavoro per avere ragione. Piuttosto che reinventare la ruota, abbiamo deciso di utilizzare una soluzione di ricerca esistente: [Algolia](https://algolia.com).

Algolia è un servizio di ricerca ospitato che è diventato rapidamente il motore di ricerca di scelta tra popolari progetti open source come React, Vue, Bootstrap, Yarn, e [molti altri](https://community.algolia.com/docsearch/).

Ecco alcune delle caratteristiche che hanno fatto di Algolia una buona misura per il progetto Electron:

- [InstantSearch.js](https://community.algolia.com/instantsearch.js) fornisce risultati come si digita, di solito in circa 1ms.
- [Tolleranza Typo](https://www.algolia.com/doc/guides/textual-relevance/typo-tolerance/) significa che otterrai ancora risultati anche quando digiti [`widnow`].
- [La sintassi di query avanzata](https://www.algolia.com/doc/api-reference/api-parameters/advancedSyntax/) abilita `"le corrispondenze citate"` e `-exclusion`.
- [client API](https://www.algolia.com/doc/api-client/javascript/getting-started/) sono open source e con ben documentati.
- [Analytics](https://www.algolia.com/doc/guides/analytics/analytics-overview/) ci dice cosa sono le persone alla ricerca di più, così come quello che stanno cercando ma non trovando. Questo ci fornirà preziose informazioni su come migliorare la documentazione di Electron.
- Algolia è [gratuita per progetti open source](https://www.algolia.com/for-open-source).

## API Docs

A volte sai *cosa* vuoi fare, ma non sai esattamente *come* farlo. Electron ha oltre 750 metodi API, eventi e proprietà. Nessun umano può facilmente ricordare tutti loro, ma i computer sono bravi in questa roba. Utilizzando [JSON API docs](https://electronjs.org/blog/api-docs-json-schema), abbiamo indicizzato tutti questi dati in Algolia, e ora puoi facilmente trovare l'API esatta che stai cercando.

Tentativo di ridimensionare una finestra? Cerca [`ridimensiona`] e salta direttamente al metodo di cui hai bisogno.

## Tutorial

Electron ha una collezione di tutorial in continua crescita per completare la sua documentazione API . Ora puoi trovare più facilmente tutorial su un dato argomento, proprio accanto alla relativa documentazione API.

Cerchi le migliori pratiche in materia di sicurezza? Cerca [`security`].

## npm Pacchetti

There are now over 700,000 packages in the npm registry and it's not always easy to find the one you need. Per facilitare la scoperta di questi moduli, abbiamo creato [`electron-npm-packages`], una raccolta dei 3400+ moduli in il registro che sono costruiti appositamente per l'uso con Electron.

The folks at [Libraries.io](https://libraries.io) have created [SourceRank](https://docs.libraries.io/overview.html#sourcerank), a system for scoring software projects based on a combination of metrics like code, community, documentation, and usage. Abbiamo creato un modulo [`sourceranks`] che include il punteggio di ogni modulo nel registro npm, e noi usiamo questi punteggi per ordinare i risultati del pacchetto.

Vuoi alternative ai moduli IPC incorporati di Electron? Cerca [`is:package ipc`].

## Applicazioni Electron

È [facile indicizzare i dati con Algolia](https://github.com/electron/algolia-indices), così abbiamo aggiunto la lista delle applicazioni esistenti da [electron/apps](https://github.com/electron/apps).

Prova una ricerca per [`music`] o [`homebrew`].

## Risultati Del Filtraggio

Se hai usato la ricerca di codice [di GitHub](https://github.com/search) prima, probabilmente conosci i suoi filtri separati da due punti come `extension:js` o `utente:defunkt`. Pensiamo che questa tecnica di filtraggio sia piuttosto potente, così abbiamo aggiunto un `è:` parola chiave per la ricerca di Electron, che ti permette di filtrare i risultati per mostrare solo un singolo tipo:

- [`is:api thumbnail`]
- [`is:tutorial security`]
- [`is:package ipc`]
- [`is:app graphql`]

## Navigazione Tastiera

Le persone amano le scorciatoie da tastiera! La nuova ricerca può essere utilizzata senza togliere le dita dalla tastiera:

- <kbd>/</kbd> focalizza l' input di ricerca
- <kbd>esc</kbd> focalizza l'input di ricerca e lo cancella
- <kbd>verso il basso</kbd> si sposta al risultato successivo
- <kbd>up</kbd> si sposta al risultato precedente o all'input di ricerca
- <kbd>enter</kbd> apre un risultato

Abbiamo anche open-source il [modulo](https://github.com/electron/search-with-your-keyboard/) che abilita questa interazione tastiera. È progettato per l'uso con Algolia InstantSearch, ma è generalizzato per abilitare la compatibilità con diverse implementazioni di ricerca.

## Vogliamo il tuo feedback

Se si incontrano problemi con il nuovo strumento di ricerca, vogliamo sentirlo!

Il modo migliore per inviare il tuo feedback è archiviare un problema su GitHub nel repository appropriato:

- [electron/electronjs.org](https://github.com/electron/electronjs.org) è il sito web di Electron. Se non sai dove archiviare un problema, questa è la tua scommessa migliore.
- [electron/algolia-indices](https://github.com/electron/algolia-indices) è dove vengono compilati tutti i dati Electron ricercabili.
- [electron/search-with-your-keyboard](https://github.com/electron/search-with-your-keyboard) rende l'interfaccia di ricerca navigabile dalla tastiera.
- [algolia/instantsearch.js](https://github.com/algolia/instantsearch.js) è il client lato browser che abilita la ricerca find-as-you-type.
- [algolia/algoliasearch-client-javascript](https://github.com/algolia/algoliasearch-client-javascript) è il client Node.js per caricare i dati sui server di Algolia.

## Grazie

Un ringraziamento speciale a [Emily Jordan](https://github.com/echjordan) e [Vanessa Yuen](https://github.com/vanessayuenn) per aver costruito queste nuove capacità di ricerca, a [Librerie. o](https://libraries.io) per fornire [SourceRank](https://docs.libraries.io/overview.html#sourcerank) punti, e al team di Algolia per aiutarci a iniziare. 🍹