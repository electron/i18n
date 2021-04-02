# session

> 管理浏览器会话、cookie、缓存、代理设置等。

进程：[主进程](../glossary.md#main-process)

` session ` 模块可用于创建新的 ` session ` 对象。

你还可以使用[`WebContents`](web-contents.md)的`session`属性或` session`模块访问现有页的`session`

```javascript
康斯特 { BrowserWindow } = 需要 （'电子'）

缺点赢 = 新的浏览器窗口 （{ width: 800, height: 600 }）
赢. loadurl （'http：/ / github .com'）

缺点 = 赢. webContents. 会话
控制台.log （ses. get 使用者代理 （）
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

#### 活动："扩展加载"

返回:

* `event` Event
* `extension` [扩展](structures/extension.md)

加载扩展后发出。 每当将扩展 添加到"启用"的扩展集时，就会发生这种情况。 这包括：

- 从 `Session.loadExtension`加载的扩展。
- 正在重新加载的扩展：
  * 从崩溃。
  * 如果扩展请求它（[`chrome.runtime.reload()`](https://developer.chrome.com/extensions/runtime#method-reload)）。

#### 活动："扩展卸载"

返回:

* `event` Event
* `extension` [扩展](structures/extension.md)

卸载扩展后发出。 当 `Session.removeExtension` 被调用时，就会发生这种情况。

#### 活动："扩展就绪"

返回:

* `event` Event
* `extension` [扩展](structures/extension.md)

加载扩展后发出，并 初始化所有必要的浏览器状态，以支持扩展的后台页面的开头。

#### 活动："预连接"

返回:

* `event` Event
* `preconnectUrl` 字符串 - 渲染器要求预连接的 URL。
* `allowCredentials` Boolean - 如果渲染器请求 连接包含凭据，则确实如此（有关详细信息，请参阅 [规格](https://w3c.github.io/resource-hints/#preconnect) 。

当渲染过程请求预连接到网址时发出，通常是由于</a>资源提示。</p> 



#### 事件： "拼写检查字典初始化"

返回:

* `event` Event
* `languageCode` 字符串 - 字典文件的语言代码

当一个hunspell字典初始化成功时触发。 这个事件在文件被下载之后触发。



#### 活动： "拼写检查字典 - 下载 - 开始"

返回:

* `event` Event
* `languageCode` 字符串 - 字典文件的语言代码

当一个驼背字典文件开始下载时发出



#### 活动：'拼写检查字典-下载-成功'

返回:

* `event` Event
* `languageCode` 字符串 - 字典文件的语言代码

当一个驼背字典文件已成功下载时发出



#### 事件： "拼写检查字典 - 下载 - 失败"

返回:

* `event` Event
* `languageCode` 字符串 - 字典文件的语言代码

当hunspell字典下载失败时触发。  如果需要详细信息，你应当查看网络日志并且检查下载请求。



#### 活动："选择串行端口" _实验_

返回:

* `event` Event
* `portList` [系列波特[]](structures/serial-port.md)
* `webContents` [WebContents](web-contents.md)
* `callback` Function 
    * `portId` 字符串

当需要选择串行端口时发出呼叫 `navigator.serial.requestPort` 。 应使用要选择的 `portId` 呼叫`callback` ，将空字符串传递给 `callback` 将 取消请求。  此外， `navigator.serial` 的许可 可以通过使用 [ses.set. `serial` 权限](#sessetpermissioncheckhandlerhandler) 进行管理。

因为这是一个实验功能，默认情况下将其禁用。  要启用此功能，您 需要使用 `--enable-features=ElectronSerialChooser` 命令行开关。  此外， ，因为这是一个实验性的铬功能，您将需要设置 `enableBlinkFeatures: 'Serial'` `webPreferences` 属性时，打开一个浏览器窗口。



```javascript
康斯特 { app, BrowserWindow } =要求（"电子"）

让赢=无效
应用程序。命令线。附录开关（"启用功能"， "电子搜索器"）

应用程序。当已准备好时（然后）=> {
  赢=新浏览器窗口（+
    宽度：800，
    高度：600，
    webPrefers： {
      enableBlinkFeatures: 'Serial'
    }
  }）
  赢。 （事件，端口列表，回调）=> {
    事件。预防故障（）
    选定的端口=端口列表。find（设备）=> {
      返回设备。供应商ID==0x2341 && 设备。 0x0043
    如果（！选择的端口）{
      回调（'）
    =否则{
      回调（结果1.portId）
    =
  }）
）

```




#### 活动："串行端口添加" _实验_

返回:

* `event` Event
* `port` [串行端口](structures/serial-port.md)
* `webContents` [WebContents](web-contents.md)

`navigator.serial.requestPort` 被调用后发出，如果新的串行端口可用， `select-serial-port` 已发射。  例如，当插入新的 USB 设备时，此事件将启动。



#### 活动： _实验_的"串行端口移除"

返回:

* `event` Event
* `port` [串行端口](structures/serial-port.md)
* `webContents` [WebContents](web-contents.md)

`navigator.serial.requestPort` 被调用后发出，如果已移除串行端口，则 `select-serial-port` 已开火。  例如，当 USB 设备拔下插头时，此事件将启动。



### 实例方法

在`Session`实例对象中，有以下方法:



#### `ses.获取缓存大小（）`

返回 `Promise<Integer>` - 会话当前缓存大小，字节。



#### `ses.清除缓存（）`

返回 `Promise<void>` - 当缓存清除操作完成时解析。

清除session的HTTP缓存。



#### `ses.clearStorageData([options])`

* `options` Object (可选) 
    * `origin` String - (可选项) 这个值应该按照 `window.location.origin` 的形式: `协议://主机名:端口`方式设置。
  * `storages` 字符串[]（可选） - 要清除的存储类型，可以包含： `appcache`， `cookies`， `filesystem`， `indexdb`， `localstorage`， `shadercache`， `websql`， `serviceworkers`， `cachestorage`。 如果没有指定storages，将会清除所有的storages类型
  * `quotas` String[] - (可选项) 要清除的配额类型, 包含: `temporary`, `persistent`, `syncable`。 如果没有指定，将会清除所有的quotas。

返回 `Promise<void>` - 在存储数据已清除时解析。



#### `ses.flushStorageData()`

写入任何未写入DOMStorage数据到磁盘.



#### `塞斯. 设置四十六 （配置）`

* `config` 对象
  
    * `mode` 字符串（可选） - 代理模式。 应该是一个 `direct`， `auto_detect`， `pac_script`， `fixed_servers` 或 `system`。 如果 未指定，将根据其他指定的 选项自动确定。
    
        * `direct` 在直接模式下，所有连接都是直接创建的，无需涉及任何代理。

    * `auto_detect` 在auto_detect模式下，代理配置由 PAC 脚本决定，该脚本 可在 http://wpad/wpad.dat 下载。

    * `pac_script` 在pac_script模式下，代理配置由 PAC 脚本决定，该脚本 从 `pacScript`中指定的 URL 中检索。 如果指定了 `pacScript` ，则这是 的默认模式。

    * `fixed_servers` 在fixed_servers模式下，代理配置以 `proxyRules`表示。 如果指定了 `proxyRules` ，则这是默认模式。

    * `system` 在系统模式下，代理配置取自操作系统。 请注意，系统模式不同于设置任何代理配置。 在后一种情况下，只有当没有命令线选项影响代理配置时，Electron 才会返回到系统设置 。

  * `pacScript` 字符串（可选） - 与PAC文件关联的网址。

  * `proxyRules` 字符串（可选） - 指示使用哪些代理的规则。
  * `proxyBypassRules` 字符串（可选） - 指示哪些网址应 绕过代理设置的规则。

返回 `Promise<void>` - 当代理设置过程完成时解决。

代理设置

当未指定 `mode` 时， `pacScript` 和 `proxyRules` 一起提供，则忽略 `proxyRules` 选项并应用 `pacScript` 配置。

您可能需要 `ses.closeAllConnections` 关闭当前航班连接，以防止使用以前的代理的 池插座被未来请求重复使用。

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
  
  示例： ".google.com"、".com"、"http://.google.com"

* `[ SCHEME "://" ] IP_LITERAL [ ":" PORT ]`
  
  匹配 IP 地址文本的 url。
  
  例如: "127.0.1", "[0:0::1]", "[::1]", "http://[::1]:99"

* `IP_LITERAL "/" PREFIX_LENGTH_IN_BITS`
  
  匹配任何在给定IP范围内失败的URL。 IP范围使用指定的CIDR。
  
  例如: "192.168.1.1/16", "fefe:13::abc/33".

* `<local>`
  
  匹配本地地址。 `<local>` 的意义在于 东道主是否与"127.0.0.1"、"：1"、"本地主机"相匹配。



#### `ses.resolveProxy(url)`

* `url` URL

返回 `Promise<String>` - 用 `url`的代理信息解决。



#### `ses.强制重新加载多氧康菲格（）`

返回 `Promise<void>` - 当代理服务的所有内部状态重置时解决，如果已经可用，则重新应用最新的代理配置。 如果代理模式 `pac_script`，则 pac 脚本将再次从 `pacScript` 提取。



#### `ses.setDownloadPath(path)`

* `path` String - 下载地址.

设置下载保存目录。 默认情况下，下载目录将是相关应用文件夹下的 `Downloads` 。



#### `ses.enableNetworkEmulation(options)`

* `选项` 对象 
    * `offline` 布尔（可选） - 是否模拟网络中断。 默认值为 false.
  * `latency` 双（可选）-RTT在毫秒。 默认为 0，这将禁用 延迟限制。
  * `downloadThroughput` 双倍（可选） - Bps 中的下载速率。 默认为0 这将禁用下载限制。
  * `uploadThroughput` 双倍（可选） - Bps 的上传速率。 默认情况下为0 这将禁用上传限制。

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
    * `url` 字符串-用于预连接的网址。 只有原产地与打开插座有关。
  * `numSockets` 编号（可选） - 要预连接的插座数。 必须在1到6之间。 默认值为1。

将给定数量的插座预接到原点。



#### `关闭所有连接（）`

返回 `Promise<void>` - 当所有连接都关闭时解决。

**注意：** 它将终止/失败当前在飞行中的所有请求。



#### `ses.disableNetworkEmulation()`

禁用 `session`中已激活的任何网络模拟。 重置 原始网络配置。



#### `ses.setCertificateVerifyProc(proc)`

* `proc` 功能|空 
    * `request` 对象 
        * `hostname` String
    * `certificate` [证书](structures/certificate.md)
    * `validatedCertificate` [证书](structures/certificate.md)
    * `verificationResult` String - chromium证书验证结果
    * `errorCode` Integer - 错误代码
  * `callback` Function 
        * `verificationResult` 整数值可以是证书错误代码之一， 从 [这里](https://source.chromium.org/chromium/chromium/src/+/master:net/base/net_error_list.h)。 除证书错误代码外，还可以使用以下特殊代码。 
            * `-0` - 表示成功并禁用证书透明度验证
      * `-2` - 表示失败
      * `-3` - 使用chromium的验证结果

每当一个服务器证书请求验证，`proc` 将被这样 `proc(request, callback)` 调用，为 `session` 设置证书验证过程。 回调函数 `callback(0)` 接受证书，`callback(-2)` 驳回证书。

调用 ` setCertificateVerifyProc（null）`将恢复为默认证书验证过程。



```javascript
康斯特 { BrowserWindow } =要求（"电子"）
持续赢=新浏览器窗口（）

赢。 回调）=> {
  const { hostname } =请求
  如果（主机名=="github.com"）{
    回调（0）
  }否则{
    回调（-2）
  }
}）
```




> **注：** 此过程的结果由网络服务缓存。



#### `ses.setPermissionRequestHandler(handler)`

* `handler` 功能|空
  
    * `webContents` [WebContents](web-contents.md) - 请求权限的WebContents。  请注意，如果请求来自子帧，您应该使用 `requestingUrl` 来检查请求来源。
  * `permission` 字符串 - 请求权限的类型。 
        * `clipboard-read` - 请求访问从剪贴板读取。
    * `media` - 请求访问摄像机、麦克风和扬声器等媒体设备。
    * `display-capture` - 请求访问以捕获屏幕。
    * `mediaKeySystem` - 请求访问受 DRM 保护的内容。
    * `geolocation` - 请求访问用户当前位置。
    * `notifications` - 请求通知创建和在用户的系统托盘中显示它们的能力。
    * `midi` - 在 `webmidi` API 中请求 MIDI 访问。
    * `midiSysex` - 请求在 `webmidi` API 中使用系统专用消息。
    * `pointerLock` - 请求将鼠标移动直接解释为输入法。 单击此处 [](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API) 了解更多信息。
    * `fullscreen` - 请求应用程序进入全屏模式。
    * `openExternal` - 请求在外部应用中打开链接。
  * `callback` Function 
        * `permissionGranted` Boolean - 允许或拒绝该权限.
  * `details` 对象 - 某些属性仅适用于某些权限类型。
    
        * `externalURL` 字符串（可选） - `openExternal` 请求的网址。
    * `mediaTypes` 字符串 [] （可选） - 请求的媒体访问类型、元素可以 `video` 或 `audio`

    * `requestingUrl` 字符串 - 加载请求帧的最后一个 URL

    * `isMainFrame` 布尔 - 提出请求的框架是否是主框架

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

* `handler` 功能\<Boolean> | null
  
    * `webContents` [网络控制](web-contents.md) - 网络控制检查权限。  请注意，如果请求来自子帧，您应该使用 `requestingUrl` 来检查请求来源。
  * `permission` 字符串 - 权限检查类型。  有效值为 `midiSysex`、 `notifications`、 `geolocation`、 `media`、`mediaKeySystem`、`midi`、 `pointerLock`、 `fullscreen`、 `openExternal`或 `serial`。
  * `requestingOrigin` 字符串 - 权限检查的源 URL
  * `details` 对象 - 某些属性仅适用于某些权限类型。
    
        * `securityOrigin` 字符串 - `media` 检查的安全来源。
    * `mediaType` 字符串 - 请求的媒体访问类型，可以 `video`、 `audio` 或 `unknown`

    * `requestingUrl` 字符串 - 加载请求帧的最后一个 URL

    * `isMainFrame` 布尔 - 提出请求的框架是否是主框架

设置可用于响应 `session`权限检查的处理程序。 返回 `true` 将允许许可， `false` 将拒绝它。 要清除处理程序，请致电 `setPermissionCheckHandler(null)`。



```javascript
康斯特 { session } =要求（"电子"）
会话。从分区（"某些分区"）。 权限）=> {
  （webContents.getURL）=="某些主机" && 权限=="通知"）{
    返回虚假//拒绝
  }

  返回真实
}）
```




#### `ses.clearHostResolverCache()`

返回 `Promise<void>` - 操作完成后解决。

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



#### `是坚持（）`

返回 `Boolean` - 无论此会话是否持续。 `BrowserWindow` 的默认 `webContents` 会话是持续的。 当从分区创建会话 时，以 `persist:` 为前提的会话将持续存在，而其他会话 将是临时性的。



#### `ses.getUserAgent()`

返回 `String` - 当前会话的 user agent.



#### `ses. 设置斯尔康菲格 （配置）`

* `config` 对象 
    * `minVersion` 字符串（可选） - 可以 `tls1`， `tls1.1`， `tls1.2` 或 `tls1.3`。 最低 SSL 版本，以便连接到远程服务器时允许。 默认为 `tls1`。
  * `maxVersion` 字符串（可选） - 可以 `tls1.2` 或 `tls1.3`。 连接到远程服务器时，最大 SSL 版本 允许。 `tls1.3`的默认值。
  * `disabledCipherSuites` 整数 [] （可选） - 除因网络内置政策而禁用的 外，还应明确禁止使用 的密码套件列表。 支持的字面形式：0xAABB，其中AA是 `cipher_suite[0]` ，BB是 `cipher_suite[1]`，如RFC 2246，第7.4.1.2节定义。 未识别但 可解析的密码套件在此形式中不会返回错误。 前：要禁用TLS_RSA_WITH_RC4_128_MD5，指定0x0004，同时 禁用TLS_ECDH_ECDSA_WITH_RC4_128_SHA，指定0xC002。 请注意，TLSv1.3密码不能使用此机制禁用。

为会话设置 SSL 配置。 所有后续网络请求 都将使用新配置。 现有网络连接（如 WebSocket 连接）不会终止，但池中的旧插座不会 重新用于新连接。



#### `ses. 获取布洛布数据 （标识符）`

* `identifier` String - 有效的 UUID.

返回 `Promise<Buffer>` - 使用 blob 数据解析。



#### `ses.downloadURL(url)`

* `url` String

在 `url`开始下载资源。 API 将生成一个 [下载网站](download-item.md) ，可 [将下载](#event-will-download) 活动访问。

**注意：** 这不会执行任何与页面来源相关的安全检查， 与 [`webContents.downloadURL`](web-contents.md#contentsdownloadurlurl)不同。



#### `ses.createInterruptedDownload(options)`

* `选项` 对象 
    * `path` String - 下载的绝对路径.
  * `urlChain` String[] - 完整的 url 下载地址.
  * `mimeType` String (可选)
  * `offset` Integer - 下载的开始范围.
  * `length` Integer - 下载的总长度。
  * `lastModified` 字符串（可选） - 最后修改的标题值。
  * `eTag` 字符串（可选） - 电子标签标题值。
  * `startTime` Double (optional) - 下载的时间是从 UNIX 时代以来的秒数开始的。

允许从上一个 `Session` 恢复 ` cancelled ` 或 ` interrupted ` 下载。 该 API 将生成一个 [ DownloadItem ](download-item.md), 可使用 [ will-download ](#event-will-download) 事件进行访问。 [ DownloadItem ](download-item.md) 将不具有与之关联的任何 ` WebContents `, 并且初始状态将为 ` interrupted `。 只有在 [ DownloadItem ](download-item.md) 上调用 ` resume ` API 时, 才会启动下载。



#### `ses.清除自动缓存（）`

返回 `Promise<void>` - 当会话的 HTTP 身份验证缓存已清除时解析。



#### `ses.setPreloads(preloads)`

* `preloads` String[] - 数组，该数组由所有需要进行预加载的脚本的绝对路径组成。

在正常 `preload` 脚本运行之前，添加将执行与本会话关联的所有 Web 内容 的脚本。



#### `ses.getPreloads()`

返回 `String[]` 返回一个数组，这个数组由已经注册过的预加载脚本的路径组成。



#### `ses. 设置斯佩尔切克可启用 （启用）`

* `enable` Boolean

设置是否启用内置拼写检查器。



#### `塞斯. 埃斯佩尔 · 切克可 （）`

返回 `Boolean` - 是否启用内置拼写检查器。



#### `塞斯. 设置斯佩尔切克兰瓜格斯 （语言）`

* `languages` 字符串[]- 一系列语言代码，使拼写检查器。

内置拼写检查器不会自动检测用户键入的语言。  为了让 拼写检查器正确检查单词，您必须使用一系列语言代码调用此 API。  您可以 获得带有 `ses.availableSpellCheckerLanguages` 属性的支持语言代码列表。

**注意：** macOS 上使用操作系统拼写检查器，并将自动检测您的语言。  此API是马科斯的禁用。



#### `塞斯. 获取斯佩尔切克兰瓜格斯 （）`

返回 `String[]` - 启用拼写检查器的一系列语言代码。  如果此列表是空的拼写检查器 将回落到使用 `en-US`。  默认情况下，如果此设置为空列表，Electron 将尝试将此 设置与当前操作系统设置填充。  此设置在重新启动时持续存在。

**注意：** 在 macOS 上使用操作系统拼写检查器，并有自己的语言列表。  此API是马科斯的禁用。



#### `ses.setSpellCheckerDictionaryDownloadURL(url)`

* `url` 字符串 - 电子下载驼背字典的基本 URL。

默认情况下，电子公司将从铬CDN下载大括号字典。  如果你想推翻这种 行为，你可以使用这个API指向字典下载器在你自己的托管版本的驼背 字典。  我们发布一个 `hunspell_dictionaries.zip` 文件，每个版本包含您需要 托管的文件，文件服务器必须 **情况下麻木不仁** 您必须上传每个文件两次，一次与它 在ZIP文件中的情况下，一次与文件名作为所有小写。

如果 `hunspell_dictionaries.zip` 中的文件在 `https://example.com/dictionaries/language-code.bdic` 时可用，那么您应该用 `ses.setSpellCheckerDictionaryDownloadURL('https://example.com/dictionaries/')`调用此 api 。  请 注意后面的斜线。  字典的网址形成为 `${url}${filename}`。

**注意：** 在 macOS 上使用操作系统拼写检查器，因此我们不下载任何字典文件。  此API是马科斯的禁用。



#### `ses.列表字在斯佩尔切克词典（）`

返回 `Promise<String[]>` - 应用程序自定义字典中所有单词的阵列。 从磁盘加载完整字典时解析。



#### `ses. 添加字到斯佩尔切克词典 （字）`

* `word` 字符串 - 要添加到字典中的单词

返回 `Boolean` - 该单词是否成功写入自定义字典。 此 API 不会适用于非持久性（内存）会话。

**注意：** 在 macos 和 Windows 10 上， 这个词也将写到操作系统自定义字典



#### `ses.从斯佩尔切克删除字（字）`

* `word` 字符串 - 要从字典中删除的单词

返回 `Boolean` - 这个词是否成功地从自定义字典中删除。 此 API 不会适用于非持久性（内存）会话。

**注意：** macos 和 Windows 10 上， 这个词也将从操作系统自定义字典中删除



#### `ses.loadExtension(path[, options])`

* `path` 字符串 - 包含未包装的 Chrome 扩展的目录路径
* `options` Object (可选) 
    * `allowFileAccess` Boolean - 是否允许扩展通过 `file://` 协议读取本地文件，并将内容脚本注入 `file://` 页面。 这需要，例如在 `file://` 网址上加载 开发人员的扩展。 默认值为 false.

返回 `Promise<Extension>` - 加载扩展时解析。

如果无法加载扩展，此方法将提出一个例外。 如果 安装扩展时存在警告（例如，如果扩展 请求电子不支持的 API），则它们将被记录到 控制台。

请注意，电子不支持全系列的铬扩展API。 有关支持的内容的更多详细信息，请参阅 [支持扩展 ABI](extensions.md#supported-extensions-apis) 更多详细信息。

请注意，在以前版本的 Electron 中，加载的扩展将 在应用程序的未来运行中记住。 情况已经不是这样了：如果您希望加载 扩展，则必须在应用的每个启动上调用 `loadExtension` 。



```js
康斯特 { app, session } =需要（"电子"）
条路径=需要（"路径"）

应用程序。 不对称（）=> =
  等待会话。默认Session.load扩展（
    路径。join（__dirname，"反应式扩展"），
    //允许文件访问需要加载 file:// 网址上的扩展。
    { allowFileAccess: true }
  ）
  //请注意，要使用"反应DevTools"扩展，您需要
  //下载并解答扩展的副本。
})
```


此 API 不支持加载包装（.crx）扩展。

**注意:** 该 API 不能在 `app` 模块的 `ready` 事件之前调用.

**注意：** 将扩展加载到内存（非持久性）会话 支持，并且会抛出错误。



#### `ses.删除扩展（扩展ID）`

* `extensionId` 字符串 - 要删除的扩展 ID

卸载扩展。

**注意:** 该 API 不能在 `app` 模块的 `ready` 事件之前调用.



#### `ses.获取扩展（扩展ID）`

* `extensionId` 字符串 - 要查询的扩展 ID

返回 `Extension` | `null` -加载的扩展与给定的ID。

**注意:** 该 API 不能在 `app` 模块的 `ready` 事件之前调用.



#### `ses.获取所有扩展（）`

返回 `Extension[]` - 所有加载扩展的列表。

**注意:** 该 API 不能在 `app` 模块的 `ready` 事件之前调用.



### 实例属性

以下属性在` Session </ 0>实例上可用：</p>

<h4 spaces-before="0"><code>ses.availableSpellCheckerLanguages` _·里德利·_</h4> 

`String[]` 阵列，由所有已知的可用拼写检查语言组成。  向不在此阵列中的 `setSpellCheckerLanguages` API 提供语言 代码将导致错误。



#### `塞斯. 拼写检查器可`

指示是否启用内置拼写检查器的 `Boolean` 。



#### `ses.cookies` _·里德利·_

此会话的 [`Cookies`](cookies.md) 对象。



#### `ses.serviceWorkers` _·里德利·_

此会话的 [`ServiceWorkers`](service-workers.md) 对象。



#### `ses.webRequest` _·里德利·_

此会话的 [`WebRequest`](web-request.md) 对象。



#### `ses.protocol` _·里德利·_

此会话的 [`Protocol`](protocol.md) 对象。



```javascript
康斯特 { app, session } =要求（"电子"）
const路径=需要（'路径'）

应用程序。当准备（然后）=> =
  const协议=会话。从分区（'某些分区'。协议
  如果（！协议。注册文件（'原子'， （请求、回调）=> =
    const url=请求.url.substr（7）
    回调（+路径：路径。规范化（"${__dirname}/${url}"）}）
  ））{
    控制台。error（"未注册协议"）
  =
}）
```




#### `ses.netLog` _·里德利·_

此会话的 [`NetLog`](net-log.md) 对象。



```javascript
康斯特 { app, session } =需要（"电子"）

应用程序。当已准备好时。然后（不对称（）=> {
  续网格=会话。从分区（"某些分区"）。netLog

  //在某些网络事件
  持续路径之后 =等待 netLog.stopLo）
  控制台.log（"写入的网络日志"， 路径）
}）
```
