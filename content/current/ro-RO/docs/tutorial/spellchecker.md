# SpellChecker

Electron are suport încorporat pentru verificatorul de vrajitor de Chromium, de la Electron 8.  Pe Windows și Linux acest lucru este alimentat de dicționare Hunspell, iar pe macOS folosește API-uri native spellchecker.

## Cum să activezi vânzătorul?

Pentru Electron 9 și mai mare, distribuitorul este activat în mod implicit.  Pentru Electron 8 trebuie să îl activezi în `webPreferences`.

```js
const myWindow = new BrowserWindow({
  webPreferences: {
    spellcheck: true
  }
})
```

## Cum se setează limbile pe care le folosește distribuitorul?

Pe macOS pe măsură ce folosim API-urile native nu există nicio modalitate de a seta limba pe care o folosește distribuitorul. În mod implicit, pe macOS verificatorul nativ va detecta automat limba folosită pentru dumneavoastră.

Pentru Windows și Linux există câteva API-uri Electron pe care ar trebui să le folosiți pentru a seta limbile pentru distribuitor.

```js
// Setează ortograful pentru a verifica
myWindow.session în Anglia și Franța. etSpellCheckerLanguages(['en-US', 'fr'])

// O serie de toate codurile lingvistice disponibile
const possible Languages = myWindow.session.availableSpellCheckerLanguages
```

În mod implicit, verificatorul de ortograf va activa limba care se potrivește cu actualul sistem de operare local.

## Cum pot pune rezultatele ortografului în meniul meu de context?

Toate informaţiile necesare pentru a genera un meniu de context sunt furnizate în [`evenimentul din meniul contex-`](../api/web-contents.md#event-context-menu) la fiecare `instanţă WebContent`.  Un mic exemplu de cum să faci un meniu contextual cu aceste informaţii este furnizat mai jos.

```js
const { Menu, MenuItem } = require('electron')

myWindow.webContents. n ('context-menu', (eveniment), params) => {
  meniul de anticipare = noul Menu()

  // Adăugaţi fiecare sugestie de ortografie
  pentru (const Sugestie de params. ictionarySuggestions) {
    meniu. ppend(nou MenuItem({
      etichetă: sugestie,
      click: () => mainWindow.webContents. eplaceMisspelling(suggestion)
    }))
  }

  // Permite utilizatorilor să adauge cuvântul scris greșit în dicționar
  dacă (params. isspelledWord) {
    menu. ppend(
      nou MenuItem({
        label: 'Add to dictionary',
        click: () => mainWindow. ebConținut. ession.addToSpellCheckerDictionary(params.misspelledWord)
      })
    )
  }

  menu.popup()
})
```

## Distribuitorul utilizează servicii Google?

Deși vânzătorul nu trimite nici un tip de înregistrare, cuvinte sau introducere de utilizator în serviciile Google fişierele de dicţionare hunspell sunt descărcate în mod implicit de pe un CDN Google.  Dacă doriți să evitați acest lucru, puteți oferi un URL alternativ din care să descărcați dicționarele.

```js
myWindow.session.setSpellCheckerDictionaryDownloadURL('https://example.com/dictionaries/')
```

Check out the docs for [`session.setSpellCheckerDictionaryDownloadURL`](../api/session.md#sessetspellcheckerdictionarydownloadurlurl) for more information on where to get the dictionary files from and how you need to host them.
