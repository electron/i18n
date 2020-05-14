# Seguridad, Katutubong Kakayahan, at Iyong Responsibilidad

Bilang is tagapag-unlad ng web, kadalasan kami ay nagsasaya sa tibay ng security net ng mga browser - ang panganib na kaakibat ng mga code na aming sinusulat ay maliit lamang. Ang aming mga pook-sapot ay ginawaran lamang ng limitadong kapangyarihan sa sandbox, at kami ay nagtitiwala na ang gumagamit sa aming pook-sapot ay nagsasaya sa mga pook-sapot na ginawa ng aming malaking grupo ng mga enhinyero na may kakayahan na mabilis na tumugon sa mga bagong natutuklasang mga bagay na nakakaipekto sa seguridad.

Kapang nagtatrabaho sa Elektron, importanteng maintindihan na ang Elektron ay hindi pook-sapot. Ito ay nagpapahintulot sa iyo na magtayo ng saganang-tampok na desktop applications na may pamilyar na teknolohiyang web, ngunit ang iyong code ay gumagamit ng mas higit na kakayahan. JavaScript ay pwedeng ma-access ang filesystem, user shell, at iba pa. Ito ay nagpapahintulot sayo na magtayo ng mataas na kalidad na katutubo na mga aplikasyon, ngunit ang antas ng panganib sa seguridad ng karagdagang kapangyarihan na ipinagkaloob sa iyong code.

Nasasaisip iyan, dapat maging alerto sa mga nagpapakitang hindi makatwirang nilalaman sa mga di mapagkakatiwalaang pinanggalingan ay nagmumungkahi ng mahigpit na panganib sa seguridad na ang Elektron ay hindi nilalayon na maghawak. Sa katunayan, ang pinaka-popyular na Electron apps (Atom, Slack, Visual Studio Code, at iba pa) ay pangunahing nagpapakita ng lokal na nilalaman ( o pinagkakatiwalaan, ligtas na nilalaman na walang Node integration)- kung ang iyong aplikasyon ay nagsasagawa ng code na mula sa online, responsibilidad mo na tiyakin na ang code ay hindi malisyoso.

## Naguulat sa mga Isyung Panseguridad

