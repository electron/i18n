# SpellChecker

Electron unterstützt seit Electron 8 Chromiums Rechtschreibprüfung.  Unter Windows und Linux wird dies von Hunspell Wörterbüchern betrieben und auf macOS werden die nativen Rechtschreibprüfungs-APIs verwendet.

## Wie kann ich die Rechtschreibprüfung aktivieren?

Bei Electron 9 und höher ist die Rechtschreibprüfung standardmäßig aktiviert.  Für Electron 8 müssen Sie es in `webPreferences` aktivieren.

```js
const myWindow = new BrowserWindow({
  webEinstellungen: {
    spellcheck: true
  }
})
```

## Wie kann man die Sprachen einstellen, die der Rechtschreibprüfer verwendet?

Bei macOS gibt es keine Möglichkeit, die Sprache der Rechtschreibprüfung zu setzen. Standardmäßig erkennt die native Rechtschreibprüfung automatisch die Sprache, die für Sie verwendet wird.

Für Windows und Linux gibt es einige Electron-APIs, die Sie verwenden sollten, um die Sprachen für den Rechtschreibprüfer festzulegen.

```js
// Setzt die Rechtschreibprüfung auf Englisch in den USA und Französisch
myWindow.session. etSpellCheckerLanguages(['en-US', 'fr'])

// Ein Array aller verfügbaren Sprachcodes
const possible Languages = myWindow.session.availableSpellCheckerLanguages
```

Standardmäßig aktiviert die Rechtschreibprüfung die Sprache, die mit der aktuellen OS-Sprache übereinstimmt.

## Wie kann ich die Ergebnisse der Rechtschreibprüfung in mein Kontextmenü einfügen?

Alle erforderlichen Informationen zur Erzeugung eines Kontextmenüs werden im [`Kontextmenü`](../api/web-contents.md#event-context-menu) auf jedem `WebContents` angezeigt.  Ein kleines Beispiel für das Erstellen eines Kontextmenüs mit diesen Informationen ist unten angegeben.

```js
const { Menu, MenuItem } = require('electron')

myWindow.webContents. n('Kontextmenü', (Ereignis, params) => {
  const menu = new Menu()

  // Fügen Sie jeden Rechtschreibvorschlag
  für (const suggestion of params. ictionarySuggestions) {
    Menü. ppend(new MenuItem({
      label: suggestion,
      click: () => mainWindow.webContents. eplaceMisspelling(suggestion)
    }))
  }

  // Erlaubt Benutzern das falsch geschriebene Wort dem Wörterbuch
  hinzuzufügen, falls (params. isspelledWord) {
    Menü. ppend(
      new MenuItem({
        label: 'Add to dictionary',
        Klick: () => mainWindow. ebContents. ession.addWordToSpellCheckerDictionary(params.misspelledWord)
      })
    )
  }

  menu.popup()
})
```

## Verwendet der Rechtschreibprüfer irgendwelche Google-Dienste?

Obwohl die Rechtschreibprüfung selbst keine Typen sendet, Wörter oder Benutzereingabe für Google-Dienste werden standardmäßig von einem Google CDN heruntergeladen.  Wenn Sie dies vermeiden möchten, können Sie eine alternative URL angeben, von der Sie die Wörterbücher herunterladen können.

```js
myWindow.session.setSpellCheckerDictionaryDownloadURL('https://example.com/dictionaries/')
```

Schauen Sie sich die Dokumentation für die [`Sitzung an. etSpellCheckerDictionaryDownloadURL`](https://www.electronjs.org/docs/api/session#sessetspellcheckerdictionarydownloadurlurl) für weitere Informationen darüber, woher Sie die Wörterbuchdateien beziehen und wie Sie sie hosten müssen.
