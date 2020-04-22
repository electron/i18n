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

戻り値：

* `launchInfo` Object _macOS_

Electronが初期化処理を完了したときに発生します。 macOS では、通知センターから起動された場合、`launchInfo` はアプリケーションを開くのに使用された `NSUserNotification` の `userInfo` を保持しています。 `app.isReady()` を呼び出すことで、このイベントが既に発生しているかを確認することができます。

### イベント: 'window-all-closed'

すべてのウィンドウが閉じられたときに発生します。

このイベントを購読せずに全てのウインドウを閉じた場合、既定の動作としてアプリは終了します。しかし、このイベントを購読している場合は、アプリを終了するかどうかを制御することができます。 ユーザが `Cmd + Q` を押下したり、開発者が `app.quit()` を呼び出したりした場合では、Electron はまず全てのウインドウを閉じようとして、その後に `will-quit` イベントを発生させます。しかし、この場合は `window-all-closed` イベントは発生しません。

### イベント: 'before-quit'

戻り値:

* `event` Event

アプリケーションがウィンドウを閉じ始める前に発生します。 `event.preventDefault()` を呼び出すことで、アプリケーションが終了する既定の動作を阻害できます。

**注:** アプリケーションの終了が `autoUpdater.quitAndInstall()` によって開始された場合、全てのウインドウで `close` イベントを発生させ、それらが閉じた*後* に `before-quit` が発生します。

**注釈:** Windows では、このイベントはシステムのシャットダウン/再起動やユーザーのログアウトでアプリケーションが閉じられようとしている場合には発生しません。

### イベント: 'will-quit'

戻り値:

* `event` Event

すべてのウィンドウが閉じられ、アプリが終了しようとしているときに発生します。 `event.preventDefault()` を呼び出すことで、アプリケーションが終了する既定の動作を阻害できます。

`will-quit` と `window-all-closed` イベントの差異を確認するためには、`window-all-closed` イベントの説明もお読みください。

**注釈:** Windows では、このイベントはシステムのシャットダウン/再起動やユーザーのログアウトでアプリケーションが閉じられようとしている場合には発生しません。

### イベント: 'quit'

戻り値:

* `event` Event
* `exitCode` Integer

アプリケーションが終了するときに発生します。

**注釈:** Windows では、このイベントはシステムのシャットダウン/再起動やユーザーのログアウトでアプリケーションが閉じられようとしている場合には発生しません。

### イベント: 'open-file' _macOS_

戻り値:

* `event` Event
* `path` String

ユーザがアプリケーションでファイルを開こうとしたときに発生します。 `open-file` イベントは、大抵の場合ファイルをアプリケーションが既に開いていて、OS が開くために再利用しようとしたときに発生します。 `open-file` は、Dock にファイルがドロップされて、アプリケーションがまだ起動していないときにも発生します。 このようなケースに対処するために、アプリケーション起動時の非常に早い段階 ( `ready` イベントが発生するよりも前) で `open-file` イベントを監視するようにしてください。

このイベントを処理する場合、`event.preventDefault()` を呼び出す必要があります。

Windows では、ファイルパスを取得するために (メインプロセスの) `process.argv` をパースしなければなりません。

### イベント: 'open-url' _macOS_

戻り値:

* `event` Event
* `url` String

ユーザがこのアプリケーションで URL を開こうとしたときに発生します。 アプリケーションの `Info.plist` ファイルで `CFBundleURLTypes` キーの中にURLスキームを定義し、`NSPrincipalClass` に `AtomApplication` を設定しなければなりません。

このイベントを処理する場合、`event.preventDefault()` を呼び出す必要があります。

### イベント: 'activate' _macOS_

戻り値:

* `event` Event
* `hasVisibleWindows` Boolean

アプリケーションがアクティブになったときに発生します。 アプリケーションが最初に起動される、既に実行中のときにアプリケーションを再起動しようとする、アプリケーションの Dock やタスクバーのアイコンをクリックするなど、いろいろなアクションがこのイベントの引き金となり得ます。

### イベント: 'continue-activity' _macOS_

戻り値:

* `event` Event
* `type` String - アクティビティを識別する文字列。 [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType) と対応しています。
* `userInfo` Object - 別のデバイスのアクティビティによって保存されたアプリ固有の情報が含まれています。

[ハンドオフ](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) 中に別のデバイスからのアクティビティを継続しようとしたときに発生します。 このイベントを処理する場合、`event.preventDefault()` を呼び出す必要があります。

ユーザのアクティビティはアクティビティ元のアプリと同一の開発者チームIDを持ち、アクティビティタイプをサポートするアプリでしか継続させることができません。 サポートされるアクティビティタイプは、アプリの `Info.plist` の `NSUserActivityTypes` キーで指定されています。

