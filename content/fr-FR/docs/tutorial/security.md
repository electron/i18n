# Sécurité, fonctionnalités natives et votre responsabilité

En tant que développeurs web, nous apprécions généralement le réseau de sécurité du navigateur - les risques associés au code que nous écrivons sont relativement faibles. Nos sites Web bénéficient de pouvoirs limités dans un bac à sable, et nous sommes convaincus que nos utilisateurs bénéficient d'un navigateur construit par une grande équipe d'ingénieurs capables de répondre rapidement aux menaces de sécurité récemment découvertes.

Lorsque vous travaillez avec Electron, il est important de comprendre que l’Electron n’est pas un navigateur web. Il vous permet de developper des applications de bureau riche en fonctionnalités avec des technologies web familières, mais votre code exerce un pouvoir beaucoup plus grand. JavaScript peut accéder au système de fichiers, au shell et bien plus. Cela vous permet de développer des applications natives de haute qualité, mais les risques de sécurité inhérents évoluent avec les pouvoirs supplémentaires accordés à votre code.

Dans cet esprit, sachez qu’afficher un contenu arbitraire de sources peu fiables est un grave risque pour la sécurité qu'Electron n’est pas destiné à gérer. En fait, les applications les plus populaires Electron (Atom, Slack, Visual Studio Code, etc.) affichent principalement du contenu local (ou un contenu distant fiable et sécurisé sans intégration de Node) – si votre application exécute le code provenant d’une source en ligne, il est de votre responsabilité de vous assurer que le code n’est pas malveillant.

## Signalement des problèmes de sécurité

Pour plus d’informations sur la façon de communiquer correctement une vulnérabilité d'Electron, voir [SECURITY.md](https://github.com/electron/electron/tree/master/SECURITY.md)

## Problèmes de sécurité et mises à jour de Chromium

Alors qu'Electron s’efforce de soutenir les nouvelles versions de Chromium dès que possible, les développeurs doivent être conscients que la mise à niveau est une entreprise sérieuse - impliquant la modification manuelle des dizaines ou même des centaines de fichiers. Étant donné les ressources et les contributions disponibles aujourd'hui, Electron ne sera souvent pas sur la toute dernière version de Chromium, à la traîne de quelques jours ou semaines.

Nous estimons que notre système actuel de mise à jour de Chromium présente un équilibre approprié entre les ressources disponibles et les besoins de la majorité des applications développées sur le framework. Nous sommes intéressés à en savoir plus sur les cas d'utilisation spécifiques des personnes qui développent avec Electron. Les Pull requests et les contributions qui appuient ces efforts sont toujours les bienvenues.

## Ignorer les conseils ci-dessus

Il existe un problème de sécurité chaque fois que vous recevez le code d’une destination distante et l’exécutez localement. A titre d'exemple, considérons un site Web distant affiché à l'intérieur d'une fenêtre de navigateur [`BrowserWindow`](../api/browser-window.md). Si un attaquant parvient d'une manière ou d'une autre à modifier ce contenu (soit en attaquant directement la source, soit en restant assis entre votre application et la destination réelle), il pourra exécuter du code natif sur la machine de l'utilisateur.

> :warning: en aucune circonstance vous devriez charger et exécuter du code distant avec l'intégration de Node.js activé. Utilisez plutôt les fichiers locaux (empaquetés avec votre application) pour exécuter le code de Node. Pour afficher du contenu distant, utilisez la balise [`webview`](../api/web-view.md) et assurez-vous de désactiver le `nodeIntegration`.

## Avertissements de sécurité d'Electron

A partir d'Electron 2.0, les développeurs recevront des avertissements et recommandations directement dans la console de développement. They only show up when the binary's name is Electron, indicating that a developer is currently looking at the console.

Vous pouvez forcer l'activation ou la désactivation ces avertissements en définissant `ELECTRON_ENABLE_SECURITY_WARNINGS` ou `ELECTRON_DISABLE_SECURITY_WARNINGS` sur `process.env` ou sur l’objet `window`.

## Checklist : recommandations de sécurité

Cette liste n'est pas 100% parfaite, mais vous devriez au moins suivre ces quelques étapes pour améliorer la sécurité de votre application.

