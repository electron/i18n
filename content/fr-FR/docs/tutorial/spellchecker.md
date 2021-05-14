# SpellChecker

Electron a la prise en charge intégrée du correcteur orthographique de Chromium depuis Electron 8.  Sous Windows et Linux, ceci est alimenté par des dictionnaires Hunspell et sur macOS, il utilise les API natives du correcteur orthographique.

## Comment activer le correcteur orthographique ?

Pour Electron 9 et plus, le correcteur orthographique est activé par défaut.  Pour Electron 8, vous devez l'activer dans `webPreferences`.

```js
const myWindow = new BrowserWindow({
  webPreferences: {
    spellcheck: true
  }
})
```

## Comment définir les langues utilisées par le correcteur orthographique ?

Sur macOS comme nous utilisons les API natives, il n'y a aucun moyen de définir le langage que le correcteur orthographique utilise. Par défaut, sur macOS, le correcteur d'orthographe natif détectera automatiquement la langue utilisée pour vous.

Pour Windows et Linux, il y a quelques API Electron que vous devriez utiliser pour définir les langues pour le correcteur orthographique.

```js
// Définit le correcteur orthographique pour vérifier l'anglais
monWindow.session. etSpellCheckerLanguages(['en-US', 'fr'])

// Un tableau de tous les codes de langue disponibles
const possibleLanguages = myWindow.session.availableSpellCheckerLanguages
```

Par défaut, le correcteur orthographique activera la langue correspondant à la locale actuelle de l'OS.

## Comment placer les résultats du correcteur orthographique dans mon menu contextuel ?

Toutes les informations requises pour générer un menu contextuel sont fournies dans l'événement [`context-menu`](../api/web-contents.md#event-context-menu) sur chaque `webContents` instance.  Un petit exemple de comment créer un menu contextuel avec ces informations est fourni ci-dessous.

```js
const { Menu, MenuItem } = require('electron')

myWindow.webContents. n('menu contextuel', (événement, params) => {
  const menu = new Menu()

  // Ajoute chaque suggestion d'orthographe
  pour (const suggestion de paramètres. ictionarySuggestions) {
    menu. ppend(new MenuItem({
      label: suggestion,
      click: () => mainWindow.webContents. eplaceMisspelling(suggestion)
    }))
  }

  // Permet aux utilisateurs d'ajouter le mot mal orthographié au dictionnaire
  si (params. isspelledWord) {
    menu. ppend(
      new MenuItem({
        label: 'Ajouter au dictionnaire',
        clic : () => mainWindow. Contenus directs. ession.addWordToSpellCheckerDictionary(params.misspelledWord)
      })
    )
  }

  menu.popup()
})
```

## Est-ce que le correcteur orthographique utilise des services Google ?

Bien que le correcteur orthographique lui-même n'envoie pas de types, mots ou saisie par l'utilisateur des services Google les fichiers du dictionnaire hunspell sont téléchargés par défaut à partir d'un CDN Google.  Si vous voulez éviter cela, vous pouvez fournir une URL alternative pour télécharger les dictionnaires.

```js
myWindow.session.setSpellCheckerDictionaryDownloadURL('https://example.com/dictionaries/')
```

Consultez la documentation de [`session.setSpellCheckerDictionaryDownloadURL`](../api/session.md#sessetspellcheckerdictionarydownloadurlurl) pour plus d'informations sur l'endroit où obtenir les fichiers de dictionnaire et comment vous devez les héberger.
