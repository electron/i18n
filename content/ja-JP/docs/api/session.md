# session

> ブラウザーセッション、クッキー、キャッシュ、プロキシの設定などを管理します。

プロセス: [Main](../glossary.md#main-process)

`session` モジュールは、新しい `session` オブジェクトを作成するのに使用できます。

[`WebContents`](web-contents.md) の `session` プロパティ、または `session` モジュールから、既存のページの `session` にアクセスすることもできます 。

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL('http://github.com')

const ses = win.webContents.session
console.log(ses.getUserAgent())
```

## メソッド

`session` モジュールには以下のメソッドがあります。

### `session.fromPartition(partition[, options])`

* `partition` String
* `options` Object (任意)
  * `cache` Boolean - キャッシュを有効にするかどうか。

戻り値 `Session` - `partition` 文字列からの Session のインスタンス。 同じ `partition` を持つ既存の `session` が存在する場合は、それが返されます。 それ以外の場合は、`options` で新しい `session` インスタンスが作成されます。

`partition` が `persist:` 始まりの場合、ページはアプリの全ページで利用可能な永続的なセッションを同じ `partition` で使用します。 `persist:` プレフィックスがない場合、ページは、インメモリセッションを使用します。 `partition` が空の場合は、アプリのデフォルトのセッションが返されます。

`options` で `Session` を作成するには、以前に `partition` との `Session` が使用されていないことを確認する必要があります。 既存の `Session` オブジェクトの `options` を変更する方法はありません。

## プロパティ

`session` モジュールには以下のプロパティがあります。

### `session.defaultSession`

アプリのデフォルトの `Session` オブジェクト。

## クラス: Session

> セッションのプロパティを取得し、設定します。

プロセス: [Main](../glossary.md#main-process)

`session` モジュールでは、`Session` オブジェクトを作成できます。

```javascript
const { session } = require('electron')
const ses = session.fromPartition('persist:name')
console.log(ses.getUserAgent())
```

### インスタンスイベント

`Session` のインスタンスでは、以下のイベントが利用できます。

#### イベント: 'will-download'

戻り値:

* `event` Event
* `item` [DownloadItem](download-item.md)
* `webContents` [WebContents](web-contents.md)

Electron が `webContents` 内で `item` をダウンロードするときに発生します。

`event.preventDefault()` を呼び出すと、ダウンロードをキャンセルし、`item` はプロセスの次のティックから使用できなくなります。

```javascript
const { session } = require('electron')
session.defaultSession.on('will-download', (event, item, webContents) => {
  event.preventDefault()
  require('request')(item.getURL(), (data) => {
    require('fs').writeFileSync('/somewhere', data)
  })
})
```

#### イベント: 'extension-loaded'

戻り値:

* `event` Event
* `extension` [Extension](structures/extension.md)

拡張機能が読み込まれた後に発生します。 これは、拡張機能が "有効な" 拡張機能のセットに追加されるたびに発生します。 これは以下のものが含まれます。

* `Session.loadExtension` から拡張機能が読み込まれるとき。
* 拡張機能が再読み込みされるとき。
  * クラッシュによって。
  * 拡張機能が要求したことで ([`chrome.runtime.reload()`](https://developer.chrome.com/extensions/runtime#method-reload))。

#### イベント: 'extension-unloaded'

戻り値:

* `event` Event
* `extension` [Extension](structures/extension.md)

拡張機能が取り除かれた後に発生します。 これは `Session.removeExtension` が呼ばれたときに発生します。

#### イベント: 'extension-ready'

戻り値:

* `event` Event
* `extension` [Extension](structures/extension.md)

拡張機能が読み込まれ、必要なブラウザの状態がすべて初期化され、拡張機能のバックグラウンドページの開始をサポートするようになった後に発生します。

#### イベント: 'preconnect'

戻り値:

* `event` Event
* `preconnectUrl` String - レンダラーによって事前接続に要求されている URL。
* `allowCredentials` Boolean - レンダラーが接続に資格情報を含めることを要求している場合は true です (詳細については、[仕様](https://w3c.github.io/resource-hints/#preconnect) を参照してください)。

一般的に [リソースヒント](https://w3c.github.io/resource-hints/) が原因で、レンダリングプロセスが URL への事前接続を要求したときに生成されます。

#### イベント: 'spellcheck-dictionary-initialized'

戻り値:

* `event` Event
* `languageCode` String - 辞書ファイルの言語コード

hunspell 辞書ファイルの初期化に成功したときに発生します。 これはファイルをダウンロードした後に発生します。

#### イベント: 'spellcheck-dictionary-download-begin'

戻り値:

* `event` Event
* `languageCode` String - 辞書ファイルの言語コード

hunspell 辞書ファイルのダウンロードが始まったときに発生します

#### イベント: 'spellcheck-dictionary-download-success'

戻り値:

* `event` Event
* `languageCode` String - 辞書ファイルの言語コード

hunspell 辞書ファイルのダウンロードに成功したときに発生します

#### イベント: 'spellcheck-dictionary-download-failure'

戻り値:

* `event` Event
* `languageCode` String - 辞書ファイルの言語コード

hunspell 辞書ファイルのダウンロードが失敗したときに発生します。  失敗の詳細は、netlog を収集してダウンロードリクエストを調べる必要があります。

#### イベント: 'select-serial-port' _実験的_

戻り値:

* `event` Event
* `portList` [SerialPort[]](structures/serial-port.md)
* `webContents` [WebContents](web-contents.md)
* `callback` Function
  * `portId` String

`navigator.serial.requestPort` の呼び出し時にシリアルポートを選択する必要がある場合に発生します。 `callback` は選んだ `portId` で呼び出されなければなりません。空の文字列を `callback` に渡すとリクエストがキャンセルされます。  さらに、[ses.setPermissionCheckHandler(handler)](#sessetpermissioncheckhandlerhandler) を `serial` パーミッションで使用することで `navigator.serial` のパーミッションを管理できます。

これは実験的な機能であるため、デフォルトでは無効になっています。  この機能を有効にするには、`--enable-features=ElectronSerialChooser` コマンドラインスイッチを使用する必要があります。  加えて、これは実験的な Chromium の機能なので、BrowserWindow を開くとき`webPreferences` プロパティに `enableBlinkFeatures: 'Serial'` を設定する必要があります。

```javascript
const { app, BrowserWindow } = require('electron')

let win = null
app.commandLine.appendSwitch('enable-features', 'ElectronSerialChooser')

app.whenReady().then(() => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      enableBlinkFeatures: 'Serial'
    }
  })
  win.webContents.session.on('select-serial-port', (event, portList, webContents, callback) => {
    event.preventDefault()
    const selectedPort = portList.find((device) => {
      return device.vendorId === '9025' && device.productId === '67'
    })
    if (!selectedPort) {
      callback('')
    } else {
      callback(selectedPort.portId)
    }
  })
})
```

#### イベント: 'serial-port-added' _Experimental_

戻り値:

* `event` Event
* `port` [SerialPort](structures/serial-port.md)
* `webContents` [WebContents](web-contents.md)

`navigator.serial.requestPort` が呼び出され新しいシリアルポートが利用可能になった場合に、`select-serial-port` が発生した後に発生します。  例えば、このイベントは新しい USB デバイスが接続されたときに発生します。

#### イベント: 'serial-port-removed' _実験的_

戻り値:

* `event` Event
* `port` [SerialPort](structures/serial-port.md)
* `webContents` [WebContents](web-contents.md)

`navigator.serial.requestPort` が呼び出されシリアルポートが削除された場合に、`select-serial-port` が発生した後に発生します。  例えば、このイベントは USB デバイスが取り除かれたときに発生します。

### インスタンスメソッド

`Session` のインスタンスでは、以下のメソッドが利用できます。

#### `ses.getCacheSize()`

戻り値 `Promise<Integer>` - バイト単位の、session の現在のキャッシュサイズ。

#### `ses.clearCache()`

戻り値 `Promise<void>` - キャッシュクリア操作が完了すると実行されます。

セッションの HTTP キャッシュをクリアします。

#### `ses.clearStorageData([options])`

* `options` Object (任意)
  * `origin` String (任意) - `window.location.origin` の表記の `scheme://host:port` に従わなければいけません。
  * `storages` String[] (任意) - クリアするストレージの種類。`appcache`, `cookies`, `filesystem`, `indexdb`, `localstorage`, `shadercache`, `websql`, `serviceworkers`, `cachestorage` を含めることができます。 指定しない場合は、全種類のストレージをクリアします。
  * `quotas` String[] (任意) - クリアするクォータの種類。`temporary`, `persistent`, `syncable` を含むことができます。 指定しない場合は、全てのクオータをクリアします。

