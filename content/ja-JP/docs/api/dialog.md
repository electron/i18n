# dialog

> ファイルを開いたり、保存したり、アラートを出したりするために、ネイティブのシステムダイアログを表示します。

プロセス: [Main](../glossary.md#main-process)

複数のファイルやディレクトリを選択するダイアログを表示する例:

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

* `browserWindow` BrowserWindow (任意)
* `options` Object 
  * `title` String (任意)
  * `defaultPath` String (任意)
  * `buttonLabel` String (任意) - 確認ボタンのカスタムラベル。空のままにすると、既定のラベルが使用されます。
  * `filters` [FileFilter[]](structures/file-filter.md) (任意)
  * `properties` String[] (任意) - ダイアログでどの機能を使用するか。以下の値がサポートされます。 
    * `openFile` - ファイルを選択するのを許可します。
    * `openDirectory` - ディレクトリを選択するのを許可します。
    * `multiSelections` - 複数のパスを選択するのを許可します。
    * `showHiddenFiles` - ダイアログで隠しファイルを表示します。
    * `createDirectory` - ダイアログから新しいディレクトリを作成するのを許可します。*macOS*
    * `promptToCreate` - ダイアログで入力されたファイルパスが存在しない場合、作成するように促します。 これは実際にパスにファイルを作成しませんが、アプリケーションによって作成される必要がある存在しないパスが返されることを許可します。 *Windows*
    * `noResolveAliases` - 自動エイリアス (シンボリックリンク) によるパス解決を無効にします。これにより、選択したエイリアスは、本体のパスの代わりにエイリアスのパスを返します。*macOS*
    * `treatPackageAsDirectory` - `.app` フォルダのようなパッケージをファイルとする代わりにディレクトリとして扱います。*macOS*
  * `message` String (任意) *macOS* - 入力ボックスの上に表示するメッセージ。
* `callback` Function (任意) 
  * `filePaths` String[] - ユーザーによって選択されたファイルパスの配列

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

`callback` が渡されると、API呼び出しは非同期になり、 `callback(filenames)` を通して結果が渡されます。

**注釈:** WindowsとLinuxではオープンダイアログはファイルとディレクトリ両方のセレクタになれません。なので、もし `properties` に `['openFile', 'openDirectory']` とセットした場合、これらのプラットフォームではディレクトリのセレクタとして表示されます。

### `dialog.showSaveDialog([browserWindow, ]options[, callback])`

* `browserWindow` BrowserWindow (任意)
* `options` Object 
  * `title` String (任意)
  * `defaultPath` String (任意) - デフォルトの絶対ディレクトリパス/絶対ファイルパス/ファイル名。
  * `buttonLabel` String (任意) - 確認ボタンのカスタムラベル。空のままにすると、既定のラベルが使用されます。
  * `filters` [FileFilter[]](structures/file-filter.md) (任意)
  * `message` String (任意) *macOS* - テキストフィールド上に表示するメッセージ。
  * `nameFieldLabel` String (任意) *macOS* - ファイル名のテキストフィールドの手前に表示されるテキストラベルのカスタマイズ。
  * `showsTagField` Boolean (任意) *macOS* - 入力ボックスにタグを表示する。デフォルトは `true`。
* `callback` Function (任意) 
  * `filename` String

戻り値はユーザが選択したファイルパスを `String` で返します。callbackが設けられている場合は `undefined` を返します。

`browserWindow` を渡すと、それを親ウインドウとしてdialogをモーダルウインドウにします。

`filters` は、表示されるファイルの種類を指定する配列です。例として `dialog.showOpenDialog` を参照して下さい。

`callback` が渡されると、API呼び出しは非同期になり、 `callback(filename)` を通して結果が渡されます。

### `dialog.showMessageBox([browserWindow, ]options[, callback])`

* `browserWindow` BrowserWindow (任意)
* `options` Object 
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
  * `normalizeAccessKeys` Boolean (任意) - プラットフォーム間でのキーボードアクセスキーの正規化。 省略値は `false` 。 これを有効にすると、キーボードショートカットアクセスキーの配置用のボタンラベルに `&` が使われ、各プラットフォーム間で正常に動作するようにラベルが変換されます。macOSでは `&` 文字は削除され、Linuxでは `_` に変換され、Windowsでは変換されません。 例えば、ボタンラベルが `Vie&w` のとき、Linuxでは `Vie_w` に、macOSでは `View` に、WindowsとLinuxでは `Alt-W` で選択できるようになります。
* `callback` Function (任意) 
  * `response` Number - クリックされたボタンのインデックス
  * `checkboxChecked` Boolean - `checkboxLabel` で設定したチェックボックスの状態。無ければ `false`。

戻り値はクリックされたボタンのインデックスの `Integer`。callbackが設けられている場合、undefinedを返します。

メッセージボックスが閉じられるまでプロセスをブロックして、メッセージボックスを表示します。クリックされたボタンのインデックスを返します。

`browserWindow` を渡すと、それを親ウインドウとしてdialogをモーダルウインドウにします。

`callback` が渡されると、API呼び出しは非同期になり、 `callback(response)` を通して結果が渡されます。

### `dialog.showErrorBox(title, content)`

* `title` String - エラーボックス内に表示するタイトル
* `content` String - エラーボックスの中に表示するテキスト

エラーメッセージを示すモーダルダイアログを表示します。

このAPIは `app` オブジェクトの `ready` イベントが発行される前に、安全に呼べます。起動時の初期段階でのエラーの報告によく使われます。 Linuxにおいて、appの `ready` イベントが発行される前に呼んだ場合、メッセージは stderr に吐かれて、GUIのダイアログは表示されません。

### `dialog.showCertificateTrustDialog([browserWindow, ]options, callback)` *macOS* *Windows*

* `browserWindow` BrowserWindow (任意)
* `options` Object 
  * `certificate` [Certificate](structures/certificate.md) - 信頼/インポートする証明書。
  * `message` String - ユーザに表示するメッセージ。
* `callback` Function

macOSにおいて、これはメッセージと証明書の情報を表示し、ユーザに信頼/インポートする証明書のオプションを提供します。 `browserWindow` を渡すと、それを親ウインドウとしてdialogをモーダルウインドウにします。

Windowsでのオプションはより限られており、Win32APIは以下のようになります。

* `message` は使用されません。OS独自の確認ダイアログを提供します。
* この確認ダイアログはモーダルウインドウにできないので、`browserWindow` は無視されます。

## シート

macOSにおいて、`browserWindow` に `BrowserWindow` の参照を指定すると、dialogがウインドウにアタッチされたシートとして表示されます。

`BrowserWindow.getCurrentWindow().setSheetOffset(offset)` を呼ぶことで、アタッチされたシートのウインドウフレームからのオフセットを変更できます。