### イベント: 'will-continue-activity' _macOS_

戻り値:

* `event` Event
* `type` String - アクティビティを識別する文字列。 [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType) と対応しています。

[ハンドオフ](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) 中に別のデバイスからのアクティビティを継続しようとする前に発生します。 このイベントを処理する場合、`event.preventDefault()` を呼び出す必要があります。

### イベント: 'continue-activity-error' _macOS_

戻り値:

* `event` Event
* `type` String - アクティビティを識別する文字列。 [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType) と対応しています。
* `error` String - エラーのローカライズされた説明としての文字列。

[ハンドオフ](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) 中に別のデバイスからのアクティビティを継続できなかったときに発生します。

### イベント: 'activity-was-continued' _macOS_

戻り値:

* `event` Event
* `type` String - アクティビティを識別する文字列。 [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType) と対応しています。
* `userInfo` Object - アクティビティによって保存されたアプリ固有の情報が含まれています。

[ハンドオフ](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) 中にこのデバイスからのアクティビティを他のデバイスで継続させることに成功した後で発生します。

### イベント: 'update-activity-state' _macOS_

戻り値:

* `event` Event
* `type` String - アクティビティを識別する文字列。 [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType) と対応しています。
* `userInfo` Object - アクティビティによって保存されたアプリ固有の情報が含まれています。

[ハンドオフ](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) が別のデバイスでまさに継続されようとしているときに発生します。 送信される情報を更新する必要がある場合、`event.preventDefault()` をすぐに呼び出してください。そして、新しい `userInfo` ディクショナリを組み立てて、`app.updateCurrentActivity()` をタイミングよく呼び出してください。 さもなくば操作は失敗し、`continue-activity-error` が呼び出されます。

### イベント: 'new-window-for-tab' _macOS_

戻り値:

* `event` Event

ユーザーが macOS ネイティブの新規タブボタンをクリックすると発生します。 新規タブボタンは現在の `BrowserWindow` に `tabbingIdentifier` が設定されている場合にだけ表示されます。

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

`webContents` が Basic 認証を要求すると発生します。

既定の動作では、全てに認証をキャンセルします。 これを変更するには、`event.preventDefault()` で既定の動作をキャンセルして、資格情報と共に `callback(username, password)` を呼び出すようにしてください。

