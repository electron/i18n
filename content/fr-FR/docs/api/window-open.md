# Ouverture des fenêtres du renderer

Il existe plusieurs façons de contrôler la façon dont les fenêtres sont créées à partir de contenu fiable de confiance dans un renderer. Windows peut être créé à partir du renderer de deux façons :

- en cliquant sur des liens ou en soumettant des formulaires ornés de `target=_blank`
- Logiciel d’appel JavaScript `window.open()`

Dans les rendus non bacs à sable, ou lorsque `nativeWindowOpen` est faux (la valeur par défaut), cela se traduit par la création d’un [`BrowserWindowProxy`](browser-window-proxy.md), un emballage léger autour de `BrowserWindow`.

Toutefois, lorsque l’option `sandbox` (ou directement, `nativeWindowOpen`) est définie, une instance `Window` est créée, comme vous pouvez vous y attendre dans le navigateur. Pour le contenu de d’origine, la nouvelle fenêtre est créée dans le même processus, ce qui permet au parent accéder directement à la fenêtre enfant. Cela peut être très utile pour les sous-fenêtres d’application qui agissent comme des panneaux de préférence, ou similaires, que le parent peut rendre à la sous-fenêtre directement, comme s’il s’agissait d’un `div` chez le parent.

Electron couple ce Chrome natif `Window` avec un BrowserWindow sous le capot. Vous pouvez profiter de toute la personnalisation disponible lors de la création d’un BrowserWindow dans le processus principal en utilisant `webContents.setWindowOpenHandler()` pour les fenêtres créées par le rendu.

Les options du constructeur BrowserWindow sont définies par ordre croissant de priorité : d'abord les options héritées du parent puis les options analysées à partir de la chaîne `traits` de `window.open()` puis webPreferences liées à la sécurité héritées du parent, et enfin les options données par [`webContents.setWindowOpenHandler`](web-contents.md#contentssetwindowopenhandlerhandler). Notez que `webContents.setWindowOpenHandler` a le dernier mot et le plein privilège parce qu’il est invoqué dans le processus principal.

### `window.open(url[, frameName][, features])`

* `url` String
* `frameName` String (facultatif)
* `features` String (facultatif)

Retours [`BrowserWindowProxy`](browser-window-proxy.md) | [`Window`](https://developer.mozilla.org/en-US/docs/Web/API/Window)

`features` est une liste de valeurs clés séparée par virgule, suivant le format standard de le navigateur. Electron sera parse `BrowserWindowConstructorOptions` de cette liste si possible, pour plus de commodité. Pour un contrôle total et une meilleure ergonomie, envisager d’utiliser `webContents.setWindowOpenHandler` pour personnaliser la la création BrowserWindow.

Un sous-ensemble de `WebPreferences` peuvent être réglés directement, sans restriction, à partir de la chaîne de fonctionnalités: `zoomFactor`, `nodeIntegration`, `preload`, `javascript`, `contextIsolation`, et `webviewTag`.

Par exemple :

```js
window.open('https://github.com', '_blank', 'top=500,left=200,frame=false,nodeIntegration=no')
```

**Remarque :**

* L'intégration de Node sera toujours désactivée dans le nouveau `window` si elle est désactivée sur la fenêtre parent.
* L'isolation du context sera toujours activée dans le nouveau `window` si elle est activée sur la fenêtre parent.
* JavaScript sera toujours désactivé dans le nouveau `window` si il est désactivé sur la fenêtre parent.
* Les fonctionnalités non standard (qui ne sont pas gérées par Chrome ou Electron) données en `features` seront transmises à tout gestionnaire d’événements `did-create-window` de `webContents`enregistré dans l’argument `additionalFeatures` .

Pour personnaliser ou annuler la création de la fenêtre, vous pouvez définir en option un gestionnaire de remplacement avec `webContents.setWindowOpenHandler()` du processus principal. Le `false` annule la fenêtre, tout en renvoyant un objet les `BrowserWindowConstructorOptions` utilisés lors de la création de la fenêtre. Notez que c’est plus puissant que de passer des options à travers la chaîne de fonctionnalités, car le rendu a des privilèges plus limités dans la décision des préférences de sécurité que le processus principal.

### `BrowserWindowProxy` exemple

```javascript

main.js
const Fenetreprincipale = nouvelleFenetreNavigation ()

mainWindow.webContents.setGestionnairedeFenetreOuverte (({ url }) => {
  si (url.commencePar('https://github.com/')) {
    retour { action: 'allow' }
  }
  retour { action: 'deny' }
})

mainWindow.webContents.on('did-create-window', (childWindow) => {
  // Par exemple...
  childWindow.webContents ('will-navigate', (e) => {
    e.preventDefault()
  })
})
```

```javascript
renderer.js
const windowProxy = window.open ('https://github.com/', null, 'minimisable=false')
windowProxy.postMessage('hi', '*')
```

### Exemple `Window` autochtone

```javascript
main.js
const mainWindow = nouveau BrowserWindow ({
  webPreferences: {
    nativeWindowOpen: true
  }
})

// Dans cet exemple, seules les fenêtres avec l’url 'about:blank' seront créées.
Toutes les autres urls seront bloquées.
mainWindow.webContents.setWindowOpenHandler (({ url }) => {
  si (url === 'environ:blank') {
    retour { cadre
      : faux,
      fullscreenable: faux,
      backgroundColor: 'black',
      webPreferences: {
        preload: 'my-child-window-preload-script.js'
      }
    }
  }
  retour faux
})
```

```javascript
renderer process (mainWindow)
const childWindow = window.open(', 'modal')
childWindow.document.write('<h1>Hello</h1>')
```
