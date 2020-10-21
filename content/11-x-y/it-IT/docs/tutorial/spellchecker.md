# SpellChecker

Electron ha il supporto integrato per il correttore ortografico di Chromium da Electron 8.  Su Windows e Linux questo è alimentato dai dizionari di Hunmag, e su macOS utilizza le API native del correttore ortografico.

## Come abilitare il correttore ortografico?

Per Electron 9 e superiore, il correttore ortografico è abilitato per impostazione predefinita.  Per Electron 8 è necessario abilitarlo in `webPreferences`.

```js
const myWindow = new BrowserWindow({
  webPreferences: {
    spellcheck: true
  }
})
```

## Come impostare le lingue usate dal correttore ortografico?

Su macOS come usiamo le API native non c'è modo di impostare la lingua che il correttore ortografico usa. Per impostazione predefinita su macOS il correttore ortografico nativo rileverà automaticamente la lingua utilizzata per te.

Per Windows e Linux ci sono alcune API Electron da usare per impostare i linguaggi per il correttore ortografico.

```js
// Imposta il correttore ortografico per controllare myWindow.session italiano e francese
. etSpellCheckerLanguages(['en-US', 'fr'])

// Un array di tutti i codici di lingua disponibili
const possibleLanguages = myWindow.session.availableSpellCheckerLanguages
```

Per impostazione predefinita, il correttore ortografico attiverà la lingua corrispondente al locale OS corrente.

## Come posso mettere i risultati del correttore ortografico nel mio menu contestuale?

Tutte le informazioni necessarie per generare un menu contestuale sono fornite nell'evento [`context-menu`](../api/web-contents.md#event-context-menu) su ogni `webContents` istanza.  Di seguito viene fornito un piccolo esempio di come fare un menu contestuale con queste informazioni.

```js
const { Menu, MenuItem } = require('electron')

myWindow.webContents. n('context-menu', (evento, params) => {
  const menu = new Menu()

  // Aggiungi ogni suggerimento ortografico
  for (const suggestion of params. ictionarySuggestions) {
    menu. ppend(new MenuItem({
      label: suggestion,
      click: () => mainWindow.webContents. eplaceMisspelling(suggestion)
    }))
  }

  // Consenti agli utenti di aggiungere la parola errata al dizionario
  se (parametri. isspelledWord) {
    menu. ppend(
      new MenuItem({
        label: 'Add to dictionary',
        clic: () => mainWindow. ebContents. ession.addWordToSpellCheckerDictionary(params.misspelledWord)
      })
    )
  }

  menu.popup()
})
```

## Il correttore ortografico utilizza qualsiasi servizio Google?

Anche se il correttore ortografico stesso non invia alcun tipo di battitura, parole o input utente ai servizi di Google i file di dizionario hunspell vengono scaricati da un CDN di Google per impostazione predefinita.  Se si desidera evitare questo è possibile fornire un URL alternativo per scaricare i dizionari da.

```js
myWindow.session.setSpellCheckerDictionaryDownloadURL('https://example.com/dictionaries/')
```

Dai un'occhiata ai documenti per la sessione [`. etSpellCheckerDictionaryDownloadURL`](https://www.electronjs.org/docs/api/session#sessetspellcheckerdictionarydownloadurlurl) per ulteriori informazioni su dove ottenere i file del dizionario da e come è necessario ospitarli.