```javascript
const { app } = require('electron')

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

### イベント: 'renderer-process-crashed'

戻り値:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `killed` Boolean

`webContents` のレンダラープロセスがクラッシュ、または強制終了されたときに発行されます。

### イベント: 'accessibility-support-changed' _macOS_ _Windows_

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

`webContents` のレンダラープロセス内で `desktopCapture.getSources()` が呼ばれたときに発生します。 `event.preventDefault()` を呼び出すと、空のソースを返します。

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

`exitCode` ですぐに終了します。 `exitCode` の省略値は 0 です。

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

Linux では、最初の表示ウィンドウにフォーカスします。 macOS ではアプリケーションをアクティブなアプリにします。Windows では、アプリケーションの最初のウインドウにフォーカスを当てます。

### `app.hide()` _macOS_

最小化することなくアプリケーションのすべてのウインドウを非表示にします。

### `app.show()` _macOS_

非表示にされたアプリケーションのウインドウを表示します。 自動的にフォーカスしません。

### `app.setAppLogsPath(path)`

* `path` String (任意) - ログのカスタムパス。 絶対パスでなければなりません。

アプリがロギングするディレクトリを設定または作成します。これは `app.getPath()` や `app.setPath(pathName, newPath)` で操作できます。

`path` 引数なしで `app.setAppLogsPath()` を呼び出すと、このディレクトリは、_macOS_ では `/Library/Logs/アプリ名` に、_Linux_ と _Windows_ では `userData` ディレクトリ内に設定されます。

### `app.getAppPath()`

戻り値 `String` - 現在のアプリケーションのディレクトリ。

### `app.getPath(name)`

* `name` String

戻り値 `String` - `name` に関連付けられた特別なディレクトリもしくはファイルのパス。 失敗した場合、`Error` が送出されます。

以下のパスを名前で要求することができます。

* `home` ユーザのホームディレクトリ。
* `appData` - 既定のユーザ毎のアプリケーションデータディレクトリ。
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
    * `large` - _Linux_ の場合は 48x48、_Windows_の場合は 32x32、_macOS_ の場合はサポートされていません。
* `callback` Function
  * `error` Error
  * `icon` [NativeImage](native-image.md)

パスに関連付けられているアイコンを取得します。

_Windows_ の場合、2 種類のアイコンがあります。

* `.mp3`、`.png` など、特定のファイル拡張子に関連付けられたアイコン。
* `.exe`、`.dll`、`.ico` のような、ファイル自体に含まれるアイコン。

_Linux_ と _macOS_ の場合、アイコンはファイルのMIMEタイプに関連付けられたアプリケーションによって決まります。

**[非推奨予定](modernization/promisification.md)**

### `app.getFileIcon(path[, options])`

* `path` String
* `options` Object (任意)
  * `size` String
    * `small` - 16x16
    * `normal` - 32x32
    * `large` - _Linux_ の場合は 48x48、_Windows_の場合は 32x32、_macOS_ の場合はサポートされていません。

`Promise<NativeImage>`を返す - [NativeImage](native-image.md)でアプリのアイコンを埋めます。

パスに関連付けられているアイコンを取得します。

_Windows_ の場合、2種類のアイコンがあります。

* `.mp3`、`.png` など、特定のファイル拡張子に関連付けられたアイコン。
* `.exe`、`.dll`、`.ico` のような、ファイル自体に含まれるアイコン。

_Linux_ と _macOS_ の場合、アイコンはファイルのMIMEタイプに関連付けられたアプリケーションによって決まります。

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

通常、`package.json` の `name` フィールドは、npmのモジュール仕様に基づき、小文字だけの短い名前が設定されます。 通常、すべて大文字で始まるアプリケーションの名前となる `productName` フィールドも指定してください。Electronによって、`name` よりも優先されます。

### `app.setName(name)`

* `name` String

現在のアプリケーションの名前を上書きします。

### `app.getLocale()`

戻り値 `String` - 現在のアプリケーションのロケール。 取りうる戻り値については [こちら](locales.md) にドキュメントがあります。

ロケールを設定するには、アプリケーションの起動時にコマンドラインスイッチを使用する必要があります。これについては、[こちら](https://github.com/electron/electron/blob/master/docs/api/chrome-command-line-switches.md) を参照してください。

**注:** アプリをパッケージ化して配布する場合、`locales` フォルダを同梱する必要があります。

**Note:**Windows の `準備ができて` のイベントが出力される後を呼び出すことがあります。

### `app.getLocaleCountryCode()`

戻り値 `string` - 2 文字の [ISO 3166](https://www.iso.org/iso-3166-country-codes.html) 国名コードで、ユーザーの OS のロケールを示します。 この値はネイティブの OS API から取得します。

**注意:** ロケールの国コードを取得できなかった場合、これは空文字列を返します。

### `app.addRecentDocument(path)` _macOS_ _Windows_

* `path` String

`path` を最近使ったドキュメントのリストに追加します。

このリストは OS が管理します。 Windows の場合はタスクバーからリストにアクセスでき、macOS の場合は Dock メニューからリストにアクセスできます。

### `app.clearRecentDocuments()` _macOS_ _Windows_

最近使ったドキュメントのリストをクリアします。

### `app.setAsDefaultProtocolClient(protocol[, path, args])`

* `protocol` String - `://` を除くプロトコルの名前。 アプリで `electron://` リンクを処理したい場合、パラメータとして `electron` を指定してこのメソッドを呼び出してください。
* `path` String (任意) _Windows_ - 省略値は `process.execPath`
* `args` String[] (任意) _Windows_ - 省略値は空の配列

戻り値 `Boolean` - 呼び出しが成功したかどうか。

このメソッドは現在の実行可能ファイルをプロトコル (別名URIスキーム) の既定のハンドラーとして設定します。 これにより、アプリをオペレーティングシステムと密接に統合することができます。 一度登録すると、`your-protocol://` によるすべてのリンクは現在の実行可能ファイルで開かれるようになります。 プロトコルを含む全体のリンクがパラメータとしてアプリケーションに引き渡されます。

Windowsの場合、オプションのパラメータを指定することができます。path には実行可能ファイルへのパス、args には実行可能ファイルが起動する際に引き渡される引数の配列を指定してください。

