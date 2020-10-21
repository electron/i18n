# SpellChecker

Electron má vestavěnou podporu pro kontrolu pravopisu Chromia od Electronu 8.  Na Windows a Linuxu je to poháněno Hunspell slovníky a na macOS používá nativní kontrolní skripty API.

## Jak povolit kontrolu pravopisu?

Pro Electron 9 a vyšší je kontrola pravopisu ve výchozím nastavení povolena.  Pro Electron 8 ji musíte povolit v `webPreferences`.

```js
const myWindow = nový BrowserWindow({
  webPreference: {
    spellcheck: true
  }
})
```

## Jak nastavit jazyky, které používá kontrola pravopisu?

Na macOS při používání nativního API neexistuje způsob, jak nastavit jazyk, který kontrola pravopisu používá. Ve výchozím nastavení na macOS bude nativní kontrola pravopisu automaticky rozpoznat jazyk, který pro vás používáte.

Pro Windows a Linux je k dispozici několik Electron API, které byste měli použít k nastavení jazyků pro kontrolu pravopisu.

```js
// Nastaví pravopisný checker pro kontrolu angličtiny z USA a francouzštiny
myWindow.session. etSpellCheckerLanguages(['en-US', 'fr'])

// Pole všech dostupných jazykových kódů
const possibleLanguages = myWindow.session.availableSpellCheckerLanguages
```

Ve výchozím nastavení povolí kontrola pravopisu jazyk, který odpovídá aktuálnímu OS locale.

## Jak mohu dát výsledky kontroly pravopisu v mém kontextovém menu?

All the required information to generate a context menu is provided in the [`context-menu`](../api/web-contents.md#event-context-menu) event on each `webContents` instance.  Níže je uveden malý příklad toho, jak vytvořit kontextovou nabídku s těmito informacemi.

```js
const { Menu, MenuItem } = vyžadováno ('electron')

myWindow.webContents. n('context-menu', (událost, params) => {
  Menu souběhu = nové Menu()

  // Přidejte každý pravopisný návrh
  pro (náhodný návrh parametrů). ictionarySuggestions) {
    menu. ppend(new MenuItem({
      label: suggestion,
      klikněte: () => mainWindow.webContents. eplaceMisspelling(suggestion)
    }))
  }

  // Povolit uživatelům, aby přidali špatně označené slovo do slovníku
  , pokud (params. isspelledWord) {
    menu. ppend(
      nový štítek MenuItem({
        : 'Přidat do slovníku',
        klikněte: () => mainWindow. ebobsah. ession.addWordToSpellCheckerDictionary(params.misspelledWord)
      })
    )
  }

  menu.popup()
})
```

## Používá kontrola pravopisu nějaké služby Google?

Přestože samotná kontrola pravopisu neodesílá žádné typy, Slova nebo vstup uživatele do služeb Google, které jsou ve výchozím nastavení stahovány z Google CDN.  Pokud se chcete vyhnout, můžete poskytnout alternativní URL pro stažení slovníků.

```js
myWindow.session.setSpellCheckerDictionaryDownloadURL('https://example.com/dictionaries/')
```

Podívejte se na dokumentaci pro [`relaci. etSpellCheckerDictionaryDownloadURL`](https://www.electronjs.org/docs/api/session#sessetspellcheckerdictionarydownloadurlurl) pro více informací o tom, kde získat slovníkové soubory a jak je potřebujete hostovat.
