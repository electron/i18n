## クラス: MenuItem

> ネイティブアプリケーションメニューとコンテキストメニューに項目を追加します。

プロセス: [Main](../glossary.md#main-process)

サンプルについては [`Menu`](menu.md) を参照して下さい。

### `new MenuItem(options)`

* `options` オブジェクト 
  * `click` Function (任意) - メニューアイテムがクリックされると、 `click(menuItem, browserWindow, event)` と呼ばれる。 
    * `menuItem` MenuItem
    * `browserWindow` BrowserWindow
    * `event` Event
  * `role` String (任意) - メニューアイテムの動作を定義する。`click` プロパティを指定した場合は無視される。[roles](#roles) を参照。
  * `type` String (任意) - `normal`、`separator`、`submenu`、`checkbox`、`radio` にできる。
  * `label` String - (任意)
  * `sublabel` String - (任意)
  * `accelerator` [Accelerator](accelerator.md) (任意)
  * `icon` ([NativeImage](native-image.md) | String) (任意)
  * `enabled` Boolean (任意) - もし false なら、メニューアイテムはグレーっぽくなってクリックできません。
  * `visible` Boolean (任意) - もし false なら、メニューアイテムは全く見えなくなります。
  * `checked` Boolean (任意) - `checkbox` または `radio` の type のメニューアイテムに対してのみ指定する必要があります。
  * `submenu` (MenuItemConstructorOptions[] | Menu) (任意) - `submenu` の type のメニューアイテムに対してのみ指定する必要があります。 If `submenu` is specified, the `type: 'submenu'` can be omitted. If the value is not a `Menu` then it will be automatically converted to one using `Menu.buildFromTemplate`.
  * `id` String (optional) - Unique within a single menu. If defined then it can be used as a reference to this item by the position attribute.
  * `position` String (optional) - This field allows fine-grained definition of the specific location within a given menu.

### Roles

Roles allow menu items to have predefined behaviors.

It is best to specify `role` for any menu item that matches a standard role, rather than trying to manually implement the behavior in a `click` function. The built-in `role` behavior will give the best native experience.

The `label` and `accelerator` values are optional when using a `role` and will default to appropriate values for each platform.

The `role` property can have following values:

* `undo`
* `redo`
* `cut`
* `コピー`
* `paste`
* `pasteandmatchstyle`
* `selectall`
* `delete`
* `minimize` - Minimize current window
* `close` - Close current window
* `quit`- Quit the application
* `reload` - Reload the current window
* `forcereload` - Reload the current window ignoring the cache.
* `toggledevtools` - Toggle developer tools in the current window
* `togglefullscreen`- Toggle full screen mode on the current window
* `resetzoom` - Reset the focused page's zoom level to the original size
* `zoomin` - Zoom in the focused page by 10%
* `zoomout` - Zoom out the focused page by 10%
* `editMenu` - Whole default "Edit" menu (Undo, Copy, etc.)
* `windowMenu` - Whole default "Window" menu (Minimize, Close, etc.)

The following additional roles are available on macOS:

* `about` - Map to the `orderFrontStandardAboutPanel` action
* `hide` - Map to the `hide` action
* `hideothers` - Map to the `hideOtherApplications` action
* `unhide` - Map to the `unhideAllApplications` action
* `startspeaking` - Map to the `startSpeaking` action
* `stopspeaking` - Map to the `stopSpeaking` action
* `front` - Map to the `arrangeInFront` action
* `zoom` - Map to the `performZoom` action
* `toggletabbar` - Map to the `toggleTabBar` action
* `selectnexttab` - Map to the `selectNextTab` action
* `selectprevioustab` - Map to the `selectPreviousTab` action
* `mergeallwindows` - Map to the `mergeAllWindows` action
* `movetabtonewwindow` - Map to the `moveTabToNewWindow` action
* `window` - The submenu is a "Window" menu
* `help` - The submenu is a "Help" menu
* `services` - The submenu is a "Services" menu

When specifying a `role` on macOS, `label` and `accelerator` are the only options that will affect the menu item. All other options will be ignored.

### インスタンスプロパティ

The following properties are available on instances of `MenuItem`:

#### `menuItem.enabled`

A `Boolean` indicating whether the item is enabled, this property can be dynamically changed.

#### `menuItem.visible`

A `Boolean` indicating whether the item is visible, this property can be dynamically changed.

#### `menuItem.checked`

A `Boolean` indicating whether the item is checked, this property can be dynamically changed.

A `checkbox` menu item will toggle the `checked` property on and off when selected.

A `radio` menu item will turn on its `checked` property when clicked, and will turn off that property for all adjacent items in the same menu.

You can add a `click` function for additional behavior.

#### `menuItem.label`

A `String` representing the menu items visible label

#### `menuItem.click`

A `Function` that is fired when the MenuItem receives a click event