# Option `sandbox`

> Create a browser window with a sandboxed renderer. With this option enabled, the renderer must communicate via IPC to the main process in order to access node APIs.

One of the key security features of Chromium is that all blink rendering/JavaScript code is executed within a sandbox. This sandbox uses OS-specific features to ensure that exploits in the renderer process cannot harm the system.

In other words, when the sandbox is enabled, the renderers can only make changes to the system by delegating tasks to the main process via IPC. [Here's](https://www.chromium.org/developers/design-documents/sandbox) more information about the sandbox.

Étant donné qu'une fonctionnalité majeure d'Electron est la possibilité d'exécuter Node. s dans le processus de rendu (facilitant le développement d'applications de bureau en utilisant les technologies web ), le bac à sable est désactivé par electron. Ceci est dû au fait que la plupart des API Node.js nécessitent un accès au système. `require()` for example, is not possible without file system permissions, which are not available in a sandboxed environment.

Habituellement, ce n'est pas un problème pour les applications de bureau puisque le code est toujours de confiance, mais cela rend Electron moins sécurisé que Chromium pour l'affichage de contenu web non fiable. Pour les applications qui nécessitent plus de sécurité, le drapeau `bac à sable` forcera Electron à faire apparaître un moteur de rendu Chromium classique compatible avec le bac à sable.

Un moteur de rendu en bac à sable n'a pas d'environnement Node.js en cours d'exécution et n'expose pas les API JavaScript de Node.js au code client. La seule exception est le script de préchargement, qui a accès à un sous-ensemble de l'API de rendu Electron.

Another difference is that sandboxed renderers don't modify any of the default JavaScript APIs. Par conséquent, certaines API telles que `window.open` fonctionneront car elles font dans Chromium (c'est-à-dire qu'ils ne renvoient pas un [`BrowserWindowProxy`](browser-window-proxy.md)).

## Example

Pour créer une fenêtre en bac à sable, passez `bac à sable : true` à `webPreferences`:

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

Dans le code ci-dessus, le [`BrowserWindow`](browser-window.md) qui a été créé a Node.js désactivé et ne peut communiquer que via IPC. L'utilisation de cette option empêche Electron de créer un runtime Node.js dans le moteur de rendu. Aussi, dans cette nouvelle fenêtre `fenêtre. pen` suit le comportement natif (Electron crée par défaut un [`BrowserWindow`](browser-window.md) et retourne un proxy via `window.open`).

[`app.enableSandbox`](app.md#appenablesandbox-experimental) peut être utilisé pour forcer `sandbox: true` pour toutes les instances `BrowserWindow`.

```js
let win
app.enableSandbox()
app.on('ready', () => {
  // no need to pass `sandbox: true` since `app.enableSandbox()` was called.
  win = new BrowserWindow()
  win.loadURL('http://google.com')
})
```

## Prechargement

An app can make customizations to sandboxed renderers using a preload script. Here's an example:

```js
laisser gagner
application. n('prêt', () => {
  win = new BrowserWindow({
    webPreferences: {
      sandbox: true,
      preload: chemin. oin(app.getAppPath(), 'preload.js')
    }
  })
  win.loadURL('http://google.com')
})
```

et preload.js:

```js
// Ce fichier est chargé chaque fois qu'un contexte javascript est créé. Il s'exécute dans une portée privée
// qui peut accéder à un sous-ensemble d'API de rendu Electron. Nous devons être
// attentifs à ne pas fuir aucun objet dans la portée globale !
const { ipcRenderer, remote } = require('electron')
const fs = distante. equire('fs')

// lit un fichier de configuration en utilisant le module `fs`
const buf = fs. eadFileSync('allowed-popup-urls.json')
const allowedUrls = JSON.parse(buf.toString('utf8'))

const defaultWindowOpen = window. stylo

fonction customWindowOpen (url, ...args) {
  if (allowedUrls.indexOf(url) === -1) {
    ipcRenderer.sendSync('blocked-popup-notification', emplacement. rigin, url)
    return null
  }
  return defaultWindowOpen(url, ...args)
}

window.open = customWindowOpen
```

Choses importantes à remarquer dans le script de préchargement :

- Même si le moteur de rendu en bac à sable n'a pas de Node. , il a encore accès à un environnement de type noeud limité : `Buffer`, `process`, `setImmediate`, `clearImmediate` et `require` sont disponibles.
- Le script de préchargement peut indirectement accéder à toutes les APIs du processus principal via les modules `distance` et `ipcRender`.
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
  - `remote`
  - `webFrame`
- `événements`
- `timers`
- `url`

Plus peut être ajouté si nécessaire pour exposer plus d'API Electron dans le bac à sable, mais n'importe quel module dans le processus principal peut déjà être utilisé via `electron. emote.require`.

## Notice

Veuillez utiliser l'option `bac à sable` avec soin, car c'est toujours une fonctionnalité expérimentale. Nous ne sommes toujours pas conscients des implications en matière de sécurité de l'exposition de certaines API de rendu Electron au script de préchargement, mais voici quelques choses à prendre en compte avant de rendre le contenu non fiable :

- Un script de préchargement peut accidentellement fuir des API privilégiées vers du code non fiable, sauf si [`contextIsolation`](../tutorial/security.md#3-enable-context-isolation-for-remote-content) est également activé.
- Un bogue dans le moteur V8 peut permettre au code malveillant d'accéder à la précharge du moteur de rendu APIs, en accordant effectivement un accès complet au système par le module `distant` . Par conséquent, il est fortement recommandé de [désactiver le module `distance` ](../tutorial/security.md#15-disable-the-remote-module). Si la désactivation n'est pas réalisable, vous devriez sélectivement [filtrer le module `distant` ](../tutorial/security.md#16-filter-the-remote-module).

Depuis que le rendu de contenu non fiable dans Electron est toujours un territoire inconnu, les API exposées au script de préchargement sandbox doivent être considérées comme plus instables que les autres API Electron, et peuvent avoir des changements cassés pour corriger les problèmes de sécurité.
