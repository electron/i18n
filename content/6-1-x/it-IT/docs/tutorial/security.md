# Sicurezza, Funzioni Native e Tue Responsabilità

Come sviluppatori web, noi sfruttiamo spesso la forte rete di sicurezza del browser, il rischio associato con il codice che scriviamo è relativamente piccolo. I nostri siti web sono dotati in una sandbox di potenza limitata garantita e confidiamo nel fatto che i nostri utenti sfruttino un browser costruito da un grande team di ingegneri che sappiano rispondere velocemente a nuovi tratti di sicurezza.

Quando si lavora con Electron, è importante capire che Electron non è un browser web. Ti consente di costruire app desktop ricche di funzioni con tecnologie web familiari, ma il tuo codice esercita una potenza maggiore. JavaScript può accedere al file di sistema, alle shell utente ed altro. Ciò ti consente di costruire app native di alta qualità ma inerenti alla scala dei rischi di sicurezza con potenza addizionale garantita al tuo codice.

Detto questo, sii consapevole che mostrare contenuti arbitrari da fonti inaffidabili pone il severo rischio di sicurezza che Electron non è destinato a gestire. Infatti, le app più popolari di Electron (Atom, Slack, Visual Studio Code, etc) mostrano contenuti locali primariamente (o affidabili, contenuti remoti sicuri senza integrazione di Node), se la tua app esegue codice da una fonte online, è tua responsabilità assicurarti che il codice non sia maligno.

## Segnalazione Problemi Sicurezza

