# session

> 管理浏览器会话、cookie、缓存、代理设置等。

进程：[主进程](../glossary.md#main-process)

` session ` 模块可用于创建新的 ` session ` 对象。

你还可以使用[`WebContents`](web-contents.md)的`session`属性或` session`模块访问现有页的`session`

```javascript
const { BrowserWindow } = require('electron')

let win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL('http://github.com')

const ses = win.webContents.session
console.log(ses.getUserAgent())
```

## 方法

` session ` 模块具有以下方法:

### `session.fromPartition(partition[, options])`

* `partition` String
* `options` Object (optional)
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
const { session } = require('electron')
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

<p spaces-before="0">调用<code>event.preventDefault()`方法，将会停止下载，并且在进程的next tick中，`item`将不再可用。

```javascript
const { session } = require('electron')
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
  * `error` Integer - The error code corresponding to the failure.

Callback会被调用，参数是session的当前缓存大小。

**[即将弃用](modernization/promisification.md)**

#### `ses.getCacheSize()`

Returns `Promise<Integer>` - the session's current cache size, in bytes.

#### `ses.clearCache(callback)`

* `callback` Function - 会在操作完成之后被调用。
  * `error` Integer - The error code corresponding to the failure.

清除session的HTTP缓存。

**[即将弃用](modernization/promisification.md)**

#### `ses.clearCache()`

Returns `Promise<void>` - resolves when the cache clear operation is complete.

清除session的HTTP缓存。

#### `ses.clearStorageData([options,] callback)`

* `options` Object (optional)
  * `origin` String - (可选项) 这个值应该按照 `window.location.origin` 的形式: `协议://主机名:端口`方式设置。
  * `storages` String[] (optional) - The types of storages to clear, can contain: `appcache`, `cookies`, `filesystem`, `indexdb`, `localstorage`, `shadercache`, `websql`, `serviceworkers`, `cachestorage`.
  * `quotas` String[] - (可选项) 要清除的配额类型, 包含: `temporary`, `persistent`, `syncable`。
* `callback` Function (optional) - 会在操作完成后被调用.

Clears the storage data for the current session.

**[即将弃用](modernization/promisification.md)**

#### `ses.clearStorageData([options])`

* `options` Object (optional)
  * `origin` String - (可选项) 这个值应该按照 `window.location.origin` 的形式: `协议://主机名:端口`方式设置。
  * `storages` String[] (optional) - The types of storages to clear, can contain: `appcache`, `cookies`, `filesystem`, `indexdb`, `localstorage`, `shadercache`, `websql`, `serviceworkers`, `cachestorage`.
  * `quotas` String[] - (可选项) 要清除的配额类型, 包含: `temporary`, `persistent`, `syncable`。

Returns `Promise<void>` - resolves when the storage data has been cleared.

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
* `http=foopy;socks=foopy2` - 对于http URL，用`foopy`作为HTTP协议代理，而其它所有URL则用` socks4://foopy2` 协议。

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

* `IP_LITERAL "/" PREFIX_LENGTH_IN_BITS`

   Match any URL that is to an IP literal that falls between the given range. IP range is specified using CIDR notation.

   例如: "192.168.1.1/16", "fefe:13::abc/33".

* `<local>`

   Match local addresses. The meaning of `<local>` is whether the host matches one of: "127.0.0.1", "::1", "localhost".

**[即将弃用](modernization/promisification.md)**

#### `ses.setProxy(config)`

* `config` Object
  * `pacScript` String - 与 PAC 文件关联的 URL。
  * `proxyRules` String - 表明要使用的代理规则。
  * `proxyBypassRules` String - 表明哪些 url 应绕过代理设置的规则。

Returns `Promise<void>` - Resolves when the proxy setting process is complete.

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
* `http=foopy;socks=foopy2` - 对于http URL，用`foopy`作为HTTP协议代理，而其它所有URL则用` socks4://foopy2` 协议。

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

* `IP_LITERAL "/" PREFIX_LENGTH_IN_BITS`

   Match any URL that is to an IP literal that falls between the given range. IP range is specified using CIDR notation.

   例如: "192.168.1.1/16", "fefe:13::abc/33".

* `<local>`

   Match local addresses. The meaning of `<local>` is whether the host matches one of: "127.0.0.1", "::1", "localhost".

#### `ses.resolveProxy(url, callback)`

* `url` URL
* `callback` Function
  * `proxy` String

Resolves the proxy information for `url`. The `callback` will be called with `callback(proxy)` when the request is performed.

**[即将弃用](modernization/promisification.md)**

#### `ses.resolveProxy(url)`

* `url` URL

Returns `Promise<string>` - Resolves with the proxy information for `url`.

#### `ses.setDownloadPath(path)`

* `path` String - 下载地址.

Sets download saving directory. By default, the download directory will be the `Downloads` under the respective app folder.

#### `ses.enableNetworkEmulation(options)`

* `options` Object
  * `offline` Boolean (optional) - Whether to emulate network outage. 默认值为 false.
  * `latency` Double (optional) - RTT in ms. Defaults to 0 which will disable latency throttling.
  * `downloadThroughput` Double (optional) - Download rate in Bps. Defaults to 0 which will disable download throttling.
  * `uploadThroughput` Double (optional) - Upload rate in Bps. Defaults to 0 which will disable upload throttling.

通过指定的配置为 `session` 模拟网络。

```javascript
// To emulate a GPRS connection with 50kbps throughput and 500 ms latency.
window.webContents.session.enableNetworkEmulation({
  latency: 500,
  downloadThroughput: 6400,
  uploadThroughput: 6400
})

// To emulate a network outage.
window.webContents.session.enableNetworkEmulation({ offline: true })
```

#### `ses.disableNetworkEmulation()`

Disables any network emulation already active for the `session`. Resets to the original network configuration.

#### `ses.setCertificateVerifyProc(proc)`

* `proc` Function
  * `request` Object
    * `hostname` String
    * `certificate` [证书](structures/certificate.md)
    * `verificationResult` String - chromium证书验证结果
    * `errorCode` Integer - 错误代码
  * `callback` Function
    * `verificationResult` Integer - Value can be one of certificate error codes from [here](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h). Apart from the certificate error codes, the following special codes can be used.
      * `-0` - 表示成功并禁用证书透明度验证
      * `-2` - 表示失败
      * `-3` - 使用chromium的验证结果

每当一个服务器证书请求验证，`proc` 将被这样 `proc(request, callback)` 调用，为 `session` 设置证书验证过程。 回调函数 `callback(0)` 接受证书，`callback(-2)` 驳回证书。

调用 ` setCertificateVerifyProc（null）`将恢复为默认证书验证过程。

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
  * `webContents` [WebContents](web-contents.md) - 请求权限的WebContents。  Please note that if the request comes from a subframe you should use `requestingUrl` to check the request origin.
  * `permission` String - 枚举 'media', 'geolocation', 'notifications', 'midiSysex', 'pointerLock', 'fullscreen', 'openExternal'.
  * `callback` Function
    * `permissionGranted` Boolean - 允许或拒绝该权限.
  * `details` Object - Some properties are only available on certain permission types.
    * `externalURL` String (Optional) - The url of the `openExternal` request.
    * `mediaTypes` String[] (Optional) - The types of media access being requested, elements can be `video` or `audio`
    * `requestingUrl` String - The last URL the requesting frame loaded
    * `isMainFrame` Boolean - Whether the frame making the request is the main frame

设置可用于响应 ` session ` 的权限请求的处理程序。 调用 ` callback(true)` 将允许该权限, 调用 ` callback(false)` 将拒绝它。 若要清除处理程序, 请调用 ` setPermissionRequestHandler (null) `。

```javascript
const { session } = require('electron')
session.fromPartition('some-partition').setPermissionRequestHandler((webContents, permission, callback) => {
  if (webContents.getURL() === 'some-host' && permission === 'notifications') {
    return callback(false) // denied.
  }

  callback(true)
})
```

#### `ses.setPermissionCheckHandler(handler)`

* `handler` Function<Boolean> | null
  * `webContents` [WebContents](web-contents.md) - WebContents checking the permission.  Please note that if the request comes from a subframe you should use `requestingUrl` to check the request origin.
  * `permission` String - Enum of 'media'.
  * `requestingOrigin` String - The origin URL of the permission check
  * `details` Object - Some properties are only available on certain permission types.
    * `securityOrigin` String - The security orign of the `media` check.
    * `mediaType` String - The type of media access being requested, can be `video`, `audio` or `unknown`
    * `requestingUrl` String - The last URL the requesting frame loaded
    * `isMainFrame` Boolean - Whether the frame making the request is the main frame

Sets the handler which can be used to respond to permission checks for the `session`. Returning `true` will allow the permission and `false` will reject it. To clear the handler, call `setPermissionCheckHandler(null)`.

```javascript
const { session } = require('electron')
session.fromPartition('some-partition').setPermissionCheckHandler((webContents, permission) => {
  if (webContents.getURL() === 'some-host' && permission === 'notifications') {
    return false // denied
  }

  return true
})
```

#### `ses.clearHostResolverCache(callback)`

* `callback` Function (optional) - 会在操作完成后被调用.

清除主机解析程序的缓存。

**[即将弃用](modernization/promisification.md)**

#### `ses.clearHostResolverCache()`

Returns `Promise<void>` - Resolves when the operation is complete.

清除主机解析程序的缓存。

#### `ses.allowNTLMCredentialsForDomains(domains)`

* `domains` String - 一个逗号分隔的服务器列表, 用于收集已经启用身份验证的服务器。

动态设置是否始终为 HTTP NTLM 发送凭据或协商身份验证。

```javascript
const { session } = require('electron')
// 以 "example.com"、"foobar.com"、"baz" 结尾的 url 用于身份验证。
session.defaultSession.allowNTLMCredentialsForDomains('*example.com, *foobar.com, *baz')

// 所有的 url 都可以用作身份验证
session.defaultSession.allowNTLMCredentialsForDomains('*')
```

#### `ses.setUserAgent(userAgent[, acceptLanguages])`

* `userAgent` String
* `acceptLanguages` String (可选)

覆盖当前会话的 `userAgent` 和 `acceptLanguages`.

`acceptLanguages` 必须是用逗号分隔的语言代码列表，例如 `"en-US,fr,de,ko,zh-CN,ja"`.

这不会影响现有的`WebContents`, 并且每个`WebContents`都可以使用 `webContents.setUserAgent`重写会话范围的user agent。

#### `ses.getUserAgent()`

返回 `String` - 当前会话的 user agent.

#### `ses.getBlobData(identifier, callback)`

* `identifier` String - 有效的 UUID.
* `callback` Function
  * `result` Buffer - Blob 数据.

**[即将弃用](modernization/promisification.md)**

#### `ses.getBlobData(identifier)`

* `identifier` String - 有效的 UUID.

Returns `Promise<Buffer>` - resolves with blob data.

#### `ses.createInterruptedDownload(options)`

* `options` Object
  * `path` String - 下载的绝对路径.
  * `urlChain` String[] - 完整的 url 下载地址.
  * `mimeType` String (可选)
  * `offset` Integer - 下载的开始范围.
  * `length` Integer - 下载的总长度。
  * `lastModified` String - 上次修改的标头值。
  * `eTag` String - ETag 标头值。
  * `startTime` Double (optional) - 下载的时间是从 UNIX 时代以来的秒数开始的。

允许从上一个 `Session` 恢复 ` cancelled ` 或 ` interrupted ` 下载。 该 API 将生成一个 [ DownloadItem ](download-item.md), 可使用 [ will-download ](#event-will-download) 事件进行访问。 [ DownloadItem ](download-item.md) 将不具有与之关联的任何 ` WebContents `, 并且初始状态将为 ` interrupted `。 只有在 [ DownloadItem ](download-item.md) 上调用 ` resume ` API 时, 才会启动下载。

#### `ses.clearAuthCache(options, callback)`

* `options` ([RemovePassword](structures/remove-password.md) | [RemoveClientCertificate](structures/remove-client-certificate.md))
* `callback` Function - 会在操作完成之后被调用。

清除会话的 HTTP 身份验证缓存。

**[即将弃用](modernization/promisification.md)**

#### `ses.clearAuthCache(options)` _(deprecated)_

* `options` ([RemovePassword](structures/remove-password.md) | [RemoveClientCertificate](structures/remove-client-certificate.md))

Returns `Promise<void>` - resolves when the session’s HTTP authentication cache has been cleared.

#### `ses.clearAuthCache()`

Returns `Promise<void>` - resolves when the session’s HTTP authentication cache has been cleared.

#### `ses.setPreloads(preloads)`

* `preloads` String[] - 数组，该数组由所有需要进行预加载的脚本的绝对路径组成。

Adds scripts that will be executed on ALL web contents that are associated with this session just before normal `preload` scripts run.

#### `ses.getPreloads()`

返回 `String[]` 返回一个数组，这个数组由已经注册过的预加载脚本的路径组成。

### 实例属性

以下属性在` Session </ 0>实例上可用：</p>

<h4 spaces-before="0"><code>ses.cookies`</h4>

此会话的 [ cookie ](cookies.md) 对象。

#### `ses.webRequest`

此会话的 [WebRequest](web-request.md) 对象。

#### `ses.protocol`

此会话的 [ 协议 ](protocol.md) 对象。

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

A [NetLog](net-log.md) object for this session.

```javascript
const { app, session } = require('electron')

app.on('ready', async function () {
  const netLog = session.fromPartition('some-partition').netLog
  netLog.startLogging('/path/to/net-log')
  // After some network events
  const path = await netLog.stopLogging()
  console.log('Net-logs written to', path)
})
```
