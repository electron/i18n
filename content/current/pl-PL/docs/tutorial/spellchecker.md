# SpellChecker

Electron posiada wbudowane wsparcie dla sprawdzania pisowni Chromium od Electron 8.  W systemie Windows i Linux jest to obsługiwane przez słowniki Hunspell, a na macOS korzysta z natywnych API walidatora.

## Jak włączyć sprawdzanie pisowni?

Dla Electron 9 i wyższych, sprawdzacz pisowni jest domyślnie włączony.  Dla Electron 8 musisz włączyć go w `webPreferences`.

```js
const myWindow = new BrowserWindow({
  webPreferences: {
    spellcheck: true
  }
})
```

## Jak ustawić języki używane przez sprawdzacz pisowni?

W systemie macOS, ponieważ używamy natywnych API, nie ma sposobu na ustawienie języka używanego przez walidatora. Domyślnie na macOS natywny sprawdzacz pisowni automatycznie wykryje język używany dla Ciebie.

Dla Windows i Linux istnieje kilka API Electron powinieneś używać do ustawiania języków dla sprawdzania pisowni.

```js
// Ustawia sprawdzacz pisowni na angielski i francuski
myWindow.session. etSpellCheckerLanguages(['pl-US', 'fr'])

// tablica wszystkich dostępnych kodów językowych
const possibleLanguages = myWindow.session.availableSpellCheckerLanguages
```

Domyślnie sprawdzacz pisowni włączy język pasujący do aktualnej lokalizacji systemu operacyjnego.

## Jak umieścić wyniki sprawdzania pisowni w moim menu kontekstowym?

Wszystkie informacje wymagane do wygenerowania menu kontekstowego są podane w [`menu kontekstowym`](../api/web-contents.md#event-context-menu) zdarzenie na każdej instancji `zawartości web`.  Poniżej przedstawiono mały przykład jak utworzyć menu kontekstowe z tymi informacjami.

```js
const { Menu, MenuItem } = require('electron')

myWindow.webContents. n('kontekst-menu', (zdarzenie), params) => {
  menu const = nowe menu()

  // Dodaj każdą sugestię pisowni
  dla (const suggestion of params. menu ictionarySuggestions) {
    . ppend(new MenuItem({
      label: suggestion,
      click: () => mainWindow.webContents. eplaceMisspelling(suggestion)
    }))
  }

  // Zezwól użytkownikom na dodanie błędnego słowa do słownika
  jeśli (paramy. isspelledWord) {
    menu. ppend(
      new MenuItem({
        label: 'Add to dictionary',
        kliknięcie: () => mainWindow. ebContent. ession.addWordToSpellCheckerDictionary(params.misspelledWord)
      })
    )
  }

  menu.popup()
})
```

## Czy sprawdzacz pisowni używa usług Google?

Chociaż sam sprawdzacz pisowni nie wysyła żadnych typów, słowa lub dane wejściowe użytkownika do usług Google pliki słownika polowania są domyślnie pobierane z Google CDN.  Jeśli chcesz tego uniknąć, możesz podać alternatywny adres URL do pobrania słowników.

```js
myWindow.session.setSpellCheckerDictionaryDownloadURL('https://example.com/dictionaries/')
```

Check out the docs for [`session.setSpellCheckerDictionaryDownloadURL`](../api/session.md#sessetspellcheckerdictionarydownloadurlurl) for more information on where to get the dictionary files from and how you need to host them.
