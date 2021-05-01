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

アプリケーションが基本的な起動処理を完了したときに発生します。 Windows と Linux上では、`will-finish-launching` イベントは `ready` イベントと同じです。macOS上では、このイベントは`NSApplication` の `applicationWillFinishLaunching` 通知を表しています。 通常、ここでは、`open-file` や `open-url` イベントのリスナーを設定したり、クラッシュレポーターや自動アップデーターを開始したりします。

ほとんどの場合、`ready` イベントハンドラーですべてのことを行うようにするべきです。

### イベント: 'ready'

戻り値:

* `event` Event
* `launchInfo` Record<string, any> | [NotificationResponse](structures/notification-response.md) _macOS_

Electron が一度、初期化処理を完了したときに発生します。 macOS で通知センターから起動された場合、`launchInfo` は、`NSUserNotification` の `userInfo`、またはアプリケーションを開く際に使用された [`UNNotificationResponse`](structures/notification-response.md) からの情報を保持しています。 また、`app.isReady()` を呼び出してこのイベントが発生したことがあるかどうかを確認したり、`app.whenReady()` を呼び出して Electron 初期化時に解決される Promise を取得したりできます。

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

ユーザがこのアプリケーションで URL を開こうとしたときに発生します。 アプリケーションの `Info.plist` ファイルで `CFBundleURLTypes` キーの中に URL スキームを定義し、`NSPrincipalClass` に `AtomApplication` を設定しなければなりません。

このイベントを処理する場合、`event.preventDefault()` を呼び出す必要があります。

### イベント: 'activate' _macOS_

戻り値:

* `event` Event
* `hasVisibleWindows` Boolean

アプリケーションがアクティブになったときに発生します。 アプリケーションが最初に起動される、既に実行中のときにアプリケーションを再起動しようとする、アプリケーションの Dock やタスクバーのアイコンをクリックするなど、いろいろなアクションがこのイベントの引き金となり得ます。

### イベント: 'did-become-active' _macOS_

戻り値:

* `event` Event

macOS のアプリケーションがアクティブになったときに発生します。 `activate`イベントとの違い: `did-become-active` が発生するのはアプリがアクティブになる度に発生します。Dock アイコンがクリックしたり、アプリが再起動したときだけではありません。

### イベント: 'continue-activity' _macOS_

戻り値:

* `event` Event
* `type` String - アクティビティを識別する文字列。 [`NSUserActivity.activityType`][activity-type] と対応しています。
* `userInfo` unknown - 別のデバイスのアクティビティによって保存されたアプリ固有の情報が含まれています。

[ハンドオフ][handoff] 中に別のデバイスからのアクティビティを継続しようとしたときに発生します。 このイベントを処理する場合、`event.preventDefault()` を呼び出す必要があります。

ユーザのアクティビティはアクティビティ元のアプリと同一の開発者チームIDを持ち、アクティビティタイプをサポートするアプリでしか継続させることができません。 サポートされるアクティビティタイプは、アプリの `Info.plist` の `NSUserActivityTypes` キーで指定されています。

### イベント: 'will-continue-activity' _macOS_

戻り値:

* `event` Event
* `type` String - アクティビティを識別する文字列。 [`NSUserActivity.activityType`][activity-type] と対応しています。

[ハンドオフ][handoff] 中に別のデバイスからのアクティビティを継続しようとする前に発生します。 このイベントを処理する場合、`event.preventDefault()` を呼び出す必要があります。

### イベント: 'continue-activity-error' _macOS_

戻り値:

* `event` Event
* `type` String - アクティビティを識別する文字列。 [`NSUserActivity.activityType`][activity-type] と対応しています。
* `error` String - エラーのローカライズされた説明としての文字列。

[ハンドオフ][handoff] 中に別のデバイスからのアクティビティを継続できなかったときに発生します。

### イベント: 'activity-was-continued' _macOS_

戻り値:

* `event` Event
* `type` String - アクティビティを識別する文字列。 [`NSUserActivity.activityType`][activity-type] と対応しています。
* `userInfo` unknown - アクティビティによって保存されたアプリ固有の情報が含まれています。

[ハンドオフ][handoff] 中にこのデバイスからのアクティビティを他のデバイスで継続させることに成功した後で発生します。

### イベント: 'update-activity-state' _macOS_

戻り値:

* `event` Event
* `type` String - アクティビティを識別する文字列。 [`NSUserActivity.activityType`][activity-type] と対応しています。
* `userInfo` unknown - アクティビティによって保存されたアプリ固有の情報が含まれています。

[ハンドオフ][handoff] が別のデバイスでまさに継続されようとしているときに発生します。 送信される情報を更新する必要があれば、`event.preventDefault()` をすぐに呼び出してください。そして、新しい `userInfo` 辞書を構築して `app.updateCurrentActivity()` を適切に呼び出してください。 さもなくば操作は失敗し、`continue-activity-error` が呼び出されます。

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

`webContents` が Basic 認証を要求すると発生します。

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

### イベント: 'gpu-process-crashed' _非推奨_

戻り値:

* `event` Event
* `killed` Boolean

GPU プロセスがクラッシュしたり、強制終了されたりしたときに発生します。

**非推奨:** このイベントは `child-process-gone` イベント によって引き継がれます。このイベントには、子プロセスが失われた理由についての詳細情報が含まれています。 これはクラッシュした場合に限りません。 移植する場合は、Boolean 型の `killed` だと `reason === 'killed'` をチェックするように置き換えればできます。

### イベント: 'renderer-process-crashed' _Deprecated_

戻り値:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `killed` Boolean