戻り値 `Promise<void>` - ストレージデータがクリアされると実行されます。

#### `ses.flushStorageData()`

未書き込みの DOM ストレージのデータをディスクに書き込みます。

#### `ses.setProxy(config)`

* `config` Object
  * `mode` String (任意) - そのプロキシのモードです。 `direct`、`auto_detect`、`pac_script`、`fixed_servers`、`system` のうちの一つであるべきです。 指定しない場合は、他の指定オプションに基づいて自動決定されます。
    * `direct` direct モードでは、すべての接続はプロキシを介さずに直接作成されます。
    * `auto_detect` auto_detect モードでは、プロキシの設定は http://wpad/wpad.dat でダウンロードできる PAC スクリプトによって決定されます。
    * `pac_script` pac_script モードでは、プロキシの設定は `pacScript` で指定された URL から取得される PAC スクリプトによって決定されます。 これは `pacScript` が指定されている場合のデフォルトモードです。
    * `fixed_servers` fixed_servers モードでは、プロキシの設定を `proxyRules` で指定します。 これは `proxyRules` が指定されている場合のデフォルトモードです。
    * `system` system モードでは、プロキシ構成をオペレーティングシステムから取得します。 system モードはプロキシ構成を設定しない場合とは異なりますのでご注意ください。 後者の場合、プロキシ設定に影響を与えるコマンドラインオプションがない場合にのみ、 Electron はシステム設定にフォールバックします。
  * `pacScript` String (任意) - PAC ファイルに関連付けられた URL。
  * `proxyRules` String (任意) - 使用するプロキシを示すルール。
  * `proxyBypassRules` String (任意) - プロキシ設定をバイパスする URL を示すルール。