Para sa inpormasyong kung paano ang tamang pagsisiwalat ng kahinaan ng Electron, tingnan ang [SECURITY.md](https://github.com/electron/electron/tree/master/SECURITY.md)

## Mga Isyung Panseguridad at Upgrades ng Chromium

Electron keeps up to date with alternating Chromium releases. For more information, see the [Electron Release Cadence blog post](https://electronjs.org/blog/12-week-cadence).

## Security Is Everyone's Responsibility

It is important to remember that the security of your Electron application is the result of the overall security of the framework foundation (*Chromium*, *Node.js*), Electron itself, all NPM dependencies and your code. As such, it is your responsibility to follow a few important best practices:

* **Keep your application up-to-date with the latest Electron framework release.** When releasing your product, you’re also shipping a bundle composed of Electron, Chromium shared library and Node.js. Vulnerabilities affecting these components may impact the security of your application. By updating Electron to the latest version, you ensure that critical vulnerabilities (such as *nodeIntegration bypasses*) are already patched and cannot be exploited in your application. For more information, see "[Use a current version of Electron](#17-use-a-current-version-of-electron)".

* **Evaluate your dependencies.** While NPM provides half a million reusable packages, it is your responsibility to choose trusted 3rd-party libraries. If you use outdated libraries affected by known vulnerabilities or rely on poorly maintained code, your application security could be in jeopardy.

* **Adopt secure coding practices.** The first line of defense for your application is your own code. Common web vulnerabilities, such as Cross-Site Scripting (XSS), have a higher security impact on Electron applications hence it is highly recommended to adopt secure software development best practices and perform security testing.


## Isolation For Untrusted Content

A security issue exists whenever you receive code from an untrusted source (e.g. a remote server) and execute it locally. As an example, consider a remote website being displayed inside a default [`BrowserWindow`](../api/browser-window.md). If an attacker somehow manages to change said content (either by attacking the source directly, or by sitting between your app and the actual destination), they will be able to execute native code on the user's machine.

> :babala: Sa anumang pangyayari ay hindi ka maaaring mag-load at mag-execute ng remote code kasama ng Node.js integrasyong napagana. Sa halip, gamitin lamang ang lokal na mga file (nakabalot kasama ang iyong aplikasyon) para ma-execute ang Node.js na code. To display remote content, use the [`<webview>`](../api/webview-tag.md) tag or [`BrowserView`](../api/browser-view.md), make sure to disable the `nodeIntegration` and enable `contextIsolation`.

## Babala sa seguridad ng Electron

From Electron 2.0 on, developers will see warnings and recommendations printed to the developer console. They only show up when the binary's name is Electron, indicating that a developer is currently looking at the console.

You can force-enable or force-disable these warnings by setting `ELECTRON_ENABLE_SECURITY_WARNINGS` or `ELECTRON_DISABLE_SECURITY_WARNINGS` on either `process.env` or the `window` object.

## Checklist: Security Recommendations

You should at least follow these steps to improve the security of your application:

1. [Mag load lamang ng siguradong nilalaman](#1-only-load-secure-content)
2. [Huwang paganahin ang Node.js na integrasyon sa lahat ng mga renderer na maipakita ang bahagyang nilalaman.](#2-do-not-enable-nodejs-integration-for-remote-content)
3. [Paganahin ang kontekstong pagkakabukod na ipinakita ang bahagyang nilalaman.](#3-enable-context-isolation-for-remote-content)
4. [Gamitin ang `ses.setPermissionRequestHandler()` sa lahat ng mga sesyon na maka-load ang bahagyang nilalaman.](#4-handle-session-permission-requests-from-remote-content)
5. [Huwang i-disable ang `webSecurity`](#5-do-not-disable-websecurity)
6. [Define a `Content-Security-Policy`](#6-define-a-content-security-policy) and use restrictive rules (i.e. `script-src 'self'`)
7. [Huwag i-set ang `allowRunningInsecureContent` sa `true`](#7-do-not-set-allowrunninginsecurecontent-to-true)
8. [Huwag paganahin ang mga experimental na katangian](#8-do-not-enable-experimental-features)
9. [Do not use `enableBlinkFeatures`](#9-do-not-use-enableblinkfeatures)
10. [`<webview>`: Do not use `allowpopups`](#10-do-not-use-allowpopups)
11. [`<webview>`: Verify options and params](#11-verify-webview-options-before-creation)
12. [Disable or limit navigation](#12-disable-or-limit-navigation)
13. [Disable or limit creation of new windows](#13-disable-or-limit-creation-of-new-windows)
14. [Do not use `openExternal` with untrusted content](#14-do-not-use-openexternal-with-untrusted-content)
15. [Disable the `remote` module](#15-disable-the-remote-module)
16. [Filter the `remote` module](#16-filter-the-remote-module)
17. [Use a current version of Electron](#17-use-a-current-version-of-electron)

To automate the detection of misconfigurations and insecure patterns, it is possible to use [electronegativity](https://github.com/doyensec/electronegativity). For additional details on potential weaknesses and implementation bugs when developing applications using Electron, please refer to this [guide for developers and auditors](https://doyensec.com/resources/us-17-Carettoni-Electronegativity-A-Study-Of-Electron-Security-wp.pdf)

## 1) Only Load Secure Content

Alinmang mga mapagkukunan na hindi kasama sa iyong aplikasyon ay dapat ma-load gamit ang ligtas na protocol gaya ng `HTTPS`. Sa ibang salita, huwag gumamit ng hindi ligtas na mga protocol gaya ng `HTTP`. Similarly, we recommend the use of `WSS` over `WS`, `FTPS` over `FTP`, and so on.

### Bakit?

Ang `HTTPS` ay mayroong tatlong pangunahing benepisyo:

1) Ito ay nagpapatunay sa bahagyang server, sinisigurado na ang iyong app ay kumukonekta sa tamang host sa halip ng isang manggagaya. 2) Sinisigurado ang integridad ng data, iginigiit na ang data ay hindi binago habang naka-transit sa pagitan ng iyong aplikasyon at ng host. 3) Ine-encrypt ng trapiko sa pagitan ng iyong tagagamit at ang host na patutunguhan, na magiging mas mahirap maka-eavesdrop sa mga impormasyon na ipinadala s apagitan ng iyong app at host.

### Paano?

```js
// Hindi Kaaya-aya
browserWindow.loadURL('http://example.com')

// Kaaya-aya
browserWindow.loadURL('https://example.com')
```

```html
<!-- Bad -->
<script crossorigin src="http://example.com/react.js"></script>
<link rel="stylesheet" href="http://example.com/style.css">

<!-- Good -->
<script crossorigin src="https://example.com/react.js"></script>
<link rel="stylesheet" href="https://example.com/style.css">
```


## 2) Do not enable Node.js Integration for Remote Content

_This recommendation is the default behavior in Electron since 5.0.0._

It is paramount that you do not enable Node.js integration in any renderer ([`BrowserWindow`](../api/browser-window.md), [`BrowserView`](../api/browser-view.md), or [`<webview>`](../api/webview-tag.md)) that loads remote content. Ang layunin ay ma-limit ang mga lakas na iginawad sa bahagyang nilalaman, kaya ginawang kapansin-pansin na mas mahirap para sa isang ataker na mapinsala ang gumagamit at magkaroon sila ng kakayahan maka-execute ng JavaScript sa iyong website.

Pagkatapos nito, iginagawad ng karagdagang pahintulot para sa tiyak na mga host. For example, if you are opening a BrowserWindow pointed at `https://example.com/`, you can give that website exactly the abilities it needs, but no more.

### Bakit?

Ang isang cross-site-scripting (XSS) na atake ay mapanganib kung ang ataker ay maaaring tumalon palabas sa proseso ng renderer at mag-execute ng code sa computer ng gumagamit. Ang cross-site-scripting na mga atake ay mainam na karaniwan - at habang ang isyu, ang power ay karaniwang limitado sa messaging ng website na ini-execute. Ang pag-sumalanta ng Node.js na integrasyon ay makakatulong upang pigilan ang XXX na ma-escalate ito sa tinatawag nilang "Remote Code Execution" (RCE) na atake.

### Paano?

```js
// Bad
const mainWindow = new BrowserWindow({
  webPreferences: {
    nodeIntegration: true,
    nodeIntegrationInWorker: true
  }
})

mainWindow.loadURL('https://example.com')
```

```js
// Good
const mainWindow = new BrowserWindow({
  webPreferences: {
    preload: path.join(app.getAppPath(), 'preload.js')
  }
})

mainWindow.loadURL('https://example.com')
```

```html
<!-- Bad -->
<webview nodeIntegration src="page.html"></webview>

<!-- Good -->
<webview src="page.html"></webview>
```

Kapag sumalanta ang Node.js na integrasyon, maaari mong ilantad ang mga API sa iyong website na tumupok ng Node.js na mga modyul o mga katangian. Ang preload na mga manuskrito ay patuloy na may akses sa`require` at iba pang Node.js na mga katangian, na nagpapahintulot sa mga developer na ma-expose ang API na pasadya para bahagyang mag-load ang nilalaman.

Sa sumusunod na mga halimbawa ng preload na manuskrito, ang nakaraang nilalaman na website ay magkakaroon ng akses sa `window.readConfig()` na paraan, pero walang Node.js na mga tampok.

```js
const { readFileSync } = require('fs')

window.readConfig = function () {
  const data = readFileSync('./config.json')
  return data
}
```


## 3) Enable Context Isolation for Remote Content

Ang kontekstong pagbubukod ay isang Electron na tampok na nagpapahintulot sa mga developer na magpatakbo ng code sa preload na mga manuskrito at mga API ng Electron sa dedikadong  JavaScript na conteksto. Sa pagsasanay, ibig sabihin nito ay ang pandaigdigang mga bagay gaya ng `Array.prototype.push` o `JSON.parse` ay hindi na maaaring baguhin ng mga manuskritong pinatakbo sa proseso ng renderer.

Gumagamit ang Electron ng parehong teknolohiya sa Chromium na [Mga Manuskritong Nilalaman](https://developer.chrome.com/extensions/content_scripts#execution-environment) para paganahin ang kilos.

Even when you use `nodeIntegration: false` to enforce strong isolation and prevent the use of Node primitives, `contextIsolation` must also be used.

### Why & How?

For more information on what `contextIsolation` is and how to enable it please see our dedicated [Context Isolation](context-isolation.md) document.


## 4) Handle Session Permission Requests From Remote Content

Maaaring nakita mo na ang pahintulot ng kahilingan habang gumagamit ng Chrome: Ito ay nagpa-popup sa tuwing ang website ay magtatangkang gumamit ng tampok na mayrron ang gumagamit para mano-manong aprubahan (gaya ng mga abiso)

Ang API ay base sa [Chromium na mga permiso sa API](https://developer.chrome.com/extensions/permissions)at nagpapatupad ng parehong uri ng mga permiso.

### Bakit?

Sa pamamagitan ng default, ang Electron ay awtomatikong nagpahintulot sa lahat ng mga kahilingan ng permiso maliban kung ang developer ay mano-manong nag-configure ng nakaugaliang handler. Habang ang matibay na default, ang partikular sa seguridad na mga developer ay maaaring mag-akala ng kabuuang kabaliktaran.

### Paano?

```js
const { session } = require('electron')

session
  .fromPartition('some-partition')
  .setPermissionRequestHandler((webContents, permission, callback) => {
    const url = webContents.getURL()

    if (permission === 'notifications') {
      // Approves the permissions request
      callback(true)
    }

    // Verify URL
    if (!url.startsWith('https://example.com/')) {
      // Denies the permissions request
      return callback(false)
    }
  })
```


## 5) Do Not Disable WebSecurity

_Ang rekomendasyon ay default ng Electron_

You may have already guessed that disabling the `webSecurity` property on a renderer process ([`BrowserWindow`](../api/browser-window.md), [`BrowserView`](../api/browser-view.md), or [`<webview>`](../api/webview-tag.md)) disables crucial security features.

Huwag paganahin ang `webSecurity` sa mga application ng produksyon.

### Bakit?

Ang disable `webSecurity` ay hindi paganahin ang patakaran ng parehong pinanggalingan at itatakda `allowRunningInsecureContent` ang ari-arian sa `true`. Sa madaling salita, pinapayagan nito ang pagpapatupad ng hindi secure na code mula sa iba't ibang mga domain.

### Paano?
```js
// Masama
const mainWindow = new BrowserWindow({
  webPreferences: {
    webSecurity: false
  }
})
```

```js
// Mabuti
const mainWindow = new BrowserWindow()
```

```html
<!-- Bad -->
<webview disablewebsecurity src="page.html"></webview>

<!-- Good -->
<webview src="page.html"></webview>
```


## 6) Define a Content Security Policy

Ang NIlalaman ng Patakarang Pangsegurado (CSP) ay isang karagdagang layer ng proteksyon laban sa cross-site na manuskritong atake at data iniksyong atake. Inirekomenda namin na ang mga ito ay paganahin sa anumang website na iyong ma-load sa loob ng Electron.

### Bakit?

an CSP ay nagpapahintulot sa server serving na nilalaman upang paghigpitan at kontrolin ang mga mapagkukunan na maaaring ma-load sa Electron sa binigay na web page. Ang `https://example.com` ay dapat pahintulutan na mag-load ng mga manuskrito galing sa ga pinagmulan na inyong itinukoy habang ang mga manuskritong galing sa `https://evil.attacker.com` ay hindi dapat pahintulutang patakbuhin. Defining a CSP is an easy way to improve your application's security.

Ang sumusunod na CSP ay nagpapahintulot sa Electron na mag-execute ng mga manuskrito galing sa kasalukuyang website at galing sa 0>apis.example.com</code>.

```plaintext
// Hindi kaaya-aya
Nilalaman-Seguridad-Patakaran: '*'

// Kaaya-aya
Nilalaman-Seguridad-Patakaran: script-src 'self' https://apis.example.com
```

### CSP HTTP Header

Electron respects the [`Content-Security-Policy` HTTP header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy) which can be set using Electron's [`webRequest.onHeadersReceived`](../api/web-request.md#webrequestonheadersreceivedfilter-listener) handler:

```javascript
const { session } = require('electron')

session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
  callback({
    responseHeaders: {
      ...details.responseHeaders,
      'Content-Security-Policy': ['default-src \'none\'']
    }
  })
})
```

### CSP Meta Tag

CSP's preferred delivery mechanism is an HTTP header, however it is not possible to use this method when loading a resource using the `file://` protocol. It can be useful in some cases, such as using the `file://` protocol, to set a policy on a page directly in the markup using a `<meta>` tag:

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'none'">
```


## 7) Do Not Set `allowRunningInsecureContent` to `true`

_Ang rekomendasyon ay default ng Electron_

By default, Electron will not allow websites loaded over `HTTPS` to load and execute scripts, CSS, or plugins from insecure sources (`HTTP`). Setting the property `allowRunningInsecureContent` to `true` disables that protection.

Loading the initial HTML of a website over `HTTPS` and attempting to load subsequent resources via `HTTP` is also known as "mixed content".

### Bakit?

Loading content over `HTTPS` assures the authenticity and integrity of the loaded resources while encrypting the traffic itself. See the section on [only displaying secure content](#1-only-load-secure-content) for more details.

### Paano?

```js
// Bad
const mainWindow = new BrowserWindow({
  webPreferences: {
    allowRunningInsecureContent: true
  }
})
```

```js
// Mabuti
const mainWindow = new BrowserWindow({})
```


## 8) Do Not Enable Experimental Features

_Ang rekomendasyon ay default ng Electron_

Advanced users of Electron can enable experimental Chromium features using the `experimentalFeatures` property.

### Bakit?

Experimental features are, as the name suggests, experimental and have not been enabled for all Chromium users. Furthermore, their impact on Electron as a whole has likely not been tested.

Ang mga lehitimong kaso ng paggamit ay umiiral, ngunit maliban kung alam mo kung ano ang iyong ginagawa, dapat mo hindi paganahin ang ari-arian na ito.

### Paano?

```js
// Masama
const mainWindow = new BrowserWindow({
  webPreferences: {
    experimentalFeatures: true
  }
})
```

```js
// Mabuti
const mainWindow = new BrowserWindow({})
```


## 9) Do Not Use `enableBlinkFeatures`

_Ang rekomendasyon ay default ng Electron_

Ang blink ay ang pangalan ng rendering engine sa likod ng Chromium. As with `experimentalFeatures`, the `enableBlinkFeatures` property allows developers to enable features that have been disabled by default.

### Bakit?

Sa pangkalahatan, malamang na may mga dahilan kung ang isang tampok ay hindi pinagana bilang default. Ang mga lehitimong kaso ng paggamit para sa pagpapagana ng mga partikular na tampok ay umiiral. Bilang isang developer, dapat mong malaman eksakto kung bakit kailangan mong paganahin ang isang tampok, kung ano ang Ang mga resulta ay, at kung paano ito nakakaapekto sa seguridad ng iyong aplikasyon. Sa ilalim walang mga pangyayari na dapat mong paganahin ang mga tampok na speculatively.

### Paano?
```js
// Bad
const mainWindow = new BrowserWindow({
  webPreferences: {
    enableBlinkFeatures: 'ExecCommandInJavaScript'
  }
})
```

```js
// Mabuti
const mainWindow = new BrowserWindow()
```


## 10) Do Not Use `allowpopups`

_Ang rekomendasyon ay default ng Electron_

If you are using [`<webview>`](../api/webview-tag.md), you might need the pages and scripts loaded in your `<webview>` tag to open new windows. The `allowpopups` attribute enables them to create new [`BrowserWindows`](../api/browser-window.md) using the `window.open()` method. `<webview>` tags are otherwise not allowed to create new windows.

### Bakit?

Kung hindi mo kailangan ang mga popup, ikaw ay mas mahusay na hindi pinapayagan ang paglikha ng bagong [`BrowserWindows`](../api/browser-window.md) bilang default. Kasunod nito ang prinsipyo ng minimally required access: Huwag hayaan ang isang website na lumikha ng mga bagong popup maliban kung alam mo na kailangan nito ang tampok na iyon.

### Paano?

```html
<!-- Bad -->
<webview allowpopups src="page.html"></webview>

<!-- Good -->
<webview src="page.html"></webview>
```


## 11) Verify WebView Options Before Creation

Ang isang WebView na nilikha sa isang proseso ng renderer na walang pagsasama ng Node.js pinagana hindi makapag-enable ang pagsasama mismo. Gayunpaman, ang isang WebView ay laging lumikha ng isang malayang proseso ng pag-render na may sariling `webPreferences`.

It is a good idea to control the creation of new [`<webview>`](../api/webview-tag.md) tags from the main process and to verify that their webPreferences do not disable security features.

### Bakit?

Since `<webview>` live in the DOM, they can be created by a script running on your website even if Node.js integration is otherwise disabled.

Ang electron ay nagbibigay-daan sa mga developer na huwag paganahin ang iba't ibang mga tampok ng seguridad na kontrol isang proseso ng tagapag-render. In most cases, developers do not need to disable any of those features - and you should therefore not allow different configurations for newly created [`<webview>`](../api/webview-tag.md) tags.

### Paano?

Before a [`<webview>`](../api/webview-tag.md) tag is attached, Electron will fire the `will-attach-webview` event on the hosting `webContents`. Use the event to prevent the creation of `webViews` with possibly insecure options.

```js
app.on('web-contents-created', (event, contents) => {
  contents.on('will-attach-webview', (event, webPreferences, params) => {
    // I-strip ang mga preload script kung hindi ginagamit o i-verify ang kanilang lokasyon ay lehitimong
    delete webPreferences.preload
    delete webPreferences.preloadURL

    // Disable Node.js integration
    webPreferences.nodeIntegration = huwad

    // I-verify ang URL na na-load
    kung (!params.src.startsWith('https://example.com/')) {
      event.preventDefault()
    }
  })
})
```

Again, this list merely minimizes the risk, it does not remove it. If your goal is to display a website, a browser will be a more secure option.

## 12) Disable or limit navigation

If your app has no need to navigate or only needs to navigate to known pages, it is a good idea to limit navigation outright to that known scope, disallowing any other kinds of navigation.

### Bakit?

Navigation is a common attack vector. If an attacker can convince your app to navigate away from its current page, they can possibly force your app to open web sites on the Internet. Even if your `webContents` are configured to be more secure (like having `nodeIntegration` disabled or `contextIsolation` enabled), getting your app to open a random web site will make the work of exploiting your app a lot easier.

A common attack pattern is that the attacker convinces your app's users to interact with the app in such a way that it navigates to one of the attacker's pages. This is usually done via links, plugins, or other user-generated content.

### Paano?

If your app has no need for navigation, you can call `event.preventDefault()` in a [`will-navigate`](../api/web-contents.md#event-will-navigate) handler. If you know which pages your app might navigate to, check the URL in the event handler and only let navigation occur if it matches the URLs you're expecting.

We recommend that you use Node's parser for URLs. Simple string comparisons can sometimes be fooled - a `startsWith('https://example.com')` test would let `https://example.com.attacker.com` through.

```js
const URL = require('url').URL

app.on('web-contents-created', (event, contents) => {
  contents.on('will-navigate', (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl)

    if (parsedUrl.origin !== 'https://example.com') {
      event.preventDefault()
    }
  })
})
```

## 13) Disable or limit creation of new windows

If you have a known set of windows, it's a good idea to limit the creation of additional windows in your app.

### Bakit?

Much like navigation, the creation of new `webContents` is a common attack vector. Attackers attempt to convince your app to create new windows, frames, or other renderer processes with more privileges than they had before; or with pages opened that they couldn't open before.

If you have no need to create windows in addition to the ones you know you'll need to create, disabling the creation buys you a little bit of extra security at no cost. This is commonly the case for apps that open one `BrowserWindow` and do not need to open an arbitrary number of additional windows at runtime.

### Paano?

[`webContents`](../api/web-contents.md) will emit the [`new-window`](../api/web-contents.md#event-new-window) event before creating new windows. That event will be passed, amongst other parameters, the `url` the window was requested to open and the options used to create it. We recommend that you use the event to scrutinize the creation of windows, limiting it to only what you need.

```js
const { shell } = require('electron')

app.on('web-contents-created', (event, contents) => {
  contents.on('new-window', async (event, navigationUrl) => {
    // In this example, we'll ask the operating system
    // to open this event's url in the default browser.
    event.preventDefault()

    await shell.openExternal(navigationUrl)
  })
})
```

## 14) Do not use `openExternal` with untrusted content

Shell's [`openExternal`](../api/shell.md#shellopenexternalurl-options-callback) allows opening a given protocol URI with the desktop's native utilities. On macOS, for instance, this function is similar to the `open` terminal command utility and will open the specific application based on the URI and filetype association.

### Bakit?

Improper use of [`openExternal`](../api/shell.md#shellopenexternalurl-options-callback) can be leveraged to compromise the user's host. When openExternal is used with untrusted content, it can be leveraged to execute arbitrary commands.

### Paano?

```js
//  Bad
const { shell } = require('electron')
shell.openExternal(USER_CONTROLLED_DATA_HERE)
```
```js
//  Good
const { shell } = require('electron')
shell.openExternal('https://example.com/index.html')
```

## 15) Disable the `remote` module

The `remote` module provides a way for the renderer processes to access APIs normally only available in the main process. Using it, a renderer can invoke methods of a main process object without explicitly sending inter-process messages. If your desktop application does not run untrusted content, this can be a useful way to have your renderer processes access and work with modules that are only available to the main process, such as GUI-related modules (dialogs, menus, etc.).

However, if your app can run untrusted content and even if you [sandbox](../api/sandbox-option.md) your renderer processes accordingly, the `remote` module makes it easy for malicious code to escape the sandbox and have access to system resources via the higher privileges of the main process. Therefore, it should be disabled in such circumstances.

### Bakit?

`remote` uses an internal IPC channel to communicate with the main process. "Prototype pollution" attacks can grant malicious code access to the internal IPC channel, which can then be used to escape the sandbox by mimicking `remote` IPC messages and getting access to main process modules running with higher privileges.

Additionally, it's possible for preload scripts to accidentally leak modules to a sandboxed renderer. Leaking `remote` arms malicious code with a multitude of main process modules with which to perform an attack.

Disabling the `remote` module eliminates these attack vectors. Enabling context isolation also prevents the "prototype pollution" attacks from succeeding.

### Paano?

```js
// Bad if the renderer can run untrusted content
const mainWindow = new BrowserWindow({})
```

```js
// Good
const mainWindow = new BrowserWindow({
  webPreferences: {
    enableRemoteModule: false
  }
})
```

```html
<!-- Bad if the renderer can run untrusted content  -->
<webview src="page.html"></webview>

<!-- Good -->
<webview enableremotemodule="false" src="page.html"></webview>
```

## 16) Filter the `remote` module

If you cannot disable the `remote` module, you should filter the globals, Node, and Electron modules (so-called built-ins) accessible via `remote` that your application does not require. This can be done by blocking certain modules entirely and by replacing others with proxies that expose only the functionality that your app needs.

### Bakit?

Due to the system access privileges of the main process, functionality provided by the main process modules may be dangerous in the hands of malicious code running in a compromised renderer process. By limiting the set of accessible modules to the minimum that your app needs and filtering out the others, you reduce the toolset that malicious code can use to attack the system.

Note that the safest option is to [fully disable the remote module](#15-disable-the-remote-module). If you choose to filter access rather than completely disable the module, you must be very careful to ensure that no escalation of privilege is possible through the modules you allow past the filter.

### Paano?

```js
const readOnlyFsProxy = require(/* ... */) // exposes only file read functionality

const allowedModules = new Set(['crypto'])
const proxiedModules = new Map(['fs', readOnlyFsProxy])
const allowedElectronModules = new Set(['shell'])
const allowedGlobals = new Set()

app.on('remote-require', (event, webContents, moduleName) => {
  if (proxiedModules.has(moduleName)) {
    event.returnValue = proxiedModules.get(moduleName)
  }
  if (!allowedModules.has(moduleName)) {
    event.preventDefault()
  }
})

app.on('remote-get-builtin', (event, webContents, moduleName) => {
  if (!allowedElectronModules.has(moduleName)) {
    event.preventDefault()
  }
})

app.on('remote-get-global', (event, webContents, globalName) => {
  if (!allowedGlobals.has(globalName)) {
    event.preventDefault()
  }
})

app.on('remote-get-current-window', (event, webContents) => {
  event.preventDefault()
})

app.on('remote-get-current-web-contents', (event, webContents) => {
  event.preventDefault()
})
```

## 17) Use a current version of Electron

You should strive for always using the latest available version of Electron. Whenever a new major version is released, you should attempt to update your app as quickly as possible.

### Bakit?

An application built with an older version of Electron, Chromium, and Node.js is an easier target than an application that is using more recent versions of those components. Generally speaking, security issues and exploits for older versions of Chromium and Node.js are more widely available.

Both Chromium and Node.js are impressive feats of engineering built by thousands of talented developers. Given their popularity, their security is carefully tested and analyzed by equally skilled security researchers. Many of those researchers [disclose vulnerabilities responsibly](https://en.wikipedia.org/wiki/Responsible_disclosure), which generally means that researchers will give Chromium and Node.js some time to fix issues before publishing them. Your application will be more secure if it is running a recent version of Electron (and thus, Chromium and Node.js) for which potential security issues are not as widely known.
