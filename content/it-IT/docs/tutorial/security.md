# Sicurezza, Funzioni Native e Tue Responsabilità

Come sviluppatori web, noi sfruttiamo spesso la forte rete di sicurezza del browser, il rischio associato con il codice che scriviamo è relativamente piccolo. I nostri siti web sono dotati in una sandbox di potenza limitata garantita e confidiamo nel fatto che i nostri utenti sfruttino un browser costruito da un grande team di ingegneri che sappiano rispondere velocemente a nuovi tratti di sicurezza.

Quando si lavora con Electron, è importante capire che Electron non è un browser web. Ti consente di costruire app desktop ricche di funzioni con tecnologie web familiari, ma il tuo codice esercita una potenza maggiore. JavaScript può accedere al file di sistema, alle shell utente ed altro. Ciò ti consente di costruire app native di alta qualità ma inerenti alla scala dei rischi di sicurezza con potenza addizionale garantita al tuo codice.

Detto questo, sii consapevole che mostrare contenuti arbitrari da fonti inaffidabili pone il severo rischio di sicurezza che Electron non è destinato a gestire. Infatti, le app più popolari di Electron (Atom, Slack, Visual Studio Code, etc) mostrano contenuti locali primariamente (o affidabili, contenuti remoti sicuri senza integrazione di Node), se la tua app esegue codice da una fonte online, è tua responsabilità assicurarti che il codice non sia maligno.

## Segnalazione Problemi Sicurezza