戻り値 `Promise<void>` - プロキシ設定処理が完了すると実行されます。

プロキシ設定を設定します。

`mode` を指定せずに `pacScript` と`proxyRules` をどちらも一緒に指定した場合、`proxyRules` は オプションは無視され `pacScript` の設定が適用されます。

以前のプロキシでプールされたソケットが将来のリクエストで再利用されるのを防ぐには、現在フライト中の接続を閉じるために `ses.closeAllConnections` が必要でしょう。

`proxyRules` は以下のルールに従う必要があります。

```sh
proxyRules = schemeProxies[";"<schemeProxies>]
schemeProxies = [<urlScheme>"="]<proxyURIList>
urlScheme = "http" | "https" | "ftp" | "socks"
proxyURIList = <proxyURL>[","<proxyURIList>]
proxyURL = [<proxyScheme>"://"]<proxyHost>[":"<proxyPort>]
```

例:

* `http=foopy:80;ftp=foopy2` - `http://` URL には HTTP プロキシ `foopy:80` を、`ftp://` URL には HTTP プロキシ `foopy2:80` を使用する。
* `foopy:80` - すべての URL に `foopy:80` HTTP プロキシを使用する。
* `foopy:80,bar,direct://` - すべての URL に `foopy:80` HTTP プロキシを使用する。 `foopy:80` が使用できない場合は `bar` にフェイルオーバーし、その後はプロキシを使用しません。
* `socks4://foopy` - すべての URL に SOCKS 4 プロキシ `foopy:1080` を使用する。
* `http=foopy,socks5://bar.com` - HTTP の URL には HTTP プロキシ `foopy` を使用し、`foopy` が使用できない場合は SOCKS 5 プロキシ `bar.com` にフェイルオーバーします。
* `http=foopy,socks5://bar.com` - HTTP の URL には HTTP プロキシ `foopy` を使用し、`foopy` が使用できない場合はプロキシを使用しません。
* `http=foopy;socks=foopy2` - HTTP の URL には HTTP プロキシ `foopy` を、ほかの URLには `socks4://foopy2` を使用します。

`proxyBypassRules` は以下に説明されているコンマ区切りのルールのリストです。

* `[ URL_SCHEME "://" ] HOSTNAME_PATTERN [ ":" <port> ]`

   HOSTNAME_PATTERN パターンに一致するすべてのホスト名のマッチ。

   例: "foobar.com", "*foobar.com", "*.foobar.com", "*foobar.com:99", "https://x.*.y.com:99"

* `"." HOSTNAME_SUFFIX_PATTERN [ ":" PORT ]`

   特定のドメインサフィックスのマッチ。

   例: ".google.com", ".com", "http://.google.com"

* `[ SCHEME "://" ] IP_LITERAL [ ":" PORT ]`

   IP アドレスリテラルである URL のマッチ。

   例: "127.0.1", "[0:0::1]", "[::1]", "http://[::1]:99"

* `IP_LITERAL "/" PREFIX_LENGTH_IN_BITS`

   指定された範囲内の IP リテラルに一致する URL のマッチ。 IP の範囲は CIDR 表記で指定します。

   例: "192.168.1.1/16", "fefe:13::abc/33".

* `<local>`

   ローカルアドレスのマッチ。 `<local>` の意味は、ホストが "127.0.0.1"、"::1"、"localhost" のいずれかに一致するかどうかです。

