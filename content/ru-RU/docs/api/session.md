# session

> Session Управление сеансами браузера, куками, кешем, настройками прокси и т. д.

Процесс: [Основной](../glossary.md#main-process)

Модуль `session` может быть использован для создания новых объектов `Session`.

Вы также можете получить доступ к `session` существующих страниц, используя свойство `session` в [`WebContents`](web-contents.md), или из модуля `session`.

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL('http://github.com')

const ses = win.webContents.session
console.log(ses.getUserAgent())
```

## Методы

Модуль `session` имеет следующие методы:

### `session.fromPartition(partition[, options])`

* `partition` String
* `options` Object (опционально)
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

Процесс: [Основной](../glossary.md#main-process)

Вы можете создать объект `Session` в модуле `session`:

```javascript
const { session } = require('electron')
const ses = session.fromPartition('persist:name')
console.log(ses.getUserAgent())
```

### События экземпляра

Для экземпляров `Session` доступны следующие события:

#### Событие: 'will-download'

Возвращает:

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

#### Event: 'extension-loaded'

Возвращает:

* `event` Event
* `extension` [Extension](structures/extension.md)

Emitted after an extension is loaded. This occurs whenever an extension is added to the "enabled" set of extensions. This includes:

- Extensions being loaded from `Session.loadExtension`.
- Extensions being reloaded:
  * from a crash.
  * if the extension requested it ([`chrome.runtime.reload()`](https://developer.chrome.com/extensions/runtime#method-reload)).

#### Event: 'extension-unloaded'

Возвращает:

* `event` Event
* `extension` [Extension](structures/extension.md)

Emitted after an extension is unloaded. This occurs when `Session.removeExtension` is called.

#### Event: 'extension-ready'

Возвращает:

* `event` Event
* `extension` [Extension](structures/extension.md)

Emitted after an extension is loaded and all necessary browser state is initialized to support the start of the extension's background page.

#### Event: 'preconnect'

Возвращает:

* `event` Event
* `preconnectUrl` String - URL-адрес, запрашиваемый рендерером для предварительного подключения.
* `allowCredentials` Boolean - True если рендерер запрашивает, чтобы соединение включало учетные данные (см. [spec](https://w3c.github.io/resource-hints/#preconnect) для получения более подробной информации.)

Возникает, когда в процессе рендеринга запрашивается предварительное подключение к URL, как правило, из-за [подсказки ресурса](https://w3c.github.io/resource-hints/).

#### Event: 'spellcheck-dictionary-initialized'

Возвращает:

* `event` Event
* `languageCode` String - The language code of the dictionary file

Emitted when a hunspell dictionary file has been successfully initialized. This occurs after the file has been downloaded.

#### Event: 'spellcheck-dictionary-download-begin'

Возвращает:

* `event` Event
* `languageCode` String - The language code of the dictionary file

Emitted when a hunspell dictionary file starts downloading

#### Event: 'spellcheck-dictionary-download-success'

Возвращает:

* `event` Event
* `languageCode` String - The language code of the dictionary file

Emitted when a hunspell dictionary file has been successfully downloaded

#### Event: 'spellcheck-dictionary-download-failure'

Возвращает:

* `event` Event
* `languageCode` String - The language code of the dictionary file

Emitted when a hunspell dictionary file download fails.  For details on the failure you should collect a netlog and inspect the download request.

#### Event: 'select-serial-port' _Experimental_

Возвращает:

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
  win.webContents.session.on('select-serial-port', (event, portList, callback) => {
    event.preventDefault()
    const selectedPort = portList.find((device) => {
      return device.vendorId === 0x2341 && device.productId === 0x0043
    })
    if (!selectedPort) {
      callback('')
    } else {
      callback(result1.portId)
    }
  })
})
```

#### Event: 'serial-port-added' _Experimental_

Возвращает:

* `event` Event
* `port` [SerialPort](structures/serial-port.md)
* `webContents` [WebContents](web-contents.md)

Emitted after `navigator.serial.requestPort` has been called and `select-serial-port` has fired if a new serial port becomes available.  For example, this event will fire when a new USB device is plugged in.

#### Event: 'serial-port-removed' _Experimental_

Возвращает:

* `event` Event
* `port` [SerialPort](structures/serial-port.md)
* `webContents` [WebContents](web-contents.md)

Emitted after `navigator.serial.requestPort` has been called and `select-serial-port` has fired if a serial port has been removed.  For example, this event will fire when a USB device is unplugged.

### Методы экземпляра

Для экземпляров `Session` доступны следующие методы:

#### `ses.getCacheSize()`

Возвращает `Promise<Integer>` - текущий размер кэша сеанса, в байтах.

#### `ses.clearCache()`

Возвращает `Promise<void>` - Разрешение после завершения операции очистки кэша.

Очищает HTTP-кэш сеанса.

#### `ses.clearStorageData([options])`

* `options` Object (опционально)
  * `origin` String (опционально) - Должен следовать представлению `window.location.origin` `scheme://host:port`.
  * `storages` String[] (опционально) - типы хранилищ для очистки, могут содержать: `appcache`, `cookies`, `filesystem`, `indexdb`, `localstorage`, `shadercache`, `websql`, `serviceworkers`, `cachestorage`. If not specified, clear all storage types.
  * `quotas` String[] (опционально) - типы квот для очистки, могут содержать: `temporary`, `persistent`, `syncable`. If not specified, clear all quotas.

Возвращает `Promise<void>` - Разрешение после завершения очистки данных хранилища.

#### `ses.flushStorageData()`

Записывает непрочитанные DOMStorage данные на диск.

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

Возвращает `Promise<void>` - Разрешение после завершения процесса настройки прокси.

Установка настроек прокси.

When `mode` is unspecified, `pacScript` and `proxyRules` are provided together, the `proxyRules` option is ignored and `pacScript` configuration is applied.

You may need `ses.closeAllConnections` to close currently in flight connections to prevent pooled sockets using previous proxy from being reused by future requests.

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

   Examples: ".google.com", ".com", "http://.google.com"

* `[ SCHEME "://" ] IP_LITERAL [ ":" PORT ]`

   Сравнивать URL, которые являются знаками IP-адресов.

   Например: "127.0.1", "[0:0::1]", "[::1]", "http://[::1]:99"

* `IP_LITERAL "/" PREFIX_LENGTH_IN_BITS`

   Match any URL that is to an IP literal that falls between the given range. IP range is specified using CIDR notation.

   Например: "192.168.1.1/16", "fefe:13::abc/33".

* `<local>`

   Match local addresses. The meaning of `<local>` is whether the host matches one of: "127.0.0.1", "::1", "localhost".

#### `ses.resolveProxy(url)`

* `url` URL

Возвращает `Promise<String>` - Разрешение с информацией прокси для `url`.

#### `ses.forceReloadProxyConfig()`

Returns `Promise<void>` - Resolves when the all internal states of proxy service is reset and the latest proxy configuration is reapplied if it's already available. The pac script will be fetched from `pacScript` again if the proxy mode is `pac_script`.

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

#### `ses.preconnect(options)`

* `options` Object
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
    * `certificate` [Certificate](structures/certificate.md)
    * `validatedCertificate` [Certificate](structures/certificate.md)
    * `verificationResult` String - Результат проверки из хрома.
    * `errorCode` Integer - Код ошибки.
  * `callback` Function
    * `verificationResult` Integer - Value can be one of certificate error codes from [here](https://source.chromium.org/chromium/chromium/src/+/master:net/base/net_error_list.h). Apart from the certificate error codes, the following special codes can be used.
      * `0` - Указывает на успех и отключает проверку прозрачности сертификата.
      * `-2` - указывает на сбой.
      * `-3` - Использует результат проверки из хрома.

Устанавливает значение проверки сертификата для `session`, `proc` будет вызываться с `proc(request, callback)` всякий раз, когда запрашивается сертификат сервера. Вызов `callback(0)` принимает сертификат, вызов `callback(-2)` отклоняет его.

Вызов `setCertificateVerifyProc (null)` приведет к возврату к процедуре проверки сертификата по умолчанию.

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
  * `webContents` [WebContents](web-contents.md) - WebContents requesting the permission.  Please note that if the request comes from a subframe you should use `requestingUrl` to check the request origin.
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
  * `callback` Function
    * `permissionGranted` Boolean - Allow or deny the permission.
  * `details` Object - Some properties are only available on certain permission types.
    * `externalURL` String (optional) - The url of the `openExternal` request.
    * `mediaTypes` String[] (optional) - The types of media access being requested, elements can be `video` or `audio`
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

* `handler` Function\<Boolean> | null
  * `webContents` [WebContents](web-contents.md) - WebContents checking the permission.  Please note that if the request comes from a subframe you should use `requestingUrl` to check the request origin.
  * `permission` String - Type of permission check.  Valid values are `midiSysex`, `notifications`, `geolocation`, `media`,`mediaKeySystem`,`midi`, `pointerLock`, `fullscreen`, `openExternal`, or `serial`.
  * `requestingOrigin` String - The origin URL of the permission check
  * `details` Object - Some properties are only available on certain permission types.
    * `securityOrigin` String - The security origin of the `media` check.
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

Это не влияет на существующие `WebContents`, и каждый `WebContents` можете использовать `webContents.setUserAgent` для переопределения пользовательского агента в ширину сеанса.

#### `ses.isPersistent()`

Возвращает `Boolean` - Является ли эта сессия постоянной. Сеанс `webContents` по умолчанию `BrowserWindow` является постоянным. При создании сеанса раздела сеанс, накрепенный на `persist:` будет постоянным, в то время как другие будут временными.

#### `ses.getUserAgent()`

Возвращает `String` - Пользовательский агент для этой сессии.

#### `ses.setSSLConfig (конфиг)`

* `config` Object
  * `minVersion` String (по желанию) - может быть `tls1`, `tls1.1`, `tls1.2` или `tls1.3`. Данный версию SSL, чтобы при подключении к удаленным серверам. По умолчанию `tls1`.
  * `maxVersion` строка (по желанию) - может быть `tls1.2` или `tls1.3`. Максимальная версия SSL позволяет при подключении к удаленным серверам. По умолчанию `tls1.3`.
  * `disabledCipherSuites` Integer( по желанию) - Список наборов шифров, которые должны быть явно запрещены к использованию в дополнение к тем , которые отключены чистой встроенной политикой. Поддерживаемые буква 0xAABB формы: `cipher_suite[0]` АА `cipher_suite[1]`, как определено в RFC 2246, раздел 7.4.1.2. Непризнанные, с разборчивые наборы шифров в этой форме не вернут ошибку. На фото: чтобы отключить TLS_RSA_WITH_RC4_128_MD5, укажите 0x0004, в то время как отключить TLS_ECDH_ECDSA_WITH_RC4_128_SHA, укажите 0xC002. Обратите внимание, что шифры TLSv1.3 не могут быть отключены с помощью этого механизма.

Устанавливает конфигурацию SSL для сеанса. Все последующие сетевые запросы будут использовать новую конфигурацию. Существующие сетевые соединения (такие как WebSocket соединения) не будут прекращены, но старые розетки в пуле не будут повторно использованы для новых соединений.

#### `ses.getBlobData (идентификатор)`

* `identifier` строка - действительный UUID.

Возвращает `Promise<Buffer>` - разрешает с blob данных.

#### `ses.downloadURL(url)`

* `url` String

Инициирует загрузку ресурса по крайней `url`. API будет генерировать [DownloadItem](download-item.md) которые могут быть доступны с [будет скачать](#event-will-download) событие.

**Примечание:** Это не выполняет каких-либо проверок безопасности, которые относятся к происхождению страницы, отличие [`webContents.downloadURL`](web-contents.md#contentsdownloadurlurl).

#### `ses.createInterruptedDownload(options)`

* `options` Object
  * `path` String - Абсолютный путь загрузки.
  * `urlChain` String - Полная цепочка URL для скачивания.
  * `mimeType` строка (по желанию)
  * `offset` Integer - Стартовый диапазон для скачивания.
  * `length` Integer - Общая длина загрузки.
  * `lastModified` Строка (необязательно) - Последнее измененное значение заголовка.
  * `eTag` строка (по желанию) - значение заголовка ETag.
  * `startTime` Double (по желанию) - Время, когда загрузка была количество секунд со времен UNIX.

Позволяет возобновить `cancelled` или `interrupted` загрузки с предыдущих `Session`. API будет генерировать [DownloadItem](download-item.md) которые могут быть доступны с [будет скачать](#event-will-download) событие. В [DownloadItem](download-item.md) не будет иметь никаких `WebContents` , связанных с ним и если начальное состояние будет `interrupted`. Загрузка начнется только тогда, когда `resume` API будет вызван на [DownloadItem](download-item.md).

#### `ses.clearAuthCache()`

Возвращает `Promise<void>` - разрешается при смекоте проверки подлинности сеанса HTTP.

#### `ses.setPreloads (предустановки)`

* `preloads` String - массив абсолютного пути к предзагрузки скриптов

Добавляет скрипты, которые будут выполняться на ВСЕХ веб-содержимого, которые связаны с этой сессии как раз перед `preload` запуска скриптов.

#### `ses.getPreloads()`

Возвращает `String[]` массив путей для предустановки скриптов, которые были зарегистрированы.

#### `ses.setSpellCheckerEnabled (включить)`

* `enable` Boolean

Устанавливает, следует ли включить встроенную проверку орфографии.

#### `ses.isSpellCheckerEnabled()`

Возвращает `Boolean` - включена ли встроенная проверка орфографии.

#### `ses.setSpellCheckerLanguages (языки)`

* `languages` String - массив языковых кодов для проверки орфографии.

Встроенный в орфографии не автоматически определяет, на каком языке пользователь печатает.  Для того, чтобы проверку орфографии, чтобы правильно проверить их слова, вы должны позвонить в этот API с массивом языковых кодов.  Вы можете получить список поддерживаемых языковых кодов с `ses.availableSpellCheckerLanguages` собственности.

**Примечание:** на macOS используется os spellchecker и автоматически обнаруживает ваш язык.  Этот API не является операцией на macOS.

#### `ses.getSpellCheckerLanguages()`

Возвращает `String[]` - Массив языковых кодов, для которые включен орфография.  Если этот список пуст, орфография будет отыкаться к использованию `en-US`.  По умолчанию при запуске, если этот параметр пустой список Electron будет пытаться заполнить этот настройки с текущей локале ОС.  Эта настройка сохраняется при перезагрузке.

**Примечание:** На macOS используется орфография ОС и имеет свой собственный список языков.  Этот API не является операцией на macOS.

#### `ses.setSpellCheckerDictionaryDownloadURL(url)`

* `url` String - базовый URL для Electron для загрузки словарей hunspell.

По умолчанию Electron загрузит словари hunspell из Chromium CDN.  Если вы хотите переопределить это поведение, вы можете использовать этот API, чтобы указать загрузщик словаря на собственную размещенную версию hunspell.  Мы публикуем файл `hunspell_dictionaries.zip` с каждым выпуском, который содержит файлы, которые вам нужно для размещения здесь, файловый сервер должен быть **случае нечувствительным** вы должны загрузить каждый файл дважды, один раз с случаем, он имеет в файле и один раз с именем файла, как и все нижние дела.

Если файлы, присутствующие в `hunspell_dictionaries.zip` доступны на `https://example.com/dictionaries/language-code.bdic` то вы должны позвонить в этот api с `ses.setSpellCheckerDictionaryDownloadURL('https://example.com/dictionaries/')`.  Пожалуйста обратите внимание на задний черту.  URL-адрес словарей формируется как `${url}${filename}`.

**Примечание:** на macOS используется OS spellchecker, и поэтому мы не загружаем словарные файлы.  Этот API не является операцией на macOS.

#### `ses.listWordsInSpellCheckerDictionary ()`

Возвращает `Promise<String[]>` - массив всех слов в пользовательском словаре приложения. Разрешает, когда полный словарь загружается с диска.

#### `ses.addWordToSpellCheckerDictionary (слово)`

* `word` строка - слово, которое вы хотите добавить в словарь

Возвращает `Boolean` - Было ли слово успешно написано в пользовательский словарь. Этот API не будет работать на нестойких (в памяти) сеансах.

**Примечание:** на macOS и Windows 10 это слово будет написано в пользовательский словарь ОС, а также

#### `ses.removeWordFromSpellCheckerDictionary (слово)`

* `word` строка - слово, которое вы хотите удалить из словаря

Возвращает `Boolean` - было ли слово успешно удалено из пользовательского словаря. Этот API не будет работать на нестойких (в памяти) сеансах.

**Примечание:** на macOS и Windows 10 это слово будет удалено из пользовательского словаря ОС, а также

#### `ses.loadExtension(path[, options])`

* `path` Строка - Путь к каталогу, содержащем распакованные chrome расширение
* `options` Object (опционально)
  * `allowFileAccess` Boolean - Разрешить ли расширение читать локальные файлы в течение `file://` протокола и вводить скрипты контента `file://` страницы. Это необходимо, например, для загрузки devtools на `file://` URL-адреса. По умолчанию - false.

Возвращает `Promise<Extension>` - разрешает при загрузке расширения.

Этот метод сделает исключение, если расширение не может быть загружено. Если есть предупреждения при установке расширения (например, если расширение запрашивает API, который Electron не поддерживает), то они будут зарегистрированы на консоли.

Обратите внимание, что Electron не поддерживает весь спектр API расширений Chrome. Более подробную [поддержке API-](extensions.md#supported-extensions-apis) расширения подробную информацию о том, что поддерживается.

Обратите внимание, что в предыдущих версиях Electron, расширения, которые были , будут помнить для будущих запусков приложения. Это уже не так: `loadExtension` должны быть вызваны на каждой загрузки вашего приложения, если вы хотите, расширение будет загружено.

```js
const { app, session } требуют ('электрон')
const путь и требуют ('путь')

app.on ('ready', async () -> -
  ждут session.defaultSession.loadExtension (
    path.join (__dirname, 'react-devtools'),
    // allowFileAccess требуется для загрузки расширения devtools на file:// URL-адресах.
    { allowFileAccess: true }
  )
  // Обратите внимание, что для того, чтобы использовать расширение React DevTools, вам нужно
  // скачать и распаковать копию расширения.
})
```

Этот API не поддерживает загрузку упакованных (.crx) расширений.

**Примечание:** Этот метод не может быть вызван до тех пор, пока событие `ready` модуля `app` не произойдет.

**Примечание:** Загрузка расширений в сеансы памяти (нестойкие) не поддерживается и будет бросать ошибку.

#### `ses.removeExtension (расширениеId)`

* `extensionId` строка - идентификатор расширения для удаления

Разгружает расширение.

**Примечание:** Этот метод не может быть вызван до тех пор, пока событие `ready` модуля `app` не произойдет.

#### `ses.getExtension (расширениеId)`

* `extensionId` строка - идентификатор расширения запроса

Возвращает `Extension` | `null` - Загруженное расширение с данным идентификатором.

**Примечание:** Этот метод не может быть вызван до тех пор, пока событие `ready` модуля `app` не произойдет.

#### `ses.getAllExtensions()`

Возвращает `Extension[]` - Список всех загруженных расширений.

**Примечание:** Этот метод не может быть вызван до тех пор, пока событие `ready` модуля `app` не произойдет.

### Свойства экземпляра

Следующие свойства доступны на экземплярах `Session`:

#### `ses.availableSpellCheckerLanguages` _Readonly_

Набор `String[]` который состоит из всех известных доступных языков проверки орфографии.  Предоставление языкового для `setSpellCheckerLanguages` API, которого нет в этом массиве, приведет к ошибке.

#### `ses.spellCheckerEnabled`

В `Boolean` , указывающий, включена ли встроенная проверка орфографии.

#### `ses.cookies` _Readonly_

Объект [`Cookies`](cookies.md) для этой сессии.

#### `ses.serviceWorkers` _Readonly_

Объект [`ServiceWorkers`](service-workers.md) для этой сессии.

#### `ses.webRequest` _Readonly_

Объект [`WebRequest`](web-request.md) для этой сессии.

#### `ses.protocol` _Readonly_

Объект [`Protocol`](protocol.md) для этой сессии.

```javascript
const { app, session } - требуют ('электрон')
const path - требуют ('path')

app.whenReady ()..
  
  > . (запрос, обратный вызов) -> -
    const URL - request.url.substr(7)
    обратный вызов (путь: path.normalize('${__dirname}/${url}

  
    '
  )
```

#### `ses.netLog` _Readonly_

Объект [`NetLog`](net-log.md) для этой сессии.

```javascript
const { app, session } и требуют ('электрон')

app.whenReady ().тогда (async ()> -
  const netLog - session.fromPartition ('some-partition').netLog
  netLog.startLogging ('/path/to/net-log')
  // После некоторых сетевых событий
  const path - ждут netLog.stopLogging()
  консоли.log ('Net-logs написано', путь)
)
```
