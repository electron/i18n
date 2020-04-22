# session

> ブラウザーセッション、クッキー、キャッシュ、プロキシの設定などを管理します。

プロセス: [Main](../glossary.md#main-process)

`session` モジュールは、新しい `session` オブジェクトを作成するのに使用できます。

[`WebContents`](web-contents.md) の `session` プロパティ、または `session` モジュールから、既存のページの `session` にアクセスすることもできます 。

```javascript
const { BrowserWindow } = require('electron')

let win = new BrowserWindow({ width: 800, height: 600 })
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

### インスタンスメソッド

`Session` のインスタンスでは、以下のメソッドが利用できます。

#### `ses.getCacheSize(callback)`

* `callback` Function
  * `size` Integer - キャッシュサイズのバイト数。
  * `error` Integer - 失敗に対応するエラーコード。

callback はセッションの現在のキャッシュサイズで呼ばれます。

**[非推奨予定](modernization/promisification.md)**

#### `ses.getCacheSize()`

戻り値 `Promise<Integer>` - バイト単位の、session の現在のキャッシュサイズ。

#### `ses.clearCache(callback)`

* `callback` Function - 操作が完了したときに呼ばれる。
  * `error` Integer - 失敗に対応するエラーコード。

セッションの HTTP キャッシュをクリアします。

**[非推奨予定](modernization/promisification.md)**

#### `ses.clearCache()`

戻り値 `Promise<void>` - キャッシュクリア操作が完了すると実行されます。

セッションの HTTP キャッシュをクリアします。

#### `ses.clearStorageData([options,] callback)`

* `options` Object (任意)
  * `origin` String (任意) - `window.location.origin` の表記の `scheme://host:port` に従わなければいけません。
  * `storages` String[] (任意) - クリアするストレージの種類。`appcache`, `cookies`, `filesystem`, `indexdb`, `localstorage`, `shadercache`, `websql`, `serviceworkers`, `cachestorage` を含めることができます。
  * `quotas` String[] (任意) - クリアするクォータの種類。`temporary`, `persistent`, `syncable` を含むことができます。
* `callback` Function (任意) - 操作が完了したときに呼ばれる。

現在の session のストレージデータを消去します。

**[非推奨予定](modernization/promisification.md)**

#### `ses.clearStorageData([options])`

* `options` Object (任意)
  * `origin` String (任意) - `window.location.origin` の表記の `scheme://host:port` に従わなければいけません。
  * `storages` String[] (任意) - クリアするストレージの種類。`appcache`, `cookies`, `filesystem`, `indexdb`, `localstorage`, `shadercache`, `websql`, `serviceworkers`, `cachestorage` を含めることができます。
  * `quotas` String[] (任意) - クリアするクォータの種類。`temporary`, `persistent`, `syncable` を含むことができます。

戻り値 `Promise<void>` - ストレージデータがクリアされると実行されます。

#### `ses.flushStorageData()`

未書き込みの DOM ストレージのデータをディスクに書き込みます。

#### `ses.setProxy(config, callback)`

* `config` Object
  * `pacScript` String - PAC ファイルに関連付けられたURL。
  * `proxyRules` String - 使用するプロキシを示すルール。
  * `proxyBypassRules` String - プロキシ設定をバイパスするURLを示すルール。
* `callback` Function - 操作が完了したときに呼ばれる。

プロキシ設定を設定します。

`pacScript` と `proxyRules` が一緒に提供されると、`proxyRules` オプションは無視され、`pacScript` コンフィグが適用されます。

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

   Match any URL that is to an IP literal that falls between the given range. IP range is specified using CIDR notation.

   例: "192.168.1.1/16", "fefe:13::abc/33".

* `<local>`

   Match local addresses. The meaning of `<local>` is whether the host matches one of: "127.0.0.1", "::1", "localhost".

**[非推奨予定](modernization/promisification.md)**

#### `ses.setProxy(config)`

* `config` Object
  * `pacScript` String - PAC ファイルに関連付けられたURL。
  * `proxyRules` String - 使用するプロキシを示すルール。
  * `proxyBypassRules` String - プロキシ設定をバイパスするURLを示すルール。

戻り値 `Promise<void>` - プロキシ設定処理が完了すると実行されます。

プロキシ設定を設定します。

`pacScript` と `proxyRules` が一緒に提供されると、`proxyRules` オプションは無視され、`pacScript` コンフィグが適用されます。

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

   Match any URL that is to an IP literal that falls between the given range. IP range is specified using CIDR notation.

   例: "192.168.1.1/16", "fefe:13::abc/33".

* `<local>`

   Match local addresses. The meaning of `<local>` is whether the host matches one of: "127.0.0.1", "::1", "localhost".

#### `ses.resolveProxy(url, callback)`

* `url` URL
* `callback` Function
  * `proxy` String

Resolves the proxy information for `url`. The `callback` will be called with `callback(proxy)` when the request is performed.

**[非推奨予定](modernization/promisification.md)**

#### `ses.resolveProxy(url)`

* `url` URL

戻り値 `Promise<string>` - `url` のプロキシ情報で実行されます。

#### `ses.setDownloadPath(path)`

* `path` String - ダウンロード位置.

Sets download saving directory. By default, the download directory will be the `Downloads` under the respective app folder.

#### `ses.enableNetworkEmulation(options)`

* `options` Object
  * `offline` Boolean (optional) - Whether to emulate network outage. 省略値は、false です。
  * `latency` Double (optional) - RTT in ms. Defaults to 0 which will disable latency throttling.
  * `downloadThroughput` Double (optional) - Download rate in Bps. Defaults to 0 which will disable download throttling.
  * `uploadThroughput` Double (optional) - Upload rate in Bps. Defaults to 0 which will disable upload throttling.

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

#### `ses.disableNetworkEmulation()`

Disables any network emulation already active for the `session`. Resets to the original network configuration.

#### `ses.setCertificateVerifyProc(proc)`

* `proc` Function
  * `request` Object
    * `hostname` String
    * `certificate` [Certificate](structures/certificate.md)
    * `verificationResult` String - Chromium からの認証結果。
    * `errorCode` Integer - エラーコード。
  * `callback` Function
    * `verificationResult` Integer - Value can be one of certificate error codes from [here](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h). Apart from the certificate error codes, the following special codes can be used.
      * `0` - 成功を示し、証明書の透明性の検証を無効にします。
      * `-2` - 失敗を示します。
      * `-3` - Chromium からの認証結果を使用します。

`session` の証明書検証プロセスを設定し、サーバー証明書の検証が要求されるたびに`proc` を `proc(request, callback)` で呼びます。 `callback(0)` を呼ぶと証明書を承認し、`callback(-2)` を呼ぶとそれを拒否します。

`setCertificateVerifyProc(null)` を呼び出すと、デフォルトの証明書検証プロシージャに戻ります。

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow()

win.webContents.session.setCertificateVerifyProc((request, callback) => {
  const { hostname } = request
  if (hostname === 'github.com') {
    callback(0)
  } else {
    callback(-2)
  }
})
```

#### `ses.setPermissionRequestHandler(handler)`

* `handler` Function | null
  * `webContents` [WebContents](web-contents.md) - 権限を要求している WebContents。  リクエストがサブフレームからのものである場合、リクエストのオリジンを確認するためには `requestingUrl` を使用する必要があることに注意してください。
  * `permission` String - 'media'、'geolocation'、'notifications'、'midiSysex'、'pointerLock'、'fullscreen'、'openExternal' のいずれか。
  * `callback` Function
    * `permissionGranted` Boolean - 権限の許可か拒否.
  * `details` Object - Some properties are only available on certain permission types.
    * `externalURL` String (任意) - `openExternal` リクエストの URL。
    * `mediaTypes` String[] (任意) - 要求されている、複数のメディアアクセスのタイプ。要素は `video` か `audio` にできます
    * `requestingUrl` String - リクエストしているフレームが読み込んだ最後の URL
    * `isMainFrame` Boolean - リクエストしたフレームがメインフレームかどうか

`session` の、権限の要求に応答するために使用できるハンドラを設定します。 `callback(true)` を呼ぶと権限が許可され `callback(false)` を呼ぶと拒否されます。 ハンドラをクリアするには、`setPermissionRequestHandler(null)` を呼びます。

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

* `handler` Function<Boolean> | null
  * `webContents` [WebContents](web-contents.md) - 権限を確認する WebContents。  リクエストがサブフレームからのものである場合、リクエストのオリジンを確認するためには `requestingUrl` を使用する必要があることに注意してください。
  * `permission` String - 'media' の列挙。
  * `requestingOrigin` String - 権限チェックのオリジン URL
  * `details` Object - Some properties are only available on certain permission types.
    * ` securityOrigin ` String - `media` チェックのセキュリティオリジン。
    * `mediaType` String - 要求されたメディアアクセスの型で、`video`、`audio` か `unknown` になります。
    * `requestingUrl` String - リクエストしているフレームが読み込んだ最後の URL
    * `isMainFrame` Boolean - リクエストしたフレームがメインフレームかどうか

`session` の、権限のチェックに応答するために使用できるハンドラを設定します。 `true`を返すと権限を許可し、`false` を返すとそれを拒否します。 ハンドラをクリアするには、` setPermissionCheckHandler(null)` を呼びます。

```javascript
const { session } = require('electron')
session.fromPartition('some-partition').setPermissionCheckHandler((webContents, permission) => {
  if (webContents.getURL() === 'some-host' && permission === 'notifications') {
    return false // 拒否
  }

  return true
})
```

#### `ses.clearHostResolverCache(callback)`

* `callback` Function (任意) - 操作が完了したときに呼ばれる。

ホスト解決のキャッシュをクリアします。

**[非推奨予定](modernization/promisification.md)**

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

#### `ses.getUserAgent()`

戻り値 `String` - このセッションのユーザエージェント。

#### `ses.getBlobData(identifier, callback)`

* `identifier` String - 有効な UUID。
* `callback` Function
  * `result` Buffer - Blob データ。

**[非推奨予定](modernization/promisification.md)**

#### `ses.getBlobData(identifier)`

* `identifier` String - 有効な UUID。

戻り値 `Promise<Buffer>` - blob データで実行されます。

#### `ses.createInterruptedDownload(options)`

* `options` Object
  * `path` String - ダウンロードの絶対パス。
  * `urlChain` String[] - ダウンロードの完全な URL チェーン。
  * `mimeType` String (任意)
  * `offset` Integer - ダウンロードの範囲の始端。
  * `length` Integer - ダウンロードの長さ。
  * `lastModified` String - ヘッダの最終更新日の値。
  * `eTag` String - ヘッダの ETag の値。
  * `startTime` Double (任意) - ダウンロードが開始されたときの UNIX エポックからの秒数。

以前の `Session` からの、`cancelled` または `interrupted` なダウンロードの再開を許可します。 APIは、[will-download](#event-will-download) イベントでアクセスできる [DownloadItem](download-item.md) を生成します。 [DownloadItem](download-item.md) はそれに関連付けられた `WebContents` を持たず、初期状態は `interrupted` です。 [DownloadItem](download-item.md) 上の `resume` API を呼ぶことでのみ、ダウンロードが開始されます。

#### `ses.clearAuthCache(options, callback)`

* `options` ([RemovePassword](structures/remove-password.md) | [RemoveClientCertificate](structures/remove-client-certificate.md))
* `callback` Function - 操作が完了したときに呼ばれる。

セッションの HTTP 認証キャッシュをクリアします。

**[非推奨予定](modernization/promisification.md)**

#### `ses.clearAuthCache(options)` _(非推奨)_

* `options` ([RemovePassword](structures/remove-password.md) | [RemoveClientCertificate](structures/remove-client-certificate.md))

戻り値 `Promise<void>` - session の HTTP 認証キャッシュがクリアされると実行されます。

#### `ses.clearAuthCache()`

戻り値 `Promise<void>` - session の HTTP 認証キャッシュがクリアされると実行されます。

#### `ses.setPreloads(preloads)`

* `preloads` String[] - プリロードスクリプトへの絶対パスの配列

通常の `preload` スクリプトが実行される直前に、このセッションに関連するすべてのウェブコンテンツで実行されるスクリプトを追加します。

#### `ses.getPreloads()`

戻り値 `String[]` - 登録されているプリロードスクリプトへのパスの配列。

### インスタンスプロパティ

`Session` のインスタンスには以下のプロパティがあります。

#### `ses.cookies`

このセッションの [Cookies](cookies.md) オブジェクト。

#### `ses.webRequest`

このセッションの [WebRequest](web-request.md) オブジェクト。

#### `ses.protocol`

このセッションの [Protocol](protocol.md) オブジェクト。

```javascript
const { app, session } = require('electron')
const path = require('path')

app.on('ready', function () {
  const protocol = session.fromPartition('some-partition').protocol
  protocol.registerFileProtocol('atom', function (request, callback) {
    var url = request.url.substr(7)
    callback({ path: path.normalize(`${__dirname}/${url}`) })
  }, function (error) {
    if (error) console.error('Failed to register protocol')
  })
})
```

#### `ses.netLog`

このセッションの [NetLog](net-log.md) オブジェクト。

```javascript
const { app, session } = require('electron')

app.on('ready', async function () {
  const netLog = session.fromPartition('some-partition').netLog
  netLog.startLogging('/path/to/net-log')
  // いくつかのネットワークイベントのあと
  const path = await netLog.stopLogging()
  console.log('Net-logs written to', path)
})
```
