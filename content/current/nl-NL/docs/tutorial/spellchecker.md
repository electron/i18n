# SpellChecker

Electron heeft ingebouwde ondersteuning voor Chromium's spellingcontrole sinds Electron 8.  Dit wordt op Windows en Linux mogelijk gemaakt door Hunspell woordenboeken en op macOS maakt het gebruik van de native spellingcontrole API's.

## Hoe de spellingcontrole inschakelen?

Voor Electron 9 en hoger is de spellingscontrole standaard ingeschakeld.  Voor Electron 8 moet u inschakelen in `webVoorkeuren`.

```js
const myWindow = new BrowserWindow({
  webVoorkeuren: {
    spellcheck: true
  }
})
```

## Hoe stel je de talen in die de spellingcontrole gebruikt?

Op macOS terwijl we de native API's gebruiken, is er geen manier om de taal in te stellen die de spellingchecker gebruikt. Standaard detecteert de native speller op macOS de taal die voor je wordt gebruikt.

Voor Windows en Linux zijn er enkele Electron API's die u moet gebruiken om de talen voor de spellingchecer in te stellen.

```js
// Stelt de spellingcontrole in om de Engelse VS en Frans
myWindow.session te controleren. etSpellCheckerLanguages(['en-US', 'fr'])

// Een reeks van alle beschikbare taalcodes
const possibleTalen = myWindow.session.availableSpellCheckerLanguages
```

Standaard zal de spellingscontrole de taal inschakelen die overeenkomt met de huidige OS taalinstelling.

## Hoe zet ik de resultaten van de spellingcontrole in mijn contextmenu?

Alle vereiste informatie voor het genereren van een contextmenu wordt verstrekt in het [`context-menu`](../api/web-contents.md#event-context-menu) event op elke `webContents` instantie.  Een klein voorbeeld van hoe je een contextmenu met deze informatie maakt wordt hieronder verstrekt.

```js
const { Menu, MenuItem } = require('electron')

myWindow.webContents. n('context-menu', (event, params) => {
  const menu = new Menu()

  // Voeg elke spelling suggestie toe
  voor (const suggestie van parameters. ictionarySuggess) {
    menu. ppend(new MenuItem({
      label: suggestie,
      click: () => mainWindow.webContents. eplaceMisspelling(suggestie)
    }))
  }

  // Sta gebruikers toe om het verkeerd gespelde woord toe te voegen aan het woordenboek
  als (params. isspelledWord) {
    menu. ppend(
      nieuwe MenuItem({
        label: 'Voeg toe aan woordenboek',
        klik: () => mainWindow. ebInhoud ession.addWordToSpellCheckerDictionary(params.misspelledWord)
      })
    )
  }

  menu.popup()
})
```

## Gebruikt de spellingscontrole een Google-services?

Hoewel de spellingcontrole zelf geen typen verzendt, woorden of gebruikersinvoer voor Google services worden de bestanden van het jachtwoordenboek standaard van een Google CDN gedownload.  Als u dit wilt voorkomen, kunt u een alternatieve URL opgeven om het woordenboek van te downloaden.

```js
myWindow.session.setSpellCheckerDictionaryDownloadURL('https://example.com/dictionaries/')
```

Check out the docs for [`session.setSpellCheckerDictionaryDownloadURL`](../api/session.md#sessetspellcheckerdictionarydownloadurlurl) for more information on where to get the dictionary files from and how you need to host them.
