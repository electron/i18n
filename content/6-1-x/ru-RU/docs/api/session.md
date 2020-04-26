# session

> Session Управление сеансами браузера, куками, кешем, настройками прокси и т. д.

Процесс: [Главный](../glossary.md#main-process)

Модуль `session` может быть использован для создания новых объектов `Session`.

Вы также можете получить доступ к `session` существующих страниц, используя свойство `session` в [`WebContents`](web-contents.md), или из модуля `session`.

```javascript
const { BrowserWindow } = require('electron')

let win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL('http://github.com')

const ses = win.webContents.session
console.log(ses.getUserAgent())
```

## Методы

Модуль `session` имеет следующие методы:

### `session.fromPartition(partition[, options])`

* `partition` String
* `options` Object (optional)
  * `cache` Boolean - Включен ли кэш.

Возвращает `Session` - Экземпляр сеанса из строки `partition`. При наличии `Session` с таким же `partition`, он будет возвращен; иначе новый экземпляр `Session` будет создан с `options`.

Если `partition` начинается с `persist:`, страница будет использовать постоянный сеанс, который доступен всем страницам в приложении с тем же `partition`. если нет префикса `persist:`, страница будет использовать сеанс в памяти. Если `partition` пуст, то будет возвращен сеанс приложения по умолчанию.

Чтобы создать `Session` с `options`, вы должны убедиться, что `Session` с `partition` раньше никогда не использовался. Невозможно изменить `options` из существующего `Session` объекта.

## Свойства

Модуль `session` имеет следующие свойства:

### `session.defaultSession`

Объект `Session`, объект сеанса по умолчанию для приложения.

## Класс: Session

> Получает и устанавливает свойства сеанса.

Процесс: [Главный](../glossary.md#main-process)

Вы можете создать объект `Session` в модуле `session`:

```javascript
const { session } = require('electron')
const ses = session.fromPartition('persist:name')
console.log(ses.getUserAgent())
```

### События экземпляра

Для экземпляров `Session` доступны следующие события:

#### Событие: 'will-download'

* `event` Event
* `item` [DownloadItem](download-item.md)
* `webContents` [WebContents](web-contents.md)

Возникает, когда Electron собирается загрузить `item` в `webContents`.

Вызов `event.preventDefault()` отменит загрузку, и `item` не будет доступен со следующего тика процесса.

```javascript
const { session } = require('electron')
session.defaultSession.on('will-download', (event, item, webContents) => {
  event.preventDefault()
  require('request')(item.getURL(), (data) => {
    require('fs').writeFileSync('/somewhere', data)
  })
})
```

### Методы экземпляра

Для экземпляров `Session` доступны следующие методы:

#### `ses.getCacheSize(callback)`

* `callback` Function
  * `size` Integer - Cache size used in bytes.
  * `error` Integer - The error code corresponding to the failure.

Callback is invoked with the session's current cache size.

**[Скоро устареет](modernization/promisification.md)**

#### `ses.getCacheSize()`

Возвращает `Promise<Integer>` - текущий размер кэша сеанса, в байтах.

#### `ses.clearCache(callback)`

* `callback` Function - Called when operation is done.
  * `error` Integer - The error code corresponding to the failure.

Очищает HTTP-кэш сеанса.

**[Скоро устареет](modernization/promisification.md)**

#### `ses.clearCache()`

Возвращает `Promise<void>` - Разрешение после завершения операции очистки кэша.

Очищает HTTP-кэш сеанса.

#### `ses.clearStorageData([options,] callback)`

* `options` Object (optional)
  * `origin` String (опционально) - Должен следовать представлению `window.location.origin` `scheme://host:port`.
  * `storages` String[] (опционально) - типы хранилищ для очистки, могут содержать: `appcache`, `cookies`, `filesystem`, `indexdb`, `localstorage`, `shadercache`, `websql`, `serviceworkers`, `cachestorage`.
  * `quotas` String[] (опционально) - типы квот для очистки, могут содержать: `temporary`, `persistent`, `syncable`.
* `callback` Function (optional) - Called when operation is done.

Clears the storage data for the current session.

**[Скоро устареет](modernization/promisification.md)**

#### `ses.clearStorageData([options])`

* `options` Object (optional)
  * `origin` String (опционально) - Должен следовать представлению `window.location.origin` `scheme://host:port`.
  * `storages` String[] (опционально) - типы хранилищ для очистки, могут содержать: `appcache`, `cookies`, `filesystem`, `indexdb`, `localstorage`, `shadercache`, `websql`, `serviceworkers`, `cachestorage`.
  * `quotas` String[] (опционально) - типы квот для очистки, могут содержать: `temporary`, `persistent`, `syncable`.

Возвращает `Promise<void>` - Разрешение после завершения очистки данных хранилища.

#### `ses.flushStorageData()`

Записывает непрочитанные DOMStorage данные на диск.

#### `ses.setProxy(config, callback)`

* `config` Object
  * `pacScript` String - URL- адрес, связанный с PAC-файлом.
  * `proxyRules` String - Правила, указывающие какие прокси использовать.
  * `proxyBypassRules` String - Правила, указывающие, какие URL должны обходить настройки прокси.
* `callback` Function - Called when operation is done.

Установка настроек прокси.

При совместном использовании `pacScript` и `proxyRules` опция `proxyRules` игнорируется, и применяется конфигурация `pacScript`.

`proxyRules` должен следовать следующим правилам:

```sh
proxyRules = schemeProxies[";"<;0>]
schemeProxies = [<;1>"="]<;2>
urlScheme = "http" | "https" | "ftp" | "socks"
proxyURIList = <;3>[","<;2>]
proxyURL = [<;4>"://"]<;5>[":"<;6>]
```

Например:

* `http=foopy:80;ftp=foopy2` - Использовать HTTP прокси `foopy:80` для URL `http://`, и HTTP прокси `foopy2:80` для URL `ftp://`.
* `foopy:80` - Использовать HTTP прокси `foopy:80` для всех URL.
* `foopy:80,bar,direct://` - Использовать HTTP прокси `foopy:80` для всех URL-адресов, переключение на `bar`, если `foopy:80` недоступен, и после этого прокси не использовать.
* `socks4://foopy` - Использовать SOCKS v4 прокси `foopy:1080` для всех URL.
* `http=foopy,socks5://bar.com` - Использовать HTTP прокси `foopy` для http URL-адресов и и переключиться на прокси SOCKS5 `bar.com`, если `foopy` недоступен.
* `http=foopy,direct://` - Использовать HTTP прокси `foopy` для http URL-адресов и не использовать прокси, если `foopy` недоступен.
* `http=foopy;socks=foopy2` - Использовать HTTP прокси `foopy` для http URL-адресов и использовать `socks4://foopy2` для всех других URL.

`proxyBypassRules` - это список правил, разделенных запятыми:

* `[ URL_SCHEME "://" ] HOSTNAME_PATTERN [ ":" <;0> ]`

   Сопоставьте все имена хостов, которые соответствуют шаблону HOSTNAME_PATTERN.

   Например:    "foobar.com", "*foobar.com", "*.foobar.com", "*foobar.com:99", "https://x.*.y.com:99"

 * `"." HOSTNAME_SUFFIX_PATTERN [ ":" PORT ]`

   Соответствует суффиксу конкретного домена.

   Например: ".google.com", ".com", "http://.google.com"

* `[ SCHEME "://" ] IP_LITERAL [ ":" PORT ]`

   Сравнивать URL, которые являются знаками IP-адресов.

   Например: "127.0.1", "[0:0::1]", "[::1]", "http://[::1]:99"

* `IP_LITERAL "/" PREFIX_LENGTH_IN_BITS`

   Match any URL that is to an IP literal that falls between the given range. IP range is specified using CIDR notation.

   Например: "192.168.1.1/16", "fefe:13::abc/33".

* `<local>`

   Match local addresses. The meaning of `<local>` is whether the host matches one of: "127.0.0.1", "::1", "localhost".

**[Скоро устареет](modernization/promisification.md)**

#### `ses.setProxy(config)`

* `config` Object
  * `pacScript` String - URL- адрес, связанный с PAC-файлом.
  * `proxyRules` String - Правила, указывающие какие прокси использовать.
  * `proxyBypassRules` String - Правила, указывающие, какие URL должны обходить настройки прокси.

Возвращает `Promise<void>` - Разрешение после завершения процесса настройки прокси.

Установка настроек прокси.

При совместном использовании `pacScript` и `proxyRules` опция `proxyRules` игнорируется, и применяется конфигурация `pacScript`.

`proxyRules` должен следовать следующим правилам:

```sh
proxyRules = schemeProxies[";"<;0>]
schemeProxies = [<;1>"="]<;2>
urlScheme = "http" | "https" | "ftp" | "socks"
proxyURIList = <;3>[","<;2>]
proxyURL = [<;4>"://"]<;5>[":"<;6>]
```

Например:

* `http=foopy:80;ftp=foopy2` - Использовать HTTP прокси `foopy:80` для URL `http://`, и HTTP прокси `foopy2:80` для URL `ftp://`.
* `foopy:80` - Использовать HTTP прокси `foopy:80` для всех URL.
* `foopy:80,bar,direct://` - Использовать HTTP прокси `foopy:80` для всех URL-адресов, переключение на `bar`, если `foopy:80` недоступен, и после этого прокси не использовать.
* `socks4://foopy` - Использовать SOCKS v4 прокси `foopy:1080` для всех URL.
* `http=foopy,socks5://bar.com` - Использовать HTTP прокси `foopy` для http URL-адресов и и переключиться на прокси SOCKS5 `bar.com`, если `foopy` недоступен.
* `http=foopy,direct://` - Использовать HTTP прокси `foopy` для http URL-адресов и не использовать прокси, если `foopy` недоступен.
* `http=foopy;socks=foopy2` - Использовать HTTP прокси `foopy` для http URL-адресов и использовать `socks4://foopy2` для всех других URL.

`proxyBypassRules` - это список правил, разделенных запятыми:

* `[ URL_SCHEME "://" ] HOSTNAME_PATTERN [ ":" <;0> ]`

   Сопоставьте все имена хостов, которые соответствуют шаблону HOSTNAME_PATTERN.

   Например:    "foobar.com", "*foobar.com", "*.foobar.com", "*foobar.com:99", "https://x.*.y.com:99"

 * `"." HOSTNAME_SUFFIX_PATTERN [ ":" PORT ]`

   Соответствует суффиксу конкретного домена.

   Например: ".google.com", ".com", "http://.google.com"

* `[ SCHEME "://" ] IP_LITERAL [ ":" PORT ]`

   Сравнивать URL, которые являются знаками IP-адресов.

   Например: "127.0.1", "[0:0::1]", "[::1]", "http://[::1]:99"

* `IP_LITERAL "/" PREFIX_LENGTH_IN_BITS`

   Match any URL that is to an IP literal that falls between the given range. IP range is specified using CIDR notation.

   Например: "192.168.1.1/16", "fefe:13::abc/33".

* `<local>`

   Match local addresses. The meaning of `<local>` is whether the host matches one of: "127.0.0.1", "::1", "localhost".

#### `ses.resolveProxy(url, callback)`

* `url` URL
* `callback` Function
  * `proxy` String

Resolves the proxy information for `url`. The `callback` will be called with `callback(proxy)` when the request is performed.

**[Скоро устареет](modernization/promisification.md)**

#### `ses.resolveProxy(url)`

* `url` URL

Возвращает `Promise<string>` - Разрешение с информацией прокси для `url`.

#### `ses.setDownloadPath(path)`

* `path` String - Место загрузки.

Sets download saving directory. By default, the download directory will be the `Downloads` under the respective app folder.

#### `ses.enableNetworkEmulation(options)`

* `options` Object
  * `offline` Boolean (optional) - Whether to emulate network outage. Defaults to false.
  * `latency` Double (optional) - RTT in ms. Defaults to 0 which will disable latency throttling.
  * `downloadThroughput` Double (optional) - Download rate in Bps. Defaults to 0 which will disable download throttling.
  * `uploadThroughput` Double (optional) - Upload rate in Bps. Defaults to 0 which will disable upload throttling.

Эмулирует сеть с заданной конфигурацией для `session`.

```javascript
// Для эмулирования GPRS соединения с пропускной способностью 50кбит/с и задержкой 500 мс.
window.webContents.session.enableNetworkEmulation({
  latency: 500,
  downloadThroughput: 6400,
  uploadThroughput: 6400
})

// Для эмулирования отключения или отказа сети.
window.webContents.session.enableNetworkEmulation({ offline: true })
```

#### `ses.disableNetworkEmulation()`

Disables any network emulation already active for the `session`. Resets to the original network configuration.

#### `ses.setCertificateVerifyProc(proc)`

* `proc` Function
  * `request` Object
    * `hostname` String
    * `certificate` [Certificate](structures/certificate.md)
    * `verificationResult` String - Результат проверки из хрома.
    * `errorCode` Integer - Код ошибки.
  * `callback` Function
    * `verificationResult` Integer - Value can be one of certificate error codes from [here](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h). Apart from the certificate error codes, the following special codes can be used.
      * `0` - Указывает на успех и отключает проверку прозрачности сертификата.
      * `-2` - указывает на сбой.
      * `-3` - Использует результат проверки из хрома.

Устанавливает значение проверки сертификата для `session`, `proc` будет вызываться с `proc(request, callback)` всякий раз, когда запрашивается сертификат сервера. Вызов `callback(0)` принимает сертификат, вызов `callback(-2)` отклоняет его.

Вызов `setCertificateVerifyProc (null)` приведет к возврату к процедуре проверки сертификата по умолчанию.

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
  * `webContents` [WebContents](web-contents.md) - WebContents requesting the permission.  Please note that if the request comes from a subframe you should use `requestingUrl` to check the request origin.
  * `permission` String - Enum of 'media', 'geolocation', 'notifications', 'midiSysex', 'pointerLock', 'fullscreen', 'openExternal'.
  * `callback` Function
    * `permissionGranted` Boolean - Allow or deny the permission.
  * `details` Object - Some properties are only available on certain permission types.
    * `externalURL` String (Optional) - The url of the `openExternal` request.
    * `mediaTypes` String[] (Optional) - The types of media access being requested, elements can be `video` or `audio`
    * `requestingUrl` String - The last URL the requesting frame loaded
    * `isMainFrame` Boolean - Whether the frame making the request is the main frame

Sets the handler which can be used to respond to permission requests for the `session`. Calling `callback(true)` will allow the permission and `callback(false)` will reject it. To clear the handler, call `setPermissionRequestHandler(null)`.

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

* `callback` Function (optional) - Called when operation is done.

Clears the host resolver cache.

**[Скоро устареет](modernization/promisification.md)**

#### `ses.clearHostResolverCache()`

Returns `Promise<void>` - Resolves when the operation is complete.

Clears the host resolver cache.

#### `ses.allowNTLMCredentialsForDomains(domains)`

* `domains` String - A comma-separated list of servers for which integrated authentication is enabled.

Dynamically sets whether to always send credentials for HTTP NTLM or Negotiate authentication.

```javascript
const { session } = require('electron')
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

**[Скоро устареет](modernization/promisification.md)**

#### `ses.getBlobData(identifier)`

* `identifier` String - Valid UUID.

Returns `Promise<Buffer>` - resolves with blob data.

#### `ses.createInterruptedDownload(options)`

* `options` Object
  * `path` String - Absolute path of the download.
  * `urlChain` String[] - Complete URL chain for the download.
  * `mimeType` String (optional)
  * `offset` Integer - Start range for the download.
  * `length` Integer - Total length of the download.
  * `lastModified` String - Last-Modified header value.
  * `eTag` String - ETag header value.
  * `startTime` Double (optional) - Time when download was started in number of seconds since UNIX epoch.

Allows resuming `cancelled` or `interrupted` downloads from previous `Session`. The API will generate a [DownloadItem](download-item.md) that can be accessed with the [will-download](#event-will-download) event. The [DownloadItem](download-item.md) will not have any `WebContents` associated with it and the initial state will be `interrupted`. The download will start only when the `resume` API is called on the [DownloadItem](download-item.md).

#### `ses.clearAuthCache(options, callback)`

* `options` ([RemovePassword](structures/remove-password.md) | [RemoveClientCertificate](structures/remove-client-certificate.md))
* `callback` Function - Called when operation is done.

Clears the session’s HTTP authentication cache.

**[Скоро устареет](modernization/promisification.md)**

#### `ses.clearAuthCache(options)` _(deprecated)_

* `options` ([RemovePassword](structures/remove-password.md) | [RemoveClientCertificate](structures/remove-client-certificate.md))

Returns `Promise<void>` - resolves when the session’s HTTP authentication cache has been cleared.

#### `ses.clearAuthCache()`

Returns `Promise<void>` - resolves when the session’s HTTP authentication cache has been cleared.

#### `ses.setPreloads(preloads)`

* `preloads` String[] - An array of absolute path to preload scripts

Adds scripts that will be executed on ALL web contents that are associated with this session just before normal `preload` scripts run.

#### `ses.getPreloads()`

Returns `String[]` an array of paths to preload scripts that have been registered.

### Instance Properties

The following properties are available on instances of `Session`:

#### `ses.cookies`

A [Cookies](cookies.md) object for this session.

#### `ses.webRequest`

A [WebRequest](web-request.md) object for this session.

#### `ses.protocol`

A [Protocol](protocol.md) object for this session.

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
