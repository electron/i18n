# dialog

> ファイルを開いたり、保存したり、アラートを出したりするために、ネイティブのシステムダイアログを表示します。

プロセス: [Main](../glossary.md#main-process)

複数のファイルとディレクトリを選択するdialogを表示する例:

```javascript
const {dialog} = require('electron')
console.log(dialog.showOpenDialog({properties: ['openFile', 'openDirectory', 'multiSelections']}))
```

Dialogは、Electronのメインスレッドから開かれます。dialogオブジェクトをレンダラープロセスから使用したい場合、remoteを使用してアクセスするようにしてください。

```javascript
const {dialog} = require('electron').remote
console.log(dialog)
```

## メソッド

`dialog` モジュールには以下のメソッドがあります。

### `dialog.showOpenDialog([browserWindow, ]options[, callback])`

* `browserWindow` [BrowserWindow](browser-window.md) (optional)
* `options` Object 
  * `title` String (任意)
  * `defaultPath` String (任意)
  * `buttonLabel` String (任意) - 確認ボタンのカスタムラベル。空のままにすると、既定のラベルが使用されます。
  * `filters` [FileFilter[]](structures/file-filter.md) (任意)
  * `プロパティ` String[] (任意) - ダイアログでどの機能を使用するか。以下の値がサポートされます。 
    * `openFile` - ファイルを選択するのを許可します。
    * `openDirectory` - ディレクトリを選択するのを許可します。
    * `multiSelections` - 複数のパスを選択するのを許可します。
    * `showHiddenFiles` - ダイアログで隠しファイルを表示します。
    * `createDirectory` *macOS* - Allow creating new directories from dialog.
    * `promptToCreate` *Windows* - Prompt for creation if the file path entered in the dialog does not exist. これは実際にパスにファイルを作成しませんが、アプリケーションによって作成される必要がある存在しないパスが返されることを許可します。
    * `noResolveAliases` *macOS* - Disable the automatic alias (symlink) path resolution. Selected aliases will now return the alias path instead of their target path.
    * `treatPackageAsDirectory` *macOS* - Treat packages, such as `.app` folders, as a directory instead of a file.
  * `message` String (任意) *macOS* - 入力ボックスの上に表示するメッセージ。
  * `securityScopedBookmarks` Boolean (optional) *masOS* *mas* - Create [security scoped bookmarks](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) when packaged for the Mac App Store.
* `callback` Function (任意) 
  * `filePaths` String[] - ユーザーによって選択されたファイルパスの配列
  * `bookmarks` String[] *macOS* *mas* - An array matching the `filePaths` array of base64 encoded strings which contains security scoped bookmark data. `securityScopedBookmarks` must be enabled for this to be populated.

戻り値 `String[]` - ユーザが選択したファイルパスの配列。callback が指定されている場合は `undefined` を返します。

`browserWindow` の引数で、ダイアログは親ウインドウにアタッチされ、モーダル表示になります。

特定の種類だけにユーザーを制限したいとき、`filters` には、表示または選択できるファイルの種類の配列を指定します。例:

```javascript
{
  filters: [
    {name: 'Images', extensions: ['jpg', 'png', 'gif']},
    {name: 'Movies', extensions: ['mkv', 'avi', 'mp4']},
    {name: 'Custom File Type', extensions: ['as']},
    {name: 'All Files', extensions: ['*']}
  ]
}
```

`extensions` の配列には、ワイルドカードやドットを含む拡張子 (例えば、`'png'` は問題ありませんが、`'.png'` や `'*.png'` はいけません) を入れないで下さい。 すべてのファイルを表示するには、`'*'` ワイルドカードを使用して下さい (その他のワイルドカードはサポートされていません)。

If a `callback` is passed, the API call will be asynchronous and the result will be passed via `callback(filenames)`.

**注:** WindowsとLinuxのオープンダイアログでは、ファイルとディレクトリの両方を選択することはできません。そのため、これらのプラットフォームで `properties` に `['openFile', 'openDirectory']` を設定すると、ディレクトリの選択が表示されます。

### `dialog.showSaveDialog([browserWindow, ]options[, callback])`

* `browserWindow` [BrowserWindow](browser-window.md) (optional)
* `options` Object 
  * `title` String (任意)
  * `defaultPath` String (任意) - 既定で使用される絶対ディレクトリパス、絶対ファイルパスもしくはファイル名。
  * `buttonLabel` String (任意) - 確認ボタンのカスタムラベル。空のままにすると、既定のラベルが使用されます。
  * `filters` [FileFilter[]](structures/file-filter.md) (任意)
  * `message` String (任意) *macOS* - テキストフィールドの上に表示するメッセージ。
  * `nameFieldLabel` String (任意) *macOS* - ファイル名のテキストフィールドの前に表示されるテキストのカスタムラベル。
  * `showsTagField` Boolean (任意) *macOS* - タグの入力ボックスを表示します。省略値は、`true` です。
  * `securityScopedBookmarks` Boolean (optional) *masOS* *mas* - Create a [security scoped bookmark](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) when packaged for the Mac App Store. If this option is enabled and the file doesn't already exist a blank file will be created at the chosen path.
* `callback` Function (任意) 
  * `filename` String
  * `bookmark` String *macOS* *mas* - Base64 encoded string which contains the security scoped bookmark data for the saved file. `securityScopedBookmarks` must be enabled for this to be present.

戻り値 `String` - ユーザが選択したファイルパス。callback が指定されている場合は `undefined` を返します。

`browserWindow` の引数で、ダイアログは親ウインドウにアタッチされ、モーダル表示になります。

`filters` には、表示することのできるファイルの種類の配列を指定します。例については、`dialog.showOpenDialog` を参照して下さい。

If a `callback` is passed, the API call will be asynchronous and the result will be passed via `callback(filename)`.

### `dialog.showMessageBox([browserWindow, ]options[, callback])`

* `browserWindow` [BrowserWindow](browser-window.md) (optional)
* `options` Object 
  * `type` String (任意) - `"none"`、`"info"`、`"error"`、`"question"`、`"warning"` にすることができます。 Windowsでは、`"icon"` のオプションを使用してアイコンを設定しない場合、`"question"` は、`"info"` と同じアイコンを表示します。 macOSでは、`"warning"` と `"error"` の両方で同じ警告アイコンを表示します。
  * `buttons` String[] (任意) - ボタンのテキストの配列。Windowsでは、空の配列だと、"OK" というラベルのついた1つのボタンだけになります。
  * `defaultId` Integer (任意) - メッセージボックスを開いたとき、既定で選択されるボタンの配列の中のボタンのインデックス。
  * `title` String (任意) - メッセージボックスのタイトル。いくつかのプラットフォームでは表示されません。
  * `message` String - メッセージボックスの内容。
  * `detail` String (任意) - メッセージの追加情報。
  * `checkboxLabel` String (任意) - 指定した場合、メッセージボックスには、指定したラベルを持つチェックボックスが含まれます。チェックボックスの状態は、`callback` を使用するときしか確認することができません。
  * `checkboxChecked` Boolean (任意) - チェックボックスの初期のチェック状態。既定では、`false` です。
  * `icon` [NativeImage](native-image.md) (任意)
  * `cancelId` Integer (任意) - `Esc` キー経由でダイアログをキャンセルするのに使用されるボタンのインデックス。 既定では、これはラベルとして "cancel" または "no" の付いた最初のボタンに割り当てられます。 そのようにラベル付けされたボタンがなく、このオプションが設定されていない場合、`` が戻り値またはコールバックレスポンスとして使用されます。 このオプションはWindowsでは無視されます。
  * `noLink` Boolean (任意) - WindowsでElectronはどの `buttons` が ("Cancel" や "Yes" のような) 一般的なボタンかを把握し、その他をダイアログでコマンドリンクとして表示しようとします。 これにより、モダンなWindowsアプリのスタイルでダイアログを表示させることができます。 この動作が気に入らない場合、`noLink` を `true` に設定することができます。
  * `normalizeAccessKeys` Boolean (任意) - プラットフォーム間でキーボードのアクセスキーを正規化します。 省略値は `false` です。 これを有効にすると、`&` が、ボタンのラベルでキーボードショートカットアクセスキーの位置として使用されているとみなされ、各プラットフォームで正常に動作するようにラベルが変換されます。macOSでは、`&` の文字は削除され、Linuxでは、`_` に変換され、Windowsでは、そのままにされます。 例えば、`Vie&w` というボタンラベルは、Linuxでは、`Vie_w`、macOSでは、`View` に変換され、WindowsとLinuxでは、`Alt-W` 経由で選択できます。
* `callback` Function (任意) 
  * `response` Number - The index of the button that was clicked.
  * `checkboxChecked` Boolean - `checkboxLabel` が設定された場合、チェックボックスのチェック状態。そうでない場合は、`false` です。

クリックされたボタンのインデックスである `Integer` を返します。callbackが指定されている場合、undefinedを返します。

メッセージボックスを表示し、メッセージボックスが閉じられるまでプロセスをブロックします。クリックされたボタンのインデックスを返します。

`browserWindow` の引数で、ダイアログは親ウインドウにアタッチされ、モーダル表示になります。

`callback` が渡されると、ダイアログはプロセスをブロックしません。APIの呼び出しが非同期になり、`callback(response)` 経由で結果が渡されます。

### `dialog.showErrorBox(title, content)`

* `title` String - The title to display in the error box.
* `content` String - The text content to display in the error box.

エラーメッセージを表示するモーダルダイアログを表示します。

`app` モジュールで `ready` イベントが発生する前でも、このAPIは安全に呼び出すことができます。これは、起動の初期段階でのエラーを報告するのによく使用されます。 Linuxで、appの `ready` イベントの前に呼び出すと、メッセージは標準エラーに出力され、GUIのダイアログは表示されません。

### `dialog.showCertificateTrustDialog([browserWindow, ]options, callback)` *macOS* *Windows*

* `browserWindow` [BrowserWindow](browser-window.md) (optional)
* `options` Object 
  * `certificate` [Certificate](structures/certificate.md) - 信頼/インポートする証明書。
  * `message` String - ユーザーに表示するメッセージ。
* `callback` Function

macOSでは、これはメッセージと証明書情報を表示するモーダルダイアログを表示し、ユーザーに証明書を信頼/インポートする選択肢を提供します。 `browserWindow` の引数を指定すると、ダイアログは親ウインドウにアタッチされ、モーダル表示になります。

Windowsでは、使用されているWin32 APIのため、オプションはより限定的です。

* OSが独自の確認ダイアログを提供しているため、`message` の引数は使用されません。
* この確認ダイアログをモーダル表示にすることができないため、`browserWindow` の引数は無視されます。

## シート

On macOS, dialogs are presented as sheets attached to a window if you provide a [`BrowserWindow`](browser-window.md) reference in the `browserWindow` parameter, or modals if no window is provided.

`BrowserWindow.getCurrentWindow().setSheetOffset(offset)` を呼び出すことで、シートがアタッチされるウインドウフレームからのオフセットを変更することができます。