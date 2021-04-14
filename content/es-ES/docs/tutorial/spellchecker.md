# SpellChecker

Electron tiene soporte incorporado para los correctores ortográficos de Chromium desde Electron 8.  En Windows y Linux esto es alimentado por diccionarios Hunspell, y en macOS hace uso de las API nativas de correctores ortográficos.

## ¿Cómo activar el corrector ortográfico?

Para Electron 9 o superior el corrector ortográfico está habilitado por defecto.  Para Electron 8 necesita activarlo en `webPreferences`.

```js
const myWindow = new BrowserWindow({
  webPreferences: {
    spellcheck: true
  }
})
```

## ¿Cómo configurar los idiomas que utiliza el corrector ortográfico?

En macOS como usamos las APIs nativas no hay forma de establecer el idioma que utiliza el corrector ortográfico. Por defecto en macOS el corrector ortográfico nativo detectará automáticamente el idioma que se está usando para ti.

Para Windows y Linux hay algunas API de Electron que debes usar para configurar los idiomas para el corrector ortográfico.

```js
// Sets the spellchecker to check English US and French
myWindow.session.setSpellCheckerLanguages(['en-US', 'fr'])

// An array of all available language codes
const possibleLanguages = myWindow.session.availableSpellCheckerLanguages
```

Por defecto, el corrector ortográfico habilitará el idioma que coincida con el actual idioma del sistema operativo.

## ¿Cómo pongo los resultados del corrector ortográfico en mi menú contextual?

Toda la información necesaria para generar un menú contextual se proporciona en el evento [`context-menu`](../api/web-contents.md#event-context-menu) en cada instancia `webContents`.  A continuación se proporciona un pequeño ejemplo de cómo hacer un menú contextual con esta información.

```js
const { Menu, MenuItem } = require('electron')

myWindow.webContents.on('context-menu', (event, params) => {
  const menu = new Menu()

  // Add each spelling suggestion
  for (const suggestion of params.dictionarySuggestions) {
    menu.append(new MenuItem({
      label: suggestion,
      click: () => mainWindow.webContents.replaceMisspelling(suggestion)
    }))
  }

  // Allow users to add the misspelled word to the dictionary
  if (params.misspelledWord) {
    menu.append(
      new MenuItem({
        label: 'Add to dictionary',
        click: () => mainWindow.webContents.session.addWordToSpellCheckerDictionary(params.misspelledWord)
      })
    )
  }

  menu.popup()
})
```

## ¿El corrector ortográfico utiliza algún servicio de Google?

Aunque el corrector ortográfico no envía ningún tipo, palabras o entrada de usuario a los servicios de Google los archivos de diccionario hunspell se descargan por defecto de un CDN de Google.  Si desea evitar esto, puede proporcionar una URL alternativa desde la que descargar los diccionarios.

```js
myWindow.session.setSpellCheckerDictionaryDownloadURL('https://example.com/dictionaries/')
```

Revisa la documentación para [`session.setSpellCheckerDictionaryDownloadURL`](../api/session.md#sessetspellcheckerdictionarydownloadurlurl) para más información sobre dónde obtener los archivos de diccionario y como necesitas alojarlos.
