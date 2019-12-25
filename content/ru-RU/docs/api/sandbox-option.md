# Опция `sandbox`

> Создает окно браузера с рендерером в песочнице. При включенной опции рендерер должен взаимодействовать с основным процессом через IPC, чтобы получить доступ к API узла.

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
  // нет необходимости передавать `sandbox: true`, так как был вызван `app.enableSandbox ()`.
  win = new BrowserWindow()
  win.loadURL('http://google.com')
})
```

## Предварительная загрузка

Приложение может вносить изменения в рендереры в песочницей, используя скрипт предварительной загрузки. Вот пример:

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

- Even though the sandboxed renderer doesn't have Node.js running, it still has access to a limited node-like environment: `Buffer`, `process`, `setImmediate`, `clearImmediate` and `require` are available.
- The preload script can indirectly access all APIs from the main process through the `remote` and `ipcRenderer` modules.
- The preload script must be contained in a single script, but it is possible to have complex preload code composed with multiple modules by using a tool like webpack or browserify. An example of using browserify is below.

To create a browserify bundle and use it as a preload script, something like the following should be used:

```sh
  browserify preload/index.js \
    -x electron \
    --insert-global-vars=__filename,__dirname -o preload.js
```

The `-x` flag should be used with any required module that is already exposed in the preload scope, and tells browserify to use the enclosing `require` function for it. `--insert-global-vars` will ensure that `process`, `Buffer` and `setImmediate` are also taken from the enclosing scope(normally browserify injects code for those).

Currently the `require` function provided in the preload scope exposes the following modules:

- `electron` 
  - `crashReporter`
  - `desktopCapturer`
  - `ipcRenderer`
  - `nativeImage`
  - `remote`
  - `webFrame`
- `события`
- `timers`
- `url`

More may be added as needed to expose more Electron APIs in the sandbox, but any module in the main process can already be used through `electron.remote.require`.

## Состояние

Пожалуйста, пользуйтесь опцией `sandbox` с осторожностью, это все еще экспериментальная возможность. We are still not aware of the security implications of exposing some Electron renderer APIs to the preload script, but here are some things to consider before rendering untrusted content:

- A preload script can accidentally leak privileged APIs to untrusted code, unless [`contextIsolation`](../tutorial/security.md#3-enable-context-isolation-for-remote-content) is also enabled.
- Some bug in V8 engine may allow malicious code to access the renderer preload APIs, effectively granting full access to the system through the `remote` module. Therefore, it is highly recommended to [disable the `remote` module](../tutorial/security.md#15-disable-the-remote-module). If disabling is not feasible, you should selectively [filter the `remote` module](../tutorial/security.md#16-filter-the-remote-module).

Since rendering untrusted content in Electron is still uncharted territory, the APIs exposed to the sandbox preload script should be considered more unstable than the rest of Electron APIs, and may have breaking changes to fix security issues.