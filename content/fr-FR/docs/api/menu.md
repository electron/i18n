# Menu

## Classe : Menu

> Crée des menus d'applications natifs et des menus contextuels.

Processus : [Main](../glossary.md#main-process)

### `new Menu()`

Créer un nouveau menu.

### Méthodes statiques

La classe `Menu` a les méthodes statiques suivantes :

#### `Menu.setApplicationMenu(menu)`

* `menu` Menu | null

Définit le menu `` comme le menu d'application sur macOS. Sous Windows et Linux, le menu `` sera défini comme le menu supérieur de chaque fenêtre.

Aussi sous Windows et Linux, vous pouvez utiliser un `&` dans le nom de l'élément de niveau supérieur pour indiquer quelle lettre doit obtenir un accélérateur généré. Par exemple, en utilisant `&Fichier` pour le menu de fichiers, l'accélérateur `Alt-F` généré qui ouvre le menu associé. The indicated character in the button label then gets an underline, and the `&` character is not displayed on the button label.

In order to escape the `&` character in an item name, add a proceeding `&`. For example, `&&File` would result in `&File` displayed on the button label.

Passing `null` will suppress the default menu. Sous Windows et Linux, cela a pour effet supplémentaire de supprimer la barre de menu de la fenêtre.

**Note:** Le menu par défaut sera créé automatiquement si l'application ne le définit pas. Il contient des éléments standard tels que `Fichier`, `Modifier`, `Voir`, `Window` et `Aide`.

#### `Menu.getApplicationMenu()`

Retourne `Menu | null` - Le menu de l’application, si défini, ou `null`, si non défini.

**Remarque :** L'instance du `Menu` retourné, ne supporte pas l'ajout ou la suppression dynamique d’éléments de menu. Les [propriétés de l’instance](#instance-properties) peuvent encore être modifiées dynamiquement.

#### `Menu.sendActionToFirstResponder(action)` _macOS_

* `action` String

Envoie `action` au premier répondant de l'application. Ceci est utilisé pour émuler les comportements du menu de macOS par défaut. Habituellement, vous utiliseriez la propriété [`rôle`](menu-item.md#roles) d'un [`MenuItem`](menu-item.md).

Voir le [Guide de gestion des événements Cocoa de macOS](https://developer.apple.com/library/mac/documentation/Cocoa/Conceptual/EventOverview/EventArchitecture/EventArchitecture.html#//apple_ref/doc/uid/10000060i-CH3-SW7) pour plus d'informations sur les actions natives de macOS.

#### `Menu.buildFromTemplate(template)`

* `template` (MenuItemConstructorOptions | MenuItem)[]

Retourne `Menu`

Généralement, le paramètre `template` est un tableau d' `options` pour construire un [MenuItem](menu-item.md). L’utilisation peut être référencée ci-dessus. L'utilisation peut être référencée ci-dessus.

Vous pouvez également attacher d'autres champs à l'élément du `template` et ils deviendront des propriétés des éléments de menu construits.

### Méthodes d’instance

L'objet `menu` a les méthodes d'instance suivantes:

#### `menu.popup([options])`

* `options` Object (optional)
  * `window` [BrowserWindow](browser-window.md) (facultatif) - La fenêtre focalisée est par défaut.
  * `x` Number (facultatif) - C'est par défaut la position actuelle du curseur de la souris. Doit être déclaré si `y` est déclaré.
  * `x` Number (facultatif) - C'est par défaut la position actuelle du curseur de la souris. Doit être déclaré si `x` est déclaré.
  * `positioningItem` Number (facultatif) _macOS_ - L'index de l'élément de menu à positionner sous le curseur de la souris aux coordonnées spécifiées. est. La valeur par défaut est -1.
  * `callback` Fonction (facultatif) - Appelée lorsque le menu est fermé.

Dépile ce menu sous la forme d'un menu contextuel dans la [`BrowserWindow`](browser-window.md).

#### `menu.closePopup([browserWindow])`

* `browserWindow` [BrowserWindow](browser-window.md) (facultatif) - La fenêtre focalisée est par défaut.

Ferme le menu contextuel dans la `browserWindow`.

#### `menu.append(menuItem)`

* `menuItem` [MenuItem](menu-item.md)

Ajoute le `menuItem` au menu.

#### `menu.getMenuItemById(id)`

* `id` String

Retourne `MenuItem | null` l'élément avec le `id` spécifié

#### `menu.insert(pos, menuItem)`

* `pos` Integer
* `menuItem` [MenuItem](menu-item.md)

Insère le `menuItem` à la position `pos` du menu.

### Événements d’instance

Les objets créés avec `nouveau Menu` ou retournés par `Menu.buildFromTemplate` émettent les événements suivants :

**Remarque :** Certains événements sont seulement disponibles sur des systèmes d'exploitation spécifiques et sont étiquetés comme tels.

#### Événement : 'menu-will-show'

Retourne :

* `event` Événement

Émis lorsque `menu.popup()` est appelé.

#### Événement : 'menu-will-close'

Retourne :

* `event` Événement

Émis lorsqu'un popup est fermé manuellement ou avec `menu.closePopup()`.

### Propriétés d'instance

Les objets `menu` ont également les propriétés suivantes :

#### `menu.items`

Un tableau `MenuItem[]` contenant les éléments du menu.

Chaque `Menu` consiste en plusieurs [`MenuItem`](menu-item.md)s et chaque `MenuItem` peut avoir un sous-menu.

## Exemples

Un exemple de création du menu de l'application avec l'API de modèle simple :

```javascript
const { app, Menu } = require('electron')

const isMac = process.platform === 'darwin'

const template = [
  // { role: 'appMenu' }
  ...(isMac ? [{
    label: app. ame,
    sous-menu : [
      { role: 'about' },
      { type: 'separator' },
      { role: 'services' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideothers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  }] : []),
  // { role: 'fileMenu' }
  {
    label: 'Fichier',
    sous-menu : [
      isMac ? { role: 'close' } : { role: 'quit' }
    ]
  },
  // { role: 'editMenu' }
  {
    label: 'Modifier',
    sous-menu : [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      . .(isMac ? [
        { role: 'pasteAndMatchStyle' },
        { role: 'delete' },
        { role: 'selectAll' },
        { type: 'separator' },
        {
          label: 'Speech',
          submenu: [
            { role: 'startSpeaking' },
            { role: 'stopSpeaking' }
          ]
        }
      ] : [
        { role: 'delete' },
        { type: 'separator' },
        { role: 'selectAll' }
      ])
    ]
  },
  // { role: 'viewMenu' }
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forceReload' },
      { role: 'toggleDevTools' },
      { type: 'separator' },
      { role: 'resetZoom' },
      { role: 'zoomIn' },
      { role: 'zoomOut' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  // { role: 'windowMenu' }
  {
    label: 'Window',
    submenu: [
      { role: 'minimize' },
      { role: 'zoom' },
      ...(isMac ? [
        { type: 'separator' },
        { role: 'front' },
        { type: 'separator' },
        { role: 'window' }
      ] : [
        { role: 'close' }
      ])
    ]
  },
  {
    rôle: 'help',
    sous-menu : [
      {
        label: 'En savoir plus',
        clic : async () => {
          const { shell } = require('electron')
          attendent shell. penExternal('https://electronjs. rg')
        }

    ]
  }
]

const menu = Menu. uildFromTemplate(template)
Menu.setApplicationMenu(menu)
```

### Processus de rendu

To create menus initiated by the renderer process, send the required information to the main process using IPC and have the main process display the menu on behalf of the renderer.

Voici un exemple d'affichage d'un menu lorsque l'utilisateur clique avec le bouton droit sur la page :

```js
// renderer
window.addEventListener('contextmenu', (e) => {
  e.preventDefault()
  ipcRenderer.send('show-context-menu')
})

ipcRenderer.on('context-menu-command', (e, command) => {
  // ...
})

// main
ipcMain.on('show-context-menu', (event) => {
  const template = [
    {
      label: 'Menu Item 1',
      click: () => { event.sender.send('context-menu-command', 'menu-item-1') }
    },
    { type: 'separator' },
    { label: 'Menu Item 2', type: 'checkbox', checked: true }
  ]
  const menu = Menu.buildFromTemplate(template)
  menu.popup(BrowserWindow.fromWebContents(event.sender))
})
```

## Notes sur le menu d'application macOS

macOS a un style de menu d'application complètement différent de Windows et Linux. Voici quelques notes pour rendre le menu de votre application plus natif.

### Standard Menus

Sur macOS, il y a beaucoup de menus standards définis par le système, comme les [`Services`](https://developer.apple.com/documentation/appkit/nsapplication/1428608-servicesmenu?language=objc) et `Windows`. Pour faire de votre menu un menu standard, vous devriez définir le `rôle de votre menu` à l'un des rôles suivants et Electron les reconnaîtra et les fera devenir des menus standard :

* `window`
* `help`
* `services`

### Actions des éléments de menu standard

macOS a fourni des actions standard pour certains liens de menu, comme `À propos de xxx`, `Cacher xxx`, et `Cacher les autres`. Pour définir l'action d'un lien de menu à une action standard , vous devez définir l'attribut `rôle` de l'élément de menu.

### Nom du menu principal

Sur macOS, l'étiquette du premier élément du menu de l'application est toujours le nom de votre application, quel que soit le libellé que vous avez défini. Pour le modifier, modifiez le fichier `Info.plist` de votre pack d'applications. Voir [À propos des fichiers de la liste de propriétés d'information][AboutInformationPropertyListFiles] pour plus d'informations.

## Menu de configuration pour la fenêtre de navigation spécifique (*Linux* *Windows*)

La [`setMenu` méthode][setMenu] des fenêtres du navigateur peut définir le menu de certaines fenêtres de navigateur .

## Position de l'élément de menu

Vous pouvez utiliser `avant`, `after`, `beforeGroupContaining`, `afterGroupContaining` et `id` pour contrôler comment l'élément sera placé lors de la construction d'un menu avec `Menu.buildFromTemplate`.

* `avant` - Insère cet élément avant l'élément avec l'étiquette spécifiée. Si l'élément référencé n'existe pas, l'élément sera inséré à la fin de le menu. Implique également que le lien de menu en question doit être placé dans le même « groupe » que l’élément.
* `après` - Insère cet élément après l'élément avec l'étiquette spécifiée. Si l'élément référencé n'existe pas, l'élément sera inséré à la fin de le menu. Implique également que le lien de menu en question doit être placé dans le même « groupe » que l’élément.
* `beforeGroupContaining` - Fournit un moyen pour un seul menu contextuel de déclarer le placement de leur groupe contenant avant le groupe contenant de l'élément avec l'étiquette spécifiée.
* `afterGroupContaining` - Fournit un moyen pour un seul menu contextuel de déclarer le placement de leur groupe contenant après le groupe contenant de l'élément avec l'étiquette spécifiée.

Par défaut, les éléments seront insérés dans l'ordre dans lequel ils existent dans le modèle, sauf si l'un des mots-clés de positionnement spécifiés est utilisé.

### Exemples

Modèle :

```javascript
[
  { id: '1', label: 'one' },
  { id: '2', label: 'two' },
  { id: '3', label: 'three' },
  { id: '4', label: 'four' }
]
```

Menu :

```sh
- 1
- 2
- 3
- 4
```

Modèle :

```javascript
[
  { id: '1', label: 'one' },
  { type: 'separator' },
  { id: '3', label: 'three', beforeGroupContaining: ['1'] },
  { id: '4', label: 'four', afterGroupContaining: ['2'] },
  { type: 'separator' },
  { id: '2', label: 'two' }
]
```

Menu :

```sh
- 3
- 4
- ---
- 1
- ---
- 2
```

Modèle :

```javascript
[
  { id: '1', label: 'one', after: ['3'] },
  { id: '2', label: 'two', before: ['1'] },
  { id: '3', label: 'three' }
]
```

Menu :

```sh
- ---
- 3
- 2
- 1
```

[AboutInformationPropertyListFiles]: https://developer.apple.com/library/ios/documentation/general/Reference/InfoPlistKeyReference/Articles/AboutInformationPropertyListFiles.html
[setMenu]: https://github.com/electron/electron/blob/master/docs/api/browser-window.md#winsetmenumenu-linux-windows