1. [Only load secure content](#1-only-load-secure-content)
2. [Disable the Node.js integration in all renderers that display remote content](#2-disable-nodejs-integration-for-remote-content)
3. [Enable context isolation in all renderers that display remote content](#3-enable-context-isolation-for-remote-content)
4. [Utiliser `ses.setPermissionRequestHandler()` dans toutes les sessions qui se chargent de contenu distant](#4-handle-session-permission-requests-from-remote-content)
5. [Do not disable `webSecurity`](#5-do-not-disable-websecurity)
6. [Define a `Content-Security-Policy`](#6-define-a-content-security-policy) and use restrictive rules (i.e. `script-src 'self'`)
7. [Override and disable `eval`](#7-override-and-disable-eval), which allows strings to be executed as code.
8. [Do not set `allowRunningInsecureContent` to `true`](#8-do-not-set-allowrunninginsecurecontent-to-true)
9. [Do not enable experimental features](#9-do-not-enable-experimental-features)
10. [Do not use `enableBlinkFeatures`](#10-do-not-use-enableblinkfeatures)
11. [WebViews : Ne pas utiliser `allowpopups`](#11-do-not-use-allowpopups)
12. [WebViews: Verify the options and params of all `<webview>` tags](#12-verify-webview-options-before-creation)

## 1) Ne télécharger que des contenus sécurisés

Toutes les ressources non incluses avec votre application doivent être téléchargées à l’aide d’un protocole sécurisé `HTTPS`. En d’autres termes, n’utilisez pas de protocoles non sécurisés tels que `HTTP`. De même, nous vous recommandons d’utiliser `WSS` plutôt `WS`, `FTPS` par `FTP` et ainsi de suite.

### Pourquoi ?

`HTTPS` a trois principaux avantages :

1) Il authentifie le serveur distant, ce qui certifie que votre application se connecte au bon hôte plutôt qu'a un imitateur. 2) Il assure l'intégrité des données, certifiant que les données n'ont pas été modifiées durant le transit entre l'application et l'hôte. 3) Il encrypte le trafic entre votre l'utilisateur et l'hôte de destination, ce qui complique la tâche de quiconque voudrait épier les informations échangées entre l'hôte et votre application.

### Comment ?

```js
// Incorrect
browserWindow.loadURL('http://my-website.com')

// Correct
browserWindow.loadURL('https://my-website.com')
```

```html
<!-- Incorrect -->
<script crossorigin src="http://cdn.com/react.js"></script>
<link rel="stylesheet" href="http://cdn.com/style.css">

<!-- Correct -->
<script crossorigin src="https://cdn.com/react.js"></script>
<link rel="stylesheet" href="https://cdn.com/style.css">
```

## 2) Désactiver l'intégration de Node.js dans tous les renderers affichant des contenus distants

Il est crucial que vous désactiviez l'intégration de Node.js dans tous les renderers ([`BrowserWindow`](../api/browser-window.md), [`BrowserView`](../api/browser-view.md), or [`WebView`](../api/web-view.md)) qui téléchargent des contenus distants. Le but est de limiter les permissions accordées aux contenus distants, ce qui complique drastiquement la tâche pour un attaquant qui souhaiterait nuire à vos utilisateurs (si jamais cet attaquant réussissait à exécuter du javascript sur votre site).

Une fois cela fait, vous pouvez accorder des permissions supplémentaires à des hôtes spécifiques. Par exemple, si vous ouvrez une BrowserWindow ayant `https://my-website.com/" pour cible, vous pouvez ne conférer à ce site que les capacités dont il a besoin pour fonctionner.

### Pourquoi ?

A cross-site-scripting (XSS) attack is more dangerous if an attacker can jump out of the renderer process and execute code on the user's computer. Cross-site-scripting attacks are fairly common - and while an issue, their power is usually limited to messing with the website that they are executed on. Disabling Node.js integration helps prevent an XSS from being escalated into a so-called "Remote Code Execution" (RCE) attack.

### Comment ?

```js
// Incorrect
const mainWindow = new BrowserWindow()
mainWindow.loadURL('https://my-website.com')
```

```js
// Correct
const mainWindow = new BrowserWindow({
  webPreferences: {
    nodeIntegration: false,
    preload: './preload.js'
  }
})

mainWindow.loadURL('https://my-website.com')
```

```html
<!-- Incorrect -->
<webview nodeIntegration src="page.html"></webview>

<!-- Correct -->
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

### Pourquoi ?

Context isolation allows each the scripts on running in the renderer to make changes to its JavaScript environment without worrying about conflicting with the scripts in the Electron API or the preload script.

While still an experimental Electron feature, context isolation adds an additional layer of security. It creates a new JavaScript world for Electron APIs and preload scripts.

At the same time, preload scripts still have access to the `document` and `window` objects. In other words, you're getting a decent return on a likely very small investment.

### Comment ?

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

// Définit une variable dans la page avant le chargement
webFrame.executeJavaScript('window.foo = "foo";')

// La page chargée ne pourra pas y accéder, elle est seulement disponible
// dans ce contexte
window.bar = 'bar'

document.addEventListener('DOMContentLoaded', () => {
  // Affichera 'undefined' puisque window.foo n'est disponible que dans le
  // contexte principal
  console.log(window.foo)

  // Affichera 'bar' puisque window.bar est disponible dans ce contexte
  console.log(window.bar)
})
```

## 4) Handle Session Permission Requests From Remote Content

You may have seen permission requests while using Chrome: They pop up whenever the website attempts to use a feature that the user has to manually approve ( like notifications).

The API is based on the [Chromium permissions API](https://developer.chrome.com/extensions/permissions) and implements the same types of permissions.

### Pourquoi ?

By default, Electron will automatically approve all permission requests unless the developer has manually configured a custom handler. While a solid default, security-conscious developers might want to assume the very opposite.

### Comment ?

```js
const { session } = require('electron')

session
  .fromPartition('some-partition')
  .setPermissionRequestHandler((webContents, permission, callback) => {
    const url = webContents.getURL()

    if (permission === 'notifications') {
      // Approuve la requête de permissions
      callback(true)
    }

    if (!url.startsWith('https://my-website.com')) {
      // Denies the permissions request
      return callback(false)
    }
  })
```

## 5) Do Not Disable WebSecurity

*Cette recommandation est appliquée par défaut sur Electron*

You may have already guessed that disabling the `webSecurity` property on a renderer process ([`BrowserWindow`](../api/browser-window.md), [`BrowserView`](../api/browser-view.md), or [`WebView`](../api/web-view.md)) disables crucial security features.

Do not disable `webSecurity` in production applications.

### Pourquoi ?

Disabling `webSecurity` will disable the same-origin policy and set `allowRunningInsecureContent` property to `true`. In other words, it allows the execution of insecure code from different domains.

### Comment ?

```js
// Incorrect
const mainWindow = new BrowserWindow({
  webPreferences: {
    webSecurity: false
  }
})
```

```js
// Correct
const mainWindow = new BrowserWindow()
```

```html
<!-- Incorrect -->
<webview disablewebsecurity src="page.html"></webview>

<!-- Correct -->
<webview src="page.html"></webview>
```

## 6) Define a Content Security Policy

A Content Security Policy (CSP) is an additional layer of protection against cross-site-scripting attacks and data injection attacks. We recommend that they be enabled by any website you load inside Electron.

### Pourquoi ?

CSP allows the server serving content to restrict and control the resources Electron can load for that given web page. `https://your-page.com` should be allowed to load scripts from the origins you defined while scripts from `https://evil.attacker.com` should not be allowed to run. Defining a CSP is an easy way to improve your application's security.

The following CSP will allow Electron to execute scripts from the current website and from `apis.mydomain.com`.

```txt
// Incorrect
Content-Security-Policy: '*'

// Correct
Content-Security-Policy: script-src 'self' https://apis.mydomain.com
```

### CSP HTTP Header

Electron respects the [`Content-Security-Policy` HTTP header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy) which can be set using Electron's [`webRequest.onHeadersReceived`](../api/web-request.md#webrequestonheadersreceivedfilter-listener) handler:

```javascript
const {session} = require('electron')

session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
  callback({responseHeaders: `default-src 'none'`})
})
```

### CSP Meta Tag

CSP's preferred delivery mechanism is an HTTP header. It can be useful, however, to set a policy on a page directly in the markup using a `<meta>` tag:

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'none'">
```

#### `webRequest.onHeadersReceived([filter, ]listener)`

## 7) Override and Disable `eval`

`eval()` is a core JavaScript method that allows the execution of JavaScript from a string. Disabling it disables your app's ability to evaluate JavaScript that is not known in advance.

### Pourquoi ?

La méthode `eval()` a précisément une seule mission : de compiler une série de caractères comme étant du Javascript, et de l'exécuter. C’est une méthode obligatoire chaque fois que vous avez besoin de compiler du code qui ne peut pas être connu à l'avance. While legitimate use cases exist, like any other code generators, `eval()` is difficult to harden.

De manière générale, il est plus facile de désactiver complètement `eval()` plutôt que de le blinder. Ainsi, si vous n’en avez pas besoin, c’est une bonne idée de le désactiver.

### Comment ?

```js
// ESLint vous avertira de toute utilisation d'eval(), même celle-la
// eslint-disable-next-line
window.eval = global.eval = function () {
  throw new Error(`Désolé, cette application ne supporte pas window.eval().`)
}
```

## 8) Do Not Set `allowRunningInsecureContent` to `true`

*Cette recommandation est appliquée par défaut sur Electron*

By default, Electron will not allow websites loaded over `HTTPS` to load and execute scripts, CSS, or plugins from insecure sources (`HTTP`). Setting the property `allowRunningInsecureContent` to `true` disables that protection.

Loading the initial HTML of a website over `HTTPS` and attempting to load subsequent resources via `HTTP` is also known as "mixed content".

### Pourquoi ?

Loading content over `HTTPS` assures the authenticity and integrity of the loaded resources while encrypting the traffic itself. Consultez la section sur l' [affichage du contenu sécurisé uniquement](#1-only-load-secure-content) pour plus de détails.

### Comment ?

```js
// Incorrect
const mainWindow = new BrowserWindow({
  webPreferences: {
    allowRunningInsecureContent: true
  }
})
```

```js
// Correct
const mainWindow = new BrowserWindow({})
```

## 9) N'autorisez pas de fonctionnalités expérimentales

*Cette recommandation est appliquée par défaut sur Electron*

Les utilisateurs avancés d’Electron peuvent activer les fonctionnalités expérimentales de Chrome en utilisant les propriétés `experimentalFeatures` et `experimentalCanvasFeatures`.

### Pourquoi ?

Les fonctionnalités expérimentales, comme leur nom suggère, sont expérimentales et n'ont pas été activées pour tous les utilisateurs de Chromium. De plus, leur impact sur Electron n'a probablement pas été testé et vérifié.

Il est parfois légitime de les implémenter, mais à moins que vous sachiez vraiment ce que vous faites, vous ne devriez pas autoriser ces fonctionnalités.

### Comment ?

```js
// Incorrect
const mainWindow = new BrowserWindow({
  webPreferences: {
    experimentalFeatures: true
  }
})
```

```js
// Correct
const mainWindow = new BrowserWindow({})
```

## 10) Do Not Use `enableBlinkFeatures`

*Cette recommandation est appliquée par défaut sur Electron*

Blink is the name of the rendering engine behind Chromium. As with `experimentalFeatures`, the `enableBlinkFeatures` property allows developers to enable features that have been disabled by default.

### Pourquoi ?

Generally speaking, there are likely good reasons if a feature was not enabled by default. Legitimate use cases for enabling specific features exist. As a developer, you should know exactly why you need to enable a feature, what the ramifications are, and how it impacts the security of your application. Under no circumstances should you enable features speculatively.

### Comment ?

```js
// Bad
const mainWindow = new BrowserWindow({
  webPreferences: {
    enableBlinkFeatures: ['ExecCommandInJavaScript']
  }
})
```

```js
// Correct
const mainWindow = new BrowserWindow()
```

## 11) Do Not Use `allowpopups`

*Cette recommandation est appliquée par défaut sur Electron*

If you are using [`WebViews`](../api/web-view.md), you might need the pages and scripts loaded in your `<webview>` tag to open new windows. The `allowpopups` attribute enables them to create new [`BrowserWindows`](../api/browser-window.md) using the `window.open()` method. `WebViews` are otherwise not allowed to create new windows.

### Pourquoi ?

If you do not need popups, you are better off not allowing the creation of new [`BrowserWindows`](../api/browser-window.md) by default. This follows the principle of minimally required access: Don't let a website create new popups unless you know it needs that feature.

### Comment ?

```html
<!-- Incorrect -->
<webview allowpopups src="page.html"></webview>

<!-- Correct -->
<webview src="page.html"></webview>
```

## 12) Verify WebView Options Before Creation

A WebView created in a renderer process that does not have Node.js integration enabled will not be able to enable integration itself. However, a WebView will always create an independent renderer process with its own `webPreferences`.

It is a good idea to control the creation of new [`WebViews`](../api/web-view.md) from the main process and to verify that their webPreferences do not disable security features.

### Pourquoi ?

Since WebViews live in the DOM, they can be created by a script running on your website even if Node.js integration is otherwise disabled.

Electron enables developers to disable various security features that control a renderer process. In most cases, developers do not need to disable any of those features - and you should therefore not allow different configurations for newly created [`<WebView>`](../api/web-view.md) tags.

### Comment ?

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

Encore une fois, cette liste permet simplement de réduire le risque, elle ne le supprime pas. Si votre but est d’afficher un site Web, un navigateur sera une option plus sûre.