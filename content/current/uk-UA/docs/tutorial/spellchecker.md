# SpellChecker

Electron має вбудовану підтримку для орфографії Chromium з часу Electron 8.  На Windows та Linux ця живиться за допомогою словників Hunspell та на macOS він використовує нативні API орфографії.

## Як увімкнути перевірку орфографії?

Для Electron 9 та вище перевірки правопису включено за замовчуванням.  Для Electron 8 вам потрібно ввімкнути його в `web-Налаштуваннях`.

```js
const myWindow = new BrowserWindow({
  веб-налаштування: {
    spellcheck: true
  }
})
```

## Як встановити мови які використовує програма перевірки орфографії?

На macOS як ми використовуємо рідний API не можна встановити мову, яку використовує орфографія. За замовчуванням на macOS нативний орфографію орфографії автоматично визначить мову, яка використовується для вас.

Для Windows та Linux декілька Electron API ви повинні використовувати для встановлення мов для перевірки орфографії.

```js
// Встановлює перевірку правопису для перевірки англійської США та французької
myWindow.session. etSpellCheckerLanguages(['en-US', 'fr'])

// Масив всіх доступних мовних кодів
const possibleLanguages = myWindow.session.availableSpellCheckerLanguages
```

За замовчуванням засіб перевірки орфографії буде включено мову, яка відповідає поточній локалі ОС.

## Як мені внести результати перевірки правопису в моє контекстне меню?

Вся потрібна інформація для створення контекстного меню [`у меню`](../api/web-contents.md#event-context-menu) події на кожному `веб-змістах` надається екземпляр unnamed@@1.  Невеликий приклад створення контекстного меню з цією інформацією наведено нижче.

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

## Чи використовує засіб перевірки правопису якісь служби Google?

Хоча сам семінар не посилає жодних типів, слів або ввід користувача до служб Google були завантажені з файлів словників Google CDN за замовчуванням.  Якщо ви хочете уникнути цього, ви можете вказати альтернативний URL для завантаження словників.

```js
myWindow.session.setSpellCheckerDictionaryDownloadURL('https://example.com/dictionaries/')
```

Погляньте на документацію для [`сесії. etSpellCheckerDictionaryDownloadURL`](https://www.electronjs.org/docs/api/session#sessetspellcheckerdictionarydownloadurlurl) для отримання додаткової інформації про те, де можна знайти файли словників та як вам потрібно їх зберігати.
