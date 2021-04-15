# webFrameMain

> Contrôlez les pages Web et les iframes.

Processus : [Main](../glossary.md#main-process)

Le `webFrameMain` module peut être utilisé pour rechercher des cadres à travers les instances [`WebContents`](web-contents.md) existantes. Les événements de navigation sont le cas 'utilisation.

```javascript
const { BrowserWindow, webFrameMain } = require ('electron')

const win = new BrowserWindow({ width: 800, height: 1500 })
win.loadURL('https://twitter.com')

win.webContents.on(
  'did-frame-navigate',
  (event, url, isMainFrame, frameProcessId, frameRoutingId) => {
    const frame = webFrameMain.fromId (frameProcessId, frameRoutingId)
    if (frame) {
      const code = 'document.body.innerHTML = document.body.innerHTML.replaceAll(« heck », « h*ck »)'
      frame.executeJavaScript (code)
    }
  }
)
```

Vous pouvez également accéder à des images de pages existantes en utilisant les `mainFrame` propriété de [`WebContents`](web-contents.md).

```javascript
const { BrowserWindow } = require ('electron')

async function main () {
  const win = new BrowserWindow({ width: 800, height: 600 })
  await win.loadURL ('https://reddit.com')

  const youtubeEmbeds = win.webContents.mainFrame.frames.filter((frame) => {
    try {
      const url = new URL (frame.url)
      return url.host === 'www.youtube.com'
    } catch {
      return false
    }
  })

  console.log (youtubeEmbeds)
}

main()
```

## Méthodes

Ces méthodes peuvent être consultées à partir du module `webFrameMain` de base :

### `webFrameMain.fromId (processId, routingId)`

* `processId` Integer - Un `Integer` représentant l’id interne du processus qui possède le cadre.
* `routingId` Integer - Un `Integer` l’ID cadre unique dans le rendu actuel. Les ID de routage peuvent être récupérés à partir de `WebFrameMain` instances (`frame.routingId`) et sont également transmis par image événements de navigation `WebContents` spécifiques (par exemple. `did-frame-navigate`).

Retours `WebFrameMain | undefined` - Un cadre avec le processus donné et les ID de routage, ou `undefined` s’il n’y a pas de WebFrameMain associé aux ID donnés.

## Classe: WebFrameMain

Processus : [Main](../glossary.md#main-process)

### Méthodes d’instance

#### `frame.executeJavaScript(code[, userGesture])`

* `code` String
* `userGesture` Boolean (facultatif) - `false` par défaut.

Retours `Promise<unknown>` - Une promesse qui se résout avec le résultat du code exécuté ou qui est rejetée si l’exécution lance ou entraîne une promesse rejetée.

Évalue le `code` dans la page.

Dans la fenêtre du navigateur, certaines APIs HTML comme `requestFullScreen` peut être invoqué seulement par un geste de l'utilisateur. Définir `userGesture` à `true` supprimera cette limitation.

#### `frame.reload()`

Retours `boolean` - Si le rechargement a été lancé avec succès. Ne se traduit par `false` le cadre n’a pas d’historique.

#### `frame.send(canal, ... args)`

* `channel` String
* `...args` any[]

Send an asynchronous message to the renderer process via `channel`, along with arguments. Les arguments seront sérialisés avec le\[SCA\]\[Structured Clone Algorithm\], tout comme [`postMessage`][], de sorte que les chaînes prototypes ne seront pas incluses. L’envoi de fonctions, de promesses, de symboles, de weakmaps ou de weaksets de lancer une exception.

The renderer process can handle the message by listening to `channel` with the [`ipcRenderer`](ipc-renderer.md) module.

#### `frame.postMessage (canal, message, [transfer])`

* `channel` String
* `message` tous
* `transfer` MessagePortMain[] (facultatif)

Envoie un message au processus de rendu en effectuant éventuellement un transfert de propriété de zéro ou plus objets de type [`MessagePortMain`][].

Les objets `MessagePortMain` transférés seront disponibles dans le processus de rendu en accédant à la propriété `ports` de l'événement émis. Ils seront des objets DOM `MessagePort` natifs en arrivant dans le moteur de rendu.

Par exemple :

```js
Processus principal
const { port1, port2 } = nouveau MessageChannelMain ()
webContents.mainFrame.postMessage('port', { message: 'hello' }, [port1])

// Renderer process
ipcRenderer.on ('port', (e, msg) => {
  const [port] = e.ports
  // ...
})
```

### Propriétés d'instance

#### `frame.url` _Readonly_

Un `string` représentant l’URL actuelle du cadre.

#### `frame.top` _Readonly_

Un `WebFrameMain | null` représentant le cadre supérieur dans la hiérarchie de cadre à laquelle `frame` appartient.

#### `frame.parent` _Readonly_

Un `WebFrameMain | null` représentant le cadre parent de `frame`, la propriété serait `null` si `frame` est le cadre supérieur dans la hiérarchie du cadre.

#### `frame.frames` _Readonly_

Une `WebFrameMain[]` collection contenant les descendants directs de `frame`.

#### `frame.framesInSubtree` _Readonly_

Une collection `WebFrameMain[]` contenant chaque cadre dans le sous-tre de `frame`, y compris -même. Cela peut être utile lors de la traversée à travers tous les cadres.

#### `frame.frameTreeNodeId` _Readonly_

Un `Integer` représentant l’id de l’instance frametreeNode interne du cadre image. Cet id est navigateur global et identifie de manière unique un cadre qui héberge contenu. L’identificateur est fixé à la création du cadre et reste constante pendant toute la durée de vie du cadre. Lorsque le cadre est retiré, l’id n’est pas utilisé à nouveau.

#### `frame.name` _Readonly_

Un `String` représentant le nom du cadre.

#### `frame.osProcessId` _Readonly_

Un `Integer` représentant le système d' `pid` du processus propriétaire de ce cadre.

#### `frame.processId` _Readonly_

Un `Integer` représentant le système interne chromium `pid` du processus qui possède ce cadre. Ce n’est pas la même chose que l’ID de processus os; pour lire cette utilisation `frame.osProcessId`.

#### `frame.routingId` _Readonly_

Un `Integer` l’id cadre unique dans le processus de rendu actuel. Les `WebFrameMain` distinctes qui se réfèrent au même cadre sous-jacent pas les mêmes `routingId`.