Per informazioni su come divulgare propriamente una vulnerabilità di Electron vedi [SECURITY.md](https://github.com/electron/electron/tree/master/SECURITY.md)

## Aggiornamenti e Problemi di Sicurezza di Chromium

Mentre Electron si sforza di supportare nuove versioni di Chromium il prima possibile, gli sviluppatori dovrebbero essere consapevoli che aggiornare è un impegno serio, che coinvolge la modifica manuale di dozzine se non centinaia di file. Date le risorse ed i contributi disponibili oggi, Electrin non sarà spesso sull'ultima versione di Chromium, in ritardo di giorni o settimane.

Riteniamo che il sistema d'aggiornamento corrente dei componenti di Chromium dia un equilibrio adeguato tra le risorse disponibili e le necessità della maggioranza delle app costruite al massimo del framework. Siamo definitivamente interessati nell'ascoltare casi di utilizzi specifici da persone che costruiscono cose usando Electron. Richieste e contributi supportanti questo sforzo sono sempte molto benvenute.

## Consigli Sopra Ignorati

Un problema di sicurezza esiste quando tu ricevi un codice da una destinazione remota e lo esegui localmente. Come ad esempio, consifera un sito web remoto mostrato in una [`FinestraBrowser`](../api/browser-window.md). Se un malintenzionato riesce in qualche modo a cambiare detto contenuto (o attaccando la fonte direttamente o ponendosi tra la tua app e la destinazione attuale) potranno eseguire il codice nativo sulla macchina dell'utente.

> :warning: Sotto nessuna circostanza dovreste caricare ed eseguire codice remoto con l'integrazione Node.js abilitata. Usa solo file locali (impacchettati insieme alla tua app) per eseguire il codice Node.js. Per mostrare un contenuto remoto, usa il tag [`webview`](../api/web-view.md) ed assicurati di disabilitare `nodeIntegration`.

## Avvisi Sicurezza Electron

Da Electron 2.0, gli sviluppatori vedranno avvisi e raccomandazioni stampate nella console sviluppatore. Mostrano solo quando il nome binario è Electron, indicando che uno sviluppatore sta guardando attualmente alla console.

Puoi abilitare o disabilitare forzatamente questi avvisi impostando `ELECTRON_ABILITA_SICUREZZA_AVVISI` o `ELECTRON_DISABILITA_SICUREZZA_AVVISI` sull'oggetto `processo.enb` o sull'oggetto `finestra`.

## Checklist: Security Recommendations

This is not bulletproof, but at the least, you should follow these steps to improve the security of your application.

1. [Only load secure content](#1-only-load-secure-content)
2. [Disable the Node.js integration in all renderers that display remote content](#-2-disable-nodejs-integration-for-remote-content)
3. [Enable context isolation in all renderers that display remote content](#-3-enable-context-isolation-for-remote-content)
4. [Use `ses.setPermissionRequestHandler()` in all sessions that load remote content](#-4-handle-session-permission-requests-from-remote-content)
5. [Do not disable `webSecurity`](#-5-do-not-disable-websecurity)
6. [Define a `Content-Security-Policy`](#-6-define-a-content-security-policy) and use restrictive rules (i.e. `script-src 'self'`)
7. [Override and disable `eval`](#-7-override-and-disable-eval), which allows strings to be executed as code.
8. [Do not set `allowRunningInsecureContent` to `true`](#-8-do-not-set-allowrunninginsecurecontent-to-true)
9. [Do not enable experimental features](#-9-do-not-enable-experimental-features)
10. [Do not use `blinkFeatures`](#-10-do-not-use-blinkfeatures)
11. [WebViews: Do not use `allowpopups`](#-11-do-not-use-allowpopups)
12. [WebViews: Verify the options and params of all `<webview>` tags](#-12-verify-webview-options-before-creation)

## 1) Only Load Secure Content

Any resources not included with your application should be loaded using a secure protocol like `HTTPS`. In other words, do not use insecure protocols like `HTTP`. Similarly, we recommend the use of `WSS` over `WS`, `FTPS` over `FTP`, and so on.

### Why?

`HTTPS` has three main benefits:

1) It authenticates the remote server, ensuring your app connects to the correct host instead of an impersonator. 2) It ensures data integrity, asserting that the data was not modified while in transit between your application and the host. 3) It encrypts the traffic between your user and the destination host, making it more difficult to eavesdrop on the information sent between your app and the host.

### How?

```js
// Bad
browserWindow.loadURL('http://my-website.com')

// Good
browserWindow.loadURL('https://my-website.com')
```

```html
<!-- Bad -->
<script crossorigin src="http://cdn.com/react.js"></script>
<link rel="stylesheet" href="http://cdn.com/style.css">

<!-- Good -->
<script crossorigin src="https://cdn.com/react.js"></script>
<link rel="stylesheet" href="https://cdn.com/style.css">
```

## 2) Disable Node.js Integration for Remote Content

It is paramount that you disable Node.js integration in any renderer ([`BrowserWindow`](../api/browser-window.md), [`BrowserView`](../api/browser-view.md), or [`WebView`](../api/web-view.md)) that loads remote content. The goal is to limit the powers you grant to remote content, thus making it dramatically more difficult for an attacker to harm your users should they gain the ability to execute JavaScript on your website.

After this, you can grant additional permissions for specific hosts. For example, if you are opening a BrowserWindow pointed at `https://my-website.com/", you can give that website exactly the abilities it needs, but no more.

### Why?

A cross-site-scripting (XSS) attack is more dangerous if an attacker can jump out of the renderer process and execute code on the user's computer. Cross-site-scripting attacks are fairly common - and while an issue, their power is usually limited to messing with the website that they are executed on. Disabling Node.js integration helps prevent an XSS from being escalated into a so-called "Remote Code Execution" (RCE) attack.

### How?

```js
// Bad
const mainWindow = new BrowserWindow()
mainWindow.loadURL('https://my-website.com')
```

```js
// Good
const mainWindow = new BrowserWindow({
  webPreferences: {
    nodeIntegration: false,
    preload: './preload.js'
  }
})

mainWindow.loadURL('https://my-website.com')
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

### Why?

Context isolation allows each the scripts on running in the renderer to make changes to its JavaScript environment without worrying about conflicting with the scripts in the Electron API or the preload script.

While still an experimental Electron feature, context isolation adds an additional layer of security. It creates a new JavaScript world for Electron APIs and preload scripts.

At the same time, preload scripts still have access to the `document` and `window` objects. In other words, you're getting a decent return on a likely very small investment.

### How?

```js
// Main process
const mainWindow = new BrowserWindow({
  webPreferences: {
    contextIsolation: true,
    preload: 'preload.js'
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

### Why?

By default, Electron will automatically approve all permission requests unless the developer has manually configured a custom handler. While a solid default, security-conscious developers might want to assume the very opposite.

### How?

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

    if (!url.startsWith('https://my-website.com')) {
      // Denies the permissions request
      return callback(false)
    }
  })
```

## 5) Do Not Disable WebSecurity

*Recommendation is Electron's default*

You may have already guessed that disabling the `webSecurity` property on a renderer process ([`BrowserWindow`](../api/browser-window.md), [`BrowserView`](../api/browser-view.md), or [`WebView`](../api/web-view.md)) disables crucial security features.

Do not disable `webSecurity` in production applications.

### Why?

Disabling `webSecurity` will disable the same-origin policy and set `allowRunningInsecureContent` property to `true`. In other words, it allows the execution of insecure code from different domains.

### How?

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

### Why?

CSP allows the server serving content to restrict and control the resources Electron can load for that given web page. `https://your-page.com` should be allowed to load scripts from the origins you defined while scripts from `https://evil.attacker.com` should not be allowed to run. Defining a CSP is an easy way to improve your applications security.

### How?

Electron respects [the `Content-Security-Policy` HTTP header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy) and the respective `<meta>` tag.

The following CSP will allow Electron to execute scripts from the current website and from `apis.mydomain.com`.

```txt
// Bad
Content-Security-Policy: '*'

// Good
Content-Security-Policy: script-src 'self' https://apis.mydomain.com
```

## 7) Override and Disable `eval`

`eval()` is a core JavaScript method that allows the execution of JavaScript from a string. Disabling it disables your app's ability to evaluate JavaScript that is not known in advance.

### Why?

The `eval()` method has precisely one mission: To evaluate a series of characters as JavaScript and execute it. It is a required method whenever you need to evaluate code that is not known ahead of time. While legitimate use cases exist, just like any other code generators, `eval()` is difficult to harden.

Generally speaking, it is easier to completely disable `eval()` than to make it bulletproof. Thus, if you do not need it, it is a good idea to disable it.

### How?

```js
// ESLint will warn about any use of eval(), even this one
// eslint-disable-next-line
window.eval = global.eval = function () {
  throw new Error(`Sorry, this app does not support window.eval().`)
}
```

## 8) Do Not Set `allowRunningInsecureContent` to `true`

*Recommendation is Electron's default*

By default, Electron will not allow websites loaded over `HTTPS` to load and execute scripts, CSS, or plugins from insecure sources (`HTTP`). Setting the property `allowRunningInsecureContent` to `true` disables that protection.

Loading the initial HTML of a website over `HTTPS` and attempting to load subsequent resources via `HTTP` is also known as "mixed content".

### Why?

Simply put, loading content over `HTTPS` assures the authenticity and integrity of the loaded resources while encrypting the traffic itself. See the section on [only displaying secure content](#1-only-load-secure-content) for more details.

### How?

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

## 9) Do Not Enable Experimental Features

*Recommendation is Electron's default*

Advanced users of Electron can enable experimental Chromium features using the `experimentalFeatures` and `experimentalCanvasFeatures` properties.

### Why?

Experimental features are, as the name suggests, experimental and have not been enabled for all Chromium users. Furthermore, their impact on Electron as a whole has likely not been tested.

Legitimate use cases exist, but unless you know what you are doing, you should not enable this property.

### How?

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

## 10) Do Not Use `blinkFeatures`

*Recommendation is Electron's default*

Blink is the name of the rendering engine behind Chromium. As with `experimentalFeatures`, the `blinkFeatures` property allows developers to enable features that have been disabled by default.

### Why?

Generally speaking, there are likely good reasons if a feature was not enabled by default. Legitimate use cases for enabling specific features exist. As a developer, you should know exactly why you need to enable a feature, what the ramifications are, and how it impacts the security of your application. Under no circumstances should you enable features speculatively.

### How?

```js
// Bad
const mainWindow = new BrowserWindow({
  webPreferences: {
    blinkFeatures: ['ExecCommandInJavaScript']
  }
})
```

```js
// Good
const mainWindow = new BrowserWindow()
```

## 11) Do Not Use `allowpopups`

*Recommendation is Electron's default*

If you are using [`WebViews`](../api/web-view.md), you might need the pages and scripts loaded in your `<webview>` tag to open new windows. The `allowpopups` attribute enables them to create new [`BrowserWindows`](../api/browser-window.md) using the `window.open()` method. `WebViews` are otherwise not allowed to create new windows.

### Why?

If you do not need popups, you are better off not allowing the creation of new [`BrowserWindows`](../api/browser-window.md) by default. This follows the principle of minimally required access: Don't let a website create new popups unless you know it needs that feature.

### How?

```html
<!-- Bad -->
<webview allowpopups src="page.html"></webview>

<!-- Good -->
<webview src="page.html"></webview>
```

## 12) Verify WebView Options Before Creation

A WebView created in a renderer process that does not have Node.js integration enabled will not be able to enable integration itself. However, a WebView will always create an independent renderer process with its own `webPreferences`.

It is a good idea to control the creation of new [`WebViews`](../api/web-view.md) from the main process and to verify that their webPreferences do not disable security features.

### Why?

Since WebViews live in the DOM, they can be created by a script running on your website even if Node.js integration is otherwise disabled.

Electron enables developers to disable various security features that control a renderer process. In most cases, developers do not need to disable any of those features - and you should therefore not allow different configurations for newly created [`<WebView>`](../api/web-view.md) tags.

### How?

Before a [`<WebView>`](../api/web-view.md) tag is attached, Electron will fire the `will-attach-webview` event on the hosting `webContents`. Use the event to prevent the creation of WebViews with possibly insecure options.

```js
app.on('web-contents-created', (event, contents) => {
  contents.on('will-attach-webview', (event, webPreferences, params) => {
    // Strip away preload scripts if unused or verify their location is legitimate
    delete webPreferences.preload
    delete webPreferences.preloadURL

    // Disable Node.js integration
    webPreferences.nodeIntegration = false

    // Verify URL being loaded
    if (!params.src.startsWith('https://yourapp.com/')) {
      event.preventDefault()
    }
  })
})
```

Again, this list merely minimizes the risk, it does not remove it. If your goal is to display a website, a browser will be a more secure option.