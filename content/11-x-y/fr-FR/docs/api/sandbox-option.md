# Option `sandbox`

> Create a browser window with a sandboxed renderer. With this option enabled, the renderer must communicate via IPC to the main process in order to access node APIs.

One of the key security features of Chromium is that all blink rendering/JavaScript code is executed within a sandbox. This sandbox uses OS-specific features to ensure that exploits in the renderer process cannot harm the system.

In other words, when the sandbox is enabled, the renderers can only make changes to the system by delegating tasks to the main process via IPC. [Here's](https://www.chromium.org/developers/design-documents/sandbox) more information about the sandbox.

Étant donné qu'une fonctionnalité majeure d'Electron est la possibilité d'exécuter Node. s dans le processus de rendu (facilitant le développement d'applications de bureau en utilisant les technologies web ), le bac à sable est désactivé par electron. Ceci est dû au fait que la plupart des API Node.js nécessitent un accès au système. `require()` for example, is not possible without file system permissions, which are not available in a sandboxed environment.

Habituellement, ce n'est pas un problème pour les applications de bureau puisque le code est toujours de confiance, mais cela rend Electron moins sécurisé que Chromium pour l'affichage de contenu web non fiable. Pour les applications qui nécessitent plus de sécurité, le drapeau `bac à sable` forcera Electron à faire apparaître un moteur de rendu Chromium classique compatible avec le bac à sable.

Un moteur de rendu en bac à sable n'a pas d'environnement Node.js en cours d'exécution et n'expose pas les API JavaScript de Node.js au code client. La seule exception est le script de préchargement, qui a accès à un sous-ensemble de l'API de rendu Electron.

Another difference is that sandboxed renderers don't modify any of the default JavaScript APIs. Par conséquent, certaines API telles que `window.open` fonctionneront car elles font dans Chromium (c'est-à-dire qu'ils ne renvoient pas un [`BrowserWindowProxy`](browser-window-proxy.md)).

## Exemple

Pour créer une fenêtre en bac à sable, passez `bac à sable : true` à `webPreferences`:

```js
let win
app.whenReady().then(() => {
  win = new BrowserWindow({
    webPreferences: {
      sandbox: true
    }
  })
  win.loadURL('http://google.com')
})
```

Dans le code ci-dessus, le [`BrowserWindow`](browser-window.md) qui a été créé a Node.js désactivé et ne peut communiquer que via IPC. L'utilisation de cette option empêche Electron de créer un runtime Node.js dans le moteur de rendu. Also, within this new window `window.open` follows the native behavior (by default Electron creates a [`BrowserWindow`](browser-window.md) and returns a proxy to this via `window.open`).

[`app.enableSandbox`](app.md#appenablesandbox) peut être utilisé pour forcer `sandbox: true` pour toutes les instances `BrowserWindow`.

```js
let win
app.enableSandbox()
app.whenReady().then(() => {
  // no need to pass `sandbox: true` since `app.enableSandbox()` was called.
  win = new BrowserWindow()
  win.loadURL('http://google.com')
})
```

## Preload

An app can make customizations to sandboxed renderers using a preload script. Here's an example:

```js
let win
app.whenReady().then(() => {
  win = new BrowserWindow({
    webPreferences: {
      sandbox: true,
      preload: path.join(app.getAppPath(), 'preload.js')
    }
  })
  win.loadURL('http://google.com')
})
```

et preload.js:

```js
// Ce fichier est chargé chaque fois qu'un contexte javascript est créé. Il s'exécute dans une portée privée
// qui peut accéder à un sous-ensemble d'API de rendu Electron. Without
// contextIsolation enabled, it's possible to accidentally leak privileged
// globals like ipcRenderer to web content.
const { ipcRenderer } = require('electron')

const defaultWindowOpen = window.open

window.open = function customWindowOpen (url, ...args) {
  ipcRenderer.send('report-window-open', location.origin, url, args)
  return defaultWindowOpen(url + '?from_electron=1', ...args)
}
```

Choses importantes à remarquer dans le script de préchargement :

- Même si le moteur de rendu en bac à sable n'a pas de Node. , il a encore accès à un environnement de type noeud limité : `Buffer`, `process`, `setImmediate`, `clearImmediate` et `require` sont disponibles.
- Le script de préchargement doit être contenu dans un seul script, mais il est possible d'avoir un code de préchargement complexe composé de plusieurs modules en utilisant un outil comme webpack ou browserify. Un exemple d'utilisation de browserify est ci-dessous.

Pour créer un paquet browserify et l'utiliser comme un script de préchargement, quelque chose comme devrait être utilisé :

```sh
  browserify preload/index.js \
    -x electron \
    --insert-global-vars=__filename,__dirname -o preload.js
```

Le drapeau `-x` doit être utilisé avec tout module requis qui est déjà exposé dans le champ de préchargement, et indique à browserify d'utiliser la fonction `require` en pièce jointe pour cela. `--insert-global-vars` s'assurera que `processus`, `Buffer` et `setImmediate` sont également pris à partir de la portée englobante (normalement browserify injecte du code pour ceux-ci).

Actuellement la fonction `require` fournie dans la portée de préchargement expose les modules suivants :

- `electron`
  - `crashReporter`
  - `desktopCapturer`
  - `ipcRenderer`
  - `nativeImage`
  - `webFrame`
- `événements`
- `timers`
- `url`

More may be added as needed to expose more Electron APIs in the sandbox.

## Rendering untrusted content

Rendering untrusted content in Electron is still somewhat uncharted territory, though some apps are finding success (e.g. Beaker Browser). Our goal is to get as close to Chrome as we can in terms of the security of sandboxed content, but ultimately we will always be behind due to a few fundamental issues:

1. We do not have the dedicated resources or expertise that Chromium has to apply to the security of its product. We do our best to make use of what we have, to inherit everything we can from Chromium, and to respond quickly to security issues, but Electron cannot be as secure as Chromium without the resources that Chromium is able to dedicate.
2. Some security features in Chrome (such as Safe Browsing and Certificate Transparency) require a centralized authority and dedicated servers, both of which run counter to the goals of the Electron project. As such, we disable those features in Electron, at the cost of the associated security they would otherwise bring.
3. There is only one Chromium, whereas there are many thousands of apps built on Electron, all of which behave slightly differently. Accounting for those differences can yield a huge possibility space, and make it challenging to ensure the security of the platform in unusual use cases.
4. We can't push security updates to users directly, so we rely on app vendors to upgrade the version of Electron underlying their app in order for security updates to reach users.

Here are some things to consider before rendering untrusted content:

- Un script de préchargement peut accidentellement fuir des API privilégiées vers du code non fiable, sauf si [`contextIsolation`](../tutorial/security.md#3-enable-context-isolation-for-remote-content) est également activé.
- Some bug in the V8 engine may allow malicious code to access the renderer preload APIs, effectively granting full access to the system through the `remote` module. Therefore, it is highly recommended to [disable the `remote` module](../tutorial/security.md#15-disable-the-remote-module). If disabling is not feasible, you should selectively [filter the `remote` module](../tutorial/security.md#16-filter-the-remote-module).
- While we make our best effort to backport Chromium security fixes to older versions of Electron, we do not make a guarantee that every fix will be backported. Your best chance at staying secure is to be on the latest stable version of Electron.
