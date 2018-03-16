# session

> 管理浏览器会话、cookie、缓存、代理设置等。

进程：[主进程](../glossary.md#main-process)

` session ` 模块可用于创建新的 ` session ` 对象。

你还可以使用[`WebContents`](web-contents.md)的`session`属性或` session`模块访问现有页的`session`

```javascript
const {BrowserWindow} = require('electron')

let win = new BrowserWindow({width: 800, height: 600})
win.loadURL('http://github.com')

const ses = win.webContents.session
console.log(ses.getUserAgent())
```

## 方法

` session ` 模块具有以下方法:

### `session.fromPartition(partition[, options])`

* `partition` String
* `选项` Object (可选) 
  * `cache` Boolean - 是否可以使用缓存.

Returns `Session` - 根据`partition`字符串产生的session实例。 当这里已存在一个`Session`具有相同的`partition`, 它将被返回; 否则一个新的`Session`实例将根据`options`被创建。

如果 `partition` 以 `persist:`开头, 该页面将使用持续的 session，并在所有页面生效，且使用同一个`partition`. 如果没有 `persist:` 前缀, 页面将使用 in-memory session. 如果没有设置`partition`，app 将返回默认的session。

要根据`options`创建`Session`，你需要确保`Session`的`partition`在之前从未被使用。 没有办法修改一个已存在的`Session`对象的`options`。

## 属性

` session ` 模块具有以下方法:

### `session.defaultSession`

一个`Session`对象，该应用程序的默认session对象。

## 类: Session

> 获取和设置Session的属性。

进程：[主进程](../glossary.md#main-process)

你可以创建一个 `Session`对象在`session`模块中。

```javascript
const {session} = require('electron')
const ses = session.fromPartition('persist:name')
console.log(ses.getUserAgent())
```

### 实例事件

以下事件会在` Session `实例触发。

#### Instance Events

* `event` Event
* `item` [DownloadItem](download-item.md)
* `webContents` [WebContents](web-contents.md)

当 Electron 刚要在`webContents`中下载`item<0>的时候触发。</p>

<p>调用<code>event.preventDefault()`方法，将会停止下载，并且在进程的next tick中，`item`将不再可用。

```javascript
const {session} = require('electron')
session.defaultSession.on('will-download', (event, item, webContents) => {
  event.preventDefault()
  require('request')(item.getURL(), (data) => {
    require('fs').writeFileSync('/somewhere', data)
  })
})
```

### 实例方法

在`Session`实例对象中，有以下方法:

#### `ses.getCacheSize(callback)`

* `callback` Function 
  * `size` Integer 缓存大小（单位：bytes）

Callback会被调用，参数是session的当前缓存大小。

#### `ses.clearCache(callback)`

* 回调函数`callback`会在操作完成之后被调用。

清除session的HTTP缓存。

#### `ses.clearStorageData([options, callback])`

* `选项` Object (可选) 
  * `origin` String - (可选项) 这个值应该按照 `window.location.origin` 的形式: `协议://主机名:端口`
  * `storages` String[] - (可选项) 要清除的存储类型，可以为以下几种: `appcache`, `cookies`, `filesystem`, `indexdb`, `localstorage`, `shadercache`, `websql`, `serviceworkers`
  * `quotas` String[] - (可选) 要清除的配额类型, 可以包含: `temporary`, `persistent`, `syncable`.
* `callback` Function (optional) - 会在操作完成后被调用.

清除Web storage的数据。

#### `ses.flushStorageData()`

写入任何未写入DOMStorage数据到磁盘.

#### `ses.setProxy(config, callback)`

* `config` Object 
  * `pacScript` String - 与 PAC 文件关联的 URL。
  * `proxyRules` String - 表明要使用的代理规则。
  * `proxyBypassRules` String - 表明哪些 url 应绕过代理设置的规则。
* `callback` Function - 会在操作完成之后被调用。

代理设置

当`pacScript`和`proxyRules`一起提供时, `proxyRules` 选项会被忽略, 会使用`pacScript`配置。

`proxyRules` 要遵循以下规则:

```sh
proxyRules = schemeProxies[";"<schemeProxies>]
schemeProxies = [<urlScheme>"="]<proxyURIList>
urlScheme = "http" | "https" | "ftp" | "socks"
proxyURIList = <proxyURL>[","<proxyURIList>]
proxyURL = [<proxyScheme>"://"]<proxyHost>[":"<proxyPort>]
```

例如：

* `http=foopy:80;ftp=foopy2` - Use HTTP proxy `foopy:80` for `http://` URLs, and HTTP proxy `foopy2:80` for `ftp://` URLs.
* `foopy:80` - Use HTTP proxy `foopy:80` for all URLs.
* `foopy:80,bar,direct://` - Use HTTP proxy `foopy:80` for all URLs, failing over to `bar` if `foopy:80` is unavailable, and after that using no proxy.
* `socks4://foopy` - Use SOCKS v4 proxy `foopy:1080` for all URLs.
* `http=foopy,socks5://bar.com` - Use HTTP proxy `foopy` for http URLs, and fail over to the SOCKS5 proxy `bar.com` if `foopy` is unavailable.
* `http=foopy,direct://` - Use HTTP proxy `foopy` for http URLs, and use no proxy if `foopy` is unavailable.
* `http=foopy;socks=foopy2` - Use HTTP proxy `foopy` for http URLs, and use `socks4://foopy2` for all other URLs.

`proxyBypassRules`是一个用逗号分隔的规则列表, 如下所述:

* `[ URL_SCHEME "://" ] HOSTNAME_PATTERN [ ":" <port> ]`
  
  与 HOSTNAME_PATTERN 模式匹配的所有主机名。
  
  例如: "foobar.com", "*foobar.com", "*.foobar.com", "*foobar.com:99", "https://x.*.y.com:99"
  
  * `"." HOSTNAME_SUFFIX_PATTERN [ ":" PORT ]`
    
    匹配特定域名后缀。
    
    例如： ".google.com", ".com", "http://.google.com"

* `[ SCHEME "://" ] IP_LITERAL [ ":" PORT ]`
  
  匹配 IP 地址文本的 url。
  
  例如: "127.0.1", "[0:0::1]", "[::1]", "http://[::1]:99"

* `IP_LITERAL "/" PREFIX_LENGHT_IN_BITS`
  
  匹配位于给定范围之间的 IP 文本的任何 URL。IP 范围是使用 CIDR 表示法指定的。
  
  例如: "192.168.1.1/16", "fefe:13::abc/33".

* `<local>`
  
  匹配本地地址。local 的含义是，是否匹配其中一个: "127.0.0.1", "::1", "localhost".

#### `ses.resolveProxy(url, callback)`

* `url` URL
* `callback` Function - 回调函数 
  * `proxy` String

解析 `url` 的代理信息。执行被请求时, 将使用 `callback(proxy)` 来调用 `callback`。

#### `ses.setDownloadPath(path)`

* `path` String - 下载地址

设置下载保存目录。默认情况下, 下载目录将是相应应用程序文件夹下的 `Downloads`。

#### `ses.enableNetworkEmulation(options)`

* `选项` Object 
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

* `proc` Function - 回调函数 
  * `request` Object 
    * `hostname` String
    * `certificate` [证书](structures/certificate.md)
    * `verificationResult` String - Verification result from chromium.
    * `errorCode` Integer - Error code.
  * `callback` Function - 回调函数 
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

* `callback` Function (optional) - 会在操作完成后被调用.

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

* `选项` Object 
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
* `callback` Function (optional) - 会在操作完成后被调用

Clears the session’s HTTP authentication cache.

### 实例属性

The following properties are available on instances of `Session`:

#### `ses.cookies`

此会话的 [ cookie ](cookies.md) 对象。

#### `ses.webRequest`

此会话的 [WebRequest](web-request.md) 对象。

#### `ses.protocol`

此会话的 [ 协议 ](protocol.md) 对象。

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