`webContents` のレンダラープロセスがクラッシュ、または強制終了されたときに発行されます。

**非推奨:** このイベントは `render-process-gone` イベント によって引き継がれます。このイベントには、子プロセスが失われた理由についての詳細情報が含まれています。 これはクラッシュした場合に限りません。  移植する場合は、Boolean 型の `killed` だと `reason === 'killed'` をチェックするように置き換えればできます。

### イベント: 'render-process-gone'

戻り値:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `details` Object
  * `reason` String - レンダープロセスがなくなった理由。  取りうる値:
    * `clean-exit` - ゼロの終了コードでプロセスが終了した
    * `abnormal-exit` - 非ゼロの終了コードでプロセスが終了した
    * `killed` - プロセスが SIGTERM シグナルの送信などの方法でキルされた
    * `crashed` - プロセスがクラッシュした
    * `oom` - プロセスがメモリ不足になった
    * `launch-failed` - プロセスが正常に起動されなかった
    * `integrity-failure` - Windows コードの整合性チェックに失敗した
  * `exitCode` Integer - プロセスの終了コードです。`reason` が `launch-failed` でなければ、`exitCode` はプラットフォーム固有の起動失敗のエラーコードになります。

renderer processが予期せず消えたときに発生します。  プロセスがクラッシュした場合やキルされた場合は正常です。

### イベント: 'child-process-gone'

戻り値:

* `event` Event
* `details` Object
  * `type` String - プロセスの種別。 以下の値のいずれかです。
    * `Utility`
    * `Zygote`
    * `Sandbox helper`
    * `GPU`
    * `Pepper Plugin`
    * `Pepper Plugin Broker`
    * `Unknown`
  * `reason` String - 子プロセスがなくなった理由。 取りうる値:
    * `clean-exit` - ゼロの終了コードでプロセスが終了した
    * `abnormal-exit` - 非ゼロの終了コードでプロセスが終了した
    * `killed` - プロセスが SIGTERM シグナルの送信などの方法でキルされた
    * `crashed` - プロセスがクラッシュした
    * `oom` - プロセスがメモリ不足になった
    * `launch-failed` - プロセスが正常に起動されなかった
    * `integrity-failure` - Windows コードの整合性チェックに失敗した
  * `exitCode` Number - プロセスの終了コード (例: posix の場合は waitpid からのステータス、Windowsの場合は GetExitCodeProcess) 。
  * `serviceName` String (任意) - そのプロセスのローカライズされていない名前。
  * `name` String (任意) - そのプロセスの名前。 ユーティリティの例: `Audio Service`, `Content Decryption Module Service`, `Network Service`, `Video Capture`など

子 processが予期せず消えたときに発生します。 プロセスがクラッシュした場合やキルされた場合は正常です。 レンダラープロセスを含みません。

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