#### `ses.resolveProxy(url)`

* `url` URL

戻り値 `Promise<String>` - `url` のプロキシ情報で実行されます。

#### `ses.forceReloadProxyConfig()`

戻り値 `Promise<void>` - プロキシサービスのすべての内部状態がリセットされたときに解決します。すでに利用可能な場合は最新のプロキシ設定が再適用されます。 プロキシモードが `pac_script` の場合、再び `pacScript` から PAC スクリプトが取得されます。

#### `ses.setDownloadPath(path)`

* `path` String - ダウンロード位置.

ダウンロードの保存ディレクトリを設定します。 デフォルトでは、ダウンロードディレクトリは各アプリフォルダの下の `ダウンロード (Downloads)` になります。

#### `ses.enableNetworkEmulation(options)`

* `options` Object
  * `offline` Boolean (任意) - ネットワークの停止をエミュレートするかどうか。 省略値は、false です。
  * `latency` Double (任意) - RTT ミリ秒。 省略値は 0 で、このときレイテンシのスロットルは無効化されます。
  * `downloadThroughput` Double (任意) - 下りレート Bps。 省略値は 0 で、このときダウンロードのスロットルは無効化されます。
  * `uploadThroughput` Double (任意) - 上りレート Bps。 省略値は 0 で、このときアップロードのスロットルは無効化されます。

`session` の指定された構成でネットワークをエミュレートします。

```javascript
// 50kbps のスループットと 500ms の待ち時間で GPRS 接続をエミュレートする。
window.webContents.session.enableNetworkEmulation({
  latency: 500,
  downloadThroughput: 6400,
  uploadThroughput: 6400
})

// ネットワークの停止をエミュレートする。
window.webContents.session.enableNetworkEmulation({ offline: true })
```

#### `ses.preconnect(options)`

* `options` Object
  * `url` String - 事前接続する URL。 ソケットの開通に関係しているのはオリジンのみです。
  * `numSockets` Number (任意) - 事前接続するソケット数。 1 から 6 にしてください。 デフォルトは 1.

指定された数のソケットをオリジンに事前接続します。

#### `ses.closeAllConnections()`

戻り値 `Promise<void>` - すべての接続が閉じられた時に解決されます。

**注:** 現在フライト中のすべてのリクエストが終了/失敗します。

#### `ses.disableNetworkEmulation()`

`session` に対して既にアクティブなネットワークエミュレーションを無効にします。 元のネットワーク構成にリセットします。

#### `ses.setCertificateVerifyProc(proc)`

