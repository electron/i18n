## Bölüm: Menü

> Yerel uygulama menüleri ve bağlam menüleri oluşturun.

İşlem: [Ana](../glossary.md#main-process)

### `yeni Menü()`

Yeni bir menü oluşturun.

### Statik Metodlar

`menu` sınıfı aşağıdaki statik yöntemlere sahiptir:

#### `Menu.setApplicationMenu(menu)`

* `menu` Menü | boş

MacOS'ta uygulama `menu` ayarlar. Windows ve Linux'ta `menu`, her pencerenin üst menüsü olarak ayarlanır.

`null` bırakılması, Windows ve Linux'ta menü çubuğunu kaldırır, ancak macOS üzerinde hiçbir etkisi yoktur.

**Note:** Bu API `app` modülü `ready` olduktan sonra çağrılmalıdır.

#### `Menu.getApplicationMenu()`

Returns `Menu | null` - The application menu, if set, or `null`, if not set.

**Note:** Döndürülen `Menu` örneği dinamik eklemeyi veya menü öğelerinin kaldırılmasını desteklemez. [Instance properties](#instance-properties) hala kullanılabilir dinamik olarak değiştirilebilir.

#### `Menu.sendActionToFirstResponder(action)` *macOS*

* `action` Dizisi

`action` ilk yanıtın sahibine gönderir. Bu, varsayılan macOS menü davranışlarını taklit etmek için kullanılır. Genellikle sadece [`MenuItem`](menu-item.md) [`role`](menu-item.md#roles) özelliğini kullanırsınız.

MacOS'un yerel eylemleri hakkında daha fazla bilgi için macOS [macOS Cocoa Event Handling Guide](https://developer.apple.com/library/mac/documentation/Cocoa/Conceptual/EventOverview/EventArchitecture/EventArchitecture.html#//apple_ref/doc/uid/10000060i-CH3-SW7) bakın.

#### `Menu.buildFromTemplate(template)`

* `template` MenuItemConstructorOptions[]

`Menu` 'ye Dön

Genellikle `template` yalnızca bir [MenuItem](menu-item.md) oluşturmak için bir dizi `option` 'dur. Kullanım, yukarıdaki referanslar olabilir.

Ayrıca, `template` elementlerine başka alanlar da ekleyebilirsiniz ve bunlar oluşturulan menü öğelerinin özellikleri olacaktır.

### Örnek Metodlar

`menu` nesnesi aşağıdaki örnek yöntemlerine sahiptir:

#### `menu.popup([browserWindow, options])`

* `browserWindow` TarayıcıPenceresi (isteğe bağlı) - Varsayılan odaklanmış pencere.
* `seçenekler` Obje (opsiyonel) 
  * `x` Sayı (isteğe bağlı) - Varsayılan, geçerli fare imleci konumudur. Eğer `y` bildirilmişse, bildirilmelidir.
  * `y` Sayı (isteğe bağlı) Varsayılan geçerli fare imleci konumudur. Eğer `x` bildirilmişse, bildirilmelidir.
  * `async` Boolean (isteğe bağlı) - Bu yöntemin hemen çağrılmasını sağlamak için `true`, menü seçildikten veya kapatıldıktan sonra geri dönmek için `false` olarak ayarlayın. Varsayılanı `false` olarak belirler.
  * `positioningItem` Sayı (isteğe bağlı) *macOS* - Belirtilen koordinattaki fare imlecinin altına konumlandırılacak menü öğesinin dizini. Varsayılan değer -1'dir.

Bu menüyü `browserWindow` 'nde bir bağlam menüsü olarak açar.

#### `menu.closePopup([browserWindow])`

* `browserWindow` TarayıcıPenceresi (isteğe bağlı) - Varsayılan odaklanmış pencere.

`browserWindow` 'nde bağlam menüsünü kapatır.

#### `menu.append(menuItem)`

* `menuItem` MenüÖğesi

Menüye `menuItem` ekler.

#### `menu.getMenuItemById(id)`

* `kimlik` dizesi

Returns `MenuItem` the item with the specified `id`

#### `menu.insert(pos, menuItem)`

* `pos` Tamsayı
* `menuItem` MenüÖğesi

`menuItem` 'ı menünün `pos` konumuna yerleştirir.

### Örnek Özellikler

`menu` nesneleri aşağıdaki özelliklere de sahiptir:

#### `menu.items`

`MenuItem[]` Menünün Öğelerini içeren bir dizidir.

Her `Menu` birden fazla [`MenuItem`](menu-item.md) den oluşur ve her `MenuItem` bir alt menüye sahip olabilir.

## Örnekler

`Menu` sınıfı yalnızca ana işlemde kullanılabilir, ancak [`remote`](remote.md) modül vasıtasıyla oluşturma işleminde de kullanabilirsiniz.

### Ana işlem

Ana süreçte uygulama menüsünü basit şablon API'si ile oluşturmak için bir örnek:

```javascript
const {app, Menu} = require('electron')

const template = [
  {
    label: 'Edit',
    submenu: [
      {role: 'undo'},
      {role: 'redo'},
      {type: 'separator'},
      {role: 'cut'},
      {role: 'copy'},
      {role: 'paste'},
      {role: 'pasteandmatchstyle'},
      {role: 'delete'},
      {role: 'selectall'}
    ]
  },
  {
    label: 'View',
    submenu: [
      {role: 'reload'},
      {role: 'forcereload'},
      {role: 'toggledevtools'},
      {type: 'separator'},
      {role: 'resetzoom'},
      {role: 'zoomin'},
      {role: 'zoomout'},
      {type: 'separator'},
      {role: 'togglefullscreen'}
    ]
  },
  {
    role: 'window',
    submenu: [
      {role: 'minimize'},
      {role: 'close'}
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click () { require('electron').shell.openExternal('https://electronjs.org') }
      }
    ]
  }
]

if (process.platform === 'darwin') {
  template.unshift({
    label: app.getName(),
    submenu: [
      {role: 'about'},
      {type: 'separator'},
      {role: 'services', submenu: []},
      {type: 'separator'},
      {role: 'hide'},
      {role: 'hideothers'},
      {role: 'unhide'},
      {type: 'separator'},
      {role: 'quit'}
    ]
  })

  // Edit menu
  template[1].submenu.push(
    {type: 'separator'},
    {
      label: 'Speech',
      submenu: [
        {role: 'startspeaking'},
        {role: 'stopspeaking'}
      ]
    }
  )

  // Window menu
  template[3].submenu = [
    {role: 'close'},
    {role: 'minimize'},
    {role: 'zoom'},
    {type: 'separator'},
    {role: 'front'}
  ]
}

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
```

### İşleme süreci

Aşağıda, [`remote`](remote.md) modülü kullanarak bir web sayfasında (işleme süreci) dinamik olarak bir menü oluşturmak ve kullanıcı sayfayı sağ tıklattığında oluşturmak için bir örnek görünmektedir:

```html
<!-- index.html -->
<script>
const {remote} = require('electron')
const {Menu, MenuItem} = remote

const menu = new Menu()
menu.append(new MenuItem({label: 'MenuItem1', click() { console.log('item 1 clicked') }}))
menu.append(new MenuItem({type: 'separator'}))
menu.append(new MenuItem({label: 'MenuItem2', type: 'checkbox', checked: true}))

window.addEventListener('contextmenu', (e) => {
  e.preventDefault()
  menu.popup(remote.getCurrentWindow())
}, false)
</script>
```

## MacOS Uygulama Menüleri Hakkında Notlar

macOS, Windows ve Linux'dan tamamen farklı bir uygulama menüsü stiline sahiptir. İşte, uygulamanızın menüsünü daha yerli yapmaya ilişkin bazı notlar.

### Standart Menüler

MacOS'da, `Services` ve `Windows` menüleri gibi birçok sistem tanımlı standart menü vardır. Menünüzü standart bir menü yapmak için menünüzün `role` aşağıdakilerden birine ayarlamanız gerekir ve Electron bunları tanır ve onları standart menüler haline getirir:

* `pencere`
* `yardım`
* `hizmetler`

### Standart Menü Öğesi İşlemleri

macOS, `About xxx`, `Hide xxx` ve `Hide Others` gibi bazı menü öğeleri için standart eylemler önermiştir. Bir menü öğesinin eylemini standart bir eylem olarak ayarlamak için, menü öğesinin `role` özniteliğini ayarlamanız gerekir.

### Ana Menünün Adı

MacOS'da hangi etiketi ayarlarsanız ayarlayın uygulama menüsünün ilk öğesinin etiketi daima uygulamanızın adıdır. Bunu değiştirmek için uygulama paketinin `Info.plist` dosyasını geliştirin. Daha fazla bilgi için [About Information Property List Files](https://developer.apple.com/library/ios/documentation/general/Reference/InfoPlistKeyReference/Articles/AboutInformationPropertyListFiles.html) bakın.

## Belirli Tarayıcı Penceresi için Menü Ayarlama (*Linux* *Windows*)

Tarayıcı pencerelerinin [`setMenu` method](https://github.com/electron/electron/blob/master/docs/api/browser-window.md#winsetmenumenu-linux-windows), belirli tarayıcı pencerelerinin menüsünü ayarlayabilir.

## Menü Öğesi Konumu

`Menu.buildFromTemplate` ile bir menü oluştururken öğenin nasıl yerleştirileceğini kontrol etmek için `position` ve `id` kullanabilirsiniz.

`MenuItem` `position` özniteliği `[placement]=[id]` formundadır; burada `placement`, `before`, `after` veya `endof` ve `id` 'den biridir, menüdeki mevcut bir öğenin benzersiz kimliğidir:

* `before` - Bu öğeyi kimliği belirtilen maddeden önce ekler. Başvurulan öğe yoksa, öğe menünün sonuna eklenir.
* `after` - Bu öğeyi, kimliği belirtilen öğenin üzerine ekler. Başvurulan öğe yoksa, öğe menünün sonuna eklenir.
* `endof` - Bu öğeyi kimliği referanslı öğeyi içeren mantıksal grubun sonuna ekler (gruplar ayırıcı öğeler tarafından oluşturulur). Başvurulan öğe yoksa, verilen bir kimliği kullanarak yeni bir ayırıcı grubu oluşturulur ve bu öğe bu ayırıcıdan sonra eklenir.

Bir öğe konumlandırıldığında, konumlandırılmamış tüm öğeler, yeni bir öğe yerleştirilene kadar arkaya eklenir. Dolayısıyla, bir grup menü öğesini aynı konuma yerleştirmek istiyorsanız, yalnızca ilk öğe için bir konum belirtmeniz yeterlidir.

### Örnekler

Şablonlar:

```javascript
[
  {label: '4', id: '4'},
  {label: '5', id: '5'},
  {label: '1', id: '1', position: 'before=4'},
  {label: '2', id: '2'},
  {label: '3', id: '3'}
]
```

Menü:

```sh
<br />- 1
- 2
- 3
- 4
- 5
```

Şablonlar:

```javascript
[
  {label: 'a', position: 'endof=letters'},
  {label: '1', position: 'endof=numbers'},
  {label: 'b', position: 'endof=letters'},
  {label: '2', position: 'endof=numbers'},
  {label: 'c', position: 'endof=letters'},
  {label: '3', position: 'endof=numbers'}
]
```

Menü:

```sh
<br />- ---
- a
- b
- c
- ---
- 1
- 2
- 3
```