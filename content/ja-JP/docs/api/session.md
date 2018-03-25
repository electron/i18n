# session

> ブラウザーセッション、クッキー、キャッシュ、プロキシの設定などを管理します。

プロセス: [Main](../glossary.md#main-process)

`session` モジュールは、新しい `session` オブジェクトを作成するのに使用できます。

[`WebContents`](web-contents.md) の `session` プロパティ、または `session` モジュールから、既存のページの `session` にアクセスすることもできます 。

```javascript
const {BrowserWindow} = require('electron')

let win = new BrowserWindow({width: 800, height: 600})
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
const {session} = require('electron')
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
const {session} = require('electron')
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

callback はセッションの現在のキャッシュサイズで呼ばれます。

#### `ses.clearCache(callback)`

* `callback` Function - 操作が完了したときに呼ばれる

セッションの HTTP キャッシュをクリアします。

#### `ses.clearStorageData([options, callback])`

* `options` Object (任意) 
  * `origin` String - (任意) `window.location.origin` の表記の `scheme://host:port` に従わなければいけません。
  * `storages` String[] - (任意) ストレージをクリアするタイプ。`appcache`、`cookies`、`filesystem`、`indexdb`、`localstorage`、`shadercache`、`websql`、`serviceworkers` を含めます。
  * `quotas` String[] - (任意) クォータをクリアするタイプ。`temporary`、`persistent`、`syncable` を含めます。
* `callback` Function (任意) - 操作が完了したときに呼ばれる。

ウェブストレージのデータをクリアします。

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
  
  Match all hostnames that match the pattern HOSTNAME_PATTERN.
  
  Examples: "foobar.com", "*foobar.com", "*.foobar.com", "*foobar.com:99", "https://x.*.y.com:99"
  
  * `"." HOSTNAME_SUFFIX_PATTERN [ ":" PORT ]`
    
    Match a particular domain suffix.
    
    Examples: ".google.com", ".com", "http://.google.com"

* `[ SCHEME "://" ] IP_LITERAL [ ":" PORT ]`
  
  Match URLs which are IP address literals.
  
  Examples: "127.0.1", "[0:0::1]", "[::1]", "http://[::1]:99"

* `IP_LITERAL "/" PREFIX_LENGHT_IN_BITS`
  
  Match any URL that is to an IP literal that falls between the given range. IP range is specified using CIDR notation.
  
  Examples: "192.168.1.1/16", "fefe:13::abc/33".

* `<local>`
  
  Match local addresses. The meaning of `<local>` is whether the host matches one of: "127.0.0.1", "::1", "localhost".

#### `ses.resolveProxy(url, callback)`

* `url` URL
* `callback` Function 
  * `proxy` String

Resolves the proxy information for `url`. The `callback` will be called with `callback(proxy)` when the request is performed.

#### `ses.setDownloadPath(path)`

* `path` String - The download location

Sets download saving directory. By default, the download directory will be the `Downloads` under the respective app folder.

#### `ses.enableNetworkEmulation(options)`

* `options` Object 
  * `offline` Boolean (optional) - Whether to emulate network outage. Defaults to false.
  * `latency` Double (optional) - RTT in ms. Defaults to 0 which will disable latency throttling.
  * `downloadThroughput` Double (optional) - Download rate in Bps. Defaults to 0 which will disable download throttling.
  * `uploadThroughput` Double (optional) - Upload rate in Bps. Defaults to 0 which will disable upload throttling.

Emulates network with the given configuration for the `session`.

```javascript
// To emulate a GPRS connection with 50kbps throughput and 500 ms latency.
window.webContents.session.enableNetworkEmulation({
  latency: 500,
  downloadThroughput: 6400,
  uploadThroughput: 6400
})

// To emulate a network outage.
window.webContents.session.enableNetworkEmulation({offline: true})
```

#### `ses.disableNetworkEmulation()`

Disables any network emulation already active for the `session`. Resets to the original network configuration.

#### `ses.setCertificateVerifyProc(proc)`

* `proc` Function 
  * `request` Object 
    * `hostname` String
    * `certificate` [Certificate](structures/certificate.md)
    * `verificationResult` String - Verification result from chromium.
    * `errorCode` Integer - Error code.
  * `callback` Function 
    * `verificationResult` Integer - Value can be one of certificate error codes from [here](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h). Apart from the certificate error codes, the following special codes can be used. 
      * `` - Indicates success and disables Certificate Transparency verification.
      * `-2` - Indicates failure.
      * `-3` - Uses the verification result from chromium.

Sets the certificate verify proc for `session`, the `proc` will be called with `proc(request, callback)` whenever a server certificate verification is requested. Calling `callback(0)` accepts the certificate, calling `callback(-2)` rejects it.

Calling `setCertificateVerifyProc(null)` will revert back to default certificate verify proc.

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()

win.webContents.session.setCertificateVerifyProc((request, callback) => {
  const {hostname} = request
  if (hostname === 'github.com') {
    callback(0)
  } else {
    callback(-2)
  }
})
```

#### `ses.setPermissionRequestHandler(handler)`

* `handler` Function | null 
  * `webContents` [WebContents](web-contents.md) - WebContents requesting the permission.
  * `permission` String - Enum of 'media', 'geolocation', 'notifications', 'midiSysex', 'pointerLock', 'fullscreen', 'openExternal'.
  * `callback` Function 
    * `permissionGranted` Boolean - Allow or deny the permission

Sets the handler which can be used to respond to permission requests for the `session`. Calling `callback(true)` will allow the permission and `callback(false)` will reject it. To clear the handler, call `setPermissionRequestHandler(null)`.

```javascript
const {session} = require('electron')
session.fromPartition('some-partition').setPermissionRequestHandler((webContents, permission, callback) => {
  if (webContents.getURL() === 'some-host' && permission === 'notifications') {
    return callback(false) // denied.
  }

  callback(true)
})
```

#### `ses.clearHostResolverCache([callback])`

* `callback` Function (任意) - 操作が完了したときに呼ばれる。

Clears the host resolver cache.

#### `ses.allowNTLMCredentialsForDomains(domains)`

* `domains` String - A comma-seperated list of servers for which integrated authentication is enabled.

Dynamically sets whether to always send credentials for HTTP NTLM or Negotiate authentication.

```javascript
const {session} = require('electron')
// consider any url ending with `example.com`, `foobar.com`, `baz`
// for integrated authentication.
session.defaultSession.allowNTLMCredentialsForDomains('*example.com, *foobar.com, *baz')

// consider all urls for integrated authentication.
session.defaultSession.allowNTLMCredentialsForDomains('*')
```

#### `ses.setUserAgent(userAgent[, acceptLanguages])`

* `userAgent` String
* `acceptLanguages` String (optional)

Overrides the `userAgent` and `acceptLanguages` for this session.

The `acceptLanguages` must a comma separated ordered list of language codes, for example `"en-US,fr,de,ko,zh-CN,ja"`.

This doesn't affect existing `WebContents`, and each `WebContents` can use `webContents.setUserAgent` to override the session-wide user agent.

#### `ses.getUserAgent()`

Returns `String` - The user agent for this session.

#### `ses.getBlobData(identifier, callback)`

* `identifier` String - Valid UUID.
* `callback` Function 
  * `result` Buffer - Blob data.

Returns `Blob` - The blob data associated with the `identifier`.

#### `ses.createInterruptedDownload(options)`

* `options` オブジェクト 
  * `path` String - Absolute path of the download.
  * `urlChain` String[] - Complete URL chain for the download.
  * `mimeType` String (optional)
  * `offset` Integer - Start range for the download.
  * `length` Integer - Total length of the download.
  * `lastModified` String - Last-Modified header value.
  * `eTag` String - ETag header value.
  * `startTime` Double (optional) - Time when download was started in number of seconds since UNIX epoch.

Allows resuming `cancelled` or `interrupted` downloads from previous `Session`. The API will generate a [DownloadItem](download-item.md) that can be accessed with the [will-download](#event-will-download) event. The [DownloadItem](download-item.md) will not have any `WebContents` associated with it and the initial state will be `interrupted`. The download will start only when the `resume` API is called on the [DownloadItem](download-item.md).

#### `ses.clearAuthCache(options[, callback])`

* `options` ([RemovePassword](structures/remove-password.md) | [RemoveClientCertificate](structures/remove-client-certificate.md))
* `callback` Function (optional) - Called when operation is done

Clears the session’s HTTP authentication cache.

### インスタンスプロパティ

The following properties are available on instances of `Session`:

#### `ses.cookies`

A [Cookies](cookies.md) object for this session.

#### `ses.webRequest`

A [WebRequest](web-request.md) object for this session.

#### `ses.protocol`

A [Protocol](protocol.md) object for this session.

```javascript
const {app, session} = require('electron')
const path = require('path')

app.on('ready', function () {
  const protocol = session.fromPartition('some-partition').protocol
  protocol.registerFileProtocol('atom', function (request, callback) {
    var url = request.url.substr(7)
    callback({path: path.normalize(`${__dirname}/${url}`)})
  }, function (error) {
    if (error) console.error('Failed to register protocol')
  })
})
```