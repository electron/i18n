# Fenêtre sans bords

> Ouvre une fenêtre sans barre d'outils, sans bordures ou autre "chrome" graphique.

Une fenêtre sans cadre est une fenêtre qui n'a pas de [chrome](https://developer.mozilla.org/en-US/docs/Glossary/Chrome), les parties de la fenêtre, comme des barres d'outils, qui ne font pas partie de la page Web. Ce sont des options dans la classe [`BrowserWindow`](browser-window.md).

## Créer une fenêtre sans bords

Pour créer une fenêtre sans cadre, vous devez définir `frame` à `false` dans [BrowserWindow](browser-window.md)'s `options`:

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({ width: 800, height: 600, frame: false })
win.show()
```

### Alternatives sur macOS

Il existe une autre façon de spécifier une fenêtre sans chrominance. Au lieu de définir `frame` à `false` qui désactive à la fois la barre de titre et le contrôle de fenêtre, vous pouvez vouloir masquer la barre de titre et étendre votre contenu à la taille de la fenêtre complète, tout en préservant les contrôles de fenêtres ("feux de circulation") pour les actions de fenêtres standard. Vous pouvez le faire en spécifiant l'option `titleBarStyle` :

#### `hidden`

Résultats dans une barre de titre cachée et une fenêtre de contenu en taille réelle, Pourtant, la barre de titre possède toujours les contrôles standard des fenêtres (« feux de circulation ») en haut à gauche.

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({ titleBarStyle: 'hidden' })
win.show()
```

#### `hiddenInset`

Résultats dans une barre de titre cachée avec un aspect alternatif où les boutons de feux de circulation sont un peu plus intégrés à partir du bord de la fenêtre.

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({ titleBarStyle: 'hiddenInset' })
win.show()
```

#### `customButtonsOnHover`

Utilise les boutons personnalisés de fermeture dessinée, et miniaturise les boutons qui affichent en survolant en haut à gauche de la fenêtre. The fullscreen button is not available due to restrictions of frameless windows as they interface with Apple's macOS window masks. Ces boutons personnalisés empêchent les problèmes liés aux événements de la souris qui se produisent avec les boutons standard de la barre d'outils de la fenêtre. Cette option n'est applicable que pour les fenêtres sans cadres.

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({ titleBarStyle: 'customButtonsOnHover', frame: false })
win.show()
```

## Fenêtre transparente

En définissant l'option `transparente` à `true`, vous pouvez également rendre la fenêtre sans cadre transparente :

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({ transparent: true, frame: false })
win.show()
```

### Limitations

* Vous ne pouvez pas cliquer à travers la zone transparente. Nous allons introduire une API pour définir la forme de fenêtre pour résoudre ce problème, voir [notre problème](https://github.com/electron/electron/issues/1335) pour plus de détails.
* Transparent windows are not resizable. Setting `resizable` to `true` may make a transparent window stop working on some platforms.
* Le filtre `flur` ne s'applique qu'à la page web, donc il n'y a aucun moyen d'appliquer l'effet de flou au contenu en dessous de la fenêtre (i. . d'autres applications s'ouvrent sur le système de l'utilisateur).
* The window will not be transparent when DevTools is opened.
* On Windows operating systems,
  * transparent windows will not work when DWM is disabled.
  * transparent windows can not be maximized using the Windows system menu or by double clicking the title bar. The reasoning behind this can be seen on [this pull request](https://github.com/electron/electron/pull/28207).
* Sous Linux, les utilisateurs doivent mettre `--enable-transparent-visuals --disable-gpu` dans la ligne de commande pour désactiver le GPU et permettre à ARGB de rendre une fenêtre transparente, ceci est causé par un bogue amont que [canal alpha ne fonctionne pas sur certains pilotes NVidia](https://bugs.chromium.org/p/chromium/issues/detail?id=369209) sur Linux.
* Sur Mac, l'ombre native de la fenêtre ne sera pas affichée sur une fenêtre transparente.

## Fenêtre non cliquable

Pour créer une fenêtre non cliquable, c'est-à-dire faire en sorte que la fenêtre ignore tous les événements de la souris, vous pouvez appeler l'API [win.setIgnoreMouseEvents(ignore)][ignore-mouse-events] :

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()
win.setIgnoreMouseEvents(true)
```

### Transfert

Ignorer les messages de la souris rend la page Web inaccessible au mouvement de la souris, ce qui signifie que les événements de déplacement de la souris ne seront pas émis. Sur les systèmes d'exploitation Windows, un paramètre optionnel peut être utilisé pour déplacer les messages de la souris vers la page web, permettant d'émettre des événements tels que `souris` :

```javascript
const { ipcRenderer } = require('electron')
const el = document.getElementById('clickThroughElement')
el.addEventListener('mouseenter', () => {
  ipcRenderer.send('set-ignore-mouse-events', true, { forward: true })
})
el.addEventListener('mouseleave', () => {
  ipcRenderer.send('set-ignore-mouse-events', false)
})

// Main process
const { ipcMain } = require('electron')
ipcMain.on('set-ignore-mouse-events', (event, ...args) => {
  BrowserWindow.fromWebContents(event.sender).setIgnoreMouseEvents(...args)
})
```

Cela rend la page web cliquante quand plus de `el`, et retourne à la normale en dehors de elle.

## Région déplaçable

Par défaut, la fenêtre sans cadre ne peut pas être déplacée. Les applications doivent spécifier `-webkit-app-region: glisser` dans CSS pour dire à Electron quelles régions sont glissables (comme la barre de titre standard de l'OS), et les applications peuvent également utiliser `-webkit-app-region : no-drag` pour exclure la zone non glissable de la région glissable. Notez que seules les formes rectangulaires sont actuellement prises en charge.

Remarque : `-webkit-app-region: drag` est connu pour avoir des problèmes pendant que les outils de développement sont ouverts. Voir ceci [Problème GitHub](https://github.com/electron/electron/issues/3647) pour plus d'informations, y compris une solution de contournement.

Pour que toute la fenêtre puisse être déplacée, vous pouvez ajouter `-webkit-app-region : glisser` comme `body`'s style :

```html
<body style="-webkit-app-region: drag">
</body>
```

Et notez que si vous avez rendu toute la fenêtre déplaçable, vous devez également marquer les boutons comme non glissables, sinon il serait impossible pour les utilisateurs de cliquer sur eux :

```css
button {
  -webkit-app-region: no-drag;
}
```

Si vous définissez seulement une barre de titre personnalisée comme glissable, vous devez également rendre tous les boutons de la barre de titre non glissables.

## Sélection de texte

In a frameless window the dragging behavior may conflict with selecting text. Par exemple, lorsque vous faites glisser la fenêtre depuis la barre de titre, vous pouvez accidentellement sélectionner son texte. Afin d'éviter cela, vous devez désactiver la sélection de texte dans une zone déplaçable. Comme ceci :

```css
.titlebar {
  -webkit-user-select: none;
  -webkit-app-region: drag;
}
```

## Menu contextuel

Sur certaines plateformes, la zone glissable sera traitée comme une image non-client, donc lorsque vous faites un clic droit dessus un menu système apparaîtra. Pour que le menu contextuel se comporte correctement sur toutes les plates-formes, vous ne devriez jamais utiliser un menu contextuel personnalisé sur zones glissables.

[ignore-mouse-events]: browser-window.md#winsetignoremouseeventsignore-options