app.on('session-created', (session) => {
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

**注意:** 2 番目のインスタンスが最初のインスタンスとは別のユーザーによって起動された場合、 `argv` 配列には引数が含まれません。

このイベントは `app` の `ready` イベントが発生した後で実行されることが保証されます。

**注意:** Chromiumがコマンドライン引数を追加することがあります。例えば、`--original-process-start-time`があります。

### イベント: 'desktop-capturer-get-sources'

戻り値:

* `event` Event
* `webContents` [WebContents](web-contents.md)

`webContents` のレンダラープロセス内で `desktopCapture.getSources()` が呼ばれたときに発生します。 `event.preventDefault()` を呼び出すと、空のソースを返します。

### イベント: 'remote-require' _非推奨_

戻り値:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `モジュール名` String

`webContents` のレンダラープロセス内で `remote.require()` が呼ばれたときに発生します。 `event.preventDefault()` を呼ぶとモジュールの返却が阻害されます。 `event.returnValue` にセットすることでカスタムな値を返すことが出来ます。

### イベント: 'remote-get-global' _非推奨_

戻り値:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `globalName` String

`webContents` のレンダラープロセス内で `remote.getGlobal()` が呼ばれたときに発生します。 `event.preventDefault()` を呼ぶとグローバルの返却が阻害されます。 `event.returnValue` にセットすることでカスタムな値を返すことが出来ます。

### イベント: 'remote-get-builtin' _非推奨_

戻り値:

* `event` Event
* `webContents` [WebContents](web-contents.md)
* `モジュール名` String

`webContents` のレンダラープロセス内で `remote.getBuiltin()` が呼ばれたときに発生します。 `event.preventDefault()` を呼ぶとモジュールの返却が阻害されます。 `event.returnValue` にセットすることでカスタムな値を返すことが出来ます。

### イベント: 'remote-get-current-window' _非推奨_

戻り値:

* `event` Event
* `webContents` [WebContents](web-contents.md)

`webContents` のレンダラープロセス内で `remote.getCurrentWindow()` が呼ばれたときに発生します。 `event.preventDefault()` を呼ぶとオブジェクトの返却が阻害されます。 `event.returnValue` にセットすることでカスタムな値を返すことが出来ます。

### イベント: 'remote-get-current-web-contents' _非推奨_

戻り値:

* `event` Event
* `webContents` [WebContents](web-contents.md)

`webContents` のレンダラープロセス内で `remote.getCurrentWebContents()` が呼ばれたときに発生します。 `event.preventDefault()` を呼ぶとオブジェクトの返却が阻害されます。 `event.returnValue` にセットすることでカスタムな値を返すことが出来ます。

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

戻り値 `Boolean` - Electronの初期化が完了している場合、`true`、そうでない場合、`false`。 `app.whenReady()` も参照してください。

### `app.whenReady()`

Returns `Promise<void>` - Electron が初期化されるときに実行される Promise。 `app.isReady()` を確認してアプリの準備がまだできていないときに `ready` イベントに登録するための、便利な代替手段として使用できます。

### `app.focus([options])`

* `options` Object (任意)
  * `steal` Boolean _macOS_ - 他のアプリが現在アクティブな場合でも、レシーバをアクティブにします。

Linux では、最初の表示ウィンドウにフォーカスします。 macOS では、アプリケーションがアクティブになります。 Windows では、アプリケーションの最初のウィンドウにフォーカスします。

`steal` オプションはできるだけ慎重に使用してください。

### `app.hide()` _macOS_

最小化することなくアプリケーションのすべてのウインドウを非表示にします。

### `app.show()` _macOS_

非表示にされたアプリケーションのウインドウを表示します。 自動的にフォーカスしません。

### `app.setAppLogsPath([path])`

* `path` String (任意) - ログのカスタムパス。 絶対パスでなければなりません。

アプリがロギングするディレクトリを設定または作成します。これは `app.getPath()` や `app.setPath(pathName, newPath)` で操作できます。

`path` 引数なしで `app.setAppLogsPath()` を呼び出すと、このディレクトリは、_macOS_ では `~/Library/Logs/アプリ名` に、_Linux_ と _Windows_ では `userData` ディレクトリ内に設定されます。

### `app.getAppPath()`

戻り値 `String` - 現在のアプリケーションのディレクトリ。

### `app.getPath(name)`

* `name` String - 以下のパスを名前で要求することができます。
  * `home` ユーザのホームディレクトリ。
  * `appData` - 既定のユーザ毎のアプリケーションデータディレクトリ。
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
  * `recent` ユーザーの最近のファイルのめのディレクトリ(Windows のみ)。
  * `logs` アプリのログフォルダのディレクトリ。
  * `crashDumps` クラッシュダンプを格納するディレクトリ。

戻り値 `String` - `name` に関連付けられた特別なディレクトリもしくはファイルのパス。 失敗した場合、`Error` が送出されます。

`app.setAppLogsPath()` を呼び出すよりも先に `app.getPath('logs')` が呼び出された場合、`path` 引数なしで `app.setAppLogsPath()` を呼び出すのに等しい、デフォルトのログディレクトリが作成されます。

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

通常、`package.json` の `name` フィールドは、npm のモジュール仕様に基づいて小文字だけの短い名前が設定されます。 通常、すべて大文字で始まるアプリケーションの名前となる `productName` フィールドも指定してください。Electronによって、`name` よりも優先されます。

### `app.setName(name)`

* `name` String

現在のアプリケーションの名前を上書きします。

**注釈:** この関数は、Electron 内で使用する名前を上書きします。OS が使用する名前には影響しません。

### `app.getLocale()`

戻り値 `String` - 現在のアプリケーションのロケールで、Chromium の `l10n_util` ライブラリを用いて取得されます。 取りうる戻り値については [こちら](https://source.chromium.org/chromium/chromium/src/+/master:ui/base/l10n/l10n_util.cc) にドキュメントがあります。

ロケールを設定するには、アプリケーションの起動時にコマンドラインスイッチを使用する必要があります。これについては、[こちら](https://github.com/electron/electron/blob/master/docs/api/command-line-switches.md) を参照してください。

**注:** アプリをパッケージ化して配布する場合、`locales` フォルダを同梱する必要があります。

**Note:**Windows の `準備ができて` のイベントが出力される後を呼び出すことがあります。

### `app.getLocaleCountryCode()`

戻り値 `String` - 2 文字の [ISO 3166](https://www.iso.org/iso-3166-country-codes.html) 国名コードで、ユーザーの OS のロケールを示します。 この値はネイティブの OS API から取得します。

**注意:** ロケールの国コードを取得できなかった場合、これは空文字列を返します。

### `app.addRecentDocument(path)` _macOS_ _Windows_

* `path` String

`path` を最近使ったドキュメントのリストに追加します。

このリストは OS が管理します。 Windows の場合はタスクバーからリストにアクセスでき、macOS の場合は Dock メニューからリストにアクセスできます。

### `app.clearRecentDocuments()` _macOS_ _Windows_

最近使ったドキュメントのリストをクリアします。

### `app.setAsDefaultProtocolClient(protocol[, path, args])`

* `protocol` String - `://` を除くプロトコルの名前。 例えば、アプリで `electron://` リンクを処理したい場合、引数を `electron` にしてこのメソッドを呼び出してください。
* `path` String (任意) _Windows_ - Electron 実行形式へのパス。 省略値は `process.execPath` です。
* `args` String[] (任意) _Windows_ - 実行形式に渡す引数。 省略値は空の配列です。

戻り値 `Boolean` - 呼び出しが成功したかどうか。

このメソッドは現在の実行形式をプロトコル (または URI スキーム) の既定のハンドラーとして設定します。 これにより、アプリをオペレーティングシステムと密接に統合できます。 登録すると、`プロトコル://` によるすべてのリンクは現在の実行形式で開かれるようになります。 プロトコルを含むリンク全体が、アプリケーションに引数として渡されます。

**注:** macOS の場合はアプリの `info.plist` に追加されているプロトコルしか登録できず、実行時に変更できません。 しかし、[Electron Forge][electron-forge] や [Electron Packager][electron-packager] を介するかテキストエディタで `info.plist` を編集することで、ビルド時にファイルを変更できます。 詳細は [Apple社のドキュメント][CFBundleURLTypes] を参照するようにしてください。

**注釈:** Windows ストア 環境 (`appx` としてパッケージされている) 場合、この API はすべての呼び出しに `true` を返しますが、それにセットされたレジストリキーは他のアプリケーションからアクセスできません。  Windows ストア アプリケーションをデフォルトのプロトコルハンドラとして登録するには、[マニフェストでプロトコルを宣言する](https://docs.microsoft.com/en-us/uwp/schemas/appxpackage/uapmanifestschema/element-uap-protocol) 必要があります。

この API は内部的に Windows レジストリ や `LSSetDefaultHandlerForURLScheme` を使用します。

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

戻り値 `Boolean` - 現在の実行形式がプロトコル (または URI スキーム) の既定のハンドラーかどうか。

**注:** macOSの場合、このメソッドは、アプリがプロトコルの既定のハンドラーとして登録されていたかをチェックするのに使えます。 macOSのマシン上の `~/Library/Preferences/com.apple.LaunchServices.plist` を確認することでもこれを検証することができます。 詳細は [Apple社のドキュメント][LSCopyDefaultHandlerForURLScheme] を参照するようにしてください。

この API は内部的に Windows レジストリ や `LSCopyDefaultHandlerForURLScheme` を使用します。

### `app.getApplicationNameForProtocol(url)`

* `url` String - 確認するプロトコル名が付いた URL。 類似の他メソッドとは異なり、少なくとも `://` までを含む URL 全体を受け付けます (例: `https://`)。

戻り値 `String` - そのプロトコルを処理するアプリケーションの名前。ハンドラーがない場合は空の文字列です。 たとえば、Electron がその URL のデフォルトハンドラーである場合、Windows と Mac では `Electron` になります。 ただし、厳密な形式に依存しないでください。変更されている可能性があります。 Linux では、`.desktop` 接尾子を付けた別の形式が必要でしょう。

このメソッドは、URL のプロトコル (別名 URI スキーム) のデフォルトハンドラーであるアプリケーション名を返します。

### `app.getApplicationInfoForProtocol(url)` _macOS_ _Windows_

* `url` String - 確認するプロトコル名が付いた URL。 類似の他メソッドとは異なり、少なくとも `://` までを含む URL 全体を受け付けます (例: `https://`)。

戻り値 `Promise<Object>` - 以下を含むオブジェクトで実行されます。

* `icon` NativeImage - プロトコルを処理するアプリの表示アイコン。
* `path` String - プロトコルを扱うアプリのインストールパス。
* `name` String - プロトコルを扱うアプリの表示名。

このメソッドは、URL のプロトコル (別名 URI スキーム) のデフォルトハンドラーであるアプリケーション名、アイコン、パスを含むPromiseを返します。

### `app.setUserTasks(tasks)` _Windows_

* `tasks` [Task[]](structures/task.md) - `Task`オブジェクトの配列

`tasks` を Windows でのジャンプリストの [タスク][tasks] カテゴリに追加します。

`tasks` は [`Task`](structures/task.md) オブジェクトの配列です。

戻り値 `Boolean` - 呼び出しが成功したかどうか。

**注:** ジャンプリストをもっとカスタマイズしたい場合は、`app.setJumpList(categories)` を代わりに使用してください。

### `app.getJumpListSettings()` _Windows_

戻り値 `Object`:

* `minItems` Integer - ジャンプリストに表示されるアイテムの最小の数 (この値の詳細な説明は [MSDN ドキュメント][JumpListBeginListMSDN] を参照してください) 。
* `removedItems` [JumpListItem[]](structures/jump-list-item.md) - ユーザが、ジャンプリストのカスタムカテゴリから明示的に削除したアイテムに対応した、`JumpListItem` オブジェクトの配列。 これらのアイテムを**直後の** `app.setJumpList()` の呼び出しでジャンプリストに再度追加してはいけません。Windowsは削除されたアイテムを含むいかなるカスタムカテゴリも表示することはできません。

### `app.setJumpList(categories)` _Windows_

* `categories` [JumpListCategory[]](structures/jump-list-category.md) | `null` - `JumpListCategory` オブジェクトの配列。

アプリケーションのカスタムジャンプリストを設定もしくは削除し、以下の文字列のいずれかを返します。

* `ok` - 正常。
* `error` - 1つ以上のエラーが発生しました。何が原因かを把握するためには、実行時ログを有効にします。
* `invalidSeparatorError` - ジャンプリストのカスタムカテゴリに区切りを追加しようとしました。 区切りは標準の `タスク` カテゴリでしか使用できません。
* `fileTypeRegistrationError` - アプリが処理できると登録されていないファイルタイプのファイルリンクをジャンプリストに追加しようとしました。
* `customCategoryAccessDeniedError` - ユーザープライバシーもしくはグループポリシー設定のため、ジャンプリストにカスタムカテゴリを追加できません。

`categories` が `null` の場合、その前に設定されていたカスタムジャンプリスト (あれば) は、(Windowsによって管理される) アプリ標準のジャンプリストに置換されます。

**注:** `JumpListCategory` オブジェクトに `type` プロパティも `name` プロパティも設定されなかった場合、`type` は `tasks` と見做されます。 `name` プロパティは設定されている一方で `type` プロパティが省略された場合、`type` は `custom` と見做されます。

**注:** ユーザはカスタムカテゴリからアイテムを削除できますが、Windows では次の `app.setJumpList(categories)` の呼び出しが成功した **後** でないと、削除されたアイテムをカスタムカテゴリに追加し直すことができません。 それより早くカスタムカテゴリに削除されたアイテムを再度追加しようとすると、ジャンプリストからカスタムカテゴリ全体が外れてしまいます。 削除されたアイテムのリストは、`app.getJumpListSettings()` を使って取得できます。

**注:** ジャンプリストのアイテムの `description` プロパティは最大長は 260 文字です。 この制限を超えると、アイテムはジャンプリストに追加されず、表示されません。

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
  { // 名前があるため `type` は "custom" になります
    name: 'ツール',
    items: [
      {
        type: 'task',
        title: 'ツール A',
        program: process.execPath,
        args: '--run-tool-a',
        icon: process.execPath,
        iconIndex: 0,
        description: 'ツール A を実行する'
      },
      {
        type: 'task',
        title: 'ツール B',
        program: process.execPath,
        args: '--run-tool-b',
        icon: process.execPath,
        iconIndex: 0,
        description: 'ツール B を実行する'
      }
    ]
  },
  { type: 'frequent' },
  { // 名前がないため `type` は "tasks" になります
    items: [
      {
        type: 'task',
        title: '新規プロジェクト',
        program: process.execPath,
        args: '--new-project',
        description: '新規プロジェクトを作成します。'
      },
      { type: 'separator' },
      {
        type: 'task',
        title: 'プロジェクトの復元',
        program: process.execPath,
        args: '--recover-project',
        description: 'プロジェクトを復元します。'
      }
    ]
  }
])
```

### `app.requestSingleInstanceLock()`

戻り値 `Boolean`

このメソッドの戻り値は、アプリケーションのこのインスタンスのロックが成功したかどうかを表します。  ロック状態にできなかった場合、アプリケーションの他のインスタンスが既にロックされており、ただちに終了すると想定できます。

つまり、 このメソッドは、プロセスがアプリケーションの 1 つ目のインスタンスで、アプリがロード処理を続行する必要がある場合に `true` を返します。  既にロック状態にしたものとは別のインスタンスにパラメータを送信したためプロセスが直ちに終了する必要がある場合は、`false` を返します。

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
  app.whenReady().then(() => {
    myWindow = createWindow()
  })
}
```

### `app.hasSingleInstanceLock()`

戻り値 `Boolean`

このメソッドはアプリのこのインスタンスが現在シングルインスタンスロックをされているかどうかを返します。  `app.requestSingleInstanceLock()` でロックを要求し、`app.releaseSingleInstanceLock()` で解放できます。

### `app.releaseSingleInstanceLock()`

`requestSingleInstanceLock` によって作成されたすべてのロックを解放します。 これにより、並列実行するための複数インスタンスのアプリケーションが再び許可されます。

### `app.setUserActivity(type, userInfo[, webpageURL])` _macOS_

* `type` String - アクティビティを一意に識別します。 [`NSUserActivity.activityType`][activity-type] と対応しています。
* `userInfo` any - 別のデバイスで使用するために保存されたアプリ固有の情報。
* `webpageURL` String (任意) - 継続されたデバイスに適切なアプリがインストールされていない場合にブラウザで読み込もうとしたウェブページ。 スキームは `http` もしくは `https` でなければなりません。

`NSUserActivity` を作成し、現在のアクティビティとして設定します。 そのアクティビティは後に別のデバイスでの [ハンドオフ][handoff] に適用されます。

### `app.getCurrentActivityType()` _macOS_

戻り値 `String` - 現在実行されているアクティビティのタイプ。

### `app.invalidateCurrentActivity()` _macOS_

現在の [ハンドオフ][handoff] ユーザアクティビティを無効にします。

### `app.resignCurrentActivity()` _macOS_

現在の [ハンドオフ][handoff] ユーザーアクティビティを、無効にせずに不活性化します。

### `app.updateCurrentActivity(type, userInfo)` _macOS_

* `type` String - アクティビティを一意に識別します。 [`NSUserActivity.activityType`][activity-type] と対応しています。
* `userInfo` any - 別のデバイスで使用するために保存されたアプリ固有の情報。

タイプが `type` と一致した場合、現在のアクティビティを更新し、現在の `userInfo` ディスクショナリに `userInfo` のエントリを統合します。

### `app.setAppUserModelId(id)` _Windows_

* `id` String

[アプリケーションユーザモデル ID][app-user-model-id] を `id` に変更します。

### `app.setActivationPolicy(policy)` _macOS_

* `policy` String - 'regular', 'accessory', 'formited' のいずれか。

アプリのアクティベーションポリシーを設定します。

アクティベーションポリシーの種類は以下のとおりです。

* 'regular' - Dock に表示される通常のアプリで、ユーザーインターフェースがあったりします。
* 'accessory' - このアプリケーションはドックに表示されず、メニューバーもありません。プログラムから又はウィンドウをクリックすることでアクティベートできます。
* 'prohibited' - アプリケーションはドックに表示されず、ウィンドウも作られず、アクティベートできません。

### `app.importCertificate(options, callback)` _Linux_

* `options` Object
  * `certificate` String - PACS#12ファイルのパス。
  * `password` String - 証明書のパスフレーズ。
* `callback` Function
  * `result` Integer - インポート結果。

プラットフォームの証明書ストアにPACS#12形式で証明書をインポートします。 インポート操作の `result` で `callback` が呼び出されます。`0` という値は成功を意味しますが、その他の値はChromium の [net_error_list](https://source.chromium.org/chromium/chromium/src/+/master:net/base/net_error_list.h) の通り、失敗を意味します。

### `app.disableHardwareAcceleration()`

現在のアプリのハードウェアアクセラレーションを無効にします。

このメソッドはアプリが ready になる前だけでしか呼び出すことができません。

### `app.disableDomainBlockingFor3DAPIs()`

既定では、GPU プロセスがあまりに頻繁にクラッシュする場合、ドメイン単位の原則に基づき、再起動するまで Chromium は 3D API (例えばWebGL) を無効にします。 この関数はこの振る舞いを無効にします。

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
{
  auxAttributes:
   {
     amdSwitchable: true,
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
     videoDecodeAcceleratorFlags: 0
   },
  gpuDevice:
   [{ active: true, deviceId: 26657, vendorId: 4098 },
     { active: false, deviceId: 3366, vendorId: 32902 }],
  machineModelName: 'MacBookPro',
  machineModelVersion: '11.5'
}
```

`vendorId` や `driverId` のような基本的な情報だけ必要であれば、`basic` を用いることが好ましいです。

### `app.setBadgeCount([count])` _Linux_ _macOS_

* `count` Integer (任意) - 値が指定されている場合は、指定された値のバッジを設定します。そうでない場合、macOS では無地の白点 (通知数不明などの意味) を表示します。 Linux で値を指定しない場合、バッジは表示されません。

戻り値 `Boolean` - 呼び出しが成功したかどうか。

現在のアプリのカウンターバッジを設定します。 カウントを `0` に設定すると、バッジを非表示にします。

macOS では Dock アイコンに表示されます。 Linux では Unity ランチャーでのみ動作します。

**注:** Unity ランチャーで動作させるには `.desktop` ファイルの存在が必要です。詳細は [デスクトップ環境への統合][unity-requirement] をお読みください。

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
* `openAsHidden` Boolean _macOS_ - アプリがログイン時に隠して開くように設定されている場合 `true` です。 この設定は [MAS ビルド][mas-builds] では利用できません。
* `wasOpenedAtLogin` Boolean _macOS_ - アプリがログイン時に自動的に開かれた場合 `true` です。 この設定は [MAS ビルド][mas-builds] では利用できません。
* `wasOpenedAsHidden` Boolean _macOS_ - アプリが非表示のログイン項目として開かれていた場合 `true` です。 これは、アプリが起動時に何もウインドウを開いてはいけないことを示します。 この設定は [MAS ビルド][mas-builds] では利用できません。
* `restoreState` Boolean _macOS_ - 以前のセッションから状態を復元する必要があるログイン項目としてアプリを開いた場合 `true` です。 アプリが最後に閉じたとき開いていたウインドウをアプリが復元する必要があることを示します。 この設定は [MAS ビルド][mas-builds] では利用できません。
* `executableWillLaunchAtLogin` Boolean _Windows_ - `true` アプリはログイン時に開くように設定されており、その実行キーが無効化されていない場合。 `openAtLogin`は`args` オプションを無視する点が異なっています。与えられた実行ファイルがログイン時**なんらか**の引数が与えれた場合にこのプロパティは 真 になります。
* `launchItems` Object[] _Windows_
  * `name` String _Windows_ - レジストリエントリの名前の値。
  * `path` String _Windows_ - レジストリエントリに対応するアプリの実行可能ファイル。
  * `args` String[] (任意) _Windows_ - 実行ファイルに渡すコマンドライン引数。
  * `scope` String _Windows_ - `user` または `machine` のどちらか。 レジストリエントリが `HKEY_CURRENT USER` または `HKEY_LOCAL_MACHINE` の下にあるかどうかを示します。
  * `enabled` Boolean _Windows_ - 次の場合`true`になります。アプリレジストリキーが承認されているため、タスクマネージャと Windows 設定で `enabled` として表示されている場合。

### `app.setLoginItemSettings(settings)` _macOS_ _Windows_

* `settings` Object
  * `openAtLogin` Boolean (任意) - アプリをログイン時に開く場合は `true`、ログイン項目からアプリを外す場合は `false` にします。 省略値は `false` 。
  * `openAsHidden` Boolean (任意) _macOS_ - アプリを非表示で開く場合 `true` にします。 省略値は `false` です。 ユーザはこの設定をシステム環境設定から変更することができるので、現在の値を取得するために `app.getLoginItemSettings().wasOpenedAsHidden` をアプリが開かれたときに確認するようにしてください。 この設定は [MAS ビルド][mas-builds] では利用できません。
  * `path` String (任意) _Windows_ - ログイン時に起動する実行形式。 省略値は `process.execPath` です。
  * `args` String[] (任意) _Windows_ - 実行ファイルに渡すコマンドライン引数。 省略値は空の配列です。 パスはテンプレート文字列にするようにしましょう。
  * `enabled` Boolean (任意) _Windows_ - `true` の場合、スタートアップが承認したレジストリキーを変更し、 `タスクマネージャと Windows 設定で` アプリを有効/無効にします。 省略値は `true` です。
  * `name` String (任意) _Windows_ - レジストリに書きこむ値の名前。 デフォルトはアプリの AppUserModelId() です。 アプリのログイン項目設定を設定します。

Windows 上で Electron の `autoUpdater` を [Squirrel][Squirrel-Windows] を使って動かす場合、起動パスを Update.exe に設定し、渡す引数にアプリケーション名を指定してください。 例:

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

### `app.setAccessibilitySupportEnabled(enabled)` _macOS_ _Windows_

* `enabled` Boolean - [アクセシビリティツリー](https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/the-accessibility-tree)レンダリングを有効もしくは無効にします。

手動でChromeのユーザ補助機能を有効にすると、アプリケーションの設定でユーザにアクセシビリティスイッチを出すことができます。 詳細については [Chromium のアクセシビリティドキュメント](https://www.chromium.org/developers/design-documents/accessibility) を参照してください。 既定では無効です。

この API は `ready` イベントが発生した後で呼ばなければいけません。

**注:** アクセシビリティツリーをレンダリングすると、アプリのパフォーマンスに顕著な影響を与える可能性があります。 既定で有効にすべきではありません。

### `app.showAboutPanel()`

アプリの About パネルを表示します。 このオプションは `app.setAboutPanelOptions(options)`で上書きできます。

### `app.setAboutPanelOptions(options)`

* `options` Object
  * `applicationName` String (任意) - アプリの名前。
  * `applicationVersion` String (任意) - アプリのバージョン。
  * `copyright` String (任意) - 著作権情報。
  * `version` String (任意) _macOS_ - アプリのビルドバージョン番号。
  * `credits` String (任意) _macOS_ _Windows_ - クレジット情報。
  * `authors` String[] (任意) _Linux_ - アプリの作者のリスト。
  * `website` String (任意) _Linux_ - アプリのウェブサイト。
  * `iconPath` String (任意) _Linux_ _Windows_ - JPEGまたはPNGフォーッマットの、アプリのアイコンへのパス。 Linux で、アスペクト比を保ったまま 64×64 ピクセルで表示されます。

Aboutパネルのオプションを設定します。 macOS の場合、これはアプリの `.plist` ファイルで定義された値を上書きします。 詳細は [Apple のドキュメント][about-panel-options] を参照してください。 Linuxの場合、表示するために値をセットしなければなりません。デフォルトの値はありません。

`credits` を設定していなくてもアプリに表示したい場合、AppKit は NSBundle の main クラスメソッドから返されたバンドル内で、"Credits.html"、"Credits.rtf"、"Credits.rtfd" の順番でファイルを探します。 最初に見つかったファイルが使用されます。見つからない場合、その情報の部分は空白のままです。 詳細は Apple の [ドキュメント](https://developer.apple.com/documentation/appkit/nsaboutpaneloptioncredits?language=objc) を参照してください。

### `app.isEmojiPanelSupported()`

戻り値 `Boolean` - 現在の OS バージョンがネイティブの絵文字ピッカーを許可しているかどうか。

### `app.showEmojiPanel()` _macOS_ _Windows_

プラットフォームのネイティブの絵文字ピッカーを表示します。

### `app.startAccessingSecurityScopedResource(bookmarkData)` _mas_

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

### `app.enableSandbox()`

アプリで完全サンドボックスモードを有効にします。 これは、WebPreferences の `sandbox` フラグの値に関係なく、すべてのレンダラーがサンドボックスで起動されることを意味します。

このメソッドはアプリが ready になる前だけでしか呼び出すことができません。

### `app.isInApplicationsFolder()` _macOS_

戻り値 `Boolean` - アプリケーションが現在、システムのアプリケーションフォルダから実行されているかどうか。 `app.moveToApplicationsFolder()` と組み合わせて使ってください。

### `app.moveToApplicationsFolder([options])` _macOS_

* `options` Object (任意)
  * `conflictHandler` Function\<Boolean> (任意) - 移動に失敗したときの潜在的競合のハンドラ。
    * `conflictType` String - ハンドラーが遭遇した移動で起こった競合の種類。`exists` か `existsAndRunning` になります。`exists` は同じ名前のアプリがアプリケーションディレクトリに存在し、`existsAndRunning` は存在し且つ現在実行されていることを意味します。

戻り値 `Boolean` - 移動が成功したかどうか。 移動が成功した場合、アプリケーションは終了し、再起動されることに注意してください。

デフォルトでは確認ダイアログは表示されません。 ユーザに操作の確認をさせたい場合は、[`dialog`](dialog.md) API で実現できます。

**注:** このメソッドはユーザ以外が移動の失敗を引き起こした場合にもエラーをスローします。 例えば、ユーザが承認ダイアログをキャンセルした場合、このメソッドは false を返します。 コピーの実行に失敗した場合、このメソッドはエラーをスローします。 エラーのメッセージは意味の分かるものにする必要があり、何が間違っているのかを正確に知らせるようにしてください。

既定では、移動するアプリと同じ名前のアプリがアプリケーションディレクトリに存在し _実行されていない_ 場合、既存のアプリはゴミ箱に移動され、新たなアプリがその場所に移動します。 _実行されている_ 場合、既存の実行中のアプリはフォーカスを引き継ぎ、新たなアプリは自動的に終了します。 この挙動は、オプションの競合ハンドラを提供することで変更できます。この場合、ハンドラによって返されるブール値によって、移動の競合がデフォルトの動作で解決されるかどうかを決定します。  つまり、`false` を返すとそれ以上のアクションは行われなくなります。`true` を返すとデフォルトの動作になり、メソッドが続行されます。

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

### `app.isSecureKeyboardEntryEnabled()` _macOS_

戻り値 `Boolean` - `キーボード入力のセキュリティを保護` が有効になっているかどうか。

この API は既定で `false` を返します。

### `app.setSecureKeyboardEntryEnabled(enabled)` _macOS_

* `enabled` Boolean - `キーボード入力のセキュリティを保護` を有効にするかどうか

アプリケーションの `キーボード入力のセキュリティを保護` の有効化を設定します。

この API を利用すると、パスワードなどの重要な情報や機密情報を他のプロセスの傍受から防げます。

詳しくは [Apple のドキュメント](https://developer.apple.com/library/archive/technotes/tn2150/_index.html) を参照してください。

**注意:** `キーボード入力のセキュリティを保護` は必要なときにのみ有効にし、不要なときには無効にしてください。

## プロパティ

### `app.accessibilitySupportEnabled` _macOS_ _Windows_

この `Boolean` プロパティは、Chrome のアクセシビリティサポートが有効になっている場合は `true`、それ以外の場合は `false` になります。 このプロパティは、テキスト読み上げなどのアシスト技術を使っていることが検出された場合、`true` を返します。 手動でこのプロパティを `true` にセットして Chrome のアクセシビリティサポートを有効にすると、開発者はアプリケーション設定内でユーザにアクセシビリティスイッチを出すことができます。

詳細については [Chromium のアクセシビリティドキュメント](https://www.chromium.org/developers/design-documents/accessibility) を参照してください。 既定では無効です。

この API は `ready` イベントが発生した後で呼ばなければいけません。

**注:** アクセシビリティツリーをレンダリングすると、アプリのパフォーマンスに顕著な影響を与える可能性があります。 既定で有効にすべきではありません。

### `app.applicationMenu`

`Menu | null` 型のプロパティです。セットされている場合は [`Menu`](menu.md) を、それ以外は `null` を返します。 ユーザはこのプロパティに [Menu](menu.md) を渡すことができます。

### `app.badgeCount` _Linux_ _macOS_

`Integer` 型のプロパティです。現在のアプリのバッジカウントを返します。 カウントを `0` に設定するとバッジを非表示にします。

macOS では、ゼロ以外の整数を設定すると、ドックアイコンに表示されます。 Linux では Unity ランチャーでのみ動作します。

**注:** Unity ランチャーで動作させるには `.desktop` ファイルの存在が必要です。詳細は [デスクトップ環境への統合][unity-requirement] をお読みください。

**注意:** macOS でこのプロパティを有効にするには、アプリケーションに通知を表示する権限があるかどうか確認する必要があります。

### `app.commandLine` _読み出し専用_

[`CommandLine`](./command-line.md) オブジェクトです。Chromium が使用するコマンドライン引数の読み取りと操作ができます。

### `app.dock` _macOS_ _読み出し専用_

[`Dock`](./dock.md) `| undefined` 型のオブジェクトです。macOS のユーザーの Dock 内のアプリアイコンにおけるアクションを実行できます。

### `app.isPackaged` _読み出し専用_

アプリがパッケージされている場合は`true`、それ以外は `false` を返す `Boolean` プロパティ。 多くのアプリケーションでは、このプロパティを用いて開発版の環境と製品版の環境を区別できます。

### `app.name`

`String` 型のプロパティです。現在のアプリケーション名を示します。アプリケーションの `package.json` ファイル内にある名前になります。

通常、`package.json` の `name` フィールドは、npm のモジュール仕様に基づいて小文字だけの短い名前が設定されます。 通常、すべて大文字で始まるアプリケーションの名前となる `productName` フィールドも指定してください。Electronによって、`name` よりも優先されます。

### `app.userAgentFallback`

この `String` は Electron がグローバルフォールバックとして使用するユーザーエージェント文字列です。

これは、`webContents` または `session` レベルでユーザーエージェントが設定されていない場合に使用されるユーザーエージェントです。  アプリ全体が同じユーザーエージェントを持っていることを確認するのに役立ちます。  オーバーライドされた値が確実に使用されるように、アプリの初期化のできるだけ早い段階でカスタム値に設定してください。

### `app.allowRendererProcessReuse`

この `Boolean` が `true` のとき、ナビゲーションごとにレンダラープロセスが確実に再起動されるように Electron が設定している、そのオーバーライドを無効にします。  このプロパティの現在の既定値は `true` です。

これらのオーバーライドがデフォルトで無効になることを意図しているので、将来的にはこのプロパティは削除される予定です。  このプロパティはレンダラープロセス内で使用できるネイティブモジュールに影響します。  Electron がレンダラープロセスを再起動して、レンダラープロセスでネイティブモジュールを使用する方針についての詳細は、この [Tacking Issue](https://github.com/electron/electron/issues/18397) をご覧ください。

### `app.runningUnderRosettaTranslation` _macOS_ _Readonly_

`Boolean` 型で、`true` の場合アプリが [Rosetta 変換環境](https://en.wikipedia.org/wiki/Rosetta_(software)) 下で動作していることを示します。

このプロパティを使用すれば、x64 版を Rosetta で誤って実行している場合に、arm64 版のアプリケーションをダウンロードするようにユーザーに促すことができます。

[tasks]: https://msdn.microsoft.com/en-us/library/windows/desktop/dd378460(v=vs.85).aspx#tasks
[app-user-model-id]: https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx
[electron-forge]: https://www.electronforge.io/
[electron-packager]: https://github.com/electron/electron-packager
[CFBundleURLTypes]: https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html#//apple_ref/doc/uid/TP40009249-102207-TPXREF115
[LSCopyDefaultHandlerForURLScheme]: https://developer.apple.com/library/mac/documentation/Carbon/Reference/LaunchServicesReference/#//apple_ref/c/func/LSCopyDefaultHandlerForURLScheme
[handoff]: https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html
[activity-type]: https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType
[unity-requirement]: ../tutorial/desktop-environment-integration.md#unity-launcher
[mas-builds]: ../tutorial/mac-app-store-submission-guide.md
[Squirrel-Windows]: https://github.com/Squirrel/Squirrel.Windows
[JumpListBeginListMSDN]: https://msdn.microsoft.com/en-us/library/windows/desktop/dd378398(v=vs.85).aspx
[about-panel-options]: https://developer.apple.com/reference/appkit/nsapplication/1428479-orderfrontstandardaboutpanelwith?language=objc
