# dialog

> ファイルを開く、保存する、通知する等のためのネイティブなダイアログを表示します。

プロセス: [Main](../glossary.md#main-process)

複数のファイルとディレクトリを選択するダイアログを表示する例:

```javascript
const {dialog} = require('electron')
console.log(dialog.showOpenDialog({properties: ['openFile', 'openDirectory', 'multiSelections']}))
```

dialogはElectronのメインスレッドから開かれます。もしレンダラープロセスからdialogオブジェクトを使用したければ、remoteを用いてアクセスするようにして下さい。

```javascript
const {dialog} = require('electron').remote
console.log(dialog)
```

## メソッド

`dialog` オブジェクトには以下のメソッドがあります。

### `dialog.showOpenDialog([browserWindow, ]options[, callback])`

* `browserWindow` BrowserWindow (任意)
* `options` オブジェクト 
  * `title` String (任意)
  * `defaultPath` String (任意)
  * `buttonLabel` String (任意) - 確認ボタンのラベルをカスタマイズする。空にするとデフォルトのラベルが使用される。
  * `filters` [FileFilter[]](structures/file-filter.md) (任意)
  * `properties` String[] (任意) - dialogのどの機能を使うべきかの配列。以下の値をサポートする。 
    * `openFile` - ファイル選択を許可する。
    * `openDirectory` - ディレクトリ選択を許可する。
    * `multiSelections` - 複数選択を許可する。
    * `showHiddenFiles` - dialog中で隠しファイルを表示する。
    * `createDirectory` - dialog中で新規ディレクトリの作成を許可する。*macOS*
    * `promptToCreate` - 存在しないパスをdialog中で入力したとき、その作成を促す。 これは存在しないパスにファイルを作るのではなく、アプリケーションによって作成される予定の存在しないパスを作る。 *Windows*
    * `noResolveAliases` - パスの解決において自動エイリアス (シンボリックリンク) を無効にする。選択したエイリアスは、それらが指すパスではなくエイリアスのパスを返す。 *macOS*
    * `treatPackageAsDirectory` - パッケージとして扱われる `.app` フォルダのようなものを、ファイルではなくディレクトリとして扱う。*macOS*
  * `message` String (任意) *macOS* - 入力ボックス上に表示するメッセージ。
* `callback` Function (任意) 
  * `filePaths` String[] - ユーザが選択したファイルパスの配列。

戻り値はユーザが選択したファイルパスの配列を `String[]` で返します。callbackが設けられている場合は `undefined` を返します。

`browserWindow` を渡すと、それを親ウインドウとしてdialogをモーダルウインドウにします。

`filters` は、表示されるファイルの種類や、ユーザーに選択してほしい種類の制限を指定する配列です。例:

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

`extensions` はワイルドカードやドットがない拡張子の配列です (例えば `'png'` は良いですが、 `'.png'` や `'*.png'` はいけません)。 すべてのファイルを表示するには、`'*'` ワイルドカードを使用します (他のワイルドカードはサポートされていません)。

`callback` が渡されると、API呼び出しは非同期になり、 `callback(ファイル名)` を通して結果が渡されます。

**注釈:** WindowsとLinuxではオープンダイアログはファイルとディレクトリ両方のセレクタになれません。なので、もし `properties` に `['openFile', 'openDirectory']` とセットした場合、これらのプラットフォームではディレクトリのセレクタとして表示されます。

### `dialog.showSaveDialog([browserWindow, ]options[, callback])`

* `browserWindow` BrowserWindow (任意)
* `options` オブジェクト 
  * `title` String (任意)
  * `defaultPath` String (任意) - デフォルトの絶対ディレクトリパス/絶対ファイルパス/ファイル名。
  * `buttonLabel` String (任意) - 確認ボタンのラベルをカスタマイズする。空にするとデフォルトのラベルが使用される。
  * `filters` [FileFilter[]](structures/file-filter.md) (任意)
  * `message` String (任意) *macOS* - テキストフィールド上に表示するメッセージ。
  * `nameFieldLabel` String (任意) *macOS* - ファイル名のテキストフィールドの手前に表示されるテキストラベルのカスタマイズ。
  * `showsTagField` Boolean (任意) *macOS* - 入力ボックスにタグを表示する。デフォルトは `true`。
* `callback` Function (任意) 
  * `filename` String

戻り値はユーザが選択したファイルパスを `String` で返します。callbackが設けられている場合は `undefined` を返します。

`browserWindow` を渡すと、それを親ウインドウとしてdialogをモーダルウインドウにします。

`filters` は、表示されるファイルの種類を指定する配列です。例として `dialog.showOpenDialog` を参照して下さい。

`callback` が渡されると、API呼び出しは非同期になり、 `callback(ファイル名)` を通して結果が渡されます。

### `dialog.showMessageBox([browserWindow, ]options[, callback])`

* `browserWindow` BrowserWindow (任意)
* `options` オブジェクト 
  * `type` String (任意) - `"none"`、`"info"`、`"error"`、`"question"`、`"warning"`にできる。 Windowsでは、`"icon"` オプションを使用してアイコンを設定していない場合、`"question"` は `"info"` と同じアイコンを表示する。 macOSでは、`"warning"` と `"error"` で同じアイコンを表示する。
  * `buttons` String[] (任意) - ボタンのテキストの配列。Windowsでは、空の配列を渡すと"OK"ボタン一つになる。
  * `defaultId` Integer (任意) - メッセージボックスが開かれた時に、デフォルトで選択されているボタンのインデックス。
  * `title` String (任意) - メッセージボックスのタイトル。いくつかのプラットフォームでは表示されない。
  * `message` String - メッセージボックスの中のテキスト。
  * `detail` String (任意) - メッセージの追加情報。
  * `checkboxLabel` String (任意) - 指定した場合、この文字列のラベル付きのチェックボックスがメッセージボックスに含まれる。チェックボックスの状態は `callback` を使用するときのみ取得できる。
  * `checkboxChecked` Boolean (任意) - チェックボックスの初期状態。デフォルトは `false` 。
  * `icon` [NativeImage](native-image.md) (任意)
  * `cancelId` Integer (任意) - `Esc` キーを介して、dialogをキャンセルするボタンのインデックス。 デフォルトは"キャンセル"または"いいえ"のラベルで最初のボタンに割り当てられる。 もしそのようなラベルのボタンがなく、このオプションが設定されていない場合、`` が戻り値やコールバックのresponseとして使われる。 このオプションはWindowsでは無視される。
  * `noLink` Boolean (任意) - WindowsのElectronでは、`buttons` のうちのどれが("キャンセル"や"はい"の様な) 一般的なボタンなのか把握しようとし、他のダイアログ内のボタンはアクセスキーとして表示しようとする。 これでモダンなWindowsアプリのスタイルで表示させることができる。 もしこの挙動が気に入らない場合、`noLink` を `true` に設定できる。
  * `normalizeAccessKeys` Boolean (optional) - Normalize the keyboard access keys across platforms. 省略値は `false` です。 Enabling this assumes `&` is used in the button labels for the placement of the keyboard shortcut access key and labels will be converted so they work correctly on each platform, `&` characters are removed on macOS, converted to `_` on Linux, and left untouched on Windows. For example, a button label of `Vie&w` will be converted to `Vie_w` on Linux and `View` on macOS and can be selected via `Alt-W` on Windows and Linux.
* `callback` Function (任意) 
  * `response` Number - The index of the button that was clicked
  * `checkboxChecked` Boolean - The checked state of the checkbox if `checkboxLabel` was set. Otherwise `false`.

Returns `Integer`, the index of the clicked button, if a callback is provided it returns undefined.

Shows a message box, it will block the process until the message box is closed. It returns the index of the clicked button.

`browserWindow` を渡すと、それを親ウインドウとしてdialogをモーダルウインドウにします。

If a `callback` is passed, the dialog will not block the process. The API call will be asynchronous and the result will be passed via `callback(response)`.

### `dialog.showErrorBox(title, content)`

* `title` String - The title to display in the error box
* `content` String - The text content to display in the error box

Displays a modal dialog that shows an error message.

This API can be called safely before the `ready` event the `app` module emits, it is usually used to report errors in early stage of startup. If called before the app `ready`event on Linux, the message will be emitted to stderr, and no GUI dialog will appear.

### `dialog.showCertificateTrustDialog([browserWindow, ]options, callback)` *macOS* *Windows*

* `browserWindow` BrowserWindow (任意)
* `options` オブジェクト 
  * `certificate` [Certificate](structures/certificate.md) - The certificate to trust/import.
  * `message` String - The message to display to the user.
* `callback` Function

On macOS, this displays a modal dialog that shows a message and certificate information, and gives the user the option of trusting/importing the certificate. If you provide a `browserWindow` argument the dialog will be attached to the parent window, making it modal.

On Windows the options are more limited, due to the Win32 APIs used:

* The `message` argument is not used, as the OS provides its own confirmation dialog.
* The `browserWindow` argument is ignored since it is not possible to make this confirmation dialog modal.

## Sheets

On macOS, dialogs are presented as sheets attached to a window if you provide a `BrowserWindow` reference in the `browserWindow` parameter, or modals if no window is provided.

You can call `BrowserWindow.getCurrentWindow().setSheetOffset(offset)` to change the offset from the window frame where sheets are attached.