# session

> Session Управление сеансами браузера, куками, кешем, настройками прокси и т. д.

Процесс: [Основной](../glossary.md#main-process)

Модуль `session` может быть использован для создания новых объектов `Session`.

Вы также можете получить доступ к `session` существующих страниц, используя свойство `session` в [`WebContents`](web-contents.md), или из модуля `session`.

```javascript
const { BrowserWindow } - требуют ('электрон')

const win - новый BrowserWindow ({ width: 800, height: 600 })
win.loadURL ('http://github.com')

const ses - win.webContents.session
console.log (ses.getUserAgent())
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

#### Событие: 'расширение загружено'

Возвращает:

* `event` Event
* `extension` [расширение](structures/extension.md)

Излучается после загрузки расширения. Это происходит всякий раз, когда добавляется в "включенный" набор расширений. Это включает в себя:

- Расширения загружаются из `Session.loadExtension`.
- Перезагружаемые расширения:
  * от аварии.
  * если расширение просил его ([`chrome.runtime.reload()`](https://developer.chrome.com/extensions/runtime#method-reload)).

#### Событие: «выгруженное расширение»

Возвращает:

* `event` Event
* `extension` [расширение](structures/extension.md)

Излучается после выгрузки расширения. Это происходит, `Session.removeExtension` называется.

#### Событие: 'продление готово'

Возвращает:

* `event` Event
* `extension` [расширение](structures/extension.md)

Испускаемый после загрузки расширения и все необходимое состояние инициализирован для поддержки начала фоновой страницы расширения.

#### Событие: 'preconnect'

Возвращает:

* `event` Event
* `preconnectUrl` String - URL-адрес, запрашиваемый рендерером для предварительного подключения.
* `allowCredentials` Boolean - True если рендерер запрашивает, чтобы соединение включало учетные данные (см. [spec](https://w3c.github.io/resource-hints/#preconnect) для получения более подробной информации.)

Возникает, когда в процессе рендеринга запрашивается предварительное подключение к URL, как правило, из-за [подсказки ресурса](https://w3c.github.io/resource-hints/).

#### Событие: 'spellcheck-словарь-инициализированный'

Возвращает:

* `event` Event
* `languageCode` строка - языковой код словарного файла

Испускаемый при успешной инициале словаря hunspell. Это происходит после загрузки файла.

#### Событие: 'spellcheck-dictionary-download-begin'

Возвращает:

* `event` Event
* `languageCode` строка - языковой код словарного файла

Излучаемый, когда файл словаря hunspell начинает загрузку

#### Событие: 'spellcheck-dictionary-download-success'

Возвращает:

* `event` Event
* `languageCode` строка - языковой код словарного файла

Излучаемый при успешной загрузке словаря hunspell

#### Событие: 'spellcheck-dictionary-download-failure'

Возвращает:

* `event` Event
* `languageCode` строка - языковой код словарного файла

Испускаемый при с загрузке словаря hunspell не удается.  Для получения информации о сбое вы должны собрать netlog и проверить загрузку запроса.

#### Событие: «выбор-серийный порт» _экспериментальный_

Возвращает:

* `event` Event
* `portList` [Серийныйпорт](structures/serial-port.md)
* `webContents` [WebContents](web-contents.md)
* `callback` Function
  * `portId` Струна

Испускаемый при выборе последовательного порта при вызове `navigator.serial.requestPort` делается. `callback` должны быть вызваны с `portId` , которые будут выбраны, передавая пустую строку `callback` , отменить запрос.  Кроме того, разрешение `navigator.serial` может управляться с помощью [ses.setPermissionCheckHandler (обработчик)](#sessetpermissioncheckhandlerhandler) с `serial` разрешения.

Поскольку это экспериментальная функция, она отключена по умолчанию.  Чтобы включить эту функцию, вам нужно будет использовать `--enable-features=ElectronSerialChooser` переключатель командной строки.  Кроме , потому что это экспериментальная функция Chromium вам нужно будет установить `enableBlinkFeatures: 'Serial'` на `webPreferences` при открытии BrowserWindow.

```javascript
const { app, BrowserWindow } требуют ('электрон')

выиграть и аннулировать
app.commandLine.appendSwitch ('enable-features', 'ElectronSerialChooser')

app.whenReady ()..,тогда (()) -> -
  выиграть - новый BrowserWindow (ширина
    : 800,
    высота: 600,
    webPreferences: {
      enableBlinkFeatures: 'Serial'
    }
  )
  win.webContents.session.on,'select-serial-port', (событие, portList, обратный вызов) -> -
    event.preventDefault()
    const selectedPort - portList.find (((устройство) -> -
      return device.vendorId - 0x2341 && device.productId 0x0043
    )
    если (!выбранныйПорт) -
      обратный вызов (')
    -
      обратный вызов (result1.portId)

  )
)
```

#### Событие: «серийный порт-добавленный» _экспериментальный_

Возвращает:

* `event` Event
* `port` [Серийный](structures/serial-port.md)
* `webContents` [WebContents](web-contents.md)

Излучаемый `navigator.serial.requestPort` был вызван и `select-serial-port` уволен, если новый серийный порт становится доступным.  Например, это событие заготовит при подключении нового USB-устройства.

#### Событие: «серийный порт-удален» _экспериментальный_

Возвращает:

* `event` Event
* `port` [Серийный](structures/serial-port.md)
* `webContents` [WebContents](web-contents.md)

Излучаемый после `navigator.serial.requestPort` был вызван и `select-serial-port` он выстрелил, если серийный порт был удален.  Например, это событие заготовит при отключении USB-устройства.

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
  * `storages` String[] (опционально) - типы хранилищ для очистки, могут содержать: `appcache`, `cookies`, `filesystem`, `indexdb`, `localstorage`, `shadercache`, `websql`, `serviceworkers`, `cachestorage`. Если не указаны, очистите все типы хранения.
  * `quotas` String[] (опционально) - типы квот для очистки, могут содержать: `temporary`, `persistent`, `syncable`. Если не указано, очистить все квоты.

Возвращает `Promise<void>` - Разрешение после завершения очистки данных хранилища.

#### `ses.flushStorageData()`

Записывает непрочитанные DOMStorage данные на диск.

#### `ses.setProxy(config)`

* `config` объект
  * `mode` String (необязательно) - режим прокси. Должен быть одним из `direct`, `auto_detect`, `pac_script`, `fixed_servers` или `system`. Если он не , он будет автоматически определяться на основе других указанных вариантов.
    * `direct` В прямом режиме все соединения создаются непосредственно, без каких-либо прокси участие.
    * `auto_detect` В auto_detect режиме конфигурация прокси определяется скриптом PAC, который быть загружен http://wpad/wpad.dat.
    * `pac_script` В pac_script режиме конфигурация прокси определяется скриптом PAC, который из URL-адреса, указанного в `pacScript`. Это режим по умолчанию если `pacScript` указан.
    * `fixed_servers` В fixed_servers режиме конфигурация прокси указана в `proxyRules`. Это режим по умолчанию, `proxyRules` указана.
    * `system` В системном режиме конфигурация прокси взята из операционной системы. Обратите внимание, что режим системы отличается от настройки конфигурации прокси. В последнем случае Electron возвращается к настройкам системы только если параметры командной строки не влияют на конфигурацию прокси.
  * `pacScript` String (необязательно) - URL,ассоциативный с файлом PAC.
  * `proxyRules` String (необязательно) - Правила, указывающие, какие прокси использовать.
  * `proxyBypassRules` String (необязательно) - Правила, указывающие, какие URL должны обойти настройки прокси.

Возвращает `Promise<void>` - Разрешение после завершения процесса настройки прокси.

Установка настроек прокси.

Когда `mode` не определена, `pacScript` и `proxyRules` предоставлены вместе, `proxyRules` вариант игнорируется и `pacScript` конфигурация.

Возможно, вам `ses.closeAllConnections` закрыть в настоящее время в полете соединения, чтобы предотвратить разъемы с использованием предыдущих прокси от повторного использования будущих запросов.

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

   Примеры: ".google.com", ".com", "http://.google.com"

* `[ SCHEME "://" ] IP_LITERAL [ ":" PORT ]`

   Сравнивать URL, которые являются знаками IP-адресов.

   Например: "127.0.1", "[0:0::1]", "[::1]", "http://[::1]:99"

* `IP_LITERAL "/" PREFIX_LENGTH_IN_BITS`

   Матч любой URL, который является IP буквальное, что падает между данного диапазона. Диапазон IP указан с помощью нотации CIDR.

   Например: "192.168.1.1/16", "fefe:13::abc/33".

* `<local>`

   Матч местных адресов. Смысл игры `<local>` , будет ли один из: "127.0.0.0.1", ":1", "localhost".

#### `ses.resolveProxy(url)`

* `url` URL

Возвращает `Promise<String>` - Разрешение с информацией прокси для `url`.

#### `ses.forceReloadProxyConfig()`

Возвращает `Promise<void>` - Разрешает, когда все внутренние состояния прокси-сервиса сбрасывается и последняя конфигурация прокси повторно, если она уже доступна. Сценарий pac будет извлечен из `pacScript` , если режим прокси- `pac_script`.

#### `ses.setDownloadPath(path)`

* `path` String - Место загрузки.

Наборы каталога экономии загрузки. По умолчанию каталог загрузки будет самым `Downloads` под соответствующей папкой приложения.

#### `ses.enableNetworkEmulation(options)`

* `options` Object
  * `offline` Boolean (по желанию) - следует ли эмулировать отключение сети. Defaults to false.
  * `latency` (необязательно) - RTT в мс. По умолчанию до 0, который отключит задержки регулирования.
  * `downloadThroughput` (необязательно) - Скорость загрузки в Bps. По умолчанию до 0 который отключит регулирование загрузки.
  * `uploadThroughput` (по желанию) - Скорость загрузки в Bps. По умолчанию до 0 который отключит регулирование загрузки.

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
  * `url` String - URL для при подключения. Только происхождение имеет отношение к открытию розетки.
  * `numSockets` (по желанию) - количество розеток для подключения. Должно быть, от 1 до 6. По умолчанию до 1.

Подключается данное количество розеток к источнику.

#### `ses.closeAllConnections()`

Возвращает `Promise<void>` - Разрешает, когда все соединения закрыты.

**Примечание:** он будет прекратить / не все запросы в настоящее время в полете.

#### `ses.disableNetworkEmulation()`

Отключает любую сетевую эмуляцию, уже активную для `session`. Сбросы для исходной конфигурации сети.

#### `ses.setCertificateVerifyProc(proc)`

* `proc` функции | Null
  * `request` Object
    * `hostname` String
    * `certificate` [Certificate](structures/certificate.md)
    * `validatedCertificate` [сертификат](structures/certificate.md)
    * `verificationResult` String - Результат проверки из хрома.
    * `errorCode` Integer - Код ошибки.
  * `callback` Function
    * `verificationResult` Integer - Значение может быть одним из кодов ошибок сертификата, из [здесь](https://source.chromium.org/chromium/chromium/src/+/master:net/base/net_error_list.h). Помимо кодов ошибок сертификата, могут быть использованы следующие специальные коды.
      * `0` - Указывает на успех и отключает проверку прозрачности сертификата.
      * `-2` - указывает на сбой.
      * `-3` - Использует результат проверки из хрома.

Устанавливает значение проверки сертификата для `session`, `proc` будет вызываться с `proc(request, callback)` всякий раз, когда запрашивается сертификат сервера. Вызов `callback(0)` принимает сертификат, вызов `callback(-2)` отклоняет его.

Вызов `setCertificateVerifyProc (null)` приведет к возврату к процедуре проверки сертификата по умолчанию.

```javascript
const { BrowserWindow } требуют ('электрон')
const win - новый BrowserWindow ()

win.webContents.session.setCertificateVerifyProc ((запрос, обратный вызов)>
  const { hostname } - запрос
  , если (имя хоста - 'github.com') -
    обратный вызов (0)
  - еще
    обратный вызов (-2)

)
```

> **ПРИМЕЧАНИЕ:** Результат этой процедуры кэширован сетевой службой.

#### `ses.setPermissionRequestHandler(handler)`

* `handler` функции | Null
  * `webContents` [WebContents](web-contents.md) - WebContents запрашивает разрешение.  Пожалуйста, обратите внимание, что если запрос исходит от подрамник вы должны `requestingUrl` для проверки происхождения запроса.
  * `permission` Строка - Тип запрошенного разрешения.
    * `clipboard-read` - Запрос доступа к считывку с буфера обмена.
    * `media` - Запрос доступа к медиа-устройствам, таким как камера, микрофон и динамики.
    * `display-capture` - Запрос доступа для захвата экрана.
    * `mediaKeySystem` - Запрос доступа к защищенному drM контенту.
    * `geolocation` - Запрос доступа к текущему местоположению пользователя.
    * `notifications` - Создание уведомлений и возможность отображения их в лотке системы пользователя.
    * `midi` - Запрос доступа MIDI в `webmidi` API.
    * `midiSysex` - Запросите использование системных эксклюзивных сообщений в `webmidi` API.
    * `pointerLock` - Просьба непосредственно интерпретировать движения мыши как входной метод. Нажмите [здесь](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API) чтобы узнать больше.
    * `fullscreen` - Запрос на приложение, чтобы войти в полноэкранный режим.
    * `openExternal` - Запрос на открытие ссылок во внешних приложениях.
  * `callback` Function
    * `permissionGranted` Boolean - Разрешить или отказать в разрешении.
  * `details` объект - Некоторые свойства доступны только на определенных типах разрешений.
    * `externalURL` String (по желанию) - URL-адрес `openExternal` запроса.
    * `mediaTypes` String ( по желанию) - Типы запрашиваемого доступа к средствам массовой информации, элементы могут быть `video` или `audio`
    * `requestingUrl` Строка - Последний URL запрашивающий кадр загружен
    * `isMainFrame` Boolean - Является ли кадр, делая запрос, основным кадром

Устанавливает обработчик, который может быть использован для ответа на запросы о разрешении на `session`. Вызов `callback(true)` позволит разрешение, и `callback(false)` будет отвергать его. Чтобы очистить обработчик, позвоните `setPermissionRequestHandler(null)`.

```javascript
const { session } - требуют ('электрон')
session.fromPartition ('some-partition').setPermissionRequestHandler ((webContents, разрешение, обратный вызов) -> -
  если (webContents.getURL.) - "некоторый хост" && разрешение на "уведомления") -
    обратный обратный вызов (ложный) // отказано.
  -

  обратный вызов (истинный)
)
```

#### `ses.setPermissionCheckHandler(handler)`

* `handler` Function\<Boolean> | Null
  * `webContents` [WebContents](web-contents.md) - WebContents проверки разрешения.  Пожалуйста, обратите внимание, что если запрос исходит от подрамник вы должны `requestingUrl` для проверки происхождения запроса.
  * `permission` Строка - Тип проверки разрешения.  Действительные значения являются `midiSysex`, `notifications`, `geolocation`, `media`,`mediaKeySystem`,`midi`, `pointerLock`, `fullscreen`, `openExternal`, или `serial`.
  * `requestingOrigin` Строка - URL-адрес разрешения
  * `details` объект - Некоторые свойства доступны только на определенных типах разрешений.
    * `securityOrigin` String - Происхождение безопасности `media` проверки.
    * `mediaType` String - Тип запрашиваемого доступа к средствам массовой информации, может быть `video`, `audio` или `unknown`
    * `requestingUrl` Строка - Последний URL запрашивающий кадр загружен
    * `isMainFrame` Boolean - Является ли кадр, делая запрос, основным кадром

Устанавливает обработчик, который может быть использован для ответа на проверку разрешений для `session`. Возвращение `true` позволит разрешение, и `false` будет отвергать его. Чтобы очистить обработчик, позвоните `setPermissionCheckHandler(null)`.

```javascript
const { session } требуют ('электрон')
session.fromPartition ('some-partition').setPermissionCheckHandler ((webContents, разрешение) ->
  если (webContents.getURL() - "некоторое-хозяин" && разрешение на "уведомления") -
    возвращение ложное // отказано
  -

  возврат истинных
)
```

#### `ses.clearHostResolverCache()`

Возвращает `Promise<void>` - Разрешается, когда операция завершена.

Очищает кэш разрешения хоста.

#### `ses.allowNTLMCredentialsForDomains (домены)`

* `domains` String - запятый список серверов, для которых включена интегрированная аутентификация.

Динамически устанавливает, следует ли всегда отправлять учетные данные для HTTP NTLM или аутентификации.

```javascript
const { session } требует ('electron')
// рассмотрите любой URL, заканчивающийся 'example.com', 'foobar.com', 'baz'
// для интегрированной аутентификации.
session.defaultSession.allowNTLMCredentialsForDomains (пример.com, No foobar.com, база)

// рассмотрите все URL-адреса для интегрированной аутентификации.
session.defaultSession.allowNTLMCredentialsForDomains ('')
```

#### `ses.setUserAgent (пользовательАгент, принятьLanguages)`

* `userAgent` String
* `acceptLanguages` строка (по желанию)

Переопределяет `userAgent` и `acceptLanguages` для этой сессии.

В `acceptLanguages` должны быть разделены запятые упорядоченный список языковых кодов, например например `"en-US,fr,de,ko,zh-CN,ja"`.

Это не влияет на существующие `WebContents`, и каждый `WebContents` можете использовать `webContents.setUserAgent` для переопределения пользовательского агента в ширину сеанса.

#### `ses.isPersistent()`

Возвращает `Boolean` - Является ли эта сессия постоянной. Сеанс `webContents` по умолчанию `BrowserWindow` является постоянным. При создании сеанса раздела сеанс, накрепенный на `persist:` будет постоянным, в то время как другие будут временными.

#### `ses.getUserAgent()`

Возвращает `String` - Пользовательский агент для этой сессии.

#### `ses.setSSLConfig (конфиг)`

* `config` объект
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
