# SpellChecker

Electron имеет встроенную поддержку проверки правописания Chromium начиная с Electron 8.  В Windows и Linux это работает на Hunspell словарях, а в macOS используется API для проверки орфографии.

## Как включить проверку правописания?

Для Electron 9 и выше проверка орфографии включена по умолчанию.  Для Electron 8 необходимо включить его в `веб-настройках`.

```js
const myWindow = new BrowserWindow({
  webPreferences: {
    spellcheck: true
  }
})
```

## Как установить языки для проверки правописания?

В macOS так как мы используем отечественные API, невозможно установить язык, на котором используется проверка орфографии. По умолчанию в macOS встроенная проверка орфографии автоматически определит используемый для вас язык.

Для Windows и Linux существует несколько Electron API, которые необходимо использовать для проверки орфографических накладок.

```js
// Проверка орфографии на английский язык
myWindow.session. etSpellCheckerLanguages(['en-US', 'fr'])

// Массив всех доступных кодов языков
совместимых языков = myWindow.session.availableSpellCheckerLanguages
```

По умолчанию проверка орфографии включит язык, соответствующий текущей локали ОС.

## Как поместить результаты проверки орфографии в контекстное меню?

All the required information to generate a context menu is provided in the [`context-menu`](../api/web-contents.md#event-context-menu) event on each `webContents` instance.  Ниже представлен небольшой пример того, как сделать контекстное меню с этой информацией.

```js
const { Menu, MenuItem } = require('electron')

myWindow.webContents. n('context-menu', (событие, params) => {
  const menu = new Menu()

  // Добавление каждого предложения орфографии
  для (const suggestion of params. ictionarySuggestions) {
    меню. ppend(new MenuItem({
      label: suggestion,
      click: () => mainWindow.webContents. eplaceMisspelling(suggestion)
    }))
  }

  // Разрешить пользователям добавлять неправильное слово в словарь
  if (params. isspelledWord) {
    меню. ppend(
      new MenuItem({
        label: 'Добавить в словарь',
        клик: () => mainWindow. ebContent. ession.addWordToSpellCheckerDictionary(params.misspelledWord)
      })
    )
  }

  menu.popup()
})
```

## Использует ли проверка правописания какие-либо сервисы Google?

Хотя проверка орфографии не посылает ни одного типа, по умолчанию из CDN Google загружаются файлы словарей и фраз пользователей в сервисы Google.  Если вы хотите избежать этого, вы можете указать альтернативный URL-адрес для загрузки словарей.

```js
myWindow.session.setSpellCheckerDictionaryDownloadURL('https://example.com/dictionaries/')
```

Check out the docs for [`session.setSpellCheckerDictionaryDownloadURL`](../api/session.md#sessetspellcheckerdictionarydownloadurlurl) for more information on where to get the dictionary files from and how you need to host them.