**注:** macOSの場合、アプリの `info.plist` に追加されているプロトコルしか登録できず、実行時に変更することもできません。 しかしながら、単純なテキストエディタもしくはスクリプトでビルド時にファイルを変更することができます。 詳細は [Apple社のドキュメント](https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html#//apple_ref/doc/uid/TP40009249-102207-TPXREF115) を参照するようにしてください。

**注釈:** Windows ストア 環境 (`appx` としてパッケージされている) 場合、この API はすべての呼び出しに `true` を返しますが、それにセットされたレジストリキーは他のアプリケーションからアクセスできません。  Windows ストア アプリケーションをデフォルトのプロトコルハンドラとして登録するには、[マニフェストでプロトコルを宣言する](https://docs.microsoft.com/en-us/uwp/schemas/appxpackage/uapmanifestschema/element-uap-protocol) 必要があります。

このAPIは内部的にWindowsのレジストリやLSSetDefaultHandlerForURLSchemeを使用します。

### `app.removeAsDefaultProtocolClient(protocol[, path, args])` _macOS_ _Windows_

* `protocol` String - `://` を除くプロトコルの名前。
* `path` String (任意) _Windows_ - 省略値は `process.execPath`
* `args` String[] (任意) _Windows_ - 省略値は空の配列

戻り値 `Boolean` - 呼び出しが成功したかどうか。

このメソッドは、現在の実行ファイルがプロトコル (または URI スキーム) のデフォルトハンドラであるかどうかをチェックします。 その場合、既定のハンドラーからアプリを削除します。

### `app.isDefaultProtocolClient(protocol[, path, args])`

* `protocol` String - `://` を除くプロトコルの名前。
* `path` String (任意) _Windows_ - 省略値は `process.execPath`
* `args` String[] (任意) _Windows_ - 省略値は空の配列

戻り値 `Boolean`

このメソッドは、現在の実行ファイルがプロトコル (または URI スキーム) のデフォルトハンドラであるかどうかをチェックします。 その場合、true を返します。 そうでなければ、false を返します。

**注:** macOSの場合、このメソッドは、アプリがプロトコルの既定のハンドラーとして登録されていたかをチェックするのに使えます。 macOSのマシン上の `~/Library/Preferences/com.apple.LaunchServices.plist` を確認することでもこれを検証することができます。 詳細は [Apple社のドキュメント](https://developer.apple.com/library/mac/documentation/Carbon/Reference/LaunchServicesReference/#//apple_ref/c/func/LSCopyDefaultHandlerForURLScheme) を参照するようにしてください。

このAPIは内部的にWindowsのレジストリやLSCopyDefaultHandlerForURLSchemeを使用します。

### `app.setUserTasks(tasks)` _Windows_

* `tasks` [Task[]](structures/task.md) - `Task`オブジェクトの配列

Windowsでジャンプリストの [タスク](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378460(v=vs.85).aspx#tasks) カテゴリに `tasks` を追加します。

`tasks` は [`Task`](structures/task.md) オブジェクトの配列です。

戻り値 `Boolean` - 呼び出しが成功したかどうか。

**注:** ジャンプリストをもっとカスタマイズしたい場合は、`app.setJumpList(categories)` を代わりに使用してください。

### `app.getJumpListSettings()` _Windows_

戻り値 `Object`:

* `minItems` Integer - ジャンプリストに表示されるアイテムの最小の数 (この値の詳細な説明は [MSDN ドキュメント](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378398(v=vs.85).aspx) を参照してください) 。
* `removedItems` [JumpListItem[]](structures/jump-list-item.md) - ユーザがジャンプリストのカスタムカテゴリから明示的に削除したアイテムに対応した `JumpListItem` オブジェクトの配列。 これらのアイテムを**直後の** `app.setJumpList()` の呼び出しでジャンプリストに再度追加してはいけません。Windowsは削除されたアイテムを含むいかなるカスタムカテゴリも表示することはできません。

### `app.setJumpList(categories)` _Windows_

* `categories` [JumpListCategory[]](structures/jump-list-category.md) または `null` - `JumpListCategory` オブジェクトの配列。

アプリケーションのカスタムジャンプリストを設定もしくは削除し、以下の文字列のいずれかを返します。

* `ok` - 正常。
* `error` - 1つ以上のエラーが発生しました。何が原因かを把握するためには、実行時ログを有効にします。
* `invalidSeparatorError` - ジャンプリストのカスタムカテゴリに区切りを追加しようとしました。 区切りは標準の `タスク` カテゴリでしか使用できません。
* `fileTypeRegistrationError` - アプリが処理できると登録されていないファイルタイプのファイルリンクをジャンプリストに追加しようとしました。
* `customCategoryAccessDeniedError` - ユーザープライバシーもしくはグループポリシー設定のため、ジャンプリストにカスタムカテゴリを追加できません。

`categories` が `null` の場合、その前に設定されていたカスタムジャンプリスト (あれば) は、(Windowsによって管理される) アプリ標準のジャンプリストに置換されます。

**注:** `JumpListCategory` オブジェクトに `type` プロパティも `name` プロパティも設定されなかった場合、`type` は `tasks` と見做されます。 `name` プロパティは設定されている一方で `type` プロパティが省略された場合、`type` は `custom` と見做されます。

**注:** ユーザはカスタムカテゴリからアイテムを削除できますが、Windows では次の `app.setJumpList(categories)` の呼び出しが成功した **後** でないと、削除されたアイテムをカスタムカテゴリに追加し直すことができません。 それより早くカスタムカテゴリに削除されたアイテムを再度追加しようとすると、ジャンプリストからカスタムカテゴリ全体が外れてしまいます。 削除されたアイテムのリストは、`app.getJumpListSettings()` を使って取得できます。

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

このメソッドの戻り値は、アプリケーションのこのインスタンスのロックが成功したかどうかを表します。  ロック状態にできなかった場合、アプリケーションの他のインスタンスが既にロックされており、ただちに終了すると想定できます。

またこのメソッドは、プロセスがアプリケーションの1つ目のインスタンスで、アプリがロード処理を続行する必要がある場合も `false` を返します。  既にロック状態にしたものとは別のインスタンスにパラメータを送信したためプロセスが直ちに終了する必要がある場合は、`false` を返します。

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

このメソッドはアプリのこのインスタンスが現在シングルインスタンスロックをされているかどうかを返します。  `app.requestSingleInstanceLock()` でロックを要求し、`app.releaseSingleInstanceLock()` で解放できます。

### `app.releaseSingleInstanceLock()`

`requestSingleInstanceLock` によって作成されたすべてのロックを解放します。 これにより、並列実行するための複数インスタンスのアプリケーションが再び許可されます。

### `app.setUserActivity(type, userInfo[, webpageURL])` _macOS_

* `type` String - アクティビティを一意に識別します。 [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType) と対応しています。
* `userInfo` Object - 別のデバイスで使用するために保存されたアプリ固有の情報。
* `webpageURL` String (任意) - 継続されたデバイスに適切なアプリがインストールされていない場合にブラウザで読み込もうとしたウェブページ。 スキームは `http` もしくは `https` でなければなりません。

`NSUserActivity` を作成し、現在のアクティビティとして設定します。 その後、アクティビティは、別のデバイスでの[ハンドオフ](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html)に適用されます。

### `app.getCurrentActivityType()` _macOS_

戻り値 `String` - 現在実行されているアクティビティのタイプ。

### `app.invalidateCurrentActivity()` _macOS_

* `type` String - アクティビティを一意に識別します。 [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType) と対応しています。

現在の[ハンドオフ](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html)ユーザアクティビティを無効にします。

### `app.updateCurrentActivity(type, userInfo)` _macOS_

* `type` String - アクティビティを一意に識別します。 [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType) と対応しています。
* `userInfo` Object - 別のデバイスで使用するために保存されたアプリ固有の情報。

タイプが `type` と一致した場合、現在のアクティビティを更新し、現在の `userInfo` ディスクショナリに `userInfo` のエントリを統合します。

### `app.setAppUserModelId(id)` _Windows_

* `id` String

[アプリケーションユーザモデルID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx)を `id` に変更します。

### `app.importCertificate(options, callback)` _LINUX_

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

既定では、GPU プロセスがあまりに頻繁にクラッシュする場合、ドメイン単位の原則に基づき、再起動するまで Chromium は 3D API (例えばWebGL) を無効にします。 この関数はこの振る舞いを無効にします。

このメソッドはアプリが ready になる前だけでしか呼び出すことができません。

### `app.getAppMetrics()`

戻り値 [`ProcessMetric[]`](structures/process-metric.md): アプリに関連付けられたすべてのプロセスのメモリやCPU使用率の統計情報に対応した `ProcessMetric` オブジェクトの配列。

### `app.getGPUFeatureStatus()`

戻り値 [`GPUFeatureStatus`](structures/gpu-feature-status.md) - `chrome://gpu/` から取得したグラフィックス機能のステータス。

### `app.getGPUInfo(infoType)`

* `infoType` String - 基本的な情報のための `basic` か完全な情報のための `complete` のどちらかにできます。

戻り値 `Promise`

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

### `app.setBadgeCount(count)` _Linux_ _macOS_

* `count` Integer

戻り値 `Boolean` - 呼び出しが成功したかどうか。

現在のアプリのカウンターバッジを設定します。count を `0` に設定すると、バッジを非表示にします。

macOS では Dock アイコンに表示されます。 Linux では Unity ランチャーでのみ動作します。

**注:** Unity ランチャーで動作させるには `.desktop` ファイルが存在する必要があります。詳細は [デスクトップ環境への統合](../tutorial/desktop-environment-integration.md#unity-launcher) を読んでください。

### `app.getBadgeCount()` _Linux_ _macOS_

戻り値 `Integer` - カウンターバッジに表示されている現在の値。

### `app.isUnityRunning()` _Linux_

戻り値 `Boolean` - 現在のデスクトップ環境がUnityランチャーであるかどうか。

### `app.getLoginItemSettings([options])` _macOS_ _Windows_

* `options` Object (任意)
  * `path` String (任意) _Windows_ - 比較対象となる実行パス。 省略値は `process.execPath` です。
  * `args` String[] (任意) _Windows_ - 比較するコマンドライン引数。 省略値は空の配列です。

`app.setLoginItemSettings` に `path` と `args` オプションを指定した場合、`openAtLogin` が正しく設定されるように、ここで同じ引数を引き渡す必要があります。

戻り値 `Object`:

* `openAtLogin` Boolean - アプリがログイン時に開くように設定されている場合、`true`。
* `openAsHidden` Boolean _macOS_ - アプリがログイン時に隠して開くように設定されている場合 `true` です。 この設定は [MAS ビルド](../tutorial/mac-app-store-submission-guide.md) では利用できません。
* `wasOpenedAtLogin` Boolean _macOS_ - アプリがログイン時に自動的に開かれた場合 `true` です。 この設定は [MAS ビルド](../tutorial/mac-app-store-submission-guide.md) では利用できません。
* `wasOpenedAsHidden` Boolean _macOS_ - アプリが非表示のログイン項目として開かれていた場合 `true` です。 これは、アプリが起動時に何もウインドウを開いてはいけないことを示します。 この設定は [MAS ビルド](../tutorial/mac-app-store-submission-guide.md) では利用できません。
* `restoreState` Boolean _macOS_ - 以前のセッションから状態を復元する必要があるログイン項目としてアプリを開いた場合 `true` です。 アプリが最後に閉じたとき開いていたウインドウをアプリが復元する必要があることを示します。 この設定は [MAS ビルド](../tutorial/mac-app-store-submission-guide.md) では利用できません。

### `app.setLoginItemSettings(settings)` _macOS_ _Windows_

* `settings` Object
  * `openAtLogin` Boolean (任意) - アプリをログイン時に開く場合は `true`、ログイン項目からアプリを外す場合は `false` にします。 省略値は `false` 。
  * `openAsHidden` Boolean (任意) _macOS_ - アプリを非表示で開く場合 `true` にします。 省略値は `false` です。 ユーザはこの設定をシステム環境設定から変更することができるので、現在の値を取得するために `app.getLoginItemSettings().wasOpenedAsHidden` をアプリが開かれたときに確認するようにしてください。 この設定は [MAS ビルド](../tutorial/mac-app-store-submission-guide.md) では利用できません。
  * `path` String (任意) _Windows_ - ログイン時に起動する実行形式。 省略値は `process.execPath` です。
  * `args` String[] (任意) _Windows_ - 実行ファイルに渡すコマンドライン引数。 省略値は空の配列です。 パスはテンプレート文字列にするようにしましょう。

アプリのログイン項目設定を設定します。

WindowsでElectronの `autoUpdater` を [Squirrel](https://github.com/Squirrel/Squirrel.Windows) を使って動かす場合、起動パスをUpdate.exeに設定し、アプリケーション名を特定する引数を渡してください。 例:

``` javascript
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

### `app.isAccessibilitySupportEnabled()` _macOS_ _Windows_

戻り値 `Boolean` - Chromeのユーザ補助機能が有効な場合、`true`、そうでない場合、`false`。 このAPIは、スクリーンリーダーなどの支援技術を使っていることが検出された場合、`true` を返します。 詳細については、https://www.chromium.org/developers/design-documents/accessibility を参照してください。

**[非推奨予定](modernization/property-updates.md)**

### `app.setAccessibilitySupportEnabled(enabled)` _macOS_ _Windows_

* `enabled` Boolean - [アクセシビリティツリー](https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/the-accessibility-tree)レンダリングを有効もしくは無効にします。

手動でChromeのユーザ補助機能を有効にすると、アプリケーションの設定でユーザにアクセシビリティスイッチを出すことができます。 詳細については [Chromium のアクセシビリティドキュメント](https://www.chromium.org/developers/design-documents/accessibility) を参照してください。 既定では無効です。

この API は `ready` イベントが発生した後で呼ばなければいけません。

**注:** アクセシビリティツリーをレンダリングすると、アプリのパフォーマンスに顕著な影響を与える可能性があります。既定で有効にすべきではありません。

**[非推奨予定](modernization/property-updates.md)**

### `app.showAboutPanel` _macOS_ _Linux_

アプリの About パネルを表示します。 このオプションは `app.setAboutPanelOptions(options)`で上書きできます。

### `app.setAboutPanelOptions(options)` _macOS_ _Linux_

* `options` Object
  * `applicationName` String (任意) - アプリの名前。
  * `applicationVersion` String (任意) - アプリのバージョン。
  * `copyright` String (任意) - 著作権情報。
  * `version` String (任意) - アプリのビルドバージョン番号。 _macOS_
  * `credits` String (任意) - クレジット情報. _macOS_
  * `website` String (任意) - アプリのウェブサイト。 _Linux_
  * `iconPath` String (任意) - アプリのアイコンへのパス。 アスペクト比を保ったまま 64×64 ピクセルで表示されます。 _Linux_

Aboutパネルのオプションを設定します。 MacOS の場合、これはアプリの `.plist` ファイルで定義された値を上書きします。 詳細については、[Apple社のドキュメント](https://developer.apple.com/reference/appkit/nsapplication/1428479-orderfrontstandardaboutpanelwith?language=objc) を参照してください。 Linuxの場合、表示するために値をセットしなければなりません。デフォルトの値はありません。

`credits` を設定していなくてもアプリに表示したい場合、AppKit は NSBundle の main クラスメソッドから返されたバンドル内で、"Credits.html"、"Credits.rtf"、"Credits.rtfd" の順番でファイルを探します。 最初に見つかったファイルが使用されます。見つからない場合、その情報の部分は空白のままです。 詳細は Apple の [ドキュメント](https://developer.apple.com/documentation/appkit/nsaboutpaneloptioncredits?language=objc) を参照してください。

### `app.isEmojiPanelSupported`

戻り値 `Boolean` - 現在の OS バージョンがネイティブの絵文字ピッカーを許可しているかどうか。

### `app.showEmojiPanel` _macOS_ _Windows_

プラットフォームのネイティブの絵文字ピッカーを表示します。

### `app.startAccessingSecurityScopedResource(bookmarkData)` _macOS (mas)_

* `bookmarkData` String - `dialog.showOpenDialog` または `dialog.showSaveDialog` メソッドによって返された、base64 でエンコードされたセキュリティスコープのブックマークデータ。

戻り値 `Function` - セキュリティスコープ付きファイルへのアクセスが終了すると、この関数を呼び出す**必要が**あります。 ブックマークへのアクセスを忘れた場合は、[カーネルリソースがリークします](https://developer.apple.com/reference/foundation/nsurl/1417051-startaccessingsecurityscopedreso?language=objc)。アプリが再起動されるまで、サンドボックスの外部にアクセスする権限は失われます。

```js
// ファイルアクセス開始
const stopAccessingSecurityScopedResource = app.startAccessingSecurityScopedResource(data)
// サンドボックス外のファイルにアクセスできるようになりました 🎉

// ファイルへのアクセスが終わったらアクセス停止を忘れずに。
stopAccessingSecurityScopedResource()
```

セキュリティスコープ付きリソースへのアクセスを開始します。 このメソッドでは、Mac App Store 用にパッケージ化された Electron アプリケーションが、ユーザーが選択したファイルにアクセスするためにサンドボックスの外部にアクセスすることがあります。 このシステムの動作の詳細は、[Apple のドキュメント](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) を参照してください。

### `app.commandLine.appendSwitch(switch[, value])`

* `switch` String - 主要なものを除くコマンドラインスイッチ `--`
* `value` String (任意) - 与えられたスイッチの値

Chromiumのコマンドラインに (オプションの `value` と一緒に) スイッチを追加します。

**注:** これは`process.argv` に影響を与えません。 この関数は主に Chromium の振る舞いを制御するために使われます。

### `app.commandLine.appendArgument(value)`

* `value` String - コマンドラインに追加された引数

Chromiumのコマンドラインに引数を追加します。 引数は正しく引用符で囲ってください。 スイッチは、追加順序に関係なく引数に先行します。

`--switch=value` のような引数を追加している場合は、代わりに `appendSwitch('switch', 'value')` を使用することを検討してください。

**注:** これは`process.argv` に影響を与えません。 この関数は主に Chromium の振る舞いを制御するために使われます。

### `app.commandLine.hasSwitch(switch)`

* `switch` String - コマンドラインスイッチ

戻り値 `Boolean` - コマンドラインスイッチがあるかどうか。

### `app.commandLine.getSwitchValue(switch)`

* `switch` String - コマンドラインスイッチ

戻り値 `String` - コマンドラインスイッチの値

**注意:** スイッチが存在しないか値がない場合、これは空文字列を返します。

### `app.enableSandbox()` _実験的_

アプリで完全サンドボックスモードを有効にします。

このメソッドはアプリが ready になる前だけでしか呼び出すことができません。

### `app.isInApplicationsFolder()` _macOS_

戻り値 `Boolean` - アプリケーションが現在、システムのアプリケーションフォルダから実行されているかどうか。 `app.moveToApplicationsFolder()` と組み合わせて使ってください。

### `app.moveToApplicationsFolder()` _macOS_

戻り値 `Boolean` - 移動が成功したかどうか。 移動が成功した場合、アプリケーションは終了し、再起動されることに注意してください。

デフォルトでは確認ダイアログは表示されません。 ユーザに操作の確認をさせたい場合は、[`dialog`](dialog.md) API で実現できます。

**注:** このメソッドはユーザ以外が移動の失敗を引き起こした場合にもエラーをスローします。 例えば、ユーザが承認ダイアログをキャンセルした場合、このメソッドは false を返します。 コピーの実行に失敗した場合、このメソッドはエラーをスローします。 エラーのメッセージは意味の分かるものにする必要があり、何が間違っているのかを正確に知らせるようにしてください。

### `app.dock.bounce([type])` _macOS_

* `type` String (任意) - `critical` か `informational` にできます。 省略値は、`informational` です。

戻り値 `Integer` - このリクエストを表すID。

`critical` が渡された場合、ドックのアイコンはアプリケーションがアクティブになるか、リクエストがキャンセルされるまでバウンスします。

`informational` が渡されると、ドックアイコンが 1 秒間バウンスします。 ただし、アプリケーションがアクティブになるかリクエストがキャンセルされるまで、そのリクエストはアクティブのままです。

**注釈:** このメソッドは、アプリがフォーカスされていないときにのみ使用できます。アプリがフォーカスされていると -1 を返します。

### `app.dock.cancelBounce(id)` _macOS_

* `id` Integer

`id` のバウンスをキャンセルします。

### `app.dock.downloadFinished(filePath)` _macOS_

* `filePath` String

filePath がダウンロードフォルダの中の場合、ダウンロードのスタックをバウンスさせます。

### `app.dock.setBadge(text)` _macOS_

* `text` String

ドックのバッジ領域に表示される文字列を設定します。

### `app.dock.getBadge()` _macOS_

戻り値 `String` - ドックのバッジ文字列。

### `app.dock.hide()` _macOS_

ドックのアイコンを非表示にする

### `app.dock.show()` _macOS_

戻り値 `Promise<void>` - Dock のアイコンが表示されたときに実行されます。

### `app.dock.isVisible()` _macOS_

Returns `Boolean` - Dock のアイコンが表示されているかどうか。

### `app.dock.setMenu(menu)` _macOS_

* `menu` [Menu](menu.md)

アプリケーションの [Dock メニュー](https://developer.apple.com/macos/human-interface-guidelines/menus/dock-menus/) を設定します。

### `app.dock.getMenu()` _macOS_

戻り値 `Menu | null` - アプリケーションの [Dock メニュー](https://developer.apple.com/macos/human-interface-guidelines/menus/dock-menus/)。

### `app.dock.setIcon(image)` _macOS_

* `image` ([NativeImage](native-image.md) | String)

このドックアイコンに関連付けられた `image` を設定します。

## プロパティ

### `app.applicationMenu`

`Menu` 型のプロパティです。セットされている場合は [`Menu`](menu.md) を、それ以外は `null` を返します。 ユーザはこのプロパティに [Menu](menu.md) を渡すことができます。

### `app.accessibilitySupportEnabled` _macOS_ _Windows_

この `Boolean` プロパティは、Chrome のアクセシビリティサポートが有効になっている場合は `true`、それ以外の場合は `false` になります。 このプロパティは、テキスト読み上げなどのアシスト技術を使っていることが検出された場合、`true` を返します。 手動でこのプロパティを `true` にセットして Chrome のアクセシビリティサポートを有効にすると、開発者はアプリケーション設定内でユーザにアクセシビリティスイッチを出すことができます。

詳細については [Chromium のアクセシビリティドキュメント](https://www.chromium.org/developers/design-documents/accessibility) を参照してください。 既定では無効です。

この API は `ready` イベントが発生した後で呼ばなければいけません。

**注:** アクセシビリティツリーをレンダリングすると、アプリのパフォーマンスに顕著な影響を与える可能性があります。既定で有効にすべきではありません。

### `app.userAgentFallback`

この `String` は Electron がグローバルフォールバックとして使用するユーザーエージェント文字列です。

これは、`webContents` または `session` レベルでユーザーエージェントが設定されていない場合に使用されるユーザーエージェントです。  アプリ全体で同じユーザーエージェントを使用するのに役立ちます。  オーバーライドされた値が確実に使用されるように、アプリの初期化のできるだけ早い段階でカスタム値に設定してください。

### `app.isPackaged`

アプリがパッケージされている場合は`true`、それ以外は `false` を返す `Boolean` プロパティ。 多くのアプリケーションでは、このプロパティを用いて開発版の環境と製品版の環境を区別できます。

### `app.allowRendererProcessReuse`

この `Boolean` が `true` のとき、ナビゲーションごとにレンダラープロセスが確実に再起動されるように Electron が設定している、そのオーバーライドを無効にします。  このプロパティの現在の既定値は `false` です。

これらのオーバーライドがデフォルトで無効になることを意図しているので、将来的にはこのプロパティは削除される予定です。  このプロパティはレンダラープロセス内で使用できるネイティブモジュールに影響します。  Electron がレンダラープロセスを再起動して、レンダラープロセスでネイティブモジュールを使用する方針についての詳細は、この [Tacking Issue](https://github.com/electron/electron/issues/18397) をご覧ください。
