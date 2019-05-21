# `sandbox` Ang opsyon

> Lumikha ng isang browser window kasama ang tagabigay na maaaring gumana sa loob ng sandbox ng Chromium OS. Kasama ang pinaganang opsyon, ang tagabigay ay dapat makipag-ugnayan sa pamamagitan ng IPC sa mga pangunahing proseso nang sa gayon ay ma-access ang mga node ng API. However, in order to enable the Chromium OS sandbox, Electron must be run with the `--enable-sandbox` command line argument.

Isa sa mga katangian ng susing pangseguridad ng Chromium ay ang lahat ng kodigo ng blink rendering/JavaScript ay isinagawa sa loob ng isang sandbox. Ang sandbox na ito ay gumagamit ng partikular na mga katangian ng OS para matiyak na ang pagsasamantala sa mga prosesong tagasalin ay hindi makakasira sa sistema.

Sa madaling salita, kapag ang sandbox ay pinagana, ang mga tagasalin ay maaari lamang gumawa ng mga pagbabago sa sistema sa pamamagitan ng pagtatalaga ng mga gawain sa pangunahing proseso sa pamamagitan ng IPC. [Here's](https://www.chromium.org/developers/design-documents/sandbox) ang mas maraming impormasyon tungkol sa sandbox.

Since a major feature in Electron is the ability to run Node.js in the renderer process (making it easier to develop desktop applications using web technologies), the sandbox is disabled by electron. This is because most Node.js APIs require system access. Ang `require()` bilang halimbawa, ay hindi posible kung walang mga permiso ng file ng sistema, kung saan ay hindi magagamit sa kapaligiran ng isang sandbox.

Usually this is not a problem for desktop applications since the code is always trusted, but it makes Electron less secure than Chromium for displaying untrusted web content. For applications that require more security, the `sandbox` flag will force Electron to spawn a classic Chromium renderer that is compatible with the sandbox.

A sandboxed renderer doesn't have a Node.js environment running and doesn't expose Node.js JavaScript APIs to client code. The only exception is the preload script, which has access to a subset of the Electron renderer API.

Ang isa pang pagkakaiba ay ang mga tagasalin ng sandbox ay hindi binabago ang alinman sa mga default ng mga API ng JavaScript. Consequently, some APIs such as `window.open` will work as they do in Chromium (i.e. they do not return a [`BrowserWindowProxy`](browser-window-proxy.md)).

## Mga halimbawa

To create a sandboxed window, pass `sandbox: true` to `webPreferences`:

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

In the above code the [`BrowserWindow`](browser-window.md) that was created has Node.js disabled and can communicate only via IPC. The use of this option stops Electron from creating a Node.js runtime in the renderer. Also, within this new window `window.open` follows the native behaviour (by default Electron creates a [`BrowserWindow`](browser-window.md) and returns a proxy to this via `window.open`).

Ito ay mahalaga na tandaan na ang opsyun nito na nag-iisa ay hindi nkapagpapagana ng OS-enforced sandbox. Upang paganahin ang tampok na ito, ang `– mapagana-sandbox` ang linya ng utos sa argumento dapat maipasa sa elektron, na kung saan ay pipilitin `sandbox: totoo` para sa lahat ng mga kaganapan ng `BrowserWindow`.

```js
hayaan manalo ang app.on('ready',() => { // hindi kailangan na maipasa 'sandbox: tama 'sapagkat ' --enable-sandbox' ay gumagana.
win = newBrowerWindow()
win.loadURL('http://google.com')
})
```

Note that it is not enough to call `app.commandLine.appendSwitch('--enable-sandbox')`, as electron/node startup code runs after it is possible to make changes to Chromium sandbox settings. The switch must be passed to Electron on the command-line:

```sh
elektron --enable-sandbox app.js
```

It is not possible to have the OS sandbox active only for some renderers, if `--enable-sandbox` is enabled, normal Electron windows cannot be created.

If you need to mix sandboxed and non-sandboxed renderers in one application, omit the `--enable-sandbox` argument. Without this argument, windows created with `sandbox: true` will still have Node.js disabled and communicate only via IPC, which by itself is already a gain from security POV.

## Preload

Ang app na ito ay maaaring makapagcustomize sa sandboxed renderers gamit ang preload script. Ito ang halimbawa:

```js
let win
app.on('ready', () => {
win = new BrowserWindow({
   webPreferences: { 
     sandbox: true, 
     preload: 'preload.js'
 }
})
win.loadURL('http://google.com')
})
```

at preload.js:

```js
// Ang file na ito ay isinasakay tuwing ang isang javascript na konteksto ay nilikha. It runs in a
// private scope that can access a subset of Electron renderer APIs. Dapat tayong maging // maingat para hindi tumagas ang anumang bagay sa mga pandaigdigang saklaw!
const fs = require('fs')
const { ipcRenderer } = require('electron')

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

- Even though the sandboxed renderer doesn't have Node.js running, it still has access to a limited node-like environment: `Buffer`, `process`, `setImmediate` and `require` are available.
- Ang preload script ay maaaring ma-akses na hindi direkta ang lahat na APIs na mula sa pangunahing proseso sa pamamagitan ng `remote` at `ipcRenderer` na mga modyul. Ito ay kung paano ang `fs` (na ginagamit sa itaas) at ang ibang modyul ay ipinatupad: Ang mga proxy na katapat sa pangunahing proseso.
- Ang preload script ay dapat nakapaloob sa isang iskrip, pero ito din ay posible na magkaroon ng mga kumplikado na preload na kodigo na binubuo ng maramihang mga modyul sa parang kasangkapan na browserify, na naipaliwanag sa ibaba. In fact, browserify is already used by Electron to provide a node-like environment to the preload script.

Sa paglikha ng isang bungkos ng browserify at gamitin ito bilang isang preload na iskrip, ang sumusunod ay dapat gamitin:

```sh
  browserify preload/index.js \
    -x electron \
    -x fs \
    --insert-global-vars=__filename,__dirname -o preload.js
```

Ang `-x` na watawat ay dapat gamitin sa anumang modyul na kasalukuyang nka-ekspos sa preload na saklaw, at nagsasabi sa browserify na gamitin ang enclosing na `require` na function nito. `--paningit-global-vars` ay tinitiyak na `proseso`, `Buffer` at `setlmmediate` ay nakukuha rin mula sa nka-enclose na saklaw(normally browserify injects code para sa mga).

Kasalukuyan ang `require` ng function na nakapagbibigay ng preload na saklaw na inilalantad sa mga sumusunod na mga modyul:

- `child_process`
- `electron` 
  - `kalabog ng tagapagbalita`
  - `kamuntik`
  - `ipcrenderer`
  - `lumikha ng bahay-alalawa`
- `fs`
- `os`
- `mga timers`
- `url`

More may be added as needed to expose more Electron APIs in the sandbox, but any module in the main process can already be used through `electron.remote.require`.

## Katayuan

Pakiusap na gamitin ang `sandbox` na opsyun na may pangangalaga, katulad pa rin sa isang experimentong tampok nito. We are still not aware of the security implications of exposing some Electron renderer APIs to the preload script, but here are some things to consider before rendering untrusted content:

- A preload script can accidentally leak privileged APIs to untrusted code.
- Ang ilang bug sa V8 engine ay maaring payagan ang malisyusong kodigo para ma-akses ang renderer preload APIs, na epiktibong bigyan ng buong akses sa sistema sa pamamagitan ng `remote` na modyul.

Since rendering untrusted content in Electron is still uncharted territory, the APIs exposed to the sandbox preload script should be considered more unstable than the rest of Electron APIs, and may have breaking changes to fix security issues.

Isang planadong paghuhusay na dapat may malaking dagdag sa seguridad ay para maharangan ang mensahe ng IPC galing sa sandboxed renderers sa pamamagitan ng default, nagpapahintulot na ang pangunahing proseso sa tahasang pagtutukoy sa isang itinakdang mensahe sa renderer ay mapayagan na maipadala.