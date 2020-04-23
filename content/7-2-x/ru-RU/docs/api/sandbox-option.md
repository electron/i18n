# Опция `sandbox`

> Create a browser window with a sandboxed renderer. With this option enabled, the renderer must communicate via IPC to the main process in order to access node APIs.

Одна из основных особенностей безопасности Chromium заключается в том, что весь рендеринг/JavaScript-код выполняется внутри песочницы. В этой песочнице используются специфичные для ОС функции, для гарантии того, что эксплойты в процессе рендеринга не смогли повредить систему.

Другими словами, при включенной песочнице рендеры могут вносить изменения в систему только путем делегирования задач основному процессу через IPC. [Здесь](https://www.chromium.org/developers/design-documents/sandbox) больше информации о песочнице.

Поскольку основной особенностью Electron является возможность запуска Node.js в процессе рендеринга (что облегчает разработку настольных приложений с помощью веб-технологий), в Electron песочница отключена. Это связано с тем, что большинству API Node.js требуется доступ к системе. Например, `require()` невозможен без разрешений файловой системы, которые недоступны в песочнице.

Обычно это не проблема для настольных приложений, так как код всегда является доверенным, но это делает Electron менее безопасным, чем Chromium для отображения ненадежного веб-содержимого. Для приложений, требующих большей безопасности, флаг `sandbox` вынудит Electron создать классический рендерер Chromium, совместимый с песочницей.

Изолированный рендер не имеет запущенной среды Node.js и не предоставляет доступ к API-интерфейсу JavaScript Node.js для клиентского кода. Единственным исключением является сценарий предварительной загрузки, который имеет доступ к подмножеству API рендерера Electron.

Другое отличие заключается в том, что рендереры, работающие в песочнице, не изменяют стандартные API JavaScript. Следовательно, некоторые API, такие как `window.open` будут работать так же, как в Chromium (то есть они не возвращают [`BrowserWindowProxy`](browser-window-proxy.md)).

## Пример

Чтобы создать окно в песочнице, установите `sandbox: true` в `webPreferences`:

```js
let win
app.on('ready', () => {
  win = new BrowserWindow({
    webPreferences: {
      sandbox: true
    }
  })
  win.loadURL('http://google.com')
})
```

В приведенном выше коде у созданного [`BrowserWindow`](browser-window.md) отключен Node.js и он может общаться только через IPC. Использование этой опции не позволяет Electron создавать в рендерере среду выполнения Node.js. Также внутри этого нового окна `window.open` следует родному поведению (по умолчанию Electron создает [`BrowserWindow`](browser-window.md) и возвращает прокси к нему через `window.open`).

[`app.enableSandbox`](app.md#appenablesandbox-experimental) может использоваться для принудительной установки `sandbox: true` для всех экземпляров `BrowserWindow`.

```js
let win
app.enableSandbox()
app.on('ready', () => {
  // no need to pass `sandbox: true` since `app.enableSandbox()` was called.
  win = new BrowserWindow()
  win.loadURL('http://google.com')
})
```

## Предварительная загрузка

An app can make customizations to sandboxed renderers using a preload script. Here's an example:

```js
let win
app.on('ready', () => {
  win = new BrowserWindow({
    webPreferences: {
      sandbox: true,
      preload: path.join(app.getAppPath(), 'preload.js')
    }
  })
  win.loadURL('http://google.com')
})
```

и preload.js:

```js
// Этот файл загружается каждый раз в контексте javascript. Он запускается в 
// приватной области, которая может получить доступ к подмножеству API рендерера Electron. Мы должны быть
// осторожны, чтобы не допустить утечки каких-либо объектов в глобальную область!
const { ipcRenderer, remote } = require('electron')
const fs = remote.require('fs')

// чтение конфигурационного файла с помощью модуля `fs`
const buf = fs.readFileSync('allowed-popup-urls.json')
const allowedUrls = JSON.parse(buf.toString('utf8'))

const defaultWindowOpen = window.open

function customWindowOpen (url, ...args) {
  if (allowedUrls.indexOf(url) === -1) {
    ipcRenderer.sendSync('blocked-popup-notification', location.origin, url)
    return null
  }
  return defaultWindowOpen(url, ...args)
}

window.open = customWindowOpen
```

Важные вещи, на которые следует обратить внимание в скрипте предварительной загрузки:

- Несмотря на то, что в песочнице не запущен Node.js, он все равно имеет доступ к ограниченной node-подобной среде: `Buffer`, `process`, `setImmediate`, `clearImmediate` и `require` доступны.
- The preload script can indirectly access all APIs from the main process through the `remote` and `ipcRenderer` modules.
- Скрипт для предварительной загрузки должен содержаться в одном скрипте, но может иметь сложный код для предварительной загрузки, состоящий из нескольких модулей, используя такие инструменты, как webpack или browserify. Ниже приведен пример использования browserify.

Чтобы создать пакет browserify пакета и использовать его в качестве скрипта предварительной загрузки, можно сделать что-то вроде этого:

```sh
  browserify preload/index.js \
    -x electron \
    --insert-global-vars=__filename,__dirname -o preload.js
```

Флаг `-x` следует использовать с любым необходимым модулем, который уже задействован в области предварительной загрузки, и сообщает browserify использовать вложенную для него функцию `require`. `--insert-global-vars` будет гарантировать, что `process`, `Buffer` и `setImmediate` также взяты из прилагаемой области видимости (обычно browserify вводит код для них).

В настоящее время функция `require`, представленная в области предварительной загрузки, раскрывает следующие модули:

- `electron`
  - `crashReporter`
  - `desktopCapturer`
  - `ipcRenderer`
  - `nativeImage`
  - `remote`
  - `webFrame`
- `events`
- `timers`
- `url`

При необходимости в песочницу можно добавить больше возможностей Electron API, но любой модуль в основном процессе уже может быть использован через `electron.remote.require`.

## Состояние

Пожалуйста, пользуйтесь опцией `sandbox` с осторожностью, это все еще экспериментальная возможность. Мы до сих пор не знаем о последствиях безопасности для предоставления некоторых API рендерера Electron скрипту предварительной загрузки, но вот некоторые вещи, которые нужно рассмотреть перед рендерингом недоверенного содержимого:

- Скрипт предварительной загрузки может случайно привести к утечке привилегированных API в ненадежный код, если только не включен [`contextIsolation`](../tutorial/security.md#3-enable-context-isolation-for-remote-content).
- Some bug in V8 engine may allow malicious code to access the renderer preload APIs, effectively granting full access to the system through the `remote` module. Поэтому настоятельно рекомендуется [отключить `remote` модуль](../tutorial/security.md#15-disable-the-remote-module). Если отключение невозможно, следует выборочно [фильтровать `remote` модуль](../tutorial/security.md#16-filter-the-remote-module).

Поскольку рендеринг недоверенного контента в Electron все еще остается неисследованной территорией, API, применяемые в сценарии предварительной загрузки песочницы, должны считаться более нестабильными, чем остальные Electron API, и могут потребовать серьезных изменений, чтобы исправить проблемы безопасности.