* `proc` Function | null
  * `request` Object
    * `hostname` String
    * `certificate` [Certificate](structures/certificate.md)
    * `validatedCertificate` [Certificate](structures/certificate.md)
    * `verificationResult` String - Chromium からの認証結果。
    * `errorCode` Integer - エラーコード。
  * `callback` Function
    * `verificationResult` Integer - [こちら](https://source.chromium.org/chromium/chromium/src/+/master:net/base/net_error_list.h) の証明書エラーコードのうち一つの値を取ります。 証明書エラーコードの他に、以下の特殊コードを取ることがあります。
      * `0` - 成功を示し、証明書の透明性の検証を無効にします。
      * `-2` - 失敗を示します。
      * `-3` - Chromium からの認証結果を使用します。

`session` の証明書検証プロセスを設定し、サーバー証明書の検証が要求されるたびに`proc` を `proc(request, callback)` で呼びます。 `callback(0)` を呼ぶと証明書を承認し、`callback(-2)` を呼ぶとそれを拒否します。

`setCertificateVerifyProc(null)` を呼び出すと、デフォルトの証明書検証プロシージャに戻ります。

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

win.webContents.session.setCertificateVerifyProc((request, callback) => {
  const { hostname } = request
  if (hostname === 'github.com') {
    callback(0)
  } else {
    callback(-2)
  }
})
```

> **注意:** このプロシージャの結果は、ネットワークサービスによってキャッシュされます。

#### `ses.setPermissionRequestHandler(handler)`

* `handler` Function | null
  * `webContents` [WebContents](web-contents.md) - 権限を要求している WebContents。  リクエストがサブフレームからのものである場合、リクエストのオリジンを確認するためには `requestingUrl` を使用する必要があることに注意してください。
  * `permission` String - 要求されたパーミッションのタイプ。
    * `clipboard-read` - クリップボードからの読み取りアクセスを要求する。
    * `media` - カメラ、マイク、スピーカーなどのメディアデバイスへのアクセスを要求する。
    * `display-capture` - 画面キャプチャへのアクセスをリクエストします。
    * `mediaKeySystem` - DRM で保護されたコンテンツへのアクセスを要求します。
    * `geolocation` - ユーザーの現在地へのアクセスを要求する。
    * `notifications` - 通知の作成とユーザーのシステムトレイに表示する機能を要求します。
    * `midi` - `webmidi` API で MIDI アクセスを要求します。
    * `midiSysex` - `webmidi` API でシステム専用メッセージの使用を要求する。
    * `pointerLock` - 入力方法としてマウスの動きを直接解釈するよう要求する。 詳細は[こちら ](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API) をクリックしてください。
    * `fullscreen` - アプリがフルスクリーンモードになるよう要求する。
    * `openExternal` - 外部アプリケーションでリンクを開くように要求する。
    * `unknown` - 認識されない認可リクエスト
  * `callback` Function
    * `permissionGranted` Boolean - 権限の許可か拒否.
  * `details` Object - このプロパティの一部は、特定の権限タイプでのみ使用できます。
    * `externalURL` String (任意) - `openExternal` リクエストの URL。
    * `mediaTypes` String[] (任意) - 要求されている、複数のメディアアクセスのタイプ。要素は `video` か `audio` にできます
    * `requestingUrl` String - リクエストしているフレームが読み込んだ最後の URL
    * `isMainFrame` Boolean - リクエストしたフレームがメインフレームかどうか

`session` の、権限の要求に応答するために使用できるハンドラを設定します。 `callback(true)` を呼ぶと権限が許可され `callback(false)` を呼ぶと拒否されます。 ハンドラをクリアするには、`setPermissionRequestHandler(null)` を呼びます。  注意として、完全な認可処理にするには `setPermissionCheckHandler` も実装しなければなりません。 ほとんどのウェブ API は権限の確認を行い、確認が拒否されている場合は認可のリクエストを行います。

```javascript
const { session } = require('electron')
session.fromPartition('some-partition').setPermissionRequestHandler((webContents, permission, callback) => {
  if (webContents.getURL() === 'some-host' && permission === 'notifications') {
    return callback(false) // 拒否。
  }

  callback(true)
})
```

#### `ses.setPermissionCheckHandler(handler)`

* `handler` Function\<Boolean> | null
  * `webContents` ([WebContents](web-contents.md) | null) - 権限を確認している WebContents  リクエストがサブフレームからのものである場合、リクエストのオリジンを確認するためには `requestingUrl` を使用する必要があることに注意してください。  権限を確認しているのがクロスオリジンのサブフレームの場合、このハンドラには `null` の webContents が渡されます。  `embeddingOrigin` と `requestingOrigin` を使用して、所有しているフレームと要求しているフレームがそれぞれどのオリジンにあるかを判断する必要があります。
  * `permission` String - 権限確認の種別です。  有効な値は `midiSysex`、`notifications`、`geolocation`、`media`、`mediaKeySystem`、`midi`、`pointerLock`、`fullscreen`、`openExternal`、`serial` です。
  * `requestingOrigin` String - 権限チェックのオリジン URL
  * `details` Object - このプロパティの一部は、特定の権限タイプでのみ使用できます。
    * `embeddingOrigin` String (任意) - 権限の確認をしたフレームのオリジン。  権限の確認を行うクロスオリジンのサブフレームでのみ設定されます。
    * `securityOrigin` String (任意) - `media` の確認でのセキュリティオリジン。
    * `mediaType` String (任意) - 要求されたメディアアクセスの型で、`video`、`audio` か `unknown` になります。
    * `requestingUrl` String (任意) - リクエストしているフレームが読み込んだ最後の URL.  権限の確認を行うクロスオリジンのサブフレームでは提供されません。
    * `isMainFrame` Boolean - リクエストしたフレームがメインフレームかどうか

`session` の、権限のチェックに応答するために使用できるハンドラを設定します。 `true`を返すと権限を許可し、`false` を返すとそれを拒否します。  注意として、完全な認可処理にするには `setPermissionRequestHandler` も実装しなければなりません。 ほとんどのウェブ API は権限の確認を行い、確認が拒否されている場合は認可のリクエストを行います。 ハンドラをクリアするには、` setPermissionCheckHandler(null)` を呼びます。

```javascript
const { session } = require('electron')
const url = require('url')
session.fromPartition('some-partition').setPermissionCheckHandler((webContents, permission, requestingOrigin) => {
  if (new URL(requestingOrigin).hostname === 'some-host' && permission === 'notifications') {
    return true // 認可
  }

  return false // 拒否
})
```

#### `ses.clearHostResolverCache()`

戻り値 `Promise<void>` - 操作が完了すると実行されます。

ホスト解決のキャッシュをクリアします。

#### `ses.allowNTLMCredentialsForDomains(domains)`

* `domains` String - 統合認証が有効であるサーバーのコンマ区切りのリスト。

HTTP NTLM またはネゴシエート認証の資格情報を常に送信するかどうかを動的に設定します。

```javascript
const { session } = require('electron')
// 統合認証に、`example.com`、`foobar.com`、`baz`
// で終わる URL を考えます。
session.defaultSession.allowNTLMCredentialsForDomains('*example.com, *foobar.com, *baz')

// 統合認証に、すべての URL を考えます。
session.defaultSession.allowNTLMCredentialsForDomains('*')
```

#### `ses.setUserAgent(userAgent[, acceptLanguages])`

* `userAgent` String
* `acceptLanguages` String (任意)

このセッションの `userAgent` と `acceptLanguages` をオーバーライドします。

`acceptLanguages` は、言語コードのカンマ区切りリスト (例: `"en-US, fr, de, ko, zh-CN, ja"`) でなければなりません。

これは既存の `WebContents` には影響しません。それぞれの `WebContents` は `webContents.setUserAgent` を使用してセッション全体のユーザーエージェントをオーバーライドできます。

#### `ses.isPersistent()`

戻り値 `Boolean` - このセッションが持続的なものであるかどうか。 `BrowserWindow` のデフォルトの `webContents` セッションは持続的です。 パーティションからセッションを作成する場合、`persist:` で始まるセッションは持続化され、他のセッションは一時的なものになります。

#### `ses.getUserAgent()`

戻り値 `String` - このセッションのユーザエージェント。

#### `ses.setSSLConfig(config)`

* `config` Object
  * `minVersion` String (任意) - `tls1`、`tls1.1`、`tls1.2`、`tls1.3` のいずれかにできます。 これはリモートサーバーに接続する際に許可する最小の SSL バージョンです。 省略値は `tls1` です。
  * `maxVersion` String (任意) - `tls1.2` か `tls1.3` にできます。 これはリモートサーバーに接続する際に許可する最大の SSL バージョンです。 省略値は `tls1.3` です。
  * `disabledCipherSuites` Integer[] (任意) - ネット組み込みポリシーで無効化されたものに加えて、使用を禁止すべき暗号スートを明示したリスト。 0xAABB のようなリテラルの形式をサポートしています。ここで AA は `cipher_suite[0]` であり、BB は `cipher_suite[1]` です。これは RFC 2246 のセクション 7.4.1.2 で定義されています。 識別不可かつパース可能な暗号スートの形式であっても、エラーは返しません。 例: TLS_RSA_WITH_RC4_128_MD5 を無効にするには、0x0004 を指定し、TLS_ECDSA_WITH_RC4_128_SHA を無効にするには 0xC002 を指定します。 注意として、TLSv1.3 の暗号化方式はこの仕組みで無効にできません。

セッションの SSL 構成を設定します。 それ以降のネットワークリクエストではすべて新しい構成を使用します。 既存のネットワーク接続 (WebSocket 接続など) は終了しませんが、プール内の古いソケットは新しい接続に再利用されません。

#### `ses.getBlobData(identifier)`

* `identifier` String - 有効な UUID。

戻り値 `Promise<Buffer>` - blob データで実行されます。

#### `ses.downloadURL(url)`

* `url` String

`url` にあるリソースのダウンロードを初期化します。 この API は、[will-download](#event-will-download) イベントでアクセスできる [DownloadItem](download-item.md) を生成します。

**注釈:** これは [`webContents.downloadURL`](web-contents.md#contentsdownloadurlurl) と異なり、ページのオリジンに関連するセキュリティチェックを実行しません。

#### `ses.createInterruptedDownload(options)`

* `options` Object
  * `path` String - ダウンロードの絶対パス。
  * `urlChain` String[] - ダウンロードの完全な URL チェーン。
  * `mimeType` String (任意)
  * `offset` Integer - ダウンロードの範囲の始端。
  * `length` Integer - ダウンロードの長さ。
  * `lastModified` String (任意) - ヘッダの最終更新日の値。
  * `eTag` String (任意) - ヘッダの ETag の値。
  * `startTime` Double (任意) - ダウンロードが開始されたときの UNIX エポックからの秒数。

以前の `Session` からの、`cancelled` または `interrupted` なダウンロードの再開を許可します。 APIは、[will-download](#event-will-download) イベントでアクセスできる [DownloadItem](download-item.md) を生成します。 [DownloadItem](download-item.md) はそれに関連付けられた `WebContents` を持たず、初期状態は `interrupted` です。 [DownloadItem](download-item.md) 上の `resume` API を呼ぶことでのみ、ダウンロードが開始されます。

#### `ses.clearAuthCache()`

戻り値 `Promise<void>` - session の HTTP 認証キャッシュがクリアされると実行されます。

#### `ses.setPreloads(preloads)`

* `preloads` String[] - プリロードスクリプトへの絶対パスの配列

通常の `preload` スクリプトが実行される直前に、このセッションに関連するすべてのウェブコンテンツで実行されるスクリプトを追加します。

#### `ses.getPreloads()`

戻り値 `String[]` - 登録されているプリロードスクリプトへのパスの配列。

#### `ses.setSpellCheckerEnabled(enable)`

* `enable` Boolean

組み込みスペルチェッカーを有効にするかどうかを設定します。

#### `ses.isSpellCheckerEnabled()`

戻り値 `Boolean` - 組み込みスペルチェッカーが有効化されているかどうか。

#### `ses.setSpellCheckerLanguages(languages)`

* `languages` String[] - スペルチェッカーを有効にする言語コードの配列。

組み込みスペルチェッカーは、ユーザーが入力している言語を自動的に検出しません。  スペルチェッカーが単語を正しくチェックするには、言語コードの配列でこの API を呼び出す必要があります。  `ses.availableSpellCheckerLanguages` プロパティで、サポートしている言語コードのリストを取得できます。

**注:** macOS では、OS のスペルチェッカーが使用されて言語が自動的に検出されます。  この API は、macOS では何もしません。

#### `ses.getSpellCheckerLanguages()`

戻り値 `String[]` - スペルチェッカーが有効になっている言語コードの配列。  このリストが空の場合、スペルチェッカーは `en-US` の使用へフォールバックします。  この設定が空のリストである場合、Electron は起動時に既定で現在の OS ロケールをこの設定に追加しようとします。  この設定は再起動後も持続します。

**注意:** macOS では、OS のスペルチェッカーが使用されて独自の言語リストを返します。  この API は、macOS では何もしません。

#### `ses.setSpellCheckerDictionaryDownloadURL(url)`

* `url` String - Electron が hunspell 辞書をダウンロードする基底 URL。

デフォルトでは、Electron は Chromium CDN から hunspell 辞書をダウンロードします。  この動作をオーバーライドする場合は、この API を使用して、独自ホスト版の hunspell 辞書を辞書ダウンローダーが指すようにすることができます。  ホストする必要があるファイルのリリースごとに `hunspell_dictionaries.zip` ファイルをファイルサーバーで公開します。ファイルサーバーは **大文字と小文字を区別しない** ようにして、元通りの大文字小文字のファイルが入った ZIP ファイルと、全て小文字のファイル名にしたものの二通りを用意する必要があります。

`hunspell_dictionaries.zip` が `https://example.com/dictionaries/language-code.bdic` に存在して利用できる場合、`ses.setSpellCheckerDictionaryDownloadURL('https://example.com/dictionaries/')` を呼び出すことになります。  末尾のスラッシュに注意してください。  辞書への URL は、`${url}${filename}` の形式になります。

**注:** macOS では、OS のスペルチェッカーが使用されるため辞書ファイルをダウンロードしません。  この API は、macOS では何もしません。

#### `ses.listWordsInSpellCheckerDictionary()`

戻り値 `Promise<String[]>` - アプリのカスタム辞書の全単語の配列。 ディスクから完全な辞書が読み込まれたときに解決されます。

#### `ses.addWordToSpellCheckerDictionary(word)`

* `word` String - 辞書に追加したい単語

戻り値 `Boolean` - 単語がカスタム辞書に正常に書き込まれたかどうか。 この API は、持続的でない (一時的な) セッションでは動作しません。

**注釈:** macOS と Windows 10 では、この単語は OS カスタム辞書にも書き込まれます

#### `ses.removeWordFromSpellCheckerDictionary(word)`

* `word` String - 辞書から削除したい単語

戻り値 `Boolean` - 単語がカスタム辞書から正常に削除されたかどうか。 この API は、持続的でない (一時的な) セッションでは動作しません。

**注釈:** macOS と Windows 10 では、この単語は OS カスタム辞書からも削除されます

#### `ses.loadExtension(path[, options])`

* `path` String - 解凍されていない Chrome 拡張機能を含んだディレクトリへのパス
* `options` Object (任意)
  * `allowFileAccess` Boolean - 拡張機能が `file://` プロトコルでローカルファイルを読み込んで `file://` ページにコンテンツスクリプトを注入することを許可するかどうか。 これは、例えば `file://` URL でデベロッパー ツール拡張機能を読み込むために必要です。 省略値は false 。

戻り値 `Promise<Extension>` - 拡張機能が読み込まれたときに解決されます。

このメソッドは、拡張機能を読み込めなかった場合に例外を発生させます。 拡張機能のインストール時に警告が発生した場合 (Electron が未サポートの API を拡張機能が要求した場合など) は、コンソールにログが記録されます。

注意として、Electron は Chrome 拡張機能の API のすべてをサポートしていません。 サポート内容の詳細については、[サポートしている拡張機能 API](extensions.md#supported-extensions-apis) を参照してください。

注意として、以前のバージョンの Electron では、読み込まれた拡張機能は以降のアプリケーション実行のために記憶されます。 現在はそうなっていません。拡張機能を読み込みたい場合は、アプリを起動するたびに `loadExtension` を呼び出す必要があります。

```js
const { app, session } = require('electron')
const path = require('path')

app.on('ready', async () => {
  await session.defaultSession.loadExtension(
    path.join(__dirname, 'react-devtools'),
    // allowFileAccess は、file:// URL でのデベロッパー ツール拡張機能の読み込みに必要です。
    { allowFileAccess: true }
  )
  // 注意として、React デベロッパー ツール拡張機能を使用するにはそのコピーを
  // ダウンロードして解凍する必要があります。
})
```

この API は、パッケージした (.crx) 拡張機能の読み込みをサポートしていません。

**注:** このAPIは `app` モジュールの `ready` イベントが発生する前には呼び出すことはできません。

**注:** インメモリ (一時的な) セッションでの拡張機能読み込みはサポートされておらず、エラーが送出されます。

#### `ses.removeExtension(extensionId)`

* `extensionId` String - 削除する拡張機能の ID

拡張機能を取り除きます。

**注:** このAPIは `app` モジュールの `ready` イベントが発生する前には呼び出すことはできません。

#### `ses.getExtension(extensionId)`

* `extensionId` String - クエリする拡張機能の ID

戻り値 `Extension` | `null` - 指定した ID である読み込まれた拡張機能。

**注:** このAPIは `app` モジュールの `ready` イベントが発生する前には呼び出すことはできません。

#### `ses.getAllExtensions()`

戻り値 `Extension[]` - 読み込まれた拡張機能のリスト。

**注:** このAPIは `app` モジュールの `ready` イベントが発生する前には呼び出すことはできません。

#### `ses.getStoragePath()`

`String | null` 型で、このセッションのデータが保存されているディスクのファイルシステムの絶対パスを示します。  インメモリセッションの場合、これは `null` を返します。

### インスタンスプロパティ

`Session` のインスタンスには以下のプロパティがあります。

#### `ses.availableSpellCheckerLanguages` _読み出し専用_

この `String []` 配列は利用可能な既知のすべてのスペルチェッカー言語で構成されます。  この配列にない言語コードを `setSpellCheckerLanguages` API に提供すると、エラーが発生します。

#### `ses.spellCheckerEnabled`

`Boolean` 型で、組み込みスペルチェッカーが有効かどうかを示します。

#### `ses.storagePath` _読み出し専用_

`String | null` 型で、このセッションのデータが保存されているディスクのファイルシステムの絶対パスを示します。  インメモリセッションの場合、これは `null` を返します。

#### `ses.cookies` _読み出し専用_

このセッションの [`Cookies`](cookies.md) オブジェクト。

#### `ses.serviceWorkers` _読み出し専用_

このセッションの [`ServiceWorkers`](service-workers.md) オブジェクト。

#### `ses.webRequest` _読み出し専用_

このセッションの [`WebRequest`](web-request.md) オブジェクト。

#### `ses.protocol` _読み出し専用_

このセッションの [`Protocol`](protocol.md) オブジェクト。

```javascript
const { app, session } = require('electron')
const path = require('path')

app.whenReady().then(() => {
  const protocol = session.fromPartition('some-partition').protocol
  if (!protocol.registerFileProtocol('atom', (request, callback) => {
    const url = request.url.substr(7)
    callback({ path: path.normalize(`${__dirname}/${url}`) })
  })) {
    console.error('Failed to register protocol')
  }
})
```

#### `ses.netLog` _読み出し専用_

このセッションの [`NetLog`](net-log.md) オブジェクト。

```javascript
const { app, session } = require('electron')

app.whenReady().then(async () => {
  const netLog = session.fromPartition('some-partition').netLog
  netLog.startLogging('/path/to/net-log')
  // ネットワークイベントの後
  const path = await netLog.stopLogging()
  console.log('Net-logs written to', path)
})
```
