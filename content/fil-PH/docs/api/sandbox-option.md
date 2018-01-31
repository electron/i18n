# `sandbox` Ang opsyon

> Lumikha ng isang browser window kasama ang tagabigay na maaaring gumana sa loob ng sandbox ng Chromium OS. Kasama ang pinaganang opsyon, ang tagabigay ay dapat makipag-ugnayan sa pamamagitan ng IPC sa mga pangunahing proseso nang sa gayon ay ma-access ang mga node ng API. Gayunpaman, para mapagana ang sandbox ng Chromium OS, ang electron ay dapat na umandar kasama ang `--enable-sandbox` ng argumento sa linya ng komand.

Isa sa mga katangian ng susing pangseguridad ng Chromium ay ang lahat ng kodigo ng blink rendering/JavaScript ay isinagawa sa loob ng isang sandbox. Ang sandbox na ito ay gumagamit ng partikular na mga katangian ng OS para matiyak na ang pagsasamantala sa mga prosesong tagasalin ay hindi makakasira sa sistema.

Sa madaling salita, kapag ang sandbox ay pinagana, ang mga tagasalin ay maaari lamang gumawa ng mga pagbabago sa sistema sa pamamagitan ng pagtatalaga ng mga gawain sa pangunahing proseso sa pamamagitan ng IPC. [Here's](https://www.chromium.org/developers/design-documents/sandbox) ang mas maraming impormasyon tungkol sa sandbox.

Dahilan sa ang isang pangunahing katangian ng electron ay ang kakayahang patakbuhin ang node.js sa prosesong tagasalin (ginagawa nitong mas madali ang pagbuo ng mga aplikasyon ng desktop gamit ang mga teknolohiya ng web), ang sandbox ay pinapahinto ng electron. Ito ay dahil sa ang karamihan ng mga API ng node.js ay nangangailangan ng access sa sistema. Ang `require()` bilang halimbawa, ay hindi posible kung walang mga permiso ng file ng sistema, kung saan ay hindi magagamit sa kapaligiran ng isang sandbox.

Karaniwang ito ay hindi problema para sa mga aplikasyon ng desktop dahil ang mga kodigo ay palaging mapagkakatiwalaan, ngunit maaaring ang electron ay hindi gaanong ligtas kaysa chromium para sa pagpapakita ng hindi mapagkakatiwalaang laman ng web. Para sa mga aplikasyon na nangangailangan ng mas higit na siguridad, ang flag ng `sandbox` ay pipilitin ang electron na maglabas ng isang klasikong tagasalin ng chromium na nababagay sa sandbox.

A sandboxed renderer doesn't have a node.js environment running and doesn't expose node.js JavaScript APIs to client code. The only exception is the preload script, which has access to a subset of the electron renderer API.

Another difference is that sandboxed renderers don't modify any of the default JavaScript APIs. Consequently, some APIs such as `window.open` will work as they do in chromium (i.e. they do not return a `BrowserWindowProxy`).

## Halimbawa

To create a sandboxed window, simply pass `sandbox: true` to `webPreferences`:

```js
let win
app.on('ready', () => {
  win = new BrowserWindow({
    webPreferences: {
      sandbox: true
    }
  })
  w.loadURL('http://google.com')
})
```

In the above code the `BrowserWindow` that was created has node.js disabled and can communicate only via IPC. The use of this option stops electron from creating a node.js runtime in the renderer. Also, within this new window `window.open` follows the native behaviour (by default electron creates a `BrowserWindow` and returns a proxy to this via `window.open`).

It is important to note that this option alone won't enable the OS-enforced sandbox. Upang paganahin ang tampok na ito, ang `– mapagana-sandbox` ang linya ng utos sa argumento dapat maipasa sa elektron, na kung saan ay pipilitin `sandbox: totoo` para sa lahat ng mga kaganapan ng `BrowserWindow`.

To enable OS-enforced sandbox on `BrowserWindow` or `webview` process with `sandbox:true` without causing entire app to be in sandbox, `--enable-mixed-sandbox` command-line argument must be passed to electron. This option is currently only supported on macOS and Windows.

```js
let win
app.on('ready', () => {
  // no need to pass `sandbox: true` since `--enable-sandbox` was enabled.
  win = new BrowserWindow()
  w.loadURL('http://google.com')
})
```

Note that it is not enough to call `app.commandLine.appendSwitch('--enable-sandbox')`, as electron/node startup code runs after it is possible to make changes to chromium sandbox settings. The switch must be passed to electron on the command-line:

    electron --enable-sandbox app.js
    

It is not possible to have the OS sandbox active only for some renderers, if `--enable-sandbox` is enabled, normal electron windows cannot be created.

If you need to mix sandboxed and non-sandboxed renderers in one application, simply omit the `--enable-sandbox` argument. Without this argument, windows created with `sandbox: true` will still have node.js disabled and communicate only via IPC, which by itself is already a gain from security POV.

## Preload

An app can make customizations to sandboxed renderers using a preload script. Here's an example:

```js
let win
app.on('ready', () => {
  win = new BrowserWindow({
    webPreferences: {
      sandbox: true,
      preload: 'preload.js'
    }
  })
  w.loadURL('http://google.com')
})
```

at preload.js:

```js
// This file is loaded whenever a javascript context is created. It runs in a
// private scope that can access a subset of electron renderer APIs. We must be
// careful to not leak any objects into the global scope!
const fs = require('fs')
const {ipcRenderer} = require('electron')

// read a configuration file using the `fs` module
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

Mahahalagang bagay na mapapansin sa preload script:

- Even though the sandboxed renderer doesn't have node.js running, it still has access to a limited node-like environment: `Buffer`, `process`, `setImmediate` and `require` are available.
- The preload script can indirectly access all APIs from the main process through the `remote` and `ipcRenderer` modules. This is how `fs` (used above) and other modules are implemented: They are proxies to remote counterparts in the main process.
- The preload script must be contained in a single script, but it is possible to have complex preload code composed with multiple modules by using a tool like browserify, as explained below. In fact, browserify is already used by electron to provide a node-like environment to the preload script.

Sa paglikha ng isang bungkos ng browserify at gamitin ito bilang isang preload na iskrip, ang sumusunod ay dapat gamitin:

    browserify preload/index.js \
      -x electron \
      -x fs \
      --insert-global-vars=__filename,__dirname -o preload.js
    

The `-x` flag should be used with any required module that is already exposed in the preload scope, and tells browserify to use the enclosing `require` function for it. `--insert-global-vars` will ensure that `process`, `Buffer` and `setImmediate` are also taken from the enclosing scope(normally browserify injects code for those).

Currently the `require` function provided in the preload scope exposes the following modules:

- `child_process`
- `electron` (crashReporter, remote and ipcRenderer)
- `fs`
- `os`
- `timers`
- `url`

More may be added as needed to expose more electron APIs in the sandbox, but any module in the main process can already be used through `electron.remote.require`.

## Katayuan

Please use the `sandbox` option with care, as it is still an experimental feature. We are still not aware of the security implications of exposing some electron renderer APIs to the preload script, but here are some things to consider before rendering untrusted content:

- A preload script can accidentaly leak privileged APIs to untrusted code.
- Some bug in V8 engine may allow malicious code to access the renderer preload APIs, effectively granting full access to the system through the `remote` module.

Since rendering untrusted content in electron is still uncharted territory, the APIs exposed to the sandbox preload script should be considered more unstable than the rest of electron APIs, and may have breaking changes to fix security issues.

One planned enhancement that should greatly increase security is to block IPC messages from sandboxed renderers by default, allowing the main process to explicitly define a set of messages the renderer is allowed to send.