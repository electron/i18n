# dialog

> ファイルを開いたり、保存したり、アラートを出したりするために、ネイティブのシステムダイアログを表示します。

プロセス: [Main](../glossary.md#main-process)

複数のファイルとディレクトリを選択するdialogを表示する例:

```javascript
const { dialog } = require('electron')
console.log(dialog.showOpenDialog({ properties: ['openFile', 'openDirectory', 'multiSelections'] }))
```

The Dialog is opened from Electron's main thread. If you want to use the dialog object from a renderer process, remember to access it using the remote:

```javascript
const { dialog } = require('electron').remote
console.log(dialog)
```

## メソッド

`dialog` モジュールには以下のメソッドがあります。

### `dialog.showOpenDialogSync([browserWindow, ]options)`

* `browserWindow` [BrowserWindow](browser-window.md) (任意)
* `options` Object
  * `title` String (任意)
  * `defaultPath` String (任意)
  * `buttonLabel` String (任意) - 確認ボタンのカスタムラベル。空のままにすると、既定のラベルが使用されます。
  * `filters` [FileFilter[]](structures/file-filter.md) (任意)
  * `properties` String[] (optional) - Contains which features the dialog should use. The following values are supported:
    * `openFile` - ファイルを選択するのを許可します。
    * `openDirectory` - ディレクトリを選択するのを許可します。
    * `multiSelections` - 複数のパスを選択するのを許可します。
    * `showHiddenFiles` - ダイアログで隠しファイルを表示します。
    * `createDirectory` _macOS_ - ダイアログでディレクトリを作成するのを許可します。
    * `promptToCreate` _Windows_ - ダイアログで存在しないファイルパスを入力した場合に、作成を促します。 これは実際にパスにファイルを作成しませんが、アプリケーションによって作成される必要がある存在しないパスが返されることを許可します。
    * `noResolveAliases` _macOS_ - Disable the automatic alias (symlink) path resolution. Selected aliases will now return the alias path instead of their target path.
    * `treatPackageAsDirectory` _macOS_ - `.app` フォルダのようなパッケージを、ファイルの代わりにディレクトリとして扱います。
  * `message` String (任意) _macOS_ - 入力ボックスの上に表示するメッセージ。
  * `securityScopedBookmarks` Boolean (任意) _masOS_ _mas_ - Mac App Store 向けにパッケージしたときに [セキュリティスコープ付きブックマーク](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) を作成します。

戻り値 `String[] | undefined` - ユーザが選択したファイルパス。dialog がキャンセルされた場合は `undefined` を返します。

`browserWindow` の引数で、ダイアログは親ウインドウにアタッチされ、モーダル表示になります。

The `filters` specifies an array of file types that can be displayed or selected when you want to limit the user to a specific type. 例:

```javascript
{
  filters: [
    { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
    { name: 'Movies', extensions: ['mkv', 'avi', 'mp4'] },
    { name: 'Custom File Type', extensions: ['as'] },
    { name: 'All Files', extensions: ['*'] }
  ]
}
```

`extensions` の配列には、ワイルドカードやドットを含む拡張子 (例えば、`'png'` は問題ありませんが、`'.png'` や `'*.png'` はいけません) を入れないで下さい。 すべてのファイルを表示するには、`'*'` ワイルドカードを使用して下さい (その他のワイルドカードはサポートされていません)。

**注:** WindowsとLinuxのオープンダイアログでは、ファイルとディレクトリの両方を選択することはできません。そのため、これらのプラットフォームで `properties` に `['openFile', 'openDirectory']` を設定すると、ディレクトリの選択が表示されます。

```js
dialog.showOpenDialogSync(mainWindow, {
  properties: ['openFile', 'openDirectory']
})
```

### `dialog.showOpenDialog([browserWindow, ]options)`

* `browserWindow` [BrowserWindow](browser-window.md) (任意)
* `options` Object
  * `title` String (任意)
  * `defaultPath` String (任意)
  * `buttonLabel` String (任意) - 確認ボタンのカスタムラベル。空のままにすると、既定のラベルが使用されます。
  * `filters` [FileFilter[]](structures/file-filter.md) (任意)
  * `properties` String[] (optional) - Contains which features the dialog should use. The following values are supported:
    * `openFile` - ファイルを選択するのを許可します。
    * `openDirectory` - ディレクトリを選択するのを許可します。
    * `multiSelections` - 複数のパスを選択するのを許可します。
    * `showHiddenFiles` - ダイアログで隠しファイルを表示します。
    * `createDirectory` _macOS_ - ダイアログでディレクトリを作成するのを許可します。
    * `promptToCreate` _Windows_ - ダイアログで存在しないファイルパスを入力した場合に、作成を促します。 これは実際にパスにファイルを作成しませんが、アプリケーションによって作成される必要がある存在しないパスが返されることを許可します。
    * `noResolveAliases` _macOS_ - Disable the automatic alias (symlink) path resolution. Selected aliases will now return the alias path instead of their target path.
    * `treatPackageAsDirectory` _macOS_ - `.app` フォルダのようなパッケージを、ファイルの代わりにディレクトリとして扱います。
  * `message` String (任意) _macOS_ - 入力ボックスの上に表示するメッセージ。
  * `securityScopedBookmarks` Boolean (任意) _masOS_ _mas_ - Mac App Store 向けにパッケージしたときに [セキュリティスコープ付きブックマーク](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) を作成します。
* `callback` Function (任意)

戻り値 `Promise<Object>` - 以下を含むオブジェクトで実行されます。

* `canceled` Boolean - dialog がキャンセルされたかそうでないか。
* `filePaths` String[] (optional) - An array of file paths chosen by the user. If the dialog is cancelled this will be an empty array.
* `bookmarks` String[] (optional) _macOS_ _mas_ - An array matching the `filePaths` array of base64 encoded strings which contains security scoped bookmark data. データを取り込むために `securityScopedBookmarks` を有効にする必要があります。

`browserWindow` の引数で、ダイアログは親ウインドウにアタッチされ、モーダル表示になります。

The `filters` specifies an array of file types that can be displayed or selected when you want to limit the user to a specific type. 例:

```javascript
{
  filters: [
    { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
    { name: 'Movies', extensions: ['mkv', 'avi', 'mp4'] },
    { name: 'Custom File Type', extensions: ['as'] },
    { name: 'All Files', extensions: ['*'] }
  ]
}
```

`extensions` の配列には、ワイルドカードやドットを含む拡張子 (例えば、`'png'` は問題ありませんが、`'.png'` や `'*.png'` はいけません) を入れないで下さい。 すべてのファイルを表示するには、`'*'` ワイルドカードを使用して下さい (その他のワイルドカードはサポートされていません)。

**注:** WindowsとLinuxのオープンダイアログでは、ファイルとディレクトリの両方を選択することはできません。そのため、これらのプラットフォームで `properties` に `['openFile', 'openDirectory']` を設定すると、ディレクトリの選択が表示されます。

```js
dialog.showOpenDialog(mainWindow, {
  properties: ['openFile', 'openDirectory']
}).then(result => {
  console.log(result.canceled)
  console.log(result.filePaths)
}).catch(err => {
  console.log(err)
})
```

### `dialog.showSaveDialogSync([browserWindow, ]options)`

* `browserWindow` [BrowserWindow](browser-window.md) (任意)
* `options` Object
  * `title` String (任意)
  * `defaultPath` String (任意) - 既定で使用される絶対ディレクトリパス、絶対ファイルパスもしくはファイル名。
  * `buttonLabel` String (任意) - 確認ボタンのカスタムラベル。空のままにすると、既定のラベルが使用されます。
  * `filters` [FileFilter[]](structures/file-filter.md) (任意)
  * `message` String (任意) _macOS_ - テキストフィールドの上に表示するメッセージ。
  * `nameFieldLabel` String (任意) _macOS_ - ファイル名のテキストフィールドの前に表示されるテキストのカスタムラベル。
  * `showsTagField` Boolean (任意) _macOS_ - タグの入力ボックスを表示します。省略値は、`true` です。
  * `securityScopedBookmarks` Boolean (任意) _masOS_ _mas_ - Mac App Store 向けにパッケージしたときに [セキュリティスコープ付きブックマーク](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) を作成します。 このオプションが有効でファイルが存在しない場合は、選択したパスに空のファイルが作成されます。

戻り値 `String | undefined` - ユーザが選択したファイルパス。dialog がキャンセルされた場合は `undefined` を返します。

`browserWindow` の引数で、ダイアログは親ウインドウにアタッチされ、モーダル表示になります。

`filters` には、表示することのできるファイルの種類の配列を指定します。例については、`dialog.showOpenDialog` を参照して下さい。

### `dialog.showSaveDialog([browserWindow, ]options)`

* `browserWindow` [BrowserWindow](browser-window.md) (任意)
* `options` Object
  * `title` String (任意)
  * `defaultPath` String (任意) - 既定で使用される絶対ディレクトリパス、絶対ファイルパスもしくはファイル名。
  * `buttonLabel` String (任意) - 確認ボタンのカスタムラベル。空のままにすると、既定のラベルが使用されます。
  * `filters` [FileFilter[]](structures/file-filter.md) (任意)
  * `message` String (任意) _macOS_ - テキストフィールドの上に表示するメッセージ。
  * `nameFieldLabel` String (任意) _macOS_ - ファイル名のテキストフィールドの前に表示されるテキストのカスタムラベル。
  * `showsTagField` Boolean (任意) _macOS_ - タグの入力ボックスを表示します。省略値は、`true` です。
  * `securityScopedBookmarks` Boolean (任意) _masOS_ _mas_ - Mac App Store 向けにパッケージしたときに [セキュリティスコープ付きブックマーク](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) を作成します。 このオプションが有効でファイルが存在しない場合は、選択したパスに空のファイルが作成されます。

戻り値 `Promise<Object>` - 以下を含むオブジェクトで実行されます。
  * `canceled` Boolean - dialog がキャンセルされたかそうでないか。
  * `filePath` String (optional) If the dialog is canceled this will be `undefined`.
  * `bookmark` String (optional) _macOS_ _mas_ - Base64 encoded string which contains the security scoped bookmark data for the saved file. 出力するために `securityScopedBookmarks` を有効にする必要があります。

`browserWindow` の引数で、ダイアログは親ウインドウにアタッチされ、モーダル表示になります。

`filters` には、表示することのできるファイルの種類の配列を指定します。例については、`dialog.showOpenDialog` を参照して下さい。

**注意:** macOS では、ダイアログを展開したり折りたたんだりする際の問題を避けるために、非同期バージョンを使用することを推奨します。

### `dialog.showMessageBoxSync([browserWindow, ]options)`

* `browserWindow` [BrowserWindow](browser-window.md) (任意)
* `options` Object
  * `type` String (任意) - `"none"`、`"info"`、`"error"`、`"question"`、`"warning"` にすることができます。 Windowsでは、`"icon"` のオプションを使用してアイコンを設定しない場合、`"question"` は、`"info"` と同じアイコンを表示します。 macOSでは、`"warning"` と `"error"` の両方で同じ警告アイコンを表示します。
  * `buttons` String[] (optional) - Array of texts for buttons. On Windows, an empty array will result in one button labeled "OK".
  * `defaultId` Integer (任意) - メッセージボックスを開いたとき、既定で選択されるボタンの配列の中のボタンのインデックス。
  * `title` String (任意) - メッセージボックスのタイトル。いくつかのプラットフォームでは表示されません。
  * `message` String - メッセージボックスの内容。
  * `detail` String (任意) - メッセージの追加情報。
  * `checkboxLabel` String (任意) - 指定した場合、メッセージボックスには、指定したラベルを持つチェックボックスが含まれます。 The checkbox state can be inspected only when using `callback`.
  * `checkboxChecked` Boolean (optional) - Initial checked state of the checkbox. 省略値は `false` です。
  * `icon` ([NativeImage](native-image.md) | String) (任意)
  * `cancelId` Integer (任意) - `Esc` キー経由でダイアログをキャンセルするのに使用されるボタンのインデックス。 既定では、これはラベルとして "cancel" または "no" の付いた最初のボタンに割り当てられます。 そのようにラベル付けされたボタンがなく、このオプションが設定されていない場合、`0` が戻り値またはコールバックレスポンスとして使用されます。
  * `noLink` Boolean (任意) - WindowsでElectronはどの `buttons` が ("Cancel" や "Yes" のような) 一般的なボタンかを把握し、その他をダイアログでコマンドリンクとして表示しようとします。 これにより、モダンなWindowsアプリのスタイルでダイアログを表示させることができます。 この動作が気に入らない場合、`noLink` を `true` に設定することができます。
  * `normalizeAccessKeys` Boolean (任意) - プラットフォーム間でキーボードのアクセスキーを正規化します。 省略値は、`false` です。 これを有効にすると、`&` が、ボタンのラベルでキーボードショートカットアクセスキーの位置として使用されているとみなされ、各プラットフォームで正常に動作するようにラベルが変換されます。macOSでは、`&` の文字は削除され、Linuxでは、`_` に変換され、Windowsでは、そのままにされます。 例えば、`Vie&w` というボタンラベルは、Linuxでは、`Vie_w`、macOSでは、`View` に変換され、WindowsとLinuxでは、`Alt-W` 経由で選択できます。

戻り値 `Integer` - クリックされたボタンのインデックス。

メッセージボックスを表示し、メッセージボックスが閉じられるまでプロセスをブロックします。 It returns the index of the clicked button.

`browserWindow` の引数で、ダイアログは親ウインドウにアタッチされ、モーダル表示になります。

### `dialog.showMessageBox([browserWindow, ]options)`

* `browserWindow` [BrowserWindow](browser-window.md) (任意)
* `options` Object
  * `type` String (任意) - `"none"`、`"info"`、`"error"`、`"question"`、`"warning"` にすることができます。 Windowsでは、`"icon"` のオプションを使用してアイコンを設定しない場合、`"question"` は、`"info"` と同じアイコンを表示します。 macOSでは、`"warning"` と `"error"` の両方で同じ警告アイコンを表示します。
  * `buttons` String[] (optional) - Array of texts for buttons. On Windows, an empty array will result in one button labeled "OK".
  * `defaultId` Integer (任意) - メッセージボックスを開いたとき、既定で選択されるボタンの配列の中のボタンのインデックス。
  * `title` String (任意) - メッセージボックスのタイトル。いくつかのプラットフォームでは表示されません。
  * `message` String - メッセージボックスの内容。
  * `detail` String (任意) - メッセージの追加情報。
  * `checkboxLabel` String (任意) - 指定した場合、メッセージボックスには、指定したラベルを持つチェックボックスが含まれます。 The checkbox state can be inspected only when using `callback`.
  * `checkboxChecked` Boolean (optional) - Initial checked state of the checkbox. 省略値は `false` です。
  * `icon` [NativeImage](native-image.md) (任意)
  * `cancelId` Integer (任意) - `Esc` キー経由でダイアログをキャンセルするのに使用されるボタンのインデックス。 既定では、これはラベルとして "cancel" または "no" の付いた最初のボタンに割り当てられます。 そのようにラベル付けされたボタンがなく、このオプションが設定されていない場合、`0` が戻り値またはコールバックレスポンスとして使用されます。
  * `noLink` Boolean (任意) - WindowsでElectronはどの `buttons` が ("Cancel" や "Yes" のような) 一般的なボタンかを把握し、その他をダイアログでコマンドリンクとして表示しようとします。 これにより、モダンなWindowsアプリのスタイルでダイアログを表示させることができます。 この動作が気に入らない場合、`noLink` を `true` に設定することができます。
  * `normalizeAccessKeys` Boolean (任意) - プラットフォーム間でキーボードのアクセスキーを正規化します。 省略値は、`false` です。 これを有効にすると、`&` が、ボタンのラベルでキーボードショートカットアクセスキーの位置として使用されているとみなされ、各プラットフォームで正常に動作するようにラベルが変換されます。macOSでは、`&` の文字は削除され、Linuxでは、`_` に変換され、Windowsでは、そのままにされます。 例えば、`Vie&w` というボタンラベルは、Linuxでは、`Vie_w`、macOSでは、`View` に変換され、WindowsとLinuxでは、`Alt-W` 経由で選択できます。

戻り値 `Promise<Object>` - 以下のプロパティを含む Promise で解決されます。
  * `response` Number - The index of the clicked button.
  * `checkboxChecked` Boolean - The checked state of the checkbox if `checkboxLabel` was set. Otherwise `false`.

メッセージボックスを表示し、メッセージボックスが閉じられるまでプロセスをブロックします。

`browserWindow` の引数で、ダイアログは親ウインドウにアタッチされ、モーダル表示になります。

### `dialog.showErrorBox(title, content)`

* `title` String - エラーボックスに表示するタイトル.
* `content` String - エラーボックスに表示するテキストの内容.

エラーメッセージを表示するモーダルダイアログを表示します。

`app` モジュールで `ready` イベントが発生する前でも、このAPIは安全に呼び出すことができます。これは、起動の初期段階でのエラーを報告するのによく使用されます。 Linuxで、appの `ready` イベントの前に呼び出すと、メッセージは標準エラーに出力され、GUIのダイアログは表示されません。

### `dialog.showCertificateTrustDialog([browserWindow, ]options, callback)` _macOS_ _Windows_

* `browserWindow` [BrowserWindow](browser-window.md) (任意)
* `options` Object
  * `certificate` [Certificate](structures/certificate.md) - 信頼/インポートする証明書。
  * `message` String - ユーザーに表示するメッセージ。
* `callback` Function

macOSでは、これはメッセージと証明書情報を表示するモーダルダイアログを表示し、ユーザーに証明書を信頼/インポートする選択肢を提供します。 `browserWindow` の引数を指定すると、ダイアログは親ウインドウにアタッチされ、モーダル表示になります。

Windowsでは、使用されているWin32 APIのため、オプションはより限定的です。

* OSが独自の確認ダイアログを提供しているため、`message` の引数は使用されません。
* この確認ダイアログをモーダル表示にすることができないため、`browserWindow` の引数は無視されます。

**[非推奨予定](modernization/promisification.md)**

### `dialog.showCertificateTrustDialog([browserWindow, ]options)` _macOS_ _Windows_

* `browserWindow` [BrowserWindow](browser-window.md) (任意)
* `options` Object
  * `certificate` [Certificate](structures/certificate.md) - 信頼/インポートする証明書。
  * `message` String - ユーザーに表示するメッセージ。

戻り値 `Promise<void>` - 証明書信頼ダイアログが表示されると実行されます。

macOSでは、これはメッセージと証明書情報を表示するモーダルダイアログを表示し、ユーザーに証明書を信頼/インポートする選択肢を提供します。 `browserWindow` の引数を指定すると、ダイアログは親ウインドウにアタッチされ、モーダル表示になります。

Windowsでは、使用されているWin32 APIのため、オプションはより限定的です。

* OSが独自の確認ダイアログを提供しているため、`message` の引数は使用されません。
* この確認ダイアログをモーダル表示にすることができないため、`browserWindow` の引数は無視されます。

## シート

macOS では、`browserWindow` パラメータに [`BrowserWindow`](browser-window.md) の参照を指定した場合、ダイアログは、ウインドウにアタッチされたシートとして表示されます。ウインドウを指定しない場合、モーダルで表示されます。

`BrowserWindow.getCurrentWindow().setSheetOffset(offset)` を呼び出すことで、シートがアタッチされるウインドウフレームからのオフセットを変更することができます。
