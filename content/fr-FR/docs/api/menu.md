## Classe : Menu

> Crée des menus d'applications natifs et des menus contextuels.

Processus : [Main](../glossary.md#main-process)

### `new Menu()`

Créer un nouveau menu.

### Méthodes statiques

The `Menu` class has the following static methods:

#### `Menu.setApplicationMenu(menu)`

* `menu` Menu | null

Définit le `menu` en tant que menu de l’application sur macOS. Sous Windows et Linux, le `menu` sera définie comme le menu principal de chaque fenêtre.

Also on Windows and Linux, you can use a `&` in the top-level item name to indicate which letter should get a generated accelerator. For example, using `&File` for the file menu would result in a generated `Alt-F` accelerator that opens the associated menu. The indicated character in the button label gets an underline. The `&` character is not displayed on the button label.

Passing `null` will suppress the default menu. On Windows and Linux, this has the additional effect of removing the menu bar from the window.

**Note:** The default menu will be created automatically if the app does not set one. It contains standard items such as `File`, `Edit`, `View`, `Window` and `Help`.

#### `Menu.getApplicationMenu()`

Retourne `Menu | null` - Le menu de l’application, si défini, ou `null`, si non défini.

**Remarque :** L'instance du `Menu` retourné, ne supporte pas l'ajout ou la suppression dynamique d’éléments de menu. Les [propriétés de l’instance](#instance-properties) peuvent encore être modifiées dynamiquement.

#### `Menu.sendActionToFirstResponder(action)` *macOS*

* `action` String

Envoie `action` au premier répondant de l'application. Ceci est utilisé pour émuler les comportements du menu de macOS par défaut. Usually you would use the [`role`](menu-item.md#roles) property of a [`MenuItem`](menu-item.md).

Voir le [Guide de gestion des événements Cocoa de macOS](https://developer.apple.com/library/mac/documentation/Cocoa/Conceptual/EventOverview/EventArchitecture/EventArchitecture.html#//apple_ref/doc/uid/10000060i-CH3-SW7) pour plus d'informations sur les actions natives de macOS.

#### `Menu.buildFromTemplate(template)`

* `template` (MenuItemConstructorOptions | MenuItem)[]

Retourne `Menu`

Generally, the `template` is an array of `options` for constructing a [MenuItem](menu-item.md). The usage can be referenced above.

You can also attach other fields to the element of the `template` and they will become properties of the constructed menu items.

### Méthodes d’instance

L'objet `menu` a les méthodes d'instance suivantes:

#### `menu.popup([options])`

* `options` Object (facultatif) 
  * `window` [BrowserWindow](browser-window.md) (optional) - Default is the focused window.
  * `x` Number (optional) - Default is the current mouse cursor position. Must be declared if `y` is declared.
  * `y` Number (optional) - Default is the current mouse cursor position. Must be declared if `x` is declared.
  * `positioningItem` Number (optional) *macOS* - The index of the menu item to be positioned under the mouse cursor at the specified coordinates. Default is -1.
  * `callback` Function (optional) - Called when menu is closed.

Pops up this menu as a context menu in the [`BrowserWindow`](browser-window.md).

#### `menu.closePopup([browserWindow])`

* `browserWindow` [BrowserWindow](browser-window.md) (optional) - Default is the focused window.

Closes the context menu in the `browserWindow`.

#### `menu.append(menuItem)`

* `menuItem` [MenuItem](menu-item.md)

Ajoute le `menuItem` au menu.

#### `menu.getMenuItemById(id)`

* `id` String

Retourne `MenuItem` l'élément avec le `id` spécifié

#### `menu.insert(pos, menuItem)`

* `pos` Integer
* `menuItem` [MenuItem](menu-item.md)

Insère le `menuItem` à la position `pos` du menu.

### Événements d’instance

Les objets créés avec `nouveau Menu` ou retournés par `Menu.buildFromTemplate` émettent les événements suivants :

**Remarque :** Certains événements sont seulement disponibles sur des systèmes d'exploitation spécifiques et sont étiquetés comme tels.

#### Événement : 'menu-will-show'

Retourne :

* `event` Event

Émis lorsque `menu.popup()` est appelé.

#### Événement : 'menu-will-close'

Retourne :

* `event` Event

Émis lorsqu'un popup est fermé manuellement ou avec `menu.closePopup()`.

### Propriétés d'instance

Les objets `menu` ont également les propriétés suivantes :

#### `menu.items`

Un tableau `MenuItem[]` contenant les éléments du menu.

Chaque `Menu` consiste en plusieurs [`MenuItem`](menu-item.md)s et chaque `MenuItem` peut avoir un sous-menu.

## Exemples

La classe `Menu` n'est disponible que dans le processus principal, mais vous pouvez également l'utiliser dans le processus de rendu via le module [`distant`](remote.md).

### Main process

Un exemple de création du menu d'application dans le processus principal avec l'API simple du modèle :

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
          label: 'Parle',
          sous-menu : [
            { role: 'startspeaking' },
            { role: 'stopspeaking' }
          ]

      ] : [
        { role: 'delete' },
        { type: 'separator' },
        { role: 'selectAll' }
      ])
    ]
  },
  // { role: 'viewMenu' }
  {
    label: 'Voir',
    sous-menu : [
      { role: 'reload' },
      { role: 'forcereload' },
      { role: 'toggledevtools' },
      { type: 'separator' },
      { role: 'resetzoom' },
      { role: 'zoomin' },
      { role: 'zoomout' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  // { role: 'windowMenu' }
  {
    label: 'Window',
    sous-menu : [
      { role: 'minimize' },
      { role: 'zoom' },
      . .(isMac ? [
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

Ci-dessous est un exemple de création dynamique d'un menu dans une page web (processus de rendu) en utilisant le module [`distance`](remote.md) et l'afficher lorsque l'utilisateur clique droit sur la page :

```html
<!-- index. tml -->
<script>
const { remote } = require('electron')
const { Menu, MenuItem } = remote

const menu = new Menu()
menu. ppend(new MenuItem({ label: 'MenuItem1', click() { console.log('item 1 clicd') } }))
menu. ppend(new MenuItem({ type: 'separator' }))
menu.append(new MenuItem({ label: 'MenuItem2', type: 'checkbox', checked: true }))

window.addEventListener('contextmenu', (e) => {
  e. reventDefault()
  menu.popup({ window: remote.getCurrentWindow() })
}, false)
</script>
```

## Notes sur le menu d'application macOS

macOS a un style complètement différent du menu des applications Windows et Linux. Voici quelques notes pour rendre le menu de votre application plus natif.

### Standard Menus

Sur macOS, il y a beaucoup de menus standards définis par le système, comme les [`Services`](https://developer.apple.com/documentation/appkit/nsapplication/1428608-servicesmenu?language=objc) et `Windows`. Pour faire de votre menu un menu standard, vous devriez définir le `rôle de votre menu` à l'un des rôles suivants et Electron les reconnaîtra et les fera devenir des menus standard :

* `window`
* `help`
* `services`

### Actions des éléments de menu standard

macOS a fourni des actions standard pour certains liens de menu, comme `À propos de xxx`, `Cacher xxx`, et `Cacher les autres`. Pour définir l'action d'un lien de menu à une action standard , vous devez définir l'attribut `rôle` de l'élément de menu.

### Nom du menu principal

Sur macOS, l'étiquette du premier élément du menu de l'application est toujours le nom de votre application, quel que soit le libellé que vous avez défini. Pour le modifier, modifiez le fichier `Info.plist` de votre pack d'applications. Voir [À propos des fichiers de la liste de propriétés d'information](https://developer.apple.com/library/ios/documentation/general/Reference/InfoPlistKeyReference/Articles/AboutInformationPropertyListFiles.html) pour plus d'informations.

## Menu de configuration pour la fenêtre de navigation spécifique (*Linux* *Windows*)

La [`setMenu` méthode](https://github.com/electron/electron/blob/master/docs/api/browser-window.md#winsetmenumenu-linux-windows) des fenêtres du navigateur peut définir le menu de certaines fenêtres de navigateur .

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
<br />- 1
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
<br />- 3
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
<br />- ---
- 3
- 2
- 1
```