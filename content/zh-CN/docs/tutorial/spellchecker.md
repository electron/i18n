# 拼写检查器

自 Electron 8 以来已内置支持 Chromium 拼写检查器。  On Windows and Linux this is powered by Hunspell dictionaries, and on macOS it makes use of the native spellchecker APIs.

## How to enable the spellchecker?

对于 Electron 9 及以上，默认启用拼写检查器。  For Electron 8 you need to enable it in `webPreferences`.

```js
const myWindow = new BrowserWindow({
  webPreferences: {
    spellcheck: true
  }
})
```

## How to set the languages the spellchecker uses?

On macOS as we use the native APIs there is no way to set the language that the spellchecker uses. 默认情况下，macOS 本机拼写检查器会自动检测您使用的语言。

对于 Windows 和 Linux，你应该使用一些 Electron API 来设置拼写检查器的语言。

```js
// Sets the spellchecker to check English US and French
myWindow.session.setSpellCheckerLanguages(['en-US', 'fr'])

// An array of all available language codes
const possibleLanguages = myWindow.session.availableSpellCheckerLanguages
```

By default the spellchecker will enable the language matching the current OS locale.

## How do I put the results of the spellchecker in my context menu?

All the required information to generate a context menu is provided in the [`context-menu`](../api/web-contents.md#event-context-menu) event on each `webContents` instance.  下面提供了一个小的示例，如何用此信息制作上下文菜单。

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

## Does the spellchecker use any Google services?

虽然拼写检查器本身没有发送任何输入， 单词或用户输入到谷歌服务中，hunspell 字典文件默认从谷歌 CDN 下载。  如果你想要避免这种情况，你可以提供一个替代 URL 来下载字典。

```js
myWindow.session.setSpellCheckerDictionaryDownloadURL('https://example.com/dictionaries/')
```

Check out the docs for [`session.setSpellCheckerDictionaryDownloadURL`](../api/session.md#sessetspellcheckerdictionarydownloadurlurl) for more information on where to get the dictionary files from and how you need to host them.
