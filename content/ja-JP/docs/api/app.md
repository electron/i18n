# app

> アプリケーションのイベントライフサイクルを制御します。

プロセス: [Main](../glossary.md#main-process)

以下の例では最後のウインドウが閉じられたときにアプリケーションを終了する方法を示します。

```javascript
const { app } = require('electron')
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

* `launchInfo` unknown *macOS*

Electronが初期化処理を完了したときに発生します。 macOSでは、通知センターから起動された場合、`launchInfo` は、アプリケーションを開くのに使用された `NSUserNotification` の `userInfo` を保持しています。 `app.isReady()` を呼び出すことで、このイベントが既に発生しているかを確認することができます。

### イベント: 'window-all-closed'

すべてのウィンドウが閉じられたときに発生します。

このイベントを購読せずに全てのウインドウを閉じた場合、既定の動作としてアプリは終了します。しかし、このイベントを購読している場合は、アプリを終了するかどうかを制御することができます。 ユーザが `Cmd + Q` を押下したり、開発者が `app.quit()` を呼び出したりした場合、Electronは最初に全てのウインドウを閉じようとした後、`will-quit` イベントを発生させますが、この場合では、`window-all-closed` イベントは発生しないことになります。

### イベント: 'before-quit'

戻り値:

* `event` Event

アプリケーションがウインドウを閉じようとする前に発生します。`event.preventDefault()` を呼び出すことで、アプリケーションが終了する既定の動作をキャンセルすることができます。

**注:** アプリケーションの終了が `autoUpdater.quitAndInstall()` によって開始された場合、全てのウインドウで `close` イベントを発生させ、それらが閉じた*後* に `before-quit` が発生します。

**注釈:** Windows では、このイベントはシステムのシャットダウン/再起動やユーザーのログアウトでアプリケーションが閉じられている場合には発生しません。

### イベント: 'will-quit'

戻り値:

* `event` Event

全てのウインドウが閉じられ、アプリケーションが終了しようとしたときに発生します。`event.preventDefault()` を呼び出すことで、アプリケーションが終了する既定の動作をキャンセルすることができます。

`will-quit` と `window-all-closed` イベントの差異を確認するためには、`window-all-closed` イベントの説明もお読みください。

**注釈:** Windows では、このイベントはシステムのシャットダウン/再起動やユーザーのログアウトでアプリケーションが閉じられている場合には発生しません。

### イベント: 'quit'

戻り値:

* `event` Event
* `exitCode` Integer

アプリケーションが終了するときに発生します。

**注釈:** Windows では、このイベントはシステムのシャットダウン/再起動やユーザーのログアウトでアプリケーションが閉じられている場合には発生しません。

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

ユーザがアプリケーションでURLを開こうとしたときに発生します。 アプリケーションの `Info.plist` ファイルで `CFBundleURLTypes` キーの中に URL スキームを定義し、`NSPrincipalClass` に `AtomApplication` を設定しなければなりません。

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
* `userInfo` unknown - 別のデバイスのアクティビティによって保存されたアプリ固有の情報が含まれています。

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
* `userInfo` unknown - アクティビティによって保存されたアプリ固有の情報が含まれています。

[ハンドオフ](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) 中にこのデバイスからのアクティビティを他のデバイスで継続させることに成功した後で発生します。

### イベント: 'update-activity-state' *macOS*

戻り値:

* `event` Event
* `type` String - アクティビティを識別する文字列。 [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType) と対応しています。
* `userInfo` unknown - アクティビティによって保存されたアプリ固有の情報が含まれています。

[ハンドオフ](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) が別のデバイスでまさに継続されようとしているときに発生します。 送信される情報を更新する必要がある場合、`event.preventDefault()` をすぐに呼び出してください。そして、新しい `userInfo` ディクショナリを組み立てて、`app.updateCurrentActivity()` をタイミングよく呼び出してください。 さもなくば操作は失敗し、`continue-activity-error` が呼び出されます。

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

戻り値:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `url` String
* `error` String - エラーコード
* `certificate` [Certificate](structures/certificate.md)
* `callback` Function 
  * `isTrusted` Boolean - 証明書を信頼できるものと見なすかどうか

`url` に対する `certificate` の検証に失敗したときに発生します。証明書を信頼するためには、`event.preventDefault()` で既定の動作をキャンセルして、`callback(true)` を呼び出すようにしてください。

```javascript
const { app } = require('electron')

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
const { app } = require('electron')

app.on('select-client-certificate', (event, webContents, url, list, callback) => {
  event.preventDefault()
  callback(list[0])
})
```

### イベント: 'login'

戻り値:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `authenticationResponseDetails` Object 
  * `url` URL
* `authInfo` Object 
  * `isProxy` Boolean
  * `scheme` String
  * `host` String
  * `port` Integer
  * `realm` String
* `callback` Function 
  * `username` String (任意)
  * `password` String (任意)

`webContents` がBasic認証を要求すると発生します。

既定の動作では、全てに認証をキャンセルします。 これを変更するには、`event.preventDefault()` で既定の動作をキャンセルして、資格情報と共に `callback(username, password)` を呼び出すようにしてください。

```javascript
const { app } = require('electron')

app.on('login', (event, webContents, details, authInfo, callback) => {
  event.preventDefault()
  callback('username', 'secret')
})
```

ユーザー名またはパスワードを渡さずに `callback` を呼び出すと、認証リクエストはキャンセルされ、認証エラーがページに返されます。

### イベント: 'gpu-info-update'

GPU 情報の更新がある場合に発生します。

### イベント: 'gpu-process-crashed'

戻り値:

* `event` Event
* `killed` Boolean

GPU プロセスがクラッシュしたり、強制終了されたりしたときに発生します。

### イベント: 'renderer-process-crashed'

戻り値:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `killed` Boolean

`webContents` のレンダラープロセスがクラッシュ、または強制終了されたときに発行されます。

### イベント: 'accessibility-support-changed' *macOS* *Windows*

戻り値:

* `event` Event
* `accessibilitySupportEnabled` Boolean - Chromeのユーザ補助機能が有効な場合は `true`、そうでない場合は `false`。

Chromeのユーザ補助機能が変更されると発生します。 このイベントはスクリーンリーダーのような支援技術が有効にされたり、無効にされたりしたときに発火します。 詳細については、https://www.chromium.org/developers/design-documents/accessibility を参照してください。

### イベント: 'session-created'

戻り値:

* `session` [Session](session.md)

Electron が新しい `session` を作成したときに発生します。

```javascript
const { app } = require('electron')

app.on('session-created', (event, session) => {
  console.log(session)
})
```

### イベント: 'second-instance'

戻り値:

* `event` Event
* `argv` String[] - 2番目のインスタンスのコマンドライン引数の配列
* `workingDirectory` String - 2番目のインスタンスの作業ディレクトリ

このイベントは、2 つ目のインスタンスが実行され `app.requestSingleInstanceLock()` が実行されたとき、アプリケーションの1つ目のインスタンス内で発火されます。

`argv` は2番目のインスタンスのコマンドライン引数の配列で、`workingDirectory` はその現在の作業ディレクトリです。 通常、アプリケーションはこれに対して1番目のウインドウにフォーカスを当て、最小化しないように対応します。

このイベントは `app` の `ready` イベントが発生した後で実行されることが保証されます。

**注意:** Chromiumがコマンドライン引数を追加することがあります。例えば、`--original-process-start-time`があります。

### イベント: 'desktop-capturer-get-sources'

戻り値:

* `event` Event
* `webContents` [WebContents](web-contents.md)

`webContents` のレンダラプロセスで `desktopCapturer.getSources()` が呼び出されたときに発生します。 `event.preventDefault()` を呼び出すと、空のソースが返されます。

### イベント: 'remote-require'

戻り値:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `モジュール名` String

`webContents` のレンダラープロセス内で `remote.require()` が呼ばれたときに発生します。 `event.preventDefault()` を呼ぶとモジュールの返却が阻害されます。 `event.returnValue` にセットすることでカスタムな値を返すことが出来ます。

### イベント: 'remote-get-global'

戻り値:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `globalName` String

`webContents` のレンダラープロセス内で `remote.getGlobal()` が呼ばれたときに発生します。 `event.preventDefault()` を呼ぶとグローバルの返却が阻害されます。 `event.returnValue` にセットすることでカスタムな値を返すことが出来ます。

### イベント: 'remote-get-builtin'

戻り値:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `モジュール名` String

`webContents` のレンダラープロセス内で `remote.getBuiltin()` が呼ばれたときに発生します。 `event.preventDefault()` を呼ぶとモジュールの返却が阻害されます。 `event.returnValue` にセットすることでカスタムな値を返すことが出来ます。

### イベント: 'remote-get-current-window'

戻り値:

* `event` Event
* `webContents` [WebContents](web-contents.md)

`webContents` のレンダラープロセス内で `remote.getCurrentWindow()` が呼ばれたときに発生します。 `event.preventDefault()` を呼ぶとオブジェクトの返却が阻害されます。 `event.returnValue` にセットすることでカスタムな値を返すことが出来ます。

### イベント: 'remote-get-current-web-contents'

戻り値:

* `event` Event
* `webContents` [WebContents](web-contents.md)

`webContents` のレンダラープロセス内で `remote.getCurrentWebContents()` が呼ばれたときに発生します。 `event.preventDefault()` を呼ぶとオブジェクトの返却が阻害されます。 `event.returnValue` にセットすることでカスタムな値を返すことが出来ます。

### イベント: 'remote-get-guest-web-contents'

戻り値:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `guestWebContents` [WebContents](web-contents.md)

`webContents` のレンダラープロセス内で `<webview>.getWebContents()` が呼ばれたときに発生します。 `event.preventDefault()` を呼ぶとオブジェクトの返却が阻害されます。 `event.returnValue` にセットすることでカスタムな値を返すことが出来ます。

## メソッド

`app` オブジェクトには以下のメソッドがあります。

**注:** いくつかのメソッドは特定のオペレーティングシステムでのみ利用可能で、そのように注記がつけられています。

### `app.quit()`

すべてのウインドウを閉じようとします。 `before-quit` イベントが最初に発生します。 すべてのウインドウを閉じることに成功した場合、`will-quit` イベントが発生し、既定ではアプリケーションは終了します。

このメソッドは、すべての `beforeunload` および `unload` イベントハンドラーが正しく実行されることを保証します。 `beforeunload` イベントハンドラーで `false` を返すことによって、ウインドウが終了処理をキャンセルすることができます。

### `app.exit([exitCode])`

* `exitCode` Integer (optional)

`exitCode` ですぐに終了します。`exitCode` の省略値は0です。

ユーザに確認することなくすべてのウインドウがすぐに閉じられ、`before-quit` および `will-quit` イベントは発生しません。

### `app.relaunch([options])`

* `options` Object (任意) 
  * `args` String[] (任意)
  * `execPath` String (optional)

現在のインスタンスが終了したときに、アプリを再起動します。

既定では新しいインスタンスは現在のインスタンスと同じ作業ディレクトリおよびコマンドライン引数を使用します。 `args` が指定された場合、`args` がコマンドライン引数として代わりに引き渡されます。 `execPath` が指定された場合、`execPath` が再起動のため現在のアプリに代わって実行されます。

このメソッドは実行されているアプリを終了しないことに注意してください。アプリを再起動するには、`app.relaunch` を呼び出した後、`app.quit` または `app.exit` を呼び出さなければなりません。

`app.relaunch` を複数回呼び出した場合、現在のインスタンスが終了した後、複数のインスタンスが開始されます。

現在のインスタンスをすぐに再起動し、新しいコマンドライン引数を新しいインスタンスに追加する例:

```javascript
const { app } = require('electron')

app.relaunch({ args: process.argv.slice(1).concat(['--relaunch']) })
app.exit(0)
```

### `app.isReady()`

戻り値 `Boolean` - Electronの初期化が完了している場合、`true`、そうでない場合、`false`。

### `app.whenReady()`

Returns `Promise<void>` - Electron が初期化されるときに実行される Promise。 `app.isReady()` を確認してアプリの準備がまだできていないときに `ready` イベントに登録するための、便利な代替手段として使用できます。

### `app.focus()`

Linuxでは、最初の可視ウインドウにフォーカスを当てます。macOSではアプリケーションをアクティブなアプリにします。Windowsでは、アプリケーションの最初のウインドウにフォーカスを当てます。

### `app.hide()` *macOS*

最小化することなくアプリケーションのすべてのウインドウを非表示にします。

### `app.show()` *macOS*

非表示にされたアプリケーションのウインドウを表示します。自動的にフォーカスは当たりません。

### `app.setAppLogsPath([path])`

* `path` String (任意) - ログのカスタムパス。絶対パスでなければなりません。

アプリがロギングするディレクトリを設定または作成します。これは `app.getPath()` や `app.setPath(pathName, newPath)` で操作できます。

`path` 引数なしで `app.setAppLogsPath()` を呼び出すと、このディレクトリは、*macOS* では `~/Library/Logs/アプリ名` に、*Linux* と *Windows* では `userData` ディレクトリ内に設定されます。

### `app.getAppPath()`

戻り値 `String` - 現在のアプリケーションのディレクトリ。

### `app.getPath(name)`

* `name` String - 以下のパスを名前で要求することができます。 
  * `home` ユーザのホームディレクトリ。
  * `appData` 既定のユーザ毎のアプリケーションデータディレクトリ。 
    * Windowsの場合、`%APPDATA%`
    * Linuxの場合、`$XDG_CONFIG_HOME` もしくは `~/.config`
    * macOSの場合、`~/Library/Application Support`
  * `userData` アプリの設定ファイルが保存されるディレクトリで、既定ではアプリの名前で追加された `appData` のディレクトリ。
  * `キャッシュ`
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

戻り値 `String` - `name` に関連付けられた特別なディレクトリもしくはファイルのパス。失敗した場合、`Error` がスローされます。

`app.setAppLogsPath()` を呼び出すよりも先に `app.getPath('logs')` が呼び出された場合、`path` 引数なしで `app.setAppLogsPath()` を呼び出すのに等しい、デフォルトのログディレクトリが作成されます。

### `app.getFileIcon(path[, options])`

* `path` String
* `options` Object (任意) 
  * `size` String 
    * `small` - 16x16
    * `normal` - 32x32
    * `large` - *Linux* の場合、48x48、*Windows*の場合、32x32、macOSの場合はサポートされていません。

`Promise<NativeImage>`を返す - [NativeImage](native-image.md)でアプリのアイコンを埋めます。

パスに関連付けられているアイコンを取得します。

*Windows* の場合、2種類のアイコンがあります。

* `.mp3`、`.png` など、特定のファイル拡張子に関連付けられたアイコン。
* `.exe`、`.dll`、`.ico` のような、ファイル自体に含まれるアイコン。

*Linux* と *macOS* の場合、アイコンはファイルのMIMEタイプに関連付けられたアプリケーションによって決まります。

### `app.setPath(name, path)`

* `name` String
* `path` String

`name` に関連付けられた特別なディレクトリもしくはファイルの `path` を上書きします。 パスとして存在しないディレクトリが指定された場合、`Error` が投げられます。 その場合、そのディレクトリを `fs.mkdirSync` や類似のもので作成するべきです。

`app.getPath` で定義されている `name` のパスだけを上書きすることができます。

既定では、WebページのCookieとキャッシュは `userData` ディレクトリに保存されます。 この場所を変更するには、`app` モジュールの `ready` イベントが発生する前に `userData` を上書きする必要があります。

### `app.getVersion()`

戻り値 `String` - ロードされたアプリケーションのバージョン。 アプリケーションの `package.json` ファイルにバージョンが見つからない場合、現在のバンドルもしくは実行可能ファイルのバージョンが返却されます。

### `app.getName()`

戻り値 `String` - アプリケーションの `package.json` ファイルで名前として設定された現在のアプリケーション名。

通常、`package.json` の `name` フィールドは、npm のモジュール仕様に基づいて小文字だけの短い名前が設定されます。 通常、すべて大文字で始まるアプリケーションの名前となる `productName` フィールドも指定してください。Electronによって、`name` よりも優先されます。

**[非推奨](modernization/property-updates.md)**

### `app.setName(name)`

* `name` String

現在のアプリケーションの名前を上書きします。

**[非推奨](modernization/property-updates.md)**

### `app.getLocale()`

戻り値 `String` - 現在のアプリケーションのロケール。とりうる戻り値は [こちら](locales.md) に記されています。

ロケールを設定するには、アプリケーションの起動時にコマンドラインスイッチを使用する必要があります。これについては、[こちら](https://github.com/electron/electron/blob/master/docs/api/chrome-command-line-switches.md) を参照してください。

**注:** アプリをパッケージ化して配布する場合、`locales` フォルダを同梱する必要があります。

**Note:**Windows の `準備ができて` のイベントが出力される後を呼び出すことがあります。

### `app.getLocaleCountryCode()`

戻り値 `String` - 2文字の [ISO 3166](https://www.iso.org/iso-3166-country-codes.html) 国名コードで、ユーザーの OS のロケールを示します。この値はネィティブの OS API から取得します。

**注意:** ロケールの国コードを取得できなかった場合、これは空文字列を返します。

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

**注:** macOSの場合、アプリの `info.plist` に追加されているプロトコルしか登録できず、実行時に変更することもできません。 しかしながら、単純なテキストエディタもしくはスクリプトでビルド時にファイルを変更することができます。 詳細は [Apple社のドキュメント](https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html#//apple_ref/doc/uid/TP40009249-102207-TPXREF115) を参照するようにしてください。

**注釈:** Windows ストア 環境 (`appx` としてパッケージされている) 場合、この API はすべての呼び出しに `true` を返しますが、それにセットされたレジストリキーは他のアプリケーションからアクセスできません。 Windows ストア アプリケーションをデフォルトのプロトコルハンドラとして登録するには、[マニフェストでプロトコルを宣言する](https://docs.microsoft.com/en-us/uwp/schemas/appxpackage/uapmanifestschema/element-uap-protocol) 必要があります。

このAPIは内部的にWindowsのレジストリやLSSetDefaultHandlerForURLSchemeを使用します。

### `app.removeAsDefaultProtocolClient(protocol[, path, args])` *macOS* *Windows*

* `protocol` String - `://` を除くプロトコルの名前。
* `path` String (任意) *Windows* - 省略値は `process.execPath`
* `args` String[] (任意) *Windows* - 省略値は空の配列

戻り値 `Boolean` - 呼び出しが成功したかどうか。

このメソッドは現在の実行可能ファイルがプロトコル (別名URIスキーム) の既定のハンドラーであるかをチェックします。もしそうである場合、アプリを既定のハンドラから外します。

### `app.isDefaultProtocolClient(protocol[, path, args])`

* `protocol` String - `://` を除くプロトコルの名前。
* `path` String (任意) *Windows* - 省略値は `process.execPath`
* `args` String[] (任意) *Windows* - 省略値は空の配列

戻り値 `Boolean`

このメソッドは現在の実行可能ファイルがプロトコル (別名URIスキーム) の既定のハンドラーであるかをチェックします。もしそうである場合、trueを返却します。そうでない場合、falseを返却します。

**注:** macOSの場合、このメソッドは、アプリがプロトコルの既定のハンドラーとして登録されていたかをチェックするのに使えます。 macOSのマシン上の `~/Library/Preferences/com.apple.LaunchServices.plist` を確認することでもこれを検証することができます。 詳細は [Apple社のドキュメント](https://developer.apple.com/library/mac/documentation/Carbon/Reference/LaunchServicesReference/#//apple_ref/c/func/LSCopyDefaultHandlerForURLScheme) を参照するようにしてください。

このAPIは内部的にWindowsのレジストリやLSCopyDefaultHandlerForURLSchemeを使用します。

### `app.setUserTasks(tasks)` *Windows*

* `tasks` [Task[]](structures/task.md) - `Task`オブジェクトの配列

`tasks` を Windows でのジャンプリストの [タスク](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378460(v=vs.85).aspx#tasks) カテゴリに追加します。

`tasks` は [`Task`](structures/task.md) オブジェクトの配列です。

戻り値 `Boolean` - 呼び出しが成功したかどうか。

**注:** ジャンプリストをもっとカスタマイズしたい場合は、`app.setJumpList(categories)` を代わりに使用してください。

### `app.getJumpListSettings()` *Windows*

戻り値 `Object`:

* `minItems` Integer - ジャンプリストに表示されるアイテムの最小の数 (この値の詳細な説明は [MSDN ドキュメント](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378398(v=vs.85).aspx) を参照してください) 。
* `removedItems` [JumpListItem[]](structures/jump-list-item.md) - ユーザが、ジャンプリストのカスタムカテゴリから明示的に削除したアイテムに対応した、`JumpListItem` オブジェクトの配列。 これらのアイテムを**直後の** `app.setJumpList()` の呼び出しでジャンプリストに再度追加してはいけません。Windowsは削除されたアイテムを含むいかなるカスタムカテゴリも表示することはできません。

### `app.setJumpList(categories)` *Windows*

* `categories` [JumpListCategory[]](structures/jump-list-category.md) | `null` - `JumpListCategory` オブジェクトの配列。

アプリケーションのカスタムジャンプリストを設定もしくは削除し、以下の文字列のいずれかを返します。

* `ok` - 正常。
* `error` - 1つ以上のエラーが発生しました。何が原因かを把握するためには、実行時ログを有効にします。
* `invalidSeparatorError` - ジャンプリストのカスタムカテゴリに区切りを追加しようとしました。区切りは標準の `タスク` カテゴリでしか許可されません。
* `fileTypeRegistrationError` - アプリが処理できると登録されていないファイルタイプのファイルリンクをジャンプリストに追加しようとしました。
* `customCategoryAccessDeniedError` - ユーザープライバシーもしくはグループポリシー設定のため、ジャンプリストにカスタムカテゴリを追加できません。

`categories` が `null` の場合、その前に設定されていたカスタムジャンプリスト (あれば) は、(Windowsによって管理される) アプリ標準のジャンプリストに置換されます。

**注:** `JumpListCategory` オブジェクトに `type` プロパティも `name` プロパティも設定されなかった場合、`type` は `tasks` と見做されます。 `name` プロパティは設定されている一方で `type` プロパティが省略された場合、`type` は `custom` と見做されます。

**注:** ユーザはカスタムカテゴリからアイテムを削除できますが、Windowsは次の `app.setJumpList(categories)` の呼び出しが成功した**後**でないと、削除されたアイテムをカスタムカテゴリに追加し直すことを許可しません。 それより早くカスタムカテゴリに削除されたアイテムを再度追加しようとすると、ジャンプリストからカスタムカテゴリ全体が外れてしまいます。 削除されたアイテムのリストは、`app.getJumpListSettings()` を使って取得できます。

カスタムジャンプリストを作成する非常に簡単な例は以下の通りです。

```javascript
const { app } = require('electron')

app.setJumpList([
  {
    type: 'custom',
    name: '最近開いたプロジェクト',
    items: [
      { type: 'file', path: 'C:\\Projects\\project1.proj' },
      { type: 'file', path: 'C:\\Projects\\project2.proj' }
    ]
  },
  { // name があるので `type` は "custom" になります
    name: 'ツール',
    items: [
      {
        type: 'task',
        title: 'ツールA',
        program: process.execPath,
        args: '--run-tool-a',
        icon: process.execPath,
        iconIndex: 0,
        description: 'ツールAを実行する'
      },
      {
        type: 'task',
        title: 'ツールB',
        program: process.execPath,
        args: '--run-tool-b',
        icon: process.execPath,
        iconIndex: 0,
        description: 'ツールBを実行する'
      }
    ]
  },
  { type: 'frequent' },
  { // name がないので `type`は "tasks" になります
    items: [
      {
        type: 'task',
        title: '新規プロジェクト',
        program: process.execPath,
        args: '--new-project',
        description: '新しいプロジェクトを作成する。'
      },
      { type: 'separator' },
      {
        type: 'task',
        title: 'プロジェクトの復元',
        program: process.execPath,
        args: '--recover-project',
        description: 'プロジェクト路を復元する'
      }
    ]
  }
])
```

### `app.requestSingleInstanceLock()`

戻り値 `Boolean`

このメソッドの戻り値は、アプリケーションのこのインスタンスのロックが成功したかどうかを表します。 ロック状態にできなかった場合、アプリケーションの他のインスタンスが既にロックされており、ただちに終了すると想定できます。

またこのメソッドは、プロセスがアプリケーションの1つ目のインスタンスで、アプリがロード処理を続行する必要がある場合も `false` を返します。 既にロック状態にしたものとは別のインスタンスにパラメータを送信したためプロセスが直ちに終了する必要がある場合は、`false` を返します。

macOSの場合、ユーザがFinderでアプリの2番目のインスタンスを開こうとしたとき、システムは自動的にシングルインスタンスになるようにし、`open-file` と `open-url` イベントが発生します。 ただし、ユーザがアプリをコマンドラインで開始する場合、シングルインスタンスを強制するシステムの仕組みが迂回されるため、シングルインスタンスであることを保証するには、このメソッドを使う必要があります。

2番目のインスタンスが開始されたとき、1番目のインスタンスのウインドウをアクティブにする例:

```javascript
const { app } = require('electron')
let myWindow = null

const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // 誰かが2つ目のインスタンスを実行したとき、このウィンドウにフォーカスする
    if (myWindow) {
      if (myWindow.isMinimized()) myWindow.restore()
      myWindow.focus()
    }
  })

  // myWindow を作成したり、アプリの残りをロードしたり、...
  app.on('ready', () => {
  })
}
```

### `app.hasSingleInstanceLock()`

戻り値 `Boolean`

このメソッドはアプリのこのインスタンスが現在シングルインスタンスロックをされているかどうかを返します。 `app.requestSingleInstanceLock()` でロックを要求し、`app.releaseSingleInstanceLock()` で解放できます。

### `app.releaseSingleInstanceLock()`

`requestSingleInstanceLock` によって作成されたすべてのロックを解放します。これで、並列実行するためのアプリケーションの複数インスタンスが再び許可されます。

### `app.setUserActivity(type, userInfo[, webpageURL])` *macOS*

* `type` String - アクティビティを一意に識別します。 [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType) と対応しています。
* `userInfo` any - 別のデバイスで使用するために保存されたアプリ固有の情報。
* `webpageURL` String (任意) - 継続されたデバイスに適切なアプリがインストールされていない場合にブラウザで読み込もうとしたウェブページ。スキームは `http` もしくは `https` でなければなりません。

`NSUserActivity` を作成し、現在のアクティビティとして設定します。 その後、アクティビティは、別のデバイスでの[ハンドオフ](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html)に適用されます。

### `app.getCurrentActivityType()` *macOS*

戻り値 `String` - 現在実行されているアクティビティのタイプ。

### `app.invalidateCurrentActivity()` *macOS*

現在の[ハンドオフ](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html)ユーザアクティビティを無効にします。

### `app.resignCurrentActivity()` *macOS*

現在の [ハンドオフ](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) ユーザーアクティビティを、無効にせずに非アクティブにします。

### `app.updateCurrentActivity(type, userInfo)` *macOS*

* `type` String - アクティビティを一意に識別します。 [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType) と対応しています。
* `userInfo` any - 別のデバイスで使用するために保存されたアプリ固有の情報。

タイプが `type` と一致した場合、現在のアクティビティを更新し、現在の `userInfo` ディスクショナリに `userInfo` のエントリを統合します。

### `app.setAppUserModelId(id)` *Windows*

* `id` String

[アプリケーションユーザモデルID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx)を `id` に変更します。

### `app.importCertificate(options, callback)` *Linux*

* `options` Object 
  * `certificate` String - PACS#12ファイルのパス。
  * `password` String - 証明書のパスフレーズ。
* `callback` Function 
  * `result` Integer - インポート結果。

プラットフォームの証明書ストアにPACS#12形式で証明書をインポートします。 インポート操作の `result` で `callback` が呼び出されます。`0` という値は成功を意味しますが、その他の値はChromium の [net_error_list](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h) の通り、失敗を意味します。

### `app.disableHardwareAcceleration()`

現在のアプリのハードウェアアクセラレーションを無効にします。

このメソッドはアプリが ready になる前だけでしか呼び出すことができません。

### `app.disableDomainBlockingFor3DAPIs()`

既定では、GPUプロセスがあまりに頻繁にクラッシュする場合、ドメイン単位の原則に基づき、再起動するまで、Chromiumは3D API (例えばWebGL) を無効にします。この関数はこの振る舞いを無効にします。

このメソッドはアプリが ready になる前だけでしか呼び出すことができません。

### `app.getAppMetrics()`

戻り値 [`ProcessMetric[]`](structures/process-metric.md): `ProcessMetric` オブジェクトの配列で、アプリに関連付けられたすべてのプロセスのメモリや CPU 使用率の統計情報に対応しています。

### `app.getGPUFeatureStatus()`

戻り値 [`GPUFeatureStatus`](structures/gpu-feature-status.md) - `chrome://gpu/` から取得したグラフィックス機能のステータス。

**注:** この情報は `gpu-info-update` イベントが発行された後にのみ利用できます。

### `app.getGPUInfo(infoType)`

* `infoType` String - `basic` か `complete` にできます。

戻り値 `Promise<unknown>`

`infoType` が `complete` に等しい場合、Promise は [Chromium の GPUInfo オブジェクト](https://chromium.googlesource.com/chromium/src/+/4178e190e9da409b055e5dff469911ec6f6b716f/gpu/config/gpu_info.cc) 内におけるすべてのGPU情報を含んだ `Object` で解決されます。 これには `chrome://gpu` ページ上で表示されるバージョンとドライバ情報が含まれます。

`infoType` が `basic` に等しい場合、Promise は `complete` でのGPU情報より少ない属性を含んだ `Object` で解決されます。 basic の応答の例はこちらです。

```js
{ auxAttributes:
   { amdSwitchable: true,
     canSupportThreadedTextureMailbox: false,
     directComposition: false,
     directRendering: true,
     glResetNotificationStrategy: 0,
     inProcessGpu: true,
     initializationTime: 0,
     jpegDecodeAcceleratorSupported: false,
     optimus: false,
     passthroughCmdDecoder: false,
     sandboxed: false,
     softwareRendering: false,
     supportsOverlays: false,
     videoDecodeAcceleratorFlags: 0 },
gpuDevice:
   [ { active: true, deviceId: 26657, vendorId: 4098 },
     { active: false, deviceId: 3366, vendorId: 32902 } ],
machineModelName: 'MacBookPro',
machineModelVersion: '11.5' }
```

`vendorId` や `driverId` のような基本的な情報だけ必要であれば、`basic` を用いることが好ましいです。

### `app.setBadgeCount(count)` *Linux* *macOS*

* `count` Integer

戻り値 `Boolean` - 呼び出しが成功したかどうか。

現在のアプリのカウンターバッジを設定します。count を `0` に設定すると、バッジを非表示にします。

macOSでは、ドックアイコンに表示されます。Linuxでは、Unityランチャーでしか機能しません。

**注:** Unity ランチャーで機能させるには、`.desktop` ファイルが存在する必要があります。詳細は [デスクトップ環境への統合](../tutorial/desktop-environment-integration.md#unity-launcher) をお読みください。

**[非推奨](modernization/property-updates.md)**

### `app.getBadgeCount()` *Linux* *macOS*

戻り値 `Integer` - カウンターバッジに表示されている現在の値。

**[非推奨](modernization/property-updates.md)**

### `app.isUnityRunning()` *Linux*

戻り値 `Boolean` - 現在のデスクトップ環境がUnityランチャーであるかどうか。

### `app.getLoginItemSettings([options])` *macOS* *Windows*

* `options` Object (任意) 
  * `path` String (任意) *Windows* - 比較する実行ファイルのパス。省略値は、`process.execPath` です。
  * `args` String[] (任意) *Windows* - 比較するコマンドライン引数。省略値は空の配列です。

`app.setLoginItemSettings` に `path` と `args` オプションを指定した場合、`openAtLogin` が正しく設定されるように、ここで同じ引数を引き渡す必要があります。

戻り値 `Object`:

* `openAtLogin` Boolean - アプリがログイン時に開くように設定されている場合、`true`。
* `openAsHidden` Boolean *macOS* - アプリがログイン時に隠して開くように設定されている場合、`true`。 この設定は [MAS ビルド](../tutorial/mac-app-store-submission-guide.md) では利用できません。
* `wasOpenedAtLogin` Boolean *macOS* - アプリがログイン時に自動的に開かれた場合、`true`。 この設定は [MAS ビルド](../tutorial/mac-app-store-submission-guide.md) では利用できません。
* `wasOpenedAsHidden` Boolean *macOS* - アプリが非表示のログイン項目として開かれていた場合、`true`。 これは、アプリが起動時に何もウインドウを開いてはいけないことを示します。 この設定は [MAS ビルド](../tutorial/mac-app-store-submission-guide.md) では利用できません。
* `restoreState` Boolean *macOS* - 以前のセッションから状態を復元する必要があるログイン項目としてアプリを開いた場合は、`true`。 アプリが最後に閉じたとき開いていたウインドウをアプリが復元する必要があることを示します。 この設定は [MAS ビルド](../tutorial/mac-app-store-submission-guide.md) では利用できません。

### `app.setLoginItemSettings(settings)` *macOS* *Windows*

* `settings` Object 
  * `openAtLogin` Boolean (任意) - アプリをログイン時に開く場合、`true`、ログイン項目からアプリを外す場合、`false`。 省略値は `false` です。
  * `openAsHidden` Boolean (任意) *macOS* - アプリを非表示で開く場合、`true`。 省略値は `false` です。 ユーザはこの設定をシステム環境設定から変更することができるので、現在の値を取得するために `app.getLoginItemSettings().wasOpenedAsHidden` をアプリが開かれたときに確認するようにしてください。 この設定は [MAS ビルド](../tutorial/mac-app-store-submission-guide.md) では利用できません。
  * `path` String (任意) *Windows* - ログイン時に起動する実行ファイルのパス。省略値は、`process.execPath` です。
  * `args` String[] (任意) *Windows* - 実行ファイルに引き渡すコマンドライン引数。省略値は空の配列です。パスは引用符で囲むように注意してください。

アプリのログイン項目設定を設定します。

WindowsでElectronの `autoUpdater` を [Squirrel](https://github.com/Squirrel/Squirrel.Windows) を使って動かす場合、起動パスをUpdate.exeに設定し、アプリケーション名を特定する引数を渡してください。 例:

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

### `app.isAccessibilitySupportEnabled()` *macOS* *Windows*

戻り値 `Boolean` - Chromeのユーザ補助機能が有効な場合、`true`、そうでない場合、`false`。 このAPIは、スクリーンリーダーなどの支援技術を使っていることが検出された場合、`true` を返します。 詳細については、https://www.chromium.org/developers/design-documents/accessibility を参照してください。

**[非推奨](modernization/property-updates.md)**

### `app.setAccessibilitySupportEnabled(enabled)` *macOS* *Windows*

* `enabled` Boolean - [アクセシビリティツリー](https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/the-accessibility-tree)レンダリングを有効もしくは無効にします。

手動でChromeのユーザ補助機能を有効にすると、アプリケーションの設定でユーザにアクセシビリティスイッチを出すことができます。 詳細については [Chromium のアクセシビリティドキュメント](https://www.chromium.org/developers/design-documents/accessibility) を参照してください。 既定では無効です。

この API は `ready` イベントが発生した後で呼ばなければいけません。

**注:** アクセシビリティツリーをレンダリングすると、アプリのパフォーマンスに顕著な影響を与える可能性があります。既定で有効にすべきではありません。

**[非推奨](modernization/property-updates.md)**

### `app.showAboutPanel()` *macOS* *Linux*

アプリのパネルオプションを示します。このオプションは `app.setAboutPanelOptions(options)`で上書きできます。

### `app.setAboutPanelOptions(options)` *macOS* *Linux*

* `options` Object 
  * `applicationName` String (任意) - アプリの名前。
  * `applicationVersion` String (任意) - アプリのバージョン。
  * `copyright` String (任意) - 著作権情報。
  * `version` String (任意) *macOS* - アプリのビルドバージョン番号。
  * `credits` String (任意) *macOS* - クレジット情報。
  * `authors` String[] (任意) *Linux* - アプリの作者のリスト。
  * `website` String (任意) *Linux* - アプリのウェブサイト。
  * `iconPath` String (任意) *Linux* - アプリのアイコンへのパス。縦横比を維持しつつ、64x64 ピクセルとして表示されます。

Aboutパネルのオプションを設定します。 これは macOSの場合、アプリの `.plist` ファイルで定義された値を上書きします。 詳細については、[Apple社のドキュメント](https://developer.apple.com/reference/appkit/nsapplication/1428479-orderfrontstandardaboutpanelwith?language=objc) を参照してください。 Linuxの場合、表示するために値をセットしなければなりません。デフォルトの値はありません。

### `app.isEmojiPanelSupported()`

戻り値 `Boolean` - 現在の OS バージョンがネイティブの絵文字ピッカーを許可しているかどうか。

### `app.showEmojiPanel()` *macOS* *Windows*

プラットフォームのネイティブの絵文字ピッカーを表示します。

### `app.startAccessingSecurityScopedResource(bookmarkData)` *mas*

* `bookmarkData` String - `dialog.showOpenDialog` または `dialog.showSaveDialog` メソッドによって返された、base64 でエンコードされたセキュリティスコープのブックマークデータ。

戻り値 `Function` - セキュリティスコープ付きファイルへのアクセスが終了すると、この関数を呼び出す**必要が**あります。 ブックマークへのアクセスを忘れた場合は、[カーネルリソースがリークします](https://developer.apple.com/reference/foundation/nsurl/1417051-startaccessingsecurityscopedreso?language=objc)。アプリが再起動されるまで、サンドボックスの外部にアクセスする権限は失われます。

```js
// ファイルアクセス開始
const stopAccessingSecurityScopedResource = app.startAccessingSecurityScopedResource(data)
// You can now access the file outside of the sandbox 
stopAccessingSecurityScopedResource()
```

セキュリティスコープ付きリソースへのアクセスを開始します。 このメソッドでは、Mac App Store 用にパッケージ化された Electron アプリケーションが、ユーザーが選択したファイルにアクセスするためにサンドボックスの外部にアクセスすることがあります。 このシステムの動作の詳細は、[Apple のドキュメント](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) を参照してください。

### `app.enableSandbox()` *実験的*

アプリで完全サンドボックスモードを有効にします。

このメソッドはアプリが ready になる前だけでしか呼び出すことができません。

### `app.isInApplicationsFolder()` *macOS*

戻り値 `Boolean` - アプリケーションが現在、システムのアプリケーションフォルダから実行されているかどうか。`app.moveToApplicationsFolder()` と組み合わせて使ってください。

### `app.moveToApplicationsFolder([options])` *macOS*

* `options` Object (任意) 
  * `conflictHandler` Function<boolean> (任意) - 移動に失敗したときの潜在的競合のハンドラ。 
    * `conflictType` String - ハンドラーが遭遇した移動で起こった競合の種類。`exists` か `existsAndRunning` になります。`exists` は同じ名前のアプリがアプリケーションディレクトリに存在し、`existsAndRunning` は存在し且つ現在実行されていることを意味します。

戻り値 `Boolean` - 移動が成功したかどうか。 移動が成功した場合、アプリケーションは終了し、再起動されることに注意してください。

既定では、確認ダイアログは表示されません。ユーザに操作の確認をさせたい場合は、[`dialog`](dialog.md) APIを使うと実現できます。

**注:** このメソッドはユーザ以外が移動の失敗を引き起こした場合にもエラーをスローします。 例えば、ユーザが承認ダイアログをキャンセルした場合、このメソッドは false を返します。 コピーの実行に失敗した場合、このメソッドはエラーをスローします。 エラーのメッセージは意味の分かるものにする必要があり、何が間違っているのかを正確に知らせるようにしてください。

既定では、移動するアプリと同じ名前のアプリがアプリケーションディレクトリに存在し *実行されていない* 場合、既存のアプリはゴミ箱に移動され、新たなアプリがその場所に移動します。 *実行されている* 場合、既存の実行中のアプリはフォーカスを引き継ぎ、新たなアプリは自動的に終了します。 この挙動は、オプションの競合ハンドラを提供することで変更できます。この場合、ハンドラによって返されるブール値によって、移動の競合がデフォルトの動作で解決されるかどうかを決定します。 つまり、`false` を返すとそれ以上のアクションは行われなくなります。`true` を返すとデフォルトの動作になり、メソッドが続行されます。

例:

```js
app.moveToApplicationsFolder({
  conflictHandler: (conflictType) => {
    if (conflictType === 'exists') {
      return dialog.showMessageBoxSync({
        type: 'question',
        buttons: ['移動を中止', '移動を続行'],
        defaultId: 0,
        message: 'この名前のアプリはすでに存在します'
      }) === 1
    }
  }
})
```

そのユーザーディレクトリにアプリが既に存在する場合、ユーザーが '移動を続行' を選択すると、関数は既定の動作を続行し、既存のアプリは破棄され、新たなアプリはその場所に移動します。

## プロパティ

### `app.accessibilitySupportEnabled` *macOS* *Windows*

この `Boolean` プロパティは、Chrome のアクセシビリティサポートが有効になっている場合は `true`、それ以外の場合は `false` になります。 このプロパティは、テキスト読み上げなどのアシスト技術を使っていることが検出された場合、`true` を返します。 手動でこのプロパティを `true` にセットして Chrome のアクセシビリティサポートを有効にすると、開発者はアプリケーション設定内でユーザにアクセシビリティスイッチを出すことができます。

詳細については [Chromium のアクセシビリティドキュメント](https://www.chromium.org/developers/design-documents/accessibility) を参照してください。これはデフォルトで無効化されています。

この API は `ready` イベントが発生した後で呼ばなければいけません。

**注:** アクセシビリティツリーをレンダリングすると、アプリのパフォーマンスに顕著な影響を与える可能性があります。既定で有効にすべきではありません。

### `app.applicationMenu`

`Menu | null` 型のプロパティです。セットされている場合は [`Menu`](menu.md) を、それ以外は `null` を返します。 ユーザはこのプロパティに [Menu](menu.md) を渡すことができます。

### `app.badgeCount` *Linux* *macOS*

`Integer` 型のプロパティです。現在のアプリのバッジ数を返します。カウントを `0` にセットするとバッジを非表示にします。

macOS でこれをゼロ以外の整数で設定すると、Dock アイコンに表示されます。 Linux でのこのプロパティは Unity ランチャーでのみ機能します。

**注:** Unity ランチャーで機能させるには、`.desktop` ファイルが存在する必要があります。詳細は [デスクトップ環境への統合](../tutorial/desktop-environment-integration.md#unity-launcher) をお読みください。

### `app.commandLine` *読み出し専用*

[`CommandLine`](./command-line.md) オブジェクトです。Chromium が使用するコマンドライン引数の読み取りと操作ができます。

### `app.dock` *macOS* *読み出し専用*

[`Dock`](./dock.md) オブジェクトです。macOS のユーザーの Dock 内のアプリアイコンにおけるアクションを実行できます。

### `app.isPackaged` *読み出し専用*

アプリがパッケージされている場合は`true`、それ以外は `false` を返す `Boolean` プロパティ。 多くのアプリケーションでは、このプロパティを用いて開発版の環境と製品版の環境を区別できます。

### `app.name`

`String` 型のプロパティです。現在のアプリケーション名を示します。アプリケーションの `package.json` ファイル内にある名前になります。

通常、`package.json` の `name` フィールドは、npm のモジュール仕様に基づいて小文字だけの短い名前が設定されます。 通常、すべて大文字で始まるアプリケーションの名前となる `productName` フィールドも指定してください。Electronによって、`name` よりも優先されます。

### `app.userAgentFallback`

この `String` は Electron がグローバルフォールバックとして使用するユーザーエージェント文字列です。

これは、`webContents` または `session` レベルでユーザーエージェントが設定されていない場合に使用されるユーザーエージェントです。 アプリ全体が同じユーザーエージェントを持っていることを確認するのに役立ちます。 オーバーライドされた値が確実に使用されるように、アプリの初期化のできるだけ早い段階でカスタム値に設定してください。

### `app.allowRendererProcessReuse`

この `Boolean` が `true` のとき、ナビゲーションごとにレンダラープロセスが確実に再起動されるように Electron が設定している、そのオーバーライドを無効にします。 このプロパティの現在の既定値は `false` です。

これらのオーバーライドがデフォルトで無効になることを意図しているので、将来的にはこのプロパティは削除される予定です。 このプロパティはレンダラープロセス内で使用できるネイティブモジュールに影響します。 Electron がレンダラープロセスを再起動して、レンダラープロセスでネイティブモジュールを使用する方針についての詳細は、この [Tacking Issue](https://github.com/electron/electron/issues/18397) をご覧ください。