# session

> 管理浏览器会话、cookie、缓存、代理设置等。

进程：[主进程](../glossary.md#main-process)

` session ` 模块可用于创建新的 ` session ` 对象。

你还可以使用[`WebContents`](web-contents.md)的`session`属性或` session`模块访问现有页的`session`

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL('http://github.com')

const ses = win.webContents.session
console.log(ses.getUserAgent())
```

## 方法

` session ` 模块具有以下方法:

### `session.fromPartition(partition[, options])`

* `partition` String
* `options` Object (可选)
  * `cache` Boolean - 是否可以使用缓存.

Returns `Session` - 根据`partition`字符串产生的session实例。 当这里已存在一个`Session`具有相同的`partition`, 它将被返回; 否则一个新的`Session`实例将根据`options`被创建。

如果 `partition` 以 `persist:`开头, 该页面将使用持续的 session，并在所有页面生效，且使用同一个`partition`. 如果没有 `persist:` 前缀, 页面将使用 in-memory session. 如果没有设置`partition`，app 将返回默认的session。

要根据`options`创建`Session`，你需要确保`Session`的`partition`在之前从未被使用。 没有办法修改一个已存在的`Session`对象的`options`。

## Properties

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

返回:

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

#### Event: 'extension-loaded'

返回:

* `event` Event
* `extension` [Extension](structures/extension.md)

Emitted after an extension is loaded. This occurs whenever an extension is added to the "enabled" set of extensions. This includes:

* Extensions being loaded from `Session.loadExtension`.
* Extensions being reloaded:
  * from a crash.
  * if the extension requested it ([`chrome.runtime.reload()`](https://developer.chrome.com/extensions/runtime#method-reload)).

#### Event: 'extension-unloaded'

返回:

* `event` Event
* `extension` [Extension](structures/extension.md)

Emitted after an extension is unloaded. This occurs when `Session.removeExtension` is called.

#### Event: 'extension-ready'

返回:

* `event` Event
* `extension` [Extension](structures/extension.md)

Emitted after an extension is loaded and all necessary browser state is initialized to support the start of the extension's background page.

#### Event: 'preconnect'

返回:

* `event` Event
* `preconnectUrl` String - The URL being requested for preconnection by the renderer.
* `allowCredentials` Boolean - True if the renderer is requesting that the connection include credentials (see the [spec](https://w3c.github.io/resource-hints/#preconnect) for more details.)

Emitted when a render process requests preconnection to a URL, generally due to a [resource hint](https://w3c.github.io/resource-hints/).

#### Event: 'spellcheck-dictionary-initialized'

返回:

* `event` Event
* `languageCode` String - The language code of the dictionary file

当一个hunspell字典初始化成功时触发。 这个事件在文件被下载之后触发。

#### Event: 'spellcheck-dictionary-download-begin'

返回:

* `event` Event
* `languageCode` String - The language code of the dictionary file

Emitted when a hunspell dictionary file starts downloading

#### Event: 'spellcheck-dictionary-download-success'

返回:

* `event` Event
* `languageCode` String - The language code of the dictionary file

Emitted when a hunspell dictionary file has been successfully downloaded

#### Event: 'spellcheck-dictionary-download-failure'

返回:

* `event` Event
* `languageCode` String - The language code of the dictionary file

当hunspell字典下载失败时触发。  如果需要详细信息，你应当查看网络日志并且检查下载请求。

#### Event: 'select-serial-port' _Experimental_

返回:

* `event` Event
* `portList` [SerialPort[]](structures/serial-port.md)
* `webContents` [WebContents](web-contents.md)
* `callback` Function
  * `portId` String

Emitted when a serial port needs to be selected when a call to `navigator.serial.requestPort` is made. `callback` should be called with `portId` to be selected, passing an empty string to `callback` will cancel the request.  Additionally, permissioning on `navigator.serial` can be managed by using [ses.setPermissionCheckHandler(handler)](#sessetpermissioncheckhandlerhandler) with the `serial` permission.

Because this is an experimental feature it is disabled by default.  To enable this feature, you will need to use the `--enable-features=ElectronSerialChooser` command line switch.  Additionally because this is an experimental Chromium feature you will need to set `enableBlinkFeatures: 'Serial'` on the `webPreferences` property when opening a BrowserWindow.

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

#### Event: 'serial-port-added' _Experimental_

返回:

* `event` Event
* `port` [SerialPort](structures/serial-port.md)
* `webContents` [WebContents](web-contents.md)

Emitted after `navigator.serial.requestPort` has been called and `select-serial-port` has fired if a new serial port becomes available.  For example, this event will fire when a new USB device is plugged in.

#### Event: 'serial-port-removed' _Experimental_

返回:

* `event` Event
* `port` [SerialPort](structures/serial-port.md)
* `webContents` [WebContents](web-contents.md)

Emitted after `navigator.serial.requestPort` has been called and `select-serial-port` has fired if a serial port has been removed.  For example, this event will fire when a USB device is unplugged.

### 实例方法

在`Session`实例对象中，有以下方法:

#### `ses.getCacheSize()`

Returns `Promise<Integer>` - the session's current cache size, in bytes.

#### `ses.clearCache()`

Returns `Promise<void>` - resolves when the cache clear operation is complete.

清除session的HTTP缓存。

#### `ses.clearStorageData([options])`

* `options` Object (可选)
  * `origin` String - (可选项) 这个值应该按照 `window.location.origin` 的形式: `协议://主机名:端口`方式设置。
  * `storages` String[] (optional) - The types of storages to clear, can contain: `appcache`, `cookies`, `filesystem`, `indexdb`, `localstorage`, `shadercache`, `websql`, `serviceworkers`, `cachestorage`. 如果没有指定storages，将会清除所有的storages类型
  * `quotas` String[] - (可选项) 要清除的配额类型, 包含: `temporary`, `persistent`, `syncable`。 如果没有指定，将会清除所有的quotas。

Returns `Promise<void>` - resolves when the storage data has been cleared.

#### `ses.flushStorageData()`

写入任何未写入DOMStorage数据到磁盘.

#### `ses.setProxy(config)`

* `config` Object
  * `mode` String (optional) - The proxy mode. Should be one of `direct`, `auto_detect`, `pac_script`, `fixed_servers` or `system`. If it's unspecified, it will be automatically determined based on other specified options.
    * `direct` In direct mode all connections are created directly, without any proxy involved.
    * `auto_detect` In auto_detect mode the proxy configuration is determined by a PAC script that can be downloaded at http://wpad/wpad.dat.
    * `pac_script` In pac_script mode the proxy configuration is determined by a PAC script that is retrieved from the URL specified in the `pacScript`. This is the default mode if `pacScript` is specified.
    * `fixed_servers` In fixed_servers mode the proxy configuration is specified in `proxyRules`. This is the default mode if `proxyRules` is specified.
    * `system` In system mode the proxy configuration is taken from the operating system. Note that the system mode is different from setting no proxy configuration. In the latter case, Electron falls back to the system settings only if no command-line options influence the proxy configuration.
  * `pacScript` String (optional) - The URL associated with the PAC file.
  * `proxyRules` String (optional) - Rules indicating which proxies to use.
  * `proxyBypassRules` String (optional) - Rules indicating which URLs should bypass the proxy settings.

Returns `Promise<void>` - Resolves when the proxy setting process is complete.

代理设置

When `mode` is unspecified, `pacScript` and `proxyRules` are provided together, the `proxyRules` option is ignored and `pacScript` configuration is applied.

You may need `ses.closeAllConnections` to close currently in flight connections to prevent pooled sockets using previous proxy from being reused by future requests.

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

   Examples: ".google.com", ".com", "http://.google.com"

* `[ SCHEME "://" ] IP_LITERAL [ ":" PORT ]`

   匹配 IP 地址文本的 url。

   例如: "127.0.1", "[0:0::1]", "[::1]", "http://[::1]:99"

* `IP_LITERAL "/" PREFIX_LENGTH_IN_BITS`

   匹配任何在给定IP范围内失败的URL。 IP范围使用指定的CIDR。

   例如: "192.168.1.1/16", "fefe:13::abc/33".

* `<local>`

   匹配本地地址。 The meaning of `<local>` is whether the host matches one of: "127.0.0.1", "::1", "localhost".

#### `ses.resolveProxy(url)`

* `url` URL

Returns `Promise<String>` - Resolves with the proxy information for `url`.

#### `ses.forceReloadProxyConfig()`

Returns `Promise<void>` - Resolves when the all internal states of proxy service is reset and the latest proxy configuration is reapplied if it's already available. The pac script will be fetched from `pacScript` again if the proxy mode is `pac_script`.

#### `ses.setDownloadPath(path)`

* `path` String - 下载地址.

Sets download saving directory. By default, the download directory will be the `Downloads` under the respective app folder.

#### `ses.enableNetworkEmulation(options)`

* `选项` 对象
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

#### `ses.preconnect(options)`

* `选项` 对象
  * `url` String - URL for preconnect. Only the origin is relevant for opening the socket.
  * `numSockets` Number (optional) - number of sockets to preconnect. Must be between 1 and 6. Defaults to 1.

Preconnects the given number of sockets to an origin.

#### `ses.closeAllConnections()`

Returns `Promise<void>` - Resolves when all connections are closed.

**Note:** It will terminate / fail all requests currently in flight.

#### `ses.disableNetworkEmulation()`

Disables any network emulation already active for the `session`. Resets to the original network configuration.

#### `ses.setCertificateVerifyProc(proc)`

* `proc` Function | null
  * `request` Object
    * `hostname` String
    * `certificate` [证书](structures/certificate.md)
    * `validatedCertificate` [证书](structures/certificate.md)
    * `verificationResult` String - chromium证书验证结果
    * `errorCode` Integer - 错误代码
  * `callback` Function
    * `verificationResult` Integer - Value can be one of certificate error codes from [here](https://source.chromium.org/chromium/chromium/src/+/master:net/base/net_error_list.h). Apart from the certificate error codes, the following special codes can be used.
      * `-0` - 表示成功并禁用证书透明度验证
      * `-2` - 表示失败
      * `-3` - 使用chromium的验证结果

每当一个服务器证书请求验证，`proc` 将被这样 `proc(request, callback)` 调用，为 `session` 设置证书验证过程。 回调函数 `callback(0)` 接受证书，`callback(-2)` 驳回证书。

调用 ` setCertificateVerifyProc（null）`将恢复为默认证书验证过程。

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

> **NOTE:** The result of this procedure is cached by the network service.

#### `ses.setPermissionRequestHandler(handler)`

* `handler` Function | null
  * `webContents` [WebContents](web-contents.md) - 请求权限的WebContents。  Please note that if the request comes from a subframe you should use `requestingUrl` to check the request origin.
  * `permission` String - The type of requested permission.
    * `clipboard-read` - Request access to read from the clipboard.
    * `media` -  Request access to media devices such as camera, microphone and speakers.
    * `display-capture` - Request access to capture the screen.
    * `mediaKeySystem` - Request access to DRM protected content.
    * `geolocation` - Request access to user's current location.
    * `notifications` - Request notification creation and the ability to display them in the user's system tray.
    * `midi` - Request MIDI access in the `webmidi` API.
    * `midiSysex` - Request the use of system exclusive messages in the `webmidi` API.
    * `pointerLock` - Request to directly interpret mouse movements as an input method. Click [here](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API) to know more.
    * `fullscreen` - Request for the app to enter fullscreen mode.
    * `openExternal` - Request to open links in external applications.
    * `unknown` - An unrecognized permission request
  * `callback` Function
    * `permissionGranted` Boolean - 允许或拒绝该权限.
  * `details` Object - Some properties are only available on certain permission types.
    * `externalURL` String (optional) - The url of the `openExternal` request.
    * `mediaTypes` String[] (optional) - The types of media access being requested, elements can be `video` or `audio`
    * `requestingUrl` String - The last URL the requesting frame loaded
    * `isMainFrame` Boolean - Whether the frame making the request is the main frame

设置可用于响应 ` session ` 的权限请求的处理程序。 调用 ` callback(true)` 将允许该权限, 调用 ` callback(false)` 将拒绝它。 若要清除处理程序, 请调用 ` setPermissionRequestHandler (null) `。  Please note that you must also implement `setPermissionCheckHandler` to get complete permission handling. Most web APIs do a permission check and then make a permission request if the check is denied.

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

* `handler` 函数\<Boolean> | null
  * `webContents` ([WebContents](web-contents.md) | null) - WebContents checking the permission.  Please note that if the request comes from a subframe you should use `requestingUrl` to check the request origin.  Cross origin sub frames making permission checks will pass a `null` webContents to this handler.  You should use `embeddingOrigin` and `requestingOrigin` to determine what origin the owning frame and the requesting frame are on respectively.
  * `permission` String - Type of permission check.  Valid values are `midiSysex`, `notifications`, `geolocation`, `media`,`mediaKeySystem`,`midi`, `pointerLock`, `fullscreen`, `openExternal`, or `serial`.
  * `requestingOrigin` String - The origin URL of the permission check
  * `details` Object - Some properties are only available on certain permission types.
    * `embeddingOrigin` String (optional) - The origin of the frame embedding the frame that made the permission check.  Only set for cross-origin sub frames making permission checks.
    * `securityOrigin` String (optional) - The security origin of the `media` check.
    * `mediaType` String (optional) - The type of media access being requested, can be `video`, `audio` or `unknown`
    * `requestingUrl` String (optional) - The last URL the requesting frame loaded.  This is not provided for cross-origin sub frames making permission checks.
    * `isMainFrame` Boolean - Whether the frame making the request is the main frame

Sets the handler which can be used to respond to permission checks for the `session`. Returning `true` will allow the permission and `false` will reject it.  Please note that you must also implement `setPermissionRequestHandler` to get complete permission handling. Most web APIs do a permission check and then make a permission request if the check is denied. To clear the handler, call `setPermissionCheckHandler(null)`.

```javascript
const { session } = require('electron')
const url = require('url')
session.fromPartition('some-partition').setPermissionCheckHandler((webContents, permission, requestingOrigin) => {
  if (new URL(requestingOrigin).hostname === 'some-host' && permission === 'notifications') {
    return true // granted
  }

  return false // denied
})
```

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

#### `ses.isPersistent()`

Returns `Boolean` - Whether or not this session is a persistent one. The default `webContents` session of a `BrowserWindow` is persistent. When creating a session from a partition, session prefixed with `persist:` will be persistent, while others will be temporary.

#### `ses.getUserAgent()`

返回 `String` - 当前会话的 user agent.

#### `ses.setSSLConfig(config)`

* `config` Object
  * `minVersion` String (optional) - Can be `tls1`, `tls1.1`, `tls1.2` or `tls1.3`. The minimum SSL version to allow when connecting to remote servers. 默认为`tls1`。
  * `maxVersion` String (可选) - 可以是 `tls1.2` 或 `tls1.3`。 The maximum SSL version to allow when connecting to remote servers. 默认值为 `tls1.3`。
  * `disabledCipherSuites` Integer[] (optional) - List of cipher suites which should be explicitly prevented from being used in addition to those disabled by the net built-in policy. Supported literal forms: 0xAABB, where AA is `cipher_suite[0]` and BB is `cipher_suite[1]`, as defined in RFC 2246, Section 7.4.1.2. Unrecognized but parsable cipher suites in this form will not return an error. Ex: To disable TLS_RSA_WITH_RC4_128_MD5, specify 0x0004, while to disable TLS_ECDH_ECDSA_WITH_RC4_128_SHA, specify 0xC002. Note that TLSv1.3 ciphers cannot be disabled using this mechanism.

Sets the SSL configuration for the session. All subsequent network requests will use the new configuration. Existing network connections (such as WebSocket connections) will not be terminated, but old sockets in the pool will not be reused for new connections.

#### `ses.getBlobData(identifier)`

* `identifier` String - 有效的 UUID.

Returns `Promise<Buffer>` - resolves with blob data.

#### `ses.downloadURL(url)`

* `url` String

Initiates a download of the resource at `url`. The API will generate a [DownloadItem](download-item.md) that can be accessed with the [will-download](#event-will-download) event.

**Note:** This does not perform any security checks that relate to a page's origin, unlike [`webContents.downloadURL`](web-contents.md#contentsdownloadurlurl).

#### `ses.createInterruptedDownload(options)`

* `选项` 对象
  * `path` String - 下载的绝对路径.
  * `urlChain` String[] - 完整的 url 下载地址.
  * `mimeType` String (可选)
  * `offset` Integer - 下载的开始范围.
  * `length` Integer - 下载的总长度。
  * `lastModified` String (optional) - Last-Modified header value.
  * `eTag` String (optional) - ETag header value.
  * `startTime` Double (optional) - 下载的时间是从 UNIX 时代以来的秒数开始的。

允许从上一个 `Session` 恢复 ` cancelled ` 或 ` interrupted ` 下载。 该 API 将生成一个 [ DownloadItem ](download-item.md), 可使用 [ will-download ](#event-will-download) 事件进行访问。 [ DownloadItem ](download-item.md) 将不具有与之关联的任何 ` WebContents `, 并且初始状态将为 ` interrupted `。 只有在 [ DownloadItem ](download-item.md) 上调用 ` resume ` API 时, 才会启动下载。

#### `ses.clearAuthCache()`

Returns `Promise<void>` - resolves when the session’s HTTP authentication cache has been cleared.

#### `ses.setPreloads(preloads)`

* `preloads` String[] - 数组，该数组由所有需要进行预加载的脚本的绝对路径组成。

Adds scripts that will be executed on ALL web contents that are associated with this session just before normal `preload` scripts run.

#### `ses.getPreloads()`

返回 `String[]` 返回一个数组，这个数组由已经注册过的预加载脚本的路径组成。

#### `ses.setSpellCheckerEnabled(enable)`

* `enable` Boolean

Sets whether to enable the builtin spell checker.

#### `ses.isSpellCheckerEnabled()`

Returns `Boolean` - Whether the builtin spell checker is enabled.

#### `ses.setSpellCheckerLanguages(languages)`

* `languages` String[] - An array of language codes to enable the spellchecker for.

The built in spellchecker does not automatically detect what language a user is typing in.  In order for the spell checker to correctly check their words you must call this API with an array of language codes.  You can get the list of supported language codes with the `ses.availableSpellCheckerLanguages` property.

**Note:** On macOS the OS spellchecker is used and will detect your language automatically.  This API is a no-op on macOS.

#### `ses.getSpellCheckerLanguages()`

Returns `String[]` - An array of language codes the spellchecker is enabled for.  If this list is empty the spellchecker will fallback to using `en-US`.  By default on launch if this setting is an empty list Electron will try to populate this setting with the current OS locale.  This setting is persisted across restarts.

**Note:** On macOS the OS spellchecker is used and has its own list of languages.  This API is a no-op on macOS.

#### `ses.setSpellCheckerDictionaryDownloadURL(url)`

* `url` String - A base URL for Electron to download hunspell dictionaries from.

By default Electron will download hunspell dictionaries from the Chromium CDN.  If you want to override this behavior you can use this API to point the dictionary downloader at your own hosted version of the hunspell dictionaries.  We publish a `hunspell_dictionaries.zip` file with each release which contains the files you need to host here, the file server must be **case insensitive** you must upload each file twice, once with the case it has in the ZIP file and once with the filename as all lower case.

If the files present in `hunspell_dictionaries.zip` are available at `https://example.com/dictionaries/language-code.bdic` then you should call this api with `ses.setSpellCheckerDictionaryDownloadURL('https://example.com/dictionaries/')`.  Please note the trailing slash.  The URL to the dictionaries is formed as `${url}${filename}`.

**Note:** On macOS the OS spellchecker is used and therefore we do not download any dictionary files.  This API is a no-op on macOS.

#### `ses.listWordsInSpellCheckerDictionary()`

Returns `Promise<String[]>` - An array of all words in app's custom dictionary. Resolves when the full dictionary is loaded from disk.

#### `ses.addWordToSpellCheckerDictionary(word)`

* `word` String - The word you want to add to the dictionary

Returns `Boolean` - Whether the word was successfully written to the custom dictionary. This API will not work on non-persistent (in-memory) sessions.

**Note:** On macOS and Windows 10 this word will be written to the OS custom dictionary as well

#### `ses.removeWordFromSpellCheckerDictionary(word)`

* `word` String - The word you want to remove from the dictionary

Returns `Boolean` - Whether the word was successfully removed from the custom dictionary. This API will not work on non-persistent (in-memory) sessions.

**Note:** On macOS and Windows 10 this word will be removed from the OS custom dictionary as well

#### `ses.loadExtension(path[, options])`

* `path` String - Path to a directory containing an unpacked Chrome extension
* `options` Object (可选)
  * `allowFileAccess` Boolean - Whether to allow the extension to read local files over `file://` protocol and inject content scripts into `file://` pages. This is required e.g. for loading devtools extensions on `file://` URLs. 默认值为 false.

Returns `Promise<Extension>` - resolves when the extension is loaded.

This method will raise an exception if the extension could not be loaded. If there are warnings when installing the extension (e.g. if the extension requests an API that Electron does not support) then they will be logged to the console.

Note that Electron does not support the full range of Chrome extensions APIs. See [Supported Extensions APIs](extensions.md#supported-extensions-apis) for more details on what is supported.

Note that in previous versions of Electron, extensions that were loaded would be remembered for future runs of the application. This is no longer the case: `loadExtension` must be called on every boot of your app if you want the extension to be loaded.

```js
const { app, session } = require('electron')
const path = require('path')

app.on('ready', async () => {
  await session.defaultSession.loadExtension(
    path.join(__dirname, 'react-devtools'),
    // allowFileAccess is required to load the devtools extension on file:// URLs.
    { allowFileAccess: true }
  )
  // Note that in order to use the React DevTools extension, you'll need to
  // download and unzip a copy of the extension.
})
```

This API does not support loading packed (.crx) extensions.

**注意:** 该 API 不能在 `app` 模块的 `ready` 事件之前调用.

**Note:** Loading extensions into in-memory (non-persistent) sessions is not supported and will throw an error.

#### `ses.removeExtension(extensionId)`

* `extensionId` String - ID of extension to remove

Unloads an extension.

**注意:** 该 API 不能在 `app` 模块的 `ready` 事件之前调用.

#### `ses.getExtension(extensionId)`

* `extensionId` String - ID of extension to query

Returns `Extension` | `null` - The loaded extension with the given ID.

**注意:** 该 API 不能在 `app` 模块的 `ready` 事件之前调用.

#### `ses.getAllExtensions()`

Returns `Extension[]` - A list of all loaded extensions.

**注意:** 该 API 不能在 `app` 模块的 `ready` 事件之前调用.

#### `ses.getStoragePath()`

A `String | null` indicating the absolute file system path where data for this session is persisted on disk.  For in memory sessions this returns `null`.

### 实例属性

以下属性在` Session </ 0>实例上可用：</p>

<h4 spaces-before="0"><code>ses.availableSpellCheckerLanguages` _Readonly_</h4>

A `String[]` array which consists of all the known available spell checker languages.  Providing a language code to the `setSpellCheckerLanguages` API that isn't in this array will result in an error.

#### `ses.spellCheckerEnabled`

A `Boolean` indicating whether builtin spell checker is enabled.

#### `ses.storagePath` _Readonly_

A `String | null` indicating the absolute file system path where data for this session is persisted on disk.  For in memory sessions this returns `null`.

#### `ses.cookies` _Readonly_

A [`Cookies`](cookies.md) object for this session.

#### `ses.serviceWorkers` _Readonly_

A [`ServiceWorkers`](service-workers.md) object for this session.

#### `ses.webRequest` _Readonly_

A [`WebRequest`](web-request.md) object for this session.

#### `ses.protocol` _Readonly_

A [`Protocol`](protocol.md) object for this session.

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

#### `ses.netLog` _Readonly_

A [`NetLog`](net-log.md) object for this session.

```javascript
const { app, session } = require('electron')

app.whenReady().then(async () => {
  const netLog = session.fromPartition('some-partition').netLog
  netLog.startLogging('/path/to/net-log')
  // After some network events
  const path = await netLog.stopLogging()
  console.log('Net-logs written to', path)
})
```
