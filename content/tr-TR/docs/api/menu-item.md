## Sınıf: MenuItem

> Yerel uygulama menülerine ve bağlam menülerine öğeler ekleyin.

İşlem: [Ana](../glossary.md#main-process)

[`Menu`](menu.md) örnekleri için bkz.

### `new MenuItem(options)`

* `seçenekler` Nesne 
  * `click` Function (isteğe bağlı) - menuye basıldığı zaman `fonksiyon click(menuItem, browserWindow, event) ile birlikte` çağırılmış olacak. 
    * `menuItem` MenüÖğesi
    * `browserWindow` [BrowserWindow](browser-window.md)
    * `event` Olay
  * `role` String (isteğe bağlı) - `click` özelliğinin yok sayılacağı belirtildiği zaman menu öğesinin eylemini belirtir. [roles](#roles) bkz.
  * `type` String (isteğe bağlı) - `normal`, `separator`, `submenu`, `checkbox` veya `radio` olabilir.
  * `label` String (optional)
  * `sublabel` String (optional)
  * `accelerator` [Accelerator](accelerator.md) (isteğe bağlı)
  * `icon` ([NativeImage](native-image.md) | String) (isteğe bağlı)
  * `enabled` Boolean (isteğe bağlı) - Eğer değer false ise, menü öğesi soluk ve tıklanamaz olacaktır.
  * `visible` Boolean (optional) - Eğer değer false ise, menü öğesi tamamen görünmez olacaktır.
  * `checked` Boolean (isteğe bağlı) - Yalnızca `checkbox` veya `radio` türü menü öğeleri için belirtilmiş olmalıdır.
  * `submenu` (MenuItemConstructorOptions[] | [Menu](menu.md)) (optional) - Should be specified for `submenu` type menu items. Eğer `submenu` belirtilmişse `type: 'submenu'` atlanmış olabilir. If the value is not a [`Menu`](menu.md) then it will be automatically converted to one using `Menu.buildFromTemplate`.
  * `id` String (isteğe bağlı) - Tek bir menu içinde benzersiz. Eğer tanımlanmışsa o zaman öğe pozisyon özelliğiyle bu öğeye referans gibi kullanılabilir.
  * `position` String (isteğe bağlı) - Bu alan iyi ayarlanmış belirli bir menü içinde özel bir konum sağlamakta.

### Roller

Roller, menü öğelerinin önceden tanımlanmış davranışlara sahip olmalarını sağlar.

Bir `click` fonksiyonu içinde davranışını el ile uygulamaya çalışmaktansa standart rolle eşleşen herhangi bir menü öğesi için `role` belirtmek en iyisidir. Yerleşik `role` davranışı en iyi doğal deneyimini verecektir.

`label` ve `accelerator` değerleri bir `rol` kullanırken isteğe bağlıdır ve her platform için uygun değerleri varsayılan olur.

`role` özelliği aşağıdaki değerlere sahiptir:

* `geri almak`
* `yeniden yapmak`
* `kes`
* `kopyala`
* `paste`
* `pasteAndMatchStyle`
* `selectAll`
* `sil`
* `minimize` - Minimize current window.
* `close` - Close current window.
* `quit`- Quit the application.
* `reload` - Reload the current window.
* `forceReload` - Reload the current window ignoring the cache.
* `toggleDevTools` - Toggle developer tools in the current window.
* `toggleFullScreen`- Toggle full screen mode on the current window.
* `resetZoom` - Reset the focused page's zoom level to the original size.
* `zoomIn` - Zoom in the focused page by 10%.
* `zoomOut` - Zoom out the focused page by 10%.
* `editMenu` - Whole default "Edit" menu (Undo, Copy, etc.).
* `windowMenu` - Whole default "Window" menu (Minimize, Close, etc.).

The following additional roles are available on *macOS*:

* `about` - Map to the `orderFrontStandardAboutPanel` action.
* `hide` - Map to the `hide` action.
* `hideOthers` - Map to the `hideOtherApplications` action.
* `unhide` - Map to the `unhideAllApplications` action.
* `startSpeaking` - Map to the `startSpeaking` action.
* `stopSpeaking` - Map to the `stopSpeaking` action.
* `front` - Map to the `arrangeInFront` action.
* `zoom` - Map to the `performZoom` action.
* `toggleTabBar` - Map to the `toggleTabBar` action.
* `selectNextTab` - Map to the `selectNextTab` action.
* `selectPreviousTab` - Map to the `selectPreviousTab` action.
* `mergeAllWindows` - Map to the `mergeAllWindows` action.
* `moveTabToNewWindow` - Map to the `moveTabToNewWindow` action.
* `window` - The submenu is a "Window" menu.
* `help` - The submenu is a "Help" menu.
* `services` - The submenu is a "Services" menu.
* `recentDocuments` - The submenu is an "Open Recent" menu.
* `clearRecentDocuments` - Map to the `clearRecentDocuments` action.

When specifying a `role` on macOS, `label` and `accelerator` are the only options that will affect the menu item. All other options will be ignored. Lowercase `role`, e.g. `toggledevtools`, is still supported.

### Örnek Özellikleri

Aşağıdaki özellikler `MenuItem` örneklerinde mevcuttur:

#### `menuItem.enabled`

Öğenin etkin olup olmadığını gösteren bir `Boolean` vardır, bu özellik dinamik olarak değiştirilebilir.

#### `menuItem.visible`

Öğenin görünür olup olmadığını gösteren bir `Boolean` vardır, bu özellik dinamik olarak değiştirilebilir.

#### `menuItem.checked`

Öğenin işaretli olup olmadığını gösteren bir `Boolean` vardır, bu özellik dinamik olarak değiştirilebilir.

Bir `checkbox` menü öğesi seçildiğinde `checked` özelliği etkinleştirip devre dışı bırakacaktır.

Bir `radio` menü öğesi tıklandığında `checked` özelliğini açar ve bu özelliğin aynı menüdeki tüm bitişik öğeler için kapatılmasına neden olur.

Ek davranış için bir `click` işlevi ekleyebilirsiniz.

#### `menuItem.label`

A `String` representing the menu items visible label.

#### `menuItem.click`

A `Function` that is fired when the MenuItem receives a click event.