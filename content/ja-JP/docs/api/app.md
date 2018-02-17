# app

> アプリケーションのイベントライフサイクルを制御します。

プロセス: [Main](../glossary.md#main-process)

以下の例では最後のウインドウが閉じられたときにアプリケーションを終了する方法を示します。

```javascript
const {app} = require('electron')
app.on('window-all-closed', () => {
  app.quit()
})
```

## イベント

`app` オブジェクトでは以下のイベントが発生します。

### イベント: 'will-finish-launching'

アプリケーションが基本的な起動処理を完了したときに発生します。 WindowsとLinuxでは、`will-finish-launching` イベントは `ready` イベントと同じですが、macOSでは、このイベントは、`NSApplication` の `applicationWillFinishLaunching` 通知に相当します。 通常、ここでは、`open-file` や `open-url` イベントのリスナーを設定したり、クラッシュレポーターや自動アップデーターを開始したりします。

ほとんどの場合、`ready` イベントハンドラーですべてのことを行うようにするべきです。

### イベント: 'ready'

戻り値:

* `launchInfo` Object *macOS*

Electronが初期化処理を完了したときに発生します。 macOSでは、通知センターから起動された場合、`launchInfo` は、アプリケーションを開くのに使用された `NSUserNotification` の `userInfo` を保持しています。 `app.isReady()` を呼び出すことで、このイベントが既に発生しているかを確認することができます。

### イベント: 'window-all-closed'

すべてのウィンドウが閉じられたときに発生します。

このイベントを購読せずに全てのウインドウを閉じた場合、既定の動作としてアプリは終了します。しかし、このイベントを購読している場合は、アプリを終了するかどうかを制御することができます。 ユーザが `Cmd + Q` を押下したり、開発者が `app.quit()` を呼び出したりした場合、Electronは最初に全てのウインドウを閉じようとした後、`will-quit` イベントを発生させますが、この場合では、`window-all-closed` イベントは発生しないことになります。

### イベント: 'before-quit'

戻り値:

* `event` Event

アプリケーションがウインドウを閉じようとする前に発生します。`event.preventDefault()` を呼び出すことで、アプリケーションが終了する既定の動作をキャンセルすることができます。

**注:** アプリケーションの終了が `autoUpdater.quitAndInstall()` によって開始された場合、全てのウインドウで `close` イベントを発生させ、それらが閉じた*後* に `before-quit` が発生します。

### イベント: 'will-quit'

戻り値:

* `event` Event

全てのウインドウが閉じられ、アプリケーションが終了しようとしたときに発生します。`event.preventDefault()` を呼び出すことで、アプリケーションが終了する既定の動作をキャンセルすることができます。

`will-quit` と `window-all-closed` イベントの差異を確認するためには、`window-all-closed` イベントの説明もお読みください。

### イベント: 'quit'

戻り値:

* `event` Event
* `exitCode` Integer

アプリケーションが終了するときに発生します。

### イベント: 'open-file' *macOS*

戻り値:

* `event` Event
* `path` String

ユーザがアプリケーションでファイルを開こうとしたときに発生します。 `open-file` イベントは、通常、アプリケーションが既に開いていて、OSがファイルを開くために再利用しようとしたときに発生します。 `open-file`は、ドックにファイルをドロップし、アプリケーションがまだ実行されていないときにも発生します。 このようなケースに対処するために、アプリケーション起動時の非常に早い段階 ( `ready` イベントが発生するよりも前) で `open-file` イベントを監視するようにしてください。

このイベントを処理する場合、`event.preventDefault()` を呼び出す必要があります。

Windowsでは、ファイルパスを取得するために、(メインプロセスの) `process.argv` を解析しなければなりません。

### イベント: 'open-url' *macOS*

戻り値:

* `event` Event
* `url` String

ユーザがアプリケーションでURLを開こうとしたときに発生します。 アプリケーションの `Info.plist` ファイルで `CFBundleURLTypes` キーの中にURLスキームを定義し、`NSPrincipalClass` に `AtomApplication` を設定しなければなりません。

このイベントを処理する場合、`event.preventDefault()` を呼び出す必要があります。

### イベント: 'activate' *macOS*

戻り値:

* `event` Event
* `hasVisibleWindows` Boolean

アプリケーションがアクティブになったときに発生します。 アプリケーションが最初に起動される、既に実行中のときにアプリケーションを再起動しようとする、アプリケーションのドックやタスクバーのアイコンをクリックするなど、いろいろなアクションがこのイベントの引き金となり得ます。

### イベント: 'continue-activity' *macOS*

戻り値:

* `event` Event
* `type` String - アクティビティを識別する文字列。 [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType) と対応しています。
* `userInfo` Object - 別のデバイスのアクティビティによって蓄積されたアプリ固有の状態が含まれています。

[ハンドオフ](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) 中に別のデバイスからのアクティビティを継続しようとしたときに発生します。 このイベントを処理する場合、`event.preventDefault()` を呼び出す必要があります。

ユーザのアクティビティはアクティビティ元のアプリと同一の開発者チームIDを持ち、アクティビティタイプをサポートするアプリでしか継続させることができません。 サポートされるアクティビティタイプは、アプリの `Info.plist` の `NSUserActivityTypes` キーで指定されています。

### イベント: 'will-continue-activity' *macOS*

戻り値:

* `event` Event
* `type` String - アクティビティを識別する文字列。 [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType) と対応しています。

[ハンドオフ](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) 中に別のデバイスからのアクティビティを継続しようとする前に発生します。 このイベントを処理する場合、`event.preventDefault()` を呼び出す必要があります。

### イベント: 'continue-activity-error' *macOS*

戻り値:

* `event` Event
* `type` String - アクティビティを識別する文字列。 [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType) と対応しています。
* `error` String - エラーのローカライズされた説明としての文字列。

[ハンドオフ](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) 中に別のデバイスからのアクティビティを継続できなかったときに発生します。

### イベント: 'activity-was-continued' *macOS*

戻り値:

* `event` Event
* `type` String - アクティビティを識別する文字列。 [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType) と対応しています。
* `userInfo` Object - アクティビティによって蓄積されたアプリ固有の状態が含まれています。

[ハンドオフ](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) 中にこのデバイスからのアクティビティを他のデバイスで継続させることに成功した後で発生します。

### イベント: 'update-activity-state' *macOS*

戻り値:

* `event` Event
* `type` String - アクティビティを識別する文字列。 [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType) と対応しています。
* `userInfo` Object - アクティビティによって蓄積されたアプリ固有の状態が含まれています。

[ハンドオフ](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) が別のデバイスでまさに継続されようとしているときに発生します。 送信される状態を更新する必要がある場合、`event.preventDefault()` をすぐに呼び出してください。そして、新しい `userInfo` ディクショナリを組み立てて、`app.updateCurrentActivity()` をタイミングよく呼び出してください。 さもなくば操作は失敗し、`continue-activity-error` が呼び出されます。

### イベント: 'new-window-for-tab' *macOS*

戻り値:

* `event` Event

ユーザがmacOS標準の新規タブボタンをクリックしたときに発生します。新規タブボタンは現在の `BrowserWindow` に `tabbingIdentifier` が設定されている場合にだけ表示されます。

### イベント: 'browser-window-blur'

戻り値:

* `event` Event
* `window` [BrowserWindow](browser-window.md)

[browserWindow](browser-window.md) のフォーカスが外れたときに発生します。

### イベント: 'browser-window-focus'

戻り値:

* `event` Event
* `window` [BrowserWindow](browser-window.md)

[browserWindow](browser-window.md) がフォーカスを得たときに発生します。

### イベント: 'browser-window-created'

戻り値:

* `event` Event
* `window` [BrowserWindow](browser-window.md)

新しい [browserWindow](browser-window.md) が生成されたときに発生します。

### イベント: 'web-contents-created'

戻り値:

* `event` Event
* `webContents` [WebContents](web-contents.md)

新しい [webContents](web-contents.md) が生成されたときに発生します。

### イベント: 'certificate-error'

戻り値：

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `url` String
* `error` String - エラーコード
* `certificate` [Certificate](structures/certificate.md)
* `callback` Function 
  * `isTrusted` Boolean - 証明書を信頼できるものと見なすかどうか

`url` に対する `certificate` の検証に失敗したときに発生します。証明書を信頼するためには、`event.preventDefault()` で既定の動作をキャンセルして、`callback(true)` を呼び出すようにしてください。

```javascript
const {app} = require('electron')

app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
  if (url === 'https://github.com') {
    // 検証ロジック。
    event.preventDefault()
    callback(true)
  } else {
    callback(false)
  }
})
```

### イベント: 'select-client-certificate'

戻り値:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `url` URL
* `certificateList` [Certificate[]](structures/certificate.md)
* `callback` Function 
  * `certificate` [Certificate](structures/certificate.md) (任意)

クライアント証明書が要求されたときに発生します。

`url` がクライアント証明書を要求しているナビゲーションエントリーに対応していれば、リストからフィルターされたエントリーで `callback` を呼び出すことができます。 `event.preventDefault()` を使うことで、アプリケーションがストアから最初の証明書を使うのをキャンセルできます。

```javascript
const {app} = require('electron')

app.on('select-client-certificate', (event, webContents, url, list, callback) => {
  event.preventDefault()
  callback(list[0])
})
```

### イベント: 'login'

戻り値:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `request` Object 
  * `method` String
  * `url` URL
  * `referrer` URL
* `authInfo` Object 
  * `isProxy` Boolean
  * `scheme` String
  * `host` String
  * `port` Integer
  * `realm` String
* `callback` Function 
  * `username` String
  * `password` String

`webContents` がBasic認証を要求すると発生します。

既定の動作では、全ての認証を取り消しますが、これを変更するには、`event.preventDefault()` で既定の動作をキャンセルして、資格情報と共に `callback(username, password)` を呼び出すようにしてください。

```javascript
const {app} = require('electron')

app.on('login', (event, webContents, request, authInfo, callback) => {
  event.preventDefault()
  callback('username', 'secret')
})
```

### イベント: 'gpu-process-crashed'

戻り値:

* `event` Event
* `killed` Boolean

GPUプロセスがクラッシュしたり、強制終了されたりしたときに発生します。

### イベント: 'accessibility-support-changed' *macOS* *Windows*

戻り値:

* `event` Event
* `accessibilitySupportEnabled` Boolean - Chromeのユーザ補助機能が有効な場合は `true`、そうでない場合は `false`。

Chromeのユーザ補助機能が変更されると発生します。 このイベントはスクリーンリーダーのような支援技術が有効にされたり、無効にされたりしたときに発火します。 詳細については、https://www.chromium.org/developers/design-documents/accessibility を参照してください。

## メソッド

`app` オブジェクトには以下のメソッドがあります。

**注:** いくつかのメソッドは特定のオペレーティングシステムでのみ利用可能で、そのように注記がつけられています。

### `app.quit()`

すべてのウインドウを閉じようとします。 `before-quit` イベントが最初に発生します。 すべてのウインドウを閉じることに成功した場合、`will-quit` イベントが発生し、既定ではアプリケーションは終了します。

このメソッドは、すべての `beforeunload` および `unload` イベントハンドラーが正しく実行されることを保証します。 `beforeunload` イベントハンドラーで `false` を返すことによって、ウインドウが終了処理をキャンセルすることができます。

### `app.exit([exitCode])`

* `exitCode` Integer (任意)

`exitCode` ですぐに終了します。`exitCode` の省略値は0です。

ユーザに確認することなくすべてのウインドウがすぐに閉じられ、`before-quit` および `will-quit` イベントは発生しません。

### `app.relaunch([options])`

* `options` Object (任意) 
  * `args` String[] - (任意)
  * `execPath` String (任意)

現在のインスタンスが終了したときに、アプリを再起動します。

既定では新しいインスタンスは現在のインスタンスと同じ作業ディレクトリおよびコマンドライン引数を使用します。 `args` が指定された場合、`args` がコマンドライン引数として代わりに引き渡されます。 `execPath` が指定された場合、`execPath` が再起動のため現在のアプリに代わって実行されます。

このメソッドは実行されているアプリを終了しないことに注意してください。アプリを再起動するには、`app.relaunch` を呼び出した後、`app.quit` または `app.exit` を呼び出さなければなりません。

`app.relaunch` を複数回呼び出した場合、現在のインスタンスが終了した後、複数のインスタンスが開始されます。

現在のインスタンスをすぐに再起動し、新しいコマンドライン引数を新しいインスタンスに追加する例:

```javascript
const {app} = require('electron')

app.relaunch({args: process.argv.slice(1).concat(['--relaunch'])})
app.exit(0)
```

### `app.isReady()`

戻り値 `Boolean` - Electronの初期化が完了している場合、`true`、そうでない場合、`false`。

### `app.focus()`

Linuxでは、最初の可視ウインドウにフォーカスを当てます。macOSではアプリケーションをアクティブなアプリにします。Windowsでは、アプリケーションの最初のウインドウにフォーカスを当てます。

### `app.hide()` *macOS*

最小化することなくアプリケーションのすべてのウインドウを非表示にします。

### `app.show()` *macOS*

非表示にされたアプリケーションのウインドウを表示します。自動的にフォーカスは当たりません。

### `app.getAppPath()`

戻り値 `String` - 現在のアプリケーションのディレクトリ。

### `app.getPath(name)`

* `name` String

戻り値 `String` - `name` に関連付けられた特別なディレクトリもしくはファイルのパス。失敗した場合、`Error` がスローされます。

以下のパスを名前で要求することができます。

* `home` ユーザのホームディレクトリ。
* `appData` 既定のユーザ毎のアプリケーションデータディレクトリ。 
  * Windowsの場合、`%APPDATA%`
  * Linuxの場合、`$XDG_CONFIG_HOME` もしくは `~/.config`
  * macOSの場合、`~/Library/Application Support`
* `userData` アプリの設定ファイルが保存されるディレクトリで、既定ではアプリの名前で追加された `appData` のディレクトリ。
* `temp` 一時ディレクトリ。
* `exe` 現在の実行ファイル。
* `module` `libchromiumcontent` ライブラリ。
* `desktop` 現在のユーザのデスクトップディレクトリ。
* `documents` ユーザの"マイドキュメント"のディレクトリ。
* `downloads` ユーザのダウンロードのディレクトリ。
* `music` ユーザのミュージックのディレクトリ。
* `pictures` ユーザのピクチャのディレクトリ。
* `videos` ユーザのビデオのディレクトリ。
* `logs` アプリのログフォルダのディレクトリ。
* `pepperFlashSystemPlugin` システムバージョンのPepper Flashプラグインのフルパス。

### `app.getFileIcon(path[, options], callback)`

* `path` String
* `options` Object (任意) 
  * `size` String 
    * `small` - 16x16
    * `normal` - 32x32
    * `large` - *Linux* の場合、48x48、*Windows*の場合、32x32、macOSの場合はサポートされていません。
* `callback` Function 
  * `error` Error
  * `icon` [NativeImage](native-image.md)

パスに関連付けられているアイコンを取得します。

*Windows* の場合、2種類のアイコンがあります。

* `.mp3`、`.png` など、特定のファイル拡張子に関連付けられたアイコン。
* `.exe`、`.dll`、`.ico` のような、ファイル自体に含まれるアイコン。

*Linux* と *macOS* の場合、アイコンはファイルのMIMEタイプに関連付けられたアプリケーションによって決まります。

### `app.setPath(name, path)`

* `name` String
* `path` String

`name` に関連付けられた特別なディレクトリもしくはファイルの `path` を上書きします。 パスとして存在しないディレクトリが指定された場合、このメソッドによってディレクトリが作成されます。 失敗した場合、`Error` がスローされます。

`app.getPath` で定義されている `name` のパスだけを上書きすることができます。

既定では、WebページのCookieとキャッシュは `userData` ディレクトリに保存されます。 この場所を変更するには、`app` モジュールの `ready` イベントが発生する前に `userData` を上書きする必要があります。

### `app.getVersion()`

戻り値 `String` - ロードされたアプリケーションのバージョン。 アプリケーションの `package.json` ファイルにバージョンが見つからない場合、現在のバンドルもしくは実行可能ファイルのバージョンが返却されます。

### `app.getName()`

戻り値 `String` - アプリケーションの `package.json` ファイルで名前として設定された現在のアプリケーション名。

通常、`package.json` の `name` フィールドは、npmのモジュール仕様に基づき、小文字だけの短い名前が設定されます。 通常、すべて大文字で始まるアプリケーションの名前となる `productName` フィールドも指定してください。Electronによって、`name` よりも優先されます。

### `app.setName(name)`

* `name` String

現在のアプリケーションの名前を上書きします。

### `app.getLocale()`

戻り値 `String` - 現在のアプリケーションのロケール。返却される可能性のある値は [ここ](locales.md) に記されています。

**注:** アプリをパッケージ化して配布する場合、`locales` フォルダを同梱する必要があります。

**注:** Windows の場合、`ready` イベントが発生した後で呼び出すようにしてください。

### `app.addRecentDocument(path)` *macOS* *Windows*

* `path` String

`path` を最近使ったドキュメントのリストに追加します。

このリストはOSによって管理されています。Windowsの場合、タスクバーからリストにアクセスすることができ、macOSの場合、ドックのメニューからリストにアクセスすることができます。

### `app.clearRecentDocuments()` *macOS* *Windows*

最近使ったドキュメントのリストをクリアします。

### `app.setAsDefaultProtocolClient(protocol[, path, args])`

* `protocol` String - `://` を除くプロトコルの名前。 アプリで `electron://` リンクを処理したい場合、パラメータとして `electron` を指定してこのメソッドを呼び出してください。
* `path` String (任意) *Windows* - 省略値は `process.execPath`
* `args` String[] (任意) *Windows* - 省略値は空の配列

戻り値 `Boolean` - 呼び出しが成功したかどうか。

このメソッドは現在の実行可能ファイルをプロトコル (別名URIスキーム) の既定のハンドラーとして設定します。 これにより、アプリをオペレーティングシステムと密接に統合することができます。 一度登録すると、`your-protocol://` によるすべてのリンクは現在の実行可能ファイルで開かれるようになります。 プロトコルを含む全体のリンクがパラメータとしてアプリケーションに引き渡されます。

Windowsの場合、オプションのパラメータを指定することができます。path には実行可能ファイルへのパス、args には実行可能ファイルが起動する際に引き渡される引数の配列を指定してください。

**注:** macOSの場合、アプリの `info.plist` に追加されているプロトコルしか登録できず、実行時に変更することもできません。 しかしながら、単純なテキストエディターもしくはスクリプトでビルド時にファイルを変更することができます。 詳細は [Apple社のドキュメント](https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html#//apple_ref/doc/uid/TP40009249-102207-TPXREF115) を参照するようにしてください。

このAPIは内部的にWindowsのレジストリやLSSetDefaultHandlerForURLSchemeを使用します。

### `app.removeAsDefaultProtocolClient(protocol[, path, args])` *macOS* *Windows*

* `protocol` String - `://` を除くプロトコルの名前。
* `path` String (任意) *Windows* - 省略値は `process.execPath`
* `args` String[] (任意) *Windows* - 省略値は空の配列

戻り値 `Boolean` - 呼び出しが成功したかどうか。

このメソッドは現在の実行可能ファイルがプロトコル (別名URIスキーム) の既定のハンドラーであるかをチェックします。もしそうである場合、アプリを既定のハンドラから外します。

### `app.isDefaultProtocolClient(protocol[, path, args])` *macOS* *Windows*

* `protocol` String - `://` を除くプロトコルの名前。
* `path` String (任意) *Windows* - 省略値は `process.execPath`
* `args` String[] (任意) *Windows* - 省略値は空の配列

戻り値 `Boolean`

このメソッドは現在の実行可能ファイルがプロトコル (別名URIスキーム) の既定のハンドラーであるかをチェックします。もしそうである場合、trueを返却します。そうでない場合、falseを返却します。

**注:** macOSの場合、このメソッドは、アプリがプロトコルの既定のハンドラーとして登録されていたかをチェックするのに使えます。 macOSのマシン上の `~/Library/Preferences/com.apple.LaunchServices.plist` を確認することでもこれを検証することができます。 詳細は [Apple社のドキュメント](https://developer.apple.com/library/mac/documentation/Carbon/Reference/LaunchServicesReference/#//apple_ref/c/func/LSCopyDefaultHandlerForURLScheme) を参照するようにしてください。

このAPIは内部的にWindowsのレジストリやLSCopyDefaultHandlerForURLSchemeを使用します。

### `app.setUserTasks(tasks)` *Windows*

* `tasks` [Task[]](structures/task.md) - `Task` オブジェクトの配列

Windowsでジャンプリストの [タスク](http://msdn.microsoft.com/en-us/library/windows/desktop/dd378460(v=vs.85).aspx#tasks) カテゴリに `tasks` を追加します。

`tasks` は [`Task`](structures/task.md) オブジェクトの配列です。

戻り値 `Boolean` - 呼び出しが成功したかどうか。

**注:** ジャンプリストをもっとカスタマイズしたい場合は、`app.setJumpList(categories)` を代わりに使用してください。

### `app.getJumpListSettings()` *Windows*

戻り値 `Object`:

* `minItems` Integer - ジャンプリストに表示されるアイテムの最小の数 (この値の詳細な説明は [MSDN ドキュメント](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378398(v=vs.85).aspx) を参照してください) 。
* `removedItems` [JumpListItem[]](structures/jump-list-item.md) - ユーザがジャンプリストのカスタムカテゴリから明示的に削除したアイテムに対応した `JumpListItem` オブジェクトの配列。 これらのアイテムを**直後の** `app.setJumpList()` の呼び出しでジャンプリストに再度追加してはいけません。Windowsは削除されたアイテムを含むいかなるカスタムカテゴリも表示することはできません。

### `app.setJumpList(categories)` *Windows*

* `categories` [JumpListCategory[]](structures/jump-list-category.md) または `null` - `JumpListCategory` オブジェクトの配列。

アプリケーションのカスタムジャンプリストを設定もしくは削除し、以下の文字列のいずれかを返します。

* `ok` - 正常。
* `error` - 1つ以上のエラーが発生しました。何が原因かを把握するためには、実行時ログを有効にします。
* `invalidSeparatorError` - ジャンプリストのカスタムカテゴリに区切りを追加しようとしました。区切りは標準の `タスク` カテゴリでしか許可されません。
* `fileTypeRegistrationError` - アプリが処理できると登録されていないファイルタイプのファイルリンクをジャンプリストに追加しようとしました。
* `customCategoryAccessDeniedError` - ユーザープライバシーもしくはグループポリシー設定のため、ジャンプリストにカスタムカテゴリを追加できません。

`categories` が `null` の場合、その前に設定されていたカスタムジャンプリスト (あれば) は、(Windowsによって管理される) アプリ標準のジャンプリストに置換されます。

**注:** `JumpListCategory` オブジェクトが `type` プロパティも `name` プロパティも設定されなかった場合、`type` は `tasks` と見做されます。 `name` プロパティが設定されているが、`type` プロパティが省略された場合、`type` は `custom` と見做されます。

**注:** ユーザはカスタムカテゴリからアイテムを削除できますが、Windowsは次の `app.setJumpList(categories)` の呼び出しが成功した**後**でないと、削除されたアイテムをカスタムカテゴリに追加し直すことを許可しません。 それより早くカスタムカテゴリに削除されたアイテムを再度追加しようとすると、ジャンプリストからカスタムカテゴリ全体が外れてしまいます。 削除されたアイテムのリストは、`app.getJumpListSettings()` を使って取得できます。

カスタムジャンプリストを作成する非常に簡単な例は以下の通りです。

```javascript
const {app} = require('electron')

app.setJumpList([
  {
    type: 'custom',
    name: 'Recent Projects',
    items: [
      { type: 'file', path: 'C:\\Projects\\project1.proj' },
      { type: 'file', path: 'C:\\Projects\\project2.proj' }
    ]
  },
  { // name があるため、`type` は "custom" と見做されます
    name: 'Tools',
    items: [
      {
        type: 'task',
        title: 'Tool A',
        program: process.execPath,
        args: '--run-tool-a',
        icon: process.execPath,
        iconIndex: 0,
        description: 'Runs Tool A'
      },
      {
        type: 'task',
        title: 'Tool B',
        program: process.execPath,
        args: '--run-tool-b',
        icon: process.execPath,
        iconIndex: 0,
        description: 'Runs Tool B'
      }
    ]
  },
  { type: 'frequent' },
  { // name と type がないため、`type` は "tasks" と見做されます
    items: [
      {
        type: 'task',
        title: 'New Project',
        program: process.execPath,
        args: '--new-project',
        description: 'Create a new project.'
      },
      { type: 'separator' },
      {
        type: 'task',
        title: 'Recover Project',
        program: process.execPath,
        args: '--recover-project',
        description: 'Recover Project'
      }
    ]
  }
])
```

### `app.makeSingleInstance(callback)`

* `callback` Function 
  * `argv` String[] - 2番目のインスタンスのコマンドライン引数の配列
  * `workingDirectory` String - 2番目のインスタンスの作業ディレクトリ

戻り値 `Boolean`。

このメソッドはアプリケーションをシングルインスタンスのアプリケーションにします。複数のインスタンスでのアプリ実行を許可する代わりに、これはアプリの単一のインスタンスだけが実行されていることを保証します。そして、他のインスタンスはこのインスタンスに通知し、終了します。

`callback` will be called by the first instance with `callback(argv, workingDirectory)` when a second instance has been executed. `argv` is an Array of the second instance's command line arguments, and `workingDirectory` is its current working directory. Usually applications respond to this by making their primary window focused and non-minimized.

The `callback` is guaranteed to be executed after the `ready` event of `app` gets emitted.

This method returns `false` if your process is the primary instance of the application and your app should continue loading. And returns `true` if your process has sent its parameters to another instance, and you should immediately quit.

On macOS the system enforces single instance automatically when users try to open a second instance of your app in Finder, and the `open-file` and `open-url` events will be emitted for that. However when users start your app in command line the system's single instance mechanism will be bypassed and you have to use this method to ensure single instance.

An example of activating the window of primary instance when a second instance starts:

```javascript
const {app} = require('electron')
let myWindow = null

const isSecondInstance = app.makeSingleInstance((commandLine, workingDirectory) => {
  // Someone tried to run a second instance, we should focus our window.
  if (myWindow) {
    if (myWindow.isMinimized()) myWindow.restore()
    myWindow.focus()
  }
})

if (isSecondInstance) {
  app.quit()
}

// Create myWindow, load the rest of the app, etc...
app.on('ready', () => {
})
```

### `app.releaseSingleInstance()`

Releases all locks that were created by `makeSingleInstance`. This will allow multiple instances of the application to once again run side by side.

### `app.setUserActivity(type, userInfo[, webpageURL])` *macOS*

* `type` String - Uniquely identifies the activity. [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType) と対応しています。
* `userInfo` Object - App-specific state to store for use by another device.
* `webpageURL` String (optional) - The webpage to load in a browser if no suitable app is installed on the resuming device. The scheme must be `http` or `https`.

Creates an `NSUserActivity` and sets it as the current activity. The activity is eligible for [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) to another device afterward.

### `app.getCurrentActivityType()` *macOS*

Returns `String` - The type of the currently running activity.

### `app.invalidateCurrentActivity()` *macOS*

* `type` String - Uniquely identifies the activity. [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType) と対応しています。

Invalidates the current [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) user activity.

### `app.updateCurrentActivity(type, userInfo)` *macOS*

* `type` String - Uniquely identifies the activity. [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType) と対応しています。
* `userInfo` Object - App-specific state to store for use by another device.

Updates the current activity if its type matches `type`, merging the entries from `userInfo` into its current `userInfo` dictionary.

### `app.setAppUserModelId(id)` *Windows*

* `id` String

Changes the [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) to `id`.

### `app.importCertificate(options, callback)` *LINUX*

* `options` Object 
  * `certificate` String - Path for the pkcs12 file.
  * `password` String - Passphrase for the certificate.
* `callback` Function 
  * `result` Integer - Result of import.

Imports the certificate in pkcs12 format into the platform certificate store. `callback` is called with the `result` of import operation, a value of `` indicates success while any other value indicates failure according to chromium [net_error_list](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h).

### `app.disableHardwareAcceleration()`

Disables hardware acceleration for current app.

This method can only be called before app is ready.

### `app.disableDomainBlockingFor3DAPIs()`

By default, Chromium disables 3D APIs (e.g. WebGL) until restart on a per domain basis if the GPU processes crashes too frequently. This function disables that behaviour.

This method can only be called before app is ready.

### `app.getAppMemoryInfo()` *Deprecated*

Returns [`ProcessMetric[]`](structures/process-metric.md): Array of `ProcessMetric` objects that correspond to memory and cpu usage statistics of all the processes associated with the app. **Note:** This method is deprecated, use `app.getAppMetrics()` instead.

### `app.getAppMetrics()`

Returns [`ProcessMetric[]`](structures/process-metric.md): Array of `ProcessMetric` objects that correspond to memory and cpu usage statistics of all the processes associated with the app.

### `app.getGPUFeatureStatus()`

Returns [`GPUFeatureStatus`](structures/gpu-feature-status.md) - The Graphics Feature Status from `chrome://gpu/`.

### `app.setBadgeCount(count)` *Linux* *macOS*

* `count` Integer

戻り値 `Boolean` - 呼び出しが成功したかどうか。

Sets the counter badge for current app. Setting the count to `` will hide the badge.

On macOS it shows on the dock icon. On Linux it only works for Unity launcher,

**Note:** Unity launcher requires the existence of a `.desktop` file to work, for more information please read [Desktop Environment Integration](../tutorial/desktop-environment-integration.md#unity-launcher-shortcuts-linux).

### `app.getBadgeCount()` *Linux* *macOS*

Returns `Integer` - The current value displayed in the counter badge.

### `app.isUnityRunning()` *Linux*

Returns `Boolean` - Whether the current desktop environment is Unity launcher.

### `app.getLoginItemSettings([options])` *macOS* *Windows*

* `options` Object (optional) 
  * `path` String (optional) *Windows* - The executable path to compare against. Defaults to `process.execPath`.
  * `args` String[] (optional) *Windows* - The command-line arguments to compare against. Defaults to an empty array.

If you provided `path` and `args` options to `app.setLoginItemSettings` then you need to pass the same arguments here for `openAtLogin` to be set correctly.

Returns `Object`:

* `openAtLogin` Boolean - `true` if the app is set to open at login.
* `openAsHidden` Boolean - `true` if the app is set to open as hidden at login. This setting is only supported on macOS.
* `wasOpenedAtLogin` Boolean - `true` if the app was opened at login automatically. This setting is only supported on macOS.
* `wasOpenedAsHidden` Boolean - `true` if the app was opened as a hidden login item. This indicates that the app should not open any windows at startup. This setting is only supported on macOS.
* `restoreState` Boolean - `true` if the app was opened as a login item that should restore the state from the previous session. This indicates that the app should restore the windows that were open the last time the app was closed. This setting is only supported on macOS.

**Note:** This API has no effect on [MAS builds](../tutorial/mac-app-store-submission-guide.md).

### `app.setLoginItemSettings(settings)` *macOS* *Windows*

* `settings` Object 
  * `openAtLogin` Boolean (optional) - `true` to open the app at login, `false` to remove the app as a login item. Defaults to `false`.
  * `openAsHidden` Boolean (optional) - `true` to open the app as hidden. Defaults to `false`. The user can edit this setting from the System Preferences so `app.getLoginItemStatus().wasOpenedAsHidden` should be checked when the app is opened to know the current value. This setting is only supported on macOS.
  * `path` String (optional) *Windows* - The executable to launch at login. Defaults to `process.execPath`.
  * `args` String[] (optional) *Windows* - The command-line arguments to pass to the executable. Defaults to an empty array. Take care to wrap paths in quotes.

Set the app's login item settings.

To work with Electron's `autoUpdater` on Windows, which uses [Squirrel](https://github.com/Squirrel/Squirrel.Windows), you'll want to set the launch path to Update.exe, and pass arguments that specify your application name. For example:

```javascript
const appFolder = path.dirname(process.execPath)
const updateExe = path.resolve(appFolder, '..', 'Update.exe')
const exeName = path.basename(process.execPath)

app.setLoginItemSettings({
  openAtLogin: true,
  path: updateExe,
  args: [
    '--processStart', `"${exeName}"`,
    '--process-start-args', `"--hidden"`
  ]
})
```

**Note:** This API has no effect on [MAS builds](../tutorial/mac-app-store-submission-guide.md).

### `app.isAccessibilitySupportEnabled()` *macOS* *Windows*

Returns `Boolean` - `true` if Chrome's accessibility support is enabled, `false` otherwise. This API will return `true` if the use of assistive technologies, such as screen readers, has been detected. See https://www.chromium.org/developers/design-documents/accessibility for more details.

### `app.setAccessibilitySupportEnabled(enabled)` *macOS* *Windows*

* `enabled` Boolean - Enable or disable [accessibility tree](https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/the-accessibility-tree) rendering

Manually enables Chrome's accessibility support, allowing to expose accessibility switch to users in application settings. https://www.chromium.org/developers/design-documents/accessibility for more details. Disabled by default.

**Note:** Rendering accessibility tree can significantly affect the performance of your app. It should not be enabled by default.

### `app.setAboutPanelOptions(options)` *macOS*

* `options` Object 
  * `applicationName` String (optional) - The app's name.
  * `applicationVersion` String (optional) - The app's version.
  * `copyright` String (optional) - Copyright information.
  * `credits` String (optional) - Credit information.
  * `version` String (optional) - The app's build version number.

Set the about panel options. This will override the values defined in the app's `.plist` file. See the [Apple docs](https://developer.apple.com/reference/appkit/nsapplication/1428479-orderfrontstandardaboutpanelwith?language=objc) for more details.

### `app.commandLine.appendSwitch(switch[, value])`

* `switch` String - A command-line switch
* `value` String (optional) - A value for the given switch

Append a switch (with optional `value`) to Chromium's command line.

**Note:** This will not affect `process.argv`, and is mainly used by developers to control some low-level Chromium behaviors.

### `app.commandLine.appendArgument(value)`

* `value` String - The argument to append to the command line

Append an argument to Chromium's command line. The argument will be quoted correctly.

**Note:** This will not affect `process.argv`.

### `app.enableMixedSandbox()` *Experimental* *macOS* *Windows*

Enables mixed sandbox mode on the app.

This method can only be called before app is ready.

### `app.isInApplicationsFolder()` *macOS*

Returns `Boolean` - Whether the application is currently running from the systems Application folder. Use in combination with `app.moveToApplicationsFolder()`

### `app.moveToApplicationsFolder()` *macOS*

Returns `Boolean` - Whether the move was successful. Please note that if the move is successful your application will quit and relaunch.

No confirmation dialog will be presented by default, if you wish to allow the user to confirm the operation you may do so using the [`dialog`](dialog.md) API.

**NOTE:** This method throws errors if anything other than the user causes the move to fail. For instance if the user cancels the authorization dialog this method returns false. If we fail to perform the copy then this method will throw an error. The message in the error should be informative and tell you exactly what went wrong

### `app.dock.bounce([type])` *macOS*

* `type` String (optional) - Can be `critical` or `informational`. The default is `informational`

When `critical` is passed, the dock icon will bounce until either the application becomes active or the request is canceled.

When `informational` is passed, the dock icon will bounce for one second. However, the request remains active until either the application becomes active or the request is canceled.

Returns `Integer` an ID representing the request.

### `app.dock.cancelBounce(id)` *macOS*

* `id` Integer

Cancel the bounce of `id`.

### `app.dock.downloadFinished(filePath)` *macOS*

* `filePath` String

Bounces the Downloads stack if the filePath is inside the Downloads folder.

### `app.dock.setBadge(text)` *macOS*

* `text` String

Sets the string to be displayed in the dock’s badging area.

### `app.dock.getBadge()` *macOS*

Returns `String` - The badge string of the dock.

### `app.dock.hide()` *macOS*

ドックのアイコンを非表示にします。

### `app.dock.show()` *macOS*

ドックのアイコンを表示します。

### `app.dock.isVisible()` *macOS*

Returns `Boolean` - Whether the dock icon is visible. The `app.dock.show()` call is asynchronous so this method might not return true immediately after that call.

### `app.dock.setMenu(menu)` *macOS*

* `menu` [Menu](menu.md)

Sets the application's [dock menu](https://developer.apple.com/library/mac/documentation/Carbon/Conceptual/customizing_docktile/concepts/dockconcepts.html#//apple_ref/doc/uid/TP30000986-CH2-TPXREF103).

### `app.dock.setIcon(image)` *macOS*

* `image` ([NativeImage](native-image.md) | String)

Sets the `image` associated with this dock icon.