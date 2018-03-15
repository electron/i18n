## Sınıf: MenuItem

> Yerel uygulama menülerine ve bağlam menülerine öğeler ekleyin.

İşlem: [Ana](../glossary.md#main-process)

[`Menu`](menu.md) örnekleri için bkz.

### `new MenuItem(options)`

* `seçenekler` Nesne 
  * `click` Function (isteğe bağlı) - menuye basıldığı zaman `fonksiyon click(menuItem, browserWindow, event) ile birlikte` çağırılmış olacak. 
    * `menuItem` MenüÖğesi
    * `browserWindow` BrowserWindow
    * `event` Olay
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

Bir `click` fonksiyonu içinde davranışını el ile uygulamaya çalışmaktansa standart rolle eşleşen herhangi bir menü öğesi için `role` belirtmek en iyisidir. Yerleşik `role` davranışı en iyi doğal deneyimini verecektir.

`label` ve `accelerator` değerleri bir `rol` kullanırken isteğe bağlıdır ve her platform için uygun değerleri varsayılan olur.

`role` özelliği aşağıdaki değerlere sahiptir:

* `geri almak`
* `yeniden yapmak`
* `kes`
* `kopyala`
* `paste`
* `pasteandmatchstyle`
* `selectall`
* `sil`
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
* `editMenu` - Tüm varsayılan "Düzenle" menüsü (Geri alma, Kopyalama, vb.)
* `windowMenu` - Tüm varsayılan "Pencere" menüsü (Simge durumuna küçült, kapat, vb.)

Aşağıdaki ek roller macOS üzerinde kullanılabilir:

* `about` - `orderFrontStandardAboutPanel` eylemine eşleme
* `hide` - `hide` eylemine eşleme
* `hideothers` - `hideOtherApplications` eylemine eşleme
* `unhide` - `unhideAllApplications` eylemine eşleme
* `startspeaking` - `startSpeaking` eylemine eşleme
* `stopspeaking` - `stopSpeaking` eylemine eşleme
* `front` - `arrangeInFront` eylemine eşleme
* `zoom` - `performZoom` eylemine eşleme
* `window` - The submenu is a "Window" menu
* `help` - The submenu is a "Help" menu
* `services` - The submenu is a "Services" menu

MacOS'ta bir `role` belirtirken, menü öğesini etkileyecek seçenekler yalnızca `label` ve `accelerator`'dür. Diğer tüm seçenekler yok sayılır.

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

Görünen menü öğelerini bir `String` temsil eder

#### `menuItem.click`

MenuItem bir tıklama olayı aldığında tetiklenen bir `Function`'dır