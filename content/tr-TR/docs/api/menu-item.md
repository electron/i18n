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

`Etiket` ve `Hızlandırıcı` değerleri bir `rol` kullanırken isteğe bağlıdır ve her platform için uygun değerleri varsayılan olur.

`role` özelliği aşağıdaki değerlere sahiptir:

* `undo`
* `redo`
* `cut`
* `copy`
* `paste`
* `pasteandmatchstyle`
* `selectall`
* `delete`
* ` minimize ` - Geçerli pencereyi simge durumuna küçültme
* `close` - Geçerli pencereyi kapatma
* ` quit ` - Uygulamadan çıkma
* `reload` - Geçerli pencereyi yeniden yükleme
* `forcereload` - Önbelleği yok sayarak geçerli pencereyi yeniden yükleme.
* `toggledevtools` - Geliştirici araçlarını geçerli pencerede aç / kapat
* `togglefullscreen` - Geçerli pencerede tam ekran modunu aç / kapat
* `resetzoom` - Odaklanmış sayfanın yakınlaştırma düzeyini orijinal boyutuna sıfırlayın
* `zoomin` - Odaklanmış sayfayı % 10 yakınlaştırma
* `zoomout` - Odaklanmış sayfayı% 10 oranında uzaklaştırma
* `editMenu` - Tüm varsayılan "Edit" menüsü (Undo, Copy, vb.)
* `windowMenu` - Tüm varsayılan "Window" menüsü (Minimize, Close, vb.)

Aşağıdaki ek roller macOS üzerinde kullanılabilir:

* `about` - `orderFrontStandardAboutPanel` eylemine eşleme
* `hide` - `hide` eylemine eşleme
* `hideothers` - `hideOtherApplications` eylemine eşleme
* `unhide` - `unhideAllApplications` eylemine eşleme
* `startspeaking` - `startSpeaking` eylemine eşleme
* `stopspeaking` - `stopSpeaking` eylemine eşleme
* `front` - `arrangeInFront` eylemine eşleme
* `zoom` - `performZoom` eylemine eşleme
* ` window ` - Alt menü bir "Window" menüsüdür
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