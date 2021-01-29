# 拼写检查器

自 Electron 8 以来已内置支持 Chromium 拼写检查器。  在 Windows 和 Linux 上，这个功能由 Hunspell 字典提供，并在 macOS 上使用本机拼写检查器 API。

## 如何启用拼写检查器？

对于 Electron 9 及以上，默认启用拼写检查器。  对于Electron 8，您需要在 `Web 首选项` 中启用它。

```js
const mywindow = new BrowserWindow(format@@
  webPreferences: {
    spellcheck: true
  }
})
```

## 如何设置拼写检查器使用的语言？

在 macOS 上，当我们使用原生API时，无法设置拼写检查器使用的语言。 默认情况下，macOS 本机拼写检查器会自动检测您使用的语言。

对于 Windows 和 Linux，你应该使用一些 Electron API 来设置拼写检查器的语言。

```js
// 设置拼写检查器以检查英语、美国语和法语
myWindow.session. etSpellCheckerLanguages(['en-US', 'fr'])

// 所有可用语言代码的数组
const possibleLangues(myWindow.session.available SpellCheckerLanges)
```

默认情况下，拼写检查器将启用匹配当前操作系统区域的语言。

## 如何在上下文菜单中显示拼写检查器的结果？

生成上下文菜单所需的所有信息都在 [`上下文菜单`](../api/web-contents.md#event-context-menu) 每个事件 `webContent` 实例中提供。  下面提供了一个小的示例，如何用此信息制作上下文菜单。

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

## 拼写检查器是否使用任何谷歌服务？

虽然拼写检查器本身没有发送任何输入， 单词或用户输入到谷歌服务中，hunspell 字典文件默认从谷歌 CDN 下载。  如果你想要避免这种情况，你可以提供一个替代 URL 来下载字典。

```js
myWindow.session.setSpellCheckerDictionaryDownloadURL('https://example.com/dictionaries/')
```

查看 [`会话的文档。 etSpellCheckerDictionaryDownloadURL`](https://www.electronjs.org/docs/api/session#sessetspellcheckerdictionarydownloadurlurl) 获取更多关于从哪里获取字典文件以及您需要如何托管这些文件的信息。