Per informazioni su come divulgare propriamente una vulnerabilità di Electron vedi [SECURITY.md](https://github.com/electron/electron/tree/master/SECURITY.md)

## Aggiornamenti e Problemi di Sicurezza di Chromium

Electron keeps up to date with alternating Chromium releases. For more information, see the [Electron Release Cadence blog post](https://electronjs.org/blog/12-week-cadence).

## Security Is Everyone's Responsibility

It is important to remember that the security of your Electron application is the result of the overall security of the framework foundation (*Chromium*, *Node.js*), Electron itself, all NPM dependencies and your code. As such, it is your responsibility to follow a few important best practices:

* **Keep your application up-to-date with the latest Electron framework release.** When releasing your product, you’re also shipping a bundle composed of Electron, Chromium shared library and Node.js. Vulnerabilities affecting these components may impact the security of your application. By updating Electron to the latest version, you ensure that critical vulnerabilities (such as *nodeIntegration bypasses*) are already patched and cannot be exploited in your application.

* **Evaluate your dependencies.** While NPM provides half a million reusable packages, it is your responsibility to choose trusted 3rd-party libraries. If you use outdated libraries affected by known vulnerabilities or rely on poorly maintained code, your application security could be in jeopardy.

* **Adopt secure coding practices.** The first line of defense for your application is your own code. Common web vulnerabilities, such as Cross-Site Scripting (XSS), have a higher security impact on Electron applications hence it is highly recommended to adopt secure software development best practices and perform security testing.


## Isolation For Untrusted Content

A security issue exists whenever you receive code from an untrusted source (e.g. a remote server) and execute it locally. As an example, consider a remote website being displayed inside a default [`BrowserWindow`](../api/browser-window.md). If an attacker somehow manages to change said content (either by attacking the source directly, or by sitting between your app and the actual destination), they will be able to execute native code on the user's machine.

> :warning: Sotto nessuna circostanza dovreste caricare ed eseguire codice remoto con l'integrazione  Node.js abilitata. Usa solo file locali (impacchettati insieme alla tua app) per eseguire il codice Node.js. To display remote content, use the [`<webview>`](../api/webview-tag.md) tag or [`BrowserView`](../api/browser-view.md), make sure to disable the `nodeIntegration` and enable `contextIsolation`.

## Avvisi Sicurezza Electron

Da Electron 2.0, gli sviluppatori vedranno avvisi e raccomandazioni stampate nella console sviluppatore. Mostrano solo quando il nome binario è Electron, indicando che uno sviluppatore sta guardando attualmente alla console.

Puoi abilitare o disabilitare forzatamente questi avvisi impostando `ELECTRON_ENABLE_SECURITY_WARNINGS` o `ELECTRON_DISABLE_SECURITY_WARNINGS` sull'oggetto `process.env` o sull'oggetto `window`.

## Lista di controllo: Raccomandazioni di Sicurezza

You should at least follow these steps to improve the security of your application:

1. [Solo contenuti caricati sicuri](#1-only-load-secure-content)
2. [Disabilita l'integrazione Node.js in tutti i renderer che mostrano contenuti remoti](#2-do-not-enable-nodejs-integration-for-remote-content)
3. [Abilita integrazione contesto in tutti i renderer che mostrano contenuti remoti](#3-enable-context-isolation-for-remote-content)
4. [Usa `ses.impostaPermessoRichiestaProprietario()` in tutte le sessioni che caricano contenuti remoti](#4-handle-session-permission-requests-from-remote-content)
5. [Non disabilitare `Sicurezzaweb`](#5-do-not-disable-websecurity)
6. [Definisci un `Contenuto-Sicurezza-Politica`](#6-define-a-content-security-policy) ed usa regole restrittive (i.e. `script-autoricerca'`)
7. [Non impostare `consentiEsecuzioneContenutoInsicuro` in `true`](#7-do-not-set-allowrunninginsecurecontent-to-true)
8. [Non abilitare funzioni sperimentali](#8-do-not-enable-experimental-features)
9. [Do not use `enableBlinkFeatures`](#9-do-not-use-enableblinkfeatures)
10. [`<webview>`: Do not use `allowpopups`](#10-do-not-use-allowpopups)
11. [`<webview>`: Verify options and params](#11-verify-webview-options-before-creation)
12. [Disable or limit navigation](#12-disable-or-limit-navigation)
13. [Disable or limit creation of new windows](#13-disable-or-limit-creation-of-new-windows)
14. [Do not use `openExternal` with untrusted content](#14-do-not-use-openexternal-with-untrusted-content)
15. [Disable the `remote` module](#15-disable-the-remote-module)
16. [Filter the `remote` module](#16-filter-the-remote-module)

To automate the detection of misconfigurations and insecure patterns, it is possible to use [electronegativity](https://github.com/doyensec/electronegativity). For additional details on potential weaknesses and implementation bugs when developing applications using Electron, please refer to this [guide for developers and auditors](https://doyensec.com/resources/us-17-Carettoni-Electronegativity-A-Study-Of-Electron-Security-wp.pdf)

## 1) Carica Solo Contenuti Sicuri

Ogni risorsa non inclusa con la app dovrebbe essere caricata usando un protocollo sicuro come `HTTPS`. In altre parole, non usare protocolli non sicuri come `HTTP`. Similarmente, raccomandiamo di usare `WSS` oltre `WS`, `FTPS` oltre `FTP` e così via.

### Perchè?

`HTTPS` ha tre benefici principali:

1) Autentica i server remoti, assicurando la connessione della tua app all'host corretto di un impersonatore. 2) Assicura l'integrità dei dati, certificando che i dati non sono stati modificati mentre in transito tra la tua app e l'host. 3) Cripta il traffico tra il tuo utente e l'host di destinazione, rendendo più difficile fare un eavesdrop sull'informazione inviata tra la tua app e l'host.

### Come?

```js
// Male
browserWindow.loadURL('http://example.com')

// Bene
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

It is paramount that you do not enable Node.js integration in any renderer ([`BrowserWindow`](../api/browser-window.md), [`BrowserView`](../api/browser-view.md), or [`<webview>`](../api/webview-tag.md)) that loads remote content. L'obiettivo è di limitare la forza che tu garantisci al contenuto remoto, ciò rendendo drammaticamente più difficile per un malintenzionato di danneggiare l'utente, dovrebbero guadagnare l'abilità di eseguire JavaScript sul tuo sito.

Dopo ciò, puoi garantire permessi aggiuntivi per host specifici. Per esempio, se stai aprendo una FinestraBrowser puntata a 'https://example.com/, puoi dare a questo sito esattamente le abilità che necessiti, ma nient'altro.

### Perchè?

A cross-site-scripting (XSS) attack is more dangerous if an attacker can jump out of the renderer process and execute code on the user's computer. Cross-site-scripting attacks are fairly common - and while an issue, their power is usually limited to messing with the website that they are executed on. Disabling Node.js integration helps prevent an XSS from being escalated into a so-called "Remote Code Execution" (RCE) attack.

### Come?

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

When disabling Node.js integration, you can still expose APIs to your website that do consume Node.js modules or features. Preload scripts continue to have access to `require` and other Node.js features, allowing developers to expose a custom API to remotely loaded content.

In the following example preload script, the later loaded website will have access to a `window.readConfig()` method, but no Node.js features.

```js
const { readFileSync } = require('fs')

window.readConfig = function () {
  const data = readFileSync('./config.json')
  return data
}
```


## 3) Enable Context Isolation for Remote Content

Context isolation is an Electron feature that allows developers to run code in preload scripts and in Electron APIs in a dedicated JavaScript context. In practice, that means that global objects like `Array.prototype.push` or `JSON.parse` cannot be modified by scripts running in the renderer process.

Electron uses the same technology as Chromium's [Content Scripts](https://developer.chrome.com/extensions/content_scripts#execution-environment) to enable this behavior.

Even when you use `nodeIntegration: false` to enforce strong isolation and prevent the use of Node primitives, `contextIsolation` must also be used.

### Perchè?

Context isolation allows each the scripts on running in the renderer to make changes to its JavaScript environment without worrying about conflicting with the scripts in the Electron API or the preload script.

While still an experimental Electron feature, context isolation adds an additional layer of security. It creates a new JavaScript world for Electron APIs and preload scripts, which mitigates so-called "Prototype Pollution" attacks.

At the same time, preload scripts still have access to the  `document` and `window` objects. In other words, you're getting a decent return on a likely very small investment.

### Come?

```js
// Main process
const mainWindow = new BrowserWindow({
  webPreferences: {
    contextIsolation: true,
    preload: path.join(app.getAppPath(), 'preload.js')
  }
})
```

```js
// Preload script

// Set a variable in the page before it loads
webFrame.executeJavaScript('window.foo = "foo";')

// The loaded page will not be able to access this, it is only available
// in this context
window.bar = 'bar'

document.addEventListener('DOMContentLoaded', () => {
  // Will log out 'undefined' since window.foo is only available in the main
  // context
  console.log(window.foo)

  // Will log out 'bar' since window.bar is available in this context
  console.log(window.bar)
})
```


## 4) Handle Session Permission Requests From Remote Content

You may have seen permission requests while using Chrome: They pop up whenever the website attempts to use a feature that the user has to manually approve ( like notifications).

The API is based on the [Chromium permissions API](https://developer.chrome.com/extensions/permissions) and implements the same types of permissions.

### Perchè?

By default, Electron will automatically approve all permission requests unless the developer has manually configured a custom handler. While a solid default, security-conscious developers might want to assume the very opposite.

### Come?

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

_Recommendation is Electron's default_

You may have already guessed that disabling the `webSecurity` property on a renderer process ([`BrowserWindow`](../api/browser-window.md), [`BrowserView`](../api/browser-view.md), or [`<webview>`](../api/webview-tag.md)) disables crucial security features.

Do not disable `webSecurity` in production applications.

### Perchè?

Disabling `webSecurity` will disable the same-origin policy and set `allowRunningInsecureContent` property to `true`. In other words, it allows the execution of insecure code from different domains.

### Come?
```js
// Bad
const mainWindow = new BrowserWindow({
  webPreferences: {
    webSecurity: false
  }
})
```

```js
// Good
const mainWindow = new BrowserWindow()
```

```html
<!-- Bad -->
<webview disablewebsecurity src="page.html"></webview>

<!-- Good -->
<webview src="page.html"></webview>
```


## 6) Define a Content Security Policy

A Content Security Policy (CSP) is an additional layer of protection against cross-site-scripting attacks and data injection attacks. We recommend that they be enabled by any website you load inside Electron.

### Perchè?

CSP allows the server serving content to restrict and control the resources Electron can load for that given web page. `https://example.com` should be allowed to load scripts from the origins you defined while scripts from `https://evil.attacker.com` should not be allowed to run. Defining a CSP is an easy way to improve your application's security.

The following CSP will allow Electron to execute scripts from the current website and from `apis.example.com`.

```txt
// Bad
Content-Security-Policy: '*'

// Good
Content-Security-Policy: script-src 'self' https://apis.example.com
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

#### `webRequest.onHeadersReceived([filter, ]listener)`


## 7) Do Not Set `allowRunningInsecureContent` to `true`

_Recommendation is Electron's default_

By default, Electron will not allow websites loaded over `HTTPS` to load and execute scripts, CSS, or plugins from insecure sources (`HTTP`). Setting the property `allowRunningInsecureContent` to `true` disables that protection.

Loading the initial HTML of a website over `HTTPS` and attempting to load subsequent resources via `HTTP` is also known as "mixed content".

### Perchè?

Loading content over `HTTPS` assures the authenticity and integrity of the loaded resources while encrypting the traffic itself. See the section on [only displaying secure content](#1-only-load-secure-content) for more details.

### Come?

```js
// Bad
const mainWindow = new BrowserWindow({
  webPreferences: {
    allowRunningInsecureContent: true
  }
})
```

```js
// Good
const mainWindow = new BrowserWindow({})
```


## 8) Do Not Enable Experimental Features

_Recommendation is Electron's default_

Advanced users of Electron can enable experimental Chromium features using the `experimentalFeatures` property.

### Perchè?

Experimental features are, as the name suggests, experimental and have not been enabled for all Chromium users. Furthermore, their impact on Electron as a whole has likely not been tested.

Legitimate use cases exist, but unless you know what you are doing, you should not enable this property.

### Come?

```js
// Bad
const mainWindow = new BrowserWindow({
  webPreferences: {
    experimentalFeatures: true
  }
})
```

```js
// Good
const mainWindow = new BrowserWindow({})
```


## 9) Do Not Use `enableBlinkFeatures`

_Recommendation is Electron's default_

Blink is the name of the rendering engine behind Chromium. As with `experimentalFeatures`, the `enableBlinkFeatures` property allows developers to enable features that have been disabled by default.

### Perchè?

Generally speaking, there are likely good reasons if a feature was not enabled by default. Legitimate use cases for enabling specific features exist. As a developer, you should know exactly why you need to enable a feature, what the ramifications are, and how it impacts the security of your application. Under no circumstances should you enable features speculatively.

### Come?
```js
// Bad
const mainWindow = new BrowserWindow({
  webPreferences: {
    enableBlinkFeatures: ['ExecCommandInJavaScript']
  }
})
```

```js
// Good
const mainWindow = new BrowserWindow()
```


## 10) Do Not Use `allowpopups`

_Recommendation is Electron's default_

If you are using [`<webview>`](../api/webview-tag.md), you might need the pages and scripts loaded in your `<webview>` tag to open new windows. The `allowpopups` attribute enables them to create new [`BrowserWindows`](../api/browser-window.md) using the `window.open()` method. `<webview>` tags are otherwise not allowed to create new windows.

### Perchè?

If you do not need popups, you are better off not allowing the creation of new [`BrowserWindows`](../api/browser-window.md) by default. This follows the principle of minimally required access: Don't let a website create new popups unless you know it needs that feature.

### Come?

```html
<!-- Bad -->
<webview allowpopups src="page.html"></webview>

<!-- Good -->
<webview src="page.html"></webview>
```


## 11) Verify WebView Options Before Creation

A WebView created in a renderer process that does not have Node.js integration enabled will not be able to enable integration itself. However, a WebView will always create an independent renderer process with its own `webPreferences`.

It is a good idea to control the creation of new [`<webview>`](../api/webview-tag.md) tags from the main process and to verify that their webPreferences do not disable security features.

### Perchè?

Since `<webview>` live in the DOM, they can be created by a script running on your website even if Node.js integration is otherwise disabled.

Electron enables developers to disable various security features that control a renderer process. In most cases, developers do not need to disable any of those features - and you should therefore not allow different configurations for newly created [`<webview>`](../api/webview-tag.md) tags.

### Come?

Before a [`<webview>`](../api/webview-tag.md) tag is attached, Electron will fire the `will-attach-webview` event on the hosting `webContents`. Use the event to prevent the creation of `webViews` with possibly insecure options.

```js
app.on('web-contents-created', (event, contents) => {
  contents.on('will-attach-webview', (event, webPreferences, params) => {
    // Strip away preload scripts if unused or verify their location is legitimate
    delete webPreferences.preload
    delete webPreferences.preloadURL

    // Disable Node.js integration
    webPreferences.nodeIntegration = false

    // Verify URL being loaded
    if (!params.src.startsWith('https://example.com/')) {
      event.preventDefault()
    }
  })
})
```

Again, this list merely minimizes the risk, it does not remove it. If your goal is to display a website, a browser will be a more secure option.

## 12) Disable or limit navigation

If your app has no need to navigate or only needs to navigate to known pages, it is a good idea to limit navigation outright to that known scope, disallowing any other kinds of navigation.

### Perchè?

Navigation is a common attack vector. If an attacker can convince your app to navigate away from its current page, they can possibly force your app to open web sites on the Internet. Even if your `webContents` are configured to be more secure (like having `nodeIntegration` disabled or `contextIsolation` enabled), getting your app to open a random web site will make the work of exploiting your app a lot easier.

A common attack pattern is that the attacker convinces your app's users to interact with the app in such a way that it navigates to one of the attacker's pages. This is usually done via links, plugins, or other user-generated content.

### Come?

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

### Perchè?

Much like navigation, the creation of new `webContents` is a common attack vector. Attackers attempt to convince your app to create new windows, frames, or other renderer processes with more privileges than they had before; or with pages opened that they couldn't open before.

If you have no need to create windows in addition to the ones you know you'll need to create, disabling the creation buys you a little bit of extra security at no cost. This is commonly the case for apps that open one `BrowserWindow` and do not need to open an arbitrary number of additional windows at runtime.

### Come?

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

### Perchè?

Improper use of [`openExternal`](../api/shell.md#shellopenexternalurl-options-callback) can be leveraged to compromise the user's host. When openExternal is used with untrusted content, it can be leveraged to execute arbitrary commands.

### Come?

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

### Perchè?

`remote` uses an internal IPC channel to communicate with the main process. "Prototype pollution" attacks can grant malicious code access to the internal IPC channel, which can then be used to escape the sandbox by mimicking `remote` IPC messages and getting access to main process modules running with higher privileges.

Additionally, it's possible for preload scripts to accidentally leak modules to a sandboxed renderer. Leaking `remote` arms malicious code with a multitude of main process modules with which to perform an attack.

Disabling the `remote` module eliminates these attack vectors. Enabling context isolation also prevents the "prototype pollution" attacks from succeeding.

### Come?

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

### Perchè?

Due to the system access privileges of the main process, functionality provided by the main process modules may be dangerous in the hands of malicious code running in a compromised renderer process. By limiting the set of accessible modules to the minimum that your app needs and filtering out the others, you reduce the toolset that malicious code can use to attack the system.

Note that the safest option is to [fully disable the remote module](#15-disable-the-remote-module). If you choose to filter access rather than completely disable the module, you must be very careful to ensure that no escalation of privilege is possible through the modules you allow past the filter.

### Come?

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

app.on('remote-get-guest-web-contents', (event, webContents, guestWebContents) => {
  event.preventDefault()
})
```
