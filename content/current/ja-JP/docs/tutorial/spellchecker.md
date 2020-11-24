# スペルチェッカー

Electron 8 以降、Electron は Chromium のスペルチェッカーを内蔵しています。  WindowsとLinuxではHunspell辞書が搭載されており、macOSではネイティブのspellchecker APIが使用されています。

## スペルチェッカーを有効にする方法は？

Electron 9 以降では、スペルチェッカーはデフォルトで有効になっています。  Electron 8 では、 `webPreferences` で有効にする必要があります。

```js
const myWindow = new BrowserWindow({
  webPreferences: {
    spellcheck: true
  }
})
```

## スペルチェッカーが使用する言語を設定する方法は?

macOS ではネイティブ API を使用しているため、スペルチェッカーが使用する言語を設定する方法はありません。 macOS では、デフォルトでネイティブのスペルチェッカーが自動的に使用されている言語を検出します。

Windows および Linux の場合、スペルチェッカーの言語を設定するために使用すべきいくつかの Electron API があります。

```js
// アメリカ英語とフランス語のチェックする
myWindow.session.setSpellCheckerLanguages(['en-US', 'fr'])

// 利用できる言語コードの配列
const possibleLanguages = myWindow.session.availableSpellCheckerLanguages
```

デフォルトでは、spellchecker は現在の OS ロケールに一致する言語を有効にします。

## スペルチェッカーの結果をコンテキストメニューに入れるにはどうすればよいですか?

コンテキストメニューを生成するために必要なすべての情報は、各 [`webContents`](../api/web-contents.md#event-context-menu) インスタンス上の `context-menu` イベントで提供されます。  この情報を使ってコンテキストメニューを作る方法の小さな例 を以下に示します。

```js
const { Menu, MenuItem } = require('electron')

myWindow.webContents.on('context-menu', (event, params) => {
  const menu = new Menu()

  // スペルの補完をそれぞれ追加します
  for (const suggestion of params.dictionarySuggestions) {
    menu.append(new MenuItem({
      label: suggestion,
      click: () => mainWindow.webContents.replaceMisspelling(suggestion)
    }))
  }

  // ユーザーがスペルミスの単語を辞書に登録できるようにします
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

## スペルチェッカーは Google サービスを使用していますか?

スペルチェッカー自体はタイプを送信しませんが、 Googleサービスへの単語やユーザー入力は、デフォルトでは、hunspell辞書ファイルがGoogle CDNからダウンロードされます。  これを避けたい場合は、辞書をダウンロードするための代替URLを指定することができます。

```js
myWindow.session.setSpellCheckerDictionaryDownloadURL('https://example.com/dictionaries/')
```

辞書ファイルの取得場所や、ホストするにあたって必要な事項についての詳細な情報は、[`session.setSpellCheckerDictionaryDownloadURL` のドキュメントを確認してください](../api/session.md#sessetspellcheckerdictionarydownloadurlurl)。
