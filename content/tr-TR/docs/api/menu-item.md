## Sınıf: MenuItem

> Yerel uygulama menülerine ve bağlam menülerine öğeler ekleyin.

Süreç: [Ana](../glossary.md#main-process)

[`Menu`](menu.md) örnekleri için bkz.

### `new MenuItem(options)`

* `options` Nesnesi 
  * `click` Function (isteğe bağlı) - menuye basıldığı zaman `fonksiyon click(menuItem, browserWindow, event) ile birlikte` çağırılmış olacak. 
    * `menuItem` MenuItem
    * `browserWindow` BrowserWindow
    * `event` Event
  * `role` String (isteğe bağlı) - `click` özelliğinin yok sayılacağı belirtildiği zaman menu öğesinin eylemini belirtir. [roles](#roles) bkz.
  * `type` String (isteğe bağlı) - `normal`, `separator`, `submenu`, `checkbox` veya `radio` olabilir.
  * `label` String - (isteğe bağlı)
  * `sublabel` String - (isteğe bağlı)
  * `accelerator` [Accelerator](accelerator.md) (isteğe bağlı)
  * `icon` ([NativeImage](native-image.md) | String) (isteğe bağlı)
  * `enabled` Boolean (isteğe bağlı) - Eğer değer false ise, menü öğesi soluk ve tıklanamaz olacaktır.
  * `visible` Boolean (optional) - Eğer değer false ise, menü öğesi tamamen görünmez olacaktır.
  * `checked` Boolean (isteğe bağlı) - Yalnızca `checkbox` veya `radio` türü menü öğeleri için belirtilmiş olmalıdır.
  * `submenu` (MenuItemConstructorOptions[] | Menu) (isteğe bağlı) - `submenu` türü menu öğeleri için tanımlanmalıdır. Eğer `submenu` belirtilmişse `type: 'submenu'` atlanmış olabilir. Eğer değer bir `menü` değilse o zaman bu otomatik olarak `Menu.buildFromTemplate` kullanarak birine dönüştürülür.
  * `id` String (isteğe bağlı) - Tek bir menu içinde benzersiz. Eğer tanımlanmışsa o zaman öğe pozisyon özelliğiyle bu öğeye referans gibi kullanılabilir.
  * `position` String (isteğe bağlı) - Bu alan iyi ayarlanmış belirli bir menü içinde özel bir konum sağlamakta.

### Roller

Roller, menü öğelerinin önceden tanımlanmış davranışlara sahip olmalarını sağlar.

Bir `click` fonksiyonu içinde davranışını el ile uygulamaya çalışmaktansa standart rolle eşleşen herhangi bir menü öğesi için `role` belirtmek en iyisidir. Yerleşik `rol` davranışı en iyi doğal deneyimini verecektir.

The `label` and `accelerator` values are optional when using a `role` and will default to appropriate values for each platform.

The `role` property can have following values:

* `undo`
* `redo`
* `cut`
* `copy`
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
* `window` - The submenu is a "Window" menu
* `help` - The submenu is a "Help" menu
* `services` - The submenu is a "Services" menu

When specifying a `role` on macOS, `label` and `accelerator` are the only options that will affect the menu item. All other options will be ignored.

### Instance Properties

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